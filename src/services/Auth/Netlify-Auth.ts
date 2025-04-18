// import { TokenResponse, ApiError } from '../../../Netlify/functions/types';
import { TokenResponse } from '../../../Netlify/functions/types';
const TOKEN_REFRESH_MARGIN = 30000; // 30 seconds
const AUTH_URL = '/.netlify/functions/auth-proxy';
const REFRESH_URL = '/.netlify/functions/refresh-token';

class AuthManager {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiry: number | null = null;
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    this.initializeFromSession();
    this.setupAutoRefresh();
  }

  private initializeFromSession(): void {
    if (typeof window !== 'undefined') {
      this.accessToken = window.__NETLIFY_ACCESS_TOKEN__ || null;
      this.tokenExpiry = window.__NETLIFY_TOKEN_EXPIRY__ || null;
    }
  }

  public async getAccessToken(): Promise<string> {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry - TOKEN_REFRESH_MARGIN) {
      return this.accessToken;
    }

    if (!this.refreshToken) {
      return this.initializeGuestToken();
    }

    return this.refreshAccessToken();
  }

  private async initializeGuestToken(): Promise<string> {
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json() as TokenResponse;
      return this.handleNewTokens(data);
    } catch (error) {
      console.error('Guest token initialization failed:', error);
      throw error;
    }
  }

  private async refreshAccessToken(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        if (!this.refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await fetch(REFRESH_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ refreshToken: this.refreshToken })
        });

        const data = await response.json() as TokenResponse;
        return this.handleNewTokens(data);
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private handleNewTokens(data: TokenResponse): string {
    this.accessToken = data.accessToken;
    this.tokenExpiry = Date.now() + (data.expiresIn * 1000);
    
    if (data.refreshToken) {
      this.refreshToken = data.refreshToken;
    }

    if (typeof window !== 'undefined') {
      window.__NETLIFY_ACCESS_TOKEN__ = data.accessToken;
      window.__NETLIFY_TOKEN_EXPIRY__ = this.tokenExpiry;
    }

    return this.accessToken;
  }

  private setupAutoRefresh(): void {
    setInterval(async () => {
      if (this.tokenExpiry && Date.now() > this.tokenExpiry - TOKEN_REFRESH_MARGIN) {
        await this.refreshAccessToken();
      }
    }, 60000); // Check every minute

    if (typeof window !== 'undefined') {
      const originalFetch = window.fetch;
      
      window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const token = await this.getAccessToken();
        const headers = new Headers(init?.headers);
        headers.set('Authorization', `Bearer ${token}`);
        
        return originalFetch(input, {
          ...init,
          headers
        });
      };
    }
  }
}

export const authManager = new AuthManager();