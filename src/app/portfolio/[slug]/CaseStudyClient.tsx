'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import MountainDivider from '@/components/MountainDivider';
import RiverWave from '@/components/RiverWave';
import AmbientOrbs from '@/components/AmbientOrbs';
import { CaseStudy, caseStudies } from '../data';

function getAdjacentStudies(slug: string) {
  const idx = caseStudies.findIndex((s) => s.slug === slug);
  return {
    prev: idx > 0 ? caseStudies[idx - 1] : null,
    next: idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null,
  };
}

export default function CaseStudyClient({ study }: { study: CaseStudy }) {
  const { prev, next } = getAdjacentStudies(study.slug);

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="aurora-bg grain pt-32 pb-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={[{ label: 'Portfolio', href: '/portfolio' }, { label: study.name }]} dark />
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: `${study.terrainColor}30`, color: study.terrainColor }}
              >
                {study.terrain}
              </span>
              <span className="text-sm text-dark-text-muted">{study.type}</span>
            </div>
            <h1 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight max-w-3xl">
              {study.name}
            </h1>
            <p className="mt-4 text-dark-text-muted text-lg max-w-2xl">{study.description}</p>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" bgColor="#1A1D20" />

      {/* Hero Screenshot — Premium floating frame */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              {/* Glow behind the image */}
              <div className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl" style={{ background: `radial-gradient(ellipse at center, ${study.terrainColor}40 0%, transparent 70%)` }} />
              {/* Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] ring-1 ring-slate/10">
                <div className="relative aspect-[16/9] bg-slate">
                  <Image
                    src={study.heroImage}
                    alt={`${study.name} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Bottom bar with URL */}
                <div className="bg-slate/95 backdrop-blur-sm px-5 py-2.5 flex items-center justify-between">
                  <span className="text-xs text-white/40 font-mono truncate">{study.liveUrl.replace('https://', '')}</span>
                  <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-copper hover:text-copper-light transition-colors flex items-center gap-1">
                    Visit <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-cream pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-3">Overview</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-4">
              The Project
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">{study.overview}</p>
          </ScrollReveal>
        </div>
      </section>

      <RiverWave fillColor="#1A1D20" bgColor="#F8F4F0" />

      {/* What We Built */}
      <section className="bg-slate grain py-16 sm:py-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">What We Built</p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-6">
              The Build
            </h2>
            <p className="text-dark-text-muted text-lg leading-relaxed">{study.whatWeBuilt}</p>
          </ScrollReveal>
        </div>
      </section>

      <RiverWave fillColor="#F8F4F0" bgColor="#1A1D20" />

      {/* Key Highlight */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-slate/10 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-copper" />
                <p className="text-copper font-medium text-sm tracking-wider uppercase">Key Highlight</p>
              </div>
              <p className="text-text-secondary text-lg leading-relaxed">{study.keyHighlight}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tech Stack + Features */}
      <section className="bg-cream pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Tech Stack */}
            <ScrollReveal>
              <p className="text-copper font-medium text-sm tracking-wider uppercase mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm font-medium px-3 py-1.5 rounded-lg bg-slate/5 text-slate border border-slate/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Features */}
            <ScrollReveal delay={0.1}>
              <p className="text-copper font-medium text-sm tracking-wider uppercase mb-4">Features</p>
              <div className="space-y-2.5">
                {study.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-forest mt-0.5 shrink-0" />
                    <span className="text-text-secondary text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <RiverWave fillColor="#1A1D20" bgColor="#F8F4F0" />

      {/* Explore Live CTA */}
      <section className="bg-slate grain py-16 sm:py-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-4">
              See it in action
            </h2>
            <p className="text-dark-text-muted mb-8 max-w-lg mx-auto">
              Experience {study.name} for yourself.
            </p>
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Live <ExternalLink size={18} />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Next on the Trail — Prev/Next Navigation */}
      {(prev || next) && (
        <section className="bg-cream py-12 sm:py-16 border-t border-slate/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-copper font-medium text-sm tracking-wider uppercase mb-6 text-center">
              Next on the Trail
            </p>
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              {prev ? (
                <Link
                  href={`/portfolio/${prev.slug}`}
                  className="flex-1 group flex items-center gap-3 p-4 rounded-xl border border-slate/10 hover:border-copper/30 hover:bg-copper/5 transition-all"
                >
                  <ArrowLeft size={18} className="text-text-tertiary group-hover:text-copper transition-colors shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-text-tertiary">Previous</p>
                    <p className="font-[family-name:var(--font-satoshi)] font-bold text-slate truncate">{prev.name}</p>
                    <p className="text-xs text-text-tertiary">{prev.terrain}</p>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {next ? (
                <Link
                  href={`/portfolio/${next.slug}`}
                  className="flex-1 group flex items-center justify-end gap-3 p-4 rounded-xl border border-slate/10 hover:border-copper/30 hover:bg-copper/5 transition-all text-right"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-text-tertiary">Next</p>
                    <p className="font-[family-name:var(--font-satoshi)] font-bold text-slate truncate">{next.name}</p>
                    <p className="text-xs text-text-tertiary">{next.terrain}</p>
                  </div>
                  <ArrowRight size={18} className="text-text-tertiary group-hover:text-copper transition-colors shrink-0" />
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
