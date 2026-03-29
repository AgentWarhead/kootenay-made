'use client'

import { Bebas_Neue, Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback } from 'react'
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
      <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 15 75 A 40 40 0 1 1 85 75" fill="none" stroke="rgba(192,192,192,0.15)" strokeWidth="4" strokeLinecap="round" />
          <motion.path
            d="M 15 75 A 40 40 0 1 1 85 75"
            fill="none"
            stroke="#dc2626"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: 0 }}
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
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c0c0c0' }}>{label}</span>
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
      style={{ aspectRatio: '16/9', border: '2px solid #dc2626' }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* AFTER (right — polished) */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#111' }}>
        <div className="text-center px-8">
          <div className={`${heading.className} text-3xl md:text-5xl tracking-wider mb-3`} style={{ color: '#dc2626' }}>IRON HORSE GARAGE</div>
          <div className="text-sm uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Trail, BC — Est. 1998</div>
          <div className={`${heading.className} text-xl md:text-2xl tracking-wider`} style={{ color: '#c0c0c0' }}>ASE Certified · Custom Builds · All Makes & Models</div>
          <div className="mt-4 inline-block px-6 py-2 text-sm uppercase tracking-wider" style={{ backgroundColor: '#dc2626', color: '#fff' }}>Book Your Service</div>
        </div>
        <div className="absolute top-3 right-3 px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#dc2626', color: '#fff' }}>AFTER</div>
      </div>

      {/* BEFORE (left — generic) */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#888', clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="text-center px-8">
          <div className="text-2xl md:text-4xl font-bold mb-3" style={{ color: '#555' }}>Joe's Auto Repair</div>
          <div className="text-sm mb-4" style={{ color: '#777' }}>123 Main Street · Call Us</div>
          <div className="text-base" style={{ color: '#666' }}>Oil Changes · Brakes · Tires</div>
          <div className="mt-4 inline-block px-6 py-2 text-sm" style={{ backgroundColor: '#aaa', color: '#444' }}>Contact Us</div>
        </div>
        <div className="absolute top-3 left-3 px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#666', color: '#ddd' }}>BEFORE</div>
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 z-10"
        style={{ left: `${pos}%`, backgroundColor: '#dc2626', transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#dc2626', boxShadow: '0 0 20px rgba(220,38,38,0.6)' }}>
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
        <div key={i} style={{ border: '1px solid #222', backgroundColor: '#1a1a1a' }}>
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            style={{ color: open === i ? '#dc2626' : 'rgba(255,255,255,0.85)' }}
          >
            <span className={`${heading.className} text-lg md:text-xl tracking-wider`}>{item.q}</span>
            <span className="text-xl ml-4 flex-shrink-0" style={{ color: '#dc2626' }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div className="px-6 pb-5" style={{ color: 'rgba(255,255,255,0.55)', borderTop: '1px solid #222' }}>
              <p className="leading-relaxed pt-4">{item.a}</p>
            </div>
          )}
        </div>
      ))}
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
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >{link}</a>
            ))}
            <a href="tel:2505550199" className="text-sm font-bold uppercase tracking-wider" style={{ color: '#dc2626' }}>
              (250) 555-0199
            </a>
          </div>
          <a href="tel:2505550199" className="md:hidden text-sm font-bold" style={{ color: '#dc2626' }}>(250) 555-0199</a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/demos/automotive-hero.webp" alt="Iron Horse Garage — professional auto shop" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-0 left-0 w-2 md:w-3" style={{ backgroundColor: '#dc2626', height: '60%', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <div className="max-w-5xl">
            <motion.div className="w-24 h-1.5 mb-8" style={{ backgroundColor: '#dc2626' }}
              initial={prefersReduced ? {} : { scaleX: 0, transformOrigin: 'left' }}
              animate={prefersReduced ? {} : { scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.h1
              className={`${heading.className} text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-wider`}
              style={{ ...chromeGradient, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              initial={prefersReduced ? {} : { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
              animate={prefersReduced ? {} : { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            >
              BUILT TO<br />
              <span style={{ ...chromeGradient, filter: 'drop-shadow(0 0 20px rgba(220,38,38,0.3))' }}>LAST</span>
            </motion.h1>
            <motion.p className="text-lg md:text-xl max-w-xl mt-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Full-service automotive repair and custom builds. ASE certified technicians serving the Kootenays for over 25 years.
            </motion.p>
            <motion.a href="tel:2505550199"
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
            <motion.a href="#contact"
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

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <section style={{ backgroundColor: '#0a0a0a' }} className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <SpeedoStat value="5.0" label="Rating" delay={0} />
            <SpeedoStat value="25+" label="Years" delay={0.15} />
            <SpeedoStat value="ASE" label="Certified" delay={0.3} />
            <SpeedoStat value="ALL" label="Makes & Models" delay={0.45} />
          </div>
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-1 text-lg" style={{ color: '#dc2626' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
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
            <div className="w-20 h-1.5 mb-8" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>

          {/* PAS Copy */}
          <Reveal delay={0.1}>
            <div className="max-w-2xl mb-14 p-6" style={{ borderLeft: '4px solid #dc2626', backgroundColor: '#1a1a1a' }}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Your competitor&apos;s shop shows up on Google. Yours doesn&apos;t. They&apos;re not better mechanics — they just have a better website. Every day you&apos;re invisible online is a day they&apos;re collecting your customers. Let&apos;s fix that.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'CUSTOM WEBSITE', price: 'From $1,500', desc: 'A site as tough as your shop. Show your work, build trust, get found.' },
              { title: 'GOOGLE DOMINATION', price: '$500', desc: 'When a car breaks down in the Kootenays, they find you — not your competition.' },
              { title: 'FULL BRAND BUILD', price: 'From $4,000', desc: 'Logo, site, social — everything built to make Iron Horse unforgettable.' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <motion.div
                  className="p-8 h-full transition-all cursor-default"
                  style={{ backgroundColor: '#1a1a1a', borderTop: '4px solid #dc2626', borderLeft: '1px solid #222', borderRight: '1px solid #222', borderBottom: '1px solid #222' }}
                  whileHover={prefersReduced ? {} : { scale: 1.04, boxShadow: '0 0 30px rgba(220,38,38,0.3)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <h3 className={`${heading.className} text-2xl md:text-3xl tracking-wider mb-1`} style={{ color: '#dc2626' }}>{card.title}</h3>
                  <p className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: 'rgba(220,38,38,0.7)' }}>{card.price}</p>
                  <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{card.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#111" bottomColor="#0a0a0a" />

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>
              HOW IT WORKS
            </h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5" style={{ backgroundColor: '#dc2626', opacity: 0.3, left: '20%', right: '20%' }} />
            {[
              { num: '01', title: 'WE TALK', desc: 'Free consultation. You tell us about your shop, your goals, and what makes Iron Horse different. No pressure, no jargon.' },
              { num: '02', title: 'WE BUILD', desc: 'We design and build your site in about 2 weeks. You approve every step. No surprises.' },
              { num: '03', title: 'YOU GROW', desc: 'Launch day. Your phone starts ringing from people who found you on Google. That\'s the whole point.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.2}>
                <div className="text-center">
                  <div className={`${heading.className} text-5xl md:text-6xl mb-4 tracking-wider`} style={{ color: '#dc2626' }}>{step.num}</div>
                  <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: '#dc2626', opacity: 0.4 }} />
                  <h3 className={`${heading.className} text-2xl tracking-wider mb-4`} style={{ color: '#ffffff' }}>{step.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#0a0a0a" bottomColor="#111" />

      {/* ═══════════ 6. GALLERY / SHOWCASE ═══════════ */}
      <section id="work" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>RECENT WORK</h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative w-full max-w-3xl mx-auto mb-12 overflow-hidden" style={{ borderBottom: '4px solid #dc2626' }}>
              <Image src="/images/demos/automotive-showcase.webp" alt="Iron Horse Garage — recent automotive project" width={800} height={500} className="w-full h-auto block" />
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Engine Rebuild', 'Custom Exhaust', 'Full Restore'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={`/images/demos/gallery/au-${i + 1}.webp`} alt={label} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-sm font-medium">{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#111" bottomColor="#0a0a0a" />

      {/* ═══════════ 7. BEFORE / AFTER ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>
              THE TRANSFORMATION
            </h2>
            <div className="w-20 h-1.5 mb-4" style={{ backgroundColor: '#dc2626' }} />
            <p className="mb-12 text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Drag to compare — before vs. after a Kootenay Made Digital build</p>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfterSlider />
          </Reveal>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#0a0a0a" bottomColor="#111" />

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>WHAT SHOPS SAY</h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Within a month of launching our new site, our phone was ringing every day with new customers who found us on Google. Best investment we've made.",
                name: 'Mike R.',
                biz: "Ridge Line Auto — Rossland, BC",
              },
              {
                quote: "I was invisible online for 15 years. Now we show up first for 'mechanic Trail BC'. My competitor called to ask what I did. I didn't tell him.",
                name: 'Tony K.',
                biz: "Kootenay Custom Builds — Trail, BC",
              },
              {
                quote: "Our fleet service bookings doubled in the first 90 days. The site paid for itself before the first invoice was even due.",
                name: 'Sandra L.',
                biz: "Nelson Fleet & Commercial — Nelson, BC",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="p-8 h-full flex flex-col" style={{ backgroundColor: '#1a1a1a', borderTop: '4px solid #dc2626', border: '1px solid #222' }}>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className="text-xl" style={{ color: '#dc2626' }}>&#9733;</span>
                    ))}
                  </div>
                  <blockquote className="flex-1 leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-bold uppercase tracking-wider text-sm" style={{ color: '#dc2626' }}>{t.name}</p>
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

      <RedStripe />
      <RacingDivider topColor="#111" bottomColor="#0a0a0a" />

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>COMMON QUESTIONS</h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={[
              { q: 'How long does a website take?', a: 'Most automotive sites are live in 2–3 weeks. We move fast because we know downtime costs money.' },
              { q: 'What if I already have a website?', a: 'We\'ll review what you have. If it\'s salvageable, we rebuild on top. If it\'s hurting you, we start fresh — your call.' },
              { q: 'Can I update the site myself?', a: 'Yes. We build on platforms you can manage without calling us every time you want to add a service or update your hours.' },
              { q: 'What does it cost?', a: 'A custom website starts at $1,500. Google Domination SEO package is $500. Full brand build from $4,000. Book a free consultation and we\'ll give you a firm quote.' },
              { q: 'Do you do fleet service pages or custom build portfolios?', a: 'Absolutely. Fleet clients need a dedicated landing page and commercial inquiry form. Custom build shops need a portfolio that shows off the work. We\'ve done both.' },
              { q: 'Will this actually get my phone ringing?', a: 'That\'s the goal and the metric we optimize for. We\'ve helped shops in Trail, Nelson, and Rossland go from invisible to page one. The phone rings.' },
            ]} />
          </Reveal>
        </div>
      </section>

      <RedStripe />
      <RacingDivider topColor="#0a0a0a" bottomColor="#111" />

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>ABOUT IRON HORSE</h2>
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
      <RacingDivider topColor="#111" bottomColor="#0a0a0a" />

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className={`${heading.className} text-4xl md:text-6xl tracking-wider mb-4`} style={chromeGradient}>GET IN TOUCH</h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#dc2626' }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div>
                <a href="tel:2505550199"
                  className={`${heading.className} block text-4xl md:text-6xl mb-8 transition-colors tracking-wider`}
                  style={{ color: '#dc2626' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 20px rgba(220,38,38,0.5)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  (250) 555-0199
                </a>
                <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#dc2626' }}>EMAIL</span>info@ironhorsegarage.ca</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#dc2626' }}>HOURS</span>Mon&ndash;Sat 8:00 AM &ndash; 5:00 PM</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#dc2626' }}>LOCATION</span>Trail, BC</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>NAME</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#dc2626')} onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>EMAIL</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#dc2626')} onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>MESSAGE</label>
                  <textarea rows={4} placeholder="Year, make, model, and what you need..." className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all resize-none" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#dc2626')} onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <motion.button type="submit" className={`${heading.className} w-full px-8 py-4 text-lg tracking-widest transition-all`} style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                  whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(220,38,38,0.5)', scale: 1.02 }}>
                  SEND MESSAGE
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <RedStripe />

      {/* ═══════════ 12. FOOTER ═══════════ */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className={`${heading.className} text-2xl tracking-wider block mb-3`} style={chromeGradient}>IRON HORSE GARAGE</span>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Full-service auto repair &amp; custom builds. Trail, BC.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              {['Services', 'Work', 'About', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium uppercase tracking-widest transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{link}</a>
              ))}
            </div>
          </div>
          <div className="mt-10 pt-6" style={{ borderTop: '1px solid #1a1a1a' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>&copy; 2025 Iron Horse Garage. All rights reserved.</span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>Serving Trail, Rossland &amp; the West Kootenays</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3" style={{ backgroundColor: 'rgba(17,17,17,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '2px solid #dc2626' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Like what you see? This could be yours. A sample by <strong className="text-white">Kootenay Made Digital</strong>
          </span>
          <Link href="/contact?style=automotive"
            className={`${heading.className} inline-block px-6 py-2.5 text-sm tracking-widest transition-all whitespace-nowrap`}
            style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(220,38,38,0.5)')}
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
