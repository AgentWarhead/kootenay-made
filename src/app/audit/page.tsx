'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import MountainDivider from '@/components/MountainDivider';
import RiverWave from '@/components/RiverWave';
import AmbientOrbs from '@/components/AmbientOrbs';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import {
  CaretDown as ChevronDown,
  Lightning as Zap,
  MagnifyingGlass as Search,
  ShieldCheck,
  ClipboardText as ClipboardList,
  ArrowRight,
  Gauge,
  Eye,
  Link as LinkIcon,
  ChartBar,
  Phone,
} from '@phosphor-icons/react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const faqs = [
  {
    q: 'Is this really free? What\'s the catch?',
    a: 'No catch. The instant scan takes 30 seconds, scores your site on the spot, and costs you nothing — not even an email. We built it so local businesses can see where they stand without any strings attached.',
  },
  {
    q: 'I don\'t have a website yet. Can I still do this?',
    a: 'The scanner needs a URL to check, so not quite — but reach out to Brett directly and he\'ll walk you through your options. A conversation is always free.',
  },
  {
    q: 'What do the scores mean?',
    a: 'The scan checks your speed, findability, accessibility, and best practices using Google\'s own tools. You\'ll see four scores on screen instantly. Anything below 90 means there\'s room to improve — and we can show you how.',
  },
  {
    q: 'Will you try to sell me something?',
    a: 'Nope. The scan results are yours — no follow-up emails, no sales calls. If you want to chat about what the scores mean or how to improve them, Brett\'s always happy to help. But that\'s your call.',
  },
  {
    q: 'How is this different from a full audit?',
    a: 'The instant scan gives you a quick snapshot in 30 seconds — think of it as a health check. If you want the full picture, leave your info and Brett will personally review your site within 48 hours and send you a detailed branded report.',
  },
];

/* ─────────────────────────────────────────────
   SCORE HELPERS
───────────────────────────────────────────── */

function scoreColor(score: number): string {
  if (score >= 90) return '#22c55e';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

function scoreLabel(score: number): string {
  if (score >= 90) return 'Great';
  if (score >= 50) return 'Needs work';
  return 'Poor';
}

/* ─────────────────────────────────────────────
   CIRCULAR SCORE RING
───────────────────────────────────────────── */

function ScoreRing({
  score,
  label,
  description,
  icon: Icon,
  tip,
  delay = 0,
}: {
  score: number;
  label: string;
  description: string;
  icon: React.ElementType;
  tip: string;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const color = scoreColor(score);
  const progress = (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 180, damping: 18 }}
      className="relative overflow-visible flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 sm:p-4 cursor-default"
      style={{
        boxShadow: hovered ? `0 0 20px 2px ${color}33` : 'none',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      {/* Icon */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: `${color}22` }}
      >
        <Icon size={16} style={{ color }} />
      </div>

      {/* Ring */}
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ delay: delay + 0.2, duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.6 }}
            className="font-[family-name:var(--font-satoshi)] text-xl font-bold"
            style={{ color }}
          >
            {score}
          </motion.span>
        </div>
      </div>

      {/* Label + score descriptor */}
      <div className="text-center">
        <p className="text-cream text-xs font-semibold">{label}</p>
        <p className="text-dark-text-muted text-[10px] mt-0.5">{scoreLabel(score)}</p>
      </div>

      {/* Description */}
      <p className="text-dark-text-muted text-[9px] text-center leading-relaxed px-1">{description}</p>

      {/* Tooltip on hover — below card on mobile, above on desktop */}
      <AnimatePresence>
        {hovered && (
          <>
            {/* Desktop: above */}
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="hidden sm:block absolute -top-12 left-1/2 -translate-x-1/2 z-20 w-[200px] text-center rounded-lg px-3 py-1.5 text-[10px] font-medium text-white shadow-lg pointer-events-none leading-snug"
              style={{ background: `${color}dd` }}
            >
              {tip}
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `5px solid ${color}dd` }}
              />
            </motion.div>
            {/* Mobile: below */}
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="sm:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 z-20 w-[170px] text-center rounded-lg px-2.5 py-1.5 text-[9px] font-medium text-white shadow-lg pointer-events-none leading-snug"
              style={{ background: `${color}dd` }}
            >
              {tip}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   REAL URL SCANNER
───────────────────────────────────────────── */

interface ScanScores {
  performance: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
}

function URLScanner() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scores, setScores] = useState<ScanScores | null>(null);
  const [fetchedUrl, setFetchedUrl] = useState('');
  const [error, setError] = useState('');

  const handleScan = async () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    setScanning(true);
    setScores(null);
    setError('');

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error || 'Scan failed. Please try again.');
      } else {
        setScores(json.scores);
        setFetchedUrl(json.fetchedUrl);
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setScanning(false);
    }
  };

  const scoreItems: {
    key: keyof ScanScores;
    label: string;
    description: string;
    icon: React.ElementType;
    tip: (score: number) => string;
  }[] = [
    {
      key: 'performance',
      label: 'Speed',
      description: 'How fast your site loads for visitors',
      icon: Gauge,
      tip: (s) =>
        s >= 90
          ? 'Lightning fast — your visitors will love this'
          : s >= 50
          ? 'Good, but faster sites convert better'
          : 'Slow sites lose 53% of visitors',
    },
    {
      key: 'accessibility',
      label: 'Accessibility',
      description: 'Can everyone use your site easily?',
      icon: Eye,
      tip: (s) =>
        s >= 90
          ? 'Excellent — your site works for everyone'
          : s >= 50
          ? 'Some accessibility gaps to address'
          : "Many visitors can't use your site properly",
    },
    {
      key: 'seo',
      label: 'Google-Ready',
      description: 'How visible you are in search results',
      icon: Search,
      tip: (s) =>
        s >= 90
          ? 'Well optimized — Google likes what it sees'
          : s >= 50
          ? 'Some SEO basics missing — easy wins available'
          : "Google can barely see you right now",
    },
    {
      key: 'bestPractices',
      label: 'Best Practices',
      description: 'Security, image formats & modern standards',
      icon: ShieldCheck,
      tip: (s) =>
        s >= 90
          ? 'Following modern web standards nicely'
          : s >= 50
          ? 'A few modern standards to adopt'
          : 'Outdated practices hurting your site',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <ScrollReveal>
        <div className="glass-card-dark rounded-2xl p-6 sm:p-8 overflow-hidden">
          <p className="text-copper text-xs font-bold uppercase tracking-widest mb-2">Real-Time Scanner</p>
          <p className="text-dark-text-muted text-sm mb-5">Powered by Google PageSpeed Insights — same tool used by web professionals.</p>

          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setScores(null); setError(''); }}
              placeholder="yourwebsite.ca"
              className="flex-1 min-w-0 bg-cream-dark border border-copper/20 rounded-lg px-4 py-3 text-slate placeholder:text-text-secondary/50 focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper/40 transition-all text-sm"
              onKeyDown={(e) => e.key === 'Enter' && !scanning && handleScan()}
            />
            <button
              onClick={handleScan}
              disabled={!url.trim() || scanning}
              className="w-full sm:w-auto bg-copper hover:bg-copper-light text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-40 text-sm whitespace-nowrap"
            >
              {scanning ? 'Scanning…' : 'Scan My Site'}
            </button>
          </div>

          {/* Animated progress bar while waiting */}
          <AnimatePresence>
            {scanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-5"
              >
                <div className="flex justify-between text-xs text-dark-text-muted mb-2">
                  <span>Running Lighthouse audit…</span>
                  <span>Up to 30s</span>
                </div>
                <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-copper to-transparent scan-bar" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 text-red-400 text-sm mb-4 bg-red-400/10 rounded-lg p-3"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Real Results */}
          <AnimatePresence>
            {scores && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {fetchedUrl && (
                  <p className="text-dark-text-muted text-xs mb-4 truncate">
                    Results for: <span className="text-cream/80">{fetchedUrl}</span>
                  </p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
                  {scoreItems.map(({ key, label, description, icon, tip }, i) => (
                    <ScoreRing
                      key={key}
                      score={scores[key]}
                      label={label}
                      description={description}
                      icon={icon}
                      tip={tip(scores[key])}
                      delay={i * 0.15}
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="border-t border-white/10 pt-6"
                >
                  <p className="text-dark-text-muted text-sm text-center mb-4 leading-relaxed">
                    Want to fix these scores? Brett can walk you through exactly what a new site would do for your business —{' '}
                    <span className="text-cream font-semibold">free call with Brett.</span>
                  </p>
                  <Link
                    href="/contact"
                    className="w-full bg-copper hover:bg-copper-light text-white font-semibold px-6 py-3.5 rounded-lg transition-colors duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    Talk to Brett <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WHAT HAPPENS NEXT
───────────────────────────────────────────── */

function WhatHappensNext() {
  const steps = [
    { icon: '🔗', num: '01', title: 'Enter your website URL', desc: 'Takes 30 seconds. No email required — just paste your link.' },
    { icon: '📊', num: '02', title: 'See your scores instantly', desc: 'Speed, SEO, accessibility, and best practices — powered by Google Lighthouse.' },
    { icon: '📞', num: '03', title: 'Want help? Book a free call', desc: 'Brett walks you through the results and shows you what\'s possible.' },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16">
        <ScrollReveal>
          <p className="text-copper text-xs font-bold uppercase tracking-widest text-center mb-3">The process</p>
          <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate text-center mb-14">
            What happens next
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden sm:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent" />

          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-copper/10 border border-copper/20 flex items-center justify-center text-2xl mb-4 relative z-10">
                  {i === 0 ? <LinkIcon size={24} weight="duotone" className="text-copper" /> :
                   i === 1 ? <ChartBar size={24} weight="duotone" className="text-copper" /> :
                   <Phone size={24} weight="duotone" className="text-copper" />}
                </div>
                <span className="font-[family-name:var(--font-satoshi)] text-copper font-bold text-xs tracking-widest mb-1">{step.num}</span>
                <h3 className="font-[family-name:var(--font-satoshi)] font-bold text-slate mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────────── */

function FaqItem({ faq, isOpen, onToggle, index }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="glass-card-light rounded-xl overflow-hidden">
        <button onClick={onToggle} className="w-full flex items-center justify-between px-6 py-4 text-left">
          <span className="font-[family-name:var(--font-satoshi)] font-semibold text-slate text-sm sm:text-base pr-4">{faq.q}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <ChevronDown size={18} className={isOpen ? 'text-copper' : 'text-text-tertiary'} />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-4">
                <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */

export default function AuditPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="aurora-bg grain pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent spotlight-sweep" />
        </div>
        <AmbientOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <Breadcrumb items={[{ label: 'Free Audit' }]} dark />
          <ScrollReveal>
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">The Lookout</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4">
              Is your website working as hard as you are?
            </h1>
            <p className="text-dark-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-2">
              Find out what&apos;s holding your site back — completely free.
            </p>
            <p className="text-copper font-medium text-sm">No sales pitch. No obligation. Just honest insight.</p>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" bgColor="#1A1D20" />

      {/* ── REAL URL SCANNER ── */}
      <section className="bg-cream py-16 sm:py-20 cedar-texture relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate text-center mb-3">
              See how your site scores right now
            </h2>
            <p className="text-text-secondary text-center mb-10 max-w-lg mx-auto">
              Enter your URL for a real Google PageSpeed audit — takes about 15 seconds.
            </p>
          </ScrollReveal>
          <URLScanner />
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ── */}
      <WhatHappensNext />

      <RiverWave fillColor="#1A1D20" bgColor="#F8F4F0" />

      {/* ── CONTACT CTA ── */}
      <section className="bg-slate grain py-16 sm:py-24 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <ScrollReveal>
            <p className="text-copper text-xs font-bold uppercase tracking-widest mb-3">Ready to level up?</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-4">
              Like what you see? Let&apos;s talk.
            </h2>
            <p className="text-dark-text-muted text-base mb-8 max-w-lg mx-auto">
              Your scan tells you where you stand. A quick call with Brett shows you where you could be. Zero pressure, take as long as you need.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-base"
            >
              Book a Free Call <ArrowRight size={16} />
            </Link>
            <p className="text-dark-text-muted text-xs mt-4">
              Or email Brett directly at{' '}
              <a href="mailto:hello@kootenaymade.ca" className="text-copper hover:text-copper-light transition-colors underline">
                hello@kootenaymade.ca
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <RiverWave fillColor="#F8F4F0" bgColor="#1A1D20" />

      {/* ── FAQ ── */}
      <section className="bg-cream py-16 sm:py-20 cedar-texture relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-10">
              <ClipboardList size={20} className="text-copper" />
              <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate">Common questions</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
