'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Libre_Baskerville, Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion'

const heading = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

/* ─── Colour tokens ─────────────────────────────────────────── */
const C = {
  green: '#6b9a5b',
  cream: '#fdf8f0',
  terracotta: '#c17549',
  darkGreen: '#2d3b2d',
  white: '#ffffff',
  greenLight: '#e8f5e0',
  muted: '#e5e5e5',
}

/* ─── Reveal on scroll ──────────────────────────────────────── */
function Reveal({
  children,
  className = '',
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
      initial={prefersReduced ? {} : { opacity: 0, y: 28 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ─── SVG botanical corner: top-left ────────────────────────── */
function LeafCornerTL({ color = C.green, opacity = 0.18 }: { color?: string; opacity?: number }) {
  return (
    <svg
      className="absolute top-0 left-0 pointer-events-none select-none"
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <path d="M12 118 C12 65 22 35 62 12" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M12 118 C28 85 50 68 85 62" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M22 100 C22 72 34 54 58 40" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="3 4" />
      <ellipse cx="40" cy="72" rx="9" ry="4.5" stroke={color} strokeWidth="1" fill="none" transform="rotate(-30 40 72)" />
      <ellipse cx="57" cy="48" rx="8" ry="4" stroke={color} strokeWidth="1" fill="none" transform="rotate(-52 57 48)" />
    </svg>
  )
}

/* ─── SVG botanical corner: bottom-right ───────────────────── */
function LeafCornerBR({ color = C.green, opacity = 0.15 }: { color?: string; opacity?: number }) {
  return (
    <svg
      className="absolute bottom-0 right-0 pointer-events-none select-none"
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <path d="M138 32 C138 85 128 110 88 135" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M138 32 C116 65 92 78 58 88" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M124 50 C112 80 96 95 70 112" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="3 4" />
      <ellipse cx="108" cy="76" rx="10" ry="5" stroke={color} strokeWidth="1" fill="none" transform="rotate(40 108 76)" />
      <ellipse cx="84" cy="100" rx="9" ry="4.5" stroke={color} strokeWidth="1" fill="none" transform="rotate(22 84 100)" />
    </svg>
  )
}

/* ─── SVG botanical corner: top-right vine ──────────────────── */
function VineCornerTR({ color = C.green, opacity = 0.14 }: { color?: string; opacity?: number }) {
  return (
    <svg
      className="absolute top-0 right-0 pointer-events-none select-none"
      width="110"
      height="110"
      viewBox="0 0 110 110"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <path d="M98 12 C78 12 56 28 44 55 C32 82 38 98 22 104" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="68" cy="35" rx="8" ry="4" stroke={color} strokeWidth="1" fill="none" transform="rotate(-62 68 35)" />
      <ellipse cx="48" cy="62" rx="7" ry="3.5" stroke={color} strokeWidth="1" fill="none" transform="rotate(-22 48 62)" />
      <path d="M84 28 C70 50 55 65 38 80" stroke={color} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeDasharray="2 4" />
    </svg>
  )
}

/* ─── Live Redesign — The Transformation ───────────────────── */

function LiveRedesign() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [transformed, setTransformed] = useState(false)

  const dur = prefersReduced ? 0.01 : 0.9
  const stagger = prefersReduced ? 0 : 0.18

  return (
    <div ref={ref} className="w-full">
      {/* Bold label above the card */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <motion.div
          className="h-[1px] flex-1 max-w-[60px]"
          style={{ backgroundColor: transformed ? C.green : '#ccc' }}
          layout
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={transformed ? 'after-label' : 'before-label'}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
            className={`${body.className} text-xs font-bold uppercase tracking-[0.25em]`}
            style={{ color: transformed ? C.darkGreen : '#999' }}
          >
            {transformed ? '\u2728 After' : 'Before'}
          </motion.span>
        </AnimatePresence>
        <motion.div
          className="h-[1px] flex-1 max-w-[60px]"
          style={{ backgroundColor: transformed ? C.green : '#ccc' }}
          layout
        />
      </div>

      {/* Fixed-height container so both states match */}
      <div className="relative w-full" style={{ minHeight: '420px' }}>
        <AnimatePresence mode="wait">
          {!transformed ? (
            /* ── BEFORE STATE — Realistic WordPress small-town site ── */
            <motion.div
              key="before"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)', transition: { duration: 0.5 } }}
              className="relative w-full overflow-hidden"
            style={{
              backgroundColor: '#f2f0ed',
              border: '1px solid #d8d4cf',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {/* Fake WordPress-style nav bar */}
            <div
              className="flex items-center justify-between px-4 sm:px-6 py-3"
              style={{
                backgroundColor: '#3a5a2e',
                borderBottom: '3px solid #2d4a22',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#7cb342' }} />
                <span
                  className="text-sm sm:text-base font-bold"
                  style={{ fontFamily: 'Georgia, serif', color: '#fff', letterSpacing: '-0.02em' }}
                >
                  Green Thumb Landscaping
                </span>
              </div>
              <div className="hidden sm:flex gap-4">
                {['Home', 'Services', 'Gallery', 'Contact'].map((link) => (
                  <span
                    key={link}
                    className="text-xs"
                    style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}
                  >
                    {link}
                  </span>
                ))}
              </div>
              <span className="sm:hidden text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>&#9776; Menu</span>
            </div>

            {/* Hero area */}
            <div className="relative px-5 sm:px-10 py-8 sm:py-14 md:py-20 text-center">
              {/* Fake stock gradient background */}
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  background: 'linear-gradient(135deg, #4a7c59 0%, #8bc34a 50%, #f0e68c 100%)',
                }}
              />
              <div className="relative z-10">
                <p
                  className="text-xs uppercase tracking-wide mb-2 sm:mb-4"
                  style={{ fontFamily: 'Arial, sans-serif', color: '#666', letterSpacing: '0.15em' }}
                >
                  &#9733; Welcome to Our Website &#9733;
                </p>
                <h2
                  className="text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-2 sm:mb-3"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#3a3a3a',
                    fontWeight: 700,
                    textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                  }}
                >
                  Green Thumb Landscaping
                </h2>
                <p
                  className="text-sm sm:text-lg mb-1 sm:mb-2"
                  style={{ fontFamily: 'Georgia, serif', color: '#666', fontStyle: 'italic' }}
                >
                  &ldquo;Your #1 Choice for Lawn Care Since 2003!&rdquo;
                </p>
                <p
                  className="text-xs sm:text-sm mb-4 sm:mb-6"
                  style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}
                >
                  Mowing &bull; Trimming &bull; Leaf Removal &bull; Snow Plowing &bull; And More!
                </p>

                {/* Ugly stock badges row */}
                <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                  <span className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#3a5a2e', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
                    &#10003; Licensed
                  </span>
                  <span className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#3a5a2e', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
                    &#10003; Insured
                  </span>
                  <span className="px-3 py-1 text-xs rounded" style={{ backgroundColor: '#3a5a2e', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
                    &#10003; Free Estimates
                  </span>
                </div>

                {/* Phone number floating awkwardly */}
                <p className="text-sm sm:text-lg font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#3a5a2e' }}>
                  &#128222; Call Us Today: (250) 555-0115
                </p>

                {/* Dead-looking button — NOT a link, just a span */}
                <span
                  className="inline-block px-6 py-2.5 text-sm"
                  style={{
                    backgroundColor: '#4a7c59',
                    color: '#fff',
                    fontFamily: 'Arial, sans-serif',
                    borderRadius: '3px',
                    border: '1px solid #3a5a2e',
                    cursor: 'default',
                  }}
                >
                  Request a Free Estimate
                </span>

                {/* Fake "powered by" footer */}
                <p className="mt-4 sm:mt-6 text-xs" style={{ color: '#bbb', fontFamily: 'Arial, sans-serif' }}>
                  Powered by WordPress | Theme: flavor flavor flavor flavor flavor flavor flavor flavor flavor flavor flavor Twenty Twenty-Three
                </p>
              </div>
            </div>


          </motion.div>
        ) : (
          /* ── AFTER STATE — Premium, botanical, elevated ── */
          <motion.div
            key="after"
            initial={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: dur * 0.8, ease: 'easeOut' }}
            className="relative w-full overflow-hidden"
            style={{
              backgroundColor: C.cream,
              border: `1px solid ${C.green}30`,
              borderRadius: '16px',
              boxShadow: `0 8px 40px ${C.green}15, 0 2px 8px rgba(0,0,0,0.04)`,
            }}
          >
            {/* Elegant nav bar */}
            <div
              className="flex items-center justify-between px-6 sm:px-10 py-4"
              style={{ borderBottom: `1px solid ${C.green}15` }}
            >
              <motion.span
                className={`${heading.className} text-base sm:text-lg`}
                style={{ color: C.darkGreen, fontStyle: 'italic' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: dur * 0.6, delay: stagger }}
              >
                Cedarview Landscaping
              </motion.span>
              <motion.div
                className="hidden sm:flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: dur * 0.6, delay: stagger * 2 }}
              >
                {['Portfolio', 'Services', 'About', 'Contact'].map((link) => (
                  <span
                    key={link}
                    className={`${body.className} text-xs uppercase tracking-widest`}
                    style={{ color: C.green, fontWeight: 500 }}
                  >
                    {link}
                  </span>
                ))}
              </motion.div>
              {/* Mobile hamburger */}
              <motion.div
                className="sm:hidden flex flex-col gap-[5px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: dur * 0.6, delay: stagger }}
              >
                <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: C.green }} />
                <span className="block w-4 h-[2px] rounded-full" style={{ backgroundColor: C.green }} />
                <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: C.green }} />
              </motion.div>
            </div>

            {/* Hero area — lush and premium */}
            <div className="relative px-5 sm:px-10 md:px-16 py-8 sm:py-14 md:py-20">
              {/* Decorative botanical elements */}
              <motion.div
                className="absolute top-0 right-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.12 }}
                transition={{ duration: dur, delay: stagger * 3 }}
              >
                <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                  <path d="M168 12 C138 12 96 38 74 75 C52 112 58 148 32 164" stroke={C.green} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <ellipse cx="118" cy="45" rx="12" ry="6" stroke={C.green} strokeWidth="1" fill="none" transform="rotate(-55 118 45)" />
                  <ellipse cx="88" cy="82" rx="10" ry="5" stroke={C.green} strokeWidth="1" fill="none" transform="rotate(-20 88 82)" />
                  <ellipse cx="62" cy="118" rx="8" ry="4" stroke={C.green} strokeWidth="1" fill="none" transform="rotate(15 62 118)" />
                  <circle cx="145" cy="28" r="3" fill={C.green} opacity="0.3" />
                  <circle cx="48" cy="142" r="2" fill={C.green} opacity="0.2" />
                </svg>
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                transition={{ duration: dur, delay: stagger * 4 }}
              >
                <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                  <path d="M12 12 C32 32 48 68 58 98 C68 128 42 138 22 128" stroke={C.terracotta} strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="3 5" />
                  <ellipse cx="38" cy="58" rx="8" ry="4" stroke={C.terracotta} strokeWidth="0.8" fill="none" transform="rotate(40 38 58)" />
                </svg>
              </motion.div>

              <div className="relative z-10 text-center">
                {/* Business name chip */}
                <motion.div
                  className="flex justify-center mb-3 sm:mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur * 0.6, delay: stagger * 2 }}
                >
                  <span
                    className={`${body.className} text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full`}
                    style={{ backgroundColor: `${C.green}12`, color: C.green, border: `1px solid ${C.green}20` }}
                  >
                    Est. 2003 &mdash; West Kootenay
                  </span>
                </motion.div>

                {/* The headline */}
                <motion.h2
                  className={`${heading.className} text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-4 sm:mb-6`}
                  style={{ color: C.darkGreen }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur, delay: stagger * 3, ease: [0.22, 1, 0.36, 1] }}
                >
                  Your Neighbours<br />
                  Will Ask Who Did{' '}
                  <span
                    className="relative inline-block"
                    style={{ color: C.terracotta, fontStyle: 'italic' }}
                  >
                    Your Yard.
                    {/* Underline flourish */}
                    <motion.svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 200 12"
                      fill="none"
                    >
                      <motion.path
                        d="M4 8 C40 2, 80 2, 120 6 C140 8, 170 4, 196 6"
                        stroke={C.terracotta}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: dur * 1.5, delay: stagger * 5, ease: 'easeOut' }}
                      />
                    </motion.svg>
                  </span>
                </motion.h2>

                {/* Subline */}
                <motion.p
                  className={`${body.className} text-sm sm:text-lg md:text-xl max-w-lg mx-auto mb-6 sm:mb-10`}
                  style={{ color: '#5a6e5a', lineHeight: 1.7 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur * 0.8, delay: stagger * 4 }}
                >
                  Design, build, and maintain &mdash; from the first sketch to the finished garden.
                </motion.p>

                {/* Premium CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur * 0.8, delay: stagger * 5 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <a
                    href="#contact"
                    className={`${heading.className} inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
                    style={{
                      backgroundColor: C.green,
                      color: C.white,
                      boxShadow: `0 4px 20px ${C.green}35`,
                      letterSpacing: '0.02em',
                    }}
                  >
                    Get Your Free Design Sketch
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <span className={`${body.className} text-sm`} style={{ color: '#999' }}>
                    No commitment required
                  </span>
                </motion.div>

                {/* Trust signals — elegant */}
                <motion.div
                  className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-10 flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: dur, delay: stagger * 6 }}
                >
                  {['5\u2605 Google Reviews', '200+ Projects', 'Family Owned'].map((badge) => (
                    <span
                      key={badge}
                      className={`${body.className} text-xs`}
                      style={{ color: C.green, opacity: 0.7, letterSpacing: '0.05em' }}
                    >
                      {badge}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>


          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setTransformed(!transformed)}
          className={`${body.className} text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
          style={{
            backgroundColor: transformed ? `${C.green}15` : C.white,
            color: transformed ? C.darkGreen : '#666',
            border: `1.5px solid ${transformed ? `${C.green}30` : '#ddd'}`,
            boxShadow: transformed ? `0 2px 12px ${C.green}10` : '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          {transformed ? '\u2190 See the Before' : '\u2728 Watch the Transformation'}
        </button>
      </div>
    </div>
  )
}

/* ─── FAQ Accordion ─────────────────────────────────────────── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  return (
    <div
      className="rounded-xl overflow-hidden mb-3"
      style={{
        border: `1px solid ${open ? C.green : `${C.green}33`}`,
        transition: prefersReduced ? 'none' : 'border-color 0.3s ease',
      }}
    >
      <button
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ backgroundColor: open ? `${C.green}08` : C.white }}
      >
        <span className="text-sm font-medium" style={{ color: C.darkGreen }}>{question}</span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm"
          style={{
            backgroundColor: open ? C.green : `${C.green}18`,
            color: open ? C.white : C.green,
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
        <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#5a6e5a' }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CEDARVIEW LANDSCAPING — Home & Garden Demo
   ═══════════════════════════════════════════════════════════════ */
export default function HomeGardenDemo() {
  const prefersReduced = useReducedMotion()
  const [activeTab, setActiveTab] = useState<'Spring' | 'Summer' | 'Fall' | 'Winter'>('Spring')

  type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter'
  const seasonalContent: Record<Season, { services: string[]; emoji: string; accent: string }> = {
    Spring: {
      services: ['Garden Design & Planting', 'Lawn Renovation', 'Spring Cleanup', 'Mulching & Bed Prep'],
      emoji: '🌱',
      accent: C.green,
    },
    Summer: {
      services: ['Irrigation Management', 'Lawn Maintenance', 'Outdoor Living Spaces', 'Tree & Hedge Trimming'],
      emoji: '☀️',
      accent: C.terracotta,
    },
    Fall: {
      services: ['Leaf Removal', 'Winterization', 'Fall Planting', 'Drainage Solutions'],
      emoji: '🍂',
      accent: '#b8860b',
    },
    Winter: {
      services: ['Snow Removal', 'Holiday Lighting', 'Winter Pruning', 'Planning & Design Consultations'],
      emoji: '❄️',
      accent: '#4a7fa5',
    },
  }

  const faqItems = [
    {
      question: 'How long does a website take to build?',
      answer: 'Most landscaping and garden business websites are ready in 2–3 weeks. We move quickly so you can start capturing leads before the season gets busy.',
    },
    {
      question: 'Can I show a portfolio of past projects?',
      answer: 'Absolutely — a photo portfolio is one of the most powerful tools for a landscaping business. We\'ll build a gallery that lets your work sell itself. Send us your best photos and we\'ll take care of the rest.',
    },
    {
      question: 'What if I already have a website?',
      answer: 'We\'ll review what you have and either redesign it or rebuild it completely. Either way, you end up with something that actually brings in leads.',
    },
    {
      question: 'Can I list seasonal services and update them myself?',
      answer: 'Yes. We build on platforms you can manage yourself — no tech skills required. Update your services, add new project photos, or change your seasonal offerings any time.',
    },
    {
      question: 'What does it cost?',
      answer: 'A custom website starts from $1,500. Google Domination (so you rank when homeowners search for landscapers) starts from $500. Book a free consultation for a clear, itemized quote.',
    },
    {
      question: 'Do you work with both residential and commercial clients?',
      answer: 'We build websites for all types of landscaping businesses — residential lawn care, commercial grounds maintenance, garden design, and everything in between. We\'ll tailor the site to your specific clientele.',
    },
  ]

  return (
    <div
      className={body.className}
      style={{ fontFamily: 'Inter, sans-serif', backgroundColor: C.cream, color: C.darkGreen }}
    >
      {/* ─── Global styles ──────────────────────────────────── */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.06); }
        }
      `}</style>

      {/* ═══════════ 1. NAV ═══════════ */}
      <nav
        className="sticky top-0 z-40 px-6 py-4"
        style={{
          backgroundColor: C.cream,
          borderBottom: `1px solid ${C.green}33`,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span
            className={`${heading.className} text-xl md:text-2xl italic font-normal`}
            style={{ color: C.darkGreen, letterSpacing: '0.02em' }}
          >
            Cedarview Landscaping
          </span>

          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Portfolio', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium transition-colors"
                style={{ color: C.darkGreen }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.green)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.darkGreen)}
              >
                {link}
              </a>
            ))}
            <a href="tel:2505550115" className="text-sm font-bold" style={{ color: C.terracotta }}>
              (250) 555-0115
            </a>
          </div>

          <a href="tel:2505550115" className="md:hidden text-sm font-bold" style={{ color: C.terracotta }}>
            (250) 555-0115
          </a>
        </div>
      </nav>

      {/* ═══════════ 2. HERO ═══════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div
          className="absolute inset-0"
          style={{
            animation: prefersReduced ? 'none' : 'slowZoom 20s ease-in-out infinite alternate',
            transformOrigin: 'center center',
          }}
        >
          <Image
            src="/images/demos/garden-hero.webp"
            alt="Beautifully landscaped garden — Cedarview Landscaping Castlegar BC"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-0 left-0 pointer-events-none">
          <LeafCornerTL color={C.white} opacity={0.22} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-36 w-full">
          <motion.p
            className="text-sm font-medium uppercase tracking-[0.2em] mb-5"
            style={{ color: 'rgba(255,255,255,0.88)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Castlegar &amp; the West Kootenays
          </motion.p>

          <motion.h1
            className={`${heading.className} text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-3xl`}
            style={{ color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 22 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4 }}
          >
            Rooted in Beautiful
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            style={{ color: 'rgba(255,255,255,0.92)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6 }}
          >
            We transform outdoor spaces into living landscapes you&rsquo;ll love year after year.
            Thoughtful design, expert installation, and seasonal care — all rooted in the Kootenay landscape.
          </motion.p>

          <motion.a
            href="#contact"
            className="inline-block px-9 py-4 text-base font-bold rounded-full transition-all"
            style={{ backgroundColor: C.green, color: C.white }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={prefersReduced ? {} : { scale: 1.04, boxShadow: '0 8px 28px rgba(107,154,91,0.5)' }}
          >
            Request a Free Quote
          </motion.a>
        </div>
      </section>

      {/* ═══════════ 3. TRUST BAR ═══════════ */}
      <section className="py-5 px-6" style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.green}22` }}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
          {[
            { text: '★★★★★ 4.9 Rating', star: true },
            { text: '12+ Years', star: false },
            { text: 'Licensed & Insured', star: false },
            { text: 'Free Estimates', star: false },
          ].map(({ text, star }) => (
            <span
              key={text}
              className="text-sm md:text-base font-medium whitespace-nowrap"
              style={{ color: star ? C.green : C.terracotta }}
            >
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════ 4. SERVICES — with PAS intro ═══════════ */}
      <section
        id="services"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.white }}
      >
        <VineCornerTR />

        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              What We Build for You
            </h2>
            <div className="w-16 h-0.5 mb-8" style={{ backgroundColor: C.green }} />
          </Reveal>

          {/* PAS copy */}
          <Reveal delay={0.1}>
            <p
              className="text-base md:text-lg leading-relaxed mb-14 max-w-2xl italic"
              style={{ color: '#7a8e7a' }}
            >
              Your competitor gets the big landscaping contracts because their website shows a portfolio —
              yours is a Facebook page. They&rsquo;re not better landscapers. They just look more established online.
              One good website changes that immediately.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Custom Website',
                price: 'From $1,500',
                desc: 'Show off your portfolio. Let your work sell itself — before the phone even rings.',
                icon: '🌿',
              },
              {
                title: 'Google Visibility',
                price: 'From $500',
                desc: 'When homeowners search for landscapers, you come up first. More leads, less guessing.',
                icon: '📍',
              },
              {
                title: 'Smart Business Tools',
                price: 'From $750',
                desc: 'Automate quotes and seasonal reminders. Stay busy year-round without the admin headache.',
                icon: '🗓️',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.12}>
                <motion.div
                  className="relative p-8 h-full rounded-xl cursor-default"
                  style={{
                    backgroundColor: C.white,
                    borderLeft: `4px solid ${C.green}`,
                    boxShadow: '0 2px 12px rgba(107,154,91,0.10)',
                  }}
                  whileHover={
                    prefersReduced
                      ? {}
                      : { y: -6, boxShadow: '0 14px 36px rgba(107,154,91,0.20)' }
                  }
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <span className="text-3xl mb-4 block">{card.icon}</span>
                  <h3 className={`${heading.className} text-xl font-bold mb-1`} style={{ color: C.darkGreen }}>
                    {card.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${C.green}88` }}>
                    {card.price}
                  </p>
                  <p className="leading-relaxed text-sm" style={{ color: '#5a6e5a' }}>
                    {card.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.greenLight }}
      >
        <LeafCornerTL />

        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold text-center mb-3`}
              style={{ color: C.darkGreen }}
            >
              How It Works
            </h2>
            <p className="text-center text-sm mb-14" style={{ color: C.green }}>
              From first conversation to fully booked — here&rsquo;s the path
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10 relative">
            <div
              className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5"
              style={{ backgroundColor: `${C.green}33` }}
            />
            {[
              {
                step: '01',
                title: 'We Talk',
                desc: 'A free consultation — you tell us about your business, your ideal clients, and your goals for the season.',
                icon: '🌱',
              },
              {
                step: '02',
                title: 'We Build',
                desc: 'We design and develop your site in about 2 weeks — built to showcase your portfolio and convert visitors into leads.',
                icon: '🔨',
              },
              {
                step: '03',
                title: 'You Grow',
                desc: 'Launch, rank on Google, and start getting calls from homeowners who found you online — not just word of mouth.',
                icon: '🌳',
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5 text-2xl relative z-10 shadow-sm"
                    style={{ backgroundColor: C.white, border: `2px solid ${C.green}44` }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.green }}>
                    Step {item.step}
                  </span>
                  <h3 className={`${heading.className} text-xl font-bold mb-3`} style={{ color: C.darkGreen }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5a6e5a' }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SEASONAL TABS ═══════════ */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.cream }}
      >
        <LeafCornerTL />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold text-center mb-10`}
              style={{ color: C.darkGreen }}
            >
              Services for Every Season
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <div
                className="flex rounded-full p-1 gap-1 w-full max-w-sm"
                style={{ backgroundColor: `${C.green}18` }}
              >
                {(['Spring', 'Summer', 'Fall', 'Winter'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="flex-1 px-3 py-2 text-sm font-medium rounded-full transition-all"
                    style={{
                      color: activeTab === tab ? C.white : C.darkGreen,
                      backgroundColor: activeTab === tab ? C.green : 'transparent',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="relative" style={{ minHeight: 220 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
                animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <div
                  className="rounded-2xl p-8 md:p-10"
                  style={{
                    backgroundColor: C.white,
                    border: `1px solid ${C.green}22`,
                    boxShadow: '0 4px 20px rgba(107,154,91,0.08)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{seasonalContent[activeTab].emoji}</span>
                    <h3
                      className={`${heading.className} text-2xl font-bold`}
                      style={{ color: seasonalContent[activeTab].accent }}
                    >
                      {activeTab} Services
                    </h3>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {seasonalContent[activeTab].services.map((service) => (
                      <li key={service} className="flex items-center gap-3 text-base" style={{ color: C.darkGreen }}>
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: seasonalContent[activeTab].accent }} />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ 6. GALLERY / SHOWCASE ═══════════ */}
      <section
        id="portfolio"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.cream }}
      >
        <LeafCornerBR />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              Our Work
            </h2>
            <div className="w-16 h-0.5 mb-12" style={{ backgroundColor: C.green }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative max-w-3xl mx-auto mb-10 overflow-hidden rounded-xl shadow-md">
              <Image
                src="/images/demos/home-garden-showcase.webp"
                alt="Cedarview Landscaping — portfolio showcase"
                width={800}
                height={500}
                className="w-full h-auto block"
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {[
              { label: 'Residential Design', img: '/images/demos/gallery/hg-1.webp' },
              { label: 'Commercial Grounds', img: '/images/demos/gallery/hg-2.webp' },
              { label: 'Seasonal Care', img: '/images/demos/gallery/hg-3.webp' },
            ].map(({ label, img }, i) => (
              <Reveal key={label} delay={0.12 + i * 0.1}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={img} alt={label} fill className="object-cover" />
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
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.white }}
      >
        <LeafCornerBR />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold text-center mb-3`}
              style={{ color: C.darkGreen }}
            >
              Watch Your Website Transform
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: C.green }}>
              From dated to designed — in real time
            </p>
          </Reveal>

          <LiveRedesign />
        </div>
      </section>

      {/* ═══════════ 8. TESTIMONIALS (3) ═══════════ */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.cream }}
      >
        <LeafCornerTL />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              What Clients Say
            </h2>
            <div className="w-16 h-0.5 mb-16" style={{ backgroundColor: C.green }} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'We used to rely entirely on referrals. Within a month of launching our site we started getting calls from homeowners who found us on Google. It paid for itself fast.',
                author: 'Derek & Sonia M.',
                business: 'Summit Outdoor Services',
                town: 'Castlegar',
              },
              {
                quote: 'We won two commercial contracts this spring because our website showed a proper portfolio. The clients said our site looked the most professional of everyone they contacted.',
                author: 'Brad L.',
                business: 'Four Seasons Grounds',
                town: 'Nelson',
              },
              {
                quote: 'I run a small garden centre and was invisible online. Now I rank on the first page for local searches and have more walk-ins than ever. Total game changer.',
                author: 'Helen T.',
                business: 'Kootenay Bloom Garden Centre',
                town: 'Creston',
              },
            ].map((t, i) => (
              <Reveal key={t.author} delay={i * 0.15}>
                <div
                  className="relative rounded-2xl p-8 h-full"
                  style={{
                    backgroundColor: C.white,
                    border: `1px solid ${C.green}22`,
                    boxShadow: '0 4px 20px rgba(107,154,91,0.08)',
                  }}
                >
                  <div className="absolute top-5 left-5 text-2xl pointer-events-none select-none" style={{ opacity: 0.25 }} aria-hidden="true">
                    🌿
                  </div>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} style={{ color: C.green, fontSize: '1rem' }}>★</span>
                    ))}
                  </div>
                  <blockquote
                    className={`${heading.className} text-sm font-normal italic leading-relaxed mb-5`}
                    style={{ color: C.darkGreen }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="font-bold text-xs" style={{ color: C.terracotta }}>
                    &mdash; {t.author}, {t.town}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(45,59,45,0.4)' }}>{t.business}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="text-xs mt-8 italic text-center" style={{ color: 'rgba(45,59,45,0.35)' }}>
              (Sample reviews &mdash; your real reviews go here)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.white }}
      >
        <VineCornerTR />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              Common Questions
            </h2>
            <div className="w-16 h-0.5 mb-14" style={{ backgroundColor: C.green }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              {faqItems.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 10. ABOUT ═══════════ */}
      <section
        id="about"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.cream }}
      >
        <LeafCornerTL />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              Grown from the Ground Up
            </h2>
            <div className="w-16 h-0.5 mb-8" style={{ backgroundColor: C.green }} />
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: '#4a6045' }}>
              Cedarview Landscaping was founded right here in the West Kootenays, with a deep respect for the
              landscape that surrounds us. We believe the best gardens don&rsquo;t fight nature &mdash; they work
              with it. Our team brings over 12 years of hands-on experience designing, installing, and caring for
              properties across Castlegar, Nelson, Trail, and beyond.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base leading-relaxed" style={{ color: '#5a6e5a' }}>
              From intimate residential gardens to large commercial grounds, we approach every project with the
              same philosophy: listen carefully, design thoughtfully, and build something that will thrive for
              years to come. We&rsquo;re fully licensed, insured, and proud to be your neighbours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 11. CONTACT ═══════════ */}
      <section
        id="contact"
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundColor: C.white }}
      >
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2
              className={`${heading.className} text-3xl md:text-4xl font-bold mb-3`}
              style={{ color: C.darkGreen }}
            >
              Let&rsquo;s Talk About Your Space
            </h2>
            <div className="w-16 h-0.5 mb-14" style={{ backgroundColor: C.green }} />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <Reveal>
              <div className="space-y-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.green }}>Phone</p>
                  <a
                    href="tel:2505550115"
                    className="text-2xl font-bold transition-colors"
                    style={{ color: C.terracotta }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.darkGreen)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.terracotta)}
                  >
                    (250) 555-0115
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.green }}>Email</p>
                  <a
                    href="mailto:info@cedarviewlandscaping.ca"
                    className="text-base transition-colors"
                    style={{ color: C.darkGreen }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.green)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.darkGreen)}
                  >
                    info@cedarviewlandscaping.ca
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.green }}>Hours</p>
                  <p className="text-base" style={{ color: C.darkGreen }}>Mon &ndash; Sat &nbsp; 8:00 am &ndash; 5:00 pm</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.green }}>Location</p>
                  <p className="text-base" style={{ color: C.darkGreen }}>Castlegar, BC &amp; surroundings</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.green }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm rounded-lg outline-none transition-all"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.green}33`, color: C.darkGreen }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.green)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = `${C.green}33`)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.green }}>Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 text-sm rounded-lg outline-none transition-all"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.green}33`, color: C.darkGreen }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.green)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = `${C.green}33`)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.green }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project, yard size, and goals..."
                    className="w-full px-4 py-3 text-sm rounded-lg outline-none transition-all resize-none"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.green}33`, color: C.darkGreen }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.green)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = `${C.green}33`)}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 text-sm font-bold rounded-full transition-all"
                  style={{ backgroundColor: C.green, color: C.white }}
                  whileHover={prefersReduced ? {} : { scale: 1.02, boxShadow: '0 8px 24px rgba(107,154,91,0.38)' }}
                >
                  Request a Free Quote
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 12. FOOTER ═══════════ */}
      <footer className="py-14 px-6" style={{ backgroundColor: C.darkGreen }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className={`${heading.className} text-lg font-normal italic mb-3`} style={{ color: C.cream }}>
                Cedarview Landscaping
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(253,248,240,0.52)' }}>
                Rooted in beautiful. Thoughtful landscaping for Kootenay homes and businesses.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.green }}>Navigation</h4>
              <div className="flex flex-col gap-2">
                {['Services', 'Portfolio', 'About', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(253,248,240,0.48)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.cream)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,248,240,0.48)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.green }}>Get in Touch</h4>
              <p className="text-sm mb-1" style={{ color: 'rgba(253,248,240,0.48)' }}>(250) 555-0115</p>
              <p className="text-sm mb-1" style={{ color: 'rgba(253,248,240,0.48)' }}>info@cedarviewlandscaping.ca</p>
              <p className="text-sm" style={{ color: 'rgba(253,248,240,0.48)' }}>Castlegar, BC</p>
            </div>
          </div>
          <div className="pt-6 text-center" style={{ borderTop: '1px solid rgba(253,248,240,0.1)' }}>
            <span className="text-xs" style={{ color: 'rgba(253,248,240,0.22)' }}>
              &copy; 2026 Cedarview Landscaping. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ═══════════ STICKY BOTTOM BAR ═══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(45,59,45,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: `2px solid ${C.green}`,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-center sm:text-left" style={{ color: 'rgba(253,248,240,0.72)' }}>
              Sample design by{' '}
              <strong style={{ color: C.cream }}>Kootenay Made Digital</strong>
            </span>
            <a href="tel:2505550000" className="hidden sm:inline text-sm font-bold" style={{ color: C.green }}>
              (250) 555-0000
            </a>
          </div>
          <Link
            href="/contact?style=home-garden"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded-full transition-all whitespace-nowrap"
            style={{ backgroundColor: C.green, color: C.white }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 18px rgba(107,154,91,0.52)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            Like What You See? Let's Talk &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom spacer so content clears the sticky bar */}
      <div className="h-16" />
    </div>
  )
}
