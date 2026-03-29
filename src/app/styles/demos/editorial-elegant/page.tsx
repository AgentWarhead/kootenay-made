'use client'

import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

const heading = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const body = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
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
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Editorial section title with rule line ── */
function EditorialTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <h2 className={`${heading.className} text-3xl md:text-5xl mb-4`} style={{ color: '#1a1a1a', fontWeight: 400 }}>
        {children}
      </h2>
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px w-16" style={{ backgroundColor: '#b8860b' }} />
        <div className="w-2 h-2 rotate-45" style={{ backgroundColor: '#b8860b' }} />
        <div className="h-px w-16" style={{ backgroundColor: '#b8860b' }} />
      </div>
      {subtitle && <p className="max-w-xl mx-auto" style={{ color: '#6b6b6b' }}>{subtitle}</p>}
    </div>
  )
}

/* ── Live Redesign ── */
const EE = {
  gold: '#b8860b',
  dark: '#1a1a1a',
  cream: '#faf9f7',
  warm: '#6b6b6b',
  border: '#e8e6e1',
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
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? EE.gold : '#ccc' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className={`${body.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? EE.gold : '#888' }}
          >
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? EE.gold : '#ccc' }} layout transition={{ duration: 0.4 }} />
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
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#4a3728', borderBottom: '3px solid #2d2218' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#c9a96e' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: "'Times New Roman', serif", color: '#fff' }}>Pinnacle Real Estate</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Listings', 'About', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>&#9776; Menu</span>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.10]" style={{ background: 'linear-gradient(135deg, #4a3728 0%, #c9a96e 50%, #f0e8d8 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: 'Arial, sans-serif', color: '#666', letterSpacing: '0.15em' }}>&#9733; Welcome to Our Website &#9733;</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2" style={{ fontFamily: "'Times New Roman', serif", color: '#3a3a3a', fontWeight: 700 }}>
                    Pinnacle Real Estate
                  </h2>
                  <p className="text-sm sm:text-lg mb-1 sm:mb-2" style={{ fontFamily: "'Times New Roman', serif", color: '#666', fontStyle: 'italic' }}>
                    &ldquo;&#9733; TOP REALTOR &#9733; Your Dream Home Awaits!&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>
                    Buying &bull; Selling &bull; Luxury Homes &bull; Investment &bull; Relocation
                  </p>
                  <div className="flex justify-center gap-2 sm:gap-3 mb-4 flex-wrap">
                    {['✓ #1 in Sales', '✓ Free Home Evaluation', '✓ MLS Listed'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#4a3728', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg font-bold mb-3" style={{ fontFamily: 'Arial, sans-serif', color: '#4a3728' }}>&#128222; Call Us Today: (250) 555-0178</p>
                  <span className="inline-block px-6 py-2.5 text-sm" style={{ backgroundColor: '#4a3728', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', cursor: 'default' }}>
                    Click Here for Free Evaluation
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
              style={{ backgroundColor: EE.cream, border: `1px solid ${EE.gold}30`, borderRadius: '16px', boxShadow: `0 8px 40px ${EE.gold}15, 0 2px 8px rgba(0,0,0,0.04)` }}
            >
              {/* Elegant nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${EE.gold}20` }}>
                <motion.span className={`${heading.className} text-base sm:text-lg`} style={{ color: EE.dark, fontStyle: 'italic' }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  Pinnacle Real Estate
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Properties', 'Portfolio', 'About', 'Contact'].map((link) => (
                    <span key={link} className={`${body.className} text-xs uppercase tracking-widest`} style={{ color: EE.warm, fontWeight: 500 }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: EE.gold }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: EE.gold }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: EE.gold }} />
                </motion.div>
              </div>

              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-14 flex-1 flex flex-col justify-center">
                {/* Editorial flourish SVG motif */}
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="200" height="200" viewBox="0 0 160 160" fill="none">
                    <path d="M140 20 C120 20, 100 30, 90 50 C80 70, 85 90, 70 108 C55 126, 30 135, 20 150" stroke={EE.gold} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M155 40 C138 40, 122 52, 112 68 C102 84, 105 100, 92 115" stroke={EE.gold} strokeWidth="0.8" fill="none" strokeLinecap="round" />
                    <circle cx="125" cy="30" r="4" fill={EE.gold} opacity="0.4" />
                    <circle cx="80" cy="75" r="3" fill={EE.gold} opacity="0.3" />
                    <path d="M148 65 L158 55 L158 75 Z" fill={EE.gold} opacity="0.25" />
                  </svg>
                </motion.div>
                <motion.div className="absolute bottom-0 left-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: dur, delay: stagger * 4 }}>
                  <svg width="160" height="120" viewBox="0 0 120 90" fill="none">
                    <path d="M10 80 C30 70, 50 55, 70 45 C90 35, 105 40, 112 30" stroke={EE.gold} strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="4 6" />
                    <circle cx="20" cy="72" r="3" fill={EE.gold} opacity="0.3" />
                  </svg>
                </motion.div>

                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${body.className} text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full`} style={{ backgroundColor: `${EE.gold}15`, color: EE.gold, border: `1px solid ${EE.gold}30` }}>
                      Est. 1998 &mdash; West Kootenay
                    </span>
                  </motion.div>

                  <motion.h2 className={`${heading.className} text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-4 sm:mb-6 sm:max-w-xl`} style={{ color: EE.dark, fontWeight: 400 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    Your Home Has a Story.<br />Let&rsquo;s Make Sure Buyers{' '}
                    <span className="relative inline-block" style={{ color: EE.gold, fontStyle: 'italic' }}>
                      Hear It.
                      <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" fill="none">
                        <motion.path d="M2 8 C20 2, 50 2, 80 6 C88 8, 95 5, 98 6" stroke={EE.gold} strokeWidth="1.5" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur * 1.5, delay: stagger * 5, ease: 'easeOut' }} />
                      </motion.svg>
                    </span>
                  </motion.h2>

                  <motion.p className={`${body.className} text-sm sm:text-lg max-w-md sm:mx-0 mx-auto mb-6 sm:mb-8`} style={{ color: EE.warm, lineHeight: 1.7 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Curated real estate in the Kootenays — your property deserves a presence as exceptional as its story.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }} className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className={`${heading.className} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base transition-all duration-300 hover:opacity-90 active:scale-[0.97] font-semibold uppercase tracking-widest`} style={{ backgroundColor: EE.gold, color: EE.cream, boxShadow: `0 4px 20px ${EE.gold}35` }}>
                      Get Your Property Valuation
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <span className={`${body.className} text-sm`} style={{ color: '#aaa' }}>No commitment required</span>
                  </motion.div>

                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['Top 1% Agent', '$50M+ Sold', '15 Years'].map((badge) => (
                      <span key={badge} className={`${body.className} text-xs`} style={{ color: EE.gold, opacity: 0.7, letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Shimmer border */}
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${EE.dark}, ${EE.gold}, ${EE.dark})`, backgroundSize: '200% 100%', animation: 'shimmer-border 3s linear infinite' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setTransformed(!transformed)}
          className={`${body.className} text-sm font-medium px-6 py-3 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{ backgroundColor: transformed ? `${EE.gold}10` : EE.cream, color: transformed ? EE.dark : '#888', border: `1px solid ${transformed ? EE.gold : '#ddd'}`, boxShadow: transformed ? `0 2px 12px ${EE.gold}10` : '0 1px 4px rgba(0,0,0,0.06)' }}
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
        <div key={i} style={{ border: '1px solid #e8e6e1' }}>
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between text-sm transition-colors"
            style={{ color: '#1a1a1a', fontWeight: 600, backgroundColor: open === i ? '#faf9f7' : '#ffffff' }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <span style={{ color: '#b8860b', transition: 'transform 0.25s', transform: open === i ? 'rotate(180deg)' : 'none', display: 'inline-block', marginLeft: '1rem', flexShrink: 0 }}>▼</span>
          </button>
          {open === i && (
            <div className="px-6 py-4 text-sm leading-relaxed" style={{ color: '#6b6b6b', borderTop: '1px solid #e8e6e1', backgroundColor: '#faf9f7' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   PINNACLE REAL ESTATE — Editorial & Elegant Demo
   ══════════════════════════════════════════════════════════════ */
export default function EditorialElegantDemo() {
  const prefersReduced = useReducedMotion()

  const faqItems = [
    {
      q: 'How long does a website take?',
      a: 'Most real estate and boutique brand websites are designed and launched within 2–3 weeks. We work efficiently and keep you informed at every step.',
    },
    {
      q: 'What if I already have a website?',
      a: "We can redesign it completely or elevate what you have. Either way, you'll end up with something that looks as sophisticated as the properties you represent.",
    },
    {
      q: 'Do I need to provide all my listing photos?',
      a: "We'll work with what you have and guide you on what shoots to prioritise. We can also source premium stock imagery to fill any gaps while you build your portfolio.",
    },
    {
      q: 'What does it cost?',
      a: 'Websites start from $1,500. Full brand builds (logo, identity, website) start from $4,000. Google Domination SEO packages start from $500. Book a free consultation for a tailored quote.',
    },
    {
      q: 'Can I update my listings and portfolio myself?',
      a: 'Yes — we build on platforms that let you add listings, swap photos, and update content without any technical knowledge.',
    },
    {
      q: 'Do you understand luxury and boutique branding?',
      a: "It's our specialty. We know the difference between a generic business website and an editorial brand presence. Your site will feel curated, not templated.",
    },
  ]

  return (
    <div className={body.className} style={{ fontFamily: 'Source Sans 3, sans-serif', backgroundColor: '#faf9f7', color: '#1a1a1a' }}>

      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        @keyframes shimmer-border {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav className="px-6 py-5 sticky top-0 z-40" style={{ backgroundColor: '#faf9f7', borderBottom: '1px solid #e8e6e1' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className={`${heading.className} text-xl md:text-2xl`} style={{ color: '#1a1a1a', fontWeight: 400, fontStyle: 'italic', letterSpacing: '0.04em' }}>
            Pinnacle Real Estate
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Properties', 'About', 'Gallery', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm tracking-wider transition-all relative pb-1"
                style={{ color: '#6b6b6b' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#b8860b' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#6b6b6b' }}
              >
                {link}
              </a>
            ))}
            <a href="tel:2505550178" className="text-sm font-bold" style={{ color: '#b8860b' }}>
              (250) 555-0178
            </a>
          </div>
          <a href="tel:2505550178" className="md:hidden text-sm font-bold" style={{ color: '#b8860b' }}>
            (250) 555-0178
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)' }} />
        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: '#b8860b' }} />

        <div className="relative max-w-4xl mx-auto text-center px-6 py-32 md:py-44 w-full">
          <motion.p
            className="text-sm uppercase tracking-[0.3em] mb-6"
            style={{ color: '#b8860b' }}
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={prefersReduced ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Curated living in the Kootenays
          </motion.p>
          <motion.h1
            className={`${heading.className} text-5xl md:text-7xl lg:text-8xl leading-tight mb-8`}
            style={{ color: '#faf9f7', fontWeight: 400, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Pinnacle<br />Real Estate
          </motion.h1>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a
              href="#contact"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
              style={{ border: '1px solid #b8860b', color: '#b8860b' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#b8860b'; e.currentTarget.style.color = '#1a1a1a' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#b8860b' }}
            >
              Request a Showing
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div className="py-5 px-6" style={{ backgroundColor: '#faf9f7', borderBottom: '1px solid #e8e6e1' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm" style={{ color: '#1a1a1a' }}>
          <span className="flex items-center gap-2">
            <span style={{ color: '#b8860b' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="font-bold">4.9 Rating</span>
          </span>
          <span style={{ color: '#ccc' }}>&#183;</span>
          <span>200+ Properties Sold</span>
          <span style={{ color: '#ccc' }} className="hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Local Expert</span>
          <span style={{ color: '#ccc' }} className="hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Free Market Analysis</span>
        </div>
      </div>

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <section id="properties" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-6xl mx-auto">
          {/* PAS intro */}
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14 px-6 py-8" style={{ borderLeft: '3px solid #b8860b', backgroundColor: '#ffffff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#1a1a1a', fontStyle: 'italic' }}>
                <strong style={{ fontStyle: 'normal' }}>Your listings look amateur next to the realtor who invested in their brand.</strong> Not because their properties are better &mdash; because their online presence is. In a market where buyers decide in seconds, presentation is everything. Let&rsquo;s make yours unforgettable.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <EditorialTitle subtitle="Digital services tailored for real estate and lifestyle brands">
              What We Can Do For You
            </EditorialTitle>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Custom Website', desc: 'An elegant, magazine-quality website that presents your listings with the sophistication they deserve.', pricing: 'From $1,500' },
              { title: 'Full Brand Build', desc: 'Logo, colours, typography — the complete identity. Look as established and refined as your market position.', pricing: 'From $4,000' },
              { title: 'Email Marketing', desc: 'Stay in touch with buyers and sellers automatically. Market updates, new listings, curated content — done.', pricing: 'From $750' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div
                  className="p-8 text-center transition-all duration-300 cursor-default"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #e8e6e1', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(184,134,11,0.12)'; e.currentTarget.style.borderColor = '#b8860b' }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e8e6e1' }}
                >
                  <div className="w-8 h-px mx-auto mb-6" style={{ backgroundColor: '#b8860b' }} />
                  <h3 className={`${heading.className} text-xl mb-4`} style={{ color: '#1a1a1a', fontWeight: 600 }}>{card.title}</h3>
                  <p className="leading-relaxed text-sm mb-5" style={{ color: '#6b6b6b' }}>{card.desc}</p>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#b8860b' }}>{card.pricing}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="A refined, effortless process from first conversation to launch">
              How It Works
            </EditorialTitle>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: 'I', title: 'We Meet', desc: 'Tell us your vision, your clients, the properties you represent. A free, unhurried conversation about what your brand deserves.' },
              { num: 'II', title: 'We Create', desc: 'We design and build your bespoke website in approximately two weeks. Every detail considered. You approve, we refine.' },
              { num: 'III', title: 'You Flourish', desc: 'Launch with confidence. Get found by the right clients. Watch your brand become the one everyone in the region recognises.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.2}>
                <div className="text-center">
                  <div className={`${heading.className} text-4xl mb-6`} style={{ color: '#b8860b', fontWeight: 400 }}>{step.num}</div>
                  <div className="w-8 h-px mx-auto mb-6" style={{ backgroundColor: '#b8860b' }} />
                  <h3 className={`${heading.className} text-xl mb-4`} style={{ color: '#1a1a1a', fontWeight: 600 }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY — Asymmetric Magazine Grid ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="Exceptional properties in the Kootenay region">
              Featured Properties
            </EditorialTitle>
          </Reveal>

          <div className="grid md:grid-cols-5 gap-4 md:gap-6">
            <Reveal className="md:col-span-3">
              <div className="overflow-hidden h-full" style={{ border: '1px solid #e8e6e1', minHeight: '320px' }}>
                <div style={{ animation: prefersReduced ? 'none' : 'kenBurns 8s ease-in-out infinite alternate', overflow: 'hidden', height: '100%' }}>
                  <Image
                    src="/images/demos/editorial-elegant-showcase.webp"
                    alt="Pinnacle Real Estate — featured lakefront property"
                    width={700}
                    height={500}
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>
            </Reveal>
            <div className="md:col-span-2 flex flex-col gap-4 md:gap-6">
              {['Lakefront Retreat', 'Mountain Chalet', 'Downtown Nelson'].map((label, i) => (
                <Reveal key={label} delay={0.1 + i * 0.1}>
                  <div className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                    <Image src={`/images/demos/gallery/ee-${i + 1}.webp`} alt={label} fill className='object-cover' />
                    <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                      <span className='text-white text-sm font-medium'>{label}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 7. THE TRANSFORMATION ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="From dated to designed — in real time">
              Watch Your Website Transform
            </EditorialTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveRedesign />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="From realtors, salons, and boutiques across the Kootenays">
              Words From Our Clients
            </EditorialTitle>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "My listings started getting more serious inquiries within a month of launching. The website carries the weight of the properties — it looks exactly as curated as my brand should.",
                name: 'Catherine R.',
                business: 'Pinnacle Real Estate',
                location: 'Nelson, BC',
              },
              {
                quote: "Clients walk in already in love with our salon. They found us online, saw how beautiful the site was, and booked before they even called. Our bookings doubled.",
                name: 'Monique L.',
                business: 'Atelier Hair & Beauty',
                location: 'Fernie, BC',
              },
              {
                quote: "As a boutique owner I was skeptical about the ROI. Then our website started getting found on Google and we had people driving from Creston just because of what they saw online.",
                name: 'Isabelle V.',
                business: 'Maison Boutique',
                location: 'Invermere, BC',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div className="p-8" style={{ backgroundColor: '#ffffff', border: '1px solid #e8e6e1' }}>
                  <div className="mb-6 text-lg" style={{ color: '#b8860b' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px flex-1" style={{ backgroundColor: '#b8860b', opacity: 0.4 }} />
                    <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#b8860b', flexShrink: 0 }} />
                    <div className="h-px flex-1" style={{ backgroundColor: '#b8860b', opacity: 0.4 }} />
                  </div>
                  <blockquote className={`${heading.className} text-lg leading-relaxed mb-6 italic`} style={{ color: '#1a1a1a', fontWeight: 400 }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wider" style={{ color: '#1a1a1a' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: '#6b6b6b' }}>{t.business} &mdash; {t.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-center mt-8 text-xs" style={{ color: '#aaa' }}>
            (Sample reviews &mdash; your real reviews go here)
          </p>
        </div>
      </section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="Everything you need to know before we begin">
              Frequently Asked Questions
            </EditorialTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={faqItems} />
          </Reveal>
          <div className="text-center mt-12">
            <a
              href="#contact"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
              style={{ backgroundColor: '#b8860b', color: '#ffffff' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Start a Conversation →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <EditorialTitle>About Pinnacle</EditorialTitle>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: '#6b6b6b' }}>
              Pinnacle Real Estate is a boutique agency rooted in the Kootenay region. With over 200 properties sold, we bring deep local knowledge and a curated approach to every transaction. Whether you are searching for a lakefront retreat, a mountain chalet, or the perfect downtown home, our team guides you through every step with expertise and care. We believe that finding a home is not just a transaction &mdash; it is the beginning of a new chapter. At Pinnacle, we make that chapter extraordinary.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="We would love to hear from you">
              Get In Touch
            </EditorialTitle>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#b8860b' }}>Phone</h3>
                  <p style={{ color: '#6b6b6b' }}>(250) 555-0178</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#b8860b' }}>Email</h3>
                  <p style={{ color: '#6b6b6b' }}>hello@pinnaclerealestate.ca</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#b8860b' }}>Hours</h3>
                  <p style={{ color: '#6b6b6b' }}>Mon&ndash;Sat 9:00 AM &ndash; 6:00 PM</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#b8860b' }}>Location</h3>
                  <p style={{ color: '#6b6b6b' }}>Nelson, BC</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-sm outline-none transition-all" style={{ border: '1px solid #e8e6e1', backgroundColor: '#ffffff', color: '#1a1a1a' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#b8860b')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e8e6e1')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Email</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 text-sm outline-none transition-all" style={{ border: '1px solid #e8e6e1', backgroundColor: '#ffffff', color: '#1a1a1a' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#b8860b')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e8e6e1')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Message</label>
                  <textarea rows={4} placeholder="What are you looking for?" className="w-full px-4 py-3 text-sm outline-none transition-all resize-none" style={{ border: '1px solid #e8e6e1', backgroundColor: '#ffffff', color: '#1a1a1a' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#b8860b')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e8e6e1')} />
                </div>
                <button type="submit" className="w-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all" style={{ backgroundColor: '#b8860b', color: '#ffffff' }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                  Request a Showing
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 12. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${heading.className} text-lg mb-3`} style={{ color: '#faf9f7', fontWeight: 400 }}>Pinnacle Real Estate</h3>
              <p className="text-sm text-white/40">Curated living in the Kootenays.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Properties', 'About', 'Gallery', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-white/40 hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Info</h4>
              <p className="text-sm text-white/40 mb-1">Mon&ndash;Sat 9:00 AM &ndash; 6:00 PM</p>
              <p className="text-sm text-white/40 mb-1">Nelson, BC</p>
              <p className="text-sm text-white/40">(250) 555-0178</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-sm text-white/25">&copy; 2025 Pinnacle Real Estate. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(250,249,247,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '2px solid #b8860b',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: '#6b6b6b' }}>
            Sample design by <strong style={{ color: '#1a1a1a' }}>Kootenay Made Digital</strong> &mdash; <span className="text-xs" style={{ color: '#aaa' }}>Elevate your brand today</span>
          </span>
          <Link
            href="/contact?style=editorial-elegant"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{ backgroundColor: '#b8860b', color: '#ffffff', boxShadow: '0 2px 12px rgba(184,134,11,0.25)' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Like What You See? Let's Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
