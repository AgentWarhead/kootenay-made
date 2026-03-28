'use client';

import { useState, useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import MountainDivider from '@/components/MountainDivider';
import AmbientOrbs from '@/components/AmbientOrbs';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Search, TrendingUp, Zap, ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Globe, Gauge, Shield } from 'lucide-react';

const flipCards = [
  { icon: Search, title: 'First Impression Score', desc: 'We\'ll show you exactly what potential customers see — load time, mobile experience, design quality — and how it stacks up against competitors.' },
  { icon: TrendingUp, title: 'Google Visibility', desc: 'Your local search presence, Google Business Profile status, and what\'s helping (or hurting) your visibility right now.' },
  { icon: Zap, title: 'Quick Wins', desc: 'Actionable changes — some free, some simple — that can make an immediate difference. No strings attached.' },
];

const faqs = [
  { q: 'Is this really free? What\'s the catch?', a: 'No catch. We use the audit to show you what we can do — and to learn about local businesses. If you like what you see and want help, great. If not, you still walk away with real, actionable insights. Zero pressure.' },
  { q: 'I don\'t have a website yet. Can I still do this?', a: 'Absolutely. We\'ll review your current online presence — Google Business Profile, social media, competitor landscape — and give you a roadmap for getting started the right way.' },
  { q: 'How long does the audit take?', a: 'About 30 minutes. We\'ll share our screen, walk you through what we found, and answer any questions. Quick, focused, and zero jargon.' },
  { q: 'Will you try to sell me something?', a: 'We\'ll tell you what we found and what we\'d recommend. If you ask about our services, we\'re happy to explain them. But we won\'t push.' },
];

function FlipCard({ card, index }: { card: typeof flipCards[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className="relative h-64 cursor-pointer group"
        style={{ perspective: '1000px' }}
        onClick={() => setFlipped(!flipped)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div className="absolute inset-0 glass-card-light rounded-xl flex flex-col items-center justify-center p-6 backface-hidden overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-copper/10 flex items-center justify-center mb-4">
              <card.icon className="text-copper" size={28} />
            </div>
            <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-slate text-center">{card.title}</h3>
            <p className="text-xs text-text-tertiary mt-2">Hover to learn more</p>
            {/* Shine sweep on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shine-sweep 0.8s ease-out forwards' }} />
            </div>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 glass-card-dark rounded-xl flex items-center justify-center p-6"
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            <p className="text-dark-text-muted text-sm leading-relaxed text-center">{card.desc}</p>
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

/* ── URL Scanner Mock ── */
function URLScanner() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  function handleScan() {
    if (!url) return;
    setScanning(true);
    setShowResults(false);
    setTimeout(() => {
      setScanning(false);
      setShowResults(true);
    }, 2500);
  }

  const mockResults = [
    { label: 'Performance', score: 42, icon: Gauge, color: 'text-red-400', desc: 'Needs improvement' },
    { label: 'SEO', score: 58, icon: Search, color: 'text-amber-400', desc: 'Below average' },
    { label: 'Mobile', score: 35, icon: Globe, color: 'text-red-400', desc: 'Poor experience' },
    { label: 'Security', score: 71, icon: Shield, color: 'text-amber-400', desc: 'Some issues' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <ScrollReveal>
        <div className="glass-card-dark rounded-2xl p-8 overflow-hidden">
          <p className="text-copper text-xs font-bold uppercase tracking-widest mb-4">Quick Scan Preview</p>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setShowResults(false); }}
              placeholder="Enter your website URL..."
              className="flex-1 bg-slate-card border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-dark-text-muted/40 focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper/40 transition-all text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            />
            <button
              onClick={handleScan}
              disabled={!url || scanning}
              className="bg-copper hover:bg-copper-light text-white font-medium px-6 py-3 rounded-lg transition-all disabled:opacity-40 text-sm whitespace-nowrap"
            >
              {scanning ? 'Scanning...' : 'Scan'}
            </button>
          </div>

          {/* Scanning bar */}
          <AnimatePresence>
            {scanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative h-1 bg-white/5 rounded-full overflow-hidden mb-6"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-copper to-transparent scan-bar" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {mockResults.map((r, i) => (
                    <motion.div
                      key={r.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 rounded-xl p-4 text-center"
                    >
                      <r.icon size={20} className={`${r.color} mx-auto mb-2`} />
                      <div className={`font-mono text-2xl font-bold ${r.color}`}>{r.score}</div>
                      <p className="text-cream text-xs font-medium mt-1">{r.label}</p>
                      <p className="text-dark-text-muted text-[10px] mt-0.5">{r.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-dark-text-muted text-xs"
                >
                  This is a preview. Book a free audit for a complete, personalized analysis. ↓
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </div>
  );
}

/* ── Spring-physics FAQ accordion ── */
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

export default function AuditPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
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
    <>
      {/* Hero with spotlight sweep */}
      <section className="aurora-bg grain pt-32 pb-20 relative overflow-hidden">
        {/* Spotlight effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent spotlight-sweep" />
        </div>

        <AmbientOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <Breadcrumb items={[{ label: 'Free Audit' }]} dark />
          <ScrollReveal>
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">The Lookout</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4">
              Is your website working as hard as you are?
            </h1>
            <p className="text-dark-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-2">
              Find out in 30 minutes — completely free.
            </p>
            <p className="text-copper font-medium text-sm">No sales pitch. No obligation. Just honest insight.</p>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" />

      {/* Flip cards */}
      <section className="bg-cream py-16 sm:py-20 cedar-texture relative">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate text-center mb-12">What you&apos;ll learn</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flipCards.map((card, i) => (
              <FlipCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* URL Scanner */}
      <section className="bg-white py-16 sm:py-20 relative">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate text-center mb-4">See it in action</h2>
            <p className="text-text-secondary text-center mb-10 max-w-lg mx-auto">Try our quick scanner to get a preview of your website&apos;s health. The full audit goes much deeper.</p>
          </ScrollReveal>
          <URLScanner />
        </div>
      </section>

      <MountainDivider variant={2} fillColor="#1A1D20" />

      {/* Form */}
      <section className="bg-slate grain py-16 sm:py-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream text-center mb-2">Book your free audit</h2>
            <p className="text-dark-text-muted text-center mb-10">Takes 30 seconds. We&apos;ll be in touch within one business day.</p>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-forest/20 border border-forest/30 rounded-xl p-8 text-center">
                  <CheckCircle2 className="text-forest-light mx-auto mb-4" size={48} />
                  <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-cream mb-2">Request received!</h3>
                  <p className="text-dark-text-muted">Your audit is on its way! Grab a coffee from your favorite Kootenay café while you wait. ☕</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { name: 'name', label: 'Your Name', type: 'text', required: true },
                    { name: 'business', label: 'Business Name', type: 'text', required: true },
                    { name: 'website', label: 'Website URL (if you have one)', type: 'url', required: false },
                    { name: 'email', label: 'Email', type: 'email', required: true },
                    { name: 'phone', label: 'Phone', type: 'tel', required: true },
                  ].map((field) => (
                    <div key={field.name}>
                      <label htmlFor={`audit-${field.name}`} className="block text-sm font-medium text-dark-text-muted mb-1.5">
                        {field.label} {!field.required && <span className="text-dark-text-muted/50">(optional)</span>}
                      </label>
                      <input type={field.type} id={`audit-${field.name}`} name={field.name} required={field.required} className="w-full bg-slate-card border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-dark-text-muted/40 focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper/40 transition-all" placeholder={field.label} />
                    </div>
                  ))}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle size={16} /> {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button type="submit" disabled={status === 'sending'} className="w-full bg-copper hover:bg-copper-light text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60">
                    {status === 'sending' ? 'Sending...' : 'Request My Free Audit →'}
                  </button>
                  <p className="text-dark-text-muted/60 text-xs text-center">Your info stays between us. No spam. No sharing. Ever.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={3} fillColor="#F8F4F0" />

      {/* FAQ with spring physics */}
      <section className="bg-cream py-16 sm:py-20 cedar-texture relative">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate text-center mb-10">Common questions</h2>
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
    </>
  );
}
