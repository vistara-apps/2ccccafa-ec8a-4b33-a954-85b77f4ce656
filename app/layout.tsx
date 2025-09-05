import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RightNow Guides - Instantly know your rights, every time',
  description: 'A mobile-first application that provides instant, location-aware legal rights information and real-time guidance during high-stress encounters.',
  keywords: 'legal rights, law enforcement, civil rights, legal guidance, mobile app',
  authors: [{ name: 'RightNow Guides Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
