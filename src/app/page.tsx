'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Palette, ShoppingBag, Mail, Bot, Search, ChevronDown, Clock, MapPin, Zap } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const services = [
  { icon: Globe, name: 'Modern Website', price: 'From $1,500', desc: 'Fast, responsive, built to convert.', large: true },
  { icon: Palette, name: 'Full Brand Build', price: 'From $4,000', desc: 'Logo, colors, voice, and full identity.', large: true },
  { icon: ShoppingBag, name: 'Shopify Store', price: 'From $3,000', desc: 'E-commerce that sells while you sleep.' },
  { icon: Mail, name: 'Email Marketing', price: 'From $750', desc: 'Automated flows that nurture and convert.' },
  { icon: Bot, name: 'AI Business Setup', price: '$1,500', desc: 'AI workflows, training, and 30-day support.' },
  { icon: Search, name: 'Google Domination', price: '$500', desc: 'Local SEO + Google Business Profile.' },
];

const styles = [
  { name: 'Clean & Professional', tags: ['Law', 'Accounting', 'Medical'], color: '#4A90A4' },
  { name: 'Bold & Modern', tags: ['Tech', 'Startups', 'Fitness'], color: '#C17817' },
  { name: 'Warm & Natural', tags: ['Wellness', 'Yoga', 'Therapy'], color: '#2D6A4F' },
  { name: 'Rustic Craft', tags: ['Breweries', 'Bakeries', 'Artisan'], color: '#9E6012' },
  { name: 'Sleek & Dark', tags: ['Restaurants', 'Bars', 'Luxury'], color: '#1A1D20' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center hero-gradient grain overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-[family-name:var(--font-general)] text-copper-light text-sm sm:text-base font-medium tracking-wider uppercase mb-6"
          >
            Locally crafted digital.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-[family-name:var(--font-satoshi)] text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-4xl"
          >
            Your Kootenay business deserves a digital presence as impressive as the mountains around it.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-dark-text-muted text-lg sm:text-xl max-w-2xl leading-relaxed"
          >
            Modern websites, brands, and marketing for West Kootenay businesses. Built with the latest tools — delivered with a neighbour&apos;s care.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-base"
            >
              See Our Services <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-cream/20 text-cream hover:bg-cream/10 font-medium px-8 py-4 rounded-lg transition-all duration-200 text-base"
            >
              Free Website Audit
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="text-cream/40" size={28} />
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICES BENTO */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-3">What We Build</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate leading-tight">
              Everything your business needs online.
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.08} className={s.large ? 'sm:col-span-1 lg:row-span-1' : ''}>
                <div className="group relative bg-white rounded-2xl p-8 h-full border border-cream-border hover:border-copper/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-cream-dark flex items-center justify-center mb-5 group-hover:bg-copper/10 transition-colors">
                    <s.icon size={22} className="text-copper" />
                  </div>
                  <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate mb-2">{s.name}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">{s.desc}</p>
                  <p className="font-[family-name:var(--font-satoshi)] text-copper font-semibold text-sm">{s.price}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-8">
              <Link href="/services" className="inline-flex items-center gap-2 text-copper hover:text-copper-dark font-medium group transition-colors">
                View all services & pricing <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STYLE MENU PREVIEW */}
      <section className="bg-slate grain py-24 sm:py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">Find Your Style</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight max-w-2xl">
              Browse design styles built for businesses like yours.
            </h2>
          </ScrollReveal>

          <div className="mt-16 flex gap-5 overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
            {styles.map((style, i) => (
              <ScrollReveal key={style.name} delay={i * 0.1}>
                <div className="group snap-start shrink-0 w-72 sm:w-80 bg-slate-card rounded-2xl p-6 border border-white/5 hover:border-copper/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  {/* Color preview bar */}
                  <div className="h-32 rounded-xl mb-5 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${style.color}22, ${style.color}44)` }}>
                    <span className="font-[family-name:var(--font-satoshi)] text-lg font-bold" style={{ color: style.color }}>
                      Aa
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-cream mb-3">{style.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {style.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-white/5 text-dark-text-muted px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate leading-tight">
                Based in Castlegar.<br />Built for the Kootenays.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed">
                We&apos;re not a faceless agency in Vancouver or a template factory overseas. We live here. We shop at the same stores. We know what Kootenay businesses need because we&apos;re part of this community.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Clock, label: '2–4 Week Delivery', desc: 'Most projects launch in weeks, not months.' },
              { icon: MapPin, label: 'Truly Local', desc: 'Available for coffee, not just email.' },
              { icon: Zap, label: 'Modern Tools + AI', desc: 'Better results, faster delivery, better prices.' },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-copper/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon size={24} className="text-copper" />
                  </div>
                  <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-slate mb-2">{item.label}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hero-gradient grain py-24 sm:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight max-w-2xl mx-auto">
              Ready to stand out online?
            </h2>
            <p className="mt-6 text-dark-text-muted text-lg max-w-xl mx-auto leading-relaxed">
              Book a free website audit. No sales pitch — just honest insight into how your business looks online and what could be better.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book Your Free Audit <ArrowRight size={18} />
              </Link>
            </div>
            <p className="mt-8 text-dark-text-muted text-sm">
              Or reach us at{' '}
              <a href="mailto:hello@kootenaymade.ca" className="text-copper-light hover:text-copper transition-colors underline">
                hello@kootenaymade.ca
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
