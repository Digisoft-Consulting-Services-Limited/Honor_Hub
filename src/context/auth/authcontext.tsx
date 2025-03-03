import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  auth_api, 
  refreshToken, 
  ensureValidToken, 
  // getAccessToken, 
  // isTokenExpired,
  // TOKEN_STORAGE_KEY,
  // TOKEN_EXPIRY_KEY
} from '@/services/Auth/Auth'; // Adjust the import path as needed
import { env } from '@/utils/env.config';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (apiKey: string) => Promise<void>;
  // logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuthState = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = await ensureValidToken(env.APP_SECRET);
      setIsAuthenticated(!!token);
      setError(null);
    } catch (err) {
      setIsAuthenticated(false);
      setError(err instanceof Error ? err.message : 'Failed to validate session');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const validateTokenPeriodically = setInterval(checkAuthState, 300000); // 5 minutes
    
    // Initial check
    checkAuthState();
    
    return () => clearInterval(validateTokenPeriodically);
  }, [checkAuthState]);

  const login = async (apiKey: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const success = await auth_api(apiKey, env.APP_SECRET);
      if (success) {
        await checkAuthState();
      } else {
        setError('Login failed - invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // const logout = () => {
  //   // Clear authentication cookies
  //   document.cookie = `${TOKEN_STORAGE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  //   document.cookie = `${TOKEN_EXPIRY_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  //   setIsAuthenticated(false);
  //   setError(null);
  // };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      error, 
      login, 
      // logout 
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