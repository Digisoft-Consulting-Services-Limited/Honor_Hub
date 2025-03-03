import { env } from "@/utils/env.config";


const BASE_URL = env.BASE_URL
const BASE_URL_VERSION = env.BASE_URL_VERSION


const AUTH_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/`;
const REFRESH_TOKEN_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/refresh/`;
// const NOTES_URL = `${BASE_URL}notes/`;
// const LOGOUT_URL = `${BASE_URL}auth/logout/`;
// const Register_URL = `${BASE_URL}auth/register`;
// const Authenticated_URL = `${BASE_URL}auth/authenticated/`;

export const TOKEN_STORAGE_KEY = 'accessToken';
export const TOKEN_EXPIRY_KEY = 'tokenExpiry';
export const TOKEN_REFRESH_MARGIN = 60 * 1000; // Refresh 1 minute before expiration

const getTokenExpiry = (token: string): number => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // Convert to milliseconds
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error parsing token:", error.message);
    } else {
      console.error("Error parsing token:", error);
    }
    // If token is not a JWT or parsing fails, set a default expiry (e.g., 1 hour from now)
    return Date.now() + 60 * 60 * 1000;

  }
};

export const getAccessToken = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  // Try to get from cookie
  const cookieMatch = document.cookie.match(new RegExp(`(^| )${TOKEN_STORAGE_KEY}=([^;]+)`));
  if (cookieMatch) return cookieMatch[2];
  
  return null;
};

const saveToken = (token: string): void => {
  if (typeof document === 'undefined') return;
  
  const expiry = getTokenExpiry(token);
  document.cookie = `${TOKEN_STORAGE_KEY}=${token}; path=/; secure; `;
  document.cookie = `${TOKEN_EXPIRY_KEY}=${expiry}; path=/; secure; `;
};

export const auth_api = async (API_KEY:string,APP_SECRET:string):Promise<boolean> =>{
    

        try {
           
            const response = await fetch(AUTH_URL, {  method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ apiKey: API_KEY, appSecret: APP_SECRET }),
        });
        
        const result = await response.json();

        const accessToken:string | undefined = result?.data?.[0]?.accessToken;
        if (!accessToken) {
          throw new Error("No access token received");
        }
    
        // Store token in a cookie
        saveToken(accessToken);
        
        console.log("Login successful, token stored in cookie");
        return true;
        } catch (error) {
            console.error("Error during login:", error); 
            return false;
        }
    

}



export const refreshToken = async (APP_SECRET: string): Promise<string | null> => {
    try {
      const currentToken = getAccessToken();
      if (!currentToken) {
        throw new Error("No token available to refresh");
      }

      const response = await fetch(REFRESH_TOKEN_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentToken}`  // Add Bearer authentication

          
        },
        body: JSON.stringify({ appSecret: APP_SECRET }),
      });
  
      // Check if the response is successful
          // Handle unauthorized response
    if (response.status === 401) {
      // Clear invalid tokens
      document.cookie = `${TOKEN_STORAGE_KEY}=; path=/; max-age=0`;
      document.cookie = `${TOKEN_EXPIRY_KEY}=; path=/; max-age=0`;
      throw new Error("Session expired - Please reauthenticate");
    }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();

 // Adjusted response parsing based on typical JWT refresh patterns
    const newAccessToken = result?.access_token || result?.data?.accessToken;  
      if (!newAccessToken) {
        throw new Error("Failed to get new access token");
      }
  
      // Store the new token in a cookie or localStorage
      saveToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return null;
    }
  };

  export const isTokenExpired = (): boolean => {
    if (typeof document === 'undefined') return true;
    
    const cookieMatch = document.cookie.match(new RegExp(`(^| )${TOKEN_EXPIRY_KEY}=([^;]+)`));
    if (!cookieMatch) return true;
    
    const expiry = parseInt(cookieMatch[2], 10);
    return Date.now() + TOKEN_REFRESH_MARGIN > expiry;
  };

  export const ensureValidToken = async (APP_SECRET: string): Promise<string | null> => {
    const currentToken = getAccessToken();
    
    if (!currentToken || isTokenExpired()) {
      console.log("Token expired or missing, refreshing...");
      return await refreshToken(APP_SECRET);
    }
    
    return currentToken;
  };

// Code below is for fetching apis with token
  // export const fetchWithToken = async (url: string, options: RequestInit = {}, APP_SECRET: string): Promise<Response> => {
  //   const token = await ensureValidToken(APP_SECRET);
    
  //   if (!token) {
  //     throw new Error("Unable to obtain valid token");
  //   }
    
  //   // Add authorization header
  //   const headers = {
  //     ...options.headers,
  //     Authorization: `Bearer ${token}`
  //   };
    
  //   return fetch(url, { ...options, headers });
  // };

// export const logout = async () =>{ 
//     try {
//         await axios.post(LOGOUT_URL,{},{withCredentials:true});
//     return true
//     } catch (error) {
//         console.error("Failed to logout:", error.message); 
//         return { success: false, message: error.message };     }
    
//  }

//  export const isAuthenticated = async () => {
//     try {
//         // Sending POST request to the authentication endpoint with credentials
//         await axios.post(Authenticated_URL, {}, { withCredentials: true });
//         return true;
//     } catch (error) {
//         if (error.response) {
         
//             console.error("Error Response:", error.response);
//             console.error("Error Status:", error.response.status);
//             console.error("Error Data:", error.response.data);
//             return false;
//         } else if (error.request) {
//             console.error("Error Request:", error.request);
//             return false;
//         } else {
//             console.error("Error Message:", error.message);
//             return false;
//         }
//     }
// };

// export const register_api = async (first_name,username,email,password) =>{
//     try{

//         const response = await axios.post(Register_URL,{first_name:first_name, username:username,email:email,password:password},{withCredentials:true})
//         if (response.status === 201){
//             return response.data}

//     }catch (error){
//         console.error("Error during registration:", error);
//         return false;
//     }
// }