'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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

/* ── Trail waypoint ── */
function TrailWaypoint({ study, index, total }: { study: typeof caseStudies[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Trail connector dot */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10 hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          className="w-5 h-5 rounded-full bg-copper border-4 border-cream shadow-lg"
        />
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-1 text-[10px] font-mono text-copper font-bold"
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>

      {/* Card — alternating sides on desktop */}
      <div className={`md:grid md:grid-cols-2 md:gap-16 ${isLeft ? '' : 'md:direction-rtl'}`}>
        <div className={isLeft ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}>
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50, rotate: isLeft ? -2 : 2 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <Link href={`/portfolio/${study.slug}`} className="group block">
              <div className="glass-card-light rounded-2xl overflow-hidden relative">
                {/* Topo contour hover pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none z-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`topo-${study.slug}`} patternUnits="userSpaceOnUse" width="120" height="120">
                        <path d="M0 60 Q30 40, 60 60 T120 60" fill="none" stroke="#C17817" strokeWidth="1" />
                        <path d="M0 30 Q30 10, 60 30 T120 30" fill="none" stroke="#C17817" strokeWidth="0.5" />
                        <path d="M0 90 Q30 70, 60 90 T120 90" fill="none" stroke="#C17817" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#topo-${study.slug})`} />
                  </svg>
                </div>

                {/* Image with clip-path reveal + rotation */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <motion.div
                    initial={{ clipPath: 'inset(0 100% 0 0)', rotate: 1 }}
                    whileInView={{ clipPath: 'inset(0 0% 0 0)', rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
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

                <div className="p-4 sm:p-6 md:p-8">
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── Trail SVG path connecting waypoints ── */
function TrailPath({ count }: { count: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Each waypoint is roughly 500px apart
  const height = count * 500;
  const points: string[] = [];
  for (let i = 0; i < count; i++) {
    const y = i * 500 + 20;
    const cx = i % 2 === 0 ? 30 : 70;
    const ncx = (i + 1) % 2 === 0 ? 30 : 70;
    const ny = (i + 1) * 500 + 20;
    if (i === 0) {
      points.push(`M 50 ${y}`);
    }
    if (i < count - 1) {
      points.push(`C ${cx} ${y + 200}, ${ncx} ${ny - 200}, 50 ${ny}`);
    }
  }

  return (
    <svg
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 top-0 w-[100px] hidden md:block pointer-events-none"
      style={{ height }}
      viewBox={`0 0 100 ${height}`}
      fill="none"
    >
      <motion.path
        d={points.join(' ')}
        stroke="#C17817"
        strokeWidth="2"
        strokeDasharray="8 6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
        transition={{ duration: 3, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function PortfolioPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="aurora-bg grain pt-32 pb-20 relative overflow-x-hidden">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={[{ label: 'Portfolio' }]} />
          <ScrollReveal>
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">The Trail</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight max-w-3xl">
              Built for the Kootenays.
            </h1>
            <p className="mt-6 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Real results for real businesses. See how we&apos;ve helped Kootenay businesses transform their online presence.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" bgColor="#1A1D20" />

      {/* Trail layout with case studies */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 relative">
          {/* Trail path */}
          <TrailPath count={caseStudies.length} />

          <div className="space-y-12 sm:space-y-16 md:space-y-24 relative">
            {caseStudies.map((study, i) => (
              <TrailWaypoint key={study.slug} study={study} index={i} total={caseStudies.length} />
            ))}
          </div>
        </div>
      </section>

      <MountainDivider variant={2} fillColor="#1A1D20" bgColor="#F8F4F0" />

      {/* CTA */}
      <section className="bg-slate grain py-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl md:text-4xl font-bold text-cream mb-4">
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
    </div>
  );
}
