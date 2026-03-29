'use client'

import { Rajdhani, Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback } from 'react'
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
      style={{ aspectRatio: '16/9', border: '2px solid #ff6a00' }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* AFTER */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="text-center px-8">
          <div className={`${heading.className} text-2xl md:text-4xl font-bold uppercase mb-2`} style={{ color: '#ff6a00' }}>SUMMIT PLUMBING</div>
          <div className={`${heading.className} text-xl md:text-3xl font-bold uppercase mb-3`} style={{ color: '#ffffff' }}>& HEATING</div>
          <div className="text-sm uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Castlegar, BC — Licensed & Insured</div>
          <div className="text-base mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Plumbing · Heating · Gas Fitting · Emergency 24/7</div>
          <div className="inline-block px-6 py-2 text-sm font-bold uppercase" style={{ backgroundColor: '#ff6a00', color: '#fff' }}>GET A FREE QUOTE</div>
        </div>
        <div className="absolute top-3 right-3 px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#ff6a00', color: '#fff' }}>AFTER</div>
      </div>

      {/* BEFORE */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#9a9a9a', clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="text-center px-8">
          <div className="text-2xl md:text-4xl font-bold mb-3" style={{ color: '#555' }}>Bob's Plumbing</div>
          <div className="text-sm mb-4" style={{ color: '#777' }}>Call for a quote</div>
          <div className="text-base" style={{ color: '#666' }}>Plumbing Services Available</div>
          <div className="mt-4 inline-block px-6 py-2 text-sm" style={{ backgroundColor: '#aaa', color: '#444' }}>Contact</div>
        </div>
        <div className="absolute top-3 left-3 px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#666', color: '#ddd' }}>BEFORE</div>
      </div>

      {/* Handle */}
      <div className="absolute top-0 bottom-0 w-0.5 z-10" style={{ left: `${pos}%`, backgroundColor: '#ff6a00', transform: 'translateX(-50%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#ff6a00', boxShadow: '0 0 20px rgba(255,106,0,0.6)' }}>
          <span className="text-white text-xs font-bold">◀▶</span>
        </div>
      </div>
    </div>
  )
}

/* ── FAQ Accordion ── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} style={{ border: '1px solid rgba(138,155,176,0.15)', backgroundColor: '#1a1a1a' }}>
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            style={{ color: open === i ? '#ff6a00' : 'rgba(255,255,255,0.85)' }}
          >
            <span className={`${heading.className} text-lg md:text-xl font-semibold`}>{item.q}</span>
            <span className="text-xl ml-4 flex-shrink-0" style={{ color: '#ff6a00' }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div className="px-6 pb-5" style={{ color: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(138,155,176,0.15)' }}>
              <p className="leading-relaxed pt-4">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SUMMIT PLUMBING & HEATING — Trades & Industrial Demo
   ══════════════════════════════════════════════════════════════ */
export default function TradesIndustrialDemo() {
  const prefersReduced = useReducedMotion()

  const toolsRef = useRef(null)
  const { scrollYProgress: toolsScroll } = useScroll({
    target: toolsRef,
    offset: ['start end', 'end start'],
  })
  const drawLength = useTransform(toolsScroll, [0, 0.5], [1, 0])

  return (
    <div className={body.className} style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#2d2d2d', color: '#ffffff' }}>

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
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6a00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >{link}</a>
            ))}
            <a href="tel:2505550142" className="text-sm font-bold uppercase tracking-wider" style={{ color: '#ff6a00' }}>(250) 555-0142</a>
          </div>
          <a href="tel:2505550142" className="md:hidden text-sm font-bold" style={{ color: '#ff6a00' }}>(250) 555-0142</a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/demos/trades-industrial-hero.webp" alt="Summit Plumbing & Heating — professional plumbing work" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-0 left-0 w-3 md:w-4" style={{ backgroundColor: '#ff6a00', height: '70%', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <motion.div
            className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest text-white mb-8 rounded-sm"
            style={{ backgroundColor: '#ff6a00', animation: prefersReduced ? 'none' : 'emergencyPulse 2s ease-in-out infinite' }}
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
            animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            EMERGENCY 24/7
          </motion.div>

          <motion.a href="tel:2505550142"
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

          <motion.p className="text-lg md:text-xl max-w-xl leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Plumbing, heating &amp; gas fitting for homes and businesses across the West Kootenays.
          </motion.p>

          <motion.a href="#contact"
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
          {['★★★★★ 5.0 Rating', '20+ Years', 'Licensed & Insured', '24/7 Emergency'].map((item) => (
            <span key={item} className={`${heading.className} text-sm md:text-base font-bold uppercase tracking-wider whitespace-nowrap`} style={{ color: '#ffffff' }}>{item}</span>
          ))}
        </div>
      </section>

      <AngularDivider topColor="#ff6a00" bottomColor="#2d2d2d" />

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <section id="services" ref={toolsRef} className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#2d2d2d' }}>
        {/* Drawing wrench SVG on scroll */}
        <motion.svg className="absolute top-1/2 right-12 -translate-y-1/2 hidden xl:block" width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ opacity: 0.12 }}>
          <motion.path d="M90 15a25 25 0 0 0-22.93 35.18L30 87.25a10 10 0 1 0 14.14 14.14L81.82 63.93A25 25 0 0 0 90 15z" stroke="#ff6a00" strokeWidth="2" fill="none" style={{ pathLength: prefersReduced ? 1 : drawLength }} />
        </motion.svg>
        <motion.svg className="absolute top-1/2 left-12 -translate-y-1/2 hidden xl:block" width="100" height="100" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.12 }}>
          <motion.path d="M8 14h12v6H8v14h6V22h12v12h6V22h8v-6h-8V8h-6v8H14V8H8v6z" stroke="#ff6a00" strokeWidth="1.5" fill="none" style={{ pathLength: prefersReduced ? 1 : drawLength }} />
        </motion.svg>

        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>WHAT WE BUILD FOR YOU</h2>
            <div className="w-20 h-1.5 mb-8" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>

          {/* PAS Copy */}
          <Reveal delay={0.1}>
            <div className="max-w-2xl mb-14 p-6" style={{ borderLeft: '4px solid #ff6a00', backgroundColor: '#1a1a1a' }}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Homeowners Google &ldquo;plumber near me&rdquo; and you&apos;re invisible. The contractor down the road isn&apos;t better — they just show up online. Every emergency call you miss is money in someone else&apos;s pocket. Let&apos;s fix that.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Custom Website', price: 'From $1,500', desc: 'Get found by homeowners who need a plumber RIGHT NOW — not someone two towns over.' },
              { title: 'Google Domination', price: '$500', desc: 'Top of search for plumber, HVAC, heating in the Kootenays. Your name, their search.' },
              { title: 'Smart Business Tools', price: 'From $750', desc: 'Automate booking, follow-ups, and review requests. More time on the job, less admin.' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <motion.div
                  className="relative p-8 h-full transition-all cursor-default overflow-hidden"
                  style={{ backgroundColor: '#1a1a1a', borderTop: '4px solid #ff6a00', backgroundImage: 'linear-gradient(135deg, rgba(138,155,176,0.05) 0%, transparent 50%)' }}
                  whileHover={prefersReduced ? {} : { scale: 1.04, boxShadow: '0 0 30px rgba(255,106,0,0.4)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(138,155,176,0.3) 2px, rgba(138,155,176,0.3) 3px)' }} />
                  <div className="relative">
                    <h3 className={`${heading.className} text-xl md:text-2xl font-bold uppercase mb-1`} style={{ color: '#ff6a00' }}>{card.title}</h3>
                    <p className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: 'rgba(255,106,0,0.7)' }}>{card.price}</p>
                    <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{card.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AngularDivider topColor="#2d2d2d" bottomColor="#1a1a1a" />

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>HOW IT WORKS</h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'WE TALK', desc: 'Free consultation. You tell us your service area, your busiest seasons, what calls you want more of. No pressure.' },
              { num: '02', title: 'WE BUILD', desc: 'Your site built in 2–3 weeks. Emergency line featured front and centre. Service area map. Reviews front and centre.' },
              { num: '03', title: 'YOU GROW', desc: 'You start showing up when people Google for plumbers in Castlegar, Nelson, Trail. The calls come to you.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.2}>
                <div className="text-center p-8" style={{ backgroundColor: '#2d2d2d', borderTop: '4px solid #ff6a00' }}>
                  <div className={`${heading.className} text-5xl font-bold mb-4`} style={{ color: '#ff6a00' }}>{step.num}</div>
                  <h3 className={`${heading.className} text-2xl font-bold uppercase mb-4`} style={{ color: '#ffffff' }}>{step.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AngularDivider topColor="#1a1a1a" bottomColor="#2d2d2d" />

      {/* ═══════════ 6. GALLERY / SHOWCASE ═══════════ */}
      <section id="projects" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#2d2d2d' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>RECENT PROJECTS</h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative w-full max-w-3xl mx-auto mb-12 overflow-hidden" style={{ borderBottom: '4px solid #ff6a00' }}>
              <Image src="/images/demos/trades-industrial-showcase.webp" alt="Summit Plumbing & Heating — recent project showcase" width={800} height={500} className="w-full h-auto block" />
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Kitchen Reno', 'Bathroom Remodel', 'Emergency Repair'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={`/images/demos/gallery/ti-${i + 1}.webp`} alt={label} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-sm font-medium">{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AngularDivider topColor="#2d2d2d" bottomColor="#1a1a1a" />

      {/* ═══════════ 7. BEFORE / AFTER ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>THE TRANSFORMATION</h2>
            <div className="w-20 h-1.5 mb-4" style={{ backgroundColor: '#ff6a00' }} />
            <p className="mb-12 text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Drag to compare — before vs. after a Kootenay Made Digital build</p>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfterSlider />
          </Reveal>
        </div>
      </section>

      <AngularDivider topColor="#1a1a1a" bottomColor="#2d2d2d" />

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#2d2d2d' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>WHAT CONTRACTORS SAY</h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I used to get maybe two calls a week from people who found me online. Now I get two a day. My schedule is full two weeks out. Best investment in 20 years of business.",
                name: 'Dan P.',
                biz: "Precision Plumbing — Castlegar, BC",
              },
              {
                quote: "We were invisible online for years. Three months after launching the new site, we started showing up for 'electrician Nelson BC'. Our summer bookings doubled.",
                name: 'Ryan M.',
                biz: "Summit Electric — Nelson, BC",
              },
              {
                quote: "The emergency call feature alone paid for the whole site. A family in Fruitvale found us at 11pm on Google. Full pipe replacement job. Done.",
                name: 'Steve K.',
                biz: "Kootenay Heating & Gas — Fruitvale, BC",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="p-8 h-full flex flex-col" style={{ backgroundColor: '#1a1a1a', borderTop: '4px solid #ff6a00' }}>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className="text-xl" style={{ color: '#ff6a00' }}>&#9733;</span>
                    ))}
                  </div>
                  <blockquote className="flex-1 leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className={`${heading.className} font-bold uppercase tracking-wider text-sm`} style={{ color: '#ff6a00' }}>{t.name}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.biz}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-8 text-center text-xs italic" style={{ color: 'rgba(255,255,255,0.25)' }}>
              (Sample reviews — your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      <AngularDivider topColor="#2d2d2d" bottomColor="#1a1a1a" />

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>COMMON QUESTIONS</h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={[
              { q: 'How long does a website take?', a: 'Most trades sites are live in 2–3 weeks. We prioritize your emergency contact line and service area from day one.' },
              { q: 'What if I already have a website?', a: 'We review it together. If it\'s bringing in work, we improve it. If it\'s invisible on Google, we rebuild it right.' },
              { q: 'What areas do you serve?', a: 'We build websites for trades businesses across the Kootenays — Trail, Nelson, Castlegar, Rossland, Salmo, Fruitvale, and beyond. Your service area map goes right on the site.' },
              { q: 'Can I update the site myself?', a: 'Yes. Add services, update hours, post a seasonal promotion — all without calling us. We build on platforms you can manage.' },
              { q: 'What does it cost?', a: 'Custom websites from $1,500. Google Domination SEO at $500. Email marketing from $750. Book a free consultation for a firm quote.' },
              { q: 'Can the site handle emergency service enquiries?', a: 'Absolutely. We build a prominent emergency CTA and can integrate with booking tools, so when someone has a burst pipe at 2am, your name is the one they call.' },
            ]} />
          </Reveal>
        </div>
      </section>

      <AngularDivider topColor="#1a1a1a" bottomColor="#2d2d2d" />

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#2d2d2d' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>ABOUT SUMMIT</h2>
            <div className="w-20 h-1.5 mb-10" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Summit Plumbing &amp; Heating is a locally owned and operated company with over 20 years of experience keeping Kootenay homes and businesses running. From emergency pipe repairs at 2am to full heating system installations, we bring the same level of professionalism and care to every job. Licensed, insured, and committed to honest pricing &mdash; when you call Summit, you get a team that shows up on time, does the job right, and cleans up after. We&rsquo;re your neighbours, and we take pride in the work we do for this community.
            </p>
          </Reveal>
        </div>
      </section>

      <AngularDivider topColor="#2d2d2d" bottomColor="#1a1a1a" />

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section id="contact" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-3xl md:text-5xl font-bold uppercase mb-4`}>GET IN TOUCH</h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6a00' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div>
                <a href="tel:2505550142"
                  className={`${heading.className} block text-4xl md:text-5xl font-bold mb-8 transition-colors`}
                  style={{ color: '#ff6a00' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 20px rgba(255,106,0,0.5)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  (250) 555-0142
                </a>
                <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6a00' }}>EMAIL</span>info@summitplumbing.ca</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6a00' }}>AVAILABILITY</span>24/7 Emergency Service</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6a00' }}>SERVICE AREA</span>West Kootenays</p>
                </div>
                <div className="inline-block mt-8 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white rounded-sm"
                  style={{ backgroundColor: '#ff6a00', animation: prefersReduced ? 'none' : 'emergencyPulse 2s ease-in-out infinite' }}>
                  24/7 EMERGENCY — CALL NOW
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>NAME</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: '#2d2d2d', border: '1px solid rgba(138,155,176,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6a00')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(138,155,176,0.2)')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>EMAIL</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                    style={{ backgroundColor: '#2d2d2d', border: '1px solid rgba(138,155,176,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6a00')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(138,155,176,0.2)')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>MESSAGE</label>
                  <textarea rows={4} placeholder="Describe your plumbing or heating issue..." className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all resize-none"
                    style={{ backgroundColor: '#2d2d2d', border: '1px solid rgba(138,155,176,0.2)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6a00')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(138,155,176,0.2)')} />
                </div>
                <motion.button type="submit" className={`${heading.className} w-full px-8 py-4 text-base font-bold uppercase tracking-widest transition-all`}
                  style={{ backgroundColor: '#ff6a00', color: '#ffffff' }}
                  whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(255,106,0,0.5)', scale: 1.02 }}>
                  SEND MESSAGE
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <AngularDivider topColor="#1a1a1a" bottomColor="#2d2d2d" />

      {/* ═══════════ 12. FOOTER ═══════════ */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#2d2d2d', borderTop: '1px solid rgba(138,155,176,0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${heading.className} text-xl font-bold uppercase mb-3`} style={{ color: '#ff6a00' }}>Summit Plumbing &amp; Heating</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Kootenay reliable. Licensed plumbing, heating &amp; gas fitting.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#ff6a00' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Services', 'Projects', 'About', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6a00')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{link}</a>
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
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>&copy; 2025 Summit Plumbing &amp; Heating. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{ backgroundColor: 'rgba(26,26,26,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '2px solid #ff6a00' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Like what you see? This could be yours. A sample by <strong className="text-white">Kootenay Made Digital</strong>
          </span>
          <Link href="/contact?style=trades-industrial"
            className={`${heading.className} inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap`}
            style={{ backgroundColor: '#ff6a00', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(255,106,0,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            LIKE WHAT YOU SEE? LET'S TALK &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
