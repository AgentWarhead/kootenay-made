'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import MountainDivider from '@/components/MountainDivider';
import AmbientOrbs from '@/components/AmbientOrbs';
import { caseStudies } from './data';

const imageMap: Record<string, string> = {
  'summit-plumbing': '/images/portfolio/summit-plumbing.png',
  'mountain-flow-yoga': '/images/portfolio/mountain-flow-yoga.png',
  'kootenay-kitchen': '/images/portfolio/kootenay-kitchen.png',
  'powder-highway-adventures': '/images/portfolio/powder-highway.png',
};

export default function PortfolioPage() {
  return (
    <>
      <section className="aurora-bg grain pt-32 pb-20 relative">
        <AmbientOrbs />
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

      <MountainDivider variant={1} fillColor="#F8F4F0" />

      {/* Case studies with image reveal */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, i) => (
              <ScrollReveal key={study.slug} delay={i * 0.1}>
                <Link href={`/portfolio/${study.slug}`} className="group block">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="glass-card-light rounded-2xl overflow-hidden h-full"
                  >
                    {/* Image with clip-path reveal */}
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                      <motion.div
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.1 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={imageMap[study.slug]}
                          alt={study.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <MountainDivider variant={2} fillColor="#1A1D20" />

      {/* CTA */}
      <section className="bg-slate grain py-20 relative">
        <AmbientOrbs />
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
