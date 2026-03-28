'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Palette } from 'lucide-react';

const filters = ['All', 'Clean', 'Bold', 'Warm', 'Rustic', 'Dark', 'Playful', 'Editorial', 'Adventure'];

const styles = [
  {
    id: 'clean-professional',
    name: 'Clean & Professional',
    filter: 'Clean',
    description: 'Whitespace-forward design with crisp lines and a sense of trust. This style says "we know what we\'re doing" without trying too hard.',
    perfectFor: ['Law Firms', 'Accounting', 'Medical', 'Consulting'],
    colors: ['#FFFFFF', '#F0F4F8', '#2563EB', '#1E293B', '#64748B'],
    fontPreview: { heading: 'Inter, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif' },
    mockup: {
      bg: 'bg-white',
      nav: 'bg-white border-b border-gray-100',
      navText: 'text-gray-800',
      accent: '#2563EB',
      heroTitle: 'Professional Excellence, Delivered.',
      heroSub: 'Trusted by businesses across the Kootenays since 2012.',
      headingFont: 'Inter, system-ui, sans-serif',
      bodyFont: 'Inter, system-ui, sans-serif',
      ctaBg: 'bg-blue-600',
      ctaText: 'text-white',
      cards: ['Strategy', 'Advisory', 'Compliance'],
    },
  },
  {
    id: 'bold-modern',
    name: 'Bold & Modern',
    filter: 'Bold',
    description: 'Confident, geometric, and unapologetically forward. Dark backgrounds with punchy accents that command attention.',
    perfectFor: ['Tech', 'Trades', 'Startups', 'Fitness'],
    colors: ['#0F172A', '#1E293B', '#F97316', '#FBBF24', '#F8FAFC'],
    fontPreview: { heading: 'system-ui, sans-serif', body: 'system-ui, sans-serif' },
    mockup: {
      bg: 'bg-slate-900',
      nav: 'bg-slate-900/90 border-b border-slate-700',
      navText: 'text-white',
      accent: '#F97316',
      heroTitle: 'BUILD SOMETHING BIGGER.',
      heroSub: 'Modern solutions for modern businesses.',
      headingFont: 'system-ui, sans-serif',
      bodyFont: 'system-ui, sans-serif',
      ctaBg: 'bg-orange-500',
      ctaText: 'text-white',
      cards: ['Innovation', 'Performance', 'Growth'],
    },
  },
  {
    id: 'warm-natural',
    name: 'Warm & Natural',
    filter: 'Warm',
    description: 'Earth tones and organic curves that feel like a deep breath. Gentle, grounded, and welcoming — the antidote to cold corporate design.',
    perfectFor: ['Wellness', 'Yoga', 'Therapy', 'Naturopaths'],
    colors: ['#FDF8F0', '#E8D5B7', '#8B7355', '#4A6741', '#D4A574'],
    fontPreview: { heading: 'Georgia, serif', body: 'system-ui, sans-serif' },
    mockup: {
      bg: 'bg-amber-50',
      nav: 'bg-amber-50/90 border-b border-amber-100',
      navText: 'text-amber-900',
      accent: '#8B7355',
      heroTitle: 'Find Your Balance',
      heroSub: 'A holistic approach to mind, body, and spirit.',
      headingFont: 'Georgia, serif',
      bodyFont: 'system-ui, sans-serif',
      ctaBg: 'bg-amber-700',
      ctaText: 'text-white',
      cards: ['Healing', 'Wellness', 'Growth'],
    },
  },
  {
    id: 'rustic-craft',
    name: 'Rustic Craft',
    filter: 'Rustic',
    description: 'Textured, tactile, and full of character. Vintage warmth meets handmade charm — like the best things in the Kootenays.',
    perfectFor: ['Breweries', 'Bakeries', 'Artisan Shops', 'Farm-to-Table'],
    colors: ['#F5EDE0', '#D4A857', '#8B4513', '#2C1810', '#6B8E23'],
    fontPreview: { heading: 'Georgia, serif', body: 'system-ui, sans-serif' },
    mockup: {
      bg: 'bg-stone-100',
      nav: 'bg-stone-100/90 border-b border-stone-300',
      navText: 'text-stone-800',
      accent: '#8B4513',
      heroTitle: 'Handcrafted With Pride',
      heroSub: 'Small batch. Big flavour. Local soul.',
      headingFont: 'Georgia, serif',
      bodyFont: 'system-ui, sans-serif',
      ctaBg: 'bg-amber-800',
      ctaText: 'text-amber-50',
      cards: ['Our Story', 'The Menu', 'Visit Us'],
    },
  },
  {
    id: 'sleek-dark',
    name: 'Sleek & Dark',
    filter: 'Dark',
    description: 'Dramatic, cinematic, and dripping with atmosphere. Dark backgrounds let your brand glow — mysterious, premium, unforgettable.',
    perfectFor: ['Restaurants', 'Bars', 'Automotive', 'Luxury'],
    colors: ['#0A0A0A', '#1A1A1A', '#C9A96E', '#F5F5F5', '#333333'],
    fontPreview: { heading: 'Georgia, serif', body: 'system-ui, sans-serif' },
    mockup: {
      bg: 'bg-neutral-950',
      nav: 'bg-neutral-950/90 border-b border-neutral-800',
      navText: 'text-neutral-200',
      accent: '#C9A96E',
      heroTitle: 'An Experience Awaits',
      heroSub: 'Refined dining in the heart of the Kootenays.',
      headingFont: 'Georgia, serif',
      bodyFont: 'system-ui, sans-serif',
      ctaBg: 'bg-amber-600',
      ctaText: 'text-black',
      cards: ['Reserve', 'Menu', 'Events'],
    },
  },
  {
    id: 'bright-playful',
    name: 'Bright & Playful',
    filter: 'Playful',
    description: 'Vibrant, cheerful, and full of energy. Rounded corners and bouncy vibes that make people smile before they even start reading.',
    perfectFor: ['Daycares', 'Pets', 'Retail', 'Entertainment'],
    colors: ['#FFFBEB', '#F472B6', '#8B5CF6', '#06B6D4', '#34D399'],
    fontPreview: { heading: 'system-ui, sans-serif', body: 'system-ui, sans-serif' },
    mockup: {
      bg: 'bg-yellow-50',
      nav: 'bg-white/90 border-b border-pink-100',
      navText: 'text-purple-700',
      accent: '#8B5CF6',
      heroTitle: 'Where Fun Comes First!',
      heroSub: 'Safe, happy, and full of adventure.',
      headingFont: 'system-ui, sans-serif',
      bodyFont: 'system-ui, sans-serif',
      ctaBg: 'bg-purple-500',
      ctaText: 'text-white',
      cards: ['Programs', 'Gallery', 'Enroll'],
    },
  },
  {
    id: 'editorial-elegant',
    name: 'Editorial & Elegant',
    filter: 'Editorial',
    description: 'Magazine-grade sophistication with serif headlines and refined spacing. For businesses where taste and presentation are everything.',
    perfectFor: ['Real Estate', 'Fashion', 'Salons', 'Galleries'],
    colors: ['#FAF9F7', '#1A1A1A', '#B8860B', '#6B6B6B', '#E8E4DE'],
    fontPreview: { heading: 'Georgia, serif', body: 'system-ui, sans-serif' },
    mockup: {
      bg: 'bg-stone-50',
      nav: 'bg-stone-50/90 border-b border-stone-200',
      navText: 'text-stone-800',
      accent: '#B8860B',
      heroTitle: 'Curated Living',
      heroSub: 'Exceptional properties for exceptional people.',
      headingFont: 'Georgia, serif',
      bodyFont: 'system-ui, sans-serif',
      ctaBg: 'bg-stone-900',
      ctaText: 'text-stone-50',
      cards: ['Listings', 'Lifestyle', 'Connect'],
    },
  },
  {
    id: 'adventure-outdoors',
    name: 'Adventure & Outdoors',
    filter: 'Adventure',
    description: 'Bold type, dynamic energy, and the spirit of the mountains. For businesses that thrive where the pavement ends.',
    perfectFor: ['Tourism', 'Guides', 'Ski Resorts', 'Outdoor Rec'],
    colors: ['#1B2D1B', '#2D5016', '#F97316', '#F8FAFC', '#0EA5E9'],
    fontPreview: { heading: 'system-ui, sans-serif', body: 'system-ui, sans-serif' },
    mockup: {
      bg: 'bg-green-950',
      nav: 'bg-green-950/90 border-b border-green-800',
      navText: 'text-green-100',
      accent: '#F97316',
      heroTitle: 'YOUR NEXT ADVENTURE STARTS HERE',
      heroSub: 'Explore the wild heart of British Columbia.',
      headingFont: 'system-ui, sans-serif',
      bodyFont: 'system-ui, sans-serif',
      ctaBg: 'bg-orange-500',
      ctaText: 'text-white',
      cards: ['Explore', 'Book', 'Gear Up'],
    },
  },
];

function StyleMockup({ style }: { style: typeof styles[0] }) {
  return (
    <div className={`${style.mockup.bg} rounded-xl overflow-hidden shadow-2xl border border-white/10`}>
      {/* Mock Nav */}
      <div className={`${style.mockup.nav} px-4 py-2.5 flex items-center justify-between`}>
        <span className={`${style.mockup.navText} text-xs font-bold tracking-wide`} style={{ fontFamily: style.mockup.headingFont }}>
          BRAND
        </span>
        <div className="flex gap-3">
          {style.mockup.cards.map((c) => (
            <span key={c} className={`${style.mockup.navText} text-[10px] opacity-60 hidden sm:inline`}>{c}</span>
          ))}
          <span className="inline-block w-12 h-5 rounded text-[10px] font-medium flex items-center justify-center" style={{ backgroundColor: style.mockup.accent, color: '#fff' }}>
            CTA
          </span>
        </div>
      </div>
      {/* Mock Hero */}
      <div className="px-6 sm:px-10 py-10 sm:py-14">
        <h3
          className={`${style.mockup.navText} text-xl sm:text-3xl font-bold leading-tight mb-2`}
          style={{ fontFamily: style.mockup.headingFont }}
        >
          {style.mockup.heroTitle}
        </h3>
        <p
          className={`${style.mockup.navText} opacity-60 text-xs sm:text-sm mb-5`}
          style={{ fontFamily: style.mockup.bodyFont }}
        >
          {style.mockup.heroSub}
        </p>
        <span
          className={`${style.mockup.ctaBg} ${style.mockup.ctaText} text-xs font-semibold px-4 py-2 rounded-md inline-block`}
        >
          Get Started →
        </span>
      </div>
      {/* Mock Cards */}
      <div className="px-6 sm:px-10 pb-8 grid grid-cols-3 gap-3">
        {style.mockup.cards.map((card) => (
          <div
            key={card}
            className="rounded-lg p-3 text-center"
            style={{ backgroundColor: `${style.mockup.accent}15`, border: `1px solid ${style.mockup.accent}30` }}
          >
            <span className={`${style.mockup.navText} text-[10px] sm:text-xs font-medium`} style={{ fontFamily: style.mockup.bodyFont }}>
              {card}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StylesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? styles : styles.filter((s) => s.filter === activeFilter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-slate grain py-20 sm:py-28">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-copper/10 text-copper px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Palette size={16} />
              Style Menu
            </div>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4">
              Choose Your Style
            </h1>
            <p className="text-dark-text-muted text-lg sm:text-xl max-w-2xl mx-auto">
              Browse real design aesthetics — not vague promises. Pick the one that feels like your business, and we&apos;ll bring it to life.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="bg-cream sticky top-20 z-30 border-b border-cream-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeFilter === f
                    ? 'bg-copper text-white'
                    : 'bg-cream-dark text-text-secondary hover:bg-cream-border'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Style Sections */}
      <AnimatePresence mode="wait">
        <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {filtered.map((style, i) => {
            const isDark = i % 2 === 1;
            return (
              <section
                key={style.id}
                className={`${isDark ? 'bg-slate grain' : 'bg-cream'} py-16 sm:py-24`}
              >
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
                  <ScrollReveal>
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                      {/* Mockup */}
                      <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                        <StyleMockup style={style} />
                      </div>

                      {/* Details */}
                      <div>
                        <span
                          className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-copper' : 'text-copper'}`}
                        >
                          Style {String(i + 1).padStart(2, '0')}
                        </span>
                        <h2
                          className={`font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold mt-2 mb-4 ${
                            isDark ? 'text-cream' : 'text-slate'
                          }`}
                        >
                          {style.name}
                        </h2>
                        <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-dark-text-muted' : 'text-text-secondary'}`}>
                          {style.description}
                        </p>

                        {/* Perfect For */}
                        <div className="mb-6">
                          <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-dark-text-muted' : 'text-text-tertiary'}`}>
                            Perfect for:
                          </span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {style.perfectFor.map((tag) => (
                              <span
                                key={tag}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  isDark ? 'bg-white/10 text-cream' : 'bg-cream-dark text-text-primary'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Color Palette */}
                        <div className="mb-6">
                          <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-dark-text-muted' : 'text-text-tertiary'}`}>
                            Color palette:
                          </span>
                          <div className="flex gap-2 mt-2">
                            {style.colors.map((color) => (
                              <div
                                key={color}
                                className="w-8 h-8 rounded-full border-2 border-white/20 shadow-sm"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Font Preview */}
                        <div className="mb-8">
                          <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-dark-text-muted' : 'text-text-tertiary'}`}>
                            Typography feel:
                          </span>
                          <p
                            className={`text-xl font-bold mt-1 ${isDark ? 'text-cream' : 'text-slate'}`}
                            style={{ fontFamily: style.fontPreview.heading }}
                          >
                            The quick brown fox jumps
                          </p>
                          <p
                            className={`text-sm ${isDark ? 'text-dark-text-muted' : 'text-text-secondary'}`}
                            style={{ fontFamily: style.fontPreview.body }}
                          >
                            Over the lazy dog — clean, readable, and on-brand.
                          </p>
                        </div>

                        {/* CTA */}
                        <Link
                          href={`/contact?style=${style.id}`}
                          className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Start with this style
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </section>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <section className="bg-slate grain py-20">
        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold text-cream mb-4">
              Don&apos;t see your vibe?
            </h2>
            <p className="text-dark-text-muted text-lg mb-8">
              Every style is a starting point, not a cage. We&apos;ll customize any aesthetic to match your business perfectly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Let&apos;s talk about your vision
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
