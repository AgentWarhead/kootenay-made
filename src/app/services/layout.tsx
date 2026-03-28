import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description: 'Modern websites from $1,500. Full brand builds from $4,000. Transparent pricing for West Kootenay businesses.',
  openGraph: {
    title: 'Services & Pricing | Kootenay Made Digital',
    description: 'Modern websites from $1,500. Full brand builds from $4,000. Transparent pricing.',
    images: [{ url: '/images/og/services.png', width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
