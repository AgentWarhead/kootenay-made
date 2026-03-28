'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/styles', label: 'Styles' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Scroll progress integrated into nav
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setShowProgress(v > 0.01));
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  // Close mobile menu on route change
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
            ? 'bg-slate/80 backdrop-blur-xl shadow-lg'
            : 'bg-transparent backdrop-blur-sm'
        }`}
      >
        {/* Copper horizon line — visible when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent" />
        )}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className={`flex items-center justify-between transition-[height] duration-300 ease-out ${scrolled ? 'h-20' : 'h-24'}`}>
            {/* Logo with breathing animation */}
            <Link href="/" className="relative z-10 flex items-center">
              <Image
                src="/brand/kmd-horizontal-nobg.png"
                alt="Kootenay Made Digital"
                width={600}
                height={120}
                quality={100}
                unoptimized
                className={`w-auto transition-[height] duration-300 ease-out brightness-[1.5] logo-breathe ${scrolled ? 'h-8' : 'h-10'}`}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-[family-name:var(--font-satoshi)] text-sm font-medium tracking-wide transition-colors duration-300 py-1 group ${
                    isActive(link.href) ? 'text-copper' : 'text-dark-text-muted hover:text-cream'
                  }`}
                  style={{ textShadow: undefined }}
                  onMouseEnter={(e) => { e.currentTarget.style.textShadow = '0 0 8px rgba(193,120,23,0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.textShadow = 'none'; }}
                >
                  {link.label}
                  {/* Hover underline grows from center */}
                  {!isActive(link.href) && (
                    <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-copper/60 transition-all duration-300 -translate-x-1/2 group-hover:w-full" />
                  )}
                  {/* Active indicator — slides between items with spring physics */}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-copper"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              {/* Get Started CTA with pulse glow */}
              <Link
                href="/contact"
                className="bg-copper hover:bg-copper-light text-white text-sm font-medium px-6 py-3 rounded-xl border border-copper/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] pulse-glow"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-10 p-2 transition-colors text-cream"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Scroll progress bar — thin copper line at bottom of nav */}
        {showProgress && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] nav-progress-bar"
            style={{ scaleX }}
          />
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
                  className={`font-[family-name:var(--font-satoshi)] text-3xl font-bold transition-colors ${
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
                className="mt-4 bg-copper text-white text-lg font-medium px-8 py-3 rounded-lg pulse-glow"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
