import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  auth_api,
  // ensureValidToken,
  isTokenExpired,
  refreshToken,
  getAccessToken,
  TOKEN_STORAGE_KEY,
  TOKEN_EXPIRY_KEY
} from '@/services/Auth/Auth';
import { env } from '@/utils/env.config';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (apiKey: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuthState = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Check for existing token
      const currentToken = getAccessToken();
      
      if (!currentToken) {
        setIsAuthenticated(false);
        return;
      }
      
      // If token is expired, try to refresh
      if (isTokenExpired()) {
        console.log("Token expired, refreshing...");
        const newToken = await refreshToken(env.APP_SECRET);
        if (newToken) {
          console.log("Token refreshed successfully");
          setIsAuthenticated(true);
        } else {
          console.log("Failed to refresh token");
          setIsAuthenticated(false);
        }
      } else {
        // Token is valid
        setIsAuthenticated(true);
      }
      
      setError(null);
    } catch (err) {
      console.error("Auth check error:", err);
      setIsAuthenticated(false);
      setError(err instanceof Error ? err.message : 'Failed to validate session');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check initial auth state
    checkAuthState();
    
    // Set up token refresh timer - check more frequently
    const validateTokenInterval = setInterval(async () => {
      if (isTokenExpired()) {
        console.log("Token needs refreshing in interval check");
        await refreshToken(env.APP_SECRET);
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(validateTokenInterval);
  }, [checkAuthState]);

  const login = async (apiKey: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const success = await auth_api(apiKey, env.APP_SECRET);
      if (success) {
        setIsAuthenticated(true);
      } else {
        setError('Login failed - invalid credentials');
        setIsAuthenticated(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear authentication cookies
    document.cookie = `${TOKEN_STORAGE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `${TOKEN_EXPIRY_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      error,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};