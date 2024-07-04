import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InYouUsers',
  description: 'Created Using Next.js 14 and Next UI',
  appleWebApp: {
    title: 'InYouUsers',
    statusBarStyle: 'default'
  }
};

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextUIProvider>
          <NextThemesProvider attribute='class' defaultTheme='black'>
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
