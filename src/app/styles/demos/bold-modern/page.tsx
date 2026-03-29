'use client'

import { useState } from 'react'
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

/* ── Before/After Slider ───────────────────────────────────── */
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative overflow-hidden rounded-lg select-none" style={{ height: '340px', border: '1px solid #222' }}>
      {/* AFTER side */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center" style={{ backgroundColor: '#111111' }}>
        <div className="w-16 h-1 mb-4" style={{ backgroundColor: '#ff6b00' }} />
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#ff6b00' }}>AFTER — VOLT ELECTRIC CO.</div>
        <div className="text-2xl md:text-3xl font-bold uppercase mb-3" style={{ color: '#ffffff' }}>POWERING THE KOOTENAYS</div>
        <div className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Bold headline · Clear services · Strong CTA · Designed to convert</div>
        <div className="inline-block px-6 py-2 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#ff6b00', color: '#111111' }}>GET A FREE QUOTE</div>
        <div className="absolute top-3 right-4 text-xs font-bold uppercase tracking-wider px-2 py-1" style={{ backgroundColor: '#ff6b00', color: '#111111' }}>AFTER</div>
      </div>
      {/* BEFORE side — clipped */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
        style={{
          backgroundColor: '#d1d5db',
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      >
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>VOLT ELECTRIC</div>
        <div className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#374151' }}>Welcome to Our Website</div>
        <div className="text-sm mb-4" style={{ color: '#6b7280' }}>We do electrical stuff. Call us maybe. Copyright 2009.</div>
        <div className="inline-block px-6 py-2 text-xs font-bold border border-gray-400" style={{ color: '#374151' }}>Contact Us</div>
        <div className="absolute top-3 left-4 text-xs font-bold uppercase tracking-wider px-2 py-1" style={{ backgroundColor: '#9ca3af', color: '#ffffff' }}>BEFORE</div>
      </div>
      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)', width: '3px', backgroundColor: '#ff6b00', pointerEvents: 'none' }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ff6b00', boxShadow: '0 0 16px rgba(255,107,0,0.5)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 3L2 8l3 5M11 3l3 5-3 5" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      {/* Range input (invisible, covers entire area) */}
      <input
        type="range" min={0} max={100} value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        aria-label="Before/After comparison slider"
        style={{ margin: 0 }}
      />
    </div>
  )
}

/* ── FAQ Accordion ─────────────────────────────────────────── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} style={{ backgroundColor: '#111111', borderTop: open === i ? '4px solid #ff6b00' : '4px solid #222', borderLeft: '1px solid #222', borderRight: '1px solid #222', borderBottom: '1px solid #222' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
            aria-expanded={open === i}
          >
            <span className="text-base font-bold uppercase tracking-wide" style={{ color: open === i ? '#ff6b00' : '#ffffff' }}>{item.q}</span>
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none"
              style={{ color: '#ff6b00', flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: prefersReduced ? 'none' : 'transform 0.3s ease' }}
            >
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
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
            <a href="tel:2505550180" className="text-sm font-bold uppercase tracking-wider" style={{ color: '#ff6b00' }}>
              (250) 555-0180
            </a>
          </div>
          <a href="tel:2505550180" className="md:hidden text-sm font-bold" style={{ color: '#ff6b00' }}>(250) 555-0180</a>
        </div>
      </nav>

      {/* ─── 2. HERO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex items-center" style={{ backgroundColor: '#111111' }}>
        <AngularDeco className="absolute top-10 right-10 opacity-60 hidden md:block" />
        <AngularDeco className="absolute bottom-32 right-1/4 opacity-40 rotate-180 hidden lg:block" />
        <DiamondDeco className="absolute top-1/3 right-20 opacity-50 hidden md:block" />
        <DiamondDeco className="absolute bottom-1/4 left-10 opacity-30" />
        <div className="absolute top-0 left-0 w-2 md:w-3" style={{ backgroundColor: '#ff6b00', height: '60%', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <div className="max-w-5xl">
            <motion.div className="w-24 h-1.5 mb-8" style={{ backgroundColor: '#ff6b00' }}
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
              <span style={{ color: '#ff6b00' }}>THE</span>{' '}KOOTENAYS
            </motion.h1>
            <motion.p className="text-lg md:text-xl max-w-xl mt-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Licensed electrical contractors serving residential and commercial clients across the West Kootenays.
            </motion.p>
            <motion.a href="#contact"
              className="inline-block mt-10 px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
              style={{ backgroundColor: '#ff6b00', color: '#111111', boxShadow: '0 0 0px rgba(255,107,0,0)' }}
              whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(255,107,0,0.5)', scale: 1.03 }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              GET A FREE QUOTE
            </motion.a>
          </div>
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
          {['\u2605\u2605\u2605\u2605\u2605 5.0 RATING', '20+ YEARS', 'LICENSED & INSURED', '24/7 EMERGENCY'].map((item) => (
            <span key={item} className="text-sm md:text-base font-bold uppercase tracking-wider whitespace-nowrap" style={{ color: '#111111' }}>{item}</span>
          ))}
        </div>
      </section>

      <SlashDivider topColor="#ff6b00" bottomColor="#0a0a0a" />

      {/* ─── 4. SERVICES ────────────────────────────────────── */}
      <section id="services" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">WHAT WE BUILD FOR YOU</h2>
            <div className="w-20 h-1.5 mb-8" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>

          {/* PAS Copy */}
          <Reveal delay={0.1}>
            <div className="mb-12 max-w-2xl">
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                You&rsquo;re building the future — but your website looks like 2015. Investors and clients notice. The electrical company down the road is showing up on Google and booking the commercial jobs. They&rsquo;re not better than you — they just look better online.{' '}
                <span style={{ color: '#ff6b00', fontWeight: 700 }}>Let&rsquo;s fix that.</span>
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'CUSTOM WEBSITE', desc: 'A bold online presence that matches your brand\'s energy and professionalism. From $1,500.' },
              { title: 'GOOGLE VISIBILITY', desc: 'Show up when people search for electrical services in the Kootenays. From $500.' },
              { title: 'SMART BUSINESS TOOLS', desc: 'Automate quoting, scheduling, and follow-ups. AI Business Setup for $1,500.' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <motion.div
                  className="p-8 h-full transition-all cursor-default"
                  style={{ backgroundColor: '#111111', borderTop: '4px solid #ff6b00', boxShadow: '0 0 0px rgba(255,107,0,0)' }}
                  whileHover={prefersReduced ? {} : { scale: 1.05, boxShadow: '0 0 30px rgba(255,107,0,0.5)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <h3 className="text-xl font-bold uppercase mb-4" style={{ color: '#ff6b00' }}>{card.title}</h3>
                  <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{card.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── HOW IT WORKS ───────────────────────────────────── */}
      <section className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <AngularDeco className="absolute top-8 right-8 opacity-30 hidden lg:block" />
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">HOW IT WORKS</h2>
            <div className="w-20 h-1.5" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              { step: '01', title: 'WE TALK', desc: 'Free consultation. You tell us what you need, your goals, your competition. No obligation, no pressure.' },
              { step: '02', title: 'WE BUILD', desc: 'We design and develop your site in ~2 weeks. You get a bold, fast, modern presence built to convert.' },
              { step: '03', title: 'YOU GROW', desc: 'Launch, get found on Google, start getting calls. Real results, not just a pretty website.' },
            ].map((step, i) => (
              <Reveal key={step.step} delay={i * 0.15}>
                <div className="relative p-8" style={{ backgroundColor: '#0a0a0a', borderTop: '4px solid #ff6b00' }}>
                  <div className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#ff6b00', opacity: 0.3 }}>{step.step}</div>
                  <h3 className="text-xl font-bold uppercase mb-3" style={{ color: '#ffffff' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── 5. GALLERY / SHOWCASE ──────────────────────────── */}
      <section id="projects" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <AngularDeco className="absolute top-8 right-8 opacity-40 hidden lg:block" />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">RECENT PROJECTS</h2>
            <div className="w-20 h-1.5 mb-12" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative w-full max-w-3xl mx-auto mb-12 overflow-hidden" style={{ borderBottom: '4px solid #ff6b00' }}>
              <Image src="/images/demos/bold-modern-showcase.webp" alt="Volt Electric Co. recent project showcase" width={800} height={500} className="w-full h-auto block" priority />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Commercial Wiring', 'Panel Upgrades', 'Smart Home', 'EV Charger Install'].map((label, i) => (
              <Reveal key={label} delay={0.1 + i * 0.1}>
                <div className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                  <Image src={`/images/demos/gallery/bm-${i + 1}.webp`} alt={label} fill className='object-cover' />
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                    <span className='text-white text-sm font-medium'>{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── BEFORE/AFTER ───────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">THE TRANSFORMATION</h2>
            <div className="w-20 h-1.5 mb-4" style={{ backgroundColor: '#ff6b00' }} />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Drag the slider to compare. This is what we do for businesses like yours.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfterSlider />
          </Reveal>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── TESTIMONIALS (3) ───────────────────────────────── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">WHAT CLIENTS SAY</h2>
            <div className="w-20 h-1.5" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'Our phones started ringing within two weeks of the new site going live. We had to hire a second crew. Best investment we ever made.', name: 'Jason M.', biz: 'JM Electrical Services', town: 'Castlegar' },
              { quote: 'We used to get zero calls from Google. Now we\'re booking 3–4 new jobs a week from people who found us online. Night and day difference.', name: 'Tyler K.', biz: 'Kootenay Power Solutions', town: 'Nelson' },
              { quote: 'The site looks exactly like our brand — bold, professional, no BS. Clients actually comment on it before we even start a job.', name: 'Marcus D.', biz: 'Volt & Watt Electric', town: 'Trail' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="p-8 h-full" style={{ backgroundColor: '#111111', borderTop: '4px solid #ff6b00' }}>
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => <span key={j} className="text-xl" style={{ color: '#ff6b00' }}>&#9733;</span>)}
                  </div>
                  <blockquote className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>&ldquo;{t.quote}&rdquo;</blockquote>
                  <p className="text-sm font-bold uppercase tracking-wider" style={{ color: '#ff6b00' }}>&mdash; {t.name}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.biz} &middot; {t.town}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4} className="mt-6">
            <p className="text-center text-xs italic" style={{ color: 'rgba(255,255,255,0.2)' }}>(Sample reviews &mdash; your real reviews go here)</p>
          </Reveal>
        </div>
      </section>

      <SlashDivider flip topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── FAQ ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">COMMON QUESTIONS</h2>
            <div className="w-20 h-1.5" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={[
              { q: 'How long does a website take?', a: 'Most sites are live within 2–3 weeks. We work fast without cutting corners. You\'ll have a working draft to review in the first week.' },
              { q: 'What if I already have a website?', a: 'We redesign it from scratch or rebuild on a better platform. Either way, you end up with something you\'re proud to send clients to.' },
              { q: 'Do I need to provide content?', a: 'Not necessarily. We write the copy, help with photos, and build out the structure. You just need to tell us about your business.' },
              { q: 'What does a new website cost?', a: 'Custom websites start from $1,500. Google Visibility packages from $500. Book a free consultation and we\'ll give you an exact quote for your needs.' },
              { q: 'Can I update it myself?', a: 'Yes. We build on platforms you can manage without needing a developer. We also offer maintenance packages if you\'d rather focus on the job.' },
              { q: 'Will it actually help me get more jobs?', a: 'That\'s the whole point. We build sites that show up on Google and convert visitors into calls. If that\'s not happening, something\'s wrong and we fix it.' },
            ]} />
          </Reveal>
        </div>
      </section>

      <SlashDivider topColor="#111111" bottomColor="#0a0a0a" />

      {/* ─── 7. ABOUT ───────────────────────────────────────── */}
      <section id="about" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <DiamondDeco className="absolute bottom-10 right-10 opacity-30 hidden md:block" />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">ABOUT VOLT ELECTRIC</h2>
            <div className="w-20 h-1.5 mb-10" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Volt Electric Co. is a family-owned electrical contracting company with over 20 years of experience serving the Kootenays. We specialize in both residential and commercial electrical work, from full home rewires and panel upgrades to commercial tenant improvements and new construction. Our reputation is built on honest pricing, fast response times, and quality workmanship that stands the test of time.
            </p>
          </Reveal>
        </div>
      </section>

      <SlashDivider topColor="#0a0a0a" bottomColor="#111111" />

      {/* ─── 8. CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">GET IN TOUCH</h2>
            <div className="w-20 h-1.5 mb-16" style={{ backgroundColor: '#ff6b00' }} />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div>
                <a href="tel:2505550180" className="block text-4xl md:text-5xl font-bold mb-6 transition-colors" style={{ color: '#ff6b00' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 20px rgba(255,107,0,0.5)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >(250) 555-0180</a>
                <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>EMAIL</span>info@voltelectric.ca</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>AVAILABILITY</span>24/7 Emergency Service</p>
                  <p className="text-lg"><span className="font-bold uppercase tracking-wider text-sm block mb-1" style={{ color: '#ff6b00' }}>SERVICE AREA</span>West Kootenays</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>NAME</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all" style={{ backgroundColor: '#111111', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>EMAIL</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all" style={{ backgroundColor: '#111111', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>MESSAGE</label>
                  <textarea rows={4} placeholder="Tell us about your project..." className="w-full px-4 py-3 text-white placeholder-white/30 outline-none transition-all resize-none" style={{ backgroundColor: '#111111', border: '1px solid #333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6b00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#333')} />
                </div>
                <motion.button type="submit" className="w-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all" style={{ backgroundColor: '#ff6b00', color: '#111111' }}
                  whileHover={prefersReduced ? {} : { boxShadow: '0 0 30px rgba(255,107,0,0.5)', scale: 1.02 }}>
                  SEND MESSAGE
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <SlashDivider flip topColor="#111111" bottomColor="#0d0d0d" />

      {/* ─── 9. FOOTER ──────────────────────────────────────── */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="text-xl font-bold uppercase tracking-tight block mb-3">VOLT ELECTRIC CO.</span>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Licensed electrical contractors serving the West Kootenays.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              {['SERVICES', 'ABOUT', 'PROJECTS', 'CONTACT'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium uppercase tracking-widest transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b00')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{link}</a>
              ))}
            </div>
          </div>
          <div className="mt-10 pt-6" style={{ borderTop: '1px solid #1a1a1a' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>&copy; 2025 Volt Electric Co. All rights reserved.</span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>Serving Nelson, Castlegar, Trail &amp; the West Kootenays</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── STICKY BOTTOM BAR ──────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3" style={{ backgroundColor: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '2px solid #ff6b00' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Like what you see? This could be yours. Design by <strong className="text-white">Kootenay Made Digital</strong></span>
            <span className="hidden sm:inline text-xs" style={{ color: 'rgba(255,107,0,0.5)' }}>·</span>
            <span className="text-xs font-bold" style={{ color: '#ff6b00' }}>(250) 555-0180</span>
          </div>
          <Link href="/contact?style=bold-modern"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{ backgroundColor: '#ff6b00', color: '#111111' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(255,107,0,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            Like What You See? Let's Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
