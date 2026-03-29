'use client';

import { useEffect, useRef, useCallback } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

const WORDS = [
  'cedar', 'alpine', 'copper', 'summit', 'creek', 'powder', 'granite',
  'osprey', 'columbia', 'glacier', 'wildfire', 'trailhead', 'kootenay',
  'ridge', 'basin', 'rapids', 'timber', 'meadow', 'aurora', 'watershed',
  'hemlock', 'chinook', 'selkirk', 'purcell', 'monashee', 'slocan',
  'kokanee', 'tamarack', 'cougar', 'caribou', 'huckleberry', 'fireweed',
];

interface WordState {
  text: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  driftX: number;
  driftY: number;
  phase: number;
}

function mountainProfile(normalizedX: number): number {
  // Two peaks forming a mountain ridgeline
  const peak1 = Math.exp(-((normalizedX - 0.3) ** 2) / 0.02) * 0.85;
  const peak2 = Math.exp(-((normalizedX - 0.7) ** 2) / 0.03) * 1.0;
  const foothill = Math.exp(-((normalizedX - 0.15) ** 2) / 0.05) * 0.4;
  const ridge = Math.exp(-((normalizedX - 0.5) ** 2) / 0.08) * 0.5;
  return Math.max(peak1, peak2, foothill, ridge) * 0.7 + 0.1;
}

export default function KootenayTypoPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordsRef = useRef<WordState[]>([]);
  const animRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  const layoutWords = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const w = rect.width;
    const h = rect.height;
    const isMobile = w < 640;
    const wordCount = isMobile ? 20 : WORDS.length;
    const words: WordState[] = [];

    const sizes = isMobile
      ? [10, 11, 12, 13, 14]
      : [10, 11, 12, 13, 14, 15, 16, 17, 18];

    for (let i = 0; i < wordCount; i++) {
      const text = WORDS[i % WORDS.length];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const font = `${size}px Georgia, serif`;

      try {
        const prepared = prepareWithSegments(text, font);
        const result = layoutWithLines(prepared, 500, size * 1.2);
        const textWidth = result.lines[0]?.width ?? size * text.length * 0.6;

        // Place along x-axis
        const normalizedX = Math.random();
        const x = normalizedX * (w - textWidth);

        // Mountain height at this x position determines y placement
        const mountainH = mountainProfile(normalizedX);
        // Higher mountain = words placed higher (lower y). Scatter within the profile.
        const maxY = h * (1 - mountainH);
        const minY = h * 0.1;
        const y = minY + Math.random() * (maxY - minY);

        words.push({
          text,
          x,
          y,
          baseX: x,
          baseY: y,
          size,
          opacity: 0.4 + Math.random() * 0.5,
          driftX: (Math.random() - 0.5) * 0.15,
          driftY: (Math.random() - 0.5) * 0.08,
          phase: Math.random() * Math.PI * 2,
        });
      } catch {
        // Skip word if Pretext fails
      }
    }

    wordsRef.current = words;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    const t = Date.now() * 0.001;
    const reduced = reducedMotionRef.current;

    for (const word of wordsRef.current) {
      let x = word.baseX;
      let y = word.baseY;

      if (!reduced) {
        x += Math.sin(t * 0.3 + word.phase) * word.driftX * 20;
        y += Math.cos(t * 0.2 + word.phase) * word.driftY * 15;
      }

      ctx.font = `${word.size}px Georgia, serif`;
      ctx.fillStyle = `rgba(193, 120, 23, ${word.opacity})`;
      ctx.fillText(word.text, x, y);
    }

    if (!reduced) {
      animRef.current = requestAnimationFrame(draw);
    }
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    layoutWords();
    draw();

    const handleResize = () => {
      layoutWords();
      if (reducedMotionRef.current) draw();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animRef.current);
    };
  }, [layoutWords, draw]);

  return (
    <section className="relative bg-slate overflow-hidden" style={{ height: 250 }}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />
    </section>
  );
}
