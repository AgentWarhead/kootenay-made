import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical digital marketing and web design advice for Kootenay businesses. No jargon, no fluff — just what works.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Kootenay Made Digital',
    description: 'Practical advice for Kootenay businesses navigating the digital world.',
    url: 'https://kootenaymade.ca/blog',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
