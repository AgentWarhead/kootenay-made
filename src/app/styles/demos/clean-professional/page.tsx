'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

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

/* ─── Before/After Slider ─── */
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPos(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: 340, cursor: 'ew-resize', userSelect: 'none', overflow: 'hidden', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
      onMouseDown={() => { dragging.current = true }}
      onMouseUp={() => { dragging.current = false }}
      onMouseLeave={() => { dragging.current = false }}
      onMouseMove={(e) => { if (dragging.current) move(e.clientX) }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onClick={(e) => move(e.clientX)}
    >
      {/* BEFORE — right side background */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#e2e8f0', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>BEFORE — Generic Template</div>
        <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 400, marginBottom: '0.5rem' }}>Ridgeline Financial</div>
        <div style={{ backgroundColor: '#cbd5e1', height: 14, width: '70%', borderRadius: 4, marginBottom: '0.5rem' }} />
        <div style={{ backgroundColor: '#cbd5e1', height: 14, width: '55%', borderRadius: 4, marginBottom: '1rem' }} />
        <div style={{ height: 90, backgroundColor: '#d1d5db', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Stock Photo Here</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {['Services', 'About', 'Contact'].map(s => (
            <div key={s} style={{ flex: 1, height: 56, backgroundColor: '#cbd5e1', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#94a3b8', height: 34, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}>
          <span style={{ color: '#ffffff', fontSize: '0.75rem', fontWeight: 600 }}>Contact Us</span>
        </div>
      </div>

      {/* AFTER — clipped to show left pos% */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)`, backgroundColor: '#1a365d', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        <div style={{ color: '#60a5fa', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>AFTER — Kootenay Made Design</div>
        <div style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>Ridgeline Financial Group</div>
        <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', marginBottom: '1rem' }}>Financial Planning You Can Trust</div>
        <div style={{ height: 90, background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <span style={{ color: '#ffffff', fontSize: '0.8rem', fontWeight: 600 }}>Professional · Modern · Trusted</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {['Retirement', 'Tax', 'Estate'].map(s => (
            <div key={s} style={{ flex: 1, height: 56, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '2px solid #2563eb' }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.65rem', fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', marginBottom: '0.5rem' }}>★★★★★ 4.9 Rating · 15+ Years</div>
        <div style={{ backgroundColor: '#2563eb', height: 34, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>
          <span style={{ color: '#ffffff', fontSize: '0.75rem', fontWeight: 700 }}>Book a Free Consultation →</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 3, backgroundColor: '#2563eb', transform: 'translateX(-50%)', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 38, height: 38, borderRadius: '50%', backgroundColor: '#2563eb', border: '3px solid #ffffff', boxShadow: '0 2px 12px rgba(37,99,235,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '0.8rem', fontWeight: 700 }}>
          ⟺
        </div>
      </div>

      {/* Corner labels */}
      <div style={{ position: 'absolute', bottom: 12, left: 12, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', backgroundColor: 'rgba(37,99,235,0.9)', padding: '3px 8px', borderRadius: 4, pointerEvents: 'none', zIndex: 5 }}>After ✨</div>
      <div style={{ position: 'absolute', bottom: 12, right: 12, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', backgroundColor: 'rgba(255,255,255,0.85)', padding: '3px 8px', borderRadius: 4, pointerEvents: 'none', zIndex: 5 }}>Before</div>
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', fontSize: '0.68rem', color: '#94a3b8', backgroundColor: 'rgba(255,255,255,0.8)', padding: '3px 10px', borderRadius: 4, pointerEvents: 'none', zIndex: 5, whiteSpace: 'nowrap' }}>← drag to compare →</div>
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
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav style={{ backgroundColor: '#1a365d' }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-white text-xl md:text-2xl font-bold tracking-tight" style={{ letterSpacing: '0.02em', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '2px' }}>Ridgeline Financial Group</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-white/80 hover:text-white text-sm transition-colors">Services</a>
            <a href="#about" className="text-white/80 hover:text-white text-sm transition-colors">About</a>
            <a href="#gallery" className="text-white/80 hover:text-white text-sm transition-colors">Gallery</a>
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

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(148,163,184,0.15) 59px, rgba(148,163,184,0.15) 60px),
              repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(148,163,184,0.15) 59px, rgba(148,163,184,0.15) 60px)
            `,
            backgroundColor: '#f8fafc',
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26,54,93,0.88)' }} />
        <div className="relative max-w-4xl mx-auto text-center px-6 py-28 md:py-40 w-full">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Financial Planning You Can Trust
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.8)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            Serving the Kootenay region with personalized financial guidance for over 15 years.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#contact"
              className="inline-block px-10 py-4 text-white font-bold text-sm rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: '#2563eb', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}
            >
              Book a Free Consultation
            </a>
          </motion.div>
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
        </div>
      </div>

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <Section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          {/* PAS intro copy */}
          <div className="max-w-3xl mx-auto text-center mb-12 px-4 py-8 rounded-xl" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#1a365d' }}>
              <strong>Your potential clients check your website before they ever check your credentials.</strong> A generic template tells them you don&rsquo;t sweat the details — and in financial services, details are everything. The advisor down the street with the polished site is getting the consultation calls. Let&rsquo;s change that.
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#1a365d' }}>
            What We Can Do For You
          </h2>
          <p className="text-center mb-16 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            Digital services tailored for financial professionals
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
                title: 'Custom Website',
                desc: 'A polished, professional website that builds trust with your clients.',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#1a365d" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.73-3.563" />
                  </svg>
                ),
                pricing: 'From $1,500',
              },
              {
                title: 'Google Visibility',
                desc: 'Show up when people search for financial services in the Kootenays.',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#1a365d" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                ),
                pricing: 'From $500',
              },
              {
                title: 'Email Marketing',
                desc: 'Stay in touch with clients without lifting a finger. Newsletters, updates, done.',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#1a365d" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                ),
                pricing: 'From $750',
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className="bg-white rounded-lg p-8 text-center transition-all duration-300 cursor-default"
                style={{
                  borderTop: '4px solid #1a365d',
                  border: '1px solid #e2e8f0',
                  borderTopWidth: '4px',
                  borderTopColor: '#1a365d',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
                whileHover={{
                  boxShadow: '0 4px 30px rgba(37,99,235,0.2), 0 0 15px rgba(37,99,235,0.1)',
                }}
              >
                <div className="flex justify-center mb-5">{card.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#1a365d' }}>{card.title}</h3>
                <p style={{ color: '#64748b' }} className="leading-relaxed mb-4">{card.desc}</p>
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#eff6ff', color: '#1a365d' }}>{card.pricing}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
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
            {/* Connecting line */}
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

      {/* ═══════════ 6. GALLERY / SHOWCASE ═══════════ */}
      <Section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#1a365d' }}>
            Our Expertise
          </h2>
          <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            Areas of financial planning we specialize in
          </p>
          <div className="flex justify-center mb-12">
            <div className="rounded-lg overflow-hidden" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
              <Image
                src="/images/demos/clean-professional-showcase.webp"
                alt="Ridgeline Financial Group — professional financial planning showcase"
                width={800}
                height={500}
                className="w-full h-auto max-w-3xl"
                priority={false}
              />
            </div>
          </div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {['Retirement Planning', 'Tax Strategy', 'Estate Planning', 'Business Advisory'].map((label, i) => (
              <motion.div key={label} variants={fadeIn}>
                <div className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                  <Image src={`/images/demos/gallery/cp-${i + 1}.webp`} alt={label} fill className='object-cover' />
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                    <span className='text-white text-sm font-medium'>{label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 7. BEFORE / AFTER ═══════════ */}
      <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#1a365d' }}>
            The Transformation
          </h2>
          <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            Drag to compare a generic template with a Kootenay Made design
          </p>
          <BeforeAfterSlider />
          <p className="text-center mt-6 text-sm font-bold" style={{ color: '#2563eb' }}>
            Which one would you book a consultation with?
          </p>
        </div>
      </Section>

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
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
                quote: "We launched our new site in January. By March, our phone was ringing with people who said they found us on Google. It paid for itself in the first month.",
                name: 'Sandra K.',
                business: 'SK Law Office',
                location: 'Nelson, BC',
              },
              {
                quote: "Our old website was embarrassing us at client meetings. The new one looks as professional as the service we actually provide. Referrals have doubled.",
                name: 'David L.',
                business: 'Ridgeline Accounting',
                location: 'Castlegar, BC',
              },
              {
                quote: "Kootenay Made built exactly what I described. Clean, trustworthy, and it actually shows up on Google. Every advisor needs this.",
                name: 'Patricia M.',
                business: 'Summit Financial Planning',
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
                  <p className="text-xs" style={{ color: '#64748b' }}>{t.business} &mdash; {t.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-center mt-8 text-xs" style={{ color: '#94a3b8' }}>
            (Sample reviews &mdash; your real reviews go here)
          </p>
        </div>
      </Section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f8fafc' }}>
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

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <Section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
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

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <Section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#1a365d' }}>
            Get In Touch
          </h2>
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
                <p style={{ color: '#475569' }}>123 Sample Ave, Castlegar, BC</p>
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
                <label className="block text-sm font-bold mb-1.5" style={{ color: '#1a365d' }}>Message</label>
                <textarea rows={4} placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none" style={{ border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#1a365d')} onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')} />
              </div>
              <button type="submit" className="w-full px-8 py-3.5 text-white font-bold text-sm rounded-lg transition-all hover:opacity-90" style={{ backgroundColor: '#1a365d' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* ═══════════ 12. FOOTER ═══════════ */}
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
                <a href="#services" className="text-white/60 hover:text-white text-sm transition-colors">Services</a>
                <a href="#about" className="text-white/60 hover:text-white text-sm transition-colors">About</a>
                <a href="#gallery" className="text-white/60 hover:text-white text-sm transition-colors">Gallery</a>
                <a href="#contact" className="text-white/60 hover:text-white text-sm transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Info</h4>
              <p className="text-white/60 text-sm mb-1">Mon&ndash;Fri 9:00 AM &ndash; 5:00 PM</p>
              <p className="text-white/60 text-sm mb-1">123 Sample Ave, Castlegar, BC</p>
              <p className="text-white/60 text-sm">(250) 555-0140</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-white/50 text-sm">&copy; 2025 Ridgeline Financial Group. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ 13. STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{ backgroundColor: 'rgba(26, 54, 93, 0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm text-center sm:text-left">
            Like what you see? This could be yours. A sample by <strong>Kootenay Made Digital</strong> &mdash; <span className="text-white/70 text-xs">Your website should look this good</span>
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
