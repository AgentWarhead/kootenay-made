'use client'

import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const heading = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const body = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
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

/* ── Editorial section title with rule line ── */
function EditorialTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <h2 className={`${heading.className} text-3xl md:text-5xl mb-4`} style={{ color: '#1a1a1a', fontWeight: 400 }}>
        {children}
      </h2>
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px w-16" style={{ backgroundColor: '#b8860b' }} />
        <div className="w-2 h-2 rotate-45" style={{ backgroundColor: '#b8860b' }} />
        <div className="h-px w-16" style={{ backgroundColor: '#b8860b' }} />
      </div>
      {subtitle && <p className="max-w-xl mx-auto" style={{ color: '#6b6b6b' }}>{subtitle}</p>}
    </div>
  )
}

/* ── Before/After Slider ── */
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPos(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: 340, cursor: 'ew-resize', userSelect: 'none', overflow: 'hidden', border: '1px solid #e8e6e1' }}
      onMouseDown={() => { dragging.current = true }}
      onMouseUp={() => { dragging.current = false }}
      onMouseLeave={() => { dragging.current = false }}
      onMouseMove={(e) => { if (dragging.current) move(e.clientX) }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onClick={(e) => move(e.clientX)}
    >
      {/* BEFORE */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#f1f0ee', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        <div style={{ color: '#aaa', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>BEFORE — Generic Template</div>
        <div style={{ color: '#888', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Realty Pro — Kootenays</div>
        <div style={{ backgroundColor: '#d4d0cb', height: 13, width: '70%', marginBottom: '0.5rem' }} />
        <div style={{ backgroundColor: '#d4d0cb', height: 13, width: '52%', marginBottom: '1rem' }} />
        <div style={{ height: 90, backgroundColor: '#ddd9d3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <span style={{ color: '#aaa', fontSize: '0.8rem' }}>Property Photo</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {['Listings', 'About', 'Contact'].map(s => (
            <div key={s} style={{ flex: 1, height: 52, backgroundColor: '#d4d0cb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#aaa', fontSize: '0.65rem' }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#aaa', height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}>
          <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 600 }}>Contact Agent</span>
        </div>
      </div>

      {/* AFTER */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)`, backgroundColor: '#1a1a1a', display: 'flex', flexDirection: 'column', padding: '2rem', borderLeft: '3px solid #b8860b' }}>
        <div style={{ color: '#b8860b', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '1rem' }}>AFTER — Kootenay Made Design</div>
        <div style={{ color: '#faf9f7', fontSize: '1.2rem', fontStyle: 'italic', fontFamily: 'serif', marginBottom: '0.25rem' }}>Pinnacle Real Estate</div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Curated Living in the Kootenays</div>
        <div style={{ height: 90, background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: '1px solid rgba(184,134,11,0.3)' }}>
          <span style={{ color: '#b8860b', fontSize: '0.8rem', fontStyle: 'italic' }}>Lakefront Retreat &mdash; Nelson, BC</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {['Listings', 'Portfolio', 'Contact'].map(s => (
            <div key={s} style={{ flex: 1, height: 52, border: '1px solid rgba(184,134,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginBottom: '0.5rem' }}>★★★★★  ·  200+ Properties Sold  ·  Free Market Analysis</div>
        <div style={{ border: '1px solid #b8860b', height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}>
          <span style={{ color: '#b8860b', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Request a Showing →</span>
        </div>
      </div>

      {/* Divider handle */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2, backgroundColor: '#b8860b', transform: 'translateX(-50%)', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 36, height: 36, backgroundColor: '#b8860b', border: '2px solid #faf9f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', fontSize: '0.75rem', fontWeight: 700 }}>
          ⟺
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 12, left: 12, fontSize: '0.68rem', fontWeight: 700, color: '#b8860b', backgroundColor: 'rgba(26,26,26,0.85)', padding: '3px 8px', pointerEvents: 'none', zIndex: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>After ✦</div>
      <div style={{ position: 'absolute', bottom: 12, right: 12, fontSize: '0.68rem', fontWeight: 700, color: '#888', backgroundColor: 'rgba(255,255,255,0.8)', padding: '3px 8px', pointerEvents: 'none', zIndex: 5 }}>Before</div>
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', fontSize: '0.68rem', color: '#888', backgroundColor: 'rgba(255,255,255,0.75)', padding: '3px 10px', pointerEvents: 'none', zIndex: 5, whiteSpace: 'nowrap' }}>← drag to compare →</div>
    </div>
  )
}

/* ── FAQ Accordion ── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} style={{ border: '1px solid #e8e6e1' }}>
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between text-sm transition-colors"
            style={{ color: '#1a1a1a', fontWeight: 600, backgroundColor: open === i ? '#faf9f7' : '#ffffff' }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <span style={{ color: '#b8860b', transition: 'transform 0.25s', transform: open === i ? 'rotate(180deg)' : 'none', display: 'inline-block', marginLeft: '1rem', flexShrink: 0 }}>▼</span>
          </button>
          {open === i && (
            <div className="px-6 py-4 text-sm leading-relaxed" style={{ color: '#6b6b6b', borderTop: '1px solid #e8e6e1', backgroundColor: '#faf9f7' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   PINNACLE REAL ESTATE — Editorial & Elegant Demo
   ══════════════════════════════════════════════════════════════ */
export default function EditorialElegantDemo() {
  const prefersReduced = useReducedMotion()

  const faqItems = [
    {
      q: 'How long does a website take?',
      a: 'Most real estate and boutique brand websites are designed and launched within 2–3 weeks. We work efficiently and keep you informed at every step.',
    },
    {
      q: 'What if I already have a website?',
      a: "We can redesign it completely or elevate what you have. Either way, you'll end up with something that looks as sophisticated as the properties you represent.",
    },
    {
      q: 'Do I need to provide all my listing photos?',
      a: "We'll work with what you have and guide you on what shoots to prioritise. We can also source premium stock imagery to fill any gaps while you build your portfolio.",
    },
    {
      q: 'What does it cost?',
      a: 'Websites start from $1,500. Full brand builds (logo, identity, website) start from $4,000. Google Domination SEO packages start from $500. Book a free consultation for a tailored quote.',
    },
    {
      q: 'Can I update my listings and portfolio myself?',
      a: 'Yes — we build on platforms that let you add listings, swap photos, and update content without any technical knowledge.',
    },
    {
      q: 'Do you understand luxury and boutique branding?',
      a: "It's our specialty. We know the difference between a generic business website and an editorial brand presence. Your site will feel curated, not templated.",
    },
  ]

  return (
    <div className={body.className} style={{ fontFamily: 'Source Sans 3, sans-serif', backgroundColor: '#faf9f7', color: '#1a1a1a' }}>

      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
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
      <nav className="px-6 py-5 sticky top-0 z-40" style={{ backgroundColor: '#faf9f7', borderBottom: '1px solid #e8e6e1' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className={`${heading.className} text-xl md:text-2xl`} style={{ color: '#1a1a1a', fontWeight: 400, fontStyle: 'italic', letterSpacing: '0.04em' }}>
            Pinnacle Real Estate
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Properties', 'About', 'Gallery', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm tracking-wider transition-all relative pb-1"
                style={{ color: '#6b6b6b' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#b8860b' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#6b6b6b' }}
              >
                {link}
              </a>
            ))}
            <a href="tel:2505550178" className="text-sm font-bold" style={{ color: '#b8860b' }}>
              (250) 555-0178
            </a>
          </div>
          <a href="tel:2505550178" className="md:hidden text-sm font-bold" style={{ color: '#b8860b' }}>
            (250) 555-0178
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)' }} />
        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: '#b8860b' }} />

        <div className="relative max-w-4xl mx-auto text-center px-6 py-32 md:py-44 w-full">
          <motion.p
            className="text-sm uppercase tracking-[0.3em] mb-6"
            style={{ color: '#b8860b' }}
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={prefersReduced ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Curated living in the Kootenays
          </motion.p>
          <motion.h1
            className={`${heading.className} text-5xl md:text-7xl lg:text-8xl leading-tight mb-8`}
            style={{ color: '#faf9f7', fontWeight: 400, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Pinnacle<br />Real Estate
          </motion.h1>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a
              href="#contact"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
              style={{ border: '1px solid #b8860b', color: '#b8860b' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#b8860b'; e.currentTarget.style.color = '#1a1a1a' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#b8860b' }}
            >
              Request a Showing
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div className="py-5 px-6" style={{ backgroundColor: '#faf9f7', borderBottom: '1px solid #e8e6e1' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm" style={{ color: '#1a1a1a' }}>
          <span className="flex items-center gap-2">
            <span style={{ color: '#b8860b' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="font-bold">4.9 Rating</span>
          </span>
          <span style={{ color: '#ccc' }}>&#183;</span>
          <span>200+ Properties Sold</span>
          <span style={{ color: '#ccc' }} className="hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Local Expert</span>
          <span style={{ color: '#ccc' }} className="hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Free Market Analysis</span>
        </div>
      </div>

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <section id="properties" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-6xl mx-auto">
          {/* PAS intro */}
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14 px-6 py-8" style={{ borderLeft: '3px solid #b8860b', backgroundColor: '#ffffff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#1a1a1a', fontStyle: 'italic' }}>
                <strong style={{ fontStyle: 'normal' }}>Your listings look amateur next to the realtor who invested in their brand.</strong> Not because their properties are better &mdash; because their online presence is. In a market where buyers decide in seconds, presentation is everything. Let&rsquo;s make yours unforgettable.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <EditorialTitle subtitle="Digital services tailored for real estate and lifestyle brands">
              What We Can Do For You
            </EditorialTitle>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Custom Website', desc: 'An elegant, magazine-quality website that presents your listings with the sophistication they deserve.', pricing: 'From $1,500' },
              { title: 'Full Brand Build', desc: 'Logo, colours, typography — the complete identity. Look as established and refined as your market position.', pricing: 'From $4,000' },
              { title: 'Email Marketing', desc: 'Stay in touch with buyers and sellers automatically. Market updates, new listings, curated content — done.', pricing: 'From $750' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div
                  className="p-8 text-center transition-all duration-300 cursor-default"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #e8e6e1', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(184,134,11,0.12)'; e.currentTarget.style.borderColor = '#b8860b' }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e8e6e1' }}
                >
                  <div className="w-8 h-px mx-auto mb-6" style={{ backgroundColor: '#b8860b' }} />
                  <h3 className={`${heading.className} text-xl mb-4`} style={{ color: '#1a1a1a', fontWeight: 600 }}>{card.title}</h3>
                  <p className="leading-relaxed text-sm mb-5" style={{ color: '#6b6b6b' }}>{card.desc}</p>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#b8860b' }}>{card.pricing}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="A refined, effortless process from first conversation to launch">
              How It Works
            </EditorialTitle>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: 'I', title: 'We Meet', desc: 'Tell us your vision, your clients, the properties you represent. A free, unhurried conversation about what your brand deserves.' },
              { num: 'II', title: 'We Create', desc: 'We design and build your bespoke website in approximately two weeks. Every detail considered. You approve, we refine.' },
              { num: 'III', title: 'You Flourish', desc: 'Launch with confidence. Get found by the right clients. Watch your brand become the one everyone in the region recognises.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.2}>
                <div className="text-center">
                  <div className={`${heading.className} text-4xl mb-6`} style={{ color: '#b8860b', fontWeight: 400 }}>{step.num}</div>
                  <div className="w-8 h-px mx-auto mb-6" style={{ backgroundColor: '#b8860b' }} />
                  <h3 className={`${heading.className} text-xl mb-4`} style={{ color: '#1a1a1a', fontWeight: 600 }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY — Asymmetric Magazine Grid ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="Exceptional properties in the Kootenay region">
              Featured Properties
            </EditorialTitle>
          </Reveal>

          <div className="grid md:grid-cols-5 gap-4 md:gap-6">
            <Reveal className="md:col-span-3">
              <div className="overflow-hidden h-full" style={{ border: '1px solid #e8e6e1', minHeight: '320px' }}>
                <div style={{ animation: prefersReduced ? 'none' : 'kenBurns 8s ease-in-out infinite alternate', overflow: 'hidden', height: '100%' }}>
                  <Image
                    src="/images/demos/editorial-elegant-showcase.webp"
                    alt="Pinnacle Real Estate — featured lakefront property"
                    width={700}
                    height={500}
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>
            </Reveal>
            <div className="md:col-span-2 flex flex-col gap-4 md:gap-6">
              {['Lakefront Retreat', 'Mountain Chalet', 'Downtown Nelson'].map((label, i) => (
                <Reveal key={label} delay={0.1 + i * 0.1}>
                  <div className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                    <Image src={`/images/demos/gallery/ee-${i + 1}.webp`} alt={label} fill className='object-cover' />
                    <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                      <span className='text-white text-sm font-medium'>{label}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 7. BEFORE / AFTER ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="Drag to compare a generic template with a Kootenay Made brand presence">
              The Transformation
            </EditorialTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfterSlider />
          </Reveal>
          <p className="text-center mt-8 text-sm italic" style={{ color: '#6b6b6b' }}>
            Which agent would a luxury buyer trust with their search?
          </p>
        </div>
      </section>

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="From realtors, salons, and boutiques across the Kootenays">
              Words From Our Clients
            </EditorialTitle>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "My listings started getting more serious inquiries within a month of launching. The website carries the weight of the properties — it looks exactly as curated as my brand should.",
                name: 'Catherine R.',
                business: 'Pinnacle Real Estate',
                location: 'Nelson, BC',
              },
              {
                quote: "Clients walk in already in love with our salon. They found us online, saw how beautiful the site was, and booked before they even called. Our bookings doubled.",
                name: 'Monique L.',
                business: 'Atelier Hair & Beauty',
                location: 'Fernie, BC',
              },
              {
                quote: "As a boutique owner I was skeptical about the ROI. Then our website started getting found on Google and we had people driving from Creston just because of what they saw online.",
                name: 'Isabelle V.',
                business: 'Maison Boutique',
                location: 'Invermere, BC',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div className="p-8" style={{ backgroundColor: '#ffffff', border: '1px solid #e8e6e1' }}>
                  <div className="mb-6 text-lg" style={{ color: '#b8860b' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px flex-1" style={{ backgroundColor: '#b8860b', opacity: 0.4 }} />
                    <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#b8860b', flexShrink: 0 }} />
                    <div className="h-px flex-1" style={{ backgroundColor: '#b8860b', opacity: 0.4 }} />
                  </div>
                  <blockquote className={`${heading.className} text-lg leading-relaxed mb-6 italic`} style={{ color: '#1a1a1a', fontWeight: 400 }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wider" style={{ color: '#1a1a1a' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: '#6b6b6b' }}>{t.business} &mdash; {t.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-center mt-8 text-xs" style={{ color: '#aaa' }}>
            (Sample reviews &mdash; your real reviews go here)
          </p>
        </div>
      </section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="Everything you need to know before we begin">
              Frequently Asked Questions
            </EditorialTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={faqItems} />
          </Reveal>
          <div className="text-center mt-12">
            <a
              href="#contact"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all"
              style={{ backgroundColor: '#b8860b', color: '#ffffff' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Start a Conversation →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <EditorialTitle>About Pinnacle</EditorialTitle>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: '#6b6b6b' }}>
              Pinnacle Real Estate is a boutique agency rooted in the Kootenay region. With over 200 properties sold, we bring deep local knowledge and a curated approach to every transaction. Whether you are searching for a lakefront retreat, a mountain chalet, or the perfect downtown home, our team guides you through every step with expertise and care. We believe that finding a home is not just a transaction &mdash; it is the beginning of a new chapter. At Pinnacle, we make that chapter extraordinary.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="We would love to hear from you">
              Get In Touch
            </EditorialTitle>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#b8860b' }}>Phone</h3>
                  <p style={{ color: '#6b6b6b' }}>(250) 555-0178</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#b8860b' }}>Email</h3>
                  <p style={{ color: '#6b6b6b' }}>hello@pinnaclerealestate.ca</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#b8860b' }}>Hours</h3>
                  <p style={{ color: '#6b6b6b' }}>Mon&ndash;Sat 9:00 AM &ndash; 6:00 PM</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#b8860b' }}>Location</h3>
                  <p style={{ color: '#6b6b6b' }}>Nelson, BC</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-sm outline-none transition-all" style={{ border: '1px solid #e8e6e1', backgroundColor: '#ffffff', color: '#1a1a1a' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#b8860b')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e8e6e1')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Email</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 text-sm outline-none transition-all" style={{ border: '1px solid #e8e6e1', backgroundColor: '#ffffff', color: '#1a1a1a' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#b8860b')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e8e6e1')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Message</label>
                  <textarea rows={4} placeholder="What are you looking for?" className="w-full px-4 py-3 text-sm outline-none transition-all resize-none" style={{ border: '1px solid #e8e6e1', backgroundColor: '#ffffff', color: '#1a1a1a' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#b8860b')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e8e6e1')} />
                </div>
                <button type="submit" className="w-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all" style={{ backgroundColor: '#b8860b', color: '#ffffff' }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                  Request a Showing
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 12. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${heading.className} text-lg mb-3`} style={{ color: '#faf9f7', fontWeight: 400 }}>Pinnacle Real Estate</h3>
              <p className="text-sm text-white/40">Curated living in the Kootenays.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Properties', 'About', 'Gallery', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-white/40 hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Info</h4>
              <p className="text-sm text-white/40 mb-1">Mon&ndash;Sat 9:00 AM &ndash; 6:00 PM</p>
              <p className="text-sm text-white/40 mb-1">Nelson, BC</p>
              <p className="text-sm text-white/40">(250) 555-0178</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-sm text-white/25">&copy; 2025 Pinnacle Real Estate. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(250,249,247,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '2px solid #b8860b',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: '#6b6b6b' }}>
            This is a sample design by <strong style={{ color: '#1a1a1a' }}>Kootenay Made Digital</strong> &mdash; <span className="text-xs" style={{ color: '#aaa' }}>Elevate your brand today</span>
          </span>
          <Link
            href="/contact?style=editorial-elegant"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{ backgroundColor: '#b8860b', color: '#ffffff', boxShadow: '0 2px 12px rgba(184,134,11,0.25)' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Get Your Free Mockup &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
