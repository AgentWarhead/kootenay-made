'use client'

import { Nunito } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

/* ── Bouncy reveal ── */
function Bounce({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 40, scale: 0.95 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={prefersReduced ? {} : { type: 'spring', stiffness: 200, damping: 18, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ── SVG blob shapes ── */
function Blob({ className = '', color = '#ff6b6b' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.3,-0.9C86.7,14.4,80.8,28.8,72.6,41.5C64.4,54.2,53.8,65.2,41.1,72.4C28.4,79.6,14.2,83,-1.4,85.5C-17,88,-34.1,89.6,-47.1,82.6C-60.1,75.6,-69.1,60,-76.1,44.4C-83.1,28.8,-88.2,14.4,-87.3,0.5C-86.5,-13.4,-79.7,-26.9,-71.3,-39C-62.9,-51.1,-52.8,-61.8,-40.6,-70C-28.4,-78.2,-14.2,-83.8,0.6,-84.8C15.4,-85.9,30.7,-83.5,44.7,-76.4Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

function Blob2({ className = '', color = '#4ecdc4' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M39.4,-65.8C52.9,-60.2,67.2,-53.8,74.9,-42.6C82.5,-31.4,83.5,-15.7,81.5,-1.2C79.5,13.4,74.5,26.8,67.1,38.7C59.7,50.6,49.9,61,38.1,67.8C26.3,74.5,13.1,77.5,-0.5,78.4C-14.2,79.2,-28.4,77.9,-40.5,71.5C-52.6,65.1,-62.6,53.6,-70.6,40.7C-78.5,27.8,-84.3,13.9,-83.6,0.4C-83,-13.1,-75.8,-26.1,-67.6,-38.1C-59.4,-50.1,-50,-61,-38.4,-67.7C-26.8,-74.4,-13.4,-76.8,0,-76.8C13.3,-76.8,26.7,-71.4,39.4,-65.8Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

/* ── Confetti burst CSS keyframes ── */
const confettiStyles = `
  @keyframes confettiBurst {
    0% { transform: translate(0, 0) scale(1); opacity: 1; }
    100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
  }
  .confetti-parent { position: relative; display: inline-block; }
  .confetti-parent:hover .confetti-dot {
    animation: confettiBurst 0.6s ease-out forwards;
  }
  .confetti-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    top: 50%;
    left: 50%;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`

const confettiDots = [
  { color: '#ff6b6b', tx: '-40px', ty: '-50px' },
  { color: '#4ecdc4', tx: '45px', ty: '-35px' },
  { color: '#ffe66d', tx: '-30px', ty: '45px' },
  { color: '#a78bfa', tx: '50px', ty: '40px' },
  { color: '#ff6b6b', tx: '0px', ty: '-55px' },
  { color: '#4ecdc4', tx: '-50px', ty: '10px' },
  { color: '#ffe66d', tx: '55px', ty: '0px' },
  { color: '#a78bfa', tx: '20px', ty: '50px' },
]

/* ══════════════════════════════════════════════════════════════
   LITTLE EXPLORERS DAYCARE — Bright & Playful Demo
   ══════════════════════════════════════════════════════════════ */
export default function BrightPlayfulDemo() {
  const prefersReduced = useReducedMotion()

  return (
    <div className={nunito.className} style={{ fontFamily: 'Nunito, sans-serif', color: '#333', backgroundColor: '#ffffff' }}>

      <style>{confettiStyles}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav className="px-6 py-4 sticky top-0 z-40" style={{ backgroundColor: '#ffffff', borderBottom: '3px solid #4ecdc4' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl md:text-2xl font-extrabold" style={{ color: '#ff6b6b' }}>
            Little Explorers <span style={{ color: '#4ecdc4' }}>Daycare</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Programs', 'About', 'Gallery', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-bold transition-colors"
                style={{ color: '#666' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b6b')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
              >
                {link}
              </a>
            ))}
            <a href="tel:2505550162" className="text-sm font-extrabold" style={{ color: '#ff6b6b' }}>
              (250) 555-0162
            </a>
          </div>
          <a href="tel:2505550162" className="md:hidden text-sm font-extrabold" style={{ color: '#ff6b6b' }}>
            (250) 555-0162
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #fff5f5 0%, #f0fffe 50%, #fffbeb 100%)' }}>
        {/* Scattered blobs */}
        <Blob className="absolute -top-20 -left-20 w-64 h-64 opacity-10" color="#ff6b6b" />
        <Blob2 className="absolute top-1/3 -right-16 w-48 h-48 opacity-10" color="#4ecdc4" />
        <Blob className="absolute bottom-10 left-1/4 w-40 h-40 opacity-8" color="#ffe66d" />
        <Blob2 className="absolute -bottom-10 right-1/3 w-56 h-56 opacity-8" color="#a78bfa" />

        <div className="relative max-w-4xl mx-auto text-center px-6 py-28 md:py-40 w-full">
          <motion.div
            className="text-6xl md:text-7xl mb-6"
            initial={prefersReduced ? {} : { scale: 0, rotate: -20 }}
            animate={prefersReduced ? {} : { scale: 1, rotate: 0 }}
            transition={prefersReduced ? {} : { type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
          >
            🌈
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            style={{ color: '#333' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Where <span style={{ color: '#ff6b6b' }}>Fun</span> Comes{' '}
            <span style={{ color: '#4ecdc4' }}>First!</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: '#666' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            A nurturing, creative space where little ones learn, play, and grow every day.
          </motion.p>
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="confetti-parent">
              {confettiDots.map((dot, i) => (
                <span
                  key={i}
                  className="confetti-dot"
                  style={{
                    backgroundColor: dot.color,
                    '--tx': dot.tx,
                    '--ty': dot.ty,
                    animationDelay: `${i * 0.05}s`,
                  } as React.CSSProperties}
                />
              ))}
              <a
                href="#contact"
                className="inline-block px-10 py-4 text-white font-extrabold text-sm rounded-3xl transition-all hover:scale-105"
                style={{ backgroundColor: '#ff6b6b', boxShadow: '0 4px 20px rgba(255,107,107,0.4)' }}
              >
                Book a Tour 🎈
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div className="py-5 px-6" style={{ backgroundColor: '#4ecdc4' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm font-bold text-white">
          <span className="flex items-center gap-2">
            <span style={{ color: '#ffe66d' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            5.0 Rating
          </span>
          <span className="opacity-50">&#183;</span>
          <span>Licensed Childcare</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">8am&ndash;5:30pm</span>
          <span className="opacity-50 hidden md:inline">&#183;</span>
          <span className="hidden md:inline">Ages 6 weeks&ndash;5 years</span>
        </div>
      </div>

      {/* ═══════════ 4. SERVICES ═══════════ */}
      <section id="programs" className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ backgroundColor: '#fff' }}>
        <Blob className="absolute -top-10 -right-10 w-40 h-40 opacity-5" color="#a78bfa" />
        <div className="max-w-6xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: '#333' }}>
              What We Can Do For You
            </h2>
            <p className="text-center mb-16 max-w-xl mx-auto" style={{ color: '#999' }}>
              Digital services to help your daycare shine
            </p>
          </Bounce>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Fun & Friendly Website',
                desc: 'A colourful, welcoming website that shows parents exactly why their kids will love it here.',
                color: '#ff6b6b',
                emoji: '🎨',
              },
              {
                title: 'Google Maps & Local SEO',
                desc: 'Help parents find you when they search for childcare in the Kootenays.',
                color: '#4ecdc4',
                emoji: '📍',
              },
              {
                title: 'Social Media & Content',
                desc: 'Engaging posts and updates that build community and trust with families.',
                color: '#a78bfa',
                emoji: '💜',
              },
            ].map((card, i) => (
              <Bounce key={card.title} delay={i * 0.12}>
                <motion.div
                  className="p-8 text-center rounded-3xl cursor-default"
                  style={{
                    backgroundColor: '#fff',
                    border: `3px solid ${card.color}`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  }}
                  whileHover={prefersReduced ? {} : { rotate: [-1, 1, -1, 0], transition: { duration: 0.4 } }}
                >
                  <div className="text-4xl mb-4">{card.emoji}</div>
                  <h3 className="text-xl font-extrabold mb-3" style={{ color: card.color }}>
                    {card.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#666' }}>
                    {card.desc}
                  </p>
                </motion.div>
              </Bounce>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. GALLERY ═══════════ */}
      <section id="gallery" className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #f0fffe 100%)' }}>
        <Blob2 className="absolute bottom-0 -left-10 w-48 h-48 opacity-8" color="#ffe66d" />
        <div className="max-w-6xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: '#333' }}>
              A Day at Little Explorers
            </h2>
            <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: '#999' }}>
              Smiles, creativity, and adventure — every single day
            </p>
          </Bounce>

          <Bounce delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
                <Image
                  src="/images/demos/bright-playful-showcase.webp"
                  alt="Little Explorers Daycare — children playing and learning"
                  width={800}
                  height={500}
                  className="w-full h-auto max-w-3xl block"
                />
              </div>
            </div>
          </Bounce>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {[
              { label: 'Arts & Crafts', color: '#ff6b6b' },
              { label: 'Outdoor Play', color: '#4ecdc4' },
              { label: 'Story Time', color: '#a78bfa' },
            ].map((item, i) => (
              <Bounce key={item.label} delay={0.15 + i * 0.1}>
                <div
                  className="flex items-center justify-center h-28 md:h-36 text-center px-4 rounded-3xl"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="text-white font-extrabold text-sm md:text-base">{item.label}</span>
                </div>
              </Bounce>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. TESTIMONIAL ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Bounce>
            <div className="mb-6 text-3xl" style={{ color: '#ffe66d' }}>
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </div>
            <blockquote className="text-xl md:text-2xl leading-relaxed mb-6 font-bold" style={{ color: '#333' }}>
              &ldquo;Little Explorers is a second home for our daughter. We feel so grateful for the care and love they show every single day.&rdquo;
            </blockquote>
            <p className="font-extrabold" style={{ color: '#ff6b6b' }}>
              &mdash; Amanda &amp; Paul K., Castlegar
            </p>
            <p className="mt-4 text-xs" style={{ color: '#ccc' }}>
              (Sample review &mdash; your real reviews go here)
            </p>
          </Bounce>
        </div>
      </section>

      {/* ═══════════ 7. ABOUT ═══════════ */}
      <section id="about" className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fffe 0%, #fffbeb 100%)' }}>
        <Blob className="absolute -bottom-16 -right-16 w-48 h-48 opacity-8" color="#ff6b6b" />
        <div className="max-w-3xl mx-auto text-center">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6" style={{ color: '#333' }}>
              About Little Explorers
            </h2>
          </Bounce>
          <Bounce delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: '#666' }}>
              Little Explorers Daycare was founded by parents, for parents. We know how important it is to find a safe, joyful place for your child to learn and grow. Our licensed team of early childhood educators creates a warm, stimulating environment where children aged 6 weeks to 5 years can explore through play, art, music, and nature. Located in the heart of Castlegar, we have been a trusted part of the community since 2016 &mdash; and we would love for your family to become part of ours.
            </p>
          </Bounce>
        </div>
      </section>

      {/* ═══════════ 8. CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-6xl mx-auto">
          <Bounce>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12" style={{ color: '#333' }}>
              Come Say Hi! 👋
            </h2>
          </Bounce>

          <div className="grid md:grid-cols-2 gap-12">
            <Bounce>
              <div className="space-y-6">
                <div>
                  <h3 className="font-extrabold mb-1" style={{ color: '#ff6b6b' }}>Phone</h3>
                  <p style={{ color: '#666' }}>(250) 555-0162</p>
                </div>
                <div>
                  <h3 className="font-extrabold mb-1" style={{ color: '#4ecdc4' }}>Hours</h3>
                  <p style={{ color: '#666' }}>Mon&ndash;Fri 7:30 AM &ndash; 5:30 PM</p>
                </div>
                <div>
                  <h3 className="font-extrabold mb-1" style={{ color: '#a78bfa' }}>Location</h3>
                  <p style={{ color: '#666' }}>456 Pine Avenue, Castlegar, BC</p>
                </div>
                <div className="confetti-parent">
                  {confettiDots.map((dot, i) => (
                    <span
                      key={i}
                      className="confetti-dot"
                      style={{
                        backgroundColor: dot.color,
                        '--tx': dot.tx,
                        '--ty': dot.ty,
                        animationDelay: `${i * 0.05}s`,
                      } as React.CSSProperties}
                    />
                  ))}
                  <a
                    href="tel:2505550162"
                    className="inline-block px-8 py-3.5 text-white font-extrabold text-sm rounded-3xl transition-all hover:scale-105 mt-4"
                    style={{ backgroundColor: '#ff6b6b', boxShadow: '0 4px 20px rgba(255,107,107,0.3)' }}
                  >
                    Book a Tour 🎈
                  </a>
                </div>
              </div>
            </Bounce>

            <Bounce delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-sm font-extrabold mb-1.5" style={{ color: '#333' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                    style={{ border: '2px solid #e0e0e0', color: '#333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4ecdc4')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-extrabold mb-1.5" style={{ color: '#333' }}>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                    style={{ border: '2px solid #e0e0e0', color: '#333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4ecdc4')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-extrabold mb-1.5" style={{ color: '#333' }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your child and schedule needs..."
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all resize-none"
                    style={{ border: '2px solid #e0e0e0', color: '#333' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4ecdc4')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3.5 text-white font-extrabold text-sm rounded-2xl transition-all hover:opacity-90"
                  style={{ backgroundColor: '#4ecdc4' }}
                >
                  Send Message
                </button>
              </form>
            </Bounce>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#333' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className="text-lg font-extrabold text-white mb-3">
                Little Explorers <span style={{ color: '#4ecdc4' }}>Daycare</span>
              </h3>
              <p className="text-sm text-white/50">
                A joyful place where children learn and grow.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Programs', 'About', 'Gallery', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white mb-3">Info</h4>
              <p className="text-sm text-white/50 mb-1">Mon&ndash;Fri 7:30 AM &ndash; 5:30 PM</p>
              <p className="text-sm text-white/50 mb-1">456 Pine Avenue, Castlegar, BC</p>
              <p className="text-sm text-white/50">(250) 555-0162</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-sm text-white/30">
              &copy; 2025 Little Explorers Daycare. All rights reserved.
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
          borderTop: '3px solid #4ecdc4',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: '#666' }}>
            This is a sample design by <strong style={{ color: '#333' }}>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=bright-playful"
            className="inline-block px-6 py-2.5 text-sm font-extrabold rounded-3xl transition-all hover:scale-105 whitespace-nowrap text-white"
            style={{ backgroundColor: '#ff6b6b' }}
          >
            Get This Style &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
