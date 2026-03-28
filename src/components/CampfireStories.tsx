'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

interface Story {
  text: string;
  label: string;
}

/* ── Campfire flame SVG (animated CSS) ── */
function CampfireFlame() {
  return (
    <div className="flex justify-center mb-8" aria-hidden="true">
      <div className="relative w-16 h-20">
        {/* Logs */}
        <svg viewBox="0 0 64 20" className="absolute bottom-0 w-full">
          <rect x="8" y="8" width="48" height="6" rx="3" fill="#8B4513" opacity="0.6" transform="rotate(-8 32 11)" />
          <rect x="8" y="10" width="48" height="6" rx="3" fill="#6B3410" opacity="0.5" transform="rotate(6 32 13)" />
        </svg>
        {/* Flames */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="campfire-flame-outer" />
          <div className="campfire-flame-inner" />
          <div className="campfire-flame-core" />
        </div>
        {/* Sparks */}
        <div className="campfire-spark campfire-spark-1" />
        <div className="campfire-spark campfire-spark-2" />
        <div className="campfire-spark campfire-spark-3" />
      </div>
    </div>
  );
}

/* ── Smoke wisps ── */
function SmokeWisps() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
      <div className="campfire-smoke campfire-smoke-1" />
      <div className="campfire-smoke campfire-smoke-2" />
    </div>
  );
}

export default function CampfireStories({ stories }: { stories: Story[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIdx(prev => (prev + 1) % stories.length);
  }, [stories.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIdx(prev => (prev - 1 + stories.length) % stories.length);
  }, [stories.length]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const iv = setInterval(next, 6000);
    return () => clearInterval(iv);
  }, [next, currentIdx]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden campfire-bg">
      {/* Dark warm background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1208] via-[#1f160c] to-[#1a1208]" />
      
      {/* Warm radial glow from center-bottom (the fire) */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-amber-900/30 via-orange-900/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Stars in the sky */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full"
            style={{
              top: `${5 + (i * 7) % 40}%`,
              left: `${3 + (i * 13) % 94}%`,
              opacity: 0.2 + (i % 4) * 0.15,
              animation: `twinkle ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Pine tree silhouettes on edges */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[60px] sm:h-[80px]" fill="#0d0a05" opacity="0.5">
          <polygon points="0,100 15,40 30,100" />
          <polygon points="20,100 40,20 60,100" />
          <polygon points="70,100 85,50 100,100" />
          <polygon points="1340,100 1360,30 1380,100" />
          <polygon points="1370,100 1395,15 1420,100" />
          <polygon points="1410,100 1425,45 1440,100" />
        </svg>
      </div>

      <SmokeWisps />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <ScrollReveal>
          <p className="text-amber-500/80 font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">Around the Fire</p>
          <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold text-cream/90 mb-6">
            Campfire Stories
          </h2>
        </ScrollReveal>

        <CampfireFlame />

        {/* Story card — one at a time, clean transitions */}
        <div className="relative min-h-[180px] sm:min-h-[160px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIdx}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="px-2"
            >
              <div className="bg-[#2a1f12]/60 backdrop-blur-sm border border-amber-800/20 rounded-xl p-8 sm:p-10 shadow-[0_0_60px_rgba(217,119,6,0.08)]">
                <p className="text-cream/85 text-lg sm:text-xl leading-relaxed mb-5 font-[family-name:var(--font-general)]">
                  &ldquo;{stories[currentIdx].text}&rdquo;
                </p>
                <p className="text-amber-600/70 text-sm italic">— {stories[currentIdx].label}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation — arrow buttons + dots */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-amber-700/30 flex items-center justify-center text-amber-600/60 hover:text-amber-500 hover:border-amber-600/50 transition-colors"
            aria-label="Previous story"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-2">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIdx ? 1 : -1); setCurrentIdx(i); }}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIdx ? 'w-6 h-2 bg-amber-600' : 'w-2 h-2 bg-amber-800/40 hover:bg-amber-700/50'
                }`}
                aria-label={`Story ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-amber-700/30 flex items-center justify-center text-amber-600/60 hover:text-amber-500 hover:border-amber-600/50 transition-colors"
            aria-label="Next story"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-10">
            <Link href="/audit" className="inline-flex items-center gap-2 text-amber-500/80 hover:text-amber-400 font-medium group transition-colors">
              If any of these sound like you, let&apos;s talk. <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
