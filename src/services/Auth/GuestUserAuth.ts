import { env } from "@/utils/env.config";

const BASE_URL = env.BASE_URL;
const BASE_URL_VERSION = env.BASE_URL_VERSION;

const AUTH_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/`;
const REFRESH_TOKEN_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/refresh/`;

// In-memory token storage (instead of cookies/localStorage)
let memoryToken: string | null = null;
let memoryTokenExpiry: number | null = null;
let refreshPromise: Promise<string | null> | null = null;

// Token refresh margin (2 minutes before expiration)
const TOKEN_REFRESH_MARGIN = 2 * 60 * 1000;

// Get token from memory
export const getAccessToken = (): string | null => {
  return memoryToken;
};

// Save token to memory
const saveToken = (token: string, expiryTimestamp: number): void => {
  // Convert to milliseconds if necessary (if it's in seconds)
  const expiry = expiryTimestamp > 9999999999 ? expiryTimestamp : expiryTimestamp * 1000;
  
  memoryToken = token;
  memoryTokenExpiry = expiry;
  
  console.log("Token saved to memory cache");
};

// Clear tokens from memory
export const clearTokens = (): void => {
  memoryToken = null;
  memoryTokenExpiry = null;
  console.log("Tokens cleared from memory");
};

// For non-auth users (guest mode)
export const getGuestToken = async (): Promise<boolean> => {
  try {
    // Use existing API_KEY and APP_SECRET from environment
    const API_KEY = env.API_KEY;
    const APP_SECRET = env.APP_SECRET;
    
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ apiKey: API_KEY, appSecret: APP_SECRET }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result = await response.json();

    const accessToken: string | undefined = result?.data?.[0]?.accessToken;
    const expiryTimestamp: number | undefined = result?.data?.[0]?.expires;
    
    if (!accessToken || !expiryTimestamp) {
      throw new Error("Missing access token or expiry from response");
    }

    // Store token in memory instead of cookies/localStorage
    saveToken(accessToken, expiryTimestamp);
    
    console.log("Guest token generated successfully");
    return true;
  } catch (error) {
    console.error("Error getting guest token:", error); 
    return false;
  }
};

// Original auth_api function for authenticated users
export const auth_api = async (API_KEY: string, APP_SECRET: string): Promise<boolean> => {
  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ apiKey: API_KEY, appSecret: APP_SECRET }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result = await response.json();

    const accessToken: string | undefined = result?.data?.[0]?.accessToken;
    const expiryTimestamp: number | undefined = result?.data?.[0]?.expires;
    
    if (!accessToken || !expiryTimestamp) {
      throw new Error("Missing access token or expiry from response");
    }

    // Store token in memory
    saveToken(accessToken, expiryTimestamp);
    
    console.log("Login successful, token stored in memory");
    return true;
  } catch (error) {
    console.error("Error during login:", error); 
    return false;
  }
};

export const refreshToken = async (): Promise<string | null> => {
  // If a refresh is already in progress, return that promise to prevent multiple refreshes
  if (refreshPromise) {
    console.log("Token refresh already in progress, reusing existing promise");
    return refreshPromise;
  }
  
  // Create a new refresh promise
  refreshPromise = (async () => {
    try {
      const currentToken = getAccessToken();
      if (!currentToken) {
        // If no token exists, get a new guest token
        await getGuestToken();
        return getAccessToken();
      }

      console.log("Attempting to refresh token...");
      
      const response = await fetch(REFRESH_TOKEN_URL, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentToken}`
        },
        body: JSON.stringify({ appSecret: env.APP_SECRET }),
      });

      // Handle unauthorized response
      if (response.status === 401) {
        // Clear invalid tokens
        clearTokens();
        // Get a new guest token
        await getGuestToken();
        return getAccessToken();
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error during refresh! Status: ${response.status}`);
      }

      const result = await response.json();

      // Check different response formats
      let newAccessToken: string | null = null;
      let newExpiry: number | null = null;
      
      if (result?.data?.[0]?.accessToken) {
        newAccessToken = result.data[0].accessToken;
        newExpiry = result.data[0].expires;
      } else if (result?.data?.accessToken) {
        newAccessToken = result.data.accessToken;
        newExpiry = result.data.expires;
      } else if (result?.accessToken) {
        newAccessToken = result.accessToken;
        newExpiry = result.expires;
      } else if (result?.access_token) {
        newAccessToken = result.access_token;
        newExpiry = result.expiry || result.expires_in;
      }

      if (!newAccessToken || !newExpiry) {
        throw new Error("Failed to get new access token or expiry from response");
      }

      // Store the new token in memory
      saveToken(newAccessToken, newExpiry);
      console.log("Token refreshed successfully");
      return newAccessToken;
    } finally {
      // Clear refresh promise flag
      setTimeout(() => {
        refreshPromise = null;
      }, 100);
    }
  })();
  
  return await refreshPromise;
};

export const isTokenExpired = (): boolean => {
  if (!memoryToken || !memoryTokenExpiry) return true;
  return Date.now() + TOKEN_REFRESH_MARGIN > memoryTokenExpiry;
};

export const ensureValidToken = async (): Promise<string | null> => {
  try {
    const currentToken = getAccessToken();
    
    if (!currentToken) {
      console.log("No token found, generating guest token");
      await getGuestToken();
      return getAccessToken();
    }
    
    if (isTokenExpired()) {
      console.log("Token expired or will expire soon, refreshing...");
      return await refreshToken();
    }
    
    return currentToken;
  } catch (error) {
    console.error("Error ensuring valid token:", error);
    return null;
  }
};

// Setup automatic refresh for API calls and initial guest token generation
export const setupAutoRefresh = (): void => {
  // Generate a guest token on initial load if no token exists
  (async () => {
    if (!getAccessToken()) {
      await getGuestToken();
    }
  })();

  // Intercept fetch to auto-refresh token when needed
  const originalFetch = window.fetch;
  window.fetch = async function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    // Skip token handling for auth-related endpoints
    const url = typeof input === 'string' ? input : (input as Request).url;
    if (url.includes('/auth/token/')) {
      return originalFetch(input, init);
    }
    
    // Ensure we have a valid token before making the request
    const token = await ensureValidToken();
    
    if (token && init) {
      // Create headers if they don't exist
      const headers = init.headers ? new Headers(init.headers) : new Headers();
      
      // Add or update Authorization header with the fresh token
      headers.set('Authorization', `Bearer ${token}`);
      
      // Update the init object with the new headers
      init.headers = headers;
    }
    
    // Make the original request with potentially refreshed token
    return originalFetch(input, init);
  };
  
  // Set up a regular check for token expiration
  const refreshInterval = 60 * 1000; // Check every minute
  setInterval(async () => {
    if (isTokenExpired()) {
      console.log("Interval check: token needs refreshing");
      await refreshToken();
    }
  }, refreshInterval);
};