import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Website Audit',
  description: 'Get a free 30-minute website audit for your Kootenay business. Performance, SEO, and design review — no obligation.',
  alternates: { canonical: '/audit' },
  openGraph: {
    title: 'Free Website Audit | Kootenay Made Digital',
    description: 'Is your website working as hard as you are? Find out in 30 minutes — completely free.',
    url: 'https://kootenaymade.ca/audit',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
