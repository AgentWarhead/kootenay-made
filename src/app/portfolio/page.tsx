'use client';

import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import { caseStudies } from './data';

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-slate grain pt-32 pb-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <Breadcrumb items={[{ label: 'Portfolio' }]} />
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">Our Work</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight max-w-3xl">
              Built for the Kootenays.
            </h1>
            <p className="mt-6 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Real results for real businesses. See how we&apos;ve helped Kootenay businesses transform their online presence.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, i) => (
              <ScrollReveal key={study.slug} delay={i * 0.1}>
                <Link href={`/portfolio/${study.slug}`} className="group block">
                  <div className="bg-white rounded-2xl border border-cream-border overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg h-full">
                    {/* Style color bar */}
                    <div className="h-2" style={{ background: study.styleColor }} />
                    
                    {/* Mockup placeholder */}
                    <div className="h-48 bg-gradient-to-br from-slate/5 to-slate/10 flex items-center justify-center">
                      <div className="text-center">
                        <p className="font-[family-name:var(--font-satoshi)] text-2xl font-bold text-slate/20">{study.name.split(' ').map(w => w[0]).join('')}</p>
                        <p className="text-xs text-text-tertiary mt-1">Website Preview</p>
                      </div>
                    </div>
                    
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${study.styleColor}15`, color: study.styleColor }}>
                          {study.style}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-text-tertiary">
                          <MapPin size={12} />
                          {study.location}
                        </span>
                      </div>
                      
                      <h2 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate mb-1">
                        {study.name}
                      </h2>
                      <p className="text-sm text-text-tertiary mb-3">{study.type}</p>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">
                        {study.description}
                      </p>
                      
                      <span className="inline-flex items-center gap-1 text-copper font-medium text-sm group-hover:gap-2 transition-all">
                        View Case Study <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate grain py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold text-cream mb-4">
              Ready to be our next success story?
            </h2>
            <p className="text-dark-text-muted text-lg mb-8 max-w-xl mx-auto">
              Every project starts with a conversation. Tell us about your business and we&apos;ll show you what&apos;s possible.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Start Your Project <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
