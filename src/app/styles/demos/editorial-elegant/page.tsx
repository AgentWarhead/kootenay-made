'use client'

import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
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

/* ══════════════════════════════════════════════════════════════
   PINNACLE REAL ESTATE — Editorial & Elegant Demo
   ══════════════════════════════════════════════════════════════ */
export default function EditorialElegantDemo() {
  const prefersReduced = useReducedMotion()

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
          <span className={`${heading.className} text-xl md:text-2xl`} style={{ color: '#1a1a1a', fontWeight: 400 }}>
            Pinnacle Real Estate
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Properties', 'About', 'Gallery', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm tracking-wider transition-all relative pb-1"
                style={{ color: '#6b6b6b' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#b8860b'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#6b6b6b'
                }}
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
            style={{ color: '#faf9f7', fontWeight: 400 }}
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b8860b'
                e.currentTarget.style.color = '#1a1a1a'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#b8860b'
              }}
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
          <Reveal>
            <EditorialTitle subtitle="Digital services tailored for real estate professionals">
              What We Can Do For You
            </EditorialTitle>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Property Showcase Website',
                desc: 'An elegant, magazine-quality website that presents your listings with sophistication.',
              },
              {
                title: 'Local SEO & Lead Generation',
                desc: 'Attract buyers and sellers searching for Kootenay properties online.',
              },
              {
                title: 'Brand & Photography Direction',
                desc: 'Cohesive branding, listing photography guidance, and print-ready materials.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div
                  className="p-8 text-center transition-all duration-300 cursor-default"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e8e6e1',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  }}
                >
                  <h3 className={`${heading.className} text-xl mb-4`} style={{ color: '#1a1a1a', fontWeight: 600 }}>
                    {card.title}
                  </h3>
                  <p className="leading-relaxed text-sm" style={{ color: '#6b6b6b' }}>
                    {card.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. GALLERY — Asymmetric Magazine Grid ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <EditorialTitle subtitle="Exceptional properties in the Kootenay region">
              Featured Properties
            </EditorialTitle>
          </Reveal>

          {/* Asymmetric grid: large left, three stacked right */}
          <div className="grid md:grid-cols-5 gap-4 md:gap-6">
            <Reveal className="md:col-span-3">
              <div
                className="overflow-hidden h-full"
                style={{ border: '1px solid #e8e6e1', minHeight: '320px' }}
              >
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
                  <div
                    className="flex items-center justify-center h-28 md:flex-1 text-center px-4"
                    style={{ backgroundColor: '#1a1a1a', minHeight: '100px' }}
                  >
                    <span className={`${heading.className} text-sm md:text-lg`} style={{ color: '#b8860b' }}>
                      {label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 6. TESTIMONIAL — Large Pull Quote ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="mb-6 text-2xl" style={{ color: '#b8860b' }}>
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </div>
            <blockquote
              className={`${heading.className} text-2xl md:text-4xl leading-relaxed mb-8 italic`}
              style={{ color: '#1a1a1a', fontWeight: 400 }}
            >
              &ldquo;Pinnacle found us the perfect home. They understood exactly what we were looking for and made the process seamless.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12" style={{ backgroundColor: '#b8860b' }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#b8860b' }} />
              <div className="h-px w-12" style={{ backgroundColor: '#b8860b' }} />
            </div>
            <p className="font-bold text-sm uppercase tracking-widest" style={{ color: '#1a1a1a' }}>
              Robert &amp; Diana M., Nelson
            </p>
            <p className="mt-4 text-xs" style={{ color: '#aaa' }}>
              (Sample review &mdash; your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 7. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
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

      {/* ═══════════ 8. CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf9f7' }}>
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
                  <p style={{ color: '#6b6b6b' }}>550 Ward Street, Nelson, BC</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ border: '1px solid #e8e6e1', backgroundColor: '#ffffff', color: '#1a1a1a' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#b8860b')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e8e6e1')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{ border: '1px solid #e8e6e1', backgroundColor: '#ffffff', color: '#1a1a1a' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#b8860b')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e8e6e1')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="What are you looking for?"
                    className="w-full px-4 py-3 text-sm outline-none transition-all resize-none"
                    style={{ border: '1px solid #e8e6e1', backgroundColor: '#ffffff', color: '#1a1a1a' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#b8860b')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e8e6e1')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all"
                  style={{ backgroundColor: '#b8860b', color: '#ffffff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Request a Showing
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${heading.className} text-lg mb-3`} style={{ color: '#faf9f7', fontWeight: 400 }}>
                Pinnacle Real Estate
              </h3>
              <p className="text-sm text-white/40">
                Curated living in the Kootenays.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Properties', 'About', 'Gallery', 'Contact'].map((link) => (
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
              <p className="text-sm text-white/40 mb-1">Mon&ndash;Sat 9:00 AM &ndash; 6:00 PM</p>
              <p className="text-sm text-white/40 mb-1">550 Ward Street, Nelson, BC</p>
              <p className="text-sm text-white/40">(250) 555-0178</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-sm text-white/25">
              &copy; 2025 Pinnacle Real Estate. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(250,249,247,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid #e8e6e1',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: '#6b6b6b' }}>
            This is a sample design by <strong style={{ color: '#1a1a1a' }}>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=editorial-elegant"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{ backgroundColor: '#b8860b', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Get This Style &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
