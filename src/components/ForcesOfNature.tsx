'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
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
      {/* Gradient overlay — heavier at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-[1]" />
      
      {/* Aurora glow bands */}
      <div className={`absolute inset-0 z-[2] transition-opacity duration-[2000ms] ${inView ? 'opacity-60' : 'opacity-0'}`}>
        <div className="aurora-band aurora-band-1" />
        <div className="aurora-band aurora-band-2" />
        <div className="aurora-band aurora-band-3" />
      </div>

      {/* Content — bottom aligned */}
      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-end pb-10 sm:pb-12 text-center px-6">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 200 }}
          className="font-[family-name:var(--font-satoshi)] text-8xl sm:text-9xl font-black aurora-text-fill drop-shadow-[0_4px_20px_rgba(0,200,150,0.3)]"
        >
          <AnimatedCounter end={8} inView={inView} />
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-cream/90 text-xl sm:text-2xl mt-2 font-semibold tracking-wide font-[family-name:var(--font-satoshi)]"
        >
          Design Styles
        </motion.p>
      </div>
    </div>
  );
}

/* ── Card 2: Snowfall — '17+ Pages' ── */
function SnowfallCard({ inView }: { inView: boolean }) {
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
    <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group hover:-translate-y-1 transition-transform duration-300">
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
          className="font-[family-name:var(--font-satoshi)] text-8xl sm:text-9xl font-black text-white drop-shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
        >
          <AnimatedCounter end={17} suffix="+" inView={inView} />
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-cream/90 text-xl sm:text-2xl mt-2 font-semibold tracking-wide font-[family-name:var(--font-satoshi)]"
        >
          Pages on This Site
        </motion.p>
      </div>
    </div>
  );
}

/* ── Card 3: Forest Growth — '2-4 Week Delivery' ── */
function ForestGrowthCard({ inView }: { inView: boolean }) {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group hover:-translate-y-1 transition-transform duration-300">
      <Image src="/images/stats/forest-bg.webp" alt="Misty Kootenay forest" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/15 z-[1]" />

      {/* Growing tree — positioned top half so it doesn't compete with text */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-[2] w-32 sm:w-40">
        <svg viewBox="0 0 100 140" className={`w-full ${inView ? 'tree-grow' : ''}`} fill="none">
          {/* Trunk */}
          <line x1="50" y1="140" x2="50" y2="30" stroke="#40916C" strokeWidth="3" strokeLinecap="round" className="tree-trunk" />
          {/* Branches */}
          <line x1="50" y1="100" x2="25" y2="85" stroke="#40916C" strokeWidth="2" className="tree-branch branch-1" />
          <line x1="50" y1="100" x2="75" y2="85" stroke="#40916C" strokeWidth="2" className="tree-branch branch-2" />
          <line x1="50" y1="75" x2="20" y2="58" stroke="#40916C" strokeWidth="2" className="tree-branch branch-3" />
          <line x1="50" y1="75" x2="80" y2="58" stroke="#40916C" strokeWidth="2" className="tree-branch branch-4" />
          <line x1="50" y1="50" x2="30" y2="38" stroke="#40916C" strokeWidth="1.5" className="tree-branch branch-5" />
          <line x1="50" y1="50" x2="70" y2="38" stroke="#40916C" strokeWidth="1.5" className="tree-branch branch-6" />
          {/* Canopy */}
          <polygon points="50,10 30,45 70,45" fill="#2D6A4F" className="tree-needles needle-1" />
          <polygon points="50,25 25,65 75,65" fill="#2D6A4F" opacity="0.7" className="tree-needles needle-2" />
          <polygon points="50,45 20,90 80,90" fill="#2D6A4F" opacity="0.5" className="tree-needles needle-3" />
        </svg>
      </div>

      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-end pb-10 sm:pb-12 text-center px-6">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5, type: 'spring', stiffness: 200 }}
          className="font-[family-name:var(--font-satoshi)] text-8xl sm:text-9xl font-black text-forest-light drop-shadow-[0_4px_20px_rgba(45,106,79,0.4)]"
        >
          2-4
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2 }}
          className="text-cream/90 text-xl sm:text-2xl mt-2 font-semibold tracking-wide font-[family-name:var(--font-satoshi)]"
        >
          Week Delivery
        </motion.p>
      </div>
    </div>
  );
}

/* ── Card 4: Mountain Summit — '100% Kootenay Made' ── */
function MountainSummitCard({ inView }: { inView: boolean }) {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group hover:-translate-y-1 transition-transform duration-300">
      <Image src="/images/stats/mountain-bg.webp" alt="Kootenay mountain summit" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-[1]" />

      {/* Mountain ridgeline SVG — centered in card */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center px-8">
        <svg viewBox="0 0 400 160" className={`w-full max-w-sm ${inView ? 'mountain-draw' : ''}`} fill="none">
          {/* Bold ridgeline */}
          <polyline
            points="0,140 60,100 120,120 180,60 200,30 220,60 280,90 340,75 400,140"
            stroke="#C17817"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mountain-ridge"
          />
          {/* Summit flag */}
          <g className="summit-flag">
            <line x1="200" y1="30" x2="200" y2="5" stroke="#C17817" strokeWidth="2.5" />
            <polygon points="200,5 222,14 200,23" fill="#C17817" />
          </g>
          {/* Particles */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <circle key={i} cx="200" cy="5" r="2.5" fill="#C17817" className={`summit-particle particle-${i}`} />
          ))}
        </svg>
      </div>

      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-end pb-10 sm:pb-12 text-center px-6">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 2, type: 'spring', stiffness: 200 }}
          className="font-[family-name:var(--font-satoshi)] text-8xl sm:text-9xl font-black text-copper drop-shadow-[0_4px_20px_rgba(193,120,23,0.4)]"
        >
          <AnimatedCounter end={100} suffix="%" inView={inView} duration={2500} />
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5 }}
          className="text-cream/90 text-xl sm:text-2xl mt-2 font-semibold tracking-wide font-[family-name:var(--font-satoshi)]"
        >
          Kootenay Made
        </motion.p>
      </div>
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
      {/* Section header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 mb-12 sm:mb-16">
        <ScrollReveal>
          <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">Forces of Nature</p>
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

      {/* Closing tagline */}
      <ScrollReveal>
        <p className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 mt-10 sm:mt-14 text-copper/80 italic text-center text-base sm:text-lg font-[family-name:var(--font-general)]">
          Every effect you just scrolled through? We built it. Imagine what we&apos;ll build for you.
        </p>
      </ScrollReveal>
    </section>
  );
}
