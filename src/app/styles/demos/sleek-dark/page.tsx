'use client'

import { useState, useRef, useCallback } from 'react'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
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

/* ── Before/After Slider ── */
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto overflow-hidden select-none cursor-ew-resize"
      style={{ aspectRatio: '3/2', border: '1px solid rgba(201,169,110,0.2)' }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* AFTER layer */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-8 py-10"
        style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #1f1810 100%)' }}
      >
        <p className={`${heading.className} text-2xl md:text-4xl text-center leading-tight mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
          Thursday&apos;s Special<br />Sells Out by 7pm.<br /><span style={{ color: '#c9a96e' }}>Just Saying.</span>
        </p>
        <a
          href="#reserve"
          className="inline-block px-6 py-3 text-sm font-bold tracking-widest uppercase mt-2"
          style={{ border: '1px solid #c9a96e', color: '#0a0a0a', backgroundColor: '#c9a96e', letterSpacing: '0.1em' }}
        >
          Reserve Your Table →
        </a>
        <span
          className="absolute top-3 right-3 text-xs font-bold uppercase tracking-widest px-3 py-1"
          style={{ backgroundColor: 'rgba(201,169,110,0.18)', color: '#c9a96e' }}
        >
          AFTER
        </span>
      </div>

      {/* BEFORE layer */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-8 py-10 overflow-hidden"
        style={{ backgroundColor: '#e8e8e8', clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <p className="text-2xl md:text-4xl text-center leading-snug mb-4" style={{ fontFamily: 'Georgia, serif', color: '#555', fontWeight: 400 }}>
          Welcome to Our Restaurant!<br />Check Out Our Menu!<br />Open Tuesday to Sunday.
        </p>
        <p className="text-sm mb-4" style={{ fontFamily: 'Georgia, serif', color: '#777' }}>Call for Reservations.</p>
        <button
          className="px-5 py-2 text-sm"
          style={{ backgroundColor: '#999', color: '#fff', border: 'none', borderRadius: '2px', cursor: 'default' }}
        >
          Click Here
        </button>
        <span
          className="absolute top-3 left-3 text-xs font-bold uppercase tracking-widest px-3 py-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.08)', color: '#888' }}
        >
          BEFORE
        </span>
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 w-px z-10"
        style={{ left: `${pos}%`, backgroundColor: 'rgba(201,169,110,0.6)' }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.4)', color: '#c9a96e', fontSize: '0.8rem', fontWeight: 800 }}
        >
          ◀▶
        </div>
      </div>
    </div>
  )
}

/* ── FAQ Accordion ── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  return (
    <div style={{ borderBottom: '1px solid rgba(201,169,110,0.15)' }}>
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium" style={{ color: '#f5f0e8' }}>{question}</span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform"
          style={{
            color: '#c9a96e',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: prefersReduced ? 'none' : 'transform 0.3s ease',
          }}
        >
          ✕
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? '400px' : '0',
          overflow: 'hidden',
          transition: prefersReduced ? 'none' : 'max-height 0.4s ease',
        }}
      >
        <p className="pb-5 text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.6)' }}>
          {answer}
        </p>
      </div>
    </div>
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

  const faqItems = [
    {
      question: 'How long does a website take to build?',
      answer: 'Most restaurant and bar websites are ready in 2–3 weeks. We move fast without cutting corners — you\'ll have something you\'re proud to share.',
    },
    {
      question: 'Can I update my menu myself?',
      answer: 'Absolutely. We build on platforms you can manage — no developer required. Update your menu, daily specials, and hours any time from your phone or computer.',
    },
    {
      question: 'Can you add online reservations or booking links?',
      answer: 'Yes. We can integrate OpenTable, Resy, or a simple booking form directly into your site so guests can reserve a table without picking up the phone.',
    },
    {
      question: 'What if I already have a website?',
      answer: 'We\'ll assess what you have and either rebuild it from scratch or redesign it to match your brand. Either way, you end up with something that actually works.',
    },
    {
      question: 'What does it cost?',
      answer: 'A custom website starts from $1,500. Google Domination (SEO + local listings) starts from $500. We\'ll give you a clear quote after a free consultation — no surprises.',
    },
  ]

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
          <span className={`${heading.className} text-2xl md:text-3xl tracking-wide`} style={{ color: '#c9a96e', fontWeight: 300, letterSpacing: '0.05em' }}>
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
          <h1 className={`${heading.className} text-5xl md:text-7xl lg:text-8xl leading-tight mb-8`} style={{ fontWeight: 300, color: '#f5f0e8', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
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

      {/* ═══════════ 4. SERVICES — with PAS intro ═══════════ */}
      <section id="menu" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              What We Can Do For You
            </h2>
            <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          {/* PAS copy */}
          <Reveal delay={0.1}>
            <p className="text-center text-base md:text-lg leading-relaxed mb-16 max-w-2xl mx-auto italic" style={{ color: 'rgba(245,240,232,0.55)' }}>
              The restaurant across town has a website that makes people hungry — yours doesn&rsquo;t even show your menu.
              They&rsquo;re not a better restaurant. They just show up online first. Let&rsquo;s change that.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                price: 'From $1,500',
                desc: 'A stunning, atmospheric website that captures the essence of your dining experience.',
              },
              {
                title: 'Google Visibility',
                price: 'From $500',
                desc: 'Show up when people search for fine dining in the Kootenays.',
              },
              {
                title: 'Social Media',
                price: 'From $750',
                desc: 'Show off your plates, your space, and your story. Build a following that books.',
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
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 30%, rgba(201,169,110,0.08) 0%, transparent 70%)',
                      animation: 'candleGlow 4s ease-in-out infinite',
                    }}
                  />
                  <div className="relative">
                    <h3 className={`${heading.className} text-xl md:text-2xl mb-2`} style={{ color: '#c9a96e', fontWeight: 400 }}>
                      {card.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(201,169,110,0.5)' }}>
                      {card.price}
                    </p>
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

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              How It Works
            </h2>
            <div className="w-16 h-px mx-auto mb-16" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px"
              style={{ backgroundColor: 'rgba(201,169,110,0.2)' }}
            />
            {[
              {
                step: '01',
                title: 'We Talk',
                desc: 'A free, no-pressure consultation. You tell us about your restaurant, your vibe, and what you need.',
              },
              {
                step: '02',
                title: 'We Build',
                desc: 'We design and develop your site in about 2 weeks — all crafted to match the atmosphere you\'ve worked hard to create.',
              },
              {
                step: '03',
                title: 'You Fill Tables',
                desc: 'Launch, get found on Google, and start converting searches into reservations.',
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative z-10"
                    style={{
                      backgroundColor: '#0a0a0a',
                      border: '1px solid rgba(201,169,110,0.3)',
                    }}
                  >
                    <span className={`${heading.className} text-2xl`} style={{ color: '#c9a96e', fontWeight: 300 }}>
                      {item.step}
                    </span>
                  </div>
                  <h3 className={`${heading.className} text-xl md:text-2xl mb-3`} style={{ color: '#f5f0e8', fontWeight: 400 }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.5)' }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY — From Our Kitchen ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
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
                <div className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                  <Image src={`/images/demos/gallery/sd-${i + 1}.webp`} alt={label} fill className='object-cover' />
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
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              The Ember Difference
            </h2>
            <div className="w-16 h-px mx-auto mb-4" style={{ backgroundColor: '#c9a96e' }} />
            <p className="text-center text-sm mb-12" style={{ color: 'rgba(201,169,110,0.6)' }}>
              This is the difference between being forgettable and being fully booked
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <BeforeAfterSlider />
            <p className="text-center text-xs mt-4 italic" style={{ color: 'rgba(201,169,110,0.4)' }}>
              Drag to compare — your site will reflect your unique brand and atmosphere
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              What Our Clients Say
            </h2>
            <div className="w-16 h-px mx-auto mb-16" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Our bookings doubled within a month of the new site going live. People started calling just because they found us on Google.',
                author: 'Marcus D.',
                business: 'The Anchor Pub & Grill',
                town: 'Nelson',
              },
              {
                quote: 'We finally have a website that looks as good as our food tastes. Our Instagram traffic tripled and the reservation form is full every weekend.',
                author: 'Priya T.',
                business: 'Saffron Kitchen',
                town: 'Trail',
              },
              {
                quote: 'We used to get three phone reservations a week. Now we get fifteen. The online menu and booking link changed everything.',
                author: 'Liam R.',
                business: 'The Red Chair',
                town: 'Rossland',
              },
            ].map((t, i) => (
              <Reveal key={t.author} delay={i * 0.15}>
                <div
                  className="relative p-8 h-full overflow-hidden"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid rgba(201,169,110,0.15)',
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 70%)' }}
                  />
                  <div className="relative">
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j} style={{ color: '#c9a96e' }}>&#9733;</span>
                      ))}
                    </div>
                    <blockquote className="text-sm leading-relaxed mb-6 italic" style={{ color: 'rgba(245,240,232,0.7)' }}>
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a96e' }}>
                      &mdash; {t.author}, {t.town}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(245,240,232,0.3)' }}>{t.business}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="text-center text-xs mt-8 italic" style={{ color: 'rgba(245,240,232,0.25)' }}>
              (Sample reviews &mdash; your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              Common Questions
            </h2>
            <div className="w-16 h-px mx-auto mb-16" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ borderTop: '1px solid rgba(201,169,110,0.15)' }}>
              {faqItems.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
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

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section id="reservations" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl text-center mb-4`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
              Make a Reservation
            </h2>
            <div className="w-16 h-px mx-auto mb-16" style={{ backgroundColor: '#c9a96e' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
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
                  <p style={{ color: 'rgba(245,240,232,0.7)' }}>123 Sample St, Nelson, BC</p>
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
                  Call to Reserve
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a96e' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
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
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
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
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201,169,110,0.2)', color: '#f5f0e8' }}
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

      {/* ═══════════ 12. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
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
              <p className="text-sm mb-1" style={{ color: 'rgba(245,240,232,0.4)' }}>123 Sample St, Nelson, BC</p>
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
          backgroundColor: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(201,169,110,0.25)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(245,240,232,0.7)' }}>
              Sample design by <strong style={{ color: '#f5f0e8' }}>Kootenay Made Digital</strong>
            </span>
            <a href="tel:2505550000" className="text-sm font-bold hidden sm:inline" style={{ color: '#c9a96e' }}>
              (250) 555-0000
            </a>
          </div>
          <Link
            href="/contact?style=sleek-dark"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{ backgroundColor: '#c9a96e', color: '#0a0a0a' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Like What You See? Let's Talk &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  )
}
