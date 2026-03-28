'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';

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

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate grain pt-32 pb-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <Breadcrumb items={[{ label: 'About' }]} dark />
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">About</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight max-w-3xl">
              A neighbour who happens to build great websites.
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Story — text paragraphs fade up on scroll */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <ScrollReveal>
              <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-8">
                The short version
              </h2>
            </ScrollReveal>
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              {[
                "Kootenay Made Digital started with a simple observation: the businesses in the West Kootenays are incredible — but their websites? Not so much.",
                "I'm a Castlegar-based developer who's spent years building digital products and learning what actually works online. Not just what looks pretty — what brings in customers, builds trust, and makes the phone ring.",
                "What makes Kootenay Made different? I use modern AI-powered tools alongside traditional design skills. This means I can deliver the quality of work you'd expect from a big-city agency — but faster and at prices that make sense for a Kootenay business. No bloated teams. No six-month timelines. No $15,000 invoices.",
                "But technology is only half the story. The other half is being here. Being part of this community. Understanding that the plumber in Trail has different needs than the yoga studio in Nelson. Knowing that \"let's grab a coffee and figure this out\" is worth more than a hundred Zoom calls.",
              ].map((text, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <p>{text}</p>
                </ScrollReveal>
              ))}
              <ScrollReveal delay={0.4}>
                <p className="text-slate font-medium">
                  Every business in the Kootenays deserves a digital presence that matches the quality of their work. That&apos;s what we&apos;re here to build.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values with SVG draw animation */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-12">
              What we believe
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
                    <DrawIcon d={v.iconPath} delay={i * 0.15} />
                  </div>
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

      {/* Why Kootenay Made — with stacked logo */}
      <section className="bg-slate grain py-20 sm:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
            <div className="max-w-xl flex-1">
              <ScrollReveal>
                <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-6">
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
            <ScrollReveal delay={0.2}>
              <div className="w-48 md:w-64 shrink-0">
                <Image
                  src="/brand/kmd-stacked-white.png"
                  alt="Kootenay Made Digital"
                  width={256}
                  height={256}
                  className="w-full h-auto opacity-80"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold text-slate">
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
    </>
  );
}
