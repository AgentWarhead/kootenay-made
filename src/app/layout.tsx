import type { Metadata } from 'next';
import LayoutShell from '@/components/LayoutShell';
import GameHintBubble from '@/components/GameHintBubble';
import GoldenHourScroll from '@/components/GoldenHourScroll';

import AmbientSound from '@/components/AmbientSound';
import SeasonalTheme from '@/components/SeasonalTheme';
import SeasonalParticles from '@/components/SeasonalParticles';
import KonamiCode from '@/components/KonamiCode';
import RouteProgress from '@/components/RouteProgress';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kootenay Made Digital — Locally Crafted Digital',
    template: '%s | Kootenay Made Digital',
  },
  description: 'Modern websites, brands, and marketing for West Kootenay businesses. Based in Castlegar, BC. Websites from $1,500.',
  metadataBase: new URL('https://kootenaymade.ca'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Kootenay Made Digital — Locally Crafted Digital',
    description: 'Modern websites, brands, and marketing for West Kootenay businesses. Based in Castlegar, BC.',
    url: 'https://kootenaymade.ca',
    siteName: 'Kootenay Made Digital',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: '/images/og/default.png', width: 1200, height: 630, alt: 'Kootenay Made Digital' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kootenay Made Digital — Locally Crafted Digital',
    description: 'Modern websites, brands, and marketing for West Kootenay businesses.',
    images: ['/images/og/default.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: { index: true, follow: true },
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
        <GoldenHourScroll />
        <LayoutShell>
          {children}
        </LayoutShell>
        <AmbientSound />
        <SeasonalTheme />
        <SeasonalParticles />
        <KonamiCode />
        <RouteProgress />
        <GameHintBubble />
        {/* Easter egg console message */}
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("%c" +
"        /\\\\\\n" +
"       /  \\\\\\n" +
"      / ❄️ \\\\\\n" +
"     /      \\\\\\n" +
"    /  /\\\\    \\\\\\n" +
"   /  /  \\\\    \\\\\\n" +
"  /  /    \\\\    \\\\\\n" +
" /__/ KMD  \\\\____\\\\\\n" +
" ~~~~~~~~~~~~~~~~\\n" +
"\\n" +
" 🏔️ KOOTENAY MADE DIGITAL\\n" +
" Locally crafted in Castlegar, BC\\n" +
" hello@kootenaymade.ca\\n" +
"\\n" +
" Built with Next.js, Framer Motion & ☕\\n" +
" Looking for work? We\\'re hiring.\\n",
"color: #C17817; font-family: monospace; font-size: 11px; line-height: 1.3;");`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://kootenaymade.ca',
              name: 'Kootenay Made Digital',
              description: 'Modern websites, brands, and marketing for West Kootenay businesses. Based in Castlegar, BC.',
              url: 'https://kootenaymade.ca',
              email: 'hello@kootenaymade.ca',
              foundingDate: '2026',
              areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: { '@type': 'GeoCoordinates', latitude: 49.3, longitude: -117.6 },
                geoRadius: '100000',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Castlegar',
                addressRegion: 'BC',
                addressCountry: 'CA',
              },
              sameAs: [],
              priceRange: '$$',
              serviceType: ['Web Design', 'Brand Design', 'Digital Marketing', 'SEO', 'E-Commerce'],
            }),
          }}
        />
      </body>
    </html>
  );
}
