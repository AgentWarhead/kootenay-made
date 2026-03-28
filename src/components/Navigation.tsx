'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-copper focus:text-white focus:px-4 focus:py-2 focus:rounded-md">
        Skip to content
      </a>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/80 backdrop-blur-xl shadow-sm border-b border-cream-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="relative z-10 flex items-center">
              <div className="logo-glow">
                <Image
                  src="/brand/kmd-horizontal-nobg.png"
                  alt="Kootenay Made Digital"
                  width={200}
                  height={40}
                  className="h-8 w-auto transition-all duration-300 brightness-[1.3]"
                  priority
                />
              </div>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-[family-name:var(--font-general)] text-sm font-medium transition-colors duration-300 group ${
                    scrolled ? 'text-text-secondary hover:text-slate' : 'text-dark-text-muted hover:text-cream'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-copper transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-copper hover:bg-copper-light text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden relative z-10 p-2 transition-colors ${mobileOpen ? 'text-cream' : scrolled ? 'text-slate' : 'text-cream'}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay — full-screen dark with staggered reveals */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-slate flex flex-col items-center justify-center gap-6 overflow-hidden"
          >
            {/* Mountain silhouette background */}
            <div className="absolute bottom-0 left-0 right-0 opacity-5">
              <svg viewBox="0 0 1200 300" className="w-full" fill="#C17817">
                <path d="M0,300 L200,100 L350,180 L500,50 L650,160 L800,80 L950,200 L1100,60 L1200,150 L1200,300 Z" />
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
                  className="font-[family-name:var(--font-satoshi)] text-3xl font-bold text-cream hover:text-copper transition-colors"
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
                className="mt-4 bg-copper text-white text-lg font-medium px-8 py-3 rounded-lg"
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
