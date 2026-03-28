import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import ScrollToTop from '@/components/ScrollToTop';
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
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
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
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          <Navigation />
          <main id="main-content" className="flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <ScrollToTop />
        </SmoothScroll>
        {/* Easter egg console message */}
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("%cBuilt with ❤️ in Castlegar, BC.%c\\nkootenaymade.ca", "color: #C17817; font-size: 14px; font-weight: bold;", "color: #9A9DA3; font-size: 12px;");`,
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
