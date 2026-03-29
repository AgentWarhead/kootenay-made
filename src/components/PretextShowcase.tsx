'use client';

import { useEffect, useRef, useCallback } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';
import ScrollReveal from '@/components/ScrollReveal';

/* ── Kootenay words for the cloud ── */
const KOOTENAY_WORDS = [
  'cedar', 'alpine', 'summit', 'glacier', 'creek', 'powder', 'ridge',
  'basin', 'rapids', 'timber', 'meadow', 'aurora', 'watershed', 'hemlock',
  'chinook', 'selkirk', 'purcell', 'slocan', 'kokanee', 'tamarack',
  'cougar', 'caribou', 'huckleberry', 'fireweed', 'osprey', 'columbia',
  'granite', 'wildfire', 'trailhead', 'kootenay', 'monashee', 'copper',
  'Nelson', 'Fernie', 'Revelstoke', 'Invermere',
];

interface CloudWord {
  text: string;
  x: number;
  y: number;
  size: number;
  width: number;
  height: number;
  phase: number;
  breathRate: number;
  baseOpacity: number;
}

export default function PretextShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const wordsRef = useRef<CloudWord[]>([]);
  const isVisibleRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  /* ── Layout words in an organic cloud ── */
  const layoutCloud = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const w = rect.width;
    const h = rect.height;
    const isMobile = w < 640;
    const wordCount = isMobile ? 18 : 34;
    const minSize = isMobile ? 13 : 12;
    const maxSize = isMobile ? 22 : 24;

    const placed: CloudWord[] = [];
    const padding = 6;

    // Shuffle words
    const shuffled = [...KOOTENAY_WORDS]
      .sort(() => Math.random() - 0.5)
      .slice(0, wordCount);

    // Sort by size descending — place large words first
    const sized = shuffled.map((text) => ({
      text,
      size: Math.round(minSize + Math.random() * (maxSize - minSize)),
    }));
    sized.sort((a, b) => b.size - a.size);

    for (const { text, size } of sized) {
      const font = `${size}px Georgia, serif`;
      let textWidth: number;

      try {
        const prepared = prepareWithSegments(text, font);
        const result = layoutWithLines(prepared, 1000, size * 1.2);
        textWidth = result.lines[0]?.width ?? size * text.length * 0.55;
      } catch {
        textWidth = size * text.length * 0.55;
      }

      const textHeight = size * 1.2;

      // Try placing with no overlap — up to 80 attempts
      let bestX = 0;
      let bestY = 0;
      let foundSpot = false;

      for (let attempt = 0; attempt < 80; attempt++) {
        // Bias towards center with gaussian-ish distribution
        const cx = w / 2 + (Math.random() - 0.5) * w * 0.8;
        const cy = h / 2 + (Math.random() - 0.5) * h * 0.7;
        const tx = cx - textWidth / 2;
        const ty = cy - textHeight / 2;

        // Bounds check
        if (tx < padding || tx + textWidth > w - padding) continue;
        if (ty < padding || ty + textHeight > h - padding) continue;

        // Overlap check
        let overlaps = false;
        for (const p of placed) {
          if (
            tx < p.x + p.width + padding &&
            tx + textWidth + padding > p.x &&
            ty < p.y + p.height + padding &&
            ty + textHeight + padding > p.y
          ) {
            overlaps = true;
            break;
          }
        }

        if (!overlaps) {
          bestX = tx;
          bestY = ty;
          foundSpot = true;
          break;
        }
      }

      if (!foundSpot) continue;

      placed.push({
        text,
        x: bestX,
        y: bestY,
        size,
        width: textWidth,
        height: textHeight,
        phase: Math.random() * Math.PI * 2,
        breathRate: 0.4 + Math.random() * 0.6, // Different breathing speeds
        baseOpacity: 0.5 + Math.random() * 0.4,
      });
    }

    wordsRef.current = placed;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    layoutCloud();

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

    /* ── Pointer tracking for scatter effect ── */
    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    function handlePointerLeave() {
      pointerRef.current = null;
    }
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    /* ── Render ── */
    function render() {
      if (!ctx || !canvas || !isVisibleRef.current) {
        animRef.current = 0;
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const t = Date.now() * 0.001;
      const reduced = reducedMotionRef.current;
      const pointer = pointerRef.current;
      const scatterRadius = 60;

      ctx.textBaseline = 'top';

      for (const word of wordsRef.current) {
        let opacity = word.baseOpacity;
        let dx = 0;
        let dy = 0;

        if (!reduced) {
          // Breathing effect
          const breath = Math.sin(t * word.breathRate + word.phase);
          opacity = word.baseOpacity + breath * 0.15;

          // Scatter on hover/touch
          if (pointer) {
            const wcx = word.x + word.width / 2;
            const wcy = word.y + word.height / 2;
            const distX = wcx - pointer.x;
            const distY = wcy - pointer.y;
            const dist = Math.sqrt(distX * distX + distY * distY);

            if (dist < scatterRadius && dist > 0) {
              const force = (1 - dist / scatterRadius) * 12;
              dx = (distX / dist) * force;
              dy = (distY / dist) * force;
            }
          }
        }

        ctx.font = `${word.size}px Georgia, serif`;
        ctx.fillStyle = `rgba(193, 120, 23, ${Math.max(0.15, Math.min(1, opacity))})`;
        ctx.fillText(word.text, word.x + dx, word.y + dy);
      }

      if (reduced) {
        animRef.current = 0;
        return;
      }
      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);

    function handleResize() {
      layoutCloud();
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
      observer.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [layoutCloud]);

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
              Every word below is measured with sub-pixel precision and placed
              using pure arithmetic. No DOM. No reflow. Just math.
            </p>
          </div>
        </ScrollReveal>

        {/* Canvas demo */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center">
            <div
              ref={containerRef}
              className="relative w-full sm:max-w-[600px] rounded-xl overflow-hidden border border-white/10 aspect-[3/2] sm:aspect-[4/3]"
              style={{
                boxShadow:
                  'inset 0 2px 12px rgba(0,0,0,0.4), 0 0 40px rgba(193, 120, 23, 0.06)',
              }}
            >
              <canvas
                ref={canvasRef}
                aria-hidden="true"
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
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <p className="mt-4 text-dark-text-muted/60 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Every character is measured with sub-pixel precision and placed
              using proportional font arithmetic. The same technology powers our
              balanced headlines and scroll transitions across the site.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
