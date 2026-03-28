'use client';

import { useState } from 'react';
import { Mail, MapPin, Clock, Coffee, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import MountainDivider from '@/components/MountainDivider';
import AmbientOrbs from '@/components/AmbientOrbs';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

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
    <>
      {/* Header */}
      <section className="aurora-bg grain pt-32 pb-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <Breadcrumb items={[{ label: 'Contact' }]} dark />
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">Contact</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight max-w-3xl">
              Come say hi.
            </h1>
            <p className="mt-6 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Whether you know exactly what you need or just have a question — we&apos;d love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" />

      {/* Form + Info */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-forest/10 border border-forest/20 rounded-2xl p-8 sm:p-12 text-center"
                    >
                      <CheckCircle2 className="text-forest mx-auto mb-4" size={48} />
                      <h3 className="font-[family-name:var(--font-satoshi)] text-2xl font-bold text-slate mb-2">Message sent!</h3>
                      <p className="text-text-secondary">Sent! We&apos;ll get back to you faster than the ferry crosses the lake. ⛴️</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate mb-2">Name</label>
                          <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg border border-cream-border bg-white text-slate placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors" placeholder="Your name" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate mb-2">Email</label>
                          <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-cream-border bg-white text-slate placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors" placeholder="you@example.com" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="business" className="block text-sm font-medium text-slate mb-2">Business Name <span className="text-text-tertiary">(optional)</span></label>
                        <input type="text" id="business" name="business" className="w-full px-4 py-3 rounded-lg border border-cream-border bg-white text-slate placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors" placeholder="Your business" />
                      </div>
                      <div>
                        <label htmlFor="interest" className="block text-sm font-medium text-slate mb-2">What are you interested in?</label>
                        <select id="interest" name="interest" className="w-full px-4 py-3 rounded-lg border border-cream-border bg-white text-slate focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors">
                          <option value="">Select an option...</option>
                          <option value="website">New Website</option>
                          <option value="rebrand">Brand Build / Rebrand</option>
                          <option value="ecommerce">E-Commerce Store</option>
                          <option value="email">Email Marketing</option>
                          <option value="ai">AI Business Setup</option>
                          <option value="google">Google / Local SEO</option>
                          <option value="audit">Free Website Audit</option>
                          <option value="other">Something Else</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate mb-2">Message</label>
                        <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 rounded-lg border border-cream-border bg-white text-slate placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors resize-none" placeholder="Tell us about your project or ask any question..." />
                      </div>

                      <AnimatePresence>
                        {status === 'error' && (
                          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle size={16} /> {errorMsg}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full sm:w-auto bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </ScrollReveal>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.2}>
                <div className="space-y-8">
                  <div className="flex justify-center mb-4">
                    <Image src="/brand/kmd-graphic-nobg.png" alt="Kootenay Made Digital" width={80} height={80} className="opacity-90 drop-shadow-[0_0_20px_rgba(193,120,23,0.3)] drop-shadow-[0_0_40px_rgba(193,120,23,0.15)] brightness-110" />
                  </div>
                  {[
                    { icon: Mail, label: 'Email', value: 'hello@kootenaymade.ca', href: 'mailto:hello@kootenaymade.ca' },
                    { icon: MapPin, label: 'Location', value: 'Castlegar, BC, Canada' },
                    { icon: Clock, label: 'Response Time', value: 'Usually within 24 hours' },
                    { icon: Coffee, label: 'Availability', value: 'Available for coffee ☕' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
                        <item.icon size={20} className="text-copper" />
                      </div>
                      <div>
                        <p className="text-sm text-text-tertiary mb-0.5">{item.label}</p>
                        {item.href ? (
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
    </>
  );
}
