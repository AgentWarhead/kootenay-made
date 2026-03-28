'use client'

import { useState } from 'react'
import { Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

/* ── Scroll reveal wrapper ── */
function Reveal({
  children,
  className = '',
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
      initial={prefersReduced ? {} : { opacity: 0, y: 28 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Official seal / badge with stamp animation ── */
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
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring */}
        <circle
          cx="60"
          cy="60"
          r="56"
          stroke={hc ? '#000000' : '#ffffff'}
          strokeWidth={hc ? '3' : '2'}
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke={hc ? '#000000' : 'rgba(255,255,255,0.5)'}
          strokeWidth="1"
          fill="none"
        />
        {/* Background fill for seal */}
        <circle cx="60" cy="60" r="49" fill={hc ? '#ffffff' : 'rgba(255,255,255,0.08)'} />
        {/* Mountain peaks */}
        <path
          d="M30 78 L50 48 L62 62 L74 42 L90 78 Z"
          fill={hc ? '#000000' : 'rgba(255,255,255,0.9)'}
        />
        {/* Snow caps */}
        <path d="M50 48 L56 58 L44 58 Z" fill={hc ? '#ffffff' : '#2563eb'} />
        <path d="M74 42 L80 55 L68 55 Z" fill={hc ? '#ffffff' : '#2563eb'} />
        {/* Trees */}
        <path d="M35 78 L38 70 L41 78 Z" fill={hc ? '#000000' : 'rgba(255,255,255,0.7)'} />
        <path d="M78 78 L81 70 L84 78 Z" fill={hc ? '#000000' : 'rgba(255,255,255,0.7)'} />
        {/* EST. 1980 text */}
        <text
          x="60"
          y="96"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          letterSpacing="2"
          fill={hc ? '#000000' : '#ffffff'}
          fontFamily="sans-serif"
        >
          EST. 1980
        </text>
        {/* Top arc text */}
        <path id="topArc" d="M 18,60 A 42,42 0 0,1 102,60" fill="none" />
        <text fontSize="7.5" fontWeight="600" fill={hc ? '#000000' : 'rgba(255,255,255,0.85)'} fontFamily="sans-serif" letterSpacing="1.5">
          <textPath href="#topArc" startOffset="12%">WEST KOOTENAY PARKS &amp; REC</textPath>
        </text>
      </svg>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════
   WEST KOOTENAY PARKS & RECREATION — Government Demo
══════════════════════════════════════════════════════ */
export default function GovernmentMunicipalPage() {
  const [highContrast, setHighContrast] = useState(false)
  const prefersReduced = useReducedMotion()

  /* Colour tokens — flipped in high-contrast mode */
  const hc = highContrast
  const C = {
    navy:        hc ? '#000000' : '#1e3a5f',
    navyLight:   hc ? '#000000' : '#234b7a',
    blue:        hc ? '#000000' : '#2563eb',
    blueHover:   hc ? '#000000' : '#1d4ed8',
    lightGrey:   hc ? '#ffffff' : '#f8fafc',
    white:       hc ? '#ffffff' : '#ffffff',
    black:       hc ? '#000000' : '#000000',
    slate:       hc ? '#000000' : '#475569',
    slateLight:  hc ? '#000000' : '#64748b',
    pageBg:      hc ? '#ffffff' : '#ffffff',
    navBg:       hc ? '#000000' : '#1e3a5f',
    navText:     hc ? '#ffffff' : '#ffffff',
    cardBorder:  hc ? '2px solid #000000' : '4px solid #2563eb',
    inputBorder: hc ? '2px solid #000000' : '1px solid #cbd5e1',
    focusRing:   hc ? '3px solid #000000' : '3px solid #2563eb',
    linkDecor:   hc ? 'underline' : 'none',
    sectionAlt:  hc ? '#f0f0f0' : '#f8fafc',
  }

  /* Topographic SVG pattern (data URI for background) */
  const topoPattern = `
    <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
      <path d='M0 60 Q50 40 100 60 Q150 80 200 60' stroke='%23234b7a' stroke-width='1.2' fill='none' opacity='0.18'/>
      <path d='M0 90 Q40 70 100 90 Q160 110 200 90' stroke='%23234b7a' stroke-width='1' fill='none' opacity='0.14'/>
      <path d='M0 120 Q60 100 100 120 Q140 140 200 120' stroke='%23234b7a' stroke-width='1.2' fill='none' opacity='0.18'/>
      <path d='M0 150 Q50 130 100 150 Q150 170 200 150' stroke='%23234b7a' stroke-width='1' fill='none' opacity='0.13'/>
      <path d='M0 30 Q70 10 100 30 Q130 50 200 30' stroke='%23234b7a' stroke-width='0.8' fill='none' opacity='0.12'/>
      <path d='M0 180 Q55 160 100 180 Q145 200 200 180' stroke='%23234b7a' stroke-width='0.8' fill='none' opacity='0.10'/>
    </svg>
  `
  const topoBg = `url("data:image/svg+xml,${encodeURIComponent(topoPattern)}")`

  return (
    <div
      className={sourceSans.className}
      style={{ backgroundColor: C.pageBg, color: C.navy, minHeight: '100vh' }}
    >
      {/* ── Prefers-reduced-motion + global focus styles ── */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        /* Visible focus rings for all interactive elements */
        .gov-focusable:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 3px;
          border-radius: 4px;
        }
        .gov-hc-focusable:focus-visible {
          outline: 3px solid #000000;
          outline-offset: 3px;
          border-radius: 4px;
        }
        /* Skip link — off-screen until focused */
        .skip-link {
          position: absolute;
          top: -100px;
          left: 16px;
          z-index: 9999;
          padding: 10px 20px;
          background: #2563eb;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 0 0 6px 6px;
          text-decoration: none;
          transition: top 0.2s ease;
        }
        .skip-link:focus {
          top: 0;
          outline: 3px solid #ffffff;
          outline-offset: 2px;
        }
      `}</style>

      {/* ════════════════════════════════
          SKIP TO CONTENT LINK (a11y)
      ════════════════════════════════ */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ═══════════════════════════════
          1. NAV
      ═══════════════════════════════ */}
      <nav
        className="sticky top-0 z-40 px-4 md:px-8"
        style={{
          backgroundColor: C.navBg,
          borderBottom: hc ? '2px solid #ffffff' : 'none',
        }}
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 gap-4">
          {/* Logo / Name */}
          <span
            className="text-lg md:text-xl font-bold tracking-tight leading-tight"
            style={{ color: C.navText, maxWidth: '240px', letterSpacing: '0.02em', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '2px' }}
          >
            West Kootenay Parks &amp; Recreation
          </span>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {['Programs', 'Facilities', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-600 transition-opacity gov-focusable"
                style={{
                  color: C.navText,
                  opacity: 0.85,
                  textDecoration: C.linkDecor,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
              >
                {item}
              </a>
            ))}
            <a
              href="tel:2505550116"
              className="text-sm font-700 gov-focusable"
              style={{ color: C.navText, textDecoration: C.linkDecor }}
            >
              (250) 555-0116
            </a>
          </div>

          {/* High Contrast toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHighContrast((v) => !v)}
              aria-pressed={highContrast}
              aria-label={highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
              className="gov-focusable flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-600 transition-all"
              style={{
                backgroundColor: highContrast ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: highContrast ? '#000000' : '#ffffff',
                border: highContrast ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.3)',
                minHeight: '36px',
                minWidth: '44px',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = highContrast ? '#e5e5e5' : 'rgba(255,255,255,0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = highContrast ? '#ffffff' : 'rgba(255,255,255,0.15)')}
            >
              {/* Eye icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="hidden sm:inline">
                {highContrast ? 'Normal' : 'High Contrast'}
              </span>
            </button>

            {/* Mobile phone link */}
            <a
              href="tel:2505550116"
              className="md:hidden text-sm font-700 gov-focusable"
              style={{ color: C.navText, textDecoration: C.linkDecor }}
            >
              Call
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════ */}
      <main id="main-content" tabIndex={-1}>

        {/* ═══════════════════════════════
            2. HERO — CSS background, no image
        ═══════════════════════════════ */}
        <section
          className="relative overflow-hidden min-h-screen flex items-center"
          style={{
            background: hc
              ? '#000000'
              : `linear-gradient(165deg, #1e3a5f 0%, #162d4a 100%)`,
          }}
          aria-label="Hero section"
        >
          {/* Topographic pattern overlay (CSS background) */}
          {!hc && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: topoBg,
                backgroundRepeat: 'repeat',
                backgroundSize: '200px 200px',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Hero content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 md:py-36 w-full">
            {/* Search bar */}
            <motion.div
              className="mb-12 max-w-2xl mx-auto"
              initial={prefersReduced ? {} : { opacity: 0, y: -20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center rounded-lg overflow-hidden" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}>
                <label htmlFor="hero-search" className="sr-only">
                  Search programs, facilities, hours
                </label>
                <input
                  id="hero-search"
                  type="search"
                  placeholder="Search programs, facilities, hours..."
                  className="gov-focusable flex-1 px-5 py-4 text-base outline-none"
                  style={{
                    color: '#1e3a5f',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '1rem',
                  }}
                />
                <button
                  aria-label="Submit search"
                  className="gov-focusable px-5 py-4 flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    minWidth: '56px',
                    minHeight: '56px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Headline + seal row */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <motion.h1
                  className="text-5xl sm:text-6xl md:text-7xl font-700 leading-tight mb-6"
                  style={{ color: hc ? '#ffffff' : '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
                  initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
                  animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.3 }}
                >
                  Your Community.<br />
                  <span style={{ color: hc ? '#ffffff' : '#93c5fd' }}>Your Parks.</span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
                  style={{ color: hc ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.78)' }}
                  initial={prefersReduced ? {} : { opacity: 0, y: 28 }}
                  animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.5 }}
                >
                  Discover trails, sports facilities, aquatic centres, and hundreds of recreation
                  programs for all ages and abilities across the West Kootenays.
                </motion.p>

                <motion.div
                  initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                  animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <a
                    href="#programs"
                    className="gov-focusable inline-block px-10 font-700 text-base transition-colors rounded-lg"
                    style={{
                      backgroundColor: hc ? '#ffffff' : '#2563eb',
                      color: hc ? '#000000' : '#ffffff',
                      textDecoration: C.linkDecor,
                      border: hc ? '2px solid #ffffff' : 'none',
                      minHeight: '52px',
                      lineHeight: '52px',
                      boxShadow: hc ? 'none' : '0 4px 20px rgba(37,99,235,0.45)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = hc ? '#e0e0e0' : '#1d4ed8'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = hc ? '#ffffff' : '#2563eb'
                    }}
                  >
                    View All Programs
                  </a>
                </motion.div>
              </div>

              {/* Official seal */}
              <div className="flex-shrink-0">
                <OfficialSeal hc={hc} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            3. TRUST BAR
        ═══════════════════════════════ */}
        <div
          className="py-5 px-6"
          style={{
            backgroundColor: hc ? '#f0f0f0' : '#ffffff',
            borderBottom: hc ? '2px solid #000000' : '1px solid #e2e8f0',
          }}
          aria-label="Trust indicators"
        >
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm font-600">
            <div className="flex items-center gap-2">
              <span style={{ color: '#f59e0b', fontSize: '1rem' }} aria-label="5 stars">★★★★★</span>
              <span style={{ color: C.navy }}>4.8 Rating</span>
            </div>
            <div style={{ color: C.slateLight }}>·</div>
            <span style={{ color: C.navy }}>Serving the Kootenays Since 1980</span>
            <div style={{ color: C.slateLight }}>·</div>
            <span style={{ color: C.navy }}>Accessible to All</span>
            <div style={{ color: C.slateLight }}>·</div>
            <span style={{ color: C.navy }}>Open 7 Days</span>
          </div>
        </div>

        {/* ═══════════════════════════════
            4. SERVICES
        ═══════════════════════════════ */}
        <section
          id="programs"
          className="py-20 md:py-28 px-6"
          style={{ backgroundColor: C.sectionAlt }}
          aria-labelledby="services-heading"
        >
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-14">
              <p
                className="text-sm font-700 uppercase tracking-widest mb-3"
                style={{ color: C.blue, letterSpacing: '0.15em' }}
              >
                Digital Services
              </p>
              <h2
                id="services-heading"
                className="text-3xl md:text-4xl font-700"
                style={{ color: C.navy }}
              >
                Better Serving Our Residents
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-base" style={{ color: C.slateLight }}>
                A modern digital presence helps residents find what they need, when they need it.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Custom Website',
                  desc: 'A clear, accessible site residents can use to find programs and contact info.',
                  icon: (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={hc ? '#000000' : '#2563eb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  ),
                },
                {
                  title: 'Email Marketing',
                  desc: 'Keep residents informed about events, closures, and new programs.',
                  icon: (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={hc ? '#000000' : '#2563eb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ),
                },
                {
                  title: 'Google Visibility',
                  desc: 'Make sure residents can find facilities the moment they search.',
                  icon: (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={hc ? '#000000' : '#2563eb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  ),
                },
              ].map((card, i) => (
                <Reveal key={card.title} delay={i * 0.12}>
                  <div
                    className="p-8 rounded-lg transition-shadow"
                    style={{
                      backgroundColor: C.white,
                      borderLeft: C.cardBorder,
                      boxShadow: hc ? 'none' : '0 2px 12px rgba(0,0,0,0.06)',
                      border: hc ? '2px solid #000000' : undefined,
                    }}
                    onMouseEnter={(e) => {
                      if (!hc) e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,99,235,0.12)'
                    }}
                    onMouseLeave={(e) => {
                      if (!hc) e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                      style={{ backgroundColor: hc ? '#e0e0e0' : '#eff6ff' }}
                      aria-hidden="true"
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-700 mb-3" style={{ color: C.navy }}>
                      {card.title}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: C.slate }}>
                      {card.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            5. GALLERY / SHOWCASE
        ═══════════════════════════════ */}
        <section
          className="py-20 md:py-28 px-6"
          style={{ backgroundColor: C.white }}
          aria-labelledby="gallery-heading"
        >
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-12">
              <h2
                id="gallery-heading"
                className="text-3xl md:text-4xl font-700"
                style={{ color: C.navy }}
              >
                Our Parks &amp; Facilities
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-base" style={{ color: C.slateLight }}>
                From trail networks to indoor recreation centres — there&rsquo;s something for everyone.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mb-10">
              <div
                className="overflow-hidden rounded-lg w-full max-w-3xl mx-auto"
                style={{ boxShadow: hc ? 'none' : '0 8px 36px rgba(0,0,0,0.1)', border: hc ? '2px solid #000000' : 'none' }}
              >
                <Image
                  src="/images/demos/government-municipal-showcase.webp"
                  alt="West Kootenay Parks and Recreation — park facilities and trail scenery"
                  width={800}
                  height={500}
                  className="w-full h-auto block"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </Reveal>

            {/* Gallery cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Trail Networks', img: '/images/demos/gallery/gm-1.webp' },
                { label: 'Sports Facilities', img: '/images/demos/gallery/gm-2.webp' },
                { label: 'Community Centres', img: '/images/demos/gallery/gm-3.webp' },
              ].map((item, i) => (
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

        {/* ═══════════════════════════════
            6. TESTIMONIAL
        ═══════════════════════════════ */}
        <section
          className="py-20 md:py-28 px-6"
          style={{ backgroundColor: C.sectionAlt }}
          aria-labelledby="testimonial-heading"
        >
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 id="testimonial-heading" className="sr-only">Community Reviews</h2>
              <div
                className="p-10 md:p-14 rounded-lg"
                style={{
                  backgroundColor: C.white,
                  borderLeft: hc ? '4px solid #000000' : '4px solid #2563eb',
                  border: hc ? '2px solid #000000' : undefined,
                  boxShadow: hc ? 'none' : '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex mb-4" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: hc ? '#000000' : '#f59e0b', fontSize: '1.25rem' }} aria-hidden="true">★</span>
                  ))}
                </div>
                <blockquote>
                  <p
                    className="text-xl md:text-2xl font-600 leading-relaxed mb-6"
                    style={{ color: C.navy, fontStyle: 'italic' }}
                  >
                    &ldquo;Finally a website I can actually navigate. Finding programs and hours is so much easier now.&rdquo;
                  </p>
                  <footer>
                    <cite
                      className="text-sm font-700 not-italic uppercase tracking-wider"
                      style={{ color: C.blue, textDecoration: C.linkDecor }}
                    >
                      &mdash; Community Member, Trail
                    </cite>
                  </footer>
                </blockquote>
                <p className="text-xs mt-6" style={{ color: C.slateLight }}>
                  (Sample review &mdash; your real reviews go here)
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════
            7. ABOUT
        ═══════════════════════════════ */}
        <section
          id="about"
          className="py-20 md:py-28 px-6"
          style={{ backgroundColor: C.white }}
          aria-labelledby="about-heading"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              <Reveal>
                <p
                  className="text-sm font-700 uppercase tracking-widest mb-4"
                  style={{ color: C.blue, letterSpacing: '0.15em' }}
                >
                  About Us
                </p>
                <h2
                  id="about-heading"
                  className="text-3xl md:text-4xl font-700 mb-6"
                  style={{ color: C.navy }}
                >
                  Committed to Our Communities Since 1980
                </h2>
                <p className="text-base leading-relaxed mb-5" style={{ color: C.slate }}>
                  West Kootenay Parks &amp; Recreation has been enriching lives across the region for
                  over four decades. From Nelson to Castlegar, Trail to Rossland, our team manages
                  parks, trails, sports facilities, aquatic centres, and hundreds of recreation
                  programs for all ages and abilities.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: C.slate }}>
                  We believe that access to recreation is a right, not a privilege. Our programs are
                  designed with accessibility in mind &mdash; including adaptive programming for people
                  of all abilities, seniors&rsquo; fitness, youth leadership, and everything in between.
                </p>
                <a
                  href="#contact"
                  className="gov-focusable inline-block px-8 font-700 text-base transition-colors rounded-lg"
                  style={{
                    backgroundColor: C.blue,
                    color: '#ffffff',
                    textDecoration: C.linkDecor,
                    minHeight: '48px',
                    lineHeight: '48px',
                    border: hc ? '2px solid #000000' : 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.blueHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.blue)}
                >
                  Get in Touch
                </a>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { num: '45+', label: 'Parks & Trails' },
                    { num: '12', label: 'Facilities' },
                    { num: '200+', label: 'Programs' },
                    { num: '50K+', label: 'Annual Visits' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center justify-center p-6 text-center rounded-lg"
                      style={{
                        backgroundColor: C.sectionAlt,
                        border: hc ? '2px solid #000000' : '1px solid #e2e8f0',
                      }}
                    >
                      <div className="text-3xl font-700 mb-1" style={{ color: C.blue }}>
                        {stat.num}
                      </div>
                      <div className="text-xs font-600 uppercase tracking-wider" style={{ color: C.slateLight }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            8. CONTACT
        ═══════════════════════════════ */}
        <section
          id="contact"
          className="py-20 md:py-28 px-6"
          style={{ backgroundColor: C.sectionAlt }}
          aria-labelledby="contact-heading"
        >
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-14">
              <p
                className="text-sm font-700 uppercase tracking-widest mb-3"
                style={{ color: C.blue, letterSpacing: '0.15em' }}
              >
                Get in Touch
              </p>
              <h2
                id="contact-heading"
                className="text-3xl md:text-4xl font-700"
                style={{ color: C.navy }}
              >
                Contact West Kootenay Parks &amp; Rec
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Contact info */}
              <Reveal delay={0}>
                <div className="flex flex-col gap-7">
                  {[
                    {
                      label: 'Phone',
                      value: '(250) 555-0116',
                      href: 'tel:2505550116',
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={hc ? '#000000' : '#2563eb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.12 13 19.79 19.79 0 0 1 1.07 4.4 2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 21 16.92z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Email',
                      value: 'info@wkparks.ca',
                      href: 'mailto:info@wkparks.ca',
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={hc ? '#000000' : '#2563eb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Hours',
                      value: '7 Days a Week, 8:00 AM – 6:00 PM',
                      href: null,
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={hc ? '#000000' : '#2563eb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Locations',
                      value: 'Nelson · Trail · Castlegar · Rossland · Nakusp',
                      href: null,
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={hc ? '#000000' : '#2563eb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: hc ? '#e0e0e0' : '#dbeafe',
                          border: hc ? '2px solid #000000' : 'none',
                          minWidth: '44px',
                          minHeight: '44px',
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div
                          className="text-xs font-700 uppercase tracking-wider mb-0.5"
                          style={{ color: C.slateLight }}
                        >
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="gov-focusable font-600 text-base"
                            style={{ color: C.navy, textDecoration: hc ? 'underline' : 'none' }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="font-600 text-base" style={{ color: C.navy }}>
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Contact form */}
              <Reveal delay={0.15}>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  noValidate
                  aria-label="Contact form"
                  style={{
                    backgroundColor: C.white,
                    border: hc ? '2px solid #000000' : '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: hc ? 'none' : '0 4px 20px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block font-600 mb-2 text-base"
                        style={{ color: C.navy }}
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Jane Smith"
                        autoComplete="name"
                        className="gov-focusable w-full px-4 py-3 text-base rounded-lg outline-none transition-colors"
                        style={{
                          border: C.inputBorder,
                          backgroundColor: C.sectionAlt,
                          color: C.navy,
                          minHeight: '48px',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#2563eb')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#cbd5e1')}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-600 mb-2 text-base"
                        style={{ color: C.navy }}
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="jane@example.com"
                        autoComplete="email"
                        className="gov-focusable w-full px-4 py-3 text-base rounded-lg outline-none transition-colors"
                        style={{
                          border: C.inputBorder,
                          backgroundColor: C.sectionAlt,
                          color: C.navy,
                          minHeight: '48px',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#2563eb')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#cbd5e1')}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block font-600 mb-2 text-base"
                        style={{ color: C.navy }}
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        placeholder="Program inquiry, feedback, etc."
                        className="gov-focusable w-full px-4 py-3 text-base rounded-lg outline-none transition-colors"
                        style={{
                          border: C.inputBorder,
                          backgroundColor: C.sectionAlt,
                          color: C.navy,
                          minHeight: '48px',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#2563eb')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#cbd5e1')}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block font-600 mb-2 text-base"
                        style={{ color: C.navy }}
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="How can we help you?"
                        className="gov-focusable w-full px-4 py-3 text-base rounded-lg outline-none transition-colors resize-none"
                        style={{
                          border: C.inputBorder,
                          backgroundColor: C.sectionAlt,
                          color: C.navy,
                          fontFamily: 'inherit',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#2563eb')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = hc ? '#000000' : '#cbd5e1')}
                      />
                    </div>

                    <button
                      type="submit"
                      className="gov-focusable w-full text-base font-700 rounded-lg transition-colors"
                      style={{
                        backgroundColor: C.blue,
                        color: '#ffffff',
                        border: hc ? '2px solid #000000' : 'none',
                        cursor: 'pointer',
                        minHeight: '52px',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.blueHover)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.blue)}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

      </main>

      {/* ═══════════════════════════════
          9. FOOTER
      ═══════════════════════════════ */}
      <footer
        className="py-14 px-6"
        style={{
          backgroundColor: hc ? '#000000' : '#1e3a5f',
          color: '#ffffff',
        }}
        aria-label="Site footer"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-700 mb-2" style={{ color: hc ? '#ffffff' : '#93c5fd' }}>
                West Kootenay Parks &amp; Recreation
              </h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Your community. Your parks.
              </p>
              <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Serving the West Kootenays since 1980.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h3
                className="text-xs font-700 uppercase tracking-widest mb-4"
                style={{ color: hc ? '#ffffff' : '#93c5fd' }}
              >
                Quick Links
              </h3>
              <nav aria-label="Footer navigation">
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {['Programs', 'Facilities', 'About', 'Contact'].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="gov-focusable text-sm transition-opacity"
                        style={{
                          color: 'rgba(255,255,255,0.5)',
                          textDecoration: hc ? 'underline' : 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Info */}
            <div>
              <h3
                className="text-xs font-700 uppercase tracking-widest mb-4"
                style={{ color: hc ? '#ffffff' : '#93c5fd' }}
              >
                Info
              </h3>
              <address className="not-italic flex flex-col gap-2">
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  (250) 555-0116
                </span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  info@wkparks.ca
                </span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Mon–Sun, 8:00 AM – 6:00 PM
                </span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  West Kootenay, BC
                </span>
              </address>
            </div>
          </div>

          <div
            className="pt-6 text-center text-xs"
            style={{
              borderTop: hc ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            &copy; {new Date().getFullYear()} West Kootenay Parks &amp; Recreation. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════
          STICKY BOTTOM BAR
      ═══════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 md:px-8 py-3"
        style={{
          backgroundColor: hc ? 'rgba(255,255,255,0.99)' : 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: hc ? '2px solid #000000' : '2px solid #2563eb',
        }}
        role="complementary"
        aria-label="Sample design notice"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: hc ? '#000000' : '#475569' }}>
            This is a sample design by{' '}
            <strong style={{ color: hc ? '#000000' : '#1e3a5f' }}>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=government-municipal"
            className="gov-focusable inline-block px-6 py-2.5 text-sm font-700 rounded-lg transition-colors whitespace-nowrap"
            style={{
              backgroundColor: hc ? '#000000' : '#2563eb',
              color: '#ffffff',
              textDecoration: hc ? 'underline' : 'none',
              minHeight: '44px',
              lineHeight: '1',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hc ? '#222222' : '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = hc ? '#000000' : '#2563eb')}
          >
            Get This Style &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom spacer for sticky bar */}
      <div className="h-16" aria-hidden="true" />
    </div>
  )
}
