'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

/* ── Compass SVG that slowly rotates with needle pointing to Home ── */
function SpinningCompass() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="mx-auto mb-8 w-24 h-24 relative"
    >
      {/* Outer ring rotates */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(193,120,23,0.3)" strokeWidth="1" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(193,120,23,0.15)" strokeWidth="0.5" />
          {/* Cardinal direction marks */}
          {[0, 90, 180, 270].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="6"
              x2="50"
              y2="14"
              stroke="#C17817"
              strokeWidth="1.5"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
          {/* Minor marks */}
          {[45, 135, 225, 315].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="8"
              x2="50"
              y2="12"
              stroke="rgba(193,120,23,0.4)"
              strokeWidth="0.5"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
        </svg>
      </motion.div>

      {/* Needle (stays pointing up — toward 'Home') */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* North (copper) */}
          <polygon points="50,18 46,50 54,50" fill="#C17817" />
          {/* South (dark) */}
          <polygon points="50,82 46,50 54,50" fill="rgba(248,244,240,0.3)" />
          {/* Center dot */}
          <circle cx="50" cy="50" r="3" fill="#C17817" />
        </svg>
      </div>

      {/* "HOME" label at top */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-copper tracking-widest z-20"
      >
        HOME
      </motion.span>
    </motion.div>
  );
}

/* ── Coordinate grid background ── */
function CoordinateGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-404" patternUnits="userSpaceOnUse" width="80" height="80">
            <path d="M80 0 L0 0 0 80" fill="none" stroke="#C17817" strokeWidth="0.5" />
          </pattern>
          <pattern id="topo-404" patternUnits="userSpaceOnUse" width="200" height="200">
            <path d="M0 100 Q50 70, 100 100 T200 100" fill="none" stroke="#C17817" strokeWidth="0.3" />
            <path d="M0 50 Q50 30, 100 55 T200 45" fill="none" stroke="#C17817" strokeWidth="0.2" />
            <path d="M0 150 Q50 130, 100 155 T200 145" fill="none" stroke="#C17817" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-404)" />
        <rect width="100%" height="100%" fill="url(#topo-404)" />
      </svg>
    </div>
  );
}

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen bg-slate relative flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/misc/404.png"
          alt="Lost in the mountains"
          fill
          className="object-cover opacity-30 sm:opacity-30 max-sm:opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate via-slate/60 to-slate/40 max-sm:from-slate/80 max-sm:via-slate/30 max-sm:to-slate/20" />
      </div>

      {/* Coordinate grid overlay */}
      <CoordinateGrid />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Spinning compass */}
        <SpinningCompass />

        {/* 404 with trail-sign flicker */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-8xl sm:text-9xl font-bold text-copper mb-4 trail-flicker"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-4"
        >
          Wrong turn on Highway 3.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-dark-text-muted text-lg mb-10 leading-relaxed"
        >
          Looks like you took a wrong turn on Highway 3. Don&apos;t worry — even the best trail runners miss a marker now and then. Let&apos;s get you back on trail.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft size={18} /> Back to Home Base
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-dark-text-muted/50 text-xs font-mono"
        >
          49.3°N, 117.7°W — You&apos;re closer to Castlegar than you think
        </motion.p>
      </div>
    </section>
  );
}
