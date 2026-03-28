'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDemo = pathname.startsWith('/styles/demos/');

  if (isDemo) {
    // Demo pages are self-contained — no KMD nav/footer
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main id="main-content" className="flex-1">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
