'use client'

import { useState, useRef, useCallback } from 'react'
import { Bitter, Lato } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
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

/* ── Before/After Slider ──────────────────────────────────────── */
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto overflow-hidden select-none cursor-ew-resize"
      style={{ aspectRatio: '16/9', border: `3px solid ${AMBER}`, borderRadius: '2px' }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* AFTER layer */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <div className="relative z-10 text-center px-8">
          <p className="text-sm font-bold mb-2" style={{ color: AMBER }}>Kootenay Brewing Collective</p>
          <p className="text-xs italic" style={{ color: `${PARCHMENT}99` }}>Craft, character, and a tap list they can&rsquo;t resist.</p>
        </div>
        <span
          className="absolute top-3 right-3 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm"
          style={{ backgroundColor: `${AMBER}33`, color: AMBER }}
        >
          AFTER
        </span>
      </div>

      {/* BEFORE layer */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#d9ccbb', clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="text-center px-8">
          <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: '#999' }}>Mountain Craft Brewery</p>
          <p className="text-xs" style={{ color: '#aaa' }}>No photos. No tap list. Just a phone number.</p>
        </div>
        <span
          className="absolute top-3 left-3 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm"
          style={{ backgroundColor: 'rgba(0,0,0,0.12)', color: '#888' }}
        >
          BEFORE
        </span>
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 z-10"
        style={{ left: `${pos}%`, backgroundColor: AMBER }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: DARK_BROWN, border: `2.5px solid ${AMBER}`, color: AMBER, fontSize: '0.8rem', fontWeight: 800 }}
        >
          ◀▶
        </div>
      </div>
    </div>
  )
}

/* ── FAQ Accordion ───────────────────────────────────────────── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderBottom: `1px solid ${DARK_BROWN}22`,
        backgroundColor: PARCHMENT,
      }}
    >
      <button
        className="w-full text-left py-5 px-6 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-bold" style={{ color: DARK_BROWN }}>{question}</span>
        <span
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center font-bold text-base rounded-full flex-shrink-0"
          style={{
            backgroundColor: open ? AMBER : `${AMBER}22`,
            color: open ? DARK_BROWN : AMBER,
            transition: prefersReduced ? 'none' : 'all 0.3s ease',
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? '400px' : '0',
          overflow: 'hidden',
          transition: prefersReduced ? 'none' : 'max-height 0.4s ease',
        }}
      >
        <p className="pb-5 px-6 text-sm leading-relaxed" style={{ color: `${DARK_BROWN}bb` }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                     */
/* ═══════════════════════════════════════════════════════════════ */
export default function RusticCraftDemo() {
  const faqItems = [
    {
      question: 'How long does a website take to build?',
      answer: 'Most craft brewery and artisan business websites are done in 2–3 weeks. We\'ll keep you in the loop at every step.',
    },
    {
      question: 'Can I sell online or list a seasonal menu?',
      answer: 'Absolutely. We can set up an online store (Shopify starts from $3,000) or a dynamic menu you update yourself — great for rotating taps or seasonal offerings.',
    },
    {
      question: 'What if I already have a website?',
      answer: 'We\'ll review what you have and offer a redesign or a full rebuild — whatever makes sense. You won\'t be charged for what you don\'t need.',
    },
    {
      question: 'Do I need to provide photos or content?',
      answer: 'We help with both. If you have photos, great — we\'ll work with them. If not, we can guide you on what to shoot or write the copy ourselves.',
    },
    {
      question: 'What does it cost?',
      answer: 'A custom website starts from $1,500, a full brand build from $4,000, and a Shopify store from $3,000. Book a free consultation and we\'ll give you a clear quote.',
    },
  ]

  return (
    <div className={lato.className}>
      {/* ── 1. NAV ────────────────────────────────────────────── */}
      <nav
        className="relative px-6 py-4 sticky top-0 z-40"
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

      {/* ── 4. SERVICES — with PAS intro ──────────────────────── */}
      <section
        id="our-beers"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: PARCHMENT }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-6xl mx-auto">
          <StampIn className="text-center mb-8">
            <h2
              className={`${bitter.className} text-3xl md:text-5xl font-bold mb-2`}
              style={{ color: DARK_BROWN }}
            >
              What We Brew for You
            </h2>
            <WavyUnderline />
          </StampIn>

          {/* PAS copy */}
          <FadeUp delay={0.1} className="mb-16">
            <p
              className="text-center text-base md:text-lg leading-relaxed max-w-2xl mx-auto italic"
              style={{ color: `${DARK_BROWN}99` }}
            >
              Your craft is exceptional — but nobody finds you online. They find the brewery with the
              Instagram-worthy website and the Google listing. You&rsquo;re one good website away from being
              the one they find first.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                price: 'From $1,500',
                desc: 'A rugged, handcrafted website that captures your brewery\'s character and story.',
              },
              {
                title: 'Full Brand Build',
                price: 'From $4,000',
                desc: 'Logo, colours, the works. Look as established as your oldest barrel.',
              },
              {
                title: 'Shopify Store',
                price: 'From $3,000',
                desc: 'Sell merch, growlers, and gift cards online. Your taproom, open 24/7.',
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
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40"
                    aria-hidden="true"
                    style={{ backgroundImage: WOODGRAIN }}
                  />
                  <div className="relative z-10">
                    <h3
                      className={`${bitter.className} text-xl font-bold mb-1`}
                      style={{ color: AMBER }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: `${AMBER}77` }}>
                      {card.price}
                    </p>
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

      {/* ── 5. HOW IT WORKS ───────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-4xl mx-auto">
          <StampIn className="text-center mb-16">
            <h2
              className={`${bitter.className} text-3xl md:text-5xl font-bold`}
              style={{ color: PARCHMENT }}
            >
              How It Works
            </h2>
            <WavyUnderline />
          </StampIn>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8 relative">
            <div
              className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px"
              style={{ backgroundColor: `${AMBER}33` }}
            />
            {[
              {
                step: '01',
                title: 'We Talk',
                desc: 'A free consultation over a pint or a call. Tell us about your brewery, your vibe, and your goals.',
              },
              {
                step: '02',
                title: 'We Build',
                desc: 'We design and build your site in about 2 weeks — handcrafted to match the character of your brand.',
              },
              {
                step: '03',
                title: 'You Grow',
                desc: 'Launch, get found on Google, and start turning searches into tap room visits and online orders.',
              },
            ].map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative z-10"
                    style={{
                      backgroundColor: DARK_BROWN,
                      border: `3px solid ${AMBER}`,
                    }}
                  >
                    <span className={`${bitter.className} text-xl font-bold`} style={{ color: AMBER }}>
                      {item.step}
                    </span>
                  </div>
                  <h3
                    className={`${bitter.className} text-xl font-bold mb-3`}
                    style={{ color: PARCHMENT }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: `${PARCHMENT}88` }}>
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. GALLERY / ON TAP ───────────────────────────────── */}
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

      {/* ── 7. BEFORE / AFTER ─────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: PARCHMENT }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-5xl mx-auto">
          <StampIn className="text-center mb-4">
            <h2
              className={`${bitter.className} text-3xl md:text-5xl font-bold`}
              style={{ color: DARK_BROWN }}
            >
              The Difference a Website Makes
            </h2>
            <WavyUnderline />
          </StampIn>
          <FadeUp className="mb-12" delay={0.1}>
            <p className="text-center text-sm italic" style={{ color: `${DARK_BROWN}88` }}>
              First impressions happen online — make yours count
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <BeforeAfterSlider />
            <p className="text-center text-xs mt-4 italic" style={{ color: `${DARK_BROWN}77` }}>
              Drag to compare — your site will showcase your unique brews and story
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS (3) ───────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-5xl mx-auto">
          <StampIn className="text-center mb-16">
            <h2
              className={`${bitter.className} text-3xl md:text-5xl font-bold`}
              style={{ color: PARCHMENT }}
            >
              What Clients Say
            </h2>
            <WavyUnderline />
          </StampIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Our taproom visits went up 40% after the new site. People said they found us on Google and loved what they saw before they even walked in.',
                author: 'Shane M.',
                business: 'Fernie Ridge Brewing',
                town: 'Fernie',
              },
              {
                quote: 'We finally have a site that looks as good as our bread tastes. Orders started coming through the contact form the first week.',
                author: 'Lena K.',
                business: 'Summit Sourdough',
                town: 'Golden',
              },
              {
                quote: 'The online store paid for itself in three months. Locals love ordering our sauces and jams for gifts. Couldn\'t believe how easy it was.',
                author: 'Darcy &amp; Paul H.',
                business: 'Nakusp Provisions',
                town: 'Nakusp',
              },
            ].map((t, i) => (
              <FadeUp key={t.author} delay={i * 0.15}>
                <div
                  className="relative rounded-sm p-8 h-full overflow-hidden"
                  style={{
                    backgroundColor: `${DARK_BROWN}cc`,
                    border: `2px solid ${AMBER}44`,
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{ backgroundImage: WOODGRAIN }}
                  />
                  <div className="relative z-10">
                    <div className="text-xl mb-4" style={{ color: AMBER }} aria-label="5 out of 5 stars">★★★★★</div>
                    <div
                      className={`${bitter.className} text-4xl leading-none mb-3 select-none`}
                      style={{ color: AMBER, opacity: 0.5 }}
                      aria-hidden="true"
                    >
                      &ldquo;
                    </div>
                    <blockquote className="text-sm leading-relaxed mb-5 italic" style={{ color: `${PARCHMENT}cc` }}>
                      {t.quote}
                    </blockquote>
                    <cite className="not-italic font-bold text-xs block" style={{ color: AMBER }}>
                      — {t.author}, {t.town}
                    </cite>
                    <p className="text-xs mt-1" style={{ color: `${PARCHMENT}55` }}>{t.business}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <p className="text-center text-xs mt-8 italic" style={{ color: `${PARCHMENT}44` }}>
              (Sample reviews — your real reviews go here)
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 9. FAQ ────────────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: PARCHMENT }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-3xl mx-auto">
          <StampIn className="text-center mb-16">
            <h2
              className={`${bitter.className} text-3xl md:text-5xl font-bold`}
              style={{ color: DARK_BROWN }}
            >
              Common Questions
            </h2>
            <WavyUnderline />
          </StampIn>

          <FadeUp delay={0.1}>
            <div
              className="rounded-sm overflow-hidden"
              style={{ border: `2px solid ${DARK_BROWN}22` }}
            >
              {faqItems.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 10. ABOUT ─────────────────────────────────────────── */}
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

      {/* ── 11. CONTACT ───────────────────────────────────────── */}
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
            <FadeUp>
              <div className="space-y-6">
                <div>
                  <h3 className={`${bitter.className} font-bold text-lg mb-2`} style={{ color: DARK_BROWN }}>Phone</h3>
                  <p style={{ color: DARK_BROWN }}>
                    <a href="tel:2505550195" className="hover:underline">(250) 555-0195</a>
                  </p>
                </div>
                <div>
                  <h3 className={`${bitter.className} font-bold text-lg mb-2`} style={{ color: DARK_BROWN }}>Address</h3>
                  <p style={{ color: DARK_BROWN }}>123 Sample Dr, Trail, BC</p>
                </div>
                <div>
                  <h3 className={`${bitter.className} font-bold text-lg mb-2`} style={{ color: DARK_BROWN }}>Hours</h3>
                  <p style={{ color: DARK_BROWN }}>Sun–Thu: 12–9 PM<br />Fri–Sat: 12–11 PM</p>
                </div>

                <div
                  className="rounded-sm h-48 flex items-center justify-center"
                  style={{ backgroundColor: `${DARK_BROWN}11`, border: `2px dashed ${DARK_BROWN}33` }}
                >
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: `${DARK_BROWN}66` }}>
                    Taproom Map
                  </span>
                </div>

                <a
                  href="#contact"
                  className="inline-block px-8 py-3.5 font-bold text-sm uppercase tracking-widest transition-all hover:brightness-110"
                  style={{ backgroundColor: AMBER, color: DARK_BROWN, borderRadius: '2px' }}
                >
                  Like What You See? Let's Talk
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <form
                id="contact"
                className="rounded-sm p-8 space-y-5"
                style={{ backgroundColor: PARCHMENT, border: `2px solid ${DARK_BROWN}33`, boxShadow: `inset 0 2px 6px rgba(61,43,31,0.08)` }}
                onSubmit={(e) => e.preventDefault()}
              >
                <h3 className={`${bitter.className} text-xl font-bold mb-2`} style={{ color: DARK_BROWN }}>
                  Send Us a Message
                </h3>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: DARK_BROWN }} htmlFor="rc-name">Name</label>
                  <input
                    id="rc-name"
                    type="text"
                    className="w-full px-4 py-2.5 rounded-sm text-sm outline-none transition-colors"
                    style={{ backgroundColor: '#fff', border: `1.5px solid ${DARK_BROWN}44`, color: DARK_BROWN }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = AMBER)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = `${DARK_BROWN}44`)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: DARK_BROWN }} htmlFor="rc-email">Email</label>
                  <input
                    id="rc-email"
                    type="email"
                    className="w-full px-4 py-2.5 rounded-sm text-sm outline-none transition-colors"
                    style={{ backgroundColor: '#fff', border: `1.5px solid ${DARK_BROWN}44`, color: DARK_BROWN }}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: DARK_BROWN }} htmlFor="rc-message">Message</label>
                  <textarea
                    id="rc-message"
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-sm text-sm outline-none resize-none transition-colors"
                    style={{ backgroundColor: '#fff', border: `1.5px solid ${DARK_BROWN}44`, color: DARK_BROWN }}
                    placeholder="Tell us what you're looking for..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 font-bold text-sm uppercase tracking-widest transition-all hover:brightness-110"
                  style={{ backgroundColor: AMBER, color: DARK_BROWN, borderRadius: '2px' }}
                >
                  Send Message
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 12. FOOTER ────────────────────────────────────────── */}
      <footer
        className="relative py-16 px-6 overflow-hidden"
        style={{ backgroundColor: DARK_BROWN }}
      >
        <GrainOverlay />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <span className={`${bitter.className} text-xl font-bold block mb-3`} style={{ color: PARCHMENT }}>
                Kootenay Brewing Collective
              </span>
              <p className="text-sm leading-relaxed" style={{ color: `${PARCHMENT}99` }}>
                Small batch. Big flavour.<br />Drink Local.
              </p>
            </div>
            <div>
              <h4 className={`${bitter.className} font-bold text-sm uppercase tracking-widest mb-4`} style={{ color: AMBER }}>Links</h4>
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
            <div>
              <h4 className={`${bitter.className} font-bold text-sm uppercase tracking-widest mb-4`} style={{ color: AMBER }}>Visit Us</h4>
              <p className="text-sm leading-relaxed mb-3" style={{ color: `${PARCHMENT}99` }}>123 Sample Dr, Trail, BC</p>
              <p className="text-sm leading-relaxed" style={{ color: `${PARCHMENT}99` }}>Sun–Thu: 12–9 PM<br />Fri–Sat: 12–11 PM</p>
            </div>
          </div>
          <div className="border-t pt-8 text-center" style={{ borderColor: `${PARCHMENT}22` }}>
            <p className="text-xs" style={{ color: `${PARCHMENT}66` }}>
              &copy; 2025 Kootenay Brewing Collective. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── BOTTOM SPACER for sticky bar ──────────────────────── */}
      <div className="h-16" aria-hidden="true" />

      {/* ── 13. STICKY BOTTOM BAR ─────────────────────────────── */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 px-6 py-3"
        style={{
          backgroundColor: `${DARK_BROWN}ee`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderTop: `2px solid ${AMBER}55`,
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-xs md:text-sm" style={{ color: `${PARCHMENT}aa` }}>
              Sample design by{' '}
              <span className="font-bold" style={{ color: PARCHMENT }}>
                Kootenay Made Digital
              </span>
            </span>
            <a href="tel:2505550000" className="hidden sm:inline text-xs font-bold" style={{ color: AMBER }}>
              (250) 555-0000
            </a>
          </div>
          <Link
            href="/contact?style=rustic-craft"
            className="text-xs md:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap px-5 py-2.5 rounded-sm"
            style={{ backgroundColor: AMBER, color: DARK_BROWN }}
          >
            Like What You See? Let's Talk &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
