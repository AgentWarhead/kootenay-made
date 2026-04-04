'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

/* ── Animated counter ── */
function AnimatedCounter({
  end,
  suffix = '',
  inView,
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  inView: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span>{count}{suffix}</span>;
}

/* ── Card 1: Northern Lights — '8 Design Styles' ── */
function AuroraCard({ inView }: { inView: boolean }) {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group hover:-translate-y-1 transition-transform duration-300">
      <Image src="/images/stats/aurora-bg.webp" alt="Northern lights" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      {/* Gradient overlay — lighter to let aurora shine */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-[1]" />

      {/* Aurora glow bands — cranked up */}
      <div className={`absolute inset-0 z-[2] transition-opacity duration-[1500ms] ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ mixBlendMode: 'screen' }}>
        <div className="aurora-band aurora-band-1" />
        <div className="aurora-band aurora-band-2" />
        <div className="aurora-band aurora-band-3" />
        <div className="aurora-band aurora-band-4" />
        {/* Extra shimmer overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(45,106,79,0.15) 30%, rgba(74,144,164,0.1) 60%, transparent 100%)',
          animation: 'aurora-shimmer 6s ease-in-out infinite',
        }} />
      </div>

      {/* Content — bottom aligned */}
      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-end pb-10 sm:pb-12 text-center px-6">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 200 }}
          className="font-[family-name:var(--font-satoshi)] text-6xl sm:text-8xl md:text-9xl font-black aurora-text-fill drop-shadow-[0_4px_20px_rgba(0,200,150,0.3)]"
        >
          <AnimatedCounter end={10} suffix="+" inView={inView} />
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-cream/90 text-xl sm:text-2xl mt-2 font-semibold tracking-wide font-[family-name:var(--font-satoshi)]"
        >
          Services, One Team
        </motion.p>
      </div>
    </div>
  );
}

/* ── Card 2: Snowfall — 'Under 3 Seconds' ── */
function SnowfallCard({ inView }: { inView: boolean }) {
  const [windX, setWindX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setWindX((x - 0.5) * 30); // ±15px
  }, []);

  const handleMouseLeave = useCallback(() => setWindX(0), []);

  const snowflakes = useMemo(
    () => Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 5,
      duration: 3 + Math.random() * 7,
      delay: Math.random() * 5,
      drift: -25 + Math.random() * 50,
      opacity: 0.3 + Math.random() * 0.7,
    })),
    []
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group hover:-translate-y-1 transition-transform duration-300"
    >
      <Image src="/images/stats/snow-bg.webp" alt="Snowy Kootenay night" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-[1]" />

      {/* Snowflakes */}
      {inView && (
        <div className="absolute inset-0 z-[2] overflow-hidden">
          {snowflakes.map((f) => (
            <div
              key={f.id}
              className="snowflake"
              style={{
                left: f.left,
                width: `${f.size}px`,
                height: `${f.size}px`,
                opacity: f.opacity,
                animationDuration: `${f.duration}s`,
                animationDelay: `${f.delay}s`,
                '--snow-drift': `${f.drift}px`,
                transform: `translateX(${windX * f.opacity}px)`,
                transition: 'transform 0.5s ease-out',
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-end pb-10 sm:pb-12 text-center px-6">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 200 }}
          className="font-[family-name:var(--font-satoshi)] text-6xl sm:text-8xl md:text-9xl font-black text-white drop-shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
        >
          AI
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-cream/90 text-xl sm:text-2xl mt-2 font-semibold tracking-wide font-[family-name:var(--font-satoshi)]"
        >
          Powered, Human Led
        </motion.p>
      </div>
    </div>
  );
}

/* ── Card 3: Forest Growth — '2-4 Week Delivery' ── */
function ForestGrowthCard({ inView }: { inView: boolean }) {
  const fireflies = useMemo(
    () => Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      size: 3 + Math.random() * 5,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 4,
      drift: -30 + Math.random() * 60,
    })),
    []
  );

  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group hover:-translate-y-1 transition-transform duration-300">
      <Image src="/images/stats/forest-bg.webp" alt="Misty Kootenay forest" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-[1]" />

      {/* Fireflies */}
      {inView && (
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          {fireflies.map((f) => (
            <div
              key={f.id}
              className="firefly"
              style={{
                left: f.left,
                width: `${f.size}px`,
                height: `${f.size}px`,
                animationDuration: `${f.duration}s`,
                animationDelay: `${f.delay}s`,
                '--firefly-drift': `${f.drift}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-end pb-10 sm:pb-12 text-center px-6">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 200 }}
          className="font-[family-name:var(--font-satoshi)] text-6xl sm:text-8xl md:text-9xl font-black text-forest-light drop-shadow-[0_4px_20px_rgba(45,106,79,0.4)]"
        >
          2-4
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2 }}
          className="text-cream/90 text-xl sm:text-2xl mt-2 font-semibold tracking-wide font-[family-name:var(--font-satoshi)]"
        >
          Weeks, Not Months
        </motion.p>
      </div>
    </div>
  );
}

/* ── Card 4: Mountain Summit — 'Kootenay Made' ── */
function MountainSummitCard({ inView }: { inView: boolean }) {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group hover:-translate-y-1 transition-transform duration-300">
      <Image src="/images/stats/mountain-bg.webp" alt="Kootenay mountain summit" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-[1]" />

      {/* Drifting clouds + sun glow */}
      {inView && (
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          <div className="mountain-cloud mountain-cloud-1" />
          <div className="mountain-cloud mountain-cloud-2" />
          <div className="mountain-cloud mountain-cloud-3" />
          {/* Sun/golden glow at horizon */}
          <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[120%] h-[40%]" style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(193,120,23,0.2) 0%, rgba(193,120,23,0.08) 40%, transparent 70%)',
            animation: 'mountain-glow 8s ease-in-out infinite',
          }} />
        </div>
      )}

      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-end pb-10 sm:pb-12 text-center px-6">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 2, type: 'spring', stiffness: 200 }}
          className="font-[family-name:var(--font-satoshi)] text-6xl sm:text-8xl md:text-9xl font-black text-copper drop-shadow-[0_4px_20px_rgba(193,120,23,0.4)]"
        >
          Your
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5 }}
          className="text-cream/90 text-xl sm:text-2xl mt-2 font-semibold tracking-wide font-[family-name:var(--font-satoshi)]"
        >
          Neighbour Builds It
        </motion.p>
      </div>
    </div>
  );
}

/* ── Typewriter closing tagline ── */
function TypewriterTagline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [displayText, setDisplayText] = useState('');
  const fullText = "Every effect you just scrolled through? We built it. Imagine what we'll build for you.";
  const hasTyped = useRef(false);

  useEffect(() => {
    if (!inView || hasTyped.current) return;
    hasTyped.current = true;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 mt-10 sm:mt-14 text-center">
      <p className="text-copper/80 italic text-base sm:text-lg font-[family-name:var(--font-general)] min-h-[2em]">
        {displayText}
        {displayText.length < fullText.length && inView && (
          <span className="typewriter-cursor" />
        )}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   FORCES OF NATURE — Main Section
   ══════════════════════════════════════════════ */
export default function ForcesOfNature() {
  const sectionRef = useRef<HTMLElement>(null);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  const card1InView = useInView(card1Ref, { once: true, margin: '-60px' });
  const card2InView = useInView(card2Ref, { once: true, margin: '-60px' });
  const card3InView = useInView(card3Ref, { once: true, margin: '-60px' });
  const card4InView = useInView(card4Ref, { once: true, margin: '-60px' });

  return (
    <section ref={sectionRef} className="bg-[#0a0c0e] relative py-20 sm:py-28 overflow-hidden">
      {/* Mountain ridge silhouette at top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none opacity-[0.07]">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px]">
          <path d="M0,60 L100,20 L200,45 L350,5 L500,35 L650,15 L800,40 L950,8 L1100,30 L1250,18 L1440,42 L1440,60 L0,60 Z" fill="#111315" />
        </svg>
      </div>
      {/* Warm radial glow behind cards */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(193,120,23,0.04) 0%, transparent 70%)' }} />

      {/* Section header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 mb-12 sm:mb-16">
        <ScrollReveal>
          <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-xs tracking-[0.15em] uppercase mb-3">Forces of Nature</p>
          <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            What We Bring to the Table
          </h2>
        </ScrollReveal>
      </div>

      {/* 2x2 Card grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <motion.div ref={card1Ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <AuroraCard inView={card1InView} />
        </motion.div>
        <motion.div ref={card2Ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
          <SnowfallCard inView={card2InView} />
        </motion.div>
        <motion.div ref={card3Ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <ForestGrowthCard inView={card3InView} />
        </motion.div>
        <motion.div ref={card4Ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.45 }}>
          <MountainSummitCard inView={card4InView} />
        </motion.div>
      </div>

      <TypewriterTagline />
    </section>
  );
}
