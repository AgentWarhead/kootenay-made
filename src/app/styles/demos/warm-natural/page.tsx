'use client'

import { useState } from 'react'
import { Lora, Nunito } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

const lora = Lora({ subsets: ['latin'], weight: ['400', '700'] })
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600'] })

/* ── Floating botanical SVG leaves ── */
function LeafOne() {
  return (
    <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C16 0 2 16 2 28C2 38 8 46 16 48C24 46 30 38 30 28C30 16 16 0 16 0Z" fill="#7d9a6b" opacity="0.18" />
      <path d="M16 6V44" stroke="#7d9a6b" strokeWidth="0.8" opacity="0.22" />
    </svg>
  )
}
function LeafTwo() {
  return (
    <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="14" cy="20" rx="12" ry="18" fill="#d4a574" opacity="0.14" />
      <path d="M14 4V36" stroke="#d4a574" strokeWidth="0.6" opacity="0.2" />
    </svg>
  )
}
function LeafThree() {
  return (
    <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C6 8 0 16 2 24C4 32 10 36 12 36C14 36 20 32 22 24C24 16 18 8 12 0Z" fill="#7d9a6b" opacity="0.15" />
    </svg>
  )
}
function LeafFour() {
  return (
    <svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4 10 0 18 3 24C6 30 10 32 10 32C10 32 14 30 17 24C20 18 16 10 10 0Z" fill="#d4a574" opacity="0.12" />
      <path d="M10 4V28" stroke="#d4a574" strokeWidth="0.5" opacity="0.18" />
    </svg>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

function Section({ children, className, style, id }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; id?: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.section id={id} className={className} style={style}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
    >{children}</motion.section>
  )
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >{children}</motion.div>
  )
}

const botanicalKeyframes = `
@keyframes floatA { 0%,100% { transform:translateY(0px) rotate(0deg); } 50% { transform:translateY(-18px) rotate(6deg); } }
@keyframes floatB { 0%,100% { transform:translateY(0px) rotate(0deg); } 50% { transform:translateY(-14px) rotate(-5deg); } }
@keyframes floatC { 0%,100% { transform:translateY(0px) rotate(0deg); } 50% { transform:translateY(-22px) rotate(8deg); } }
@keyframes floatD { 0%,100% { transform:translateY(0px) rotate(0deg); } 50% { transform:translateY(-10px) rotate(-4deg); } }
@media (prefers-reduced-motion: reduce) { .botanical-float { animation: none !important; } }
`

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="#d4a574">
      <path d="M10 1l2.47 5.01L18 6.94l-4 3.9.94 5.5L10 13.77l-4.94 2.6.94-5.5-4-3.9 5.53-.93L10 1z" />
    </svg>
  )
}

/* ── Before/After Slider (warm style) ─────────────────────── */
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative overflow-hidden select-none" style={{ height: '320px', borderRadius: '55% 45% 50% 50% / 45% 50% 50% 55%', boxShadow: '0 8px 40px rgba(139, 115, 85, 0.15)' }}>
      {/* AFTER */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center" style={{ backgroundColor: '#faf6f0' }}>
        <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7d9a6b' }}>AFTER — MOUNTAIN FLOW WELLNESS</div>
        <div className={`${lora.className} text-2xl font-bold italic mb-3`} style={{ color: '#8b7355' }}>Find Your Balance</div>
        <div className="text-sm mb-4" style={{ color: '#8b7355', opacity: 0.7 }}>Warm, professional, bookings-ready. Clients feel at ease before they walk in the door.</div>
        <div className="inline-block px-6 py-2 text-sm font-semibold text-white" style={{ backgroundColor: '#7d9a6b', borderRadius: '30px' }}>Book Your Session</div>
        <div className="absolute top-4 right-5 text-xs font-semibold px-2 py-1 text-white" style={{ backgroundColor: '#7d9a6b', borderRadius: '20px' }}>AFTER</div>
      </div>
      {/* BEFORE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
        style={{ backgroundColor: '#e5e7eb', clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#9ca3af' }}>HARMONY WELLNESS</div>
        <div className="text-2xl font-bold mb-3" style={{ color: '#374151' }}>Welcome To Our Site</div>
        <div className="text-sm mb-4" style={{ color: '#6b7280' }}>We offer yoga and massage. Please call to book. Site last updated: 2017.</div>
        <div className="inline-block px-6 py-2 text-sm font-bold border border-gray-400" style={{ color: '#374151' }}>Call Us</div>
        <div className="absolute top-4 left-5 text-xs font-semibold px-2 py-1 text-white" style={{ backgroundColor: '#9ca3af', borderRadius: '20px' }}>BEFORE</div>
      </div>
      {/* Handle */}
      <div className="absolute top-0 bottom-0 z-10 flex items-center justify-center" style={{ left: `${pos}%`, transform: 'translateX(-50%)', width: '3px', backgroundColor: '#7d9a6b', pointerEvents: 'none' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7d9a6b', boxShadow: '0 0 16px rgba(125,154,107,0.5)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 3L2 8l3 5M11 3l3 5-3 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        aria-label="Before/After comparison slider" style={{ margin: 0 }} />
    </div>
  )
}

/* ── FAQ Accordion (warm style) ────────────────────────────── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.2)', borderRadius: '25px 20px 22px 28px / 20px 28px 22px 25px', overflow: 'hidden' }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
            aria-expanded={open === i}>
            <span className={`${lora.className} text-base font-bold`} style={{ color: open === i ? '#7d9a6b' : '#8b7355' }}>{item.q}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
              style={{ color: '#7d9a6b', flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: prefersReduced ? 'none' : 'transform 0.3s ease' }}>
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#8b7355', opacity: 0.8 }}>{item.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MOUNTAIN FLOW WELLNESS — Warm Natural Demo
   ══════════════════════════════════════════════════════════════ */
export default function WarmNaturalDemo() {
  const prefersReduced = useReducedMotion()

  const services = [
    {
      title: 'Custom Website',
      desc: 'A beautiful, calming website that reflects your wellness practice and invites new clients. From $1,500.',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#7d9a6b" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      ),
    },
    {
      title: 'Google Visibility',
      desc: 'Show up when people search for wellness and healing in the Kootenays. Google Domination from $500.',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#7d9a6b" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      ),
    },
    {
      title: 'Email Marketing',
      desc: 'Stay in touch with clients without lifting a finger. Class updates, seasonal offers, done. From $750.',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#7d9a6b" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      ),
    },
  ]

  return (
    <div className={nunito.className} style={{ fontFamily: 'Nunito, sans-serif', color: '#8b7355' }}>
      <style dangerouslySetInnerHTML={{ __html: botanicalKeyframes }} />

      {/* Watercolor blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl" style={{ backgroundColor: '#7d9a6b', opacity: 0.1 }} />
        <div className="absolute top-1/4 -right-60 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: '#d4a574', opacity: 0.1 }} />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl" style={{ backgroundColor: '#7d9a6b', opacity: 0.08 }} />
        <div className="absolute -bottom-40 right-1/4 w-[350px] h-[350px] rounded-full blur-3xl" style={{ backgroundColor: '#d4a574', opacity: 0.08 }} />
      </div>

      {/* Floating botanicals */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
        <div className="botanical-float absolute top-[12%] left-[8%]" style={{ animation: prefersReduced ? 'none' : 'floatA 15s ease-in-out infinite' }}><LeafOne /></div>
        <div className="botanical-float absolute top-[30%] right-[6%]" style={{ animation: prefersReduced ? 'none' : 'floatB 20s ease-in-out infinite' }}><LeafTwo /></div>
        <div className="botanical-float absolute top-[55%] left-[4%]" style={{ animation: prefersReduced ? 'none' : 'floatC 25s ease-in-out infinite' }}><LeafThree /></div>
        <div className="botanical-float absolute top-[75%] right-[10%]" style={{ animation: prefersReduced ? 'none' : 'floatD 18s ease-in-out infinite' }}><LeafFour /></div>
      </div>

      <div className="relative z-10">
        {/* ── NAV ── */}
        <nav className="px-6 py-4" style={{ backgroundColor: 'rgba(250,246,240,0.92)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className={`${lora.className} text-xl md:text-2xl font-bold`} style={{ color: '#8b7355', fontStyle: 'italic', letterSpacing: '0.03em' }}>Mountain Flow Wellness</span>
            <div className="hidden md:flex items-center gap-8">
              {['Services', 'About', 'Our Space', 'Contact'].map((label) => (
                <a key={label} href={`#${label.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm transition-colors" style={{ color: '#8b7355' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#7d9a6b')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#8b7355')}>{label}</a>
              ))}
              <span className="text-sm font-semibold" style={{ color: '#7d9a6b' }}>(250) 555-0165</span>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#faf6f0' }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(125,154,107,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, rgba(212,165,116,0.1) 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(125,154,107,0.08) 0%, transparent 50%)' }} />
          </div>
          <motion.div className="relative max-w-3xl mx-auto text-center px-6 py-28 md:py-40"
            initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}>
            <h1 className={`${lora.className} text-5xl md:text-7xl font-bold leading-tight mb-6`} style={{ color: '#8b7355' }}>Find Your Balance</h1>
            <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: '#8b7355', opacity: 0.75 }}>
              A holistic wellness sanctuary in the heart of Nelson, offering yoga, massage therapy, and mindful healing.
            </p>
            <a href="#contact" className="inline-block px-10 py-4 text-white font-semibold text-sm rounded-full transition-all hover:shadow-lg"
              style={{ backgroundColor: '#7d9a6b', boxShadow: '0 4px 20px rgba(125,154,107,0.3)' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
              Book Your Session
            </a>
          </motion.div>
        </section>

        {/* ── TRUST BAR ── */}
        <Section style={{ backgroundColor: '#d4a574' }} className="py-5 px-6">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold" style={{ color: '#8b7355' }}>
            <span className="flex items-center gap-1"><span style={{ color: '#faf6f0' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span><span style={{ color: '#faf6f0' }}>4.9 Rating</span></span>
            <span style={{ color: '#faf6f0', opacity: 0.5 }}>&#183;</span>
            <span style={{ color: '#faf6f0' }}>10+ Years</span>
            <span style={{ color: '#faf6f0', opacity: 0.5 }}>&#183;</span>
            <span style={{ color: '#faf6f0' }}>Certified Practitioner</span>
            <span style={{ color: '#faf6f0', opacity: 0.5 }}>&#183;</span>
            <span style={{ color: '#faf6f0' }}>Welcoming New Clients</span>
          </div>
        </Section>

        {/* ── SERVICES ── */}
        <Section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf6f0' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`${lora.className} text-3xl md:text-4xl font-bold text-center mb-4`} style={{ color: '#8b7355' }}>Our Offerings</h2>

            {/* PAS Copy */}
            <Reveal delay={0.05}>
              <div className="max-w-2xl mx-auto text-center mb-8">
                <p className="text-base md:text-lg leading-relaxed" style={{ color: '#8b7355', opacity: 0.85 }}>
                  Your healing practice deserves better than a free Wix site that screams amateur. Your clients are seeking trust and serenity before they even walk in. The wellness studio across town is fully booked every week — not because they&rsquo;re better, but because their online presence reflects the care they give.{' '}
                  <span style={{ color: '#7d9a6b', fontWeight: 600 }}>Let&rsquo;s make yours feel that way too.</span>
                </p>
              </div>
            </Reveal>

            <p className="text-center mb-16 max-w-md mx-auto" style={{ color: '#8b7355', opacity: 0.6 }}>Digital support designed with the same care you give your clients</p>
            <motion.div className="grid md:grid-cols-3 gap-8"
              initial={prefersReduced ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}>
              {services.map((card) => (
                <motion.div key={card.title} variants={fadeUp} className="relative p-8 text-center transition-shadow hover:shadow-xl"
                  style={{ backgroundColor: '#fffcf7', borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%', boxShadow: '0 4px 24px rgba(139,115,85,0.08)', padding: '3rem 2rem' }}>
                  <div className="flex justify-center mb-5">{card.icon}</div>
                  <h3 className={`${lora.className} text-xl font-bold mb-3`} style={{ color: '#8b7355' }}>{card.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: '#8b7355', opacity: 0.7 }}>{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* ── HOW IT WORKS ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #faf6f0, #f5f0e8)' }} />
        <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`${lora.className} text-3xl md:text-4xl font-bold text-center mb-4`} style={{ color: '#8b7355' }}>How It Works</h2>
            <p className="text-center mb-16 max-w-md mx-auto text-sm" style={{ color: '#8b7355', opacity: 0.6 }}>Simple, gentle, no pressure. Just like your practice.</p>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { num: '1', title: 'We Talk', desc: 'Free consultation — you share your vision for your practice and what your clients need to feel before they even book.' },
                { num: '2', title: 'We Build', desc: 'We design a warm, beautiful site in ~2 weeks. You approve every step. No surprises, no stress.' },
                { num: '3', title: 'You Grow', desc: 'Launch, get found on Google, and watch bookings fill up. Your clients find you. Your calendar fills.' },
              ].map((step, i) => (
                <Reveal key={step.num} delay={i * 0.15}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#7d9a6b', boxShadow: '0 4px 20px rgba(125,154,107,0.25)' }}>
                      <span className={`${lora.className} text-2xl font-bold text-white`}>{step.num}</span>
                    </div>
                    <h3 className={`${lora.className} text-xl font-bold mb-3`} style={{ color: '#8b7355' }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#8b7355', opacity: 0.7 }}>{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ── GALLERY ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #f5f0e8, #f7f2ea)' }} />
        <Section id="our-space" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f7f2ea' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`${lora.className} text-3xl md:text-4xl font-bold text-center mb-16`} style={{ color: '#8b7355' }}>Our Space</h2>
            <div className="flex justify-center mb-12">
              <div style={{ borderRadius: '55% 45% 50% 50% / 45% 50% 50% 55%', overflow: 'hidden', boxShadow: '0 8px 40px rgba(139,115,85,0.15)' }}>
                <Image src="/images/demos/warm-natural-showcase.webp" alt="Mountain Flow Wellness space" width={800} height={500} className="block" style={{ objectFit: 'cover' }} priority />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Yoga Studio', 'Treatment Room', 'Meditation Garden', 'Welcome Area'].map((label, i) => (
                <div key={label} className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                  <Image src={`/images/demos/gallery/wn-${i + 1}.webp`} alt={label} fill className='object-cover' />
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                    <span className='text-white text-sm font-medium'>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── BEFORE/AFTER ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #f7f2ea, #faf6f0)' }} />
        <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf6f0' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className={`${lora.className} text-3xl md:text-4xl font-bold text-center mb-4`} style={{ color: '#8b7355' }}>The Difference</h2>
            <p className="text-center mb-12 text-sm" style={{ color: '#8b7355', opacity: 0.6 }}>Drag the slider. This is what we do for wellness practices like yours.</p>
            <BeforeAfterSlider />
          </div>
        </Section>

        {/* ── TESTIMONIALS (3) ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #faf6f0, #f5f0e8)' }} />
        <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`${lora.className} text-3xl md:text-4xl font-bold text-center mb-4`} style={{ color: '#8b7355' }}>From Our Community</h2>
            <p className="text-center mb-16 text-sm" style={{ color: '#8b7355', opacity: 0.6 }}>Real practices. Real results.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: 'Bookings doubled in the first month. Clients tell me they booked because the website made them feel calm and safe before they even met me.', name: 'Sarah L.', biz: 'Roots & Restore Yoga', town: 'Nelson' },
                { quote: 'My old website was embarrassing to share. Now I send it to every potential client with pride. We\'re fully booked three weeks out.', name: 'Priya M.', biz: 'Kootenay Mindful Massage', town: 'Kaslo' },
                { quote: 'I finally found us on Google! Before, nobody could find our studio unless they already knew us. Now new clients call us every week.', name: 'Trish B.', biz: 'Mountain Sage Wellness', town: 'Nakusp' },
              ].map((t, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <div className="p-8 text-center" style={{ backgroundColor: '#fffcf7', borderRadius: '55% 45% 50% 50% / 45% 50% 50% 55%', boxShadow: '0 4px 24px rgba(139,115,85,0.08)', padding: '2.5rem 2rem' }}>
                    <div className="flex justify-center gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} />)}</div>
                    <blockquote className="text-sm leading-relaxed mb-5" style={{ color: '#8b7355' }}>&ldquo;{t.quote}&rdquo;</blockquote>
                    <p className={`${lora.className} font-bold text-sm`} style={{ color: '#8b7355' }}>&mdash; {t.name}</p>
                    <p className="text-xs mt-1" style={{ color: '#8b7355', opacity: 0.5 }}>{t.biz} &middot; {t.town}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.4} className="mt-8">
              <p className="text-center text-xs italic" style={{ color: '#8b7355', opacity: 0.35 }}>(Sample reviews &mdash; your real reviews go here)</p>
            </Reveal>
          </div>
        </Section>

        {/* ── FAQ ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #f5f0e8, #faf6f0)' }} />
        <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf6f0' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className={`${lora.className} text-3xl md:text-4xl font-bold text-center mb-4`} style={{ color: '#8b7355' }}>Questions & Answers</h2>
            <p className="text-center mb-12 text-sm" style={{ color: '#8b7355', opacity: 0.6 }}>Everything you need to know before we begin.</p>
            <FAQAccordion items={[
              { q: 'How long does a website take?', a: 'About 2–3 weeks from our first conversation to launch. We work thoughtfully and keep you involved at every step — no surprises.' },
              { q: 'Can it connect to my booking system?', a: 'Yes. We integrate with Jane App, Mindbody, Acuity, Calendly, and most booking platforms so clients can book directly from your site.' },
              { q: 'What if I already have a website?', a: 'We redesign it to reflect who you actually are — warm, professional, and trustworthy. You keep your URL and don\'t lose anything.' },
              { q: 'Do I need to write the content myself?', a: 'Not at all. We have a gentle intake process to learn your story, then we write the words. You review, we refine.' },
              { q: 'What does it cost?', a: 'Custom wellness websites start from $1,500. A full brand package starts from $4,000. Book a free consultation to discuss what\'s right for your practice.' },
              { q: 'Will my site reflect the calming feeling of my practice?', a: 'That\'s our specialty. Every colour, font, and word is chosen to make visitors feel at ease — the same way your clients feel in your space.' },
            ]} />
          </div>
        </Section>

        {/* ── ABOUT ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #faf6f0, #f5f0e8)' }} />
        <Section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`${lora.className} text-3xl md:text-4xl font-bold mb-8`} style={{ color: '#8b7355' }}>About Mountain Flow</h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#8b7355', opacity: 0.85 }}>
              Mountain Flow Wellness is a women-owned holistic wellness practice nestled in the heart of Nelson, BC. We are dedicated to healing through yoga, massage therapy, and mindfulness.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: '#8b7355', opacity: 0.85 }}>
              Whether you are seeking relief from tension, deepening your yoga practice, or simply looking for a peaceful place to pause — Mountain Flow is here for you.
            </p>
          </div>
        </Section>

        {/* ── CONTACT ── */}
        <div style={{ height: '60px', background: 'linear-gradient(to bottom, #f5f0e8, #faf6f0)' }} />
        <Section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf6f0' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`${lora.className} text-3xl md:text-4xl font-bold text-center mb-16`} style={{ color: '#8b7355' }}>Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <h3 className={`${lora.className} text-xl font-bold mb-6`} style={{ color: '#8b7355' }}>Contact Details</h3>
                <div className="space-y-4 text-sm" style={{ color: '#8b7355', opacity: 0.85 }}>
                  <p><span className="font-semibold" style={{ opacity: 1 }}>Phone:</span> (250) 555-0165</p>
                  <p><span className="font-semibold" style={{ opacity: 1 }}>Email:</span> hello@mountainflow.ca</p>
                  <p><span className="font-semibold" style={{ opacity: 1 }}>Hours:</span> Tue&ndash;Sat 9:00 AM &ndash; 6:00 PM</p>
                  <p><span className="font-semibold" style={{ opacity: 1 }}>Location:</span> 123 Sample St, Nelson, BC</p>
                </div>
              </div>
              <div>
                <h3 className={`${lora.className} text-xl font-bold mb-6`} style={{ color: '#8b7355' }}>Book an Appointment</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Name" className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md" style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.25)', borderRadius: '30px 20px 25px 35px / 25px 35px 20px 30px', color: '#8b7355' }} />
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md" style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.25)', borderRadius: '25px 35px 30px 20px / 30px 20px 35px 25px', color: '#8b7355' }} />
                  <select className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md" style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.25)', borderRadius: '20px 30px 35px 25px / 35px 25px 30px 20px', color: '#8b7355' }} defaultValue="">
                    <option value="" disabled>Select a Service</option>
                    <option>Yoga Session</option>
                    <option>Massage Therapy</option>
                    <option>Mindfulness Coaching</option>
                    <option>Other</option>
                  </select>
                  <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md resize-none" style={{ backgroundColor: '#fffcf7', border: '1px solid rgba(125,154,107,0.25)', borderRadius: '25px 30px 20px 35px / 20px 35px 25px 30px', color: '#8b7355' }} />
                  <button type="submit" className="w-full px-8 py-3.5 text-white font-semibold text-sm transition-all hover:shadow-lg" style={{ backgroundColor: '#7d9a6b', borderRadius: '35px 25px 30px 20px / 25px 30px 20px 35px', boxShadow: '0 4px 16px rgba(125,154,107,0.25)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Section>

        {/* ── FOOTER ── */}
        <footer className="py-14 px-6" style={{ backgroundColor: '#8b7355' }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10 mb-10">
              <div>
                <span className={`${lora.className} text-xl font-bold block mb-4`} style={{ color: '#faf6f0' }}>Mountain Flow Wellness</span>
                <p className="text-sm leading-relaxed" style={{ color: '#faf6f0', opacity: 0.65 }}>A holistic wellness sanctuary in the heart of Nelson, BC.</p>
              </div>
              <div>
                <h4 className={`${lora.className} font-bold mb-4`} style={{ color: '#faf6f0' }}>Quick Links</h4>
                <div className="flex flex-col gap-2">
                  {['Services', 'About', 'Our Space', 'Contact'].map((label) => (
                    <a key={label} href={`#${label.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm transition-opacity hover:opacity-100" style={{ color: '#faf6f0', opacity: 0.6 }}>{label}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className={`${lora.className} font-bold mb-4`} style={{ color: '#faf6f0' }}>Visit Us</h4>
                <div className="space-y-2 text-sm" style={{ color: '#faf6f0', opacity: 0.65 }}>
                  <p>123 Sample St, Nelson, BC</p>
                  <p>Tue&ndash;Sat 9:00 AM &ndash; 6:00 PM</p>
                  <p>(250) 555-0165</p>
                </div>
              </div>
            </div>
            <div className="pt-8" style={{ borderTop: '1px solid rgba(250,246,240,0.15)' }}>
              <p className="text-center text-xs" style={{ color: '#faf6f0', opacity: 0.45 }}>&copy; 2025 Mountain Flow Wellness. Sample site by Kootenay Made Digital.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* ── STICKY BOTTOM BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{ backgroundColor: 'rgba(125,154,107,0.92)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="text-white/90 text-sm">Sample design by <strong>Kootenay Made Digital</strong></span>
            <span className="hidden sm:inline text-white/40 text-xs">·</span>
            <span className="text-white/80 text-xs font-semibold">(250) 555-0165</span>
          </div>
          <Link href="/contact?style=warm-natural"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded-full transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#faf6f0', color: '#7d9a6b' }}>
            Like What You See? Let's Talk &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
