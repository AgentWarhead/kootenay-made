'use client'

import { Poppins } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const poppins = Poppins({
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
      initial={prefersReduced ? {} : { opacity: 0, y: 32 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Animated counting stat ── */
function CountUp({
  target,
  suffix = '',
  duration = 1800,
}: {
  target: number
  suffix?: string
  duration?: number
}) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!isInView || prefersReduced) {
      setDisplayed(target)
      return
    }
    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration, prefersReduced])

  return (
    <span ref={ref}>
      {displayed}
      {suffix}
    </span>
  )
}

/* ── Animated SVG icon ── */
function AnimatedIcon({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
      initial={prefersReduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      animate={
        isInView || prefersReduced
          ? { pathLength: 1, opacity: 1 }
          : { pathLength: 0, opacity: 0 }
      }
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.svg>
  )
}

/* ── Impact stat card ── */
function ImpactStat({
  icon,
  target,
  suffix,
  label,
  color,
  delay,
}: {
  icon: React.ReactNode
  target: number
  suffix: string
  label: string
  color: string
  delay: number
}) {
  return (
    <Reveal delay={delay} className="flex flex-col items-center text-center gap-3">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: `${color}18` }}
      >
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold" style={{ color }}>
        <CountUp target={target} suffix={suffix} />
      </div>
      <div className="text-sm font-600 uppercase tracking-wider" style={{ color: '#64748b' }}>
        {label}
      </div>
    </Reveal>
  )
}

/* ── Decorative blob ── */
function Blob({
  size,
  color,
  opacity,
  top,
  left,
  right,
  bottom,
}: {
  size: number
  color: string
  opacity: number
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        opacity,
        top,
        left,
        right,
        bottom,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

/* ════════════════════════════════════════
   PAGE
════════════════════════════════════════ */
export default function EducationNonprofitPage() {
  const prefersReduced = useReducedMotion()

  return (
    <div className={`${poppins.className} min-h-screen`} style={{ background: '#ffffff', color: '#1e3a5f' }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        .edu-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 4px 28px rgba(59,130,246,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .edu-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 16px 48px rgba(59,130,246,0.15);
        }
        .gallery-placeholder {
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          min-height: 120px;
        }
        .form-input {
          width: 100%;
          border: 2px solid #dbeafe;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
          font-family: inherit;
          color: #1e3a5f;
          background: #f8fafc;
        }
        .form-input:focus {
          border-color: #3b82f6;
          background: #ffffff;
        }
      `}</style>

      {/* ═══════════════════════════════════
          1. NAV
      ═══════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-10 py-4"
        style={{ background: '#eff6ff', borderBottom: '1px solid #dbeafe' }}
      >
        <span className="text-lg md:text-xl font-bold tracking-tight leading-tight max-w-[220px] md:max-w-none" style={{ color: '#1e40af' }}>
          Kootenay Community <span style={{ color: '#f59e0b' }}>Learning</span> Centre
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Programs', 'Community', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: '#475569', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#3b82f6')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
            >
              {item}
            </a>
          ))}
          <a
            href="tel:2505550113"
            className="text-sm font-bold"
            style={{ color: '#3b82f6', textDecoration: 'none' }}
          >
            (250) 555-0113
          </a>
        </div>

        {/* Mobile: phone only */}
        <a
          href="tel:2505550113"
          className="md:hidden text-sm font-bold"
          style={{ color: '#3b82f6', textDecoration: 'none' }}
        >
          (250) 555-0113
        </a>
      </nav>

      {/* ═══════════════════════════════════
          2. HERO — CSS background only
      ═══════════════════════════════════ */}
      <section
        className="relative overflow-hidden min-h-screen flex items-center"
        style={{
          background: 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 60%, #eff6ff 100%)',
        }}
      >
        {/* Decorative circles */}
        <Blob size={380} color="#3b82f6" opacity={0.13} top={-100} right={-80} />
        <Blob size={260} color="#facc15" opacity={0.22} top={60} right="12%" />
        <Blob size={200} color="#fb923c" opacity={0.14} top="40%" right="3%" />
        <Blob size={320} color="#facc15" opacity={0.12} bottom={-120} left={-80} />
        <Blob size={180} color="#3b82f6" opacity={0.10} bottom={80} left="22%" />
        <Blob size={140} color="#fb923c" opacity={0.12} top={120} left="38%" />

        <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36 w-full z-10">
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: -16 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
            </svg>
            <span className="text-sm font-semibold" style={{ color: '#3b82f6' }}>
              Learning for Life
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.08] mb-6"
            style={{ color: '#1e3a5f' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            Learning<br />
            <span style={{ color: '#3b82f6' }}>for Life.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            style={{ color: '#334155' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: 'easeOut' }}
          >
            Empowering adults and families across the Kootenays through education,
            literacy, and community programs — many of them free.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          >
            <a
              href="#programs"
              className="inline-block px-8 py-4 rounded-full text-base font-semibold transition-all duration-250"
              style={{ background: '#3b82f6', color: '#ffffff', textDecoration: 'none', boxShadow: '0 6px 24px rgba(59,130,246,0.35)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Explore Programs
            </a>
            <a
              href="#contact"
              className="inline-block px-8 py-4 rounded-full text-base font-semibold transition-all duration-250"
              style={{ background: 'transparent', color: '#3b82f6', border: '2px solid #3b82f6', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#eff6ff' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          3. TRUST BAR
      ═══════════════════════════════════ */}
      <section className="py-6 px-6" style={{ background: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <span style={{ color: '#facc15', fontSize: '1.1rem' }}>★★★★★</span>
            <span style={{ color: '#3b82f6' }}>4.9 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#3b82f6' }}>♥</span>
            <span style={{ color: '#475569' }}>Registered Non-Profit</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#fb923c' }}>●</span>
            <span style={{ color: '#475569' }}>500+ Students Served</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#3b82f6' }}>✓</span>
            <span style={{ color: '#475569' }}>Free Programs Available</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          DECORATIVE BLOB TRANSITION
      ═══════════════════════════════════ */}
      <div className="relative h-12 overflow-visible" style={{ background: '#ffffff' }} aria-hidden="true">
        <Blob size={160} color="#facc15" opacity={0.15} top={-50} left="10%" />
        <Blob size={120} color="#fb923c" opacity={0.12} top={-40} right="20%" />
        <Blob size={100} color="#3b82f6" opacity={0.10} top={-30} left="55%" />
      </div>

      {/* ═══════════════════════════════════
          4. IMPACT COUNTERS
      ═══════════════════════════════════ */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28" style={{ background: '#eff6ff' }}>
        <Blob size={280} color="#3b82f6" opacity={0.07} top={-80} right={-60} />
        <Blob size={220} color="#facc15" opacity={0.10} bottom={-60} left={-40} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#fb923c' }}>
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e3a5f' }}>
              Making a difference in the Kootenays
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            <ImpactStat
              delay={0}
              target={500}
              suffix="+"
              label="Students Served"
              color="#3b82f6"
              icon={
                <AnimatedIcon delay={0.1}>
                  <motion.path
                    d="M22 10v6M2 10l10-5 10 5-10 5z"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <motion.path
                    d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                </AnimatedIcon>
              }
            />
            <ImpactStat
              delay={0.1}
              target={45}
              suffix=""
              label="Programs"
              color="#facc15"
              icon={
                <AnimatedIcon delay={0.2}>
                  <motion.path
                    d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                    stroke="#b45309"
                    strokeWidth="2"
                  />
                  <motion.path
                    d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                    stroke="#b45309"
                    strokeWidth="2"
                  />
                </AnimatedIcon>
              }
            />
            <ImpactStat
              delay={0.2}
              target={120}
              suffix="+"
              label="Volunteers"
              color="#fb923c"
              icon={
                <AnimatedIcon delay={0.3}>
                  <motion.path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    stroke="#fb923c"
                    strokeWidth="2"
                  />
                </AnimatedIcon>
              }
            />
            <ImpactStat
              delay={0.3}
              target={15}
              suffix=""
              label="Years Serving"
              color="#3b82f6"
              icon={
                <AnimatedIcon delay={0.4}>
                  <motion.rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <motion.line x1="16" y1="2" x2="16" y2="6" stroke="#3b82f6" strokeWidth="2" />
                  <motion.line x1="8" y1="2" x2="8" y2="6" stroke="#3b82f6" strokeWidth="2" />
                  <motion.line x1="3" y1="10" x2="21" y2="10" stroke="#3b82f6" strokeWidth="2" />
                </AnimatedIcon>
              }
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          DECORATIVE BLOB TRANSITION
      ═══════════════════════════════════ */}
      <div className="relative h-10 overflow-visible" style={{ background: '#ffffff' }} aria-hidden="true">
        <Blob size={140} color="#3b82f6" opacity={0.12} top={-60} right="30%" />
        <Blob size={90} color="#fb923c" opacity={0.11} top={-30} left="45%" />
      </div>

      {/* ═══════════════════════════════════
          5. SERVICES
      ═══════════════════════════════════ */}
      <section id="programs" className="px-6 md:px-10 py-20 md:py-28" style={{ background: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#3b82f6' }}>
              Digital Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e3a5f' }}>
              Grow your mission online
            </h2>
            <p className="text-base mt-4 max-w-xl mx-auto" style={{ color: '#64748b' }}>
              We help non-profits and community organisations build a welcoming digital presence.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                desc: 'A welcoming hub for students, volunteers, and donors — built with accessibility and heart.',
                color: '#3b82f6',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
              },
              {
                title: 'Email Marketing',
                desc: 'Keep your community connected with program updates, success stories, and upcoming events.',
                color: '#facc15',
                iconColor: '#b45309',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                ),
              },
              {
                title: 'Social Media',
                desc: 'Share your impact. Celebrate your students. Grow your community far and wide.',
                color: '#fb923c',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                ),
              },
            ].map((service, i) => (
              <Reveal key={service.title} delay={i * 0.1}>
                <div
                  className="edu-card p-8 h-full"
                  style={{ borderTop: `4px solid ${service.color}` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${service.color}15` }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#1e3a5f' }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          6. GALLERY / SHOWCASE
      ═══════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 md:px-10 py-20 md:py-28"
        style={{ background: '#eff6ff' }}
      >
        <Blob size={300} color="#3b82f6" opacity={0.08} top={-80} left={-60} />
        <Blob size={200} color="#facc15" opacity={0.14} bottom={-60} right={-40} />

        <div className="relative z-10 max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#fb923c' }}>
              Our Community
            </span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e3a5f' }}>
              Learning happens here
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mb-8">
            <div
              className="relative w-full overflow-hidden"
              style={{ borderRadius: 20, boxShadow: '0 12px 48px rgba(59,130,246,0.15)' }}
            >
              <Image
                src="/images/demos/education-nonprofit-showcase.webp"
                alt="Kootenay Community Learning Centre — students and volunteers"
                width={800}
                height={500}
                className="w-full object-cover"
                style={{ maxHeight: 480 }}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: 'Adult Programs', img: '/images/demos/gallery/en-1.webp' },
              { label: 'Youth Classes', img: '/images/demos/gallery/en-2.webp' },
              { label: 'Community Events', img: '/images/demos/gallery/en-3.webp' },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
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

      {/* ═══════════════════════════════════
          7. TESTIMONIAL
      ═══════════════════════════════════ */}
      <section className="px-6 md:px-10 py-20 md:py-28" style={{ background: '#ffffff' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div
              className="relative p-10 md:p-14"
              style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: 24,
                boxShadow: '0 8px 40px rgba(59,130,246,0.10)',
                borderLeft: '5px solid #3b82f6',
              }}
            >
              {/* Quote mark */}
              <div
                className="text-6xl font-bold leading-none mb-4 select-none"
                style={{ color: '#3b82f6', opacity: 0.25, lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#facc15', fontSize: '1.2rem' }}>★</span>
                ))}
              </div>
              <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: '#1e3a5f', fontStyle: 'italic' }}>
                KCLC changed my life. The programs gave me the confidence and skills to start my own business.
                I never thought I&rsquo;d go back to learning — now I can&rsquo;t imagine life without it.
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: '#3b82f6' }}
                >
                  MS
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>Maria S.</div>
                  <div className="text-xs" style={{ color: '#64748b' }}>Castlegar, BC</div>
                </div>
              </div>
              <p className="text-xs mt-6 italic" style={{ color: '#94a3b8' }}>
                (Sample review — your real reviews go here)
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════
          DECORATIVE BLOB TRANSITION
      ═══════════════════════════════════ */}
      <div className="relative h-10 overflow-visible" style={{ background: '#eff6ff' }} aria-hidden="true">
        <Blob size={180} color="#fb923c" opacity={0.10} top={-70} left="25%" />
        <Blob size={120} color="#facc15" opacity={0.14} top={-40} right="15%" />
        <Blob size={100} color="#3b82f6" opacity={0.09} top={-50} left="65%" />
      </div>

      {/* ═══════════════════════════════════
          8. ABOUT
      ═══════════════════════════════════ */}
      <section
        id="about"
        className="relative overflow-hidden px-6 md:px-10 py-20 md:py-28"
        style={{ background: '#eff6ff' }}
      >
        <Blob size={260} color="#3b82f6" opacity={0.07} top={-60} right={-50} />
        <Blob size={200} color="#fb923c" opacity={0.08} bottom={-50} left={-40} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <Reveal>
              <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#3b82f6' }}>
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1e3a5f' }}>
                Rooted in community,<br />learning for life.
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#475569' }}>
                The Kootenay Community Learning Centre has been at the heart of adult education and
                literacy in the West Kootenays for over 15 years. We believe that learning is a lifelong
                journey — and everyone deserves the chance to grow.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#475569' }}>
                From foundational literacy to digital skills, from youth programs to seniors&rsquo; learning
                circles, our caring team of educators and over 120 dedicated volunteers make it happen.
                Many of our programs are offered free or at low cost, because we believe financial barriers
                should never stand in the way of learning.
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-4 rounded-full text-sm font-semibold transition-all duration-250"
                style={{ background: '#3b82f6', color: '#ffffff', textDecoration: 'none', boxShadow: '0 4px 18px rgba(59,130,246,0.30)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#3b82f6' }}
              >
                Learn More About KCLC
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { num: '500+', label: 'Learners per year', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
                  { num: '45', label: 'Active programs', color: '#b45309', bg: 'rgba(250,204,21,0.18)' },
                  { num: '120+', label: 'Volunteers', color: '#ea580c', bg: 'rgba(251,146,60,0.15)' },
                  { num: '15', label: 'Years in Kootenays', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center p-6 text-center"
                    style={{ background: stat.bg, borderRadius: 16 }}
                  >
                    <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                      {stat.num}
                    </div>
                    <div className="text-xs font-semibold" style={{ color: '#64748b' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          9. CONTACT
      ═══════════════════════════════════ */}
      <section
        id="contact"
        className="relative overflow-hidden px-6 md:px-10 py-20 md:py-28"
        style={{ background: '#ffffff' }}
      >
        <Blob size={240} color="#facc15" opacity={0.10} top={-60} right="5%" />
        <Blob size={180} color="#3b82f6" opacity={0.08} bottom={-40} left="8%" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#fb923c' }}>
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e3a5f' }}>
              We&rsquo;d love to hear from you
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Contact info */}
            <Reveal delay={0}>
              <div className="flex flex-col gap-7">
                {[
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.12 13 19.79 19.79 0 0 1 1.07 4.4 2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 21 16.92z" />
                      </svg>
                    ),
                    label: 'Phone',
                    value: '(250) 555-0113',
                    href: 'tel:2505550113',
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    ),
                    label: 'Email',
                    value: 'info@kclc.ca',
                    href: 'mailto:info@kclc.ca',
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    ),
                    label: 'Hours',
                    value: 'Mon – Fri, 9:00 AM – 5:00 PM',
                    href: null,
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    ),
                    label: 'Location',
                    value: 'Castlegar, BC, Canada',
                    href: null,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: '#eff6ff' }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#94a3b8' }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="font-semibold" style={{ color: '#1e3a5f', textDecoration: 'none' }}>
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-semibold" style={{ color: '#1e3a5f' }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={0.15}>
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
                style={{
                  background: '#f8fafc',
                  borderRadius: 20,
                  padding: '2rem',
                  boxShadow: '0 4px 24px rgba(59,130,246,0.08)',
                  border: '1px solid #dbeafe',
                }}
              >
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    Your Name
                  </label>
                  <input type="text" placeholder="Jane Smith" className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    Email Address
                  </label>
                  <input type="email" placeholder="jane@example.com" className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help..."
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-base font-semibold transition-all duration-250"
                  style={{ background: '#3b82f6', color: '#ffffff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 18px rgba(59,130,246,0.30)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FOOTER
      ═══════════════════════════════════ */}
      <footer
        className="px-6 md:px-10 py-14"
        style={{ background: '#1e3a5f' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div>
              <div className="text-lg font-bold mb-2" style={{ color: '#93c5fd' }}>
                Kootenay Community Learning Centre
              </div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Castlegar, BC · Learning for Life
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              {['Programs', 'Community', 'About', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#93c5fd')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div
            className="pt-8 text-xs text-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}
          >
            &copy; {new Date().getFullYear()} Kootenay Community Learning Centre. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════
          STICKY BOTTOM BAR
      ═══════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3"
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid #dbeafe',
          boxShadow: '0 -2px 20px rgba(59,130,246,0.08)',
        }}
      >
        <p className="text-xs md:text-sm" style={{ color: '#64748b' }}>
          This is a sample design by{' '}
          <span style={{ color: '#3b82f6', fontWeight: 600 }}>Kootenay Made Digital</span>
        </p>
        <Link
          href="/contact?style=education-nonprofit"
          className="text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-250 whitespace-nowrap"
          style={{ background: '#3b82f6', color: '#ffffff', textDecoration: 'none', boxShadow: '0 3px 14px rgba(59,130,246,0.30)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#3b82f6' }}
        >
          Get This Style &rarr;
        </Link>
      </div>

      {/* Bottom spacer for sticky bar */}
      <div className="h-16" />
    </div>
  )
}
