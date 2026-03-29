'use client'

import { useState, useRef, useEffect } from 'react'
import { Space_Grotesk } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, AnimatePresence, useInView } from 'framer-motion'

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

/* ── Before/After Slider ───────────────────────────────────── */
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
              style={{ backgroundColor: '#111111', border: '1px solid rgba(255,107,0,0.3)', borderRadius: '0px', boxShadow: '0 8px 40px rgba(255,107,0,0.15), 0 2px 8px rgba(0,0,0,0.3)' }}>
              {/* Bold nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: '1px solid #222' }}>
                <motion.span className={`${spaceGrotesk.className} text-base sm:text-lg font-bold uppercase tracking-wider`} style={{ color: '#fff' }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span style={{ color: '#ff6b00' }}>VOLT</span> ELECTRIC CO.
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
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-12 flex-1 flex flex-col justify-center">
                {/* Angular circuit motif */}
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
                  <motion.h2 className={`${spaceGrotesk.className} text-2xl sm:text-4xl md:text-5xl font-bold uppercase leading-[1.1] mb-4 sm:max-w-xl`} style={{ color: '#ffffff' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    Your Competitor Launched Last Month. What Are You{' '}
                    <span className="relative inline-block" style={{ color: '#ff6b00' }}>
                      Waiting For?
                      <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                        <motion.path d="M4 8 C40 2, 80 2, 120 6 C140 8, 170 4, 196 6" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" fill="none"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur * 1.5, delay: stagger * 5, ease: 'easeOut' }} />
                      </motion.svg>
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
              {/* Shimmer border */}
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
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none"
              style={{ color: '#ff6b00', flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: prefersReduced ? 'none' : 'transform 0.3s ease' }}
            >
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   VOLT ELECTRIC CO. — Bold Modern Demo
   ══════════════════════════════════════════════════════════════ */
export default function BoldModernDemo() {
  const prefersReduced = useReducedMotion()

  return (
    <div className={spaceGrotesk.className} style={{ fontFamily: 'Space Grotesk, sans-serif', backgroundColor: '#111111', color: '#ffffff' }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
        @keyframes shimmer-border {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ─── 1. NAV ─────────────────────────────────────────── */}
      <nav style={{ backgroundColor: '#111111', borderBottom: '1px solid #222' }} className="relative z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xl md:text-2xl font-bold tracking-wider uppercase">
            <span style={{ color: '#ff6b00' }}>VOLT</span> ELECTRIC CO.
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['SERVICES', 'ABOUT', 'PROJECTS', 'CONTACT'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
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
        <div className="absolute top-0 left-0 w-2 md:w-3" style={{ backgroundColor: '#ff6b00', height: '60%', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <div className="max-w-5xl">
            <motion.div className="w-24 h-1.5 mb-8" style={{ backgroundColor: '#ff6b00' }}
              initial={prefersReduced ? {} : { scaleX: 0, transformOrigin: 'left' }}
              animate={prefersReduced ? {} : { scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
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
              Licensed electrical contractors serving residential and commercial clients across the West Kootenays.
            </motion.p>
            <motion.a href="#contact"
              className="inline-block mt-10 px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
              style={{ backgroundColor: '#ff6b00', color: '#111111', boxShadow: '0 0 0px rgba(255,107,0,0)' }}
              whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(255,107,0,0.5)', scale: 1.03 }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              GET A FREE QUOTE
            </motion.a>
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
          {['\u2605\u2605\u2605\u2605\u2605 5.0 RATING', '20+ YEARS', 'LICENSED & INSURED', '24/7 EMERGENCY'].map((item) => (
            <span key={item} className="text-sm md:text-base font-bold uppercase tracking-wider whitespace-nowrap" style={{ color: '#111111' }}>{item}</span>
          ))}
        </div>
      </section>

      <SlashDivider topColor="#ff6b00" bottomColor="#0a0a0a" />

      {/* ─── 4. SERVICES ────────────────────────────────────── */}
      <section id="services" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">WHAT WE BUILD FOR YOU</h2>
            <div className="w-20 h-1.5 mb-8" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>

          {/* PAS Copy */}
          <Reveal delay={0.1}>
            <div className="mb-12 max-w-2xl">
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                You&rsquo;re building the future — but your website looks like 2015. Investors and clients notice. The electrical company down the road is showing up on Google and booking the commercial jobs. They&rsquo;re not better than you — they just look better online.{' '}
                <span style={{ color: '#ff6b00', fontWeight: 700 }}>Let&rsquo;s fix that.</span>
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'CUSTOM WEBSITE', desc: 'A bold online presence that matches your brand\'s energy and professionalism. From $1,500.' },
              { title: 'GOOGLE VISIBILITY', desc: 'Show up when people search for electrical services in the Kootenays. From $500.' },
              { title: 'SMART BUSINESS TOOLS', desc: 'Automate quoting, scheduling, and follow-ups. AI Business Setup for $1,500.' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <motion.div
                  className="p-8 h-full transition-all cursor-default"
                  style={{ backgroundColor: '#111111', borderTop: '4px solid #ff6b00', boxShadow: '0 0 0px rgba(255,107,0,0)' }}
                  whileHover={prefersReduced ? {} : { scale: 1.05, boxShadow: '0 0 30px rgba(255,107,0,0.5)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <h3 className="text-xl font-bold uppercase mb-4" style={{ color: '#ff6b00' }}>{card.title}</h3>
                  <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{card.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── HOW IT WORKS ───────────────────────────────────── */}
      <section className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <AngularDeco className="absolute top-8 right-8 opacity-30 hidden lg:block" />
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">HOW IT WORKS</h2>
            <div className="w-20 h-1.5" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              { step: '01', title: 'WE TALK', desc: 'Free consultation. You tell us what you need, your goals, your competition. No obligation, no pressure.' },
              { step: '02', title: 'WE BUILD', desc: 'We design and develop your site in ~2 weeks. You get a bold, fast, modern presence built to convert.' },
              { step: '03', title: 'YOU GROW', desc: 'Launch, get found on Google, start getting calls. Real results, not just a pretty website.' },
            ].map((step, i) => (
              <Reveal key={step.step} delay={i * 0.15}>
                <div className="relative p-8" style={{ backgroundColor: '#0a0a0a', borderTop: '4px solid #ff6b00' }}>
                  <div className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#ff6b00', opacity: 0.3 }}>{step.step}</div>
                  <h3 className="text-xl font-bold uppercase mb-3" style={{ color: '#ffffff' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── 5. GALLERY / SHOWCASE ──────────────────────────── */}
      <section id="projects" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <AngularDeco className="absolute top-8 right-8 opacity-40 hidden lg:block" />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">RECENT PROJECTS</h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative w-full max-w-3xl mx-auto mb-12 overflow-hidden" style={{ borderBottom: '4px solid #ff6b00' }}>
              <Image src="/images/demos/bold-modern-showcase.webp" alt="Volt Electric Co. recent project showcase" width={800} height={500} className="w-full h-auto block" priority />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Commercial Wiring', 'Panel Upgrades', 'Smart Home', 'EV Charger Install'].map((label, i) => (
              <Reveal key={label} delay={0.1 + i * 0.1}>
                <div className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                  <Image src={`/images/demos/gallery/bm-${i + 1}.webp`} alt={label} fill className='object-cover' />
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                    <span className='text-white text-sm font-medium'>{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── THE TRANSFORMATION ─────────────────────────────── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">Watch Your Website Transform</h2>
            <div className="w-20 h-1.5 mb-4" style={{ backgroundColor: '#ff6b00' }} />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>From dated to designed — in real time</p>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveRedesign />
          </Reveal>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── TESTIMONIALS (3) ───────────────────────────────── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">WHAT CLIENTS SAY</h2>
            <div className="w-20 h-1.5" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'Our phones started ringing within two weeks of the new site going live. We had to hire a second crew. Best investment we ever made.', name: 'Jason M.', biz: 'JM Electrical Services', town: 'Castlegar' },
              { quote: 'We used to get zero calls from Google. Now we\'re booking 3–4 new jobs a week from people who found us online. Night and day difference.', name: 'Tyler K.', biz: 'Kootenay Power Solutions', town: 'Nelson' },
              { quote: 'The site looks exactly like our brand — bold, professional, no BS. Clients actually comment on it before we even start a job.', name: 'Marcus D.', biz: 'Volt & Watt Electric', town: 'Trail' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="p-8 h-full" style={{ backgroundColor: '#111111', borderTop: '4px solid #ff6b00' }}>
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => <span key={j} className="text-xl" style={{ color: '#ff6b00' }}>&#9733;</span>)}
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

      {/* ─── FAQ ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">COMMON QUESTIONS</h2>
            <div className="w-20 h-1.5" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={[
              { q: 'How long does a website take?', a: 'Most sites are live within 2–3 weeks. We work fast without cutting corners. You\'ll have a working draft to review in the first week.' },
              { q: 'What if I already have a website?', a: 'We redesign it from scratch or rebuild on a better platform. Either way, you end up with something you\'re proud to send clients to.' },
              { q: 'Do I need to provide content?', a: 'Not necessarily. We write the copy, help with photos, and build out the structure. You just need to tell us about your business.' },
              { q: 'What does a new website cost?', a: 'Custom websites start from $1,500. Google Visibility packages from $500. Book a free consultation and we\'ll give you an exact quote for your needs.' },
              { q: 'Can I update it myself?', a: 'Yes. We build on platforms you can manage without needing a developer. We also offer maintenance packages if you\'d rather focus on the job.' },
              { q: 'Will it actually help me get more jobs?', a: 'That\'s the whole point. We build sites that show up on Google and convert visitors into calls. If that\'s not happening, something\'s wrong and we fix it.' },
            ]} />
          </Reveal>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── 7. ABOUT ───────────────────────────────────────── */}
      <section id="about" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <DiamondDeco className="absolute bottom-10 right-10 opacity-30 hidden md:block" />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">ABOUT VOLT ELECTRIC</h2>
            <div className="w-20 h-1.5 mb-10" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Volt Electric Co. is a family-owned electrical contracting company with over 20 years of experience serving the Kootenays. We specialize in both residential and commercial electrical work, from full home rewires and panel upgrades to commercial tenant improvements and new construction. Our reputation is built on honest pricing, fast response times, and quality workmanship that stands the test of time.
            </p>
          </Reveal>
        </div>
      </section>

      <SlashDivider topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── 8. CONTACT ─────────────────────────────────────── */}
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
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >(250) 555-0180</a>
                <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>EMAIL</span>info@voltelectric.ca</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>AVAILABILITY</span>24/7 Emergency Service</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>SERVICE AREA</span>West Kootenays</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>NAME</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all" style={{ backgroundColor: '#111111', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>EMAIL</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all" style={{ backgroundColor: '#111111', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>MESSAGE</label>
                  <textarea rows={4} placeholder="Tell us about your project..." className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all resize-none" style={{ backgroundColor: '#111111', border: '1px solid #333' }}
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

      {/* ─── 9. FOOTER ──────────────────────────────────────── */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="text-xl font-bold uppercase tracking-tight block mb-3">VOLT ELECTRIC CO.</span>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Licensed electrical contractors serving the West Kootenays.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              {['SERVICES', 'ABOUT', 'PROJECTS', 'CONTACT'].map((link) => (
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
            <span className="text-xs font-bold" style={{ color: '#ff6b00' }}>(250) 555-0180</span>
          </div>
          <Link href="/contact?style=bold-modern"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{ backgroundColor: '#ff6b00', color: '#111111' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(255,107,0,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            Like What You See? Let's Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
