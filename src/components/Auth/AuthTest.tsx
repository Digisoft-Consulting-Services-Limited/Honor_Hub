import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth_api, ensureValidToken } from "@/services/Auth/Auth"; // Import the new token functions
import { env } from "@/utils/env.config";
import Homepage_Navbar from "../home/homepage_navbar";

const AuthTest = () => {
  const [authStatus, setAuthStatus] = useState<string>("Not tested");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const testAuth = async () => {
      const API_KEY = env.API_KEY;
      const APP_SECRET = env.APP_SECRET;

      // Check if environment variables are set
      if (!API_KEY || !APP_SECRET) {
        console.error("Missing API key or secret in environment variables.");
        setAuthStatus("Missing API key or secret");
        setIsLoading(false);
        return;
      }

      try {
        // Check if we already have a valid token
        const existingToken = await ensureValidToken(APP_SECRET);
        
        if (existingToken) {
          console.log("Using existing valid token");
          setAuthStatus("Authenticated with existing token");
          navigate("/home");
          return;
        }

        // If no valid token exists, perform full authentication
        const success = await auth_api(API_KEY, APP_SECRET);
        
        if (success) {
          setAuthStatus("Authenticated Successfully");
          navigate("/home");
        } else {
          setAuthStatus("Authentication Failed");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        setAuthStatus("Authentication Error");
      } finally {
        setIsLoading(false);
      }
    };

    testAuth();
  }, [navigate]);

  // Function to handle session recovery
  const handleSessionRecovery = async () => {
    setIsLoading(true);
    
    try {
      const APP_SECRET = env.APP_SECRET;
      if (!APP_SECRET) {
        throw new Error("Missing APP_SECRET");
      }
      
      const refreshedToken = await ensureValidToken(APP_SECRET);
      
      if (refreshedToken) {
        setAuthStatus("Session Recovered");
        navigate("/home");
      } else {
        setAuthStatus("Session Recovery Failed");
      }
    } catch (error) {
      console.error("Session recovery error:", error);
      setAuthStatus("Session Recovery Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Homepage_Navbar name="User Name" imageUrl="path/to/image.jpg" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Authenticating User</h2>
        {isLoading ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="text-gray-600">Authenticating...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-800">Status: {authStatus}</p>
            
            {authStatus === "Authentication Failed" || authStatus === "Session Recovery Failed" ? (
              <button
                onClick={handleSessionRecovery}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Try to Recover Session
              </button>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default AuthTest;