'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Globe, Palette, ShoppingBag, Mail, Bot, Search, ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import VideoSection from '@/components/VideoSection';
import MountainDivider from '@/components/MountainDivider';
import AmbientOrbs from '@/components/AmbientOrbs';
import PineTreeline from '@/components/PineTreeline';
import FogTransition from '@/components/FogTransition';

/* ── Typewriter ────────────────────────────── */
function Typewriter({ text, delay = 1.5 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(iv);
    }, 60);
    return () => clearInterval(iv);
  }, [started, text]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-copper ml-1 animate-pulse" />
    </span>
  );
}

/* ── Split Text Reveal ──────────────────────── */
function SplitText({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: 'easeOut' }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Infinite Marquee ──────────────────────── */
function Marquee() {
  const row1 = 'WEBSITES ◆ BRANDS ◆ MARKETING ◆ AI SETUP ◆ SEO ◆ E-COMMERCE ◆ EMAIL MARKETING ◆ KOOTENAY MADE ◆ ';
  const row2 = 'CASTLEGAR ⛰ TRAIL ⛰ NELSON ⛰ ROSSLAND ⛰ REVELSTOKE ⛰ FERNIE ⛰ CRANBROOK ⛰ ';

  return (
    <section className="bg-slate py-8 sm:py-10 overflow-hidden border-y border-white/5 space-y-4">
      <div className="marquee-row-left flex whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl font-bold tracking-wider mx-4"
            style={{
              background: 'linear-gradient(90deg, #C17817, #F8F4F0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {row1}
          </span>
        ))}
      </div>
      <div className="marquee-row-right flex whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl font-bold tracking-wider mx-4"
            style={{
              background: 'linear-gradient(90deg, #F8F4F0, #C17817)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {row2}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-row-left {
          animation: marquee-left 30s linear infinite;
        }
        .marquee-row-right {
          animation: marquee-right 35s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-row-left, .marquee-row-right { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ── Counter ────────────────────────────────── */
function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ── Floating shapes ───────────────────────── */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${15 + (i * 14) % 70}%`,
            left: `${5 + (i * 17) % 90}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {i % 2 === 0 ? (
            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-[0.06]">
              <polygon points="12,2 22,22 2,22" fill="#C17817" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" className="opacity-[0.06]">
              <circle cx="10" cy="10" r="8" fill="#C17817" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Services bento data ───────────────────── */
const services = [
  { icon: Globe, name: 'Modern Website', price: 'From $1,500', desc: 'Fast, responsive, built to convert.', large: true },
  { icon: Palette, name: 'Full Brand Build', price: 'From $4,000', desc: 'Logo, colors, voice, and full identity.', large: true },
  { icon: ShoppingBag, name: 'Shopify Store', price: 'From $3,000', desc: 'E-commerce that sells while you sleep.' },
  { icon: Mail, name: 'Email Marketing', price: 'From $750', desc: 'Automated flows that nurture and convert.' },
  { icon: Bot, name: 'AI Business Setup', price: '$1,500', desc: 'AI workflows, training, and 30-day support.' },
  { icon: Search, name: 'Google Domination', price: '$500', desc: 'Local SEO + Google Business Profile.' },
];

/* ── Style previews data ───────────────────── */
const styles = [
  { name: 'Clean & Professional', tags: ['Law', 'Accounting', 'Medical'], color: '#4A90A4', gradient: 'from-blue-500/20 to-blue-600/5' },
  { name: 'Bold & Modern', tags: ['Tech', 'Startups', 'Fitness'], color: '#F97316', gradient: 'from-orange-500/20 to-orange-600/5' },
  { name: 'Warm & Natural', tags: ['Wellness', 'Yoga', 'Therapy'], color: '#2D6A4F', gradient: 'from-green-500/20 to-green-600/5' },
  { name: 'Rustic Craft', tags: ['Breweries', 'Bakeries', 'Artisan'], color: '#9E6012', gradient: 'from-amber-500/20 to-amber-600/5' },
  { name: 'Sleek & Dark', tags: ['Restaurants', 'Bars', 'Luxury'], color: '#C9A96E', gradient: 'from-yellow-500/10 to-yellow-600/5' },
  { name: 'Bright & Playful', tags: ['Daycares', 'Pets', 'Retail'], color: '#8B5CF6', gradient: 'from-purple-500/20 to-purple-600/5' },
  { name: 'Editorial & Elegant', tags: ['Real Estate', 'Fashion', 'Salons'], color: '#B8860B', gradient: 'from-yellow-600/20 to-yellow-700/5' },
  { name: 'Adventure & Outdoors', tags: ['Tourism', 'Guides', 'Ski Resorts'], color: '#0EA5E9', gradient: 'from-sky-500/20 to-sky-600/5' },
];

/* ── Pain Points (replaces testimonials) ───── */
const painPoints = [
  { text: "I get all my work from word of mouth, but I know I'm leaving money on the table.", label: 'Every tradesperson in Trail' },
  { text: "My nephew built my website 5 years ago. I'm scared to touch it.", label: 'Restaurant owners everywhere' },
  { text: "I know I need to be on Google, I just don't know where to start.", label: 'Small businesses across the Kootenays' },
  { text: "My competitor just got a nice website and now I keep losing bids.", label: "Contractors who've been there" },
  { text: "I post on Facebook sometimes but I have no idea if it's working.", label: 'Every business owner, honestly' },
];

/* ── Kootenay Map ──────────────────────────── */
const towns = [
  { name: 'Castlegar', cx: 250, cy: 200, types: 'Local Services • Dining • Professional' },
  { name: 'Trail', cx: 300, cy: 320, types: 'Trades • Restaurants • Retail' },
  { name: 'Nelson', cx: 420, cy: 170, types: 'Wellness • Tourism • Arts' },
  { name: 'Rossland', cx: 160, cy: 290, types: 'Adventure • Hospitality • Outdoor Rec' },
];

const mapConnections = [
  [0, 1], [0, 2], [0, 3], [1, 3],
];

function KootenayMap() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 550 420" className="w-full h-auto" role="img" aria-label="West Kootenay towns map">
        {/* Connections */}
        {mapConnections.map(([a, b], i) => (
          <line
            key={i}
            x1={towns[a].cx} y1={towns[a].cy}
            x2={towns[b].cx} y2={towns[b].cy}
            stroke="#C17817"
            strokeWidth="1"
            strokeDasharray="6 4"
            opacity="0.3"
          />
        ))}

        {/* Mountain silhouettes background */}
        <path d="M0,380 L80,280 L130,330 L200,250 L270,310 L350,220 L430,290 L500,240 L550,300 L550,420 L0,420 Z" fill="#C17817" opacity="0.04" />

        {/* Town dots and labels */}
        {towns.map((town, i) => (
          <g
            key={town.name}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            {/* Glow */}
            <circle cx={town.cx} cy={town.cy} r={hovered === i ? 24 : 12} fill="#C17817" opacity={hovered === i ? 0.15 : 0.08} className="transition-all duration-300" />
            {/* Dot */}
            <circle cx={town.cx} cy={town.cy} r={hovered === i ? 8 : 5} fill="#C17817" className="transition-all duration-300" />
            {/* Label */}
            <text x={town.cx} y={town.cy - 18} textAnchor="middle" fill="#F8F4F0" fontSize="14" fontWeight="700" fontFamily="var(--font-satoshi)">
              {town.name}
            </text>

            {/* Tooltip */}
            {hovered === i && (
              <foreignObject x={town.cx - 110} y={town.cy + 14} width="220" height="60">
                <div className="bg-slate-card/95 backdrop-blur-sm border border-copper/20 rounded-lg px-3 py-2 text-center">
                  <p className="text-cream/70 text-xs leading-relaxed">{town.types}</p>
                </div>
              </foreignObject>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const [painIdx, setPainIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setPainIdx((p) => (p + 1) % painPoints.length), 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden aurora-bg">
        <div className="absolute inset-0 grain" />
        <PineTreeline />

        {/* Parallax mountain silhouettes */}
        <motion.div style={{ y: layer1Y }} className="absolute bottom-0 left-0 right-0 opacity-[0.08]">
          <svg viewBox="0 0 1440 320" className="w-full" preserveAspectRatio="none">
            <path d="M0,320 L120,200 L240,280 L360,120 L480,240 L600,100 L720,220 L840,60 L960,200 L1080,140 L1200,260 L1320,80 L1440,180 L1440,320 Z" fill="#C17817"/>
          </svg>
        </motion.div>
        <motion.div style={{ y: layer2Y }} className="absolute bottom-0 left-0 right-0 opacity-[0.05]">
          <svg viewBox="0 0 1440 280" className="w-full" preserveAspectRatio="none">
            <path d="M0,280 L180,140 L300,220 L480,80 L600,200 L780,120 L900,240 L1080,60 L1200,180 L1380,100 L1440,160 L1440,280 Z" fill="#4A90A4"/>
          </svg>
        </motion.div>
        <motion.div style={{ y: layer3Y }} className="absolute bottom-0 left-0 right-0 opacity-[0.03]">
          <svg viewBox="0 0 1440 240" className="w-full" preserveAspectRatio="none">
            <path d="M0,240 L200,100 L400,200 L600,60 L800,180 L1000,80 L1200,200 L1440,120 L1440,240 Z" fill="#2D6A4F"/>
          </svg>
        </motion.div>

        <FloatingShapes />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-32">
          <h1 className="font-[family-name:var(--font-satoshi)] text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-4xl">
            <SplitText text="Your Kootenay business deserves a digital presence as impressive as the mountains around it." />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-8 text-copper-light text-lg sm:text-xl font-medium h-8"
          >
            <Typewriter text="Locally crafted digital." delay={1.8} />
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="mt-4 text-dark-text-muted text-lg sm:text-xl max-w-2xl leading-relaxed"
          >
            Modern websites, brands, and marketing for West Kootenay businesses.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton as="a" href="/services">
              <span className="inline-flex items-center justify-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-base">
                See Our Services <ArrowRight size={18} />
              </span>
            </MagneticButton>
            <MagneticButton as="a" href="/audit">
              <span className="inline-flex items-center justify-center gap-2 border border-cream/20 text-cream hover:bg-cream/10 font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-base">
                Free Website Audit
              </span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-cream/40 text-xs tracking-widest uppercase">Explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="text-cream/40" size={28} />
          </motion.div>
        </motion.div>
      </section>

      <MountainDivider variant={1} fillColor="#1A1D20" />

      {/* ═══ MARQUEE ═══ */}
      <Marquee />

      <MountainDivider variant={2} fillColor="#F8F4F0" />

      {/* ═══ SERVICES BENTO ═══ */}
      <section className="bg-cream py-24 sm:py-32 cedar-texture relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-3">What We Build</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate leading-tight">
              Everything your business needs online.
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative glass-card-light rounded-2xl p-8 h-full"
                  style={{ perspective: '1000px' }}
                >
                  {/* Glassmorphism accent on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-copper/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-cream-dark flex items-center justify-center mb-5 group-hover:bg-copper/10 transition-colors">
                      <s.icon size={22} className="text-copper" />
                    </div>
                    <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate mb-2">{s.name}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">{s.desc}</p>
                    <p className="font-[family-name:var(--font-satoshi)] text-copper font-semibold text-sm">{s.price}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-8">
              <Link href="/services" className="inline-flex items-center gap-2 text-copper hover:text-copper-dark font-medium group transition-colors">
                View all services & pricing <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={3} fillColor="#1A1D20" />

      {/* ═══ STYLE MENU PREVIEW (horizontal scroll) ═══ */}
      <section className="bg-slate grain py-24 sm:py-32 overflow-hidden relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">Find Your Style</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight max-w-2xl">
              Browse design styles built for businesses like yours.
            </h2>
          </ScrollReveal>

          <div className="mt-16 flex gap-6 overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
            {styles.map((style, i) => (
              <ScrollReveal key={style.name} delay={i * 0.08}>
                <Link href="/styles" className="group">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="snap-start shrink-0 w-[70vw] sm:w-80 glass-card-dark rounded-2xl p-6"
                  >
                    <div className={`h-40 rounded-xl mb-5 bg-gradient-to-br ${style.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <span className="font-[family-name:var(--font-satoshi)] text-4xl font-bold opacity-30" style={{ color: style.color }}>
                        Aa
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-cream mb-3">{style.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {style.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-white/5 text-dark-text-muted px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <Link href="/styles" className="inline-flex items-center gap-2 text-copper-light hover:text-copper font-medium group transition-colors mt-4">
              Explore all styles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <FogTransition from="dark" />
      <section className="bg-slate relative py-24 sm:py-32 overflow-hidden">
        {/* Topographic pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo-stats" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M20,80 Q60,20 100,80 T180,80" fill="none" stroke="#C17817" strokeWidth="0.5"/>
              <path d="M10,120 Q50,60 100,120 T190,120" fill="none" stroke="#C17817" strokeWidth="0.5"/>
              <path d="M0,160 Q40,100 100,160 T200,160" fill="none" stroke="#C17817" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo-stats)" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { end: 17, suffix: '+', label: 'Pages on this site' },
              { end: 8, suffix: '', label: 'Design styles' },
              { end: 2, suffix: '-4', label: 'Weeks delivery' },
              { end: 100, suffix: '%', label: 'Kootenay Made' },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-mono text-5xl sm:text-6xl md:text-7xl font-bold text-copper">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="text-dark-text-muted text-sm mt-2">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" />

      {/* ═══ SOUND FAMILIAR? (Pain Points) ═══ */}
      <section className="bg-cream py-24 sm:py-32 relative overflow-hidden cedar-texture">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-3">Around the Fire</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold text-slate mb-16">
              Campfire Stories
            </h2>
          </ScrollReveal>

          <div className="relative min-h-[220px]">
            {painPoints.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i === painIdx ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ pointerEvents: i === painIdx ? 'auto' : 'none' }}
              >
                <div className="glass-card-light rounded-2xl p-8 sm:p-12 max-w-2xl">
                  <p className="text-slate text-lg sm:text-xl leading-relaxed mb-6">
                    {p.text}
                  </p>
                  <p className="text-text-secondary text-sm italic">— {p.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {painPoints.map((_, i) => (
              <button
                key={i}
                onClick={() => setPainIdx(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === painIdx ? 'bg-copper w-6' : 'bg-cream-border'}`}
              />
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-12">
              <Link href="/audit" className="inline-flex items-center gap-2 text-copper hover:text-copper-dark font-medium text-lg group transition-colors">
                If any of these sound like you, let&apos;s talk. <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ VIDEO BACKGROUND — KOOTENAY ROOTS ═══ */}
      <VideoSection />

      <MountainDivider variant={2} fillColor="#1A1D20" />

      {/* ═══ FINAL CTA ═══ */}
      <section className="aurora-bg grain py-24 sm:py-32 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight max-w-2xl mx-auto">
              Ready to stand out online?
            </h2>
            <p className="mt-6 text-dark-text-muted text-lg max-w-xl mx-auto leading-relaxed">
              Book a free website audit. No sales pitch — just honest insight from your neighbour.
            </p>
            <div className="mt-10">
              <MagneticButton as="a" href="/audit">
                <span className="inline-flex items-center justify-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-10 py-5 rounded-lg transition-colors duration-200 text-lg shadow-[0_0_30px_rgba(193,120,23,0.3)]">
                  Book Your Free Audit <ArrowRight size={20} />
                </span>
              </MagneticButton>
            </div>
            <p className="mt-8 text-dark-text-muted text-sm">
              Or reach us at{' '}
              <a href="mailto:hello@kootenaymade.ca" className="text-copper-light hover:text-copper transition-colors underline">
                hello@kootenaymade.ca
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
