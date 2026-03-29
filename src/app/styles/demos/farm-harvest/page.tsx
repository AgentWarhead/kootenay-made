'use client'

import { Caveat, Lato } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'

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
      <path d="M0 4 Q10 0 20 4 Q30 8 40 4 Q50 0 60 4 Q70 8 80 4 Q90 0 100 4 Q110 8 120 4 Q130 0 140 4 Q150 8 160 4 Q170 0 180 4 Q190 8 200 4" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ── Leaf corner decoration ── */
function LeafCorner({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg className={className} width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <path d="M5 55 C5 30, 15 10, 55 5 C40 15, 25 30, 20 55" fill="rgba(74,124,89,0.08)" stroke="rgba(74,124,89,0.2)" strokeWidth="1" />
      <path d="M10 50 C10 35, 18 20, 45 12" fill="none" stroke="rgba(74,124,89,0.15)" strokeWidth="0.8" />
    </svg>
  )
}

/* ── Live Redesign ── */
function LiveRedesign() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [transformed, setTransformed] = useState(false)

  const dur = prefersReduced ? 0.01 : 0.9
  const stagger = prefersReduced ? 0 : 0.18

  const green = '#4a7c59'
  const darkGreen = '#3d6a4b'
  const cream = '#fefcf3'
  const warmBrown = '#6b4226'
  const amber = '#e8a838'

  return (
    <div ref={ref} className="w-full">
      {/* Bold label */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? green : '#ccc' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }}
            className={`${body.className} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? green : '#888' }}>
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? green : '#ccc' }} layout transition={{ duration: 0.4 }} />
      </div>

      {/* Fixed-height container */}
      <div className="relative w-full" style={{ height: '480px' }}>
        <AnimatePresence mode="wait">
          {!transformed ? (
            <motion.div key="before"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)', transition: { duration: 0.5 } }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: '#f2f0ed', border: '1px solid #d8d4cf', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              {/* Fake WordPress nav */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#4a7c30', borderBottom: '3px solid #3a6020' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#8bc34a' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>Valley Roots Farm</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Shop', 'About', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>☰ Menu</span>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #4a7c30 0%, #8bc34a 50%, #f0e68c 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: 'Arial, sans-serif', color: '#666' }}>★ Welcome to Our Website ★</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700 }}>Valley Roots Farm</h2>
                  <p className="text-sm sm:text-lg mb-1" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>&ldquo;Your #1 Choice for Fresh Produce Since 2003!&rdquo;</p>
                  <p className="text-xs sm:text-sm mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>Vegetables &bull; Fruit &bull; CSA Boxes &bull; Farm Stand &bull; Seasonal Goods</p>
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {['✓ Organic', '✓ Local', '✓ Farm Fresh'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#4a7c30', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg font-bold mb-3" style={{ fontFamily: 'Arial, sans-serif', color: '#4a7c30' }}>📞 Call Us Today: (250) 555-0167</p>
                  <span className="inline-block px-6 py-2.5 text-sm cursor-default" style={{ backgroundColor: '#6aaa40', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', border: '1px solid #4a7c30' }}>
                    Order Fresh Produce
                  </span>
                  <p className="mt-4 text-xs" style={{ color: '#bbb', fontFamily: 'Arial, sans-serif' }}>Powered by WordPress | Theme: Twenty Twenty-Three</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="after"
              initial={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: dur * 0.8, ease: 'easeOut' }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: cream, border: `1px solid ${green}30`, borderRadius: '16px', boxShadow: `0 8px 40px ${green}15, 0 2px 8px rgba(0,0,0,0.04)` }}
            >
              {/* Elegant nav */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${green}15` }}>
                <motion.span className={`${accent.className} text-base sm:text-lg`} style={{ color: green }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  Valley Roots Farm
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Shop', 'Our Farm', 'Gallery', 'Contact'].map((link) => (
                    <span key={link} className={`${body.className} text-xs uppercase tracking-widest`} style={{ color: warmBrown, fontWeight: 500 }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: green }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: green }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: green }} />
                </motion.div>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-14 flex-1 flex flex-col justify-center">
                {/* Organic leaf/vine SVG motif */}
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="240" height="240" viewBox="0 0 180 180" fill="none">
                    <path d="M160 10 C130 20, 100 50, 80 90 C60 130, 50 160, 20 170" stroke={green} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <ellipse cx="120" cy="45" rx="14" ry="7" stroke={green} strokeWidth="1" fill="none" transform="rotate(-45 120 45)" />
                    <ellipse cx="90" cy="85" rx="12" ry="6" stroke={green} strokeWidth="1" fill="none" transform="rotate(-20 90 85)" />
                    <ellipse cx="65" cy="125" rx="10" ry="5" stroke={green} strokeWidth="1" fill="none" transform="rotate(10 65 125)" />
                    <circle cx="148" cy="25" r="3" fill={green} opacity="0.3" />
                    <circle cx="45" cy="148" r="2" fill={green} opacity="0.2" />
                  </svg>
                </motion.div>
                <motion.div className="absolute bottom-0 left-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: dur, delay: stagger * 4 }}>
                  <svg width="200" height="200" viewBox="0 0 140 140" fill="none">
                    <path d="M10 10 C30 40, 50 70, 60 110 C70 140, 40 138, 20 128" stroke={amber} strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="3 5" />
                    <ellipse cx="38" cy="58" rx="8" ry="4" stroke={amber} strokeWidth="0.8" fill="none" transform="rotate(40 38 58)" />
                  </svg>
                </motion.div>
                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span className={`${body.className} text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full`}
                      style={{ backgroundColor: `${green}18`, color: green, border: `1px solid ${green}28` }}>
                      Est. 2003 &mdash; West Kootenay
                    </span>
                  </motion.div>
                  <motion.h2 className={`${accent.className} text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-4 sm:mb-6 sm:max-w-xl`}
                    style={{ color: '#3d2e1f' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    Farm-Fresh. Delivered to{' '}
                    <span className="relative inline-block" style={{ color: darkGreen }}>
                      Your Door.
                      <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                        <motion.path d="M4 8 Q40 2 80 6 Q120 10 160 5 Q180 3 196 7" stroke={green} strokeWidth="2" strokeLinecap="round" fill="none"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur * 1.5, delay: stagger * 5, ease: 'easeOut' }} />
                      </motion.svg>
                    </span>
                  </motion.h2>
                  <motion.p className={`${body.className} text-sm sm:text-lg max-w-md sm:mx-0 mx-auto mb-6`} style={{ color: warmBrown, lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Certified organic. Weekly delivery. 50+ varieties grown right here in the Kootenays.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#shop" className={`${body.className} inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] font-bold`}
                      style={{ backgroundColor: green, color: cream, boxShadow: `0 4px 20px ${green}35` }}>
                      Shop This Week&rsquo;s Harvest
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <span className={`${body.className} text-sm`} style={{ color: '#999' }}>No commitment required</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['100% Local', 'Weekly Delivery', '50+ Varieties'].map((badge) => (
                      <span key={badge} className={`${body.className} text-xs`} style={{ color: green, opacity: 0.7, letterSpacing: '0.05em' }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
              {/* Shimmer border */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-[16px]" style={{ background: `linear-gradient(90deg, transparent, ${green}, ${amber}, ${green}, transparent)`, animation: 'shimmer-border 3s linear infinite', backgroundSize: '200% 100%' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button onClick={() => setTransformed(!transformed)}
          className={`${body.className} text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{
            backgroundColor: transformed ? `${green}15` : '#fff',
            color: transformed ? darkGreen : '#666',
            border: `1.5px solid ${transformed ? `${green}30` : '#ddd'}`,
            boxShadow: transformed ? `0 2px 12px ${green}10` : '0 1px 4px rgba(0,0,0,0.06)',
          }}>
          {transformed ? '← See the Before' : '✨ Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ── FAQ Accordion ── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(74,124,89,0.2)', backgroundColor: '#ffffff' }}>
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            style={{ color: open === i ? '#4a7c59' : '#3d2e1f' }}
          >
            <span className={`${accent.className} text-xl md:text-2xl`}>{item.q}</span>
            <span className="text-xl ml-4 flex-shrink-0" style={{ color: '#4a7c59' }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div className="px-6 pb-5" style={{ color: '#6b4226', borderTop: '1px solid rgba(74,124,89,0.15)' }}>
              <p className="leading-relaxed pt-4">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   VALLEY ROOTS FARM — Farm & Harvest Demo
   ══════════════════════════════════════════════════════════════ */
export default function FarmHarvestDemo() {
  const prefersReduced = useReducedMotion()

  const vineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: vineRef,
    offset: ['start start', 'end end'],
  })
  const vineLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className={body.className} style={{ fontFamily: 'Lato, sans-serif', backgroundColor: '#fefcf3', color: '#3d2e1f' }}>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @keyframes shimmer-border {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav style={{ backgroundColor: '#fefcf3', borderBottom: '1px solid rgba(74,124,89,0.2)' }} className="px-6 py-5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className={`${accent.className} text-2xl md:text-3xl`} style={{ color: '#4a7c59' }}>Valley Roots Farm</span>
          <div className="hidden md:flex items-center gap-8">
            {['Shop', 'Our Farm', 'Gallery', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm tracking-wide transition-colors"
                style={{ color: '#6b4226' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#4a7c59')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6b4226')}
              >{link}</a>
            ))}
            <a href="tel:2505550167" className="text-sm font-bold" style={{ color: '#4a7c59' }}>(250) 555-0167</a>
          </div>
          <a href="tel:2505550167" className="md:hidden text-sm font-bold" style={{ color: '#4a7c59' }}>(250) 555-0167</a>
        </div>
      </nav>

      {/* ── Growing vine border ── */}
      <div ref={vineRef} className="relative">
        <motion.svg className="fixed left-0 top-0 h-screen w-8 z-30 hidden lg:block pointer-events-none" viewBox="0 0 30 800" preserveAspectRatio="none" fill="none">
          <motion.path d="M15 0 C20 50, 8 100, 15 150 C22 200, 5 250, 15 300 C25 350, 8 400, 15 450 C22 500, 5 550, 15 600 C25 650, 8 700, 15 800" stroke="#4a7c59" strokeWidth="2" fill="none" strokeLinecap="round" style={{ pathLength: prefersReduced ? 1 : vineLength, opacity: 0.25 }} />
          <motion.path d="M15 120 C20 110, 28 115, 25 125 C22 135, 15 130, 15 120Z" fill="rgba(74,124,89,0.2)" style={{ opacity: prefersReduced ? 1 : vineLength }} />
          <motion.path d="M15 300 C10 290, 2 295, 5 305 C8 315, 15 310, 15 300Z" fill="rgba(74,124,89,0.2)" style={{ opacity: prefersReduced ? 1 : vineLength }} />
          <motion.path d="M15 500 C20 490, 28 495, 25 505 C22 515, 15 510, 15 500Z" fill="rgba(74,124,89,0.2)" style={{ opacity: prefersReduced ? 1 : vineLength }} />
          <motion.path d="M15 680 C10 670, 2 675, 5 685 C8 695, 15 690, 15 680Z" fill="rgba(74,124,89,0.2)" style={{ opacity: prefersReduced ? 1 : vineLength }} />
        </motion.svg>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/demos/farm-hero.webp" alt="Valley Roots Farm — fields and harvest in the Kootenays" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative max-w-4xl mx-auto text-center px-6 py-32 md:py-44 w-full">
          <motion.p className="text-sm uppercase tracking-[0.3em] mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Grown with love in the Kootenays
          </motion.p>
          <motion.h1 className={`${accent.className} text-5xl md:text-7xl lg:text-8xl leading-tight mb-8`} style={{ color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            Valley Roots Farm
          </motion.h1>
          <motion.div initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
            <a href="#shop" className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all rounded-full"
              style={{ backgroundColor: '#4a7c59', color: '#fefcf3' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3d6a4b')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a7c59')}>
              Shop the Harvest
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <div style={{ backgroundColor: '#4a7c59' }} className="py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm" style={{ color: '#fefcf3' }}>
          <span className="flex items-center gap-2"><span style={{ color: '#e8a838' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span><span className="font-bold">4.9 Rating</span></span>
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
            <div className="text-center mb-8">
              <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>What We Can Do For You</h2>
              <div className="max-w-xs mx-auto"><WavyUnderline color="#4a7c59" /></div>
            </div>
          </Reveal>

          {/* PAS Copy */}
          <Reveal delay={0.1}>
            <div className="max-w-2xl mx-auto mb-14 p-6 rounded-lg" style={{ backgroundColor: '#f5f0e3', border: '2px solid rgba(74,124,89,0.2)', borderLeft: '4px solid #4a7c59' }}>
              <p className="text-lg leading-relaxed text-center" style={{ color: '#6b4226' }}>
                The farm stand down the highway has an online store. Yours runs on word of mouth. They&apos;re selling CSA boxes while you&apos;re still posting signs at the road. Let&apos;s get your harvest in front of the people looking to buy it.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Online Store', price: 'From $3,000', desc: 'Sell your harvest online. CSA boxes, fresh produce, gift packs, local delivery — your store never closes.' },
              { title: 'Email Marketing', price: 'From $750', desc: "Keep your regulars updated on what's in season, what's coming to the stand, and what's on special." },
              { title: 'Website & Brand', price: 'From $1,500', desc: 'Tell your family story. Show your farm. Make customers feel connected before they even visit.' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <div className="p-8 text-center transition-all cursor-default rounded-lg"
                  style={{ backgroundColor: '#ffffff', border: '1px solid rgba(74,124,89,0.15)', boxShadow: '0 2px 16px rgba(74,124,89,0.06)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(74,124,89,0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 16px rgba(74,124,89,0.06)')}
                >
                  <h3 className={`${accent.className} text-2xl md:text-3xl mb-1`} style={{ color: '#4a7c59' }}>{card.title}</h3>
                  <p className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: 'rgba(74,124,89,0.7)' }}>{card.price}</p>
                  <p className="leading-relaxed" style={{ color: '#6b4226' }}>{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e3' }}>
        <LeafCorner className="absolute bottom-4 left-4 opacity-40 rotate-180" />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>How It Works</h2>
              <div className="max-w-xs mx-auto"><WavyUnderline color="#4a7c59" /></div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'We Talk', desc: 'Free consultation over the phone or at the farm. You tell us your story, your customers, your seasons. We listen.' },
              { num: '02', title: 'We Build', desc: 'Your website or online store built in 2–3 weeks. CSA sign-up, product listings, your farm story — all of it.' },
              { num: '03', title: 'You Grow', desc: 'Customers find you online, join your CSA, place orders from home. You focus on farming. We handle the digital.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.2}>
                <div className="text-center p-8 rounded-lg" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(74,124,89,0.15)' }}>
                  <div className={`${accent.className} text-5xl mb-4`} style={{ color: '#4a7c59' }}>{step.num}</div>
                  <div className="w-12 h-0.5 mx-auto mb-5" style={{ backgroundColor: '#4a7c59', opacity: 0.4 }} />
                  <h3 className={`${accent.className} text-2xl mb-3`} style={{ color: '#3d2e1f' }}>{step.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: '#6b4226' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY / SHOWCASE ═══════════ */}
      <section id="gallery" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#fefcf3' }}>
        <LeafCorner className="absolute bottom-4 right-4 opacity-60 rotate-180" />
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>From Our Farm</h2>
              <div className="max-w-xs mx-auto"><WavyUnderline color="#4a7c59" /></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="overflow-hidden w-full max-w-3xl rounded-lg" style={{ border: '2px solid rgba(74,124,89,0.2)' }}>
                <Image src="/images/demos/farm-harvest-showcase.webp" alt="Valley Roots Farm — fresh harvest showcase" width={800} height={450} className="w-full h-auto block" style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {['Summer Harvest', 'Berry Season', 'Farm Stand'].map((label, i) => (
              <Reveal key={label} delay={0.15 + i * 0.1}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={`/images/demos/gallery/fh-${i + 1}.webp`} alt={label} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-sm font-medium">{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. THE TRANSFORMATION ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e3' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-4">
              <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>Watch Your Website Transform</h2>
              <div className="max-w-xs mx-auto"><WavyUnderline color="#4a7c59" /></div>
            </div>
            <p className="text-center mb-12 text-sm uppercase tracking-widest" style={{ color: 'rgba(61,46,31,0.5)' }}>From dated to designed — in real time</p>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveRedesign />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#fefcf3' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>What Farmers Say</h2>
              <div className="max-w-xs mx-auto"><WavyUnderline color="#4a7c59" /></div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "We launched our online CSA sign-up in March. By April we had more members than the entire previous season. Word of mouth is great but a website is better.",
                name: 'Claire D.',
                biz: "Driftwood Organics — Creston, BC",
              },
              {
                quote: "People used to drive past us to the farm stand they found on Google. Now we're the one they find first. Our berry season pre-orders sold out in a week.",
                name: 'Tom & Mary F.',
                biz: "Kootenay Berry Farm — Nakusp, BC",
              },
              {
                quote: "The online store paid for itself in two weekends. I can take orders while I'm in the field. My kids think I'm a genius. They don't need to know it was Kootenay Made.",
                name: 'Paul O.',
                biz: "Orchard Lane Farm — Kaslo, BC",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="p-8 h-full flex flex-col rounded-lg" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(74,124,89,0.15)', boxShadow: '0 2px 16px rgba(74,124,89,0.06)' }}>
                  <div className="flex gap-1 mb-5 justify-center text-xl" style={{ color: '#e8a838' }}>
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </div>
                  <blockquote className={`${accent.className} flex-1 text-xl md:text-2xl leading-relaxed mb-6 text-center`} style={{ color: '#3d2e1f' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="text-center">
                    <p className="font-bold text-sm uppercase tracking-widest" style={{ color: '#4a7c59' }}>{t.name}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(61,46,31,0.5)' }}>{t.biz}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-8 text-center text-xs italic" style={{ color: 'rgba(61,46,31,0.35)' }}>
              (Sample reviews — your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e3' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>Common Questions</h2>
              <div className="max-w-xs mx-auto"><WavyUnderline color="#4a7c59" /></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={[
              { q: 'How long does a website take?', a: 'Most farm sites are live in 2–3 weeks. We have templates built for farm stands, CSA operations, and orchard stores that we can customize fast.' },
              { q: 'What if my inventory changes every week?', a: 'We build on platforms you can update yourself in minutes — add a new product, mark something sold out, post a harvest update. No technical skills needed.' },
              { q: 'Can I take online orders and CSA sign-ups?', a: 'Yes. A Shopify store starts at $3,000 and handles CSA subscriptions, one-time orders, local pickup, and delivery. Your farm stand runs 24/7 online.' },
              { q: 'What does it cost?', a: 'A simple farm website starts at $1,500. An online store from $3,000. Email marketing from $750. Book a free consultation for a firm quote.' },
              { q: 'Do I need to provide photos and copy?', a: 'We help with both. If you have photos of your farm and fields, great — we\'ll use them. If not, we can help with stock imagery that tells your story authentically.' },
              { q: 'Can I update seasonal hours and what\'s available?', a: 'Absolutely. You\'ll be able to update hours, add seasonal products, and post harvest news any time — from your phone, from the field.' },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section id="our-farm" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#fefcf3' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>Our Story</h2>
            <div className="max-w-xs mx-auto mb-10"><WavyUnderline color="#4a7c59" /></div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: '#6b4226' }}>
              Valley Roots Farm has been a labour of love since 1994, when our family first put seeds in the rich Kootenay soil. What started as a small market garden has grown into a certified organic farm supplying fresh produce, berries, and seasonal CSA boxes to families across the region. We believe in sustainable farming, honest food, and the power of knowing exactly where your meals come from. Every Saturday morning, you&rsquo;ll find us at the Castlegar farmers&rsquo; market &mdash; come say hello, grab some tomatoes, and become part of the Valley Roots family.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section id="contact" className="relative py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e3' }}>
        <LeafCorner className="absolute top-4 right-4 opacity-60" flip />
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className={`${accent.className} text-3xl md:text-5xl mb-2`} style={{ color: '#4a7c59' }}>Get In Touch</h2>
              <div className="max-w-xs mx-auto"><WavyUnderline color="#4a7c59" /></div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div className="space-y-6">
                <div><h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Phone</h3><p style={{ color: '#6b4226' }}>(250) 555-0167</p></div>
                <div><h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Email</h3><p style={{ color: '#6b4226' }}>hello@valleyrootsfarm.ca</p></div>
                <div><h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Farm Stand Hours</h3><p style={{ color: '#6b4226' }}>Saturdays 9:00 AM &ndash; 1:00 PM</p></div>
                <div><h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Location</h3><p style={{ color: '#6b4226' }}>Castlegar, BC</p></div>
                <a href="tel:2505550167" className="inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all mt-4 rounded-full"
                  style={{ backgroundColor: '#4a7c59', color: '#fefcf3' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3d6a4b')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a7c59')}>
                  Call Us
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 text-sm outline-none transition-all rounded-lg"
                    style={{ backgroundColor: '#ffffff', border: '1px solid rgba(74,124,89,0.2)', color: '#3d2e1f' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4a7c59')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(74,124,89,0.2)')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Email</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 text-sm outline-none transition-all rounded-lg"
                    style={{ backgroundColor: '#ffffff', border: '1px solid rgba(74,124,89,0.2)', color: '#3d2e1f' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4a7c59')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(74,124,89,0.2)')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4a7c59' }}>Message</label>
                  <textarea rows={4} placeholder="CSA sign-up, bulk orders, farm visits..." className="w-full px-4 py-3 text-sm outline-none transition-all resize-none rounded-lg"
                    style={{ backgroundColor: '#ffffff', border: '1px solid rgba(74,124,89,0.2)', color: '#3d2e1f' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#4a7c59')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(74,124,89,0.2)')} />
                </div>
                <button type="submit" className="w-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all rounded-full"
                  style={{ backgroundColor: '#4a7c59', color: '#fefcf3' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3d6a4b')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a7c59')}>
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 12. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#4a7c59' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${accent.className} text-2xl mb-3`} style={{ color: '#fefcf3' }}>Valley Roots Farm</h3>
              <p className="text-sm" style={{ color: 'rgba(254,252,243,0.6)' }}>Grown with love in the Kootenays since 1994.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#e8a838' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Shop', 'Our Farm', 'Gallery', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm transition-colors" style={{ color: 'rgba(254,252,243,0.6)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fefcf3')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(254,252,243,0.6)')}>{link}</a>
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
            <span className="text-sm" style={{ color: 'rgba(254,252,243,0.4)' }}>&copy; 2025 Valley Roots Farm. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{ backgroundColor: 'rgba(254,252,243,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '2px solid #4a7c59' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: '#6b4226' }}>
            Sample design by <strong style={{ color: '#3d2e1f' }}>Kootenay Made Digital</strong>
          </span>
          <Link href="/contact?style=farm-harvest"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap rounded-full"
            style={{ backgroundColor: '#4a7c59', color: '#fefcf3' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3d6a4b')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a7c59')}>
            LIKE WHAT YOU SEE? LET'S TALK &rarr;
          </Link>
        </div>
      </div>

      <div className="h-16" />

      </div>{/* end vine ref wrapper */}
    </div>
  )
}
