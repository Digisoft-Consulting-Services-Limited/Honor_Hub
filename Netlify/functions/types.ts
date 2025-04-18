export interface TokenResponse {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
  }
  
  export interface ApiError {
    error: string;
    code: number;
  }
  
  declare global {
    interface Window {
      __NETLIFY_ACCESS_TOKEN__?: string;
      __NETLIFY_TOKEN_EXPIRY__?: number;
    }
  }