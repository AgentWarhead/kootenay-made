'use client'

import { useState } from 'react'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] })

/* ── Scroll-reveal wrapper ── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 32 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
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
    <div className="flex items-end gap-1.5" style={{ height: '130px' }} aria-hidden="true">
      {bars.map((bar, i) => (
        <div key={i} style={{ width: '8px', height: `${bar.minH}px`, background: '#e91e8a', boxShadow: '0 0 8px #e91e8a, 0 0 20px rgba(233,30,138,0.6)', borderRadius: '2px 2px 0 0', animation: prefersReduced ? 'none' : `${bar.keyframe} ${bar.duration} ease-in-out ${bar.delay} infinite` }} />
      ))}
    </div>
  )
}

/* ── Before/After Slider (neon style) ─────────────────────── */
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative overflow-hidden select-none rounded-lg" style={{ height: '340px', border: '1px solid rgba(233,30,138,0.25)' }}>
      {/* AFTER */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center" style={{ backgroundColor: '#111111' }}>
        <div className="text-xs font-bold uppercase tracking-[0.25em] mb-3 neon-heading-sm" style={{ color: '#e91e8a' }}>AFTER — NEON PINES</div>
        <div className={`${bebas.className} text-3xl md:text-4xl neon-heading-sm mb-3`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>WHERE THE MOUNTAINS ROCK</div>
        <div className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>Upcoming shows · Ticket sales · Fan following · Press kit</div>
        <div className="inline-block px-6 py-2 text-sm font-bold uppercase tracking-widest" style={{ backgroundColor: '#e91e8a', color: '#ffffff' }}>See Upcoming Shows</div>
        <div className="absolute top-3 right-4 text-xs font-bold uppercase px-2 py-1" style={{ backgroundColor: '#e91e8a', color: '#ffffff' }}>AFTER</div>
      </div>
      {/* BEFORE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
        style={{ backgroundColor: '#2a2a2a', clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>PINE RIDGE BAR & GRILL</div>
        <div className="text-2xl font-bold mb-3" style={{ color: '#9ca3af' }}>Live Music Sometimes</div>
        <div className="text-sm mb-5" style={{ color: '#6b7280' }}>Check Facebook for show dates maybe. No tickets online. Just show up.</div>
        <div className="inline-block px-6 py-2 text-sm font-bold border border-gray-600" style={{ color: '#9ca3af' }}>Find Us on Facebook</div>
        <div className="absolute top-3 left-4 text-xs font-bold uppercase px-2 py-1" style={{ backgroundColor: '#4b5563', color: '#ffffff' }}>BEFORE</div>
      </div>
      {/* Handle */}
      <div className="absolute top-0 bottom-0 z-10 flex items-center justify-center" style={{ left: `${pos}%`, transform: 'translateX(-50%)', width: '3px', backgroundColor: '#e91e8a', pointerEvents: 'none' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e91e8a', boxShadow: '0 0 16px rgba(233,30,138,0.6)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 3L2 8l3 5M11 3l3 5-3 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        aria-label="Before/After comparison slider" style={{ margin: 0 }} />
    </div>
  )
}

/* ── FAQ Accordion (neon style) ────────────────────────────── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg overflow-hidden" style={{ backgroundColor: '#111111', border: '1px solid rgba(233,30,138,0.2)', borderLeftWidth: open === i ? '4px' : '1px', borderLeftColor: open === i ? '#e91e8a' : 'rgba(233,30,138,0.2)' }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
            aria-expanded={open === i}>
            <span className={`${bebas.className} text-xl tracking-wider`} style={{ color: open === i ? '#e91e8a' : '#ffffff', letterSpacing: '0.04em' }}>{item.q}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
              style={{ color: '#e91e8a', flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: prefersReduced ? 'none' : 'transform 0.3s ease' }}>
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.a}</div>
          )}
        </div>
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
    <div className={dmSans.className} style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh' }}>
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
        .neon-heading { text-shadow: 0 0 20px #e91e8a, 0 0 40px #e91e8a, 0 0 80px rgba(233,30,138,0.5); }
        .neon-heading-sm { text-shadow: 0 0 10px #e91e8a, 0 0 25px rgba(233,30,138,0.6); }
        .neon-blue { text-shadow: 0 0 10px #3b82f6, 0 0 25px rgba(59,130,246,0.5); }
        .service-card { background: #111111; border-top: 3px solid #e91e8a; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .service-card:hover { transform: translateY(-6px); box-shadow: 0 0 24px rgba(233,30,138,0.25), 0 0 48px rgba(233,30,138,0.1); }
        .event-row { border-bottom: 1px solid rgba(233,30,138,0.15); transition: background 0.2s ease; }
        .event-row:hover { background: rgba(233,30,138,0.06); }
        .gradient-mesh { background: radial-gradient(ellipse 55% 45% at 15% 40%, rgba(233,30,138,0.14) 0%, transparent 65%), radial-gradient(ellipse 45% 55% at 85% 55%, rgba(59,130,246,0.14) 0%, transparent 65%), radial-gradient(ellipse 35% 35% at 50% 95%, rgba(233,30,138,0.08) 0%, transparent 55%); }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav className="sticky top-0 z-50 px-6 md:px-12 py-4"
        style={{ backgroundColor: '#000000', borderBottom: '1px solid rgba(233,30,138,0.2)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/styles/demos/music-entertainment" className={`${bebas.className} text-2xl md:text-3xl tracking-widest neon-heading-sm`} style={{ color: '#e91e8a', letterSpacing: '0.12em' }}>NEON PINES</Link>
          <div className="hidden md:flex items-center gap-8">
            {['Shows', 'Venue', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium uppercase tracking-widest transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e91e8a')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>{item}</a>
            ))}
            <a href="tel:2505550114" className="text-sm font-bold tracking-wider transition-colors duration-200" style={{ color: '#e91e8a' }}
              onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 10px #e91e8a')}
              onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}>(250) 555-0114</a>
          </div>
          <a href="tel:2505550114" className="md:hidden text-sm font-bold" style={{ color: '#e91e8a' }}>(250) 555-0114</a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <Image src="/images/demos/music-entertainment-hero.webp" alt="Neon Pines Music Venue — live music in Nelson BC" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-0" style={{ flex: 1 }}>
          <motion.p className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Live Music &middot; Nelson, BC
          </motion.p>
          <motion.h1 className={`${bebas.className} neon-heading`}
            style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)', lineHeight: 1, color: '#ffffff', letterSpacing: '0.04em', marginBottom: '1.5rem', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 40 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
            WHERE THE<br /><span style={{ color: '#e91e8a' }}>MOUNTAINS ROCK</span>
          </motion.h1>
          <motion.p className="text-base md:text-lg font-normal max-w-xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
            The Kootenays&apos; premier live music venue. Intimate shows, legendary nights, all in the heart of Nelson.
          </motion.p>
          <motion.div initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <a href="#shows" className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300" style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.14em' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d6187e'; e.currentTarget.style.boxShadow = '0 0 30px rgba(233,30,138,0.55)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e91e8a'; e.currentTarget.style.boxShadow = 'none' }}>
              See Upcoming Shows
            </a>
          </motion.div>
        </div>
        <div className="relative z-10 flex justify-center pb-10 pt-12"><AudioVisualizer /></div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div className="py-5 px-6" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(233,30,138,0.2)', borderBottom: '1px solid rgba(233,30,138,0.2)' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-5 md:gap-10 text-sm font-medium">
          <span className="flex items-center gap-2"><span style={{ color: '#e91e8a', fontSize: '1rem' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span><span style={{ color: '#ffffff' }}>4.9 Rating</span></span>
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
          <Reveal className="text-center mb-8">
            <p className={`${bebas.className} text-sm tracking-[0.25em] mb-3 neon-blue`} style={{ color: '#3b82f6' }}>AMPLIFY YOUR PRESENCE</p>
            <h2 className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>Digital Services</h2>
          </Reveal>

          {/* PAS Copy */}
          <Reveal delay={0.1} className="text-center mb-14">
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Fans can&apos;t find your next show and venues can&apos;t find your press kit. The band down the road is selling out because people can actually find them online. You&apos;re not less talented — you&apos;re just less visible.{' '}
              <span style={{ color: '#e91e8a', fontWeight: 700 }}>We fix that.</span>
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Custom Website', desc: 'Tickets, events, merch — all in one place. A site as electric as your shows, built to sell out every night. From $1,500.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id="sg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e91e8a" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs><rect x="2" y="3" width="20" height="14" rx="2" stroke="url(#sg1)" strokeWidth="1.5" /><line x1="8" y1="21" x2="16" y2="21" stroke="url(#sg1)" strokeWidth="1.5" strokeLinecap="round" /><line x1="12" y1="17" x2="12" y2="21" stroke="url(#sg1)" strokeWidth="1.5" strokeLinecap="round" /></svg> },
              { title: 'Social Media', desc: 'Build a following that shows up every weekend. Behind-the-scenes content, show announcements, artist spotlights. Full Brand from $4,000.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id="sg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e91e8a" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs><circle cx="18" cy="5" r="3" stroke="url(#sg2)" strokeWidth="1.5" /><circle cx="6" cy="12" r="3" stroke="url(#sg2)" strokeWidth="1.5" /><circle cx="18" cy="19" r="3" stroke="url(#sg2)" strokeWidth="1.5" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="url(#sg2)" strokeWidth="1.5" strokeLinecap="round" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="url(#sg2)" strokeWidth="1.5" strokeLinecap="round" /></svg> },
              { title: 'Email Marketing', desc: 'Your fans want to know about every show. Make sure they do. Newsletter campaigns that fill the room. From $750.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id="sg3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e91e8a" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs><rect x="2" y="4" width="20" height="16" rx="2" stroke="url(#sg3)" strokeWidth="1.5" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="url(#sg3)" strokeWidth="1.5" strokeLinecap="round" /></svg> },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.12}>
                <div className="service-card rounded-lg p-8 h-full">
                  <div className="mb-5">{card.icon}</div>
                  <h3 className={`${bebas.className} text-2xl md:text-3xl mb-3`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`${bebas.className} text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>THE PROCESS</p>
            <h2 className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>How It Works</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'WE TALK', desc: 'Free consultation. You tell us your sound, your vibe, your fans. We figure out the best way to get you seen.' },
              { num: '02', title: 'WE BUILD', desc: 'We design and build your site in ~2 weeks. Event calendar, ticket links, press kit, streaming, merch — all wired up.' },
              { num: '03', title: 'YOU GROW', desc: 'Launch, get found, sell out shows. Venues book you easier. Fans actually know when you\'re playing.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.15}>
                <div className="relative p-8 rounded-lg" style={{ backgroundColor: '#111111', borderTop: '3px solid #e91e8a' }}>
                  <div className={`${bebas.className} text-5xl mb-4`} style={{ color: '#e91e8a', opacity: 0.3, letterSpacing: '0.04em' }}>{step.num}</div>
                  <h3 className={`${bebas.className} text-2xl mb-3`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. UPCOMING SHOWS ═══════════ */}
      <section id="shows" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`${bebas.className} text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>ON STAGE</p>
            <h2 className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>Upcoming Shows</h2>
          </Reveal>
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(233,30,138,0.2)' }}>
            <div className="flex items-center px-6 py-3 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#111111', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em' }}>
              <span className="w-44 md:w-52 shrink-0">Date &amp; Time</span>
              <span className="flex-1">Artist</span>
              <span className="w-16 text-right">Price</span>
            </div>
            {events.map((ev, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="event-row flex items-center px-6 py-5 gap-4">
                  <div className="w-44 md:w-52 shrink-0">
                    <div className={`${bebas.className} text-lg md:text-xl tracking-wider`} style={{ color: '#e91e8a', letterSpacing: '0.08em' }}>{ev.day}</div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{ev.time} &mdash; Doors open 30 min before</div>
                  </div>
                  <div className="hidden md:block w-8 h-px shrink-0" style={{ backgroundColor: 'rgba(233,30,138,0.4)' }} />
                  <div className="flex-1"><span className="text-base md:text-lg font-bold" style={{ color: '#ffffff' }}>{ev.artist}</span></div>
                  <div className="w-16 text-right text-sm font-bold" style={{ color: ev.price === 'Free' ? '#3b82f6' : '#e91e8a' }}>{ev.price}</div>
                  <a href="#contact" className="hidden md:inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 transition-all duration-200 shrink-0" style={{ border: '1px solid rgba(233,30,138,0.4)', color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e91e8a'; e.currentTarget.style.color = '#e91e8a' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(233,30,138,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}>
                    Tickets
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`${bebas.className} text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>THE EXPERIENCE</p>
            <h2 className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>Past Shows</h2>
          </Reveal>
          <Reveal delay={0.1} className="mb-8 flex justify-center">
            <div className="overflow-hidden w-full max-w-4xl rounded-lg" style={{ border: '1px solid rgba(233,30,138,0.25)' }}>
              <Image src="/images/demos/music-entertainment-showcase.webp" alt="Neon Pines — live show showcase" width={960} height={520} className="w-full h-auto block" style={{ objectFit: 'cover' }} />
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {[{ label: 'Main Stage', img: '/images/demos/gallery/me-1.webp' }, { label: 'Intimate Sets', img: '/images/demos/gallery/me-2.webp' }, { label: 'Private Events', img: '/images/demos/gallery/me-3.webp' }].map(({ label, img }, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={img} alt={label} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-sm font-medium">{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BEFORE/AFTER ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className={`${bebas.className} text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>THE DIFFERENCE</p>
            <h2 className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>Before &amp; After</h2>
            <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Drag the slider. This is what a real digital presence looks like.</p>
          </Reveal>
          <Reveal delay={0.1}><BeforeAfterSlider /></Reveal>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS (3) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`${bebas.className} text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>THE CROWD SPEAKS</p>
            <h2 className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>What They Say</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'We went from playing to 30 people to selling out 200-cap rooms in six months. Having a real website and show calendar made all the difference.', name: 'Jake R.', biz: 'Mountain Echo Band', town: 'Nelson' },
              { quote: 'Neon Pines asked for our press kit and it was on our site in five seconds. They booked us for three shows that month. Venues notice professionalism.', name: 'The Drift', biz: 'Touring Band', town: 'Fernie' },
              { quote: 'I used to do all our marketing on Facebook. Now our site handles it — email list, show announcements, ticket links. Our advance sales tripled.', name: 'Carla M.', biz: 'Cedar Smoke Promotions', town: 'Revelstoke' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="rounded-lg px-8 py-10 h-full" style={{ backgroundColor: '#111111', borderLeft: '4px solid #e91e8a', border: '1px solid rgba(233,30,138,0.2)', borderLeftWidth: '4px', borderLeftColor: '#e91e8a' }}>
                  <div className="text-xl mb-5" style={{ color: '#e91e8a' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <blockquote className="text-base leading-relaxed mb-5 italic" style={{ color: 'rgba(255,255,255,0.8)' }}>&ldquo;{t.quote}&rdquo;</blockquote>
                  <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#e91e8a' }}>&mdash; {t.name}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{t.biz} &middot; {t.town}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4} className="mt-6">
            <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>(Sample reviews &mdash; your real reviews go here)</p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`${bebas.className} text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>GOT QUESTIONS</p>
            <h2 className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>FAQ</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={[
              { q: 'How long does a website take?', a: '2–3 weeks from our first conversation to launch. We build fast without cutting corners — you\'ll have something to review in week one.' },
              { q: 'Can it handle event calendars and ticket links?', a: 'Yes. We integrate event calendars, Eventbrite, ticketing platforms, streaming links, and merch shops. One place for everything.' },
              { q: 'What if I already have a website?', a: 'We rebuild it properly. Your old site stays up until the new one is ready, so you never go dark.' },
              { q: 'Can venues and promoters find a press kit on my site?', a: 'Absolutely. We build a dedicated press/booking page with photos, bio, tech rider, and booking contact. Venues love this.' },
              { q: 'What does it cost?', a: 'Custom websites start from $1,500. Full brand packages from $4,000. Book a free consultation for an exact quote.' },
              { q: 'Do I need social media too?', a: 'Your website is your home base. Social drives people there. We can help with both or just the site — whatever fits your budget.' },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. ABOUT ═══════════ */}
      <section id="about" className="relative py-20 md:py-28 px-6 gradient-mesh overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,138,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '5%', right: '-10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <p className={`${bebas.className} text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>OUR STORY</p>
            <h2 className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm mb-8`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>About Neon Pines</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Neon Pines opened in Nelson, BC in 2016 with one mission: to give live music a home in the mountains. What started as a modest stage in an old brick building has grown into the Kootenays&apos; most beloved venue.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              With a capacity of 200 and acoustics that punch way above their weight, we offer an intimate show experience unlike anything you will find in a large city. All ages are welcome, the bar is cold, and the music is always loud.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <div className="flex justify-center gap-10">
              {[{ value: '200+', label: 'Shows Per Year' }, { value: '200', label: 'Capacity' }, { value: '10', label: 'Years Running' }].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`${bebas.className} text-4xl md:text-5xl neon-heading-sm`} style={{ color: '#e91e8a', letterSpacing: '0.04em' }}>{stat.value}</div>
                  <div className="text-xs font-medium uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className={`${bebas.className} text-sm tracking-[0.25em] mb-3`} style={{ color: '#e91e8a' }}>GET IN TOUCH</p>
            <h2 className={`${bebas.className} text-4xl md:text-6xl neon-heading-sm`} style={{ color: '#ffffff', letterSpacing: '0.04em' }}>Contact &amp; Booking</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div className="space-y-7">
                {[{ label: 'Phone', val: '(250) 555-0114', href: 'tel:2505550114' }, { label: 'Email', val: 'info@neonpines.ca', href: 'mailto:info@neonpines.ca' }, { label: 'Capacity', val: '200 Guests — All Ages', href: null }, { label: 'Location', val: 'Nelson, BC, Canada', href: null }].map((item) => (
                  <div key={item.label}>
                    <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>{item.label}</h3>
                    {item.href ? <a href={item.href} className="text-base font-medium transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e91e8a')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>{item.val}</a> : <p className="text-base font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{item.val}</p>}
                  </div>
                ))}
                <a href="mailto:info@neonpines.ca" className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 mt-2" style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.14em' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d6187e'; e.currentTarget.style.boxShadow = '0 0 28px rgba(233,30,138,0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e91e8a'; e.currentTarget.style.boxShadow = 'none' }}>
                  Book the Venue
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                {[{ label: 'Name', type: 'text', placeholder: 'Your name' }, { label: 'Email', type: 'email', placeholder: 'you@example.com' }, { label: 'Phone', type: 'tel', placeholder: '(250) 555-0000' }].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} className="w-full px-4 py-3 text-sm outline-none transition-all" style={{ backgroundColor: '#111111', border: '1px solid rgba(233,30,138,0.2)', color: '#ffffff', borderRadius: '4px' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#e91e8a')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(233,30,138,0.2)')} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#e91e8a' }}>Message</label>
                  <textarea rows={4} placeholder="Tell us about your event or inquiry..." className="w-full px-4 py-3 text-sm outline-none resize-none transition-all" style={{ backgroundColor: '#111111', border: '1px solid rgba(233,30,138,0.2)', color: '#ffffff', borderRadius: '4px' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#e91e8a')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(233,30,138,0.2)')} />
                </div>
                <button type="submit" className="w-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300" style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.14em', borderRadius: '4px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d6187e'; e.currentTarget.style.boxShadow = '0 0 24px rgba(233,30,138,0.45)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e91e8a'; e.currentTarget.style.boxShadow = 'none' }}>
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(233,30,138,0.15)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className={`${bebas.className} text-3xl tracking-widest neon-heading-sm mb-2`} style={{ color: '#e91e8a', letterSpacing: '0.12em' }}>NEON PINES</div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Where the mountains rock.<br />Nelson, BC.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#e91e8a' }}>Quick Links</h4>
              <div className="flex flex-col gap-2.5">
                {['Shows', 'Venue', 'About', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#e91e8a')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#e91e8a' }}>Info</h4>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Nelson, BC, Canada</p>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>(250) 555-0114</p>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>info@neonpines.ca</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Capacity: 200 &middot; All Ages</p>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(233,30,138,0.1)' }}>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>&copy; {new Date().getFullYear()} Neon Pines Music Venue. All rights reserved.</span>
            <span className="text-xs" style={{ color: 'rgba(233,30,138,0.4)' }}>Est. 2016 &middot; Nelson, BC</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{ backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderTop: '1px solid rgba(233,30,138,0.25)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Sample design by <strong style={{ color: '#ffffff' }}>Kootenay Made Digital</strong></span>
            <span className="hidden sm:inline text-xs" style={{ color: 'rgba(233,30,138,0.4)' }}>·</span>
            <span className="text-xs font-bold" style={{ color: '#e91e8a' }}>(250) 555-0114</span>
          </div>
          <Link href="/contact?style=music-entertainment"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap"
            style={{ backgroundColor: '#e91e8a', color: '#ffffff', letterSpacing: '0.12em' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d6187e'; e.currentTarget.style.boxShadow = '0 0 20px rgba(233,30,138,0.5)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e91e8a'; e.currentTarget.style.boxShadow = 'none' }}>
            Get Your Free Mockup &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
