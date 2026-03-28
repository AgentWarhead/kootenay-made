'use client'

import { Space_Grotesk } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
})

/* ── Diagonal Slash Divider ───────────────────────────────── */
function SlashDivider({ flip = false, topColor = '#111111', bottomColor = '#0a0a0a' }: { flip?: boolean; topColor?: string; bottomColor?: string }) {
  const points = flip ? '0,0 1440,60 0,60' : '0,0 1440,0 1440,60'
  return (
    <div style={{ backgroundColor: topColor, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16 block">
        <polygon fill={bottomColor} points={points} />
      </svg>
    </div>
  )
}

/* ── Section Reveal Wrapper ───────────────────────────────── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Decorative Angular SVG ───────────────────────────────── */
function AngularDeco({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0L120 40V120L0 80V0Z" fill="#ff6b00" fillOpacity="0.08" />
      <path d="M20 10L110 45V110L20 75V10Z" stroke="#ff6b00" strokeOpacity="0.15" strokeWidth="1" />
    </svg>
  )
}

function DiamondDeco({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 0L60 30L30 60L0 30L30 0Z" fill="#ff6b00" fillOpacity="0.06" />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════
   VOLT ELECTRIC CO. — Bold Modern Demo
   ══════════════════════════════════════════════════════════════ */
export default function BoldModernDemo() {
  const prefersReduced = useReducedMotion()

  return (
    <div className={spaceGrotesk.className} style={{ fontFamily: 'Space Grotesk, sans-serif', backgroundColor: '#111111', color: '#ffffff' }}>

      {/* ─── 1. NAV ─────────────────────────────────────────── */}
      <nav style={{ backgroundColor: '#111111', borderBottom: '1px solid #222' }} className="relative z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xl md:text-2xl font-bold tracking-wider uppercase">
            <span style={{ color: '#ff6b00' }}>VOLT</span> ELECTRIC CO.
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['SERVICES', 'ABOUT', 'PROJECTS', 'CONTACT'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {link}
              </a>
            ))}
            <a
              href="tel:2505550180"
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: '#ff6b00' }}
            >
              (250) 555-0180
            </a>
          </div>
          {/* Mobile phone */}
          <a
            href="tel:2505550180"
            className="md:hidden text-sm font-bold"
            style={{ color: '#ff6b00' }}
          >
            (250) 555-0180
          </a>
        </div>
      </nav>

      {/* ─── 2. HERO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex items-center" style={{ backgroundColor: '#111111' }}>
        {/* Decorative geometric shapes */}
        <AngularDeco className="absolute top-10 right-10 opacity-60 hidden md:block" />
        <AngularDeco className="absolute bottom-32 right-1/4 opacity-40 rotate-180 hidden lg:block" />
        <DiamondDeco className="absolute top-1/3 right-20 opacity-50 hidden md:block" />
        <DiamondDeco className="absolute bottom-1/4 left-10 opacity-30" />

        {/* Angular accent bar */}
        <div
          className="absolute top-0 left-0 w-2 md:w-3"
          style={{ backgroundColor: '#ff6b00', height: '60%', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <div className="max-w-5xl">
            <motion.div
              className="w-24 h-1.5 mb-8"
              style={{ backgroundColor: '#ff6b00' }}
              initial={prefersReduced ? {} : { scaleX: 0, transformOrigin: 'left' }}
              animate={prefersReduced ? {} : { scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.9] tracking-tight"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              initial={prefersReduced ? {} : { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
              animate={prefersReduced ? {} : { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            >
              POWERING<br />
              <span style={{ color: '#ff6b00' }}>THE</span>{' '}
              KOOTENAYS
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-xl mt-8 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Licensed electrical contractors serving residential and commercial clients across the West Kootenays.
            </motion.p>

            <motion.a
              href="#contact"
              className="inline-block mt-10 px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
              style={{
                backgroundColor: '#ff6b00',
                color: '#111111',
                boxShadow: '0 0 0px rgba(255,107,0,0)',
              }}
              whileHover={prefersReduced ? {} : {
                boxShadow: '0 0 30px rgba(255,107,0,0.5)',
                scale: 1.03,
              }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              GET A FREE QUOTE
            </motion.a>
          </div>

          {/* Geometric shape bottom-right */}
          <svg className="absolute bottom-10 right-6 md:right-16 opacity-20 hidden sm:block" width="200" height="200" viewBox="0 0 200 200" fill="none">
            <rect x="20" y="20" width="160" height="160" stroke="#ff6b00" strokeWidth="1" transform="rotate(15 100 100)" />
            <rect x="40" y="40" width="120" height="120" stroke="#ff6b00" strokeWidth="1" transform="rotate(30 100 100)" />
            <rect x="60" y="60" width="80" height="80" stroke="#ff6b00" strokeWidth="1" transform="rotate(45 100 100)" />
          </svg>
        </div>
      </section>

      {/* ─── 3. TRUST BAR ───────────────────────────────────── */}
      <section style={{ backgroundColor: '#ff6b00' }} className="py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
          {[
            '\u2605\u2605\u2605\u2605\u2605 5.0 RATING',
            '20+ YEARS',
            'LICENSED & INSURED',
            '24/7 EMERGENCY',
          ].map((item) => (
            <span
              key={item}
              className="text-sm md:text-base font-bold uppercase tracking-wider whitespace-nowrap"
              style={{ color: '#111111' }}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <SlashDivider topColor="#ff6b00" bottomColor="#0a0a0a" />

      {/* ─── 4. SERVICES ────────────────────────────────────── */}
      <section id="services" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">
              WHAT WE BUILD FOR YOU
            </h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'HIGH-IMPACT WEBSITE',
                desc: 'A bold online presence that matches your brand\'s energy and professionalism.',
              },
              {
                title: 'GOOGLE MAPS & LOCAL SEO',
                desc: 'Dominate local search results when customers need electrical services.',
              },
              {
                title: 'REPUTATION MANAGEMENT',
                desc: 'Showcase your 5-star reviews and build unstoppable trust.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <motion.div
                  className="p-8 h-full transition-all cursor-default"
                  style={{
                    backgroundColor: '#111111',
                    borderTop: '4px solid #ff6b00',
                    boxShadow: '0 0 0px rgba(255,107,0,0)',
                  }}
                  whileHover={prefersReduced ? {} : {
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(255,107,0,0.5)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <h3 className="text-xl font-bold uppercase mb-4" style={{ color: '#ff6b00' }}>
                    {card.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {card.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── 5. GALLERY / SHOWCASE ──────────────────────────── */}
      <section id="projects" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <AngularDeco className="absolute top-8 right-8 opacity-40 hidden lg:block" />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">
              RECENT PROJECTS
            </h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative w-full max-w-3xl mx-auto mb-12 overflow-hidden" style={{ borderBottom: '4px solid #ff6b00' }}>
              <Image
                src="/images/demos/bold-modern-showcase.webp"
                alt="Volt Electric Co. recent project showcase"
                width={800}
                height={500}
                className="w-full h-auto block"
                priority
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Commercial Wiring',
              'Panel Upgrades',
              'Smart Home',
              'EV Charger Install',
            ].map((label, i) => (
              <Reveal key={label} delay={0.1 + i * 0.1}>
                <div
                  className="flex items-center justify-center h-32 md:h-40 text-center px-4"
                  style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}
                >
                  <span className="text-sm md:text-base font-bold uppercase tracking-wider" style={{ color: '#ff6b00' }}>
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── 6. TESTIMONIAL ─────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex gap-6">
              {/* Orange accent line */}
              <div className="hidden sm:block w-1.5 flex-shrink-0" style={{ backgroundColor: '#ff6b00' }} />
              <div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-2xl" style={{ color: '#ff6b00' }}>{'\u2605'}</span>
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  &ldquo;Volt rewired our entire shop in two days. Professional, fast, and the price was exactly what they quoted.&rdquo;
                </blockquote>
                <p className="font-bold uppercase tracking-wider" style={{ color: '#ff6b00' }}>
                  &mdash; Mike R., Castlegar
                </p>
                <p className="mt-4 text-sm italic" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  (Sample review &mdash; your real reviews go here)
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── 7. ABOUT ───────────────────────────────────────── */}
      <section id="about" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <DiamondDeco className="absolute bottom-10 right-10 opacity-30 hidden md:block" />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">
              ABOUT VOLT ELECTRIC
            </h2>
            <div className="w-20 h-1.5 mb-10" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Volt Electric Co. is a family-owned electrical contracting company with over 20 years of experience serving the Kootenays. We specialize in both residential and commercial electrical work, from full home rewires and panel upgrades to commercial tenant improvements and new construction. Our reputation is built on honest pricing, fast response times, and quality workmanship that stands the test of time. When you call Volt, you get a licensed, insured team that shows up on time and gets the job done right.
            </p>
          </Reveal>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── 8. CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">
              GET IN TOUCH
            </h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact info */}
            <Reveal>
              <div>
                <a
                  href="tel:2505550180"
                  className="block text-4xl md:text-5xl font-bold mb-6 transition-colors"
                  style={{ color: '#ff6b00' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 20px rgba(255,107,0,0.5)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  (250) 555-0180
                </a>
                <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <p className="text-lg">
                    <span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>EMAIL</span>
                    info@voltelectric.ca
                  </p>
                  <p className="text-lg">
                    <span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>AVAILABILITY</span>
                    24/7 Emergency Service
                  </p>
                  <p className="text-lg">
                    <span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>SERVICE AREA</span>
                    West Kootenays
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={0.15}>
              <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    NAME
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-white placeholder-white/30 outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: '#111111',
                      border: '1px solid #333',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 text-white placeholder-white/30 outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: '#111111',
                      border: '1px solid #333',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 text-white placeholder-white/30 outline-none focus:ring-2 transition-all resize-none"
                    style={{
                      backgroundColor: '#111111',
                      border: '1px solid #333',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all"
                  style={{
                    backgroundColor: '#ff6b00',
                    color: '#111111',
                  }}
                  whileHover={prefersReduced ? {} : {
                    boxShadow: '0 0 30px rgba(255,107,0,0.5)',
                    scale: 1.02,
                  }}
                >
                  SEND MESSAGE
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#0d0d0d" />

      {/* ─── 9. FOOTER ──────────────────────────────────────── */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="text-xl font-bold uppercase tracking-tight block mb-3">
                VOLT ELECTRIC CO.
              </span>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Licensed electrical contractors serving the West Kootenays.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              {['SERVICES', 'ABOUT', 'PROJECTS', 'CONTACT'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium uppercase tracking-widest transition-colors"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b00')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-10 pt-6" style={{ borderTop: '1px solid #1a1a1a' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
                &copy; 2025 Volt Electric Co. All rights reserved.
              </span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Serving Nelson, Castlegar, Trail &amp; the West Kootenays
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── 10. STICKY BOTTOM BAR ──────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(17, 17, 17, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '2px solid #ff6b00',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
            This is a sample design by <strong className="text-white">Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=bold-modern"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{ backgroundColor: '#ff6b00', color: '#111111' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(255,107,0,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
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
