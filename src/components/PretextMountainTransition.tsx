'use client';

import { useEffect, useRef, useCallback } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

/* ── ASCII characters ordered by visual density ── */
const DENSITY_CHARS = ' .·:;=+*#%@';

/* ── Generate mountain contour paths using layered sine waves ── */
function generateContourY(x: number, layer: number, offset: number): number {
  const freq1 = 0.003 + layer * 0.001;
  const freq2 = 0.007 - layer * 0.0005;
  const freq3 = 0.015;
  const amp1 = 0.25 - layer * 0.03;
  const amp2 = 0.12 + layer * 0.02;
  const amp3 = 0.06;

  return (
    0.15 + layer * 0.08 +
    amp1 * Math.sin((x + offset) * freq1 + layer * 1.2) +
    amp2 * Math.sin((x + offset * 0.7) * freq2 + layer * 0.8) +
    amp3 * Math.sin((x + offset * 1.3) * freq3 + layer * 2.1)
  );
}

export default function PretextMountainTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const scrollProgressRef = useRef(0);
  const opacityRef = useRef(0);
  const charWidthsRef = useRef<number[]>([]);
  const preparedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  /* ── Measure character widths with Pretext ── */
  const measureChars = useCallback(() => {
    if (preparedRef.current) return;
    try {
      const widths: number[] = [];
      for (let i = 0; i < DENSITY_CHARS.length; i++) {
        const ch = DENSITY_CHARS[i];
        const charPrep = prepareWithSegments(ch, '14px Georgia');
        let w = 0;
        walkLineRanges(charPrep, 1000, (l) => {
          w = l.width;
        });
        widths.push(w || 8);
      }
      charWidthsRef.current = widths;
      preparedRef.current = true;
    } catch {
      // Fallback: assume monospace-ish widths
      charWidthsRef.current = DENSITY_CHARS.split('').map(() => 8);
      preparedRef.current = true;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    measureChars();

    const CONTOUR_COUNT = 8;
    const CHAR_SIZE = 14;
    const isMobile = window.innerWidth < 768;
    const stepX = isMobile ? 16 : 10;
    const stepY = isMobile ? 18 : 14;

    /* ── Resize canvas for retina ── */
    function resize() {
      if (!canvas || !container || !ctx) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    }
    resize();

    /* ── IntersectionObserver for scroll progress ── */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const viewH = entry.rootBounds?.height || window.innerHeight;
            // Progress: 0 when entering bottom, 1 when leaving top
            const raw = 1 - (rect.top + rect.height) / (viewH + rect.height);
            scrollProgressRef.current = Math.max(0, Math.min(1, raw));
            opacityRef.current = Math.min(1, entry.intersectionRatio * 3);
          } else {
            opacityRef.current = 0;
          }
        }
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 19) }
    );
    observer.observe(container);

    /* ── Scroll handler for smoother progress ── */
    function handleScroll() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = 1 - (rect.top + rect.height) / (viewH + rect.height);
      scrollProgressRef.current = Math.max(0, Math.min(1, progress));

      // Opacity: fade in/out at edges
      if (rect.bottom < 0 || rect.top > viewH) {
        opacityRef.current = 0;
      } else {
        const enterFade = Math.min(1, (viewH - rect.top) / (viewH * 0.3));
        const exitFade = Math.min(1, rect.bottom / (viewH * 0.3));
        opacityRef.current = Math.min(enterFade, exitFade);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ── Render loop ── */
    function render() {
      if (!canvas || !ctx) return;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      const globalAlpha = opacityRef.current;
      if (globalAlpha < 0.01) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.font = `${CHAR_SIZE}px Georgia, serif`;
      ctx.textBaseline = 'middle';

      const scrollOffset = scrollProgressRef.current * 600;
      const reducedMotion = reducedMotionRef.current;
      const effectiveOffset = reducedMotion ? 0 : scrollOffset;

      // Draw contour lines as ASCII characters
      for (let layer = 0; layer < CONTOUR_COUNT; layer++) {
        const layerOpacity = (0.3 + (layer / CONTOUR_COUNT) * 0.7) * globalAlpha;
        // Copper color with varying opacity per layer
        ctx.fillStyle = `rgba(193, 120, 23, ${layerOpacity})`;

        for (let x = 0; x < w; x += stepX) {
          const contourY = generateContourY(x, layer, effectiveOffset);
          const y = contourY * h;

          // Only draw near contour lines — calculate distance to nearest contour
          for (let row = 0; row < h; row += stepY) {
            const dist = Math.abs(row - y);
            if (dist > stepY * 2) continue;

            // Brightness based on distance to contour
            const brightness = Math.max(0, 1 - dist / (stepY * 2));
            const charIndex = Math.min(
              DENSITY_CHARS.length - 1,
              Math.floor(brightness * (DENSITY_CHARS.length - 1))
            );

            if (charIndex <= 0) continue;
            const char = DENSITY_CHARS[charIndex];
            ctx.fillText(char, x, row);
          }
        }
      }

      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
    };
  }, [measureChars]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(200px, 25vh, 300px)', background: 'transparent' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
