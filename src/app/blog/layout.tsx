import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical advice for Kootenay businesses navigating the digital world. No jargon. No fluff. Just what works.',
  openGraph: {
    title: 'Blog | Kootenay Made Digital',
    description: 'Practical digital advice for Kootenay businesses.',
    images: [{ url: '/images/og/blog.png', width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
