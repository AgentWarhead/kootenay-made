'use client';

import { useEffect, useRef, useCallback } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

/* ── Ridge characters — chosen for horizontal visual weight ── */
const RIDGE_CHARS = ['^', '~', '-', '∧', '/', '\\', '▲', '△'];

/* ── Smooth mountain ridgeline using sine composition ── */
function ridgelineY(
  x: number,
  width: number,
  layer: number,
  scrollOffset: number
): number {
  const nx = x / width; // 0..1
  const parallaxShift = scrollOffset * (0.3 + layer * 0.15);
  const sx = (x + parallaxShift) / width;

  // Each layer has unique waveform
  const base = 0.35 + layer * 0.1;
  const wave1 = 0.18 * Math.sin(sx * Math.PI * 2 + layer * 1.7);
  const wave2 = 0.09 * Math.sin(sx * Math.PI * 4.3 + layer * 0.9);
  const wave3 = 0.04 * Math.sin(sx * Math.PI * 7.1 + layer * 2.4);

  // Gentle edge falloff so ridges don't clip at edges
  const edgeFade = Math.sin(nx * Math.PI);

  return base + (wave1 + wave2 + wave3) * edgeFade;
}

export default function PretextMountainTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const scrollProgressRef = useRef(0);
  const opacityRef = useRef(0);
  const charWidthRef = useRef(8);
  const preparedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  /* ── Measure a representative character with Pretext ── */
  const measureChar = useCallback(() => {
    if (preparedRef.current) return;
    try {
      const prep = prepareWithSegments('^', '14px Georgia');
      walkLineRanges(prep, 1000, (l) => {
        charWidthRef.current = l.width || 8;
      });
      preparedRef.current = true;
    } catch {
      charWidthRef.current = 8;
      preparedRef.current = true;
    }
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

    measureChar();

    const isMobile = window.innerWidth < 768;
    const RIDGE_COUNT = isMobile ? 3 : 5;
    const CHAR_SIZE = isMobile ? 16 : 13;
    const CHAR_SPACING = isMobile ? 20 : 14;

    /* ── Resize canvas for retina ── */
    function resize() {
      if (!canvas || !container || !ctx) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    /* ── Scroll tracking ── */
    function handleScroll() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress =
        1 - (rect.top + rect.height) / (viewH + rect.height);
      scrollProgressRef.current = Math.max(0, Math.min(1, progress));

      if (rect.bottom < 0 || rect.top > viewH) {
        opacityRef.current = 0;
      } else {
        const enterFade = Math.min(1, (viewH - rect.top) / (viewH * 0.3));
        const exitFade = Math.min(1, rect.bottom / (viewH * 0.3));
        opacityRef.current = Math.min(enterFade, exitFade);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* ── IntersectionObserver for visibility ── */
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animRef.current) {
          animRef.current = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    /* ── Render loop ── */
    function render() {
      if (!canvas || !ctx || !isVisible) {
        animRef.current = 0;
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      const globalAlpha = opacityRef.current;
      if (globalAlpha < 0.01) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      const scrollOffset = reducedMotionRef.current
        ? 0
        : scrollProgressRef.current * 400;

      ctx.font = `${CHAR_SIZE}px Georgia, serif`;
      ctx.textBaseline = 'middle';

      // Draw each ridgeline — back to front
      for (let layer = 0; layer < RIDGE_COUNT; layer++) {
        // Back layers lighter, front layers stronger
        const layerAlpha =
          (0.25 + (layer / Math.max(1, RIDGE_COUNT - 1)) * 0.75) *
          globalAlpha;
        ctx.fillStyle = `rgba(193, 120, 23, ${layerAlpha})`;

        const charIndex = layer % RIDGE_CHARS.length;
        const char = RIDGE_CHARS[charIndex];

        // Walk along the ridgeline placing characters
        for (let x = 0; x < w; x += CHAR_SPACING) {
          const normY = ridgelineY(x, w, layer, scrollOffset);
          const y = normY * h;

          // Place character on the ridge
          ctx.fillText(char, x, y);

          // Add 1-2 fainter chars above/below for ridge thickness
          const spread = CHAR_SIZE * 0.7;
          ctx.globalAlpha = layerAlpha * 0.4;
          ctx.fillStyle = `rgba(193, 120, 23, ${layerAlpha * 0.4})`;
          ctx.fillText(
            RIDGE_CHARS[(charIndex + 1) % RIDGE_CHARS.length],
            x + CHAR_SPACING * 0.3,
            y - spread
          );
          ctx.fillText(
            RIDGE_CHARS[(charIndex + 2) % RIDGE_CHARS.length],
            x + CHAR_SPACING * 0.6,
            y + spread
          );

          // Restore full alpha for next main char
          ctx.fillStyle = `rgba(193, 120, 23, ${layerAlpha})`;
          ctx.globalAlpha = 1;
        }
      }

      animRef.current = requestAnimationFrame(render);
    }

    // Initial render for reduced motion
    if (reducedMotionRef.current) {
      isVisible = true;
      opacityRef.current = 1;
      render();
    } else {
      animRef.current = requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
    };
  }, [measureChar]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        height: 'clamp(200px, 25vh, 280px)',
        background: '#1A1D20',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
