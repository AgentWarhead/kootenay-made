'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Palette, ShoppingBag, Mail, Bot, Search } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import RippleButton from '@/components/RippleButton';
import TiltCard from '@/components/TiltCard';
import CampfireStories from '@/components/CampfireStories';
import VideoSection from '@/components/VideoSection';
import MountainDivider from '@/components/MountainDivider';
import AmbientOrbs from '@/components/AmbientOrbs';
import PineTreeline from '@/components/PineTreeline';
import FogTransition from '@/components/FogTransition';
import ForcesOfNature from '@/components/ForcesOfNature';

/* ── Kootenay-themed floating shapes ───────── */
function FloatingShapes() {
  const shapes = [
    // Pine trees
    { type: 'pine', top: 18, left: 8 },
    { type: 'pine', top: 65, left: 85 },
    { type: 'pine', top: 40, left: 55 },
    // Mountain peaks
    { type: 'peak', top: 25, left: 30 },
    { type: 'peak', top: 72, left: 60 },
    // Snowflakes
    { type: 'snow', top: 12, left: 72 },
    { type: 'snow', top: 55, left: 15 },
    { type: 'snow', top: 35, left: 92 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          animate={{ y: [0, -15, 0], x: [0, 8, 0], rotate: [0, s.type === 'snow' ? 360 : 5, 0] }}
          transition={{ duration: 18 + i * 2.5, repeat: Infinity, ease: 'linear' }}
        >
          {s.type === 'pine' && (
            <svg width="18" height="28" viewBox="0 0 18 28" className="opacity-[0.05]">
              <polygon points="9,0 18,20 0,20" fill="#2D6A4F" />
              <rect x="7" y="20" width="4" height="8" fill="#2D6A4F" />
            </svg>
          )}
          {s.type === 'peak' && (
            <svg width="28" height="20" viewBox="0 0 28 20" className="opacity-[0.05]">
              <polygon points="14,0 28,20 0,20" fill="#C17817" />
            </svg>
          )}
          {s.type === 'snow' && (
            <svg width="16" height="16" viewBox="0 0 16 16" className="opacity-[0.05]">
              <line x1="8" y1="0" x2="8" y2="16" stroke="#F8F4F0" strokeWidth="1" />
              <line x1="0" y1="8" x2="16" y2="8" stroke="#F8F4F0" strokeWidth="1" />
              <line x1="2" y1="2" x2="14" y2="14" stroke="#F8F4F0" strokeWidth="0.8" />
              <line x1="14" y1="2" x2="2" y2="14" stroke="#F8F4F0" strokeWidth="0.8" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ── SVG Icon with stroke-draw animation ───── */
function DrawIcon({ Icon, inView }: { Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>; inView: boolean }) {
  return (
    <div className={`draw-icon ${inView ? 'draw-icon-animate' : ''}`}>
      <Icon size={22} className="text-copper" strokeWidth={1.5} />
    </div>
  );
}

/* ── Counter with staggered start + progress ring ── */
function CascadeCounter({ end, suffix = '', prefix = '', delay = 0 }: { end: number; suffix?: string; prefix?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const duration = 2000;
      const startTime = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.floor(eased * end));
        setProgress(eased * 100);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, end, delay]);

  const circumference = 2 * Math.PI * 36;
  const strokeOffset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      {/* Progress ring behind */}
      <div className="relative">
        <svg width="100" height="100" className="absolute inset-0 -top-2 -left-2 opacity-20" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="#C17817" strokeWidth="2" opacity="0.2" />
          <circle
            cx="40" cy="40" r="36" fill="none" stroke="#C17817" strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <p className="font-mono text-5xl sm:text-6xl md:text-7xl font-bold text-copper relative z-10">
          {prefix}{count}{suffix}
        </p>
      </div>
    </div>
  );
}

/* ── River scroll indicator ──────────────────── */
function RiverScroll() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
    >
      <span className="text-cream/40 text-xs tracking-[0.3em] uppercase">Explore</span>
      <svg width="20" height="48" viewBox="0 0 20 48" className="river-scroll-icon">
        <path
          d="M10 0 C10 0, 6 8, 10 16 C14 24, 6 32, 10 40 L10 48"
          fill="none"
          stroke="rgba(248,244,240,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
          className="river-path"
        />
        <circle cx="10" cy="4" r="2.5" fill="rgba(193,120,23,0.6)" className="river-dot" />
      </svg>
    </motion.div>
  );
}

/* ── Services bento data ───────────────────── */
const services = [
  { icon: Globe, name: 'Modern Website', price: 'From $1,500', desc: 'A website that works as hard as you do. Shows up on Google. Looks great on phones. Makes people call.', large: true },
  { icon: Palette, name: 'Full Brand Build', price: 'From $4,000', desc: 'Logo, colours, business cards, the works. Walk into any meeting looking like you\'ve been around for 20 years.', large: true },
  { icon: ShoppingBag, name: 'Shopify Store', price: 'From $3,000', desc: 'Sell online while you\'re out on the lake. Your store never closes.' },
  { icon: Mail, name: 'Email Marketing', price: 'From $750', desc: 'Stay in touch with customers without lifting a finger. Birthday discounts, follow-ups — all on autopilot.' },
  { icon: Bot, name: 'AI Business Setup', price: '$1,500', desc: 'The tools the big companies use, set up for your business. Save hours every week on the stuff you hate doing.' },
  { icon: Search, name: 'Google Domination', price: '$500', desc: 'When someone searches "plumber near me" or "best restaurant in Trail" — you show up.' },
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

/* ── Pain Points (campfire stories) ──────────── */
const painPoints = [
  { text: "I do great work — my customers always say so. I just wish more people could find me before they call someone else.", label: 'Contractors across the Kootenays' },
  { text: "I've been meaning to get a website for three years now. Just never know where to start.", label: 'Every tradesperson who\'s been too busy working' },
  { text: "Word of mouth has always been enough. But I know there's a whole group of people out there who don't know I exist yet.", label: 'Small business owners ready for the next step' },
  { text: "People keep asking if we're still open because they can't find our hours online.", label: 'Restaurant owners who\'ve heard this too many times' },
  { text: "We get tourists all summer but have no way to reach them before they arrive in town.", label: 'Tourism and hospitality businesses' },
  { text: "I know my business could reach more people. I just need someone to show me how.", label: 'Business owners ready for the next step' },
  { text: "My clients find me through friends, which is wonderful. But I'd love to reach the people who don't know anyone to ask.", label: 'Wellness practitioners and therapists' },
  { text: "I have a beautiful space and I'm proud of what I offer. I just wish my online presence matched.", label: 'Yoga studios, spas, and wellness centres' },
  { text: "I see people visiting shops in Nelson and Trail that aren't half as good as mine — but they have a great website.", label: 'Retailers ready to level the playing field' },
  { text: "I'd love to sell online but the whole Shopify thing feels overwhelming.", label: 'Shop owners eyeing e-commerce' },
  { text: "My competitor just got a really nice website and I've noticed I'm hearing from fewer new clients.", label: 'Professionals seeing the shift happen' },
  { text: "I know I need to be on Google but honestly, I don't know what that even means.", label: 'Business owners who are great at their craft, not at tech' },
  { text: "I spend all my energy running my business. I don't have time to figure out the internet too.", label: 'Every small business owner, honestly' },
  { text: "I want to start selling online but I don't know the first step.", label: 'Shop owners ready for e-commerce' },
  { text: "I just want to feel proud when someone asks for my website.", label: 'Everyone who\'s been embarrassed to share a link' },
];

/* ── Kootenay towns data ─────────────────────── */
const towns = [
  { name: 'Castlegar', cx: 250, cy: 200, types: 'Local Services • Dining • Professional' },
  { name: 'Trail', cx: 300, cy: 320, types: 'Trades • Restaurants • Retail' },
  { name: 'Nelson', cx: 420, cy: 170, types: 'Wellness • Tourism • Arts' },
  { name: 'Rossland', cx: 160, cy: 290, types: 'Adventure • Hospitality • Outdoor Rec' },
];

/* ── Marquee with gradient fades ─────────────── */
function Marquee() {
  const row1 = 'WEBSITES ◆ BRANDS ◆ MARKETING ◆ AI SETUP ◆ SEO ◆ E-COMMERCE ◆ EMAIL MARKETING ◆ KOOTENAY MADE ◆ ';
  const row2 = 'CASTLEGAR ⛰ TRAIL ⛰ NELSON ⛰ ROSSLAND ⛰ REVELSTOKE ⛰ FERNIE ⛰ CRANBROOK ⛰ ';

  return (
    <section className="bg-slate py-8 sm:py-10 overflow-hidden border-y border-white/5 space-y-4 relative">
      {/* Gradient fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-slate to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-slate to-transparent z-10 pointer-events-none" />

      <div className="marquee-row-fast-left flex whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider mx-4"
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
      <div className="marquee-row-fast-right flex whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider mx-4"
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
    </section>
  );
}

/* ── Style scroll drag hint ──────────────────── */
function DragHint() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDismissed(true), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2 text-cream/40 text-xs tracking-wider"
        >
          <motion.span animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            ← Drag
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  // Dramatic parallax — clearly different speeds
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Hero mask reveal
  const [heroRevealed, setHeroRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Bento section in-view for icon draw
  const bentoRef = useRef<HTMLDivElement>(null);
  const bentoInView = useInView(bentoRef, { once: true, margin: '-80px' });

  // Style scroll hint dismiss on interaction
  const styleScrollRef = useRef<HTMLDivElement>(null);
  const [styleInteracted, setStyleInteracted] = useState(false);
  const handleStyleScroll = useCallback(() => {
    if (!styleInteracted) setStyleInteracted(true);
  }, [styleInteracted]);

  return (
    <>
      {/* ═══ HERO — 'The Summit' ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden aurora-bg">
        <div className="absolute inset-0 grain" />
        <PineTreeline />

        {/* Parallax mountain silhouettes — 3 distinct layers */}
        <motion.div style={{ y: layer1Y }} className="absolute bottom-0 left-0 right-0 opacity-[0.12]">
          <svg viewBox="0 0 1440 400" className="w-full" preserveAspectRatio="none">
            <path d="M0,400 L80,280 L160,340 L280,180 L380,300 L480,140 L560,260 L680,80 L800,220 L920,120 L1040,280 L1160,60 L1280,200 L1360,160 L1440,240 L1440,400 Z" fill="#C17817"/>
          </svg>
        </motion.div>
        <motion.div style={{ y: layer2Y }} className="absolute bottom-0 left-0 right-0 opacity-[0.07]">
          <svg viewBox="0 0 1440 350" className="w-full" preserveAspectRatio="none">
            <path d="M0,350 L120,220 L240,300 L400,100 L520,260 L680,150 L800,280 L960,80 L1100,240 L1240,120 L1360,220 L1440,180 L1440,350 Z" fill="#4A90A4"/>
          </svg>
        </motion.div>
        <motion.div style={{ y: layer3Y }} className="absolute bottom-0 left-0 right-0 opacity-[0.04]">
          <svg viewBox="0 0 1440 300" className="w-full" preserveAspectRatio="none">
            <path d="M0,300 L200,120 L360,240 L520,60 L720,200 L900,100 L1100,220 L1300,80 L1440,160 L1440,300 Z" fill="#2D6A4F"/>
          </svg>
        </motion.div>

        <FloatingShapes />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-24 sm:py-32">
          {/* Mountain mask sunrise reveal headline */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-[family-name:var(--font-satoshi)] text-cream text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] max-w-4xl"
              initial={{ clipPath: 'polygon(0% 100%, 20% 60%, 35% 80%, 50% 40%, 65% 70%, 80% 30%, 100% 100%)' }}
              animate={heroRevealed ? { clipPath: 'polygon(0% 0%, 20% 0%, 35% 0%, 50% 0%, 65% 0%, 80% 0%, 100% 0%, 100% 100%, 0% 100%)' } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              You&apos;re great at what you do. Let&apos;s make sure people know it.
            </motion.h1>
          </div>

          {/* Wipe-reveal subtitle */}
          <motion.div
            className="mt-8 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-copper-light text-lg sm:text-xl font-medium whitespace-nowrap">
              Locally crafted digital.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="mt-4 text-dark-text-muted text-lg sm:text-xl max-w-2xl leading-relaxed"
          >
            Modern websites, smart tools, and honest marketing for businesses in Castlegar, Trail, Nelson, and across the Kootenays.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <RippleButton href="/audit">
              <span className="inline-flex items-center justify-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-base">
                Get a Free Website Check-Up <ArrowRight size={18} />
              </span>
            </RippleButton>
            <a href="#services" className="inline-flex items-center text-cream/70 hover:text-cream font-medium transition-colors duration-200 text-base mt-2 sm:mt-0">
              See what we build ↓
            </a>
          </motion.div>
        </div>

        <RiverScroll />
      </section>

      <MountainDivider variant={1} fillColor="#1a1208" />

      {/* ═══ CAMPFIRE STORIES ═══ */}
      <CampfireStories stories={painPoints} />

      {/* ═══ VIDEO BACKGROUND — KOOTENAY ROOTS ═══ */}
      <VideoSection />

      <MountainDivider variant={2} fillColor="#F8F4F0" />

      {/* ═══ SERVICES BENTO — Interactive 3D Grid ═══ */}
      <section id="services" className="bg-cream py-24 sm:py-32 cedar-texture relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-3">What We Can Build For You</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate leading-tight">
              Everything your business needs online.
            </h2>
          </ScrollReveal>

          <div ref={bentoRef} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <TiltCard key={s.name} index={i} featured={s.large && i < 2}>
                <div className="group relative glass-card-light rounded-2xl p-8 h-full" style={{ transform: 'translateZ(0)' }}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-copper/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-cream-dark flex items-center justify-center mb-5 group-hover:bg-copper/10 transition-colors">
                      <DrawIcon Icon={s.icon} inView={bentoInView} />
                    </div>
                    <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate mb-2">{s.name}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">{s.desc}</p>
                    <p className="font-[family-name:var(--font-satoshi)] text-copper font-semibold text-sm">{s.price}</p>
                  </div>
                </div>
              </TiltCard>
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

      {/* ═══ FORCES OF NATURE — Interactive Stat Cards ═══ */}
      <FogTransition from="dark" />
      <ForcesOfNature />

      <MountainDivider variant={3} fillColor="#1A1D20" />

      {/* ═══ STYLE MENU PREVIEW — Scroll Snap ═══ */}
      <section className="bg-slate grain py-24 sm:py-32 overflow-hidden relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">Find Your Style</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight max-w-2xl">
              Browse design styles built for businesses like yours.
            </h2>
          </ScrollReveal>

          <div className="mt-16 relative">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-6 w-8 sm:w-16 bg-gradient-to-r from-slate to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-6 w-8 sm:w-16 bg-gradient-to-l from-slate to-transparent z-10 pointer-events-none" />

            {!styleInteracted && <DragHint />}

            <div
              ref={styleScrollRef}
              onScroll={handleStyleScroll}
              onTouchStart={handleStyleScroll}
              className="flex gap-6 overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide scroll-smooth"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {styles.map((style, i) => (
                <ScrollReveal key={style.name} delay={i * 0.08}>
                  <Link href="/styles" className="group">
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="snap-start shrink-0 w-[80vw] sm:w-80 glass-card-dark rounded-2xl p-5 sm:p-6"
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
          </div>

          <ScrollReveal delay={0.3}>
            <Link href="/styles" className="inline-flex items-center gap-2 text-copper-light hover:text-copper font-medium group transition-colors mt-4">
              Explore all styles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <Marquee />

      <MountainDivider variant={1} fillColor="#1A1D20" />

      {/* ═══ FINAL CTA ═══ */}
      <section className="aurora-bg grain py-24 sm:py-32 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight max-w-2xl mx-auto">
              Let&apos;s grab a coffee and talk about your business.
            </h2>
            <p className="mt-6 text-dark-text-muted text-lg max-w-xl mx-auto leading-relaxed">
              Our website check-up is free, takes 30 minutes, and comes with zero pressure. We&apos;ll look at where you are online, show you what&apos;s working, and give you an honest plan — whether you hire us or not.
            </p>
            <div className="mt-10">
              <RippleButton href="/audit">
                <span className="relative inline-flex items-center justify-center gap-2 text-white font-medium px-10 py-5 rounded-lg text-lg">
                  {/* Animated gradient border */}
                  <span className="absolute inset-0 rounded-lg animated-gradient-border" />
                  <span className="absolute inset-[2px] rounded-[6px] bg-slate" />
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Book a Free Check-Up ☕
                  </span>
                </span>
              </RippleButton>
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
