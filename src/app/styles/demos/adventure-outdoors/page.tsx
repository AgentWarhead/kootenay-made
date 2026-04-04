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
      <div className="relative w-full" style={{ minHeight: '520px' }}>
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
                  <h2 className="text-xl sm:text-2xl md:text-4xl leading-tight mb-2" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700 }}>Powder Highway Adventures</h2>
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
              
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/images/demos/adventure-hero.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.9) 100%)' }} />
            </div>
{/* Elegant nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${orange}20` }}>
                <motion.span className={`${heading.className} text-base sm:text-xl font-bold uppercase`} style={{ color: orange }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  POWDER HIGHWAY ADVENTURES
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
                    <span  style={{ color: orange }}>
                      NEITHER SHOULD YOU.

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
                    <span className={`${body.className} text-sm`} style={{ color: 'rgba(255,255,255,0.55)' }}>No commitment required</span>
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

/* ── Trip Card ── */
function TripCard({
  image, title, difficulty, difficultyColor, duration, season, price, description, delay
}: {
  image: string; title: string; difficulty: string; difficultyColor: string;
  duration: string; season: string; price: string; description: string; delay: number
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <Reveal delay={delay}>
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        style={{ aspectRatio: '3/4', minHeight: '340px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        {/* Always-visible overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
        {/* Difficulty badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-bold rounded-full text-white uppercase tracking-wider"
            style={{ backgroundColor: difficultyColor }}>
            {difficulty}
          </span>
        </div>
        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className={`${heading.className} text-xl font-bold uppercase mb-2 text-white`}>{title}</h3>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>⏱ {duration}</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>📅 {season}</span>
          </div>
          {/* Hover description */}
          <AnimatePresence>
            {hovered && (
              <motion.p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}>
                {description}
              </motion.p>
            )}
          </AnimatePresence>
          <div className="flex items-center justify-between">
            <span className={`${heading.className} text-lg font-bold`} style={{ color: '#f97316' }}>From {price}</span>
            <a href="#book"
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: '#f97316', color: '#fff' }}>
              Book Now
            </a>
          </div>
        </div>
      </div>
    </Reveal>
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
        @keyframes conditionsPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
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

      {/* ═══════════ 2. HERO — 3-layer parallax mountains + trip search bar ═══════════ */}
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
            <a href="#adventures" className="inline-block px-12 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:scale-105"
              style={{ backgroundColor: '#f97316', color: '#ffffff', boxShadow: '0 4px 20px rgba(249,115,22,0.4)' }}>
              Book Your Adventure
            </a>
          </motion.div>

          {/* Trip search bar */}
          <motion.div className="mt-8 max-w-2xl mx-auto w-full"
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }}>
            <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-xl"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <select
                className="flex-1 px-4 py-3 text-sm rounded-lg font-medium outline-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.95)', color: '#1b2d1b' }}
                defaultValue="">
                <option value="" disabled>What&apos;s your adventure?</option>
                <option>Guided Hiking</option>
                <option>Backcountry Skiing</option>
                <option>River Rafting</option>
                <option>Multi-Day Camping</option>
              </select>
              <input type="date"
                className="flex-1 px-4 py-3 text-sm rounded-lg outline-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.95)', color: '#1b2d1b' }} />
              <button
                className="px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all hover:scale-105"
                style={{ backgroundColor: '#f97316', color: '#fff', boxShadow: '0 2px 12px rgba(249,115,22,0.4)' }}>
                Find Trips
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div className="py-5 px-6" style={{ backgroundColor: '#f97316' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm font-bold text-white">
          <span className="flex items-center gap-2"><span style={{ color: '#1b2d1b' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>5.0 TripAdvisor</span>
          <span className="opacity-50">&#183;</span>
          <span>ACMG Certified Guides</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Wilderness First Responder</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">1,000+ Trips Guided</span>
        </div>
      </div>

      {/* ═══════════ 4. CHOOSE YOUR ADVENTURE — Trip Cards ═══════════ */}
      <section id="adventures" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase text-center mb-4`}>Choose Your Adventure</h2>
            <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: '#f97316' }} />
            <p className="text-center mb-12 text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Tap a card to see trip details — hover on desktop
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <TripCard
              image="/images/demos/gallery/ao-1.webp"
              title="Backcountry Skiing"
              difficulty="🔴 Expert"
              difficultyColor="rgba(220,38,38,0.85)"
              duration="1–3 Days"
              season="Dec – Apr"
              price="$299"
              description="Untracked powder in the Selkirks. Avalanche-certified guides. Heli access available on select routes."
              delay={0}
            />
            <TripCard
              image="/images/demos/gallery/ao-2.webp"
              title="Mountain Biking"
              difficulty="🟡 Moderate"
              difficultyColor="rgba(234,179,8,0.85)"
              duration="Half Day"
              season="Jun – Oct"
              price="$89"
              description="Rip through Kootenay singletrack with a local guide who knows every root, rock, and shortcut."
              delay={0.1}
            />
            <TripCard
              image="/images/demos/gallery/ao-3.webp"
              title="River Rafting"
              difficulty="🟢 Easy"
              difficultyColor="rgba(22,163,74,0.85)"
              duration="3 Hours"
              season="Jun – Sep"
              price="$119"
              description="Class II–III whitewater on the Kootenay River. All ages welcome. Gear and safety briefing included."
              delay={0.2}
            />
            <TripCard
              image="/images/demos/gallery/ao-4.webp"
              title="Whitewater Rafting"
              difficulty="🟡 Moderate"
              difficultyColor="rgba(234,179,8,0.85)"
              duration="Half Day"
              season="May – Sep"
              price="$129"
              description="Heart-pumping whitewater on Kootenay rivers. Expert guides, full safety gear, and unforgettable scenery."
              delay={0.3}
            />
            <TripCard
              image="/images/demos/gallery/ao-5.webp"
              title="Backcountry Ski Tours"
              difficulty="🔴 Expert"
              difficultyColor="rgba(220,38,38,0.85)"
              duration="Full Day"
              season="Jan – Mar"
              price="$349"
              description="Remote powder stashes in the Selkirks. Certified avalanche guides, touring gear provided, epic vertical."
              delay={0.35}
            />
            <TripCard
              image="/images/demos/adventure-hero.webp"
              title="Multi-Day Hiking"
              difficulty="🟡 Moderate"
              difficultyColor="rgba(234,179,8,0.85)"
              duration="3–5 Days"
              season="Jul – Sep"
              price="$449"
              description="Backcountry camping in the Valhallas or Purcells. Guides carry the maps — you carry the wonder."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ═══════════ 5. TRAIL-MARKER VERTICAL TIMELINE ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: 'rgba(27,45,27,0.95)', borderTop: '1px solid rgba(249,115,22,0.1)' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase text-center mb-4`}>How Your Trip Works</h2>
            <div className="w-16 h-1 mx-auto mb-16" style={{ backgroundColor: '#f97316' }} />
          </Reveal>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px hidden sm:block"
              style={{ backgroundColor: 'rgba(249,115,22,0.25)', transform: 'translateX(-50%)' }} />

            {[
              { num: 1, title: 'CHOOSE YOUR TRIP', icon: '🗺️', desc: 'Browse our trip library. Filter by difficulty, season, or activity type. Each trip page shows you exactly what to expect — terrain, gear list, what\'s included.' },
              { num: 2, title: 'MEET YOUR GUIDE', icon: '🧗', desc: 'Every booking confirms your certified guide. You\'ll get their contact info, a pre-trip call, and a full briefing on conditions and safety protocols before departure.' },
              { num: 3, title: 'GEAR UP', icon: '🎒', desc: 'We provide all safety equipment. Your personalized packing list arrives 1 week before your trip. Rental gear available if you need it — no excuses not to go.' },
              { num: 4, title: 'HIT THE TRAIL', icon: '⛰️', desc: 'This is it. Pure Kootenay wilderness with a guide who\'s done it a hundred times and still loves every second of it. You just have to show up ready.' },
              { num: 5, title: 'SHARE YOUR STORY', icon: '📸', desc: 'We\'ll have photos and a trip summary waiting for you. Leave a review, tag us, or just tell one friend. That\'s how this community grows.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.12}>
                <div className={`relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Number circle — centered on the line */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold z-10 md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2"
                    style={{ backgroundColor: '#f97316', color: '#fff', boxShadow: '0 0 0 4px rgba(249,115,22,0.15)' }}>
                    {step.num}
                  </div>
                  {/* Content */}
                  <div className={`flex-1 sm:pl-6 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} md:w-[calc(50%-3rem)]`}>
                    <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.15)' }}>
                      <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-2xl">{step.icon}</span>
                        <h3 className={`${heading.className} text-lg md:text-xl font-bold uppercase`} style={{ color: '#f97316' }}>{step.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{step.desc}</p>
                    </div>
                  </div>
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. CONDITIONS & FORECAST ═══════════ */}
      <section className="py-16 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-4xl font-bold uppercase text-center mb-4`}>Trail Conditions & Forecast</h2>
            <div className="w-16 h-1 mx-auto mb-10" style={{ backgroundColor: '#f97316' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Temperature', value: '12°C', sub: 'Feels like 9°C', icon: '🌡️' },
                { label: 'Trail Status', value: 'OPEN', sub: 'All routes clear', icon: '✅', highlight: true },
                { label: 'Conditions', value: 'Firm', sub: 'No mud, dry rock', icon: '⛰️' },
                { label: 'Sunset', value: '7:42 PM', sub: 'Golden hour: 7:12', icon: '🌄' },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-xl text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor: item.highlight ? 'rgba(249,115,22,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${item.highlight ? 'rgba(249,115,22,0.3)' : 'rgba(249,115,22,0.1)'}`,
                  }}>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className={`${heading.className} text-xl md:text-2xl font-bold mb-1`} style={{ color: item.highlight ? '#f97316' : '#fff' }}>{item.value}</div>
                  <div className="text-xs mb-1 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.label}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.sub}</div>
                </div>
              ))}
            </div>
            <p className="text-center mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              ● Live conditions updated daily — Last update: Today 8:00 AM
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 7. GUIDE CREDENTIALS ═══════════ */}
      <section className="py-10 px-6" style={{ backgroundColor: 'rgba(249,115,22,0.08)', borderTop: '1px solid rgba(249,115,22,0.15)', borderBottom: '1px solid rgba(249,115,22,0.15)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className={`${heading.className} text-xs font-bold uppercase tracking-[0.3em] text-center mb-6`} style={{ color: 'rgba(255,255,255,0.55)' }}>
              Our Guides Are Certified By
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              {[
                { badge: 'ACMG', name: 'Alpine Club of Canada\nMountain Guide' },
                { badge: 'WFR', name: 'Wilderness\nFirst Responder' },
                { badge: 'AST 2', name: 'Avalanche Safety\nLevel 2' },
                { badge: 'SRT', name: 'Swiftwater\nRescue Tech' },
                { badge: 'WASI', name: 'Wilderness Advanced\nSki Instructor' },
              ].map((cert) => (
                <div key={cert.badge} className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-200 hover:bg-white/5"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249,115,22,0.2)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: '#f97316', color: '#fff' }}>
                    {cert.badge}
                  </div>
                  <span className="text-xs leading-tight whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.6)' }}>{cert.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. LATEST ADVENTURES — Asymmetric Photo Mosaic ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: 'rgba(27,45,27,0.9)' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase text-center mb-4`}>Latest Adventures</h2>
            <div className="w-16 h-1 mx-auto mb-12" style={{ backgroundColor: '#f97316' }} />
          </Reveal>
          <Reveal delay={0.1}>
            {/* Asymmetric mosaic grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" style={{ gridTemplateRows: 'auto auto auto' }}>
              {/* Tall left */}
              <div className="relative rounded-2xl overflow-hidden row-span-2 col-span-1"
                style={{ minHeight: '300px', gridRow: '1 / 3' }}>
                <Image src="/images/demos/gallery/ao-1.webp" alt="Backcountry Skiing — Selkirk Mountains" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-lg mb-2 inline-block"
                    style={{ backgroundColor: 'rgba(249,115,22,0.85)', color: '#fff' }}>Backcountry Skiing</span>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>📍 Selkirk Mtns • Jan 18, 2025</p>
                </div>
              </div>
              {/* Top right */}
              <div className="relative rounded-2xl overflow-hidden col-span-1" style={{ minHeight: '180px' }}>
                <Image src="/images/demos/gallery/ao-2.webp" alt="Mountain Biking — Kootenay Trails" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-1 inline-block"
                    style={{ backgroundColor: 'rgba(249,115,22,0.85)', color: '#fff' }}>Mountain Biking</span>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>📍 Nelson Trails • Aug 4</p>
                </div>
              </div>
              {/* Middle right */}
              <div className="relative rounded-2xl overflow-hidden col-span-1" style={{ minHeight: '180px' }}>
                <Image src="/images/demos/gallery/ao-3.webp" alt="River Rafting — Kootenay River" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-1 inline-block"
                    style={{ backgroundColor: 'rgba(249,115,22,0.85)', color: '#fff' }}>River Rafting</span>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>📍 Kootenay River • Jul 22</p>
                </div>
              </div>
              {/* Wide bottom */}
              <div className="relative rounded-2xl overflow-hidden col-span-2 md:col-span-3" style={{ minHeight: '220px' }}>
                <Image src="/images/demos/adventure-hero.webp" alt="Multi-Day Hiking — Valhalla Range" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)' }} />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-2 inline-block"
                    style={{ backgroundColor: 'rgba(249,115,22,0.85)', color: '#fff' }}>Multi-Day Hiking</span>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>📍 Valhalla Range • Sep 6 – 10, 2024</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 9. THE TRANSFORMATION ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase text-center mb-4`}>Watch Your Website Transform</h2>
            <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: '#f97316' }} />
            <p className="text-center mb-12 text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)' }}>From dated to designed — in real time</p>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveRedesign />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 10. TESTIMONIALS — TripAdvisor Style ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: 'rgba(27,45,27,0.95)' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase text-center mb-4`}>What Adventurers Say</h2>
            <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: '#f97316' }} />
            <div className="flex items-center justify-center gap-2 mb-12">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="#00AF87">
                <path d="M50 5L63 40H98L71 61L82 96L50 75L18 96L29 61L2 40H37Z" />
              </svg>
              <span className="text-sm font-bold" style={{ color: '#00AF87' }}>TripAdvisor Certificate of Excellence</span>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Best ski guide we've ever had. Knew the terrain like his backyard. We found powder stashes nobody else was touching. 100% coming back.",
                name: 'Marcus T.',
                location: 'Calgary, AB',
                trip: 'Backcountry Skiing',
                initials: 'MT',
              },
              {
                quote: "I was nervous about rafting — never done it. Our guide was patient, funny, and had us laughing through the rapids. My kids still talk about it.",
                name: 'Sarah & Family',
                location: 'Vancouver, BC',
                trip: 'River Rafting',
                initials: 'SF',
              },
              {
                quote: "The 5-day Valhalla hike was the hardest and best thing I've done. Guide knew every plant, every bird, and exactly when to push and when to rest.",
                name: 'Derek L.',
                location: 'Edmonton, AB',
                trip: 'Multi-Day Hiking',
                initials: 'DL',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(249,115,22,0.15)' }}>
                  <div className="flex items-center gap-1 mb-4" style={{ color: '#00AF87' }}>
                    {'★★★★★'.split('').map((s, j) => <span key={j} className="text-lg">{s}</span>)}
                  </div>
                  <blockquote className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.75)', fontStyle: 'italic' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: 'rgba(249,115,22,0.2)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className={`${heading.className} text-sm font-bold uppercase`} style={{ color: '#fff' }}>{t.name}</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.location} · {t.trip}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-8 text-center text-xs italic" style={{ color: 'rgba(255,255,255,0.2)' }}>
              (Sample reviews — your real TripAdvisor reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 11. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase text-center mb-4`}>Common Questions</h2>
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

      {/* ═══════════ 12. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: 'rgba(27,45,27,0.9)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <TrailMarker number={7} />
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase mb-4`}>About Powder Highway</h2>
            <div className="w-16 h-1 mx-auto mb-10" style={{ backgroundColor: '#f97316' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Powder Highway Adventures was founded by lifelong Kootenay locals with a passion for the mountains. Our certified guides have spent decades exploring the backcountry &mdash; from deep powder skiing in the Selkirks to white-water rafting on the Columbia River. We believe that the best adventures are the ones that leave you breathless, laughing, and planning your next trip before you have even finished the first. Whether you are a seasoned explorer or a first-timer, we will take you somewhere unforgettable.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 13. CONTACT ═══════════ */}
      <section id="book" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase text-center mb-4`}>Book Your Adventure</h2>
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
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>April &ndash; October (Summer) · December &ndash; April (Winter)</p>
                </div>
                <div>
                  <h3 className={`${heading.className} text-xs font-bold uppercase tracking-widest mb-2`} style={{ color: '#f97316' }}>Location</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>123 Sample St, Revelstoke, BC</p>
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
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Which adventure interests you?</label>
                  <select className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249,115,22,0.2)', color: 'rgba(255,255,255,0.7)' }}>
                    <option style={{ backgroundColor: '#1b2d1b' }}>Backcountry Skiing</option>
                    <option style={{ backgroundColor: '#1b2d1b' }}>Mountain Biking</option>
                    <option style={{ backgroundColor: '#1b2d1b' }}>River Rafting</option>
                    <option style={{ backgroundColor: '#1b2d1b' }}>Multi-Day Hiking</option>
                    <option style={{ backgroundColor: '#1b2d1b' }}>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Message</label>
                  <textarea rows={3} placeholder="Preferred dates, group size, or any questions..." className="w-full px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all resize-none"
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

      {/* ═══════════ 14. FOOTER + Compass ═══════════ */}
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
              <p className="text-sm text-white/40 mb-1">Season: Year-round</p>
              <p className="text-sm text-white/40 mb-1">123 Sample St, Revelstoke, BC</p>
              <p className="text-sm text-white/40">(250) 555-0143</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-sm text-white/25">&copy; {new Date().getFullYear()} Powder Highway Adventures. All rights reserved.</span>
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
