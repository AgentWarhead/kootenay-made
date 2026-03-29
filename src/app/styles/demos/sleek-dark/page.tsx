'use client'

import { useState, useRef, useEffect } from 'react'
import { DM_Sans } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence, useInView } from 'framer-motion'

const body = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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

/* ── Gold text reveal animation ── */
function GoldReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block' }}
      initial={prefersReduced ? {} : { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
      animate={prefersReduced ? {} : { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  )
}

/* ── Live Redesign Component ── */
function LiveRedesign() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [transformed, setTransformed] = useState(false)

  const dur = prefersReduced ? 0.01 : 0.9
  const stagger = prefersReduced ? 0 : 0.18

  return (
    <div ref={ref} className="w-full">
      {/* Bold label above the card */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <motion.div
          className="h-[1px] flex-1 max-w-[80px]"
          style={{ backgroundColor: transformed ? '#c9a96e' : 'rgba(201,169,110,0.3)' }}
          layout
          transition={{ duration: 0.4 }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className={`${body.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? '#c9a96e' : 'rgba(201,169,110,0.5)' }}
          >
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div
          className="h-[1px] flex-1 max-w-[80px]"
          style={{ backgroundColor: transformed ? '#c9a96e' : 'rgba(201,169,110,0.3)' }}
          layout
          transition={{ duration: 0.4 }}
        />
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
              style={{
                backgroundColor: '#f2f0ed',
                border: '1px solid #d8d4cf',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              {/* WordPress-style nav */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#1a1a1a', borderBottom: '3px solid #111' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-sm" style={{ backgroundColor: '#888' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>
                    The Copper Table
                  </span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Menu', 'Reservations', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>&#9776; Menu</span>
              </div>
              {/* Hero area */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #555 0%, #888 50%, #ccc 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: 'Arial, sans-serif', color: '#666' }}>★ Welcome to Our Website ★</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700, textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>
                    The Copper Table
                  </h2>
                  <p className="text-sm sm:text-lg mb-1" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>
                    &ldquo;Fine Dining in the Heart of Nelson!&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>
                    Dinner &bull; Cocktails &bull; Private Events &bull; Catering
                  </p>
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {['✓ Reservations', '✓ Private Dining', '✓ Local Ingredients'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#1a1a1a', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm font-bold mb-3" style={{ fontFamily: 'Arial, sans-serif', color: '#555' }}>📞 Call Us: (250) 555-0195</p>
                  <span className="inline-block px-6 py-2.5 text-sm" style={{ backgroundColor: '#555', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', cursor: 'default' }}>
                    Make a Reservation
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
              style={{
                backgroundColor: '#0a0a0a',
                border: '1px solid rgba(201,169,110,0.3)',
                borderRadius: '16px',
                boxShadow: '0 8px 40px rgba(201,169,110,0.12), 0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/images/demos/sleek-dark-hero.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.9) 100%)' }} />
            </div>
{/* Elegant nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: '1px solid rgba(201,169,110,0.12)' }}>
                <motion.span
                  className={`heading-font text-base sm:text-lg`}
                  style={{ color: '#c9a96e', fontWeight: 300, letterSpacing: '0.05em' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: dur * 0.6, delay: stagger }}
                >
                  The Copper Table
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Menu', 'Events', 'About', 'Reserve'].map((link) => (
                    <span key={link} className={`${body.className} text-xs uppercase tracking-widest`} style={{ color: 'rgba(201,169,110,0.6)', fontWeight: 500 }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: '#c9a96e' }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: '#c9a96e' }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: '#c9a96e' }} />
                </motion.div>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-12 flex-1 flex flex-col justify-center">
                {/* Decorative elegant lines */}
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="200" height="200" viewBox="0 0 160 160" fill="none">
                    <line x1="160" y1="0" x2="0" y2="160" stroke="#c9a96e" strokeWidth="0.5" />
                    <line x1="140" y1="0" x2="0" y2="140" stroke="#c9a96e" strokeWidth="0.5" />
                    <line x1="120" y1="0" x2="0" y2="120" stroke="#c9a96e" strokeWidth="0.5" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${body.className} text-xs font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full`} style={{ backgroundColor: 'rgba(201,169,110,0.12)', color: '#c9a96e', border: '1px solid rgba(201,169,110,0.2)' }}>
                      Est. 2019 &mdash; Nelson, BC
                    </span>
                  </motion.div>
                  <motion.h2
                    className={`heading-font text-2xl sm:text-4xl md:text-5xl leading-[1.15] mb-4 sm:max-w-xl`}
                    style={{ color: '#f5f0e8', fontWeight: 300 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Thursday&rsquo;s Special Sells Out by 7pm.{' '}
                    <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>
                      Just Saying.
                    </span>
                  </motion.h2>
                  <motion.p className={`${body.className} text-sm sm:text-base max-w-sm mx-auto sm:mx-0 mb-6`} style={{ color: 'rgba(245,240,232,0.5)', lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Intimate dining, local ingredients, and a table worth booking.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#reserve" className={`heading-font inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97]`}
                      style={{ backgroundColor: 'transparent', color: '#c9a96e', border: '1.5px solid #c9a96e', letterSpacing: '0.06em', fontWeight: 500 }}>
                      Reserve Your Table →
                    </a>
                    <span className={`${body.className} text-sm`} style={{ color: 'rgba(201,169,110,0.4)' }}>No commitment required</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['4.8★ Google', "Chef's Table", 'Local Sourced'].map((badge) => (
                      <span key={badge} className={`${body.className} text-xs`} style={{ color: 'rgba(201,169,110,0.5)', letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
              {/* Shimmer border */}
              <motion.div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #c9a96e, #f5f0e8, #c9a96e, transparent)', backgroundSize: '200% 100%' }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setTransformed(!transformed)}
          className={`${body.className} text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{
            backgroundColor: transformed ? 'rgba(201,169,110,0.1)' : 'transparent',
            color: transformed ? '#c9a96e' : 'rgba(245,240,232,0.4)',
            border: `1.5px solid ${transformed ? 'rgba(201,169,110,0.3)' : 'rgba(201,169,110,0.15)'}`,
          }}
        >
          {transformed ? '← See the Before' : '✨ Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ── FAQ Accordion ── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  return (
    <div style={{ borderBottom: '1px solid rgba(201,169,110,0.15)' }}>
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium" style={{ color: '#f5f0e8' }}>{question}</span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform"
          style={{
            color: '#c9a96e',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: prefersReduced ? 'none' : 'transform 0.3s ease',
          }}
        >
          ✕
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? '400px' : '0',
          overflow: 'hidden',
          transition: prefersReduced ? 'none' : 'max-height 0.4s ease',
        }}
      >
        <p className="pb-5 text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.6)' }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   THE COPPER TABLE — Sleek & Dark Demo
   Order: Nav → Hero → Trust Bar → Menu → Gallery → Reserve → Chef → Hours → Transformation → Testimonial → FAQ → Contact → Footer
   ══════════════════════════════════════════════════════════════ */
export default function SleekDarkDemo() {
  const prefersReduced = useReducedMotion()

  /* Parallax hero */
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const faqItems = [
    {
      question: 'Can you build an online reservation system?',
      answer: 'Yes. We integrate OpenTable, Resy, or a custom booking form so guests can reserve a table without calling. The widget matches your restaurant\'s aesthetic seamlessly.',
    },
    {
      question: 'Can I update my menu myself?',
      answer: 'Absolutely. We build on platforms you can manage — no developer required. Update menu items, prices, and specials any time from your phone or computer.',
    },
    {
      question: 'How long does a restaurant website take to build?',
      answer: 'Most restaurant and bar websites are ready in 2–3 weeks. We move fast without cutting corners — you\'ll have something you\'re proud to share.',
    },
    {
      question: 'Can you integrate with our point-of-sale or Google Business?',
      answer: 'Yes. We connect your website to Google Business, set up review prompts, and can sync menus with popular POS systems. Everything works together.',
    },
    {
      question: 'What does it cost?',
      answer: 'A custom restaurant website starts from $1,500. We\'ll give you a clear quote after a free consultation — no surprises.',
    },
  ]

  return (
    <div className={body.className} style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: '#0a0a0a', color: '#f5f0e8' }}>

      {/* ── prefers-reduced-motion ── */}
      <style>{`
      @import url('https://api.fontshare.com/v2/css?f[]=boska@400,500,700&display=swap');
      .heading-font { font-family: 'Boska', serif; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @keyframes candleGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes shimmer-border {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid rgba(201,169,110,0.15)' }} className="px-6 py-5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className={`heading-font text-2xl md:text-3xl tracking-wide`} style={{ color: '#c9a96e', fontWeight: 300, letterSpacing: '0.05em' }}>
            The Copper Table
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Menu', 'Reserve', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm tracking-widest uppercase transition-colors"
                style={{ color: 'rgba(245,240,232,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a96e')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,232,0.5)')}
              >
                {link}
              </a>
            ))}
            <a
              href="tel:2505550195"
              className="text-sm font-bold tracking-wider"
              style={{ color: '#c9a96e' }}
            >
              (250) 555-0195
            </a>
          </div>
          <a href="tel:2505550195" className="md:hidden text-sm font-bold" style={{ color: '#c9a96e' }}>
            (250) 555-0195
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO — Parallax ═══════════ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <motion.div
          className="absolute inset-0"
          style={{ y: prefersReduced ? 0 : heroY }}
        >
          <Image
            src="/images/demos/sleek-dark-hero.webp"
            alt="The Copper Table — intimate restaurant interior"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,0.85))' }} />

        <div className="relative max-w-4xl mx-auto text-center px-6 py-32 md:py-44 w-full">
          <motion.p
            className="text-sm uppercase tracking-[0.3em] mb-6"
            style={{ color: '#c9a96e' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Farm to table · Nelson, BC
          </motion.p>
          <h1 className={`heading-font text-5xl md:text-7xl lg:text-8xl leading-tight mb-8`} style={{ fontWeight: 300, color: '#f5f0e8', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            <GoldReveal>The Copper</GoldReveal>
            <br />
            <GoldReveal>Table</GoldReveal>
          </h1>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#reserve"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
              style={{
                backgroundColor: '#c9a96e',
                color: '#0a0a0a',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Reserve Your Table
            </a>
            <a
              href="#menu"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
              style={{
                border: '1px solid rgba(201,169,110,0.5)',
                color: '#c9a96e',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              View Menu
            </a>
          </motion.div>
          <motion.p
            className={`${body.className} mt-8 text-sm`}
            style={{ color: 'rgba(201,169,110,0.5)' }}
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={prefersReduced ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Wed–Sun · Dinner from 5 PM · Closed Mondays
          </motion.p>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid rgba(201,169,110,0.15)', borderBottom: '1px solid rgba(201,169,110,0.15)' }} className="py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm" style={{ color: '#c9a96e' }}>
          <span className="flex items-center gap-2">
            <span style={{ color: '#c9a96e' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="font-bold">4.9 Google Rating</span>
          </span>
          <span style={{ color: 'rgba(201,169,110,0.3)' }}>&#183;</span>
          <span>Est. 2019</span>
          <span style={{ color: 'rgba(201,169,110,0.3)' }} className="hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Ingredients &lt;100km</span>
          <span style={{ color: 'rgba(201,169,110,0.3)' }} className="hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Reservations Required</span>
        </div>
      </div>

      {/* ═══════════ 4. THE MENU ═══════════ */}
      <section id="menu" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-center text-xs uppercase tracking-[0.3em] mb-3" style={{ color: '#c9a96e' }}>
              Seasonal · Chef-driven
            </p>
            <h2 className={`heading-font text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              This Evening&rsquo;s Menu
            </h2>
            <div className="w-16 h-px mx-auto mb-16" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          {/* Starters */}
          <Reveal delay={0.05}>
            <div className="mb-14">
              <p className="text-xs uppercase tracking-[0.25em] mb-8 text-center" style={{ color: 'rgba(201,169,110,0.6)' }}>
                — Starters —
              </p>
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
                {[
                  { name: 'Charcuterie Board', desc: 'Local cured meats, house pickles, artisan bread', price: '$22' },
                  { name: 'Beet & Goat Cheese', desc: 'Roasted golden beets, Kootenay chèvre, candied walnuts, arugula', price: '$16' },
                  { name: 'French Onion Soup', desc: 'Slow-caramelized onions, veal stock, gruyère croûte', price: '$14' },
                  { name: 'Seared Scallops', desc: 'Pan-seared sea scallops, cauliflower purée, crispy capers', price: '$24' },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between gap-4" style={{ borderBottom: '1px solid rgba(201,169,110,0.08)', paddingBottom: '1rem' }}>
                    <div>
                      <p className={`heading-font text-base md:text-lg`} style={{ color: '#f5f0e8', fontWeight: 400 }}>{item.name}</p>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: 'rgba(245,240,232,0.45)' }}>{item.desc}</p>
                    </div>
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: '#c9a96e' }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Mains */}
          <Reveal delay={0.1}>
            <div className="mb-14">
              <p className="text-xs uppercase tracking-[0.25em] mb-8 text-center" style={{ color: 'rgba(201,169,110,0.6)' }}>
                — Mains —
              </p>
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
                {[
                  { name: 'Braised Short Rib', desc: 'Red wine–braised beef, celeriac purée, roasted root vegetables, gremolata', price: '$48' },
                  { name: 'Wild Salmon', desc: 'Fraser River sockeye, lemon beurre blanc, grilled asparagus, dill oil', price: '$42' },
                  { name: 'Mushroom Risotto', desc: 'Foraged chanterelles, Arborio rice, aged parmesan, truffle oil — vegetarian', price: '$34' },
                  { name: 'Duck Confit', desc: 'Slow-cooked duck leg, cherry gastrique, sweet potato purée, crispy kale', price: '$46' },
                  { name: 'Dry-Aged Striploin', desc: '10oz 45-day dry-aged BC beef, bone marrow butter, frites, peppercorn jus', price: '$62' },
                  { name: 'Pan-Roasted Chicken', desc: 'Free-range chicken supreme, herbed pan sauce, fingerling potatoes, seasonal greens', price: '$38' },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between gap-4" style={{ borderBottom: '1px solid rgba(201,169,110,0.08)', paddingBottom: '1rem' }}>
                    <div>
                      <p className={`heading-font text-base md:text-lg`} style={{ color: '#f5f0e8', fontWeight: 400 }}>{item.name}</p>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: 'rgba(245,240,232,0.45)' }}>{item.desc}</p>
                    </div>
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: '#c9a96e' }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Desserts */}
          <Reveal delay={0.15}>
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.25em] mb-8 text-center" style={{ color: 'rgba(201,169,110,0.6)' }}>
                — Desserts —
              </p>
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
                {[
                  { name: 'Crème Brûlée', desc: 'Classic vanilla bean custard, caramelized sugar crust, seasonal berries', price: '$14' },
                  { name: 'Chocolate Fondant', desc: 'Warm dark chocolate, salted caramel centre, vanilla bean ice cream', price: '$16' },
                  { name: 'Cheese Board', desc: 'Selection of three local and imported cheeses, honeycomb, fruit preserves', price: '$22' },
                  { name: 'Lemon Tart', desc: 'Silky lemon curd, pâte sablée, Italian meringue, candied zest', price: '$13' },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between gap-4" style={{ borderBottom: '1px solid rgba(201,169,110,0.08)', paddingBottom: '1rem' }}>
                    <div>
                      <p className={`heading-font text-base md:text-lg`} style={{ color: '#f5f0e8', fontWeight: 400 }}>{item.name}</p>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: 'rgba(245,240,232,0.45)' }}>{item.desc}</p>
                    </div>
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: '#c9a96e' }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-center text-xs italic" style={{ color: 'rgba(245,240,232,0.3)' }}>
              Menu changes seasonally. Please advise your server of any dietary requirements.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 5. FROM OUR KITCHEN — Masonry Gallery ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`heading-font text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              From Our Kitchen
            </h2>
            <div className="w-16 h-px mx-auto mb-12" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          {/* Masonry: 1 tall left + 2 stacked right top + 1 wide bottom */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
              {/* Tall vertical — spans 2 rows on md */}
              <div className="relative row-span-2 rounded-lg overflow-hidden" style={{ minHeight: '340px', border: '1px solid rgba(201,169,110,0.0)' }}
                onMouseEnter={(e) => { (e.currentTarget.querySelector('.gold-border') as HTMLElement)!.style.opacity = '1' }}
                onMouseLeave={(e) => { (e.currentTarget.querySelector('.gold-border') as HTMLElement)!.style.opacity = '0' }}
              >
                <Image src="/images/demos/sleek-dark-hero.webp" alt="Seasonal dish — The Copper Table" fill className="object-cover" />
                <div className="gold-border absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ border: '2px solid #c9a96e', opacity: 0, borderRadius: 'inherit' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.7), transparent)' }}>
                  <p className={`heading-font text-sm`} style={{ color: '#c9a96e' }}>Braised Short Rib</p>
                </div>
              </div>
              {/* Square 1 */}
              <div className="relative rounded-lg overflow-hidden aspect-square col-span-1"
                onMouseEnter={(e) => { (e.currentTarget.querySelector('.gold-border') as HTMLElement)!.style.opacity = '1' }}
                onMouseLeave={(e) => { (e.currentTarget.querySelector('.gold-border') as HTMLElement)!.style.opacity = '0' }}
              >
                <Image src="/images/demos/gallery/sd-1.webp" alt="Seasonal Menu" fill className="object-cover" />
                <div className="gold-border absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ border: '2px solid #c9a96e', opacity: 0, borderRadius: 'inherit' }} />
                <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.7), transparent)' }}>
                  <p className={`heading-font text-xs`} style={{ color: '#c9a96e' }}>Seasonal Menu</p>
                </div>
              </div>
              {/* Square 2 */}
              <div className="relative rounded-lg overflow-hidden aspect-square col-span-1"
                onMouseEnter={(e) => { (e.currentTarget.querySelector('.gold-border') as HTMLElement)!.style.opacity = '1' }}
                onMouseLeave={(e) => { (e.currentTarget.querySelector('.gold-border') as HTMLElement)!.style.opacity = '0' }}
              >
                <Image src="/images/demos/gallery/sd-2.webp" alt="Cocktail Bar" fill className="object-cover" />
                <div className="gold-border absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ border: '2px solid #c9a96e', opacity: 0, borderRadius: 'inherit' }} />
                <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.7), transparent)' }}>
                  <p className={`heading-font text-xs`} style={{ color: '#c9a96e' }}>Cocktail Bar</p>
                </div>
              </div>
            </div>
            {/* Wide horizontal */}
            <div className="relative rounded-lg overflow-hidden w-full" style={{ height: '200px' }}
              onMouseEnter={(e) => { (e.currentTarget.querySelector('.gold-border') as HTMLElement)!.style.opacity = '1' }}
              onMouseLeave={(e) => { (e.currentTarget.querySelector('.gold-border') as HTMLElement)!.style.opacity = '0' }}
            >
              <Image src="/images/demos/gallery/sd-3.webp" alt="Private Dining" fill className="object-cover" />
              <div className="gold-border absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ border: '2px solid #c9a96e', opacity: 0, borderRadius: 'inherit' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.7), transparent)' }}>
                <p className={`heading-font text-sm`} style={{ color: '#c9a96e' }}>Private Dining</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 6. RESERVE YOUR TABLE ═══════════ */}
      <section id="reserve" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className={`heading-font text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              Reserve Your Table
            </h2>
            <div className="w-16 h-px mx-auto mb-4" style={{ backgroundColor: '#c9a96e' }} />
            <p className="text-center text-sm mb-12" style={{ color: 'rgba(201,169,110,0.5)' }}>
              Reservations recommended. Walk-ins welcome based on availability.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-8 md:p-12" style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(201,169,110,0.15)' }}>
              {/* Booking widget placeholder */}
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8', colorScheme: 'dark' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Time</label>
                  <select
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
                  >
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Party Size</label>
                  <select
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <option key={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Phone</label>
                  <input
                    type="tel"
                    placeholder="(250) 555-0000"
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
                  />
                </div>
              </div>
              <button
                onClick={(e) => e.preventDefault()}
                className="w-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all"
                style={{ backgroundColor: '#c9a96e', color: '#0a0a0a' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Request Reservation
              </button>
              <p className="text-center text-xs mt-4" style={{ color: 'rgba(245,240,232,0.3)' }}>
                For parties of 8+, please call us directly at (250) 555-0195
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 7. CHEF'S TABLE ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <Reveal>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden" style={{ border: '1px solid rgba(201,169,110,0.2)' }}>
                <Image src="/images/demos/sleek-dark-hero.webp" alt="Chef Marco — The Copper Table" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)' }} />
                <div className="absolute bottom-6 left-6">
                  <p className={`heading-font text-xl`} style={{ color: '#c9a96e', fontWeight: 400 }}>Chef Marco</p>
                  <p className={`${body.className} text-xs uppercase tracking-widest mt-1`} style={{ color: 'rgba(245,240,232,0.5)' }}>Executive Chef & Co-Founder</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#c9a96e' }}>
                  The Philosophy
                </p>
                <h2 className={`heading-font text-3xl md:text-4xl mb-6`} style={{ color: '#f5f0e8', fontWeight: 300, lineHeight: 1.3 }}>
                  Our ingredients travel<br /><em style={{ color: '#c9a96e' }}>less than 100km.</em>
                </h2>
                <div className="w-12 h-px mb-6" style={{ backgroundColor: '#c9a96e' }} />
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(245,240,232,0.6)' }}>
                  Chef Marco trained in Vancouver and Lyon before returning to his home province to open The Copper Table in 2019. His philosophy is simple: extraordinary ingredients, treated with respect.
                </p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(245,240,232,0.6)' }}>
                  Every dish on our menu features produce from farms within 100km of Nelson — partnerships with growers in the Creston Valley, the Slocan, and the Arrow Lakes that we&rsquo;ve built over five years.
                </p>
                <div className="flex flex-wrap gap-6">
                  {['Trained in Lyon', '5 Years in Nelson', '12 Farm Partners'].map((fact) => (
                    <div key={fact}>
                      <p className="text-xs uppercase tracking-widest" style={{ color: '#c9a96e' }}>{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 8. HOURS & LOCATION ═══════════ */}
      <section className="py-16 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="grid md:grid-cols-3 gap-8 p-8 md:p-12" style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(201,169,110,0.2)' }}>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#c9a96e' }}>Hours</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.7)' }}>
                  Wednesday – Thursday<br />
                  5:00 PM – 9:30 PM<br /><br />
                  Friday – Saturday<br />
                  5:00 PM – 10:30 PM<br /><br />
                  Sunday<br />
                  5:00 PM – 9:00 PM<br /><br />
                  <span style={{ color: 'rgba(201,169,110,0.5)' }}>Closed Mondays &amp; Tuesdays</span>
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#c9a96e' }}>Location</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.7)' }}>
                  123 Sample St<br />
                  Nelson, BC V1L 0A0<br /><br />
                  Street parking on Baker St<br />
                  Public lot one block south
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#c9a96e' }}>Contact</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(245,240,232,0.7)' }}>
                  (250) 555-0195<br />
                  reservations@thecoppetable.ca
                </p>
                <a
                  href="tel:2505550195"
                  className="inline-block px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all"
                  style={{ border: '1px solid #c9a96e', color: '#c9a96e' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c9a96e'; e.currentTarget.style.color = '#0a0a0a' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#c9a96e' }}
                >
                  Call Us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 9. THE TRANSFORMATION ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`heading-font text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              Watch Your Website Transform
            </h2>
            <div className="w-16 h-px mx-auto mb-4" style={{ backgroundColor: '#c9a96e' }} />
            <p className="text-center text-sm mb-12" style={{ color: 'rgba(201,169,110,0.6)' }}>
              From dated to designed — in real time
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <LiveRedesign />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 10. TESTIMONIAL — Single Pull-Quote ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center px-6 md:px-16">
              <div className={`heading-font text-6xl md:text-8xl mb-6`} style={{ color: 'rgba(201,169,110,0.2)', lineHeight: 1 }}>
                &ldquo;
              </div>
              <blockquote className={`heading-font text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-8`} style={{ color: '#f5f0e8', fontWeight: 300, fontStyle: 'italic' }}>
                The best meal we&rsquo;ve had in the Kootenays. Period.
              </blockquote>
              <div className="w-12 h-px mx-auto mb-6" style={{ backgroundColor: '#c9a96e' }} />
              <p className={`${body.className} text-sm font-bold uppercase tracking-widest`} style={{ color: '#c9a96e' }}>
                — Sarah &amp; James T., Nelson
              </p>
              <p className="text-xs mt-2 italic" style={{ color: 'rgba(245,240,232,0.25)' }}>
                (Sample review — your real reviews go here)
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 11. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className={`heading-font text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              Common Questions
            </h2>
            <div className="w-16 h-px mx-auto mb-16" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ borderTop: '1px solid rgba(201,169,110,0.15)' }}>
              {faqItems.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 12. CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`heading-font text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              Get in Touch
            </h2>
            <div className="w-16 h-px mx-auto mb-16" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Phone</h3>
                  <p style={{ color: 'rgba(245,240,232,0.7)' }}>(250) 555-0195</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Email</h3>
                  <p style={{ color: 'rgba(245,240,232,0.7)' }}>reservations@thecoppetable.ca</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Hours</h3>
                  <p style={{ color: 'rgba(245,240,232,0.7)' }}>Wed–Sun 5:00 PM – Close</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Location</h3>
                  <p style={{ color: 'rgba(245,240,232,0.7)' }}>123 Sample St, Nelson, BC</p>
                </div>
                <a
                  href="tel:2505550195"
                  className="inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all mt-4"
                  style={{ border: '1px solid #c9a96e', color: '#c9a96e' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#c9a96e'
                    e.currentTarget.style.color = '#0a0a0a'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#c9a96e'
                  }}
                >
                  Call to Reserve
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Party size, date, special requests..."
                    className="w-full px-4 py-3 text-sm outline-none transition-all resize-none"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all"
                  style={{ backgroundColor: '#c9a96e', color: '#0a0a0a' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 13. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`heading-font text-xl mb-3`} style={{ color: '#c9a96e', fontWeight: 300 }}>
                The Copper Table
              </h3>
              <p className="text-sm" style={{ color: 'rgba(245,240,232,0.4)' }}>
                Farm-to-table dining in the heart of Nelson.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a96e' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Menu', 'Reserve', 'About', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(245,240,232,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a96e')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,232,0.4)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a96e' }}>Info</h4>
              <p className="text-sm mb-1" style={{ color: 'rgba(245,240,232,0.4)' }}>Wed–Sun 5:00 PM – Close</p>
              <p className="text-sm mb-1" style={{ color: 'rgba(245,240,232,0.4)' }}>123 Sample St, Nelson, BC</p>
              <p className="text-sm" style={{ color: 'rgba(245,240,232,0.4)' }}>(250) 555-0195</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(201,169,110,0.1)' }} className="pt-6 text-center">
            <span className="text-sm" style={{ color: 'rgba(245,240,232,0.25)' }}>
              &copy; 2025 The Copper Table. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(201,169,110,0.25)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(245,240,232,0.7)' }}>
              Sample design by <strong style={{ color: '#f5f0e8' }}>Kootenay Made Digital</strong>
            </span>
            <a href="tel:2505550000" className="text-sm font-bold hidden sm:inline" style={{ color: '#c9a96e' }}>
              (250) 555-0000
            </a>
          </div>
          <Link
            href="/contact?style=sleek-dark"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{ backgroundColor: '#c9a96e', color: '#0a0a0a' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Like What You See? Let&rsquo;s Talk &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  )
}
