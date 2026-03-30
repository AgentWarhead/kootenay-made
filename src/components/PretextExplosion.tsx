'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

const PHRASE = 'WE BUILD DIFFERENT';
const FONT_SIZE = 52;
const FONT = `bold ${FONT_SIZE}px Georgia, serif`;

interface Char {
  char: string;
  // resting position (measured by Pretext)
  restX: number;
  restY: number;
  // current position
  x: number;
  y: number;
  // velocity
  vx: number;
  vy: number;
  // rotation
  angle: number;
  angularV: number;
  opacity: number;
  width: number;
}

type State = 'idle' | 'exploding' | 'drifting' | 'reforming';

export default function PretextExplosion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<State>('idle');
  const charsRef = useRef<Char[]>([]);
  const animRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const [hint, setHint] = useState(true);

  /* ── Measure and layout chars using Pretext ── */
  const buildChars = useCallback((canvasW: number, canvasH: number) => {
    const chars: Char[] = [];
    const centerY = canvasH / 2;

    // Measure each char individually so we get correct proportional widths
    let totalWidth = 0;
    const measured: { char: string; width: number }[] = [];

    for (const ch of PHRASE) {
      if (ch === ' ') {
        measured.push({ char: ' ', width: FONT_SIZE * 0.28 });
        totalWidth += FONT_SIZE * 0.28;
        continue;
      }
      let w = FONT_SIZE * 0.55;
      try {
        const prepared = prepareWithSegments(ch, FONT);
        walkLineRanges(prepared, 2000, (line) => {
          w = line.width > 0 ? line.width : w;
        });
      } catch {
        // fallback width
      }
      measured.push({ char: ch, width: w });
      totalWidth += w;
    }

    // Center horizontally
    const letterSpacing = 3;
    totalWidth += letterSpacing * (PHRASE.length - 1);
    let curX = (canvasW - totalWidth) / 2;

    for (const m of measured) {
      chars.push({
        char: m.char,
        restX: curX,
        restY: centerY - FONT_SIZE / 2,
        x: curX,
        y: centerY - FONT_SIZE / 2,
        vx: 0,
        vy: 0,
        angle: 0,
        angularV: 0,
        opacity: 1,
        width: m.width,
      });
      curX += m.width + letterSpacing;
    }

    charsRef.current = chars;
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
    buildChars(rect.width, rect.height);
  }, [buildChars]);

  /* ── Explode from a specific point ── */
  const explode = useCallback((clickX?: number, clickY?: number) => {
    if (stateRef.current === 'exploding') return;
    stateRef.current = 'exploding';
    setHint(false);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    // Default to center if no click coords
    const cx = clickX ?? (canvas.width / dpr) / 2;
    const cy = clickY ?? (canvas.height / dpr) / 2;

    for (const ch of charsRef.current) {
      if (ch.char === ' ') continue;
      const charCX = ch.x + ch.width / 2;
      const charCY = ch.y + FONT_SIZE / 2;
      const dx = charCX - cx;
      const dy = charCY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      // Closer chars get blasted harder
      const proximity = Math.max(0.3, 1 - dist / 600);
      const speed = (10 + Math.random() * 16) * proximity;
      ch.vx = (dx / dist) * speed + (Math.random() - 0.5) * 6;
      ch.vy = (dy / dist) * speed + (Math.random() - 0.5) * 6 - 4;
      ch.angularV = (Math.random() - 0.5) * 0.4;
    }

    // After 1.5s drift, start reforming
    setTimeout(() => {
      stateRef.current = 'reforming';
    }, 1500);
  }, []);

  /* ── Animation loop ── */
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const now = performance.now();
    const dt = Math.min((now - lastFrameRef.current) / 16.67, 3); // cap at 3x frame
    lastFrameRef.current = now;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    ctx.clearRect(0, 0, W, H);

    const state = stateRef.current;

    for (const ch of charsRef.current) {
      if (ch.char === ' ') continue;

      if (state === 'exploding' || state === 'drifting') {
        ch.x += ch.vx * dt;
        ch.y += ch.vy * dt;
        ch.vy += 0.25 * dt; // gravity
        ch.vx *= 0.985;
        ch.vy *= 0.985;
        ch.angle += ch.angularV * dt;
        ch.opacity = Math.max(0.15, ch.opacity - 0.003 * dt);
      } else if (state === 'reforming') {
        // Spring back to rest
        const spring = 0.06;
        const damp = 0.78;
        const ddx = (ch.restX - ch.x) * spring;
        const ddy = (ch.restY - ch.y) * spring;
        ch.vx = ch.vx * damp + ddx;
        ch.vy = ch.vy * damp + ddy;
        ch.x += ch.vx * dt;
        ch.y += ch.vy * dt;
        ch.angle *= 0.9;
        ch.opacity = Math.min(1, ch.opacity + 0.025 * dt);

        // Check if settled
        const allSettled = charsRef.current.every(
          (c) =>
            c.char === ' ' ||
            (Math.abs(c.vx) < 0.1 && Math.abs(c.vy) < 0.1 && Math.abs(c.x - c.restX) < 1)
        );
        if (allSettled) {
          stateRef.current = 'idle';
          setHint(true);
        }
      }

      // Draw char with rotation
      ctx.save();
      ctx.translate(ch.x + ch.width / 2, ch.y + FONT_SIZE / 2);
      ctx.rotate(ch.angle);
      ctx.font = FONT;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(193, 120, 23, ${ch.opacity})`;
      ctx.fillText(ch.char, -ch.width / 2, 0);
      ctx.restore();
    }

    animRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    resize();
    lastFrameRef.current = performance.now();
    animRef.current = requestAnimationFrame(render);

    const handleResize = () => {
      if (stateRef.current === 'idle') resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [resize, render]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden cursor-pointer select-none"
      style={{ height: 'clamp(160px, 22vh, 240px)', background: '#1A1D20' }}
      onClick={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          explode(e.clientX - rect.left, e.clientY - rect.top);
        } else {
          explode();
        }
      }}
      title="Click to detonate"
      aria-label="Click to explode the text"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />

      {/* TNT hint — impossible to miss */}
      {hint && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 pointer-events-none select-none animate-pulse">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C17817" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="8" width="16" height="12" rx="2"/>
            <line x1="8" y1="8" x2="8" y2="4"/>
            <line x1="16" y1="8" x2="16" y2="4"/>
            <line x1="12" y1="4" x2="12" y2="1"/>
          </svg>
          <span className="text-copper font-[family-name:var(--font-satoshi)] font-bold text-sm tracking-[0.25em] uppercase">
            CLICK TO DETONATE
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C17817" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="8" width="16" height="12" rx="2"/>
            <line x1="8" y1="8" x2="8" y2="4"/>
            <line x1="16" y1="8" x2="16" y2="4"/>
            <line x1="12" y1="4" x2="12" y2="1"/>
          </svg>
        </div>
      )}
    </div>
  );
}
