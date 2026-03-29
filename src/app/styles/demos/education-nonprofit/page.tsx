'use client'

// General Sans loaded via Fontshare CDN in style block below
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'

const generalSansFont = "'General Sans', sans-serif"

/* ── Scroll reveal wrapper ── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 32 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Animated counting stat ── */
function CountUp({ target, suffix = '', duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!isInView || prefersReduced) { setDisplayed(target); return }
    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration, prefersReduced])

  return <span ref={ref}>{displayed}{suffix}</span>
}

/* ── Animated SVG icon ── */
function AnimatedIcon({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
      initial={prefersReduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      animate={isInView || prefersReduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.svg>
  )
}

/* ── Decorative blob ── */
function Blob({ size, color, opacity, top, left, right, bottom }: { size: number; color: string; opacity: number; top?: number | string; left?: number | string; right?: number | string; bottom?: number | string }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', background: color, opacity, top, left, right, bottom, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

/* ── Live Redesign ── */
const EN = {
  blue: '#3b82f6',
  darkBlue: '#2563eb',
  navy: '#1e3a5f',
  lightBg: '#eff6ff',
  slate: '#475569',
  white: '#ffffff',
  amber: '#facc15',
  orange: '#fb923c',
}

function LiveRedesign() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [transformed, setTransformed] = useState(false)

  const dur = prefersReduced ? 0.01 : 0.9
  const stagger = prefersReduced ? 0 : 0.18

  return (
    <div ref={ref} className="w-full">
      {/* Bold label */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? EN.blue : '#ccc' }} layout transition={{ duration: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className={`${"font-heading"} text-sm font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? EN.blue : '#888' }}
          >
            {transformed ? '✨ After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: transformed ? EN.blue : '#ccc' }} layout transition={{ duration: 0.4 }} />
      </div>

      {/* Fixed-height container */}
      <div className="relative w-full" style={{ height: '480px' }}>
        <AnimatePresence mode="wait">
          {!transformed ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)', transition: { duration: 0.5 } }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: '#f2f0ed', border: '1px solid #d8d4cf', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              {/* WordPress nav */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ backgroundColor: '#334e6e', borderBottom: '3px solid #1e3a5f' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#facc15' }} />
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: '#fff' }}>Kootenay Community Learning</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  {['Home', 'Programs', 'About', 'Contact'].map((link) => (
                    <span key={link} className="text-xs" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{link}</span>
                  ))}
                </div>
                <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>&#9776; Menu</span>
              </div>
              {/* Hero */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-14 text-center flex-1 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #334e6e 0%, #facc15 50%, #eff6ff 100%)' }} />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: 'Arial, sans-serif', color: '#666', letterSpacing: '0.15em' }}>&#9733; Welcome to Our Website &#9733;</p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl leading-tight mb-2" style={{ fontFamily: 'Georgia, serif', color: '#3a3a3a', fontWeight: 700 }}>
                    Kootenay Community Learning Centre
                  </h2>
                  <p className="text-sm sm:text-lg mb-1 sm:mb-2" style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}>
                    &ldquo;Making a Difference Since 2005!&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>
                    Tutoring &bull; Adult Ed &bull; Community Programs &bull; Workshops
                  </p>
                  <div className="flex justify-center gap-2 sm:gap-3 mb-4 flex-wrap">
                    {['✓ Registered Charity', '✓ Tax Receipts', '✓ Volunteer Run'].map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#334e6e', color: '#fff', fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg font-bold mb-3" style={{ fontFamily: 'Arial, sans-serif', color: '#334e6e' }}>&#128222; Call Us Today: (250) 555-0113</p>
                  <span className="inline-block px-6 py-2.5 text-sm" style={{ backgroundColor: '#334e6e', color: '#fff', fontFamily: 'Arial, sans-serif', borderRadius: '3px', cursor: 'default' }}>
                    Click Here to Donate
                  </span>
                  <p className="mt-4 text-xs" style={{ color: '#bbb', fontFamily: 'Arial, sans-serif' }}>Powered by WordPress | Theme: Twenty Twenty-Three</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: dur * 0.8, ease: 'easeOut' }}
              className="absolute inset-0 w-full overflow-hidden flex flex-col"
              style={{ backgroundColor: EN.white, border: `1px solid ${EN.blue}30`, borderRadius: '16px', boxShadow: `0 8px 40px ${EN.blue}15, 0 2px 8px rgba(0,0,0,0.04)` }}
            >
              
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/images/demos/education-nonprofit-showcase.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)' }} />
            </div>
{/* Nav — light blue-tinted, KCLC in General Sans bold, blue text */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-4" style={{ borderBottom: `1px solid ${EN.blue}15`, backgroundColor: '#f0f7ff' }}>
                <motion.span style={{ color: EN.blue, fontFamily: "'General Sans', sans-serif", fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.04em' }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  KCLC
                </motion.span>
                <motion.div className="hidden sm:flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                  {['Programs', 'Community', 'About', 'Contact'].map((link) => (
                    <span key={link} style={{ color: EN.blue, fontWeight: 600, fontFamily: "'General Sans', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{link}</span>
                  ))}
                </motion.div>
                <motion.div className="sm:hidden flex flex-col gap-[5px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur * 0.6, delay: stagger }}>
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: EN.blue }} />
                  <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: EN.blue }} />
                  <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: EN.blue }} />
                </motion.div>
              </div>

              {/* Hero — light blue-tinted white bg */}
              <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-12 flex-1 flex flex-col justify-center" style={{ background: 'linear-gradient(145deg, #e8f4ff 0%, #f5f9ff 60%, #ffffff 100%)' }}>
                {/* Warm community shapes — circles/hands/hearts geometric */}
                <motion.div className="absolute top-0 right-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: dur, delay: stagger * 3 }}>
                  <svg width="200" height="200" viewBox="0 0 160 160" fill="none">
                    {/* Heart shape simplified */}
                    <path d="M80 130 C70 120, 30 95, 30 65 C30 48, 42 38, 55 38 C64 38, 72 43, 80 52 C88 43, 96 38, 105 38 C118 38, 130 48, 130 65 C130 95, 90 120, 80 130 Z" stroke={EN.blue} strokeWidth="1.2" fill="none" opacity="0.6" />
                    {/* Hands / community arc */}
                    <circle cx="130" cy="38" r="14" stroke={EN.amber} strokeWidth="1.2" fill="none" opacity="0.65" />
                    <circle cx="28" cy="125" r="10" stroke={EN.orange} strokeWidth="1" fill="none" opacity="0.5" />
                    <circle cx="140" cy="110" r="7" fill={EN.blue} opacity="0.15" />
                    <circle cx="18" cy="60" r="5" fill={EN.amber} opacity="0.2" />
                  </svg>
                </motion.div>

                <div className="relative z-10 text-center sm:text-left">
                  <motion.div className="flex justify-center sm:justify-start mb-3 sm:mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.6, delay: stagger * 2 }}>
                    <span style={{ backgroundColor: `${EN.blue}12`, color: EN.blue, border: `1px solid ${EN.blue}22`, fontFamily: "'General Sans', sans-serif", fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0.4rem 1.25rem', borderRadius: '999px' }}>
                      Est. 2005 &mdash; West Kootenay
                    </span>
                  </motion.div>

                  <motion.h2 style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 700, color: EN.navy, lineHeight: 1.15, marginBottom: '1rem' }} className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl sm:max-w-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}>
                    127 Families Fed Last Month.<br />Yours Could Be Next &mdash;{' '}
                    <span style={{ color: EN.blue }}>
                      To Help.
                    </span>
                  </motion.h2>

                  <motion.p style={{ color: EN.slate, lineHeight: 1.7, fontFamily: "'General Sans', sans-serif", fontSize: '0.95rem', maxWidth: '28rem', marginBottom: '1.75rem' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 4 }}>
                    Community programs, adult education, and literacy support — many free. All local.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur * 0.8, delay: stagger * 5 }} className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <a href="#contact" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]" style={{ backgroundColor: EN.blue, color: EN.white, fontFamily: "'General Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', boxShadow: `0 4px 20px ${EN.blue}35` }}>
                      Volunteer This Weekend &rarr;
                    </a>
                    <span style={{ color: '#999', fontFamily: "'General Sans', sans-serif", fontSize: '0.85rem' }}>No commitment required</span>
                  </motion.div>

                  <motion.div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur, delay: stagger * 6 }}>
                    {['Registered Charity', '2000+ Served', '100% Local'].map((badge) => (
                      <span key={badge} style={{ color: EN.blue, opacity: 0.7, letterSpacing: '0.05em', fontFamily: "'General Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600 }}>{badge}</span>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Shimmer border — blue/orange gradient */}
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${EN.navy}, ${EN.blue}, ${EN.amber}, ${EN.orange}, ${EN.amber}, ${EN.blue}, ${EN.navy})`, backgroundSize: '200% 100%', animation: 'shimmer-border 3s linear infinite' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setTransformed(!transformed)}
          className={`${"font-heading"} text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{ backgroundColor: transformed ? `${EN.blue}15` : EN.white, color: transformed ? EN.navy : '#666', border: `1.5px solid ${transformed ? `${EN.blue}30` : '#ddd'}`, boxShadow: transformed ? `0 2px 12px ${EN.blue}10` : '0 1px 4px rgba(0,0,0,0.06)' }}
        >
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
        <div key={i} style={{ border: '2px solid #dbeafe', borderRadius: 14, overflow: 'hidden' }}>
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-sm transition-colors"
            style={{ color: '#1e3a5f', backgroundColor: open === i ? '#eff6ff' : '#ffffff' }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <span style={{ color: '#3b82f6', transition: 'transform 0.25s', transform: open === i ? 'rotate(180deg)' : 'none', display: 'inline-block', marginLeft: '1rem', flexShrink: 0 }}>▼</span>
          </button>
          {open === i && (
            <div className="px-6 py-4 text-sm leading-relaxed" style={{ color: '#475569', borderTop: '1px solid #dbeafe', backgroundColor: '#eff6ff' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════
   PAGE
════════════════════════════════════════ */
export default function EducationNonprofitPage() {
  const prefersReduced = useReducedMotion()

  /* Donation thermometer */
  const goalAmount = 120000
  const currentAmount = 89450
  const progressPct = Math.round((currentAmount / goalAmount) * 100)

  const faqItems = [
    {
      q: 'How long does a website take?',
      a: 'Most non-profit and education websites are designed and live within 2–3 weeks. We handle everything so your team can stay focused on your mission.',
    },
    {
      q: 'What if we already have a website?',
      a: "We can redesign it or build fresh. Either way, you'll end up with something that gives donors and parents the confidence to engage, donate, or enrol.",
    },
    {
      q: 'Can you add a donation button or form?',
      a: 'Absolutely. We integrate donation buttons, volunteer sign-up forms, and email capture — everything you need to grow your community and funding online.',
    },
    {
      q: 'What does it cost?',
      a: 'Websites start from $1,500. We also offer email marketing from $750 and Google Domination SEO from $500. Book a free consultation — we understand non-profit budgets.',
    },
    {
      q: 'Can we update programs and events ourselves?',
      a: "Yes — we build on platforms that make it easy for your staff to add news, update program listings, and post events without any technical skills.",
    },
    {
      q: 'Do you understand non-profit and community organisations?',
      a: "We do. We know your audience is donors, volunteers, parents, and community members — not customers. Every design decision we make reflects that.",
    },
    {
      q: 'Can you help with volunteer sign-up integration?',
      a: "Yes. We can build volunteer intake forms, connect to your preferred tools, and make it as easy as possible for community members to step up and help.",
    },
  ]

  return (
    <div className={`${"font-heading"} min-h-screen`} style={{ background: '#ffffff', color: '#1e3a5f' }}>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap');
        .font-heading { font-family: 'General Sans', sans-serif; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        @keyframes shimmer-border {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes thermometer-fill {
          from { width: 0%; }
          to { width: ${progressPct}%; }
        }
        .edu-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 4px 28px rgba(59,130,246,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .edu-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 16px 48px rgba(59,130,246,0.15);
        }
        .form-input {
          width: 100%;
          border: 2px solid #dbeafe;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
          font-family: inherit;
          color: #1e3a5f;
          background: #f8fafc;
        }
        .form-input:focus {
          border-color: #3b82f6;
          background: #ffffff;
        }
        .thermo-bar {
          animation: thermometer-fill 2s ease-out forwards;
        }
      `}</style>

      {/* ═══════════════════════════════════
          1. NAV
      ═══════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-10 py-4"
        style={{ background: '#eff6ff', borderBottom: '1px solid #dbeafe' }}
      >
        <span className="text-lg md:text-xl font-bold tracking-tight leading-tight max-w-[220px] md:max-w-none" style={{ color: '#1e40af' }}>
          Kootenay Community <span style={{ color: '#f59e0b' }}>Learning</span> Centre
        </span>
        <div className="hidden md:flex items-center gap-8">
          {['Programs', 'Impact', 'Volunteer', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold transition-colors duration-200" style={{ color: '#475569', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#3b82f6')} onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}>
              {item}
            </a>
          ))}
          <a href="tel:2505550113" className="text-sm font-bold" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            (250) 555-0113
          </a>
        </div>
        <a href="tel:2505550113" className="md:hidden text-sm font-bold" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          (250) 555-0113
        </a>
      </nav>

      {/* ═══════════════════════════════════
          2. HERO — Animated Impact Counter
      ═══════════════════════════════════ */}
      <section
        className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(145deg, #1e3a5f 0%, #1e40af 60%, #1e3a5f 100%)' }}
      >
        <Blob size={500} color="#3b82f6" opacity={0.25} top={-160} right={-120} />
        <Blob size={380} color="#facc15" opacity={0.12} bottom={-120} left={-80} />
        <Blob size={200} color="#fb923c" opacity={0.14} top="35%" right="5%" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 md:py-36 w-full text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
            style={{ background: 'rgba(250,204,21,0.15)', border: '1px solid rgba(250,204,21,0.3)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: -16 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span style={{ color: '#facc15', fontSize: '1.1rem' }}>★</span>
            <span className="text-sm font-semibold" style={{ color: '#fef3c7' }}>Est. 2005 — West Kootenay</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6"
            style={{ color: '#ffffff' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            Real Impact.<br />
            <span style={{ color: '#facc15' }}>Right Here.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-xl mx-auto mb-14 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.75)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Every number below is a person. A family. A story that started in these halls.
          </motion.p>

          {/* ── Animated Impact Counters ── */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-14"
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            {[
              { target: 2347, suffix: '', label: 'People Served', color: '#60a5fa', icon: '🧑‍🤝‍🧑' },
              { target: 127, suffix: '', label: 'Families Fed', color: '#fbbf24', icon: '🍎' },
              { target: 52, suffix: '', label: 'Active Volunteers', color: '#fb923c', icon: '🙌' },
              { target: 89, suffix: 'K', label: 'Raised This Year', color: '#34d399', icon: '💚' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div
                  className="text-4xl md:text-5xl font-bold"
                  style={{ color: stat.color }}
                >
                  <CountUp target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.55)' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a href="#programs" className="inline-block px-8 py-4 rounded-full text-base font-semibold transition-all duration-250" style={{ background: '#facc15', color: '#1e3a5f', textDecoration: 'none', boxShadow: '0 6px 24px rgba(250,204,21,0.35)' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#fbbf24'; e.currentTarget.style.transform = 'translateY(-2px)' }} onMouseLeave={(e) => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.transform = 'translateY(0)' }}>
              Explore Programs
            </a>
            <a href="#volunteer" className="inline-block px-8 py-4 rounded-full text-base font-semibold transition-all duration-250" style={{ background: 'transparent', color: '#ffffff', border: '2px solid rgba(255,255,255,0.4)', textDecoration: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
              Volunteer Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          3. PROGRAMS CATEGORY GRID
      ═══════════════════════════════════ */}
      <section id="programs" className="px-6 md:px-10 py-20 md:py-28" style={{ background: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#fb923c' }}>What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1e3a5f' }}>Our Programs</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#64748b' }}>
              From literacy to food security — community support in every direction
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Youth Tutoring',
                desc: 'After-school support for K–12 students struggling with core subjects. Volunteer-led, evidence-based.',
                icon: '📚',
                color: '#eab308',
                bg: '#fefce8',
                border: '#fde047',
                cta: 'Sign Up',
              },
              {
                name: 'Adult Education',
                desc: 'GED prep, digital literacy, workplace skills, and English language learning for adults of all ages.',
                icon: '🎓',
                color: '#3b82f6',
                bg: '#eff6ff',
                border: '#bfdbfe',
                cta: 'Enrol',
              },
              {
                name: 'Food Bank',
                desc: 'Weekly hampers, no questions asked. Fresh produce, pantry staples, and hygiene essentials every Thursday.',
                icon: '🥦',
                color: '#22c55e',
                bg: '#f0fdf4',
                border: '#bbf7d0',
                cta: 'Learn More',
              },
              {
                name: 'Community Events',
                desc: 'Workshops, cultural celebrations, seniors\u2019 circles, and family nights — something every week.',
                icon: '🎉',
                color: '#f97316',
                bg: '#fff7ed',
                border: '#fed7aa',
                cta: 'See Calendar',
              },
            ].map((prog, i) => (
              <Reveal key={prog.name} delay={i * 0.1}>
                <div
                  className="p-7 h-full flex flex-col"
                  style={{ backgroundColor: prog.bg, border: `2px solid ${prog.border}`, borderRadius: 20, transition: 'transform 0.25s, box-shadow 0.25s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 12px 36px ${prog.color}20` }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div className="text-3xl mb-4">{prog.icon}</div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#1e3a5f' }}>{prog.name}</h3>
                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#475569' }}>{prog.desc}</p>
                  <a
                    href="#contact"
                    className="inline-block self-start px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                    style={{ backgroundColor: prog.color, color: '#ffffff' }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    {prog.cta} →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          4. IMPACT STORIES — gallery reimagined
      ═══════════════════════════════════ */}
      <section id="impact" className="relative overflow-hidden px-6 md:px-10 py-20 md:py-28" style={{ background: '#eff6ff' }}>
        <Blob size={280} color="#3b82f6" opacity={0.07} top={-80} right={-60} />
        <Blob size={220} color="#facc15" opacity={0.10} bottom={-60} left={-40} />

        <div className="relative z-10 max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#3b82f6' }}>Stories of Change</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e3a5f' }}>Behind Every Number is a Person</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria, 42',
                program: 'Adult Literacy',
                quote: 'I came to the centre not able to read to my kids. Eighteen months later I read them a chapter book every night. My whole life changed.',
                img: '/images/demos/education-nonprofit-showcase.webp',
              },
              {
                name: 'James, 16',
                program: 'Youth Tutoring',
                quote: 'I was failing Grade 10 math. The tutors here didn\'t make me feel stupid. I got 84% on my final. First time I actually liked school.',
                img: '/images/demos/gallery/en-1.webp',
              },
              {
                name: 'The Kowalski Family',
                program: 'Food Bank',
                quote: 'When my husband lost his job, we didn\'t know how we\'d feed the kids. The food bank kept us going for four months without any shame attached.',
                img: '/images/demos/gallery/en-2.webp',
              },
            ].map((story, i) => (
              <Reveal key={story.name} delay={i * 0.1}>
                <div
                  className="edu-card overflow-hidden flex flex-col"
                  style={{ border: '1px solid #dbeafe' }}
                >
                  {/* Photo */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={story.img} alt={story.name} fill className="object-cover" />
                    {/* Play button overlay — implies video */}
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(30,58,95,0.35)' }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#3b82f6"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: '#3b82f6', color: '#fff' }}>{story.program}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex mb-3">
                      {[1,2,3,4,5].map(j => <span key={j} style={{ color: '#facc15' }}>★</span>)}
                    </div>
                    <p className="text-base italic leading-relaxed flex-1 mb-4" style={{ color: '#334155' }}>
                      &ldquo;{story.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>{story.name}</span>
                      <a href="#" className="text-xs font-semibold" style={{ color: '#3b82f6' }}>Read Story →</a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          5. DONATION THERMOMETER
      ═══════════════════════════════════ */}
      <section className="px-6 md:px-10 py-20 md:py-28" style={{ background: '#ffffff' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#22c55e' }}>Annual Fund</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1e3a5f' }}>Help Us Cross the Finish Line</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#64748b' }}>
              We&rsquo;re {progressPct}% of the way to our annual goal. You can put us over the top.
            </p>
          </Reveal>

          {/* Thermometer visual */}
          <Reveal delay={0.1}>
            <div className="p-8 md:p-12 rounded-3xl mb-10" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '2px solid #bbf7d0' }}>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-4xl font-bold mb-1" style={{ color: '#16a34a' }}>${currentAmount.toLocaleString()}</div>
                  <div className="text-sm font-semibold" style={{ color: '#4ade80' }}>raised so far</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold mb-1" style={{ color: '#64748b' }}>${goalAmount.toLocaleString()}</div>
                  <div className="text-sm font-semibold" style={{ color: '#94a3b8' }}>annual goal</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative rounded-full overflow-hidden mb-2" style={{ height: '32px', backgroundColor: '#dcfce7', border: '2px solid #86efac' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #22c55e, #16a34a)', boxShadow: '0 2px 10px rgba(34,197,94,0.4)' }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${progressPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
                />
                {/* Percentage label inside bar */}
                <div className="absolute inset-0 flex items-center px-4">
                  <span className="text-xs font-bold" style={{ color: '#ffffff' }}>{progressPct}% — Almost there!</span>
                </div>
              </div>
              <div className="text-xs text-right mb-8" style={{ color: '#4ade80' }}>${(goalAmount - currentAmount).toLocaleString()} to go</div>

              {/* Giving levels */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { amount: '$25', impact: 'Feeds a family for a week', icon: '🍎', color: '#f59e0b' },
                  { amount: '$50', impact: 'Textbooks for a student', icon: '📚', popular: true, color: '#3b82f6' },
                  { amount: '$100', impact: 'Sponsors a full program', icon: '🎓', color: '#8b5cf6' },
                ].map((level) => (
                  <div
                    key={level.amount}
                    className="relative p-5 rounded-2xl cursor-pointer transition-all"
                    style={{
                      border: level.popular ? '2px solid #3b82f6' : '2px solid #e2e8f0',
                      background: level.popular ? '#eff6ff' : '#ffffff',
                      boxShadow: level.popular ? '0 4px 20px rgba(59,130,246,0.15)' : 'none',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {level.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold" style={{ background: '#3b82f6', color: '#fff' }}>
                        Most Popular
                      </div>
                    )}
                    <div className="text-2xl mb-2">{level.icon}</div>
                    <div className="text-2xl font-bold mb-1" style={{ color: level.color }}>{level.amount}</div>
                    <div className="text-xs" style={{ color: '#64748b' }}>{level.impact}</div>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="block w-full text-center py-4 rounded-2xl text-base font-bold transition-all"
                style={{ background: '#22c55e', color: '#ffffff', textDecoration: 'none', boxShadow: '0 4px 18px rgba(34,197,94,0.30)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#16a34a' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#22c55e' }}
              >
                Donate Now →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════
          6. VOLUNTEER SIGNUP CTA
      ═══════════════════════════════════ */}
      <section id="volunteer" className="relative overflow-hidden px-6 md:px-10 py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)' }}>
        <Blob size={300} color="#3b82f6" opacity={0.18} top={-80} right={-60} />
        <Blob size={220} color="#facc15" opacity={0.12} bottom={-60} left={-40} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-4xl mb-4 block">🙌</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>Give an Hour. Change a Life.</h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
              No experience needed. Just time and heart. Our volunteers make everything possible.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="p-8 md:p-10"
              style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 24, boxShadow: '0 8px 48px rgba(0,0,0,0.25)' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>Your Name</label>
                  <input type="text" placeholder="Jane Smith" className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>Email</label>
                  <input type="email" placeholder="jane@example.com" className="form-input" />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-3" style={{ color: '#334155' }}>I&rsquo;m interested in helping with:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Youth Tutoring', 'Food Bank', 'Admin Help', 'Community Events'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" style={{ accentColor: '#3b82f6' }} />
                      <span className="text-sm" style={{ color: '#475569' }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-2xl text-base font-semibold transition-all"
                style={{ background: '#3b82f6', color: '#ffffff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 18px rgba(59,130,246,0.30)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#3b82f6' }}
              >
                I&rsquo;m In — Sign Me Up →
              </button>
              <p className="text-center text-xs mt-3" style={{ color: '#94a3b8' }}>No commitment required. We&rsquo;ll reach out to find the right fit.</p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════
          7. COMMUNITY CALENDAR
      ═══════════════════════════════════ */}
      <section className="px-6 md:px-10 py-20 md:py-28" style={{ background: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#fb923c' }}>What&rsquo;s Coming Up</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e3a5f' }}>Community Calendar</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                date: { day: '04', month: 'Apr' },
                title: 'Youth Tutoring Info Night',
                time: '6:30 PM – 8:00 PM',
                location: '123 Sample St, Castlegar',
                color: '#eab308',
              },
              {
                date: { day: '10', month: 'Apr' },
                title: 'Spring Literacy Workshop',
                time: '10:00 AM – 12:00 PM',
                location: 'Community Room B',
                color: '#3b82f6',
              },
              {
                date: { day: '17', month: 'Apr' },
                title: 'Volunteer Appreciation Night',
                time: '7:00 PM – 9:30 PM',
                location: '123 Sample St, Castlegar',
                color: '#22c55e',
              },
            ].map((event, i) => (
              <Reveal key={event.title} delay={i * 0.1}>
                <div
                  className="flex gap-4 p-5 rounded-2xl"
                  style={{ border: `2px solid ${event.color}30`, background: `${event.color}08`, transition: 'transform 0.25s, box-shadow 0.25s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${event.color}25` }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div
                    className="flex flex-col items-center justify-center text-center px-4 rounded-xl flex-shrink-0"
                    style={{ background: event.color, color: '#ffffff', minWidth: '60px', minHeight: '72px' }}
                  >
                    <span className="text-2xl font-bold leading-none">{event.date.day}</span>
                    <span className="text-xs font-semibold uppercase">{event.date.month}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>{event.title}</h3>
                    <p className="text-xs mb-1" style={{ color: '#64748b' }}>🕐 {event.time}</p>
                    <p className="text-xs" style={{ color: '#64748b' }}>📍 {event.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          8. THE TRANSFORMATION
      ═══════════════════════════════════ */}
      <section className="relative overflow-hidden px-6 md:px-10 py-20 md:py-28" style={{ background: '#eff6ff' }}>
        <Blob size={260} color="#facc15" opacity={0.10} top={-60} right="5%" />
        <Blob size={180} color="#3b82f6" opacity={0.08} bottom={-50} left="8%" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className={`${"font-heading"} text-3xl md:text-4xl font-bold`} style={{ color: '#1e3a5f' }}>Watch Your Website Transform</h2>
            <p className={`${"font-heading"} text-base mt-4`} style={{ color: '#64748b' }}>From dated to designed — in real time</p>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveRedesign />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════
          9. TESTIMONIALS
      ═══════════════════════════════════ */}
      <section className="px-6 md:px-10 py-20 md:py-28" style={{ background: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#fb923c' }}>Community Voices</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e3a5f' }}>What Organisations Are Saying</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Our donation page had zero traction before. After the redesign, online donations increased 60% in the first quarter. The new site actually communicates our impact.",
                name: 'Sarah W.',
                business: 'Kootenay Valley Food Bank',
                location: 'Castlegar, BC',
                initials: 'SW',
              },
              {
                quote: "Parents in our community told us they found us by googling 'after school programs Nakusp.' We didn't even know that was possible before. Enrolment is up.",
                name: 'Mark P.',
                business: 'Nakusp Learning Society',
                location: 'Nakusp, BC',
                initials: 'MP',
              },
              {
                quote: "Volunteer sign-ups tripled after we launched. People find us on their phones now. The site makes our little non-profit look like we have a full communications team.",
                name: 'Diane F.',
                business: 'Salmo Community Hub',
                location: 'Salmo, BC',
                initials: 'DF',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className="relative p-8 md:p-10"
                  style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', borderRadius: 24, boxShadow: '0 8px 40px rgba(59,130,246,0.10)', borderLeft: '5px solid #3b82f6' }}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: '#facc15', fontSize: '1.1rem' }}>★</span>
                    ))}
                  </div>
                  <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#1e3a5f', fontStyle: 'italic' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#3b82f6' }}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>{t.name}</div>
                      <div className="text-xs" style={{ color: '#64748b' }}>{t.business} &mdash; {t.location}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-center mt-8 text-xs italic" style={{ color: '#94a3b8' }}>
            (Sample reviews — your real reviews go here)
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════
          10. SERVICES (WEB DESIGN PITCH)
      ═══════════════════════════════════ */}
      <section className="px-6 md:px-10 py-20 md:py-28" style={{ background: '#eff6ff' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <div className="max-w-3xl mx-auto px-6 py-8 rounded-2xl mb-10" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 100%)', border: '1px solid rgba(59,130,246,0.15)' }}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#1e3a5f' }}>
                <strong>Donors and parents judge your organisation by your website first.</strong> A dated site signals that you&rsquo;re struggling — even if your programs are world-class. The school or non-profit down the road with the polished site gets the donations and the enrolments. Let&rsquo;s build you something your community is proud to share.
              </p>
            </div>

            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#3b82f6' }}>Digital Services</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e3a5f' }}>Grow your mission online</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                desc: 'A welcoming hub for students, volunteers, and donors — built with accessibility and heart.',
                color: '#3b82f6',
                pricing: 'From $1,500',
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
              },
              {
                title: 'Email Marketing',
                desc: 'Keep your community connected with program updates, success stories, and upcoming events.',
                color: '#facc15',
                iconColor: '#b45309',
                pricing: 'From $750',
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
              },
              {
                title: 'Social Media',
                desc: 'Share your impact. Celebrate your students. Grow your community far and wide.',
                color: '#fb923c',
                pricing: 'From $500',
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
              },
            ].map((service, i) => (
              <Reveal key={service.title} delay={i * 0.1}>
                <div className="edu-card p-8 h-full" style={{ borderTop: `4px solid ${service.color}` }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${service.color}15` }}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#1e3a5f' }}>{service.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748b' }}>{service.desc}</p>
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${service.color}15`, color: service.color }}>{service.pricing}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          11. FAQ
      ═══════════════════════════════════ */}
      <section className="relative overflow-hidden px-6 md:px-10 py-20 md:py-28" style={{ background: '#ffffff' }}>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#3b82f6' }}>FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e3a5f' }}>Frequently Asked Questions</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={faqItems} />
          </Reveal>
          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-block px-8 py-4 rounded-full text-sm font-semibold transition-all duration-250"
              style={{ background: '#3b82f6', color: '#ffffff', textDecoration: 'none', boxShadow: '0 4px 18px rgba(59,130,246,0.30)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#3b82f6' }}
            >
              Still have questions? Let&rsquo;s talk →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          12. CONTACT
      ═══════════════════════════════════ */}
      <section
        id="contact"
        className="relative overflow-hidden px-6 md:px-10 py-20 md:py-28"
        style={{ background: '#eff6ff' }}
      >
        <Blob size={240} color="#facc15" opacity={0.10} top={-60} right="5%" />
        <Blob size={180} color="#3b82f6" opacity={0.08} bottom={-40} left="8%" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#fb923c' }}>Get in Touch</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e3a5f' }}>We&rsquo;d love to hear from you</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <Reveal delay={0}>
              <div className="flex flex-col gap-7">
                {[
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.12 13 19.79 19.79 0 0 1 1.07 4.4 2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 21 16.92z" /></svg>, label: 'Phone', value: '(250) 555-0113', href: 'tel:2505550113' },
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>, label: 'Email', value: 'info@kclc.ca', href: 'mailto:info@kclc.ca' },
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, label: 'Hours', value: 'Mon – Fri, 9:00 AM – 5:00 PM', href: null },
                  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, label: 'Location', value: '123 Sample St, Castlegar, BC', href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eff6ff' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#94a3b8' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="font-semibold" style={{ color: '#1e3a5f', textDecoration: 'none' }}>{item.value}</a>
                      ) : (
                        <span className="font-semibold" style={{ color: '#1e3a5f' }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
                style={{ background: '#f8fafc', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 24px rgba(59,130,246,0.08)', border: '1px solid #dbeafe' }}
              >
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>Your Name</label>
                  <input type="text" placeholder="Jane Smith" className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>Email Address</label>
                  <input type="email" placeholder="jane@example.com" className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>Message</label>
                  <textarea rows={4} placeholder="Tell us how we can help..." className="form-input" style={{ resize: 'vertical' }} />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-base font-semibold transition-all duration-250"
                  style={{ background: '#3b82f6', color: '#ffffff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 18px rgba(59,130,246,0.30)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FOOTER
      ═══════════════════════════════════ */}
      <footer className="px-6 md:px-10 py-14" style={{ background: '#1e3a5f' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div>
              <div className="text-lg font-bold mb-2" style={{ color: '#93c5fd' }}>Kootenay Community Learning Centre</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>123 Sample St, Castlegar, BC · Learning for Life</div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              {['Programs', 'Impact', 'Volunteer', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#93c5fd')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="pt-8 text-xs text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}>
            &copy; {new Date().getFullYear()} Kootenay Community Learning Centre. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════
          STICKY BOTTOM BAR
      ═══════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3"
        style={{ background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '2px solid #3b82f6', boxShadow: '0 -2px 20px rgba(59,130,246,0.08)' }}
      >
        <p className="text-xs md:text-sm" style={{ color: '#64748b' }}>
          Sample design by{' '}
          <span style={{ color: '#3b82f6', fontWeight: 600 }}>Kootenay Made Digital</span>
          <span className="hidden sm:inline" style={{ color: '#94a3b8' }}> &mdash; Get a website for your organisation</span>
        </p>
        <Link
          href="/contact?style=education-nonprofit"
          className="text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-250 whitespace-nowrap"
          style={{ background: '#3b82f6', color: '#ffffff', textDecoration: 'none', boxShadow: '0 3px 14px rgba(59,130,246,0.30)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#3b82f6' }}
        >
          Like What You See? Let&rsquo;s Talk &rarr;
        </Link>
      </div>

      <div className="h-16" />
    </div>
  )
}
