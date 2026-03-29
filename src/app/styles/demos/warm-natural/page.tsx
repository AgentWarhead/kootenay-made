'use client'

import { useState, useRef } from 'react'
import { Nunito } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion'


const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600'] })

/* ── Floating botanical SVG leaves ── */
function LeafOne() {
  return (
    <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C16 0 2 16 2 28C2 38 8 46 16 48C24 46 30 38 30 28C30 16 16 0 16 0Z" fill="#7d9a6b" opacity="0.18" />
      <path d="M16 6V44" stroke="#7d9a6b" strokeWidth="0.8" opacity="0.22" />
    </svg>
  )
}
function LeafTwo() {
  return (
    <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="14" cy="20" rx="12" ry="18" fill="#d4a574" opacity="0.14" />
      <path d="M14 4V36" stroke="#d4a574" strokeWidth="0.6" opacity="0.2" />
    </svg>
  )
}
function LeafThree() {
  return (
    <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C6 8 0 16 2 24C4 32 10 36 12 36C14 36 20 32 22 24C24 16 18 8 12 0Z" fill="#7d9a6b" opacity="0.15" />
    </svg>
  )
}
function LeafFour() {
  return (
    <svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4 10 0 18 3 24C6 30 10 32 10 32C10 32 14 30 17 24C20 18 16 10 10 0Z" fill="#d4a574" opacity="0.12" />
      <path d="M10 4V28" stroke="#d4a574" strokeWidth="0.5" opacity="0.18" />
    </svg>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >{children}</motion.div>
  )
}

const botanicalKeyframes = `
@keyframes floatA { 0%,100% { transform:translateY(0px) rotate(0deg); } 50% { transform:translateY(-18px) rotate(6deg); } }
@keyframes floatB { 0%,100% { transform:translateY(0px) rotate(0deg); } 50% { transform:translateY(-14px) rotate(-5deg); } }
@keyframes floatC { 0%,100% { transform:translateY(0px) rotate(0deg); } 50% { transform:translateY(-22px) rotate(8deg); } }
@keyframes floatD { 0%,100% { transform:translateY(0px) rotate(0deg); } 50% { transform:translateY(-10px) rotate(-4deg); } }
@keyframes shimmer-border { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
@import url('https://api.fontshare.com/v2/css?f[]=erode@400,500,700&display=swap');
        .heading-font { font-family: 'Erode', serif; }
        @media (prefers-reduced-motion: reduce) { .botanical-float { animation: none !important; } }
`

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="#d4a574">
      <path d="M10 1l2.47 5.01L18 6.94l-4 3.9.94 5.5L10 13.77l-4.94 2.6.94-5.5-4-3.9 5.53-.93L10 1z" />
    </svg>
  )
}

/* ── Live Redesign (warm-natural) ─────────────────────── */
function LiveRedesign() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [transformed, setTransformed] = useState(false)

  const dur = prefersReduced ? 0.01 : 0.9
  const stagger = prefersReduced ? 0 : 0.18

  const sage = '#7d9a6b'
  const darkSage = '#4f6e40'
  const warm = '#d4a574'
  const cream = '#faf6f0'

  return (
    <div ref={ref} className="w-full">
      {/* Bold label */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? sage : '#ccc' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className={`${nunito.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? sage : '#888' }}
          >{transformed ? '✨ After' : 'Before'}</motion.span>
        </AnimatePresence>
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? sage : '#ccc' }} layout transition={{ duration: 0.4 }} />
      </div>

      {/* Fixed-height container */}
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
              {/* Fake WordPress nav */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#5c4a32', borderBottom: '3px solid #3d3022' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#8b7355' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>Mountain Flow Wellness</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Classes', 'Services', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>&#9776; Menu</span>
              </div>
              {/* Hero area */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 md:py-16 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #7d9a6b 0%, #d4a574 50%, #f0e0c0 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2 sm:mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#666', letterSpacing: '0.15em' }}>&#9733; Welcome to Our Website &#9733;</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2 sm:mb-3" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700, textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>Mountain Flow Wellness</h2>
                  <p className="text-sm sm:text-lg mb-1 sm:mb-2" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>&ldquo;Yoga, Massage, and Holistic Healing. Namaste!&rdquo;</p>
                  <p className="text-xs sm:text-sm mb-4 sm:mb-6" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>Yoga &bull; Massage &bull; Reiki &bull; Meditation &bull; Sound Healing</p>
                  <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                    {['✓ Certified Instructors', '✓ All Levels', '✓ Gift Cards'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#5c4a32', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#5c4a32' }}>&#128222; Call Us Today: (250) 555-0165</p>
                  <span className="inline-block px-6 py-2.5 text-sm" style={{ backgroundColor: '#7d9a6b', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', border: '1px solid #5c4a32', cursor: 'default' }}>Book a Free Consultation</span>
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
              style={{ border: `1px solid ${sage}30`, borderRadius: '16px', boxShadow: `0 8px 40px ${sage}15, 0 2px 8px rgba(0,0,0,0.04)` }}
            >
              
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/images/demos/warm-natural-showcase.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.9) 100%)' }} />
            </div>
{/* Grain texture */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`, opacity: 0.4 }} />
              {/* Elegant nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${sage}15` }}>
                <motion.span className={`${"heading-font"} text-base sm:text-lg`} style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  Mountain Flow Wellness
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Classes', 'Services', 'About', 'Contact'].map((link) => (
                    <span key={link} className={`${nunito.className} text-xs uppercase tracking-widest`} style={{ color: sage, fontWeight: 500 }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: sage }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: sage }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: sage }} />
                </motion.div>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-10 flex-1 flex flex-col justify-center">
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="240" height="240" viewBox="0 0 180 180" fill="none">
                    <path d="M180 20 C140 30, 100 10, 60 40 C20 70, 10 120, 30 160" stroke={sage} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M160 0 C130 20, 110 60, 130 100 C150 140, 170 150, 160 180" stroke={warm} strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="4 6" />
                    <ellipse cx="100" cy="50" rx="12" ry="6" stroke={sage} strokeWidth="1" fill="none" transform="rotate(-30 100 50)" />
                    <ellipse cx="70" cy="90" rx="9" ry="5" stroke={sage} strokeWidth="1" fill="none" transform="rotate(10 70 90)" />
                    <circle cx="140" cy="30" r="3" fill={warm} opacity="0.4" />
                    <circle cx="55" cy="130" r="2" fill={sage} opacity="0.3" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${nunito.className} text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full`} style={{ backgroundColor: `${sage}18`, color: sage, border: `1px solid ${sage}25` }}>
                      Est. 2014 &mdash; West Kootenay
                    </span>
                  </motion.div>
                  <motion.h2 className={`${"heading-font"} text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-4 sm:mb-5 sm:max-w-xl`}
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    You Carry Enough.<br />Put It Down{' '}
                    <span className="relative inline-block" style={{ color: sage, fontStyle: 'italic' }}>
                      for an Hour.
                      <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                        <motion.path d="M4 8 C40 2, 80 4, 120 7 C150 9, 172 5, 196 7" stroke={sage} strokeWidth="2" strokeLinecap="round" fill="none"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur * 1.5, delay: stagger * 5, ease: 'easeOut' }} />
                      </motion.svg>
                    </span>
                  </motion.h2>
                  <motion.p className={`${nunito.className} text-sm sm:text-lg max-w-md sm:mx-0 mx-auto mb-6 sm:mb-8`}
                    style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.7, lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Yoga, massage, reiki &mdash; a sanctuary designed to quiet the noise and restore your balance.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className={`${"heading-font"} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
                      style={{ backgroundColor: sage, color: '#fff', boxShadow: `0 4px 20px ${sage}35`, letterSpacing: '0.02em' }}>
                      View Schedule
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <span className={`${nunito.className} text-sm`} style={{ color: '#999' }}>No commitment required</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-5 sm:mt-8 flex-wrap"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['Certified RYT-500', '10+ Classes Weekly', 'All Levels'].map((badge) => (
                      <span key={badge} className={`${nunito.className} text-xs`} style={{ color: sage, opacity: 0.7, letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${sage}, ${warm}, ${sage})`, backgroundSize: '200% 100%', animation: 'shimmer-border 3s linear infinite' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setTransformed(!transformed)}
          className={`${nunito.className} text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{ backgroundColor: transformed ? `${'#7d9a6b'}15` : '#fff', color: transformed ? '#4f6e40' : '#666', border: `1.5px solid ${transformed ? `${'#7d9a6b'}30` : '#ddd'}`, boxShadow: transformed ? `0 2px 12px ${'#7d9a6b'}10` : '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          {transformed ? '← See the Before' : '✨ Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ── FAQ Accordion (warm style) ── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.2)', borderRadius: '25px 20px 22px 28px / 20px 28px 22px 25px', overflow: 'hidden' }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
            aria-expanded={open === i}>
            <span className={`${"heading-font"} text-base font-bold`} style={{ color: open === i ? '#7d9a6b' : '#8b7355' }}>{item.q}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
              style={{ color: '#a8d49a', flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: prefersReduced ? 'none' : 'transform 0.3s ease' }}>
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.8 }}>{item.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MOUNTAIN FLOW WELLNESS — Warm Natural Demo
   ══════════════════════════════════════════════════════════════ */
export default function WarmNaturalDemo() {
  const prefersReduced = useReducedMotion()

  const schedule = [
    {
      day: 'MON',
      classes: [
        { name: 'Morning Flow', time: '7:00 AM', instructor: 'Priya', level: 'All Levels', color: '#a8d49a' },
        { name: 'Restorative Yoga', time: '6:00 PM', instructor: 'Mei', level: 'Restorative', color: '#d4a574' },
      ],
    },
    {
      day: 'TUE',
      classes: [
        { name: 'Vinyasa Flow', time: '9:00 AM', instructor: 'Priya', level: 'Intermediate', color: '#a8c09a' },
        { name: 'Yin & Breathwork', time: '7:00 PM', instructor: 'Mei', level: 'All Levels', color: '#d4a574' },
      ],
    },
    {
      day: 'WED',
      classes: [
        { name: 'Gentle Yoga', time: '10:00 AM', instructor: 'Sasha', level: 'All Levels', color: '#a8d49a' },
        { name: 'Power Flow', time: '5:30 PM', instructor: 'Priya', level: 'Intermediate', color: '#a8c09a' },
      ],
    },
    {
      day: 'THU',
      classes: [
        { name: 'Morning Meditation', time: '7:30 AM', instructor: 'Mei', level: 'All Levels', color: '#d4a574' },
        { name: 'Deep Stretch', time: '6:00 PM', instructor: 'Sasha', level: 'Restorative', color: '#d4a574' },
      ],
    },
    {
      day: 'FRI',
      classes: [
        { name: 'Flow & Restore', time: '9:00 AM', instructor: 'Priya', level: 'All Levels', color: '#a8d49a' },
        { name: 'Candlelight Yoga', time: '7:00 PM', instructor: 'Mei', level: 'Restorative', color: '#d4a574' },
      ],
    },
    {
      day: 'SAT',
      classes: [
        { name: 'Weekend Flow', time: '8:30 AM', instructor: 'Priya', level: 'All Levels', color: '#a8d49a' },
        { name: 'Sound Bath', time: '4:00 PM', instructor: 'Sasha', level: 'All Levels', color: '#d4a574' },
      ],
    },
    {
      day: 'SUN',
      classes: [
        { name: 'Slow Sunday', time: '10:00 AM', instructor: 'Mei', level: 'Restorative', color: '#d4a574' },
      ],
    },
  ]

  const levelColors: Record<string, string> = {
    'All Levels': '#7d9a6b',
    'Intermediate': '#a8c09a',
    'Restorative': '#d4a574',
  }

  return (
    <div className={nunito.className} style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,255,255,0.5)' }}>
      <style dangerouslySetInnerHTML={{ __html: botanicalKeyframes }} />

      {/* Watercolor blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl" style={{ backgroundColor: '#7d9a6b', opacity: 0.1 }} />
        <div className="absolute top-1/4 -right-60 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: '#d4a574', opacity: 0.1 }} />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl" style={{ backgroundColor: '#7d9a6b', opacity: 0.08 }} />
        <div className="absolute -bottom-40 right-1/4 w-[350px] h-[350px] rounded-full blur-3xl" style={{ backgroundColor: '#d4a574', opacity: 0.08 }} />
      </div>

      {/* Floating botanicals */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
        <div className="botanical-float absolute top-[12%] left-[8%]" style={{ animation: prefersReduced ? 'none' : 'floatA 15s ease-in-out infinite' }}><LeafOne /></div>
        <div className="botanical-float absolute top-[30%] right-[6%]" style={{ animation: prefersReduced ? 'none' : 'floatB 20s ease-in-out infinite' }}><LeafTwo /></div>
        <div className="botanical-float absolute top-[55%] left-[4%]" style={{ animation: prefersReduced ? 'none' : 'floatC 25s ease-in-out infinite' }}><LeafThree /></div>
        <div className="botanical-float absolute top-[75%] right-[10%]" style={{ animation: prefersReduced ? 'none' : 'floatD 18s ease-in-out infinite' }}><LeafFour /></div>
      </div>

      <div className="relative z-10">
        {/* ── NAV ── */}
        <nav className="px-6 py-4" style={{ backgroundColor: 'rgba(250,246,240,0.92)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className={`${"heading-font"} text-xl md:text-2xl font-bold`} style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', letterSpacing: '0.03em' }}>Mountain Flow Wellness</span>
            <div className="hidden md:flex items-center gap-8">
              {['Schedule', 'Classes', 'About', 'Contact'].map((label) => (
                <a key={label} href={`#${label.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#7d9a6b')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#8b7355')}>{label}</a>
              ))}
              <span className="text-sm font-semibold" style={{ color: '#a8d49a' }}>(250) 555-0165</span>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{  }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(125,154,107,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, rgba(212,165,116,0.1) 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(125,154,107,0.08) 0%, transparent 50%)' }} />
          </div>
          <motion.div className="relative max-w-3xl mx-auto text-center px-6 py-28 md:py-40"
            initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}>
            <h1 className={`${"heading-font"} text-5xl md:text-7xl font-bold leading-tight mb-6`} style={{ color: 'rgba(255,255,255,0.5)' }}>You Carry Enough.<br /><span style={{ color: '#a8d49a', fontStyle: 'italic' }}>Put It Down.</span></h1>
            <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.75 }}>
              A holistic wellness sanctuary in the heart of Nelson — yoga, massage, and mindful healing. All levels welcome.
            </p>
            <a href="#schedule" className="inline-block px-10 py-4 text-white font-semibold text-sm rounded-full transition-all hover:shadow-lg"
              style={{ backgroundColor: '#7d9a6b', boxShadow: '0 4px 20px rgba(125,154,107,0.3)' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
              View This Week&rsquo;s Schedule
            </a>
          </motion.div>
        </section>

        {/* ── TRUST BAR ── */}
        <div style={{ backgroundColor: '#d4a574' }} className="py-5 px-6">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold">
            <span className="flex items-center gap-1"><span style={{ color: '#faf6f0' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span><span style={{ color: '#faf6f0' }}>4.9 Rating</span></span>
            <span style={{ color: '#faf6f0', opacity: 0.5 }}>&#183;</span>
            <span style={{ color: '#faf6f0' }}>RYT-500 Certified</span>
            <span style={{ color: '#faf6f0', opacity: 0.5 }}>&#183;</span>
            <span style={{ color: '#faf6f0' }}>10+ Classes Weekly</span>
            <span style={{ color: '#faf6f0', opacity: 0.5 }}>&#183;</span>
            <span style={{ color: '#faf6f0' }}>All Levels Welcome</span>
          </div>
        </div>

        {/* ── WEEKLY CLASS SCHEDULE ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #d4a574, #faf6f0)' }} />
        <section id="schedule" className="py-20 md:py-28 px-6" style={{  }}>
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-4">
              <h2 className={`${"heading-font"} text-3xl md:text-4xl font-bold`} style={{ color: 'rgba(255,255,255,0.5)' }}>This Week&rsquo;s Classes</h2>
            </Reveal>
            <Reveal delay={0.05} className="text-center mb-12">
              <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.6 }}>
                All classes held at 123 Sample St, Nelson · Drop-ins always welcome
              </p>
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
                {Object.entries(levelColors).map(([level, color]) => (
                  <span key={level} className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: color }} />
                    {level}
                  </span>
                ))}
              </div>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {schedule.map((day, di) => (
                <Reveal key={day.day} delay={di * 0.06}>
                  <div className="flex flex-col gap-2">
                    <div className="text-center py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-1"
                      style={{ backgroundColor: '#7d9a6b', color: '#fff' }}>
                      {day.day}
                    </div>
                    {day.classes.map((cls, ci) => (
                      <div key={ci} className="p-3 rounded-2xl text-center"
                        style={{ backgroundColor: '#fffcf7', border: `1px solid ${cls.color}25`, boxShadow: '0 2px 8px rgba(139,115,85,0.06)' }}>
                        <div className="w-2.5 h-2.5 rounded-full mx-auto mb-2" style={{ backgroundColor: levelColors[cls.level] }} />
                        <p className={`${"heading-font"} text-xs font-bold mb-1`} style={{ color: 'rgba(255,255,255,0.5)' }}>{cls.name}</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.6 }}>{cls.time}</p>
                        <p className="text-xs mt-1" style={{ color: '#a8d49a', opacity: 0.8 }}>{cls.instructor}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3} className="text-center mt-10">
              <a href="#contact" className="inline-block px-8 py-3.5 text-white font-semibold text-sm rounded-full"
                style={{ backgroundColor: '#7d9a6b', boxShadow: '0 4px 16px rgba(125,154,107,0.25)' }}>
                Book a Class
              </a>
            </Reveal>
          </div>
        </section>

        {/* ── YOUR FIRST VISIT GUIDE ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #faf6f0, #f5f0e8)' }} />
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-4">
              <h2 className={`${"heading-font"} text-3xl md:text-4xl font-bold`} style={{ color: 'rgba(255,255,255,0.5)' }}>Your First Visit</h2>
            </Reveal>
            <Reveal delay={0.05} className="text-center mb-14">
              <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.6 }}>
                Never been to a yoga studio? We&rsquo;ve made it easy. No experience necessary.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { num: '1', icon: '📅', title: 'Browse the Schedule', desc: 'Find a class that fits your week. All Levels classes are the perfect starting point.' },
                { num: '2', icon: '⏰', title: 'Arrive 10 Min Early', desc: 'A few minutes to settle in, meet the instructor, and let us know it\'s your first class.' },
                { num: '3', icon: '🧘', title: 'We Provide Everything', desc: 'Mats, blocks, blankets, and props — all included. Just bring comfortable clothes.' },
                { num: '4', icon: '🌿', title: 'Just Breathe', desc: 'There\'s no performing. No judgment. Your practice is yours, at your own pace.' },
              ].map((step, i) => (
                <Reveal key={step.num} delay={i * 0.12}>
                  <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.15)', boxShadow: '0 2px 16px rgba(139,115,85,0.06)' }}>
                    <div className="text-3xl mb-3">{step.icon}</div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#7d9a6b' }}>
                      <span className={`${"heading-font"} text-sm font-bold text-white`}>{step.num}</span>
                    </div>
                    <h3 className={`${"heading-font"} text-base font-bold mb-2`} style={{ color: 'rgba(255,255,255,0.5)' }}>{step.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.7 }}>{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLASS PACKS ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #f5f0e8, #faf6f0)' }} />
        <section className="py-20 md:py-28 px-6" style={{  }}>
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-4">
              <h2 className={`${"heading-font"} text-3xl md:text-4xl font-bold`} style={{ color: 'rgba(255,255,255,0.5)' }}>Choose Your Practice</h2>
            </Reveal>
            <Reveal delay={0.05} className="text-center mb-14">
              <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.6 }}>Flexible options so you can show up whenever you need it most.</p>
            </Reveal>
            <motion.div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6"
              initial={prefersReduced ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}>
              {[
                { label: 'Drop-In', price: '$20', desc: 'One class, anytime. Perfect for travellers or the curious.', highlight: false },
                { label: '5-Class Pack', price: '$85', desc: 'Save $15 over drop-in. Great for trying a few classes.', highlight: false },
                { label: '10-Class Pack', price: '$150', desc: 'The sweet spot. Saves $50. No expiry for 6 months.', highlight: true, badge: 'Best Value' },
                { label: 'Unlimited Monthly', price: '$120', desc: 'All classes, all month. Commit to your practice.', highlight: false },
              ].map((pack) => (
                <motion.div key={pack.label} variants={fadeUp}
                  className="relative p-7 text-center rounded-2xl transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: pack.highlight ? '#7d9a6b' : '#fffcf7',
                    border: pack.highlight ? 'none' : '1px solid rgba(125,154,107,0.2)',
                    boxShadow: pack.highlight ? '0 8px 32px rgba(125,154,107,0.3)' : '0 2px 12px rgba(139,115,85,0.06)',
                    transform: pack.highlight ? 'scale(1.04)' : 'scale(1)',
                  }}>
                  {pack.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: '#d4a574', color: '#fff' }}>
                      {pack.badge}
                    </div>
                  )}
                  <h3 className={`${"heading-font"} text-lg font-bold mb-2`} style={{ color: pack.highlight ? '#fff' : '#8b7355' }}>{pack.label}</h3>
                  <div className={`${"heading-font"} text-4xl font-bold mb-3`} style={{ color: pack.highlight ? '#fff' : '#7d9a6b' }}>{pack.price}</div>
                  <p className="text-xs leading-relaxed mb-5" style={{ color: pack.highlight ? 'rgba(255,255,255,0.85)' : '#8b7355', opacity: pack.highlight ? 1 : 0.7 }}>{pack.desc}</p>
                  <a href="#contact" className="inline-block px-5 py-2 rounded-full text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: pack.highlight ? '#fff' : '#7d9a6b',
                      color: pack.highlight ? '#7d9a6b' : '#fff',
                    }}>
                    Get Started
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #faf6f0, #f5f0e8)' }} />
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`${"heading-font"} text-3xl md:text-4xl font-bold text-center mb-4`} style={{ color: 'rgba(255,255,255,0.5)' }}>How It Works</h2>
            <p className="text-center mb-16 max-w-md mx-auto text-sm" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.6 }}>Simple, gentle, no pressure. Just like your practice.</p>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { num: '1', title: 'We Talk', desc: 'Free consultation — you share your vision for your practice and what your clients need to feel before they even book.' },
                { num: '2', title: 'We Build', desc: 'We design a warm, beautiful site in ~2 weeks. You approve every step. No surprises, no stress.' },
                { num: '3', title: 'You Grow', desc: 'Launch, get found on Google, and watch bookings fill up. Your clients find you. Your calendar fills.' },
              ].map((step, i) => (
                <Reveal key={step.num} delay={i * 0.15}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#7d9a6b', boxShadow: '0 4px 20px rgba(125,154,107,0.25)' }}>
                      <span className={`${"heading-font"} text-2xl font-bold text-white`}>{step.num}</span>
                    </div>
                    <h3 className={`${"heading-font"} text-xl font-bold mb-3`} style={{ color: 'rgba(255,255,255,0.5)' }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.7 }}>{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── MEET YOUR TEACHERS ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #f5f0e8, #faf6f0)' }} />
        <section id="about" className="py-20 md:py-28 px-6" style={{  }}>
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-4">
              <h2 className={`${"heading-font"} text-3xl md:text-4xl font-bold`} style={{ color: 'rgba(255,255,255,0.5)' }}>Meet Your Teachers</h2>
            </Reveal>
            <Reveal delay={0.05} className="text-center mb-14">
              <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.6 }}>
                People choose a studio based on the teacher. Here&rsquo;s who&rsquo;ll be guiding your practice.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { name: 'Priya Sharma', creds: 'RYT-500 · 8 Years', specialty: 'Vinyasa, Power Flow', quote: '"Yoga isn\'t about flexibility — it\'s about showing up."', img: '/images/demos/warm-natural-showcase.webp' },
                { name: 'Mei Chen', creds: 'RYT-200 · Reiki Level 2', specialty: 'Yin, Restorative, Sound', quote: '"The mat is a safe place for whatever you\'re carrying."', img: '/images/demos/gallery/wn-1.webp' },
                { name: 'Sasha Okafor', creds: 'RYT-300 · 5 Years', specialty: 'Gentle, Deep Stretch', quote: '"Every body is a yoga body. No exceptions."', img: '/images/demos/gallery/wn-2.webp' },
              ].map((teacher, i) => (
                <Reveal key={teacher.name} delay={i * 0.12}>
                  <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.15)', boxShadow: '0 4px 20px rgba(139,115,85,0.08)' }}>
                    <div className="relative w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden"
                      style={{ border: '3px solid rgba(125,154,107,0.3)' }}>
                      <Image src={teacher.img} alt={teacher.name} fill className="object-cover" />
                    </div>
                    <h3 className={`${"heading-font"} text-xl font-bold mb-1`} style={{ color: 'rgba(255,255,255,0.5)' }}>{teacher.name}</h3>
                    <p className="text-xs font-semibold mb-1" style={{ color: '#a8d49a' }}>{teacher.creds}</p>
                    <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.6 }}>{teacher.specialty}</p>
                    <p className="text-xs italic leading-relaxed px-2" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.75 }}>{teacher.quote}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL — Single linen-textured ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #faf6f0, #ede8de)' }} />
        <section className="py-24 md:py-36 px-6 relative overflow-hidden" style={{ backgroundColor: '#ede8de' }}>
          {/* Subtle linen texture overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23e8dfd2'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23ddd4c4' opacity='0.5'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23ddd4c4' opacity='0.3'/%3E%3C/svg%3E")`, opacity: 0.6 }} />
          <Reveal className="relative max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, j) => <Star key={j} />)}
            </div>
            <blockquote className={`${"heading-font"} text-2xl md:text-3xl leading-relaxed mb-8`} style={{ color: '#6b5a44', fontStyle: 'italic' }}>
              &ldquo;Bookings doubled in the first month. Clients tell me they booked because the website made them feel calm and safe before they even met me.&rdquo;
            </blockquote>
            <p className={`${"heading-font"} font-bold`} style={{ color: 'rgba(255,255,255,0.5)' }}>— Sarah L.</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.55 }}>Roots &amp; Restore Yoga &middot; Nelson</p>
            <Reveal delay={0.3} className="mt-6">
              <p className="text-xs italic" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.35 }}>(Sample review — your real reviews go here)</p>
            </Reveal>
          </Reveal>
        </section>

        {/* ═══════════ THE TRANSFORMATION ═══════════ */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #ede8de, #faf6f0)' }} />
        <section className="py-20 md:py-28 px-6" style={{  }}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <h2 className={`${"heading-font"} text-3xl md:text-4xl font-bold text-center mb-4`} style={{ color: 'rgba(255,255,255,0.5)' }}>Watch Your Website Transform</h2>
              <p className="text-center mb-12 text-sm" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.6 }}>From dated to designed — in real time</p>
            </Reveal>
            <LiveRedesign />
          </div>
        </section>

        {/* ── FAQ ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #faf6f0, #f5f0e8)' }} />
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className={`${"heading-font"} text-3xl md:text-4xl font-bold text-center mb-4`} style={{ color: 'rgba(255,255,255,0.5)' }}>Questions &amp; Answers</h2>
            <p className="text-center mb-12 text-sm" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.6 }}>Everything you need to know before your first class.</p>
            <FAQAccordion items={[
              { q: 'Do I need to book in advance?', a: 'We recommend booking online to guarantee your spot — popular classes fill up. Drop-ins are also welcome if space is available.' },
              { q: 'What should I bring to my first class?', a: 'Just yourself in comfortable clothes. We provide mats, blocks, blankets, and all props. Water bottle welcome.' },
              { q: 'I\'m not flexible — is yoga still for me?', a: 'Absolutely. Flexibility is the result of yoga, not a requirement. All Level classes are designed for every body.' },
              { q: 'What\'s the difference between class types?', a: 'All Levels is accessible to everyone. Intermediate builds on basics. Restorative is slow, supported, and deeply relaxing — perfect for stress or injury recovery.' },
              { q: 'Do you offer private sessions?', a: 'Yes. Private yoga and massage therapy sessions are available. Contact us to schedule — from $90/hr.' },
              { q: 'What is your cancellation policy?', a: 'Cancel up to 4 hours before class for a full credit. Late cancellations are counted as attended.' },
            ]} />
          </div>
        </section>

        {/* ── CONTACT ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #f5f0e8, #faf6f0)' }} />
        <section id="contact" className="py-20 md:py-28 px-6" style={{  }}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`${"heading-font"} text-3xl md:text-4xl font-bold text-center mb-16`} style={{ color: 'rgba(255,255,255,0.5)' }}>Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <h3 className={`${"heading-font"} text-xl font-bold mb-6`} style={{ color: 'rgba(255,255,255,0.5)' }}>Contact Details</h3>
                <div className="space-y-4 text-sm" style={{ color: 'rgba(255,255,255,0.5)', opacity: 0.85 }}>
                  <p><span className="font-semibold" style={{ opacity: 1 }}>Phone:</span> (250) 555-0165</p>
                  <p><span className="font-semibold" style={{ opacity: 1 }}>Email:</span> hello@mountainflow.ca</p>
                  <p><span className="font-semibold" style={{ opacity: 1 }}>Hours:</span> Mon&ndash;Sat 7:00 AM &ndash; 8:00 PM</p>
                  <p><span className="font-semibold" style={{ opacity: 1 }}>Location:</span> 123 Sample St, Nelson, BC</p>
                </div>
              </div>
              <div>
                <h3 className={`${"heading-font"} text-xl font-bold mb-6`} style={{ color: 'rgba(255,255,255,0.5)' }}>Book a Class</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Name" className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md" style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.25)', borderRadius: '30px 20px 25px 35px / 25px 35px 20px 30px', color: 'rgba(255,255,255,0.5)' }} />
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md" style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.25)', borderRadius: '25px 35px 30px 20px / 30px 20px 35px 25px', color: 'rgba(255,255,255,0.5)' }} />
                  <select className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md" style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.25)', borderRadius: '20px 30px 35px 25px / 35px 25px 30px 20px', color: 'rgba(255,255,255,0.5)' }} defaultValue="">
                    <option value="" disabled>Select a Class Type</option>
                    <option>Morning Flow</option>
                    <option>Vinyasa Flow</option>
                    <option>Restorative Yoga</option>
                    <option>Massage Therapy</option>
                    <option>Private Session</option>
                  </select>
                  <textarea placeholder="Any questions or notes for us?" rows={4} className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md resize-none" style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.25)', borderRadius: '25px 30px 20px 35px / 20px 35px 25px 30px', color: 'rgba(255,255,255,0.5)' }} />
                  <button type="submit" className="w-full px-8 py-3.5 text-white font-semibold text-sm transition-all hover:shadow-lg" style={{ backgroundColor: '#7d9a6b', borderRadius: '35px 25px 30px 20px / 25px 30px 20px 35px', boxShadow: '0 4px 16px rgba(125,154,107,0.25)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-14 px-6" style={{ backgroundColor: '#8b7355' }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10 mb-10">
              <div>
                <span className={`${"heading-font"} text-xl font-bold block mb-4`} style={{ color: '#faf6f0' }}>Mountain Flow Wellness</span>
                <p className="text-sm leading-relaxed" style={{ color: '#faf6f0', opacity: 0.65 }}>A holistic wellness sanctuary in the heart of Nelson, BC.</p>
              </div>
              <div>
                <h4 className={`${"heading-font"} font-bold mb-4`} style={{ color: '#faf6f0' }}>Quick Links</h4>
                <div className="flex flex-col gap-2">
                  {['Schedule', 'Classes', 'About', 'Contact'].map((label) => (
                    <a key={label} href={`#${label.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm transition-opacity hover:opacity-100" style={{ color: '#faf6f0', opacity: 0.6 }}>{label}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className={`${"heading-font"} font-bold mb-4`} style={{ color: '#faf6f0' }}>Visit Us</h4>
                <div className="space-y-2 text-sm" style={{ color: '#faf6f0', opacity: 0.65 }}>
                  <p>123 Sample St, Nelson, BC</p>
                  <p>Mon&ndash;Sat 7:00 AM &ndash; 8:00 PM</p>
                  <p>(250) 555-0165</p>
                </div>
              </div>
            </div>
            <div className="pt-8" style={{ borderTop: '1px solid rgba(250,246,240,0.15)' }}>
              <p className="text-center text-xs" style={{ color: '#faf6f0', opacity: 0.45 }}>&copy; 2025 Mountain Flow Wellness. Sample site by Kootenay Made Digital.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* ── STICKY BOTTOM BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{ backgroundColor: 'rgba(125,154,107,0.92)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="text-white/90 text-sm">Sample design by <strong>Kootenay Made Digital</strong></span>
            <span className="hidden sm:inline text-white/40 text-xs">·</span>
            <span className="text-white/80 text-xs font-semibold">(250) 555-0165</span>
          </div>
          <Link href="/contact?style=warm-natural"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded-full transition-all hover:opacity-90 whitespace-nowrap"
            style={{ color: '#a8d49a' }}>
            Like What You See? Let&rsquo;s Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
