import Header from '@/components/shared/header';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import ClientProvider from './provider/client-provider';
import { ThemeProvider } from './provider/theme-provider';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
        <body className={`${poppins.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <ClientProvider>{children}</ClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
