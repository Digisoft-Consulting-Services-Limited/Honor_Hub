import { env } from "@/utils/env.config";


const BASE_URL = env.BASE_URL
const BASE_URL_VERSION = env.BASE_URL_VERSION


const AUTH_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/`;
const REFRESH_TOKEN_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/refresh/`;
// const NOTES_URL = `${BASE_URL}notes/`;
// const LOGOUT_URL = `${BASE_URL}auth/logout/`;
// const Register_URL = `${BASE_URL}auth/register`;
// const Authenticated_URL = `${BASE_URL}auth/authenticated/`;

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
        document.cookie = `accessToken=${accessToken}; path=/; secure; `;
        
        console.log("Login successful, token stored in cookie");
        return true;
        } catch (error) {
            console.error("Error during login:", error); 
            return false;
        }
    

}



export const refreshToken = async (APP_SECRET: string): Promise<string | null> => {
    try {
      const response = await fetch(REFRESH_TOKEN_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appSecret: APP_SECRET }),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      const newAccessToken: string | undefined = result?.data?.[0]?.accessToken;
  
      if (!newAccessToken) {
        throw new Error("Failed to get new access token");
      }
  
      // Store the new token in a cookie or localStorage
      if (typeof document !== "undefined") {
        // Browser environment
        document.cookie = `accessToken=${newAccessToken}; path=/; secure; SameSite=Strict`;
        console.log("Access Token Refreshed and stored in cookie");
      } else {
        // Non-browser environment (e.g., Node.js)
        console.warn("Cannot set cookie in non-browser environment. Use localStorage or another method.");
      }
  
      console.log("New Access Token:", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return null;
    }
  };



// const callRefreshNotCalled = async (error, func) => {
//     if(error.response && error.response.status === 401) {
//         const token_refreshed =await refreshToken()
//             if (token_refreshed){
//                 const retry_response = await func()
//                 return retry_response.data
//             }
//     }
//     return false
// }


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