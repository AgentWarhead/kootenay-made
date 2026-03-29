'use client';

import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/styles', label: 'Styles' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/* ── Tiny pine tree separator ── */
function PineSeparator() {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" className="opacity-20 shrink-0" aria-hidden="true">
      <polygon points="3,0 6,4 5,4 6,7 0,7 1,4 0,4" fill="#C17817" />
      <rect x="2.5" y="7" width="1" height="3" fill="#C17817" />
    </svg>
  );
}

/* ── Mountain peak active indicator ── */
function MountainPeakIndicator() {
  return (
    <motion.span
      layoutId="nav-peak"
      className="absolute -bottom-2 left-1/2 -translate-x-1/2"
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    >
      <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
        <polygon points="5,0 10,6 0,6" fill="#C17817" />
      </svg>
    </motion.span>
  );
}

/* ── Mountain ridgeline bottom edge ── */
function MountainRidgeline({ scrolled }: { scrolled: boolean }) {
  return (
    <div className={`absolute -bottom-[9px] left-0 right-0 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
      <svg viewBox="0 0 1440 10" preserveAspectRatio="none" className="w-full h-[10px]">
        <path
          d="M0,10 L40,6 L80,8 L120,3 L160,7 L200,2 L240,6 L280,4 L320,8 L360,1 L400,5 L440,3 L480,7 L520,2 L560,6 L600,4 L640,8 L680,1 L720,5 L760,3 L800,7 L840,2 L880,6 L920,4 L960,8 L1000,1 L1040,5 L1080,3 L1120,7 L1160,2 L1200,6 L1240,4 L1280,8 L1320,3 L1360,6 L1400,2 L1440,5 L1440,10 L0,10 Z"
          fill="rgba(193,120,23,0.25)"
        />
      </svg>
    </div>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Scroll progress — direct tracking, no spring (prevents erratic jumping)
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const raw = Math.min(0.99, window.scrollY / docHeight);
        // Round to 2 decimals to prevent micro-oscillation layout thrashing
        const rounded = Math.round(raw * 100) / 100;
        setScrollProgress(rounded);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-copper focus:text-white focus:px-4 focus:py-2 focus:rounded-md">
        Skip to content
      </a>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ease-out ${
          scrolled
            ? 'bg-slate/90 backdrop-blur-xl shadow-lg'
            : 'bg-transparent backdrop-blur-sm'
        }`}
      >
        {/* Mountain ridgeline bottom edge — appears on scroll */}
        <MountainRidgeline scrolled={scrolled} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className={`flex items-center justify-between transition-[height] duration-300 ease-out ${scrolled ? 'h-16 sm:h-20' : 'h-20 sm:h-24'}`}>
            {/* Logo — big and bold with breathing animation */}
            <Link href="/" className="relative z-10 flex items-center shrink-0 mr-4 lg:mr-12">
              <Image
                src="/brand/kmd-horizontal-nobg.png"
                alt="Kootenay Made Digital"
                width={600}
                height={120}
                quality={100}
                unoptimized
                className={`transition-[width] duration-300 ease-out brightness-[1.5] logo-breathe ${scrolled ? 'w-[140px] sm:w-[160px] lg:w-[180px]' : 'w-[160px] sm:w-[180px] lg:w-[220px]'}`}
                style={{ height: 'auto' }}
                priority
              />
            </Link>

            {/* Desktop nav — bold uppercase with pine separators */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-0">
              {links.map((link, i) => (
                <Fragment key={link.href}>
                  {i > 0 && (
                    <div className="mx-1 xl:mx-2 hidden xl:block">
                      <PineSeparator />
                    </div>
                  )}
                  <Link
                    href={link.href}
                    className={`relative font-[family-name:var(--font-satoshi)] text-[11px] xl:text-[13px] font-semibold uppercase tracking-[0.1em] xl:tracking-[0.15em] transition-colors duration-300 py-1 group ${
                      isActive(link.href) ? 'text-copper' : 'text-cream/70 hover:text-cream'
                    }`}
                    onMouseEnter={(e) => { e.currentTarget.style.textShadow = '0 0 10px rgba(193,120,23,0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.textShadow = 'none'; }}
                  >
                    {link.label}
                    {/* Hover underline grows from center */}
                    {!isActive(link.href) && (
                      <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-copper/50 transition-all duration-300 -translate-x-1/2 group-hover:w-full" />
                    )}
                    {/* Active indicator — mountain peak slides between items */}
                    {isActive(link.href) && <MountainPeakIndicator />}
                  </Link>
                </Fragment>
              ))}
              {/* Get Started CTA */}
              <div className="ml-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white text-[11px] xl:text-[13px] font-semibold uppercase tracking-[0.1em] px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg border border-copper/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] pulse-glow group"
                >
                  Get Started
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-10 p-3 transition-colors text-cream"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Scroll progress — bear paw trail */}
        {scrollProgress > 0.005 && (
          <div className="absolute -bottom-[14px] left-0 right-0 h-[14px] overflow-hidden pointer-events-none">
            <div
              className="h-full flex items-center"
              style={{ width: `${scrollProgress * 100}%`, transition: 'width 60ms linear' }}
            >
              <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <pattern id="pawprint" x="0" y="0" width="36" height="14" patternUnits="userSpaceOnUse">
                    {/* Main pad */}
                    <ellipse cx="14" cy="9.5" rx="5" ry="3.5" fill="#C17817" opacity="0.55" />
                    {/* Toe beans */}
                    <circle cx="7" cy="4" r="2" fill="#C17817" opacity="0.5" />
                    <circle cx="12" cy="2" r="1.8" fill="#C17817" opacity="0.5" />
                    <circle cx="17" cy="2" r="1.8" fill="#C17817" opacity="0.5" />
                    <circle cx="22" cy="4" r="2" fill="#C17817" opacity="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pawprint)" />
              </svg>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile overlay — full-screen dark takeover with staggered reveals */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-slate flex flex-col items-center justify-center gap-6 overflow-hidden"
          >
            {/* Mountain silhouette at bottom */}
            <div className="absolute bottom-0 left-0 right-0 opacity-[0.04]">
              <svg viewBox="0 0 1200 300" className="w-full" fill="#C17817">
                <path d="M0,300 L100,180 L200,220 L350,80 L450,160 L500,50 L600,140 L700,90 L800,180 L900,60 L1000,150 L1100,100 L1200,200 L1200,300 Z" />
              </svg>
            </div>

            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold uppercase tracking-wide transition-colors py-2 px-4 min-h-[44px] flex items-center ${
                    isActive(link.href) ? 'text-copper' : 'text-cream hover:text-copper'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center gap-2 bg-copper text-white text-lg font-semibold uppercase tracking-wide px-8 py-3 rounded-lg pulse-glow"
              >
                Get Started <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
