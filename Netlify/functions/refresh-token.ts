import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { env } from "../../src/utils/env.config";

const BASE_URL = env.BASE_URL;
const BASE_URL_VERSION = env.BASE_URL_VERSION;

interface RefreshRequestBody {
  refreshToken: string;
}
const REFRESH_TOKEN_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/refresh/`;

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface ApiError {
  error: string;
}


export const handler: Handler = async (event) => {
  try {
    const {APP_SECRET } = env;
    const { refreshToken } = JSON.parse(event.body || '') as RefreshRequestBody;

    if (!refreshToken) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing refresh token' }) };
    }

    const response = await fetch(REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`
      },
      body: JSON.stringify({
        appSecret: APP_SECRET
      })
    });

    const data = await response.json() as TokenResponse;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Refresh token error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Refresh failed' } as ApiError)
    };
  }
};