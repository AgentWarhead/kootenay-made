'use client'

import { useState, useRef } from 'react'
import { Lato } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
})

/* ── shared constants ─────────────────────────────────────────── */
const PARCHMENT = '#f5e6c8'
const DARK_BROWN = '#3d2b1f'
const AMBER = '#d4942a'
const FOREST_GREEN = '#2d4a2d'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

const WOODGRAIN = `repeating-linear-gradient(
  92deg,
  rgba(61,43,31,0.04) 0px,
  rgba(61,43,31,0.02) 2px,
  transparent 2px,
  transparent 8px,
  rgba(61,43,31,0.03) 8px,
  rgba(61,43,31,0.01) 10px,
  transparent 10px,
  transparent 20px
)`

/* ── reusable noise overlay ───────────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
      style={{
        backgroundImage: NOISE_SVG,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
        opacity: 0.06,
      }}
    />
  )
}

/* ── wavy underline SVG ───────────────────────────────────────── */
function WavyUnderline({ color = AMBER }: { color?: string }) {
  return (
    <svg
      className="mx-auto mt-2"
      width="180"
      height="12"
      viewBox="0 0 180 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 C 12 2, 22 2, 32 8 S 52 14, 62 8 S 82 2, 92 8 S 112 14, 122 8 S 142 2, 152 8 S 172 14, 178 8"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/* ── stamp animation wrapper ──────────────────────────────────── */
function StampIn({
  children,
  className,
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
      initial={prefersReduced ? { opacity: 1 } : { scale: 1.15, rotate: 2, opacity: 0 }}
      whileInView={prefersReduced ? { opacity: 1 } : { scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── fade-up animation wrapper ────────────────────────────────── */
function FadeUp({
  children,
  className,
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
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Live Redesign Component ──────────────────────────────────── */
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
        <motion.div className="h-[2px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? AMBER : `${DARK_BROWN}33` }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }}
            className={`${lato.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? AMBER : `${DARK_BROWN}88` }}>
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div className="h-[2px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? AMBER : `${DARK_BROWN}33` }} layout transition={{ duration: 0.4 }} />
      </div>

      {/* Fixed-height container */}
      <div className="relative w-full" style={{ height: '480px' }}>
        <AnimatePresence mode="wait">
          {!transformed ? (
            <motion.div key="before"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)', transition: { duration: 0.5 } }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: '#f2f0ed', border: '1px solid #d8d4cf', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              {/* WordPress nav */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#2d4a2d', borderBottom: '3px solid #1e3320' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-sm" style={{ backgroundColor: '#6a8f3a' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>Kootenay Brewing Co.</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Beers', 'Taproom', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>&#9776; Menu</span>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #6a8f3a 0%, #d4942a 50%, #f5e6c8 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: 'Arial, sans-serif', color: '#666' }}>★ Welcome to Our Website ★</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2" style={{ fontFamily: 'Georgia, serif', color: '#3d2b1f', fontWeight: 700, textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>
                    Kootenay Brewing Co.
                  </h2>
                  <p className="text-sm sm:text-lg mb-1" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>
                    &ldquo;Great Beer, Great Times!&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>
                    Craft Beer &bull; Taproom &bull; Growler Fills &bull; Events &bull; Merch
                  </p>
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {['✓ Locally Brewed', '✓ Dog Friendly', '✓ Live Music'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded-sm" style={{ backgroundColor: '#2d4a2d', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm font-bold mb-3" style={{ fontFamily: 'Arial, sans-serif', color: '#3d2b1f' }}>📞 Call Us: (250) 555-0195</p>
                  <span className="inline-block px-6 py-2.5 text-sm" style={{ backgroundColor: '#3d2b1f', color: '#f5e6c8', fontFamily: 'Arial, sans-serif', borderRadius: '2px', cursor: 'default' }}>
                    Visit the Taproom
                  </span>
                  <p className="mt-4 text-xs" style={{ color: '#bbb', fontFamily: 'Arial, sans-serif' }}>Powered by WordPress | Theme: Twenty Twenty-Three</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="after"
              initial={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: dur * 0.8, ease: 'easeOut' }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: '#2a1a0e', border: `2px solid ${AMBER}50`, borderRadius: '16px', boxShadow: `0 8px 40px ${AMBER}20, 0 2px 16px rgba(0,0,0,0.4)` }}>
              
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/images/demos/rustic-craft-showcase.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)' }} />
            </div>
{/* Nav — dark brown bg, Gambetta, amber text */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${AMBER}25` }}>
                <motion.span className={`heading-font text-base sm:text-lg font-bold`} style={{ color: AMBER, fontFamily: "'Gambetta', serif" }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  Kootenay Brewing Co.
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Our Beers', 'Taproom', 'About', 'Contact'].map((link) => (
                    <span key={link} className={`${lato.className} text-xs uppercase tracking-widest`} style={{ color: `${AMBER}99`, fontWeight: 700 }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: AMBER }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: AMBER }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: AMBER }} />
                </motion.div>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-12 flex-1 flex flex-col justify-center">
                {/* Wood-grain texture overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(91deg, rgba(212,148,42,0.03) 0px, transparent 2px, transparent 12px, rgba(212,148,42,0.02) 12px, transparent 14px, transparent 28px)', zIndex: 0 }} />
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.25 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  {/* Rustic hop/grain SVG motif */}
                  <svg width="200" height="200" viewBox="0 0 160 160" fill="none">
                    <circle cx="80" cy="40" r="22" stroke={AMBER} strokeWidth="1.2" fill="none" />
                    <circle cx="80" cy="40" r="14" stroke={AMBER} strokeWidth="0.7" fill="none" strokeDasharray="4 3" />
                    <path d="M80 18 C102 28 114 58 80 82 C46 58 58 28 80 18Z" stroke={AMBER} strokeWidth="1.5" strokeLinecap="round" fill={`${AMBER}15`} />
                    <path d="M38 104 C58 92 84 112 62 136" stroke={AMBER} strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <path d="M48 98 C68 86 94 106 72 130" stroke={AMBER} strokeWidth="1" strokeLinecap="round" fill="none" strokeDasharray="4 5" />
                    <circle cx="80" cy="40" r="4" fill={AMBER} opacity="0.5" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${lato.className} text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-sm`} style={{ backgroundColor: `${AMBER}18`, color: AMBER, border: `1px solid ${AMBER}40` }}>
                      Est. 2018 &mdash; West Kootenay
                    </span>
                  </motion.div>
                  <motion.h2 className={`heading-font text-2xl sm:text-4xl md:text-5xl leading-[1.15] mb-4 sm:max-w-xl font-bold`} style={{ color: PARCHMENT, fontFamily: "'Gambetta', serif" }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    Brewed 12 Minutes From Where{' '}
                    <span style={{ color: AMBER, fontStyle: 'italic' }}>
                      You&rsquo;re Sitting.
                    </span>
                  </motion.h2>
                  <motion.p className={`${lato.className} text-sm sm:text-base max-w-sm mx-auto sm:mx-0 mb-6`} style={{ color: `${PARCHMENT}99`, lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Small batch, big flavour — crafted with Kootenay mountain water.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#tap" className={`heading-font inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm rounded-sm transition-all hover:scale-[1.03] active:scale-[0.97]`}
                      style={{ backgroundColor: AMBER, color: '#2a1a0e', boxShadow: `0 4px 20px ${AMBER}40`, fontWeight: 700, fontFamily: "'Gambetta', serif" }}>
                      See What&rsquo;s on Tap →
                    </a>
                    <span className={`${lato.className} text-sm`} style={{ color: `${AMBER}55` }}>No commitment required</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['12 Beers on Tap', 'Dog Friendly', 'Open 7 Days'].map((badge) => (
                      <span key={badge} className={`${lato.className} text-xs`} style={{ color: `${AMBER}88`, letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
              {/* Shimmer border — amber/brown gradient */}
              <motion.div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${AMBER}, #c47a1a, ${AMBER}, transparent)`, backgroundSize: '200% 100%' }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button onClick={() => setTransformed(!transformed)}
          className={`${lato.className} text-sm font-bold px-6 py-3 rounded-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{ backgroundColor: transformed ? `${AMBER}18` : PARCHMENT, color: transformed ? DARK_BROWN : `${DARK_BROWN}88`, border: `2px solid ${transformed ? `${AMBER}40` : `${DARK_BROWN}22`}` }}>
          {transformed ? '← See the Before' : '✨ Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ── FAQ Accordion ───────────────────────────────────────────── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderBottom: `1px solid ${DARK_BROWN}22`,
        backgroundColor: PARCHMENT,
      }}
    >
      <button
        className="w-full text-left py-5 px-6 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-bold" style={{ color: DARK_BROWN }}>{question}</span>
        <span
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center font-bold text-base rounded-full flex-shrink-0"
          style={{
            backgroundColor: open ? AMBER : `${AMBER}22`,
            color: open ? DARK_BROWN : AMBER,
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
        <p className="pb-5 px-6 text-sm leading-relaxed" style={{ color: `${DARK_BROWN}bb` }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
/*  KOOTENAY BREWING COLLECTIVE — Rustic Craft Demo               */
/*  Order: Nav → Hero → Trust → What's on Tap → Brewer's Pick    */
/*         → Taproom Experience → Event Chalkboard → Our Story   */
/*         → Transformation → Beer-Label Testimonials → FAQ      */
/*         → Contact → Footer                                    */
/* ═══════════════════════════════════════════════════════════════ */
export default function RusticCraftDemo() {
  const faqItems = [
    {
      question: 'How long does a website take to build?',
      answer: 'Most craft brewery and artisan business websites are done in 2–3 weeks. We\'ll keep you in the loop at every step.',
    },
    {
      question: 'Can I list a rotating tap menu and seasonal beers?',
      answer: 'Absolutely. We build a menu you can update yourself — perfect for changing tap lists, seasonal releases, and special events.',
    },
    {
      question: 'Can you set up online merch or growler orders?',
      answer: 'Yes. We can integrate a Shopify store starting from $3,000 — sell merch, gift cards, and local delivery right from your site.',
    },
    {
      question: 'What if I already have a website?',
      answer: 'We\'ll review what you have and offer a redesign or a full rebuild. You won\'t be charged for what you don\'t need.',
    },
    {
      question: 'What does it cost?',
      answer: 'A custom website starts from $1,500, a full brand build from $4,000, and a Shopify store from $3,000. Book a free consultation and we\'ll give you a clear quote.',
    },
  ]

  return (
    <div className={lato.className}>
      <style>{`
      @import url('https://api.fontshare.com/v2/css?f[]=gambetta@400,500,700&display=swap');
      .heading-font { font-family: 'Gambetta', serif; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
        @keyframes shimmer-border {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .chalk-font {
          font-family: 'Bitter', Georgia, serif;
          letter-spacing: 0.02em;
        }
      `}</style>

      {/* ── 1. NAV ────────────────────────────────────────────── */}
      <nav
        className="relative px-6 py-4 sticky top-0 z-40"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-between">
          <span
            className={`heading-font text-xl md:text-2xl font-bold tracking-tight`}
            style={{ color: PARCHMENT }}
          >
            <span style={{ color: AMBER }}>Kootenay</span> Brewing Collective
          </span>

          <div className="hidden md:flex items-center gap-8">
            {['On Tap', 'Taproom', 'Events', 'Contact'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s/g, '-')}`}
                className="text-sm transition-colors"
                style={{ color: `${PARCHMENT}aa` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${PARCHMENT}aa`)}
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="tel:2505550195"
            className="hidden lg:block text-sm font-bold"
            style={{ color: PARCHMENT }}
          >
            (250) 555-0195
          </a>
        </div>
      </nav>

      {/* ── 2. HERO ───────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${AMBER}33, transparent)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center px-6 py-24 md:py-32 max-w-4xl mx-auto">
          <StampIn>
            <h1
              className={`heading-font text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6`}
              style={{ color: PARCHMENT, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              Small Batch.<br />Big Flavour.
            </h1>
          </StampIn>

          <FadeUp delay={0.3}>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: `${PARCHMENT}cc` }}
            >
              Handcrafted ales and lagers brewed with Kootenay mountain water
              and locally sourced ingredients.
            </p>
          </FadeUp>

          <FadeUp delay={0.5}>
            <a
              href="#on-tap"
              className="inline-block px-10 py-4 font-bold text-sm uppercase tracking-widest transition-all hover:brightness-110"
              style={{ backgroundColor: AMBER, color: DARK_BROWN, borderRadius: '2px' }}
            >
              See What&rsquo;s on Tap
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── 3. TRUST BAR ──────────────────────────────────────── */}
      <section
        className="relative py-5 px-6 overflow-hidden"
        style={{ backgroundColor: AMBER }}
      >
        <GrainOverlay />
        <div
          className="relative z-10 max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center font-bold text-sm md:text-base"
          style={{ color: DARK_BROWN }}
        >
          <span>★★★★★ 4.8 Rating</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>Est. 2018</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>12 Beers on Tap</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>Dog Friendly Patio</span>
        </div>
      </section>

      {/* ── 4. WHAT'S ON TAP — Chalkboard Style ──────────────── */}
      <section
        id="on-tap"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-5xl mx-auto">
          <StampIn className="text-center mb-12">
            <h2
              className={`heading-font text-3xl md:text-5xl font-bold mb-2`}
              style={{ color: PARCHMENT }}
            >
              What&rsquo;s on Tap
            </h2>
            <WavyUnderline color={PARCHMENT} />
          </StampIn>

          {/* Chalkboard panel */}
          <FadeUp>
            <div
              className="relative rounded-sm p-8 md:p-10"
              style={{
                backgroundColor: '#1e2d1e',
                border: `3px solid ${AMBER}55`,
                boxShadow: `inset 0 0 60px rgba(0,0,0,0.4)`,
              }}
            >
              <GrainOverlay />
              <div className="relative z-10">
                {/* Chalkboard header */}
                <div className="text-center mb-8">
                  <p className={`heading-font text-xs uppercase tracking-[0.3em]`} style={{ color: `${PARCHMENT}66` }}>
                    Today&rsquo;s Selection
                  </p>
                  <div className="w-24 h-px mx-auto mt-2" style={{ backgroundColor: `${PARCHMENT}33` }} />
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    { name: 'Kootenay Pale Ale', style: 'American Pale Ale', abv: '5.2%', ibu: '38', swatch: '#d4942a', note: 'Citrus hops, light malt body, crisp finish' },
                    { name: 'Cedar Stout', style: 'Dry Irish Stout', abv: '4.8%', ibu: '42', swatch: '#2d1a0e', note: 'Dark chocolate, roasted coffee, silky smooth' },
                    { name: 'Trail Wheat', style: 'Hefeweizen', abv: '4.5%', ibu: '14', swatch: '#e8c76a', note: 'Banana & clove, hazy golden, refreshing' },
                    { name: 'Arrow Lakes Red', style: 'Irish Red Ale', abv: '5.6%', ibu: '28', swatch: '#8b2500', note: 'Caramel malt, toffee notes, smooth bitterness' },
                    { name: 'Sloan IPA', style: 'West Coast IPA', abv: '6.4%', ibu: '65', swatch: '#c8a83a', note: 'Piney resin, tropical fruit, bold bitterness' },
                    { name: 'Seasonal Sour', style: 'Berliner Weisse', abv: '3.8%', ibu: '8', swatch: '#a0c87a', note: 'Tart raspberry, wheat base, refreshingly sour' },
                  ].map((beer) => (
                    <div key={beer.name} className="flex items-start gap-4" style={{ borderBottom: `1px solid ${PARCHMENT}15`, paddingBottom: '1rem' }}>
                      {/* Beer colour swatch */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full mt-1"
                        style={{ backgroundColor: beer.swatch, border: `2px solid ${PARCHMENT}30`, boxShadow: `0 0 8px ${beer.swatch}66` }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                          <span className={`heading-font font-bold text-base`} style={{ color: PARCHMENT }}>{beer.name}</span>
                          <div className="flex gap-3 text-xs" style={{ color: `${PARCHMENT}88` }}>
                            <span style={{ color: AMBER }}>{beer.abv}</span>
                            <span>{beer.ibu} IBU</span>
                          </div>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: `${PARCHMENT}66` }}>{beer.style}</p>
                        <p className="text-xs mt-1 italic" style={{ color: `${PARCHMENT}aa` }}>{beer.note}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-center text-xs mt-8 italic" style={{ color: `${PARCHMENT}44` }}>
                  Tap list rotates seasonally. Ask your server about nitro and cask options.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 5. BREWER'S PICK SPOTLIGHT ────────────────────────── */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: PARCHMENT }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-5xl mx-auto">
          <StampIn className="text-center mb-12">
            <h2
              className={`heading-font text-3xl md:text-4xl font-bold mb-2`}
              style={{ color: DARK_BROWN }}
            >
              Brewer&rsquo;s Pick This Week
            </h2>
            <WavyUnderline />
          </StampIn>

          <FadeUp>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative rounded-sm overflow-hidden" style={{ border: `3px solid ${AMBER}` }}>
                <Image
                  src="/images/demos/rustic-craft-showcase.webp"
                  alt="Kootenay Brewing Collective — Brewer's Pick"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: '#8b2500', border: `3px solid ${AMBER}` }} />
                  <div>
                    <h3 className={`heading-font text-2xl font-bold`} style={{ color: DARK_BROWN }}>Arrow Lakes Red</h3>
                    <p className="text-sm font-bold" style={{ color: AMBER }}>Irish Red Ale · 5.6% ABV</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: `${DARK_BROWN}cc` }}>
                  Our head brewer Tyler says this is the one he reaches for after a long brew day. Rich caramel malt, a touch of toffee sweetness, and a clean finish. It&rsquo;s the kind of beer that makes the Kootenay evenings feel exactly right.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Food Pairing', value: 'Smoked brisket, sharp cheddar' },
                    { label: 'Best Served', value: 'Cellar temp (12–14°C)' },
                    { label: 'Availability', value: 'Growler fills available' },
                    { label: 'Limited', value: 'While supply lasts' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: AMBER }}>{item.label}</p>
                      <p className="text-sm" style={{ color: DARK_BROWN }}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="inline-block px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${AMBER}22`, color: AMBER, border: `2px solid ${AMBER}55` }}>
                  Growler Fill Available ·
                  Taproom Only
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 6. TAPROOM EXPERIENCE ─────────────────────────────── */}
      <section
        id="taproom"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-5xl mx-auto">
          <StampIn className="text-center mb-12">
            <h2
              className={`heading-font text-3xl md:text-5xl font-bold mb-2`}
              style={{ color: PARCHMENT }}
            >
              What to Expect
            </h2>
            <WavyUnderline color={PARCHMENT} />
            <p className="mt-4 text-sm" style={{ color: `${PARCHMENT}88` }}>
              Everything you need to know before your first visit
            </p>
          </StampIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: '🍔',
                title: 'Food',
                detail: 'Weekly rotating food truck partner — check our events board for the schedule.',
              },
              {
                icon: '🎮',
                title: 'Games',
                detail: 'Shuffleboard, cribbage, Jenga, and a library of 30+ board games. Always free.',
              },
              {
                icon: '🍺',
                title: 'Tours',
                detail: 'Brewery tours every Saturday at 2 PM. See the tanks, hear the story, taste the difference.',
              },
              {
                icon: '🐕',
                title: 'Dogs',
                detail: 'Dog-friendly patio, always. Water bowls provided. Four-legged regulars welcome.',
              },
            ].map((item) => (
              <FadeUp key={item.title}>
                <div
                  className="relative p-6 rounded-sm text-center overflow-hidden"
                  style={{ backgroundColor: `${DARK_BROWN}cc`, border: `2px solid ${AMBER}33` }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{ backgroundImage: WOODGRAIN }}
                  />
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className={`heading-font font-bold text-lg mb-2`} style={{ color: AMBER }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: `${PARCHMENT}99` }}>{item.detail}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Gallery row */}
          <FadeUp delay={0.2} className="mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Kootenay Pale Ale', 'Cedar Stout', 'Trail Wheat', 'Seasonal Special'].map((beer, i) => (
                <div key={beer} className="relative aspect-[4/3] rounded-sm overflow-hidden" style={{ border: `2px solid ${AMBER}44` }}>
                  <Image src={`/images/demos/gallery/rc-${i + 1}.webp`} alt={beer} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-2" style={{ background: 'linear-gradient(to top, rgba(61,43,31,0.8), transparent)' }}>
                    <span className={`${lato.className} text-xs font-bold`} style={{ color: PARCHMENT }}>{beer}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 7. EVENT CHALKBOARD ───────────────────────────────── */}
      <section
        id="events"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: PARCHMENT }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-4xl mx-auto">
          <StampIn className="text-center mb-12">
            <h2
              className={`heading-font text-3xl md:text-4xl font-bold mb-2`}
              style={{ color: DARK_BROWN }}
            >
              Coming Up at the Taproom
            </h2>
            <WavyUnderline />
          </StampIn>

          <FadeUp>
            <div
              className="relative rounded-sm p-8 md:p-10"
              style={{ backgroundColor: '#1e2d1e', border: `3px solid ${AMBER}55` }}
            >
              <GrainOverlay />
              <div className="relative z-10 space-y-6">
                {[
                  { date: 'Thu Apr 3', time: '7 PM', title: 'Trivia Night', desc: 'Teams of 4–6. $5 entry. Winner takes the tab. Hosted by our own bartender Dave.' },
                  { date: 'Sat Apr 5', time: '8 PM', title: 'Live Music: The River Rats', desc: 'Local bluegrass and folk. No cover. Patio open weather permitting.' },
                  { date: 'Sat Apr 12', time: '2 PM', title: 'Spring Release Party', desc: 'First pour of our Wildflower Saison. Limited bottles. Free tasting flights for first 50.' },
                  { date: 'Fri Apr 18', time: '5 PM', title: 'Food Truck Friday: Kootenay BBQ', desc: 'Smoked brisket, pulled pork, and sides. Until sold out. Pairs perfectly with the Red.' },
                ].map((event) => (
                  <div key={event.title} className="grid md:grid-cols-[140px_1fr] gap-4 items-start" style={{ borderBottom: `1px solid ${PARCHMENT}15`, paddingBottom: '1.25rem' }}>
                    <div>
                      <p className={`heading-font font-bold text-sm`} style={{ color: AMBER }}>{event.date}</p>
                      <p className="text-xs" style={{ color: `${PARCHMENT}88` }}>{event.time}</p>
                    </div>
                    <div>
                      <p className={`heading-font font-bold text-base`} style={{ color: PARCHMENT }}>{event.title}</p>
                      <p className="text-xs mt-1 leading-relaxed italic" style={{ color: `${PARCHMENT}aa` }}>{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 8. OUR STORY ──────────────────────────────────────── */}
      <section
        id="about"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-5xl mx-auto">
          <StampIn className="text-center mb-12">
            <h2
              className={`heading-font text-3xl md:text-5xl font-bold mb-2`}
              style={{ color: PARCHMENT }}
            >
              Garage to Taproom
            </h2>
            <WavyUnderline color={PARCHMENT} />
          </StampIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'The Garage',
                year: '2016',
                desc: 'Tyler and two friends started brewing 10-litre batches in a Trail garage. They almost blew up the ceiling twice. The beer was good enough to try again.',
                img: '/images/demos/rustic-craft-showcase.webp',
              },
              {
                step: '02',
                title: 'First Batch',
                year: '2018',
                desc: 'The Kootenay Pale Ale hit 200 litres. Local bars started asking. A 1-tonne grain delivery showed up and there was nowhere to put it. The brewery was born.',
                img: '/images/demos/gallery/rc-1.webp',
              },
              {
                step: '03',
                title: 'The Taproom',
                year: '2020',
                desc: 'We opened 123 Sample St on a Tuesday in March. By Friday there was a lineup. Now we pour 12 beers, host 50 events a year, and sponsor the local trail crew.',
                img: '/images/demos/gallery/rc-2.webp',
              },
            ].map((beat) => (
              <FadeUp key={beat.step}>
                <div className="relative rounded-sm overflow-hidden" style={{ border: `2px solid ${AMBER}44` }}>
                  <div className="relative h-40 overflow-hidden">
                    <Image src={beat.img} alt={beat.title} fill className="object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(61,43,31,0.9))' }} />
                    <div className="absolute bottom-3 left-4 flex items-baseline gap-2">
                      <span className={`heading-font font-bold text-xl`} style={{ color: AMBER }}>{beat.title}</span>
                      <span className="text-xs" style={{ color: `${PARCHMENT}88` }}>{beat.year}</span>
                    </div>
                  </div>
                  <div
                    className="relative p-5"
                    style={{ backgroundColor: `${DARK_BROWN}cc` }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none opacity-30"
                      style={{ backgroundImage: WOODGRAIN }}
                    />
                    <p className="relative z-10 text-sm leading-relaxed" style={{ color: `${PARCHMENT}cc` }}>{beat.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. THE TRANSFORMATION ─────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: PARCHMENT }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-5xl mx-auto">
          <StampIn className="text-center mb-4">
            <h2
              className={`heading-font text-3xl md:text-5xl font-bold`}
              style={{ color: DARK_BROWN }}
            >
              Watch Your Website Transform
            </h2>
            <WavyUnderline />
          </StampIn>
          <FadeUp className="mb-12" delay={0.1}>
            <p className="text-center text-sm italic" style={{ color: `${DARK_BROWN}88` }}>
              From dated to designed — in real time
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <LiveRedesign />
          </FadeUp>
        </div>
      </section>

      {/* ── 10. BEER-LABEL TESTIMONIALS ───────────────────────── */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-5xl mx-auto">
          <StampIn className="text-center mb-16">
            <h2
              className={`heading-font text-3xl md:text-5xl font-bold`}
              style={{ color: PARCHMENT }}
            >
              Tasting Notes From Our Regulars
            </h2>
            <WavyUnderline color={PARCHMENT} />
          </StampIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                beerName: 'Taproom Visits Up 40%',
                style: 'Growth Rate · After New Website',
                tasting: '"People said they found us on Google and loved what they saw before they even walked in. That\'s the new website doing its job."',
                brewer: 'Shane M.',
                brewery: 'Fernie Ridge Brewing',
                swatch: '#d4942a',
              },
              {
                beerName: 'Orders in Week One',
                style: 'Immediate Results · Contact Form',
                tasting: '"We finally have a site that looks as good as our bread tastes. Orders started coming through the contact form the first week."',
                brewer: 'Lena K.',
                brewery: 'Summit Sourdough · Golden',
                swatch: '#c8a83a',
              },
              {
                beerName: 'Paid For Itself in 3 Months',
                style: 'ROI · Online Store Revenue',
                tasting: '"The online store paid for itself in three months. Locals love ordering our sauces and jams for gifts. Couldn\'t believe how easy it was."',
                brewer: 'Darcy & Paul H.',
                brewery: 'Nakusp Provisions',
                swatch: '#8b5e2a',
              },
            ].map((t) => (
              <FadeUp key={t.brewer}>
                {/* Beer-label styled card */}
                <div
                  className="relative rounded-sm overflow-hidden"
                  style={{
                    backgroundColor: PARCHMENT,
                    border: `3px solid ${DARK_BROWN}`,
                    boxShadow: `4px 4px 0px ${AMBER}55`,
                  }}
                >
                  {/* Label top band */}
                  <div className="relative py-4 px-6 text-center" style={{ backgroundColor: t.swatch }}>
                    <GrainOverlay />
                    <p className={`heading-font font-bold text-sm relative z-10`} style={{ color: DARK_BROWN }}>{t.beerName}</p>
                    <p className="text-xs relative z-10 mt-1" style={{ color: `${DARK_BROWN}88` }}>{t.style}</p>
                  </div>
                  {/* Label body */}
                  <div className="relative p-6">
                    <div className="w-full h-px mb-4" style={{ backgroundColor: `${DARK_BROWN}22` }} />
                    <p className="text-xs uppercase tracking-widest mb-3 text-center font-bold" style={{ color: `${DARK_BROWN}66` }}>
                      Tasting Notes
                    </p>
                    <blockquote className="text-sm leading-relaxed italic text-center" style={{ color: DARK_BROWN }}>
                      {t.tasting}
                    </blockquote>
                    <div className="w-full h-px my-4" style={{ backgroundColor: `${DARK_BROWN}22` }} />
                    <p className="text-xs font-bold text-center uppercase tracking-widest" style={{ color: AMBER }}>
                      {t.brewer}
                    </p>
                    <p className="text-xs text-center mt-1" style={{ color: `${DARK_BROWN}66` }}>{t.brewery}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <p className="text-center text-xs mt-8 italic" style={{ color: `${PARCHMENT}44` }}>
              (Sample reviews — your real reviews go here)
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 11. FAQ ────────────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: PARCHMENT }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-3xl mx-auto">
          <StampIn className="text-center mb-16">
            <h2
              className={`heading-font text-3xl md:text-5xl font-bold`}
              style={{ color: DARK_BROWN }}
            >
              Common Questions
            </h2>
            <WavyUnderline />
          </StampIn>

          <FadeUp delay={0.1}>
            <div
              className="rounded-sm overflow-hidden"
              style={{ border: `2px solid ${DARK_BROWN}22` }}
            >
              {faqItems.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 12. CONTACT ───────────────────────────────────────── */}
      <section
        id="contact"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-6xl mx-auto">
          <StampIn className="text-center mb-14">
            <h2
              className={`heading-font text-3xl md:text-5xl font-bold`}
              style={{ color: PARCHMENT }}
            >
              Visit the Taproom
            </h2>
            <WavyUnderline color={PARCHMENT} />
          </StampIn>

          <div className="grid md:grid-cols-2 gap-12">
            <FadeUp>
              <div className="space-y-6">
                <div>
                  <h3 className={`heading-font font-bold text-lg mb-2`} style={{ color: PARCHMENT }}>Phone</h3>
                  <p style={{ color: `${PARCHMENT}cc` }}>
                    <a href="tel:2505550195" className="hover:underline">(250) 555-0195</a>
                  </p>
                </div>
                <div>
                  <h3 className={`heading-font font-bold text-lg mb-2`} style={{ color: PARCHMENT }}>Address</h3>
                  <p style={{ color: `${PARCHMENT}cc` }}>123 Sample St, Trail, BC</p>
                </div>
                <div>
                  <h3 className={`heading-font font-bold text-lg mb-2`} style={{ color: PARCHMENT }}>Hours</h3>
                  <p style={{ color: `${PARCHMENT}cc` }}>Sun–Thu: 12–9 PM<br />Fri–Sat: 12–11 PM</p>
                </div>

                <div
                  className="rounded-sm h-48 flex items-center justify-center"
                  style={{ backgroundColor: `${DARK_BROWN}88`, border: `2px dashed ${PARCHMENT}33` }}
                >
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: `${PARCHMENT}44` }}>
                    Taproom Map
                  </span>
                </div>

                <a
                  href="#contact"
                  className="inline-block px-8 py-3.5 font-bold text-sm uppercase tracking-widest transition-all hover:brightness-110"
                  style={{ backgroundColor: AMBER, color: DARK_BROWN, borderRadius: '2px' }}
                >
                  Like What You See? Let&rsquo;s Talk
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <form
                className="rounded-sm p-8 space-y-5"
                style={{ backgroundColor: PARCHMENT, border: `2px solid ${DARK_BROWN}33`, boxShadow: `inset 0 2px 6px rgba(61,43,31,0.08)` }}
                onSubmit={(e) => e.preventDefault()}
              >
                <h3 className={`heading-font text-xl font-bold mb-2`} style={{ color: DARK_BROWN }}>
                  Send Us a Message
                </h3>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: DARK_BROWN }} htmlFor="rc-name">Name</label>
                  <input
                    id="rc-name"
                    type="text"
                    className="w-full px-4 py-2.5 rounded-sm text-sm outline-none transition-colors"
                    style={{ backgroundColor: '#fff', border: `1.5px solid ${DARK_BROWN}44`, color: DARK_BROWN }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = AMBER)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = `${DARK_BROWN}44`)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: DARK_BROWN }} htmlFor="rc-email">Email</label>
                  <input
                    id="rc-email"
                    type="email"
                    className="w-full px-4 py-2.5 rounded-sm text-sm outline-none transition-colors"
                    style={{ backgroundColor: '#fff', border: `1.5px solid ${DARK_BROWN}44`, color: DARK_BROWN }}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: DARK_BROWN }} htmlFor="rc-message">Message</label>
                  <textarea
                    id="rc-message"
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-sm text-sm outline-none resize-none transition-colors"
                    style={{ backgroundColor: '#fff', border: `1.5px solid ${DARK_BROWN}44`, color: DARK_BROWN }}
                    placeholder="Tell us what you're looking for..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 font-bold text-sm uppercase tracking-widest transition-all hover:brightness-110"
                  style={{ backgroundColor: AMBER, color: DARK_BROWN, borderRadius: '2px' }}
                >
                  Send Message
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 13. FOOTER ────────────────────────────────────────── */}
      <footer
        className="relative py-16 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <span className={`heading-font text-xl font-bold block mb-3`} style={{ color: PARCHMENT }}>
                Kootenay Brewing Collective
              </span>
              <p className="text-sm leading-relaxed" style={{ color: `${PARCHMENT}99` }}>
                Small batch. Big flavour.<br />Drink Local.
              </p>
            </div>
            <div>
              <h4 className={`heading-font font-bold text-sm uppercase tracking-widest mb-4`} style={{ color: AMBER }}>Links</h4>
              <ul className="space-y-2">
                {['On Tap', 'Taproom', 'Events', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
                      className="text-sm transition-colors"
                      style={{ color: `${PARCHMENT}88` }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = `${PARCHMENT}88`)}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={`heading-font font-bold text-sm uppercase tracking-widest mb-4`} style={{ color: AMBER }}>Visit Us</h4>
              <p className="text-sm leading-relaxed mb-3" style={{ color: `${PARCHMENT}99` }}>123 Sample St, Trail, BC</p>
              <p className="text-sm leading-relaxed" style={{ color: `${PARCHMENT}99` }}>Sun–Thu: 12–9 PM<br />Fri–Sat: 12–11 PM</p>
            </div>
          </div>
          <div className="border-t pt-8 text-center" style={{ borderColor: `${PARCHMENT}22` }}>
            <p className="text-xs" style={{ color: `${PARCHMENT}66` }}>
              &copy; 2025 Kootenay Brewing Collective. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── BOTTOM SPACER for sticky bar ──────────────────────── */}
      <div className="h-16" aria-hidden="true" />

      {/* ── 14. STICKY BOTTOM BAR ─────────────────────────────── */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 px-6 py-3"
        style={{
          backgroundColor: `${DARK_BROWN}ee`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderTop: `2px solid ${AMBER}55`,
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-xs md:text-sm" style={{ color: `${PARCHMENT}aa` }}>
              Sample design by{' '}
              <span className="font-bold" style={{ color: PARCHMENT }}>
                Kootenay Made Digital
              </span>
            </span>
            <a href="tel:2505550000" className="hidden sm:inline text-xs font-bold" style={{ color: AMBER }}>
              (250) 555-0000
            </a>
          </div>
          <Link
            href="/contact?style=rustic-craft"
            className="text-xs md:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap px-5 py-2.5 rounded-sm"
            style={{ backgroundColor: AMBER, color: DARK_BROWN }}
          >
            Like What You See? Let&rsquo;s Talk &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
