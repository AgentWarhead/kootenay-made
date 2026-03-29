'use client'

import { useState, useRef, useEffect } from 'react'
import { Nunito } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, AnimatePresence, useInView } from 'framer-motion'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

/* ── Bouncy reveal ── */
function Bounce({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 40, scale: 0.95 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={prefersReduced ? {} : { type: 'spring', stiffness: 200, damping: 18, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ── SVG blob shapes ── */
function Blob({ className = '', color = '#ff6b6b' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.3,-0.9C86.7,14.4,80.8,28.8,72.6,41.5C64.4,54.2,53.8,65.2,41.1,72.4C28.4,79.6,14.2,83,-1.4,85.5C-17,88,-34.1,89.6,-47.1,82.6C-60.1,75.6,-69.1,60,-76.1,44.4C-83.1,28.8,-88.2,14.4,-87.3,0.5C-86.5,-13.4,-79.7,-26.9,-71.3,-39C-62.9,-51.1,-52.8,-61.8,-40.6,-70C-28.4,-78.2,-14.2,-83.8,0.6,-84.8C15.4,-85.9,30.7,-83.5,44.7,-76.4Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

function Blob2({ className = '', color = '#4ecdc4' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M39.4,-65.8C52.9,-60.2,67.2,-53.8,74.9,-42.6C82.5,-31.4,83.5,-15.7,81.5,-1.2C79.5,13.4,74.5,26.8,67.1,38.7C59.7,50.6,49.9,61,38.1,67.8C26.3,74.5,13.1,77.5,-0.5,78.4C-14.2,79.2,-28.4,77.9,-40.5,71.5C-52.6,65.1,-62.6,53.6,-70.6,40.7C-78.5,27.8,-84.3,13.9,-83.6,0.4C-83,-13.1,-75.8,-26.1,-67.6,-38.1C-59.4,-50.1,-50,-61,-38.4,-67.7C-26.8,-74.4,-13.4,-76.8,0,-76.8C13.3,-76.8,26.7,-71.4,39.4,-65.8Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

/* ── FAQ Accordion ── */
function FAQItem({ question, answer, accentColor = '#4ecdc4' }: { question: string; answer: string; accentColor?: string }) {
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  return (
    <div
      className="rounded-2xl mb-3 overflow-hidden"
      style={{ border: `2px solid ${open ? accentColor : '#e0e0e0'}`, transition: prefersReduced ? 'none' : 'border-color 0.3s ease' }}
    >
      <button
        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ backgroundColor: open ? `${accentColor}10` : '#fff' }}
      >
        <span className="text-sm font-bold" style={{ color: '#333' }}>{question}</span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-base font-extrabold transition-all"
          style={{
            backgroundColor: open ? accentColor : '#f0f0f0',
            color: open ? '#fff' : '#999',
            transition: prefersReduced ? 'none' : 'all 0.3s ease',
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? '400px' : '0',
          overflow: 'hidden',
          transition: prefersReduced ? 'none' : 'max-height 0.4s ease',
        }}
      >
        <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#666' }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

/* ── Confetti burst CSS keyframes ── */
const confettiStyles = `
  @keyframes confettiBurst {
    0% { transform: translate(0, 0) scale(1); opacity: 1; }
    100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
  }
  .confetti-parent { position: relative; display: inline-block; }
  .confetti-parent:hover .confetti-dot {
    animation: confettiBurst 0.6s ease-out forwards;
  }
  .confetti-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    top: 50%;
    left: 50%;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  @keyframes shimmer-border {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`

const confettiDots = [
  { color: '#ff6b6b', tx: '-40px', ty: '-50px' },
  { color: '#4ecdc4', tx: '45px', ty: '-35px' },
  { color: '#ffe66d', tx: '-30px', ty: '45px' },
  { color: '#a78bfa', tx: '50px', ty: '40px' },
  { color: '#ff6b6b', tx: '0px', ty: '-55px' },
  { color: '#4ecdc4', tx: '-50px', ty: '10px' },
  { color: '#ffe66d', tx: '55px', ty: '0px' },
  { color: '#a78bfa', tx: '20px', ty: '50px' },
]

/* ── Live Redesign Component ── */
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
        <motion.div className="h-[2px] flex-1 max-w-[80px] rounded-full" style={{ backgroundColor: transformed ? '#4ecdc4' : '#e0e0e0' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }}
            className={`${nunito.className} text-sm font-extrabold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? '#4ecdc4' : '#aaa' }}>
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div className="h-[2px] flex-1 max-w-[80px] rounded-full" style={{ backgroundColor: transformed ? '#4ecdc4' : '#e0e0e0' }} layout transition={{ duration: 0.4 }} />
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
              {/* WordPress nav — dull blue-green for a "dated" daycare look */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#4a7a8a', borderBottom: '3px solid #366070' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#ffd700' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", color: '#fff' }}>
                    Sunshine Daycare
                  </span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Programs', 'About', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>&#9776; Menu</span>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #4ecdc4 0%, #ffe66d 50%, #ff6b6b 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", color: '#666' }}>★ Welcome to Our Website ★</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", color: '#3a3a3a', fontWeight: 700, textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>
                    Sunshine Daycare
                  </h2>
                  <p className="text-sm sm:text-lg mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", color: '#666', fontStyle: 'italic' }}>
                    &ldquo;A Safe and Fun Place for Your Children!&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm mb-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", color: '#888' }}>
                    Infant Care &bull; Toddler Programs &bull; Preschool &bull; After School
                  </p>
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {['✓ Licensed', '✓ First Aid Certified', '✓ Subsidy Accepted'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#4a7a8a', color: '#fff', fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm font-bold mb-3" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", color: '#4a7a8a' }}>📞 Call Us: (250) 555-0162</p>
                  <span className="inline-block px-6 py-2.5 text-sm" style={{ backgroundColor: '#4a7a8a', color: '#fff', fontFamily: "'Comic Sans MS', cursive, sans-serif", borderRadius: '4px', cursor: 'default' }}>
                    Enroll Today
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
              style={{ backgroundColor: '#fff', border: '2px solid rgba(78,205,196,0.3)', borderRadius: '24px', boxShadow: '0 8px 40px rgba(78,205,196,0.15), 0 2px 8px rgba(0,0,0,0.04)' }}>
              {/* Colorful nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: '2px solid rgba(78,205,196,0.15)' }}>
                <motion.span className={`${nunito.className} text-base sm:text-lg font-extrabold`} style={{ color: '#ff6b6b' }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  Sunshine <span style={{ color: '#4ecdc4' }}>Daycare</span>
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Programs', 'About', 'Gallery', 'Contact'].map((link, i) => (
                    <span key={link} className={`${nunito.className} text-xs font-bold uppercase tracking-widest`} style={{ color: ['#ff6b6b','#4ecdc4','#a78bfa','#ffe66d'][i % 4] }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: '#ff6b6b' }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: '#4ecdc4' }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: '#a78bfa' }} />
                </motion.div>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-12 flex-1 flex flex-col justify-center overflow-hidden">
                {/* Playful bubble motif */}
                <motion.div className="absolute top-2 right-4 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                    <circle cx="140" cy="40" r="30" fill="#ff6b6b" />
                    <circle cx="170" cy="80" r="18" fill="#4ecdc4" />
                    <circle cx="120" cy="70" r="12" fill="#ffe66d" />
                    <circle cx="155" cy="120" r="22" fill="#a78bfa" opacity="0.6" />
                    <circle cx="105" cy="110" r="8" fill="#ff6b6b" opacity="0.4" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${nunito.className} text-xs font-extrabold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full`} style={{ backgroundColor: 'rgba(78,205,196,0.12)', color: '#4ecdc4', border: '2px solid rgba(78,205,196,0.25)' }}>
                      Est. 2016 &mdash; Castlegar, BC
                    </span>
                  </motion.div>
                  <motion.h2 className={`${nunito.className} text-2xl sm:text-4xl md:text-5xl font-extrabold leading-[1.15] mb-4 sm:max-w-xl`} style={{ color: '#333' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    You&rsquo;ll Never Wonder If They&rsquo;re Okay.{' '}
                    <span className="relative inline-block" style={{ color: '#ff6b6b' }}>
                      Here&rsquo;s Why.
                      <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                        <motion.path d="M4 8 C40 2, 80 2, 120 6 C140 8, 170 4, 196 6" stroke="#ff6b6b" strokeWidth="2.5" strokeLinecap="round" fill="none"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur * 1.5, delay: stagger * 5, ease: 'easeOut' }} />
                      </motion.svg>
                    </span>
                  </motion.h2>
                  <motion.p className={`${nunito.className} text-sm sm:text-base max-w-sm mx-auto sm:mx-0 mb-6`} style={{ color: '#888', lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    A nurturing space where little ones learn, laugh, and grow every day.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className={`${nunito.className} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm rounded-3xl transition-all hover:scale-[1.03] active:scale-[0.97]`}
                      style={{ backgroundColor: '#ff6b6b', color: '#fff', boxShadow: '0 4px 20px rgba(255,107,107,0.35)', fontWeight: 800 }}>
                      Book a Tour — See For Yourself
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <span className={`${nunito.className} text-sm`} style={{ color: '#ccc' }}>No commitment required</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['Licensed', 'First Aid Certified', '15:1 Ratio'].map((badge) => (
                      <span key={badge} className={`${nunito.className} text-xs font-bold`} style={{ color: '#4ecdc4', letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
              {/* Shimmer border */}
              <motion.div className="h-[3px] w-full rounded-b-3xl" style={{ background: 'linear-gradient(90deg, transparent, #ff6b6b, #4ecdc4, #a78bfa, #ffe66d, transparent)', backgroundSize: '200% 100%' }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button onClick={() => setTransformed(!transformed)}
          className={`${nunito.className} text-sm font-extrabold px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{ backgroundColor: transformed ? 'rgba(78,205,196,0.12)' : '#fff', color: transformed ? '#4ecdc4' : '#aaa', border: `2px solid ${transformed ? 'rgba(78,205,196,0.3)' : '#e0e0e0'}` }}>
          {transformed ? '← See the Before' : '✨ Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   LITTLE EXPLORERS DAYCARE — Bright & Playful Demo
   ══════════════════════════════════════════════════════════════ */
export default function BrightPlayfulDemo() {
  const prefersReduced = useReducedMotion()

  const faqItems = [
    {
      question: 'How long does a website take to build?',
      answer: 'Most childcare and family business websites are ready in 2–3 weeks. We work fast so you can start attracting new families right away.',
      color: '#ff6b6b',
    },
    {
      question: 'Can I add a photo gallery and staff pages?',
      answer: 'Absolutely — those are some of the most important features for daycares. Parents want to see the space, the team, and the activities before they ever visit.',
      color: '#4ecdc4',
    },
    {
      question: 'What if I already have a website?',
      answer: 'We\'ll review what you have and either redesign it or rebuild it from scratch — whatever gets you to a site that builds trust with parents.',
      color: '#a78bfa',
    },
    {
      question: 'Do I need to write all the content myself?',
      answer: 'Not at all. We help with copywriting and can work from notes, a phone call, or even your existing Facebook page. You focus on the kids — we\'ll handle the words.',
      color: '#ff6b6b',
    },
    {
      question: 'What does it cost?',
      answer: 'A custom website starts from $1,500. Google Domination (local SEO so parents find you first) starts from $500. Book a free consultation and we\'ll give you a clear, no-surprise quote.',
      color: '#4ecdc4',
    },
  ]

  return (
    <div className={nunito.className} style={{ fontFamily: 'Nunito, sans-serif', color: '#333', backgroundColor: '#ffffff' }}>

      <style>{confettiStyles}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav className="px-6 py-4 sticky top-0 z-40" style={{ backgroundColor: '#ffffff', borderBottom: '3px solid #4ecdc4' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl md:text-2xl font-extrabold" style={{ color: '#ff6b6b', letterSpacing: '-0.01em' }}>
            Little Explorers <span style={{ color: '#4ecdc4' }}>Daycare</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Programs', 'About', 'Gallery', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-bold transition-colors"
                style={{ color: '#666' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b6b')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
              >
                {link}
              </a>
            ))}
            <a href="tel:2505550162" className="text-sm font-extrabold" style={{ color: '#ff6b6b' }}>
              (250) 555-0162
            </a>
          </div>
          <a href="tel:2505550162" className="md:hidden text-sm font-extrabold" style={{ color: '#ff6b6b' }}>
            (250) 555-0162
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #fff5f5 0%, #f0fffe 50%, #fffbeb 100%)' }}>
        <Blob className="absolute -top-20 -left-20 w-64 h-64 opacity-10" color="#ff6b6b" />
        <Blob2 className="absolute top-1/3 -right-16 w-48 h-48 opacity-10" color="#4ecdc4" />
        <Blob className="absolute bottom-10 left-1/4 w-40 h-40 opacity-8" color="#ffe66d" />
        <Blob2 className="absolute -bottom-10 right-1/3 w-56 h-56 opacity-8" color="#a78bfa" />

        <div className="relative max-w-4xl mx-auto text-center px-6 py-28 md:py-40 w-full">
          <motion.div
            className="text-6xl md:text-7xl mb-6"
            initial={prefersReduced ? {} : { scale: 0, rotate: -20 }}
            animate={prefersReduced ? {} : { scale: 1, rotate: 0 }}
            transition={prefersReduced ? {} : { type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
          >
            🌈
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            style={{ color: '#333' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Where <span style={{ color: '#ff6b6b' }}>Fun</span> Comes{' '}
            <span style={{ color: '#4ecdc4' }}>First!</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: '#666' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            A nurturing, creative space where little ones learn, play, and grow every day.
          </motion.p>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="confetti-parent">
              {confettiDots.map((dot, i) => (
                <span
                  key={i}
                  className="confetti-dot"
                  style={{
                    backgroundColor: dot.color,
                    '--tx': dot.tx,
                    '--ty': dot.ty,
                    animationDelay: `${i * 0.05}s`,
                  } as React.CSSProperties}
                />
              ))}
              <a
                href="#contact"
                className="inline-block px-10 py-4 text-white font-extrabold text-sm rounded-3xl transition-all hover:scale-105"
                style={{ backgroundColor: '#ff6b6b', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}
              >
                Book a Tour 🎈
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div className="py-5 px-6" style={{ backgroundColor: '#4ecdc4' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm font-bold text-white">
          <span className="flex items-center gap-2">
            <span style={{ color: '#ffe66d' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            5.0 Rating
          </span>
          <span className="opacity-50">&#183;</span>
          <span>Licensed Childcare</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">8am&ndash;5:30pm</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Ages 6 weeks&ndash;5 years</span>
        </div>
      </div>

      {/* ═══════════ 4. SERVICES — with PAS intro ═══════════ */}
      <section id="programs" className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ backgroundColor: '#fff' }}>
        <Blob className="absolute -top-10 -right-10 w-40 h-40 opacity-5" color="#a78bfa" />
        <div className="max-w-6xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: '#333' }}>
              What We Can Do For You
            </h2>
          </Bounce>

          {/* PAS copy */}
          <Bounce delay={0.1}>
            <p className="text-center text-base md:text-lg leading-relaxed mb-16 max-w-2xl mx-auto" style={{ color: '#999' }}>
              Parents Google daycares and pick the one that looks most trustworthy online — is that you? If your
              website doesn&rsquo;t show your space, your team, and your warmth, they&rsquo;re enrolling somewhere else.
              Let&rsquo;s fix that.
            </p>
          </Bounce>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                price: 'From $1,500',
                desc: 'A colourful, welcoming website that shows parents exactly why their kids will love it here.',
                color: '#ff6b6b',
                emoji: '🎨',
              },
              {
                title: 'Google Visibility',
                price: 'From $500',
                desc: 'Help parents find you when they search for childcare in the Kootenays.',
                color: '#4ecdc4',
                emoji: '📍',
              },
              {
                title: 'Social Media',
                price: 'From $750',
                desc: 'Engaging posts and updates that build community and trust with families.',
                color: '#a78bfa',
                emoji: '💜',
              },
            ].map((card, i) => (
              <Bounce key={card.title} delay={i * 0.12}>
                <motion.div
                  className="p-8 text-center rounded-3xl cursor-default"
                  style={{
                    backgroundColor: '#fff',
                    border: `3px solid ${card.color}`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  }}
                  whileHover={prefersReduced ? {} : { rotate: [-1, 1, -1, 0], transition: { duration: 0.4 } }}
                >
                  <div className="text-4xl mb-4">{card.emoji}</div>
                  <h3 className="text-xl font-extrabold mb-1" style={{ color: card.color }}>
                    {card.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${card.color}88` }}>
                    {card.price}
                  </p>
                  <p className="leading-relaxed text-sm" style={{ color: '#666' }}>
                    {card.desc}
                  </p>
                </motion.div>
              </Bounce>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #f0fffe 100%)' }}>
        <Blob2 className="absolute -bottom-10 -left-10 w-40 h-40 opacity-8" color="#ffe66d" />
        <div className="max-w-4xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: '#333' }}>
              How It Works ✨
            </h2>
            <p className="text-center mb-14 max-w-xl mx-auto" style={{ color: '#999' }}>
              Three easy steps to a website families will love
            </p>
          </Bounce>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div
              className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-1 rounded-full"
              style={{ background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #a78bfa)' }}
            />
            {[
              {
                step: '1',
                emoji: '👋',
                title: 'We Talk',
                desc: 'A free, friendly chat about your daycare, what makes it special, and what you need from a website.',
                color: '#ff6b6b',
              },
              {
                step: '2',
                emoji: '🎨',
                title: 'We Build',
                desc: 'We design and build your site in about 2 weeks — colourful, warm, and totally on-brand for your centre.',
                color: '#4ecdc4',
              },
              {
                step: '3',
                emoji: '🚀',
                title: 'You Grow',
                desc: 'Launch, get found on Google, and start getting enquiry emails from parents who love what they see.',
                color: '#a78bfa',
              },
            ].map((item, i) => (
              <Bounce key={item.step} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4 text-2xl relative z-10 shadow-md"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.emoji}
                  </div>
                  <h3 className="text-xl font-extrabold mb-2" style={{ color: item.color }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                    {item.desc}
                  </p>
                </div>
              </Bounce>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY ═══════════ */}
      <section id="gallery" className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-6xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: '#333' }}>
              A Day at Little Explorers
            </h2>
            <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: '#999' }}>
              Smiles, creativity, and adventure — every single day
            </p>
          </Bounce>

          <Bounce delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
                <Image
                  src="/images/demos/bright-playful-showcase.webp"
                  alt="Little Explorers Daycare — children playing and learning"
                  width={800}
                  height={500}
                  className="w-full h-auto max-w-3xl block"
                />
              </div>
            </div>
          </Bounce>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {[
              { label: 'Arts & Crafts', color: '#ff6b6b' },
              { label: 'Outdoor Play', color: '#4ecdc4' },
              { label: 'Story Time', color: '#a78bfa' },
            ].map((item, i) => (
              <Bounce key={item.label} delay={0.15 + i * 0.1}>
                <div className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                  <Image src={`/images/demos/gallery/bp-${i + 1}.webp`} alt={item.label} fill className='object-cover' />
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                    <span className='text-white text-sm font-medium'>{item.label}</span>
                  </div>
                </div>
              </Bounce>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. THE TRANSFORMATION ═══════════ */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fffe 0%, #fffbeb 100%)' }}>
        <Blob className="absolute -top-10 -right-10 w-40 h-40 opacity-6" color="#ff6b6b" />
        <div className="max-w-5xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: '#333' }}>
              Watch Your Website Transform ✨
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: '#aaa' }}>
              From dated to designed — in real time
            </p>
          </Bounce>

          <Bounce delay={0.1}>
            <LiveRedesign />
          </Bounce>
        </div>
      </section>

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: '#333' }}>
              Happy Families 💛
            </h2>
            <p className="text-center mb-16 max-w-xl mx-auto" style={{ color: '#999' }}>
              Real results for real Kootenay businesses
            </p>
          </Bounce>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'We were running on word-of-mouth only. Within two weeks of launching our new site, we had a waitlist. Parents said the website made them feel safe right away.',
                author: 'Jennifer L.',
                business: 'Sunflower Early Learning',
                town: 'Castlegar',
                color: '#ff6b6b',
                emoji: '🌻',
              },
              {
                quote: 'Our enrolments doubled in the first month. Families told us our site looked the most professional and trustworthy out of all the daycares they visited online.',
                author: 'Marcus &amp; Tanya R.',
                business: 'Pebble Creek Pet Resort',
                town: 'Nelson',
                color: '#4ecdc4',
                emoji: '🐾',
              },
              {
                quote: 'I run a small boutique and thought a nice website was out of my budget. Kootenay Made proved me wrong — and now I get found on Google every week.',
                author: 'Carla W.',
                business: 'Bloom &amp; Co. Boutique',
                town: 'Revelstoke',
                color: '#a78bfa',
                emoji: '🛍️',
              },
            ].map((t, i) => (
              <Bounce key={t.author} delay={i * 0.12}>
                <div
                  className="p-8 rounded-3xl h-full"
                  style={{
                    border: `3px solid ${t.color}`,
                    boxShadow: `0 4px 20px ${t.color}18`,
                  }}
                >
                  <div className="text-3xl mb-4">{t.emoji}</div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} style={{ color: '#ffe66d' }}>★</span>
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed mb-5" style={{ color: '#555' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="font-extrabold text-sm" style={{ color: t.color }}>
                    &mdash; <span dangerouslySetInnerHTML={{ __html: t.author }} />, {t.town}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#ccc' }}>{t.business}</p>
                </div>
              </Bounce>
            ))}
          </div>
          <Bounce delay={0.3}>
            <p className="text-center text-xs mt-8" style={{ color: '#ccc' }}>
              (Sample reviews &mdash; your real reviews go here)
            </p>
          </Bounce>
        </div>
      </section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #f0fffe 100%)' }}>
        <Blob2 className="absolute -bottom-10 -right-10 w-48 h-48 opacity-8" color="#a78bfa" />
        <div className="max-w-3xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: '#333' }}>
              Got Questions? 🙋
            </h2>
            <p className="text-center mb-12" style={{ color: '#999' }}>
              Here are the ones we hear most often
            </p>
          </Bounce>

          <Bounce delay={0.1}>
            <div>
              {faqItems.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} accentColor={item.color} />
              ))}
            </div>
          </Bounce>
        </div>
      </section>

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section id="about" className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ backgroundColor: '#fff' }}>
        <Blob className="absolute -bottom-16 -right-16 w-48 h-48 opacity-8" color="#ff6b6b" />
        <div className="max-w-3xl mx-auto text-center">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6" style={{ color: '#333' }}>
              About Little Explorers
            </h2>
          </Bounce>
          <Bounce delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: '#666' }}>
              Little Explorers Daycare was founded by parents, for parents. We know how important it is to find a safe, joyful place for your child to learn and grow. Our licensed team of early childhood educators creates a warm, stimulating environment where children aged 6 weeks to 5 years can explore through play, art, music, and nature. Located in the heart of Castlegar, we have been a trusted part of the community since 2016 &mdash; and we would love for your family to become part of ours.
            </p>
          </Bounce>
        </div>
      </section>

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #f0fffe 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12" style={{ color: '#333' }}>
              Come Say Hi! 👋
            </h2>
          </Bounce>

          <div className="grid md:grid-cols-2 gap-12">
            <Bounce>
              <div className="space-y-6">
                <div>
                  <h3 className="font-extrabold mb-1" style={{ color: '#ff6b6b' }}>Phone</h3>
                  <p style={{ color: '#666' }}>(250) 555-0162</p>
                </div>
                <div>
                  <h3 className="font-extrabold mb-1" style={{ color: '#4ecdc4' }}>Hours</h3>
                  <p style={{ color: '#666' }}>Mon&ndash;Fri 7:30 AM &ndash; 5:30 PM</p>
                </div>
                <div>
                  <h3 className="font-extrabold mb-1" style={{ color: '#a78bfa' }}>Location</h3>
                  <p style={{ color: '#666' }}>123 Sample Ave, Castlegar, BC</p>
                </div>
                <div className="confetti-parent">
                  {confettiDots.map((dot, i) => (
                    <span
                      key={i}
                      className="confetti-dot"
                      style={{
                        backgroundColor: dot.color,
                        '--tx': dot.tx,
                        '--ty': dot.ty,
                        animationDelay: `${i * 0.05}s`,
                      } as React.CSSProperties}
                    />
                  ))}
                  <a
                    href="tel:2505550162"
                    className="inline-block px-8 py-3.5 text-white font-extrabold text-sm rounded-3xl transition-all hover:scale-105 mt-4"
                    style={{ backgroundColor: '#ff6b6b', boxShadow: '0 4px 20px rgba(255,107,107,0.3)' }}
                  >
                    Book a Tour 🎈
                  </a>
                </div>
              </div>
            </Bounce>

            <Bounce delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-sm font-extrabold mb-1.5" style={{ color: '#333' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                    style={{ border: '2px solid #e0e0e0', color: '#333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4ecdc4')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-extrabold mb-1.5" style={{ color: '#333' }}>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                    style={{ border: '2px solid #e0e0e0', color: '#333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4ecdc4')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-extrabold mb-1.5" style={{ color: '#333' }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your child and schedule needs..."
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all resize-none"
                    style={{ border: '2px solid #e0e0e0', color: '#333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4ecdc4')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3.5 text-white font-extrabold text-sm rounded-2xl transition-all hover:opacity-90"
                  style={{ backgroundColor: '#4ecdc4' }}
                >
                  Send Message
                </button>
              </form>
            </Bounce>
          </div>
        </div>
      </section>

      {/* ═══════════ 12. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#333' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className="text-lg font-extrabold text-white mb-3">
                Little Explorers <span style={{ color: '#4ecdc4' }}>Daycare</span>
              </h3>
              <p className="text-sm text-white/50">
                A joyful place where children learn and grow.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Programs', 'About', 'Gallery', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white mb-3">Info</h4>
              <p className="text-sm text-white/50 mb-1">Mon&ndash;Fri 7:30 AM &ndash; 5:30 PM</p>
              <p className="text-sm text-white/50 mb-1">123 Sample Ave, Castlegar, BC</p>
              <p className="text-sm text-white/50">(250) 555-0162</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-sm text-white/30">
              &copy; 2025 Little Explorers Daycare. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '3px solid #4ecdc4',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-center sm:text-left" style={{ color: '#666' }}>
              Sample design by <strong style={{ color: '#333' }}>Kootenay Made Digital</strong>
            </span>
            <a href="tel:2505550000" className="hidden sm:inline text-sm font-extrabold" style={{ color: '#ff6b6b' }}>
              (250) 555-0000
            </a>
          </div>
          <Link
            href="/contact?style=bright-playful"
            className="inline-block px-6 py-2.5 text-sm font-extrabold rounded-3xl transition-all hover:scale-105 whitespace-nowrap text-white"
            style={{ backgroundColor: '#ff6b6b' }}
          >
            Like What You See? Let's Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
