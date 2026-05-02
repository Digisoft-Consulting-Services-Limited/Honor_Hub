// src/lib/GuestUserAuth.ts

// --- In-memory token cache ---
// We store the token here instead of localStorage or cookies.
// localStorage is persistent across tabs and pages, which is fine for many apps,
// but storing tokens in memory means they're wiped on a page reload — a reasonable
// security tradeoff for guest/anonymous sessions.
let memoryToken: string | null = null;
let memoryTokenExpiry: number | null = null;

// Two minutes before expiry, we treat the token as expired
// so we have time to refresh it before a real request fails.
const TOKEN_REFRESH_MARGIN_MS = 2 * 60 * 1000;

// Prevent multiple simultaneous refresh calls racing each other.
let refreshInFlight: Promise<string | null> | null = null;

// ---

export const getAccessToken = (): string | null => memoryToken;

export const clearTokens = (): void => {
  memoryToken = null;
  memoryTokenExpiry = null;
};

const saveToken = (token: string, expiresRaw: number): void => {
  // The upstream may return seconds or milliseconds. Normalise to ms.
  const expiryMs = expiresRaw > 9_999_999_999 ? expiresRaw : expiresRaw * 1000;
  memoryToken = token;
  memoryTokenExpiry = expiryMs;
};

export const isTokenExpired = (): boolean => {
  if (!memoryToken || !memoryTokenExpiry) return true;
  return Date.now() + TOKEN_REFRESH_MARGIN_MS > memoryTokenExpiry;
};

// Fetch a brand-new guest token via our secure server route.
// The browser has no idea what API_KEY or APP_SECRET are — it just
// calls our own Next.js endpoint and receives a ready-to-use token.
export const getGuestToken = async (): Promise<boolean> => {
  try {
    const res = await fetch("/api/guest-token", { method: "POST" });

    if (!res.ok) {
      console.error(`[GuestUserAuth] /api/guest-token responded ${res.status}`);
      return false;
    }

    const { accessToken, expires } = await res.json();

    if (!accessToken || !expires) {
      console.error("[GuestUserAuth] Response missing accessToken or expires.");
      return false;
    }

    saveToken(accessToken, expires);
    return true;
  } catch (err) {
    console.error("[GuestUserAuth] Failed to fetch guest token:", err);
    return false;
  }
};

// Attempt to refresh an existing token.
// If the refresh fails or there's no token, fall back to a fresh guest token.
export const refreshToken = async (): Promise<string | null> => {
  // If a refresh is already in progress, reuse that promise instead of
  // firing a second concurrent request.
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async (): Promise<string | null> => {
    try {
      const current = getAccessToken();

      if (!current) {
        await getGuestToken();
        return getAccessToken();
      }

      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
      const BASE_URL_VERSION = process.env.NEXT_PUBLIC_BASE_URL_VERSION ?? "v1";
      const REFRESH_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/refresh/`;

      const res = await fetch(REFRESH_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${current}`,
        },
        // APP_SECRET is NOT sent here — the refresh endpoint only needs the current token.
        // If your upstream refresh endpoint also requires APP_SECRET, move this call
        // into a server route (app/api/refresh-token/route.ts) the same way we did
        // for the guest token endpoint.
        body: JSON.stringify({}),
      });

      if (res.status === 401) {
        // Current token is no longer valid — start fresh.
        clearTokens();
        await getGuestToken();
        return getAccessToken();
      }

      if (!res.ok) {
        throw new Error(`Refresh failed with status ${res.status}`);
      }

      const result = await res.json();

      // Handle multiple possible response shapes from the upstream.
      const newToken: string =
        result?.data?.[0]?.accessToken ??
        result?.data?.accessToken ??
        result?.accessToken ??
        result?.access_token;

      const newExpiry: number =
        result?.data?.[0]?.expires ??
        result?.data?.expires ??
        result?.expires ??
        result?.expires_in;

      if (!newToken || !newExpiry) {
        throw new Error("Refresh response missing token or expiry.");
      }

      saveToken(newToken, newExpiry);
      return newToken;
    } catch (err) {
      console.error("[GuestUserAuth] Token refresh failed:", err);
      return null;
    } finally {
      // Small delay before clearing the in-flight flag so that any
      // concurrent callers that race in right as this resolves still
      // see the completed promise rather than kicking off a second call.
      setTimeout(() => {
        refreshInFlight = null;
      }, 100);
    }
  })();

  return refreshInFlight;
};

// Call this before any authenticated request.
// Returns a valid token, refreshing or re-fetching as needed.
export const ensureValidToken = async (): Promise<string | null> => {
  const current = getAccessToken();

  if (!current) {
    await getGuestToken();
    return getAccessToken();
  }

  if (isTokenExpired()) {
    return refreshToken();
  }

  return current;
};  