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
  phase: number;
}

/* ── Mountain silhouette polygon ── */
function getMountainPolygon(
  w: number,
  h: number,
  isMobile: boolean
): { x: number; y: number }[] {
  // Normalized points defining the mountain outline (top edge)
  // Single prominent peak with shoulders
  const profile: [number, number][] = isMobile
    ? [
        [0.05, 0.95],
        [0.15, 0.7],
        [0.25, 0.45],
        [0.35, 0.25],
        [0.45, 0.12],
        [0.5, 0.08],  // Peak
        [0.55, 0.12],
        [0.65, 0.28],
        [0.75, 0.5],
        [0.85, 0.72],
        [0.95, 0.95],
      ]
    : [
        [0.02, 0.95],
        [0.08, 0.82],
        [0.15, 0.65],
        [0.2, 0.55],
        [0.25, 0.48],
        [0.3, 0.35],
        [0.35, 0.22],
        [0.4, 0.14],
        [0.45, 0.09],
        [0.5, 0.06],  // Main peak
        [0.55, 0.09],
        [0.6, 0.16],
        [0.65, 0.28],
        [0.7, 0.38],
        [0.72, 0.42],
        [0.75, 0.36], // Secondary bump
        [0.78, 0.42],
        [0.82, 0.55],
        [0.88, 0.7],
        [0.95, 0.85],
        [0.98, 0.95],
      ];

  // Convert to pixel coordinates — top edge of mountain
  const topPoints = profile.map(([nx, ny]) => ({
    x: nx * w,
    y: ny * h,
  }));

  // Close the polygon along the bottom
  return [
    ...topPoints,
    { x: w * 0.98, y: h },
    { x: w * 0.02, y: h },
  ];
}

/* ── Point-in-polygon test ── */
function pointInPolygon(
  px: number,
  py: number,
  polygon: { x: number; y: number }[]
): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x,
      yi = polygon[i].y;
    const xj = polygon[j].x,
      yj = polygon[j].y;

    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/* ── Get mountain top Y at a given X (interpolate the profile) ── */
function getMountainTopY(
  x: number,
  polygon: { x: number; y: number }[]
): number {
  // polygon has top points first, then bottom-right, bottom-left
  // Top points are all except the last 2 (closing bottom)
  const topCount = polygon.length - 2;
  for (let i = 0; i < topCount - 1; i++) {
    const p1 = polygon[i];
    const p2 = polygon[i + 1];
    if (x >= p1.x && x <= p2.x) {
      const t = (x - p1.x) / (p2.x - p1.x);
      return p1.y + t * (p2.y - p1.y);
    }
  }
  return polygon[0].y;
}

export default function KootenayTypoPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordsRef = useRef<WordState[]>([]);
  const animRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const isVisibleRef = useRef(false);

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
    const polygon = getMountainPolygon(w, h, isMobile);

    const minSize = isMobile ? 11 : 10;
    const maxSize = isMobile ? 16 : 18;
    const targetWords = isMobile ? 35 : 60;
    const padding = 3;

    const placed: WordState[] = [];
    const occupied: { x: number; y: number; w: number; h: number }[] = [];

    // Repeat word list as needed
    const wordPool: string[] = [];
    while (wordPool.length < targetWords) {
      wordPool.push(...WORDS);
    }
    // Shuffle
    for (let i = wordPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordPool[i], wordPool[j]] = [wordPool[j], wordPool[i]];
    }

    for (let wi = 0; wi < targetWords; wi++) {
      const text = wordPool[wi % wordPool.length];

      // Vary size — smaller words near the peak, larger at base
      const size = Math.round(minSize + Math.random() * (maxSize - minSize));
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

      // Try to place inside mountain polygon
      let foundSpot = false;
      for (let attempt = 0; attempt < 60; attempt++) {
        // Random x biased towards center
        const nx = 0.1 + Math.random() * 0.8;
        const px = nx * w;
        const topY = getMountainTopY(px, polygon);
        // Random y between mountain top and bottom, biased lower (denser base)
        const bias = Math.random() * Math.random(); // Squared bias — denser at bottom
        const py = topY + bias * (h - topY - textHeight);

        if (py < topY || py + textHeight > h) continue;

        // Check both corners are inside mountain
        if (
          !pointInPolygon(px, py + textHeight / 2, polygon) ||
          !pointInPolygon(px + textWidth, py + textHeight / 2, polygon)
        ) {
          continue;
        }

        // Overlap check
        let overlaps = false;
        for (const occ of occupied) {
          if (
            px < occ.x + occ.w + padding &&
            px + textWidth + padding > occ.x &&
            py < occ.y + occ.h + padding &&
            py + textHeight + padding > occ.y
          ) {
            overlaps = true;
            break;
          }
        }
        if (overlaps) continue;

        occupied.push({ x: px, y: py, w: textWidth, h: textHeight });
        placed.push({
          text,
          x: px,
          y: py,
          baseX: px,
          baseY: py,
          size,
          opacity: 0.45 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
        });
        foundSpot = true;
        break;
      }
      if (!foundSpot) continue;
    }

    wordsRef.current = placed;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisibleRef.current) {
      animRef.current = 0;
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const t = Date.now() * 0.001;
    const reduced = reducedMotionRef.current;

    ctx.textBaseline = 'top';

    for (const word of wordsRef.current) {
      let x = word.baseX;
      let y = word.baseY;

      if (!reduced) {
        x += Math.sin(t * 0.15 + word.phase) * 1.5;
        y += Math.cos(t * 0.1 + word.phase * 1.3) * 1.0;
      }

      ctx.font = `${word.size}px Georgia, serif`;
      ctx.fillStyle = `rgba(193, 120, 23, ${word.opacity})`;
      ctx.fillText(word.text, x, y);
    }

    // Ground line
    ctx.beginPath();
    ctx.moveTo(w * 0.05, h - 2);
    ctx.lineTo(w * 0.95, h - 2);
    ctx.strokeStyle = 'rgba(193, 120, 23, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    if (reduced) {
      animRef.current = 0;
      return;
    }
    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    /* ── Visibility ── */
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animRef.current) {
          animRef.current = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    layoutWords();

    if (reducedMotionRef.current) {
      isVisibleRef.current = true;
      draw();
    } else {
      animRef.current = requestAnimationFrame(draw);
    }

    const handleResize = () => {
      layoutWords();
      if (reducedMotionRef.current) {
        isVisibleRef.current = true;
        draw();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
      observer.disconnect();
    };
  }, [layoutWords, draw]);

  return (
    <section
      className="relative bg-slate overflow-hidden"
      style={{ height: 'clamp(200px, 22vh, 280px)' }}
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 grain" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />
    </section>
  );
}
