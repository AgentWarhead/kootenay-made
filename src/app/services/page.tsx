'use client';

import Link from 'next/link';
import { ArrowRight, Check, Globe, Palette, ShoppingBag, Mail, Bot, Search, Star, Megaphone } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import RiverWave from '@/components/RiverWave';
import AmbientOrbs from '@/components/AmbientOrbs';
import BalancedText from '@/components/BalancedText';
import CostCalculator from '@/components/CostCalculator';
import PretextFreezeThaw from '@/components/PretextFreezeThaw';
import PretextExplainer from '@/components/PretextExplainer';
import FrostMeltOverlay from '@/components/FrostMeltOverlay';
import FrostCursorTrail from '@/components/FrostCursorTrail';

const serviceCards = [
  { icon: Star, name: 'Free AI Website Audit', price: '$0', desc: 'A 30-minute walkthrough of your current online presence with actionable recommendations.', features: ['Full site review', 'SEO quick-check', 'Competitor comparison', 'Prioritized action plan'], tier: 'entry', highlight: true },
  { icon: Search, name: 'Google Domination Package', price: '$500', desc: 'When someone searches "plumber near me" or "best restaurant in Trail" — you show up.', features: ['Google Business Profile setup', 'Local SEO foundations', 'Review strategy', 'Directory listings'], tier: 'entry' },
  { icon: Megaphone, name: 'Social Media Launchpad', price: '$500', desc: 'Professional social media presence from scratch.', features: ['Profile creation & branding', 'Content templates', 'Posting strategy', 'Platform optimization'], tier: 'entry' },
  { icon: Globe, name: 'Modern Business Website', price: '$1,500–$4,000', desc: 'A website that works as hard as you do. Shows up on Google. Looks great on phones. Makes people call.', features: ['Custom design', 'Mobile responsive', 'SEO-optimized', 'Contact forms & CTAs', 'Google Analytics', 'Content writing included', '2–4 week delivery'], tier: 'core' },
  { icon: Mail, name: 'Email Marketing Engine', price: '$750–$1,500', desc: 'Stay in touch with customers without lifting a finger. Birthday discounts, follow-ups — all on autopilot.', features: ['Platform setup', 'Welcome sequence', 'Abandoned cart flow', 'Newsletter template', 'List building strategy'], tier: 'core' },
  { icon: Bot, name: 'AI Business Setup', price: '$1,500', desc: 'The tools the big companies use, set up for your business. Save hours every week on the stuff you hate doing.', features: ['Claude Pro setup', '5 custom workflows', '1.5hr training', '30-day support', 'Quick-reference cheat sheet'], tier: 'core' },
  { icon: ShoppingBag, name: 'Shopify E-Commerce', price: '$3,000–$6,000', desc: 'Sell online while you\'re out on the lake. Your store never closes.', features: ['Custom Shopify theme', 'Product catalog', 'Payment & shipping', 'Email integration', 'SEO & analytics', 'Training'], tier: 'premium' },
  { icon: Palette, name: 'Full Brand Build', price: '$4,000–$8,000', desc: 'Logo, colours, business cards, the works. Walk into any meeting looking like you\'ve been around for 20 years.', features: ['Logo & wordmark', 'Color palette & typography', 'Brand voice & guidelines', 'Business cards', 'Website included', 'Social branding'], tier: 'premium', highlight: true },
];

const retainers = [
  { name: 'Essential', price: '$150', desc: 'Keep things running.', features: ['Monthly updates', 'Security monitoring', 'Uptime checks', '1 hour support'] },
  { name: 'Growth', price: '$300', desc: 'Actively grow.', features: ['Everything in Essential', 'SEO improvements', 'Content updates', 'Monthly analytics'], highlight: true },
  { name: 'Premium', price: '$500', desc: 'Full-service partner.', features: ['Everything in Growth', 'Email campaigns', 'Social media', 'Priority support'] },
];

const tierLabels: Record<string, { label: string; color: string }> = {
  entry: { label: 'Starter', color: 'bg-forest/15 text-forest' },
  core: { label: 'Core', color: 'bg-copper/15 text-copper' },
  premium: { label: 'Premium', color: 'bg-river/15 text-river' },
};

/* ── SVG Icon with stroke draw animation ── */
function DrawServiceIcon({ icon: Icon, delay = 0 }: { icon: typeof Star; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Icon size={24} className="text-copper" />
    </motion.div>
  );
}

function PinnedCard({ card, index, total }: { card: typeof serviceCards[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [3, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const tierColors: Record<string, string> = {
    entry: 'bg-cream',
    core: 'bg-white',
    premium: 'bg-slate text-cream',
  };

  const tier = tierLabels[card.tier];

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, x, rotate, zIndex: index }}
      className="sticky top-20 sm:top-24 lg:top-32"
    >
      <div className={`rounded-2xl p-5 sm:p-8 lg:p-10 border ${card.highlight ? 'border-copper/40 shadow-lg' : 'border-cream-border'} ${tierColors[card.tier]} mb-6 relative overflow-hidden`}>
        {/* Animated copper border for highlighted cards */}
        {card.highlight && (
          <div className="absolute inset-0 rounded-2xl animated-gradient-border opacity-20 pointer-events-none" style={{ margin: '-1px' }} />
        )}
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 relative z-10">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${card.tier === 'premium' ? 'bg-copper/20' : 'bg-copper/10'}`}>
            <DrawServiceIcon icon={card.icon} delay={index * 0.05} />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <h3 className={`font-[family-name:var(--font-satoshi)] text-xl font-bold ${card.tier === 'premium' ? 'text-cream' : 'text-slate'}`}>{card.name}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${tier.color}`}>
                  {tier.label}
                </span>
              </div>
              <span className="font-[family-name:var(--font-satoshi)] text-2xl font-bold text-copper">{card.price}</span>
            </div>
            <BalancedText as="p" className={`text-sm leading-relaxed mb-6 ${card.tier === 'premium' ? 'text-dark-text-muted' : 'text-text-secondary'}`}>{card.desc}</BalancedText>
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

/* ── How It Works — 3-step process ── */
function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const steps = [
    { num: '01', title: 'Discovery', desc: 'We talk. You share your goals, your audience, and what makes your business unique. We listen and build a plan.' },
    { num: '02', title: 'Design & Build', desc: 'We craft your digital presence — fast, beautiful, and optimized. You get to see progress and give feedback along the way.' },
    { num: '03', title: 'Launch', desc: 'We go live. Your site is deployed, SEO is dialed in, and you get full training so you\'re never stuck.' },
  ];

  return (
    <div ref={ref} className="mt-20">
      <ScrollReveal>
        <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2">The Process</p>
        <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-12">How it works</h2>
      </ScrollReveal>

      <div className="relative">
        {/* Connecting line */}
        <svg className="absolute left-8 top-12 bottom-12 w-0.5 hidden sm:block" style={{ height: 'calc(100% - 6rem)' }}>
          <motion.line
            x1="0" y1="0" x2="0" y2="100%"
            stroke="#C17817"
            strokeWidth="2"
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>

        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-6 items-start"
            >
              <div className="w-16 h-16 rounded-2xl bg-copper/10 flex items-center justify-center shrink-0 relative z-10 border-2 border-cream">
                <span className="font-mono text-copper font-bold text-lg">{step.num}</span>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-md">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Retainer Tier Toggle ── */
function RetainerSection() {
  const [activeTier, setActiveTier] = useState(1);

  return (
    <div>
      {/* Toggle pills */}
      <div className="flex justify-center gap-2 mb-10 overflow-x-auto scrollbar-hide">
        {retainers.map((r, i) => (
          <button
            key={r.name}
            onClick={() => setActiveTier(i)}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap min-h-[44px] ${
              activeTier === i
                ? 'bg-copper text-white shadow-lg shadow-copper/20'
                : 'bg-white/10 text-dark-text-muted hover:bg-white/15'
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Animated card display */}
      <div className="max-w-lg mx-auto">
        {retainers.map((r, i) => (
          <motion.div
            key={r.name}
            initial={false}
            animate={{
              opacity: activeTier === i ? 1 : 0,
              scale: activeTier === i ? 1 : 0.95,
              y: activeTier === i ? 0 : 20,
              display: activeTier === i ? 'block' : 'none',
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`glass-card-dark rounded-2xl p-6 sm:p-10 ${r.highlight ? 'ring-1 ring-copper/30' : ''}`}>
              {r.highlight && <span className="text-xs text-copper font-semibold uppercase tracking-wider">Recommended</span>}
              <h3 className="font-[family-name:var(--font-satoshi)] text-2xl font-bold text-cream mt-2">{r.name}</h3>
              <div className="mt-3 mb-6">
                <span className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl font-bold text-copper">{r.price}</span>
                <span className="text-dark-text-muted text-sm">/month</span>
              </div>
              <BalancedText as="p" className="text-dark-text-muted text-base mb-8">{r.desc}</BalancedText>
              <ul className="space-y-4">
                {r.features.map((f, fi) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: fi * 0.08 }}
                    className="flex items-start gap-3 text-dark-text-muted"
                  >
                    <Check size={18} className="text-forest-light mt-0.5 shrink-0" />
                    {f}
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full justify-center"
              >
                Get Started <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* All tiers comparison (desktop) */}
      <div className="hidden md:grid grid-cols-3 gap-6 mt-12">
        {retainers.map((r, i) => (
          <ScrollReveal key={r.name} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className={`glass-card-dark rounded-2xl p-8 h-full cursor-pointer ${
                activeTier === i ? 'ring-2 ring-copper/40' : r.highlight ? 'ring-1 ring-copper/20' : ''
              }`}
              onClick={() => setActiveTier(i)}
            >
              {r.highlight && <span className="text-xs text-copper font-semibold uppercase tracking-wider">Recommended</span>}
              <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-cream mt-2">{r.name}</h3>
              <div className="mt-2 mb-4">
                <span className="font-[family-name:var(--font-satoshi)] text-3xl font-bold text-copper">{r.price}</span>
                <span className="text-dark-text-muted text-sm">/month</span>
              </div>
              <BalancedText as="p" className="text-dark-text-muted text-sm mb-6">{r.desc}</BalancedText>
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
  );
}

export default function ServicesPage() {
  return (
    <div className="overflow-x-hidden">
      <FrostCursorTrail />
      <section className="aurora-bg grain pt-32 pb-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={[{ label: 'Services' }]} dark />
          <ScrollReveal>
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">The Workshop</p>
            <BalancedText as="h1" className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight max-w-3xl">
              Transparent pricing. No surprises.
            </BalancedText>
            <p className="mt-6 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Every project is different, but you deserve to know what things cost before you pick up the phone.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <RiverWave fillColor="#0a1520" bgColor="#1A1D20" />

      {/* Pretext Freeze & Thaw */}
      <section className="relative overflow-hidden border-t border-white/5" style={{ background: 'linear-gradient(180deg, #0a1520 0%, #1A1D20 50%, #0a1520 100%)' }}>
        {/* Frost overlay that melts via scroll */}
        <FrostMeltOverlay />
        <div className="absolute inset-0 grain" />
        {/* Frost crystal pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(168,216,234,0.4) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(168,216,234,0.3) 0%, transparent 40%),
            radial-gradient(circle at 50% 10%, rgba(200,230,255,0.2) 0%, transparent 30%)
          `
        }} />
        {/* Frozen edge vignette */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(168,216,234,0.08) 0%, transparent 20%, transparent 80%, rgba(168,216,234,0.08) 100%)'
        }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-20">
          <ScrollReveal>
            <div className="text-center mb-8">
              <p className="text-ice-blue font-[family-name:var(--font-satoshi)] text-sm tracking-[0.15em] uppercase opacity-60">Interactive Demo</p>
            </div>
          </ScrollReveal>
          <PretextFreezeThaw />
          <div className="text-center mt-6">
            <p className="text-copper text-lg sm:text-xl font-bold font-[family-name:var(--font-satoshi)]" style={{ textShadow: '0 0 20px rgba(193,120,23,0.3)' }}>&quot;We turn cold websites into warm leads.&quot;</p>
          </div>
          {/* Explainer accordion */}
          <PretextExplainer
            text="Each character knows its exact width and position. As your cursor approaches, they freeze in real-time — no pre-rendered animation, pure math. This kind of interactivity keeps visitors on your site 3x longer than a static page."
          />
        </div>
      </section>

      {/* Pinned card stack */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2">Our Services</p>
            <BalancedText as="h2" className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-12">From quick wins to full builds.</BalancedText>
          </ScrollReveal>

          <div className="relative">
            {serviceCards.map((card, i) => (
              <PinnedCard key={card.name} card={card} index={i} total={serviceCards.length} />
            ))}
          </div>

          <div className="relative z-20">
            <HowItWorks />
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <CostCalculator />

      <RiverWave fillColor="#1A1D20" bgColor="#F8F4F0" />

      {/* Retainers */}
      <section className="bg-slate grain py-20 sm:py-24 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-2">Monthly Retainers</p>
            <BalancedText as="h2" className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-2">
              Ongoing support that grows with you.
            </BalancedText>
          </ScrollReveal>

          <div className="mt-12">
            <RetainerSection />
          </div>
        </div>
      </section>

      <RiverWave fillColor="#F8F4F0" bgColor="#1A1D20" />

      {/* CTA */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
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
    </div>
  );
}
