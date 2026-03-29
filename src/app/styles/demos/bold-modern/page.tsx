'use client'

import { useState, useRef } from 'react'
import { Space_Grotesk } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
})

/* ── Diagonal Slash Divider ───────────────────────────────── */
function SlashDivider({ flip = false, topColor = '#111111', bottomColor = '#0a0a0a' }: { flip?: boolean; topColor?: string; bottomColor?: string }) {
  const points = flip ? '0,0 1440,60 0,60' : '0,0 1440,0 1440,60'
  return (
    <div style={{ backgroundColor: topColor, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16 block">
        <polygon fill={bottomColor} points={points} />
      </svg>
    </div>
  )
}

/* ── Section Reveal Wrapper ───────────────────────────────── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Decorative Angular SVG ───────────────────────────────── */
function AngularDeco({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0L120 40V120L0 80V0Z" fill="#ff6b00" fillOpacity="0.08" />
      <path d="M20 10L110 45V110L20 75V10Z" stroke="#ff6b00" strokeOpacity="0.15" strokeWidth="1" />
    </svg>
  )
}

function DiamondDeco({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 0L60 30L30 60L0 30L30 0Z" fill="#ff6b00" fillOpacity="0.06" />
    </svg>
  )
}

/* ── Live Redesign Component ─────────────────────────────────── */
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
        <motion.div className="h-[2px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? '#ff6b00' : '#333' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }}
            className={`${spaceGrotesk.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? '#ff6b00' : 'rgba(255,255,255,0.3)' }}>
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div className="h-[2px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? '#ff6b00' : '#333' }} layout transition={{ duration: 0.4 }} />
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
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#2a2a2a', borderBottom: '3px solid #1a1a1a' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6" style={{ backgroundColor: '#ff6b00', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>Volt Electric</span>
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
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #555 0%, #888 50%, #ccc 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: 'Arial, sans-serif', color: '#666' }}>★ Welcome to Our Website ★</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700 }}>
                    Volt Electric
                  </h2>
                  <p className="text-sm sm:text-lg mb-1" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>
                    &ldquo;Innovative. Scalable. Dynamic.&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>
                    Commercial &bull; Residential &bull; Industrial &bull; EV Chargers &bull; Solar
                  </p>
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {['✓ Licensed Master Electrician', '✓ Insured', '✓ Free Quotes'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs" style={{ backgroundColor: '#2a2a2a', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm font-bold mb-3" style={{ fontFamily: 'Arial, sans-serif', color: '#555' }}>📞 Call Us: (250) 555-0180</p>
                  <span className="inline-block px-6 py-2.5 text-sm" style={{ backgroundColor: '#555', color: '#fff', fontFamily: 'Arial, sans-serif', cursor: 'default' }}>
                    Get a Free Quote
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
              style={{ backgroundColor: '#111111', border: '1px solid rgba(255,107,0,0.3)', borderRadius: '4px', boxShadow: '0 8px 40px rgba(255,107,0,0.15), 0 2px 8px rgba(0,0,0,0.3)', overflow: 'hidden' }}>

            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/images/demos/bold-modern-showcase.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)' }} />
            </div>
              {/* Diagonal accent line — angular hero design */}
              <motion.div className="absolute pointer-events-none" style={{ top: 0, right: 0, width: '100%', height: '100%', zIndex: 0 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 2 }}>
                <svg width="100%" height="100%" viewBox="0 0 480 480" preserveAspectRatio="none" fill="none">
                  <line x1="340" y1="0" x2="480" y2="480" stroke="#ff6b00" strokeWidth="1.5" strokeOpacity="0.12" />
                  <line x1="380" y1="0" x2="480" y2="260" stroke="#ff6b00" strokeWidth="0.8" strokeOpacity="0.08" />
                </svg>
              </motion.div>
              {/* Bold nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4 relative z-10" style={{ borderBottom: '1px solid #222' }}>
                <motion.span className={`text-base sm:text-lg font-bold uppercase tracking-wider`} style={{ color: '#ff6b00', fontFamily: "'Clash Display', sans-serif" }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  Volt Electric
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['SERVICES', 'ABOUT', 'PROJECTS', 'CONTACT'].map((link) => (
                    <span key={link} className={`${spaceGrotesk.className} text-xs font-medium uppercase tracking-widest`} style={{ color: 'rgba(255,107,0,0.7)' }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px]" style={{ backgroundColor: '#ff6b00' }} />
                  <span className="block w-4 h-[2px]" style={{ backgroundColor: '#ff6b00' }} />
                  <span className="block w-5 h-[2px]" style={{ backgroundColor: '#ff6b00' }} />
                </motion.div>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-12 flex-1 flex flex-col justify-center z-10">
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="200" height="200" viewBox="0 0 160 160" fill="none">
                    <path d="M160 0 L160 80 L120 80 L120 40 L80 40 L80 0Z" fill="#ff6b00" />
                    <path d="M140 0 L140 60 L100 60 L100 20 L60 20 L60 0Z" fill="#ff6b00" opacity="0.3" />
                    <line x1="80" y1="40" x2="80" y2="160" stroke="#ff6b00" strokeWidth="0.5" />
                    <line x1="120" y1="80" x2="160" y2="80" stroke="#ff6b00" strokeWidth="0.5" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div initial={{ opacity: 0, scaleX: 0, transformOrigin: 'left' }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <div className="w-16 h-1 mb-4 mx-auto sm:mx-0" style={{ backgroundColor: '#ff6b00' }} />
                  </motion.div>
                  <motion.div className="flex justify-center sm:justify-start mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${spaceGrotesk.className} text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5`} style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: '#ff6b00', border: '1px solid rgba(255,107,0,0.25)' }}>
                      West Kootenays &mdash; 20+ Years
                    </span>
                  </motion.div>
                  <motion.h2 className={`heading-font text-2xl sm:text-4xl md:text-5xl font-bold uppercase leading-[1.1] mb-4 sm:max-w-xl`} style={{ color: '#ffffff', fontFamily: "'Clash Display', sans-serif" }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    Your Competitor Launched Last Month. What Are You{' '}
                    <span style={{ color: '#ff6b00' }}>
                      Waiting For?
                    </span>
                  </motion.h2>
                  <motion.p className={`${spaceGrotesk.className} text-sm sm:text-base max-w-sm mx-auto sm:mx-0 mb-6`} style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Licensed electrical contractors. Bold results. Same-day quotes.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className={`${spaceGrotesk.className} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm transition-all hover:scale-[1.03] active:scale-[0.97] uppercase tracking-wider font-bold`}
                      style={{ backgroundColor: '#ff6b00', color: '#111111', boxShadow: '0 4px 20px rgba(255,107,0,0.4)' }}>
                      Let&rsquo;s Build It
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <span className={`${spaceGrotesk.className} text-sm`} style={{ color: 'rgba(255,255,255,0.25)' }}>No commitment required</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['Master Electrician', '300+ Projects', 'Same-Day Quotes'].map((badge) => (
                      <span key={badge} className={`${spaceGrotesk.className} text-xs font-bold uppercase tracking-wider`} style={{ color: 'rgba(255,107,0,0.6)' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
              <motion.div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #ff6b00, #ffaa55, #ff6b00, transparent)', backgroundSize: '200% 100%' }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button onClick={() => setTransformed(!transformed)}
          className={`${spaceGrotesk.className} text-sm font-bold px-6 py-3 uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{ backgroundColor: transformed ? 'rgba(255,107,0,0.12)' : 'transparent', color: transformed ? '#ff6b00' : 'rgba(255,255,255,0.3)', border: `1px solid ${transformed ? 'rgba(255,107,0,0.3)' : '#333'}` }}>
          {transformed ? '← See the Before' : '✨ Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ── FAQ Accordion ─────────────────────────────────────────── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} style={{ backgroundColor: '#111111', borderTop: open === i ? '4px solid #ff6b00' : '4px solid #222', borderLeft: '1px solid #222', borderRight: '1px solid #222', borderBottom: '1px solid #222' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
            aria-expanded={open === i}
          >
            <span className="text-base font-bold uppercase tracking-wide" style={{ color: open === i ? '#ff6b00' : '#ffffff' }}>{item.q}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
              style={{ color: '#ff6b00', flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: prefersReduced ? 'none' : 'transform 0.3s ease' }}>
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   VOLT ELECTRIC CO. — Bold Modern Demo
   Order: Nav → Hero → Trust Bar → Licensed Band → Services Grid →
          Project Data Grid → Gallery → EV/Solar Spotlight →
          Estimate Form → Transformation → Testimonials → FAQ →
          About → Contact → Footer
   ══════════════════════════════════════════════════════════════ */
export default function BoldModernDemo() {
  const prefersReduced = useReducedMotion()

  return (
    <div className={spaceGrotesk.className} style={{ fontFamily: 'Space Grotesk, sans-serif', backgroundColor: '#111111', color: '#ffffff' }}>
      <style>{`
      @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
      .heading-font { font-family: 'Clash Display', sans-serif; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
        @keyframes shimmer-border {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>

      {/* ─── 1. NAV ─────────────────────────────────────────── */}
      <nav style={{ backgroundColor: '#111111', borderBottom: '1px solid #222' }} className="relative z-40 px-6 py-4 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xl md:text-2xl font-bold tracking-wider uppercase">
            <span style={{ color: '#ff6b00' }}>VOLT</span> ELECTRIC CO.
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['SERVICES', 'PROJECTS', 'ABOUT', 'CONTACT'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                {link}
              </a>
            ))}
            <a href="tel:2505550180" className="text-sm font-bold uppercase tracking-wider" style={{ color: '#ff6b00' }}>
              (250) 555-0180
            </a>
          </div>
          <a href="tel:2505550180" className="md:hidden text-sm font-bold" style={{ color: '#ff6b00' }}>(250) 555-0180</a>
        </div>
      </nav>

      {/* ─── 2. HERO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex items-center" style={{ backgroundColor: '#111111' }}>
        <AngularDeco className="absolute top-10 right-10 opacity-60 hidden md:block" />
        <AngularDeco className="absolute bottom-32 right-1/4 opacity-40 rotate-180 hidden lg:block" />
        <DiamondDeco className="absolute top-1/3 right-20 opacity-50 hidden md:block" />
        <DiamondDeco className="absolute bottom-1/4 left-10 opacity-30" />
        {/* Orange diagonal accent */}
        <div className="absolute top-0 left-0 w-2 md:w-3" style={{ backgroundColor: '#ff6b00', height: '60%', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <div className="max-w-5xl">
            <motion.div className="w-24 h-1.5 mb-8" style={{ backgroundColor: '#ff6b00' }}
              initial={prefersReduced ? {} : { scaleX: 0, transformOrigin: 'left' }}
              animate={prefersReduced ? {} : { scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            {/* Stats row */}
            <motion.div
              className="flex flex-wrap gap-6 mb-8"
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { n: '300+', label: 'Projects Completed' },
                { n: '20+', label: 'Years Licensed' },
                { n: '24/7', label: 'Emergency Service' },
              ].map((stat) => (
                <div key={stat.n} className="pr-6" style={{ borderRight: '1px solid #333' }}>
                  <p className="text-2xl md:text-3xl font-bold" style={{ color: '#ff6b00' }}>{stat.n}</p>
                  <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.9] tracking-tight"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              initial={prefersReduced ? {} : { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
              animate={prefersReduced ? {} : { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            >
              POWERING<br />
              <span style={{ color: '#ff6b00' }}>THE</span>{' '}KOOTENAYS
            </motion.h1>
            <motion.p className="text-lg md:text-xl max-w-xl mt-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Master-licensed electrical contractors. Residential, commercial, industrial — and now leading on EV chargers and solar installations.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-10"
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <a href="#estimate"
                className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
                style={{ backgroundColor: '#ff6b00', color: '#111111', boxShadow: '0 0 0 rgba(255,107,0,0)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(255,107,0,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 rgba(255,107,0,0)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
              >
                GET A SAME-DAY QUOTE
              </a>
              <a href="tel:2505550180"
                className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
                style={{ border: '2px solid rgba(255,107,0,0.4)', color: '#ff6b00' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ff6b00' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)' }}
              >
                (250) 555-0180
              </a>
            </motion.div>
          </div>
          <svg className="absolute bottom-10 right-6 md:right-16 opacity-20 hidden sm:block" width="200" height="200" viewBox="0 0 200 200" fill="none">
            <rect x="20" y="20" width="160" height="160" stroke="#ff6b00" strokeWidth="1" transform="rotate(15 100 100)" />
            <rect x="40" y="40" width="120" height="120" stroke="#ff6b00" strokeWidth="1" transform="rotate(30 100 100)" />
            <rect x="60" y="60" width="80" height="80" stroke="#ff6b00" strokeWidth="1" transform="rotate(45 100 100)" />
          </svg>
        </div>
      </section>

      {/* ─── 3. TRUST BAR ───────────────────────────────────── */}
      <section style={{ backgroundColor: '#ff6b00' }} className="py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
          {['★★★★★ 5.0 RATING', '20+ YEARS', 'MASTER LICENSED', '24/7 EMERGENCY'].map((item) => (
            <span key={item} className="text-sm md:text-base font-bold uppercase tracking-wider whitespace-nowrap" style={{ color: '#111111' }}>{item}</span>
          ))}
        </div>
      </section>

      <SlashDivider topColor="#ff6b00" bottomColor="#0a0a0a" />

      {/* ─── 4. LICENSED & CERTIFIED BAND ─────────────────── */}
      <section style={{ backgroundColor: '#0a0a0a' }} className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-center text-xs uppercase tracking-[0.3em] mb-6" style={{ color: 'rgba(255,107,0,0.6)' }}>
              Credentials &amp; Certifications
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { label: 'Master Electrician', sub: 'Licence #BC-0042817', icon: '🏅' },
                { label: 'ESA Certified', sub: 'Electrical Safety Authority', icon: '⚡' },
                { label: 'ECRA Member', sub: 'Electrical Contractors Reg.', icon: '📋' },
                { label: 'WorkSafeBC', sub: 'Certificate of Recognition', icon: '🦺' },
              ].map((cred) => (
                <div key={cred.label} className="text-center">
                  <div className="text-2xl mb-2">{cred.icon}</div>
                  <p className="text-sm font-bold uppercase tracking-wider" style={{ color: '#ffffff' }}>{cred.label}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{cred.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── 5. SERVICES — What We Power Icon Grid ──────────── */}
      <section id="services" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">WHAT WE POWER</h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: '🏠', label: 'RESIDENTIAL', count: '150+', desc: 'Rewires, panel upgrades, outlets, lighting — everything for your home.', isNew: false },
              { icon: '🏢', label: 'COMMERCIAL', count: '90+', desc: 'Tenant improvements, new construction, retail fit-outs, office builds.', isNew: false },
              { icon: '🏭', label: 'INDUSTRIAL', count: '40+', desc: 'Heavy equipment, machine wiring, 3-phase power, manufacturing plants.', isNew: false },
              { icon: '⚡', label: 'EV CHARGERS', count: '75+', desc: 'Level 2 home chargers and commercial fleet charging stations.', isNew: true },
              { icon: '🌞', label: 'SOLAR', count: '20+', desc: 'Grid-tied solar installations and battery storage system integration.', isNew: true },
              { icon: '🚨', label: 'EMERGENCY', count: '24/7', desc: 'We answer. Always. Power failures, electrical faults, arc flash.', isNew: false },
            ].map((svc) => (
              <Reveal key={svc.label}>
                <motion.div
                  className="p-6 md:p-8 h-full relative transition-all cursor-default"
                  style={{ backgroundColor: '#0a0a0a', borderTop: `4px solid ${svc.label === 'EMERGENCY' ? '#cc0000' : '#ff6b00'}` }}
                  whileHover={prefersReduced ? {} : { scale: 1.03, boxShadow: `0 0 30px rgba(255,107,0,0.3)` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {svc.isNew && (
                    <span className="absolute top-3 right-3 text-xs font-bold uppercase tracking-wider px-2 py-0.5" style={{ backgroundColor: '#ff6b00', color: '#111111' }}>
                      NEW
                    </span>
                  )}
                  <div className="text-3xl mb-3">{svc.icon}</div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-base md:text-lg font-bold uppercase tracking-wide" style={{ color: '#ffffff' }}>{svc.label}</h3>
                    <span className="text-sm font-bold" style={{ color: 'rgba(255,107,0,0.8)' }}>{svc.count} completed</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{svc.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── 6. PROJECT DATA GRID ────────────────────────────── */}
      <section id="projects" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <AngularDeco className="absolute top-8 right-8 opacity-40 hidden lg:block" />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">RECENT PROJECTS</h2>
            <div className="w-20 h-1.5 mb-4" style={{ backgroundColor: '#ff6b00' }} />
            <p className="mb-12 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Commercial clients want capability. Here&rsquo;s what we&rsquo;ve delivered.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { type: 'COMMERCIAL', scope: 'Full electrical fit-out for 8,000 sqft restaurant including 200A service, kitchen hood exhaust, emergency lighting', badge: 'COMPLETE' },
              { type: 'RESIDENTIAL', scope: 'Complete rewire of 1960s heritage home, panel upgrade from 60A to 200A, EV charger rough-in for garage', badge: 'COMPLETE' },
              { type: 'EV CHARGING', scope: 'Fleet charging station installation — 6x Level 2 chargers for municipal works yard, load management system', badge: 'COMPLETE' },
              { type: 'INDUSTRIAL', scope: '3-phase power upgrade for woodworking facility, 480V distribution panel, machine wiring for CNC router', badge: 'COMPLETE' },
              { type: 'SOLAR', scope: '12.6kW grid-tied solar array on commercial warehouse, SolarEdge inverter, net-metering application', badge: 'COMPLETE' },
              { type: 'EMERGENCY', scope: 'After-hours main breaker failure at Nelson hotel, 150 guests, full service restored within 3 hours', badge: '★ CASE STUDY' },
            ].map((proj, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className="p-6 h-full"
                  style={{ backgroundColor: '#111111', border: '1px solid #222', borderLeft: '4px solid #ff6b00' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#ff6b00' }}>{proj.type}</span>
                    <span className="text-xs font-bold px-2 py-0.5" style={{ backgroundColor: 'rgba(255,107,0,0.15)', color: '#ff6b00' }}>{proj.badge}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{proj.scope}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Gallery row */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Commercial Wiring', 'Panel Upgrades', 'Smart Home', 'EV Charger Install'].map((label, i) => (
                <div key={label} className="relative aspect-[4/3] overflow-hidden" style={{ borderBottom: '4px solid #ff6b00' }}>
                  <Image src={`/images/demos/gallery/bm-${i + 1}.webp`} alt={label} fill className="object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.8) 0%, transparent 50%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.8)' }}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── 7. EV & SOLAR SPOTLIGHT ─────────────────────────── */}
      <section className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-3xl md:text-5xl font-bold uppercase">FUTURE-PROOF YOUR PROPERTY</h2>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 flex-shrink-0" style={{ backgroundColor: '#ff6b00', color: '#111111' }}>GROWTH SERVICES</span>
            </div>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: '⚡',
                title: 'EV CHARGER INSTALLATION',
                sub: 'Residential & Commercial',
                points: [
                  'Level 2 home chargers from $650 installed',
                  'Commercial fleet charging stations',
                  'Load management & smart charging systems',
                  'BC Hydro rebate application assistance',
                  'Permits and inspection handled',
                ],
                cta: 'Get EV Quote',
              },
              {
                icon: '🌞',
                title: 'SOLAR INSTALLATIONS',
                sub: 'Grid-Tied & Battery Storage',
                points: [
                  'Residential rooftop solar from 4kW–20kW',
                  'Commercial & industrial scale arrays',
                  'Battery storage integration (Tesla Powerwall)',
                  'Net-metering application with FortisBC',
                  'Full permitting and inspection',
                ],
                cta: 'Get Solar Quote',
              },
            ].map((svc) => (
              <Reveal key={svc.title}>
                <div className="p-8 h-full" style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,107,0,0.2)', borderTop: '4px solid #ff6b00' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{svc.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-wide" style={{ color: '#ff6b00' }}>{svc.title}</h3>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{svc.sub}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {svc.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        <span style={{ color: '#ff6b00', flexShrink: 0 }}>→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a href="#estimate"
                    className="inline-block px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all"
                    style={{ backgroundColor: '#ff6b00', color: '#111111' }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    {svc.cta}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── 8. GET YOUR ESTIMATE FORM ────────────────────────── */}
      <section id="estimate" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">GET YOUR ESTIMATE</h2>
            <div className="w-20 h-1.5 mb-4" style={{ backgroundColor: '#ff6b00' }} />
            <p className="mb-12 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Fill this in and we call you back the same day. No auto-responders. A real person.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>NAME</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: '#111111', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>PHONE</label>
                  <input type="tel" placeholder="(250) 555-0000" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: '#111111', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>PROJECT TYPE</label>
                <select className="w-full px-4 py-3 text-white outline-none transition-all"
                  style={{ backgroundColor: '#111111', border: '1px solid #333', colorScheme: 'dark' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#333')}>
                  <option value="">Select project type</option>
                  <option>Residential — panel, wiring, outlets</option>
                  <option>Commercial — fit-out, new construction</option>
                  <option>Industrial — 3-phase, heavy equipment</option>
                  <option>EV Charger — home or commercial</option>
                  <option>Solar — grid-tied or battery storage</option>
                  <option>Emergency — I need help now</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>PROJECT DESCRIPTION</label>
                <textarea rows={4} placeholder="Tell us what you need — size, scope, timeline, anything relevant..."
                  className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all resize-none"
                  style={{ backgroundColor: '#111111', border: '1px solid #333' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
              </div>
              <motion.button type="submit"
                className="w-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all"
                style={{ backgroundColor: '#ff6b00', color: '#111111' }}
                whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(255,107,0,0.5)', scale: 1.02 }}>
                REQUEST SAME-DAY QUOTE
              </motion.button>
            </form>
          </Reveal>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── 9. THE TRANSFORMATION ─────────────────────────── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">WATCH YOUR WEBSITE TRANSFORM</h2>
            <div className="w-20 h-1.5 mb-4" style={{ backgroundColor: '#ff6b00' }} />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>From dated to designed — in real time</p>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveRedesign />
          </Reveal>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── 10. TESTIMONIALS ───────────────────────────────── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">WHAT CLIENTS SAY</h2>
            <div className="w-20 h-1.5" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'Our phones started ringing within two weeks of the new site going live. We had to hire a second crew. Best investment we ever made.', name: 'Jason M.', biz: 'JM Electrical Services', town: 'Castlegar', type: 'Commercial' },
              { quote: 'We used to get zero calls from Google. Now we\'re booking 3–4 new jobs a week from people who found us online. Night and day difference.', name: 'Tyler K.', biz: 'Kootenay Power Solutions', town: 'Nelson', type: 'Residential' },
              { quote: 'The site looks exactly like our brand — bold, professional, no BS. Clients actually comment on it before we even start a job.', name: 'Marcus D.', biz: 'Volt & Watt Electric', town: 'Trail', type: 'Commercial' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="p-8 h-full" style={{ backgroundColor: '#111111', borderTop: '4px solid #ff6b00' }}>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => <span key={j} className="text-xl" style={{ color: '#ff6b00' }}>★</span>)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5" style={{ backgroundColor: 'rgba(255,107,0,0.15)', color: '#ff6b00' }}>{t.type}</span>
                  </div>
                  <blockquote className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>&ldquo;{t.quote}&rdquo;</blockquote>
                  <p className="text-sm font-bold uppercase tracking-wider" style={{ color: '#ff6b00' }}>&mdash; {t.name}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.biz} &middot; {t.town}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4} className="mt-6">
            <p className="text-center text-xs italic" style={{ color: 'rgba(255,255,255,0.2)' }}>(Sample reviews &mdash; your real reviews go here)</p>
          </Reveal>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── 11. FAQ ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">COMMON QUESTIONS</h2>
            <div className="w-20 h-1.5" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={[
              { q: 'Do you handle permits and inspections?', a: 'Yes. We pull all necessary permits, schedule electrical inspections, and handle all paperwork with Technical Safety BC. You don\'t lift a finger.' },
              { q: 'How quickly can you quote?', a: 'Same day for most projects. We do a site visit or a detailed phone consultation and get you a written quote within 24 hours.' },
              { q: 'Are you certified for EV charger installation?', a: 'Yes. We\'re certified Level 2 EV charger installers. We also handle the BC Hydro and FortisBC rebate applications — some homeowners get up to $600 back.' },
              { q: 'What makes you different from other electricians?', a: 'We specialize in modern growth services — EV chargers, solar, smart home wiring. Most older shops don\'t. And we\'re one of the few in the region doing commercial-scale solar.' },
              { q: 'Do you offer financing for larger projects?', a: 'Yes. We partner with a local finance company for projects over $5,000. Monthly payment options available. Ask us when you call for a quote.' },
              { q: 'What areas do you serve?', a: 'Nelson, Castlegar, Trail, Rossland, Salmo, and throughout the West Kootenays. We\'ll travel for larger commercial jobs — just ask.' },
            ]} />
          </Reveal>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── 12. ABOUT ──────────────────────────────────────── */}
      <section id="about" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <DiamondDeco className="absolute bottom-10 right-10 opacity-30 hidden md:block" />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">ABOUT VOLT ELECTRIC</h2>
            <div className="w-20 h-1.5 mb-10" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Volt Electric Co. is a family-owned electrical contracting company with over 20 years of experience serving the West Kootenays. We started doing residential service calls and panel upgrades — and we still do that work with the same care.
                </p>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Today we&rsquo;re one of the region&rsquo;s leading installers for EV charging infrastructure and solar energy systems. We&rsquo;re not chasing trends — we&rsquo;re building expertise where the industry is heading.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: '300+', label: 'Jobs Completed' },
                  { n: '20+', label: 'Years in Business' },
                  { n: '75+', label: 'EV Chargers Installed' },
                  { n: '100%', label: 'Licensed & Insured' },
                ].map((stat) => (
                  <div key={stat.n} className="p-6 text-center" style={{ backgroundColor: '#111111', borderTop: '3px solid #ff6b00' }}>
                    <p className="text-3xl font-bold mb-1" style={{ color: '#ff6b00' }}>{stat.n}</p>
                    <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SlashDivider topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── 13. CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">GET IN TOUCH</h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div>
                <a href="tel:2505550180" className="block text-4xl md:text-5xl font-bold mb-6 transition-colors" style={{ color: '#ff6b00' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 20px rgba(255,107,0,0.5)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}>
                  (250) 555-0180
                </a>
                <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>EMAIL</span>info@voltelectric.ca</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>ADDRESS</span>123 Sample St, Nelson, BC</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>AVAILABILITY</span>24/7 Emergency Service</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>SERVICE AREA</span>West Kootenays</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>NAME</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all" style={{ backgroundColor: '#0a0a0a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>EMAIL</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all" style={{ backgroundColor: '#0a0a0a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>MESSAGE</label>
                  <textarea rows={4} placeholder="Tell us about your project..." className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all resize-none" style={{ backgroundColor: '#0a0a0a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <motion.button type="submit" className="w-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all" style={{ backgroundColor: '#ff6b00', color: '#111111' }}
                  whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(255,107,0,0.5)', scale: 1.02 }}>
                  SEND MESSAGE
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <SlashDivider flip topColor="#111111" bottomColor="#0d0d0d" />

      {/* ─── 14. FOOTER ──────────────────────────────────────── */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="text-xl font-bold uppercase tracking-tight block mb-3">VOLT ELECTRIC CO.</span>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Licensed electrical contractors serving the West Kootenays.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              {['SERVICES', 'PROJECTS', 'ABOUT', 'CONTACT'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium uppercase tracking-widest transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b00')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{link}</a>
              ))}
            </div>
          </div>
          <div className="mt-10 pt-6" style={{ borderTop: '1px solid #1a1a1a' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>&copy; 2025 Volt Electric Co. All rights reserved.</span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>Serving Nelson, Castlegar, Trail &amp; the West Kootenays</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── STICKY BOTTOM BAR ──────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3" style={{ backgroundColor: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '2px solid #ff6b00' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Sample design by <strong className="text-white">Kootenay Made Digital</strong></span>
            <span className="hidden sm:inline text-xs" style={{ color: 'rgba(255,107,0,0.5)' }}>·</span>
            <span className="text-xs font-bold" style={{ color: '#ff6b00' }}>(250) 555-0000</span>
          </div>
          <Link href="/contact?style=bold-modern"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{ backgroundColor: '#ff6b00', color: '#111111' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(255,107,0,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}>
            Like What You See? Let&rsquo;s Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
