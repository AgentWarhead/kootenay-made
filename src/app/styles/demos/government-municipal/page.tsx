'use client'

import { useState, useRef } from 'react'
import { Public_Sans } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

const sourceSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

/* ── Scroll reveal wrapper ── */
/* ── Clean government divider — simple blue accent line ── */
function GovDivider() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #2563eb30 30%, #2563eb 50%, #2563eb30 70%, transparent 100%)' }} />
    </div>
  )
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 28 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

/* ── Official seal ── */
function OfficialSeal({ hc }: { hc: boolean }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      initial={prefersReduced ? {} : { scale: 1.3, rotate: -8, opacity: 0 }}
      animate={prefersReduced ? {} : { scale: 1, rotate: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.9, type: 'spring', stiffness: 200, damping: 18 }}
      aria-label="West Kootenay Parks & Recreation official seal, established 1980"
      role="img"
    >
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="56" stroke={hc ? '#000000' : '#ffffff'} strokeWidth={hc ? '3' : '2'} fill="none" />
        <circle cx="60" cy="60" r="50" stroke={hc ? '#000000' : 'rgba(255,255,255,0.5)'} strokeWidth="1" fill="none" />
        <circle cx="60" cy="60" r="49" fill={hc ? '#ffffff' : 'rgba(255,255,255,0.08)'} />
        <path d="M30 78 L50 48 L62 62 L74 42 L90 78 Z" fill={hc ? '#000000' : 'rgba(255,255,255,0.9)'} />
        <path d="M50 48 L56 58 L44 58 Z" fill={hc ? '#ffffff' : '#2563eb'} />
        <path d="M74 42 L80 55 L68 55 Z" fill={hc ? '#ffffff' : '#2563eb'} />
        <text x="60" y="96" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="2" fill={hc ? '#000000' : '#ffffff'} fontFamily="sans-serif">EST. 1980</text>
        <path id="topArc" d="M 18,60 A 42,42 0 0,1 102,60" fill="none" />
        <text fontSize="7.5" fontWeight="600" fill={hc ? '#000000' : 'rgba(255,255,255,0.85)'} fontFamily="sans-serif" letterSpacing="1.5">
          <textPath href="#topArc" startOffset="12%">WEST KOOTENAY PARKS &amp; REC</textPath>
        </text>
      </svg>
    </motion.div>
  )
}

/* ── Live Redesign (government-municipal) ─────────────────────── */
function LiveRedesign() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [transformed, setTransformed] = useState(false)

  const dur = prefersReduced ? 0.01 : 0.9
  const stagger = prefersReduced ? 0 : 0.18

  const blue = '#2563eb'
  const navy = '#1e3a5f'
  const lightBlue = '#93c5fd'
  const white = '#ffffff'

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-center gap-3 mb-5">
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? blue : '#ccc' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className={`${sourceSans.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? blue : '#888' }}
          >{transformed ? '✨ After' : 'Before'}</motion.span>
        </AnimatePresence>
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? blue : '#ccc' }} layout transition={{ duration: 0.4 }} />
      </div>

      <div className="relative w-full" style={{ minHeight: '520px' }}>
        <AnimatePresence mode="wait">
          {!transformed ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)', transition: { duration: 0.5 } }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: '#f2f0ed', border: '1px solid #d8d4cf', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#2c4a6e', borderBottom: '3px solid #1a3050' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#93c5fd' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>West Kootenay Regional Parks</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Parks', 'Bylaws', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>&#9776; Menu</span>
              </div>
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 md:py-16 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #93c5fd 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2 sm:mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#666', letterSpacing: '0.15em' }}>&#9733; Welcome to Our Website &#9733;</p>
                  <h2 className="text-xl sm:text-2xl md:text-4xl leading-tight mb-2 sm:mb-3" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700 }}>West Kootenay Regional Parks</h2>
                  <p className="text-sm sm:text-lg mb-1 sm:mb-2" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>&ldquo;Welcome to the District Website.&rdquo;</p>
                  <p className="text-xs sm:text-sm mb-4 sm:mb-6" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>Parks &bull; Recreation &bull; Permits &bull; Bylaws &bull; Council</p>
                  <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                    {['✓ Office Hours Mon-Fri', '✓ Online Forms', '✓ Community Events'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#2c4a6e', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#2c4a6e' }}>&#128222; Call Us Today: (250) 555-0116</p>
                  <span className="inline-block px-6 py-2.5 text-sm" style={{ backgroundColor: '#2563eb', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', border: '1px solid #1e3a5f', cursor: 'default' }}>Learn More</span>
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
              style={{ border: `2px solid ${blue}`, borderRadius: '12px', boxShadow: `0 4px 24px ${blue}20, 0 2px 8px rgba(0,0,0,0.06)` }}
            >

            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/images/demos/government-municipal-showcase.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.9) 100%)' }} />
            </div>
              {/* White nav — accessible, high contrast */}
              <div className="flex items-center justify-between px-5 sm:px-8 py-3" style={{ borderBottom: `2px solid ${blue}`, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <motion.span className={`${sourceSans.className} text-xs sm:text-sm font-bold`} style={{ color: '#fff', letterSpacing: '0.01em' }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  West Kootenay Regional Parks
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Parks', 'Services', 'About', 'Contact'].map((link) => (
                    <span key={link} className={`${sourceSans.className} text-xs uppercase tracking-widest font-semibold`} style={{ color: blue }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: blue }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: blue }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: blue }} />
                </motion.div>
              </div>
              <div className="relative px-5 sm:px-10 md:px-14 py-8 sm:py-10 flex-1 flex flex-col justify-center">
                <motion.div className="absolute top-4 right-4 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  {/* Clean geometric shapes — accessible, structured */}
                  <svg width="200" height="200" viewBox="0 0 180 180" fill="none">
                    <circle cx="140" cy="40" r="30" stroke={blue} strokeWidth="1.5" fill="none" />
                    <circle cx="140" cy="40" r="18" stroke={blue} strokeWidth="1" fill="none" opacity="0.6" />
                    <circle cx="140" cy="40" r="6" fill={blue} opacity="0.5" />
                    <rect x="30" y="100" width="40" height="40" stroke={blue} strokeWidth="1.5" fill="none" />
                    <rect x="38" y="108" width="24" height="24" stroke={blue} strokeWidth="1" fill="none" opacity="0.5" />
                    <line x1="50" y1="80" x2="50" y2="100" stroke={blue} strokeWidth="1" opacity="0.4" />
                    <line x1="140" y1="70" x2="140" y2="155" stroke={blue} strokeWidth="1" opacity="0.3" strokeDasharray="4 5" />
                    <line x1="50" y1="140" x2="130" y2="140" stroke={blue} strokeWidth="1" opacity="0.25" strokeDasharray="4 5" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-4 sm:mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${sourceSans.className} text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-sm`} style={{ backgroundColor: `${blue}12`, color: blue, border: `1.5px solid ${blue}30` }}>
                      Est. 1980 &mdash; West Kootenay
                    </span>
                  </motion.div>
                  <motion.h2 className={`${sourceSans.className} text-2xl sm:text-4xl font-bold leading-[1.2] mb-4 sm:mb-5 sm:max-w-xl`}
                    style={{ color: '#fff' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    Report It. We&rsquo;ll Handle It.{' '}
                    <span style={{ color: blue }}>No Hold Music</span>{' '}Required.
                  </motion.h2>
                  <motion.p className={`${sourceSans.className} text-sm sm:text-base max-w-md sm:mx-0 mx-auto mb-6 sm:mb-8`}
                    style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Self-serve online &mdash; 24 hours a day, 7 days a week. No hold music, no wait.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className={`${sourceSans.className} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
                      style={{ backgroundColor: blue, color: white, boxShadow: `0 4px 20px ${blue}35` }}>
                      Submit a Service Request →
                    </a>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-2 mt-5 sm:mt-8"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    <span className={`${sourceSans.className} text-xs font-semibold`} style={{ color: blue, opacity: 0.75, letterSpacing: '0.04em' }}>Online 24/7 &bull; 12 Parks &bull; 8 Programs</span>
                  </motion.div>
                </div>
              </div>
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${blue}, ${lightBlue}, white, ${lightBlue}, ${blue})`, backgroundSize: '200% 100%', animation: 'shimmer-border 3s linear infinite' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setTransformed(!transformed)}
          className={`${sourceSans.className} text-sm font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{ backgroundColor: transformed ? `${'#2563eb'}15` : white, color: transformed ? '#1e3a5f' : '#666', border: `1.5px solid ${transformed ? `${'#2563eb'}30` : '#ddd'}`, boxShadow: transformed ? `0 2px 12px ${'#2563eb'}10` : '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          {transformed ? '← See the Before' : '✨ Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ── FAQ Accordion (gov style) ── */
function FAQAccordion({ items, hc }: { items: { q: string; a: string }[]; hc: boolean }) {
  const [open, setOpen] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  const navy = hc ? '#000000' : '#1e3a5f'
  const blue = hc ? '#000000' : '#2563eb'
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg overflow-hidden transition-shadow"
          style={{ backgroundColor: '#ffffff', border: hc ? '2px solid #000000' : '1px solid #e2e8f0', boxShadow: !hc && open === i ? '0 4px 16px rgba(37,99,235,0.08)' : 'none', borderLeftWidth: open === i ? '4px' : hc ? '2px' : '1px', borderLeftColor: open === i ? blue : hc ? '#000000' : '#e2e8f0' }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="gov-focusable w-full flex items-center justify-between px-6 py-5 text-left"
            aria-expanded={open === i}
            style={{ minHeight: '44px' }}>
            <span className="text-base font-semibold" style={{ color: open === i ? blue : navy }}>{item.q}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
              style={{ color: blue, flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: prefersReduced ? 'none' : 'transform 0.3s ease' }}>
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{item.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   WEST KOOTENAY PARKS & RECREATION — Government Demo
══════════════════════════════════════════════════════ */
export default function GovernmentMunicipalPage() {
  const [highContrast, setHighContrast] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()

  const hc = highContrast
  const C = {
    navy:        hc ? '#000000' : '#1e3a5f',
    navyLight:   hc ? '#000000' : '#234b7a',
    blue:        hc ? '#000000' : '#2563eb',
    blueHover:   hc ? '#000000' : '#1d4ed8',
    lightGrey:   hc ? '#ffffff' : '#f8fafc',
    white:       '#ffffff',
    black:       '#000000',
    slate:       hc ? '#000000' : '#475569',
    slateLight:  hc ? '#000000' : '#64748b',
    pageBg:      '#ffffff',
    navBg:       hc ? '#000000' : '#1e3a5f',
    navText:     '#ffffff',
    cardBorder:  hc ? '2px solid #000000' : '4px solid #2563eb',
    inputBorder: hc ? '2px solid #000000' : '1px solid #cbd5e1',
    sectionAlt:  hc ? '#f0f0f0' : '#f8fafc',
    linkDecor:   hc ? 'underline' : 'none',
  }

  const parks = [
    { name: 'Gyro Park', amenities: ['🏊 Pool', '🛝 Playground', '🚻 Washrooms', '♿ Accessible', '🅿️ Parking'] },
    { name: 'Lakeside Park', amenities: ['🏕 Camping', '🚻 Washrooms', '♿ Accessible', '🅿️ Parking'] },
    { name: 'Columbia Park', amenities: ['🛝 Playground', '🏀 Courts', '🚻 Washrooms', '🅿️ Parking'] },
    { name: 'Broadwater Park', amenities: ['🏊 Pool', '🏕 Camping', '🚻 Washrooms', '♿ Accessible'] },
    { name: 'Kinnaird Park', amenities: ['🛝 Playground', '🚻 Washrooms', '♿ Accessible', '🅿️ Parking'] },
    { name: 'Nelson Waterfront', amenities: ['🏊 Pool', '♿ Accessible', '🚻 Washrooms', '🅿️ Parking'] },
  ]

  const amenityFilters = ['🏊 Pool', '🏕 Camping', '🛝 Playground', '♿ Accessible']

  const filteredParks = activeFilter
    ? parks.filter((p) => p.amenities.includes(activeFilter))
    : parks

  const topoPattern = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><path d='M0 60 Q50 40 100 60 Q150 80 200 60' stroke='%23234b7a' stroke-width='1.2' fill='none' opacity='0.18'/><path d='M0 90 Q40 70 100 90 Q160 110 200 90' stroke='%23234b7a' stroke-width='1' fill='none' opacity='0.14'/><path d='M0 120 Q60 100 100 120 Q140 140 200 120' stroke='%23234b7a' stroke-width='1.2' fill='none' opacity='0.18'/><path d='M0 150 Q50 130 100 150 Q150 170 200 150' stroke='%23234b7a' stroke-width='1' fill='none' opacity='0.13'/></svg>`
  const topoBg = `url("data:image/svg+xml,${encodeURIComponent(topoPattern)}")`

  return (
    <div className={`${sourceSans.className} overflow-x-hidden`} style={{ backgroundColor: C.pageBg, color: C.slate, minHeight: '100vh' }}>
      <style>{`
        @keyframes shimmer-border { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
        .gov-focusable:focus-visible { outline: 3px solid #2563eb; outline-offset: 3px; border-radius: 4px; }
        .skip-link { position: absolute; top: -100px; left: 16px; z-index: 9999; padding: 10px 20px; background: #2563eb; color: #ffffff; font-weight: 700; font-size: 0.9rem; border-radius: 0 0 6px 6px; text-decoration: none; transition: top 0.2s ease; }
        .skip-link:focus { top: 0; outline: 3px solid #ffffff; outline-offset: 2px; }
        .quick-link-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .quick-link-btn:hover { transform: translateY(-2px); }
        .park-card { transition: box-shadow 0.2s ease; }
        .park-card:hover { box-shadow: 0 6px 24px rgba(37,99,235,0.12); }
        .service-tile { transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease; }
        .service-tile:hover { transform: translateY(-3px); }
      `}</style>

      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* ═══ 1. NAV ═══ */}
      <nav className="sticky top-0 z-40 px-4 md:px-8"
        style={{ backgroundColor: C.navBg, borderBottom: hc ? '2px solid #ffffff' : 'none' }}
        aria-label="Main navigation">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 gap-4">
          <span className="text-lg md:text-xl font-bold tracking-tight leading-tight"
            style={{ color: C.navText, maxWidth: '240px', letterSpacing: '0.02em' }}>
            West Kootenay Parks &amp; Recreation
          </span>
          <div className="hidden md:flex items-center gap-6">
            {['Parks', 'Services', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold transition-opacity gov-focusable"
                style={{ color: C.navText, opacity: 0.85, textDecoration: C.linkDecor }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}>{item}</a>
            ))}
            <a href="tel:2505550116" className="text-sm font-bold gov-focusable" style={{ color: C.navText, textDecoration: C.linkDecor }}>(250) 555-0116</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setHighContrast((v) => !v)} aria-pressed={highContrast}
              aria-label={highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
              className="gov-focusable flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all"
              style={{ backgroundColor: highContrast ? '#ffffff' : 'rgba(255,255,255,0.15)', color: highContrast ? '#000000' : '#ffffff', border: highContrast ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.3)', minHeight: '36px', minWidth: '44px', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              <span className="hidden sm:inline">{highContrast ? 'Normal' : 'High Contrast'}</span>
            </button>
            <a href="tel:2505550116" className="md:hidden text-sm font-bold gov-focusable" style={{ color: C.navText }}>Call</a>
          </div>
        </div>
      </nav>

      <main id="main-content" tabIndex={-1}>

        {/* ═══ 2. HERO — Quick-link gov.uk pattern ═══ */}
        <section className="relative overflow-hidden"
          style={{ background: hc ? '#000000' : 'linear-gradient(165deg, #1e3a5f 0%, #162d4a 100%)', paddingBottom: '3rem' }}
          aria-label="Hero section">
          {!hc && (
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: topoBg, backgroundRepeat: 'repeat', backgroundSize: '200px 200px', pointerEvents: 'none' }} />
          )}
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24 w-full">
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-12">
              <div className="flex-1">
                <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
                  style={{ color: '#ffffff' }}
                  initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
                  animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.2 }}>
                  Your Community.<br /><span style={{ color: hc ? '#ffffff' : '#93c5fd' }}>Your Parks.</span>
                </motion.h1>
                <motion.p className="text-base md:text-lg max-w-xl mb-6 leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.78)' }}
                  initial={prefersReduced ? {} : { opacity: 0, y: 28 }}
                  animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.4 }}>
                  Find trails, book facilities, register for programs, and access services — online 24/7.
                </motion.p>
              </div>
              <div className="flex-shrink-0 hidden md:block"><OfficialSeal hc={hc} /></div>
            </div>

            {/* QUICK LINKS — the gov.uk hero pattern */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.6 }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Quick Access</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Find a Park', icon: '🌲', href: '#parks' },
                  { label: 'Report an Issue', icon: '📋', href: '#contact' },
                  { label: 'Programs & Registration', icon: '🏃', href: '#services' },
                  { label: 'Contact Us', icon: '📞', href: '#contact' },
                ].map((ql) => (
                  <a key={ql.label} href={ql.href}
                    className="quick-link-btn gov-focusable flex flex-col items-center justify-center gap-2 p-4 rounded-lg text-center"
                    style={{
                      backgroundColor: hc ? '#ffffff' : 'rgba(255,255,255,0.12)',
                      border: hc ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
                      color: hc ? '#000000' : '#ffffff',
                      textDecoration: 'none',
                      minHeight: '80px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hc ? '#e0e0e0' : 'rgba(255,255,255,0.2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = hc ? '#ffffff' : 'rgba(255,255,255,0.12)')}>
                    <span className="text-2xl">{ql.icon}</span>
                    <span className="text-xs font-bold leading-tight" style={{ color: hc ? '#000000' : '#ffffff' }}>{ql.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        <GovDivider />

        {/* ═══ EMERGENCY CONTACTS STRIP ═══ */}
        <div className="py-4 px-6" style={{ backgroundColor: hc ? '#000000' : '#c0392b' }} role="alert" aria-label="Emergency contacts">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm font-bold text-white">
            <span>🚨 Emergency: 911</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>Non-Emergency Police: (250) 555-0120</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>Water Emergency: (250) 555-0121</span>
          </div>
        </div>

        {/* ═══ TRUST BAR ═══ */}
        <div className="py-5 px-6"
          style={{ backgroundColor: hc ? '#f0f0f0' : '#ffffff', borderBottom: hc ? '2px solid #000000' : '1px solid #e2e8f0' }}>
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm font-semibold">
            <span style={{ color: '#fff' }}>Serving the Kootenays Since 1980</span>
            <span style={{ color: C.slateLight }}>·</span>
            <span style={{ color: '#fff' }}>45+ Parks &amp; Trails</span>
            <span style={{ color: C.slateLight }}>·</span>
            <span style={{ color: '#fff' }}>WCAG AA Compliant</span>
            <span style={{ color: C.slateLight }}>·</span>
            <span style={{ color: '#fff' }}>Open 7 Days</span>
          </div>
        </div>

        {/* ═══ 4. PARKS DIRECTORY ═══ */}
        <section id="parks" className="py-20 md:py-28 px-6" style={{ backgroundColor: C.sectionAlt }} aria-labelledby="parks-heading">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: C.blue, letterSpacing: '0.15em' }}>Our Parks</p>
              <h2 id="parks-heading" className="text-2xl md:text-4xl font-bold" style={{ color: '#fff' }}>Parks Directory</h2>
              <p className="mt-3 max-w-xl mx-auto text-base" style={{ color: C.slateLight }}>80% of visitors come here first. Find a park near you.</p>
            </Reveal>
            {/* Filter by amenity */}
            <Reveal delay={0.05} className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setActiveFilter(null)}
                  className="gov-focusable px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{ backgroundColor: activeFilter === null ? C.blue : (hc ? '#e0e0e0' : '#e2e8f0'), color: activeFilter === null ? '#fff' : C.navy, border: hc ? '2px solid #000' : 'none' }}>
                  All Parks
                </button>
                {amenityFilters.map((filter) => (
                  <button key={filter}
                    onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                    className="gov-focusable px-4 py-2 rounded-full text-sm font-semibold transition-all"
                    style={{ backgroundColor: activeFilter === filter ? C.blue : (hc ? '#e0e0e0' : '#e2e8f0'), color: activeFilter === filter ? '#fff' : C.navy, border: hc ? '2px solid #000' : 'none' }}>
                    {filter}
                  </button>
                ))}
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredParks.map((park, i) => (
                <Reveal key={park.name} delay={i * 0.07}>
                  <div className="park-card rounded-lg p-6"
                    style={{ backgroundColor: C.white, border: hc ? '2px solid #000000' : '1px solid #e2e8f0', boxShadow: hc ? 'none' : '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3 className="text-lg font-bold mb-3" style={{ color: '#fff' }}>{park.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {park.amenities.map((amenity) => (
                        <span key={amenity} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: hc ? '#e0e0e0' : '#eff6ff', color: '#fff', border: hc ? '1px solid #000' : 'none' }}>{amenity}</span>
                      ))}
                    </div>
                    <a href="#contact" className="gov-focusable text-sm font-bold transition-colors" style={{ color: C.blue, textDecoration: hc ? 'underline' : 'none' }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = hc ? 'underline' : 'none')}>
                      View Details &rarr;
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3} className="mt-10">
              <Image src="/images/demos/gallery/gm-4.webp" alt="Nature trail boardwalk through wetlands in West Kootenay park" width={600} height={400} className="w-full h-auto object-cover rounded-xl" />
            </Reveal>
          </div>
        </section>

        {/* ═══ 5. QUICK SERVICES TILE GRID ═══ */}
        <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: C.white }} aria-labelledby="services-heading">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: C.blue, letterSpacing: '0.15em' }}>Self-Service</p>
              <h2 id="services-heading" className="text-2xl md:text-4xl font-bold" style={{ color: '#fff' }}>Quick Services</h2>
              <p className="mt-3 max-w-xl mx-auto text-base" style={{ color: C.slateLight }}>Handle it online. No hold music. No wait times.</p>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { icon: '💧', label: 'Pay Utility Bill', href: '#contact' },
                { icon: '📅', label: 'Book a Facility', href: '#contact' },
                { icon: '🔧', label: 'Request Maintenance', href: '#contact' },
                { icon: '📜', label: 'View Bylaws', href: '#contact' },
                { icon: '🐕', label: 'Dog Licensing', href: '#contact' },
                { icon: '🔥', label: 'Burn Permits', href: '#contact' },
              ].map((tile) => (
                <a key={tile.label} href={tile.href}
                  className="service-tile gov-focusable flex flex-col items-center justify-center gap-3 p-5 rounded-lg text-center"
                  style={{
                    backgroundColor: hc ? '#f0f0f0' : '#f8fafc',
                    border: hc ? '2px solid #000000' : '1px solid #e2e8f0',
                    textDecoration: 'none',
                    minHeight: '100px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hc ? '#e0e0e0' : '#eff6ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = hc ? '#f0f0f0' : '#f8fafc')}>
                  <span className="text-3xl">{tile.icon}</span>
                  <span className="text-xs font-bold leading-tight" style={{ color: '#fff' }}>{tile.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <GovDivider />
        {/* ═══ NEWS & ANNOUNCEMENTS ═══ */}
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.sectionAlt }} aria-labelledby="news-heading">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: C.blue, letterSpacing: '0.15em' }}>Keep Informed</p>
              <h2 id="news-heading" className="text-2xl md:text-4xl font-bold" style={{ color: '#fff' }}>News &amp; Announcements</h2>
            </Reveal>
            <div className="flex flex-col gap-5">
              {[
                { date: 'Mar 30, 2025', headline: 'Water main maintenance on Columbia Ave — expect delays 8AM–2PM', tag: 'Maintenance', urgent: true },
                { date: 'Apr 5, 2025', headline: 'Gyro Park outdoor pool opens for the season — free family swim April 5', tag: 'Events', urgent: false },
                { date: 'Apr 10, 2025', headline: 'Spring recreation program registration now open for all age groups', tag: 'Programs', urgent: false },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex gap-5 items-start p-5 rounded-lg"
                    style={{ backgroundColor: C.white, border: hc ? '2px solid #000000' : item.urgent ? '2px solid #c0392b' : '1px solid #e2e8f0', boxShadow: hc ? 'none' : '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <div className="flex-shrink-0 text-center min-w-[56px]">
                      <div className="text-xs font-bold" style={{ color: item.urgent ? '#c0392b' : C.blue }}>{item.tag}</div>
                      <div className="text-xs mt-1" style={{ color: C.slateLight }}>{item.date}</div>
                    </div>
                    <div className="w-px self-stretch" style={{ backgroundColor: hc ? '#000000' : '#e2e8f0' }} />
                    <div>
                      <p className="text-base font-semibold leading-snug" style={{ color: '#fff' }}>{item.headline}</p>
                      <a href="#contact" className="gov-focusable text-sm font-semibold mt-2 inline-block transition-colors" style={{ color: C.blue, textDecoration: hc ? 'underline' : 'none' }}>
                        Read More &rarr;
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ GALLERY ═══ */}
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.white }} aria-labelledby="gallery-heading">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-12">
              <h2 id="gallery-heading" className="text-2xl md:text-4xl font-bold" style={{ color: '#fff' }}>Our Parks &amp; Facilities</h2>
              <p className="mt-4 max-w-xl mx-auto text-base" style={{ color: C.slateLight }}>From trail networks to indoor recreation centres — something for everyone.</p>
            </Reveal>
            <Reveal delay={0.1} className="mb-10">
              <div className="overflow-hidden rounded-lg w-full max-w-3xl mx-auto"
                style={{ boxShadow: hc ? 'none' : '0 8px 36px rgba(0,0,0,0.1)', border: hc ? '2px solid #000000' : 'none' }}>
                <Image src="/images/demos/government-municipal-showcase.webp" alt="West Kootenay Parks and Recreation — park facilities and trail scenery"
                  width={800} height={500} className="w-full h-auto block" style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 800px" />
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[{ label: 'Trail Networks', img: '/images/demos/gallery/gm-1.webp' }, { label: 'Sports Facilities', img: '/images/demos/gallery/gm-2.webp' }, { label: 'Community Centres', img: '/images/demos/gallery/gm-3.webp' }].map((item, i) => (
                <Reveal key={item.label} delay={0.15 + i * 0.1}>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image src={item.img} alt={item.label} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <span className="text-white text-sm font-medium">{item.label}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ DIGITAL SERVICES ═══ */}
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.sectionAlt }} aria-labelledby="digital-heading">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: C.blue, letterSpacing: '0.15em' }}>Better Serving Residents</p>
              <h2 id="digital-heading" className="text-2xl md:text-4xl font-bold" style={{ color: '#fff' }}>Digital Services</h2>
            </Reveal>
            <Reveal delay={0.05} className="text-center mb-14">
              <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Residents call the office for basic information — program hours, pool schedules, trail closures. Your website should answer those questions before they pick up the phone.{' '}
                <span style={{ color: C.blue, fontWeight: 700 }}>The municipality down the highway cut call volume by 40%. Yours can too.</span>
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Custom Website', desc: 'A clear, accessible site residents can use to find programs, hours, and contact info without calling. From $1,500.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={hc ? '#000000' : '#2563eb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg> },
                { title: 'Email Marketing', desc: 'Keep residents informed about closures, events, and programs automatically. From $750.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={hc ? '#000000' : '#2563eb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg> },
                { title: 'Google Visibility', desc: 'Make sure residents find facilities the moment they search. Google Domination from $500.', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={hc ? '#000000' : '#2563eb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> },
              ].map((card, i) => (
                <Reveal key={card.title} delay={i * 0.12}>
                  <div className="p-8 rounded-lg transition-shadow"
                    style={{ backgroundColor: C.white, borderLeft: C.cardBorder, boxShadow: hc ? 'none' : '0 2px 12px rgba(0,0,0,0.06)', border: hc ? '2px solid #000000' : undefined }}>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: hc ? '#e0e0e0' : '#eff6ff' }} aria-hidden="true">{card.icon}</div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#fff' }}>{card.title}</h3>
                    <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{card.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <GovDivider />

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.white }} aria-labelledby="hiw-heading">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: C.blue, letterSpacing: '0.15em' }}>The Process</p>
              <h2 id="hiw-heading" className="text-2xl md:text-4xl font-bold" style={{ color: '#fff' }}>How It Works</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { num: '1', title: 'We Talk', desc: 'Free consultation. You tell us what residents need — program info, facility hours, document access. We map it out.' },
                { num: '2', title: 'We Build', desc: 'We design an accessible, WCAG-compliant site in ~2–3 weeks. Clear navigation, searchable content, mobile-ready.' },
                { num: '3', title: 'You Serve', desc: 'Launch and watch call volume drop. Residents find answers online. Staff focus on programs, not phone inquiries.' },
              ].map((step, i) => (
                <Reveal key={step.num} delay={i * 0.15}>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl text-white"
                      style={{ backgroundColor: C.blue, border: hc ? '2px solid #000000' : 'none', minWidth: '48px' }}>{step.num}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#fff' }}>{step.title}</h3>
                      <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ THE TRANSFORMATION ═══ */}
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.sectionAlt }} aria-labelledby="transform-heading">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-12">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: C.blue, letterSpacing: '0.15em' }}>The Transformation</p>
              <h2 id="transform-heading" className={`${sourceSans.className} text-2xl md:text-4xl font-bold`} style={{ color: '#fff' }}>Watch Your Website Transform</h2>
              <p className="mt-4 max-w-xl mx-auto text-base" style={{ color: C.slateLight }}>From dated to designed — in real time</p>
            </Reveal>
            <LiveRedesign />
          </div>
        </section>

        {/* ═══ COMMUNITY FEEDBACK ═══ */}
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.white }} aria-labelledby="testimonials-heading">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: C.blue, letterSpacing: '0.15em' }}>Community Feedback</p>
              <h2 id="testimonials-heading" className="text-2xl md:text-4xl font-bold" style={{ color: '#fff' }}>What Residents Say</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { quote: 'Finally I can book the community hall online instead of waiting on hold. This saves me so much time every month.', name: 'Sandra K.', org: 'Resident', town: 'Trail' },
                { quote: 'Our staff used to spend hours every week answering questions about hours and closures. Since we relaunched, those calls dropped significantly.', name: 'Derek M.', org: 'Recreation Coordinator', town: 'Castlegar' },
                { quote: 'I can find trail conditions before I head out. The site actually has the information I need. Makes a real difference.', name: 'Pam T.', org: 'Resident', town: 'Nelson' },
              ].map((t, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <div className="p-10 rounded-lg"
                    style={{ backgroundColor: C.sectionAlt, borderLeft: hc ? '4px solid #000000' : '4px solid #2563eb', border: hc ? '2px solid #000000' : undefined, boxShadow: hc ? 'none' : '0 4px 24px rgba(0,0,0,0.06)' }}>
                    <div className="flex mb-4" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, j) => <span key={j} style={{ color: hc ? '#000000' : '#f59e0b', fontSize: '1.25rem' }} aria-hidden="true">★</span>)}
                    </div>
                    <blockquote>
                      <p className="text-base font-semibold leading-relaxed mb-5 italic" style={{ color: '#fff' }}>&ldquo;{t.quote}&rdquo;</p>
                      <footer>
                        <cite className="text-sm font-bold not-italic" style={{ color: C.blue }}>— {t.name}</cite>
                        <p className="text-xs mt-1" style={{ color: C.slateLight }}>{t.org} &middot; {t.town}</p>
                      </footer>
                    </blockquote>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.4} className="mt-8">
              <p className="text-center text-xs" style={{ color: C.slateLight }}>(Sample reviews &mdash; your real reviews go here)</p>
            </Reveal>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.sectionAlt }} aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: C.blue, letterSpacing: '0.15em' }}>Questions &amp; Answers</p>
              <h2 id="faq-heading" className="text-2xl md:text-4xl font-bold" style={{ color: '#fff' }}>Common Questions</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion hc={hc} items={[
                { q: 'How do I register for a program?', a: 'Click "Programs & Registration" in the quick links above, or visit the Services section. Most registrations can be completed online in under 5 minutes.' },
                { q: 'How do I report a park maintenance issue?', a: 'Use the "Report an Issue" quick link or the contact form at the bottom of this page. Include the park name, issue description, and your contact info. We aim to respond within 1 business day.' },
                { q: 'Where can I find facility hours?', a: 'Each park and facility has its own page with current hours, closures, and seasonal changes. Hours can also change due to special events — check back or subscribe to our email updates.' },
                { q: 'How do I get a burn permit?', a: 'Burn permits are available online through the Quick Services section. Seasonal restrictions apply. Permits are typically issued within 24 hours during open-burn seasons.' },
                { q: 'Is this site accessible?', a: 'Yes. This site meets WCAG 2.1 AA standards. It includes high contrast mode, keyboard navigation, skip links, and screen reader support. Contact us if you experience any accessibility barriers.' },
                { q: 'How do I book a community facility?', a: 'Use the "Book a Facility" tile in Quick Services. Select your date, time, and facility. Bookings are confirmed by email within 24 hours. Fees apply for full-day bookings.' },
              ]} />
            </Reveal>
          </div>
        <GovDivider />
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: C.white }} aria-labelledby="about-heading">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              <Reveal>
                <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: C.blue, letterSpacing: '0.15em' }}>About Us</p>
                <h2 id="about-heading" className="text-2xl md:text-4xl font-bold mb-6" style={{ color: '#fff' }}>Committed to Our Communities Since 1980</h2>
                <p className="text-base leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  West Kootenay Parks &amp; Recreation has been enriching lives across the region for over four decades. From Nelson to Castlegar, Trail to Rossland, our team manages parks, trails, sports facilities, aquatic centres, and hundreds of recreation programs for all ages and abilities.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  We believe that access to recreation is a right, not a privilege. Our programs are designed with accessibility in mind — adaptive programming, seniors&rsquo; fitness, youth leadership, and everything in between.
                </p>
                <a href="#contact" className="gov-focusable inline-block px-8 font-bold text-base transition-colors rounded-lg"
                  style={{ backgroundColor: C.blue, color: '#ffffff', textDecoration: C.linkDecor, minHeight: '48px', lineHeight: '48px', border: hc ? '2px solid #000000' : 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.blueHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.blue)}>
                  Get in Touch
                </a>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="grid grid-cols-2 gap-5">
                  {[{ num: '45+', label: 'Parks & Trails' }, { num: '12', label: 'Facilities' }, { num: '200+', label: 'Programs' }, { num: '50K+', label: 'Annual Visits' }].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center justify-center p-6 text-center rounded-lg"
                      style={{ backgroundColor: C.sectionAlt, border: hc ? '2px solid #000000' : '1px solid #e2e8f0' }}>
                      <div className="text-3xl font-bold mb-1" style={{ color: C.blue }}>{stat.num}</div>
                      <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.slateLight }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: C.sectionAlt }} aria-labelledby="contact-heading">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: C.blue, letterSpacing: '0.15em' }}>Get in Touch</p>
              <h2 id="contact-heading" className="text-2xl md:text-4xl font-bold" style={{ color: '#fff' }}>Contact West Kootenay Parks &amp; Rec</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <Reveal>
                <div className="flex flex-col gap-7">
                  {[
                    { label: 'Phone', value: '(250) 555-0116', href: 'tel:2505550116' },
                    { label: 'Email', value: 'info@wkparks.ca', href: 'mailto:info@wkparks.ca' },
                    { label: 'Hours', value: 'Mon–Sun, 8:00 AM – 6:00 PM', href: null },
                    { label: 'Address', value: '123 Sample St, Nelson, BC', href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: C.slateLight }}>{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="gov-focusable font-semibold text-base" style={{ color: '#fff', textDecoration: hc ? 'underline' : 'none' }}>{item.value}</a>
                        ) : (
                          <span className="font-semibold text-base" style={{ color: '#fff' }}>{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <form onSubmit={(e) => e.preventDefault()} noValidate aria-label="Contact form"
                  style={{ backgroundColor: C.white, border: hc ? '2px solid #000000' : '1px solid #e2e8f0', borderRadius: '8px', padding: '2rem', boxShadow: hc ? 'none' : '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <div className="flex flex-col gap-5">
                    {[{ id: 'contact-name', label: 'Your Name', type: 'text', placeholder: 'Jane Smith', auto: 'name' }, { id: 'contact-email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com', auto: 'email' }, { id: 'contact-subject', label: 'Subject', type: 'text', placeholder: 'Program inquiry, issue report, etc.', auto: 'off' }].map((f) => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="block font-semibold mb-2 text-base" style={{ color: '#fff' }}>{f.label}</label>
                        <input id={f.id} type={f.type} placeholder={f.placeholder} autoComplete={f.auto}
                          className="gov-focusable w-full px-4 py-3 text-base rounded-lg outline-none transition-colors"
                          style={{ border: C.inputBorder, backgroundColor: C.white, color: '#fff', minHeight: '48px' }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#2563eb')}
                          onBlur={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#cbd5e1')} />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="contact-message" className="block font-semibold mb-2 text-base" style={{ color: '#fff' }}>Message</label>
                      <textarea id="contact-message" rows={4} placeholder="How can we help you?"
                        className="gov-focusable w-full px-4 py-3 text-base rounded-lg outline-none transition-colors resize-none"
                        style={{ border: C.inputBorder, backgroundColor: C.white, color: '#fff', fontFamily: 'inherit' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#2563eb')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#cbd5e1')} />
                    </div>
                    <button type="submit" className="gov-focusable w-full text-base font-bold rounded-lg transition-colors"
                      style={{ backgroundColor: C.blue, color: '#ffffff', border: hc ? '2px solid #000000' : 'none', cursor: 'pointer', minHeight: '52px' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.blueHover)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.blue)}>
                      Send Message
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-14 px-6" style={{ backgroundColor: hc ? '#000000' : '#1e3a5f', color: '#ffffff' }} aria-label="Site footer">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <h2 className="text-lg font-bold mb-2" style={{ color: hc ? '#ffffff' : '#93c5fd' }}>West Kootenay Parks &amp; Recreation</h2>
              <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Serving the West Kootenays since 1980.</p>
              <p className="text-sm mt-4 font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>
                ♿ This site meets WCAG 2.1 AA standards.<br />
                <a href="#contact" className="gov-focusable transition-opacity" style={{ color: '#93c5fd', textDecoration: hc ? 'underline' : 'none' }}>Need assistance? Contact us.</a>
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: hc ? '#ffffff' : '#93c5fd' }}>Quick Links</h3>
              <nav aria-label="Footer navigation">
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {['Parks', 'Services', 'About', 'Contact'].map((link) => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase()}`} className="gov-focusable text-sm transition-opacity"
                        style={{ color: 'rgba(255,255,255,0.5)', textDecoration: hc ? 'underline' : 'none' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: hc ? '#ffffff' : '#93c5fd' }}>Info</h3>
              <address className="not-italic flex flex-col gap-2">
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>(250) 555-0116</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>info@wkparks.ca</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Mon–Sun, 8:00 AM – 6:00 PM</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>123 Sample St, Nelson, BC</span>
              </address>
            </div>
          </div>
          <div className="pt-6 text-center text-xs" style={{ borderTop: hc ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}>
            &copy; {new Date().getFullYear()} West Kootenay Parks &amp; Recreation. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ═══ STICKY BOTTOM BAR ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 md:px-8 py-3"
        style={{ backgroundColor: hc ? 'rgba(255,255,255,0.99)' : 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: hc ? '2px solid #000000' : '2px solid #2563eb' }}
        role="complementary" aria-label="Sample design notice">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="text-sm" style={{ color: hc ? '#000000' : '#475569' }}>
              Sample design by <strong style={{ color: hc ? '#000000' : '#1e3a5f' }}>Kootenay Made Digital</strong>
            </span>
          </div>
          <Link href="/contact?style=government-municipal"
            className="gov-focusable inline-block px-6 py-2.5 text-sm font-bold rounded-lg transition-colors whitespace-nowrap"
            style={{ backgroundColor: hc ? '#000000' : '#2563eb', color: '#ffffff', textDecoration: hc ? 'underline' : 'none', minHeight: '44px', lineHeight: '1', display: 'inline-flex', alignItems: 'center' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hc ? '#222222' : '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = hc ? '#000000' : '#2563eb')}>
            Like What You See? Let&rsquo;s Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" aria-hidden="true" />
    </div>
  )
}
