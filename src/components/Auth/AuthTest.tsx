import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { auth_api } from "@/services/Auth/Auth"; // Adjust path if needed
import { env } from "@/utils/env.config";
import Homepage_Navbar from "../home/homepage_navbar";

const AuthTest = () => {
  const [authStatus, setAuthStatus] = useState<string>("Not tested");
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const testAuth = async () => {
      const API_KEY = env.API_KEY;
      const APP_SECRET = env.APP_SECRET;
      

      // Check if environment variables are set
      if (!API_KEY || !APP_SECRET ) {
        console.error("Missing API key or secret in environment variables.");
        setAuthStatus("Missing API key or secret");
        setIsLoading(false); // Stop loading
        return;
      }

      try {
        // Call the auth_api function
        const success = await auth_api(API_KEY, APP_SECRET);

        if (success) {
          setAuthStatus("Authenticated Successfully");
          navigate("/home"); // Navigate to homepage after successful authentication
        } else {
          setAuthStatus("Authentication Failed");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        setAuthStatus("Authentication Error");
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
      }
    };

    testAuth();
  }, [navigate]); // Add navigate to dependency array

  return (
    <>
    <Homepage_Navbar name="User Name" imageUrl="path/to/image.jpg" />
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Authenticating User</h2>
      {isLoading ? (
        <div className="flex flex-col items-center space-y-2">
          {/* Inline Spinner */}
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      ) : (
        <p className="text-gray-800">Status: {authStatus}</p>
      )}
    </div>
      </>
  );
};

export default AuthTest;