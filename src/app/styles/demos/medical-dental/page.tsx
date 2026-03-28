'use client'

import { DM_Sans } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const font = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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

/* ── Checkmark that pops in on scroll ── */
function CheckPop({ delay = 0 }: { delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-bold flex-shrink-0"
      style={{ backgroundColor: '#0891b2' }}
      initial={prefersReduced ? {} : { scale: 0, opacity: 0 }}
      whileInView={prefersReduced ? {} : { scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 400, damping: 15 }}
    >
      &#10003;
    </motion.span>
  )
}

/* ══════════════════════════════════════════════════════════════
   KOOTENAY FAMILY DENTAL — Medical & Dental Demo
   ══════════════════════════════════════════════════════════════ */
export default function MedicalDentalDemo() {
  const prefersReduced = useReducedMotion()

  return (
    <div className={font.className} style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: '#ffffff', color: '#1e293b' }}>

      {/* ── prefers-reduced-motion ── */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @keyframes calmPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(8,145,178,0.3); }
          50% { box-shadow: 0 0 0 12px rgba(8,145,178,0); }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl md:text-2xl font-bold" style={{ color: '#0891b2' }}>
            Kootenay Family Dental
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Gallery', 'Book Now'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium transition-colors"
                style={{ color: '#64748b' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0891b2')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
              >
                {link}
              </a>
            ))}
            <a
              href="tel:2505550188"
              className="text-sm font-bold"
              style={{ color: '#0891b2' }}
            >
              (250) 555-0188
            </a>
          </div>
          <a href="tel:2505550188" className="md:hidden text-sm font-bold" style={{ color: '#0891b2' }}>
            (250) 555-0188
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/demos/medical-dental-hero.webp"
            alt="Kootenay Family Dental — welcoming modern dental office"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* Light bright overlay */}
        <div className="absolute inset-0 bg-white/40" />

        <div className="relative max-w-4xl mx-auto text-center px-6 py-32 md:py-44 w-full">
          <motion.p
            className="text-sm uppercase tracking-[0.2em] mb-6 font-medium"
            style={{ color: '#0891b2' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Gentle care for every smile
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            style={{ color: '#1e293b' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Kootenay Family Dental
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#475569' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Your family deserves a dental team that listens, cares, and makes every visit comfortable.
          </motion.p>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a
              href="#book-now"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all rounded-full"
              style={{
                backgroundColor: '#0891b2',
                color: '#ffffff',
                animation: prefersReduced ? 'none' : 'calmPulse 3s ease-in-out infinite',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
            >
              Book an Appointment
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div style={{ backgroundColor: '#f0f7ff' }} className="py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {[
            { label: '4.9 Rating', icon: '★★★★★' },
            { label: '15+ Years' },
            { label: 'Accepting New Patients' },
            { label: 'Direct Billing' },
          ].map((item, i) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap"
              style={{ backgroundColor: '#ffffff', color: '#0891b2', border: '1px solid rgba(8,145,178,0.15)' }}
            >
              {item.icon && <span style={{ color: '#0891b2' }}>{item.icon}</span>}
              <CheckPop delay={i * 0.1} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              What We Can Do For You
            </h2>
            <p className="text-center mb-16" style={{ color: '#64748b' }}>
              Digital solutions tailored for dental practices
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                desc: 'Make new patients feel welcome before their first visit.',
              },
              {
                title: 'Google Visibility',
                desc: 'Be the first dental clinic families find.',
              },
              {
                title: 'Email Marketing',
                desc: 'Automated recall reminders keep your schedule full.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div
                  className="p-8 text-center transition-all cursor-default rounded-2xl"
                  style={{
                    backgroundColor: '#f0f7ff',
                    boxShadow: '0 1px 8px rgba(8,145,178,0.06)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(8,145,178,0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 8px rgba(8,145,178,0.06)')}
                >
                  <div className="flex justify-center mb-4">
                    <CheckPop delay={0.2 + i * 0.1} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0891b2' }}>
                    {card.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#475569' }}>
                    {card.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. GALLERY / SHOWCASE ═══════════ */}
      <section id="gallery" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12" style={{ color: '#1e293b' }}>
              Our Practice
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="overflow-hidden w-full max-w-3xl rounded-2xl" style={{ boxShadow: '0 4px 24px rgba(8,145,178,0.1)' }}>
                <Image
                  src="/images/demos/medical-dental-showcase.webp"
                  alt="Kootenay Family Dental — modern treatment room"
                  width={800}
                  height={450}
                  className="w-full h-auto block"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Treatment Rooms', 'Waiting Area', 'Our Team'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div
                  className="flex items-center justify-center h-28 md:h-36 text-center px-4 rounded-2xl"
                  style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 8px rgba(8,145,178,0.06)' }}
                >
                  <span className="text-sm md:text-lg font-bold" style={{ color: '#0891b2' }}>
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. TESTIMONIAL ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="mb-6 text-2xl" style={{ color: '#0891b2' }}>
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </div>
            <blockquote className="text-xl md:text-3xl font-medium leading-relaxed mb-6" style={{ color: '#1e293b' }}>
              &ldquo;Our whole family goes to Kootenay Dental. Gentle, patient, and always on time.&rdquo;
            </blockquote>
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#0891b2' }}>
              &mdash; The Henderson Family, Trail
            </p>
            <p className="mt-4 text-xs" style={{ color: '#94a3b8' }}>
              (Sample review &mdash; your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 7. ABOUT ═══════════ */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#1e293b' }}>
              About Our Practice
            </h2>
            <div className="flex justify-center mb-10">
              <div className="w-12 h-1 rounded-full" style={{ backgroundColor: '#0891b2' }} />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
              Kootenay Family Dental has been providing gentle, comprehensive dental care to families in Trail and the West Kootenays for over 15 years. Our team believes that a visit to the dentist should be comfortable, stress-free, and even enjoyable. We use the latest technology, take the time to explain every procedure, and always put your comfort first. From children&rsquo;s first visits to cosmetic work and everything in between &mdash; we&rsquo;re here to help your whole family smile with confidence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. CONTACT ═══════════ */}
      <section id="book-now" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>
              Book an Appointment
            </h2>
            <p className="text-center mb-16" style={{ color: '#64748b' }}>
              New patients welcome &mdash; we&rsquo;d love to meet you
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact info */}
            <Reveal>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Phone</h3>
                  <p className="text-lg font-bold" style={{ color: '#1e293b' }}>(250) 555-0188</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Email</h3>
                  <p style={{ color: '#475569' }}>info@kootenaydental.ca</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Hours</h3>
                  <p style={{ color: '#475569' }}>Monday &ndash; Friday: 8:00 AM &ndash; 5:00 PM</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Location</h3>
                  <p style={{ color: '#475569' }}>Trail, BC</p>
                </div>
                <a
                  href="tel:2505550188"
                  className="inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all mt-4 rounded-full"
                  style={{
                    backgroundColor: '#0891b2',
                    color: '#ffffff',
                    animation: prefersReduced ? 'none' : 'calmPulse 3s ease-in-out infinite',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
                >
                  Book an Appointment
                </a>
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm outline-none transition-all rounded-xl"
                    style={{ backgroundColor: '#f0f7ff', border: '1px solid #e2e8f0', color: '#1e293b' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#0891b2')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 text-sm outline-none transition-all rounded-xl"
                    style={{ backgroundColor: '#f0f7ff', border: '1px solid #e2e8f0', color: '#1e293b' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#0891b2')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891b2' }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Preferred date, time, or any questions..."
                    className="w-full px-4 py-3 text-sm outline-none transition-all resize-none rounded-xl"
                    style={{ backgroundColor: '#f0f7ff', border: '1px solid #e2e8f0', color: '#1e293b' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#0891b2')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all rounded-full"
                  style={{ backgroundColor: '#0891b2', color: '#ffffff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
                >
                  Request Appointment
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0891b2' }}>
                Kootenay Family Dental
              </h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Gentle care for every smile.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891b2' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Services', 'About', 'Gallery', 'Book Now'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#0891b2')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891b2' }}>Info</h4>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Mon&ndash;Fri 8:00 AM &ndash; 5:00 PM</p>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Trail, BC</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>(250) 555-0188</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} className="pt-6 text-center">
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
              &copy; 2025 Kootenay Family Dental. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: '#64748b' }}>
            This is a sample design by <strong style={{ color: '#1e293b' }}>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=medical-dental"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap rounded-full"
            style={{ backgroundColor: '#0891b2', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0e7490')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0891b2')}
          >
            Get This Style &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  )
}
