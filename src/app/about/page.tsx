'use client';

import Link from 'next/link';
import { ArrowRight, Mountain, Heart, Cpu, Users } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const values = [
  { icon: Mountain, title: 'Rooted Here', desc: 'Not a remote agency. We live, work, and shop in the same community as our clients.' },
  { icon: Cpu, title: 'Modern Tools', desc: 'We use AI and the latest technology to deliver faster, better results — and pass the savings to you.' },
  { icon: Heart, title: 'Genuine Care', desc: 'Your success is our success. We\'re building a reputation in a small community, and we take that seriously.' },
  { icon: Users, title: 'Real Partnership', desc: 'No jargon, no upsells. Just clear communication and honest advice — even if it means telling you what you don\'t need.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate grain pt-32 pb-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">About</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight max-w-3xl">
              A neighbour who happens to build great websites.
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <ScrollReveal>
              <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-8">
                The short version
              </h2>
            </ScrollReveal>
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <ScrollReveal>
                <p>
                  Kootenay Made Digital started with a simple observation: the businesses in the West Kootenays are incredible — but their websites? Not so much.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p>
                  I&apos;m a Castlegar-based developer who&apos;s spent years building digital products and learning what actually works online. Not just what looks pretty — what brings in customers, builds trust, and makes the phone ring.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p>
                  What makes Kootenay Made different? I use modern AI-powered tools alongside traditional design skills. This means I can deliver the quality of work you&apos;d expect from a big-city agency — but faster and at prices that make sense for a Kootenay business. No bloated teams. No six-month timelines. No $15,000 invoices.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>
                  But technology is only half the story. The other half is being here. Being part of this community. Understanding that the plumber in Trail has different needs than the yoga studio in Nelson. Knowing that &quot;let&apos;s grab a coffee and figure this out&quot; is worth more than a hundred Zoom calls.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <p className="text-slate font-medium">
                  Every business in the Kootenays deserves a digital presence that matches the quality of their work. That&apos;s what we&apos;re here to build.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
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
                    <v.icon size={22} className="text-copper" />
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

      {/* Why Kootenay Made */}
      <section className="bg-slate grain py-20 sm:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
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
