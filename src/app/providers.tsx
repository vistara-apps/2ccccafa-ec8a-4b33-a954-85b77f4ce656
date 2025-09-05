'use client';

import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'viem/chains';
import { http } from 'viem';
import { createConfig } from 'wagmi';
import { Toaster } from 'react-hot-toast';

// Wagmi configuration for Base chain
const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

// React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!privyAppId) {
    console.error('NEXT_PUBLIC_PRIVY_APP_ID is not set');
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-textPrimary">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
          <p className="text-textSecondary">
            Please set up your environment variables to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={privyAppId}
        config={{
          // Customize Privy's appearance
          appearance: {
            theme: 'dark',
            accentColor: '#3b82f6',
            logo: '/logo.png',
          },
          // Configure login methods
          loginMethods: ['wallet', 'email', 'sms'],
          // Configure supported wallets
          supportedChains: [base],
          // Embedded wallet configuration
          embeddedWallets: {
            createOnLogin: 'users-without-wallets',
            requireUserPasswordOnCreate: false,
          },
          // MFA configuration
          mfa: {
            noPromptOnMfaRequired: false,
          },
        }}
      >
        <WagmiProvider config={wagmiConfig}>
          {children}
          
          {/* Toast notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(230, 20%, 20%)',
                color: 'hsl(230, 20%, 90%)',
                border: '1px solid hsl(230, 20%, 30%)',
                borderRadius: '10px',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: 'white',
                },
              },
            }}
          />
        </WagmiProvider>
      </PrivyProvider>
    </QueryClientProvider>
  );
}
