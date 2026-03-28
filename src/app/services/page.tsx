'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';

const tiers = [
  {
    label: 'Entry Points',
    desc: 'Low-commitment ways to get started.',
    services: [
      {
        name: 'Free AI Website Audit',
        price: '$0',
        desc: 'A 30-minute walkthrough of your current online presence with actionable recommendations.',
        features: ['Full site review', 'SEO quick-check', 'Competitor comparison', 'Prioritized action plan'],
        cta: 'Book Your Audit',
        highlight: true,
      },
      {
        name: 'Google Domination Package',
        price: '$500',
        desc: 'Get found on Google Maps and local search. One-time setup that keeps working.',
        features: ['Google Business Profile setup & optimization', 'Local SEO foundations', 'Review strategy', 'Listing on key directories'],
      },
      {
        name: 'Social Media Launchpad',
        price: '$500',
        desc: 'Professional social media presence from scratch — branded, optimized, ready to post.',
        features: ['Profile creation & branding', 'Content templates', 'Posting strategy', 'Platform optimization'],
      },
    ],
  },
  {
    label: 'Core Services',
    desc: 'The bread and butter. Where most clients start.',
    services: [
      {
        name: 'Modern Business Website',
        price: '$1,500 – $4,000',
        desc: 'A fast, beautiful, mobile-first website designed to bring in customers — not just look pretty.',
        features: ['Custom design (not a template)', 'Mobile responsive', 'SEO-optimized', 'Contact forms & CTAs', 'Google Analytics', 'Content writing included', '2–4 week delivery'],
        highlight: true,
      },
      {
        name: 'Email Marketing Engine',
        price: '$750 – $1,500',
        desc: 'Automated email flows that nurture leads and bring customers back. Set it and let it work.',
        features: ['Email platform setup (Klaviyo/Mailchimp)', 'Welcome sequence (3–5 emails)', 'Abandoned cart flow (e-commerce)', 'Newsletter template', 'List building strategy'],
      },
      {
        name: 'AI Business Setup',
        price: '$1,500',
        desc: 'Set up AI tools that actually save you time. Claude Pro, custom workflows, and hands-on training.',
        features: ['Claude Pro setup & configuration', '5 custom AI workflows for your business', '1.5-hour training session', '30-day support', 'Quick-reference cheat sheet', 'Client pays $20/mo for Claude Pro directly'],
      },
    ],
  },
  {
    label: 'Premium',
    desc: 'Full-scale builds for businesses ready to invest.',
    services: [
      {
        name: 'Shopify E-Commerce',
        price: '$3,000 – $6,000',
        desc: 'A complete online store — designed to sell, optimized to convert, built to scale.',
        features: ['Custom Shopify theme', 'Product catalog setup', 'Payment & shipping config', 'Email marketing integration', 'SEO & analytics', 'Training on store management'],
      },
      {
        name: 'Full Brand Build',
        price: '$4,000 – $8,000',
        desc: 'Your complete brand identity — from logo to website to every touchpoint. The full package.',
        features: ['Logo & wordmark design', 'Color palette & typography', 'Brand voice & guidelines', 'Business cards & collateral', 'Website (included)', 'Social media branding', 'Brand strategy document'],
        highlight: true,
      },
    ],
  },
];

const retainers = [
  {
    name: 'Essential',
    price: '$150',
    period: '/month',
    desc: 'Keep things running smoothly.',
    features: ['Monthly updates & maintenance', 'Security monitoring', 'Uptime checks', '1 hour of support'],
  },
  {
    name: 'Growth',
    price: '$300',
    period: '/month',
    desc: 'Actively grow your online presence.',
    features: ['Everything in Essential', 'SEO improvements', 'Content updates', 'Monthly analytics report'],
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$500',
    period: '/month',
    desc: 'Full-service digital partner.',
    features: ['Everything in Growth', 'Email campaigns', 'Social media management', 'Priority support'],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate grain pt-32 pb-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <Breadcrumb items={[{ label: 'Services' }]} dark />
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">Services & Pricing</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight max-w-3xl">
              Transparent pricing.<br />No surprises.
            </h1>
            <p className="mt-6 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Every project is different, but you deserve to know what things cost before you pick up the phone. Here&apos;s what we offer.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Tiers */}
      {tiers.map((tier, ti) => (
        <section key={tier.label} className={`py-20 sm:py-24 ${ti % 2 === 0 ? 'bg-cream' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <ScrollReveal>
              <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2">{tier.label}</p>
              <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-2">{tier.desc}</h2>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tier.services.map((s, i) => (
                <ScrollReveal key={s.name} delay={i * 0.08}>
                  <div className={`group relative rounded-2xl p-8 h-full border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    s.highlight
                      ? 'bg-white border-copper/30 shadow-md'
                      : 'bg-white border-cream-border hover:border-copper/20'
                  }`}>
                    {s.highlight && (
                      <div className="absolute -top-3 left-6 bg-copper text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Popular
                      </div>
                    )}
                    <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate mb-1">{s.name}</h3>
                    <p className="font-[family-name:var(--font-satoshi)] text-2xl font-bold text-copper mb-4">{s.price}</p>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">{s.desc}</p>
                    <ul className="space-y-3">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                          <Check size={16} className="text-forest mt-0.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {'cta' in s && s.cta && (
                      <Link href="/contact" className="mt-6 inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02]">
                        {s.cta} <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Retainers */}
      <section className="bg-slate grain py-20 sm:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-2">Monthly Retainers</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-2">
              Ongoing support that grows with you.
            </h2>
            <p className="text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Don&apos;t just launch and forget. Keep your digital presence sharp with monthly care.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {retainers.map((r, i) => (
              <ScrollReveal key={r.name} delay={i * 0.1}>
                <div className={`rounded-2xl p-8 h-full border transition-all duration-300 hover:-translate-y-1 ${
                  r.highlight
                    ? 'bg-slate-card border-copper/30 ring-1 ring-copper/20'
                    : 'bg-slate-card border-white/5 hover:border-copper/20'
                }`}>
                  {r.highlight && (
                    <span className="text-xs text-copper font-semibold uppercase tracking-wider">Recommended</span>
                  )}
                  <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-cream mt-2">{r.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="font-[family-name:var(--font-satoshi)] text-3xl font-bold text-copper">{r.price}</span>
                    <span className="text-dark-text-muted text-sm">{r.period}</span>
                  </div>
                  <p className="text-dark-text-muted text-sm mb-6">{r.desc}</p>
                  <ul className="space-y-3">
                    {r.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-dark-text-muted">
                        <Check size={16} className="text-forest-light mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold text-slate">
              Not sure what you need?
            </h2>
            <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
              Book a free audit and we&apos;ll tell you. No pressure, no sales pitch — just honest advice.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Your Free Audit <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
