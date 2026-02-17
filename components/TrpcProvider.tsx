"use client";

import { httpBatchLink } from '@trpc/client';
import { trpc, getBaseUrl } from '@/lib/trpc'; 
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}