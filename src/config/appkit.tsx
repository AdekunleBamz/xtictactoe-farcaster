'use client';

import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { base } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '';

if (!projectId) {
  console.warn('NEXT_PUBLIC_REOWN_PROJECT_ID is not set');
}

const chains = [base] as const;

const metadata = {
  name: 'xTicTacToe',
  description: 'Play xTicTacToe on Base',
  url: 'https://xtictactoe.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const wagmiAdapter = new WagmiAdapter({
  networks: chains,
  projectId,
  ssr: true,
});

const queryClient = new QueryClient();

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: chains,
  defaultNetwork: base,
  metadata,
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#ba8c52',
    '--w3m-border-radius-master': '8px',
  },
  allowUnsupportedChain: false,
  enableNetworkView: false,
  enableOnramp: false,
});

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
