'use client';

import Link from 'next/link';
import { ArrowRight, Check, Globe, Palette, ShoppingBag, Mail, Bot, Search, Star, Megaphone } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import MountainDivider from '@/components/MountainDivider';
import AmbientOrbs from '@/components/AmbientOrbs';
import FogTransition from '@/components/FogTransition';

const serviceCards = [
  { icon: Star, name: 'Free AI Website Audit', price: '$0', desc: 'A 30-minute walkthrough of your current online presence with actionable recommendations.', features: ['Full site review', 'SEO quick-check', 'Competitor comparison', 'Prioritized action plan'], tier: 'entry', highlight: true },
  { icon: Search, name: 'Google Domination Package', price: '$500', desc: 'Get found on Google Maps and local search. One-time setup that keeps working.', features: ['Google Business Profile setup', 'Local SEO foundations', 'Review strategy', 'Directory listings'], tier: 'entry' },
  { icon: Megaphone, name: 'Social Media Launchpad', price: '$500', desc: 'Professional social media presence from scratch.', features: ['Profile creation & branding', 'Content templates', 'Posting strategy', 'Platform optimization'], tier: 'entry' },
  { icon: Globe, name: 'Modern Business Website', price: '$1,500–$4,000', desc: 'Fast, beautiful, mobile-first — designed to bring in customers.', features: ['Custom design', 'Mobile responsive', 'SEO-optimized', 'Contact forms & CTAs', 'Google Analytics', 'Content writing included', '2–4 week delivery'], tier: 'core', highlight: true },
  { icon: Mail, name: 'Email Marketing Engine', price: '$750–$1,500', desc: 'Automated email flows that nurture leads and bring customers back.', features: ['Platform setup', 'Welcome sequence', 'Abandoned cart flow', 'Newsletter template', 'List building strategy'], tier: 'core' },
  { icon: Bot, name: 'AI Business Setup', price: '$1,500', desc: 'AI tools that save you time. Custom workflows and training.', features: ['Claude Pro setup', '5 custom workflows', '1.5hr training', '30-day support', 'Quick-reference cheat sheet'], tier: 'core' },
  { icon: ShoppingBag, name: 'Shopify E-Commerce', price: '$3,000–$6,000', desc: 'A complete online store — built to sell, optimized to convert.', features: ['Custom Shopify theme', 'Product catalog', 'Payment & shipping', 'Email integration', 'SEO & analytics', 'Training'], tier: 'premium' },
  { icon: Palette, name: 'Full Brand Build', price: '$4,000–$8,000', desc: 'Complete brand identity — logo to website to every touchpoint.', features: ['Logo & wordmark', 'Color palette & typography', 'Brand voice & guidelines', 'Business cards', 'Website included', 'Social branding'], tier: 'premium', highlight: true },
];

const retainers = [
  { name: 'Essential', price: '$150', desc: 'Keep things running.', features: ['Monthly updates', 'Security monitoring', 'Uptime checks', '1 hour support'] },
  { name: 'Growth', price: '$300', desc: 'Actively grow.', features: ['Everything in Essential', 'SEO improvements', 'Content updates', 'Monthly analytics'], highlight: true },
  { name: 'Premium', price: '$500', desc: 'Full-service partner.', features: ['Everything in Growth', 'Email campaigns', 'Social media', 'Priority support'] },
];

function PinnedCard({ card, index, total }: { card: typeof serviceCards[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  const tierColors: Record<string, string> = {
    entry: 'bg-cream',
    core: 'bg-white',
    premium: 'bg-slate text-cream',
  };

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, zIndex: index }}
      className="sticky top-28"
    >
      <div className={`rounded-2xl p-8 sm:p-10 border ${card.highlight ? 'border-copper/40 shadow-lg' : 'border-cream-border'} ${tierColors[card.tier]} mb-6`}>
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${card.tier === 'premium' ? 'bg-copper/20' : 'bg-copper/10'}`}>
            <card.icon size={24} className="text-copper" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h3 className={`font-[family-name:var(--font-satoshi)] text-xl font-bold ${card.tier === 'premium' ? 'text-cream' : 'text-slate'}`}>{card.name}</h3>
              <span className="font-[family-name:var(--font-satoshi)] text-2xl font-bold text-copper">{card.price}</span>
            </div>
            <p className={`text-sm leading-relaxed mb-6 ${card.tier === 'premium' ? 'text-dark-text-muted' : 'text-text-secondary'}`}>{card.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {card.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm">
                  <Check size={14} className="text-forest mt-0.5 shrink-0" />
                  <span className={card.tier === 'premium' ? 'text-dark-text-muted' : 'text-text-secondary'}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="aurora-bg grain pt-32 pb-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <Breadcrumb items={[{ label: 'Services' }]} dark />
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">Services & Pricing</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight max-w-3xl">
              Transparent pricing.<br />No surprises.
            </h1>
            <p className="mt-6 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Every project is different, but you deserve to know what things cost before you pick up the phone.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" />

      {/* Pinned card stack */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2">Our Services</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-12">From quick wins to full builds.</h2>
          </ScrollReveal>
          
          {serviceCards.map((card, i) => (
            <PinnedCard key={card.name} card={card} index={i} total={serviceCards.length} />
          ))}
        </div>
      </section>

      <MountainDivider variant={2} fillColor="#1A1D20" />

      {/* Retainers */}
      <section className="bg-slate grain py-20 sm:py-24 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-2">Monthly Retainers</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-2">
              Ongoing support that grows with you.
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {retainers.map((r, i) => (
              <ScrollReveal key={r.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`glass-card-dark rounded-2xl p-8 h-full ${
                    r.highlight ? 'ring-1 ring-copper/20' : ''
                  }`}
                >
                  {r.highlight && <span className="text-xs text-copper font-semibold uppercase tracking-wider">Recommended</span>}
                  <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-cream mt-2">{r.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="font-[family-name:var(--font-satoshi)] text-3xl font-bold text-copper">{r.price}</span>
                    <span className="text-dark-text-muted text-sm">/month</span>
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
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <MountainDivider variant={3} fillColor="#F8F4F0" />

      {/* CTA */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold text-slate">
              Not sure what you need?
            </h2>
            <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
              Book a free audit and we&apos;ll tell you. No pressure — just honest advice.
            </p>
            <Link
              href="/audit"
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
