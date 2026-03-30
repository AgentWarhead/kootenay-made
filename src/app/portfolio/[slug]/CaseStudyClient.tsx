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

      {/* Hero Screenshot — Premium framed showcase */}
      <section className="relative py-16 sm:py-20 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F8F4F0 0%, #EDE6DA 100%)' }}>
        {/* Terrain-colored ambient glow */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at 50% 30%, ${study.terrainColor}15 0%, transparent 60%)`
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              {/* Large glow behind frame */}
              <div className="absolute -inset-8 sm:-inset-12 rounded-[2rem] blur-3xl" style={{
                background: `radial-gradient(ellipse at center, ${study.terrainColor}25 0%, ${study.terrainColor}08 50%, transparent 80%)`
              }} />

              {/* Outer frame — wooden/premium border */}
              <div className="relative rounded-2xl p-2 sm:p-3" style={{
                background: 'linear-gradient(145deg, #3a2a1a 0%, #2a1e12 40%, #1a140c 100%)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}>
                {/* Wood grain texture on frame */}
                <div className="absolute inset-0 rounded-2xl opacity-[0.04]" style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(255,255,255,0.08) 7px, rgba(255,255,255,0.08) 8px)'
                }} />
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-2 h-2 rounded-full" style={{ background: `${study.terrainColor}60` }} />
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: `${study.terrainColor}60` }} />
                <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full" style={{ background: `${study.terrainColor}60` }} />
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full" style={{ background: `${study.terrainColor}60` }} />

                {/* Inner image */}
                <div className="relative rounded-lg overflow-hidden">
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
                </div>

                {/* Bottom info strip inside the frame */}
                <div className="relative z-10 flex items-center justify-between px-3 sm:px-4 py-2 mt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: study.terrainColor }} />
                    <span className="text-xs text-white/50 font-mono truncate">{study.liveUrl.replace('https://', '')}</span>
                  </div>
                  <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors" style={{ color: study.terrainColor }}>
                    Explore Live <ExternalLink size={12} />
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

      {/* Next on the Trail — Wooden Signpost Navigation */}
      {(prev || next) && (
        <section className="relative py-16 sm:py-20 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F8F4F0 0%, #E8E0D4 100%)' }}>
          {/* Wood grain texture overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 11px, rgba(139,90,43,0.3) 11px, rgba(139,90,43,0.3) 12px),
              repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(139,90,43,0.15) 29px, rgba(139,90,43,0.15) 30px)`
          }} />
          {/* Ground texture at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8" style={{
            background: 'linear-gradient(0deg, rgba(101,67,33,0.08) 0%, transparent 100%)'
          }} />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            {/* Signpost pole */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-3 h-3 rounded-full bg-[#8B5A2B] shadow-inner mb-1" />
              <div className="w-1.5 h-12 bg-gradient-to-b from-[#8B5A2B] to-[#6B4226] rounded-full shadow-md" />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-5 sm:gap-8">
              {prev ? (
                <Link
                  href={`/portfolio/${prev.slug}`}
                  className="flex-1 group"
                >
                  {/* Wooden sign plank — pointing left */}
                  <div className="relative">
                    {/* Arrow notch on left */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-0 h-0 border-t-[28px] border-t-transparent border-b-[28px] border-b-transparent border-r-[16px] border-r-[#5C3D1E] hidden sm:block" />
                    <div className="rounded-lg sm:rounded-r-lg sm:rounded-l-none px-6 py-5 transition-all duration-300 group-hover:translate-x-[-4px] group-hover:shadow-xl relative overflow-hidden" style={{
                      background: 'linear-gradient(135deg, #7A5230 0%, #5C3D1E 50%, #4A3118 100%)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
                    }}>
                      {/* Wood grain lines */}
                      <div className="absolute inset-0 opacity-[0.06]" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(255,255,255,0.1) 5px, rgba(255,255,255,0.1) 6px)'
                      }} />
                      {/* Nail holes */}
                      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-black/20 shadow-inner" />
                      <div className="absolute bottom-3 right-6 w-1.5 h-1.5 rounded-full bg-black/20 shadow-inner" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                          <ArrowLeft size={14} className="text-[#C17817] group-hover:text-[#E8A849] transition-colors" />
                          <p className="text-[10px] text-[#C17817]/60 uppercase tracking-widest font-medium">Back down the trail</p>
                        </div>
                        <p className="font-[family-name:var(--font-satoshi)] font-bold text-cream text-lg truncate">{prev.name}</p>
                        <p className="text-xs text-cream/40 mt-0.5">{prev.terrain}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {next ? (
                <Link
                  href={`/portfolio/${next.slug}`}
                  className="flex-1 group"
                >
                  {/* Wooden sign plank — pointing right */}
                  <div className="relative">
                    {/* Arrow notch on right */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-0 h-0 border-t-[28px] border-t-transparent border-b-[28px] border-b-transparent border-l-[16px] border-l-[#5C3D1E] hidden sm:block" />
                    <div className="rounded-lg sm:rounded-l-lg sm:rounded-r-none px-6 py-5 text-right transition-all duration-300 group-hover:translate-x-[4px] group-hover:shadow-xl relative overflow-hidden" style={{
                      background: 'linear-gradient(225deg, #7A5230 0%, #5C3D1E 50%, #4A3118 100%)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
                    }}>
                      {/* Wood grain lines */}
                      <div className="absolute inset-0 opacity-[0.06]" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(255,255,255,0.1) 5px, rgba(255,255,255,0.1) 6px)'
                      }} />
                      {/* Nail holes */}
                      <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-black/20 shadow-inner" />
                      <div className="absolute bottom-3 left-6 w-1.5 h-1.5 rounded-full bg-black/20 shadow-inner" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          <p className="text-[10px] text-[#C17817]/60 uppercase tracking-widest font-medium">Continue the trail</p>
                          <ArrowRight size={14} className="text-[#C17817] group-hover:text-[#E8A849] transition-colors" />
                        </div>
                        <p className="font-[family-name:var(--font-satoshi)] font-bold text-cream text-lg truncate">{next.name}</p>
                        <p className="text-xs text-cream/40 mt-0.5">{next.terrain}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>

            {/* Trail marker below */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2 text-[#8B5A2B]/40 text-xs font-[family-name:var(--font-satoshi)]">
                <span>◆</span>
                <span className="tracking-widest uppercase">Trail Marker {caseStudies.findIndex(s => s.slug === study.slug) + 1} of {caseStudies.length}</span>
                <span>◆</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
