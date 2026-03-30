'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import AmbientOrbs from '@/components/AmbientOrbs';
import { ArrowRight } from 'lucide-react';
import MountainDivider from '@/components/MountainDivider';
import PretextCurrent from '@/components/PretextCurrent';
import PretextExplainer from '@/components/PretextExplainer';

const styles = [
  { slug: 'clean-professional', name: 'Clean & Professional', tags: 'Law, Accounting, Finance', category: 'professional', vibe: 'Trust, authority, clean confidence', color: '#2563EB', popular: false },
  { slug: 'bold-modern', name: 'Bold & Modern', tags: 'Tech, Trades, Startups', category: 'trades', vibe: 'Powerful, confident, no-nonsense', color: '#ff6b00', popular: false },
  { slug: 'warm-natural', name: 'Warm & Natural', tags: 'Wellness, Yoga, Therapy', category: 'health', vibe: 'Serene, grounded, nurturing', color: '#7d9a6b', popular: true },
  { slug: 'rustic-craft', name: 'Rustic Craft', tags: 'Breweries, Bakeries, Artisan', category: 'food', vibe: 'Handcrafted, authentic, community', color: '#d4942a', popular: false },
  { slug: 'sleek-dark', name: 'Sleek & Dark', tags: 'Restaurants, Bars, Luxury', category: 'food', vibe: 'Luxurious, moody, cinematic', color: '#c9a96e', popular: true },
  { slug: 'bright-playful', name: 'Bright & Playful', tags: 'Daycares, Pets, Entertainment', category: 'health', vibe: 'Joyful, safe, energetic', color: '#ff6b6b', popular: false },
  { slug: 'editorial-elegant', name: 'Editorial & Elegant', tags: 'Real Estate, Fashion, Salons', category: 'professional', vibe: 'Sophisticated, refined, tasteful', color: '#b8860b', popular: false },
  { slug: 'adventure-outdoors', name: 'Adventure & Outdoors', tags: 'Tourism, Guides, Ski Resorts', category: 'creative', vibe: 'Adrenaline, rugged, inspiring', color: '#f97316', popular: true },
  { slug: 'trades-industrial', name: 'Trades & Industrial', tags: 'Plumbing, HVAC, Electrical', category: 'trades', vibe: 'Rugged, trustworthy, gets the phone ringing', color: '#ff6a00', popular: true },
  { slug: 'farm-harvest', name: 'Farm & Harvest', tags: 'Farms, Orchards, Markets', category: 'food', vibe: 'Wholesome, community, seasonal', color: '#4a7c59', popular: false },
  { slug: 'medical-dental', name: 'Medical & Dental', tags: 'Dentists, Physio, Vet Clinics', category: 'health', vibe: 'Calm, trustworthy, reassuring', color: '#0891b2', popular: false },
  { slug: 'automotive', name: 'Automotive & Powersports', tags: 'Garages, Dealerships', category: 'trades', vibe: 'Powerful, dependable, gearhead pride', color: '#dc2626', popular: false },
  { slug: 'education-nonprofit', name: 'Education & Nonprofit', tags: 'Schools, Community Orgs', category: 'professional', vibe: 'Warm, inclusive, community-driven', color: '#3b82f6', popular: false },
  { slug: 'music-entertainment', name: 'Music & Entertainment', tags: 'Venues, Studios, Events', category: 'creative', vibe: 'Electric, edgy, vibrant', color: '#e91e8a', popular: false },
  { slug: 'home-garden', name: 'Home & Garden', tags: 'Landscapers, Interior Design', category: 'creative', vibe: 'Natural, serene, lifestyle', color: '#6b9a5b', popular: false },
  { slug: 'government-municipal', name: 'Government & Municipal', tags: 'City Offices, Parks', category: 'professional', vibe: 'Accessible, trustworthy, official', color: '#2563eb', popular: false },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'trades', label: 'Trades & Services' },
  { key: 'food', label: 'Food & Hospitality' },
  { key: 'health', label: 'Health & Wellness' },
  { key: 'professional', label: 'Professional' },
  { key: 'creative', label: 'Creative & Lifestyle' },
];

export default function StylesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? styles
    : styles.filter((s) => s.category === activeCategory);

  return (
    <div className="pt-0 bg-slate">
      {/* Hero */}
      <section className="aurora-bg grain pt-32 pb-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <Breadcrumb items={[{ label: 'Styles' }]} dark />
          <ScrollReveal>
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">
              The Gallery
            </p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4">
              Choose Your Style
            </h1>
            <p className="text-dark-text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Browse 16 real designs built for businesses like yours. Click any to explore the full demo.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mini-guide — flows from hero, no divider */}
      <section className="bg-slate grain py-8 sm:py-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-dark-text-muted text-sm">
              <span className="flex items-center gap-2">
                <span className="text-base" aria-hidden="true">🤔</span>
                Think about your business personality
              </span>
              <span className="hidden sm:block text-cream/20" aria-hidden="true">→</span>
              <span className="flex items-center gap-2">
                <span className="text-base" aria-hidden="true">👆</span>
                Browse the styles below
              </span>
              <span className="hidden sm:block text-cream/20" aria-hidden="true">→</span>
              <span className="flex items-center gap-2">
                <span className="text-base" aria-hidden="true">🖱️</span>
                Click any to see the full demo
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={2} fillColor="#1A1D20" bgColor="#1A1D20" />

      {/* Sticky category filter tabs */}
      <div className="sticky top-16 z-30 bg-slate/95 backdrop-blur-md border-b border-white/5 grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <nav
            className="flex gap-2 py-3 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center"
            role="tablist"
            aria-label="Filter styles by category"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                role="tab"
                aria-selected={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="relative flex-shrink-0 min-h-[44px] px-5 py-2.5 font-[family-name:var(--font-satoshi)] text-sm uppercase tracking-wide rounded-full transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-copper focus-visible:outline-offset-2"
                style={{
                  color: activeCategory === cat.key ? '#fff' : 'rgba(248,244,240,0.6)',
                }}
              >
                {activeCategory === cat.key && (
                  <motion.span
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-full bg-copper"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Style Grid */}
      <section className="bg-slate grain py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((style, i) => (
                <motion.div
                  key={style.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    delay: i * 0.04,
                  }}
                >
                  <Link
                    href={`/styles/demos/${style.slug}`}
                    className="group block rounded-xl border border-white/5 overflow-hidden transition-colors duration-200"
                    style={{
                      ['--card-accent' as string]: style.color,
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden rounded-t-xl">
                      <Image
                        src={`/images/styles/${style.slug}.webp`}
                        alt={style.name}
                        width={600}
                        height={400}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ backgroundColor: `${style.color}66` }}
                      >
                        <span className="text-white font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-wide flex items-center gap-1.5">
                          Preview <ArrowRight size={16} />
                        </span>
                      </div>
                      {/* Popular badge */}
                      {style.popular && (
                        <span className="absolute top-3 right-3 bg-copper text-white text-xs font-[family-name:var(--font-satoshi)] font-semibold px-2.5 py-1 rounded-full animate-pulse">
                          Popular
                        </span>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-4 bg-[#1e2124] group-hover:border-t group-hover:border-t-[var(--card-accent)] transition-colors duration-200">
                      <h3 className="font-[family-name:var(--font-satoshi)] font-bold text-cream text-base sm:text-lg leading-snug">
                        {style.name}
                      </h3>
                      <p className="text-dark-text-muted text-sm italic mt-1">
                        {style.vibe}
                      </p>
                      <p className="text-dark-text-muted/60 text-xs mt-2">
                        Perfect for: {style.tags}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Pretext Current */}
      <section className="relative bg-slate overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 grain" />
        {/* Canyon depth gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.4) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-20">
          <ScrollReveal>
            <div className="text-center mb-8">
              <p className="text-copper/60 font-[family-name:var(--font-satoshi)] text-sm tracking-[0.15em] uppercase">Drag through the current</p>
            </div>
          </ScrollReveal>
          <PretextCurrent />
          <div className="text-center mt-6">
            <p className="text-cream/60 text-base italic font-[family-name:var(--font-satoshi)]">&quot;Every design flows from somewhere.&quot;</p>
          </div>
          <PretextExplainer
            text="Each character floats independently because we know its exact width and position mathematically. When your content changes, the animation adapts automatically. That's the difference between a website and a web experience."
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate grain py-20 relative border-t border-white/5">
        <AmbientOrbs />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl md:text-4xl font-bold text-cream mb-4">
              Don&apos;t see your vibe?
            </h2>
            <p className="text-dark-text-muted text-base sm:text-lg mb-8">
              Every style is a starting point. We customize everything to match your business.
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
