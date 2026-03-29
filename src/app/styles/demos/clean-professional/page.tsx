'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
})

/* ─── reduced-motion-safe variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

/* ─── animated counter hook ─── */
function useCounter(target: number, inView: boolean, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

/* ─── section wrapper with scroll fade-in ─── */
function Section({
  children,
  id,
  style,
  className = '',
}: {
  children: React.ReactNode
  id?: string
  style?: React.CSSProperties
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  )
}

/* ─── Reveal wrapper ─── */
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

/* ─── Live Redesign ─── */
const CP = {
  navy: '#1a365d',
  blue: '#2563eb',
  lightBlue: '#eff6ff',
  slate: '#64748b',
  white: '#ffffff',
  bg: '#f8fafc',
}

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
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? CP.blue : '#ccc' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className={`${inter.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? CP.blue : '#888' }}
          >
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? CP.blue : '#ccc' }} layout transition={{ duration: 0.4 }} />
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
              {/* WordPress-style nav */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#2c3e50', borderBottom: '3px solid #1a252f' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#7f8c8d' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>Ridgeline Financial</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Services', 'About', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>&#9776; Menu</span>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 md:py-20 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #7f8c8d 50%, #bdc3c7 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2 sm:mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#666', letterSpacing: '0.15em' }}>&#9733; Welcome to Our Website &#9733;</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-2 sm:mb-3" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700, textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>
                    Ridgeline Financial
                  </h2>
                  <p className="text-sm sm:text-lg mb-1 sm:mb-2" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>
                    &ldquo;Trusted. Reliable. Experienced.&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm mb-4 sm:mb-6" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>
                    Tax Planning &bull; Bookkeeping &bull; Payroll &bull; Business Advisory
                  </p>
                  <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                    {['✓ CPA Certified', '✓ Confidential', '✓ Free Consultation'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#2c3e50', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50' }}>&#128222; Call Us Today: (250) 555-0140</p>
                  <span className="inline-block px-6 py-2.5 text-sm" style={{ backgroundColor: '#34495e', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', border: '1px solid #2c3e50', cursor: 'default' }}>
                    Request a Free Consultation
                  </span>
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
              style={{ backgroundColor: CP.white, border: `1px solid ${CP.blue}30`, borderRadius: '16px', boxShadow: `0 8px 40px ${CP.blue}15, 0 2px 8px rgba(0,0,0,0.04)` }}
            >
              {/* Elegant nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${CP.blue}15` }}>
                <motion.span
                  className={`${inter.className} text-base sm:text-lg font-bold`}
                  style={{ color: CP.navy, letterSpacing: '0.02em' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: dur * 0.6, delay: stagger }}
                >
                  Ridgeline Financial
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Services', 'About', 'Portfolio', 'Contact'].map((link) => (
                    <span key={link} className={`${inter.className} text-xs uppercase tracking-widest`} style={{ color: CP.slate, fontWeight: 500 }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: CP.blue }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: CP.blue }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: CP.blue }} />
                </motion.div>
              </div>

              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-14 flex-1 flex flex-col justify-center">
                {/* Geometric SVG motif */}
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="220" height="220" viewBox="0 0 180 180" fill="none">
                    <rect x="20" y="20" width="60" height="60" stroke={CP.blue} strokeWidth="1.5" fill="none" />
                    <rect x="50" y="50" width="90" height="90" stroke={CP.navy} strokeWidth="1" fill="none" />
                    <line x1="20" y1="20" x2="110" y2="110" stroke={CP.blue} strokeWidth="0.8" />
                    <line x1="80" y1="20" x2="20" y2="80" stroke={CP.navy} strokeWidth="0.8" />
                    <circle cx="140" cy="40" r="20" stroke={CP.blue} strokeWidth="1" fill="none" />
                    <circle cx="140" cy="40" r="8" stroke={CP.blue} strokeWidth="0.6" fill="none" />
                  </svg>
                </motion.div>

                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${inter.className} text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full`} style={{ backgroundColor: `${CP.blue}15`, color: CP.blue, border: `1px solid ${CP.blue}25` }}>
                      Est. 2009 &mdash; West Kootenay
                    </span>
                  </motion.div>

                  <motion.h2 className={`heading-font text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-4 sm:mb-6 sm:max-w-xl font-bold`} style={{ color: CP.navy }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    Your Money Deserves a Plan. Not a{' '}
                    <span className="relative inline-block" style={{ color: CP.blue }}>
                      Guessing Game.
                      <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                        <motion.path d="M4 8 C40 2, 80 2, 130 6 C155 8, 180 4, 196 6" stroke={CP.blue} strokeWidth="2" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur * 1.5, delay: stagger * 5, ease: 'easeOut' }} />
                      </motion.svg>
                    </span>
                  </motion.h2>

                  <motion.p className={`${inter.className} text-sm sm:text-lg max-w-md sm:mx-0 mx-auto mb-6 sm:mb-8`} style={{ color: CP.slate, lineHeight: 1.7 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Retirement, tax, and estate planning — personalized for your life and your goals.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }} className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className={`${inter.className} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] font-bold`} style={{ backgroundColor: CP.blue, color: CP.white, boxShadow: `0 4px 20px ${CP.blue}35` }}>
                      Book a Free Consultation
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <span className={`${inter.className} text-sm`} style={{ color: '#999' }}>No commitment required</span>
                  </motion.div>

                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['CPA Certified', '15+ Years', '200+ Clients'].map((badge) => (
                      <span key={badge} className={`${inter.className} text-xs`} style={{ color: CP.blue, opacity: 0.7, letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Shimmer border */}
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${CP.navy}, ${CP.blue}, ${CP.navy})`, backgroundSize: '200% 100%', animation: 'shimmer-border 3s linear infinite' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setTransformed(!transformed)}
          className={`${inter.className} text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{ backgroundColor: transformed ? `${CP.blue}15` : CP.white, color: transformed ? CP.navy : '#666', border: `1.5px solid ${transformed ? `${CP.blue}30` : '#ddd'}`, boxShadow: transformed ? `0 2px 12px ${CP.blue}10` : '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          {transformed ? '← See the Before' : '✨ Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ─── FAQ Accordion ─── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-sm transition-colors"
            style={{ color: '#1a365d', backgroundColor: open === i ? '#f8fafc' : '#ffffff' }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <span style={{ color: '#2563eb', transition: 'transform 0.25s', transform: open === i ? 'rotate(180deg)' : 'none', display: 'inline-block', marginLeft: '1rem', flexShrink: 0 }}>▼</span>
          </button>
          {open === i && (
            <div className="px-6 py-4 text-sm leading-relaxed" style={{ color: '#475569', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Who We Serve tabs ─── */
function WhoWeServeTabs() {
  const [active, setActive] = useState(0)

  const tabs = [
    {
      label: 'Individuals',
      icon: '👤',
      headline: 'Your personal finances, under control.',
      services: [
        { name: 'Tax Return Preparation', detail: 'Maximize your refund, minimize your stress' },
        { name: 'Retirement Planning', detail: 'RRSP, TFSA, and pension strategy for your timeline' },
        { name: 'Estate Planning', detail: 'Protect your family — today and tomorrow' },
        { name: 'Investment Review', detail: 'Objective analysis of your current portfolio' },
      ],
      cta: 'Start Your Personal Plan',
    },
    {
      label: 'Business Owners',
      icon: '🏢',
      headline: 'Stop leaving money on the table.',
      services: [
        { name: 'Corporate Tax Planning', detail: 'Incorporated? We find savings most accountants miss' },
        { name: 'Bookkeeping & Payroll', detail: 'Clean books monthly, so year-end isn\'t a nightmare' },
        { name: 'Business Structuring', detail: 'Sole prop vs. corp vs. holding — done right from day one' },
        { name: 'HST / GST Filing', detail: 'Timely, accurate, penalty-free' },
      ],
      cta: 'Scale Your Business Finances',
    },
    {
      label: 'Retirees',
      icon: '🏔️',
      headline: 'Make your money last as long as you do.',
      services: [
        { name: 'CPP & OAS Optimization', detail: 'When to take which payment — timing is everything' },
        { name: 'RRSP-to-RRIF Conversion', detail: 'Tax-efficient drawdown strategy for your lifestyle' },
        { name: 'Estate & Beneficiary Review', detail: 'Ensure your assets go where you intend them to' },
        { name: 'Cash Flow Planning', detail: 'Monthly income mapped to your actual spending' },
      ],
      cta: 'Protect Your Retirement',
    },
  ]

  const activeTab = tabs[active]

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mb-8">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold rounded-xl transition-all"
            style={{
              backgroundColor: active === i ? '#1a365d' : '#f8fafc',
              color: active === i ? '#fff' : '#64748b',
              border: `1.5px solid ${active === i ? '#1a365d' : '#e2e8f0'}`,
              boxShadow: active === i ? '0 4px 16px rgba(26,54,93,0.2)' : 'none',
            }}
            onClick={() => setActive(i)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl p-6 md:p-8"
          style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(26,54,93,0.06)' }}
        >
          <p className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#1a365d' }}>
            {activeTab.headline}
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {activeTab.services.map((svc) => (
              <div key={svc.name} className="flex items-start gap-3 p-4 rounded-xl"
                style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: '#2563eb' }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold mb-0.5" style={{ color: '#1a365d' }}>{svc.name}</p>
                  <p className="text-xs" style={{ color: '#64748b' }}>{svc.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition-all hover:scale-[1.02]"
            style={{ backgroundColor: '#1a365d', color: '#fff', boxShadow: '0 4px 16px rgba(26,54,93,0.2)' }}>
            {activeTab.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function CleanProfessionalDemo() {
  /* ─── trust bar counter refs ─── */
  const trustRef = useRef(null)
  const trustInView = useInView(trustRef, { once: true })
  const ratingCount = useCounter(4, trustInView, 800)
  const yearsCount = useCounter(15, trustInView, 1200)

  const faqItems = [
    {
      q: 'How long does a website take?',
      a: 'Most professional websites are designed, built, and launched within 2–3 weeks. We keep you in the loop throughout and move as fast as you can approve content.',
    },
    {
      q: 'What if I already have a website?',
      a: "No problem — we can redesign what you have or start fresh. Either way, you'll end up with something that reflects your firm's professionalism and actually converts visitors.",
    },
    {
      q: 'Do I need to provide all the content?',
      a: "We help with that. We'll guide you through what we need, write copy where you need it, and make the whole process painless. You're a financial expert, not a copywriter — that's our job.",
    },
    {
      q: 'What does it cost?',
      a: 'Websites start from $1,500. A full brand build (logo, colours, website) starts from $4,000. We also offer Google Domination SEO packages from $500. Book a free consultation and we\'ll give you an exact quote.',
    },
    {
      q: 'Can I update the site myself?',
      a: 'Yes. We build on platforms that give you control — add blog posts, update pricing, swap photos without touching code. Or let us handle updates for you.',
    },
    {
      q: 'Is my client information kept confidential?',
      a: 'Absolutely. Your website and brand are yours alone. We never share client information, project details, or business data with anyone, ever.',
    },
  ]

  return (
    <div className={inter.className} style={{ fontFamily: 'Inter, sans-serif', color: '#334155' }}>
      <style>{`
      @import url('https://api.fontshare.com/v2/css?f[]=supreme@400,500,700&display=swap');
      .heading-font { font-family: 'Supreme', sans-serif; }
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
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav style={{ backgroundColor: '#1a365d' }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-white text-xl md:text-2xl font-bold tracking-tight" style={{ letterSpacing: '0.02em', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '2px' }}>Ridgeline Financial Group</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-white/80 hover:text-white text-sm transition-colors">Services</a>
            <a href="#about" className="text-white/80 hover:text-white text-sm transition-colors">About</a>
            <a href="#case-studies" className="text-white/80 hover:text-white text-sm transition-colors">Results</a>
            <a href="#contact" className="text-white/80 hover:text-white text-sm transition-colors">Contact</a>
            <a href="tel:2505550140" className="text-white font-bold text-sm ml-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              (250) 555-0140
            </a>
          </div>
          <a href="tel:2505550140" className="md:hidden text-white text-sm font-bold">(250) 555-0140</a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO — Asymmetric authority layout ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#1a365d' }}>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

        {/* Diagonal accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block"
          style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(37,99,235,0.15) 100%)' }} />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            {/* LEFT: Headline */}
            <div className="flex-1">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.3)' }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#60a5fa' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#93c5fd' }}>
                  Serving the West Kootenay since 2009
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              >
                Your Money Deserves<br />
                <span style={{ color: '#60a5fa' }}>a Real Plan.</span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl mb-8 max-w-lg"
                style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              >
                15 years of personalized tax, retirement, and estate planning — built for Kootenay families and business owners.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold text-sm rounded-xl transition-all hover:scale-105"
                  style={{ backgroundColor: '#2563eb', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}>
                  Book a Confidential Consultation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <a href="#services"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium rounded-xl transition-all hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                  See Our Services
                </a>
              </motion.div>
            </div>

            {/* RIGHT: Credential badges stacked */}
            <motion.div
              className="lg:w-64 xl:w-72"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            >
              <div className="space-y-3">
                {[
                  { badge: 'CPA', label: 'Chartered Professional Accountant', icon: '🎓' },
                  { badge: 'CFP', label: 'Certified Financial Planner', icon: '📊' },
                  { badge: '15+', label: 'Years of local expertise', icon: '📅' },
                  { badge: '200+', label: 'Clients served & counting', icon: '👥' },
                ].map((item, i) => (
                  <motion.div
                    key={item.badge}
                    className="flex items-center gap-4 px-5 py-4 rounded-xl"
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ backgroundColor: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.3)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-lg font-bold leading-none" style={{ color: '#60a5fa' }}>{item.badge}</p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div
        ref={trustRef}
        style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}
        className="py-6 px-6"
      >
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm font-bold" style={{ color: '#1a365d' }}>
          <span className="flex items-center gap-2">
            <span style={{ color: '#f59e0b' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            {ratingCount}.9 Rating
          </span>
          <span style={{ color: '#94a3b8' }} className="hidden md:inline">&#183;</span>
          <span>{yearsCount}+ Years</span>
          <span style={{ color: '#94a3b8' }} className="hidden md:inline">&#183;</span>
          <span>Certified Planners</span>
          <span style={{ color: '#94a3b8' }} className="hidden md:inline">&#183;</span>
          <span>Free Consultation</span>
          <span style={{ color: '#94a3b8' }} className="hidden md:inline">&#183;</span>
          <span className="hidden md:inline" style={{ color: '#2563eb' }}>🔒 Confidential</span>
        </div>
      </div>

      {/* ═══════════ 4. WHO WE SERVE — Segmented Tabs ═══════════ */}
      <Section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          {/* PAS intro copy */}
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-12 px-4 py-8 rounded-xl" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#1a365d' }}>
                <strong>Your potential clients check your website before they ever check your credentials.</strong> A generic template tells them you don&rsquo;t sweat the details — and in financial services, details are everything. The advisor down the street with the polished site is getting the consultation calls. Let&rsquo;s change that.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ color: '#1a365d' }}>
              Who We Serve
            </h2>
            <p className="text-center mb-10 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
              Different clients, different needs — click your situation below
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <WhoWeServeTabs />
          </Reveal>
        </div>
      </Section>

      {/* ═══════════ 5. CASE STUDY CARDS ═══════════ */}
      <Section id="case-studies" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ color: '#1a365d' }}>
              Real Results for Real Clients
            </h2>
            <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
              Numbers don&rsquo;t lie. Here&rsquo;s what proper financial planning looks like in practice.
            </p>
          </Reveal>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              {
                tag: 'Small Business',
                challenge: 'Incorporated contractor losing $40K/year in tax inefficiencies',
                approach: 'Restructured as holding company with split income strategy',
                result: 'Saved $38,400 in year one — more than paying for the restructure 12x over',
                icon: '💼',
                color: '#1a365d',
              },
              {
                tag: 'Retirees',
                challenge: 'Couple drawing RRSP too early, triggering OAS clawback',
                approach: 'Reversed drawdown order; CPP deferral + TFSA conversion strategy',
                result: 'Increased net lifetime income by $127,000 with no lifestyle change',
                icon: '🏔️',
                color: '#2563eb',
              },
              {
                tag: 'High-Income Individual',
                challenge: 'Professional earning $280K/year with no tax optimization plan',
                approach: 'Spousal RRSP, professional corporation, investment income sheltering',
                result: 'Reduced annual tax bill by $22,000 — ongoing, every single year',
                icon: '📈',
                color: '#1a365d',
              },
            ].map((card, i) => (
              <motion.div key={i} variants={fadeUp}
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                {/* Header */}
                <div className="px-6 py-5" style={{ backgroundColor: card.color }}>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{card.icon}</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                      style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>{card.tag}</span>
                  </div>
                </div>
                {/* Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#ef4444' }}>Challenge</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{card.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#2563eb' }}>Approach</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{card.approach}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#16a34a' }}>Result</p>
                    <p className="text-sm font-bold leading-relaxed" style={{ color: '#1a365d' }}>{card.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <Reveal delay={0.3}>
            <p className="mt-6 text-center text-xs" style={{ color: '#94a3b8' }}>
              (Illustrative examples — actual results vary per client situation)
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════ 6. AUTHORITY BAR ═══════════ */}
      <Section className="py-10 px-6" style={{ backgroundColor: '#1a365d' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-center mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Recognized &amp; Affiliated With
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              {[
                { abbr: 'CPA BC', name: 'BC CPA Association' },
                { abbr: 'FP Canada', name: 'Financial Planning Canada' },
                { abbr: 'KBOT', name: 'Kootenay Boundary\nChamber of Commerce' },
                { abbr: 'BBB', name: 'Better Business\nBureau A+' },
              ].map((org) => (
                <div key={org.abbr} className="flex items-center gap-3 px-5 py-3 rounded-xl"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: 'rgba(37,99,235,0.3)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.4)' }}>
                    {org.abbr}
                  </div>
                  <span className="text-xs leading-tight whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.5)' }}>{org.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════ 7. THE TRANSFORMATION ═══════════ */}
      <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className={`heading-font text-3xl md:text-4xl font-bold text-center mb-4`} style={{ color: '#1a365d' }}>
            Watch Your Website Transform
          </h2>
          <p className={`${inter.className} text-center mb-12 max-w-xl mx-auto`} style={{ color: '#94a3b8' }}>
            From dated to designed — in real time
          </p>
          <LiveRedesign />
        </div>
      </Section>

      {/* ═══════════ 8. TESTIMONIALS — Formal B2B style ═══════════ */}
      <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#1a365d' }}>
            What Clients Are Saying
          </h2>
          <p className="text-center mb-16 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            Real results from real Kootenay professionals
          </p>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              {
                quote: "Karen restructured our books and saved us from an audit we didn't even know was coming. The savings paid for her fees fifteen times over. Worth every penny.",
                name: 'David L.',
                title: 'Principal',
                company: 'Ridgeline Accounting',
                location: 'Castlegar, BC',
              },
              {
                quote: "We launched our new site in January. By March, our phone was ringing with people who said they found us on Google. It paid for itself in the first month.",
                name: 'Sandra K.',
                title: 'Owner',
                company: 'SK Law Office',
                location: 'Nelson, BC',
              },
              {
                quote: "I hadn't had a proper financial review in 6 years. One meeting uncovered $22,000 in annual savings I was just leaving on the table. I wish I'd done this sooner.",
                name: 'Patricia M.',
                title: 'Principal',
                company: 'Summit Financial Planning',
                location: 'Rossland, BC',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-8 rounded-lg"
                style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderTop: '4px solid #1a365d' }}
              >
                <div className="mb-4 text-xl" style={{ color: '#f59e0b' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote className="text-base leading-relaxed mb-6 italic" style={{ color: '#334155' }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#1a365d' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: '#64748b' }}>{t.title}, {t.company}</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>{t.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-center mt-8 text-xs" style={{ color: '#94a3b8' }}>
            (Sample reviews &mdash; your real reviews go here)
          </p>
        </div>
      </Section>

      {/* ═══════════ 9. HOW IT WORKS ═══════════ */}
      <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#1a365d' }}>
            How It Works
          </h2>
          <p className="text-center mb-16 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            From first conversation to live website in about two weeks
          </p>
          <motion.div
            className="grid md:grid-cols-3 gap-10 relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px" style={{ backgroundColor: '#e2e8f0', zIndex: 0, top: '2rem' }} />
            {[
              {
                num: '01',
                title: 'We Talk',
                desc: 'Tell us about your firm, your clients, and what you want people to feel when they land on your site. Free consultation — no pressure, no obligations.',
              },
              {
                num: '02',
                title: 'We Build',
                desc: 'Our team designs and builds your website in about two weeks, keeping you in the loop at every milestone. You approve, we refine.',
              },
              {
                num: '03',
                title: 'You Grow',
                desc: 'Launch, get found on Google, and start converting website visitors into booked consultations. Your practice, elevated.',
              },
            ].map((step) => (
              <motion.div key={step.num} variants={fadeUp} className="text-center relative z-10">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white text-xl font-bold mb-6 mx-auto"
                  style={{ backgroundColor: '#1a365d', boxShadow: '0 4px 16px rgba(26,54,93,0.3)' }}
                >
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#1a365d' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 10. FAQ ═══════════ */}
      <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#1a365d' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-center mb-12" style={{ color: '#94a3b8' }}>
            Everything you need to know before we start
          </p>
          <FAQAccordion items={faqItems} />
          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-block px-8 py-3.5 text-white font-bold text-sm rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: '#1a365d' }}
            >
              Still have questions? Let&rsquo;s talk.
            </a>
          </div>
        </div>
      </Section>

      {/* ═══════════ 11. ABOUT ═══════════ */}
      <Section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1a365d' }}>
            About Ridgeline Financial Group
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
            Ridgeline Financial Group is a locally-owned financial planning firm based in the heart of
            the Kootenays. For over 15 years, we have been committed to helping families and businesses
            across the region achieve their financial goals. Our approach is built on personalized,
            transparent advice &mdash; we take the time to understand your unique situation and craft
            strategies that work for your life. Whether you are planning for retirement, navigating tax
            season, or building a legacy, Ridgeline is here to guide you every step of the way.
          </p>
        </div>
      </Section>

      {/* ═══════════ 12. CONTACT — "Schedule a Confidential Consultation" ═══════════ */}
      <Section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ color: '#1a365d' }}>
            Schedule a Confidential Consultation
          </h2>
          <p className="text-center mb-12" style={{ color: '#64748b' }}>
            🔒 Everything discussed is strictly confidential — your information is protected.
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#1a365d' }}>Phone</h3>
                <p style={{ color: '#475569' }}>(250) 555-0140</p>
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#1a365d' }}>Email</h3>
                <p style={{ color: '#475569' }}>info@ridgelinefinancial.ca</p>
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#1a365d' }}>Hours</h3>
                <p style={{ color: '#475569' }}>Mon&ndash;Fri 9:00 AM &ndash; 5:00 PM</p>
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#1a365d' }}>Location</h3>
                <p style={{ color: '#475569' }}>123 Sample St, Castlegar, BC</p>
              </div>
              {/* Calendar-style widget */}
              <div className="p-5 rounded-xl" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <p className="text-sm font-bold mb-3" style={{ color: '#1a365d' }}>📅 Preferred Consultation Time</p>
                <div className="grid grid-cols-3 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                    <button key={day} className="py-2 text-xs font-bold rounded-lg transition-colors"
                      style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', color: '#64748b' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1a365d'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#64748b'; }}>
                      {day}
                    </button>
                  ))}
                </div>
                <p className="text-xs mt-2" style={{ color: '#94a3b8' }}>Evening appointments available on request</p>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: '#1a365d' }}>Name</label>
                <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all" style={{ border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#1a365d')} onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: '#1a365d' }}>Email</label>
                <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all" style={{ border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#1a365d')} onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: '#1a365d' }}>I am a…</label>
                <select className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b' }}>
                  <option>Individual / Family</option>
                  <option>Business Owner</option>
                  <option>Retiree</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: '#1a365d' }}>Message</label>
                <textarea rows={3} placeholder="What are you hoping to accomplish?" className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none" style={{ border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#1a365d')} onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')} />
              </div>
              <button type="submit" className="w-full px-8 py-3.5 text-white font-bold text-sm rounded-lg transition-all hover:opacity-90" style={{ backgroundColor: '#1a365d' }}>
                Schedule My Confidential Consultation
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* ═══════════ 13. FOOTER ═══════════ */}
      <footer style={{ backgroundColor: '#1a365d' }} className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className="text-white text-lg font-bold mb-3">Ridgeline Financial Group</h3>
              <p className="text-white/60 text-sm leading-relaxed">Financial planning for the Kootenays.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <a href="#services" className="text-white/60 hover:text-white text-sm transition-colors">Who We Serve</a>
                <a href="#case-studies" className="text-white/60 hover:text-white text-sm transition-colors">Case Studies</a>
                <a href="#about" className="text-white/60 hover:text-white text-sm transition-colors">About</a>
                <a href="#contact" className="text-white/60 hover:text-white text-sm transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Info</h4>
              <p className="text-white/60 text-sm mb-1">Mon&ndash;Fri 9:00 AM &ndash; 5:00 PM</p>
              <p className="text-white/60 text-sm mb-1">123 Sample St, Castlegar, BC</p>
              <p className="text-white/60 text-sm">(250) 555-0140</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-white/50 text-sm">&copy; 2025 Ridgeline Financial Group. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ 14. STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{ backgroundColor: 'rgba(26, 54, 93, 0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm text-center sm:text-left">
            Sample design by <strong>Kootenay Made Digital</strong> &mdash; <span className="text-white/70 text-xs">Your website should look this good</span>
          </span>
          <Link
            href="/contact?style=clean-professional"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded-lg transition-all hover:scale-105 whitespace-nowrap"
            style={{ backgroundColor: '#ffffff', color: '#1a365d', boxShadow: '0 2px 12px rgba(255,255,255,0.2)' }}
          >
            Like What You See? Let's Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
