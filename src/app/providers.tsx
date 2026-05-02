'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { MemorialProvider } from '@/context/memorial/MemorialContext';
import { queryClient } from '@/lib/queryClient';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MemorialProvider>{children}</MemorialProvider>
    </QueryClientProvider>
  );
}
