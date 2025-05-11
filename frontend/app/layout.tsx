import Header from '@/components/shared/header';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import './globals.css';
import ClientProvider from './provider/client-provider';
import { ThemeProvider } from './provider/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const onest = Onest({
  variable: '--font-onest',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
export const metadata: Metadata = {
  title: 'Chat with PDF',
  description: 'Chat with PDF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${onest.className} ${onest.variable} font-onest antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <ClientProvider>{children}</ClientProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
