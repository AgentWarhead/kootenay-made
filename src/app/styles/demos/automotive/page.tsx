'use client'

import { Bebas_Neue, Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const heading = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
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
function RacingDivider({ topColor = '#111', bottomColor = '#0a0a0a' }: { topColor?: string; bottomColor?: string }) {
  return (
    <div style={{ backgroundColor: topColor, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-10 md:h-14 block">
        <polygon fill={bottomColor} points="0,10 1440,0 1440,50 0,50" />
      </svg>
    </div>
  )
}

/* ── Red racing stripe divider ── */
function RedStripe() {
  return (
    <div className="w-full h-1" style={{
      background: 'linear-gradient(90deg, transparent 0%, #dc2626 15%, #dc2626 85%, transparent 100%)',
    }} />
  )
}

/* ── Chrome gradient text style ── */
const chromeGradient = {
  backgroundImage: 'linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 40%, #ffffff 60%, #c0c0c0 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text' as const,
}

/* ── Speedometer animated counter ── */
function SpeedoStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* Gauge SVG */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 15 75 A 40 40 0 1 1 85 75"
            fill="none"
            stroke="rgba(192,192,192,0.15)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Filled arc */}
          <motion.path
            d="M 15 75 A 40 40 0 1 1 85 75"
            fill="none"
            stroke="#dc2626"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              pathLength: 0,
            }}
            animate={isInView && !prefersReduced ? { pathLength: 0.85 } : prefersReduced ? { pathLength: 0.85 } : {}}
            transition={{ duration: 1.5, delay, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${heading.className} text-xl md:text-2xl`} style={{ color: '#ffffff' }}>
            {isInView || prefersReduced ? value : '0'}
          </span>
        </div>
      </div>
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c0c0c0' }}>
        {label}
      </span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   IRON HORSE GARAGE — Automotive & Powersports Demo
   ══════════════════════════════════════════════════════════════ */
export default function AutomotiveDemo() {
  const prefersReduced = useReducedMotion()

  return (
    <div className={body.className} style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#111', color: '#ffffff' }}>

      {/* ── prefers-reduced-motion ── */}
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
      <nav style={{ backgroundColor: '#111', borderBottom: '2px solid #dc2626' }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className={`${heading.className} text-2xl md:text-3xl tracking-wider`} style={chromeGradient}>
            IRON HORSE GARAGE
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Work', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                {link}
              </a>
            ))}
            <a
              href="tel:2505550199"
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: '#dc2626' }}
            >
              (250) 555-0199
            </a>
          </div>
          <a href="tel:2505550199" className="md:hidden text-sm font-bold" style={{ color: '#dc2626' }}>
            (250) 555-0199
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/demos/automotive-hero.webp"
            alt="Iron Horse Garage — professional auto shop"
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
          className="absolute top-0 left-0 w-2 md:w-3"
          style={{ backgroundColor: '#dc2626', height: '60%', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <div className="max-w-5xl">
            <motion.div
              className="w-24 h-1.5 mb-8"
              style={{ backgroundColor: '#dc2626' }}
              initial={prefersReduced ? {} : { scaleX: 0, transformOrigin: 'left' }}
              animate={prefersReduced ? {} : { scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            <motion.h1
              className={`${heading.className} text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-wider`}
              style={chromeGradient}
              initial={prefersReduced ? {} : { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
              animate={prefersReduced ? {} : { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            >
              BUILT TO<br />
              <span style={{ ...chromeGradient, filter: 'drop-shadow(0 0 20px rgba(220,38,38,0.3))' }}>LAST</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-xl mt-8 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Full-service automotive repair and custom builds. ASE certified technicians serving the Kootenays for over 25 years.
            </motion.p>

            {/* LARGE phone number */}
            <motion.a
              href="tel:2505550199"
              className={`${heading.className} block text-4xl md:text-5xl lg:text-6xl mt-8 transition-colors tracking-wider`}
              style={{ color: '#dc2626' }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 30px rgba(220,38,38,0.5)')}
              onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
            >
              (250) 555-0199
            </motion.a>

            <motion.a
              href="#contact"
              className={`${heading.className} inline-block mt-10 px-10 py-4 text-lg tracking-widest transition-all`}
              style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
              whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(220,38,38,0.5)', scale: 1.03 }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              BOOK YOUR SERVICE
            </motion.a>
          </div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR — Speedometer Stats ═══════════ */}
      <section style={{ backgroundColor: '#0a0a0a' }} className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <SpeedoStat value="5.0" label="Rating" delay={0} />
            <SpeedoStat value="25+" label="Years" delay={0.15} />
            <SpeedoStat value="ASE" label="Certified" delay={0.3} />
            <SpeedoStat value="ALL" label="Makes & Models" delay={0.45} />
          </div>
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-1 text-lg" style={{ color: '#dc2626' }}>
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </div>
          </div>
        </div>
      </section>

      <RedStripe />

      <RacingDivider topColor="#0a0a0a" bottomColor="#111" />

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>
              WHAT WE BUILD FOR YOU
            </h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'CUSTOM WEBSITE',
                desc: "A site as tough as your shop. Show your work, build trust.",
              },
              {
                title: 'GOOGLE VISIBILITY',
                desc: 'When a car breaks down in the Kootenays, they find you.',
              },
              {
                title: 'SOCIAL MEDIA',
                desc: 'Before-and-afters, custom builds, shop life that attracts gearheads.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <motion.div
                  className="p-8 h-full transition-all cursor-default"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderTop: '4px solid #dc2626',
                    borderLeft: '1px solid #222',
                    borderRight: '1px solid #222',
                    borderBottom: '1px solid #222',
                  }}
                  whileHover={prefersReduced ? {} : { scale: 1.04, boxShadow: '0 0 30px rgba(220,38,38,0.3)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <h3 className={`${heading.className} text-2xl md:text-3xl tracking-wider mb-4`} style={{ color: '#dc2626' }}>
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

      <RedStripe />

      <RacingDivider topColor="#111" bottomColor="#0a0a0a" />

      {/* ═══════════ 5. GALLERY / SHOWCASE ═══════════ */}
      <section id="work" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>
              RECENT WORK
            </h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative w-full max-w-3xl mx-auto mb-12 overflow-hidden" style={{ borderBottom: '4px solid #dc2626' }}>
              <Image
                src="/images/demos/automotive-showcase.webp"
                alt="Iron Horse Garage — recent automotive project"
                width={800}
                height={500}
                className="w-full h-auto block"
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Engine Rebuild', 'Custom Exhaust', 'Full Restore'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div
                  className="flex items-center justify-center h-28 md:h-36 text-center px-4"
                  style={{ backgroundColor: '#111', border: '1px solid #222' }}
                >
                  <span className={`${heading.className} text-lg md:text-2xl tracking-wider`} style={{ color: '#dc2626' }}>
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RedStripe />

      <RacingDivider topColor="#0a0a0a" bottomColor="#111" />

      {/* ═══════════ 6. TESTIMONIAL ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex gap-6">
              {/* Red accent bar */}
              <div className="hidden sm:block w-1.5 flex-shrink-0" style={{ backgroundColor: '#dc2626' }} />
              <div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-2xl" style={{ color: '#dc2626' }}>&#9733;</span>
                  ))}
                </div>
                <blockquote className={`${heading.className} text-2xl md:text-4xl tracking-wider leading-relaxed mb-6`} style={{ color: 'rgba(255,255,255,0.9)' }}>
                  &ldquo;IRON HORSE IS THE ONLY SHOP I TRUST WITH MY TRUCK. HONEST, SKILLED, AND THEY STAND BEHIND THEIR WORK.&rdquo;
                </blockquote>
                <p className="font-bold uppercase tracking-wider" style={{ color: '#dc2626' }}>
                  &mdash; Dave T., Rossland
                </p>
                <p className="mt-4 text-sm italic" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  (Sample review &mdash; your real reviews go here)
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <RedStripe />

      <RacingDivider topColor="#111" bottomColor="#0a0a0a" />

      {/* ═══════════ 7. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>
              ABOUT IRON HORSE
            </h2>
            <div className="w-20 h-1.5 mb-10" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Iron Horse Garage has been Trail&rsquo;s trusted auto shop for over 25 years. What started as a one-bay operation has grown into a full-service facility staffed by ASE-certified technicians who live and breathe cars and trucks. We handle everything from routine maintenance and brake jobs to custom exhaust fabrication and full restorations. Our reputation is simple: honest diagnostics, fair pricing, and work that lasts. Whether you drive a daily commuter, a lifted 4x4, or a classic muscle car &mdash; Iron Horse treats every vehicle like our own.
            </p>
          </Reveal>
        </div>
      </section>

      <RedStripe />

      <RacingDivider topColor="#0a0a0a" bottomColor="#111" />

      {/* ═══════════ 8. CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>
              GET IN TOUCH
            </h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact info */}
            <Reveal>
              <div>
                {/* LARGE phone */}
                <a
                  href="tel:2505550199"
                  className={`${heading.className} block text-4xl md:text-6xl mb-8 transition-colors tracking-wider`}
                  style={{ color: '#dc2626' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 20px rgba(220,38,38,0.5)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  (250) 555-0199
                </a>
                <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <p className="text-lg">
                    <span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#dc2626' }}>EMAIL</span>
                    info@ironhorsegarage.ca
                  </p>
                  <p className="text-lg">
                    <span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#dc2626' }}>HOURS</span>
                    Mon&ndash;Sat 8:00 AM &ndash; 5:00 PM
                  </p>
                  <p className="text-lg">
                    <span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#dc2626' }}>LOCATION</span>
                    Trail, BC
                  </p>
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
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#dc2626')}
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
                    className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#dc2626')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Year, make, model, and what you need..."
                    className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all resize-none"
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#dc2626')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')}
                  />
                </div>
                <motion.button
                  type="submit"
                  className={`${heading.className} w-full px-8 py-4 text-lg tracking-widest transition-all`}
                  style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                  whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(220,38,38,0.5)', scale: 1.02 }}
                >
                  SEND MESSAGE
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <RedStripe />

      {/* ═══════════ 9. FOOTER ═══════════ */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className={`${heading.className} text-2xl tracking-wider block mb-3`} style={chromeGradient}>
                IRON HORSE GARAGE
              </span>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Full-service auto repair &amp; custom builds. Trail, BC.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              {['Services', 'Work', 'About', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium uppercase tracking-widest transition-colors"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')}
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
                &copy; 2025 Iron Horse Garage. All rights reserved.
              </span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Serving Trail, Rossland &amp; the West Kootenays
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(17, 17, 17, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '2px solid #dc2626',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
            This is a sample design by <strong className="text-white">Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=automotive"
            className={`${heading.className} inline-block px-6 py-2.5 text-sm tracking-widest transition-all whitespace-nowrap`}
            style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(220,38,38,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            GET THIS STYLE &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  )
}
