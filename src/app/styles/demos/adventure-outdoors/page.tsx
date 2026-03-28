'use client'

import { Barlow_Condensed, Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const heading = Barlow_Condensed({
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

/* ── Trail marker number ── */
function TrailMarker({ number }: { number: number }) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold"
      style={{ backgroundColor: '#f97316', color: '#ffffff' }}
    >
      {number}
    </div>
  )
}

/* ── Mountain SVG silhouettes ── */
function MountainLayer({ opacity, color, d }: { opacity: number; color: string; d: string }) {
  return (
    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ opacity }}>
      <path fill={color} d={d} />
    </svg>
  )
}

/* ── Compass SVG ── */
function Compass() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="#f97316" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="50" cy="50" r="38" stroke="#f97316" strokeWidth="0.5" strokeOpacity="0.2" />
      <polygon points="50,12 46,30 54,30" fill="#f97316" fillOpacity="0.8" />
      <polygon points="50,88 46,70 54,70" fill="#ffffff" fillOpacity="0.3" />
      <polygon points="88,50 70,46 70,54" fill="#ffffff" fillOpacity="0.3" />
      <polygon points="12,50 30,46 30,54" fill="#ffffff" fillOpacity="0.3" />
      <circle cx="50" cy="50" r="3" fill="#f97316" />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════
   POWDER HIGHWAY ADVENTURES — Adventure & Outdoors Demo
   ══════════════════════════════════════════════════════════════ */
export default function AdventureOutdoorsDemo() {
  const prefersReduced = useReducedMotion()

  /* Parallax mountains in hero */
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])

  return (
    <div className={body.className} style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#1b2d1b', color: '#ffffff' }}>

      <style>{`
        @keyframes compassSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav className="px-6 py-4 sticky top-0 z-40" style={{ backgroundColor: '#1b2d1b', borderBottom: '1px solid rgba(249,115,22,0.2)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className={`${heading.className} text-xl md:text-2xl font-bold uppercase tracking-wider`} style={{ color: '#f97316' }}>
            Powder Highway Adventures
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Adventures', 'About', 'Gallery', 'Book'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm uppercase tracking-wider font-medium transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f97316')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                {link}
              </a>
            ))}
            <a href="tel:2505550143" className="text-sm font-bold" style={{ color: '#f97316' }}>
              (250) 555-0143
            </a>
          </div>
          <a href="tel:2505550143" className="md:hidden text-sm font-bold" style={{ color: '#f97316' }}>
            (250) 555-0143
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO — 3-layer parallax mountains ═══════════ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="absolute inset-0">
          <Image
            src="/images/demos/adventure-hero.webp"
            alt="Powder Highway Adventures — mountain backcountry landscape"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(27,45,27,0.65), rgba(27,45,27,0.85))' }} />

        {/* 3-layer parallax mountain silhouettes */}
        <motion.div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{ y: prefersReduced ? 0 : layer1Y }}>
          <MountainLayer
            opacity={0.15}
            color="#1b2d1b"
            d="M0,250 L120,180 L240,220 L400,120 L520,190 L680,80 L800,160 L960,100 L1100,180 L1200,130 L1320,200 L1440,150 L1440,400 L0,400 Z"
          />
        </motion.div>
        <motion.div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{ y: prefersReduced ? 0 : layer2Y }}>
          <MountainLayer
            opacity={0.25}
            color="#1b2d1b"
            d="M0,300 L180,220 L350,270 L500,180 L650,240 L820,150 L1000,210 L1150,170 L1300,230 L1440,190 L1440,400 L0,400 Z"
          />
        </motion.div>
        <motion.div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{ y: prefersReduced ? 0 : layer3Y }}>
          <MountainLayer
            opacity={0.5}
            color="#1b2d1b"
            d="M0,340 L100,290 L280,320 L420,260 L580,310 L740,250 L900,290 L1060,260 L1200,300 L1360,270 L1440,310 L1440,400 L0,400 Z"
          />
        </motion.div>

        <div className="relative max-w-4xl mx-auto text-center px-6 py-32 md:py-44 w-full z-10">
          <motion.p
            className={`${heading.className} text-sm md:text-base uppercase tracking-[0.3em] mb-6`}
            style={{ color: '#f97316' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your next adventure starts here
          </motion.p>
          <motion.h1
            className={`${heading.className} text-5xl md:text-7xl lg:text-9xl font-bold uppercase leading-[0.9] tracking-tight mb-8`}
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            POWDER<br />
            <span style={{ color: '#f97316' }}>HIGHWAY</span>
          </motion.h1>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a
              href="#book"
              className="inline-block px-12 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:scale-105"
              style={{ backgroundColor: '#f97316', color: '#ffffff', boxShadow: '0 4px 20px rgba(249,115,22,0.4)' }}
            >
              Book Your Adventure
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div className="py-5 px-6" style={{ backgroundColor: '#f97316' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm font-bold text-white">
          <span className="flex items-center gap-2">
            <span style={{ color: '#1b2d1b' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            5.0 Rating
          </span>
          <span className="opacity-50">&#183;</span>
          <span>Certified Guides</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Full Safety Equipment</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Groups Welcome</span>
        </div>
      </div>

      {/* ═══════════ 4. SERVICES — Trail Marker numbered ═══════════ */}
      <section id="adventures" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase text-center mb-4`}>
              What We Can Do For You
            </h2>
            <div className="w-16 h-1 mx-auto mb-16" style={{ backgroundColor: '#f97316' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: 1,
                title: 'Adventure-Ready Website',
                desc: 'A bold, action-packed website that gets outdoor enthusiasts excited to book.',
              },
              {
                num: 2,
                title: 'Google Maps & Local SEO',
                desc: 'Show up when travellers search for Kootenay adventures and outdoor guides.',
              },
              {
                num: 3,
                title: 'Booking & Social Media',
                desc: 'Online booking integration and social content that drives bookings year-round.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div
                  className="p-8 text-center transition-all cursor-default"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(249,115,22,0.15)',
                  }}
                >
                  <TrailMarker number={card.num} />
                  <h3 className={`${heading.className} text-xl font-bold uppercase mb-4`} style={{ color: '#f97316' }}>
                    {card.title}
                  </h3>
                  <p className="leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {card.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. GALLERY — Recent Adventures ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: 'rgba(27,45,27,0.9)' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase text-center mb-4`}>
              Recent Adventures
            </h2>
            <div className="w-16 h-1 mx-auto mb-12" style={{ backgroundColor: '#f97316' }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="overflow-hidden w-full max-w-3xl" style={{ border: '2px solid rgba(249,115,22,0.2)' }}>
                <Image
                  src="/images/demos/adventure-hero.webp"
                  alt="Powder Highway Adventures — mountain backcountry action"
                  width={800}
                  height={450}
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Backcountry Skiing', 'Mountain Biking', 'River Rafting'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div
                  className="flex items-center justify-center h-28 md:h-36 text-center px-4"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249,115,22,0.15)' }}
                >
                  <span className={`${heading.className} text-sm md:text-lg font-bold uppercase`} style={{ color: '#f97316' }}>
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. TESTIMONIAL ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="mb-6 text-2xl" style={{ color: '#f97316' }}>
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </div>
            <blockquote className="text-xl md:text-2xl leading-relaxed mb-6 font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>
              &ldquo;The best day of my life. Our guide was incredible and the terrain was unlike anything I have ever seen.&rdquo;
            </blockquote>
            <p className={`${heading.className} text-sm uppercase tracking-widest font-bold`} style={{ color: '#f97316' }}>
              &mdash; Chris B., Vancouver
            </p>
            <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              (Sample review &mdash; your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 7. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: 'rgba(27,45,27,0.9)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <TrailMarker number={7} />
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>
              About Powder Highway
            </h2>
            <div className="w-16 h-1 mx-auto mb-10" style={{ backgroundColor: '#f97316' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Powder Highway Adventures was founded by lifelong Kootenay locals with a passion for the mountains. Our certified guides have spent decades exploring the backcountry &mdash; from deep powder skiing in the Selkirks to white-water rafting on the Columbia River. We believe that the best adventures are the ones that leave you breathless, laughing, and planning your next trip before you have even finished the first. Whether you are a seasoned explorer or a first-timer, we will take you somewhere unforgettable.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. CONTACT ═══════════ */}
      <section id="book" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1b2d1b' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase text-center mb-4`}>
              Book Your Adventure
            </h2>
            <div className="w-16 h-1 mx-auto mb-16" style={{ backgroundColor: '#f97316' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div className="space-y-6">
                <div>
                  <h3 className={`${heading.className} text-xs font-bold uppercase tracking-widest mb-2`} style={{ color: '#f97316' }}>Phone</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>(250) 555-0143</p>
                </div>
                <div>
                  <h3 className={`${heading.className} text-xs font-bold uppercase tracking-widest mb-2`} style={{ color: '#f97316' }}>Email</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>info@powderhighway.ca</p>
                </div>
                <div>
                  <h3 className={`${heading.className} text-xs font-bold uppercase tracking-widest mb-2`} style={{ color: '#f97316' }}>Season</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>April &ndash; October</p>
                </div>
                <div>
                  <h3 className={`${heading.className} text-xs font-bold uppercase tracking-widest mb-2`} style={{ color: '#f97316' }}>Location</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>Revelstoke &amp; the Kootenays, BC</p>
                </div>
                <a
                  href="tel:2505550143"
                  className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 mt-4"
                  style={{ backgroundColor: '#f97316', color: '#ffffff', boxShadow: '0 4px 20px rgba(249,115,22,0.3)' }}
                >
                  Book Your Adventure
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249,115,22,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#f97316')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249,115,22,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#f97316')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="What adventure are you looking for?"
                    className="w-full px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all resize-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249,115,22,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#f97316')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.2)')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:opacity-90"
                  style={{ backgroundColor: '#f97316', color: '#ffffff' }}
                >
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. FOOTER + Compass ═══════════ */}
      <footer className="relative py-14 px-6" style={{ backgroundColor: '#0f1f0f', borderTop: '1px solid rgba(249,115,22,0.1)' }}>
        {/* Slowly rotating compass */}
        <div className="absolute bottom-8 right-8 w-16 h-16 opacity-30 hidden md:block" style={{ animation: 'compassSpin 30s linear infinite' }}>
          <Compass />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${heading.className} text-lg font-bold uppercase mb-3`} style={{ color: '#f97316' }}>
                Powder Highway Adventures
              </h3>
              <p className="text-sm text-white/40">
                Certified guided adventures in the Kootenays.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Adventures', 'About', 'Gallery', 'Book'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Info</h4>
              <p className="text-sm text-white/40 mb-1">Season: April &ndash; October</p>
              <p className="text-sm text-white/40 mb-1">Revelstoke &amp; the Kootenays, BC</p>
              <p className="text-sm text-white/40">(250) 555-0143</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-sm text-white/25">
              &copy; 2025 Powder Highway Adventures. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(27,45,27,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '2px solid #f97316',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
            This is a sample design by <strong className="text-white">Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=adventure-outdoors"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 whitespace-nowrap"
            style={{ backgroundColor: '#f97316', color: '#ffffff' }}
          >
            Get This Style &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
