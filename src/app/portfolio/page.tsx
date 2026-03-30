'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, ExternalLink } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import MountainDivider from '@/components/MountainDivider';
import AmbientOrbs from '@/components/AmbientOrbs';
import { caseStudies } from './data';
import PretextAvalanche from '@/components/PretextAvalanche';
import PretextExplainer from '@/components/PretextExplainer';

/* ── Terrain-specific SVG background patterns ── */
function TerrainPattern({ terrain, slug }: { terrain: string; slug: string }) {
  const patterns: Record<string, React.ReactNode> = {
    'River Valley': (
      <pattern id={`terrain-${slug}`} patternUnits="userSpaceOnUse" width="160" height="80">
        <path d="M0 40 Q40 20, 80 40 T160 40" fill="none" stroke="#4A90A4" strokeWidth="0.8" opacity="0.5" />
        <path d="M0 60 Q40 40, 80 60 T160 60" fill="none" stroke="#4A90A4" strokeWidth="0.5" opacity="0.3" />
        <path d="M0 20 Q40 0, 80 20 T160 20" fill="none" stroke="#4A90A4" strokeWidth="0.5" opacity="0.3" />
      </pattern>
    ),
    'Night Sky': (
      <pattern id={`terrain-${slug}`} patternUnits="userSpaceOnUse" width="100" height="100">
        <circle cx="20" cy="30" r="1" fill="#22C55E" opacity="0.4" />
        <circle cx="70" cy="15" r="0.8" fill="#22C55E" opacity="0.3" />
        <circle cx="50" cy="70" r="1.2" fill="#22C55E" opacity="0.35" />
        <circle cx="85" cy="55" r="0.6" fill="#22C55E" opacity="0.25" />
        <circle cx="10" cy="80" r="0.9" fill="#22C55E" opacity="0.3" />
      </pattern>
    ),
    'Alpine Meadow': (
      <pattern id={`terrain-${slug}`} patternUnits="userSpaceOnUse" width="120" height="60">
        <path d="M0 30 Q15 15, 30 30 T60 30" fill="none" stroke="#F59E0B" strokeWidth="0.6" opacity="0.4" />
        <path d="M60 30 Q75 15, 90 30 T120 30" fill="none" stroke="#F59E0B" strokeWidth="0.6" opacity="0.4" />
        <path d="M30 50 Q45 35, 60 50 T90 50" fill="none" stroke="#F59E0B" strokeWidth="0.4" opacity="0.25" />
      </pattern>
    ),
    'Trailhead': (
      <pattern id={`terrain-${slug}`} patternUnits="userSpaceOnUse" width="80" height="80">
        <path d="M40 0 L40 80" fill="none" stroke="#6366F1" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
        <path d="M0 40 L80 40" fill="none" stroke="#6366F1" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
        <circle cx="40" cy="40" r="2" fill="none" stroke="#6366F1" strokeWidth="0.5" opacity="0.3" />
      </pattern>
    ),
    'The Summit': (
      <pattern id={`terrain-${slug}`} patternUnits="userSpaceOnUse" width="120" height="120">
        <path d="M60 10 L20 110 L100 110 Z" fill="none" stroke="#C17817" strokeWidth="0.6" opacity="0.3" />
        <path d="M60 40 L35 110 L85 110 Z" fill="none" stroke="#C17817" strokeWidth="0.4" opacity="0.2" />
      </pattern>
    ),
  };

  return (
    <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>{patterns[terrain]}</defs>
        <rect width="100%" height="100%" fill={`url(#terrain-${slug})`} />
      </svg>
    </div>
  );
}

/* ── Trail waypoint ── */
function TrailWaypoint({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;
  const isLast = study.slug === 'kootenay-made';

  return (
    <div ref={ref} className="relative">
      {/* Trail connector dot */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10 hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          className={`w-5 h-5 rounded-full border-4 border-cream shadow-lg ${isLast ? 'bg-copper ring-2 ring-copper/30 ring-offset-2 ring-offset-cream' : 'bg-copper'}`}
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
            <div className="glass-card-light rounded-2xl overflow-hidden relative group">
              {/* Terrain-specific SVG pattern */}
              <TerrainPattern terrain={study.terrain} slug={study.slug} />

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

              {/* Image */}
              <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <motion.div
                    initial={{ clipPath: 'inset(0 100% 0 0)', rotate: 1 }}
                    whileInView={{ clipPath: 'inset(0 0% 0 0)', rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
                    className="absolute inset-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={study.heroImage}
                      alt={study.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* You Are Here badge for kootenay-made */}
                  {isLast && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="absolute top-3 right-3 z-20"
                    >
                      <span className="inline-flex items-center gap-1.5 bg-copper text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        <MapPin size={12} />
                        You Are Here
                      </span>
                    </motion.div>
                  )}
                </div>
              </a>

              <div className="p-4 sm:p-6 md:p-8 relative z-10">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: `${study.terrainColor}15`, color: study.terrainColor }}
                  >
                    {study.terrain}
                  </span>
                  <span className="text-xs text-text-tertiary">{study.type}</span>
                </div>

                <h2 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-slate mb-2">
                  {study.name}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {study.description}
                </p>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {study.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate/5 text-text-tertiary border border-slate/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action links */}
                <div className="flex items-center gap-4">
                  <Link
                    href={`/portfolio/${study.slug}`}
                    className="inline-flex items-center gap-1 text-copper font-medium text-sm hover:gap-2 transition-all"
                  >
                    View Details <ArrowRight size={16} />
                  </Link>
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-text-tertiary hover:text-forest font-medium text-sm transition-colors"
                  >
                    View Live <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
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
              Five Projects. One Trail.
            </h1>
            <p className="mt-6 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Real projects we&apos;ve built — from e-commerce stores to AI platforms. Follow the trail from River Valley to Summit.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" bgColor="#1A1D20" />

      {/* Pretext Avalanche */}
      <section className="relative bg-slate overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 grain" />
        {/* Topo contour background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(193,120,23,0.3) 40px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-20">
          <PretextAvalanche />
          <div className="text-center mt-6">
            <p className="text-cream/60 text-base italic font-[family-name:var(--font-satoshi)]">&quot;See the work that moved mountains.&quot;</p>
          </div>
          <PretextExplainer
            text="Those letters have physics — gravity, collision, momentum — all calculated from precise text measurements. This isn't a video or a GIF. It's real-time code running in your visitor's browser. Imagine this on YOUR site."
          />
        </div>
      </section>

      {/* Trail layout with case studies */}
      <section className="bg-cream py-20 sm:py-24 cedar-texture relative overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 relative">
          <TrailPath count={caseStudies.length} />

          <div className="space-y-12 sm:space-y-16 md:space-y-24 relative">
            {caseStudies.map((study, i) => (
              <TrailWaypoint key={study.slug} study={study} index={i} />
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
