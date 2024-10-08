import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NextUiProvider from '@/providers/NextUiProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SolanaWalletProviders } from '@/providers/solana-providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUiProvider>
          <SolanaWalletProviders>
            <Header />
            <main>
              <div className="min-h-[calc(100vh-4rem-60px)]">{children}</div>
            </main>
            <Footer />
          </SolanaWalletProviders>
        </NextUiProvider>
      </body>
    </html>
  );
}
