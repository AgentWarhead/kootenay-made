import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Website Audit',
  description: 'Is your website working as hard as you are? Find out in 30 minutes — completely free. No sales pitch. No obligation.',
  openGraph: {
    title: 'Free Website Audit | Kootenay Made Digital',
    description: 'Is your website working as hard as you are? Find out in 30 minutes — free.',
    images: [{ url: '/images/og/audit.png', width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
