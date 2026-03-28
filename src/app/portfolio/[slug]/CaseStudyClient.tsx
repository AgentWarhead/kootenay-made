'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin, CheckCircle, Quote } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import { CaseStudy } from '../data';

export default function CaseStudyClient({ study }: { study: CaseStudy }) {
  return (
    <>
      {/* Header */}
      <section className="bg-slate grain pt-32 pb-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={[{ label: 'Portfolio', href: '/portfolio' }, { label: study.name }]} dark />
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${study.styleColor}30`, color: study.styleColor }}>
                {study.style}
              </span>
              <span className="flex items-center gap-1 text-sm text-dark-text-muted">
                <MapPin size={14} />
                {study.location}
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight max-w-3xl">
              {study.name}
            </h1>
            <p className="mt-4 text-dark-text-muted text-lg">{study.type}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Before State */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-3">Before</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-4">Where they started</h2>
            <p className="text-text-secondary text-lg leading-relaxed">{study.beforeState}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Challenge */}
      <section className="bg-slate grain py-16 sm:py-20">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">The Challenge</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-4">What they needed</h2>
            <p className="text-dark-text-muted text-lg leading-relaxed">{study.challenge}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-3">Our Approach</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-4">How we built it</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">{study.approach}</p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate mb-4">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {study.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-forest mt-0.5 shrink-0" />
                  <span className="text-text-secondary text-sm">{f}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Result */}
      <section className="bg-slate grain py-16 sm:py-20">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">The Result</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-4">What happened next</h2>
            <p className="text-dark-text-muted text-lg leading-relaxed">{study.result}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-cream-border p-5 sm:p-8 lg:p-10">
              <Quote size={32} className="text-copper/30 mb-4" />
              <blockquote className="font-[family-name:var(--font-satoshi)] text-xl sm:text-2xl font-medium text-slate leading-relaxed mb-6">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-[family-name:var(--font-satoshi)] font-bold text-slate">{study.testimonial.author}</p>
                <p className="text-text-tertiary text-sm">{study.testimonial.role}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate grain py-16">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-4">
              Want results like these?
            </h2>
            <p className="text-dark-text-muted mb-8 max-w-lg mx-auto">
              Every project starts with a conversation. Let&apos;s talk about what we can build for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portfolio" className="inline-flex items-center gap-2 border border-cream/20 text-cream hover:bg-cream/10 font-medium px-6 py-3 rounded-lg transition-all">
                <ArrowLeft size={16} /> All Projects
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                Start Your Project <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
