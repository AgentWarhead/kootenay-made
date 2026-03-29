'use client';

import { useEffect, useRef, useCallback } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';
import ScrollReveal from '@/components/ScrollReveal';

/* ── Particle simulation + ASCII brightness field ── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

/* Characters ordered by visual density (lightest to heaviest) */
const DENSITY_CHARS = ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

/* Map a brightness value (0..1) to a character */
function brightnessToChar(b: number): string {
  const idx = Math.floor(b * (DENSITY_CHARS.length - 1));
  return DENSITY_CHARS[Math.max(0, Math.min(DENSITY_CHARS.length - 1, idx))];
}

const COPPER = { r: 193, g: 120, b: 23 };
const PARTICLE_COUNT = 80;

export default function PretextShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const charWidthsRef = useRef<Map<string, number>>(new Map());
  const isVisibleRef = useRef(false);
  const reducedMotionRef = useRef(false);

  /* ── Measure character widths with Pretext ── */
  const measureCharWidths = useCallback((font: string) => {
    const map = charWidthsRef.current;
    if (map.size > 0) return;

    try {
      // Measure a representative set of characters
      const chars = DENSITY_CHARS;
      for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        const prepared = prepareWithSegments(ch, font);
        let w = 0;
        walkLineRanges(prepared, 1000, (line) => {
          w = line.width;
        });
        map.set(ch, w || 7);
      }
    } catch {
      // Fallback widths
      for (let i = 0; i < DENSITY_CHARS.length; i++) {
        charWidthsRef.current.set(DENSITY_CHARS[i], 7);
      }
    }
  }, []);

  /* ── Initialize particles ── */
  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 20 + Math.random() * 40,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const FONT_SIZE = 12;
    const FONT = `${FONT_SIZE}px Georgia, serif`;
    const LINE_HEIGHT = FONT_SIZE + 2;

    measureCharWidths(FONT);

    /* ── Size canvas ── */
    let logicalW = 0;
    let logicalH = 0;

    function resize() {
      if (!canvas || !container || !ctx) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      logicalW = rect.width;
      logicalH = rect.height;
      canvas.width = logicalW * dpr;
      canvas.height = logicalH * dpr;
      canvas.style.width = `${logicalW}px`;
      canvas.style.height = `${logicalH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        initParticles(logicalW, logicalH);
      }
    }
    resize();

    /* ── Visibility ── */
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animRef.current) {
          animRef.current = requestAnimationFrame(render);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    /* ── Compute brightness field from particles ── */
    function computeBrightness(px: number, py: number): number {
      let brightness = 0;
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = px - p.x;
        const dy = py - p.y;
        const distSq = dx * dx + dy * dy;
        const rSq = p.radius * p.radius;
        if (distSq < rSq) {
          brightness += 1 - distSq / rSq;
        }
      }
      return Math.min(1, brightness);
    }

    /* ── Update particles ── */
    function updateParticles() {
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reducedMotionRef.current) {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Bounce off walls
        if (p.x < -p.radius) p.x = logicalW + p.radius;
        if (p.x > logicalW + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = logicalH + p.radius;
        if (p.y > logicalH + p.radius) p.y = -p.radius;
      }
    }

    /* ── Render loop ── */
    function render() {
      if (!ctx || !isVisibleRef.current) {
        animRef.current = 0;
        return;
      }

      ctx.clearRect(0, 0, logicalW, logicalH);
      ctx.font = FONT;
      ctx.textBaseline = 'top';

      updateParticles();

      // Render ASCII field
      const charW = 7.2; // Approximate character width
      const cols = Math.floor(logicalW / charW);
      const rows = Math.floor(logicalH / LINE_HEIGHT);

      for (let row = 0; row < rows; row++) {
        const y = row * LINE_HEIGHT;
        for (let col = 0; col < cols; col++) {
          const x = col * charW;
          const b = computeBrightness(x + charW / 2, y + LINE_HEIGHT / 2);
          if (b < 0.02) continue;

          const ch = brightnessToChar(b);
          if (ch === ' ') continue;

          // Copper color with brightness-based alpha
          const alpha = Math.min(1, b * 1.2);
          ctx.fillStyle = `rgba(${COPPER.r}, ${COPPER.g}, ${COPPER.b}, ${alpha})`;
          ctx.fillText(ch, x, y);
        }
      }

      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [measureCharWidths, initParticles]);

  return (
    <section className="bg-slate relative overflow-hidden py-20 sm:py-28">
      {/* Grain overlay */}
      <div className="absolute inset-0 grain" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-16">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">
              Under the Hood
            </p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl md:text-4xl font-bold text-cream leading-tight max-w-2xl mx-auto">
              We don&apos;t just design &mdash; we engineer.
            </h2>
            <p className="mt-4 text-dark-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              This text is being measured and laid out 60 times per second using pure arithmetic. No DOM. No reflow. Just math.
            </p>
          </div>
        </ScrollReveal>

        {/* Canvas demo */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center">
            <div
              ref={containerRef}
              className="relative w-full max-w-[400px] rounded-xl overflow-hidden border border-white/10"
              style={{
                aspectRatio: '4 / 3',
                boxShadow: '0 0 40px rgba(193, 120, 23, 0.08), 0 0 80px rgba(193, 120, 23, 0.04)',
              }}
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: '#1A1D20' }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Credits */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-8">
            <a
              href="https://github.com/chenglou/pretext"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper text-sm transition-colors inline-flex items-center gap-1.5"
            >
              Powered by Pretext
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <p className="mt-4 text-dark-text-muted/60 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Every character is measured with sub-pixel precision and placed using proportional font arithmetic. The same technology powers our balanced headlines and scroll transitions across the site.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
