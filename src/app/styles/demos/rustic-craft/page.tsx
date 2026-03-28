'use client'

import { Bitter, Lato } from 'next/font/google'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const bitter = Bitter({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
})

/* ── shared constants ─────────────────────────────────────────── */
const PARCHMENT = '#f5e6c8'
const DARK_BROWN = '#3d2b1f'
const AMBER = '#d4942a'
const FOREST_GREEN = '#2d4a2d'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

const WOODGRAIN = `repeating-linear-gradient(
  92deg,
  rgba(61,43,31,0.04) 0px,
  rgba(61,43,31,0.02) 2px,
  transparent 2px,
  transparent 8px,
  rgba(61,43,31,0.03) 8px,
  rgba(61,43,31,0.01) 10px,
  transparent 10px,
  transparent 20px
)`

/* ── reusable noise overlay ───────────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
      style={{
        backgroundImage: NOISE_SVG,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
        opacity: 0.06,
      }}
    />
  )
}

/* ── wavy underline SVG ───────────────────────────────────────── */
function WavyUnderline({ color = AMBER }: { color?: string }) {
  return (
    <svg
      className="mx-auto mt-2"
      width="180"
      height="12"
      viewBox="0 0 180 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 C 12 2, 22 2, 32 8 S 52 14, 62 8 S 82 2, 92 8 S 112 14, 122 8 S 142 2, 152 8 S 172 14, 178 8"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/* ── stamp animation wrapper ──────────────────────────────────── */
function StampIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? { opacity: 1 } : { scale: 1.15, rotate: 2, opacity: 0 }}
      whileInView={prefersReduced ? { opacity: 1 } : { scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── fade-up animation wrapper ────────────────────────────────── */
function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                     */
/* ═══════════════════════════════════════════════════════════════ */
export default function RusticCraftDemo() {
  return (
    <div className={lato.className}>
      {/* ── 1. NAV ────────────────────────────────────────────── */}
      <nav
        className="relative px-6 py-4"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-between">
          <span
            className={`${bitter.className} text-xl md:text-2xl font-bold tracking-tight`}
            style={{ color: PARCHMENT }}
          >
            <span style={{ color: AMBER }}>Kootenay</span> Brewing Collective
          </span>

          <div className="hidden md:flex items-center gap-8">
            {['Our Beers', 'About', 'Taproom', 'Contact'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s/g, '-')}`}
                className="text-sm transition-colors"
                style={{ color: `${PARCHMENT}aa` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${PARCHMENT}aa`)}
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="tel:2505550195"
            className="hidden lg:block text-sm font-bold"
            style={{ color: PARCHMENT }}
          >
            (250) 555-0195
          </a>
        </div>
      </nav>

      {/* ── 2. HERO ───────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />

        {/* Decorative radial glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${AMBER}33, transparent)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center px-6 py-24 md:py-32 max-w-4xl mx-auto">
          <StampIn>
            <h1
              className={`${bitter.className} text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6`}
              style={{ color: PARCHMENT, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              Small Batch.<br />Big Flavour.
            </h1>
          </StampIn>

          <FadeUp delay={0.3}>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: `${PARCHMENT}cc` }}
            >
              Handcrafted ales and lagers brewed with Kootenay mountain water
              and locally sourced ingredients.
            </p>
          </FadeUp>

          <FadeUp delay={0.5}>
            <a
              href="#taproom"
              className="inline-block px-10 py-4 font-bold text-sm uppercase tracking-widest transition-all hover:brightness-110"
              style={{ backgroundColor: AMBER, color: DARK_BROWN, borderRadius: '2px' }}
            >
              Visit the Taproom
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── 3. TRUST BAR ──────────────────────────────────────── */}
      <section
        className="relative py-5 px-6 overflow-hidden"
        style={{ backgroundColor: AMBER }}
      >
        <GrainOverlay />
        <div
          className="relative z-10 max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center font-bold text-sm md:text-base"
          style={{ color: DARK_BROWN }}
        >
          <span>★★★★★ 4.8 Rating</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>Est. 2018</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>Locally Sourced</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>Open 7 Days</span>
        </div>
      </section>

      {/* ── 4. SERVICES ───────────────────────────────────────── */}
      <section
        id="our-beers"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: PARCHMENT }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-6xl mx-auto">
          <StampIn className="text-center mb-16">
            <h2
              className={`${bitter.className} text-3xl md:text-5xl font-bold mb-2`}
              style={{ color: DARK_BROWN }}
            >
              What We Brew for You
            </h2>
            <WavyUnderline />
          </StampIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                desc: 'A rugged, handcrafted website that captures your brewery\u2019s character and story.',
              },
              {
                title: 'Brand Identity',
                desc: 'Logo, colours, the works. Look as established as your oldest barrel.',
              },
              {
                title: 'Social Media',
                desc: 'Show off your taproom, your brews, and your vibe. Build a following that visits.',
              },
            ].map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.15}>
                <div
                  className="relative rounded-sm p-8 h-full overflow-hidden"
                  style={{
                    backgroundColor: DARK_BROWN,
                    border: `3px solid ${AMBER}`,
                    boxShadow: `inset 0 0 0 1px ${AMBER}55, inset 2px 2px 8px rgba(0,0,0,0.3)`,
                  }}
                >
                  {/* Woodgrain texture */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40"
                    aria-hidden="true"
                    style={{ backgroundImage: WOODGRAIN }}
                  />
                  <div className="relative z-10">
                    <h3
                      className={`${bitter.className} text-xl font-bold mb-4`}
                      style={{ color: AMBER }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="leading-relaxed text-sm"
                      style={{ color: `${PARCHMENT}cc` }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. GALLERY / ON TAP ───────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-6xl mx-auto">
          <StampIn className="text-center mb-14">
            <h2
              className={`${bitter.className} text-3xl md:text-5xl font-bold`}
              style={{ color: PARCHMENT }}
            >
              On Tap
            </h2>
            <WavyUnderline />
          </StampIn>

          {/* Showcase image */}
          <FadeUp className="mb-14">
            <div
              className="relative mx-auto max-w-3xl rounded-sm overflow-hidden"
              style={{ border: `3px solid ${AMBER}` }}
            >
              <Image
                src="/images/demos/rustic-craft-showcase.webp"
                alt="Kootenay Brewing Collective taproom and craft beers"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </FadeUp>

          {/* Beer label placeholders */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Kootenay Pale Ale',
              'Cedar Stout',
              'Trail Wheat',
              'Seasonal Special',
            ].map((beer, i) => (
              <FadeUp key={beer} delay={i * 0.1}>
                <div className='relative aspect-[4/3] rounded-xl overflow-hidden'>
                  <Image src={`/images/demos/gallery/rc-${i + 1}.webp`} alt={beer} fill className='object-cover' />
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                    <span className='text-white text-sm font-medium'>{beer}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIAL ────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: PARCHMENT }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <StampIn>
            {/* Quote marks */}
            <div
              className={`${bitter.className} text-7xl md:text-8xl leading-none mb-4 select-none`}
              style={{ color: AMBER }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <blockquote
              className="text-xl md:text-2xl leading-relaxed mb-6 italic"
              style={{ color: DARK_BROWN }}
            >
              Best brewery in the Kootenays. The atmosphere is incredible
              and the beer speaks for itself. A must-visit.
            </blockquote>

            {/* Stars */}
            <div className="text-xl mb-4" style={{ color: AMBER }} aria-label="5 out of 5 stars">
              ★★★★★
            </div>

            <cite
              className="not-italic font-bold text-sm block mb-4"
              style={{ color: DARK_BROWN }}
            >
              — James &amp; Amy S., Rossland
            </cite>

            <p className="text-xs italic" style={{ color: `${DARK_BROWN}88` }}>
              (Sample review — your real reviews go here)
            </p>
          </StampIn>
        </div>
      </section>

      {/* ── 7. ABOUT ──────────────────────────────────────────── */}
      <section
        id="about"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-3xl mx-auto">
          <StampIn className="text-center mb-10">
            <h2
              className={`${bitter.className} text-3xl md:text-5xl font-bold`}
              style={{ color: PARCHMENT }}
            >
              Our Story
            </h2>
            <WavyUnderline />
          </StampIn>

          <FadeUp>
            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: `${PARCHMENT}cc` }}
            >
              Founded in 2018 by a group of friends who shared a passion for craft
              beer and the Kootenay lifestyle, Kootenay Brewing Collective started
              as a dream scribbled on a napkin at a local pub. Today, we brew small
              batches of distinctive ales and lagers using crisp Kootenay mountain
              water and locally sourced ingredients from farms and foragers across
              the region.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: `${PARCHMENT}cc` }}
            >
              We&apos;re committed to community and sustainability in everything we
              do — from donating spent grain to local farmers, to hosting
              neighbourhood events in our taproom every week. Every pint you enjoy
              supports the land, the people, and the spirit of the Kootenays.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 8. CONTACT ────────────────────────────────────────── */}
      <section
        id="taproom"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: PARCHMENT }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-6xl mx-auto">
          <StampIn className="text-center mb-14">
            <h2
              className={`${bitter.className} text-3xl md:text-5xl font-bold`}
              style={{ color: DARK_BROWN }}
            >
              Visit the Taproom
            </h2>
            <WavyUnderline />
          </StampIn>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left — Info & Map */}
            <FadeUp>
              <div className="space-y-6">
                <div>
                  <h3
                    className={`${bitter.className} font-bold text-lg mb-2`}
                    style={{ color: DARK_BROWN }}
                  >
                    Phone
                  </h3>
                  <p style={{ color: DARK_BROWN }}>
                    <a href="tel:2505550195" className="hover:underline">(250) 555-0195</a>
                  </p>
                </div>
                <div>
                  <h3
                    className={`${bitter.className} font-bold text-lg mb-2`}
                    style={{ color: DARK_BROWN }}
                  >
                    Address
                  </h3>
                  <p style={{ color: DARK_BROWN }}>789 Riverside Dr, Trail, BC</p>
                </div>
                <div>
                  <h3
                    className={`${bitter.className} font-bold text-lg mb-2`}
                    style={{ color: DARK_BROWN }}
                  >
                    Hours
                  </h3>
                  <p style={{ color: DARK_BROWN }}>
                    Sun–Thu: 12–9 PM<br />
                    Fri–Sat: 12–11 PM
                  </p>
                </div>

                {/* Map placeholder */}
                <div
                  className="rounded-sm h-48 flex items-center justify-center"
                  style={{
                    backgroundColor: `${DARK_BROWN}11`,
                    border: `2px dashed ${DARK_BROWN}33`,
                  }}
                >
                  <span
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: `${DARK_BROWN}66` }}
                  >
                    Taproom Map
                  </span>
                </div>

                <a
                  href="#contact"
                  className="inline-block px-8 py-3.5 font-bold text-sm uppercase tracking-widest transition-all hover:brightness-110"
                  style={{ backgroundColor: AMBER, color: DARK_BROWN, borderRadius: '2px' }}
                >
                  Visit the Taproom
                </a>
              </div>
            </FadeUp>

            {/* Right — Contact Form */}
            <FadeUp delay={0.15}>
              <form
                id="contact"
                className="rounded-sm p-8 space-y-5"
                style={{
                  backgroundColor: `${PARCHMENT}`,
                  border: `2px solid ${DARK_BROWN}33`,
                  boxShadow: `inset 0 2px 6px rgba(61,43,31,0.08)`,
                }}
                onSubmit={(e) => e.preventDefault()}
              >
                <h3
                  className={`${bitter.className} text-xl font-bold mb-2`}
                  style={{ color: DARK_BROWN }}
                >
                  Send Us a Message
                </h3>

                <div>
                  <label
                    className="block text-sm font-bold mb-1"
                    style={{ color: DARK_BROWN }}
                    htmlFor="rc-name"
                  >
                    Name
                  </label>
                  <input
                    id="rc-name"
                    type="text"
                    className="w-full px-4 py-2.5 rounded-sm text-sm outline-none transition-colors focus:ring-2"
                    style={{
                      backgroundColor: '#fff',
                      border: `1.5px solid ${DARK_BROWN}44`,
                      color: DARK_BROWN,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = AMBER)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = `${DARK_BROWN}44`)}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-bold mb-1"
                    style={{ color: DARK_BROWN }}
                    htmlFor="rc-email"
                  >
                    Email
                  </label>
                  <input
                    id="rc-email"
                    type="email"
                    className="w-full px-4 py-2.5 rounded-sm text-sm outline-none transition-colors focus:ring-2"
                    style={{
                      backgroundColor: '#fff',
                      border: `1.5px solid ${DARK_BROWN}44`,
                      color: DARK_BROWN,
                    }}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-bold mb-1"
                    style={{ color: DARK_BROWN }}
                    htmlFor="rc-message"
                  >
                    Message
                  </label>
                  <textarea
                    id="rc-message"
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-sm text-sm outline-none resize-none transition-colors focus:ring-2"
                    style={{
                      backgroundColor: '#fff',
                      border: `1.5px solid ${DARK_BROWN}44`,
                      color: DARK_BROWN,
                    }}
                    placeholder="Tell us what you're looking for..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 font-bold text-sm uppercase tracking-widest transition-all hover:brightness-110"
                  style={{
                    backgroundColor: AMBER,
                    color: DARK_BROWN,
                    borderRadius: '2px',
                  }}
                >
                  Send Message
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 9. FOOTER ─────────────────────────────────────────── */}
      <footer
        className="relative py-16 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* Col 1 — Brand */}
            <div>
              <span
                className={`${bitter.className} text-xl font-bold block mb-3`}
                style={{ color: PARCHMENT }}
              >
                Kootenay Brewing Collective
              </span>
              <p className="text-sm leading-relaxed" style={{ color: `${PARCHMENT}99` }}>
                Small batch. Big flavour.<br />
                Drink Local.
              </p>
            </div>

            {/* Col 2 — Links */}
            <div>
              <h4
                className={`${bitter.className} font-bold text-sm uppercase tracking-widest mb-4`}
                style={{ color: AMBER }}
              >
                Links
              </h4>
              <ul className="space-y-2">
                {['Our Beers', 'About', 'Taproom', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
                      className="text-sm transition-colors"
                      style={{ color: `${PARCHMENT}88` }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = `${PARCHMENT}88`)}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Hours & Address */}
            <div>
              <h4
                className={`${bitter.className} font-bold text-sm uppercase tracking-widest mb-4`}
                style={{ color: AMBER }}
              >
                Visit Us
              </h4>
              <p className="text-sm leading-relaxed mb-3" style={{ color: `${PARCHMENT}99` }}>
                789 Riverside Dr, Trail, BC
              </p>
              <p className="text-sm leading-relaxed" style={{ color: `${PARCHMENT}99` }}>
                Sun–Thu: 12–9 PM<br />
                Fri–Sat: 12–11 PM
              </p>
            </div>
          </div>

          <div
            className="border-t pt-8 text-center"
            style={{ borderColor: `${PARCHMENT}22` }}
          >
            <p className="text-xs" style={{ color: `${PARCHMENT}66` }}>
              &copy; 2025 Kootenay Brewing Collective. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── BOTTOM SPACER for sticky bar ──────────────────────── */}
      <div className="h-16" aria-hidden="true" />

      {/* ── 10. STICKY BOTTOM BAR ─────────────────────────────── */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 px-6 py-3"
        style={{
          backgroundColor: `${DARK_BROWN}dd`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xs md:text-sm" style={{ color: `${PARCHMENT}aa` }}>
            This is a sample design by{' '}
            <span className="font-bold" style={{ color: PARCHMENT }}>
              Kootenay Made Digital
            </span>
          </span>
          <a
            href="/contact?style=rustic-craft"
            className="text-xs md:text-sm font-bold transition-colors hover:underline"
            style={{ color: AMBER }}
          >
            Get This Style &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
