'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Mountain } from 'lucide-react';

function TripleClickLogo() {
  const clickCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const [toast, setToast] = useState(false);

  const handleClick = useCallback(() => {
    clickCount.current++;
    if (timer.current) clearTimeout(timer.current);
    if (clickCount.current >= 3) {
      clickCount.current = 0;
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } else {
      timer.current = setTimeout(() => { clickCount.current = 0; }, 500);
    }
  }, []);

  return (
    <div className="relative">
      <div onClick={handleClick} className="cursor-pointer">
        <Image
          src="/brand/kmd-stacked-nobg.png"
          alt="Kootenay Made Digital"
          width={160}
          height={80}
          className="h-16 w-auto mb-4 brightness-[1.5]"
        />
      </div>
      {toast && (
        <div
          className="absolute -top-10 left-0 bg-copper text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap animate-fade-in-out"
          style={{ animation: 'fade-in-out 3s ease forwards' }}
        >
          You found the secret trail! 🐾
        </div>
      )}
    </div>
  );
}

function EndOfTrail() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      setVisible(scrollBottom >= docHeight - 2);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="text-center py-3 text-dark-text-muted/40 text-xs">
      You&apos;ve reached the end of the trail. 🏕️
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Vancouver',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setTime(now);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="text-dark-text-muted/60 text-xs">
      Currently {time} in Castlegar
    </span>
  );
}

function BackToSummit() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group flex items-center gap-2 text-dark-text-muted hover:text-copper transition-colors text-xs uppercase tracking-wider"
      aria-label="Back to top"
    >
      <Mountain size={14} className="transition-transform duration-300 group-hover:-translate-y-1" />
      Back to summit
    </button>
  );
}

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/styles', label: 'Styles' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/audit', label: 'Free Audit' },
];

export default function Footer() {
  return (
    <footer className="bg-slate text-dark-text relative overflow-hidden starfield">
      {/* Shooting stars */}
      <div className="shooting-star shooting-star-1" aria-hidden="true" />
      <div className="shooting-star shooting-star-2" aria-hidden="true" />
      <div className="shooting-star shooting-star-3" aria-hidden="true" />

      {/* Ember particles */}
      <div className="ember ember-1" aria-hidden="true" />
      <div className="ember ember-2" aria-hidden="true" />
      <div className="ember ember-3" aria-hidden="true" />
      <div className="ember ember-4" aria-hidden="true" />
      <div className="ember ember-5" aria-hidden="true" />
      <div className="ember ember-6" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div>
            <TripleClickLogo />
            <p className="text-dark-text-muted text-sm leading-relaxed max-w-xs">
              Locally crafted digital. Modern websites, brands, and marketing for West Kootenay businesses.
            </p>
            <div className="mt-4">
              <LiveClock />
            </div>
          </div>

          {/* Navigate column */}
          <div>
            <h3 className="font-[family-name:var(--font-satoshi)] font-semibold text-sm uppercase tracking-wider mb-4 text-dark-text-muted">Navigate</h3>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-dark-text-muted hover:text-cream transition-colors text-sm group relative inline-block w-fit"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-copper transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-[family-name:var(--font-satoshi)] font-semibold text-sm uppercase tracking-wider mb-4 text-dark-text-muted">Get in Touch</h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@kootenaymade.ca" className="flex items-center gap-2 text-dark-text-muted hover:text-cream transition-colors text-sm group">
                <Mail size={16} className="text-copper" />
                <span className="relative">
                  hello@kootenaymade.ca
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-copper transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
              <div className="flex items-center gap-2 text-dark-text-muted text-sm">
                <MapPin size={16} className="text-copper" />
                Castlegar, BC, Canada
              </div>
            </div>
            <div className="mt-8">
              <BackToSummit />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-text-muted text-xs">
            &copy; {new Date().getFullYear()} Kootenay Made Digital. All rights reserved.
          </p>
          <p className="text-dark-text-muted/70 text-sm font-mono tracking-wide">
            49.3&deg;N, 117.7&deg;W &mdash; Proudly built in the West Kootenays
          </p>
        </div>
      </div>
      <EndOfTrail />
    </footer>
  );
}
