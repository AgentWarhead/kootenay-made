import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kootenay Made Digital — Locally Crafted Digital',
  description: 'Modern websites, brands, and marketing for West Kootenay businesses. Based in Castlegar, BC.',
  metadataBase: new URL('https://kootenaymade.ca'),
  openGraph: {
    title: 'Kootenay Made Digital — Locally Crafted Digital',
    description: 'Modern websites, brands, and marketing for West Kootenay businesses.',
    url: 'https://kootenaymade.ca',
    siteName: 'Kootenay Made Digital',
    locale: 'en_CA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preload" href="/fonts/satoshi/Satoshi-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/general-sans/GeneralSans-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-general)]">
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
