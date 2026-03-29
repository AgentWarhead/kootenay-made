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
              style={{ backgroundColor: MD.white, border: `1px solid ${MD.teal}30`, borderRadius: '16px', boxShadow: `0 8px 40px ${MD.teal}15, 0 2px 8px rgba(0,0,0,0.04)` }}
            >
              {/* Elegant nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${MD.teal}15` }}>
                <motion.span className={`${font.className} text-base sm:text-lg font-bold`} style={{ color: MD.teal }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  Kootenay Family Dental
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Services', 'About', 'Book Now', 'Contact'].map((link) => (
                    <span key={link} className={`${font.className} text-xs uppercase tracking-widest`} style={{ color: MD.teal, fontWeight: 500 }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: MD.teal }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: MD.teal }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: MD.teal }} />
                </motion.div>
              </div>

              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-14 flex-1 flex flex-col justify-center">
                {/* Soft wave SVG motif */}
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="220" height="220" viewBox="0 0 180 180" fill="none">
                    <path d="M170 30 C140 30, 120 60, 100 80 C80 100, 60 110, 40 120 C20 130, 10 150, 10 160" stroke={MD.teal} strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M170 60 C145 60, 125 85, 105 100 C85 115, 65 120, 45 130" stroke={MD.teal} strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    <path d="M170 90 C150 90, 135 108, 118 118" stroke={MD.teal} strokeWidth="0.8" fill="none" strokeLinecap="round" />
                    <circle cx="155" cy="45" r="6" stroke={MD.teal} strokeWidth="1" fill="none" />
                    <circle cx="90" cy="100" r="4" stroke={MD.teal} strokeWidth="0.8" fill="none" />
                  </svg>
                </motion.div>

                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${font.className} text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full`} style={{ backgroundColor: `${MD.teal}15`, color: MD.teal, border: `1px solid ${MD.teal}25` }}>
                      Est. 2009 &mdash; West Kootenay
                    </span>
                  </motion.div>

                  <motion.h2 className={`${font.className} text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-4 sm:mb-6 sm:max-w-xl font-bold`} style={{ color: MD.dark }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    Nervous About the Dentist?<br />We Get It. That&apos;s Why{' '}
                    <span className="relative inline-block" style={{ color: MD.teal }}>
                      We&apos;re Different.
                      <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                        <motion.path d="M4 8 C40 2, 80 4, 130 7 C155 8, 180 5, 196 6" stroke={MD.teal} strokeWidth="2" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur * 1.5, delay: stagger * 5, ease: 'easeOut' }} />
                      </motion.svg>
                    </span>
                  </motion.h2>

                  <motion.p className={`${font.className} text-sm sm:text-lg max-w-md sm:mx-0 mx-auto mb-6 sm:mb-8`} style={{ color: MD.slate, lineHeight: 1.7 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Gentle care for every smile — new patients always welcome, no phone call needed to book.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }} className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#book-now" className={`${font.className} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] font-bold uppercase tracking-widest`} style={{ backgroundColor: MD.teal, color: MD.white, boxShadow: `0 4px 20px ${MD.teal}35` }}>
                      Book Online — No Phone Call Needed
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <span className={`${font.className} text-sm`} style={{ color: '#999' }}>No commitment required</span>
                  </motion.div>

                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['Gentle Care', 'Same-Day Emergency', 'All Ages'].map((badge) => (
                      <span key={badge} className={`${font.className} text-xs`} style={{ color: MD.teal, opacity: 0.7, letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Shimmer border */}
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${MD.darkTeal}, ${MD.teal}, ${MD.darkTeal})`, backgroundSize: '200% 100%', animation: 'shimmer-border 3s linear infinite' }} />
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
            {['Services', 'About', 'Gallery', 'Book Now'].map((link) => (
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

      {/* ═══════════ 2. HERO ═══════════ */}
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            style={{ color: '#1e293b' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Kootenay Family Dental
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#475569' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Your family deserves a dental team that listens, cares, and makes every visit comfortable.
          </motion.p>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
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
              Book an Appointment
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

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto">
          {/* PAS intro */}
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-12 px-6 py-8 rounded-2xl" style={{ backgroundColor: '#f0f7ff', border: '1px solid rgba(8,145,178,0.15)' }}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#1e293b' }}>
                <strong>Patients are choosing the clinic with the modern website and online booking.</strong> Not because that clinic is better &mdash; but because it <em>looks</em> more trustworthy before they ever walk through the door. The practice that looks professional gets the call. Let&rsquo;s make sure that&rsquo;s yours.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              What We Can Do For You
            </h2>
            <p className="text-center mb-16" style={{ color: '#64748b' }}>
              Digital solutions tailored for dental and medical practices
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Custom Website', desc: 'Make new patients feel welcome before their first visit.', pricing: 'From $1,500' },
              { title: 'Google Visibility', desc: 'Be the first dental clinic families find when they search.', pricing: 'From $500' },
              { title: 'Email Marketing', desc: 'Automated recall reminders keep your schedule full.', pricing: 'From $750' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div
                  className="p-8 text-center transition-all cursor-default rounded-2xl"
                  style={{ backgroundColor: '#f0f7ff', boxShadow: '0 1px 8px rgba(8,145,178,0.06)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(8,145,178,0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 8px rgba(8,145,178,0.06)')}
                >
                  <div className="flex justify-center mb-4">
                    <CheckPop delay={0.2 + i * 0.1} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0891b2' }}>{card.title}</h3>
                  <p className="leading-relaxed mb-4" style={{ color: '#475569' }}>{card.desc}</p>
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#ffffff', color: '#0891b2', border: '1px solid rgba(8,145,178,0.2)' }}>{card.pricing}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              How It Works
            </h2>
            <p className="text-center mb-16" style={{ color: '#64748b' }}>
              From first conversation to live website — no stress, no jargon
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { num: '01', title: 'We Talk', desc: 'Tell us about your practice, your patients, and what makes your care special. Free consultation — no pressure at all.' },
              { num: '02', title: 'We Build', desc: 'We design and develop your site in about two weeks. You review, we refine. It will feel exactly right.' },
              { num: '03', title: 'You Grow', desc: 'Launch, get found on Google, and watch new patient bookings roll in. Your practice, elevated online.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.15}>
                <div className="text-center">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white text-xl font-bold mb-6 mx-auto"
                    style={{ backgroundColor: '#0891b2', boxShadow: '0 4px 16px rgba(8,145,178,0.3)' }}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#1e293b' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY / SHOWCASE ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12" style={{ color: '#1e293b' }}>
              Our Practice
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="overflow-hidden w-full max-w-3xl rounded-2xl" style={{ boxShadow: '0 4px 24px rgba(8,145,178,0.1)' }}>
                <Image
                  src="/images/demos/medical-dental-showcase.webp"
                  alt="Kootenay Family Dental — modern treatment room"
                  width={800}
                  height={450}
                  className="w-full h-auto block"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Treatment Rooms', 'Waiting Area', 'Our Team'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                  <Image src={`/images/demos/gallery/md-${i + 1}.webp`} alt={label} fill className='object-cover' />
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                    <span className='text-white text-sm font-medium'>{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. THE TRANSFORMATION ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${font.className} text-3xl md:text-5xl font-bold text-center mb-4`} style={{ color: '#1e293b' }}>
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

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              What Practices Are Saying
            </h2>
            <p className="text-center mb-16" style={{ color: '#64748b' }}>Real results from real Kootenay clinics</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "New patient bookings went up 40% in the first two months after our new website launched. Patients actually comment on how professional it looks. Worth every penny.",
                name: 'Dr. Sarah K.',
                business: 'Nakusp Family Dental',
                location: 'Nakusp, BC',
              },
              {
                quote: "Our old site was costing us patients — they were choosing the clinic with online booking. Kootenay Made set us up right. The phone doesn't stop ringing now.",
                name: 'Dr. Marcus T.',
                business: 'Castlegar Medical Clinic',
                location: 'Castlegar, BC',
              },
              {
                quote: "They understood how important trust is for a dental practice. The website feels calm, warm, and credible. Exactly what nervous patients need to see before booking.",
                name: 'Dr. Priya M.',
                business: 'Trail Dental Group',
                location: 'Trail, BC',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div
                  className="p-8 rounded-2xl transition-all"
                  style={{ backgroundColor: '#f0f7ff', boxShadow: '0 2px 12px rgba(8,145,178,0.06)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(8,145,178,0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(8,145,178,0.06)')}
                >
                  <div className="mb-4 text-xl" style={{ color: '#0891b2' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <blockquote className="text-base leading-relaxed mb-6" style={{ color: '#1e293b', fontStyle: 'italic' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#0891b2' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: '#64748b' }}>{t.business} &mdash; {t.location}</p>
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

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
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

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
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

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section id="book-now" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
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
                  <p style={{ color: '#475569' }}>Trail, BC</p>
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
                  Book an Appointment
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

      {/* ═══════════ 12. FOOTER ═══════════ */}
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
                {['Services', 'About', 'Gallery', 'Book Now'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#0891b2')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891b2' }}>Info</h4>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Mon&ndash;Fri 8:00 AM &ndash; 5:00 PM</p>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Trail, BC</p>
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
            Sample design by <strong style={{ color: '#1e293b' }}>Kootenay Made Digital</strong> &mdash; <span className="text-xs" style={{ color: '#94a3b8' }}>Get a let's talk for your practice</span>
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
