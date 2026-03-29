'use client'

import { useState, useRef } from 'react'
import { DM_Sans } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] })

/* ── Scroll-reveal wrapper ── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 32 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

/* ── Audio Visualizer Bars ── */
function AudioVisualizer() {
  const prefersReduced = useReducedMotion()
  const bars = [
    { keyframe: 'audioBar1', duration: '0.8s', delay: '0s',    minH: 40, maxH: 100 },
    { keyframe: 'audioBar2', duration: '1.1s', delay: '0.1s',  minH: 60, maxH: 110 },
    { keyframe: 'audioBar3', duration: '0.7s', delay: '0.2s',  minH: 50, maxH: 90  },
    { keyframe: 'audioBar4', duration: '1.3s', delay: '0.05s', minH: 70, maxH: 120 },
    { keyframe: 'audioBar5', duration: '0.9s', delay: '0.3s',  minH: 45, maxH: 95  },
    { keyframe: 'audioBar6', duration: '1.0s', delay: '0.15s', minH: 55, maxH: 115 },
    { keyframe: 'audioBar7', duration: '0.75s', delay: '0.25s', minH: 40, maxH: 80 },
    { keyframe: 'audioBar8', duration: '1.2s', delay: '0.35s', minH: 65, maxH: 105 },
    { keyframe: 'audioBar9', duration: '0.85s', delay: '0.08s', minH: 50, maxH: 90 },
    { keyframe: 'audioBar10', duration: '1.05s', delay: '0.2s', minH: 60, maxH: 118 },
  ]
  return (
    <div className="flex items-end gap-1.5" style={{ height: '130px' }} aria-hidden="true">
      {bars.map((bar, i) => (
        <div key={i} style={{ width: '8px', height: `${bar.minH}px`, background: '#e91e8a', boxShadow: '0 0 8px #e91e8a, 0 0 20px rgba(233,30,138,0.6)', borderRadius: '2px 2px 0 0', animation: prefersReduced ? 'none' : `${bar.keyframe} ${bar.duration} ease-in-out ${bar.delay} infinite` }} />
      ))}
    </div>
  )
}

/* ── Live Redesign (music-entertainment) ─────────────────────── */
function LiveRedesign() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [transformed, setTransformed] = useState(false)

  const dur = prefersReduced ? 0.01 : 0.9
  const stagger = prefersReduced ? 0 : 0.18

  const pink = '#e91e8a'
  const blue = '#3b82f6'
  const black = '#000000'

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-center gap-3 mb-5">
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? pink : '#333' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className={`${dmSans.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? pink : '#555' }}
          >{transformed ? '✨ After' : 'Before'}</motion.span>
        </AnimatePresence>
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? pink : '#333' }} layout transition={{ duration: 0.4 }} />
      </div>

      <div className="relative w-full" style={{ height: '480px' }}>
        <AnimatePresence mode="wait">
          {!transformed ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)', transition: { duration: 0.5 } }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: '#f2f0ed', border: '1px solid #d8d4cf', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#1a0a12', borderBottom: '3px solid #0d0508' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#e91e8a' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>Neon Pines</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Shows', 'Events', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>&#9776; Menu</span>
              </div>
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 md:py-16 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #1a0a12 0%, #e91e8a 50%, #3b82f6 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2 sm:mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#666', letterSpacing: '0.15em' }}>&#9733; Welcome to Our Website &#9733;</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2 sm:mb-3" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700 }}>Neon Pines</h2>
                  <p className="text-sm sm:text-lg mb-1 sm:mb-2" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>&ldquo;Live Music Every Weekend!&rdquo;</p>
                  <p className="text-xs sm:text-sm mb-4 sm:mb-6" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>Live Shows &bull; DJ Nights &bull; Private Events &bull; Merch &bull; Bar</p>
                  <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                    {['✓ All Ages Shows', '✓ VIP Available', '✓ Sound System'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#1a0a12', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#1a0a12' }}>&#128222; Call Us Today: (250) 555-0114</p>
                  <span className="inline-block px-6 py-2.5 text-sm" style={{ backgroundColor: '#e91e8a', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', border: '1px solid #1a0a12', cursor: 'default' }}>Check Our Facebook for Details</span>
                  <p className="mt-4 sm:mt-6 text-xs" style={{ color: '#bbb', fontFamily: 'Arial, sans-serif' }}>Powered by WordPress | Theme: Twenty Twenty-Three</p>
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
              style={{ backgroundColor: black, border: `1px solid ${pink}30`, borderRadius: '16px', boxShadow: `0 8px 40px ${pink}15, 0 2px 8px rgba(0,0,0,0.3)` }}
            >
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${pink}20` }}>
                <motion.span className={`heading-font text-xl sm:text-2xl tracking-widest`} style={{ color: pink, letterSpacing: '0.12em', textShadow: `0 0 10px ${pink}` }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  NEON PINES
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Shows', 'Venue', 'About', 'Contact'].map((link) => (
                    <span key={link} className={`${dmSans.className} text-xs uppercase tracking-widest`} style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: pink }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: pink }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: pink }} />
                </motion.div>
              </div>
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-10 flex-1 flex flex-col justify-center overflow-hidden">
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="240" height="240" viewBox="0 0 180 180" fill="none">
                    <line x1="180" y1="0" x2="120" y2="180" stroke={pink} strokeWidth="1" />
                    <line x1="160" y1="0" x2="100" y2="180" stroke={blue} strokeWidth="0.8" />
                    <line x1="140" y1="0" x2="80" y2="180" stroke={pink} strokeWidth="0.5" opacity="0.5" />
                    <path d="M130 20 L160 60 L130 100" stroke={pink} strokeWidth="1" fill="none" strokeLinecap="round" />
                    <circle cx="150" cy="40" r="3" fill={pink} opacity="0.6" />
                    <circle cx="160" cy="80" r="2" fill={blue} opacity="0.5" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${dmSans.className} text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full`} style={{ backgroundColor: `${pink}15`, color: pink, border: `1px solid ${pink}30` }}>
                      Est. 2016 &mdash; Nelson, BC
                    </span>
                  </motion.div>
                  <motion.h2 className={`heading-font text-3xl sm:text-5xl md:text-6xl leading-[1.05] mb-4 sm:mb-5`}
                    style={{ color: '#ffffff', letterSpacing: '0.04em' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    Saturday Sold Out.{' '}
                    <span className="relative inline-block" style={{ color: pink, textShadow: `0 0 20px ${pink}` }}>
                      Friday&rsquo;s Going Fast.
                      <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 260 12" fill="none">
                        <motion.path d="M4 8 L260 4" stroke={pink} strokeWidth="2" strokeLinecap="round" fill="none"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur * 1.5, delay: stagger * 5, ease: 'easeOut' }} />
                      </motion.svg>
                    </span>
                  </motion.h2>
                  <motion.p className={`${dmSans.className} text-sm sm:text-lg max-w-md sm:mx-0 mx-auto mb-6 sm:mb-8`}
                    style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    The Kootenays&rsquo; most intimate live music venue. Real sound. Real nights. Nelson, BC.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className={`${dmSans.className} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-widest rounded-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
                      style={{ backgroundColor: pink, color: '#fff', boxShadow: `0 4px 20px ${pink}40`, letterSpacing: '0.12em' }}>
                      Get Tickets
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-5 sm:mt-8 flex-wrap"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['200+ Shows/Year', '300 Capacity', 'Pro Sound'].map((badge) => (
                      <span key={badge} className={`${dmSans.className} text-xs`} style={{ color: pink, opacity: 0.7, letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${pink}, ${blue}, ${pink})`, backgroundSize: '200% 100%', animation: 'shimmer-border 3s linear infinite' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setTransformed(!transformed)}
          className={`${dmSans.className} text-sm font-medium px-6 py-3 rounded-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{ backgroundColor: transformed ? `${'#e91e8a'}15` : '#111', color: transformed ? '#e91e8a' : 'rgba(255,255,255,0.6)', border: `1.5px solid ${transformed ? `${'#e91e8a'}40` : 'rgba(255,255,255,0.15)'}`, boxShadow: transformed ? `0 2px 12px ${'#e91e8a'}15` : 'none' }}
        >
          {transformed ? '← See the Before' : '✨ Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ── FAQ Accordion (neon style) ── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg overflow-hidden" style={{ backgroundColor: '#111111', border: '1px solid rgba(233,30,138,0.2)', borderLeftWidth: open === i ? '4px' : '1px', borderLeftColor: open === i ? '#e91e8a' : 'rgba(233,30,138,0.2)' }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
            aria-expanded={open === i}>
            <span className={`heading-font text-xl tracking-wider`} style={{ color: open === i ? '#e91e8a' : '#ffffff', letterSpacing: '0.04em' }}>{item.q}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
              style={{ color: '#e91e8a', flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: prefersReduced ? 'none' : 'transform 0.3s ease' }}>
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   NEON PINES MUSIC VENUE — Music & Entertainment Demo
   ══════════════════════════════════════════════════════════════ */
export default function MusicEntertainmentPage() {
  const prefersReduced = useReducedMotion()

  const upcomingShows = [
    { day: 'FRI', date: 'MAR 28', time: '8:00 PM', artist: 'Mountain Echo', genre: 'Indie Folk', price: '$25', soldOut: false },
    { day: 'SAT', date: 'MAR 29', time: '9:00 PM', artist: 'The Drift', genre: 'Rock', price: '$20', soldOut: true },
    { day: 'FRI', date: 'APR 4', time: '8:00 PM', artist: 'Cedar Smoke', genre: 'Blues', price: '$30', soldOut: false },
    { day: 'SAT', date: 'APR 5', time: '7:00 PM', artist: 'Open Mic Night', genre: 'Various', price: 'Free', soldOut: false },
    { day: 'FRI', date: 'APR 11', time: '9:00 PM', artist: 'Valley Ghost', genre: 'Electronic', price: '$22', soldOut: false },
    { day: 'SAT', date: 'APR 12', time: '8:00 PM', artist: 'The Kootenay Collective', genre: 'Jazz', price: '$28', soldOut: true },
  ]

  return (
    <div className={dmSans.className} style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh' }}>
      <style>{`
      @import url('https://api.fontshare.com/v2/css?f[]=melodrama@400,500,700&display=swap');
      .heading-font { font-family: 'Melodrama', sans-serif; }
        @keyframes audioBar1  { 0%,100% { height: 40px }  50% { height: 100px } }
        @keyframes audioBar2  { 0%,100% { height: 60px }  50% { height: 110px } }
        @keyframes audioBar3  { 0%,100% { height: 50px }  50% { height:  90px } }
        @keyframes audioBar4  { 0%,100% { height: 70px }  50% { height: 120px } }
        @keyframes audioBar5  { 0%,100% { height: 45px }  50% { height:  95px } }
        @keyframes audioBar6  { 0%,100% { height: 55px }  50% { height: 115px } }
        @keyframes audioBar7  { 0%,100% { height: 40px }  50% { height:  80px } }
        @keyframes audioBar8  { 0%,100% { height: 65px }  50% { height: 105px } }
        @keyframes audioBar9  { 0%,100% { height: 50px }  50% { height:  90px } }
        @keyframes audioBar10 { 0%,100% { height: 60px }  50% { height: 118px } }
        .neon-heading { text-shadow: 0 0 20px #e91e8a, 0 0 40px #e91e8a, 0 0 80px rgba(233,30,138,0.5); }
        .neon-heading-sm { text-shadow: 0 0 10px #e91e8a, 0 0 25px rgba(233,30,138,0.6); }
        .neon-blue { text-shadow: 0 0 10px #3b82f6, 0 0 25px rgba(59,130,246,0.5); }
        .show-card { background: #0d0d0d; border: 1px solid rgba(233,30,138,0.15); transition: background 0.2s ease, border-color 0.2s ease; }
        .show-card:hover { background: rgba(233,30,138,0.06); border-color: rgba(233,30,138,0.3); }
        .venue-tile { background: #111; border: 1px solid rgba(255,255,255,0.06); transition: border-color 0.2s ease; }
        .venue-tile:hover { border-color: rgba(233,30,138,0.3); }
        @keyframes shimmer-border { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes neon-pulse { 0%,100% { box-shadow: 0 0 8px rgba(233,30,138,0.4), 0 0 20px rgba(233,30,138,0.2); } 50% { box-shadow: 0 0 16px rgba(233,30,138,0.7), 0 0 40px rgba(233,30,138,0.35); } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav className="sticky top-0 z-50 px-6 md:px-12 py-4"
        style={{ backgroundColor: '#000000', borderBottom: '1px solid rgba(233,30,138,0.2)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/styles/demos/music-entertainment" className={`heading-font text-2xl md:text-3xl tracking-widest neon-heading-sm`} style={{ color: '#e91e8a', letterSpacing: '0.12em' }}>NEON PINES</Link>
          <div className="hidden md:flex items-center gap-8">
            {['Shows', 'Venue', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium uppercase tracking-widest transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e91e8a')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>{item}</a>
            ))}
            <a href="tel:2505550114" className="text-sm font-bold tracking-wider transition-colors duration-200" style={{ color: '#e91e8a' }}
              onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 10px #e91e8a')}
              onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}>(250) 555-0114</a>
          </div>
          <a href="tel:2505550114" className="md:hidden text-sm font-bold" style={{ color: '#e91e8a' }}>(250) 555-0114</a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <Image src="/images/demos/music-entertainment-hero.webp" alt="Neon Pines Music Venue — live music in Nelson BC" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-0" style={{ flex: 1 }}>
          <motion.p className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Live Music &middot; Nelson, BC
          </motion.p>
          <motion.h1 className={`heading-font neon-heading`}
            style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)', lineHeight: 1, color: '#ffffff', letterSpacing: '0.04em', marginBottom: '1.5rem', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 40 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
            WHERE THE<br /><span style={{ color: '#e91e8a' }}>MOUNTAINS ROCK</span>
          </motion.h1>
          <motion.p className="text-base md:text-xl font-normal max-w-2xl mx-auto mb-4" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
            Saturday Sold Out. <span style={{ color: '#e91e8a', fontWeight: 700 }}>Friday&rsquo;s Going Fast.</span>
          </motion.p>
          <motion.div initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <a href="#shows" className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300" style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.14em', animation: prefersReduced ? 'none' : 'neon-pulse 2s ease-in-out infinite' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d6187e' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e91e8a' }}>
              Get Tickets
            </a>
          </motion.div>
        </div>
        <div className="relative z-10 flex justify-center pb-10 pt-12"><AudioVisualizer /></div>
      </section>

      {/* ═══════════ 3. UPCOMING SHOWS ═══════════ */}
      <section id="shows" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`heading-font text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>ON STAGE</p>
            <h2 className={`heading-font text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>Upcoming Shows</h2>
            <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Direct tickets. No DMs. No Eventbrite fees.</p>
          </Reveal>
          <div className="flex flex-col gap-3">
            {upcomingShows.map((show, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="show-card rounded-lg px-5 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Date block */}
                  <div className="flex-shrink-0 text-center min-w-[64px]">
                    <div className={`heading-font text-2xl leading-none`} style={{ color: '#e91e8a', letterSpacing: '0.04em' }}>{show.day}</div>
                    <div className="text-xs font-bold mt-1" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>{show.date}</div>
                  </div>
                  {/* Separator */}
                  <div className="hidden sm:block w-px h-12 flex-shrink-0" style={{ backgroundColor: 'rgba(233,30,138,0.2)' }} />
                  {/* Artist info */}
                  <div className="flex-1">
                    <div className={`heading-font text-xl md:text-2xl`} style={{ color: show.soldOut ? 'rgba(255,255,255,0.35)' : '#ffffff', letterSpacing: '0.04em', textDecoration: show.soldOut ? 'line-through' : 'none' }}>
                      {show.artist}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(233,30,138,0.15)', color: '#e91e8a', border: '1px solid rgba(233,30,138,0.2)' }}>{show.genre}</span>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{show.time} &mdash; Doors 30 min before</span>
                    </div>
                  </div>
                  {/* Price + CTA */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className={`heading-font text-2xl`} style={{ color: show.price === 'Free' ? '#3b82f6' : show.soldOut ? 'rgba(255,255,255,0.2)' : '#e91e8a', letterSpacing: '0.04em' }}>{show.soldOut ? '—' : show.price}</span>
                    {show.soldOut ? (
                      <span className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.08)' }}>Sold Out</span>
                    ) : (
                      <a href="#contact" className="text-xs font-bold uppercase tracking-widest px-4 py-2 transition-all duration-200" style={{ border: '1px solid rgba(233,30,138,0.4)', color: 'rgba(255,255,255,0.7)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e91e8a'; e.currentTarget.style.color = '#e91e8a'; e.currentTarget.style.boxShadow = '0 0 12px rgba(233,30,138,0.3)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(233,30,138,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.boxShadow = 'none' }}>
                        Tickets
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 4. THE VENUE ═══════════ */}
      <section id="venue" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`heading-font text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>THE SPACE</p>
            <h2 className={`heading-font text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>The Venue</h2>
            <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>Everything booking agents and event planners need to know about the room.</p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-14">
            {[
              { icon: '🎤', label: 'Capacity', value: '300 Guests' },
              { icon: '🔊', label: 'Sound System', value: 'QSC K12.2 Line Array' },
              { icon: '💡', label: 'Lighting', value: 'Full LED Rig' },
              { icon: '🎭', label: 'Stage', value: '20×16 ft' },
              { icon: '🛋️', label: 'Green Room', value: 'Private W/ Shower' },
              { icon: '🍺', label: 'Full Bar', value: 'Local Craft + Spirits' },
              { icon: '🌟', label: 'VIP Area', value: 'Reserved Seating' },
              { icon: '🅿️', label: 'Parking', value: 'Free Street + Lot' },
            ].map((tile) => (
              <div key={tile.label} className="venue-tile rounded-lg p-5 text-center">
                <div className="text-2xl mb-2">{tile.icon}</div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#e91e8a' }}>{tile.label}</div>
                <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{tile.value}</div>
              </div>
            ))}
          </div>
          <Reveal delay={0.1} className="mb-14">
            <div className="overflow-hidden rounded-lg w-full max-w-4xl mx-auto" style={{ border: '1px solid rgba(233,30,138,0.25)' }}>
              <Image src="/images/demos/music-entertainment-showcase.webp" alt="Neon Pines — live show showcase" width={960} height={520} className="w-full h-auto block" style={{ objectFit: 'cover' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 5. PAST SHOWS COLLAGE ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`heading-font text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>THE WALL OF FAME</p>
            <h2 className={`heading-font text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>Past Shows</h2>
          </Reveal>
          {/* Grungy overlapping collage — tilted cards */}
          <Reveal delay={0.1}>
            <div className="relative flex flex-wrap gap-2 justify-center items-start" style={{ minHeight: '320px' }}>
              {[
                { img: '/images/demos/gallery/me-1.webp', label: 'Main Stage', date: 'MAR 2025', rotate: '-2deg', zIndex: 3 },
                { img: '/images/demos/gallery/me-2.webp', label: 'Intimate Sets', date: 'FEB 2025', rotate: '1.5deg', zIndex: 2 },
                { img: '/images/demos/gallery/me-3.webp', label: 'Private Events', date: 'JAN 2025', rotate: '-1deg', zIndex: 4 },
              ].map((photo, i) => (
                <div key={photo.label}
                  className="relative overflow-hidden rounded transition-transform hover:scale-105"
                  style={{ transform: `rotate(${photo.rotate})`, zIndex: photo.zIndex, border: '2px solid rgba(233,30,138,0.2)', flex: '1 1 260px', maxWidth: '320px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                  <div className="relative aspect-[4/3]">
                    <Image src={photo.img} alt={photo.label} fill className="object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className={`heading-font text-base tracking-wider`} style={{ color: '#ffffff' }}>{photo.label}</span>
                    <span className="text-xs font-bold" style={{ color: '#e91e8a' }}>{photo.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ DIGITAL SERVICES ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-8">
            <p className={`heading-font text-sm tracking-[0.25em] mb-3 neon-blue`} style={{ color: '#3b82f6' }}>AMPLIFY YOUR PRESENCE</p>
            <h2 className={`heading-font text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>Digital Services</h2>
          </Reveal>
          <Reveal delay={0.1} className="text-center mb-14">
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Fans can&apos;t find your next show and venues can&apos;t find your press kit. The band down the road is selling out because people can actually find them online.{' '}
              <span style={{ color: '#e91e8a', fontWeight: 700 }}>We fix that.</span>
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Custom Website', desc: 'Tickets, events, merch — all in one place. A site as electric as your shows. From $1,500.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id="sg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e91e8a" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs><rect x="2" y="3" width="20" height="14" rx="2" stroke="url(#sg1)" strokeWidth="1.5" /><line x1="8" y1="21" x2="16" y2="21" stroke="url(#sg1)" strokeWidth="1.5" strokeLinecap="round" /><line x1="12" y1="17" x2="12" y2="21" stroke="url(#sg1)" strokeWidth="1.5" strokeLinecap="round" /></svg> },
              { title: 'Social Media', desc: 'Build a following that shows up every weekend. Behind-the-scenes content, show announcements. Full Brand from $4,000.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id="sg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e91e8a" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs><circle cx="18" cy="5" r="3" stroke="url(#sg2)" strokeWidth="1.5" /><circle cx="6" cy="12" r="3" stroke="url(#sg2)" strokeWidth="1.5" /><circle cx="18" cy="19" r="3" stroke="url(#sg2)" strokeWidth="1.5" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="url(#sg2)" strokeWidth="1.5" strokeLinecap="round" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="url(#sg2)" strokeWidth="1.5" strokeLinecap="round" /></svg> },
              { title: 'Email Marketing', desc: 'Your fans want to know about every show. Newsletter campaigns that fill the room. From $750.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id="sg3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e91e8a" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs><rect x="2" y="4" width="20" height="16" rx="2" stroke="url(#sg3)" strokeWidth="1.5" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="url(#sg3)" strokeWidth="1.5" strokeLinecap="round" /></svg> },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.12}>
                <div className="rounded-lg p-8 h-full" style={{ background: '#111111', borderTop: '3px solid #e91e8a' }}>
                  <div className="mb-5">{card.icon}</div>
                  <h3 className={`heading-font text-2xl md:text-3xl mb-3`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ARTIST REVIEWS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`heading-font text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>ARTIST ENDORSEMENTS</p>
            <h2 className={`heading-font text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>What Artists Say</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'Best sound system between Vancouver and Calgary. The room sounds incredible at every volume. We\'ll be back every tour.', name: 'Mountain Echo', role: 'Indie Folk — Nelson', tag: 'Sound' },
              { quote: 'The green room, the stage setup, the sound engineer — Neon Pines runs the most professional intimate venue we\'ve played. Period.', name: 'The Drift', role: 'Rock Band — Fernie', tag: 'Production' },
              { quote: 'Our manager was booking us on reputation alone after our first Neon Pines show. Best room in the Kootenays, no contest.', name: 'Cedar Smoke', role: 'Blues — Revelstoke', tag: 'Atmosphere' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="rounded-lg px-8 py-10 h-full relative" style={{ backgroundColor: '#111111', border: '1px solid rgba(233,30,138,0.15)', borderTopWidth: '4px', borderTopColor: '#e91e8a' }}>
                  <span className="absolute top-4 right-4 text-xs font-bold uppercase tracking-widest px-2 py-1 rounded" style={{ backgroundColor: 'rgba(233,30,138,0.15)', color: '#e91e8a' }}>{t.tag}</span>
                  <div className="text-xl mb-5" style={{ color: '#e91e8a' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <blockquote className="text-base leading-relaxed mb-5 italic" style={{ color: 'rgba(255,255,255,0.8)' }}>&ldquo;{t.quote}&rdquo;</blockquote>
                  <p className={`heading-font text-lg tracking-wider`} style={{ color: '#e91e8a' }}>{t.name}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4} className="mt-6">
            <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>(Sample reviews &mdash; your real reviews go here)</p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ NEWSLETTER ═══════════ */}
      <section className="py-20 md:py-24 px-6" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(233,30,138,0.15)', borderBottom: '1px solid rgba(233,30,138,0.15)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className={`heading-font text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>STAY IN THE LOOP</p>
            <h2 className={`heading-font text-3xl md:text-5xl neon-heading-sm mb-4`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>Never Miss a Show</h2>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>New show alerts, presale codes, artist announcements. No spam. Ever.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="your@email.com" className="flex-1 px-5 py-4 text-sm outline-none" style={{ backgroundColor: '#111', border: '1px solid rgba(233,30,138,0.3)', color: '#fff', borderRadius: '0' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#e91e8a')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(233,30,138,0.3)')} />
              <button type="submit" className="px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all" style={{ backgroundColor: '#e91e8a', color: '#fff', letterSpacing: '0.12em' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d6187e'; e.currentTarget.style.boxShadow = '0 0 20px rgba(233,30,138,0.5)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e91e8a'; e.currentTarget.style.boxShadow = 'none' }}>
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ THE TRANSFORMATION ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className={`heading-font text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>THE TRANSFORMATION</p>
            <h2 className={`heading-font text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>Watch Your Website Transform</h2>
            <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>From dated to designed — in real time</p>
          </Reveal>
          <LiveRedesign />
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`heading-font text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>GOT QUESTIONS</p>
            <h2 className={`heading-font text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>FAQ</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={[
              { q: 'How do I buy tickets?', a: 'Click "Tickets" on any show listing above. We sell direct — no Eventbrite fees, no DMs. Pay online, get a confirmation email.' },
              { q: 'Do you allow all ages?', a: 'Most shows are all ages. Some late-night DJ sets are 19+. The listing will always specify. Under-19s must be accompanied by a guardian for 19+ events.' },
              { q: 'Can I book the venue for a private event?', a: 'Yes. Private bookings available for corporate events, album launches, birthdays, and weddings. Full buyout includes sound tech, lighting, and bar. Contact us for pricing.' },
              { q: 'What\'s your refund policy?', a: 'Tickets are non-refundable but transferable. If we cancel or postpone a show, you\'ll get a full refund or credit — always.' },
              { q: 'Are you looking to book artists?', a: 'Yes, always. Send your EPK (bio, links, tech rider) to booking@neonpines.ca. We respond to every submission within 2 weeks.' },
              { q: 'Is the venue accessible?', a: 'Yes. Ground floor entry, accessible washrooms, and reserved accessible seating available at the front. Contact us in advance and we\'ll take care of you.' },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ backgroundColor: '#000000' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,138,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '5%', right: '-10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <p className={`heading-font text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>OUR STORY</p>
            <h2 className={`heading-font text-4xl md:text-6xl neon-heading-sm mb-8`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>About Neon Pines</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Neon Pines opened in Nelson, BC in 2016 with one mission: to give live music a home in the mountains. What started as a modest stage in an old brick building has grown into the Kootenays&apos; most beloved venue.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              With a capacity of 300 and acoustics that punch way above their weight, we offer an intimate show experience unlike anything you&apos;ll find in a large city. All ages are welcome, the bar is cold, and the music is always loud.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <div className="flex justify-center gap-10 flex-wrap">
              {[{ value: '200+', label: 'Shows/Year' }, { value: '300', label: 'Capacity' }, { value: '8+', label: 'Years Running' }].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`heading-font text-4xl md:text-5xl neon-heading-sm`} style={{ color: '#e91e8a', letterSpacing: '0.04em' }}>{stat.value}</div>
                  <div className="text-xs font-medium uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`heading-font text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>GET IN TOUCH</p>
            <h2 className={`heading-font text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>Contact &amp; Booking</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div className="space-y-7">
                {[{ label: 'Phone', val: '(250) 555-0114', href: 'tel:2505550114' }, { label: 'Email', val: 'info@neonpines.ca', href: 'mailto:info@neonpines.ca' }, { label: 'Capacity', val: '300 Guests — All Ages', href: null }, { label: 'Location', val: '123 Sample St, Nelson, BC', href: null }].map((item) => (
                  <div key={item.label}>
                    <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>{item.label}</h3>
                    {item.href ? <a href={item.href} className="text-base font-medium transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e91e8a')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>{item.val}</a> : <p className="text-base font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{item.val}</p>}
                  </div>
                ))}
                <a href="mailto:booking@neonpines.ca" className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 mt-2" style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.14em' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d6187e'; e.currentTarget.style.boxShadow = '0 0 28px rgba(233,30,138,0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e91e8a'; e.currentTarget.style.boxShadow = 'none' }}>
                  Book the Venue
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                {[{ label: 'Name', type: 'text', placeholder: 'Your name' }, { label: 'Email', type: 'email', placeholder: 'you@example.com' }, { label: 'Phone', type: 'tel', placeholder: '(250) 555-0000' }].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} className="w-full px-4 py-3 text-sm outline-none transition-all" style={{ backgroundColor: '#111111', border: '1px solid rgba(233,30,138,0.2)', color: '#ffffff', borderRadius: '4px' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#e91e8a')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(233,30,138,0.2)')} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>Message</label>
                  <textarea rows={4} placeholder="Tell us about your event or inquiry..." className="w-full px-4 py-3 text-sm outline-none resize-none transition-all" style={{ backgroundColor: '#111111', border: '1px solid rgba(233,30,138,0.2)', color: '#ffffff', borderRadius: '4px' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#e91e8a')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(233,30,138,0.2)')} />
                </div>
                <button type="submit" className="w-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300" style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.14em', borderRadius: '4px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d6187e'; e.currentTarget.style.boxShadow = '0 0 24px rgba(233,30,138,0.45)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e91e8a'; e.currentTarget.style.boxShadow = 'none' }}>
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(233,30,138,0.15)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className={`heading-font text-3xl tracking-widest neon-heading-sm mb-2`} style={{ color: '#e91e8a', letterSpacing: '0.12em' }}>NEON PINES</div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Where the mountains rock.<br />Nelson, BC.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#e91e8a' }}>Quick Links</h4>
              <div className="flex flex-col gap-2.5">
                {['Shows', 'Venue', 'About', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#e91e8a')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#e91e8a' }}>Info</h4>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>123 Sample St, Nelson, BC</p>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>(250) 555-0114</p>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>info@neonpines.ca</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Capacity: 300 &middot; All Ages</p>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(233,30,138,0.1)' }}>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>&copy; {new Date().getFullYear()} Neon Pines Music Venue. All rights reserved.</span>
            <span className="text-xs" style={{ color: 'rgba(233,30,138,0.4)' }}>Est. 2016 &middot; Nelson, BC</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{ backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderTop: '1px solid rgba(233,30,138,0.25)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Sample design by <strong style={{ color: '#ffffff' }}>Kootenay Made Digital</strong></span>
            <span className="hidden sm:inline text-xs" style={{ color: 'rgba(233,30,138,0.4)' }}>·</span>
            <span className="text-xs font-bold" style={{ color: '#e91e8a' }}>(250) 555-0114</span>
          </div>
          <Link href="/contact?style=music-entertainment"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap"
            style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.12em' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d6187e'; e.currentTarget.style.boxShadow = '0 0 20px rgba(233,30,138,0.5)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e91e8a'; e.currentTarget.style.boxShadow = 'none' }}>
            Like What You See? Let&rsquo;s Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
