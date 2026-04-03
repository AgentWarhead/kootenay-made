'use client';

import Link from 'next/link';
import { ArrowRight, Check, Code, DollarSign, Zap, GraduationCap, Bot, Handshake } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import RiverWave from '@/components/RiverWave';
import AmbientOrbs from '@/components/AmbientOrbs';
import BalancedText from '@/components/BalancedText';


/* ── Category Data ── */
const categories = [
  {
    id: 'all',
    emoji: '✨',
    label: 'Show All',
    desc: 'Browse everything we offer',
  },
  {
    id: 'websites',
    emoji: '🌐',
    label: 'Get Online',
    desc: 'A website that works as hard as you do',
  },
  {
    id: 'ecommerce',
    emoji: '🛒',
    label: 'Sell Online',
    desc: 'Turn your products into online sales',
  },
  {
    id: 'ai',
    emoji: '🤖',
    label: 'Work Smarter',
    desc: 'AI tools built for your actual workflow',
  },
  {
    id: 'gobig',
    emoji: '🏰',
    label: 'Go Big',
    desc: 'Full transformation, nothing held back',
  },
];

/* ── Immersive Category Cards Data ── */
const categoryCards = [
  {
    id: 'websites',
    emoji: '🌐',
    label: 'Get Online',
    description: "Your business deserves to be found. We'll build you a website that makes you look as good online as you are in person.",
    image: '/images/categories/get-online.png',
    packageCount: 4,
  },
  {
    id: 'ecommerce',
    emoji: '🛒',
    label: 'Sell Online',
    description: "Ready to sell beyond the counter? From Shopify stores to custom print-on-demand, we'll get your products in front of the world.",
    image: '/images/categories/sell-online.png',
    packageCount: 3,
  },
  {
    id: 'ai',
    emoji: '🤖',
    label: 'Work Smarter',
    description: "AI isn't just for tech companies. We'll set up tools that save you hours every week — and teach you how to use them.",
    image: '/images/categories/work-smarter.png',
    packageCount: 2,
  },
  {
    id: 'gobig',
    emoji: '🏰',
    label: 'Go Big',
    description: "Full transformation. Brand, website, AI, marketing — everything your business needs to dominate, built by your neighbors.",
    image: '/images/categories/go-big.png',
    packageCount: 1,
  },
  {
    id: 'retainers',
    emoji: '🔄',
    label: 'Stay Growing',
    description: 'Your site is live. Now keep it safe, fast, and getting better every month.',
    image: '/images/categories/stay-growing.png',
    packageCount: 2,
  },
];

/* ── Package Data ── */
const packages = [
  {
    id: 'audit',
    category: 'websites',
    emoji: '🆓',
    name: 'The Audit',
    price: 'FREE',
    priceNote: null,
    monthlyHint: null,
    tagline: 'Every great website starts with an honest look.',
    description: 'We run your entire online presence through a custom AI-powered audit — design, branding, Google visibility, competitor gaps, trust signals, the works. You get a plain-English report that tells you exactly what\'s working, what\'s not, and what to fix first. No sales pitch. No fluff. Just the truth.',
    featuresShort: [
      'Custom AI audit of your design & brand confidence',
      'How you show up on Google Maps, Search & Reviews',
      'See what your competitors are doing that you\'re not',
      'Mobile & speed performance check',
      'Trust signals audit — does your site make people feel safe?',
      'Branded PDF report with a prioritized action plan',
    ],
    featuresFull: [
      'Custom AI audit of your design & brand confidence',
      'How you show up on Google Maps, Search & Reviews',
      'See what your competitors are doing that you\'re not',
      'Mobile & speed performance check',
      'Trust signals audit — does your site make people feel safe?',
      'Branded PDF report with a prioritized action plan',
    ],
    perfectFor: 'Any Kootenay business curious about where they stand online.',
    delivery: 'Report in 48 hours',
    tier: 'free',
    popular: false,
  },
  {
    id: 'trailhead',
    category: 'websites',
    emoji: '🌱',
    name: 'The Trailhead',
    price: '$1,500',
    priceNote: null,
    monthlyHint: null,
    tagline: 'Your first step online — done right.',
    description: 'We build you a clean, professional website. One page, beautifully done. You\'ll look established from day one. Lifetime access to the Neighbours Dashboard included.',
    featuresShort: [
      'Beautiful single-page website, built for you',
      'Shows up when locals search for your service',
      'Contact form so customers can reach you',
      'Works perfectly on phones and tablets',
      'We write all the words — you just review',
      'Stripe payments + crypto via goBlink — included',
      'Lifetime access to the Neighbours Dashboard',
    ],
    featuresFull: [
      'Custom single-page website (not a template)',
      'Google Business Profile setup',
      'Local SEO — we make Google love your site',
      'Contact form',
      'Google Analytics so you can see your visitors',
      'Content writing included',
      'Mobile-optimized',
      'Payment processing: Stripe credit cards + goBlink cryptocurrency (setup included)',
    ],
    perfectFor: 'Plumbers, electricians, hair salons, contractors, anyone who needs to look professional online fast.',
    delivery: '1–2 weeks',
    tier: 'starter',
    popular: false,
  },
  {
    id: 'foundation',
    category: 'websites',
    emoji: '🏔️',
    name: 'The Foundation',
    price: '$4,000',
    priceNote: null,
    monthlyHint: null,
    tagline: 'The complete digital home for your business.',
    description: 'A full multi-page website that tells your whole story. Built to rank on Google and turn visitors into customers. Lifetime access to the Neighbours Dashboard included.',
    featuresShort: [
      'Up to 7 pages (Home, About, Services, Contact…)',
      'We make Google love your site',
      'Full Google setup — Maps, reviews, everything',
      'We write all the content for every page',
      'Looks stunning on every screen',
      'Stripe payments + crypto via goBlink — included',
      'Lifetime access to the Neighbours Dashboard',
    ],
    featuresFull: [
      'Custom multi-page website (up to 7 pages)',
      'Full local SEO — Google-optimized throughout',
      'Google Business Profile setup + optimization',
      'Google Analytics + Search Console',
      'Contact forms + clear calls-to-action',
      'Content writing for all pages',
      'Mobile-optimized',
      'Payment processing: Stripe credit cards + goBlink cryptocurrency (setup included)',
    ],
    perfectFor: 'Restaurants, salons, professional services, tourism operators, retail shops, established Kootenay businesses.',
    delivery: '2–3 weeks',
    tier: 'popular',
    popular: true,
  },
  {
    id: 'engine',
    category: 'websites',
    emoji: '⚡',
    name: 'The Engine',
    price: '$6,000',
    priceNote: null,
    monthlyHint: null,
    tagline: 'Built to grow — not just exist.',
    description: 'Everything in The Foundation, plus email marketing, social media branding, and AI tools to keep bringing customers back. Lifetime access to the Neighbours Dashboard included.',
    featuresShort: [
      'Everything in The Foundation',
      'Email marketing set up and running',
      'Social media accounts branded and ready',
      'AI tools configured for your business',
      'We train you on everything',
      'Stripe payments + crypto via goBlink — included',
      'Lifetime access to the Neighbours Dashboard',
    ],
    featuresFull: [
      'Everything in The Foundation',
      'Email marketing setup (welcome series + automation)',
      'Social media branding for 2 platforms',
      'AI business tools setup (Claude)',
      'Hands-on AI training session',
      'Content strategy template',
      'Payment processing: Stripe credit cards + goBlink cryptocurrency (setup included)',
    ],
    perfectFor: 'Businesses with real competition, seasonal operators, anyone done relying solely on word-of-mouth.',
    delivery: '3–4 weeks',
    tier: 'growth',
    popular: false,
    savings: { separate: '$8,000', save: '$2,000' },
  },
  {
    id: 'brand',
    category: 'websites',
    emoji: '🎨',
    name: 'Brand Identity',
    price: '$800',
    priceNote: '$800 as add-on · $1,200 standalone',
    monthlyHint: null,
    tagline: 'Look like you mean business.',
    description: 'Your complete brand toolkit — logo, colors, typography, and a brand strategy document you can hand to anyone who works on your business.',
    featuresShort: [
      'Professional logo design (3 concepts, unlimited revisions)',
      'Complete color palette that works everywhere',
      'Typography selection — fonts that match your personality',
      'Brand strategy document — your business identity on one page',
      'Social media profile graphics ready to upload',
      'All files in every format you\'ll ever need',
    ],
    featuresFull: [
      'Logo design (3 concepts → refinement → final in SVG, PNG, PDF, favicon)',
      'Brand color system (primary, secondary, accent, neutrals — with hex/RGB codes)',
      'Typography pairing (display + body fonts, usage guidelines)',
      'Brand strategy document (voice, tone, audience, positioning)',
      'Social media kit (profile pics, cover images for major platforms)',
      'Brand guidelines PDF for consistency',
      'All source files included (AI/EPS/SVG)',
    ],
    perfectFor: 'New businesses without a logo, anyone embarrassed by their current branding, businesses that look different everywhere.',
    delivery: '1–2 weeks',
    tier: 'addon',
    popular: false,
  },
  {
    id: 'storefront',
    category: 'ecommerce',
    emoji: '🛒',
    name: 'The Storefront',
    price: '$4,500',
    priceNote: 'Shopify subscription: ~$50–$75 CAD/mo',
    monthlyHint: null,
    tagline: 'A professional online store, ready to sell.',
    description: 'We set up your Shopify store from scratch — branded, polished, and wired to take payments. You focus on products; we handle everything else. Lifetime access to the Neighbours Dashboard included.',
    featuresShort: [
      'Your Shopify store, fully set up and branded',
      'Up to 15 products loaded and ready',
      'Payments, shipping, and taxes all configured',
      'Email follow-ups to recover abandoned carts',
      'Shows up on Google',
      'Stripe payments + crypto via goBlink — included',
      'Lifetime access to the Neighbours Dashboard',
    ],
    featuresFull: [
      'Premium Shopify theme customized to your brand',
      'Product catalog (up to 15 products)',
      'Payment processing + shipping configured',
      'Inventory management',
      'Google Business Profile + local SEO',
      'Email marketing (abandoned cart + welcome series)',
      'Analytics + conversion tracking',
      'Payment processing: Stripe credit cards + goBlink cryptocurrency (setup included)',
    ],
    perfectFor: 'Retail shops going online, artisans, gift shops, anyone selling physical products.',
    delivery: '2–3 weeks',
    tier: 'ecommerce',
    popular: false,
  },
  {
    id: 'masterpiece',
    category: 'ecommerce',
    emoji: '🎨',
    name: 'The Masterpiece',
    price: '$8,500',
    priceNote: 'Shopify subscription: ~$50–$75 CAD/mo',
    monthlyHint: null,
    tagline: "Your store, designed from the ground up.",
    description: 'A 100% custom Shopify store — no themes, no compromises. Built to look exactly like your brand and sell like crazy. Lifetime access to the Neighbours Dashboard included.',
    featuresShort: [
      'Fully custom design (not a template)',
      'Up to 30 products',
      'Advanced features: filters, quick view, size guides',
      'Complete email marketing system',
      'Full analytics to track what\'s working',
      'Stripe payments + crypto via goBlink — included',
      'Lifetime access to the Neighbours Dashboard',
    ],
    featuresFull: [
      '100% custom Shopify theme from scratch',
      'Unique design matching your brand exactly',
      'Custom product + collection layouts',
      'Advanced features (filtering, quick view, size guides)',
      'Up to 30 products',
      'Payment, shipping, inventory fully configured',
      'Google Business Profile + local SEO',
      'Email marketing (abandoned cart + welcome + post-purchase)',
      'Analytics + conversion tracking',
      'Payment processing: Stripe credit cards + goBlink cryptocurrency (setup included)',
    ],
    perfectFor: 'Established brands that want to stand out, businesses upgrading from a basic store.',
    delivery: '4–6 weeks',
    tier: 'premium',
    popular: false,
  },
  {
    id: 'pod',
    category: 'ecommerce',
    emoji: '🖨️',
    name: 'Print-on-Demand Setup',
    price: '$500',
    priceNote: 'Add-on with Storefront or Masterpiece',
    monthlyHint: null,
    tagline: 'Sell merch. Zero inventory. Pure profit.',
    description: 'We connect your Shopify store to print-on-demand so your designs appear on t-shirts, mugs, totes, and more. Customer orders, it ships, you collect the margin. Lifetime access to the Neighbours Dashboard included.',
    featuresShort: [
      'Printify connected to your Shopify store',
      'Up to 10 products with your designs applied',
      'Shipping and fulfillment fully configured',
      'We check your profit margins (so you actually make money)',
      'Lifetime access to the Neighbours Dashboard',
    ],
    featuresFull: [
      'Printify account setup + Shopify integration',
      'Up to 10 products with your designs applied',
      'Shipping + fulfillment configured',
      'Profit margins reviewed',
      'AI-generated product mockups available',
      'Guidance on your first product line',
    ],
    perfectFor: 'Any business wanting to sell branded merchandise without holding inventory.',
    delivery: '3–5 days (add-on)',
    tier: 'addon',
    popular: false,
  },
  {
    id: 'ai-advantage',
    category: 'ai',
    emoji: '🤖',
    name: 'The AI Advantage',
    price: '$2,000',
    priceNote: 'Claude subscription: ~$23–$135 CAD/mo',
    monthlyHint: null,
    tagline: 'AI that actually works for your business.',
    description: 'We learn how your business runs, set up AI tools built for your specific workflow, and teach you to use them confidently. No tech degree required. Lifetime access to the Neighbours Dashboard included.',
    featuresShort: [
      'AI set up and trained on your business',
      'Custom automations for your most repetitive tasks',
      'Hands-on training — you leave knowing how to use it',
      '30 days of follow-up support',
      'Lifetime access to the Neighbours Dashboard',
    ],
    featuresFull: [
      'Claude Pro configured for your business',
      'Co-Work workspace with your docs + processes',
      'Custom AI workflows for your needs',
      'Automation setup connecting your tools',
      'Google Business tools optimization',
      'Hands-on training session',
      'Client dashboard access',
      '30 days follow-up support',
    ],
    perfectFor: 'Business owners who keep hearing about AI but don\'t know where to start.',
    delivery: '1–2 sessions',
    tier: 'ai',
    popular: false,
  },
  {
    id: 'openclaw',
    category: 'ai',
    emoji: '🦞',
    name: 'AI Assistant Setup',
    price: '$3,000',
    priceNote: null,
    monthlyHint: null,
    tagline: 'Your own 24/7 AI employee — set up and trained on your business.',
    description: 'We install and configure OpenClaw — an always-on AI assistant that lives on your phone, answers customer questions, manages your inbox, handles scheduling, and automates the busywork that eats your day. It works through WhatsApp, Telegram, or text — no app to download. Lifetime access to the Neighbours Dashboard included.',
    featuresShort: [
      'OpenClaw installed, configured, and secured on your own server',
      'Connected to your email, calendar, and business tools',
      'Trained on your business — your services, your prices, your voice',
      'Works through WhatsApp, Telegram, or text message',
      'Handles customer inquiries, scheduling, and follow-ups 24/7',
      'Hands-on training so you know how to use it confidently',
      '30 days of support after setup',
      'Lifetime access to the Neighbours Dashboard',
    ],
    featuresFull: [
      'OpenClaw gateway deployed on dedicated VPS (AWS/DigitalOcean)',
      'Security hardening: firewall, SSH keys, Docker sandboxing',
      'Channel integration: WhatsApp Business, Telegram, or SMS',
      'Email + calendar connection (Gmail/Google Workspace)',
      'Custom skills and workflows for your business processes',
      'AI model configuration (Claude/GPT — optimized for your needs)',
      'Knowledge base setup with your docs, services, and FAQs',
      'Hands-on training session (1-2 hours)',
      '30 days priority support + troubleshooting',
      'Lifetime access to the Neighbours Dashboard',
    ],
    perfectFor: 'Busy business owners drowning in admin, anyone who wants 24/7 customer response without hiring staff.',
    delivery: '3–5 days',
    tier: 'ai',
    popular: false,
    runningCosts: {
      basic: { label: 'Basic Use', monthly: '~$30–$50/mo', breakdown: 'VPS hosting (~$7–$15/mo) + Anthropic API (~$23/mo CAD)' },
      advanced: { label: 'Advanced Use', monthly: '~$80–$160/mo', breakdown: 'VPS hosting (~$15–$25/mo) + Anthropic Pro ($135/mo CAD) + optional integrations' },
    },
  },
  {
    id: 'empire',
    category: 'gobig',
    emoji: '🏰',
    name: 'The Empire',
    price: '$15,000+',
    priceNote: 'Starting at — scope determines final price',
    monthlyHint: null,
    tagline: 'The full transformation. Everything, done right.',
    description: 'When you\'re ready to go all-in. Custom website, full brand identity, AI integration, email marketing, social media, and a launch campaign. Nothing left on the table. Lifetime access to the Neighbours Dashboard included.',
    featuresShort: [
      'Everything in The Engine',
      'Full brand identity (logo, colors, guidelines)',
      'Multi-location support if you need it',
      'Custom AI workflows for your team',
      '90 days priority support after launch',
      'Stripe payments + crypto via goBlink — included',
      'Lifetime access to the Neighbours Dashboard',
    ],
    featuresFull: [
      'Everything in The Engine',
      'Full brand identity (logo, colours, typography, guidelines)',
      'Multi-location support + local SEO per location',
      'Custom AI workflows',
      'Advanced email segmentation',
      'Social media branding kit',
      'Business cards + print collateral',
      'Priority support for 90 days',
      'Launch campaign',
      'Payment processing: Stripe credit cards + goBlink cryptocurrency (setup included)',
    ],
    perfectFor: 'Multi-location businesses, franchise operations, major rebrands, businesses ready to dominate their market.',
    delivery: '4–8 weeks',
    tier: 'enterprise',
    popular: false,
  },
  {
    id: 'retainer-essentials',
    category: 'retainers',
    emoji: '🛡️',
    name: 'Essentials',
    price: '$150',
    priceNote: '/mo',
    monthlyHint: null,
    tagline: 'Keep it running. Keep it safe.',
    description: 'Your site stays secure, updated, and healthy every month — without you having to think about it. Lifetime access to the Neighbours Dashboard included. Our goal is to have you completely self-sufficient within the first few months. The learning curve for AI and modern web tools can be steep — we\'ll guide you through every step.',
    featuresShort: [
      'Monthly security + software updates',
      'One content or design change per month',
      'Analytics snapshot so you know how you\'re doing',
      'Client dashboard access',
      'Email support (we respond within 48 hours)',
      'Lifetime access to the Neighbours Dashboard',
    ],
    featuresFull: [
      'Monthly CMS + plugin security updates',
      'One content or design change per month (up to 2 hours)',
      'Monthly analytics report — plain English, no jargon',
      'Client dashboard access (Neighbours Dashboard)',
      'Email support, 48-hour response guarantee',
      'Uptime monitoring',
    ],
    perfectFor: 'Trailhead clients and anyone who just wants their site maintained without fuss.',
    delivery: 'Ongoing',
    tier: 'starter',
    popular: false,
  },
  {
    id: 'retainer-growth',
    category: 'retainers',
    emoji: '🚀',
    name: 'Growth',
    price: '$350',
    priceNote: '/mo',
    monthlyHint: null,
    tagline: 'Keep growing. Keep ahead.',
    description: 'Everything in Essentials, plus active SEO improvements, unlimited small updates, and a quarterly strategy call to keep momentum going. Lifetime access to the Neighbours Dashboard included. Our goal is to have you completely self-sufficient within the first few months. The learning curve for AI and modern web tools can be steep — we\'ll guide you through every step.',
    featuresShort: [
      'Everything in Essentials',
      'Unlimited small updates (most done same day)',
      'SEO improvements month over month',
      'Monthly analytics review + plain-English report',
      'Priority support (we respond within 24 hours)',
      'Quarterly strategy call',
      'Lifetime access to the Neighbours Dashboard',
    ],
    featuresFull: [
      'Everything in Essentials',
      'Unlimited small content/design updates (up to 8 hours/mo)',
      'Monthly SEO improvements (meta, content, technical)',
      'Full analytics review with recommendations',
      'Priority 24-hour email support',
      'AI emergency support (coming soon)',
      'Quarterly 30-minute strategy call',
      'Competitor monitoring',
    ],
    perfectFor: 'Foundation clients and above — anyone serious about growing their online presence month after month.',
    delivery: 'Ongoing',
    tier: 'popular',
    popular: true,
  },
];

const universalFeatures = [
  {
    icon: Code,
    title: 'Built From Scratch, Just For You',
    desc: 'No cookie-cutter templates. No WordPress. No Wix. Your site is as unique as your business — clean code that\'s fast, yours, and built to last.',
  },
  {
    icon: DollarSign,
    title: 'The Price You See Is The Price You Pay',
    desc: "No hidden fees, no 'oh by the way' invoices. Everything is included upfront. No surprises at the end.",
  },
  {
    icon: Zap,
    title: 'Need Something Changed? Done Today.',
    desc: "Most updates go live within hours. Your business doesn't wait — your website shouldn't either.",
  },
  {
    icon: GraduationCap,
    title: 'The Neighbours Dashboard',
    desc: "Every client gets lifetime access to our private members area — packed with step-by-step guides, troubleshooting manuals, video walkthroughs, and continued learning resources. Something breaks? The answer's probably already there. And if it's not, we are.",
  },
  {
    icon: Bot,
    title: 'Help When You Need It',
    desc: 'Something break at midnight? Our AI support handles emergencies around the clock. (Coming soon)',
  },
  {
    icon: Handshake,
    title: "It's Yours. Period.",
    desc: "When it's done, you own everything — the code, the domain, the content. No hostage situations. We earn your business by being worth coming back to.",
  },
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

/* ── Immersive Category Card ── */
function CategoryCardLarge({
  cat,
  isSelected,
  isOther,
  onSelect,
}: {
  cat: typeof categoryCards[number];
  isSelected: boolean;
  isOther: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: cx * 12, y: cy * 8 });
  };

  const handleMouseLeave = () => setParallax({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      layout
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: isOther ? 1.02 : 1.03, boxShadow: '0 0 0 2px #C17817, 0 20px 60px rgba(193,120,23,0.3)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl cursor-pointer select-none"
      style={{
        aspectRatio: '16/10',
        minHeight: '200px',
        border: isSelected ? '2px solid #C17817' : '2px solid transparent',
        boxShadow: isSelected ? '0 0 0 2px #C17817, 0 20px 60px rgba(193,120,23,0.35)' : undefined,
      }}
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-[-8%] bg-cover bg-center"
        style={{ backgroundImage: `url(${cat.image})` }}
        animate={{ x: parallax.x, y: parallax.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl" role="img" aria-label={cat.label}>{cat.emoji}</span>
              <h3 className="font-[family-name:var(--font-satoshi)] text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-lg">
                {cat.label}
              </h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs drop-shadow-md line-clamp-2">
              {cat.description}
            </p>
          </div>
          <div className="shrink-0">
            <span
              className="inline-block px-3 py-1.5 rounded-full text-xs font-bold text-white whitespace-nowrap"
              style={{ background: 'rgba(193,120,23,0.85)', backdropFilter: 'blur(4px)' }}
            >
              {cat.packageCount} package{cat.packageCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Small category pill (when one is selected) ── */
function CategoryPill({
  cat,
  isActive,
  onSelect,
}: {
  cat: typeof categoryCards[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      layout
      onClick={onSelect}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden rounded-xl flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200"
      style={{
        border: isActive ? '2px solid #C17817' : '2px solid rgba(193,120,23,0.3)',
        background: isActive ? 'rgba(193,120,23,0.15)' : 'rgba(193,120,23,0.06)',
        color: isActive ? '#C17817' : '#8B6834',
        minHeight: '44px',
        minWidth: '44px',
      }}
    >
      <span className="text-base">{cat.emoji}</span>
      <span className="hidden sm:inline">{cat.label}</span>
    </motion.button>
  );
}

/* ── Immersive Package Showcase ── */
function ImmersivePackageShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const packagesRef = useRef<HTMLDivElement>(null);

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    // Smooth scroll to packages after brief delay for animation
    setTimeout(() => {
      packagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    window.scrollTo({ top: packagesRef.current?.offsetTop ?? 0 - 200, behavior: 'smooth' });
  };

  const selectedCat = categoryCards.find(c => c.id === selectedCategory);
  const visiblePackages = selectedCategory
    ? packages.filter(p => p.category === selectedCategory && p.id !== 'audit')
    : [];

  return (
    <div ref={packagesRef} className="relative">
      {/* Free Audit Banner — always visible */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 rounded-2xl overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, rgba(45,106,79,0.12) 0%, rgba(193,120,23,0.12) 100%)',
          border: '1.5px solid rgba(45,106,79,0.35)',
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 font-bold"
              style={{ background: 'rgba(45,106,79,0.15)', border: '1px solid rgba(45,106,79,0.3)' }}
            >
              🆓
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(45,106,79,0.18)', color: '#2D6A4F' }}
                >
                  Start Here — It&apos;s Free
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate">
                The Audit — Free Online Presence Report
              </h3>
              <p className="text-text-secondary text-sm mt-1 max-w-md">
                Every great website starts with an honest look. Get a branded PDF with exactly what&apos;s working, what&apos;s not, and what to fix first. No pressure. Just truth.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
            <span className="font-[family-name:var(--font-satoshi)] text-3xl font-bold text-forest">FREE</span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-medium px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-white"
              style={{ background: '#2D6A4F', minHeight: '44px' }}
            >
              Get My Free Audit <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Phase 1: Category Grid */}
      <AnimatePresence mode="wait">
        {!selectedCategory && (
          <motion.div
            key="category-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <p className="text-text-secondary text-base">
                Choose a category to explore our packages — or start with the free audit above.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {categoryCards.map((cat) => (
                <CategoryCardLarge
                  key={cat.id}
                  cat={cat}
                  isSelected={false}
                  isOther={false}
                  onSelect={() => handleSelectCategory(cat.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Selected Category — Hero + Packages */}
      <AnimatePresence mode="wait">
        {selectedCategory && selectedCat && (
          <motion.div
            key={`selected-${selectedCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back button + category pills */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <motion.button
                onClick={handleBack}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 text-sm font-semibold text-slate hover:text-copper transition-colors"
                style={{ minHeight: '44px' }}
              >
                <span>←</span>
                <span>Back to all categories</span>
              </motion.button>
              <div className="h-4 w-px bg-slate/20 hidden sm:block" />
              <div className="flex gap-2 flex-wrap">
                {categoryCards.map((cat) => (
                  <CategoryPill
                    key={cat.id}
                    cat={cat}
                    isActive={cat.id === selectedCategory}
                    onSelect={() => handleSelectCategory(cat.id)}
                  />
                ))}
              </div>
            </div>

            {/* Hero banner */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-2xl mb-10"
              style={{ minHeight: '240px', border: '2px solid rgba(193,120,23,0.5)' }}
            >
              <div
                className="absolute inset-[-4%] bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedCat.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
              <div className="relative z-10 flex flex-col justify-center h-full p-8 sm:p-12 min-h-[240px]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{selectedCat.emoji}</span>
                  <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                    {selectedCat.label}
                  </h2>
                </div>
                <p className="text-white/85 text-base sm:text-lg max-w-lg leading-relaxed drop-shadow-md">
                  {selectedCat.description}
                </p>
                <p className="text-copper font-semibold text-sm mt-4">
                  {selectedCat.packageCount} package{selectedCat.packageCount !== 1 ? 's' : ''} available
                </p>
              </div>
            </motion.div>

            {/* Package Cards — staggered entrance */}
            {selectedCategory === 'ai' ? (
              <AIShowcase />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                {visiblePackages.map((pkg, i) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
                  >
                    <PackageCard pkg={pkg} index={i} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

/* ── AI Showcase ── */
function AIShowcase() {
  return (
    <div>
      <AIReplacesSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <AIPackageCard variant="advantage" />
        <AIPackageCard variant="assistant" />
      </div>
    </div>
  );
}

function AIReplacesSection() {
  const tasks = [
    { task: 'Answering the same customer questions over and over', hours: '5-10 hrs/week', emoji: '💬' },
    { task: 'Writing social media posts and emails', hours: '3-5 hrs/week', emoji: '✍️' },
    { task: 'Scheduling appointments and follow-ups', hours: '2-4 hrs/week', emoji: '📅' },
    { task: 'Updating your website and online listings', hours: '2-3 hrs/week', emoji: '🌐' },
    { task: 'Researching competitors and market trends', hours: '2-4 hrs/week', emoji: '🔍' },
    { task: 'Creating quotes, invoices, and proposals', hours: '2-3 hrs/week', emoji: '📄' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2D3436 0%, #3d4648 100%)' }}
    >
      <div className="p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">⏰</span>
          <p className="text-copper font-semibold text-sm tracking-wider uppercase">Sound Familiar?</p>
        </div>
        <h3 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-white mb-2">
          Tasks AI can handle for you
        </h3>
        <p className="text-slate-400 mb-8">
          Most business owners spend 15-30 hours a week on tasks that AI can do faster, better, and without complaining.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tasks.map((item, i) => (
            <motion.div
              key={item.task}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <span className="text-xl shrink-0">{item.emoji}</span>
              <div>
                <p className="text-white text-sm font-medium">{item.task}</p>
                <p className="text-copper text-xs font-medium">{item.hours} saved</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-slate-300 text-lg font-medium">
            That&apos;s <span className="text-copper font-bold text-2xl">16–29 hours</span> back in your week.
          </p>
          <p className="text-slate-400 text-sm mt-1">Two packages. Two ways to get there.</p>
        </div>
      </div>
    </motion.div>
  );
}

function AIPackageCard({ variant }: { variant: 'advantage' | 'assistant' }) {
  const [activeTab, setActiveTab] = useState('overview');
  const isAssistant = variant === 'assistant';

  const advantageData = {
    emoji: '🤖',
    name: 'The AI Advantage',
    price: '$2,000',
    priceNote: 'Claude subscription: ~$23–$135 CAD/mo',
    tagline: 'AI that actually works for your business.',
    description: 'We set up Claude AI as your personal business tool — trained on your services, your processes, your voice. You get hands-on training and walk away confident.',
    highlights: [
      "Set up in 1-2 sessions — no tech skills needed",
      'Works inside Claude (simple interface, no tech skills needed)',
      "Perfect entry point if you're curious about AI",
    ],
    features: [
      'Claude Pro configured for your business',
      'Co-Work workspace with your docs + processes',
      'Custom AI workflows for your needs',
      'Automation setup connecting your tools',
      'Google Business tools optimization',
      'Hands-on training session',
      '30 days follow-up support',
      'Lifetime Neighbours Dashboard access',
    ],
    techDetails: [
      'Claude Pro subscription setup + configuration',
      'Co-Work workspace: business docs, SOPs, pricing uploaded',
      'Custom system prompts optimized for your industry',
      'Workflow templates: email drafts, social posts, customer responses',
      'Integration guidance: Zapier/Make connections where applicable',
      'Google Business Profile + Analytics optimization',
    ],
    perfectFor: "Business owners who keep hearing about AI but don't know where to start.",
    delivery: '1–2 sessions',
    badge: 'Beginner Friendly' as string | null,
    costs: null as null | Record<string, { label: string; monthly: string; items: string[] }>,
  };

  const assistantData = {
    emoji: '🦞',
    name: 'AI Assistant Setup',
    price: '$3,000',
    priceNote: null as string | null,
    tagline: 'Your own 24/7 AI employee.',
    description: 'A dedicated AI assistant that lives on your phone, answers customers, manages your inbox, handles scheduling — and never sleeps. Works through WhatsApp, Telegram, or text.',
    highlights: [
      'We build it, you use it — no tech skills on your end',
      'Runs 24/7 through WhatsApp, Telegram, or text',
      'Trained on YOUR business — sounds like you, not a robot',
    ],
    features: [
      'OpenClaw installed and secured on your own server',
      'Connected to email, calendar, and business tools',
      'Trained on your services, prices, and voice',
      'Works through WhatsApp, Telegram, or text',
      'Handles inquiries, scheduling, and follow-ups 24/7',
      'Hands-on training (1-2 hours)',
      '30 days priority support',
      'Lifetime Neighbours Dashboard access',
    ],
    techDetails: [
      'OpenClaw gateway on dedicated VPS (AWS/DigitalOcean)',
      'Security: firewall rules, SSH keys, Docker sandboxing',
      'Channel integration: WhatsApp Business, Telegram, or SMS via Twilio',
      'Gmail/Google Workspace: email + calendar connection',
      'Custom skills & workflows for your business processes',
      'AI model: Claude or GPT, optimized for your use case',
      'Knowledge base: your docs, services, FAQs loaded',
    ],
    perfectFor: 'Busy owners drowning in admin who want 24/7 customer response without hiring staff.',
    delivery: '3–5 days',
    badge: 'Done For You' as string | null,
    costs: {
      basic: { label: 'Basic Use', monthly: '~$30–$50/mo', items: ['VPS hosting: ~$7–$15/mo', 'Anthropic API: ~$23/mo CAD'] },
      advanced: { label: 'Advanced Use', monthly: '~$80–$160/mo', items: ['VPS hosting: ~$15–$25/mo', 'Anthropic Pro: $135/mo CAD', 'Optional integrations'] },
    } as Record<string, { label: string; monthly: string; items: string[] }>,
  };

  const data = isAssistant ? assistantData : advantageData;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: "What's Included" },
    { id: 'tech', label: 'Under the Hood' },
    ...(isAssistant ? [{ id: 'costs', label: 'Monthly Costs' }] : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: isAssistant ? 0.1 : 0 }}
      className={`rounded-2xl border bg-white flex flex-col ${
        isAssistant ? 'border-copper/40 shadow-lg shadow-copper/10' : 'border-cream-border'
      }`}
    >
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{data.emoji}</span>
            <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate">{data.name}</h3>
          </div>
          {data.badge && (
            <span className="bg-copper text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {data.badge}
            </span>
          )}
        </div>
        {data.priceNote && <p className="text-xs text-text-secondary mb-1">{data.priceNote}</p>}
        <p className="font-[family-name:var(--font-satoshi)] text-3xl font-bold text-slate mb-1">{data.price}</p>
        <p className="text-copper italic text-sm mb-4" style={{ fontFamily: 'Georgia, serif' }}>{data.tagline}</p>
      </div>

      <div className="px-6 border-b border-cream-border">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-3 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id ? 'text-copper' : 'text-text-tertiary hover:text-slate'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId={`tab-${variant}`}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">{data.description}</p>
              <ul className="space-y-3 mb-5">
                {data.highlights.map(h => (
                  <li key={h} className="flex items-start gap-3 text-sm">
                    <span className="text-copper font-bold text-lg leading-none mt-[-2px]">→</span>
                    <span className="text-slate font-medium">{h}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-text-secondary italic border-t border-cream-border pt-3">
                <span className="font-semibold not-italic text-slate">Perfect for:</span> {data.perfectFor}
              </p>
              <p className="text-xs text-copper font-medium mt-2">⏱ {data.delivery}</p>
            </motion.div>
          )}
          {activeTab === 'features' && (
            <motion.div key="features" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <ul className="space-y-2">
                {data.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="text-forest mt-0.5 shrink-0" />
                    <span className="text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          {activeTab === 'tech' && (
            <motion.div key="tech" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <p className="text-xs text-copper font-semibold uppercase tracking-wider mb-3">Under the Hood 🔧</p>
              <ul className="space-y-2">
                {data.techDetails.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="text-copper mt-0.5 shrink-0" />
                    <span className="text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          {activeTab === 'costs' && isAssistant && data.costs && (
            <motion.div key="costs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <p className="text-text-secondary text-sm mb-4">These are the ongoing costs to keep your AI assistant running after setup:</p>
              {Object.values(data.costs).map((tier) => (
                <div key={tier.label} className="mb-4 last:mb-0 p-4 rounded-xl bg-slate/5 border border-slate/10">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-slate text-sm">{tier.label}</p>
                    <p className="text-copper font-bold">{tier.monthly}</p>
                  </div>
                  <ul className="space-y-1">
                    {tier.items.map((item) => (
                      <li key={item} className="text-xs text-text-tertiary flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-copper/40 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-5">
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center gap-2 font-medium px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm w-full ${
              isAssistant
                ? 'bg-copper hover:bg-copper-light text-white shadow-md shadow-copper/20'
                : 'bg-slate/5 hover:bg-slate/10 text-slate border border-slate/20'
            }`}
          >
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Package Card — 3D Flip ── */
function PackageCard({ pkg, index }: { pkg: typeof packages[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const isStartingAt = pkg.price.includes('+');
  const hasSavings = 'savings' in pkg && pkg.savings;
  const hasFlip = pkg.featuresFull.length > 0;

  // Card face shared header
  const CardHeader = () => (
    <>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl" aria-hidden="true">{pkg.emoji}</span>
        <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-slate">{pkg.name}</h3>
      </div>
      <div className="mb-4">
        {pkg.priceNote && (
          <p className="text-xs text-text-secondary mb-1">{pkg.priceNote}</p>
        )}
        {isStartingAt && (
          <p className="text-xs text-text-secondary mb-0.5">Starting at</p>
        )}
        <p className={`font-[family-name:var(--font-satoshi)] font-bold ${pkg.price === 'FREE' ? 'text-4xl text-forest' : 'text-3xl text-slate'}`}>
          {pkg.price}
        </p>
        {pkg.monthlyHint && (
          <p className="text-xs text-copper/70 mt-1 font-medium">{pkg.monthlyHint}</p>
        )}
      </div>
      <p className="text-copper italic text-sm mb-3" style={{ fontFamily: 'Georgia, serif' }}>{pkg.tagline}</p>
    </>
  );

  return (
    <ScrollReveal delay={index * 0.05}>
      {pkg.popular && (
        <div className="flex justify-center mb-3">
          <span className="bg-copper text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}
      {pkg.tier === 'addon' && !pkg.popular && (
        <div className="flex justify-center mb-3">
          <span className="bg-forest text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
            Add-On
          </span>
        </div>
      )}

      {/* Flip container */}
      <div
        className="relative"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformStyle: 'preserve-3d', position: 'relative' }}
          whileHover={!flipped ? { y: -5, boxShadow: '0 20px 60px rgba(193,120,23,0.12)' } : {}}
        >
          {/* FRONT face */}
          <div
            className={`rounded-2xl border flex flex-col transition-colors duration-300 ${
              pkg.popular
                ? 'border-copper/50 bg-white shadow-lg shadow-copper/15'
                : 'border-cream-border bg-white hover:border-copper/25'
            }`}
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="p-6 sm:p-7 flex flex-col h-full">
              <CardHeader />
              <p className="text-text-secondary text-sm leading-relaxed mb-5">{pkg.description}</p>

              {/* Label */}
              <p className="text-xs font-bold uppercase tracking-wider text-forest/60 mb-2">What You Get</p>

              <ul className="space-y-2 mb-4 flex-1">
                {pkg.featuresShort.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="text-forest mt-0.5 shrink-0" />
                    <span className="text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>

              {hasSavings && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4 text-sm">
                  <p className="text-text-secondary">
                    Value if bought separately: <span className="line-through">{(pkg as { savings: { separate: string; save: string } }).savings.separate}</span>
                  </p>
                  <p className="text-green-700 font-semibold">You save {(pkg as { savings: { separate: string; save: string } }).savings.save} 🎉</p>
                </div>
              )}

              <p className="text-xs text-text-secondary italic mb-3 border-t border-cream-border pt-4">
                <span className="font-semibold not-italic text-slate">Perfect for:</span> {pkg.perfectFor}
              </p>

              {'runningCosts' in pkg && pkg.runningCosts && (
                <div className="bg-slate/5 border border-slate/10 rounded-xl p-4 mb-4 text-sm">
                  <p className="font-semibold text-slate mb-2">Expected Monthly Costs</p>
                  {Object.values((pkg as any).runningCosts).map((tier: any) => (
                    <div key={tier.label} className="mb-2 last:mb-0">
                      <p className="text-copper font-medium">{tier.label}: {tier.monthly}</p>
                      <p className="text-text-tertiary text-xs">{tier.breakdown}</p>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-copper font-medium mb-4">⏱ {pkg.delivery}</p>

              <div className="flex flex-col gap-2 mt-auto">
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 font-medium px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm ${
                    pkg.popular
                      ? 'bg-copper hover:bg-copper-light text-white shadow-md shadow-copper/20'
                      : 'bg-slate/5 hover:bg-slate/10 text-slate border border-slate/20'
                  }`}
                >
                  Get Started <ArrowRight size={14} />
                </Link>
                {hasFlip && (
                  <button
                    onClick={() => setFlipped(true)}
                    className="group inline-flex items-center justify-center gap-2 font-bold text-base text-white rounded-xl w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      minHeight: '48px',
                      background: 'linear-gradient(135deg, #C17817 0%, #D4922A 100%)',
                      boxShadow: '0 4px 16px rgba(193,120,23,0.3)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(193,120,23,0.55)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(193,120,23,0.3)')}
                    aria-label="Flip card to see technical details"
                  >
                    <motion.span
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'inline-block' }}
                    >↻</motion.span>
                    <span>Flip for tech details</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* BACK face */}
          <div
            className="absolute inset-0 rounded-2xl border flex flex-col"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(145deg, #FDF6EC 0%, #FFF9F2 100%)',
              borderColor: '#C17817',
              boxShadow: '0 0 0 1px rgba(193,120,23,0.2), 0 20px 60px rgba(193,120,23,0.1)',
            }}
          >
            <div className="p-6 sm:p-7 flex flex-col h-full">
              <CardHeader />

              {/* Label */}
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#C17817' }}>Under the Hood 🔧</p>

              <ul className="space-y-2 mb-4 flex-1">
                {pkg.featuresFull.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: '#C17817' }} />
                    <span className="text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-text-secondary italic mb-3 border-t pt-4" style={{ borderColor: 'rgba(193,120,23,0.2)' }}>
                <span className="font-semibold not-italic text-slate">Perfect for:</span> {pkg.perfectFor}
              </p>
              <p className="text-xs font-medium mb-4" style={{ color: '#C17817' }}>⏱ {pkg.delivery}</p>

              <div className="flex flex-col gap-2 mt-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 font-medium px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm text-white"
                  style={{ background: '#C17817' }}
                >
                  Get Started <ArrowRight size={14} />
                </Link>
                <button
                  onClick={() => setFlipped(false)}
                  className="inline-flex items-center justify-center gap-2 font-bold text-base rounded-xl w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    minHeight: '48px',
                    color: '#C17817',
                    border: '2px solid #C17817',
                    background: 'rgba(193,120,23,0.08)',
                    boxShadow: '0 2px 8px rgba(193,120,23,0.15)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(193,120,23,0.35)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(193,120,23,0.15)')}
                  aria-label="Flip back to plain English"
                >
                  <motion.span
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: -180 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: 'inline-block' }}
                  >↻</motion.span>
                  <span>Back to plain English</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

/* ── Neighbours Dashboard — Mountain Trail Animation ── */
// Add isEasterEgg to the type
const dashboardFeatures: Array<{ emoji: string; title: string; desc: string; isEasterEgg?: boolean }> = [
  { emoji: '📚', title: 'Step-by-Step Training Manuals', desc: 'Written in plain English. Every tool, every feature, every workflow — explained like a friend is sitting next to you.' },
  { emoji: '🎬', title: 'Curated Video Library', desc: 'Hand-picked YouTube tutorials and walkthroughs for every skill you need. Learn at your own pace — pause, rewind, master.' },
  { emoji: '🔧', title: 'Troubleshooting & Support', desc: 'Something not working? Search the knowledge base first — most answers are already there. If not, we are.' },
  { emoji: '📈', title: 'Grow Your Business', desc: "Guides on SEO, social media, email marketing, and customer retention — updated regularly with what's actually working right now." },
  { emoji: '🤖', title: 'AI Integration Guides', desc: 'As AI tools evolve, so does the dashboard. New workflows, new automations, new ways to save time — all explained step by step.' },
  { emoji: '🤝', title: 'Connect With Other Customers', desc: 'A private community of business owners learning and growing together. Share wins, ask questions, find inspiration from people who get it.' },
  { emoji: '🎮', title: 'One More Thing...', desc: 'We hid something fun in the footer. Think you can find it?', isEasterEgg: true },
];

/* ── Dashboard Card with staggered reveal ── */
function DashboardCard({ feat, index }: { feat: typeof dashboardFeatures[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const isEgg = feat.isEasterEgg === true;
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{
        duration: 0.7,
        delay: prefersReducedMotion ? 0 : index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, boxShadow: isEgg ? '0 0 30px rgba(193,120,23,0.2)' : '0 0 30px rgba(193,120,23,0.25)' }}
      className="rounded-2xl p-6 flex flex-col gap-3 h-full cursor-default"
      style={{
        background: isEgg ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)',
        border: isEgg ? '1px solid rgba(193,120,23,0.25)' : '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <motion.span
        className="text-4xl inline-block"
        animate={isEgg
          ? { y: [0, -6, 0] }
          : (isInView ? { scale: [0.5, 1.25, 1] } : { scale: 0.5 })}
        transition={isEgg
          ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.6, delay: index * 0.12 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {feat.emoji}
      </motion.span>
      <h3 className="font-[family-name:var(--font-satoshi)] font-bold text-lg" style={{ color: isEgg ? '#C17817' : '#F5F0E8' }}>
        {feat.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
    </motion.div>
  );
}

function NeighboursDashboard() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32 grain"
      style={{ background: 'linear-gradient(180deg, #0a1520 0%, #1A1D20 50%, #0a1520 100%)' }}
    >
      <AmbientOrbs />

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '100px' }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full" style={{ fill: 'rgba(45,106,79,0.15)' }}>
          <path d="M0,100 L0,75 L80,35 L160,60 L240,20 L320,55 L400,15 L480,50 L560,10 L640,45 L720,8 L800,40 L880,12 L960,48 L1040,18 L1120,55 L1200,25 L1280,60 L1360,30 L1440,65 L1440,100 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{ background: 'rgba(193,120,23,0.15)', border: '2px solid rgba(193,120,23,0.3)' }}
            >
              <span className="text-3xl">🏔️</span>
            </div>
            <span className="block text-copper font-semibold text-xs tracking-[0.2em] uppercase mb-3">
              Included With Every Package
            </span>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F0E8] mb-5">
              The Neighbours Dashboard
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Your project doesn&apos;t end at launch. Every client gets lifetime access to a private members area — your basecamp for continued growth.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dashboardFeatures.map((feat, i) => (
            <DashboardCard key={feat.title} feat={feat} index={i} />
          ))}
        </div>
      </div>
    </section>
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


  return (
    <div className="overflow-x-hidden">

      {/* 1. Hero */}
      <section className="aurora-bg grain pt-32 pb-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={[{ label: 'Services' }]} dark />
          <ScrollReveal>
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">Our Services</p>
            <BalancedText as="h1" className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight max-w-3xl">
              Real websites.<br />Real results.<br />Real neighbours.
            </BalancedText>
            <p className="mt-6 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Hand-built websites, AI tools, and honest marketing for Kootenay businesses. No templates. No surprises. No lock-in. Just clear work from people who live here.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <RiverWave fillColor="#7C4A10" bgColor="#1A1D20" />

      {/* 2. Kootenay Neighbours Rate — Hero Section */}
      <section
        className="relative overflow-hidden py-24 sm:py-32"
        style={{
          background: 'linear-gradient(160deg, #7C4A10 0%, #C17817 35%, #E8A020 60%, #D4821A 80%, #8B5E0A 100%)',
        }}
      >
        {/* Sun rays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 origin-top opacity-[0.08]"
              style={{
                width: '3px',
                height: '120%',
                background: 'linear-gradient(to bottom, #FFF8E1, transparent)',
                transform: `translateX(-50%) rotate(${(i - 3.5) * 14}deg)`,
              }}
            />
          ))}
        </div>

        {/* Pine treeline silhouette at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '80px' }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full" style={{ fill: 'rgba(45,106,79,0.35)' }}>
            <path d="M0,80 L0,60 L30,30 L50,50 L70,20 L90,45 L110,10 L130,40 L150,15 L170,50 L190,25 L210,55 L230,20 L250,45 L270,10 L290,40 L310,5 L330,35 L350,15 L370,50 L390,20 L410,45 L430,10 L450,35 L470,5 L490,30 L510,55 L530,20 L550,45 L570,10 L590,40 L610,15 L630,50 L650,25 L670,55 L690,20 L710,45 L730,10 L750,40 L770,5 L790,35 L810,15 L830,50 L850,20 L870,45 L890,10 L910,35 L930,5 L950,30 L970,55 L990,20 L1010,45 L1030,10 L1050,40 L1070,15 L1090,50 L1110,25 L1130,55 L1150,20 L1170,45 L1190,10 L1210,40 L1230,5 L1250,35 L1270,15 L1290,50 L1310,20 L1330,45 L1350,10 L1370,35 L1390,15 L1410,50 L1440,30 L1440,80 Z" />
          </svg>
        </div>

        {/* Mountain ridgeline */}
        <div className="absolute bottom-12 left-0 right-0 pointer-events-none" style={{ height: '60px' }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full" style={{ fill: 'rgba(45,52,36,0.15)' }}>
            <path d="M0,60 L0,45 L120,10 L240,35 L360,5 L480,30 L600,8 L720,28 L840,5 L960,25 L1080,8 L1200,32 L1320,10 L1440,40 L1440,60 Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="text-amber-100/80 font-semibold text-sm tracking-[0.25em] uppercase mb-4">
                🌲 For West Kootenay Businesses
              </p>
              <h2 className="font-[family-name:var(--font-satoshi)] text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.25)' }}>
                10% OFF<br />
                <span className="text-amber-100">FOR NEIGHBOURS</span>
              </h2>
              <p className="text-amber-100/90 text-xl sm:text-2xl font-medium mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}>
                We live here. We work here. Supporting this community is why we started.
              </p>
              <p className="text-amber-50/75 text-base max-w-xl mx-auto mb-10 leading-relaxed">
                Your business is based in the West Kootenays — Trail, Castlegar, Nelson, Rossland, Nakusp, anywhere in the valley. That makes you a neighbour. And neighbours get the neighbour rate.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-[1.03] text-base shadow-lg"
              >
                Claim Your Neighbour Rate <ArrowRight size={18} />
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <RiverWave fillColor="#F5F0E8" bgColor="#8B5E0A" />

      {/* 3. Package Showcase (moved up) */}
      <section className="bg-[#F5F0E8] cedar-texture py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2">Our Packages</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-4">Choose Your Path</h2>
            <p className="text-text-secondary max-w-xl mb-10">
              Every package is built for Kootenay businesses — flat pricing, full ownership, zero surprises.
            </p>
          </ScrollReveal>

          <p className="text-text-tertiary text-sm text-center mb-8 italic">
            The average Canadian web agency charges $7,000–$30,000 for a custom website.
            We deliver the same quality — hand-coded, not templated — at a fraction of that.
          </p>

          <ScrollReveal delay={0.05}>
            <ImmersivePackageShowcase />
          </ScrollReveal>
        </div>
      </section>

      <RiverWave fillColor="#0a1520" bgColor="#F5F0E8" />

      {/* 4. Neighbours Dashboard / Mountain Trail */}
      <NeighboursDashboard />

      <RiverWave fillColor="#111827" bgColor="#0a1520" />

      {/* 5. What Every Package Includes (moved down) */}
      <section className="py-20 sm:py-24 grain relative" style={{ background: 'linear-gradient(180deg, #111827 0%, #1A1D20 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-2">Our Promises</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-3 max-w-xl">
              What every package includes.
            </h2>
            <p className="text-dark-text-muted mb-12 max-w-xl">No asterisks. No fine print. These come with everything we build.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {universalFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={feat.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -5, borderColor: 'rgba(193,120,23,0.4)' }}
                    transition={{ duration: 0.2 }}
                    className="group bg-slate/90 border border-white/8 rounded-2xl p-6 flex flex-col gap-4 h-full hover:shadow-xl hover:shadow-copper/10 transition-all duration-300 cursor-default"
                  >
                    <div className="w-12 h-12 rounded-xl bg-copper/15 flex items-center justify-center shrink-0 group-hover:bg-copper/25 transition-colors duration-300">
                      <Icon size={22} className="text-copper" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-satoshi)] font-bold text-white mb-2 leading-snug">{feat.title}</h3>
                      <p className="text-dark-text-muted text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <RiverWave fillColor="#1A1D20" bgColor="#1A1D20" />

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

      {/* 7. How It Works */}
      <HowItWorks />

      <RiverWave fillColor="#1A1D20" bgColor="#F5F0E8" />

      {/* 8. ROI Calculator */}
      <ROICalculator />

      <RiverWave fillColor="#0B1A2E" bgColor="#1A1D20" />

      {/* 9. goBlink Crypto Payments — Compact Banner */}
      <section className="relative overflow-hidden py-12 sm:py-16" style={{ background: 'linear-gradient(135deg, #0B1A2E 0%, #0D2137 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">⚡</span>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.25)', color: '#00E5FF' }}>
                  Available With Any Package
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-white mb-3">
                Accept crypto payments. Fees as low as 0.05%.
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                Every Kootenay Made website can accept cryptocurrency via{' '}
                <a href="https://merchant.goblink.io" target="_blank" rel="noopener noreferrer" className="font-semibold transition-colors" style={{ color: '#00E5FF' }}>
                  goBlink
                </a>
                . Instant settlement, stablecoin payouts, no volatility. Compare that to the 2.9% you pay on every credit card.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="https://merchant.goblink.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] text-sm"
                style={{ background: 'rgba(0,229,255,0.12)', border: '1px solid rgba(0,229,255,0.3)', color: '#00E5FF' }}
              >
                Learn About goBlink →
              </a>
            </div>
          </div>
        </div>
      </section>

      <RiverWave fillColor="#F5F0E8" bgColor="#0B1A2E" />

      {/* 10. Capacity + Payment Notice */}
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

      <RiverWave fillColor="#1A1D20" bgColor="#F5F0E8" />

      {/* 11. Risk Reversal + CTA */}
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
