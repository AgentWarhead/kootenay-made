import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Real results for real Kootenay businesses. See our web design case studies from Trail, Nelson, Castlegar, and Rossland.',
  openGraph: {
    title: 'Portfolio | Kootenay Made Digital',
    description: 'Real results for real Kootenay businesses.',
    images: [{ url: '/images/og/portfolio.png', width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
