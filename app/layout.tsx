import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import ReduxProvider from './redux/provider';
import NavBarComponent from './components/NavBarComponent';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InYouUsers',
  description: 'Created Using Next.js 14 and Next UI',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  },
  appleWebApp: {
    title: 'InYouUsers',
    statusBarStyle: 'default'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>
          <NextUIProvider>
            <NextThemesProvider attribute='class' defaultTheme='light'>
              <NavBarComponent />
              <main>{children}</main>
            </NextThemesProvider>
          </NextUIProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
