'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Palette, ShoppingBag, Mail, Bot, Search, Shield, User, Gift } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import RippleButton from '@/components/RippleButton';
import TiltCard from '@/components/TiltCard';
import CampfireStories from '@/components/CampfireStories';
import VideoSection from '@/components/VideoSection';
import MountainDivider from '@/components/MountainDivider';
import RiverWave from '@/components/RiverWave';
import CopperRule from '@/components/CopperRule';
import AmbientOrbs from '@/components/AmbientOrbs';
import PineTreeline from '@/components/PineTreeline';
import ForcesOfNature from '@/components/ForcesOfNature';
import PretextExplosion from '@/components/PretextExplosion';
import PretextExplainer from '@/components/PretextExplainer';
import WildernessCursorTrail from '@/components/WildernessCursorTrail';
import BalancedText from '@/components/BalancedText';

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

/* ── Industries (Who We Help) ────────────────── */
const industries = [
  {
    name: 'Trades & Contractors',
    desc: 'Plumbers, electricians, builders — the backbone of the Kootenays.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 20L20 8" /><path d="M18 6l2-2 4 4-2 2" /><path d="M10 22l-2 2-4-4 2-2" />
      </svg>
    ),
  },
  {
    name: 'Restaurants & Cafés',
    desc: 'From Trail diners to Nelson bistros, get tables filled.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 14h12v8a3 3 0 01-3 3H9a3 3 0 01-3-3v-8z" /><path d="M18 16h2a3 3 0 010 6h-2" /><path d="M10 10c0-2 2-2 2-4" /><path d="M14 10c0-2 2-2 2-4" />
      </svg>
    ),
  },
  {
    name: 'Wellness & Health',
    desc: 'Yoga studios, therapists, naturopaths — your calm online presence.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M7 24c0-10 7-17 14-17" /><path d="M21 7c0 10-7 17-14 17" /><path d="M7 24C11 20 17 14 21 7" />
      </svg>
    ),
  },
  {
    name: 'Tourism & Adventure',
    desc: 'Guides, resorts, outfitters — reach visitors before they arrive.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 24l7-12 4 5 6-10 5 17H3z" /><circle cx="22" cy="6" r="3" />
      </svg>
    ),
  },
  {
    name: 'Retail & Shops',
    desc: 'Boutiques, gift shops, galleries — sell online and in-store.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 10h16l-2 14H8L6 10z" /><path d="M10 10V7a4 4 0 018 0v3" />
      </svg>
    ),
  },
  {
    name: 'Professional Services',
    desc: 'Accountants, lawyers, consultants — look as sharp as your work.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="22" height="13" rx="2" /><path d="M10 10V7a2 2 0 012-2h4a2 2 0 012 2v3" /><path d="M3 16h22" />
      </svg>
    ),
  },
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
  const row2 = 'CASTLEGAR ⛰ TRAIL ⛰ NELSON ⛰ ROSSLAND ⛰ KASLO ⛰ NAKUSP ⛰ CRESTON ⛰ SALMO ⛰ NEW DENVER ⛰ FRUITVALE ⛰ SLOCAN ⛰ GRAND FORKS ⛰ CHRISTINA LAKE ⛰ WARFIELD ⛰ MONTROSE ⛰ ';

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

  // Hero animation (staggered word reveal handles itself)

  // Bento section in-view for icon draw
  const bentoRef = useRef<HTMLDivElement>(null);
  const bentoInView = useInView(bentoRef, { once: true, margin: '-80px' });



  return (
    <>
      <WildernessCursorTrail />

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

        {/* Easter egg - floating game controller */}
        <motion.span
          className="absolute text-lg pointer-events-auto cursor-pointer select-none z-20"
          style={{ top: '40%', left: '10%', opacity: 0.15 }}
          animate={{
            x: [0, 100, 50, 150, 0],
            y: [0, -30, 20, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          whileHover={{ opacity: 0.6, scale: 1.5 }}
          whileTap={{ scale: 2, opacity: 1 }}
          onClick={() => {
            const el = document.createElement('div');
            el.textContent = 'Keep looking... 👀';
            el.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#2D3436;color:#F8F4F0;padding:12px 20px;border-radius:12px;font-size:14px;z-index:9999;pointer-events:none;';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 2000);
          }}
        >
          🎮
        </motion.span>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-24 sm:py-32">
          {/* Hero headline — staggered word reveal */}
          <h1 className="font-[family-name:var(--font-clash)] text-cream text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] max-w-4xl">
            {['You\'re', 'great', 'at', 'what', 'you', 'do.', 'Let\'s', 'make', 'sure', 'people', 'know', 'it.'].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Tagline — fades in after headline */}
          <motion.p
            className="mt-8 text-copper-light text-lg sm:text-xl font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease: 'easeOut' }}
          >
            Locally crafted digital.
          </motion.p>

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

      <MountainDivider variant={1} fillColor="#1a1208" bgColor="transparent" />

      {/* ═══ PRETEXT EXPLOSION ═══ */}
      <section className="relative bg-[#0D0F11] overflow-hidden">
        <div className="absolute inset-0 grain" />
        {/* Mining blueprint grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(rgba(193,120,23,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(193,120,23,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
        {/* Warm vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, rgba(193,120,23,0.06) 0%, transparent 70%)'
        }} />
        <div className="relative z-10">
          <PretextExplosion />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 pb-12">
            <div className="text-center mt-6">
              <p className="text-copper text-lg sm:text-xl font-bold font-[family-name:var(--font-satoshi)]" style={{ textShadow: '0 0 20px rgba(193,120,23,0.3)' }}>&quot;That&apos;s what we do to boring websites.&quot;</p>
            </div>
            <PretextExplainer
              text="Every letter you just blew up was measured to sub-pixel precision using Pretext — no templates, no drag-and-drop. This is what custom-engineered websites feel like. Your competitors are using Wix."
            />
          </div>
        </div>
      </section>

      {/* ═══ CAMPFIRE STORIES ═══ */}
      <CampfireStories stories={painPoints} />

      <MountainDivider variant={3} fillColor="#1A1D20" bgColor="#1A1D20" />

      {/* ═══ WHO WE HELP ═══ */}
      <section className="bg-slate grain py-24 sm:py-32 relative overflow-hidden">
        {/* Topographic contour pattern */}
        <div className="absolute inset-0 opacity-[0.09] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topo-lines" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M20,100 Q60,20 100,100 T180,100" fill="none" stroke="#C17817" strokeWidth="0.5" />
                <path d="M0,60 Q40,0 80,60 T160,60" fill="none" stroke="#C17817" strokeWidth="0.5" />
                <path d="M10,160 Q50,100 90,160 T170,160" fill="none" stroke="#C17817" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topo-lines)" />
          </svg>
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 80% at 10% 50%, rgba(193,120,23,0.06) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-3">Your Neighbours</p>
            <BalancedText as="h2" className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
              We Build for Businesses Like Yours
            </BalancedText>
            <p className="mt-4 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Whether you swing a hammer or pour lattes, we speak your language.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={(Math.floor(i / 3) + (i % 3)) * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group glass-card-dark rounded-2xl p-6 border border-white/5 hover:border-copper/20 transition-all duration-300 h-full industry-card"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-copper/10 transition-colors text-copper group-hover:drop-shadow-[0_0_8px_rgba(193,120,23,0.5)] icon-power-on">
                    {ind.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-satoshi)] text-base sm:text-lg font-bold text-cream mb-2">{ind.name}</h3>
                  <p className="text-dark-text-muted text-sm leading-relaxed">{ind.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <RiverWave fillColor="#F8F4F0" bgColor="#1A1D20" />

      {/* ═══ SERVICES BENTO — Interactive 3D Grid ═══ */}
      <section id="services" className="bg-cream py-24 sm:py-32 cedar-texture relative">
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(135deg, rgba(193,120,23,0.03) 0%, transparent 50%, rgba(74,144,164,0.02) 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-3">What We Can Build For You</p>
            <BalancedText as="h2" className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate leading-tight">
              Everything your business needs online.
            </BalancedText>
          </ScrollReveal>

          <div ref={bentoRef} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <TiltCard key={s.name} index={i} featured={s.large && i < 2}>
                {s.large && i < 2 ? (
                  <div className="group relative rounded-2xl p-[2px] h-full">
                    <div className="absolute inset-0 rounded-2xl animated-gradient-border" />
                    <div className="relative glass-card-light rounded-2xl p-8 h-full" style={{ transform: 'translateZ(0)', ...(i % 2 === 1 ? { background: 'linear-gradient(to bottom right, rgba(193,120,23,0.02), transparent), rgba(255,255,255,0.7)' } : {}) }}>
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
                  </div>
                ) : (
                  <div className="group relative glass-card-light rounded-2xl p-8 h-full" style={{ transform: 'translateZ(0)', ...(i % 2 === 1 ? { background: 'linear-gradient(to bottom right, rgba(193,120,23,0.02), transparent), rgba(255,255,255,0.7)' } : {}) }}>
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
                )}
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

      <MountainDivider variant={2} fillColor="#EFEBE6" bgColor="#F8F4F0" />

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="bg-[#EFEBE6] map-texture py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-copper font-medium text-sm tracking-wider uppercase mb-3">Zero Risk, Zero Pressure</p>
              <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate leading-tight">
                Here&apos;s How It Works
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-16 flex flex-col gap-8 relative">
            {/* SVG connecting trails — desktop only */}
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
              <path d="M 620 180 C 650 220, 680 260, 650 300" fill="none" stroke="#C17817" strokeWidth="2" strokeDasharray="6 4" opacity="0.15" />
              <path d="M 380 480 C 350 520, 320 560, 350 600" fill="none" stroke="#C17817" strokeWidth="2" strokeDasharray="6 4" opacity="0.15" />
            </svg>

            {/* Card 1 — Tell Us About Your Business */}
            <ScrollReveal delay={0}>
              <div
                className="relative ml-0 mr-auto max-w-2xl w-full rounded-2xl p-8 sm:p-10 bg-white/60 backdrop-blur-sm border border-cream-border/50 shadow-sm hover:shadow-md transition-all duration-300 group"
                style={{ backgroundColor: 'rgba(193,120,23,0.04)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span className="absolute top-4 left-6 text-6xl font-black text-copper opacity-[0.08] font-[family-name:var(--font-satoshi)] select-none leading-none">1</span>
                <div className="relative z-10">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-2xl font-bold text-slate mb-3">Tell Us About Your Business</h3>
                  <p className="text-text-secondary text-base leading-relaxed mb-5 font-[family-name:var(--font-general)]">
                    30 seconds. Seriously. Just your name, your website (if you have one), and what you do. That&apos;s it.
                  </p>
                  <span className="text-xs text-text-secondary bg-cream-dark/80 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-5">
                    <Shield size={13} /> No credit card. No sales call. No catch.
                  </span>
                  <div className="mt-2">
                    <Link href="/audit" className="inline-flex items-center gap-1.5 text-copper hover:text-copper-dark font-medium text-sm transition-colors font-[family-name:var(--font-satoshi)]">
                      Start Your Free Audit <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 — Brett Runs Your Audit */}
            <ScrollReveal delay={0.15}>
              <div
                className="relative ml-auto mr-0 max-w-2xl w-full rounded-2xl p-8 sm:p-10 bg-white/60 backdrop-blur-sm border border-cream-border/50 shadow-sm hover:shadow-md transition-all duration-300 group"
                style={{ backgroundColor: 'rgba(74,144,164,0.04)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span className="absolute top-4 left-6 text-6xl font-black text-copper opacity-[0.08] font-[family-name:var(--font-satoshi)] select-none leading-none">2</span>
                <div className="relative z-10">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-2xl font-bold text-slate mb-3">Brett Runs Your Audit</h3>
                  <p className="text-text-secondary text-base leading-relaxed mb-5 font-[family-name:var(--font-general)]">
                    Within 48 hours, Brett personally reviews your online presence — your website speed, how you show up on Google, what your competitors are doing, and where the quick wins are.
                  </p>
                  <span className="text-xs text-text-secondary bg-cream-dark/80 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                    <User size={13} /> A real person. Not a bot. Not a template.
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 — Get Your Game Plan */}
            <ScrollReveal delay={0.3}>
              <div
                className="relative ml-0 mr-auto max-w-2xl w-full rounded-2xl p-8 sm:p-10 bg-white/60 backdrop-blur-sm border border-cream-border/50 shadow-sm hover:shadow-md transition-all duration-300 group"
                style={{ backgroundColor: 'rgba(45,106,79,0.04)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span className="absolute top-4 left-6 text-6xl font-black text-copper opacity-[0.08] font-[family-name:var(--font-satoshi)] select-none leading-none">3</span>
                <div className="relative z-10">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-2xl font-bold text-slate mb-3">Get Your Game Plan</h3>
                  <p className="text-text-secondary text-base leading-relaxed mb-5 font-[family-name:var(--font-general)]">
                    You get a branded report with exactly what&apos;s working, what&apos;s not, and what to do next. It&apos;s yours to keep — whether you hire us or not.
                  </p>
                  <span className="text-xs text-text-secondary bg-cream-dark/80 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                    <Gift size={13} /> The report is yours. No strings attached.
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <RiverWave fillColor="#1A1D20" bgColor="#F8F4F0" />

      {/* ═══ VIDEO BACKGROUND — KOOTENAY ROOTS ═══ */}
      <VideoSection />

      {/* ═══ FORCES OF NATURE — Interactive Stat Cards ═══ */}
      <ForcesOfNature />

      {/* ═══ MARQUEE ═══ */}
      <Marquee />

      <RiverWave fillColor="#1A1D20" bgColor="#1A1D20" />

      {/* ═══ FINAL CTA ═══ */}
      <section className="aurora-bg grain py-24 sm:py-32 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <ScrollReveal>
            <BalancedText as="h2" className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight max-w-2xl mx-auto">
              Let&apos;s grab a coffee and talk about your business.
            </BalancedText>
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
