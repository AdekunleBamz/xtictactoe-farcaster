'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiAdapter } from '@/lib/appkit';

const queryClient = new QueryClient();

const DynamicAppKitProvider = dynamic(
  () => import('@reown/appkit/react').then((mod) => mod.AppKitProvider),
  { ssr: false }
);

export default function AppKitProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <DynamicAppKitProvider>
          {children}
        </DynamicAppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
