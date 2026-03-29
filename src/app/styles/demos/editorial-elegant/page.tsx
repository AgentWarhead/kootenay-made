'use client'

import { Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

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
      <h2 className={`heading-font text-3xl md:text-5xl mb-4`} style={{ color: '#1a1a1a', fontWeight: 400 }}>
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
      <div className="relative w-full" style={{ minHeight: '520px' }}>
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
              style={{ border: `2px solid ${EE.gold}40`, borderRadius: '16px', boxShadow: `0 8px 40px ${EE.gold}20, 0 2px 8px rgba(0,0,0,0.3)` }}
            >
              
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/images/demos/editorial-elegant-showcase.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.9) 100%)' }} />
            </div>
{/* Nav — dark bg, Pinnacle Real Estate in Zodiak italic, gold text */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${EE.gold}25`, backgroundColor: 'rgba(17,17,17,0.6)' }}>
                <motion.span style={{ color: EE.gold, fontFamily: "'Zodiak', serif", fontSize: '1.05rem', fontWeight: 400, fontStyle: 'italic', letterSpacing: '0.04em' }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  Pinnacle Real Estate
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Properties', 'Portfolio', 'About', 'Contact'].map((link) => (
                    <span key={link} style={{ color: `${EE.gold}99`, fontWeight: 500, fontFamily: "'Zodiak', serif", fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: EE.gold }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: EE.gold }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: EE.gold }} />
                </motion.div>
              </div>

              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-12 flex-1 flex flex-col justify-center" style={{ backgroundColor: EE.dark }}>
                {/* Elegant editorial flourishes — thin decorative lines */}
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="200" height="200" viewBox="0 0 160 160" fill="none">
                    <path d="M148 15 C128 15, 108 28, 96 48 C84 68, 88 90, 72 110 C56 130, 32 138, 18 152" stroke={EE.gold} strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    <path d="M158 38 C140 38, 122 52, 110 70 C98 88, 100 108, 86 124" stroke={EE.gold} strokeWidth="0.7" fill="none" strokeLinecap="round" />
                    <line x1="145" y1="8" x2="158" y2="8" stroke={EE.gold} strokeWidth="0.8" />
                    <line x1="145" y1="12" x2="155" y2="12" stroke={EE.gold} strokeWidth="0.5" />
                    <circle cx="122" cy="26" r="3.5" fill={EE.gold} opacity="0.5" />
                    <circle cx="78" cy="74" r="2.5" fill={EE.gold} opacity="0.35" />
                    <path d="M150 58 L158 50 L158 68 Z" fill={EE.gold} opacity="0.3" />
                  </svg>
                </motion.div>
                <motion.div className="absolute bottom-0 left-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.22 }} transition={{ duration: dur, delay: stagger * 4 }}>
                  <svg width="160" height="100" viewBox="0 0 120 80" fill="none">
                    <path d="M8 72 C28 62, 48 50, 68 40 C88 30, 104 34, 112 24" stroke={EE.gold} strokeWidth="0.9" fill="none" strokeLinecap="round" strokeDasharray="4 6" />
                    <circle cx="18" cy="66" r="2.5" fill={EE.gold} opacity="0.35" />
                    <line x1="6" y1="76" x2="20" y2="76" stroke={EE.gold} strokeWidth="0.7" />
                  </svg>
                </motion.div>

                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span style={{ backgroundColor: `${EE.gold}18`, color: EE.gold, border: `1px solid ${EE.gold}35`, fontFamily: "'Zodiak', serif", fontSize: '0.68rem', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.22em', padding: '0.38rem 1.25rem', borderRadius: '2px' }}>
                      Est. 1998 &mdash; West Kootenay
                    </span>
                  </motion.div>

                  <motion.h2 className="heading-font text-2xl sm:text-4xl md:text-5xl lg:text-5xl leading-[1.15] mb-4 sm:mb-6 sm:max-w-xl" style={{ color: EE.cream, fontWeight: 400 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    Your Home Has a Story.<br />Let&rsquo;s Make Sure Buyers{' '}
                    <span style={{ color: EE.gold, fontStyle: 'italic' }}>
                      Hear It.
                    </span>
                  </motion.h2>

                  <motion.p style={{ color: 'rgba(250,249,247,0.65)', lineHeight: 1.7, fontFamily: "'Zodiak', serif", fontSize: '0.92rem', fontStyle: 'italic', maxWidth: '28rem', marginBottom: '1.75rem' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Curated real estate in the Kootenays — your property deserves a presence as exceptional as its story.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }} className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 hover:bg-amber-800/10 active:scale-[0.97]" style={{ border: `1.5px solid ${EE.gold}`, color: EE.gold, fontFamily: "'Zodiak', serif", fontWeight: 600, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.15em', backgroundColor: 'transparent' }}>
                      Get Your Property Valuation &rarr;
                    </a>
                    <span style={{ color: 'rgba(250,249,247,0.35)', fontFamily: "'Zodiak', serif", fontSize: '0.82rem', fontStyle: 'italic' }}>No commitment required</span>
                  </motion.div>

                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['Top 1% Agent', '$50M+ Sold', '15 Years'].map((badge) => (
                      <span key={badge} style={{ color: EE.gold, opacity: 0.65, letterSpacing: '0.06em', fontFamily: "'Zodiak', serif", fontSize: '0.72rem' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Shimmer border — gold/dark gradient */}
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${EE.dark}, ${EE.gold}, #d4a017, ${EE.gold}, ${EE.dark})`, backgroundSize: '200% 100%', animation: 'shimmer-border 3s linear infinite' }} />
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

  const properties = [
    {
      label: 'Lakefront Retreat',
      location: 'Kaslo, BC',
      price: '$895,000',
      beds: 4,
      baths: 3,
      sqft: '2,840',
      status: 'Just Listed',
      statusColor: '#b8860b',
      img: '/images/demos/editorial-elegant-showcase.webp',
      large: true,
    },
    {
      label: 'Nelson Heritage Home',
      location: 'Nelson, BC',
      price: '$687,000',
      beds: 3,
      baths: 2,
      sqft: '1,950',
      status: 'Sold',
      statusColor: '#2a6b2a',
      img: '/images/demos/gallery/ee-1.webp',
      large: true,
    },
    {
      label: 'Mountain Chalet',
      location: 'Whitewater, BC',
      price: '$1,150,000',
      beds: 5,
      baths: 4,
      sqft: '3,400',
      status: 'Under Contract',
      statusColor: '#8b4513',
      img: '/images/demos/gallery/ee-2.webp',
      large: false,
    },
    {
      label: 'Downtown Nelson Condo',
      location: 'Nelson, BC',
      price: '$449,000',
      beds: 2,
      baths: 2,
      sqft: '1,100',
      status: 'Sold',
      statusColor: '#2a6b2a',
      img: '/images/demos/gallery/ee-3.webp',
      large: false,
    },
    {
      label: 'Luxury Lakefront Estate',
      location: 'Kootenay Lake, BC',
      price: '$2,100,000',
      beds: 6,
      baths: 5,
      sqft: '5,200',
      status: 'Active',
      statusColor: '#1a5276',
      img: '/images/demos/gallery/ee-4.webp',
      large: false,
    },
  ]

  return (
    <div className={body.className} style={{ fontFamily: 'Source Sans 3, sans-serif', backgroundColor: '#faf9f7', color: '#1a1a1a' }}>

      <style>{`
      @import url('https://api.fontshare.com/v2/css?f[]=zodiak@400,500,700&display=swap');
      .heading-font { font-family: 'Zodiak', serif; }
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
          <span className={`heading-font text-xl md:text-2xl`} style={{ color: '#1a1a1a', fontWeight: 400, fontStyle: 'italic', letterSpacing: '0.04em' }}>
            Pinnacle Real Estate
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Properties', 'About', 'Process', 'Contact'].map((link) => (
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
            className={`heading-font text-5xl md:text-7xl lg:text-8xl leading-tight mb-8`}
            style={{ color: '#faf9f7', fontWeight: 400, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your Home<br />Has a Story.
          </motion.h1>
          <motion.p
            className={`${body.className} text-lg md:text-xl mb-10 max-w-2xl mx-auto`}
            style={{ color: 'rgba(250,249,247,0.65)', lineHeight: 1.7 }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Amanda Chen &mdash; West Kootenay&rsquo;s most trusted luxury real estate agent
          </motion.p>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#properties"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
              style={{ backgroundColor: '#b8860b', color: '#faf9f7' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              View Properties
            </a>
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

      {/* ═══════════ 3. MARKET PULSE ═══════════ */}
      <section style={{ backgroundColor: '#1a1a1a', borderBottom: `2px solid ${EE.gold}` }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <span className={`${body.className} text-xs uppercase tracking-[0.25em] font-semibold`} style={{ color: '#b8860b', whiteSpace: 'nowrap' }}>
              Market Pulse &mdash; Q1 2025
            </span>
            <div className="flex flex-wrap gap-6 md:gap-10 text-sm">
              {[
                { label: 'Avg. Sale Price', value: '$687,000' },
                { label: 'Days on Market', value: '18' },
                { label: 'List-to-Sale Ratio', value: '98.7%' },
                { label: 'Active Listings', value: '42' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`heading-font text-lg md:text-xl`} style={{ color: '#b8860b', fontWeight: 600 }}>{stat.value}</div>
                  <div className={`${body.className} text-xs uppercase tracking-wider`} style={{ color: 'rgba(250,249,247,0.45)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <span className={`${body.className} text-xs`} style={{ color: 'rgba(250,249,247,0.3)' }}>West Kootenay Region</span>
          </div>
        </div>
      </section>

      {/* ═══════════ 4. FEATURED PROPERTIES — Magazine Grid ═══════════ */}
      <section id="properties" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="Exceptional properties in the Kootenay region">
              Featured Properties
            </EditorialTitle>
          </Reveal>

          {/* Magazine layout: 2 large top, 2 small bottom */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {properties.filter(p => p.large).map((prop, i) => (
              <Reveal key={prop.label} delay={i * 0.12}>
                <div
                  className="relative overflow-hidden group cursor-pointer"
                  style={{ border: '1px solid #e8e6e1' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 40px rgba(184,134,11,0.15)` }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div className="relative overflow-hidden" style={{ height: '280px' }}>
                    <Image
                      src={prop.img}
                      alt={prop.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(26,26,26,0.8) 100%)' }} />
                    {/* Status badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-widest"
                      style={{ backgroundColor: prop.statusColor, color: '#fff' }}
                    >
                      {prop.status}
                    </div>
                  </div>
                  <div className="p-6" style={{ backgroundColor: '#ffffff' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`heading-font text-xl mb-1`} style={{ color: '#1a1a1a', fontWeight: 600 }}>{prop.label}</h3>
                        <p className="text-sm" style={{ color: '#6b6b6b' }}>{prop.location}</p>
                      </div>
                      <div className={`heading-font text-xl font-semibold`} style={{ color: '#b8860b' }}>{prop.price}</div>
                    </div>
                    <div className="flex items-center gap-5 mt-4 pt-4" style={{ borderTop: '1px solid #e8e6e1' }}>
                      {[
                        { label: `${prop.beds} Beds`, icon: '🛏' },
                        { label: `${prop.baths} Baths`, icon: '🚿' },
                        { label: `${prop.sqft} sqft`, icon: '📐' },
                      ].map((detail) => (
                        <span key={detail.label} className="text-xs" style={{ color: '#6b6b6b' }}>
                          {detail.icon} {detail.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {properties.filter(p => !p.large).map((prop, i) => (
              <Reveal key={prop.label} delay={0.2 + i * 0.12}>
                <div
                  className="flex overflow-hidden group cursor-pointer"
                  style={{ border: '1px solid #e8e6e1', backgroundColor: '#ffffff' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 24px rgba(184,134,11,0.12)` }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div className="relative overflow-hidden flex-shrink-0" style={{ width: '160px', minHeight: '140px' }}>
                    <Image src={prop.img} alt={prop.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div
                      className="absolute top-3 left-3 px-2 py-0.5 text-xs font-bold uppercase tracking-wider"
                      style={{ backgroundColor: prop.statusColor, color: '#fff' }}
                    >
                      {prop.status}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col justify-between">
                    <div>
                      <h3 className={`heading-font text-base mb-1`} style={{ color: '#1a1a1a', fontWeight: 600 }}>{prop.label}</h3>
                      <p className="text-xs mb-2" style={{ color: '#6b6b6b' }}>{prop.location}</p>
                      <div className={`heading-font text-base font-semibold`} style={{ color: '#b8860b' }}>{prop.price}</div>
                    </div>
                    <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: '1px solid #e8e6e1' }}>
                      <span className="text-xs" style={{ color: '#6b6b6b' }}>🛏 {prop.beds}</span>
                      <span className="text-xs" style={{ color: '#6b6b6b' }}>🚿 {prop.baths}</span>
                      <span className="text-xs" style={{ color: '#6b6b6b' }}>📐 {prop.sqft}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="text-center mt-8 text-xs" style={{ color: '#aaa' }}>
              (Sample listings &mdash; your real properties go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 5. THE PINNACLE PROCESS ═══════════ */}
      <section id="process" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="A refined, strategic approach that consistently delivers results above asking price">
              The Pinnacle Process
            </EditorialTitle>
          </Reveal>

          {/* Horizontal step timeline */}
          <div className="relative">
            {/* Connector line — desktop only */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-px" style={{ backgroundColor: '#e8e6e1', zIndex: 0 }} />

            <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative z-10">
              {[
                {
                  num: '01',
                  title: 'Consultation',
                  desc: 'A private meeting to understand your goals, timeline, and the unique story behind your property. Strategy before everything.',
                },
                {
                  num: '02',
                  title: 'Staging & Photography',
                  desc: 'Professional staging, drone shots, and editorial-quality photography. Your home presented at its absolute finest.',
                },
                {
                  num: '03',
                  title: 'Strategic Marketing',
                  desc: 'Targeted digital campaigns, lifestyle storytelling, and outreach to qualified buyers in the Kootenays and beyond.',
                },
                {
                  num: '04',
                  title: 'Successful Close',
                  desc: 'Skilled negotiation, seamless paperwork, and a result that reflects the true value of what you have.',
                },
              ].map((step, i) => (
                <Reveal key={step.num} delay={i * 0.15}>
                  <div className="text-center md:text-left">
                    {/* Step circle */}
                    <div className="flex md:justify-start justify-center mb-6">
                      <div
                        className={`heading-font w-20 h-20 flex items-center justify-center text-xl font-semibold`}
                        style={{ border: '1px solid #b8860b', color: '#b8860b', backgroundColor: '#faf9f7' }}
                      >
                        {step.num}
                      </div>
                    </div>
                    <h3 className={`heading-font text-xl mb-3`} style={{ color: '#1a1a1a', fontWeight: 600 }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 6. AGENT PROFILE ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
            <Reveal>
              {/* Profile image placeholder */}
              <div className="relative mx-auto md:mx-0" style={{ maxWidth: '420px' }}>
                <div
                  className="w-full aspect-[4/5] overflow-hidden"
                  style={{ border: '1px solid #e8e6e1' }}
                >
                  <Image
                    src="/images/demos/editorial-elegant-showcase.webp"
                    alt="Amanda Chen — Pinnacle Real Estate"
                    width={420}
                    height={525}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Stat overlay card */}
                <div
                  className="absolute -bottom-6 -right-6 p-6 text-center hidden md:block"
                  style={{ backgroundColor: '#1a1a1a', minWidth: '160px' }}
                >
                  <div className={`heading-font text-2xl font-semibold mb-1`} style={{ color: '#b8860b' }}>$50M+</div>
                  <div className={`${body.className} text-xs uppercase tracking-widest`} style={{ color: 'rgba(250,249,247,0.6)' }}>Total Volume Sold</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <p className={`${body.className} text-xs uppercase tracking-[0.25em] font-semibold mb-4`} style={{ color: '#b8860b' }}>
                  Meet Your Agent
                </p>
                <h2 className={`heading-font text-3xl md:text-4xl mb-2`} style={{ color: '#1a1a1a', fontWeight: 400 }}>Amanda Chen</h2>
                <p className={`${body.className} text-sm mb-6`} style={{ color: '#6b6b6b' }}>REALTOR® &mdash; Luxury & Residential Specialist</p>

                <div className="w-8 h-px mb-8" style={{ backgroundColor: '#b8860b' }} />

                <p className="text-base leading-relaxed mb-6" style={{ color: '#6b6b6b' }}>
                  Born and raised in the Kootenays, Amanda has spent 15 years helping families and investors find their place in one of Canada&rsquo;s most sought-after regions. Her editorial approach to listing &mdash; treating each property as a story worth telling &mdash; consistently yields results well above asking price.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: '#6b6b6b' }}>
                  Specialising in lakefront retreats, heritage homes, and mountain estates in Nelson, Kaslo, and the surrounding area.
                </p>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: '200+', label: 'Properties Sold' },
                    { value: '15', label: 'Years Active' },
                    { value: '98.7%', label: 'List-to-Sale' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4" style={{ border: '1px solid #e8e6e1', backgroundColor: '#ffffff' }}>
                      <div className={`heading-font text-xl font-semibold mb-1`} style={{ color: '#b8860b' }}>{stat.value}</div>
                      <div className="text-xs uppercase tracking-wider" style={{ color: '#6b6b6b' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all"
                  style={{ backgroundColor: '#b8860b', color: '#ffffff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Book a Private Consultation
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 7. AS FEATURED IN ═══════════ */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e8e6e1', borderBottom: '1px solid #e8e6e1' }}>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-6">
              <div className="h-px flex-1 max-w-12" style={{ backgroundColor: '#e8e6e1' }} />
              <p className={`${body.className} text-xs uppercase tracking-[0.25em] font-semibold`} style={{ color: '#aaa' }}>As Featured In &amp; Associated With</p>
              <div className="h-px flex-1 max-w-12" style={{ backgroundColor: '#e8e6e1' }} />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
              {[
                { name: 'Kootenay Business', sub: 'Magazine' },
                { name: 'BC CPA', sub: 'Association' },
                { name: 'Nelson Star', sub: 'Featured' },
                { name: 'REMAX', sub: 'Top Producer' },
                { name: 'Chamber of Commerce', sub: 'Member' },
              ].map((item) => (
                <div key={item.name} className="text-center">
                  <div
                    className={`heading-font text-sm font-semibold`}
                    style={{ color: '#aaa', letterSpacing: '0.06em' }}
                  >
                    {item.name}
                  </div>
                  <div className={`${body.className} text-xs uppercase tracking-wider`} style={{ color: '#ccc' }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. TESTIMONIALS — Editorial Pull-Quotes ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="From buyers and sellers across the Kootenay region">
              Client Stories
            </EditorialTitle>
          </Reveal>
          <div className="space-y-8">
            {[
              {
                quote: "Amanda sold our Nelson lakefront in 6 days — $40,000 over asking. She knew exactly which buyers to call before the listing even went live. Genuinely remarkable.",
                name: 'David & Elaine T.',
                detail: 'Lakefront sale — Kaslo, BC · Sold $40K over ask',
                stars: 5,
              },
              {
                quote: "I had a complicated estate property that three other agents said would be difficult. Amanda had it under contract in 11 days. Her marketing strategy was unlike anything I'd seen.",
                name: 'Robert F.',
                detail: 'Heritage estate — Nelson, BC · 11 days to contract',
                stars: 5,
              },
              {
                quote: "We relocated from Vancouver and had never bought in the Kootenays before. Amanda found us a mountain property we didn't even know to look for. We've never been happier.",
                name: 'The Marchetti Family',
                detail: 'Buyer representation — Whitewater, BC',
                stars: 5,
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div
                  className="relative p-8 md:p-12"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #e8e6e1', borderLeft: `4px solid #b8860b` }}
                >
                  {/* Large quotemark */}
                  <div
                    className={`heading-font absolute top-4 left-8 text-7xl leading-none pointer-events-none select-none`}
                    style={{ color: '#b8860b', opacity: 0.15, fontWeight: 700 }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <blockquote
                      className={`heading-font text-xl md:text-2xl leading-relaxed italic flex-1`}
                      style={{ color: '#1a1a1a', fontWeight: 400, maxWidth: '720px' }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="flex gap-1 flex-shrink-0">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <span key={j} style={{ color: '#b8860b' }}>★</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-6 pt-5" style={{ borderTop: '1px solid #e8e6e1' }}>
                    <div className="w-8 h-8 flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#b8860b', color: '#fff' }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider" style={{ color: '#1a1a1a' }}>{t.name}</p>
                      <p className="text-xs" style={{ color: '#6b6b6b' }}>{t.detail}</p>
                    </div>
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

      {/* ═══════════ 9. THE TRANSFORMATION ═══════════ */}
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

      {/* ═══════════ 10. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
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
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#b8860b' }}>Office</h3>
                  <p style={{ color: '#6b6b6b' }}>123 Sample St, Nelson, BC</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#b8860b' }}>Hours</h3>
                  <p style={{ color: '#6b6b6b' }}>Mon&ndash;Sat 9:00 AM &ndash; 6:00 PM</p>
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
              <h3 className={`heading-font text-lg mb-3`} style={{ color: '#faf9f7', fontWeight: 400 }}>Pinnacle Real Estate</h3>
              <p className="text-sm text-white/40">Curated living in the Kootenays.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Properties', 'About', 'Process', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-white/40 hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Info</h4>
              <p className="text-sm text-white/40 mb-1">Mon&ndash;Sat 9:00 AM &ndash; 6:00 PM</p>
              <p className="text-sm text-white/40 mb-1">123 Sample St, Nelson, BC</p>
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
            Like What You See? Let&rsquo;s Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
