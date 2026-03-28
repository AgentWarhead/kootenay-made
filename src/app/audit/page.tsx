'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Search, TrendingUp, Zap, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

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
    q: 'How long does the audit take?',
    a: 'About 30 minutes. We\'ll share our screen, walk you through what we found, and answer any questions. Quick, focused, and zero jargon.',
  },
  {
    q: 'Will you try to sell me something?',
    a: 'We\'ll tell you what we found and what we\'d recommend. If you ask about our services, we\'re happy to explain them. But we won\'t push. Our best clients come to us when they\'re ready — not when they\'re pressured.',
  },
];

export default function AuditPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-slate grain py-20 sm:py-28">
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <ScrollReveal>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4">
              Is your website working as hard as you are?
            </h1>
            <p className="text-dark-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-2">
              Find out in 30 minutes — completely free.
            </p>
            <p className="text-copper font-medium text-sm">
              No sales pitch. No obligation. Just honest insight.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate text-center mb-12">
              What you&apos;ll learn
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Search, title: 'Your website\'s first impression score', desc: 'We\'ll show you exactly what potential customers see — load time, mobile experience, design quality — and how it stacks up.' },
              { icon: TrendingUp, title: 'How you show up on Google', desc: 'Your local search presence, Google Business Profile, and what\'s helping (or hurting) your visibility right now.' },
              { icon: Zap, title: 'Quick wins you can implement today', desc: 'Actionable changes — some free, some simple — that can make an immediate difference. No strings attached.' },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-cream-border h-full">
                  <div className="w-12 h-12 rounded-lg bg-copper/10 flex items-center justify-center mb-4">
                    <card.icon className="text-copper" size={24} />
                  </div>
                  <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-slate mb-2">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-slate grain py-16 sm:py-20">
        <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream text-center mb-2">
              Book your free audit
            </h2>
            <p className="text-dark-text-muted text-center mb-10">
              Takes 30 seconds to request. We&apos;ll be in touch within one business day.
            </p>

            {submitted ? (
              <div className="bg-forest/20 border border-forest/30 rounded-xl p-8 text-center">
                <CheckCircle2 className="text-forest-light mx-auto mb-4" size={48} />
                <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-cream mb-2">
                  Request received!
                </h3>
                <p className="text-dark-text-muted">
                  We&apos;ll review your info and reach out within one business day to schedule your audit. Talk soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name', label: 'Your Name', type: 'text', required: true },
                  { name: 'business', label: 'Business Name', type: 'text', required: true },
                  { name: 'website', label: 'Website URL (if you have one)', type: 'url', required: false },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'phone', label: 'Phone', type: 'tel', required: true },
                ].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-dark-text-muted mb-1.5">
                      {field.label} {!field.required && <span className="text-dark-text-muted/50">(optional)</span>}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      className="w-full bg-slate-card border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-dark-text-muted/40 focus:outline-none focus:border-copper transition-colors"
                      placeholder={field.label}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-copper hover:bg-copper-light text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                >
                  Request My Free Audit →
                </button>
                <p className="text-dark-text-muted/60 text-xs text-center">
                  Your info stays between us. No spam. No sharing. Ever.
                </p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate text-center mb-10">
              Common questions
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-cream-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-[family-name:var(--font-satoshi)] font-semibold text-slate text-sm sm:text-base pr-4">
                      {faq.q}
                    </span>
                    {openFaq === i ? <ChevronUp size={18} className="text-copper shrink-0" /> : <ChevronDown size={18} className="text-text-tertiary shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
