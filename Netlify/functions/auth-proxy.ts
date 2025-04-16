import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { env } from "../../src/utils/env.config";

const BASE_URL = env.BASE_URL;
const BASE_URL_VERSION = env.BASE_URL_VERSION;


const AUTH_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/`;
// const REFRESH_TOKEN_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/refresh/`;

interface AuthRequestBody {
  apiKey: string;
  appSecret: string;
}

interface ApiError {
  error: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export const handler: Handler = async () => {
  try {
    const { API_KEY, APP_SECRET } = env;
    
    if (!API_KEY || !APP_SECRET) {
      throw new Error('Missing environment variables');
    }

    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: API_KEY,
        appSecret: APP_SECRET
      } as AuthRequestBody)
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json() as TokenResponse;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://your-domain.com'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Authentication failed' } as ApiError)
    };
  }
};