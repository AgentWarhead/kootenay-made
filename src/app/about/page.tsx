'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import MountainDivider from '@/components/MountainDivider';
import AmbientOrbs from '@/components/AmbientOrbs';


/* ── SVG Icon with stroke draw animation ── */
function DrawIcon({ d, viewBox = '0 0 24 24', delay = 0 }: { d: string; viewBox?: string; delay?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d={d}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay, ease: 'easeInOut' }}
        className="text-copper"
        style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
      />
    </svg>
  );
}

/* ── Value icon that fills from greyscale to copper on scroll ── */
function ValueIcon({ d, delay = 0 }: { d: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center shrink-0"
      initial={{ filter: 'grayscale(1)' }}
      animate={inView ? { filter: 'grayscale(0)' } : {}}
      transition={{ duration: 0.8, delay: delay + 0.3 }}
    >
      <DrawIcon d={d} delay={delay} />
    </motion.div>
  );
}

/* ── Currently widget ── */
function CurrentlyWidget() {
  const items = [
    { label: 'Currently building', value: 'Kootenay Made Digital', icon: '🔨' },
    { label: 'Currently located', value: 'Castlegar, BC', icon: '⛰️' },
    { label: 'Currently available', value: 'New clients welcome', icon: '✓', highlight: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mt-8 inline-block"
    >
      <div className="glass-card-dark rounded-xl p-5 max-w-xs">
        <p className="text-copper text-xs font-semibold uppercase tracking-widest mb-3">Currently</p>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-sm">{item.icon}</span>
              <div>
                <p className="text-dark-text-muted text-[10px] uppercase tracking-wider">{item.label}</p>
                <p className={`text-sm font-medium ${item.highlight ? 'text-forest-light' : 'text-cream'}`}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Logo reveal with clip-path wipe ── */
function LogoReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="w-48 sm:w-64 md:w-80 shrink-0"
    >
      <Image
        src="/brand/kmd-stacked-nobg.png"
        alt="Kootenay Made Digital"
        width={256}
        height={256}
        className="w-full h-auto brightness-[1.5]"
      />
    </motion.div>
  );
}

const values = [
  {
    title: 'Rooted Here',
    desc: 'Not a remote agency. We live, work, and shop in the same community as our clients.',
    iconPath: 'M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z',
  },
  {
    title: 'Modern Tools',
    desc: 'We use AI and the latest technology to deliver faster, better results — and pass the savings to you.',
    iconPath: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 14l-4-4 1.4-1.4L10 13.2l6.6-6.6L18 8l-8 8z',
  },
  {
    title: 'Genuine Care',
    desc: "Your success is our success. We're building a reputation in a small community, and we take that seriously.",
    iconPath: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z',
  },
  {
    title: 'Real Partnership',
    desc: "No jargon, no upsells. Just clear communication and honest advice — even if it means telling you what you don't need.",
    iconPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  },
];

const storyParagraphs = [
  "The world is changing fast. Smart tools and AI aren't coming — they're here. And the businesses that use them well are going to thrive. We started Kootenay Made Digital because the hardest-working businesses in the West Kootenays deserve the same digital tools the big cities have — at prices that make sense here.",
  "I'm a Castlegar-based developer who uses AI and modern tools to work faster and smarter — which means better results for less money. It's not about robots replacing people. It's about a one-person shop delivering the quality of a ten-person agency.",
  "What makes Kootenay Made different? I use modern AI-powered tools alongside traditional design skills. This means I can deliver the quality of work you'd expect from a big-city agency — but faster and at prices that make sense for a Kootenay business. No bloated teams. No six-month timelines. No $15,000 invoices.",
  "But technology is only half the story. The other half is being here. Being part of this community. Understanding that the plumber in Trail has different needs than the yoga studio in Nelson. Knowing that \"let's grab a coffee and figure this out\" is worth more than a hundred Zoom calls.",
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Header with topo lines */}
      <section className="aurora-bg grain pt-32 pb-20 relative overflow-hidden">
        {/* Subtle topographic line pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none topo-grid">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topo-about" patternUnits="userSpaceOnUse" width="200" height="200">
                <path d="M0 100 Q50 80, 100 100 T200 100" fill="none" stroke="#C17817" strokeWidth="0.5" />
                <path d="M0 60 Q50 40, 100 60 T200 60" fill="none" stroke="#C17817" strokeWidth="0.5" />
                <path d="M0 140 Q50 120, 100 140 T200 140" fill="none" stroke="#C17817" strokeWidth="0.5" />
                <path d="M0 180 Q60 160, 120 180 T200 170" fill="none" stroke="#C17817" strokeWidth="0.3" />
                <path d="M0 20 Q40 10, 80 25 T200 30" fill="none" stroke="#C17817" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topo-about)" />
          </svg>
        </div>

        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={[{ label: 'About' }]} dark />
          <ScrollReveal>
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">The Basecamp</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight max-w-3xl">
              A neighbour who happens to build great websites.
            </h1>
          </ScrollReveal>
          <CurrentlyWidget />
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" bgColor="#1A1D20" />

      {/* Story — alternating slide-in */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl">
            <ScrollReveal>
              <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl md:text-4xl font-bold text-slate mb-8">
                The short version
              </h2>
            </ScrollReveal>
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              {storyParagraphs.map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p>{text}</p>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-slate font-medium">
                  Every business in the Kootenays deserves a digital presence that matches the quality of their work. That&apos;s what we&apos;re here to build.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* Values with greyscale → copper fill */}
      <section className="bg-white py-20 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl md:text-4xl font-bold text-slate mb-12">
              What we believe
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="flex gap-5">
                  <ValueIcon d={v.iconPath} delay={i * 0.15} />
                  <div>
                    <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-slate mb-2">{v.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <MountainDivider variant={2} fillColor="#1A1D20" bgColor="#F8F4F0" />

      {/* Why Kootenay Made — with logo reveal */}
      <section className="bg-slate grain py-20 sm:py-24 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
            <div className="max-w-xl flex-1">
              <ScrollReveal>
                <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl md:text-4xl font-bold text-cream mb-6">
                  Why &quot;Kootenay Made&quot;?
                </h2>
                <p className="text-dark-text-muted text-lg leading-relaxed mb-6">
                  &quot;Made&quot; is intentional. It implies craftsmanship — something built with care, skill, and intention. Not assembled from a template. Not churned out by a factory. Made.
                </p>
                <p className="text-dark-text-muted text-lg leading-relaxed">
                  And &quot;Kootenay&quot; isn&apos;t just geography. It&apos;s a promise. It means we&apos;re here. We understand this place, these people, these businesses. When you work with us, you&apos;re not a ticket number at a remote agency. You&apos;re a neighbour.
                </p>
              </ScrollReveal>
            </div>
            <LogoReveal />
          </div>
        </div>
      </section>

      <MountainDivider variant={3} fillColor="#F8F4F0" bgColor="#1A1D20" />

      {/* CTA */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate">
              Let&apos;s talk about your business.
            </h2>
            <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
              No pitch. No pressure. Just a conversation about where you are and where you want to be.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
