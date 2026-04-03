'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Mail, Clock, Coffee, CheckCircle2, AlertCircle, Phone, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import AmbientOrbs from '@/components/AmbientOrbs';
import TypingEcho from '@/components/TypingEcho';
import SeasonalParticles from '@/components/SeasonalParticles';

/* ── Mountain icon for location ── */
function MountainIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 21l4-10 4 10" />
      <path d="M2 21h20" />
      <path d="M15 15l3-6 4 12" />
      <path d="M12 7l1-2" />
      <path d="M10 11l-1.5-3" />
    </svg>
  );
}

/* ── Floating label input ── */
function FloatingInput({ id, name, type = 'text', required = false }: { id: string; name: string; type?: string; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isActive = focused || hasValue;

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={id}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setHasValue(!!e.target.value); }}
        onChange={(e) => setHasValue(!!e.target.value)}
        className={`w-full px-4 py-3 pt-6 rounded-lg border bg-white text-slate focus:outline-none transition-all duration-300 peer ${
          focused ? 'border-copper ring-1 ring-copper/40' : 'border-cream-border'
        }`}
        style={focused ? { animation: 'copper-focus-glow 1s ease-out forwards' } : undefined}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isActive
            ? 'top-1.5 text-[11px] text-copper font-medium'
            : 'top-4 text-sm text-text-tertiary'
        }`}
      >
        {name}{!required && <span className="text-text-tertiary/60"> (optional)</span>}
      </label>
    </div>
  );
}

/* ── Floating label textarea ── */
function FloatingTextarea({ id, name, required = false }: { id: string; name: string; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = focused || hasValue;

  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        required={required}
        rows={5}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setHasValue(!!e.target.value); }}
        onChange={(e) => setHasValue(!!e.target.value)}
        className={`w-full px-4 py-3 pt-6 rounded-lg border bg-white text-slate focus:outline-none resize-none transition-all duration-300 ${
          focused ? 'border-copper ring-1 ring-copper/40' : 'border-cream-border'
        }`}
        style={focused ? { animation: 'copper-focus-glow 1s ease-out forwards' } : undefined}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isActive
            ? 'top-1.5 text-[11px] text-copper font-medium'
            : 'top-4 text-sm text-text-tertiary'
        }`}
      >
        {name}
      </label>
    </div>
  );
}

/* ── Floating label select ── */
function FloatingSelect({ id, name, options }: { id: string; name: string; options: { value: string; label: string }[] }) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = focused || hasValue;

  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setHasValue(!!e.target.value); }}
        onChange={(e) => setHasValue(!!e.target.value)}
        className={`w-full px-4 py-3 pt-6 rounded-lg border bg-white text-slate focus:outline-none transition-all duration-300 ${
          focused ? 'border-copper ring-1 ring-copper/40' : 'border-cream-border'
        }`}
        defaultValue=""
      >
        <option value="" disabled></option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isActive
            ? 'top-1.5 text-[11px] text-copper font-medium'
            : 'top-4 text-sm text-text-tertiary'
        }`}
      >
        {name}
      </label>
    </div>
  );
}

/* ── Summit celebration confetti ── */
function SummitCelebration({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string; delay: number }>>([]);

  const generateParticles = useCallback(() => {
    const emojis = ['🌲', '❄️', '🏔️', '⛰️', '🌿', '🍃'];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300,
      y: -(Math.random() * 200 + 50),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      delay: Math.random() * 0.5,
    }));
  }, []);

  useEffect(() => {
    if (active) {
      setParticles(generateParticles());
    }
  }, [active, generateParticles]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: '50%', y: '50%', opacity: 1, scale: 1 }}
          animate={{
            x: `calc(50% + ${p.x}px)`,
            y: `calc(50% + ${p.y}px)`,
            opacity: 0,
            scale: 0,
            rotate: Math.random() * 720,
          }}
          transition={{ duration: 2, delay: p.delay, ease: 'easeOut' }}
          className="absolute text-xl"
          style={{ left: 0, top: 0 }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}

/* ── What Happens Next — 3-step process ── */
function WhatHappensNext() {
  const steps = [
    { emoji: '📝', title: 'Tell us about your project', note: 'You are here', active: true },
    { emoji: '☕', title: 'Brett gets back to you within 24 hours', note: 'No fluff. Just a real reply.' },
    { emoji: '🚀', title: 'Get a custom plan', note: 'No obligation, no pressure.' },
  ];

  return (
    <div className="mb-10">
      <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-xs tracking-[0.2em] uppercase mb-4">What Happens Next</p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 flex-1 relative">
            {/* connector line between steps (desktop) */}
            {i < steps.length - 1 && (
              <div className="hidden sm:block absolute top-5 left-1/2 w-full h-px bg-copper/20" style={{ left: '50%' }} />
            )}
            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${
              step.active ? 'bg-copper/20 ring-2 ring-copper' : 'bg-cream border border-cream-border'
            }`}>
              {step.emoji}
            </div>
            <div className="sm:text-center">
              <p className={`text-sm font-medium leading-snug ${step.active ? 'text-slate' : 'text-text-secondary'}`}>{step.title}</p>
              <p className={`text-xs mt-0.5 ${step.active ? 'text-copper font-medium' : 'text-text-tertiary'}`}>{step.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Pain-point social proof ── */
function SocialProof() {
  const painPoints = [
    'Tired of your website looking like it was built in 2012?',
    'Losing customers to competitors who show up on Google first?',
    'Paying too much for a website that doesn\'t actually bring in business?',
  ];

  return (
    <ScrollReveal>
      <div className="bg-slate/5 border border-slate/10 rounded-2xl p-6 sm:p-8 mb-12">
        <div className="space-y-3 mb-5">
          {painPoints.map((point, i) => (
            <p key={i} className="text-slate text-sm sm:text-base font-medium flex items-start gap-2">
              <span className="text-copper mt-0.5 shrink-0">›</span>
              {point}
            </p>
          ))}
        </div>
        <p className="text-text-secondary text-sm leading-relaxed border-t border-slate/10 pt-4">
          You&apos;re not alone. These are the exact problems Kootenay businesses bring to us — and exactly what we solve.
        </p>
      </div>
    </ScrollReveal>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    data.source = 'contact';
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong');
      setStatus('success');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <div className="overflow-x-hidden">
      <SeasonalParticles />
      {/* Header with parallax mountain */}
      <section className="aurora-bg grain pt-32 pb-20 relative overflow-hidden">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={[{ label: 'Contact' }]} dark />
          <ScrollReveal>
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">The Trailhead</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight max-w-3xl">
              Come say hi.
            </h1>
            <p className="mt-6 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Whether you know exactly what you need or just have a question — we&apos;d love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3" ref={formRef}>
              {/* Pain-point social proof */}
              <SocialProof />

              {/* What Happens Next */}
              <ScrollReveal>
                <WhatHappensNext />
              </ScrollReveal>

              <TypingEcho>
              <ScrollReveal>
                {/* Micro-headline above form */}
                <p className="font-[family-name:var(--font-satoshi)] text-lg sm:text-xl font-semibold text-slate mb-6">
                  Tell us what you&apos;re building. We&apos;ll tell you how we can help.
                </p>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-forest/10 border border-forest/20 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden"
                    >
                      <SummitCelebration active={true} />
                      <CheckCircle2 className="text-forest mx-auto mb-4 relative z-10" size={48} />
                      <h3 className="font-[family-name:var(--font-satoshi)] text-2xl font-bold text-slate mb-2 relative z-10">Message sent!</h3>
                      <p className="text-text-secondary relative z-10">Sent! We&apos;ll get back to you faster than the ferry crosses the lake. ⛴️</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FloatingInput id="name" name="Your Name" required />
                        <FloatingInput id="email" name="Email" type="email" required />
                      </div>
                      <FloatingInput id="business" name="Business Name" />
                      <FloatingSelect
                        id="interest"
                        name="What are you interested in?"
                        options={[
                          { value: 'website', label: 'I need a new website' },
                          { value: 'rebrand', label: 'Brand refresh or rebrand' },
                          { value: 'ecommerce', label: 'Online store (Shopify)' },
                          { value: 'email', label: 'Email marketing' },
                          { value: 'ai', label: 'AI tools for my business' },
                          { value: 'google', label: 'Get found on Google' },
                          { value: 'audit', label: 'Free website audit' },
                          { value: 'other', label: 'Something else entirely' },
                        ]}
                      />
                      <FloatingSelect
                        id="budget"
                        name="What's your rough budget?"
                        options={[
                          { value: 'exploring', label: 'Just exploring' },
                          { value: 'under-1k', label: 'Under $1,000' },
                          { value: '1k-3k', label: '$1,000 – $3,000' },
                          { value: '3k-6k', label: '$3,000 – $6,000' },
                          { value: '6k-plus', label: '$6,000+' },
                        ]}
                      />
                      <FloatingTextarea id="message" name="Tell us about your project..." required />

                      <AnimatePresence>
                        {status === 'error' && (
                          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle size={16} /> {errorMsg}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div>
                        <motion.button
                          type="submit"
                          disabled={status === 'sending'}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto bg-copper hover:bg-copper-light text-white font-medium px-8 py-3.5 sm:py-4 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                          {status === 'sending' ? 'Sending...' : 'Send it into the wild 🐻'}
                        </motion.button>

                        {/* Risk reversal */}
                        <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
                          {[
                            'No commitment. No sales pitch.',
                            'We reply within 24 hours',
                            'Your info stays between us',
                          ].map((item) => (
                            <p key={item} className="text-xs text-text-tertiary flex items-center gap-1">
                              <span className="text-forest">✅</span> {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </ScrollReveal>
              </TypingEcho>
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.2}>
                <div className="space-y-8">
                  {/* Logo + personal touch */}
                  <div className="flex flex-col items-center mb-4 text-center">
                    <Image src="/brand/kmd-graphic-nobg.png" alt="Kootenay Made Digital" width={120} height={120} className="brightness-[1.5]" />
                    <p className="text-sm text-text-secondary mt-3 max-w-[200px] leading-snug">
                      You&apos;ll be working with Brett — one person, not an agency machine.
                    </p>
                  </div>

                  {/* Info items */}
                  {[
                    { icon: Mail, label: 'Email', value: 'hello@kootenaymade.ca', href: 'mailto:hello@kootenaymade.ca' },
                    { icon: Phone, label: 'Text or Call', value: '778-986-4468', href: 'tel:+17789864468', note: 'Text anytime. To arrange a call, submit the form first so we have context.' },
                    { icon: MountainIcon, label: 'Location', value: 'Castlegar, BC — Serving Trail, Nelson, Rossland & the West Kootenays', isSvg: true },
                    { icon: Clock, label: 'Response Time', value: 'Usually within 24 hours' },
                    { icon: Coffee, label: 'Availability', value: 'Available for coffee ☕' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
                        {'isSvg' in item ? (
                          <MountainIcon className="w-5 h-5 text-copper" />
                        ) : (
                          <item.icon size={20} className="text-copper" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-text-tertiary mb-0.5">{item.label}</p>
                        {'href' in item && item.href ? (
                          <a href={item.href} className="text-slate font-medium hover:text-copper transition-colors">{item.value}</a>
                        ) : (
                          <p className="text-slate font-medium">{item.value}</p>
                        )}
                        {'note' in item && item.note && (
                          <p className="text-xs text-text-tertiary mt-1 leading-snug">{item.note}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Urgency line */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
                      <CalendarDays size={20} className="text-copper" />
                    </div>
                    <div>
                      <p className="text-sm text-text-tertiary mb-0.5">Availability</p>
                      <p className="text-slate font-medium">Currently booking for May 2026</p>
                    </div>
                  </div>

                  {/* Free Audit CTA card */}
                  <div className="mt-10 p-6 rounded-2xl bg-white border border-cream-border">
                    <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-slate mb-2">Free Website Audit</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      Not sure where to start? Book a free 30-minute audit. We&apos;ll review your current online presence and give you an honest, actionable plan. No strings attached.
                    </p>
                    <Link
                      href="/audit"
                      className="inline-flex items-center gap-1 text-copper font-semibold text-sm border border-copper/40 rounded-lg px-4 py-2 hover:bg-copper hover:text-white transition-all duration-200"
                    >
                      Get Your Free Audit →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
