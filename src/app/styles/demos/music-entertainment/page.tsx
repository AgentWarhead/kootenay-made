'use client'

import { Bebas_Neue, DM_Sans } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] })

/* ── Scroll-reveal wrapper ── */
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
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Audio Visualizer Bars ── */
function AudioVisualizer() {
  const prefersReduced = useReducedMotion()

  const bars = [
    { keyframe: 'audioBar1', duration: '0.8s', delay: '0s',    minH: 40, maxH: 100 },
    { keyframe: 'audioBar2', duration: '1.1s', delay: '0.1s',  minH: 60, maxH: 110 },
    { keyframe: 'audioBar3', duration: '0.7s', delay: '0.2s',  minH: 50, maxH: 90  },
    { keyframe: 'audioBar4', duration: '1.3s', delay: '0.05s', minH: 70, maxH: 120 },
    { keyframe: 'audioBar5', duration: '0.9s', delay: '0.3s',  minH: 45, maxH: 95  },
    { keyframe: 'audioBar6', duration: '1.0s', delay: '0.15s', minH: 55, maxH: 115 },
    { keyframe: 'audioBar7', duration: '0.75s', delay: '0.25s', minH: 40, maxH: 80 },
    { keyframe: 'audioBar8', duration: '1.2s', delay: '0.35s', minH: 65, maxH: 105 },
    { keyframe: 'audioBar9', duration: '0.85s', delay: '0.08s', minH: 50, maxH: 90 },
    { keyframe: 'audioBar10', duration: '1.05s', delay: '0.2s', minH: 60, maxH: 118 },
  ]

  return (
    <div
      className="flex items-end gap-1.5"
      style={{ height: '130px' }}
      aria-hidden="true"
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          style={{
            width: '8px',
            height: `${bar.minH}px`,
            background: '#e91e8a',
            boxShadow: '0 0 8px #e91e8a, 0 0 20px rgba(233,30,138,0.6)',
            borderRadius: '2px 2px 0 0',
            animation: prefersReduced
              ? 'none'
              : `${bar.keyframe} ${bar.duration} ease-in-out ${bar.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   NEON PINES MUSIC VENUE — Music & Entertainment Demo
   ══════════════════════════════════════════════════════════════ */
export default function MusicEntertainmentPage() {
  const prefersReduced = useReducedMotion()

  const events = [
    { day: 'FRI MAR 28', time: '8PM', artist: 'Mountain Echo', price: '$25' },
    { day: 'SAT MAR 29', time: '9PM', artist: 'The Drift',     price: '$20' },
    { day: 'FRI APR 4',  time: '8PM', artist: 'Cedar Smoke',   price: '$30' },
    { day: 'SAT APR 5',  time: '7PM', artist: 'Open Mic Night', price: 'Free' },
  ]

  return (
    <div
      className={dmSans.className}
      style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh' }}
    >
      {/* ── CSS KEYFRAMES + prefers-reduced-motion ── */}
      <style>{`
        @keyframes audioBar1  { 0%,100% { height: 40px }  50% { height: 100px } }
        @keyframes audioBar2  { 0%,100% { height: 60px }  50% { height: 110px } }
        @keyframes audioBar3  { 0%,100% { height: 50px }  50% { height:  90px } }
        @keyframes audioBar4  { 0%,100% { height: 70px }  50% { height: 120px } }
        @keyframes audioBar5  { 0%,100% { height: 45px }  50% { height:  95px } }
        @keyframes audioBar6  { 0%,100% { height: 55px }  50% { height: 115px } }
        @keyframes audioBar7  { 0%,100% { height: 40px }  50% { height:  80px } }
        @keyframes audioBar8  { 0%,100% { height: 65px }  50% { height: 105px } }
        @keyframes audioBar9  { 0%,100% { height: 50px }  50% { height:  90px } }
        @keyframes audioBar10 { 0%,100% { height: 60px }  50% { height: 118px } }
        @keyframes neonPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .neon-heading {
          text-shadow:
            0 0 20px #e91e8a,
            0 0 40px #e91e8a,
            0 0 80px rgba(233,30,138,0.5);
        }
        .neon-heading-sm {
          text-shadow:
            0 0 10px #e91e8a,
            0 0 25px rgba(233,30,138,0.6);
        }
        .neon-blue {
          text-shadow:
            0 0 10px #3b82f6,
            0 0 25px rgba(59,130,246,0.5);
        }
        .service-card {
          background: #111111;
          border-top: 3px solid #e91e8a;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 24px rgba(233,30,138,0.25), 0 0 48px rgba(233,30,138,0.1);
        }
        .event-row {
          border-bottom: 1px solid rgba(233,30,138,0.15);
          transition: background 0.2s ease;
        }
        .event-row:hover {
          background: rgba(233,30,138,0.06);
        }
        .gradient-mesh {
          background:
            radial-gradient(ellipse 55% 45% at 15% 40%, rgba(233,30,138,0.14) 0%, transparent 65%),
            radial-gradient(ellipse 45% 55% at 85% 55%, rgba(59,130,246,0.14) 0%, transparent 65%),
            radial-gradient(ellipse 35% 35% at 50% 95%, rgba(233,30,138,0.08) 0%, transparent 55%);
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
      <nav
        className="sticky top-0 z-50 px-6 md:px-12 py-4"
        style={{
          backgroundColor: '#000000',
          borderBottom: '1px solid rgba(233,30,138,0.2)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/styles/demos/music-entertainment"
            className={`${bebas.className} text-2xl md:text-3xl tracking-widest neon-heading-sm`}
            style={{ color: '#e91e8a', letterSpacing: '0.12em' }}
          >
            NEON PINES
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Shows', 'Venue', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e91e8a')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                {item}
              </a>
            ))}
            <a
              href="tel:2505550114"
              className="text-sm font-bold tracking-wider transition-colors duration-200"
              style={{ color: '#e91e8a' }}
              onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 10px #e91e8a')}
              onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
            >
              (250) 555-0114
            </a>
          </div>

          {/* Mobile phone */}
          <a
            href="tel:2505550114"
            className="md:hidden text-sm font-bold"
            style={{ color: '#e91e8a' }}
          >
            (250) 555-0114
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
      >
        {/* Hero background image */}
        <Image
          src="/images/demos/music-entertainment-hero.webp"
          alt="Neon Pines Music Venue — live music in Nelson BC"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-0" style={{ flex: 1 }}>
          <motion.p
            className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-6"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Live Music &middot; Nelson, BC
          </motion.p>

          <motion.h1
            className={`${bebas.className} neon-heading`}
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
              lineHeight: 1,
              color: '#ffffff',
              letterSpacing: '0.04em',
              marginBottom: '1.5rem',
            }}
            initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            WHERE THE<br />
            <span style={{ color: '#e91e8a' }}>MOUNTAINS ROCK</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg font-normal max-w-xl mx-auto mb-10"
            style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            The Kootenays&apos; premier live music venue. Intimate shows, legendary nights, all in the heart of Nelson.
          </motion.p>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a
              href="#shows"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300"
              style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.14em' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d6187e'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(233,30,138,0.55)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e91e8a'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              See Upcoming Shows
            </a>
          </motion.div>
        </div>

        {/* Audio Visualizer at bottom of hero */}
        <div className="relative z-10 flex justify-center pb-10 pt-12">
          <AudioVisualizer />
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div
        className="py-5 px-6"
        style={{
          backgroundColor: '#0a0a0a',
          borderTop: '1px solid rgba(233,30,138,0.2)',
          borderBottom: '1px solid rgba(233,30,138,0.2)',
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-5 md:gap-10 text-sm font-medium">
          <span className="flex items-center gap-2">
            <span style={{ color: '#e91e8a', fontSize: '1rem' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span style={{ color: '#ffffff' }}>4.9 Rating</span>
          </span>
          <span style={{ color: 'rgba(233,30,138,0.35)' }}>&#183;</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>Est. 2016</span>
          <span style={{ color: 'rgba(233,30,138,0.35)' }} className="hidden md:inline">&#183;</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }} className="hidden md:inline">200 Capacity</span>
          <span style={{ color: 'rgba(233,30,138,0.35)' }} className="hidden md:inline">&#183;</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }} className="hidden md:inline">All Ages Welcome</span>
        </div>
      </div>

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p
              className={`${bebas.className} text-sm tracking-[0.25em] mb-3 neon-blue`}
              style={{ color: '#3b82f6' }}
            >
              AMPLIFY YOUR PRESENCE
            </p>
            <h2
              className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`}
              style={{ color: '#ffffff', letterSpacing: '0.04em' }}
            >
              Digital Services
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Custom Website',
                desc: 'Tickets, events, merch — all in one place. A site as electric as your shows, built to sell out every night.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="sg1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#e91e8a" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="url(#sg1)" strokeWidth="1.5" />
                    <line x1="8" y1="21" x2="16" y2="21" stroke="url(#sg1)" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="12" y1="17" x2="12" y2="21" stroke="url(#sg1)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: 'Social Media',
                desc: 'Build a following that shows up every weekend. Behind-the-scenes content, show announcements, artist spotlights.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="sg2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#e91e8a" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <circle cx="18" cy="5" r="3" stroke="url(#sg2)" strokeWidth="1.5" />
                    <circle cx="6" cy="12" r="3" stroke="url(#sg2)" strokeWidth="1.5" />
                    <circle cx="18" cy="19" r="3" stroke="url(#sg2)" strokeWidth="1.5" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="url(#sg2)" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="url(#sg2)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: 'Email Marketing',
                desc: 'Your fans want to know about every show. Make sure they do. Newsletter campaigns that fill the room.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="sg3" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#e91e8a" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="url(#sg3)" strokeWidth="1.5" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="url(#sg3)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.12}>
                <div className="service-card rounded-lg p-8 h-full">
                  <div className="mb-5">{card.icon}</div>
                  <h3
                    className={`${bebas.className} text-2xl md:text-3xl mb-3`}
                    style={{ color: '#ffffff', letterSpacing: '0.04em' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {card.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. UPCOMING SHOWS / EVENT LISTING ═══════════ */}
      <section id="shows" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-14">
            <p
              className={`${bebas.className} text-sm tracking-[0.25em] mb-3`}
              style={{ color: '#e91e8a' }}
            >
              ON STAGE
            </p>
            <h2
              className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`}
              style={{ color: '#ffffff', letterSpacing: '0.04em' }}
            >
              Upcoming Shows
            </h2>
          </Reveal>

          <div
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid rgba(233,30,138,0.2)' }}
          >
            {/* Table header */}
            <div
              className="flex items-center px-6 py-3 text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: '#111111', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em' }}
            >
              <span className="w-44 md:w-52 shrink-0">Date &amp; Time</span>
              <span className="flex-1">Artist</span>
              <span className="w-16 text-right">Price</span>
            </div>

            {events.map((ev, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="event-row flex items-center px-6 py-5 gap-4">
                  {/* Date + time */}
                  <div className="w-44 md:w-52 shrink-0">
                    <div
                      className={`${bebas.className} text-lg md:text-xl tracking-wider`}
                      style={{ color: '#e91e8a', letterSpacing: '0.08em' }}
                    >
                      {ev.day}
                    </div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {ev.time} &mdash; Doors open 30 min before
                    </div>
                  </div>

                  {/* Magenta accent line */}
                  <div
                    className="hidden md:block w-8 h-px shrink-0"
                    style={{ backgroundColor: 'rgba(233,30,138,0.4)' }}
                  />

                  {/* Artist */}
                  <div className="flex-1">
                    <span className="text-base md:text-lg font-bold" style={{ color: '#ffffff' }}>
                      {ev.artist}
                    </span>
                  </div>

                  {/* Price */}
                  <div
                    className="w-16 text-right text-sm font-bold"
                    style={{ color: ev.price === 'Free' ? '#3b82f6' : '#e91e8a' }}
                  >
                    {ev.price}
                  </div>

                  {/* Tickets CTA */}
                  <a
                    href="#contact"
                    className="hidden md:inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 transition-all duration-200 shrink-0"
                    style={{ border: '1px solid rgba(233,30,138,0.4)', color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#e91e8a'
                      e.currentTarget.style.color = '#e91e8a'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(233,30,138,0.4)'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                    }}
                  >
                    Tickets
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY / PAST SHOWS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p
              className={`${bebas.className} text-sm tracking-[0.25em] mb-3`}
              style={{ color: '#e91e8a' }}
            >
              THE EXPERIENCE
            </p>
            <h2
              className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`}
              style={{ color: '#ffffff', letterSpacing: '0.04em' }}
            >
              Past Shows
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mb-8 flex justify-center">
            <div
              className="overflow-hidden w-full max-w-4xl rounded-lg"
              style={{ border: '1px solid rgba(233,30,138,0.25)' }}
            >
              <Image
                src="/images/demos/music-entertainment-showcase.webp"
                alt="Neon Pines — live show showcase"
                width={960}
                height={520}
                className="w-full h-auto block"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Main Stage', 'Intimate Sets', 'Private Events'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div
                  className="flex items-center justify-center h-28 md:h-36 rounded-lg text-center px-3 transition-all duration-300 cursor-default"
                  style={{
                    backgroundColor: '#111111',
                    border: '1px solid rgba(233,30,138,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(233,30,138,0.6)'
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(233,30,138,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(233,30,138,0.2)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span
                    className={`${bebas.className} text-sm md:text-xl tracking-wider`}
                    style={{ color: '#e91e8a', letterSpacing: '0.08em' }}
                  >
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. TESTIMONIAL ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div
              className="rounded-lg px-8 md:px-12 py-10 md:py-14 relative"
              style={{
                backgroundColor: '#111111',
                borderLeft: '4px solid #e91e8a',
                border: '1px solid rgba(233,30,138,0.2)',
                borderLeftWidth: '4px',
                borderLeftColor: '#e91e8a',
              }}
            >
              <div className="text-2xl mb-6" style={{ color: '#e91e8a' }}>
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <blockquote
                className="text-xl md:text-2xl leading-relaxed mb-6 italic font-normal"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                &ldquo;Neon Pines is the heartbeat of the Kootenay music scene. Every show is an experience — the energy, the sound, the community. There is nowhere else like it.&rdquo;
              </blockquote>
              <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#e91e8a' }}>
                &mdash; Alex T., Nelson
              </p>
              <p className="mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                (Sample review &mdash; your real reviews go here)
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. ABOUT ═══════════ */}
      <section id="about" className="relative py-20 md:py-28 px-6 gradient-mesh overflow-hidden">
        {/* Gradient mesh blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            style={{
              position: 'absolute', top: '10%', left: '-10%',
              width: '500px', height: '500px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(233,30,138,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            style={{
              position: 'absolute', bottom: '5%', right: '-10%',
              width: '450px', height: '450px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            style={{
              position: 'absolute', top: '50%', left: '40%',
              width: '350px', height: '350px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(233,30,138,0.07) 0%, transparent 70%)',
              filter: 'blur(50px)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <p
              className={`${bebas.className} text-sm tracking-[0.25em] mb-3`}
              style={{ color: '#e91e8a' }}
            >
              OUR STORY
            </p>
            <h2
              className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm mb-8`}
              style={{ color: '#ffffff', letterSpacing: '0.04em' }}
            >
              About Neon Pines
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Neon Pines opened in Nelson, BC in 2016 with one mission: to give live music a home in the mountains. What started as a modest stage in an old brick building has grown into the Kootenays&apos; most beloved venue &mdash; a place where touring acts and local heroes share the same spotlight.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              With a capacity of 200 and acoustics that punch way above their weight, we offer an intimate show experience unlike anything you will find in a large city. All ages are welcome, the bar is cold, and the music is always loud. This is where the Kootenay community comes alive.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <div className="flex justify-center gap-10">
              {[
                { value: '200+', label: 'Shows Per Year' },
                { value: '200',  label: 'Capacity' },
                { value: '10',   label: 'Years Running' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className={`${bebas.className} text-4xl md:text-5xl neon-heading-sm`}
                    style={{ color: '#e91e8a', letterSpacing: '0.04em' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 9a. CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p
              className={`${bebas.className} text-sm tracking-[0.25em] mb-3`}
              style={{ color: '#e91e8a' }}
            >
              GET IN TOUCH
            </p>
            <h2
              className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`}
              style={{ color: '#ffffff', letterSpacing: '0.04em' }}
            >
              Contact &amp; Booking
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact info */}
            <Reveal>
              <div className="space-y-7">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>Phone</h3>
                  <a href="tel:2505550114" className="text-base font-medium transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#e91e8a')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    (250) 555-0114
                  </a>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>Email</h3>
                  <a href="mailto:info@neonpines.ca" className="text-base font-medium transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#e91e8a')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    info@neonpines.ca
                  </a>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>Capacity</h3>
                  <p className="text-base font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>200 Guests &mdash; All Ages</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>Location</h3>
                  <p className="text-base font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Nelson, BC, Canada</p>
                </div>

                <a
                  href="mailto:info@neonpines.ca"
                  className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 mt-2"
                  style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.14em' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d6187e'
                    e.currentTarget.style.boxShadow = '0 0 28px rgba(233,30,138,0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#e91e8a'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Book the Venue
                </a>
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                {[
                  { label: 'Name', type: 'text', placeholder: 'Your name' },
                  { label: 'Email', type: 'email', placeholder: 'you@example.com' },
                  { label: 'Phone', type: 'tel', placeholder: '(250) 555-0000' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        backgroundColor: '#111111',
                        border: '1px solid rgba(233,30,138,0.2)',
                        color: '#ffffff',
                        borderRadius: '4px',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#e91e8a')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(233,30,138,0.2)')}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your event or inquiry..."
                    className="w-full px-4 py-3 text-sm outline-none resize-none transition-all"
                    style={{
                      backgroundColor: '#111111',
                      border: '1px solid rgba(233,30,138,0.2)',
                      color: '#ffffff',
                      borderRadius: '4px',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#e91e8a')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(233,30,138,0.2)')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                  style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.14em', borderRadius: '4px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d6187e'
                    e.currentTarget.style.boxShadow = '0 0 24px rgba(233,30,138,0.45)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#e91e8a'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 9b. FOOTER ═══════════ */}
      <footer
        className="py-14 px-6"
        style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(233,30,138,0.15)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div
                className={`${bebas.className} text-3xl tracking-widest neon-heading-sm mb-2`}
                style={{ color: '#e91e8a', letterSpacing: '0.12em' }}
              >
                NEON PINES
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Where the mountains rock.<br />Nelson, BC.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#e91e8a' }}>
                Quick Links
              </h4>
              <div className="flex flex-col gap-2.5">
                {['Shows', 'Venue', 'About', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#e91e8a')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#e91e8a' }}>
                Info
              </h4>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Nelson, BC, Canada</p>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>(250) 555-0114</p>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>info@neonpines.ca</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Capacity: 200 &middot; All Ages</p>
            </div>
          </div>

          <div
            className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(233,30,138,0.1)' }}
          >
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
              &copy; {new Date().getFullYear()} Neon Pines Music Venue. All rights reserved.
            </span>
            <span className="text-xs" style={{ color: 'rgba(233,30,138,0.4)' }}>
              Est. 2016 &middot; Nelson, BC
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(233,30,138,0.25)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.55)' }}>
            This is a sample design by{' '}
            <strong style={{ color: '#ffffff' }}>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=music-entertainment"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap"
            style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.12em' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d6187e'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(233,30,138,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#e91e8a'
              e.currentTarget.style.boxShadow = 'none'
            }}
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
