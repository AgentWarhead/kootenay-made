import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'See how Kootenay Made Digital has helped local businesses transform their online presence. Real results for real businesses.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio | Kootenay Made Digital',
    description: 'Real results for real West Kootenay businesses.',
    url: 'https://kootenaymade.ca/portfolio',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
