'use client'

import { DM_Sans } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const font = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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

/* ── Checkmark that pops in on scroll ── */
function CheckPop({ delay = 0 }: { delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-bold flex-shrink-0"
      style={{ backgroundColor: '#0891b2' }}
      initial={prefersReduced ? {} : { scale: 0, opacity: 0 }}
      whileInView={prefersReduced ? {} : { scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 400, damping: 15 }}
    >
      &#10003;
    </motion.span>
  )
}

/* ── Before/After Slider ── */
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
      style={{ position: 'relative', height: 340, cursor: 'ew-resize', userSelect: 'none', overflow: 'hidden', borderRadius: 16, boxShadow: '0 4px 24px rgba(8,145,178,0.1)' }}
      onMouseDown={() => { dragging.current = true }}
      onMouseUp={() => { dragging.current = false }}
      onMouseLeave={() => { dragging.current = false }}
      onMouseMove={(e) => { if (dragging.current) move(e.clientX) }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onClick={(e) => move(e.clientX)}
    >
      {/* BEFORE */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#f1f5f9', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>BEFORE — Generic Template</div>
        <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 400, marginBottom: '0.5rem' }}>Dr. Smith Family Dental</div>
        <div style={{ backgroundColor: '#cbd5e1', height: 14, width: '65%', borderRadius: 4, marginBottom: '0.5rem' }} />
        <div style={{ backgroundColor: '#cbd5e1', height: 14, width: '50%', borderRadius: 4, marginBottom: '1rem' }} />
        <div style={{ height: 90, backgroundColor: '#dde2e8', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Stock Photo Here</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {['Services', 'Team', 'Book'].map(s => (
            <div key={s} style={{ flex: 1, height: 56, backgroundColor: '#cbd5e1', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#94a3b8', height: 34, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}>
          <span style={{ color: '#ffffff', fontSize: '0.75rem', fontWeight: 600 }}>Call Now</span>
        </div>
      </div>

      {/* AFTER */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)`, backgroundColor: '#0891b2', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        <div style={{ color: '#a5f3fc', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>AFTER — Kootenay Made Design</div>
        <div style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>Kootenay Family Dental</div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', marginBottom: '1rem' }}>Gentle care for every smile ✦ Now accepting new patients</div>
        <div style={{ height: 90, background: 'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.2)' }}>
          <span style={{ color: '#ffffff', fontSize: '0.8rem', fontWeight: 600 }}>Clean · Calm · Professional</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {['Cleanings', 'Whitening', 'Orthodontics'].map(s => (
            <div key={s} style={{ flex: 1, height: 56, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.6rem', fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', marginBottom: '0.5rem' }}>★★★★★ 4.9 · Direct Billing · Accepting New Patients</div>
        <div style={{ backgroundColor: '#ffffff', height: 34, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}>
          <span style={{ color: '#0891b2', fontSize: '0.75rem', fontWeight: 700 }}>Book an Appointment →</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 3, backgroundColor: '#0891b2', transform: 'translateX(-50%)', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 38, height: 38, borderRadius: '50%', backgroundColor: '#0891b2', border: '3px solid #ffffff', boxShadow: '0 2px 12px rgba(8,145,178,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '0.8rem', fontWeight: 700 }}>
          ⟺
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 12, left: 12, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', backgroundColor: 'rgba(8,145,178,0.9)', padding: '3px 8px', borderRadius: 20, pointerEvents: 'none', zIndex: 5 }}>After ✨</div>
      <div style={{ position: 'absolute', bottom: 12, right: 12, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', backgroundColor: 'rgba(255,255,255,0.85)', padding: '3px 8px', borderRadius: 20, pointerEvents: 'none', zIndex: 5 }}>Before</div>
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', fontSize: '0.68rem', color: '#94a3b8', backgroundColor: 'rgba(255,255,255,0.85)', padding: '3px 10px', borderRadius: 20, pointerEvents: 'none', zIndex: 5, whiteSpace: 'nowrap' }}>← drag to compare →</div>
    </div>
  )
}

/* ── FAQ Accordion ── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-sm transition-colors"
            style={{ color: '#1e293b', backgroundColor: open === i ? '#f0f7ff' : '#ffffff' }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <span style={{ color: '#0891b2', transition: 'transform 0.25s', transform: open === i ? 'rotate(180deg)' : 'none', display: 'inline-block', marginLeft: '1rem', flexShrink: 0 }}>▼</span>
          </button>
          {open === i && (
            <div className="px-6 py-4 text-sm leading-relaxed" style={{ color: '#475569', borderTop: '1px solid #e2e8f0', backgroundColor: '#f0f7ff' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   KOOTENAY FAMILY DENTAL — Medical & Dental Demo
   ══════════════════════════════════════════════════════════════ */
export default function MedicalDentalDemo() {
  const prefersReduced = useReducedMotion()

  const faqItems = [
    {
      q: 'How long does a website take?',
      a: 'Most dental and medical websites are designed and live within 2–3 weeks. We handle everything — you just review and approve. Your practice stays focused on patients.',
    },
    {
      q: 'What if I already have a website?',
      a: 'We can redesign it completely or do a targeted refresh. Either way, the result is a site that makes new patients feel safe and welcome before their first appointment.',
    },
    {
      q: 'Do I need to provide content and photos?',
      a: "We'll guide you through what we need. We write the copy, and we can work with stock imagery or help you plan a simple photo session. Getting started is easy.",
    },
    {
      q: 'What does it cost?',
      a: 'Websites start from $1,500. A full brand build starts from $4,000. Google Domination (local SEO) starts from $500. Book a free consultation for an exact quote tailored to your practice.',
    },
    {
      q: 'Can I manage the site myself?',
      a: 'Yes — we build on easy-to-use platforms. Update your team page, add news, or change hours without touching code. Or we handle it for you.',
    },
    {
      q: 'Can you integrate online booking?',
      a: 'Absolutely. We can connect your booking system directly to your website so new patients can schedule 24/7 without calling the front desk.',
    },
    {
      q: 'Is patient trust built into the design?',
      a: "It's baked in from the start. Clean, calming aesthetics, clear credentials, team photos, and trust signals like ratings and years of experience — everything patients look for before choosing a provider.",
    },
  ]

  return (
    <div className={font.className} style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: '#ffffff', color: '#1e293b' }}>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @keyframes calmPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(8,145,178,0.3); }
          50% { box-shadow: 0 0 0 12px rgba(8,145,178,0); }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl md:text-2xl font-extrabold tracking-tight" style={{ color: '#0891b2', letterSpacing: '0.02em' }}>
            Kootenay Family Dental
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Gallery', 'Book Now'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium transition-colors"
                style={{ color: '#64748b' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0891b2')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
              >
                {link}
              </a>
            ))}
            <a href="tel:2505550188" className="text-sm font-bold" style={{ color: '#0891b2' }}>
              (250) 555-0188
            </a>
          </div>
          <a href="tel:2505550188" className="md:hidden text-sm font-bold" style={{ color: '#0891b2' }}>
            (250) 555-0188
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/demos/medical-dental-hero.webp"
            alt="Kootenay Family Dental — welcoming modern dental office"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-white/60" />
        <div className="relative max-w-4xl mx-auto text-center px-6 py-32 md:py-44 w-full">
          <motion.p
            className="text-sm uppercase tracking-[0.2em] mb-6 font-medium"
            style={{ color: '#0891b2' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Gentle care for every smile
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            style={{ color: '#1e293b' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Kootenay Family Dental
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#475569' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Your family deserves a dental team that listens, cares, and makes every visit comfortable.
          </motion.p>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a
              href="#book-now"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all rounded-full"
              style={{
                backgroundColor: '#0891b2',
                color: '#ffffff',
                animation: prefersReduced ? 'none' : 'calmPulse 3s ease-in-out infinite',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
            >
              Book an Appointment
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div style={{ backgroundColor: '#f0f7ff' }} className="py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {[
            { label: '4.9 Rating', icon: '★★★★★' },
            { label: '15+ Years' },
            { label: 'Accepting New Patients' },
            { label: 'Direct Billing' },
          ].map((item, i) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap"
              style={{ backgroundColor: '#ffffff', color: '#0891b2', border: '1px solid rgba(8,145,178,0.15)' }}
            >
              {item.icon && <span style={{ color: '#0891b2' }}>{item.icon}</span>}
              <CheckPop delay={i * 0.1} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto">
          {/* PAS intro */}
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-12 px-6 py-8 rounded-2xl" style={{ backgroundColor: '#f0f7ff', border: '1px solid rgba(8,145,178,0.15)' }}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#1e293b' }}>
                <strong>Patients are choosing the clinic with the modern website and online booking.</strong> Not because that clinic is better &mdash; but because it <em>looks</em> more trustworthy before they ever walk through the door. The practice that looks professional gets the call. Let&rsquo;s make sure that&rsquo;s yours.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              What We Can Do For You
            </h2>
            <p className="text-center mb-16" style={{ color: '#64748b' }}>
              Digital solutions tailored for dental and medical practices
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Custom Website', desc: 'Make new patients feel welcome before their first visit.', pricing: 'From $1,500' },
              { title: 'Google Visibility', desc: 'Be the first dental clinic families find when they search.', pricing: 'From $500' },
              { title: 'Email Marketing', desc: 'Automated recall reminders keep your schedule full.', pricing: 'From $750' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div
                  className="p-8 text-center transition-all cursor-default rounded-2xl"
                  style={{ backgroundColor: '#f0f7ff', boxShadow: '0 1px 8px rgba(8,145,178,0.06)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(8,145,178,0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 8px rgba(8,145,178,0.06)')}
                >
                  <div className="flex justify-center mb-4">
                    <CheckPop delay={0.2 + i * 0.1} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0891b2' }}>{card.title}</h3>
                  <p className="leading-relaxed mb-4" style={{ color: '#475569' }}>{card.desc}</p>
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#ffffff', color: '#0891b2', border: '1px solid rgba(8,145,178,0.2)' }}>{card.pricing}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              How It Works
            </h2>
            <p className="text-center mb-16" style={{ color: '#64748b' }}>
              From first conversation to live website — no stress, no jargon
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { num: '01', title: 'We Talk', desc: 'Tell us about your practice, your patients, and what makes your care special. Free consultation — no pressure at all.' },
              { num: '02', title: 'We Build', desc: 'We design and develop your site in about two weeks. You review, we refine. It will feel exactly right.' },
              { num: '03', title: 'You Grow', desc: 'Launch, get found on Google, and watch new patient bookings roll in. Your practice, elevated online.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.15}>
                <div className="text-center">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white text-xl font-bold mb-6 mx-auto"
                    style={{ backgroundColor: '#0891b2', boxShadow: '0 4px 16px rgba(8,145,178,0.3)' }}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#1e293b' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY / SHOWCASE ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12" style={{ color: '#1e293b' }}>
              Our Practice
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="overflow-hidden w-full max-w-3xl rounded-2xl" style={{ boxShadow: '0 4px 24px rgba(8,145,178,0.1)' }}>
                <Image
                  src="/images/demos/medical-dental-showcase.webp"
                  alt="Kootenay Family Dental — modern treatment room"
                  width={800}
                  height={450}
                  className="w-full h-auto block"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Treatment Rooms', 'Waiting Area', 'Our Team'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                  <Image src={`/images/demos/gallery/md-${i + 1}.webp`} alt={label} fill className='object-cover' />
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                    <span className='text-white text-sm font-medium'>{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. BEFORE / AFTER ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              The Transformation
            </h2>
            <p className="text-center mb-12" style={{ color: '#64748b' }}>
              Drag to compare a generic template with a Kootenay Made design
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfterSlider />
          </Reveal>
          <p className="text-center mt-6 text-sm font-bold" style={{ color: '#0891b2' }}>
            Which clinic would you book an appointment with?
          </p>
        </div>
      </section>

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              What Practices Are Saying
            </h2>
            <p className="text-center mb-16" style={{ color: '#64748b' }}>Real results from real Kootenay clinics</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "New patient bookings went up 40% in the first two months after our new website launched. Patients actually comment on how professional it looks. Worth every penny.",
                name: 'Dr. Sarah K.',
                business: 'Nakusp Family Dental',
                location: 'Nakusp, BC',
              },
              {
                quote: "Our old site was costing us patients — they were choosing the clinic with online booking. Kootenay Made set us up right. The phone doesn't stop ringing now.",
                name: 'Dr. Marcus T.',
                business: 'Castlegar Medical Clinic',
                location: 'Castlegar, BC',
              },
              {
                quote: "They understood how important trust is for a dental practice. The website feels calm, warm, and credible. Exactly what nervous patients need to see before booking.",
                name: 'Dr. Priya M.',
                business: 'Trail Dental Group',
                location: 'Trail, BC',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div
                  className="p-8 rounded-2xl transition-all"
                  style={{ backgroundColor: '#f0f7ff', boxShadow: '0 2px 12px rgba(8,145,178,0.06)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(8,145,178,0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(8,145,178,0.06)')}
                >
                  <div className="mb-4 text-xl" style={{ color: '#0891b2' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <blockquote className="text-base leading-relaxed mb-6" style={{ color: '#1e293b', fontStyle: 'italic' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#0891b2' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: '#64748b' }}>{t.business} &mdash; {t.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-center mt-8 text-xs" style={{ color: '#94a3b8' }}>
            (Sample reviews &mdash; your real reviews go here)
          </p>
        </div>
      </section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-center mb-12" style={{ color: '#64748b' }}>
              Everything you need to know before we start
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={faqItems} />
          </Reveal>
          <div className="text-center mt-10">
            <a
              href="#book-now"
              className="inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all rounded-full"
              style={{ backgroundColor: '#0891b2', color: '#ffffff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
            >
              Let&rsquo;s Talk →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#1e293b' }}>
              About Our Practice
            </h2>
            <div className="flex justify-center mb-10">
              <div className="w-12 h-1 rounded-full" style={{ backgroundColor: '#0891b2' }} />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
              Kootenay Family Dental has been providing gentle, comprehensive dental care to families in Trail and the West Kootenays for over 15 years. Our team believes that a visit to the dentist should be comfortable, stress-free, and even enjoyable. We use the latest technology, take the time to explain every procedure, and always put your comfort first. From children&rsquo;s first visits to cosmetic work and everything in between &mdash; we&rsquo;re here to help your whole family smile with confidence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section id="book-now" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              Book an Appointment
            </h2>
            <p className="text-center mb-16" style={{ color: '#64748b' }}>
              New patients welcome &mdash; we&rsquo;d love to meet you
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Phone</h3>
                  <p className="text-lg font-bold" style={{ color: '#1e293b' }}>(250) 555-0188</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Email</h3>
                  <p style={{ color: '#475569' }}>info@kootenaydental.ca</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Hours</h3>
                  <p style={{ color: '#475569' }}>Monday &ndash; Friday: 8:00 AM &ndash; 5:00 PM</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Location</h3>
                  <p style={{ color: '#475569' }}>Trail, BC</p>
                </div>
                <a
                  href="tel:2505550188"
                  className="inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all mt-4 rounded-full"
                  style={{
                    backgroundColor: '#0891b2',
                    color: '#ffffff',
                    animation: prefersReduced ? 'none' : 'calmPulse 3s ease-in-out infinite',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
                >
                  Book an Appointment
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-sm outline-none transition-all rounded-xl" style={{ backgroundColor: '#f0f7ff', border: '1px solid #e2e8f0', color: '#1e293b' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#0891b2')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Email</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 text-sm outline-none transition-all rounded-xl" style={{ backgroundColor: '#f0f7ff', border: '1px solid #e2e8f0', color: '#1e293b' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#0891b2')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Message</label>
                  <textarea rows={4} placeholder="Preferred date, time, or any questions..." className="w-full px-4 py-3 text-sm outline-none transition-all resize-none rounded-xl" style={{ backgroundColor: '#f0f7ff', border: '1px solid #e2e8f0', color: '#1e293b' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#0891b2')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                </div>
                <button type="submit" className="w-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all rounded-full" style={{ backgroundColor: '#0891b2', color: '#ffffff' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}>
                  Request Appointment
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 12. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0891b2' }}>Kootenay Family Dental</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Gentle care for every smile.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891b2' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Services', 'About', 'Gallery', 'Book Now'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#0891b2')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891b2' }}>Info</h4>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Mon&ndash;Fri 8:00 AM &ndash; 5:00 PM</p>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Trail, BC</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>(250) 555-0188</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} className="pt-6 text-center">
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>&copy; 2025 Kootenay Family Dental. All rights reserved.</span>
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
          borderTop: '2px solid #0891b2',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: '#64748b' }}>
            Sample design by <strong style={{ color: '#1e293b' }}>Kootenay Made Digital</strong> &mdash; <span className="text-xs" style={{ color: '#94a3b8' }}>Get a let's talk for your practice</span>
          </span>
          <Link
            href="/contact?style=medical-dental"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap rounded-full"
            style={{ backgroundColor: '#0891b2', color: '#ffffff', boxShadow: '0 2px 12px rgba(8,145,178,0.3)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
          >
            Like What You See? Let's Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
