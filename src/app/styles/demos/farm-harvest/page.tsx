'use client'

import { Caveat, Lato } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const accent = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const body = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
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

/* ── Wavy hand-drawn underline ── */
function WavyUnderline({ color = '#4a7c59' }: { color?: string }) {
  return (
    <svg className="w-full h-3 mt-1" viewBox="0 0 200 8" preserveAspectRatio="none">
      <path
        d="M0 4 Q10 0 20 4 Q30 8 40 4 Q50 0 60 4 Q70 8 80 4 Q90 0 100 4 Q110 8 120 4 Q130 0 140 4 Q150 8 160 4 Q170 0 180 4 Q190 8 200 4"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ── Leaf corner decoration ── */
function LeafCorner({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <path
        d="M5 55 C5 30, 15 10, 55 5 C40 15, 25 30, 20 55"
        fill="rgba(74,124,89,0.08)"
        stroke="rgba(74,124,89,0.2)"
        strokeWidth="1"
      />
      <path
        d="M10 50 C10 35, 18 20, 45 12"
        fill="none"
        stroke="rgba(74,124,89,0.15)"
        strokeWidth="0.8"
      />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════
   VALLEY ROOTS FARM — Farm & Harvest Demo
   ══════════════════════════════════════════════════════════════ */
export default function FarmHarvestDemo() {
  const prefersReduced = useReducedMotion()

  /* Growing vine scroll animation */
  const vineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: vineRef,
    offset: ['start start', 'end end'],
  })
  const vineLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className={body.className} style={{ fontFamily: 'Lato, sans-serif', backgroundColor: '#fefcf3', color: '#3d2e1f' }}>

      {/* ── prefers-reduced-motion ── */}
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
      <nav style={{ backgroundColor: '#fefcf3', borderBottom: '1px solid rgba(74,124,89,0.2)' }} className="px-6 py-5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className={`${accent.className} text-2xl md:text-3xl`} style={{ color: '#4a7c59' }}>
            Valley Roots Farm
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Shop', 'Our Farm', 'Gallery', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm tracking-wide transition-colors"
                style={{ color: '#6b4226' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#4a7c59')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6b4226')}
              >
                {link}
              </a>
            ))}
            <a
              href="tel:2505550167"
              className="text-sm font-bold"
              style={{ color: '#4a7c59' }}
            >
              (250) 555-0167
            </a>
          </div>
          <a href="tel:2505550167" className="md:hidden text-sm font-bold" style={{ color: '#4a7c59' }}>
            (250) 555-0167
          </a>
        </div>
      </nav>

      {/* ── Growing vine border (left side) ── */}
      <div ref={vineRef} className="relative">
        <motion.svg
          className="fixed left-0 top-0 h-screen w-8 z-30 hidden lg:block pointer-events-none"
          viewBox="0 0 30 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M15 0 C20 50, 8 100, 15 150 C22 200, 5 250, 15 300 C25 350, 8 400, 15 450 C22 500, 5 550, 15 600 C25 650, 8 700, 15 800"
            stroke="#4a7c59"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength: prefersReduced ? 1 : vineLength, opacity: 0.25 }}
          />
          {/* Leaves along the vine */}
          <motion.path
            d="M15 120 C20 110, 28 115, 25 125 C22 135, 15 130, 15 120Z"
            fill="rgba(74,124,89,0.2)"
            style={{ opacity: prefersReduced ? 1 : vineLength }}
          />
          <motion.path
            d="M15 300 C10 290, 2 295, 5 305 C8 315, 15 310, 15 300Z"
            fill="rgba(74,124,89,0.2)"
            style={{ opacity: prefersReduced ? 1 : vineLength }}
          />
          <motion.path
            d="M15 500 C20 490, 28 495, 25 505 C22 515, 15 510, 15 500Z"
            fill="rgba(74,124,89,0.2)"
            style={{ opacity: prefersReduced ? 1 : vineLength }}
          />
          <motion.path
            d="M15 680 C10 670, 2 675, 5 685 C8 695, 15 690, 15 680Z"
            fill="rgba(74,124,89,0.2)"
            style={{ opacity: prefersReduced ? 1 : vineLength }}
          />
        </motion.svg>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/demos/farm-hero.webp"
            alt="Valley Roots Farm — fields and harvest in the Kootenays"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* Light overlay */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative max-w-4xl mx-auto text-center px-6 py-32 md:py-44 w-full">
          <motion.p
            className="text-sm uppercase tracking-[0.3em] mb-6"
            style={{ color: 'rgba(255,255,255,0.8)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Grown with love in the Kootenays
          </motion.p>
          <motion.h1
            className={`${accent.className} text-5xl md:text-7xl lg:text-8xl leading-tight mb-8`}
            style={{ color: '#ffffff' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Valley Roots Farm
          </motion.h1>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#shop"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all rounded-full"
              style={{
                backgroundColor: '#4a7c59',
                color: '#fefcf3',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3d6a4b')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a7c59')}
            >
              Shop the Harvest
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div style={{ backgroundColor: '#4a7c59' }} className="py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm" style={{ color: '#fefcf3' }}>
          <span className="flex items-center gap-2">
            <span style={{ color: '#e8a838' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="font-bold">4.9 Rating</span>
          </span>
          <span style={{ color: 'rgba(254,252,243,0.3)' }}>&#183;</span>
          <span>Certified Organic</span>
          <span style={{ color: 'rgba(254,252,243,0.3)' }} className="hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Family Owned</span>
          <span style={{ color: 'rgba(254,252,243,0.3)' }} className="hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Est. 1994</span>
        </div>
      </div>

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <section id="shop" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#fefcf3' }}>
        <LeafCorner className="absolute top-4 left-4 opacity-60" />
        <LeafCorner className="absolute top-4 right-4 opacity-60" flip />

        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>
                What We Can Do For You
              </h2>
              <div className="max-w-xs mx-auto">
                <WavyUnderline color="#4a7c59" />
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Online Store',
                desc: 'Sell your harvest. CSA boxes, fresh produce, local delivery.',
              },
              {
                title: 'Email Marketing',
                desc: "Keep regulars updated on what's in season.",
              },
              {
                title: 'Social Media',
                desc: 'Share your fields, your family, your story.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div
                  className="p-8 text-center transition-all cursor-default rounded-lg"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(74,124,89,0.15)',
                    boxShadow: '0 2px 16px rgba(74,124,89,0.06)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(74,124,89,0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 16px rgba(74,124,89,0.06)')}
                >
                  <h3 className={`${accent.className} text-2xl md:text-3xl mb-3`} style={{ color: '#4a7c59' }}>
                    {card.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#6b4226' }}>
                    {card.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. GALLERY / SHOWCASE ═══════════ */}
      <section id="gallery" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e3' }}>
        <LeafCorner className="absolute bottom-4 right-4 opacity-60 rotate-180" />

        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>
                From Our Farm
              </h2>
              <div className="max-w-xs mx-auto">
                <WavyUnderline color="#4a7c59" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="overflow-hidden w-full max-w-3xl rounded-lg" style={{ border: '2px solid rgba(74,124,89,0.2)' }}>
                <Image
                  src="/images/demos/farm-harvest-showcase.webp"
                  alt="Valley Roots Farm — fresh harvest showcase"
                  width={800}
                  height={450}
                  className="w-full h-auto block"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Summer Harvest', 'Berry Season', 'Farm Stand'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div
                  className="flex items-center justify-center h-28 md:h-36 text-center px-4 rounded-lg"
                  style={{ backgroundColor: '#ffffff', border: '1px solid rgba(74,124,89,0.15)' }}
                >
                  <span className={`${accent.className} text-lg md:text-2xl`} style={{ color: '#4a7c59' }}>
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. TESTIMONIAL ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#fefcf3' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="mb-6 text-2xl" style={{ color: '#e8a838' }}>
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </div>
            <blockquote className={`${accent.className} text-2xl md:text-4xl leading-relaxed mb-6`} style={{ color: '#3d2e1f' }}>
              &ldquo;Valley Roots delivers the freshest produce every week. Supporting them feels like supporting family.&rdquo;
            </blockquote>
            <p className="text-sm uppercase tracking-widest font-bold" style={{ color: '#4a7c59' }}>
              &mdash; Karen L., Castlegar
            </p>
            <p className="mt-4 text-xs" style={{ color: 'rgba(61,46,31,0.4)' }}>
              (Sample review &mdash; your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 7. ABOUT ═══════════ */}
      <section id="our-farm" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e3' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>
              Our Story
            </h2>
            <div className="max-w-xs mx-auto mb-10">
              <WavyUnderline color="#4a7c59" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: '#6b4226' }}>
              Valley Roots Farm has been a labour of love since 1994, when our family first put seeds in the rich Kootenay soil. What started as a small market garden has grown into a certified organic farm supplying fresh produce, berries, and seasonal CSA boxes to families across the region. We believe in sustainable farming, honest food, and the power of knowing exactly where your meals come from. Every Saturday morning, you&rsquo;ll find us at the Castlegar farmers&rsquo; market &mdash; come say hello, grab some tomatoes, and become part of the Valley Roots family.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. CONTACT ═══════════ */}
      <section id="contact" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#fefcf3' }}>
        <LeafCorner className="absolute top-4 right-4 opacity-60" flip />

        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>
                Get In Touch
              </h2>
              <div className="max-w-xs mx-auto">
                <WavyUnderline color="#4a7c59" />
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact info */}
            <Reveal>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Phone</h3>
                  <p style={{ color: '#6b4226' }}>(250) 555-0167</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Email</h3>
                  <p style={{ color: '#6b4226' }}>hello@valleyrootsfarm.ca</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Farm Stand Hours</h3>
                  <p style={{ color: '#6b4226' }}>Saturdays 9:00 AM &ndash; 1:00 PM</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Location</h3>
                  <p style={{ color: '#6b4226' }}>Castlegar, BC</p>
                </div>
                <a
                  href="tel:2505550167"
                  className="inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all mt-4 rounded-full"
                  style={{ backgroundColor: '#4a7c59', color: '#fefcf3' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3d6a4b')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a7c59')}
                >
                  Call Us
                </a>
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm outline-none transition-all rounded-lg"
                    style={{ backgroundColor: '#ffffff', border: '1px solid rgba(74,124,89,0.2)', color: '#3d2e1f' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4a7c59')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(74,124,89,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 text-sm outline-none transition-all rounded-lg"
                    style={{ backgroundColor: '#ffffff', border: '1px solid rgba(74,124,89,0.2)', color: '#3d2e1f' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4a7c59')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(74,124,89,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="CSA sign-up, bulk orders, farm visits..."
                    className="w-full px-4 py-3 text-sm outline-none transition-all resize-none rounded-lg"
                    style={{ backgroundColor: '#ffffff', border: '1px solid rgba(74,124,89,0.2)', color: '#3d2e1f' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4a7c59')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(74,124,89,0.2)')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all rounded-full"
                  style={{ backgroundColor: '#4a7c59', color: '#fefcf3' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3d6a4b')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a7c59')}
                >
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#4a7c59' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${accent.className} text-2xl mb-3`} style={{ color: '#fefcf3' }}>
                Valley Roots Farm
              </h3>
              <p className="text-sm" style={{ color: 'rgba(254,252,243,0.6)' }}>
                Grown with love in the Kootenays since 1994.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#e8a838' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Shop', 'Our Farm', 'Gallery', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(254,252,243,0.6)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fefcf3')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(254,252,243,0.6)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#e8a838' }}>Info</h4>
              <p className="text-sm mb-1" style={{ color: 'rgba(254,252,243,0.6)' }}>Farm Stand: Sat 9 AM &ndash; 1 PM</p>
              <p className="text-sm mb-1" style={{ color: 'rgba(254,252,243,0.6)' }}>Castlegar, BC</p>
              <p className="text-sm" style={{ color: 'rgba(254,252,243,0.6)' }}>(250) 555-0167</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(254,252,243,0.15)' }} className="pt-6 text-center">
            <span className="text-sm" style={{ color: 'rgba(254,252,243,0.4)' }}>
              &copy; 2025 Valley Roots Farm. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(254,252,243,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '2px solid #4a7c59',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: '#6b4226' }}>
            This is a sample design by <strong style={{ color: '#3d2e1f' }}>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=farm-harvest"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap rounded-full"
            style={{ backgroundColor: '#4a7c59', color: '#fefcf3' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3d6a4b')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a7c59')}
          >
            Get This Style &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-16" />

      </div>{/* end vine ref wrapper */}
    </div>
  )
}
