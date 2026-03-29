'use client'

import { useState } from 'react'
import { Libre_Baskerville, Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

const heading = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

/* ─── Colour tokens ─────────────────────────────────────────── */
const C = {
  green: '#6b9a5b',
  cream: '#fdf8f0',
  terracotta: '#c17549',
  darkGreen: '#2d3b2d',
  white: '#ffffff',
  greenLight: '#e8f5e0',
  muted: '#e5e5e5',
}

/* ─── Reveal on scroll ──────────────────────────────────────── */
function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 28 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ─── SVG botanical corner: top-left ────────────────────────── */
function LeafCornerTL({ color = C.green, opacity = 0.18 }: { color?: string; opacity?: number }) {
  return (
    <svg
      className="absolute top-0 left-0 pointer-events-none select-none"
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <path d="M12 118 C12 65 22 35 62 12" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M12 118 C28 85 50 68 85 62" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M22 100 C22 72 34 54 58 40" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="3 4" />
      <ellipse cx="40" cy="72" rx="9" ry="4.5" stroke={color} strokeWidth="1" fill="none" transform="rotate(-30 40 72)" />
      <ellipse cx="57" cy="48" rx="8" ry="4" stroke={color} strokeWidth="1" fill="none" transform="rotate(-52 57 48)" />
    </svg>
  )
}

/* ─── SVG botanical corner: bottom-right ───────────────────── */
function LeafCornerBR({ color = C.green, opacity = 0.15 }: { color?: string; opacity?: number }) {
  return (
    <svg
      className="absolute bottom-0 right-0 pointer-events-none select-none"
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <path d="M138 32 C138 85 128 110 88 135" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M138 32 C116 65 92 78 58 88" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M124 50 C112 80 96 95 70 112" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="3 4" />
      <ellipse cx="108" cy="76" rx="10" ry="5" stroke={color} strokeWidth="1" fill="none" transform="rotate(40 108 76)" />
      <ellipse cx="84" cy="100" rx="9" ry="4.5" stroke={color} strokeWidth="1" fill="none" transform="rotate(22 84 100)" />
    </svg>
  )
}

/* ─── SVG botanical corner: top-right vine ──────────────────── */
function VineCornerTR({ color = C.green, opacity = 0.14 }: { color?: string; opacity?: number }) {
  return (
    <svg
      className="absolute top-0 right-0 pointer-events-none select-none"
      width="110"
      height="110"
      viewBox="0 0 110 110"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <path d="M98 12 C78 12 56 28 44 55 C32 82 38 98 22 104" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="68" cy="35" rx="8" ry="4" stroke={color} strokeWidth="1" fill="none" transform="rotate(-62 68 35)" />
      <ellipse cx="48" cy="62" rx="7" ry="3.5" stroke={color} strokeWidth="1" fill="none" transform="rotate(-22 48 62)" />
      <path d="M84 28 C70 50 55 65 38 80" stroke={color} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeDasharray="2 4" />
    </svg>
  )
}

/* ─── FAQ Accordion ─────────────────────────────────────────── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  return (
    <div
      className="rounded-xl overflow-hidden mb-3"
      style={{
        border: `1px solid ${open ? C.green : `${C.green}33`}`,
        transition: prefersReduced ? 'none' : 'border-color 0.3s ease',
      }}
    >
      <button
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ backgroundColor: open ? `${C.green}08` : C.white }}
      >
        <span className="text-sm font-medium" style={{ color: C.darkGreen }}>{question}</span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm"
          style={{
            backgroundColor: open ? C.green : `${C.green}18`,
            color: open ? C.white : C.green,
            transition: prefersReduced ? 'none' : 'all 0.3s ease',
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? '400px' : '0',
          overflow: 'hidden',
          transition: prefersReduced ? 'none' : 'max-height 0.4s ease',
        }}
      >
        <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#5a6e5a' }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CEDARVIEW LANDSCAPING — Home & Garden Demo
   ═══════════════════════════════════════════════════════════════ */
export default function HomeGardenDemo() {
  const prefersReduced = useReducedMotion()
  const [activeTab, setActiveTab] = useState<'Spring' | 'Summer' | 'Fall' | 'Winter'>('Spring')

  type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter'
  const seasonalContent: Record<Season, { services: string[]; emoji: string; accent: string }> = {
    Spring: {
      services: ['Garden Design & Planting', 'Lawn Renovation', 'Spring Cleanup', 'Mulching & Bed Prep'],
      emoji: '🌱',
      accent: C.green,
    },
    Summer: {
      services: ['Irrigation Management', 'Lawn Maintenance', 'Outdoor Living Spaces', 'Tree & Hedge Trimming'],
      emoji: '☀️',
      accent: C.terracotta,
    },
    Fall: {
      services: ['Leaf Removal', 'Winterization', 'Fall Planting', 'Drainage Solutions'],
      emoji: '🍂',
      accent: '#b8860b',
    },
    Winter: {
      services: ['Snow Removal', 'Holiday Lighting', 'Winter Pruning', 'Planning & Design Consultations'],
      emoji: '❄️',
      accent: '#4a7fa5',
    },
  }

  const faqItems = [
    {
      question: 'How long does a website take to build?',
      answer: 'Most landscaping and garden business websites are ready in 2–3 weeks. We move quickly so you can start capturing leads before the season gets busy.',
    },
    {
      question: 'Can I show a portfolio of past projects?',
      answer: 'Absolutely — a photo portfolio is one of the most powerful tools for a landscaping business. We\'ll build a gallery that lets your work sell itself. Send us your best photos and we\'ll take care of the rest.',
    },
    {
      question: 'What if I already have a website?',
      answer: 'We\'ll review what you have and either redesign it or rebuild it completely. Either way, you end up with something that actually brings in leads.',
    },
    {
      question: 'Can I list seasonal services and update them myself?',
      answer: 'Yes. We build on platforms you can manage yourself — no tech skills required. Update your services, add new project photos, or change your seasonal offerings any time.',
    },
    {
      question: 'What does it cost?',
      answer: 'A custom website starts from $1,500. Google Domination (so you rank when homeowners search for landscapers) starts from $500. Book a free consultation for a clear, itemized quote.',
    },
    {
      question: 'Do you work with both residential and commercial clients?',
      answer: 'We build websites for all types of landscaping businesses — residential lawn care, commercial grounds maintenance, garden design, and everything in between. We\'ll tailor the site to your specific clientele.',
    },
  ]

  return (
    <div
      className={body.className}
      style={{ fontFamily: 'Inter, sans-serif', backgroundColor: C.cream, color: C.darkGreen }}
    >
      {/* ─── Global styles ──────────────────────────────────── */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.06); }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav
        className="sticky top-0 z-40 px-6 py-4"
        style={{
          backgroundColor: C.cream,
          borderBottom: `1px solid ${C.green}33`,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span
            className={`${heading.className} text-xl md:text-2xl italic font-normal`}
            style={{ color: C.darkGreen, letterSpacing: '0.02em' }}
          >
            Cedarview Landscaping
          </span>

          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Portfolio', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium transition-colors"
                style={{ color: C.darkGreen }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.green)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.darkGreen)}
              >
                {link}
              </a>
            ))}
            <a href="tel:2505550115" className="text-sm font-bold" style={{ color: C.terracotta }}>
              (250) 555-0115
            </a>
          </div>

          <a href="tel:2505550115" className="md:hidden text-sm font-bold" style={{ color: C.terracotta }}>
            (250) 555-0115
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div
          className="absolute inset-0"
          style={{
            animation: prefersReduced ? 'none' : 'slowZoom 20s ease-in-out infinite alternate',
            transformOrigin: 'center center',
          }}
        >
          <Image
            src="/images/demos/garden-hero.webp"
            alt="Beautifully landscaped garden — Cedarview Landscaping Castlegar BC"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-0 left-0 pointer-events-none">
          <LeafCornerTL color={C.white} opacity={0.22} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-36 w-full">
          <motion.p
            className="text-sm font-medium uppercase tracking-[0.2em] mb-5"
            style={{ color: 'rgba(255,255,255,0.88)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Castlegar &amp; the West Kootenays
          </motion.p>

          <motion.h1
            className={`${heading.className} text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-3xl`}
            style={{ color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 22 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4 }}
          >
            Rooted in Beautiful
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            style={{ color: 'rgba(255,255,255,0.92)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6 }}
          >
            We transform outdoor spaces into living landscapes you&rsquo;ll love year after year.
            Thoughtful design, expert installation, and seasonal care — all rooted in the Kootenay landscape.
          </motion.p>

          <motion.a
            href="#contact"
            className="inline-block px-9 py-4 text-base font-bold rounded-full transition-all"
            style={{ backgroundColor: C.green, color: C.white }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={prefersReduced ? {} : { scale: 1.04, boxShadow: '0 8px 28px rgba(107,154,91,0.5)' }}
          >
            Request a Free Quote
          </motion.a>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <section className="py-5 px-6" style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.green}22` }}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
          {[
            { text: '★★★★★ 4.9 Rating', star: true },
            { text: '12+ Years', star: false },
            { text: 'Licensed & Insured', star: false },
            { text: 'Free Estimates', star: false },
          ].map(({ text, star }) => (
            <span
              key={text}
              className="text-sm md:text-base font-medium whitespace-nowrap"
              style={{ color: star ? C.green : C.terracotta }}
            >
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════ 4. SERVICES — with PAS intro ═══════════ */}
      <section
        id="services"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.white }}
      >
        <VineCornerTR />

        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              What We Build for You
            </h2>
            <div className="w-16 h-0.5 mb-8" style={{ backgroundColor: C.green }} />
          </Reveal>

          {/* PAS copy */}
          <Reveal delay={0.1}>
            <p
              className="text-base md:text-lg leading-relaxed mb-14 max-w-2xl italic"
              style={{ color: '#7a8e7a' }}
            >
              Your competitor gets the big landscaping contracts because their website shows a portfolio —
              yours is a Facebook page. They&rsquo;re not better landscapers. They just look more established online.
              One good website changes that immediately.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Custom Website',
                price: 'From $1,500',
                desc: 'Show off your portfolio. Let your work sell itself — before the phone even rings.',
                icon: '🌿',
              },
              {
                title: 'Google Visibility',
                price: 'From $500',
                desc: 'When homeowners search for landscapers, you come up first. More leads, less guessing.',
                icon: '📍',
              },
              {
                title: 'Smart Business Tools',
                price: 'From $750',
                desc: 'Automate quotes and seasonal reminders. Stay busy year-round without the admin headache.',
                icon: '🗓️',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.12}>
                <motion.div
                  className="relative p-8 h-full rounded-xl cursor-default"
                  style={{
                    backgroundColor: C.white,
                    borderLeft: `4px solid ${C.green}`,
                    boxShadow: '0 2px 12px rgba(107,154,91,0.10)',
                  }}
                  whileHover={
                    prefersReduced
                      ? {}
                      : { y: -6, boxShadow: '0 14px 36px rgba(107,154,91,0.20)' }
                  }
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <span className="text-3xl mb-4 block">{card.icon}</span>
                  <h3 className={`${heading.className} text-xl font-bold mb-1`} style={{ color: C.darkGreen }}>
                    {card.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${C.green}88` }}>
                    {card.price}
                  </p>
                  <p className="leading-relaxed text-sm" style={{ color: '#5a6e5a' }}>
                    {card.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.greenLight }}
      >
        <LeafCornerTL />

        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold text-center mb-3`}
              style={{ color: C.darkGreen }}
            >
              How It Works
            </h2>
            <p className="text-center text-sm mb-14" style={{ color: C.green }}>
              From first conversation to fully booked — here&rsquo;s the path
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10 relative">
            <div
              className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5"
              style={{ backgroundColor: `${C.green}33` }}
            />
            {[
              {
                step: '01',
                title: 'We Talk',
                desc: 'A free consultation — you tell us about your business, your ideal clients, and your goals for the season.',
                icon: '🌱',
              },
              {
                step: '02',
                title: 'We Build',
                desc: 'We design and develop your site in about 2 weeks — built to showcase your portfolio and convert visitors into leads.',
                icon: '🔨',
              },
              {
                step: '03',
                title: 'You Grow',
                desc: 'Launch, rank on Google, and start getting calls from homeowners who found you online — not just word of mouth.',
                icon: '🌳',
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5 text-2xl relative z-10 shadow-sm"
                    style={{ backgroundColor: C.white, border: `2px solid ${C.green}44` }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.green }}>
                    Step {item.step}
                  </span>
                  <h3 className={`${heading.className} text-xl font-bold mb-3`} style={{ color: C.darkGreen }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5a6e5a' }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SEASONAL TABS ═══════════ */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.cream }}
      >
        <LeafCornerTL />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold text-center mb-10`}
              style={{ color: C.darkGreen }}
            >
              Services for Every Season
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <div
                className="flex rounded-full p-1 gap-1 w-full max-w-sm"
                style={{ backgroundColor: `${C.green}18` }}
              >
                {(['Spring', 'Summer', 'Fall', 'Winter'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="flex-1 px-3 py-2 text-sm font-medium rounded-full transition-all"
                    style={{
                      color: activeTab === tab ? C.white : C.darkGreen,
                      backgroundColor: activeTab === tab ? C.green : 'transparent',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="relative" style={{ minHeight: 220 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
                animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <div
                  className="rounded-2xl p-8 md:p-10"
                  style={{
                    backgroundColor: C.white,
                    border: `1px solid ${C.green}22`,
                    boxShadow: '0 4px 20px rgba(107,154,91,0.08)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{seasonalContent[activeTab].emoji}</span>
                    <h3
                      className={`${heading.className} text-2xl font-bold`}
                      style={{ color: seasonalContent[activeTab].accent }}
                    >
                      {activeTab} Services
                    </h3>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {seasonalContent[activeTab].services.map((service) => (
                      <li key={service} className="flex items-center gap-3 text-base" style={{ color: C.darkGreen }}>
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: seasonalContent[activeTab].accent }} />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY / SHOWCASE ═══════════ */}
      <section
        id="portfolio"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.cream }}
      >
        <LeafCornerBR />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              Our Work
            </h2>
            <div className="w-16 h-0.5 mb-12" style={{ backgroundColor: C.green }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative max-w-3xl mx-auto mb-10 overflow-hidden rounded-xl shadow-md">
              <Image
                src="/images/demos/home-garden-showcase.webp"
                alt="Cedarview Landscaping — portfolio showcase"
                width={800}
                height={500}
                className="w-full h-auto block"
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {[
              { label: 'Residential Design', img: '/images/demos/gallery/hg-1.webp' },
              { label: 'Commercial Grounds', img: '/images/demos/gallery/hg-2.webp' },
              { label: 'Seasonal Care', img: '/images/demos/gallery/hg-3.webp' },
            ].map(({ label, img }, i) => (
              <Reveal key={label} delay={0.12 + i * 0.1}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={img} alt={label} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-sm font-medium">{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. BEFORE / AFTER ═══════════ */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.white }}
      >
        <LeafCornerBR />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold text-center mb-3`}
              style={{ color: C.darkGreen }}
            >
              The Cedarview Difference
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: C.green }}>
              See the transformation we bring to every property — and every website
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg"
              style={{ minHeight: 300, border: `1px solid ${C.green}22` }}
            >
              {/* Before */}
              <div
                className="flex-1 flex flex-col items-center justify-center py-16 px-8 relative"
                style={{ backgroundColor: C.muted }}
              >
                <span
                  className="absolute top-4 left-5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(0,0,0,0.1)', color: '#888' }}
                >
                  Before
                </span>
                <div
                  className="w-full max-w-xs rounded-xl flex items-center justify-center"
                  style={{
                    height: 160,
                    background: 'repeating-linear-gradient(135deg, #d4d4d4 0px, #d4d4d4 1px, transparent 1px, transparent 12px)',
                    border: '1px dashed #bbb',
                    opacity: 0.75,
                  }}
                >
                  <div className="text-center px-4">
                    <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: '#999' }}>Valley Green Landscaping</p>
                    <p className="text-xs" style={{ color: '#bbb' }}>Facebook page only. No portfolio. No calls.</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex-shrink-0 flex items-center justify-center z-10 md:w-0">
                <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5" style={{ backgroundColor: C.white }} />
                <div className="md:hidden w-full h-0.5" style={{ backgroundColor: C.white }} />
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-20 absolute"
                  style={{ backgroundColor: C.darkGreen, border: `2.5px solid ${C.white}`, color: C.white }}
                >
                  ↔
                </div>
              </div>

              {/* After */}
              <div
                className="flex-1 flex flex-col items-center justify-center py-16 px-8 relative"
                style={{ backgroundColor: C.greenLight }}
              >
                <span
                  className="absolute top-4 right-5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${C.green}28`, color: C.darkGreen }}
                >
                  After
                </span>
                <div
                  className="w-full max-w-xs rounded-xl flex items-center justify-center"
                  style={{
                    height: 160,
                    background: `linear-gradient(135deg, ${C.green}28 0%, ${C.greenLight} 100%)`,
                    border: `1px solid ${C.green}44`,
                  }}
                >
                  <div className="text-center px-4">
                    <p className={`${heading.className} text-sm italic font-bold mb-2`} style={{ color: C.darkGreen }}>Cedarview Landscaping</p>
                    <p className="text-xs" style={{ color: '#5a6e5a' }}>Portfolio live. Google ranking. Phone ringing. 🌿</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs mt-4 italic" style={{ color: C.terracotta, opacity: 0.7 }}>
              Interactive demo — your site will showcase your portfolio and seasonal services
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.cream }}
      >
        <LeafCornerTL />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              What Clients Say
            </h2>
            <div className="w-16 h-0.5 mb-16" style={{ backgroundColor: C.green }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'We used to rely entirely on referrals. Within a month of launching our site we started getting calls from homeowners who found us on Google. It paid for itself fast.',
                author: 'Derek & Sonia M.',
                business: 'Summit Outdoor Services',
                town: 'Castlegar',
              },
              {
                quote: 'We won two commercial contracts this spring because our website showed a proper portfolio. The clients said our site looked the most professional of everyone they contacted.',
                author: 'Brad L.',
                business: 'Four Seasons Grounds',
                town: 'Nelson',
              },
              {
                quote: 'I run a small garden centre and was invisible online. Now I rank on the first page for local searches and have more walk-ins than ever. Total game changer.',
                author: 'Helen T.',
                business: 'Kootenay Bloom Garden Centre',
                town: 'Creston',
              },
            ].map((t, i) => (
              <Reveal key={t.author} delay={i * 0.15}>
                <div
                  className="relative rounded-2xl p-8 h-full"
                  style={{
                    backgroundColor: C.white,
                    border: `1px solid ${C.green}22`,
                    boxShadow: '0 4px 20px rgba(107,154,91,0.08)',
                  }}
                >
                  <div className="absolute top-5 left-5 text-2xl pointer-events-none select-none" style={{ opacity: 0.25 }} aria-hidden="true">
                    🌿
                  </div>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} style={{ color: C.green, fontSize: '1rem' }}>★</span>
                    ))}
                  </div>
                  <blockquote
                    className={`${heading.className} text-sm font-normal italic leading-relaxed mb-5`}
                    style={{ color: C.darkGreen }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="font-bold text-xs" style={{ color: C.terracotta }}>
                    &mdash; {t.author}, {t.town}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(45,59,45,0.4)' }}>{t.business}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="text-xs mt-8 italic text-center" style={{ color: 'rgba(45,59,45,0.35)' }}>
              (Sample reviews &mdash; your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.white }}
      >
        <VineCornerTR />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              Common Questions
            </h2>
            <div className="w-16 h-0.5 mb-14" style={{ backgroundColor: C.green }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              {faqItems.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section
        id="about"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.cream }}
      >
        <LeafCornerTL />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              Grown from the Ground Up
            </h2>
            <div className="w-16 h-0.5 mb-8" style={{ backgroundColor: C.green }} />
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: '#4a6045' }}>
              Cedarview Landscaping was founded right here in the West Kootenays, with a deep respect for the
              landscape that surrounds us. We believe the best gardens don&rsquo;t fight nature &mdash; they work
              with it. Our team brings over 12 years of hands-on experience designing, installing, and caring for
              properties across Castlegar, Nelson, Trail, and beyond.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base leading-relaxed" style={{ color: '#5a6e5a' }}>
              From intimate residential gardens to large commercial grounds, we approach every project with the
              same philosophy: listen carefully, design thoughtfully, and build something that will thrive for
              years to come. We&rsquo;re fully licensed, insured, and proud to be your neighbours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section
        id="contact"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.white }}
      >
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              Let&rsquo;s Talk About Your Space
            </h2>
            <div className="w-16 h-0.5 mb-14" style={{ backgroundColor: C.green }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <Reveal>
              <div className="space-y-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.green }}>Phone</p>
                  <a
                    href="tel:2505550115"
                    className="text-2xl font-bold transition-colors"
                    style={{ color: C.terracotta }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.darkGreen)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.terracotta)}
                  >
                    (250) 555-0115
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.green }}>Email</p>
                  <a
                    href="mailto:info@cedarviewlandscaping.ca"
                    className="text-base transition-colors"
                    style={{ color: C.darkGreen }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.green)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.darkGreen)}
                  >
                    info@cedarviewlandscaping.ca
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.green }}>Hours</p>
                  <p className="text-base" style={{ color: C.darkGreen }}>Mon &ndash; Sat &nbsp; 8:00 am &ndash; 5:00 pm</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.green }}>Location</p>
                  <p className="text-base" style={{ color: C.darkGreen }}>Castlegar, BC &amp; surroundings</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.green }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm rounded-lg outline-none transition-all"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.green}33`, color: C.darkGreen }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.green)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = `${C.green}33`)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.green }}>Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 text-sm rounded-lg outline-none transition-all"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.green}33`, color: C.darkGreen }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.green)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = `${C.green}33`)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.green }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project, yard size, and goals..."
                    className="w-full px-4 py-3 text-sm rounded-lg outline-none transition-all resize-none"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.green}33`, color: C.darkGreen }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.green)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = `${C.green}33`)}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 text-sm font-bold rounded-full transition-all"
                  style={{ backgroundColor: C.green, color: C.white }}
                  whileHover={prefersReduced ? {} : { scale: 1.02, boxShadow: '0 8px 24px rgba(107,154,91,0.38)' }}
                >
                  Request a Free Quote
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 12. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: C.darkGreen }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${heading.className} text-lg font-normal italic mb-3`} style={{ color: C.cream }}>
                Cedarview Landscaping
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(253,248,240,0.52)' }}>
                Rooted in beautiful. Thoughtful landscaping for Kootenay homes and businesses.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.green }}>Navigation</h4>
              <div className="flex flex-col gap-2">
                {['Services', 'Portfolio', 'About', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(253,248,240,0.48)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.cream)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,248,240,0.48)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.green }}>Get in Touch</h4>
              <p className="text-sm mb-1" style={{ color: 'rgba(253,248,240,0.48)' }}>(250) 555-0115</p>
              <p className="text-sm mb-1" style={{ color: 'rgba(253,248,240,0.48)' }}>info@cedarviewlandscaping.ca</p>
              <p className="text-sm" style={{ color: 'rgba(253,248,240,0.48)' }}>Castlegar, BC</p>
            </div>
          </div>
          <div className="pt-6 text-center" style={{ borderTop: '1px solid rgba(253,248,240,0.1)' }}>
            <span className="text-xs" style={{ color: 'rgba(253,248,240,0.22)' }}>
              &copy; 2026 Cedarview Landscaping. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(45,59,45,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: `2px solid ${C.green}`,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(253,248,240,0.72)' }}>
              This is a sample design by{' '}
              <strong style={{ color: C.cream }}>Kootenay Made Digital</strong>
            </span>
            <a href="tel:2505550000" className="hidden sm:inline text-sm font-bold" style={{ color: C.green }}>
              (250) 555-0000
            </a>
          </div>
          <Link
            href="/contact?style=home-garden"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded-full transition-all whitespace-nowrap"
            style={{ backgroundColor: C.green, color: C.white }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 18px rgba(107,154,91,0.52)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            Get Your Free Mockup &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom spacer so content clears the sticky bar */}
      <div className="h-16" />
    </div>
  )
}
