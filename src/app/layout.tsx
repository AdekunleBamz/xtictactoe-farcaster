import type { Metadata } from 'next';
import './globals.css';
import AppKitProviderWrapper from '@/components/AppKitProviderWrapper';

export const metadata: Metadata = {
  title: 'xTicTacToe',
  description: 'Play xTicTacToe with AI or compete for USDC prizes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppKitProviderWrapper>
          {children}
        </AppKitProviderWrapper>
      </body>
    </html>
  );
}
