'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Mail, Clock, Coffee, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import MountainDivider from '@/components/MountainDivider';
import AmbientOrbs from '@/components/AmbientOrbs';
import TypingEcho from '@/components/TypingEcho';
import SeasonalParticles from '@/components/SeasonalParticles';
import PretextBearScramble from '@/components/PretextBearScramble';
import PretextExplainer from '@/components/PretextExplainer';

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
        {/* Parallax mountain at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
          style={{ y: 0 }}
        >
          <MountainDivider variant={1} fillColor="#F8F4F0" bgColor="#1A1D20" />
        </motion.div>
      </section>

      {/* Pretext Bear Scramble — surprise! no heading */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d120d 0%, #1A1D20 50%, #0d120d 100%)' }}>
        <div className="absolute inset-0 grain" />
        {/* Forest canopy light */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            radial-gradient(ellipse at 25% 20%, rgba(45,106,79,0.5) 0%, transparent 40%),
            radial-gradient(ellipse at 75% 30%, rgba(45,106,79,0.4) 0%, transparent 35%),
            radial-gradient(ellipse at 50% 60%, rgba(45,106,79,0.3) 0%, transparent 45%)
          `
        }} />
        {/* Ground fog at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4" style={{
          background: 'linear-gradient(0deg, rgba(255,255,255,0.02) 0%, transparent 100%)'
        }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16">
          <PretextBearScramble />
          <div className="text-center mt-2 animate-[fadeIn_0.5s_ease-out_2s_both]">
            <p className="text-cream/25 text-xs font-[family-name:var(--font-satoshi)] tracking-wider">hover over the towns...</p>
          </div>
          <div className="text-center mt-4">
            <p className="text-cream/50 text-sm font-[family-name:var(--font-satoshi)]">&quot;Don&apos;t worry. We don&apos;t bite.&quot;</p>
          </div>
          <PretextExplainer
            text="Every town name scatters differently because every letter is measured individually. This is the same technology that makes text wrap perfectly on any screen size, load faster, and look sharper. The fun stuff is just the tip of the iceberg."
          />
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3" ref={formRef}>
              <TypingEcho>
              <ScrollReveal>
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
                          { value: 'website', label: 'New Website' },
                          { value: 'rebrand', label: 'Brand Build / Rebrand' },
                          { value: 'ecommerce', label: 'E-Commerce Store' },
                          { value: 'email', label: 'Email Marketing' },
                          { value: 'ai', label: 'AI Business Setup' },
                          { value: 'google', label: 'Google / Local SEO' },
                          { value: 'audit', label: 'Free Website Audit' },
                          { value: 'other', label: 'Something Else' },
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

                      <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto bg-copper hover:bg-copper-light text-white font-medium px-8 py-3.5 sm:py-4 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
                      >
                        {status === 'sending' ? 'Sending...' : 'Send it into the wild 🐻'}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </ScrollReveal>
              </TypingEcho>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.2}>
                <div className="space-y-8">
                  <div className="flex justify-center mb-4">
                    <Image src="/brand/kmd-graphic-nobg.png" alt="Kootenay Made Digital" width={120} height={120} className="brightness-[1.5]" />
                  </div>
                  {[
                    { icon: Mail, label: 'Email', value: 'hello@kootenaymade.ca', href: 'mailto:hello@kootenaymade.ca' },
                    { icon: MountainIcon, label: 'Location', value: 'Castlegar, BC, Canada', isSvg: true },
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
                      </div>
                    </div>
                  ))}
                  <div className="mt-10 p-6 rounded-2xl bg-white border border-cream-border">
                    <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-slate mb-2">Free Website Audit</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Not sure where to start? Book a free 30-minute audit. We&apos;ll review your current online presence and give you an honest, actionable plan. No strings attached.
                    </p>
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
