import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Kootenay Made Digital. Based in Castlegar, BC — email hello@kootenaymade.ca or use our contact form.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Kootenay Made Digital',
    description: 'Get in touch — hello@kootenaymade.ca. Based in Castlegar, BC.',
    url: 'https://kootenaymade.ca/contact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
