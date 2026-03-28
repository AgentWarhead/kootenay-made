import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Styles',
  description: 'Browse 8 real design aesthetics — from Clean & Professional to Adventure & Outdoors. Pick the one that fits your business.',
  openGraph: {
    title: 'Design Styles | Kootenay Made Digital',
    description: 'Browse 8 design aesthetics. Pick the one that fits your business.',
    images: [{ url: '/images/og/styles.png', width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
