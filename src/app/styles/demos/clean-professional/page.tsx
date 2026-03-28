'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
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
    // respect prefers-reduced-motion
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

export default function CleanProfessionalDemo() {
  /* ─── trust bar counter refs ─── */
  const trustRef = useRef(null)
  const trustInView = useInView(trustRef, { once: true })
  const ratingCount = useCounter(4, trustInView, 800)
  const yearsCount = useCounter(15, trustInView, 1200)

  return (
    <div className={inter.className} style={{ fontFamily: 'Inter, sans-serif', color: '#334155' }}>
      {/* ── prefers-reduced-motion: disable all framer animations ── */}
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
            <a
              href="tel:2505550140"
              className="text-white font-bold text-sm ml-4 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              (250) 555-0140
            </a>
          </div>
          {/* mobile phone */}
          <a href="tel:2505550140" className="md:hidden text-white text-sm font-bold">(250) 555-0140</a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        {/* Grid-line pattern background */}
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
        {/* Navy overlay */}
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
                title: 'Custom Website Design',
                desc: 'A polished, professional website that builds trust with your clients.',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#1a365d" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.73-3.563" />
                  </svg>
                ),
              },
              {
                title: 'Local SEO & Visibility',
                desc: 'Get found by Kootenay clients searching for financial services.',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#1a365d" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                ),
              },
              {
                title: 'Content & Brand Strategy',
                desc: 'Clear messaging that communicates your expertise and values.',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#1a365d" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                ),
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
                <p style={{ color: '#64748b' }} className="leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 5. GALLERY / SHOWCASE ═══════════ */}
      <Section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#1a365d' }}>
            Our Expertise
          </h2>
          <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            Areas of financial planning we specialize in
          </p>

          {/* Main showcase image */}
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

          {/* 4 labeled placeholder boxes */}
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

      {/* ═══════════ 6. TESTIMONIAL ═══════════ */}
      <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-3xl mx-auto text-center">
          {/* Stars */}
          <div className="mb-6 text-2xl" style={{ color: '#f59e0b' }}>
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </div>
          <blockquote className="text-xl md:text-2xl leading-relaxed mb-6 italic" style={{ color: '#1e293b' }}>
            &ldquo;Ridgeline helped us plan our retirement with confidence. Professional, patient, and truly local.&rdquo;
          </blockquote>
          <p className="font-bold" style={{ color: '#1a365d' }}>
            &mdash; David &amp; Carol T., Trail
          </p>
          <p className="mt-4 text-xs" style={{ color: '#94a3b8' }}>
            (Sample review &mdash; your real reviews go here)
          </p>
        </div>
      </Section>

      {/* ═══════════ 7. ABOUT ═══════════ */}
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

      {/* ═══════════ 8. CONTACT ═══════════ */}
      <Section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#1a365d' }}>
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
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
                <p style={{ color: '#475569' }}>123 Columbia Ave, Castlegar, BC</p>
              </div>
            </div>

            {/* Mini Contact Form (visual only) */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: '#1a365d' }}>Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#1a365d')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: '#1a365d' }}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#1a365d')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: '#1a365d' }}>Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none"
                  style={{
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#1a365d')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3.5 text-white font-bold text-sm rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: '#1a365d' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* ═══════════ 9. FOOTER ═══════════ */}
      <footer style={{ backgroundColor: '#1a365d' }} className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Col 1: Brand */}
            <div>
              <h3 className="text-white text-lg font-bold mb-3">Ridgeline Financial Group</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Financial planning for the Kootenays.
              </p>
            </div>
            {/* Col 2: Nav */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <a href="#services" className="text-white/60 hover:text-white text-sm transition-colors">Services</a>
                <a href="#about" className="text-white/60 hover:text-white text-sm transition-colors">About</a>
                <a href="#gallery" className="text-white/60 hover:text-white text-sm transition-colors">Gallery</a>
                <a href="#contact" className="text-white/60 hover:text-white text-sm transition-colors">Contact</a>
              </div>
            </div>
            {/* Col 3: Info */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Info</h4>
              <p className="text-white/60 text-sm mb-1">Mon&ndash;Fri 9:00 AM &ndash; 5:00 PM</p>
              <p className="text-white/60 text-sm mb-1">123 Columbia Ave, Castlegar, BC</p>
              <p className="text-white/60 text-sm">(250) 555-0140</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-white/50 text-sm">
              &copy; 2025 Ridgeline Financial Group. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ 10. STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(26, 54, 93, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm text-center sm:text-left">
            This is a sample design by <strong>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=clean-professional"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded-lg transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#ffffff', color: '#1a365d' }}
          >
            Get This Style &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom spacer for sticky bar */}
      <div className="h-16" />
    </div>
  )
}
