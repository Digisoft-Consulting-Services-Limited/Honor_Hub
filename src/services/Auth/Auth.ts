// import { env } from "@/utils/env.config";

// const BASE_URL = env.BASE_URL;
// const BASE_URL_VERSION = env.BASE_URL_VERSION;

// const AUTH_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/`;
// const REFRESH_TOKEN_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/refresh/`;

// export const TOKEN_STORAGE_KEY = 'accessToken';
// export const TOKEN_EXPIRY_KEY = 'tokenExpiry';
// export const REFRESH_TOKEN_KEY = 'refreshTokenInProgress';
// export const TOKEN_REFRESH_MARGIN = 2 * 60 * 1000; // Refresh 2 minutes before expiration

// // Global refresh promise to prevent multiple simultaneous refreshes
// let refreshPromise: Promise<string | null> | null = null;

// export const getAccessToken = (): string | null => {
//   if (typeof document === 'undefined') return null;
  
//   // Try to get from cookie
//   const cookieMatch = document.cookie.match(new RegExp(`(^| )${TOKEN_STORAGE_KEY}=([^;]+)`));
//   if (cookieMatch) return cookieMatch[2];
  
//   return null;
// };

// // Save token with server-provided expiry time
// const saveToken = (token: string, expiryTimestamp: number): void => {
//   if (typeof document === 'undefined') return;
  
//   // Convert to milliseconds if necessary (if it's in seconds)
//   const expiry = expiryTimestamp > 9999999999 ? expiryTimestamp : expiryTimestamp * 1000;
  
//   // Set cookies with explicit expiry time
//   const expiryDate = new Date(expiry);
  
//   document.cookie = `${TOKEN_STORAGE_KEY}=${token}; path=/; secure; expires=${expiryDate.toUTCString()}`;
//   document.cookie = `${TOKEN_EXPIRY_KEY}=${expiry}; path=/; secure; expires=${expiryDate.toUTCString()}`;
  
//   // Also store in localStorage if available
//   try {
//     localStorage.setItem(TOKEN_STORAGE_KEY, token);
//     localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
//   } catch (e) {
//     console.warn("Unable to use localStorage for token storage",e);
//   }
// };

// export const clearTokens = (): void => {
//   if (typeof document === 'undefined') return;
  
//   // Clear cookies
//   document.cookie = `${TOKEN_STORAGE_KEY}=; path=/; max-age=0`;
//   document.cookie = `${TOKEN_EXPIRY_KEY}=; path=/; max-age=0`;
//   document.cookie = `${REFRESH_TOKEN_KEY}=; path=/; max-age=0`;
  
//   // Clear localStorage
//   try {
//     localStorage.removeItem(TOKEN_STORAGE_KEY);
//     localStorage.removeItem(TOKEN_EXPIRY_KEY);
//     localStorage.removeItem(REFRESH_TOKEN_KEY);
//   } catch (e) {
//     console.warn("Unable to clear localStorage",e);
//   }
// };

// export const auth_api = async (API_KEY: string, APP_SECRET: string): Promise<boolean> => {
//   try {
//     const response = await fetch(AUTH_URL, {
//       method: "POST",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ apiKey: API_KEY, appSecret: APP_SECRET }),
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
    
//     const result = await response.json();

//     const accessToken: string | undefined = result?.data?.[0]?.accessToken;
//     const expiryTimestamp: number | undefined = result?.data?.[0]?.expires;
    
//     if (!accessToken || !expiryTimestamp) {
//       throw new Error("Missing access token or expiry from response");
//     }

//     // Store token with server-provided expiry
//     saveToken(accessToken, expiryTimestamp);
    
//     console.log("Login successful, token stored");
//     return true;
//   } catch (error) {
//     console.error("Error during login:", error); 
//     return false;
//   }
// };

// export const refreshToken = async (APP_SECRET: string): Promise<string | null> => {
//   // If a refresh is already in progress, return that promise to prevent multiple refreshes
//   if (refreshPromise) {
//     console.log("Token refresh already in progress, reusing existing promise");
//     return refreshPromise;
//   }
  
//   try {
//     // Set refresh in progress flag
//     if (typeof document !== 'undefined') {
//       document.cookie = `${REFRESH_TOKEN_KEY}=true; path=/; max-age=300`; // 5-minute timeout
//     }
    
//     // Create a new refresh promise
//     refreshPromise = (async () => {
//       try {
//         const currentToken = getAccessToken();
//         if (!currentToken) {
//           throw new Error("No token available to refresh");
//         }

//         console.log("Attempting to refresh token...");
        
//         const response = await fetch(REFRESH_TOKEN_URL, {
//           method: "POST",
//           headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${currentToken}`
//           },
//           body: JSON.stringify({ appSecret: APP_SECRET }),
//         });

//         // Handle unauthorized response
//         if (response.status === 401) {
//           // Clear invalid tokens
//           clearTokens();
//           throw new Error("Session expired - Please reauthenticate");
//         }
        
//         if (!response.ok) {
//           throw new Error(`HTTP error during refresh! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("Refresh token response:", result);

//         // Check different response formats but prefer the same format as login response
//         let newAccessToken: string | null = null;
//         let newExpiry: number | null = null;
        
//         if (result?.data?.[0]?.accessToken) {
//           newAccessToken = result.data[0].accessToken;
//           newExpiry = result.data[0].expires;
//         } else if (result?.data?.accessToken) {
//           newAccessToken = result.data.accessToken;
//           newExpiry = result.data.expires;
//         } else if (result?.accessToken) {
//           newAccessToken = result.accessToken;
//           newExpiry = result.expires;
//         } else if (result?.access_token) {
//           newAccessToken = result.access_token;
//           newExpiry = result.expiry || result.expires_in;
//         }

//         if (!newAccessToken || !newExpiry) {
//           throw new Error("Failed to get new access token or expiry from response");
//         }

//         // Store the new token with server-provided expiry
//         saveToken(newAccessToken, newExpiry);
//         console.log("Token refreshed successfully");
//         return newAccessToken;
//       } finally {
//         // Clear refresh in progress flag
//         if (typeof document !== 'undefined') {
//           document.cookie = `${REFRESH_TOKEN_KEY}=; path=/; max-age=0`;
//         }
//       }
//     })();
    
//     return await refreshPromise;
//   } catch (error) {
//     console.error("Error refreshing access token:", error);
//     return null;
//   } finally {
//     // Clear the refresh promise after completion (successful or not)
//     setTimeout(() => {
//       refreshPromise = null;
//     }, 100);
//   }
// };

// export const isTokenExpired = (): boolean => {
//   if (typeof document === 'undefined') return true;
  
//   const token = getAccessToken();
//   if (!token) return true;
  
//   let expiry: number | null = null;
  
//   // Try to get expiry from cookie
//   const cookieMatch = document.cookie.match(new RegExp(`(^| )${TOKEN_EXPIRY_KEY}=([^;]+)`));
//   if (cookieMatch) {
//     expiry = parseInt(cookieMatch[2], 10);
//   } 
  
//   // If not in cookie, try localStorage
//   if (!expiry && typeof localStorage !== 'undefined') {
//     try {
//       const storedExpiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
//       if (storedExpiry) {
//         expiry = parseInt(storedExpiry, 10);
//       }
//     } catch (e) {
//       console.warn("Unable to access localStorage for token expiry",e);
//     }
//   }
  
//   // If no expiry found, token is considered expired
//   if (!expiry) return true;
  
//   return Date.now() + TOKEN_REFRESH_MARGIN > expiry;
// };

// export const ensureValidToken = async (APP_SECRET: string): Promise<string | null> => {
//   try {
//     const currentToken = getAccessToken();
    
//     if (!currentToken) {
//       console.log("No token found");
//       return null;
//     }
    
//     if (isTokenExpired()) {
//       console.log("Token expired or will expire soon, refreshing...");
//       return await refreshToken(APP_SECRET);
//     }
    
//     return currentToken;
//   } catch (error) {
//     console.error("Error ensuring valid token:", error);
//     return null;
//   }
// };

// // Setup automatic refresh for API calls
// export const setupAutoRefresh = (APP_SECRET: string): void => {
//   // Intercept fetch to auto-refresh token when needed
//   const originalFetch = window.fetch;
//   window.fetch = async function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
//     // Skip token handling for auth-related endpoints
//     const url = typeof input === 'string' ? input : (input as Request).url;
//     if (url.includes('/auth/token/')) {
//       return originalFetch(input, init);
//     }
    
//     // Ensure we have a valid token before making the request
//     const token = await ensureValidToken(APP_SECRET);
    
//     if (token && init) {
//       // Create headers if they don't exist
//       const headers = init.headers ? new Headers(init.headers) : new Headers();
      
//       // Add or update Authorization header with the fresh token
//       headers.set('Authorization', `Bearer ${token}`);
      
//       // Update the init object with the new headers
//       init.headers = headers;
//     }
    
//     // Make the original request with potentially refreshed token
//     return originalFetch(input, init);
//   };
  
//   // Set up a regular check for token expiration
//   const refreshInterval = 60 * 1000; // Check every minute
//   setInterval(async () => {
//     if (isTokenExpired()) {
//       console.log("Interval check: token needs refreshing");
//       await refreshToken(APP_SECRET);
//     }
//   }, refreshInterval);
// };