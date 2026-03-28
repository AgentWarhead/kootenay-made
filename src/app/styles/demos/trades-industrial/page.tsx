'use client'

import { Rajdhani, Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const heading = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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

/* ── Angular clip-path divider ── */
function AngularDivider({ topColor = '#2d2d2d', bottomColor = '#1a1a1a' }: { topColor?: string; bottomColor?: string }) {
  return (
    <div style={{ backgroundColor: topColor, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14 block">
        <polygon fill={bottomColor} points="0,0 1440,30 1440,60 0,60" />
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SUMMIT PLUMBING & HEATING — Trades & Industrial Demo
   ══════════════════════════════════════════════════════════════ */
export default function TradesIndustrialDemo() {
  const prefersReduced = useReducedMotion()

  /* Scroll progress for tool icon draw animation */
  const toolsRef = useRef(null)
  const { scrollYProgress: toolsScroll } = useScroll({
    target: toolsRef,
    offset: ['start end', 'end start'],
  })
  const drawLength = useTransform(toolsScroll, [0, 0.5], [1, 0])

  return (
    <div className={body.className} style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#2d2d2d', color: '#ffffff' }}>

      {/* ── prefers-reduced-motion ── */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @keyframes emergencyPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(255,106,0,0.4); background-color: #ff6a00; }
          50% { box-shadow: 0 0 24px rgba(255,40,0,0.8); background-color: #ff3300; }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav style={{ backgroundColor: '#1a1a1a', borderBottom: '2px solid #ff6a00' }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className={`${heading.className} text-xl md:text-2xl font-bold uppercase tracking-wider`} style={{ color: '#ffffff' }}>
            SUMMIT PLUMBING <span style={{ color: '#ff6a00' }}>&amp;</span> HEATING
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Projects', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6a00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {link}
              </a>
            ))}
            <a
              href="tel:2505550142"
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: '#ff6a00' }}
            >
              (250) 555-0142
            </a>
          </div>
          <a href="tel:2505550142" className="md:hidden text-sm font-bold" style={{ color: '#ff6a00' }}>
            (250) 555-0142
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/demos/trades-industrial-hero.webp"
            alt="Summit Plumbing & Heating — professional plumbing work"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Angular accent */}
        <div
          className="absolute top-0 left-0 w-3 md:w-4"
          style={{ backgroundColor: '#ff6a00', height: '70%', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          {/* Emergency badge */}
          <motion.div
            className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest text-white mb-8 rounded-sm"
            style={{
              backgroundColor: '#ff6a00',
              animation: prefersReduced ? 'none' : 'emergencyPulse 2s ease-in-out infinite',
            }}
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
            animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            EMERGENCY 24/7
          </motion.div>

          {/* MASSIVE phone number */}
          <motion.a
            href="tel:2505550142"
            className={`${heading.className} block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 transition-colors`}
            style={{ color: '#ff6a00' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 30px rgba(255,106,0,0.6)')}
            onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
          >
            (250) 555-0142
          </motion.a>

          <motion.h1
            className={`${heading.className} text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight mb-6`}
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            KOOTENAY RELIABLE
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-xl leading-relaxed mb-10"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Plumbing, heating &amp; gas fitting for homes and businesses across the West Kootenays.
          </motion.p>

          <motion.a
            href="#contact"
            className={`${heading.className} inline-block px-10 py-4 text-base font-bold uppercase tracking-widest transition-all`}
            style={{ backgroundColor: '#ff6a00', color: '#ffffff' }}
            whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(255,106,0,0.6)', scale: 1.03 }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            GET A FREE QUOTE
          </motion.a>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <section style={{ backgroundColor: '#ff6a00' }} className="py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
          {[
            '★★★★★ 5.0 Rating',
            '20+ Years',
            'Licensed & Insured',
            '24/7 Emergency',
          ].map((item) => (
            <span
              key={item}
              className={`${heading.className} text-sm md:text-base font-bold uppercase tracking-wider whitespace-nowrap`}
              style={{ color: '#ffffff' }}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <AngularDivider topColor="#ff6a00" bottomColor="#2d2d2d" />

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <section id="services" ref={toolsRef} className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#2d2d2d' }}>
        {/* Drawing wrench SVG on scroll */}
        <motion.svg
          className="absolute top-1/2 right-12 -translate-y-1/2 hidden xl:block"
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          style={{ opacity: 0.12 }}
        >
          <motion.path
            d="M90 15a25 25 0 0 0-22.93 35.18L30 87.25a10 10 0 1 0 14.14 14.14L81.82 63.93A25 25 0 0 0 90 15z"
            stroke="#ff6a00"
            strokeWidth="2"
            fill="none"
            style={{ pathLength: prefersReduced ? 1 : drawLength }}
          />
        </motion.svg>

        {/* Drawing pipe SVG on scroll */}
        <motion.svg
          className="absolute top-1/2 left-12 -translate-y-1/2 hidden xl:block"
          width="100"
          height="100"
          viewBox="0 0 48 48"
          fill="none"
          style={{ opacity: 0.12 }}
        >
          <motion.path
            d="M8 14h12v6H8v14h6V22h12v12h6V22h8v-6h-8V8h-6v8H14V8H8v6z"
            stroke="#ff6a00"
            strokeWidth="1.5"
            fill="none"
            style={{ pathLength: prefersReduced ? 1 : drawLength }}
          />
        </motion.svg>

        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>
              WHAT WE BUILD FOR YOU
            </h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Custom Website',
                desc: 'Get found by homeowners who need a plumber RIGHT NOW.',
              },
              {
                title: 'Google Visibility',
                desc: 'Top of search for plumber, HVAC, heating in the Kootenays.',
              },
              {
                title: 'Smart Business Tools',
                desc: 'Automate booking and follow-ups. More time on the job.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <motion.div
                  className="relative p-8 h-full transition-all cursor-default overflow-hidden"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderTop: '4px solid #ff6a00',
                    backgroundImage: 'linear-gradient(135deg, rgba(138,155,176,0.05) 0%, transparent 50%)',
                  }}
                  whileHover={prefersReduced ? {} : { scale: 1.04, boxShadow: '0 0 30px rgba(255,106,0,0.4)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Steel texture overlay */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(138,155,176,0.3) 2px, rgba(138,155,176,0.3) 3px)',
                  }} />
                  <div className="relative">
                    <h3 className={`${heading.className} text-xl md:text-2xl font-bold uppercase mb-4`} style={{ color: '#ff6a00' }}>
                      {card.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AngularDivider topColor="#2d2d2d" bottomColor="#1a1a1a" />

      {/* ═══════════ 5. GALLERY / SHOWCASE ═══════════ */}
      <section id="projects" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>
              RECENT PROJECTS
            </h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative w-full max-w-3xl mx-auto mb-12 overflow-hidden" style={{ borderBottom: '4px solid #ff6a00' }}>
              <Image
                src="/images/demos/trades-industrial-showcase.webp"
                alt="Summit Plumbing & Heating — recent project showcase"
                width={800}
                height={500}
                className="w-full h-auto block"
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Kitchen Reno', 'Bathroom Remodel', 'Emergency Repair'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                  <Image src={`/images/demos/gallery/ti-${i + 1}.webp`} alt={label} fill className='object-cover' />
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                    <span className='text-white text-sm font-medium'>{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AngularDivider topColor="#1a1a1a" bottomColor="#2d2d2d" />

      {/* ═══════════ 6. TESTIMONIAL ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#2d2d2d' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex gap-6">
              {/* Orange accent bar */}
              <div className="hidden sm:block w-1.5 flex-shrink-0" style={{ backgroundColor: '#ff6a00' }} />
              <div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-2xl" style={{ color: '#ff6a00' }}>&#9733;</span>
                  ))}
                </div>
                <blockquote className={`${heading.className} text-xl md:text-3xl font-medium leading-relaxed mb-6`} style={{ color: 'rgba(255,255,255,0.9)' }}>
                  &ldquo;Summit saved us when our pipes burst at 2am. Fast, professional, fair pricing.&rdquo;
                </blockquote>
                <p className="font-bold uppercase tracking-wider" style={{ color: '#ff6a00' }}>
                  &mdash; Sarah M., Castlegar
                </p>
                <p className="mt-4 text-sm italic" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  (Sample review &mdash; your real reviews go here)
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AngularDivider topColor="#2d2d2d" bottomColor="#1a1a1a" />

      {/* ═══════════ 7. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>
              ABOUT SUMMIT
            </h2>
            <div className="w-20 h-1.5 mb-10" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Summit Plumbing &amp; Heating is a locally owned and operated company with over 20 years of experience keeping Kootenay homes and businesses running. From emergency pipe repairs at 2am to full heating system installations, we bring the same level of professionalism and care to every job. Licensed, insured, and committed to honest pricing &mdash; when you call Summit, you get a team that shows up on time, does the job right, and cleans up after. We&rsquo;re your neighbours, and we take pride in the work we do for this community.
            </p>
          </Reveal>
        </div>
      </section>

      <AngularDivider topColor="#1a1a1a" bottomColor="#2d2d2d" />

      {/* ═══════════ 8. CONTACT ═══════════ */}
      <section id="contact" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#2d2d2d' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>
              GET IN TOUCH
            </h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact info */}
            <Reveal>
              <div>
                {/* LARGE phone number */}
                <a
                  href="tel:2505550142"
                  className={`${heading.className} block text-4xl md:text-5xl font-bold mb-8 transition-colors`}
                  style={{ color: '#ff6a00' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 20px rgba(255,106,0,0.5)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  (250) 555-0142
                </a>
                <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <p className="text-lg">
                    <span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6a00' }}>EMAIL</span>
                    info@summitplumbing.ca
                  </p>
                  <p className="text-lg">
                    <span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6a00' }}>AVAILABILITY</span>
                    24/7 Emergency Service
                  </p>
                  <p className="text-lg">
                    <span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6a00' }}>SERVICE AREA</span>
                    West Kootenays
                  </p>
                </div>

                {/* Emergency badge */}
                <div
                  className="inline-block mt-8 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white rounded-sm"
                  style={{
                    backgroundColor: '#ff6a00',
                    animation: prefersReduced ? 'none' : 'emergencyPulse 2s ease-in-out infinite',
                  }}
                >
                  24/7 EMERGENCY — CALL NOW
                </div>
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={0.15}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    NAME
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(138,155,176,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6a00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(138,155,176,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(138,155,176,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6a00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(138,155,176,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your plumbing or heating issue..."
                    className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all resize-none"
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(138,155,176,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6a00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(138,155,176,0.2)')}
                  />
                </div>
                <motion.button
                  type="submit"
                  className={`${heading.className} w-full px-8 py-4 text-base font-bold uppercase tracking-widest transition-all`}
                  style={{ backgroundColor: '#ff6a00', color: '#ffffff' }}
                  whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(255,106,0,0.5)', scale: 1.02 }}
                >
                  SEND MESSAGE
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <AngularDivider topColor="#2d2d2d" bottomColor="#1a1a1a" />

      {/* ═══════════ 9. FOOTER ═══════════ */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid rgba(138,155,176,0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${heading.className} text-xl font-bold uppercase mb-3`} style={{ color: '#ff6a00' }}>
                Summit Plumbing &amp; Heating
              </h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Kootenay reliable. Licensed plumbing, heating &amp; gas fitting.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#ff6a00' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Services', 'Projects', 'About', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6a00')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#ff6a00' }}>Info</h4>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>24/7 Emergency Service</p>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>West Kootenays</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>(250) 555-0142</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(138,155,176,0.1)' }} className="pt-6 text-center">
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
              &copy; 2025 Summit Plumbing &amp; Heating. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(26,26,26,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '2px solid #ff6a00',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
            This is a sample design by <strong className="text-white">Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=trades-industrial"
            className={`${heading.className} inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap`}
            style={{ backgroundColor: '#ff6a00', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(255,106,0,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            Get This Style &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  )
}
