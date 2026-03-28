'use client'

import { Lora, Nunito } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600'],
})

/* ── Floating botanical SVG leaves ── */
function LeafOne() {
  return (
    <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 0C16 0 2 16 2 28C2 38 8 46 16 48C24 46 30 38 30 28C30 16 16 0 16 0Z"
        fill="#7d9a6b"
        opacity="0.18"
      />
      <path d="M16 6V44" stroke="#7d9a6b" strokeWidth="0.8" opacity="0.22" />
    </svg>
  )
}

function LeafTwo() {
  return (
    <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="14" cy="20" rx="12" ry="18" fill="#d4a574" opacity="0.14" />
      <path d="M14 4V36" stroke="#d4a574" strokeWidth="0.6" opacity="0.2" />
      <path d="M6 14C10 16 14 18 14 20" stroke="#d4a574" strokeWidth="0.5" opacity="0.16" />
      <path d="M22 12C18 15 14 18 14 20" stroke="#d4a574" strokeWidth="0.5" opacity="0.16" />
    </svg>
  )
}

function LeafThree() {
  return (
    <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 0C6 8 0 16 2 24C4 32 10 36 12 36C14 36 20 32 22 24C24 16 18 8 12 0Z"
        fill="#7d9a6b"
        opacity="0.15"
      />
    </svg>
  )
}

function LeafFour() {
  return (
    <svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 0C4 10 0 18 3 24C6 30 10 32 10 32C10 32 14 30 17 24C20 18 16 10 10 0Z"
        fill="#d4a574"
        opacity="0.12"
      />
      <path d="M10 4V28" stroke="#d4a574" strokeWidth="0.5" opacity="0.18" />
    </svg>
  )
}

/* ── Animation helpers ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

/* ── Animated section wrapper ── */
function Section({
  children,
  className,
  style,
  id,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  id?: string
}) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.section
      id={id}
      className={className}
      style={style}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  )
}

/* ── Keyframes CSS for floating botanicals ── */
const botanicalKeyframes = `
@keyframes floatA {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-18px) rotate(6deg); }
}
@keyframes floatB {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(-5deg); }
}
@keyframes floatC {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-22px) rotate(8deg); }
}
@keyframes floatD {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(-4deg); }
}
@media (prefers-reduced-motion: reduce) {
  .botanical-float { animation: none !important; }
}
`

/* ── Star component ── */
function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="#d4a574">
      <path d="M10 1l2.47 5.01L18 6.94l-4 3.9.94 5.5L10 13.77l-4.94 2.6.94-5.5-4-3.9 5.53-.93L10 1z" />
    </svg>
  )
}

export default function WarmNaturalDemo() {
  const prefersReduced = useReducedMotion()

  const services = [
    {
      title: 'Custom Website',
      desc: 'A beautiful, calming website that reflects your wellness practice and invites new clients.',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#7d9a6b" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      ),
    },
    {
      title: 'Google Visibility',
      desc: 'Show up when people search for wellness and healing in the Kootenays.',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#7d9a6b" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      ),
    },
    {
      title: 'Email Marketing',
      desc: 'Stay in touch with clients without lifting a finger. Class updates, seasonal offers, done.',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#7d9a6b" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      ),
    },
  ]

  const galleryPlaceholders = [
    'Yoga Studio',
    'Treatment Room',
    'Meditation Garden',
    'Welcome Area',
  ]

  return (
    <div className={nunito.className} style={{ fontFamily: 'Nunito, sans-serif', color: '#8b7355' }}>
      <style dangerouslySetInnerHTML={{ __html: botanicalKeyframes }} />

      {/* ── Watercolor wash background blobs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: '#7d9a6b', opacity: 0.1 }}
        />
        <div
          className="absolute top-1/4 -right-60 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: '#d4a574', opacity: 0.1 }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: '#7d9a6b', opacity: 0.08 }}
        />
        <div
          className="absolute -bottom-40 right-1/4 w-[350px] h-[350px] rounded-full blur-3xl"
          style={{ backgroundColor: '#d4a574', opacity: 0.08 }}
        />
      </div>

      {/* ── Floating botanical elements ── */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
        <div
          className="botanical-float absolute top-[12%] left-[8%]"
          style={{ animation: prefersReduced ? 'none' : 'floatA 15s ease-in-out infinite' }}
        >
          <LeafOne />
        </div>
        <div
          className="botanical-float absolute top-[30%] right-[6%]"
          style={{ animation: prefersReduced ? 'none' : 'floatB 20s ease-in-out infinite' }}
        >
          <LeafTwo />
        </div>
        <div
          className="botanical-float absolute top-[55%] left-[4%]"
          style={{ animation: prefersReduced ? 'none' : 'floatC 25s ease-in-out infinite' }}
        >
          <LeafThree />
        </div>
        <div
          className="botanical-float absolute top-[75%] right-[10%]"
          style={{ animation: prefersReduced ? 'none' : 'floatD 18s ease-in-out infinite' }}
        >
          <LeafFour />
        </div>
      </div>

      <div className="relative z-10">
        {/* ══════════════════════════════════════════
            1. NAV
        ══════════════════════════════════════════ */}
        <nav
          className="px-6 py-4"
          style={{ backgroundColor: 'rgba(250, 246, 240, 0.92)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className={`${lora.className} text-xl md:text-2xl font-bold`} style={{ color: '#8b7355', fontStyle: 'italic', letterSpacing: '0.03em' }}>
              Mountain Flow Wellness
            </span>
            <div className="hidden md:flex items-center gap-8">
              {['Services', 'About', 'Our Space', 'Contact'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm transition-colors"
                  style={{ color: '#8b7355' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#7d9a6b')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#8b7355')}
                >
                  {label}
                </a>
              ))}
              <span className="text-sm font-semibold" style={{ color: '#7d9a6b' }}>
                (250) 555-0165
              </span>
            </div>
          </div>
        </nav>

        {/* ══════════════════════════════════════════
            2. HERO
        ══════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#faf6f0' }}>
          {/* Watercolor wash radial gradients */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 20% 30%, rgba(125, 154, 107, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, rgba(212, 165, 116, 0.1) 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(125, 154, 107, 0.08) 0%, transparent 50%)',
              }}
            />
          </div>

          <motion.div
            className="relative max-w-3xl mx-auto text-center px-6 py-28 md:py-40"
            initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1
              className={`${lora.className} text-5xl md:text-7xl font-bold leading-tight mb-6`}
              style={{ color: '#8b7355' }}
            >
              Find Your Balance
            </h1>
            <p
              className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ color: '#8b7355', opacity: 0.75 }}
            >
              A holistic wellness sanctuary in the heart of Nelson, offering yoga, massage therapy, and mindful healing.
            </p>
            <a
              href="#contact"
              className="inline-block px-10 py-4 text-white font-semibold text-sm rounded-full transition-all hover:shadow-lg"
              style={{
                backgroundColor: '#7d9a6b',
                boxShadow: '0 4px 20px rgba(125, 154, 107, 0.3)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Book Your Session
            </a>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            3. TRUST BAR
        ══════════════════════════════════════════ */}
        <Section
          style={{ backgroundColor: '#d4a574' }}
          className="py-5 px-6"
        >
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold" style={{ color: '#8b7355' }}>
            <span className="flex items-center gap-1">
              <span style={{ color: '#faf6f0' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span style={{ color: '#faf6f0' }}>4.9 Rating</span>
            </span>
            <span style={{ color: '#faf6f0', opacity: 0.5 }}>&#183;</span>
            <span style={{ color: '#faf6f0' }}>10+ Years</span>
            <span style={{ color: '#faf6f0', opacity: 0.5 }}>&#183;</span>
            <span style={{ color: '#faf6f0' }}>Certified Practitioner</span>
            <span style={{ color: '#faf6f0', opacity: 0.5 }}>&#183;</span>
            <span style={{ color: '#faf6f0' }}>Welcoming New Clients</span>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            4. SERVICES
        ══════════════════════════════════════════ */}
        <Section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf6f0' }}>
          <div className="max-w-5xl mx-auto">
            <h2
              className={`${lora.className} text-3xl md:text-4xl font-bold text-center mb-4`}
              style={{ color: '#8b7355' }}
            >
              Our Offerings
            </h2>
            <p className="text-center mb-16 max-w-md mx-auto" style={{ color: '#8b7355', opacity: 0.6 }}>
              Digital support designed with the same care you give your clients
            </p>
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial={prefersReduced ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {services.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className="relative p-8 text-center transition-shadow hover:shadow-xl"
                  style={{
                    backgroundColor: '#fffcf7',
                    borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
                    boxShadow: '0 4px 24px rgba(139, 115, 85, 0.08)',
                    padding: '3rem 2rem',
                  }}
                >
                  <div className="flex justify-center mb-5">{card.icon}</div>
                  <h3 className={`${lora.className} text-xl font-bold mb-3`} style={{ color: '#8b7355' }}>
                    {card.title}
                  </h3>
                  <p className="leading-relaxed text-sm" style={{ color: '#8b7355', opacity: 0.7 }}>
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* ── Soft gradient transition ── */}
        <div style={{ height: '80px', background: 'linear-gradient(to bottom, #faf6f0, #f7f2ea)' }} />

        {/* ══════════════════════════════════════════
            5. GALLERY / SHOWCASE
        ══════════════════════════════════════════ */}
        <Section id="our-space" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f7f2ea' }}>
          <div className="max-w-5xl mx-auto">
            <h2
              className={`${lora.className} text-3xl md:text-4xl font-bold text-center mb-16`}
              style={{ color: '#8b7355' }}
            >
              Our Space
            </h2>

            {/* Main showcase image */}
            <div className="flex justify-center mb-12">
              <div
                style={{
                  borderRadius: '55% 45% 50% 50% / 45% 50% 50% 55%',
                  overflow: 'hidden',
                  boxShadow: '0 8px 40px rgba(139, 115, 85, 0.15)',
                }}
              >
                <Image
                  src="/images/demos/warm-natural-showcase.webp"
                  alt="Mountain Flow Wellness space"
                  width={800}
                  height={500}
                  className="block"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>

            {/* Gallery placeholders */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {galleryPlaceholders.map((label, i) => (
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

        {/* ── Soft gradient transition ── */}
        <div style={{ height: '80px', background: 'linear-gradient(to bottom, #f7f2ea, #faf6f0)' }} />

        {/* ══════════════════════════════════════════
            6. TESTIMONIAL
        ══════════════════════════════════════════ */}
        <Section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf6f0' }}>
          <div className="max-w-3xl mx-auto text-center">
            {/* Decorative quote mark */}
            <div
              className={`${lora.className} text-8xl md:text-9xl leading-none select-none`}
              style={{ color: '#7d9a6b', opacity: 0.25 }}
              aria-hidden="true"
            >
              &ldquo;
            </div>
            <blockquote
              className="text-lg md:text-xl leading-relaxed mb-6 -mt-8"
              style={{ color: '#8b7355' }}
            >
              Mountain Flow is my sanctuary. The space is beautiful and the care is genuine. I leave every session feeling renewed.
            </blockquote>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <p className={`${lora.className} font-bold`} style={{ color: '#8b7355' }}>
              &mdash; Laura K., Nelson
            </p>
            <p className="text-xs mt-4" style={{ color: '#8b7355', opacity: 0.45 }}>
              (Sample review &mdash; your real reviews go here)
            </p>
          </div>
        </Section>

        {/* ── Soft gradient transition ── */}
        <div style={{ height: '80px', background: 'linear-gradient(to bottom, #faf6f0, #f5f0e8)' }} />

        {/* ══════════════════════════════════════════
            7. ABOUT
        ══════════════════════════════════════════ */}
        <Section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className={`${lora.className} text-3xl md:text-4xl font-bold mb-8`}
              style={{ color: '#8b7355' }}
            >
              About Mountain Flow
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#8b7355', opacity: 0.85 }}>
              Mountain Flow Wellness is a women-owned holistic wellness practice nestled in the heart of Nelson, BC. We are dedicated to healing through yoga, massage therapy, and mindfulness, creating a warm and welcoming space for everyone in our community.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: '#8b7355', opacity: 0.85 }}>
              Our approach is rooted in genuine care. Whether you are seeking relief from tension, deepening your yoga practice, or simply looking for a peaceful place to pause, Mountain Flow is here for you. We believe that wellness is not a luxury &mdash; it is a foundation for a balanced, joyful life.
            </p>
          </div>
        </Section>

        {/* ── Soft gradient transition ── */}
        <div style={{ height: '80px', background: 'linear-gradient(to bottom, #f5f0e8, #faf6f0)' }} />

        {/* ══════════════════════════════════════════
            8. CONTACT
        ══════════════════════════════════════════ */}
        <Section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf6f0' }}>
          <div className="max-w-5xl mx-auto">
            <h2
              className={`${lora.className} text-3xl md:text-4xl font-bold text-center mb-16`}
              style={{ color: '#8b7355' }}
            >
              Get In Touch
            </h2>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {/* Contact info */}
              <div>
                <h3 className={`${lora.className} text-xl font-bold mb-6`} style={{ color: '#8b7355' }}>
                  Contact Details
                </h3>
                <div className="space-y-4 text-sm" style={{ color: '#8b7355', opacity: 0.85 }}>
                  <p>
                    <span className="font-semibold" style={{ opacity: 1 }}>Phone:</span>{' '}
                    (250) 555-0165
                  </p>
                  <p>
                    <span className="font-semibold" style={{ opacity: 1 }}>Email:</span>{' '}
                    hello@mountainflow.ca
                  </p>
                  <p>
                    <span className="font-semibold" style={{ opacity: 1 }}>Hours:</span>{' '}
                    Tue&ndash;Sat 9:00 AM &ndash; 6:00 PM
                  </p>
                  <p>
                    <span className="font-semibold" style={{ opacity: 1 }}>Location:</span>{' '}
                    456 Baker St, Nelson, BC
                  </p>
                </div>
              </div>

              {/* Appointment form */}
              <div>
                <h3 className={`${lora.className} text-xl font-bold mb-6`} style={{ color: '#8b7355' }}>
                  Book an Appointment
                </h3>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md"
                    style={{
                      backgroundColor: '#fffcf7',
                      border: '1px solid rgba(125, 154, 107, 0.25)',
                      borderRadius: '30px 20px 25px 35px / 25px 35px 20px 30px',
                      color: '#8b7355',
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md"
                    style={{
                      backgroundColor: '#fffcf7',
                      border: '1px solid rgba(125, 154, 107, 0.25)',
                      borderRadius: '25px 35px 30px 20px / 30px 20px 35px 25px',
                      color: '#8b7355',
                    }}
                  />
                  <select
                    className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md"
                    style={{
                      backgroundColor: '#fffcf7',
                      border: '1px solid rgba(125, 154, 107, 0.25)',
                      borderRadius: '20px 30px 35px 25px / 35px 25px 30px 20px',
                      color: '#8b7355',
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a Service
                    </option>
                    <option>Yoga Session</option>
                    <option>Massage Therapy</option>
                    <option>Mindfulness Coaching</option>
                    <option>Other</option>
                  </select>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md resize-none"
                    style={{
                      backgroundColor: '#fffcf7',
                      border: '1px solid rgba(125, 154, 107, 0.25)',
                      borderRadius: '25px 30px 20px 35px / 20px 35px 25px 30px',
                      color: '#8b7355',
                    }}
                  />
                  <button
                    type="submit"
                    className="w-full px-8 py-3.5 text-white font-semibold text-sm transition-all hover:shadow-lg"
                    style={{
                      backgroundColor: '#7d9a6b',
                      borderRadius: '35px 25px 30px 20px / 25px 30px 20px 35px',
                      boxShadow: '0 4px 16px rgba(125, 154, 107, 0.25)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            9. FOOTER
        ══════════════════════════════════════════ */}
        <footer className="py-14 px-6" style={{ backgroundColor: '#8b7355' }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10 mb-10">
              {/* Brand */}
              <div>
                <span className={`${lora.className} text-xl font-bold block mb-4`} style={{ color: '#faf6f0' }}>
                  Mountain Flow Wellness
                </span>
                <p className="text-sm leading-relaxed" style={{ color: '#faf6f0', opacity: 0.65 }}>
                  A holistic wellness sanctuary in the heart of Nelson, BC.
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 className={`${lora.className} font-bold mb-4`} style={{ color: '#faf6f0' }}>
                  Quick Links
                </h4>
                <div className="flex flex-col gap-2">
                  {['Services', 'About', 'Our Space', 'Contact'].map((label) => (
                    <a
                      key={label}
                      href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm transition-opacity hover:opacity-100"
                      style={{ color: '#faf6f0', opacity: 0.6 }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Hours & Location */}
              <div>
                <h4 className={`${lora.className} font-bold mb-4`} style={{ color: '#faf6f0' }}>
                  Visit Us
                </h4>
                <div className="space-y-2 text-sm" style={{ color: '#faf6f0', opacity: 0.65 }}>
                  <p>456 Baker St, Nelson, BC</p>
                  <p>Tue&ndash;Sat 9:00 AM &ndash; 6:00 PM</p>
                  <p>(250) 555-0165</p>
                </div>
              </div>
            </div>

            <div className="pt-8" style={{ borderTop: '1px solid rgba(250, 246, 240, 0.15)' }}>
              <p className="text-center text-xs" style={{ color: '#faf6f0', opacity: 0.45 }}>
                &copy; 2025 Mountain Flow Wellness. Sample site by Kootenay Made Digital.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* ══════════════════════════════════════════
          10. STICKY BOTTOM BAR
      ══════════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(125, 154, 107, 0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm text-center sm:text-left">
            This is a sample design by <strong>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=warm-natural"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded-full transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#faf6f0', color: '#7d9a6b' }}
          >
            Get This Style &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom spacer for sticky bar */}
      <div className="h-16" />
    </div>
  )
}
