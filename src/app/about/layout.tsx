import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Kootenay Made Digital is a web design agency based in Castlegar, BC. Founded in 2026, we build modern websites for West Kootenay businesses.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Kootenay Made Digital',
    description: 'A neighbour who happens to build great websites. Based in Castlegar, serving the West Kootenays.',
    url: 'https://kootenaymade.ca/about',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
