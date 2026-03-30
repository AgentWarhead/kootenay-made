'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';
import ScrollReveal from '@/components/ScrollReveal';

const LINES = ['PRECISION', 'ENGINEERED'];
const FONT_SIZE = 72;
const FONT = `bold ${FONT_SIZE}px Georgia, serif`;

interface Particle {
  char: string;
  restX: number;
  restY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angularV: number;
  opacity: number;
  width: number;
  lineIndex: number;
}

type DemoState = 'idle' | 'exploding' | 'reforming';

function measureChars(text: string): { char: string; width: number }[] {
  const result: { char: string; width: number }[] = [];
  for (const ch of text) {
    if (ch === ' ') { result.push({ char: ' ', width: FONT_SIZE * 0.28 }); continue; }
    let w = FONT_SIZE * 0.55;
    try {
      const prepared = prepareWithSegments(ch, FONT);
      walkLineRanges(prepared, 2000, (line) => { w = line.width > 0 ? line.width : w; });
    } catch { /* fallback */ }
    result.push({ char: ch, width: w });
  }
  return result;
}

export default function PretextShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const stateRef = useRef<DemoState>('idle');
  const animRef = useRef<number>(0);
  const isVisibleRef = useRef(false);
  const lastFrameRef = useRef(0);
  const [hint, setHint] = useState(true);

  const buildParticles = useCallback((W: number, H: number) => {
    const lineSpacing = FONT_SIZE * 1.35;
    const totalH = LINES.length * lineSpacing;
    const startY = (H - totalH) / 2 + FONT_SIZE * 0.5;

    const particles: Particle[] = [];

    LINES.forEach((line, li) => {
      const measured = measureChars(line);
      const letterSpacing = 4;
      const totalW = measured.reduce((s, m) => s + m.width, 0) + letterSpacing * (measured.length - 1);
      let curX = (W - totalW) / 2;
      const cy = startY + li * lineSpacing;

      for (const m of measured) {
        if (m.char === ' ') { curX += m.width; continue; }
        particles.push({
          char: m.char,
          restX: curX,
          restY: cy - FONT_SIZE / 2,
          x: curX,
          y: cy - FONT_SIZE / 2,
          vx: 0,
          vy: 0,
          angle: 0,
          angularV: 0,
          opacity: 1,
          width: m.width,
          lineIndex: li,
        });
        curX += m.width + letterSpacing;
      }
    });

    particlesRef.current = particles;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildParticles(rect.width, rect.height);
  }, [buildParticles]);

  const detonate = useCallback(() => {
    if (stateRef.current === 'exploding') return;
    stateRef.current = 'exploding';
    setHint(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cx = (canvas.width / dpr) / 2;
    const cy = (canvas.height / dpr) / 2;

    for (const p of particlesRef.current) {
      const dx = p.x + p.width / 2 - cx;
      const dy = p.y + FONT_SIZE / 2 - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const speed = 10 + Math.random() * 18;
      p.vx = (dx / dist) * speed + (Math.random() - 0.5) * 6;
      p.vy = (dy / dist) * speed + (Math.random() - 0.5) * 6 - 4;
      p.angularV = (Math.random() - 0.5) * 0.35;
    }

    setTimeout(() => { stateRef.current = 'reforming'; }, 1800);
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisibleRef.current) { animRef.current = 0; return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const now = performance.now();
    const dt = Math.min((now - lastFrameRef.current) / 16.67, 3);
    lastFrameRef.current = now;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    ctx.clearRect(0, 0, W, H);

    const state = stateRef.current;

    for (const p of particlesRef.current) {
      if (state === 'exploding') {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.3 * dt;
        p.vx *= 0.982;
        p.vy *= 0.982;
        p.angle += p.angularV * dt;
        p.opacity = Math.max(0.1, p.opacity - 0.002 * dt);
      } else if (state === 'reforming') {
        const spring = 0.055;
        const damp = 0.76;
        p.vx = p.vx * damp + (p.restX - p.x) * spring;
        p.vy = p.vy * damp + (p.restY - p.y) * spring;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.angle *= 0.88;
        p.opacity = Math.min(1, p.opacity + 0.02 * dt);

        const allSettled = particlesRef.current.every(
          (c) => Math.abs(c.vx) < 0.1 && Math.abs(c.vy) < 0.1 && Math.abs(c.x - c.restX) < 1
        );
        if (allSettled) { stateRef.current = 'idle'; setHint(true); }
      }

      ctx.save();
      ctx.translate(p.x + p.width / 2, p.y + FONT_SIZE / 2);
      ctx.rotate(p.angle);
      ctx.font = FONT;
      ctx.textBaseline = 'middle';

      // Copper gradient effect — slight variation per line
      const alpha = p.lineIndex === 0 ? p.opacity : p.opacity * 0.85;
      ctx.fillStyle = `rgba(193, 120, 23, ${alpha})`;
      ctx.fillText(p.char, -p.width / 2, 0);
      ctx.restore();
    }

    // Draw sub-pixel grid hint in idle state
    if (state === 'idle') {
      ctx.strokeStyle = 'rgba(193, 120, 23, 0.04)';
      ctx.lineWidth = 0.5;
      const gridSpacing = 24;
      for (let x = 0; x < W; x += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    }

    animRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    resize();
    lastFrameRef.current = performance.now();

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting && !animRef.current) {
        lastFrameRef.current = performance.now();
        animRef.current = requestAnimationFrame(render);
      }
    }, { threshold: 0.1 });
    observer.observe(container);

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [resize, render]);

  return (
    <section className="bg-slate relative overflow-hidden py-20 sm:py-28">
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
              Every character below is measured with sub-pixel precision using Pretext —
              pure arithmetic, no DOM reflow, no guessing. Click to see what happens when
              you let math handle the layout.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex justify-center">
            <div
              ref={containerRef}
              onClick={detonate}
              className="relative w-full sm:max-w-[680px] rounded-xl overflow-hidden border border-white/10 cursor-pointer select-none"
              style={{
                height: 'clamp(200px, 28vw, 300px)',
                background: '#1A1D20',
                boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.4), 0 0 40px rgba(193,120,23,0.06)',
              }}
            >
              <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />

              {hint && (
                <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-copper/50 text-xs font-[family-name:var(--font-satoshi)] pointer-events-none">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="8" width="16" height="12" rx="2"/>
                    <line x1="8" y1="8" x2="8" y2="4"/>
                    <line x1="16" y1="8" x2="16" y2="4"/>
                    <line x1="12" y1="4" x2="12" y2="1"/>
                  </svg>
                  <span>click to detonate</span>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

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
              Each character is individually measured using proportional font arithmetic.
              No canvas measureText approximations — exact widths, exact placement.
              The same engine powers our balanced headlines across the site.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
