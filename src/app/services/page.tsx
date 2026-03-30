'use client';

import Link from 'next/link';
import { ArrowRight, Check, Code, DollarSign, Zap, GraduationCap, Bot, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import RiverWave from '@/components/RiverWave';
import AmbientOrbs from '@/components/AmbientOrbs';
import BalancedText from '@/components/BalancedText';
import PretextFreezeThaw from '@/components/PretextFreezeThaw';
import PretextExplainer from '@/components/PretextExplainer';
import FrostMeltOverlay from '@/components/FrostMeltOverlay';
import FrostCursorTrail from '@/components/FrostCursorTrail';

/* ── Data ── */
const packages = [
  {
    id: 'audit',
    emoji: '🆓',
    name: 'The Audit',
    price: 'FREE',
    priceNote: null,
    tagline: 'Every relationship starts here.',
    description: '30-minute walkthrough of your current online presence with actionable recommendations. No sales pitch, no obligation.',
    features: ['Full website + online presence review', 'Google presence check', 'SEO snapshot', 'Competitor quick-glance', 'AI readiness assessment', 'Branded PDF report with action plan'],
    perfectFor: 'Any business curious about where they stand online.',
    delivery: 'Report delivered within 48 hours',
    tier: 'free',
    popular: false,
  },
  {
    id: 'trailhead',
    emoji: '🌱',
    name: 'The Trailhead',
    price: '$1,500',
    priceNote: null,
    tagline: 'Your first step online — done right.',
    description: 'Single-page scrolling website, hand-coded from scratch.',
    features: ['Custom single-page website', 'Google Business Profile setup', 'Basic local SEO', 'Contact form', 'Google Analytics', 'Content writing included', 'Mobile-optimized'],
    perfectFor: 'New businesses, trades/contractors, anyone who needs to look professional online fast.',
    delivery: '1-2 weeks',
    tier: 'starter',
    popular: false,
  },
  {
    id: 'ai-advantage',
    emoji: '🤖',
    name: 'The AI Advantage',
    price: '$2,000',
    priceNote: 'Requires Claude subscription (~$23-$135 CAD/mo)',
    tagline: 'Your business, supercharged with AI.',
    description: "We learn your workflow, set up AI tools tailored to YOUR business, and train you to use them confidently.",
    features: ['Claude Pro configured for your business', 'Co-Work workspace with your docs + processes', 'Custom AI workflows for your needs', 'Automation setup connecting your tools', 'Google Business tools optimization', 'Hands-on training session', 'Client dashboard access', '30 days follow-up support'],
    perfectFor: "Any business owner who knows AI exists but doesn't know where to start.",
    delivery: '1-2 sessions',
    tier: 'ai',
    popular: false,
  },
  {
    id: 'foundation',
    emoji: '🏔️',
    name: 'The Foundation',
    price: '$4,000',
    priceNote: null,
    tagline: 'Everything a Kootenay business needs.',
    description: 'The complete digital presence. Custom multi-page website with full SEO and Google setup.',
    features: ['Custom multi-page website (up to 7 pages)', 'Full local SEO (schema, structured data, speed optimization)', 'Google Business Profile setup + optimization', 'Google Analytics + Search Console', 'Contact forms + CTAs', 'Content writing for all pages', 'Mobile-optimized'],
    perfectFor: 'Restaurants, salons, professional services, tourism operators, established local businesses.',
    delivery: '2-3 weeks',
    tier: 'popular',
    popular: true,
  },
  {
    id: 'storefront',
    emoji: '🛒',
    name: 'The Storefront',
    price: '$4,500',
    priceNote: 'Shopify subscription extra (~$50-$540 CAD/mo)',
    tagline: 'A professional Shopify store built to sell.',
    description: 'Premium Shopify theme customized to your brand with everything wired to start selling.',
    features: ['Premium Shopify theme customized to your brand', 'Product catalog (up to 50 products)', 'Payment processing + shipping configured', 'Inventory management', 'Google Business Profile + local SEO', 'Email marketing (abandoned cart + welcome series)', 'Analytics + conversion tracking'],
    perfectFor: 'Retail shops going online, product sellers who want professional without fully custom.',
    delivery: '2-3 weeks',
    tier: 'ecommerce',
    popular: false,
  },
  {
    id: 'engine',
    emoji: '⚡',
    name: 'The Engine',
    price: '$6,000',
    priceNote: null,
    tagline: 'For businesses ready to grow, not just exist.',
    description: 'Everything in The Foundation, plus email marketing, social media, and AI — the complete growth system.',
    features: ['Everything in The Foundation', 'Email marketing setup (welcome + automation)', 'Social media creation + branding (2 platforms)', 'AI business tools setup (Claude)', 'Hands-on AI training session', 'Content strategy template'],
    perfectFor: 'Businesses with competition, seasonal operators, anyone done relying solely on word-of-mouth.',
    delivery: '3-4 weeks',
    tier: 'growth',
    popular: false,
    savings: { separate: '$8,000', save: '$2,000' },
  },
  {
    id: 'masterpiece',
    emoji: '🎨',
    name: 'The Masterpiece',
    price: '$8,500',
    priceNote: 'Shopify subscription extra',
    tagline: "Your store, nobody else's.",
    description: '100% custom-coded Shopify theme designed from zero. Unique design matching your brand exactly.',
    features: ['100% custom Shopify theme from scratch', 'Unique design matching your brand', 'Custom product + collection layouts', 'Advanced features (filtering, quick view, size guides)', 'Up to 100 products', 'Payment, shipping, inventory', 'Google Business Profile + local SEO', 'Email marketing (abandoned cart + welcome + post-purchase)', 'Analytics + conversion tracking'],
    perfectFor: 'Brands that want to stand out, established businesses upgrading.',
    delivery: '4-6 weeks',
    tier: 'premium',
    popular: false,
  },
  {
    id: 'empire',
    emoji: '🏰',
    name: 'The Empire',
    price: '$15,000',
    priceNote: 'Starting at',
    tagline: 'Full transformation for complex businesses.',
    description: 'Everything in The Engine, plus full brand identity, multi-location support, and premium everything.',
    features: ['Everything in The Engine', 'Full brand identity (logo, colours, typography, guidelines)', 'Multi-location support + local SEO per location', 'Custom AI workflows', 'Advanced email segmentation', 'Social media branding kit', 'Business cards + print collateral', 'Priority support for 90 days', 'Launch campaign'],
    perfectFor: 'Multi-location businesses, franchise operations, major rebrands.',
    delivery: '4-8 weeks',
    tier: 'enterprise',
    popular: false,
  },
];

const retainers = [
  {
    name: 'Essentials',
    price: '$150',
    period: '/mo',
    tagline: 'Keep it running. Keep it safe.',
    features: ['Monthly security + software updates', '1 content/design update per month', 'Analytics snapshot', 'Client dashboard access', 'Email support (48-hour response)'],
    pairedWith: 'Paired with Trailhead clients',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$350',
    period: '/mo',
    tagline: 'Keep it growing. Keep it ahead.',
    features: ['Everything in Essentials', 'Unlimited minor updates (same-day)', 'SEO improvements + content suggestions', 'Monthly analytics review + report', 'Priority support (24-hour response)', '24/7 AI emergency support (coming soon)', 'Quarterly strategy call'],
    pairedWith: 'Paired with Foundation and above',
    popular: true,
  },
];

const universalFeatures = [
  { icon: Code, title: 'Hand-Coded, Not Templated', desc: 'Every site is built from scratch with the latest technology. No WordPress. No Wix. No shortcuts. Clean, fast code that you own completely.' },
  { icon: DollarSign, title: 'Flat-Rate Pricing, Zero Surprises', desc: 'The price you see is the price you pay. No hidden fees, no scope creep charges. Everything is included.' },
  { icon: Zap, title: 'Same-Day Updates', desc: "Need something changed? Most updates are live within hours, not weeks. Your business moves fast — your website should too." },
  { icon: GraduationCap, title: 'Client Dashboard & Training', desc: 'Every client gets access to our private dashboard with training, AI tools, troubleshooting guides, and resources to grow with technology.' },
  { icon: Bot, title: '24/7 AI Support (Coming Soon)', desc: "Something break at midnight? Our AI support system handles emergencies around the clock so you're never stuck waiting." },
  { icon: Handshake, title: 'Full Handoff, No Lock-In', desc: "When your site is done, it's yours. Full access, full ownership, full training. We earn your business by being worth coming back to." },
];

const comparisonRows = [
  { feature: 'SEO Setup', other: '$500–$1,500 extra', us: '✅ Included' },
  { feature: 'Google Business Profile', other: '$300 extra', us: '✅ Included' },
  { feature: 'Content Writing', other: '$50–$100/page extra', us: '✅ Included' },
  { feature: 'Mobile Optimization', other: '"Responsive add-on"', us: '✅ Always' },
  { feature: 'Analytics Setup', other: '$200 extra', us: '✅ Included' },
  { feature: 'Training & Handoff', other: 'Rarely offered', us: '✅ Always' },
  { feature: 'AI Integration', other: '$15,000+ (enterprise only)', us: '✅ From $2,000' },
];

/* ── ROI Calculator ── */
function ROICalculator() {
  const [customerValue, setCustomerValue] = useState(200);
  const [customersPerMonth, setCustomersPerMonth] = useState(3);

  const monthlyRevenue = customerValue * customersPerMonth;
  const annualRevenue = monthlyRevenue * 12;
  const payoffMonths = monthlyRevenue > 0 ? Math.ceil(4000 / monthlyRevenue) : 0;

  return (
    <section className="bg-slate grain py-20 sm:py-24 relative">
      <AmbientOrbs />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2 text-center">The Math</p>
          <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-4 text-center">
            Will your website pay for itself?
          </h2>
          <p className="text-dark-text-muted text-center mb-12 max-w-xl mx-auto">
            Spoiler: yes. Here&apos;s the math.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card-dark rounded-2xl p-8 sm:p-10 border border-white/10">
            <div className="space-y-8">
              <div>
                <label className="block text-cream font-medium mb-3 font-[family-name:var(--font-satoshi)]">
                  Average value of a new customer
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-copper font-bold text-lg">$</span>
                  <input
                    type="number"
                    value={customerValue}
                    onChange={e => setCustomerValue(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-4 py-3 text-cream font-[family-name:var(--font-satoshi)] text-lg focus:outline-none focus:border-copper/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cream font-medium mb-3 font-[family-name:var(--font-satoshi)]">
                  New customers from website per month
                </label>
                <input
                  type="number"
                  value={customersPerMonth}
                  onChange={e => setCustomersPerMonth(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-cream font-[family-name:var(--font-satoshi)] text-lg focus:outline-none focus:border-copper/50 transition-colors"
                />
              </div>

              <motion.div
                key={`${customerValue}-${customersPerMonth}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-white/10 pt-8 space-y-4"
              >
                <div className="text-center">
                  <p className="text-dark-text-muted text-sm mb-2">Your website pays for itself in</p>
                  <p className="font-[family-name:var(--font-satoshi)] text-5xl sm:text-6xl font-bold text-copper">
                    {payoffMonths > 0 ? `${payoffMonths}` : '—'}
                    <span className="text-2xl ml-2 text-dark-text-muted font-normal">months</span>
                  </p>
                </div>
                <div className="text-center mt-4">
                  <p className="text-dark-text-muted">
                    That&apos;s{' '}
                    <span className="text-cream font-bold">
                      ${annualRevenue.toLocaleString()}
                    </span>{' '}
                    in new revenue per year from a one-time investment.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Package Card ── */
function PackageCard({ pkg, index }: { pkg: typeof packages[number]; index: number }) {
  const isStartingAt = pkg.priceNote === 'Starting at';
  const hasSavings = 'savings' in pkg && pkg.savings;

  return (
    <ScrollReveal delay={index * 0.05}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={`relative rounded-2xl border flex flex-col h-full transition-shadow duration-300 hover:shadow-xl hover:shadow-copper/10 ${
          pkg.popular
            ? 'border-copper/50 bg-white shadow-lg shadow-copper/15'
            : 'border-cream-border bg-white'
        }`}
      >
        {pkg.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <span className="bg-copper text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
              Most Popular
            </span>
          </div>
        )}

        <div className="p-6 sm:p-7 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl" aria-hidden="true">{pkg.emoji}</span>
            <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-slate">{pkg.name}</h3>
          </div>

          <div className="mb-4">
            {pkg.priceNote && !isStartingAt && (
              <p className="text-xs text-text-secondary mb-1">{pkg.priceNote}</p>
            )}
            {isStartingAt && (
              <p className="text-xs text-text-secondary mb-0.5">Starting at</p>
            )}
            <p className={`font-[family-name:var(--font-satoshi)] font-bold ${pkg.price === 'FREE' ? 'text-4xl text-forest' : 'text-3xl text-slate'}`}>
              {pkg.price}
            </p>
          </div>

          <p className="text-copper italic text-sm mb-3" style={{ fontFamily: 'Georgia, serif' }}>{pkg.tagline}</p>
          <p className="text-text-secondary text-sm leading-relaxed mb-5">{pkg.description}</p>

          <ul className="space-y-2 mb-5 flex-1">
            {pkg.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check size={14} className="text-forest mt-0.5 shrink-0" />
                <span className="text-text-secondary">{f}</span>
              </li>
            ))}
          </ul>

          {hasSavings && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5 text-sm">
              <p className="text-text-secondary">
                Value if bought separately: <span className="line-through">{(pkg as { savings: { separate: string; save: string } }).savings.separate}</span>
              </p>
              <p className="text-green-700 font-semibold">You save {(pkg as { savings: { separate: string; save: string } }).savings.save} 🎉</p>
            </div>
          )}

          <p className="text-xs text-text-secondary italic mb-5 border-t border-cream-border pt-4">
            <span className="font-semibold not-italic text-slate">Perfect for:</span> {pkg.perfectFor}
          </p>
          <p className="text-xs text-copper font-medium mb-5">⏱ {pkg.delivery}</p>

          <Link
            href="/contact"
            className={`inline-flex items-center justify-center gap-2 font-medium px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm mt-auto ${
              pkg.popular
                ? 'bg-copper hover:bg-copper-light text-white shadow-md shadow-copper/20'
                : 'bg-slate/5 hover:bg-slate/10 text-slate border border-slate/20'
            }`}
          >
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

/* ── How It Works ── */
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'We talk. You share your goals, your audience, and what makes your business unique. We listen and build a plan.' },
    { num: '02', title: 'Design & Build', desc: 'We craft your digital presence — fast, beautiful, and optimized. You get to see progress and give feedback along the way.' },
    { num: '03', title: 'Launch', desc: "We go live. Your site is deployed, SEO is dialed in, and you get full training so you're never stuck." },
  ];

  return (
    <section className="bg-[#F5F0E8] cedar-texture py-20 sm:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2">The Process</p>
          <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-12">How it works</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.12}>
              <motion.div whileHover={{ y: -3 }} className="flex flex-col items-start">
                <div className="w-14 h-14 rounded-2xl bg-copper/10 flex items-center justify-center mb-5 border border-copper/20">
                  <span className="font-mono text-copper font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Main Page ── */
export default function ServicesPage() {
  // suppress unused import warning — useRef is used in subcomponents pattern but keeping here for potential future use
  const _ref = useRef(null);
  void _ref;

  return (
    <div className="overflow-x-hidden">
      <FrostCursorTrail />

      {/* 1. Hero */}
      <section className="aurora-bg grain pt-32 pb-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={[{ label: 'Services' }]} dark />
          <ScrollReveal>
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">Our Services</p>
            <BalancedText as="h1" className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight max-w-3xl">
              Built Different.<br />On Purpose.
            </BalancedText>
            <p className="mt-6 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Hand-coded websites, AI integration, and honest marketing for Kootenay businesses. No templates. No surprises. No lock-in.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <RiverWave fillColor="#111827" bgColor="#1A1D20" />

      {/* 2. What Every Package Includes */}
      <section className="py-20 sm:py-24 grain relative" style={{ background: 'linear-gradient(180deg, #111827 0%, #1A1D20 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2">Every Package</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-12 max-w-xl">
              What every package includes — no asterisks.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {universalFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={feat.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate/90 border border-white/8 rounded-2xl p-6 flex flex-col gap-4 h-full hover:shadow-lg hover:shadow-copper/10 hover:border-copper/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-copper/15 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-copper" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-satoshi)] font-bold text-white mb-2">{feat.title}</h3>
                      <p className="text-dark-text-muted text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Industry Anchor Statement */}
      <div style={{ background: 'rgba(193,120,23,0.12)', borderTop: '1px solid rgba(193,120,23,0.25)', borderBottom: '1px solid rgba(193,120,23,0.25)' }} className="py-10 px-4 text-center">
        <p className="font-[family-name:var(--font-satoshi)] text-cream text-lg sm:text-xl font-semibold max-w-3xl mx-auto leading-relaxed">
          &ldquo;The average Canadian web agency charges $7,000–$30,000 for a custom website. We deliver the same quality — hand-coded, not templated — at a fraction of that.&rdquo;
        </p>
        <p className="text-dark-text-muted text-xs mt-3">Source: Clio Websites survey of 136 Canadian developers, 2025</p>
      </div>

      <RiverWave fillColor="#1A1D20" bgColor="#0a1520" />

      {/* 4. Pretext Freeze & Thaw — preserved exactly */}
      <section className="relative overflow-hidden border-t border-white/5" style={{ background: 'linear-gradient(180deg, #0a1520 0%, #1A1D20 50%, #0a1520 100%)' }}>
        <FrostMeltOverlay />
        <div className="absolute inset-0 grain" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(168,216,234,0.4) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(168,216,234,0.3) 0%, transparent 40%),
            radial-gradient(circle at 50% 10%, rgba(200,230,255,0.2) 0%, transparent 30%)
          `
        }} />
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
          <PretextExplainer
            text="Each character knows its exact width and position. As your cursor approaches, they freeze in real-time — no pre-rendered animation, pure math. This kind of interactivity keeps visitors on your site 3x longer than a static page."
          />
        </div>
      </section>

      <RiverWave fillColor="#F5F0E8" bgColor="#0a1520" />

      {/* 5. Package Cards */}
      <section className="bg-[#F5F0E8] cedar-texture py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2">Our Packages</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-4">Choose Your Path</h2>
            <p className="text-text-secondary max-w-xl mb-14">
              Every package is built for Kootenay businesses — flat pricing, full ownership, zero surprises.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        </div>
      </section>

      <RiverWave fillColor="#1A1D20" bgColor="#F5F0E8" />

      {/* 6. Comparison Table */}
      <section className="bg-slate grain py-20 sm:py-24 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2">The Difference</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-12">
              What&apos;s included vs. other agencies
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-copper/30" style={{ background: 'rgba(193,120,23,0.18)' }}>
                    <th className="text-left px-5 py-4 text-copper font-bold uppercase tracking-wider text-xs">Feature</th>
                    <th className="text-center px-5 py-4 text-copper font-bold uppercase tracking-wider text-xs">Other Agencies</th>
                    <th className="text-center px-5 py-4 text-copper font-bold uppercase tracking-wider text-xs">Kootenay Made</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-white/5 transition-colors hover:bg-white/5 ${i % 2 === 0 ? 'bg-white/3' : ''}`}
                    >
                      <td className="px-5 py-4 text-cream font-medium">{row.feature}</td>
                      <td className="px-5 py-4 text-center text-dark-text-muted">{row.other}</td>
                      <td className="px-5 py-4 text-center text-green-400 font-semibold">{row.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <RiverWave fillColor="#F5F0E8" bgColor="#1A1D20" />

      {/* 7. Retainer Cards */}
      <section className="bg-[#F5F0E8] cedar-texture py-20 sm:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2">Monthly Retainers</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-4">
              Ongoing support that grows with you.
            </h2>
            <p className="text-text-secondary mb-12 max-w-xl">
              Your website is live. Now keep it growing. Our retainers handle everything so you can focus on running your business.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {retainers.map((r, i) => (
              <ScrollReveal key={r.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`relative rounded-2xl border flex flex-col h-full p-7 ${
                    r.popular
                      ? 'border-copper/50 bg-white shadow-lg shadow-copper/15'
                      : 'border-cream-border bg-white'
                  }`}
                >
                  {r.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-copper text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                        Recommended
                      </span>
                    </div>
                  )}

                  <div className="mb-2">
                    <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate">{r.name}</h3>
                    <p className="text-copper italic text-sm mt-1" style={{ fontFamily: 'Georgia, serif' }}>{r.tagline}</p>
                  </div>

                  <div className="my-4">
                    <span className="font-[family-name:var(--font-satoshi)] text-4xl font-bold text-slate">{r.price}</span>
                    <span className="text-text-secondary text-sm ml-1">{r.period}</span>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {r.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check size={14} className="text-forest mt-0.5 shrink-0" />
                        <span className="text-text-secondary">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-text-secondary italic mb-5 border-t border-cream-border pt-4">{r.pairedWith}</p>

                  <Link
                    href="/contact"
                    className={`inline-flex items-center justify-center gap-2 font-medium px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm ${
                      r.popular
                        ? 'bg-copper hover:bg-copper-light text-white shadow-md shadow-copper/20'
                        : 'bg-slate/5 hover:bg-slate/10 text-slate border border-slate/20'
                    }`}
                  >
                    Get Started <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <RiverWave fillColor="#1A1D20" bgColor="#F5F0E8" />

      {/* 8. ROI Calculator */}
      <ROICalculator />

      <RiverWave fillColor="#F5F0E8" bgColor="#1A1D20" />

      {/* 9. Capacity + Payment Notice */}
      <section className="bg-[#F5F0E8] cedar-texture py-16 sm:py-20 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6" style={{ background: 'rgba(193,120,23,0.1)', border: '1px solid rgba(193,120,23,0.25)' }}>
              <span className="text-copper text-sm font-semibold">📅 Currently booking for May 2026</span>
            </div>
            <p className="text-slate font-[family-name:var(--font-satoshi)] text-lg font-semibold mb-3">
              We take on 3–4 projects per month to ensure every client gets our full attention.
            </p>
            <p className="text-text-secondary mb-6">
              Split any package into 2–3 payments — no interest, no fees.
            </p>
            <div className="inline-flex items-center gap-2 rounded-xl px-6 py-3" style={{ background: 'rgba(45,106,79,0.08)', border: '1px solid rgba(45,106,79,0.2)' }}>
              <span className="text-lg">🏔️</span>
              <span className="text-forest font-[family-name:var(--font-satoshi)] font-semibold text-sm">
                Kootenay Neighbours Rate: 10% off any package for West Kootenay businesses
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <RiverWave fillColor="#F5F0E8" bgColor="#1A1D20" />

      {/* 11. How It Works */}
      <HowItWorks />

      <RiverWave fillColor="#1A1D20" bgColor="#F5F0E8" />

      {/* 10. Risk Reversal + CTA */}
      <section className="aurora-bg grain py-24 sm:py-32 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-dark-text-muted text-sm mb-4 italic">
              Not happy after the first draft? We&apos;ll revise until you are — or refund your deposit.
            </p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold text-cream mb-6">
              Ready to stand out online?
            </h2>
            <p className="text-dark-text-muted text-lg mb-10 max-w-xl mx-auto">
              Start with a free audit. Zero pressure. We&apos;ll tell you exactly where you stand and what&apos;s worth doing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-base"
              >
                Book Your Free Audit <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-cream hover:border-white/40 font-medium px-8 py-4 rounded-xl transition-all duration-200 hover:bg-white/5 text-base"
              >
                Or just say hi →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
