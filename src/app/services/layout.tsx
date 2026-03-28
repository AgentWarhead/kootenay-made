import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description: 'Web design, branding, e-commerce, and digital marketing services for West Kootenay businesses. Transparent pricing from $500.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services & Pricing | Kootenay Made Digital',
    description: 'Web design, branding, e-commerce, and digital marketing. Transparent pricing from $500.',
    url: 'https://kootenaymade.ca/services',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
