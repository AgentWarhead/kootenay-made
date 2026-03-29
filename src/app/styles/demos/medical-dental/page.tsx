'use client'

import { DM_Sans } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

const font = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

/* ── Section reveal ── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Checkmark that pops in on scroll ── */
function CheckPop({ delay = 0 }: { delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-bold flex-shrink-0"
      style={{ backgroundColor: '#0891b2' }}
      initial={prefersReduced ? {} : { scale: 0, opacity: 0 }}
      whileInView={prefersReduced ? {} : { scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 400, damping: 15 }}
    >
      &#10003;
    </motion.span>
  )
}

/* ── Live Redesign ── */
const MD = {
  teal: '#0891b2',
  darkTeal: '#0e7490',
  lightBg: '#f0f7ff',
  dark: '#1e293b',
  slate: '#64748b',
  white: '#ffffff',
}

function LiveRedesign() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [transformed, setTransformed] = useState(false)

  const dur = prefersReduced ? 0.01 : 0.9
  const stagger = prefersReduced ? 0 : 0.18

  return (
    <div ref={ref} className="w-full">
      {/* Bold label */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? MD.teal : '#ccc' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className={`${font.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? MD.teal : '#888' }}
          >
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? MD.teal : '#ccc' }} layout transition={{ duration: 0.4 }} />
      </div>

      {/* Fixed-height container */}
      <div className="relative w-full" style={{ height: '480px' }}>
        <AnimatePresence mode="wait">
          {!transformed ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)', transition: { duration: 0.5 } }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: '#f2f0ed', border: '1px solid #d8d4cf', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              {/* WordPress nav */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#5b8fa8', borderBottom: '3px solid #3d6b84' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#a8d5e2' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>Kootenay Family Dental</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Services', 'About', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>&#9776; Menu</span>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #5b8fa8 0%, #a8d5e2 50%, #e0f4f9 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: 'Arial, sans-serif', color: '#666', letterSpacing: '0.15em' }}>&#9733; Welcome to Our Website &#9733;</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700 }}>
                    Kootenay Family Dental
                  </h2>
                  <p className="text-sm sm:text-lg mb-1 sm:mb-2" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>
                    &ldquo;Accepting New Patients!&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>
                    Cleanings &bull; Fillings &bull; Crowns &bull; Whitening &bull; Emergency
                  </p>
                  <div className="flex justify-center gap-2 sm:gap-3 mb-4 flex-wrap">
                    {['✓ Accepting New Patients', '✓ Insurance Welcome', '✓ Family Friendly'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#5b8fa8', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg font-bold mb-3" style={{ fontFamily: 'Arial, sans-serif', color: '#5b8fa8' }}>&#128222; Call Us Today: (250) 555-0188</p>
                  <span className="inline-block px-6 py-2.5 text-sm" style={{ backgroundColor: '#5b8fa8', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', cursor: 'default' }}>
                    Please Call to Schedule
                  </span>
                  <p className="mt-4 text-xs" style={{ color: '#bbb', fontFamily: 'Arial, sans-serif' }}>Powered by WordPress | Theme: Twenty Twenty-Three</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: dur * 0.8, ease: 'easeOut' }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: MD.white, border: `2px solid ${MD.teal}25`, borderRadius: '16px', boxShadow: `0 8px 40px ${MD.teal}15, 0 2px 8px rgba(0,0,0,0.04)` }}
            >
              
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/images/demos/medical-dental-hero.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)' }} />
            </div>
{/* Nav — white/light, Ranade, teal text */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${MD.teal}15`, backgroundColor: '#f0fdfe' }}>
                <motion.span style={{ color: MD.teal, fontFamily: "'Ranade', sans-serif", fontSize: '1.05rem', fontWeight: 700 }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  Kootenay Family Dental
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Services', 'About', 'Book Now', 'Contact'].map((link) => (
                    <span key={link} style={{ color: MD.teal, fontWeight: 500, fontFamily: "'Ranade', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: MD.teal }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: MD.teal }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: MD.teal }} />
                </motion.div>
              </div>

              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-14 flex-1 flex flex-col justify-center" style={{ backgroundColor: MD.white }}>
                {/* Soft curves/waves SVG motif — calming, not clinical */}
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.13 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="220" height="220" viewBox="0 0 180 180" fill="none">
                    <path d="M170 20 C130 20, 100 55, 90 80 C80 105, 85 130, 60 150 C40 165, 20 168, 10 170" stroke={MD.teal} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M170 55 C140 55, 115 82, 100 105 C85 128, 75 148, 50 162" stroke={MD.teal} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M170 90 C150 90, 132 110, 118 126" stroke={MD.teal} strokeWidth="0.9" fill="none" strokeLinecap="round" />
                    <ellipse cx="148" cy="38" rx="10" ry="6" stroke={MD.teal} strokeWidth="1" fill="none" />
                    <circle cx="92" cy="105" r="5" stroke={MD.teal} strokeWidth="0.8" fill="none" />
                    <circle cx="65" cy="148" r="3" fill={MD.teal} opacity="0.3" />
                  </svg>
                </motion.div>

                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span style={{ backgroundColor: `${MD.teal}12`, color: MD.teal, border: `1px solid ${MD.teal}22`, fontFamily: "'Ranade', sans-serif", fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0.4rem 1.25rem', borderRadius: '999px' }}>
                      Est. 2009 &mdash; West Kootenay
                    </span>
                  </motion.div>

                  <motion.h2 className="heading-font text-2xl sm:text-4xl md:text-5xl lg:text-5xl leading-[1.15] mb-4 sm:mb-6 sm:max-w-xl font-bold" style={{ color: MD.dark }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    Nervous About the Dentist? We Get It. That&apos;s Why{' '}
                    <span style={{ color: MD.teal }}>
                      We&apos;re Different.
                    </span>
                  </motion.h2>

                  <motion.p style={{ color: MD.slate, lineHeight: 1.7, fontFamily: "'Ranade', sans-serif", fontSize: '0.95rem', maxWidth: '28rem', marginBottom: '1.75rem' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Gentle care for every smile — new patients always welcome, no phone call needed to book.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }} className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#book-now" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]" style={{ backgroundColor: MD.teal, color: MD.white, fontFamily: "'Ranade', sans-serif", fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.06em', boxShadow: `0 4px 20px ${MD.teal}35` }}>
                      Book Online — No Phone Call Needed &rarr;
                    </a>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Ranade', sans-serif", fontSize: '0.85rem' }}>No commitment required</span>
                  </motion.div>

                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['Gentle Care', 'Same-Day Emergency', 'All Ages'].map((badge) => (
                      <span key={badge} style={{ color: MD.teal, opacity: 0.7, letterSpacing: '0.05em', fontFamily: "'Ranade', sans-serif", fontSize: '0.75rem', fontWeight: 600 }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Shimmer border — teal/white gradient */}
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${MD.darkTeal}, ${MD.teal}, #e0f7fa, ${MD.teal}, ${MD.darkTeal})`, backgroundSize: '200% 100%', animation: 'shimmer-border 3s linear infinite' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setTransformed(!transformed)}
          className={`${font.className} text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{ backgroundColor: transformed ? `${MD.teal}15` : MD.white, color: transformed ? MD.darkTeal : '#666', border: `1.5px solid ${transformed ? `${MD.teal}30` : '#ddd'}`, boxShadow: transformed ? `0 2px 12px ${MD.teal}10` : '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          {transformed ? '← See the Before' : '✨ Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ── FAQ Accordion ── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-sm transition-colors"
            style={{ color: '#1e293b', backgroundColor: open === i ? '#f0f7ff' : '#ffffff' }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <span style={{ color: '#0891b2', transition: 'transform 0.25s', transform: open === i ? 'rotate(180deg)' : 'none', display: 'inline-block', marginLeft: '1rem', flexShrink: 0 }}>▼</span>
          </button>
          {open === i && (
            <div className="px-6 py-4 text-sm leading-relaxed" style={{ color: '#475569', borderTop: '1px solid #e2e8f0', backgroundColor: '#f0f7ff' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Treatment Icon card ── */
function TreatmentIcon({ icon, label, detail, price }: { icon: string; label: string; detail: string; price?: string }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <button
      className="flex flex-col items-center p-4 rounded-2xl text-center transition-all w-full"
      style={{
        backgroundColor: expanded ? '#0891b2' : '#f0f7ff',
        border: `1.5px solid ${expanded ? '#0891b2' : 'rgba(8,145,178,0.15)'}`,
        boxShadow: expanded ? '0 4px 20px rgba(8,145,178,0.25)' : '0 1px 6px rgba(8,145,178,0.06)',
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <span className="text-3xl mb-2">{icon}</span>
      <p className="text-sm font-bold mb-1" style={{ color: expanded ? '#fff' : '#0891b2' }}>{label}</p>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
            <p className="text-xs leading-relaxed mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{detail}</p>
            {price && <p className="text-xs font-bold mt-2 px-3 py-1 rounded-full inline-block" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>{price}</p>}
          </motion.div>
        )}
      </AnimatePresence>
      {!expanded && <p className="text-xs" style={{ color: 'rgba(8,145,178,0.5)' }}>Tap for details</p>}
    </button>
  )
}

/* ══════════════════════════════════════════════════════════════
   KOOTENAY FAMILY DENTAL — Medical & Dental Demo
   ══════════════════════════════════════════════════════════════ */
export default function MedicalDentalDemo() {
  const prefersReduced = useReducedMotion()

  const faqItems = [
    {
      q: 'How long does a website take?',
      a: 'Most dental and medical websites are designed and live within 2–3 weeks. We handle everything — you just review and approve. Your practice stays focused on patients.',
    },
    {
      q: 'What if I already have a website?',
      a: 'We can redesign it completely or do a targeted refresh. Either way, the result is a site that makes new patients feel safe and welcome before their first appointment.',
    },
    {
      q: 'Do I need to provide content and photos?',
      a: "We'll guide you through what we need. We write the copy, and we can work with stock imagery or help you plan a simple photo session. Getting started is easy.",
    },
    {
      q: 'What does it cost?',
      a: 'Websites start from $1,500. A full brand build starts from $4,000. Google Domination (local SEO) starts from $500. Book a free consultation for an exact quote tailored to your practice.',
    },
    {
      q: 'Can I manage the site myself?',
      a: 'Yes — we build on easy-to-use platforms. Update your team page, add news, or change hours without touching code. Or we handle it for you.',
    },
    {
      q: 'Can you integrate online booking?',
      a: 'Absolutely. We can connect your booking system directly to your website so new patients can schedule 24/7 without calling the front desk.',
    },
    {
      q: 'Is patient trust built into the design?',
      a: "It's baked in from the start. Clean, calming aesthetics, clear credentials, team photos, and trust signals like ratings and years of experience — everything patients look for before choosing a provider.",
    },
  ]

  return (
    <div className={font.className} style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: '#ffffff', color: '#1e293b' }}>

      <style>{`
      @import url('https://api.fontshare.com/v2/css?f[]=ranade@400,500,700&display=swap');
      .heading-font { font-family: 'Ranade', sans-serif; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @keyframes calmPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(8,145,178,0.3); }
          50% { box-shadow: 0 0 0 12px rgba(8,145,178,0); }
        }
        @keyframes shimmer-border {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl md:text-2xl font-extrabold tracking-tight" style={{ color: '#0891b2', letterSpacing: '0.02em' }}>
            Kootenay Family Dental
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Book Now'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium transition-colors"
                style={{ color: '#64748b' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0891b2')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
              >
                {link}
              </a>
            ))}
            <a href="tel:2505550188" className="text-sm font-bold" style={{ color: '#0891b2' }}>
              (250) 555-0188
            </a>
          </div>
          <a href="tel:2505550188" className="md:hidden text-sm font-bold" style={{ color: '#0891b2' }}>
            (250) 555-0188
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO — Calming, centered ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/demos/medical-dental-hero.webp"
            alt="Kootenay Family Dental — welcoming modern dental office"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-white/60" />
        <div className="relative max-w-4xl mx-auto text-center px-6 py-32 md:py-44 w-full">
          <motion.p
            className="text-sm uppercase tracking-[0.2em] mb-6 font-medium"
            style={{ color: '#0891b2' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Gentle care for every smile
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ color: '#1e293b' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Nervous?<br />
            <span style={{ color: '#0891b2' }}>We Get It.</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#475569' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Gentle care for the whole family — now booking online. No phone call needed.
          </motion.p>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="#book-now"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all rounded-full"
              style={{
                backgroundColor: '#0891b2',
                color: '#ffffff',
                animation: prefersReduced ? 'none' : 'calmPulse 3s ease-in-out infinite',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
            >
              Book Online Now
            </a>
            <a
              href="#first-visit"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.8)', color: '#0891b2', border: '2px solid rgba(8,145,178,0.3)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)')}
            >
              Your First Visit →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div style={{ backgroundColor: '#f0f7ff' }} className="py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {[
            { label: '4.9 Rating', icon: '★★★★★' },
            { label: '15+ Years' },
            { label: 'Accepting New Patients' },
            { label: 'Direct Billing' },
          ].map((item, i) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap"
              style={{ backgroundColor: '#ffffff', color: '#0891b2', border: '1px solid rgba(8,145,178,0.15)' }}
            >
              {item.icon && <span style={{ color: '#0891b2' }}>{item.icon}</span>}
              <CheckPop delay={i * 0.1} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ 4. YOUR FIRST VISIT JOURNEY (UNIQUE SECTION) ═══════════ */}
      <section id="first-visit" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              Your First Visit
            </h2>
            <p className="text-center mb-4 max-w-xl mx-auto text-lg" style={{ color: '#64748b' }}>
              Not sure what happens when you get here? Here&rsquo;s exactly what to expect — no surprises.
            </p>
            <div className="w-16 h-1 rounded-full mx-auto mb-14" style={{ backgroundColor: '#0891b2' }} />
          </Reveal>

          {/* 3-step visual path */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting arrows (desktop only) */}
            <div className="hidden md:block absolute top-12 left-[calc(33.33%-1rem)] w-[calc(66.66%+2rem)] h-px"
              style={{ backgroundColor: 'rgba(8,145,178,0.2)', zIndex: 0 }} />

            {[
              {
                step: '1',
                icon: '💻',
                title: 'Book Online',
                sub: 'No phone call needed',
                desc: 'Choose your appointment type, pick a time that works for you, and you\'re done. You\'ll get a confirmation email with everything you need.',
                highlight: true,
              },
              {
                step: '2',
                icon: '📋',
                title: 'Fill Forms at Home',
                sub: 'On your own device',
                desc: 'We\'ll send your new patient forms by email. Fill them in from your couch, at your own pace. No clipboard anxiety at reception.',
              },
              {
                step: '3',
                icon: '😊',
                title: 'Meet Your Team',
                sub: 'We go slow',
                desc: 'We start with a conversation, not a drill. Dr. Patel will explain every step before it happens. You\'re always in control.',
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.15}>
                <div className="relative text-center p-6 rounded-2xl z-10"
                  style={{
                    backgroundColor: item.highlight ? '#0891b2' : '#f0f7ff',
                    border: `1.5px solid ${item.highlight ? '#0891b2' : 'rgba(8,145,178,0.15)'}`,
                    boxShadow: item.highlight ? '0 8px 32px rgba(8,145,178,0.25)' : 'none',
                  }}>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3"
                    style={{ backgroundColor: item.highlight ? 'rgba(255,255,255,0.25)' : '#0891b2', color: '#fff' }}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-1"
                    style={{ color: item.highlight ? '#fff' : '#0891b2' }}>{item.title}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: item.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(8,145,178,0.6)' }}>
                    {item.sub}
                  </p>
                  <p className="text-sm leading-relaxed"
                    style={{ color: item.highlight ? 'rgba(255,255,255,0.85)' : '#475569' }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-10 text-center">
              <a href="#book-now"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-full transition-all hover:scale-105"
                style={{ backgroundColor: '#0891b2', color: '#fff', boxShadow: '0 4px 20px rgba(8,145,178,0.3)' }}>
                Start Step 1 — Book Online
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 5. TREATMENT ICONS (NO PHOTOS — tap to expand) ═══════════ */}
      <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              Treatments We Offer
            </h2>
            <p className="text-center mb-4 max-w-xl mx-auto" style={{ color: '#64748b' }}>
              Tap any card to see details and pricing
            </p>
            <div className="w-16 h-1 rounded-full mx-auto mb-12" style={{ backgroundColor: '#0891b2' }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <TreatmentIcon icon="🦷" label="Cleaning" detail="Professional polish and tartar removal. Includes full exam with Dr. Patel." price="From $180" />
              <TreatmentIcon icon="✨" label="Whitening" detail="In-office or take-home whitening trays. Visible results in 1–2 visits." price="From $350" />
              <TreatmentIcon icon="👑" label="Crowns" detail="Same-day digital crowns. No messy impressions, no second appointment." price="From $1,200" />
              <TreatmentIcon icon="🔩" label="Implants" detail="Permanent tooth replacement. Natural look and feel, lasts decades." price="From $2,400" />
              <TreatmentIcon icon="🧸" label="Kids" detail="Child-friendly checkups from age 1. We make it fun, not scary." price="From $120" />
              <TreatmentIcon icon="🚨" label="Emergency" detail="Same-day emergency appointments when possible. Call us first." price="Call us" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 6. MEET DR. PATEL ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              Meet Dr. Patel
            </h2>
            <div className="w-16 h-1 rounded-full mx-auto mb-12" style={{ backgroundColor: '#0891b2' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
              {/* Photo placeholder */}
              <div className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden"
                style={{ border: '4px solid rgba(8,145,178,0.2)', backgroundColor: '#f0f7ff' }}>
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  👨‍⚕️
                </div>
              </div>
              {/* Bio */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#0891b2' }}>Dr. Raj Patel, DDS</h3>
                <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#94a3b8' }}>
                  Doctor of Dental Surgery · 15+ Years Experience
                </p>
                <p className="text-base leading-relaxed mb-5" style={{ color: '#475569' }}>
                  Dr. Patel grew up in the Kootenays and came back after completing his DDS at UBC because, as he puts it, &ldquo;you can&rsquo;t replace a community like this.&rdquo; He bought the practice in 2021 and has been focused on one thing ever since: making sure patients of all ages feel heard, comfortable, and confident about their dental health.
                </p>
                <p className="text-base leading-relaxed mb-6" style={{ color: '#475569' }}>
                  His philosophy: explain everything, rush nothing, and always ask &ldquo;how are you doing?&rdquo; before you pick up an instrument.
                </p>
                {/* Credentials */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {['DDS — UBC Faculty of Dentistry', 'Fellow, Canadian Dental Association', 'Invisalign Certified', 'Sedation Trained'].map((cred) => (
                    <span key={cred} className="px-3 py-1.5 text-xs font-semibold rounded-full"
                      style={{ backgroundColor: '#f0f7ff', color: '#0891b2', border: '1px solid rgba(8,145,178,0.2)' }}>
                      {cred}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 7. INSURANCE & PAYMENT ═══════════ */}
      <section className="py-10 px-6" style={{ backgroundColor: '#0891b2' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-center mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Insurance &amp; Payment
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {[
                { label: 'Pacific Blue Cross' },
                { label: 'Sun Life Financial' },
                { label: 'Manulife' },
                { label: 'Great-West Life' },
                { label: 'Direct Billing Available', highlight: true },
                { label: 'Payment Plans Available', highlight: true },
              ].map((item) => (
                <div key={item.label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                  style={{
                    backgroundColor: item.highlight ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                    border: `1px solid rgba(255,255,255,${item.highlight ? '0.4' : '0.15'})`,
                  }}>
                  <span className="text-sm font-semibold" style={{ color: '#fff' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. SMILE GALLERY — Before/After ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              Smile Gallery
            </h2>
            <p className="text-center mb-12" style={{ color: '#64748b' }}>
              Real transformations — the most compelling proof we can offer
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { treatment: 'Teeth Whitening', before: '🟡', after: '⚪', desc: '2 in-office sessions' },
                { treatment: 'Composite Veneers', before: '🔶', after: '⬜', desc: 'Single appointment' },
                { treatment: 'Invisalign', before: '📐', after: '✅', desc: '14 months treatment' },
              ].map((item) => (
                <div key={item.treatment} className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: '#fff', border: '1px solid rgba(8,145,178,0.15)', boxShadow: '0 2px 12px rgba(8,145,178,0.06)' }}>
                  <div className="flex">
                    {/* Before */}
                    <div className="flex-1 p-6 text-center" style={{ borderRight: '2px solid rgba(8,145,178,0.1)' }}>
                      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#94a3b8' }}>Before</p>
                      <div className="h-20 flex items-center justify-center rounded-xl mb-2"
                        style={{ backgroundColor: '#f8fafc' }}>
                        <span className="text-4xl">{item.before}</span>
                      </div>
                    </div>
                    {/* After */}
                    <div className="flex-1 p-6 text-center">
                      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#0891b2' }}>After</p>
                      <div className="h-20 flex items-center justify-center rounded-xl mb-2"
                        style={{ backgroundColor: '#f0f7ff' }}>
                        <span className="text-4xl">{item.after}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-5 text-center">
                    <p className="font-bold text-sm mb-1" style={{ color: '#0891b2' }}>{item.treatment}</p>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center mt-5 text-xs" style={{ color: '#94a3b8' }}>
              (Illustrative placeholders — actual patient photos with consent go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 9. THE TRANSFORMATION ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`heading-font text-3xl md:text-5xl font-bold text-center mb-4`} style={{ color: '#1e293b' }}>
              Watch Your Website Transform
            </h2>
            <p className={`${font.className} text-center mb-12`} style={{ color: '#64748b' }}>
              From dated to designed — in real time
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveRedesign />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 10. PATIENT STORIES (Testimonials) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              Patient Stories
            </h2>
            <p className="text-center mb-16" style={{ color: '#64748b' }}>The most honest words come from people who were nervous before their first visit</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I hadn't been to a dentist in 8 years. Pure anxiety. Dr. Patel talked me through every single step. I cried a little on the way home — not from pain, from relief that it wasn't as bad as I'd built it up to be.",
                name: 'Melissa R.',
                treatment: 'First visit after 8-year gap',
              },
              {
                quote: "My kids actually ask when their next appointment is. That's never happened anywhere else. The team makes it feel like a visit to a friend's house.",
                name: 'Jamie & Kevin T.',
                treatment: 'Family — 3 kids',
              },
              {
                quote: "Online booking changed everything for me. I work shifts — I can book at 11pm without playing phone tag. The forms online saved 20 minutes in the waiting room.",
                name: 'Derek S.',
                treatment: 'Regular checkup patient',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div
                  className="p-8 rounded-2xl transition-all"
                  style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 12px rgba(8,145,178,0.06)', border: '1px solid rgba(8,145,178,0.08)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(8,145,178,0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(8,145,178,0.06)')}
                >
                  <div className="mb-4 text-xl" style={{ color: '#0891b2' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <blockquote className="text-base leading-relaxed mb-6" style={{ color: '#1e293b', fontStyle: 'italic' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#0891b2' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>{t.treatment}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-center mt-8 text-xs" style={{ color: '#94a3b8' }}>
            (Sample reviews &mdash; your real reviews go here)
          </p>
        </div>
      </section>

      {/* ═══════════ 11. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-center mb-12" style={{ color: '#64748b' }}>
              Everything you need to know before we start
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={faqItems} />
          </Reveal>
          <div className="text-center mt-10">
            <a
              href="#book-now"
              className="inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all rounded-full"
              style={{ backgroundColor: '#0891b2', color: '#ffffff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
            >
              Let&rsquo;s Talk →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ 12. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#1e293b' }}>
              About Our Practice
            </h2>
            <div className="flex justify-center mb-10">
              <div className="w-12 h-1 rounded-full" style={{ backgroundColor: '#0891b2' }} />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
              Kootenay Family Dental has been providing gentle, comprehensive dental care to families in Trail and the West Kootenays for over 15 years. Our team believes that a visit to the dentist should be comfortable, stress-free, and even enjoyable. We use the latest technology, take the time to explain every procedure, and always put your comfort first. From children&rsquo;s first visits to cosmetic work and everything in between &mdash; we&rsquo;re here to help your whole family smile with confidence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 13. CONTACT / BOOK — Online CTA + Map + Running Late option ═══════════ */}
      <section id="book-now" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              Book an Appointment
            </h2>
            <p className="text-center mb-16" style={{ color: '#64748b' }}>
              New patients welcome &mdash; we&rsquo;d love to meet you
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Phone</h3>
                  <p className="text-lg font-bold" style={{ color: '#1e293b' }}>(250) 555-0188</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Email</h3>
                  <p style={{ color: '#475569' }}>info@kootenaydental.ca</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Hours</h3>
                  <p style={{ color: '#475569' }}>Monday &ndash; Friday: 8:00 AM &ndash; 5:00 PM</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Location</h3>
                  <p style={{ color: '#475569' }}>123 Sample St, Trail, BC</p>
                </div>
                {/* Map placeholder */}
                <div className="rounded-2xl overflow-hidden h-40 flex items-center justify-center"
                  style={{ backgroundColor: '#f0f7ff', border: '1px solid rgba(8,145,178,0.15)' }}>
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">📍</span>
                    <p className="text-sm font-medium" style={{ color: '#0891b2' }}>123 Sample St, Trail, BC</p>
                    <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>Google Maps would be embedded here</p>
                  </div>
                </div>
                {/* Running late option */}
                <div className="p-4 rounded-xl flex items-center gap-3"
                  style={{ backgroundColor: '#fff7ed', border: '1px solid rgba(249,115,22,0.2)' }}>
                  <span className="text-2xl">🏃</span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#c2410c' }}>Running late?</p>
                    <p className="text-xs" style={{ color: '#9a3412' }}>Text us at (250) 555-0188 and we&rsquo;ll hold your spot.</p>
                  </div>
                </div>
                <a
                  href="tel:2505550188"
                  className="inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all mt-4 rounded-full"
                  style={{
                    backgroundColor: '#0891b2',
                    color: '#ffffff',
                    animation: prefersReduced ? 'none' : 'calmPulse 3s ease-in-out infinite',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
                >
                  Book by Phone
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-sm outline-none transition-all rounded-xl" style={{ backgroundColor: '#f0f7ff', border: '1px solid #e2e8f0', color: '#1e293b' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#0891b2')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Email</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 text-sm outline-none transition-all rounded-xl" style={{ backgroundColor: '#f0f7ff', border: '1px solid #e2e8f0', color: '#1e293b' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#0891b2')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>New or returning patient?</label>
                  <select className="w-full px-4 py-3 text-sm outline-none rounded-xl" style={{ backgroundColor: '#f0f7ff', border: '1px solid #e2e8f0', color: '#1e293b' }}>
                    <option>New Patient</option>
                    <option>Returning Patient</option>
                    <option>Bringing a child</option>
                    <option>Emergency — I need to come in soon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Message</label>
                  <textarea rows={4} placeholder="Preferred date, time, or any questions..." className="w-full px-4 py-3 text-sm outline-none transition-all resize-none rounded-xl" style={{ backgroundColor: '#f0f7ff', border: '1px solid #e2e8f0', color: '#1e293b' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#0891b2')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                </div>
                <button type="submit" className="w-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all rounded-full" style={{ backgroundColor: '#0891b2', color: '#ffffff' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}>
                  Request Appointment
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 14. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0891b2' }}>Kootenay Family Dental</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Gentle care for every smile.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891b2' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {[['Services', '#services'], ['First Visit', '#first-visit'], ['About', '#about'], ['Book Now', '#book-now']].map(([label, href]) => (
                  <a key={label} href={href} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#0891b2')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891b2' }}>Info</h4>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Mon&ndash;Fri 8:00 AM &ndash; 5:00 PM</p>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>123 Sample St, Trail, BC</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>(250) 555-0188</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} className="pt-6 text-center">
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>&copy; 2025 Kootenay Family Dental. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '2px solid #0891b2',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: '#64748b' }}>
            Sample design by <strong style={{ color: '#1e293b' }}>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=medical-dental"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap rounded-full"
            style={{ backgroundColor: '#0891b2', color: '#ffffff', boxShadow: '0 2px 12px rgba(8,145,178,0.3)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
          >
            Like What You See? Let's Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
