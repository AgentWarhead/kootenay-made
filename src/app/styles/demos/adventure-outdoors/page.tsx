'use client'

import { Barlow_Condensed, Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const heading = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

const body = Inter({
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
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Trail marker number ── */
function TrailMarker({ number }: { number: number }) {
  return (
    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold"
      style={{ backgroundColor: '#f97316', color: '#ffffff' }}>
      {number}
    </div>
  )
}

/* ── Mountain SVG silhouettes ── */
function MountainLayer({ opacity, color, d }: { opacity: number; color: string; d: string }) {
  return (
    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ opacity }}>
      <path fill={color} d={d} />
    </svg>
  )
}

/* ── Compass SVG ── */
function Compass() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="#f97316" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="50" cy="50" r="38" stroke="#f97316" strokeWidth="0.5" strokeOpacity="0.2" />
      <polygon points="50,12 46,30 54,30" fill="#f97316" fillOpacity="0.8" />
      <polygon points="50,88 46,70 54,70" fill="#ffffff" fillOpacity="0.3" />
      <polygon points="88,50 70,46 70,54" fill="#ffffff" fillOpacity="0.3" />
      <polygon points="12,50 30,46 30,54" fill="#ffffff" fillOpacity="0.3" />
      <circle cx="50" cy="50" r="3" fill="#f97316" />
    </svg>
  )
}

/* ── Live Redesign ── */
function LiveRedesign() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [transformed, setTransformed] = useState(false)

  const dur = prefersReduced ? 0.01 : 0.9
  const stagger = prefersReduced ? 0 : 0.18

  const orange = '#f97316'
  const forestGreen = '#1b2d1b'
  const midGreen = 'rgba(27,45,27,0.95)'

  return (
    <div ref={ref} className="w-full">
      {/* Bold label */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? orange : '#444' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }}
            className={`${body.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? orange : '#666' }}>
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? orange : '#444' }} layout transition={{ duration: 0.4 }} />
      </div>

      {/* Fixed-height container */}
      <div className="relative w-full" style={{ height: '480px' }}>
        <AnimatePresence mode="wait">
          {!transformed ? (
            <motion.div key="before"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)', transition: { duration: 0.5 } }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: '#f2f0ed', border: '1px solid #d8d4cf', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              {/* Fake WordPress nav */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#2a5a2a', borderBottom: '3px solid #1a4a1a' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#6aaa6a' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>Powder Highway Adventures</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Adventures', 'About', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>☰ Menu</span>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #2a5a2a 0%, #6aaa6a 50%, #f0e68c 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: 'Arial, sans-serif', color: '#666' }}>★ Welcome to Our Website ★</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700 }}>Powder Highway Adventures</h2>
                  <p className="text-sm sm:text-lg mb-1" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>&ldquo;Your Premier Adventure Destination!&rdquo;</p>
                  <p className="text-xs sm:text-sm mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>Hiking &bull; Rafting &bull; Skiing &bull; Camping &bull; Mountain Biking &bull; And More!</p>
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {['✓ Certified Guides', '✓ All Skill Levels', '✓ Group Rates'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#2a5a2a', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg font-bold mb-3" style={{ fontFamily: 'Arial, sans-serif', color: '#2a5a2a' }}>📞 Call Us Today: (250) 555-0143</p>
                  <span className="inline-block px-6 py-2.5 text-sm cursor-default" style={{ backgroundColor: '#6aaa6a', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', border: '1px solid #2a5a2a' }}>
                    Book Your Adventure
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
              style={{ backgroundColor: forestGreen, border: `1px solid ${orange}30`, borderRadius: '16px', boxShadow: `0 8px 40px ${orange}15, 0 2px 8px rgba(0,0,0,0.3)` }}
            >
              {/* Elegant nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${orange}20` }}>
                <motion.span className={`${heading.className} text-base sm:text-xl font-bold uppercase`} style={{ color: orange }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  POWDER HIGHWAY
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Adventures', 'About', 'Gallery', 'Book'].map((link) => (
                    <span key={link} className={`${body.className} text-xs uppercase tracking-widest`} style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: orange }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: orange }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: orange }} />
                </motion.div>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-14 flex-1 flex flex-col justify-center">
                {/* Mountain peak SVG motif */}
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
                    <path d="M20 180 L80 60 L120 110 L150 40 L190 180 Z" stroke={orange} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                    <path d="M80 60 L95 80 M150 40 L165 70" stroke={orange} strokeWidth="0.8" fill="none" />
                    <path d="M40 150 L80 60" stroke={orange} strokeWidth="0.5" fill="none" strokeDasharray="3 4" />
                    <circle cx="80" cy="60" r="3" fill={orange} opacity="0.5" />
                    <circle cx="150" cy="40" r="3" fill={orange} opacity="0.5" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${body.className} text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full`}
                      style={{ backgroundColor: `${orange}18`, color: orange, border: `1px solid ${orange}30` }}>
                      Est. 2005 &mdash; Kootenays, BC
                    </span>
                  </motion.div>
                  <motion.h2 className={`${heading.className} text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.0] mb-4 sm:mb-6 font-bold uppercase`}
                    style={{ color: '#fff' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    THE KOOTENAYS DON&rsquo;T WAIT.{' '}
                    <span className="relative inline-block" style={{ color: orange }}>
                      NEITHER SHOULD YOU.
                      <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                        <motion.path d="M4 8 L30 4 L60 8 L90 3 L120 7 L150 3 L180 7 L196 5" stroke={orange} strokeWidth="2" strokeLinecap="round" fill="none"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur * 1.5, delay: stagger * 5, ease: 'easeOut' }} />
                      </motion.svg>
                    </span>
                  </motion.h2>
                  <motion.p className={`${body.className} text-sm sm:text-lg max-w-md sm:mx-0 mx-auto mb-6`} style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Certified guides. Epic terrain. The Kootenays done right.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#book" className={`${heading.className} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] font-bold uppercase tracking-wider`}
                      style={{ backgroundColor: orange, color: '#fff', boxShadow: `0 4px 20px ${orange}40` }}>
                      Book Your Next Adventure
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <span className={`${body.className} text-sm`} style={{ color: 'rgba(255,255,255,0.35)' }}>No commitment required</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['Certified Guides', '1000+ Trips', '5★ TripAdvisor'].map((badge) => (
                      <span key={badge} className={`${body.className} text-xs`} style={{ color: orange, opacity: 0.7, letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
              {/* Shimmer border */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-[16px]" style={{ background: `linear-gradient(90deg, transparent, ${orange}, #ffaa44, ${orange}, transparent)`, animation: 'shimmer-border 3s linear infinite', backgroundSize: '200% 100%' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button onClick={() => setTransformed(!transformed)}
          className={`${body.className} text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{
            backgroundColor: transformed ? `${orange}15` : 'rgba(255,255,255,0.05)',
            color: transformed ? orange : 'rgba(255,255,255,0.5)',
            border: `1.5px solid ${transformed ? `${orange}40` : 'rgba(249,115,22,0.15)'}`,
            boxShadow: transformed ? `0 2px 12px ${orange}15` : 'none',
          }}>
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
        <div key={i} style={{ border: '1px solid rgba(249,115,22,0.15)', backgroundColor: 'rgba(255,255,255,0.04)' }}>
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            style={{ color: open === i ? '#f97316' : 'rgba(255,255,255,0.85)' }}
          >
            <span className={`${heading.className} text-lg md:text-xl font-semibold uppercase tracking-wide`}>{item.q}</span>
            <span className="text-xl ml-4 flex-shrink-0" style={{ color: '#f97316' }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div className="px-6 pb-5" style={{ color: 'rgba(255,255,255,0.6)', borderTop: '1px solid rgba(249,115,22,0.1)' }}>
              <p className="leading-relaxed pt-4">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   POWDER HIGHWAY ADVENTURES — Adventure & Outdoors Demo
   ══════════════════════════════════════════════════════════════ */
export default function AdventureOutdoorsDemo() {
  const prefersReduced = useReducedMotion()

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])

  return (
    <div className={body.className} style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#1b2d1b', color: '#ffffff' }}>

      <style>{`
        @keyframes compassSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes shimmer-border {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
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
      <nav className="px-6 py-4 sticky top-0 z-40" style={{ backgroundColor: '#1b2d1b', borderBottom: '1px solid rgba(249,115,22,0.2)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className={`${heading.className} text-xl md:text-2xl font-bold uppercase tracking-wider`} style={{ color: '#f97316' }}>
            Powder Highway Adventures
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Adventures', 'About', 'Gallery', 'Book'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm uppercase tracking-wider font-medium transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f97316')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >{link}</a>
            ))}
            <a href="tel:2505550143" className="text-sm font-bold" style={{ color: '#f97316' }}>(250) 555-0143</a>
          </div>
          <a href="tel:2505550143" className="md:hidden text-sm font-bold" style={{ color: '#f97316' }}>(250) 555-0143</a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO — 3-layer parallax mountains ═══════════ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="absolute inset-0">
          <Image src="/images/demos/adventure-hero.webp" alt="Powder Highway Adventures — mountain backcountry landscape" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(27,45,27,0.65), rgba(27,45,27,0.85))' }} />

        <motion.div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{ y: prefersReduced ? 0 : layer1Y }}>
          <MountainLayer opacity={0.15} color="#1b2d1b" d="M0,250 L120,180 L240,220 L400,120 L520,190 L680,80 L800,160 L960,100 L1100,180 L1200,130 L1320,200 L1440,150 L1440,400 L0,400 Z" />
        </motion.div>
        <motion.div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{ y: prefersReduced ? 0 : layer2Y }}>
          <MountainLayer opacity={0.25} color="#1b2d1b" d="M0,300 L180,220 L350,270 L500,180 L650,240 L820,150 L1000,210 L1150,170 L1300,230 L1440,190 L1440,400 L0,400 Z" />
        </motion.div>
        <motion.div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{ y: prefersReduced ? 0 : layer3Y }}>
          <MountainLayer opacity={0.5} color="#1b2d1b" d="M0,340 L100,290 L280,320 L420,260 L580,310 L740,250 L900,290 L1060,260 L1200,300 L1360,270 L1440,310 L1440,400 L0,400 Z" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto text-center px-6 py-32 md:py-44 w-full z-10">
          <motion.p className={`${heading.className} text-sm md:text-base uppercase tracking-[0.3em] mb-6`} style={{ color: '#f97316' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            Your next adventure starts here
          </motion.p>
          <motion.h1 className={`${heading.className} text-5xl md:text-7xl lg:text-9xl font-bold uppercase leading-[0.9] tracking-tight mb-8`}
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            POWDER<br /><span style={{ color: '#f97316' }}>HIGHWAY</span>
          </motion.h1>
          <motion.div initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <a href="#book" className="inline-block px-12 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:scale-105"
              style={{ backgroundColor: '#f97316', color: '#ffffff', boxShadow: '0 4px 20px rgba(249,115,22,0.4)' }}>
              Book Your Adventure
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div className="py-5 px-6" style={{ backgroundColor: '#f97316' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm font-bold text-white">
          <span className="flex items-center gap-2"><span style={{ color: '#1b2d1b' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>5.0 Rating</span>
          <span className="opacity-50">&#183;</span>
          <span>Certified Guides</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Full Safety Equipment</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Groups Welcome</span>
        </div>
      </div>

      {/* ═══════════ 4. SERVICES — Trail Marker numbered ═══════════ */}
      <section id="adventures" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase text-center mb-4`}>What We Can Do For You</h2>
            <div className="w-16 h-1 mx-auto mb-8" style={{ backgroundColor: '#f97316' }} />
          </Reveal>

          {/* PAS Copy */}
          <Reveal delay={0.1}>
            <div className="max-w-2xl mx-auto mb-14 p-6" style={{ borderLeft: '4px solid #f97316', backgroundColor: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', borderLeftWidth: '4px' }}>
              <p className="text-lg leading-relaxed text-center" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Tourists are booking your competitor because they found them first on Google. Not because the experience is better — because the website showed up. You&apos;re doing the hard work. Let&apos;s make sure people can actually find you.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: 1, title: 'Custom Website', price: 'From $1,500', desc: 'A bold, action-packed website that gets outdoor enthusiasts excited to book before they even call.' },
              { num: 2, title: 'Online Booking Store', price: 'From $3,000', desc: 'Sell trip packages, gift cards, and gear online. Your booking page never closes — even at 2am.' },
              { num: 3, title: 'Google Domination', price: '$500', desc: 'Show up when tourists search for guided tours, ski adventures, or river trips in the Kootenays.' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div className="p-8 text-center transition-all cursor-default"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249,115,22,0.15)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.15)')}
                >
                  <TrailMarker number={card.num} />
                  <h3 className={`${heading.className} text-xl font-bold uppercase mb-1`} style={{ color: '#f97316' }}>{card.title}</h3>
                  <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: 'rgba(249,115,22,0.6)' }}>{card.price}</p>
                  <p className="leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: 'rgba(27,45,27,0.95)', borderTop: '1px solid rgba(249,115,22,0.1)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase text-center mb-4`}>How It Works</h2>
            <div className="w-16 h-1 mx-auto mb-16" style={{ backgroundColor: '#f97316' }} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: 1, title: 'WE TALK', desc: 'Free consultation. You tell us about your adventures, your seasons, what kind of guests you want. We map out the strategy.' },
              { num: 2, title: 'WE BUILD', desc: 'Your site live in 2–3 weeks. Online booking, trip galleries, guide bios, safety info — built to convert browsers into bookers.' },
              { num: 3, title: 'YOU GROW', desc: 'Tourists searching for Kootenay adventures find you first. Bookings come in online. Your season fills up faster.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.2}>
                <div className="text-center p-8" style={{ backgroundColor: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.15)' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold" style={{ backgroundColor: '#f97316', color: '#fff' }}>{step.num}</div>
                  <h3 className={`${heading.className} text-2xl font-bold uppercase mb-4`} style={{ color: '#f97316' }}>{step.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY — Recent Adventures ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: 'rgba(27,45,27,0.9)' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase text-center mb-4`}>Recent Adventures</h2>
            <div className="w-16 h-1 mx-auto mb-12" style={{ backgroundColor: '#f97316' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="overflow-hidden w-full max-w-3xl" style={{ border: '2px solid rgba(249,115,22,0.2)' }}>
                <Image src="/images/demos/adventure-hero.webp" alt="Powder Highway Adventures — mountain backcountry action" width={800} height={450} className="w-full h-auto block" />
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Backcountry Skiing', 'Mountain Biking', 'River Rafting'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={`/images/demos/gallery/ao-${i + 1}.webp`} alt={label} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-sm font-medium">{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. THE TRANSFORMATION ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase text-center mb-4`}>Watch Your Website Transform</h2>
            <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: '#f97316' }} />
            <p className="text-center mb-12 text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>From dated to designed — in real time</p>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveRedesign />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: 'rgba(27,45,27,0.95)' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase text-center mb-4`}>What Operators Say</h2>
            <div className="w-16 h-1 mx-auto mb-16" style={{ backgroundColor: '#f97316' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "We were invisible online. Tourists from Vancouver and Calgary were booking the other guys. Three months after launching the new site, our summer was fully booked.",
                name: 'Jake R.',
                biz: "Selkirk Summit Guides — Revelstoke, BC",
              },
              {
                quote: "The online booking system changed everything. People book at 11pm from their couch in Calgary. I wake up to new reservations. My season fills up weeks earlier now.",
                name: 'Lisa M.',
                biz: "Powder Ridge Adventures — Fernie, BC",
              },
              {
                quote: "I was relying entirely on word of mouth and TripAdvisor. Now I show up on Google when people search for guided ski tours in the Kootenays. Bookings doubled.",
                name: 'Trevor H.',
                biz: "Kootenay Backcountry Lodge — Invermere, BC",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="p-8 h-full flex flex-col" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(249,115,22,0.2)', borderTop: '3px solid #f97316' }}>
                  <div className="flex gap-1 mb-5 justify-center text-xl" style={{ color: '#f97316' }}>
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </div>
                  <blockquote className="flex-1 leading-relaxed mb-6 text-center" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="text-center">
                    <p className={`${heading.className} font-bold uppercase tracking-wider text-sm`} style={{ color: '#f97316' }}>{t.name}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{t.biz}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-8 text-center text-xs italic" style={{ color: 'rgba(255,255,255,0.2)' }}>
              (Sample reviews — your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase text-center mb-4`}>Common Questions</h2>
            <div className="w-16 h-1 mx-auto mb-12" style={{ backgroundColor: '#f97316' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={[
              { q: 'How long does a website take?', a: 'Most adventure operator sites are live in 2–3 weeks. We prioritize your booking flow and seasonal calendar from day one.' },
              { q: 'Can I take bookings and deposits online?', a: 'Yes. We integrate online booking and payment so guests can reserve a spot and pay a deposit without calling. Available 24/7 — even while you\'re in the backcountry.' },
              { q: 'What about seasonal content updates?', a: 'You\'ll be able to update trip availability, add new adventure packages, and post photo galleries yourself — from your phone, from anywhere.' },
              { q: 'What does it cost?', a: 'A custom website starts at $1,500. An online booking store from $3,000. Google Domination SEO at $500. Book a free consultation for a firm quote.' },
              { q: 'Do you handle content and photos?', a: 'Yes. If you have action photos from past trips, we\'ll make them shine. No photos yet? We\'ll help source appropriate imagery while you build your library.' },
              { q: 'Can the site handle multi-season businesses?', a: 'Absolutely. We build sites that handle winter and summer offerings, seasonal pricing, and trip calendars that update as you go. One site, year-round.' },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: 'rgba(27,45,27,0.9)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <TrailMarker number={7} />
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>About Powder Highway</h2>
            <div className="w-16 h-1 mx-auto mb-10" style={{ backgroundColor: '#f97316' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Powder Highway Adventures was founded by lifelong Kootenay locals with a passion for the mountains. Our certified guides have spent decades exploring the backcountry &mdash; from deep powder skiing in the Selkirks to white-water rafting on the Columbia River. We believe that the best adventures are the ones that leave you breathless, laughing, and planning your next trip before you have even finished the first. Whether you are a seasoned explorer or a first-timer, we will take you somewhere unforgettable.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section id="book" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase text-center mb-4`}>Book Your Adventure</h2>
            <div className="w-16 h-1 mx-auto mb-16" style={{ backgroundColor: '#f97316' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div className="space-y-6">
                <div>
                  <h3 className={`${heading.className} text-xs font-bold uppercase tracking-widest mb-2`} style={{ color: '#f97316' }}>Phone</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>(250) 555-0143</p>
                </div>
                <div>
                  <h3 className={`${heading.className} text-xs font-bold uppercase tracking-widest mb-2`} style={{ color: '#f97316' }}>Email</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>info@powderhighway.ca</p>
                </div>
                <div>
                  <h3 className={`${heading.className} text-xs font-bold uppercase tracking-widest mb-2`} style={{ color: '#f97316' }}>Season</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>April &ndash; October</p>
                </div>
                <div>
                  <h3 className={`${heading.className} text-xs font-bold uppercase tracking-widest mb-2`} style={{ color: '#f97316' }}>Location</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>Revelstoke &amp; the Kootenays, BC</p>
                </div>
                <a href="tel:2505550143" className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 mt-4"
                  style={{ backgroundColor: '#f97316', color: '#ffffff', boxShadow: '0 4px 20px rgba(249,115,22,0.3)' }}>
                  Book Your Adventure
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249,115,22,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#f97316')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.2)')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Email</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249,115,22,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#f97316')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.2)')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Message</label>
                  <textarea rows={4} placeholder="What adventure are you looking for?" className="w-full px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all resize-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249,115,22,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#f97316')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.2)')} />
                </div>
                <button type="submit" className="w-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:opacity-90"
                  style={{ backgroundColor: '#f97316', color: '#ffffff' }}>
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 12. FOOTER + Compass ═══════════ */}
      <footer className="relative py-14 px-6" style={{ backgroundColor: '#0f1f0f', borderTop: '1px solid rgba(249,115,22,0.1)' }}>
        <div className="absolute bottom-8 right-8 w-16 h-16 opacity-30 hidden md:block" style={{ animation: 'compassSpin 30s linear infinite' }}>
          <Compass />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${heading.className} text-lg font-bold uppercase mb-3`} style={{ color: '#f97316' }}>Powder Highway Adventures</h3>
              <p className="text-sm text-white/40">Certified guided adventures in the Kootenays.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Adventures', 'About', 'Gallery', 'Book'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-white/40 hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Info</h4>
              <p className="text-sm text-white/40 mb-1">Season: April &ndash; October</p>
              <p className="text-sm text-white/40 mb-1">Revelstoke &amp; the Kootenays, BC</p>
              <p className="text-sm text-white/40">(250) 555-0143</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-sm text-white/25">&copy; 2025 Powder Highway Adventures. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{ backgroundColor: 'rgba(27,45,27,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '2px solid #f97316' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sample design by <strong className="text-white">Kootenay Made Digital</strong>
          </span>
          <Link href="/contact?style=adventure-outdoors"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 whitespace-nowrap"
            style={{ backgroundColor: '#f97316', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(249,115,22,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            LIKE WHAT YOU SEE? LET'S TALK &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
