'use client'

import { Bebas_Neue, Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'

const heading = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
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

/* ── Angular clip-path divider ── */
function RacingDivider({ topColor = '#111', bottomColor = '#0a0a0a' }: { topColor?: string; bottomColor?: string }) {
  return (
    <div style={{ backgroundColor: topColor, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-10 md:h-14 block">
        <polygon fill={bottomColor} points="0,10 1440,0 1440,50 0,50" />
      </svg>
    </div>
  )
}

/* ── Red racing stripe divider ── */
function RedStripe() {
  return (
    <div className="w-full h-1" style={{
      background: 'linear-gradient(90deg, transparent 0%, #dc2626 15%, #dc2626 85%, transparent 100%)',
    }} />
  )
}

/* ── Chrome gradient text style ── */
const chromeGradient = {
  backgroundImage: 'linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 40%, #ffffff 60%, #c0c0c0 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text' as const,
}

/* ── Speedometer animated counter ── */
function SpeedoStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 15 75 A 40 40 0 1 1 85 75" fill="none" stroke="rgba(192,192,192,0.15)" strokeWidth="4" strokeLinecap="round" />
          <motion.path
            d="M 15 75 A 40 40 0 1 1 85 75"
            fill="none"
            stroke="#dc2626"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: 0 }}
            animate={isInView && !prefersReduced ? { pathLength: 0.85 } : prefersReduced ? { pathLength: 0.85 } : {}}
            transition={{ duration: 1.5, delay, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${heading.className} text-xl md:text-2xl`} style={{ color: '#ffffff' }}>
            {isInView || prefersReduced ? value : '0'}
          </span>
        </div>
      </div>
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c0c0c0' }}>{label}</span>
    </div>
  )
}

/* ── Flip Card for vehicle showcase ── */
function FlipCard({ front, back }: {
  front: { title: string; subtitle: string; desc: string }
  back: { title: string; desc: string; stat: string }
}) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      className="cursor-pointer"
      style={{ perspective: '1000px', height: '280px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          padding: '2rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4"
              style={{ backgroundColor: '#333', color: '#888', border: '1px solid #444' }}>BEFORE</span>
            <h3 className={`${heading.className} text-3xl tracking-wider mb-2`} style={{ color: '#ffffff' }}>{front.title}</h3>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#666' }}>{front.subtitle}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{front.desc}</p>
          </div>
          <p className="text-xs" style={{ color: '#555' }}>Tap to see the transformation →</p>
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          backgroundColor: '#1a0505',
          border: '1px solid #dc2626',
          boxShadow: '0 0 30px rgba(220,38,38,0.2)',
          padding: '2rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4"
              style={{ backgroundColor: '#dc2626', color: '#ffffff' }}>AFTER</span>
            <h3 className={`${heading.className} text-3xl tracking-wider mb-3`} style={{ color: '#dc2626' }}>{back.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{back.desc}</p>
          </div>
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(220,38,38,0.3)' }}>
            <span className={`${heading.className} text-2xl tracking-wider`} style={{ color: '#ffffff' }}>{back.stat}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Animated progress bar ── */
function ProgressBar({ percent, delay = 0 }: { percent: number; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#222' }}>
      <motion.div
        className="h-2 rounded-full"
        style={{ backgroundColor: '#dc2626' }}
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: 'easeOut' }}
      />
    </div>
  )
}

/* ── Live Redesign ── */
function LiveRedesign() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [transformed, setTransformed] = useState(false)

  const dur = prefersReduced ? 0.01 : 0.9
  const stagger = prefersReduced ? 0 : 0.18

  // Colors
  const red = '#dc2626'
  const darkRed = '#991b1b'
  const chrome = '#c0c0c0'
  const black = '#111111'
  const nearBlack = '#0a0a0a'

  return (
    <div ref={ref} className="w-full">
      {/* Bold label */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? red : '#444' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }}
            className={`${body.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? red : '#666' }}
          >
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? red : '#444' }} layout transition={{ duration: 0.4 }} />
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
              {/* Fake WordPress nav */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#1a1a1a', borderBottom: '3px solid #555' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#888' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>Iron Horse Garage</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Services', 'About', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>☰ Menu</span>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 md:py-20 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #888 0%, #ccc 50%, #eee 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: 'Arial, sans-serif', color: '#666', letterSpacing: '0.15em' }}>★ Welcome to Our Website ★</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700 }}>Iron Horse Garage</h2>
                  <p className="text-sm sm:text-lg mb-1" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>&ldquo;Your #1 Choice for Car Repairs Since 1998!&rdquo;</p>
                  <p className="text-xs sm:text-sm mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>Oil Changes &bull; Brake Jobs &bull; Tire Rotations &bull; Inspections &bull; And More!</p>
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {['✓ ASE Certified', '✓ All Makes & Models', '✓ Free Estimates'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#555', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg font-bold mb-3" style={{ fontFamily: 'Arial, sans-serif', color: '#555' }}>📞 Call Us Today: (250) 555-0199</p>
                  <span className="inline-block px-6 py-2.5 text-sm cursor-default" style={{ backgroundColor: '#888', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', border: '1px solid #666' }}>
                    Book Your Appointment
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
                backgroundColor: '#111',
                border: `1px solid ${red}30`,
                borderRadius: '16px',
                boxShadow: `0 8px 40px ${red}18, 0 2px 8px rgba(0,0,0,0.3)`,
              }}
            >
              {/* Elegant nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${red}20` }}>
                <motion.span className={`${heading.className} text-base sm:text-lg tracking-wider`} style={{ ...chromeGradient }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  IRON HORSE GARAGE
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Services', 'Work', 'About', 'Contact'].map((link) => (
                    <span key={link} className={`${body.className} text-xs uppercase tracking-widest`} style={{ color: chrome, fontWeight: 500 }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: red }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: red }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: red }} />
                </motion.div>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-14 flex-1 flex flex-col justify-center">
                {/* Gear/angular SVG motif */}
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="60" stroke={red} strokeWidth="1.5" fill="none" />
                    <circle cx="100" cy="100" r="40" stroke={red} strokeWidth="1" fill="none" />
                    {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => (
                      <line key={deg} x1={100 + 60*Math.cos(deg*Math.PI/180)} y1={100 + 60*Math.sin(deg*Math.PI/180)} x2={100 + 72*Math.cos(deg*Math.PI/180)} y2={100 + 72*Math.sin(deg*Math.PI/180)} stroke={red} strokeWidth="3" strokeLinecap="round" />
                    ))}
                    <circle cx="100" cy="100" r="8" fill={red} opacity="0.4" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${body.className} text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full`}
                      style={{ backgroundColor: `${red}18`, color: red, border: `1px solid ${red}30` }}>
                      Est. 1998 &mdash; West Kootenay
                    </span>
                  </motion.div>
                  <motion.h2 className={`${heading.className} text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.0] mb-4 sm:mb-6 tracking-wider`}
                    style={{ color: '#fff' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    YOUR ENGINE LIGHT&rsquo;S ON.<br />WE&rsquo;LL TELL YOU WHY &mdash; NOT SELL YOU WHAT YOU{' '}
                    <span style={{ color: red }}>
                      DON&rsquo;T NEED.
                    </span>
                  </motion.h2>
                  <motion.p className={`${body.className} text-sm sm:text-lg max-w-md sm:mx-0 mx-auto mb-6`} style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Honest diagnostics. Fair pricing. ASE-certified technicians who tell you the truth.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className={`${heading.className} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] tracking-wider`}
                      style={{ backgroundColor: red, color: '#fff', boxShadow: `0 4px 20px ${red}40` }}>
                      Book Your Diagnostic
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <span className={`${body.className} text-sm`} style={{ color: '#666' }}>No commitment required</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['ASE Certified', '25+ Years', '4.9★ Google'].map((badge) => (
                      <span key={badge} className={`${body.className} text-xs`} style={{ color: red, opacity: 0.7, letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
              {/* Shimmer border */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-[16px]" style={{ background: `linear-gradient(90deg, transparent, ${red}, #ff6666, ${red}, transparent)`, animation: 'shimmer-border 3s linear infinite', backgroundSize: '200% 100%' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button onClick={() => setTransformed(!transformed)}
          className={`${body.className} text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{
            backgroundColor: transformed ? `${red}15` : nearBlack,
            color: transformed ? red : '#999',
            border: `1.5px solid ${transformed ? `${red}40` : '#333'}`,
            boxShadow: transformed ? `0 2px 12px ${red}15` : '0 1px 4px rgba(0,0,0,0.3)',
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
        <div key={i} style={{ border: '1px solid #222', backgroundColor: '#1a1a1a' }}>
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            style={{ color: open === i ? '#dc2626' : 'rgba(255,255,255,0.85)' }}
          >
            <span className={`${heading.className} text-lg md:text-xl tracking-wider`}>{item.q}</span>
            <span className="text-xl ml-4 flex-shrink-0" style={{ color: '#dc2626' }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div className="px-6 pb-5" style={{ color: 'rgba(255,255,255,0.55)', borderTop: '1px solid #222' }}>
              <p className="leading-relaxed pt-4">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   IRON HORSE GARAGE — Automotive & Powersports Demo
   ══════════════════════════════════════════════════════════════ */
export default function AutomotiveDemo() {
  const prefersReduced = useReducedMotion()

  return (
    <div className={body.className} style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#111', color: '#ffffff' }}>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @keyframes shimmer-border {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav style={{ backgroundColor: '#111', borderBottom: '2px solid #dc2626' }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className={`${heading.className} text-2xl md:text-3xl tracking-wider`} style={chromeGradient}>
            IRON HORSE GARAGE
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Work', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >{link}</a>
            ))}
            <a href="tel:2505550199" className="text-sm font-bold uppercase tracking-wider" style={{ color: '#dc2626' }}>
              (250) 555-0199
            </a>
          </div>
          <a href="tel:2505550199" className="md:hidden text-sm font-bold" style={{ color: '#dc2626' }}>(250) 555-0199</a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/demos/automotive-hero.webp" alt="Iron Horse Garage — professional auto shop" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-0 left-0 w-2 md:w-3" style={{ backgroundColor: '#dc2626', height: '60%', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <div className="max-w-5xl">
            <motion.div className="w-24 h-1.5 mb-8" style={{ backgroundColor: '#dc2626' }}
              initial={prefersReduced ? {} : { scaleX: 0, transformOrigin: 'left' }}
              animate={prefersReduced ? {} : { scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.h1
              className={`${heading.className} text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-wider`}
              style={{ ...chromeGradient, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              initial={prefersReduced ? {} : { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
              animate={prefersReduced ? {} : { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            >
              BUILT TO<br />
              <span style={{ ...chromeGradient, filter: 'drop-shadow(0 0 20px rgba(220,38,38,0.3))' }}>LAST</span>
            </motion.h1>
            <motion.p className="text-lg md:text-xl max-w-xl mt-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Full-service automotive repair and custom builds. ASE certified technicians serving the Kootenays for over 25 years.
            </motion.p>
            <motion.a href="tel:2505550199"
              className={`${heading.className} block text-4xl md:text-5xl lg:text-6xl mt-8 transition-colors tracking-wider`}
              style={{ color: '#dc2626' }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 30px rgba(220,38,38,0.5)')}
              onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
            >
              (250) 555-0199
            </motion.a>
            <motion.a href="#contact"
              className={`${heading.className} inline-block mt-10 px-10 py-4 text-lg tracking-widest transition-all`}
              style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
              whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(220,38,38,0.5)', scale: 1.03 }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              BOOK YOUR SERVICE
            </motion.a>
          </div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST STRIP — horizontal ═══════════ */}
      <section style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #1a1a1a' }} className="py-6 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <span key={s} className="text-lg" style={{ color: '#dc2626' }}>★</span>)}
              </div>
              <span className={`${heading.className} text-lg tracking-wider`} style={{ color: '#ffffff' }}>4.9 GOOGLE RATING</span>
            </div>
            <div className="w-px h-6 hidden md:block" style={{ backgroundColor: '#333' }} />
            <span className={`${heading.className} text-lg tracking-wider`} style={{ color: '#c0c0c0' }}>ASE CERTIFIED</span>
            <div className="w-px h-6 hidden md:block" style={{ backgroundColor: '#333' }} />
            <span className={`${heading.className} text-lg tracking-wider`} style={{ color: '#c0c0c0' }}>25+ YEARS</span>
            <div className="w-px h-6 hidden md:block" style={{ backgroundColor: '#333' }} />
            <span className={`${heading.className} text-lg tracking-wider`} style={{ color: '#c0c0c0' }}>ALL MAKES &amp; MODELS</span>
            <div className="w-px h-6 hidden md:block" style={{ backgroundColor: '#333' }} />
            <span className={`${heading.className} text-lg tracking-wider`} style={{ color: '#c0c0c0' }}>TRAIL&apos;S MOST-REVIEWED SHOP</span>
          </div>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#0a0a0a" bottomColor="#111" />

      {/* ═══════════ 4. THE LIFT — Card-flip vehicle showcase ═══════════ */}
      <section id="work" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-2`} style={chromeGradient}>THE LIFT</h2>
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#dc2626' }}>Recent transformations — tap to flip</p>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            <Reveal delay={0}>
              <FlipCard
                front={{ title: '2008 F-150', subtitle: 'Brought in from Rossland', desc: 'Seized engine, severe oil sludge buildup, multiple check engine codes. Previous shop said it was totalled.' }}
                back={{ title: 'Full Engine Rebuild', desc: 'New short block, complete oil system flush, all codes cleared, valve cover gaskets replaced. Runs like new.', stat: 'Back on the Road in 4 Days' }}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <FlipCard
                front={{ title: '1969 Chevelle', subtitle: 'Complete bare shell', desc: '40 years of BC rust, no running gear, original drivetrain long gone. Just a body and a dream.' }}
                back={{ title: 'Full Restoration', desc: 'Rebuilt 454 big block, all new sheet metal, PPG base coat/clear in original Fathom Green. Concours quality.', stat: '800+ Hours of Work' }}
              />
            </Reveal>
            <Reveal delay={0.2}>
              <FlipCard
                front={{ title: '2015 Subaru WRX', subtitle: 'Stage 2 build gone wrong', desc: 'Worn clutch slipping, untuned blow-off causing lean condition at boost, intermittent misfires under load.' }}
                back={{ title: 'Performance Build', desc: 'ACT clutch kit, Cobb AccessPort pro tune, Perrin intake + Mishimoto intercooler. Clean pull, no codes.', stat: '260whp on the Dyno' }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#111" bottomColor="#0a0a0a" />

      {/* ═══════════ 5. SERVICES — Shop Inspection Checklist ═══════════ */}
      <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>
              SHOP INSPECTION REPORT
            </h2>
            <div className="w-20 h-1.5 mb-4" style={{ backgroundColor: '#dc2626' }} />
            <p className="text-sm uppercase tracking-widest mb-12" style={{ color: 'rgba(255,255,255,0.35)' }}>Iron Horse Garage — Service Menu</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ backgroundColor: '#111', border: '1px solid #2a2a2a', borderTop: '4px solid #dc2626' }}>
              {/* Form header */}
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #222', backgroundColor: '#1a1a1a' }}>
                <div>
                  <span className={`${heading.className} text-sm tracking-widest`} style={{ color: '#dc2626' }}>VEHICLE INSPECTION FORM</span>
                  <p className="text-xs mt-1" style={{ color: '#555' }}>Iron Horse Garage — 123 Sample St, Trail, BC</p>
                </div>
                <div className="text-right">
                  <span className={`${heading.className} text-2xl tracking-wider`} style={{ color: '#dc2626' }}>APPROVED</span>
                  <p className="text-xs" style={{ color: '#555' }}>Date: ___________</p>
                </div>
              </div>
              {/* Checklist items */}
              <div className="divide-y" style={{ borderColor: '#1e1e1e' }}>
                {[
                  { label: 'Diagnostic Scan & Report', price: '$89 – $149' },
                  { label: 'Oil Change & Filter (Synthetic)', price: '$79 – $139' },
                  { label: 'Brake Inspection & Service', price: '$180 – $480' },
                  { label: 'Transmission Service', price: '$220 – $440' },
                  { label: 'Timing Belt / Chain Service', price: '$380 – $780' },
                  { label: 'Engine Rebuild (Short Block)', price: 'Call for Quote' },
                  { label: 'Custom Exhaust Fabrication', price: 'From $480' },
                  { label: 'Suspension & Alignment', price: '$180 – $380' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 transition-colors"
                    style={{ backgroundColor: i % 2 === 0 ? '#111' : '#131313' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#111' : '#131313')}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl flex-shrink-0" style={{ color: '#dc2626' }}>☑</span>
                      <span className={`${body.className} font-medium`} style={{ color: 'rgba(255,255,255,0.85)' }}>{item.label}</span>
                    </div>
                    <span className="text-sm font-mono font-bold ml-4 whitespace-nowrap" style={{ color: '#c0c0c0' }}>{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4" style={{ borderTop: '1px solid #222', backgroundColor: '#1a1a1a' }}>
                <p className="text-xs" style={{ color: '#444' }}>All work performed by ASE Certified technicians. Written estimate provided before any work begins. 12-month / 20,000km warranty on all parts and labour.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#0a0a0a" bottomColor="#111" />

      {/* ═══════════ 6. CURRENTLY IN THE BAY ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-2`} style={chromeGradient}>CURRENTLY IN THE BAY</h2>
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#dc2626' }}>Live shop status — we stay busy</p>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { vehicle: '2019 Ram 1500', job: 'Differential rebuild', percent: 10, status: 'Just Dropped Off', statusColor: '#888' },
              { vehicle: '2004 Land Cruiser', job: 'Full suspension overhaul + alignment', percent: 65, status: 'In Progress', statusColor: '#f97316' },
              { vehicle: '2011 Porsche 911', job: 'Clutch replacement + software update', percent: 90, status: 'Nearly Done', statusColor: '#22c55e' },
            ].map((item, i) => (
              <Reveal key={item.vehicle} delay={i * 0.15}>
                <div className="p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #222', borderTop: '3px solid #dc2626' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`${heading.className} text-xl tracking-wider`} style={{ color: '#ffffff' }}>{item.vehicle}</h3>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.job}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded whitespace-nowrap ml-2" style={{ backgroundColor: 'rgba(220,38,38,0.1)', color: item.statusColor, border: `1px solid ${item.statusColor}40` }}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex-1">
                      <ProgressBar percent={item.percent} delay={i * 0.2} />
                    </div>
                    <span className={`${heading.className} text-lg tracking-wider flex-shrink-0`} style={{ color: '#dc2626' }}>{item.percent}%</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#111" bottomColor="#0a0a0a" />

      {/* ═══════════ 7. HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>
              HOW IT WORKS
            </h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              { num: '01', title: 'DROP IT OFF', desc: 'Book online or call. Bring your vehicle in — we do a full walkaround and take notes. You tell us what you\'ve noticed. We listen.' },
              { num: '02', title: 'WE DIAGNOSE', desc: 'Scan, test drive, hands-on inspection. We find the real problem — not just the codes. Written estimate before we touch a wrench.' },
              { num: '03', title: 'PICK IT UP FIXED', desc: 'We call when it\'s done. You pay what we quoted. No surprises. We explain everything we found and what we fixed.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.2}>
                <div className="text-center">
                  <div className={`${heading.className} text-5xl md:text-6xl mb-4 tracking-wider`} style={{ color: '#dc2626' }}>{step.num}</div>
                  <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: '#dc2626', opacity: 0.4 }} />
                  <h3 className={`${heading.className} text-2xl tracking-wider mb-4`} style={{ color: '#ffffff' }}>{step.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#0a0a0a" bottomColor="#111" />

      {/* ═══════════ 8. THE TRANSFORMATION ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>
              Watch Your Website Transform
            </h2>
            <div className="w-20 h-1.5 mb-4" style={{ backgroundColor: '#dc2626' }} />
            <p className="mb-12 text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>From dated to designed — in real time</p>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveRedesign />
          </Reveal>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#111" bottomColor="#0a0a0a" />

      {/* ═══════════ 9. TESTIMONIALS — Race-stripe ticker ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>WHAT THE KOOTENAYS SAY</h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden" style={{ borderTop: '2px solid #dc2626', borderBottom: '2px solid #dc2626' }}>
              <div style={{
                display: 'flex',
                animation: prefersReduced ? 'none' : 'tickerScroll 30s linear infinite',
                width: 'max-content',
                gap: '0',
              }}>
                {[...Array(2)].map((_, dupIdx) => (
                  <div key={dupIdx} style={{ display: 'flex', alignItems: 'stretch' }}>
                    {[
                      { quote: 'Found the problem in 10 minutes that two other shops missed.', name: 'Rod K., Trail BC' },
                      { quote: 'Honest shop. No upselling. My truck runs better than the day I bought it.', name: 'Sheila M., Rossland' },
                      { quote: 'Brought my Camaro in for a tune. Left with a car that pulls hard in every gear.', name: 'Dave L., Castlegar' },
                      { quote: 'Rebuilt my 5.9 Cummins. More power than factory. Incredible work.', name: 'Brian T., Trail' },
                      { quote: 'Only shop I trust with my daily driver and my weekend toy. Period.', name: 'Karen P., Nelson' },
                    ].map((item, i) => (
                      <div key={`${dupIdx}-${i}`} className="flex items-center gap-6 px-8 py-6 flex-shrink-0"
                        style={{ borderRight: '1px solid #1e1e1e', backgroundColor: i % 2 === 0 ? '#111' : '#0e0e0e' }}>
                        <span className="text-2xl flex-shrink-0" style={{ color: '#dc2626' }}>&#9733;</span>
                        <div>
                          <p className={`${heading.className} text-lg md:text-xl tracking-wide whitespace-nowrap`} style={{ color: '#ffffff' }}>
                            &ldquo;{item.quote}&rdquo;
                          </p>
                          <p className="text-xs mt-1 whitespace-nowrap" style={{ color: '#555' }}>{item.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-center text-xs italic" style={{ color: 'rgba(255,255,255,0.2)' }}>
              (Sample reviews — your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#0a0a0a" bottomColor="#111" />

      {/* ═══════════ 10. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>COMMON QUESTIONS</h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={[
              { q: 'How long does a typical repair take?', a: 'Most repairs are done same-day or next day. Engine rebuilds and full restorations take longer — we give you a firm timeline upfront so you\'re never left wondering.' },
              { q: 'Do you work on all makes and models?', a: 'Yes. Domestic, import, diesel, classic, performance. If it has an engine, we work on it. Trucks, SUVs, cars, and powersports — all welcome.' },
              { q: 'Do you provide written estimates?', a: 'Always. We diagnose first, give you a written quote, and don\'t start work until you approve it. No surprises on your invoice.' },
              { q: 'Can you handle fleet vehicles?', a: 'Yes. We service commercial fleets for several local businesses. Ask about our fleet service agreements — priority scheduling and volume pricing available.' },
              { q: 'Do you do custom builds and performance work?', a: 'Absolutely. Engine builds, suspension lifts, exhaust fab, dyno tuning — we do it all. Bring us your vision and we\'ll make it happen.' },
              { q: 'What\'s your warranty?', a: 'All parts and labour are covered by a 12-month / 20,000km warranty. If something we fixed fails, we fix it again. That\'s the Iron Horse guarantee.' },
            ]} />
          </Reveal>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#111" bottomColor="#0a0a0a" />

      {/* ═══════════ 11. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>ABOUT IRON HORSE</h2>
            <div className="w-20 h-1.5 mb-10" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Iron Horse Garage has been Trail&rsquo;s trusted auto shop for over 25 years. What started as a one-bay operation has grown into a full-service facility staffed by ASE-certified technicians who live and breathe cars and trucks. We handle everything from routine maintenance and brake jobs to custom exhaust fabrication and full restorations. Our reputation is simple: honest diagnostics, fair pricing, and work that lasts. Whether you drive a daily commuter, a lifted 4x4, or a classic muscle car &mdash; Iron Horse treats every vehicle like our own.
            </p>
          </Reveal>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#0a0a0a" bottomColor="#111" />

      {/* ═══════════ 12. CONTACT — Split form + info ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>GET IN TOUCH</h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left: Form */}
            <Reveal>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>NAME</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#dc2626')} onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>PHONE</label>
                  <input type="tel" placeholder="(250) 555-0000" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#dc2626')} onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>VEHICLE</label>
                  <input type="text" placeholder="Year, make, model" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#dc2626')} onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>ISSUE / SERVICE NEEDED</label>
                  <textarea rows={4} placeholder="Describe what's happening or what service you need..." className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all resize-none" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#dc2626')} onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <motion.button type="submit" className={`${heading.className} w-full px-8 py-4 text-lg tracking-widest transition-all`} style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                  whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(220,38,38,0.5)', scale: 1.02 }}>
                  SEND MESSAGE
                </motion.button>
              </form>
            </Reveal>

            {/* Right: Info block */}
            <Reveal delay={0.15}>
              <div>
                <a href="tel:2505550199"
                  className={`${heading.className} block text-4xl md:text-5xl mb-8 transition-colors tracking-wider`}
                  style={{ color: '#dc2626' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 20px rgba(220,38,38,0.5)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  (250) 555-0199
                </a>
                <div className="space-y-6 mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <div style={{ borderLeft: '3px solid #dc2626', paddingLeft: '1rem' }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#dc2626' }}>ADDRESS</p>
                    <p>123 Sample St, Trail, BC</p>
                  </div>
                  <div style={{ borderLeft: '3px solid #dc2626', paddingLeft: '1rem' }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#dc2626' }}>HOURS</p>
                    <p>Mon–Fri: 8:00 AM – 5:30 PM</p>
                    <p>Saturday: 8:00 AM – 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                  <div style={{ borderLeft: '3px solid #dc2626', paddingLeft: '1rem' }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#dc2626' }}>EMAIL</p>
                    <p>info@ironhorsegarage.ca</p>
                  </div>
                  <div style={{ borderLeft: '3px solid #dc2626', paddingLeft: '1rem' }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#dc2626' }}>SERVICE AREA</p>
                    <p>Trail, Rossland, Castlegar &amp; the West Kootenays</p>
                  </div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#dc2626' }}>WALK-INS WELCOME</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>No appointment needed for oil changes, diagnostics, and quick services. Drop in during business hours.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <RedStripe />

      {/* ═══════════ 13. FOOTER ═══════════ */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className={`${heading.className} text-2xl tracking-wider block mb-3`} style={chromeGradient}>IRON HORSE GARAGE</span>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Full-service auto repair &amp; custom builds. Trail, BC.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              {['Services', 'Work', 'About', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium uppercase tracking-widest transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{link}</a>
              ))}
            </div>
          </div>
          <div className="mt-10 pt-6" style={{ borderTop: '1px solid #1a1a1a' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>&copy; 2025 Iron Horse Garage. All rights reserved.</span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>Serving Trail, Rossland &amp; the West Kootenays</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3" style={{ backgroundColor: 'rgba(17,17,17,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '2px solid #dc2626' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sample design by <strong className="text-white">Kootenay Made Digital</strong>
          </span>
          <Link href="/contact?style=automotive"
            className={`${heading.className} inline-block px-6 py-2.5 text-sm tracking-widest transition-all whitespace-nowrap`}
            style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(220,38,38,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            LIKE WHAT YOU SEE? LET&apos;S TALK &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
