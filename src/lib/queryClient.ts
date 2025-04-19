// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';
 import { authManager } from '@/services/Auth/Netlify-Auth';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

queryClient.setDefaultOptions({
  queries: {
    queryFn: async ({ queryKey }) => {
      const token = await authManager.getAccessToken();
      const response = await fetch(queryKey[0] as string, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    },
  },
});