'use client';

import { useState, useRef, useCallback } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import MountainDivider from '@/components/MountainDivider';
import RiverWave from '@/components/RiverWave';
import AmbientOrbs from '@/components/AmbientOrbs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Palette,
  Smartphone,
  Zap,
  MapPin,
  Search,
  Users,
  ShieldCheck,
  MousePointerClick,
  FileText,
  FileCheck,
  ClipboardList,
  ArrowDown,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const faqs = [
  {
    q: 'Is this really free? What\'s the catch?',
    a: 'No catch. We use the audit to show you what we can do — and to learn about local businesses. If you like what you see and want help, great. If not, you still walk away with real, actionable insights. Zero pressure.',
  },
  {
    q: 'I don\'t have a website yet. Can I still do this?',
    a: 'Absolutely. We\'ll review your current online presence — Google Business Profile, social media, competitor landscape — and give you a roadmap for getting started the right way.',
  },
  {
    q: 'How is this different from the quick scan above?',
    a: 'The quick scan checks 4 technical metrics. The full audit goes way deeper — we analyze your design, brand, competitors, content, trust signals, and local SEO. You get a complete PDF report with a prioritized action plan, not just numbers.',
  },
  {
    q: 'How long does the audit take?',
    a: 'We deliver your branded PDF report within 48 hours of your request.',
  },
  {
    q: 'Will you try to sell me something?',
    a: 'We\'ll tell you what we found and what we\'d recommend. If you ask about our services, we\'re happy to explain them. But we won\'t push.',
  },
];

const auditTiers = [
  {
    tier: 'Tier 1',
    label: 'First Impressions',
    sub: 'What customers see',
    color: 'copper',
    items: [
      { icon: Palette, title: 'Design & Brand Score', desc: 'AI reviews homepage design quality, color consistency, typography, and imagery.' },
      { icon: Smartphone, title: 'Mobile Experience', desc: 'Responsive testing, touch targets, text readability across all screen sizes.' },
      { icon: Zap, title: 'Page Speed', desc: 'Full Lighthouse deep dive beyond the quick scan — every millisecond counts.' },
    ],
  },
  {
    tier: 'Tier 2',
    label: 'Google & Discovery',
    sub: 'Can they find you?',
    color: 'forest',
    items: [
      { icon: MapPin, title: 'Local SEO Health', desc: 'Google Business Profile status, NAP consistency, and local keyword presence.' },
      { icon: Search, title: 'Search Visibility', desc: 'Rankings, missing keywords, and title/meta quality that moves you up.' },
      { icon: Users, title: 'Competitor Gap', desc: 'What your top 2–3 local competitors do that you\'re not — yet.' },
    ],
  },
  {
    tier: 'Tier 3',
    label: 'Trust & Conversion',
    sub: 'Do they take action?',
    color: 'river',
    items: [
      { icon: ShieldCheck, title: 'Trust Signals', desc: 'SSL, reviews, testimonials, contact info, and professional email presence.' },
      { icon: MousePointerClick, title: 'Call-to-Action Clarity', desc: 'Can a visitor figure out what to do in 5 seconds? We find out.' },
      { icon: FileText, title: 'Content Quality', desc: 'Is the copy speaking to customers or just describing the business?' },
    ],
  },
];

const tierColorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  copper: { border: 'border-copper/30', bg: 'bg-copper/10', text: 'text-copper', badge: 'bg-copper/15 text-copper' },
  forest: { border: 'border-forest/30', bg: 'bg-forest/10', text: 'text-forest-light', badge: 'bg-forest/15 text-forest-light' },
  river: { border: 'border-river/30', bg: 'bg-river/10', text: 'text-river', badge: 'bg-river/15 text-river' },
};

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

function ScoreRing({ score, label, delay = 0 }: { score: number; label: string; delay?: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const color = scoreColor(score);
  const progress = (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          {/* Track */}
          <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          {/* Progress ring */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ delay: delay + 0.2, duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        {/* Score number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.6 }}
            className="font-[family-name:var(--font-satoshi)] text-2xl font-bold"
            style={{ color }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <p className="text-cream text-xs font-semibold text-center">{label}</p>
      <p className="text-dark-text-muted text-[10px] text-center">{scoreLabel(score)}</p>
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

function URLScanner({ onScrollToForm }: { onScrollToForm: () => void }) {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scores, setScores] = useState<ScanScores | null>(null);
  const [fetchedUrl, setFetchedUrl] = useState('');
  const [error, setError] = useState('');

  const handleScan = useCallback(async () => {
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
  }, [url]);

  const scoreItems: { key: keyof ScanScores; label: string }[] = [
    { key: 'performance', label: '⚡ Performance' },
    { key: 'accessibility', label: '♿ Accessibility' },
    { key: 'seo', label: '🔍 SEO' },
    { key: 'bestPractices', label: '✅ Best Practices' },
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
              className="flex-1 min-w-0 bg-slate-card border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-dark-text-muted/40 focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper/40 transition-all text-sm"
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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {scoreItems.map(({ key, label }, i) => (
                    <ScoreRing key={key} score={scores[key]} label={label} delay={i * 0.1} />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="border-t border-white/10 pt-6"
                >
                  <p className="text-dark-text-muted text-sm text-center mb-4 leading-relaxed">
                    This is just the surface. Your full audit covers design quality, competitor analysis, local SEO, trust signals, and a prioritized action plan —{' '}
                    <span className="text-cream font-semibold">completely free.</span>
                  </p>
                  <button
                    onClick={onScrollToForm}
                    className="w-full bg-copper hover:bg-copper-light text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    Get My Full Audit <ArrowDown size={16} />
                  </button>
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
   AUDIT TIER CARDS
───────────────────────────────────────────── */

function AuditTierSection() {
  return (
    <section className="bg-cream py-16 sm:py-24 cedar-texture relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
        <ScrollReveal>
          <p className="text-copper text-xs font-bold uppercase tracking-widest text-center mb-3">What&apos;s included</p>
          <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate text-center mb-2">
            The 10-Point Audit
          </h2>
          <p className="text-text-secondary text-center max-w-xl mx-auto mb-14">
            Every audit covers these three areas. Most agencies charge hundreds. You get it free.
          </p>
        </ScrollReveal>

        <div className="space-y-8">
          {auditTiers.map((tier, ti) => {
            const c = tierColorMap[tier.color];
            return (
              <ScrollReveal key={tier.tier} delay={ti * 0.1}>
                <div className={`rounded-2xl border ${c.border} bg-white/60 backdrop-blur-sm overflow-hidden`}>
                  {/* Tier header */}
                  <div className={`${c.bg} px-6 py-4 flex items-center gap-4`}>
                    <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${c.badge}`}>
                      {tier.tier}
                    </span>
                    <div>
                      <h3 className={`font-[family-name:var(--font-satoshi)] text-lg font-bold ${c.text}`}>{tier.label}</h3>
                      <p className="text-text-tertiary text-xs">{tier.sub}</p>
                    </div>
                  </div>

                  {/* Items grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate/10">
                    {tier.items.map((item, ii) => (
                      <div key={ii} className="p-5 flex gap-3">
                        <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <item.icon size={16} className={c.text} />
                        </div>
                        <div>
                          <p className="font-[family-name:var(--font-satoshi)] font-semibold text-slate text-sm mb-1">{item.title}</p>
                          <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Deliverable highlight */}
        <ScrollReveal delay={0.4}>
          <div className="mt-8 rounded-2xl border border-copper/30 bg-gradient-to-br from-copper/10 to-forest/10 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="w-14 h-14 rounded-2xl bg-copper/15 flex items-center justify-center shrink-0">
              <FileCheck size={26} className="text-copper" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-copper">The Deliverable</span>
                <span className="text-xs bg-copper/15 text-copper px-2 py-0.5 rounded-full font-semibold">#10</span>
              </div>
              <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-slate mb-1">Branded PDF Report</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                All 9 areas scored, a prioritized &ldquo;fix this first&rdquo; action plan, and explained in plain English — no jargon.
                Plus access to the <span className="text-forest font-semibold">Neighbours Dashboard</span> (tutorials &amp; guides).
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WHAT HAPPENS NEXT
───────────────────────────────────────────── */

function WhatHappensNext() {
  const steps = [
    { icon: '📝', num: '01', title: 'Submit your info below', desc: 'Takes 30 seconds. Just your name, business, and email.' },
    { icon: '🔍', num: '02', title: 'Brett runs your audit', desc: 'Within 48 hours — thorough, personal, and specific to your business.' },
    { icon: '📊', num: '03', title: 'Get your branded report', desc: 'No strings attached. The insights are yours to keep, forever.' },
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
                  {step.icon}
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
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLElement>(null);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    data.source = 'audit';
    data.message = `Audit request from ${data.name} at ${data.business}. Website: ${data.website || 'N/A'}`;
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong');
      setStatus('success');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

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
              Find out in 30 minutes — completely free.
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
          <URLScanner onScrollToForm={scrollToForm} />
        </div>
      </section>

      {/* ── 10-POINT AUDIT BREAKDOWN ── */}
      <AuditTierSection />

      {/* ── WHAT HAPPENS NEXT ── */}
      <WhatHappensNext />

      <RiverWave fillColor="#1A1D20" bgColor="#F8F4F0" />

      {/* ── BOOKING FORM ── */}
      <section ref={formRef} className="bg-slate grain py-16 sm:py-24 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-copper text-xs font-bold uppercase tracking-widest text-center mb-3">Book your spot</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream text-center mb-2">
              Get your free audit
            </h2>
            <p className="text-dark-text-muted text-center mb-10">
              Fill this out in 30 seconds. Brett will run your audit within 48 hours.
            </p>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card-dark rounded-2xl p-8 text-center"
                >
                  <CheckCircle2 className="text-green-400 mx-auto mb-4" size={48} />
                  <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-cream mb-2">Request received!</h3>
                  <p className="text-dark-text-muted">
                    Your audit is on its way. Grab a coffee from your favourite Kootenay café while you wait. ☕
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass-card-dark rounded-2xl p-6 sm:p-8 space-y-5"
                >
                  {[
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'Jane Smith' },
                    { name: 'business', label: 'Business Name', type: 'text', required: true, placeholder: 'Nelson Hardware Co.' },
                    { name: 'website', label: 'Website URL', type: 'url', required: false, placeholder: 'yoursite.ca (optional)' },
                    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'jane@yourbusiness.ca' },
                    { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '(250) 555-0123' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label htmlFor={`audit-${field.name}`} className="block text-sm font-medium text-dark-text-muted mb-1.5">
                        {field.label}{' '}
                        {!field.required && <span className="text-dark-text-muted/50">(optional)</span>}
                      </label>
                      <input
                        type={field.type}
                        id={`audit-${field.name}`}
                        name={field.name}
                        required={field.required}
                        placeholder={field.placeholder}
                        className="w-full bg-slate-card border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-dark-text-muted/40 focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper/40 transition-all"
                      />
                    </div>
                  ))}

                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle size={16} /> {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-copper hover:bg-copper-light text-white font-semibold px-6 py-4 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 text-base"
                  >
                    {status === 'sending' ? 'Sending…' : 'Request My Free Audit →'}
                  </button>

                  {/* Risk reversal */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    {[
                      '100% free — no credit card, no catch',
                      'Your report arrives within 48 hours',
                      'Zero obligation — the insights are yours to keep',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                        <span className="text-dark-text-muted text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
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
