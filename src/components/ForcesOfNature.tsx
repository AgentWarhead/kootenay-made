'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

/* ── Animated counter ── */
function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  inView,
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
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

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ── Card 1: Northern Lights — Aurora ── */
function AuroraCard({ inView }: { inView: boolean }) {
  return (
    <div className="fon-card group relative min-h-[350px] sm:min-h-[400px] rounded-2xl overflow-hidden border border-white/5">
      {/* Background image */}
      <Image
        src="/images/stats/aurora-bg.jpg"
        alt="Northern lights over Kootenay mountains"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Aurora bands */}
      <div
        className={`absolute inset-0 z-[2] transition-opacity duration-[2000ms] ${
          inView ? 'opacity-70' : 'opacity-30'
        }`}
      >
        <div className="aurora-band aurora-band-1" />
        <div className="aurora-band aurora-band-2" />
        <div className="aurora-band aurora-band-3" />
        <div className="aurora-band aurora-band-4" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-4">
        <span
          className="font-[family-name:var(--font-satoshi)] text-7xl sm:text-8xl font-bold aurora-text-fill"
        >
          <AnimatedCounter end={8} inView={inView} />
        </span>
        <p className="text-cream text-lg sm:text-xl mt-3 font-medium tracking-wide">
          Design Styles
        </p>
      </div>
    </div>
  );
}

/* ── Card 2: Snowfall ── */
function SnowfallCard({ inView }: { inView: boolean }) {
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 5,
        drift: -20 + Math.random() * 40,
        opacity: 0.4 + Math.random() * 0.6,
      })),
    []
  );

  return (
    <div className="fon-card group relative min-h-[350px] sm:min-h-[400px] rounded-2xl overflow-hidden border border-white/5">
      <Image
        src="/images/stats/snow-bg.jpg"
        alt="Snowy Kootenay mountain valley"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Snowflakes */}
      {inView && (
        <div className="absolute inset-0 z-[2] overflow-hidden">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="snowflake"
              style={
                {
                  left: flake.left,
                  width: `${flake.size}px`,
                  height: `${flake.size}px`,
                  opacity: flake.opacity,
                  animationDuration: `${flake.duration}s`,
                  animationDelay: `${flake.delay}s`,
                  '--snow-drift': `${flake.drift}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-4">
        <span className="font-[family-name:var(--font-satoshi)] text-7xl sm:text-8xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          <AnimatedCounter end={17} suffix="+" inView={inView} />
        </span>
        <p className="text-cream text-lg sm:text-xl mt-3 font-medium tracking-wide">
          Pages on This Site
        </p>
      </div>
    </div>
  );
}

/* ── Card 3: Forest Growth — Pine Tree SVG ── */
function ForestGrowthCard({ inView }: { inView: boolean }) {
  return (
    <div className="fon-card group relative min-h-[350px] sm:min-h-[400px] rounded-2xl overflow-hidden border border-white/5">
      <Image
        src="/images/stats/forest-bg.jpg"
        alt="Misty Kootenay forest at dusk"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-black/45 z-[1]" />

      {/* Growing tree SVG */}
      <div className="absolute inset-0 z-[2] flex items-end justify-center pb-6">
        <svg
          viewBox="0 0 200 280"
          className={`w-40 sm:w-48 h-auto tree-svg ${inView ? 'tree-grow' : ''}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Trunk */}
          <line
            x1="100"
            y1="280"
            x2="100"
            y2="60"
            stroke="#2D6A4F"
            strokeWidth="4"
            strokeLinecap="round"
            className="tree-trunk"
          />

          {/* Branches — left */}
          <line x1="100" y1="200" x2="60" y2="180" stroke="#2D6A4F" strokeWidth="2.5" className="tree-branch branch-1" />
          <line x1="100" y1="170" x2="50" y2="145" stroke="#2D6A4F" strokeWidth="2.5" className="tree-branch branch-2" />
          <line x1="100" y1="140" x2="55" y2="110" stroke="#2D6A4F" strokeWidth="2" className="tree-branch branch-3" />
          <line x1="100" y1="110" x2="65" y2="85" stroke="#2D6A4F" strokeWidth="2" className="tree-branch branch-4" />

          {/* Branches — right */}
          <line x1="100" y1="190" x2="140" y2="170" stroke="#2D6A4F" strokeWidth="2.5" className="tree-branch branch-5" />
          <line x1="100" y1="160" x2="150" y2="135" stroke="#2D6A4F" strokeWidth="2.5" className="tree-branch branch-6" />
          <line x1="100" y1="130" x2="145" y2="100" stroke="#2D6A4F" strokeWidth="2" className="tree-branch branch-7" />
          <line x1="100" y1="100" x2="135" y2="78" stroke="#2D6A4F" strokeWidth="2" className="tree-branch branch-8" />

          {/* Canopy needles */}
          <polygon points="100,40 80,75 120,75" fill="#2D6A4F" className="tree-needles needle-1" />
          <polygon points="100,55 70,95 130,95" fill="#2D6A4F" opacity="0.8" className="tree-needles needle-2" />
          <polygon points="100,75 65,120 135,120" fill="#2D6A4F" opacity="0.6" className="tree-needles needle-3" />

          {/* Week markers */}
          {[
            { cy: 240, label: 'W1' },
            { cy: 195, label: 'W2' },
            { cy: 150, label: 'W3' },
            { cy: 105, label: 'W4' },
          ].map((marker, i) => (
            <g key={marker.label} className={`tree-marker marker-${i + 1}`}>
              <circle cx="100" cy={marker.cy} r="10" fill="none" stroke="#C17817" strokeWidth="1.5" />
              <text
                x="100"
                y={marker.cy + 4}
                textAnchor="middle"
                fill="#C17817"
                fontSize="9"
                fontWeight="bold"
                fontFamily="var(--font-satoshi), system-ui, sans-serif"
              >
                {marker.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <span className="font-[family-name:var(--font-satoshi)] text-7xl sm:text-8xl font-bold text-forest-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            2-4
          </span>
        </motion.div>
        <p className="text-cream text-lg sm:text-xl mt-3 font-medium tracking-wide">
          Week Delivery
        </p>
      </div>
    </div>
  );
}

/* ── Card 4: Mountain Summit ── */
function MountainSummitCard({ inView }: { inView: boolean }) {
  return (
    <div className="fon-card group relative min-h-[350px] sm:min-h-[400px] rounded-2xl overflow-hidden border border-white/5">
      <Image
        src="/images/stats/mountain-bg.jpg"
        alt="Kootenay mountain summit at golden hour"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Mountain ridgeline SVG */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center">
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-auto max-w-md mountain-svg ${inView ? 'mountain-draw' : ''}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mountain ridgeline */}
          <polyline
            points="0,180 50,140 100,160 150,90 200,50 250,80 300,120 350,100 400,180"
            stroke="#C17817"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mountain-ridge"
          />

          {/* Summit flag */}
          <g className="summit-flag">
            {/* Flag pole */}
            <line x1="200" y1="50" x2="200" y2="15" stroke="#C17817" strokeWidth="2" />
            {/* Flag */}
            <polygon points="200,15 225,22 200,29" fill="#C17817" />
          </g>

          {/* Copper particles */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <circle
              key={i}
              cx="200"
              cy="15"
              r="2"
              fill="#C17817"
              className={`summit-particle particle-${i}`}
            />
          ))}
        </svg>
      </div>

      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <span className="font-[family-name:var(--font-satoshi)] text-7xl sm:text-8xl font-bold text-copper drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            <AnimatedCounter end={100} suffix="%" inView={inView} duration={2500} />
          </span>
        </motion.div>
        <p className="text-cream text-lg sm:text-xl mt-3 font-medium tracking-wide">
          Kootenay Made
        </p>
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

  const card1InView = useInView(card1Ref, { once: true, margin: '-80px' });
  const card2InView = useInView(card2Ref, { once: true, margin: '-80px' });
  const card3InView = useInView(card3Ref, { once: true, margin: '-80px' });
  const card4InView = useInView(card4Ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="bg-[#0f1114] relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-copper font-medium text-sm tracking-wider uppercase mb-3"
        >
          Forces of Nature
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight"
        >
          What We Bring to the Table
        </motion.h2>
      </div>

      {/* 2x2 Card grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div ref={card1Ref}>
          <AuroraCard inView={card1InView} />
        </div>
        <div ref={card2Ref}>
          <SnowfallCard inView={card2InView} />
        </div>
        <div ref={card3Ref}>
          <ForestGrowthCard inView={card3InView} />
        </div>
        <div ref={card4Ref}>
          <MountainSummitCard inView={card4InView} />
        </div>
      </div>

      {/* Closing tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 mt-12 text-copper italic text-center text-base sm:text-lg"
      >
        Every effect you just scrolled through? We built it. Imagine what we&apos;ll build for you.
      </motion.p>
    </section>
  );
}
