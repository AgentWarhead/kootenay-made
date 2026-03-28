import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet the maker behind Kootenay Made Digital. Based in Castlegar, BC — building modern websites for West Kootenay businesses.',
  openGraph: {
    title: 'About | Kootenay Made Digital',
    description: 'Meet the maker behind Kootenay Made Digital.',
    images: [{ url: '/images/og/default.png', width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
