'use client'

import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const heading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
})

const body = DM_Sans({
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
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Gold text reveal animation ── */
function GoldReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block' }}
      initial={prefersReduced ? {} : { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
      animate={prefersReduced ? {} : { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  )
}

/* ══════════════════════════════════════════════════════════════
   EMBER KITCHEN & BAR — Sleek & Dark Demo
   ══════════════════════════════════════════════════════════════ */
export default function SleekDarkDemo() {
  const prefersReduced = useReducedMotion()

  /* Parallax hero */
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div className={body.className} style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: '#0a0a0a', color: '#f5f0e8' }}>

      {/* ── prefers-reduced-motion ── */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @keyframes candleGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid rgba(201,169,110,0.15)' }} className="px-6 py-5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className={`${heading.className} text-2xl md:text-3xl tracking-wide`} style={{ color: '#c9a96e', fontWeight: 300 }}>
            Ember Kitchen &amp; Bar
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Menu', 'About', 'Gallery', 'Reservations'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm tracking-widest uppercase transition-colors"
                style={{ color: 'rgba(245,240,232,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a96e')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,232,0.5)')}
              >
                {link}
              </a>
            ))}
            <a
              href="tel:2505550195"
              className="text-sm font-bold tracking-wider"
              style={{ color: '#c9a96e' }}
            >
              (250) 555-0195
            </a>
          </div>
          <a href="tel:2505550195" className="md:hidden text-sm font-bold" style={{ color: '#c9a96e' }}>
            (250) 555-0195
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO — Parallax ═══════════ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: prefersReduced ? 0 : heroY }}
        >
          <Image
            src="/images/demos/sleek-dark-hero.webp"
            alt="Ember Kitchen & Bar — intimate restaurant interior"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,0.85))' }} />

        <div className="relative max-w-4xl mx-auto text-center px-6 py-32 md:py-44 w-full">
          <motion.p
            className="text-sm uppercase tracking-[0.3em] mb-6"
            style={{ color: '#c9a96e' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            An experience awaits
          </motion.p>
          <h1 className={`${heading.className} text-5xl md:text-7xl lg:text-8xl leading-tight mb-8`} style={{ fontWeight: 300, color: '#f5f0e8' }}>
            <GoldReveal>Ember Kitchen</GoldReveal>
            <br />
            <GoldReveal>&amp; Bar</GoldReveal>
          </h1>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="#reservations"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
              style={{
                border: '1px solid #c9a96e',
                color: '#c9a96e',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c9a96e'
                e.currentTarget.style.color = '#0a0a0a'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#c9a96e'
              }}
            >
              Make a Reservation
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid rgba(201,169,110,0.15)', borderBottom: '1px solid rgba(201,169,110,0.15)' }} className="py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm" style={{ color: '#c9a96e' }}>
          <span className="flex items-center gap-2">
            <span style={{ color: '#c9a96e' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="font-bold">4.9 Rating</span>
          </span>
          <span style={{ color: 'rgba(201,169,110,0.3)' }}>&#183;</span>
          <span>Est. 2019</span>
          <span style={{ color: 'rgba(201,169,110,0.3)' }} className="hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Locally Sourced</span>
          <span style={{ color: 'rgba(201,169,110,0.3)' }} className="hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Reservations Available</span>
        </div>
      </div>

      {/* ═══════════ 4. SERVICES — Menu-style layout ═══════════ */}
      <section id="menu" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              What We Can Do For You
            </h2>
            <div className="w-16 h-px mx-auto mb-16" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website Design',
                desc: 'A stunning, atmospheric website that captures the essence of your dining experience.',
              },
              {
                title: 'Online Reservations & SEO',
                desc: 'Get found by diners searching for fine dining and fill every seat, every night.',
              },
              {
                title: 'Brand & Menu Design',
                desc: 'Sophisticated menus, photography direction, and cohesive brand identity.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div
                  className="relative p-8 text-center transition-all duration-500 cursor-default overflow-hidden"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid rgba(201,169,110,0.15)',
                  }}
                >
                  {/* Candlelight glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 30%, rgba(201,169,110,0.08) 0%, transparent 70%)',
                      animation: 'candleGlow 4s ease-in-out infinite',
                    }}
                  />
                  <div className="relative">
                    <h3 className={`${heading.className} text-xl md:text-2xl mb-4`} style={{ color: '#c9a96e', fontWeight: 400 }}>
                      {card.title}
                    </h3>
                    <p className="leading-relaxed text-sm" style={{ color: 'rgba(245,240,232,0.6)' }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. GALLERY — From Our Kitchen ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              From Our Kitchen
            </h2>
            <div className="w-16 h-px mx-auto mb-12" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="overflow-hidden w-full max-w-3xl" style={{ border: '1px solid rgba(201,169,110,0.2)' }}>
                <Image
                  src="/images/demos/sleek-dark-hero.webp"
                  alt="Ember Kitchen & Bar — culinary showcase"
                  width={800}
                  height={450}
                  className="w-full h-auto block"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Seasonal Menu', 'Cocktail Bar', 'Private Dining'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div
                  className="flex items-center justify-center h-28 md:h-36 text-center px-4"
                  style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.15)' }}
                >
                  <span className={`${heading.className} text-sm md:text-lg`} style={{ color: '#c9a96e' }}>
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. TESTIMONIAL ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="mb-6 text-2xl" style={{ color: '#c9a96e' }}>
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </div>
            <blockquote className={`${heading.className} text-xl md:text-3xl leading-relaxed mb-6 italic`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              &ldquo;Ember is the finest dining in the Kootenays. The atmosphere is electric and the food is unforgettable.&rdquo;
            </blockquote>
            <p className="text-sm uppercase tracking-widest" style={{ color: '#c9a96e' }}>
              &mdash; Victoria H., Nelson
            </p>
            <p className="mt-4 text-xs" style={{ color: 'rgba(245,240,232,0.3)' }}>
              (Sample review &mdash; your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 7. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              About Ember
            </h2>
            <div className="w-16 h-px mx-auto mb-10" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(245,240,232,0.6)' }}>
              Ember Kitchen &amp; Bar was born from a simple vision: to bring unforgettable dining to the heart of the Kootenays. Since opening in 2019, we have been committed to sourcing the finest local ingredients and transforming them into dishes that tell a story. Our intimate space, warm candlelit atmosphere, and carefully curated wine list create the perfect setting for a memorable evening. Whether it is a celebration, a date night, or simply the desire for an extraordinary meal &mdash; Ember is where moments become memories.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. CONTACT ═══════════ */}
      <section id="reservations" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              Make a Reservation
            </h2>
            <div className="w-16 h-px mx-auto mb-16" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact info */}
            <Reveal>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Phone</h3>
                  <p style={{ color: 'rgba(245,240,232,0.7)' }}>(250) 555-0195</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Email</h3>
                  <p style={{ color: 'rgba(245,240,232,0.7)' }}>reservations@emberkitchen.ca</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Hours</h3>
                  <p style={{ color: 'rgba(245,240,232,0.7)' }}>Wed&ndash;Sun 5:00 PM &ndash; Close</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Location</h3>
                  <p style={{ color: 'rgba(245,240,232,0.7)' }}>312 Baker Street, Nelson, BC</p>
                </div>
                <a
                  href="tel:2505550195"
                  className="inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all mt-4"
                  style={{ border: '1px solid #c9a96e', color: '#c9a96e' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#c9a96e'
                    e.currentTarget.style.color = '#0a0a0a'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#c9a96e'
                  }}
                >
                  Make a Reservation
                </a>
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Party size, date, special requests..."
                    className="w-full px-4 py-3 text-sm outline-none transition-all resize-none"
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all"
                  style={{ backgroundColor: '#c9a96e', color: '#0a0a0a' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${heading.className} text-xl mb-3`} style={{ color: '#c9a96e', fontWeight: 300 }}>
                Ember Kitchen &amp; Bar
              </h3>
              <p className="text-sm" style={{ color: 'rgba(245,240,232,0.4)' }}>
                Fine dining in the heart of the Kootenays.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a96e' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Menu', 'About', 'Gallery', 'Reservations'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(245,240,232,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a96e')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,232,0.4)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a96e' }}>Info</h4>
              <p className="text-sm mb-1" style={{ color: 'rgba(245,240,232,0.4)' }}>Wed&ndash;Sun 5:00 PM &ndash; Close</p>
              <p className="text-sm mb-1" style={{ color: 'rgba(245,240,232,0.4)' }}>312 Baker Street, Nelson, BC</p>
              <p className="text-sm" style={{ color: 'rgba(245,240,232,0.4)' }}>(250) 555-0195</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(201,169,110,0.1)' }} className="pt-6 text-center">
            <span className="text-sm" style={{ color: 'rgba(245,240,232,0.25)' }}>
              &copy; 2025 Ember Kitchen &amp; Bar. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(201,169,110,0.2)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(245,240,232,0.7)' }}>
            This is a sample design by <strong style={{ color: '#f5f0e8' }}>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=sleek-dark"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{ backgroundColor: '#c9a96e', color: '#0a0a0a' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
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
