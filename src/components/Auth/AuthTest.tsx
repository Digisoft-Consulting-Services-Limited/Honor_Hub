// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth_api, ensureValidToken } from "@/services/Auth/Auth";
// import { env } from "@/utils/env.config";
// import Homepage_Navbar from "../home/homepage_navbar";

// const AuthTest = () => {
//   const [authStatus, setAuthStatus] = useState<string>("Initializing...");
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const navigate = useNavigate();

//   // Unified authentication handler
//   const handleAuthentication = async (isRetry = false) => {
//     setIsLoading(true);
//     setAuthStatus(isRetry ? "Attempting recovery..." : "Authenticating...");

//     try {
//       const { API_KEY, APP_SECRET } = env;
      
//       // Validate environment configuration
//       if (!API_KEY || !APP_SECRET) {
//         throw new Error("Missing required environment configuration");
//       }

//       // Attempt to get valid token (new or refreshed)
//       const validToken = await ensureValidToken(APP_SECRET);
      
//       if (validToken) {
//         handleAuthSuccess("Session restored successfully");
//         return;
//       }

//       // Fallback to full authentication if no token available
//       const success = await auth_api(API_KEY, APP_SECRET);
      
//       if (success) {
//         handleAuthSuccess("Authenticated successfully");
//       } else {
//         throw new Error("Authentication failed with valid credentials");
//       }
//     } catch (error) {
//       handleAuthError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAuthSuccess = (message: string) => {
//     setAuthStatus(message);
//     navigate("/home");
//     // Consider adding a small delay before navigation if needed
//   };

//   const handleAuthError = (error: unknown) => {
//     const errorMessage = error instanceof Error 
//       ? error.message 
//       : "Unknown authentication error";
    
//     console.error("Authentication Error:", error);
//     setAuthStatus(`Error: ${errorMessage}`);
//   };

//   useEffect(() => {
//     handleAuthentication();
//   }, []);

//   return (
//     <>
//       <Homepage_Navbar name="Guest" imageUrl="path/to/image.jpg" />
//       <div className="p-4">
//         <h2 className="text-2xl font-bold mb-4">Authentication Status</h2>
//         <div className="space-y-4">
//           <div className="flex items-center gap-2">
//             {isLoading && (
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
//             )}
//             <p className="text-gray-800">{authStatus}</p>
//           </div>

//           {authStatus.startsWith("Error") && (
//             <button
//               onClick={() => handleAuthentication(true)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
//               disabled={isLoading}
//             >
//               {isLoading ? "Processing..." : "Retry Authentication"}
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AuthTest;