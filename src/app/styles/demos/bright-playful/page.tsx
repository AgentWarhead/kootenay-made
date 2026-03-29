'use client'

import { useState, useRef } from 'react'
import { Nunito } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

/* ── Color tokens ── */
const CORAL = '#ff6b6b'
const TEAL = '#4ecdc4'
const YELLOW = '#ffe66d'
const PURPLE = '#a78bfa'
const SOFT_BG = '#f9f9fb'

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
function Blob({ className = '', color = CORAL }: { className?: string; color?: string }) {
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

function Blob2({ className = '', color = TEAL }: { className?: string; color?: string }) {
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
function FAQItem({ question, answer, accentColor = TEAL }: { question: string; answer: string; accentColor?: string }) {
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
  @import url('https://api.fontshare.com/v2/css?f[]=pally@400,500,700&display=swap');
  .heading-font { font-family: 'Pally', sans-serif; }
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
`

const confettiDots = [
  { color: CORAL, tx: '-40px', ty: '-50px' },
  { color: TEAL, tx: '45px', ty: '-35px' },
  { color: YELLOW, tx: '-30px', ty: '45px' },
  { color: PURPLE, tx: '50px', ty: '40px' },
  { color: CORAL, tx: '0px', ty: '-55px' },
  { color: TEAL, tx: '-50px', ty: '10px' },
  { color: YELLOW, tx: '55px', ty: '0px' },
  { color: PURPLE, tx: '20px', ty: '50px' },
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
        <motion.div className="h-[2px] flex-1 max-w-[80px] rounded-full" style={{ backgroundColor: transformed ? TEAL : '#e0e0e0' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }}
            className={`${nunito.className} text-sm font-extrabold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? TEAL : '#aaa' }}>
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div className="h-[2px] flex-1 max-w-[80px] rounded-full" style={{ backgroundColor: transformed ? TEAL : '#e0e0e0' }} layout transition={{ duration: 0.4 }} />
      </div>

      {/* Fixed-height container */}
      <div className="relative w-full" style={{ minHeight: '520px' }}>
        <AnimatePresence mode="wait">
          {!transformed ? (
            <motion.div key="before"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)', transition: { duration: 0.5 } }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: '#f2f0ed', border: '1px solid #d8d4cf', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              {/* WordPress nav */}
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
              style={{ border: '2px solid rgba(255,107,107,0.25)', borderRadius: '20px', boxShadow: '0 8px 40px rgba(255,107,107,0.12), 0 2px 12px rgba(78,205,196,0.1)' }}>

            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/images/demos/bright-playful-showcase.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.9) 100%)' }} />
            </div>
              {/* Playful nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: '2px solid rgba(255,107,107,0.1)' }}>
                <motion.span className={`heading-font text-base sm:text-lg font-bold`} style={{ color: '#ff8a8a', fontFamily: "'Pally', sans-serif" }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  Sunshine Daycare
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Programs', 'About', 'Gallery', 'Contact'].map((link, i) => (
                    <span key={link} className={`${nunito.className} text-xs font-bold uppercase tracking-widest`} style={{ color: [CORAL, TEAL, PURPLE, YELLOW][i % 4] }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: CORAL }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: TEAL }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: PURPLE }} />
                </motion.div>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-12 flex-1 flex flex-col justify-center overflow-hidden">
                <motion.div className="absolute top-2 right-4 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                    <circle cx="140" cy="40" r="30" fill={CORAL} />
                    <circle cx="170" cy="80" r="18" fill={TEAL} />
                    <circle cx="120" cy="70" r="12" fill={YELLOW} />
                    <circle cx="155" cy="120" r="22" fill={PURPLE} opacity="0.6" />
                    <circle cx="105" cy="110" r="8" fill={CORAL} opacity="0.4" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${nunito.className} text-xs font-extrabold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full`} style={{ backgroundColor: `${TEAL}15`, color: '#7eeee4', border: `2px solid ${TEAL}25` }}>
                      Est. 2016 &mdash; Castlegar, BC
                    </span>
                  </motion.div>
                  <motion.h2 className={`heading-font text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.15] mb-4 sm:max-w-xl`} style={{ color: '#fff', fontFamily: "'Pally', sans-serif" }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    You&rsquo;ll Never Wonder If They&rsquo;re Okay.{' '}
                    <span style={{ color: '#ff8a8a' }}>
                      Here&rsquo;s Why.
                    </span>
                  </motion.h2>
                  <motion.p className={`${nunito.className} text-sm sm:text-base max-w-sm mx-auto sm:mx-0 mb-6`} style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Professional early learning with licensed educators who care.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className={`heading-font inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm transition-all hover:scale-[1.03] active:scale-[0.97]`}
                      style={{ backgroundColor: CORAL, color: '#fff', boxShadow: `0 4px 20px ${CORAL}35`, fontWeight: 700, borderRadius: '50px', fontFamily: "'Pally', sans-serif" }}>
                      Book a Tour — See For Yourself →
                    </a>
                    <span className={`${nunito.className} text-sm`} style={{ color: 'rgba(255,255,255,0.4)' }}>No commitment required</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['Licensed', 'First Aid Certified', '15:1 Ratio'].map((badge) => (
                      <span key={badge} className={`${nunito.className} text-xs font-bold`} style={{ color: '#7eeee4', letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
              {/* Shimmer border */}
              <motion.div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${CORAL}, ${TEAL}, ${CORAL}, transparent)`, backgroundSize: '200% 100%', borderRadius: '0 0 20px 20px' }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button onClick={() => setTransformed(!transformed)}
          className={`${nunito.className} text-sm font-extrabold px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{ backgroundColor: transformed ? `${TEAL}12` : '#fff', color: transformed ? TEAL : '#aaa', border: `2px solid ${transformed ? `${TEAL}30` : '#e0e0e0'}` }}>
          {transformed ? '← See the Before' : '✨ Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SUNSHINE DAYCARE — Bright & Playful Demo
   Order: Nav → Hero → Trust Bar → Safety & Credentials → Daily
          Schedule → Programs by Age → Meet Our Educators →
          Transformation → Parent Testimonials → FAQ →
          Parent Resources → Contact → Footer
   ══════════════════════════════════════════════════════════════ */
export default function BrightPlayfulDemo() {
  const prefersReduced = useReducedMotion()

  const faqItems = [
    {
      question: 'What ages do you accept?',
      answer: 'We welcome children from 6 weeks through 5 years old. Our Before & After School program serves children up to age 12.',
      color: CORAL,
    },
    {
      question: 'Is childcare subsidy accepted?',
      answer: 'Yes. We are registered with the BC Childcare Subsidy program. Our admin team helps families complete the application — we make it easy.',
      color: TEAL,
    },
    {
      question: 'How do I book a tour?',
      answer: 'Call us at (250) 555-0162 or fill out the contact form. We offer tours Monday through Friday at 10 AM or 2 PM, and always love meeting new families.',
      color: PURPLE,
    },
    {
      question: 'What is your sick-child policy?',
      answer: 'Children with fever, vomiting, or contagious illness must stay home until symptom-free for 24 hours. We follow Interior Health guidelines for all communicable diseases.',
      color: CORAL,
    },
    {
      question: 'Are you a licensed childcare centre?',
      answer: 'Yes. Sunshine Daycare is fully licensed by the Province of BC under the Child Care Licensing Regulation. Our licence is posted at the front entrance and available on request.',
      color: TEAL,
    },
  ]

  const dailySchedule = [
    { time: '7:00', label: 'Arrival & Free Play', icon: '🌅', color: '#fff3e0' },
    { time: '8:30', label: 'Morning Circle', icon: '🎵', color: '#e3f2fd' },
    { time: '9:00', label: 'Structured Learning', icon: '📚', color: '#f3e5f5' },
    { time: '10:00', label: 'Outdoor Time', icon: '🌳', color: '#e8f5e9' },
    { time: '11:00', label: 'Arts & Crafts', icon: '🎨', color: '#fff8e1' },
    { time: '12:00', label: 'Lunch', icon: '🥗', color: '#fce4ec' },
    { time: '12:30', label: 'Rest / Quiet Time', icon: '😴', color: '#e8eaf6' },
    { time: '2:30', label: 'Snack & Story', icon: '📖', color: '#e0f2f1' },
    { time: '3:00', label: 'Free Choice Play', icon: '🧩', color: '#fff3e0' },
    { time: '4:00', label: 'Outdoor / Gym', icon: '⚽', color: '#e8f5e9' },
    { time: '5:00', label: 'Wind Down', icon: '🌙', color: '#e3f2fd' },
    { time: '5:30', label: 'Home Time', icon: '🏠', color: '#fce4ec' },
  ]

  return (
    <div className={nunito.className} style={{ fontFamily: 'Nunito, sans-serif', color: '#333', backgroundColor: '#ffffff' }}>

      <style>{confettiStyles}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav className="px-6 py-4 sticky top-0 z-40" style={{ backgroundColor: '#ffffff', borderBottom: `3px solid ${TEAL}` }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl md:text-2xl font-extrabold" style={{ color: CORAL, letterSpacing: '-0.01em' }}>
            Sunshine <span style={{ color: TEAL }}>Daycare</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Programs', 'Schedule', 'Educators', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-bold transition-colors"
                style={{ color: '#666' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
              >
                {link}
              </a>
            ))}
            <a href="tel:2505550162" className="text-sm font-extrabold" style={{ color: CORAL }}>
              (250) 555-0162
            </a>
          </div>
          <a href="tel:2505550162" className="md:hidden text-sm font-extrabold" style={{ color: CORAL }}>
            (250) 555-0162
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #fff5f5 0%, #f0fffe 50%, #fffbeb 100%)' }}>
        <Blob className="absolute -top-20 -left-20 w-64 h-64 opacity-10" color={CORAL} />
        <Blob2 className="absolute top-1/3 -right-16 w-48 h-48 opacity-10" color={TEAL} />
        <Blob className="absolute bottom-10 left-1/4 w-40 h-40 opacity-[0.08]" color={YELLOW} />
        <Blob2 className="absolute -bottom-10 right-1/3 w-56 h-56 opacity-[0.08]" color={PURPLE} />

        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-32 w-full">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                className="inline-block mb-6"
                initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full" style={{ backgroundColor: `${TEAL}15`, color: TEAL, border: `2px solid ${TEAL}25` }}>
                  Licensed Childcare · Castlegar, BC
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
                style={{ color: '#222' }}
                initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Where<br />
                <span style={{ color: CORAL }}>Curiosity</span><br />
                Grows.
              </motion.h1>
              <motion.p
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: '#666' }}
                initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Professional early childhood education in a warm, nurturing environment. Your child is safe, learning, and loved — every single day.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="confetti-parent">
                  {confettiDots.map((dot, i) => (
                    <span key={i} className="confetti-dot"
                      style={{ backgroundColor: dot.color, '--tx': dot.tx, '--ty': dot.ty, animationDelay: `${i * 0.05}s` } as React.CSSProperties}
                    />
                  ))}
                  <a href="#contact"
                    className="inline-block px-8 py-3.5 font-extrabold text-sm rounded-2xl transition-all hover:scale-105 text-white"
                    style={{ backgroundColor: CORAL, boxShadow: `0 4px 20px ${CORAL}40` }}>
                    Book a Tour
                  </a>
                </div>
                <a href="#programs"
                  className="inline-block px-8 py-3.5 font-extrabold text-sm rounded-2xl transition-all hover:scale-105"
                  style={{ backgroundColor: '#fff', border: `2px solid ${TEAL}`, color: TEAL }}>
                  View Programs
                </a>
              </motion.div>
              <motion.p
                className="mt-4 text-sm"
                style={{ color: '#999' }}
                initial={prefersReduced ? {} : { opacity: 0 }}
                animate={prefersReduced ? {} : { opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Download Parent Handbook →
              </motion.p>
            </div>
            <motion.div
              className="hidden md:block"
              initial={prefersReduced ? {} : { opacity: 0, x: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: `0 8px 40px rgba(255,107,107,0.2)`, border: `3px solid ${TEAL}30` }}>
                <Image
                  src="/images/demos/bright-playful-showcase.webp"
                  alt="Sunshine Daycare — children learning and playing"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div className="py-5 px-6" style={{ backgroundColor: TEAL }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm font-bold text-white">
          <span className="flex items-center gap-2">
            <span style={{ color: YELLOW }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            5.0 Rating
          </span>
          <span className="opacity-50">&#183;</span>
          <span>Licensed by BC</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">First Aid Certified Staff</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Ages 6 weeks – 12 years</span>
        </div>
      </div>

      {/* ═══════════ 4. SAFETY & CREDENTIALS ═══════════ */}
      <section className="py-16 px-6" style={{ backgroundColor: SOFT_BG }}>
        <div className="max-w-5xl mx-auto">
          <Bounce>
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3" style={{ color: '#222' }}>
              Your Child&rsquo;s Safety Comes First
            </h2>
            <p className="text-center text-sm mb-10" style={{ color: '#888' }}>
              Every policy, every hire, every protocol — designed for peace of mind.
            </p>
          </Bounce>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🏛️', label: 'Licensed by Province of BC', color: TEAL },
              { icon: '🚑', label: 'All Staff First Aid Certified', color: CORAL },
              { icon: '📹', label: 'Security Cameras Throughout', color: PURPLE },
              { icon: '🌿', label: 'Allergy Protocols in Place', color: '#4caf50' },
              { icon: '👥', label: '6:1 Child–Educator Ratio', color: YELLOW.replace('#', '#d4a500') },
              { icon: '🔒', label: 'Secure Entry System', color: CORAL },
              { icon: '🍱', label: 'Healthy Snacks Provided', color: '#4caf50' },
              { icon: '💊', label: 'Medication Administration Policy', color: PURPLE },
            ].map((item) => (
              <Bounce key={item.label}>
                <div
                  className="rounded-2xl p-4 text-center"
                  style={{ backgroundColor: '#fff', border: `2px solid ${item.color}30`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-xs font-bold leading-snug" style={{ color: '#444' }}>{item.label}</p>
                </div>
              </Bounce>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. A DAY AT SUNSHINE — Schedule Timeline ═══════════ */}
      <section id="schedule" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3" style={{ color: '#222' }}>
              A Day at Sunshine
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: '#888' }}>
              Every hour is intentional — structured enough to learn, free enough to explore.
            </p>
          </Bounce>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <Bounce delay={0.1}>
            <div className="overflow-x-auto pb-4">
              <div className="flex md:grid md:grid-cols-6 gap-3 min-w-max md:min-w-0">
                {dailySchedule.map((block, i) => (
                  <div
                    key={block.time}
                    className="rounded-2xl p-4 text-center flex-shrink-0 w-28 md:w-auto"
                    style={{ backgroundColor: block.color, border: '2px solid rgba(0,0,0,0.05)' }}
                  >
                    <p className="text-xs font-extrabold mb-1" style={{ color: '#555' }}>{block.time}</p>
                    <div className="text-2xl mb-1">{block.icon}</div>
                    <p className="text-xs font-bold leading-tight" style={{ color: '#333' }}>{block.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Bounce>
          <Bounce delay={0.2}>
            <p className="text-center text-xs mt-6" style={{ color: '#bbb' }}>
              Full-day schedule · Mon–Fri · 7:00 AM – 5:30 PM
            </p>
          </Bounce>

          {/* Activity photo gallery */}
          <div className="grid grid-cols-3 gap-3 mt-10">
            {[
              { src: '/images/demos/gallery/bp-1.webp', alt: 'Art class activities at Sunshine Daycare' },
              { src: '/images/demos/gallery/bp-2.webp', alt: 'Children learning and playing' },
              { src: '/images/demos/gallery/bp-3.webp', alt: 'Creative classroom environment' },
            ].map((img, i) => (
              <Bounce key={img.src} delay={0.3 + i * 0.1}>
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </Bounce>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. PROGRAMS BY AGE ═══════════ */}
      <section id="programs" className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #f0fffe 100%)' }}>
        <Blob className="absolute -top-10 -right-10 w-40 h-40 opacity-[0.05]" color={PURPLE} />
        <div className="max-w-5xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3" style={{ color: '#222' }}>
              Programs by Age Group
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: '#888' }}>
              Curriculum and ratios tailored to each developmental stage
            </p>
          </Bounce>

          {/* Tab-style program cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                age: 'Infant',
                range: '6 weeks – 18 months',
                ratio: '3:1',
                color: CORAL,
                emoji: '🍼',
                highlights: ['Sensory play & exploration', 'Sleep schedule support', 'Language development', 'Skin-to-skin bonding time'],
                hours: '7:00 AM – 5:30 PM',
                rate: 'Starting at $45/day',
              },
              {
                age: 'Toddler',
                range: '18 months – 3 years',
                ratio: '4:1',
                color: TEAL,
                emoji: '🧸',
                highlights: ['Potty training support', 'Gross motor development', 'Early language skills', 'Parallel & co-operative play'],
                hours: '7:00 AM – 5:30 PM',
                rate: 'Starting at $40/day',
              },
              {
                age: 'Preschool',
                range: '3 – 5 years',
                ratio: '8:1',
                color: PURPLE,
                emoji: '🎨',
                highlights: ['School readiness programs', 'Letters, numbers & phonics', 'Social-emotional learning', 'Kindergarten preparation'],
                hours: '7:00 AM – 5:30 PM',
                rate: 'Starting at $35/day',
              },
              {
                age: 'Before & After School',
                range: '5 – 12 years',
                ratio: '10:1',
                color: '#4caf50',
                emoji: '🚌',
                highlights: ['Bus pickup & drop-off available', 'Homework help hour', 'Active outdoor time', 'Arts, STEM & free choice'],
                hours: '7:00 – 8:30 AM · 3:00 – 5:30 PM',
                rate: 'Starting at $15/session',
              },
            ].map((program) => (
              <Bounce key={program.age}>
                <div
                  className="rounded-3xl p-6 h-full"
                  style={{ backgroundColor: '#fff', border: `3px solid ${program.color}`, boxShadow: `0 4px 16px ${program.color}18` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{program.emoji}</div>
                    <div>
                      <h3 className="text-xl font-extrabold" style={{ color: program.color }}>{program.age}</h3>
                      <p className="text-xs font-bold" style={{ color: '#888' }}>{program.range}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-xs font-extrabold uppercase tracking-wide" style={{ color: program.color }}>Ratio</p>
                      <p className="text-lg font-extrabold" style={{ color: '#333' }}>{program.ratio}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {program.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm" style={{ color: '#555' }}>
                        <span style={{ color: program.color }}>✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-4 flex items-center justify-between" style={{ borderColor: `${program.color}20` }}>
                    <p className="text-xs" style={{ color: '#888' }}>{program.hours}</p>
                    <p className="text-sm font-extrabold" style={{ color: program.color }}>{program.rate}</p>
                  </div>
                </div>
              </Bounce>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. MEET OUR EDUCATORS ═══════════ */}
      <section id="educators" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3" style={{ color: '#222' }}>
              Meet Our Educators
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: '#888' }}>
              Parents choose a daycare based on the people. Here&rsquo;s our team.
            </p>
          </Bounce>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Lisa T.',
                role: 'Director & Lead ECE',
                cert: 'ECE Level 3 · 12 years',
                note: '"Every child deserves to feel seen, safe, and celebrated — that\'s the Sunshine promise."',
                color: CORAL,
                emoji: '🌟',
              },
              {
                name: 'Ms. Sarah K.',
                role: 'Infant & Toddler Lead',
                cert: 'Infant Toddler Specialist · 8 years',
                note: '"Reading time is my favourite part of every day. The look on their faces when a story surprises them — priceless."',
                color: TEAL,
                emoji: '📚',
              },
              {
                name: 'Mr. James W.',
                role: 'Preschool Educator',
                cert: 'ECE Level 2 · 5 years',
                note: '"I believe the best learning happens when kids don\'t realize they\'re learning at all."',
                color: PURPLE,
                emoji: '🎨',
              },
            ].map((educator) => (
              <Bounce key={educator.name}>
                <div
                  className="rounded-3xl p-6 text-center"
                  style={{ backgroundColor: '#fff', border: `3px solid ${educator.color}30`, boxShadow: `0 4px 16px ${educator.color}12` }}
                >
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl"
                    style={{ backgroundColor: `${educator.color}15`, border: `3px solid ${educator.color}40` }}
                  >
                    {educator.emoji}
                  </div>
                  <h3 className="text-lg font-extrabold mb-1" style={{ color: '#222' }}>{educator.name}</h3>
                  <p className="text-sm font-bold mb-1" style={{ color: educator.color }}>{educator.role}</p>
                  <p className="text-xs mb-4" style={{ color: '#888' }}>{educator.cert}</p>
                  <div className="w-full h-px mb-4" style={{ backgroundColor: `${educator.color}20` }} />
                  <p className="text-sm italic leading-relaxed" style={{ color: '#666' }}>
                    &ldquo;{educator.note}&rdquo;
                  </p>
                </div>
              </Bounce>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 8. THE TRANSFORMATION ═══════════ */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fffe 0%, #fffbeb 100%)' }}>
        <Blob className="absolute -top-10 -right-10 w-40 h-40 opacity-[0.06]" color={CORAL} />
        <div className="max-w-5xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: '#222' }}>
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

      {/* ═══════════ 9. PARENT TESTIMONIALS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3" style={{ color: '#222' }}>
              What Parents Are Saying 💛
            </h2>
            <p className="text-center text-sm mb-16" style={{ color: '#888' }}>
              Specific, warm, and age-tagged — because parents trust parents
            </p>
          </Bounce>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'My 3-year-old comes home singing new songs every day. She actually asks to go on weekends. Sunshine has been incredible — I never worry while I\'m at work.',
                author: 'Jennifer L.',
                age: 'Parent of a 3-year-old',
                color: CORAL,
                emoji: '🌻',
              },
              {
                quote: 'We were nervous about our infant starting daycare. The Sunshine team sent us daily photos the first week. By day three, we were the ones who needed reassurance, not him.',
                author: 'Marcus & Tanya R.',
                age: 'Parents of a 9-month-old',
                color: TEAL,
                emoji: '🍼',
              },
              {
                quote: 'Our daughter started at Sunshine shy and barely speaking. Six months later, she\'s the kid who introduces herself to strangers. The educators deserve all the credit.',
                author: 'Priya S.',
                age: 'Parent of a 4-year-old',
                color: PURPLE,
                emoji: '🌈',
              },
            ].map((t) => (
              <Bounce key={t.author}>
                <div
                  className="rounded-3xl p-6 h-full"
                  style={{ border: `3px solid ${t.color}`, boxShadow: `0 4px 20px ${t.color}18` }}
                >
                  <div className="text-3xl mb-4">{t.emoji}</div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} style={{ color: YELLOW }}>★</span>
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed mb-5" style={{ color: '#555' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="font-extrabold text-sm" style={{ color: t.color }}>— {t.author}</p>
                  <p className="text-xs mt-1" style={{ color: '#bbb' }}>{t.age}</p>
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

      {/* ═══════════ 10. FAQ ═══════════ */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #f0fffe 100%)' }}>
        <Blob2 className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.08]" color={PURPLE} />
        <div className="max-w-3xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3" style={{ color: '#222' }}>
              Questions From Parents 🙋
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

      {/* ═══════════ 11. PARENT RESOURCES ═══════════ */}
      <section className="py-16 px-6" style={{ backgroundColor: SOFT_BG }}>
        <div className="max-w-4xl mx-auto">
          <Bounce>
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10" style={{ color: '#222' }}>
              Parent Resources
            </h2>
          </Bounce>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '📋', label: 'Enrollment Forms', sub: 'Download & return', color: CORAL },
              { icon: '📖', label: 'Parent Handbook', sub: 'Policies & procedures', color: TEAL },
              { icon: '🥗', label: 'Monthly Menu', sub: 'What we serve', color: '#4caf50' },
              { icon: '🎒', label: 'What to Pack', sub: 'Daily checklist', color: PURPLE },
            ].map((r) => (
              <Bounce key={r.label}>
                <div
                  className="rounded-2xl p-5 text-center cursor-pointer transition-all hover:scale-[1.03]"
                  style={{ backgroundColor: '#fff', border: `2px solid ${r.color}30`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  <div className="text-3xl mb-2">{r.icon}</div>
                  <p className="text-sm font-extrabold" style={{ color: r.color }}>{r.label}</p>
                  <p className="text-xs mt-1" style={{ color: '#aaa' }}>{r.sub}</p>
                </div>
              </Bounce>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 12. CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #f0fffe 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12" style={{ color: '#222' }}>
              Come Say Hi! 👋
            </h2>
          </Bounce>

          <div className="grid md:grid-cols-2 gap-12">
            <Bounce>
              <div className="space-y-6">
                <div>
                  <h3 className="font-extrabold mb-1" style={{ color: CORAL }}>Phone</h3>
                  <p style={{ color: '#666' }}>(250) 555-0162</p>
                </div>
                <div>
                  <h3 className="font-extrabold mb-1" style={{ color: TEAL }}>Hours</h3>
                  <p style={{ color: '#666' }}>Mon&ndash;Fri 7:00 AM &ndash; 5:30 PM</p>
                </div>
                <div>
                  <h3 className="font-extrabold mb-1" style={{ color: PURPLE }}>Location</h3>
                  <p style={{ color: '#666' }}>123 Sample St, Castlegar, BC</p>
                </div>
                <div className="confetti-parent">
                  {confettiDots.map((dot, i) => (
                    <span key={i} className="confetti-dot"
                      style={{ backgroundColor: dot.color, '--tx': dot.tx, '--ty': dot.ty, animationDelay: `${i * 0.05}s` } as React.CSSProperties}
                    />
                  ))}
                  <a href="tel:2505550162"
                    className="inline-block px-8 py-3.5 text-white font-extrabold text-sm rounded-2xl transition-all hover:scale-105 mt-4"
                    style={{ backgroundColor: CORAL, boxShadow: `0 4px 20px ${CORAL}30` }}>
                    Book a Tour 🎈
                  </a>
                </div>
              </div>
            </Bounce>

            <Bounce delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-sm font-extrabold mb-1.5" style={{ color: '#333' }}>Parent Name</label>
                  <input type="text" placeholder="Your name"
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                    style={{ border: '2px solid #e0e0e0', color: '#333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = TEAL)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-extrabold mb-1.5" style={{ color: '#333' }}>Email</label>
                  <input type="email" placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                    style={{ border: '2px solid #e0e0e0', color: '#333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = TEAL)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-extrabold mb-1.5" style={{ color: '#333' }}>Message</label>
                  <textarea rows={4} placeholder="Tell us about your child — age, schedule needs, any questions..."
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all resize-none"
                    style={{ border: '2px solid #e0e0e0', color: '#333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = TEAL)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                  />
                </div>
                <button type="submit"
                  className="w-full px-8 py-3.5 text-white font-extrabold text-sm rounded-2xl transition-all hover:opacity-90"
                  style={{ backgroundColor: TEAL }}>
                  Send Message
                </button>
              </form>
            </Bounce>
          </div>
        </div>
      </section>

      {/* ═══════════ 13. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#222' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className="text-lg font-extrabold text-white mb-3">
                Sunshine <span style={{ color: TEAL }}>Daycare</span>
              </h3>
              <p className="text-sm text-white/50">
                Licensed early childhood care in Castlegar, BC.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Programs', 'Schedule', 'Educators', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-white/50 hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white mb-3">Info</h4>
              <p className="text-sm text-white/50 mb-1">Mon–Fri 7:00 AM – 5:30 PM</p>
              <p className="text-sm text-white/50 mb-1">123 Sample St, Castlegar, BC</p>
              <p className="text-sm text-white/50">(250) 555-0162</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-sm text-white/30">&copy; 2025 Sunshine Daycare. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: `3px solid ${TEAL}`,
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-center sm:text-left" style={{ color: '#666' }}>
              Sample design by <strong style={{ color: '#333' }}>Kootenay Made Digital</strong>
            </span>
            <a href="tel:2505550000" className="hidden sm:inline text-sm font-extrabold" style={{ color: CORAL }}>
              (250) 555-0000
            </a>
          </div>
          <Link
            href="/contact?style=bright-playful"
            className="inline-block px-6 py-2.5 text-sm font-extrabold rounded-2xl transition-all hover:scale-105 whitespace-nowrap text-white"
            style={{ backgroundColor: CORAL }}
          >
            Like What You See? Let&rsquo;s Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
