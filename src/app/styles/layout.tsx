import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Style Menu',
  description: 'Browse 8 curated website design styles for your business. From Clean & Professional to Adventure & Outdoors — find the one that fits.',
  alternates: { canonical: '/styles' },
  openGraph: {
    title: 'Style Menu | Kootenay Made Digital',
    description: 'Browse real design aesthetics — pick the one that feels like your business.',
    url: 'https://kootenaymade.ca/styles',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
