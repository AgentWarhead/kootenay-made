'use client'

import { Rajdhani, Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const heading = Rajdhani({
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

/* ── Angular clip-path divider ── */
function AngularDivider({ topColor = '#2d2d2d', bottomColor = '#1a1a1a' }: { topColor?: string; bottomColor?: string }) {
  return (
    <div style={{ backgroundColor: topColor, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14 block">
        <polygon fill={bottomColor} points="0,0 720,45 1440,0 1440,60 0,60" />
      </svg>
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

  const orange = '#ff6a00'
  const darkBg = '#1a1a1a'
  const medBg = '#2d2d2d'

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
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#2a4a6a', borderBottom: '3px solid #1a3a5a' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#5a8aaa' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>Kootenay Pro Plumbing</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Services', 'About', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Arial, sans-serif' }}>☰ Menu</span>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #5a8aaa 0%, #aaa 50%, #eee 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: 'Arial, sans-serif', color: '#666' }}>★ Welcome to Our Website ★</p>
                  <h2 className="text-xl sm:text-2xl md:text-4xl leading-tight mb-2" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700 }}>Kootenay Pro Plumbing</h2>
                  <p className="text-sm sm:text-lg mb-1" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>&ldquo;Serving the Area for Over 20 Years!&rdquo;</p>
                  <p className="text-xs sm:text-sm mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>Plumbing &bull; Heating &bull; Gas Fitting &bull; Drain Cleaning &bull; And More!</p>
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {['✓ Licensed', '✓ Bonded', '✓ 24/7 Emergency'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#2a4a6a', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg font-bold mb-3" style={{ fontFamily: 'Arial, sans-serif', color: '#2a4a6a' }}>📞 Call Us Today: (250) 555-0142</p>
                  <span className="inline-block px-6 py-2.5 text-sm cursor-default" style={{ backgroundColor: '#5a8aaa', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', border: '1px solid #2a4a6a' }}>
                    Request a Free Estimate
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
              style={{ backgroundColor: darkBg, border: `1px solid ${orange}30`, borderRadius: '16px', boxShadow: `0 8px 40px ${orange}15, 0 2px 8px rgba(0,0,0,0.3)` }}
            >
              
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/images/demos/trades-industrial-hero.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.9) 100%)' }} />
            </div>
{/* Elegant nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${orange}20` }}>
                <motion.span className={`${heading.className} text-base sm:text-xl font-bold uppercase`} style={{ color: '#fff' }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  KOOTENAY PRO <span style={{ color: orange }}>PLUMBING</span>
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Services', 'Projects', 'About', 'Contact'].map((link) => (
                    <span key={link} className={`${body.className} text-xs uppercase tracking-widest`} style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{link}</span>
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
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
                    <path d="M160 20 L180 20 L180 80 L160 80 L160 60 L140 60 L140 80 L120 80 L120 20 L140 20 L140 40 L160 40 Z" stroke={orange} strokeWidth="1.5" fill="none" />
                    <path d="M60 100 L200 100" stroke={orange} strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M60 120 L60 180 L80 180 L80 140 L100 140 L100 180 L120 180 L120 120 Z" stroke={orange} strokeWidth="1.5" fill="none" />
                    <circle cx="40" cy="160" r="12" stroke={orange} strokeWidth="1" fill="none" />
                    <circle cx="40" cy="160" r="5" fill={orange} opacity="0.3" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${body.className} text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full`}
                      style={{ backgroundColor: `${orange}18`, color: orange, border: `1px solid ${orange}30` }}>
                      Est. 2003 &mdash; West Kootenay
                    </span>
                  </motion.div>
                  <motion.h2 className={`${heading.className} text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4 sm:mb-6 font-bold uppercase`}
                    style={{ color: '#fff' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    YOUR PIPES BURST AT 2AM.{' '}
                    <span style={{ color: orange }}>
                      WE ANSWER.
                    </span>
                  </motion.h2>
                  <motion.p className={`${body.className} text-sm sm:text-lg max-w-md sm:mx-0 mx-auto mb-6`} style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Licensed plumbing, heating &amp; gas fitting. Available when you need us most.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className={`${heading.className} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] font-bold uppercase tracking-wider`}
                      style={{ backgroundColor: orange, color: '#fff', boxShadow: `0 4px 20px ${orange}40` }}>
                      Emergency Service — Call Now
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <span className={`${body.className} text-sm`} style={{ color: '#666' }}>No commitment required</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['24/7 Response', 'Licensed & Bonded', '500+ Jobs'].map((badge) => (
                      <span key={badge} className={`${body.className} text-xs`} style={{ color: orange, opacity: 0.7, letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
              {/* Shimmer border */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-[16px]" style={{ background: `linear-gradient(90deg, transparent, ${orange}, #ffaa00, ${orange}, transparent)`, animation: 'shimmer-border 3s linear infinite', backgroundSize: '200% 100%' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button onClick={() => setTransformed(!transformed)}
          className={`${body.className} text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{
            backgroundColor: transformed ? `${orange}15` : darkBg,
            color: transformed ? orange : '#999',
            border: `1.5px solid ${transformed ? `${orange}40` : '#333'}`,
            boxShadow: transformed ? `0 2px 12px ${orange}15` : '0 1px 4px rgba(0,0,0,0.3)',
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
        <div key={i} style={{ border: '1px solid rgba(138,155,176,0.15)', backgroundColor: '#1a1a1a' }}>
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            style={{ color: open === i ? '#ff6a00' : 'rgba(255,255,255,0.85)' }}
          >
            <span className={`${heading.className} text-lg md:text-xl font-semibold`}>{item.q}</span>
            <span className="text-xl ml-4 flex-shrink-0" style={{ color: '#ff6a00' }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div className="px-6 pb-5" style={{ color: 'rgba(255,255,255,0.65)', borderTop: '1px solid rgba(138,155,176,0.15)' }}>
              <p className="leading-relaxed pt-4">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SUMMIT PLUMBING & HEATING — Trades & Industrial Demo
   ══════════════════════════════════════════════════════════════ */
export default function TradesIndustrialDemo() {
  const prefersReduced = useReducedMotion()

  const toolsRef = useRef(null)
  const { scrollYProgress: toolsScroll } = useScroll({
    target: toolsRef,
    offset: ['start end', 'end start'],
  })
  const drawLength = useTransform(toolsScroll, [0, 0.5], [1, 0])

  return (
    <div className={`${body.className} overflow-x-hidden`} style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#2d2d2d', color: '#ffffff' }}>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @keyframes emergencyPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(255,106,0,0.4); background-color: #ff6a00; }
          50% { box-shadow: 0 0 24px rgba(255,40,0,0.8); background-color: #ff3300; }
        }
        @keyframes availablePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(34,197,94,0.8); }
          50% { opacity: 0.5; box-shadow: 0 0 16px rgba(34,197,94,0.4); }
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
      <nav style={{ backgroundColor: '#1a1a1a', borderBottom: '2px solid #ff6a00' }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className={`${heading.className} text-xl md:text-2xl font-bold uppercase tracking-wider`} style={{ color: '#ffffff' }}>
            SUMMIT PLUMBING <span style={{ color: '#ff6a00' }}>&amp;</span> HEATING
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Projects', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6a00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >{link}</a>
            ))}
            <a href="tel:2505550142" className="text-sm font-bold uppercase tracking-wider" style={{ color: '#ff6a00' }}>(250) 555-0142</a>
          </div>
          <a href="tel:2505550142" className="md:hidden text-sm font-bold" style={{ color: '#ff6a00' }}>(250) 555-0142</a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/demos/trades-industrial-hero.webp" alt="Summit Plumbing & Heating — professional plumbing work" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-0 left-0 w-3 md:w-4" style={{ backgroundColor: '#ff6a00', height: '70%', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <motion.div
            className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest text-white mb-8 rounded-sm"
            style={{ backgroundColor: '#ff6a00', animation: prefersReduced ? 'none' : 'emergencyPulse 2s ease-in-out infinite' }}
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
            animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            EMERGENCY 24/7
          </motion.div>

          <motion.a href="tel:2505550142"
            className={`${heading.className} block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 transition-colors`}
            style={{ color: '#ff6a00' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 30px rgba(255,106,0,0.6)')}
            onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
          >
            (250) 555-0142
          </motion.a>

          <motion.h1
            className={`${heading.className} text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight mb-6`}
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            KOOTENAY RELIABLE
          </motion.h1>

          <motion.p className="text-lg md:text-xl max-w-xl leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Plumbing, heating &amp; gas fitting for homes and businesses across the West Kootenays.
          </motion.p>

          <motion.a href="#contact"
            className={`${heading.className} inline-block px-10 py-4 text-base font-bold uppercase tracking-widest transition-all`}
            style={{ backgroundColor: '#ff6a00', color: '#ffffff' }}
            whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(255,106,0,0.6)', scale: 1.03 }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            GET A FREE QUOTE
          </motion.a>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <section style={{ backgroundColor: '#ff6a00' }} className="py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
          {['★★★★★ 5.0 Rating', '20+ Years', 'Licensed & Insured', '24/7 Emergency'].map((item) => (
            <span key={item} className={`${heading.className} text-sm md:text-base font-bold uppercase tracking-wider whitespace-nowrap`} style={{ color: '#ffffff' }}>{item}</span>
          ))}
        </div>
      </section>

      <AngularDivider topColor="#ff6a00" bottomColor="#1a0a0a" />

      {/* ═══════════ 4. EMERGENCY SECTION ═══════════ */}
      <section className="py-16 md:py-20 px-6" style={{ backgroundColor: '#1a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left: Emergency headline */}
            <Reveal>
              <div>
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6"
                  style={{ backgroundColor: 'rgba(255,106,0,0.2)', color: '#ff6a00', border: '1px solid rgba(255,106,0,0.4)' }}>
                  24/7 EMERGENCY RESPONSE
                </span>
                <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase mb-6 leading-tight`} style={{ color: '#ffffff' }}>
                  PIPES BURST?<br />
                  <span style={{ color: '#ff6a00' }}>HEAT OUT?</span><br />
                  GAS LEAK?
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  We don&apos;t let voicemail handle your emergency. When you call, a licensed technician answers — any hour, any day. We&apos;ve been there at 2am on Christmas Eve. We&apos;ll be there for you.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Burst Pipes', 'No Heat / Furnace', 'Gas Leak', 'Sewage Backup'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 text-xs font-bold uppercase"
                      style={{ backgroundColor: 'rgba(255,106,0,0.15)', color: '#ff6a00', border: '1px solid rgba(255,106,0,0.3)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right: MASSIVE phone + available indicator */}
            <Reveal delay={0.15}>
              <div className="text-center md:text-right">
                <div className="flex items-center justify-center md:justify-end gap-3 mb-4">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: '#22c55e',
                      boxShadow: '0 0 8px rgba(34,197,94,0.8)',
                      animation: prefersReduced ? 'none' : 'availablePulse 2s ease-in-out infinite',
                    }}
                  />
                  <span className={`${heading.className} text-base font-bold uppercase tracking-widest`} style={{ color: '#22c55e' }}>
                    AVAILABLE NOW
                  </span>
                </div>
                <a href="tel:2505550142"
                  className={`${heading.className} block text-5xl sm:text-6xl md:text-7xl font-bold leading-none transition-all`}
                  style={{ color: '#ff6a00' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 40px rgba(255,106,0,0.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  (250)<br />555-0142
                </a>
                <a href="tel:2505550142"
                  className={`${heading.className} inline-block mt-6 px-8 py-4 text-base font-bold uppercase tracking-widest`}
                  style={{ backgroundColor: '#ff6a00', color: '#ffffff', animation: prefersReduced ? 'none' : 'emergencyPulse 2s ease-in-out infinite' }}
                >
                  CALL NOW — WE ANSWER
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 5. LAST 5 JOBS TICKER ═══════════ */}
      <div style={{ backgroundColor: '#111', borderTop: '1px solid #222', borderBottom: '1px solid #222' }} className="py-0 overflow-hidden">
        <div style={{
          display: 'flex',
          animation: prefersReduced ? 'none' : 'tickerScroll 25s linear infinite',
          width: 'max-content',
        }}>
          {[...Array(2)].map((_, dupIdx) => (
            <div key={dupIdx} style={{ display: 'flex', alignItems: 'stretch' }}>
              {[
                { job: 'Burst pipe', location: 'Trail', time: '28 min response' },
                { job: 'Hot water heater', location: 'Castlegar', time: 'Same day' },
                { job: 'Gas line inspection', location: 'Nelson', time: '2 hr response' },
                { job: 'Sewer backup', location: 'Rossland', time: 'Emergency cleared' },
                { job: 'Boiler replacement', location: 'Fruitvale', time: 'Next morning' },
              ].map((item, i) => (
                <div key={`${dupIdx}-${i}`} className="flex items-center gap-3 px-6 py-4 flex-shrink-0"
                  style={{ borderRight: '1px solid #1e1e1e' }}>
                  <span className="text-base font-bold flex-shrink-0" style={{ color: '#22c55e' }}>✓</span>
                  <span className={`${heading.className} text-base font-bold uppercase tracking-wide whitespace-nowrap`} style={{ color: '#ffffff' }}>
                    {item.job}
                  </span>
                  <span className="text-sm whitespace-nowrap" style={{ color: '#555' }}>—</span>
                  <span className="text-sm whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.location}</span>
                  <span className="text-sm whitespace-nowrap" style={{ color: '#555' }}>—</span>
                  <span className="text-sm whitespace-nowrap font-bold" style={{ color: '#ff6a00' }}>{item.time}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AngularDivider topColor="#111" bottomColor="#2d2d2d" />

      {/* ═══════════ 6. SERVICES — Emergency-first grid ═══════════ */}
      <section id="services" ref={toolsRef} className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#2d2d2d' }}>
        {/* Drawing wrench SVG on scroll */}
        <motion.svg className="absolute top-1/2 right-12 -translate-y-1/2 hidden xl:block" width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ opacity: 0.12 }}>
          <motion.path d="M90 15a25 25 0 0 0-22.93 35.18L30 87.25a10 10 0 1 0 14.14 14.14L81.82 63.93A25 25 0 0 0 90 15z" stroke="#ff6a00" strokeWidth="2" fill="none" style={{ pathLength: prefersReduced ? 1 : drawLength }} />
        </motion.svg>
        <motion.svg className="absolute top-1/2 left-12 -translate-y-1/2 hidden xl:block" width="100" height="100" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.12 }}>
          <motion.path d="M8 14h12v6H8v14h6V22h12v12h6V22h8v-6h-8V8h-6v8H14V8H8v6z" stroke="#ff6a00" strokeWidth="1.5" fill="none" style={{ pathLength: prefersReduced ? 1 : drawLength }} />
        </motion.svg>

        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase mb-4`}>OUR SERVICES</h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>

          {/* Emergency card — full width, red */}
          <Reveal delay={0.05}>
            <div className="mb-6 p-8 relative overflow-hidden" style={{ backgroundColor: '#2a0a0a', border: '2px solid #ff6a00', borderLeft: '6px solid #ff6a00' }}>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest"
                  style={{ backgroundColor: '#ff6a00', color: '#ffffff', animation: prefersReduced ? 'none' : 'emergencyPulse 2s ease-in-out infinite' }}>
                  24/7 EMERGENCY
                </span>
              </div>
              <h3 className={`${heading.className} text-2xl md:text-3xl font-bold uppercase mb-3`} style={{ color: '#ff6a00' }}>
                EMERGENCY SERVICES
              </h3>
              <p className="mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                When it can&apos;t wait until morning. We answer calls 24 hours a day, 365 days a year. Licensed technicians dispatched fast — not a call centre.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Burst & Frozen Pipes', 'No Heat / Boiler Failure', 'Gas Leak Response', 'Sewage Backup'].map(item => (
                  <span key={item} className="px-3 py-1.5 text-sm font-bold uppercase"
                    style={{ backgroundColor: 'rgba(255,106,0,0.15)', color: '#ff6a00', border: '1px solid rgba(255,106,0,0.4)' }}>
                    ⚠ {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Standard services 2x3 grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: 'Plumbing Installations', icon: '🔧', desc: 'Fixtures, supply lines, rough-in, renovations' },
              { title: 'Heating Systems', icon: '🌡️', desc: 'Furnaces, boilers, radiant floor, heat pumps' },
              { title: 'Gas Fitting', icon: '🔥', desc: 'Licensed gas lines, appliance hookups, inspections' },
              { title: 'Drain & Sewer', icon: '🪠', desc: 'Hydro-jetting, video inspection, line repair' },
              { title: 'Water Heaters', icon: '💧', desc: 'Tank, tankless, heat pump — supply and install' },
              { title: 'Commercial', icon: '🏢', desc: 'Tenant build-outs, multi-unit, industrial service' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={0.1 + i * 0.08}>
                <div className="p-6 h-full transition-all cursor-default hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: '#1a1a1a', borderTop: '3px solid #ff6a00', border: '1px solid #333', borderTopWidth: '3px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(255,106,0,0.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <div className="text-2xl mb-3">{card.icon}</div>
                  <h3 className={`${heading.className} text-base md:text-lg font-bold uppercase mb-2`} style={{ color: '#ff6a00' }}>{card.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AngularDivider topColor="#2d2d2d" bottomColor="#1a1a1a" />

      {/* ═══════════ 7. RESPONSE ZONE MAP ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase mb-4`}>RESPONSE ZONE</h2>
            <p className="mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>We cover the West Kootenays — from Salmo to Nakusp, we come to you.</p>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative w-full rounded-lg overflow-hidden" style={{ backgroundColor: '#111', border: '1px solid #222', aspectRatio: '16/9' }}>
              {/* Stylized SVG map of West Kootenay */}
              <svg viewBox="0 0 800 450" className="w-full h-full" fill="none">
                {/* Background terrain hint */}
                <rect width="800" height="450" fill="#0a0a0a" />
                {/* Mountain shapes */}
                <polygon points="0,300 80,200 160,280 240,150 320,240 400,120 480,200 560,160 640,220 720,180 800,250 800,450 0,450" fill="rgba(255,106,0,0.04)" stroke="rgba(255,106,0,0.08)" strokeWidth="1" />
                {/* Columbia River (stylized) */}
                <path d="M200,50 C180,100 160,150 180,200 C200,250 220,280 200,350 C190,390 180,420 170,450" stroke="rgba(100,150,255,0.25)" strokeWidth="3" strokeDasharray="6 4" fill="none" />
                <path d="M400,0 C420,60 410,100 400,150 C390,200 380,240 360,290 C340,340 300,380 280,450" stroke="rgba(100,150,255,0.2)" strokeWidth="2" strokeDasharray="6 4" fill="none" />
                {/* Grid lines */}
                {[1,2,3].map(i => (
                  <line key={`h${i}`} x1="0" y1={i * 112} x2="800" y2={i * 112} stroke="rgba(255,106,0,0.05)" strokeWidth="1" />
                ))}
                {[1,2,3,4].map(i => (
                  <line key={`v${i}`} x1={i * 160} y1="0" x2={i * 160} y2="450" stroke="rgba(255,106,0,0.05)" strokeWidth="1" />
                ))}

                {/* City dots */}
                {[
                  { x: 300, y: 280, name: 'Trail', time: '15 min', main: true },
                  { x: 400, y: 200, name: 'Castlegar', time: '20 min', main: true },
                  { x: 220, y: 220, name: 'Rossland', time: '25 min', main: false },
                  { x: 500, y: 160, name: 'Nelson', time: '35 min', main: true },
                  { x: 180, y: 320, name: 'Fruitvale', time: '18 min', main: false },
                  { x: 350, y: 370, name: 'Salmo', time: '30 min', main: false },
                  { x: 580, y: 100, name: 'Nakusp', time: '80 min', main: false },
                ].map((city) => (
                  <g key={city.name}>
                    {/* Pulse ring */}
                    <circle cx={city.x} cy={city.y} r={city.main ? 18 : 12} fill="rgba(255,106,0,0.06)" stroke="rgba(255,106,0,0.2)" strokeWidth="1" />
                    {/* Main dot */}
                    <circle cx={city.x} cy={city.y} r={city.main ? 8 : 5} fill="#ff6a00" />
                    {/* City name */}
                    <text x={city.x} y={city.y - 22} textAnchor="middle" fill="#ffffff" fontSize={city.main ? "13" : "11"} fontWeight={city.main ? "700" : "400"} fontFamily="Inter, sans-serif">{city.name}</text>
                    {/* Response time */}
                    <text x={city.x} y={city.y + 28} textAnchor="middle" fill="#ff6a00" fontSize="10" fontFamily="Inter, sans-serif">~{city.time}</text>
                  </g>
                ))}

                {/* Legend */}
                <rect x="620" y="380" width="160" height="50" fill="rgba(0,0,0,0.6)" rx="4" />
                <circle cx="638" cy="398" r="5" fill="#ff6a00" />
                <text x="650" y="402" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="Inter, sans-serif">Response time from dispatch</text>
                <text x="630" y="420" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Inter, sans-serif">Actual times vary by location &amp; time of day</text>
              </svg>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-center text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Don&apos;t see your town? Call us — if you&apos;re in the West Kootenays, we come to you.
            </p>
          </Reveal>
        </div>
      </section>

      <AngularDivider topColor="#1a1a1a" bottomColor="#2d2d2d" />

      {/* ═══════════ 8. HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#2d2d2d' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase mb-4`}>HOW IT WORKS</h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'YOU CALL', desc: 'Phone or text (250) 555-0142. A licensed tech picks up — not a call centre. You describe the problem, we tell you how fast we can be there.' },
              { num: '02', title: 'WE SHOW UP', desc: 'Uniformed, identified technician arrives at the quoted time. We assess on-site, give you a firm price before touching anything.' },
              { num: '03', title: 'PROBLEM SOLVED', desc: 'We fix it right the first time. Clean up the workspace when we\'re done. You get a warranty on every job, signed invoice, and receipt.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.2}>
                <div className="text-center p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: '#1a1a1a', borderTop: '4px solid #ff6a00' }}>
                  <div className={`${heading.className} text-5xl font-bold mb-4`} style={{ color: '#ff6a00' }}>{step.num}</div>
                  <h3 className={`${heading.className} text-2xl font-bold uppercase mb-4`} style={{ color: '#ffffff' }}>{step.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AngularDivider topColor="#2d2d2d" bottomColor="#1a1a1a" />

      {/* ═══════════ 8B. RECENT JOBS — Photo Grid ═══════════ */}
      <section className="py-16 md:py-20 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-4xl font-bold uppercase mb-4`}>Jobs We&apos;ve Completed</h2>
            <div className="w-20 h-1.5 mb-10" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { src: '/images/demos/gallery/ti-1.webp', label: 'Plumbing Installation', location: 'Trail, BC' },
              { src: '/images/demos/gallery/ti-2.webp', label: 'Heating System', location: 'Castlegar, BC' },
              { src: '/images/demos/gallery/ti-3.webp', label: 'Gas Line Service', location: 'Nelson, BC' },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.12}>
                <div className="relative overflow-hidden rounded-sm" style={{ border: '1px solid #333' }}>
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                    <p className={`${heading.className} text-sm font-bold uppercase`} style={{ color: '#ff6a00' }}>{item.label}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AngularDivider topColor="#1a1a1a" bottomColor="#2d2d2d" />

      {/* ═══════════ 9. THE TRANSFORMATION ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase mb-4`}>Watch Your Website Transform</h2>
            <div className="w-20 h-1.5 mb-4" style={{ backgroundColor: '#ff6a00' }} />
            <p className="mb-12 text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.65)' }}>From dated to designed — in real time</p>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveRedesign />
          </Reveal>
        </div>
      </section>

      <AngularDivider topColor="#1a1a1a" bottomColor="#2d2d2d" />

      {/* ═══════════ 10. TESTIMONIALS — Speed-focused ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#2d2d2d' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase mb-4`}>WHAT CUSTOMERS SAY</h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Pipe burst at midnight. Called Summit, they were here in 45 minutes. Saved my hardwood floors. Worth every penny.',
                name: 'Karen B.',
                location: 'Trail, BC',
                tag: 'Emergency Response',
                highlight: '45 min response',
              },
              {
                quote: 'No heat in January at -20°C. Called at 7am, Dave had the furnace running before noon. Incredible.',
                name: 'Mark T.',
                location: 'Castlegar, BC',
                tag: 'Heating Emergency',
                highlight: 'Same morning',
              },
              {
                quote: 'Gas smell in the house. Called immediately, they were there within the hour. Professional, thorough, peace of mind.',
                name: 'Sandra M.',
                location: 'Nelson, BC',
                tag: 'Gas Leak Response',
                highlight: 'Under 1 hour',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ backgroundColor: '#1a1a1a', borderTop: '4px solid #ff6a00' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j} className="text-lg" style={{ color: '#ff6a00' }}>&#9733;</span>
                      ))}
                    </div>
                    <span className="text-xs font-bold px-2 py-1"
                      style={{ backgroundColor: 'rgba(255,106,0,0.15)', color: '#ff6a00', border: '1px solid rgba(255,106,0,0.3)' }}>
                      {t.tag}
                    </span>
                  </div>
                  <blockquote className="flex-1 leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="pt-4" style={{ borderTop: '1px solid #333' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`${heading.className} font-bold uppercase text-sm`} style={{ color: '#ff6a00' }}>{t.name}</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{t.location}</p>
                      </div>
                      <span className={`${heading.className} text-sm font-bold`} style={{ color: '#22c55e' }}>{t.highlight}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-8 text-center text-xs italic" style={{ color: 'rgba(255,255,255,0.25)' }}>
              (Sample reviews — your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      <AngularDivider topColor="#2d2d2d" bottomColor="#1a1a1a" />

      {/* ═══════════ 11. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase mb-4`}>COMMON QUESTIONS</h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={[
              { q: 'Do you really answer at 2am?', a: 'Yes. A licensed technician — not an answering service — picks up the phone 24/7. Emergencies don\'t follow business hours, and neither do we.' },
              { q: 'What areas do you cover?', a: 'The full West Kootenay region: Trail, Castlegar, Nelson, Rossland, Salmo, Fruitvale, Nakusp, and surrounding communities. Not sure if you\'re in our zone? Call us.' },
              { q: 'Do you give written estimates?', a: 'Always. We assess on-site and give you a firm written price before we start. No surprises on your invoice.' },
              { q: 'Are you licensed and insured?', a: 'Yes. Fully licensed, bonded, and insured in BC. All our technicians are licensed journeymen. We can provide proof of credentials on request.' },
              { q: 'What\'s your warranty?', a: 'All parts and labour covered for 1 year. If something we fixed fails within that period, we come back and fix it at no charge.' },
              { q: 'Can you handle commercial jobs?', a: 'Absolutely. We service commercial buildings, multi-unit residential, and light industrial. Ask about our commercial maintenance agreements.' },
            ]} />
          </Reveal>
        </div>
      </section>

      <AngularDivider topColor="#1a1a1a" bottomColor="#2d2d2d" />

      {/* ═══════════ 12. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#2d2d2d' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase mb-4`}>ABOUT SUMMIT</h2>
            <div className="w-20 h-1.5 mb-10" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Summit Plumbing &amp; Heating is a locally owned and operated company with over 20 years of experience keeping Kootenay homes and businesses running. From emergency pipe repairs at 2am to full heating system installations, we bring the same level of professionalism and care to every job. Licensed, insured, and committed to honest pricing &mdash; when you call Summit, you get a team that shows up on time, does the job right, and cleans up after. We&rsquo;re your neighbours, and we take pride in the work we do for this community.
            </p>
          </Reveal>
        </div>
      </section>

      <AngularDivider topColor="#2d2d2d" bottomColor="#1a1a1a" />

      {/* ═══════════ 13. CONTACT ═══════════ */}
      <section id="contact" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-2xl md:text-5xl font-bold uppercase mb-4`}>GET IN TOUCH</h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div>
                <a href="tel:2505550142"
                  className={`${heading.className} block text-4xl md:text-5xl font-bold mb-8 transition-colors`}
                  style={{ color: '#ff6a00' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 20px rgba(255,106,0,0.5)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  (250) 555-0142
                </a>
                <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6a00' }}>EMAIL</span>info@summitplumbing.ca</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6a00' }}>ADDRESS</span>123 Sample St, Castlegar, BC</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6a00' }}>AVAILABILITY</span>24/7 Emergency Service</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6a00' }}>SERVICE AREA</span>West Kootenays</p>
                </div>
                <div className="inline-block mt-8 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white rounded-sm"
                  style={{ backgroundColor: '#ff6a00', animation: prefersReduced ? 'none' : 'emergencyPulse 2s ease-in-out infinite' }}>
                  24/7 EMERGENCY — CALL NOW
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>NAME</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: '#2d2d2d', border: '1px solid rgba(138,155,176,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6a00')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(138,155,176,0.2)')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>EMAIL</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: '#2d2d2d', border: '1px solid rgba(138,155,176,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6a00')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(138,155,176,0.2)')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>MESSAGE</label>
                  <textarea rows={4} placeholder="Describe your plumbing or heating issue..." className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all resize-none"
                    style={{ backgroundColor: '#2d2d2d', border: '1px solid rgba(138,155,176,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6a00')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(138,155,176,0.2)')} />
                </div>
                <motion.button type="submit" className={`${heading.className} w-full px-8 py-4 text-base font-bold uppercase tracking-widest transition-all`}
                  style={{ backgroundColor: '#ff6a00', color: '#ffffff' }}
                  whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(255,106,0,0.5)', scale: 1.02 }}>
                  SEND MESSAGE
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <AngularDivider topColor="#1a1a1a" bottomColor="#2d2d2d" />

      {/* ═══════════ 14. FOOTER ═══════════ */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#2d2d2d', borderTop: '1px solid rgba(138,155,176,0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${heading.className} text-xl font-bold uppercase mb-3`} style={{ color: '#ff6a00' }}>Summit Plumbing &amp; Heating</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>Kootenay reliable. Licensed plumbing, heating &amp; gas fitting.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#ff6a00' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Services', 'Projects', 'About', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.65)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6a00')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#ff6a00' }}>Info</h4>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.65)' }}>24/7 Emergency Service</p>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.65)' }}>West Kootenays</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>(250) 555-0142</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(138,155,176,0.1)' }} className="pt-6 text-center">
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>&copy; {new Date().getFullYear()} Summit Plumbing &amp; Heating. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{ backgroundColor: 'rgba(26,26,26,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '2px solid #ff6a00' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sample design by <strong className="text-white">Kootenay Made Digital</strong>
          </span>
          <Link href="/contact?style=trades-industrial"
            className={`${heading.className} inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap`}
            style={{ backgroundColor: '#ff6a00', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(255,106,0,0.5)')}
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
