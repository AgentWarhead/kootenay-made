'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

const PHRASE = 'WE BUILD DIFFERENT';
const FONT_SIZE = 52;
const FONT = `bold ${FONT_SIZE}px Georgia, serif`;

interface Char {
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
}

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

type State = 'idle' | 'exploding' | 'drifting' | 'reforming';

export default function PretextExplosion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<State>('idle');
  const charsRef = useRef<Char[]>([]);
  const fontSizeRef = useRef<number>(FONT_SIZE);
  const smokeRef = useRef<SmokeParticle[]>([]);
  const animRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const [hint, setHint] = useState(true);
  const [count, setCount] = useState(0);
  const shakeRef = useRef(false);

  const buildChars = useCallback((canvasW: number, canvasH: number) => {
    // Scale font size to fit canvas width on mobile (min 24px, max 52px)
    const responsiveFontSize = Math.max(18, Math.min(FONT_SIZE, Math.floor(canvasW / 16)));
    const responsiveFont = `bold ${responsiveFontSize}px Georgia, serif`;

    const chars: Char[] = [];
    const centerY = canvasH / 2;
    let totalWidth = 0;
    const measured: { char: string; width: number }[] = [];

    for (const ch of PHRASE) {
      if (ch === ' ') {
        measured.push({ char: ' ', width: responsiveFontSize * 0.28 });
        totalWidth += responsiveFontSize * 0.28;
        continue;
      }
      let w = responsiveFontSize * 0.55;
      try {
        const prepared = prepareWithSegments(ch, responsiveFont);
        walkLineRanges(prepared, 2000, (line) => {
          w = line.width > 0 ? line.width : w;
        });
      } catch { /* fallback */ }
      measured.push({ char: ch, width: w });
      totalWidth += w;
    }

    const letterSpacing = 3;
    totalWidth += letterSpacing * (PHRASE.length - 1);
    let curX = (canvasW - totalWidth) / 2;

    for (const m of measured) {
      chars.push({
        char: m.char, restX: curX, restY: centerY - responsiveFontSize / 2,
        x: curX, y: centerY - responsiveFontSize / 2,
        vx: 0, vy: 0, angle: 0, angularV: 0, opacity: 1, width: m.width,
      });
      curX += m.width + letterSpacing;
    }
    charsRef.current = chars;
    fontSizeRef.current = responsiveFontSize;
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

  const explode = useCallback((clickX?: number, clickY?: number) => {
    if (stateRef.current === 'exploding') return;
    stateRef.current = 'exploding';
    setHint(false);
    setCount(c => c + 1);

    // Screen shake
    shakeRef.current = true;
    setTimeout(() => { shakeRef.current = false; }, 250);

    // Vibrate on mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(60);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cx = clickX ?? (canvas.width / dpr) / 2;
    const cy = clickY ?? (canvas.height / dpr) / 2;

    // Spawn smoke at click point
    for (let i = 0; i < 15; i++) {
      smokeRef.current.push({
        x: cx + (Math.random() - 0.5) * 30,
        y: cy + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.5 - Math.random() * 1.5,
        life: 1,
        maxLife: 2 + Math.random() * 1.5, // seconds
        size: 8 + Math.random() * 16,
      });
    }

    for (const ch of charsRef.current) {
      if (ch.char === ' ') continue;
      const charCX = ch.x + ch.width / 2;
      const charCY = ch.y + fontSizeRef.current / 2;
      const dx = charCX - cx;
      const dy = charCY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const proximity = Math.max(0.3, 1 - dist / 600);
      const speed = (10 + Math.random() * 16) * proximity;
      ch.vx = (dx / dist) * speed + (Math.random() - 0.5) * 6;
      ch.vy = (dy / dist) * speed + (Math.random() - 0.5) * 6 - 4;
      ch.angularV = (Math.random() - 0.5) * 0.4;
    }

    setTimeout(() => { stateRef.current = 'reforming'; }, 1500);
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const now = performance.now();
    const rawDt = (now - lastFrameRef.current) / 1000; // seconds
    const dtSec = Math.min(rawDt, 0.05);
    const dt = Math.min((now - lastFrameRef.current) / 16.67, 3);
    lastFrameRef.current = now;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    ctx.clearRect(0, 0, W, H);

    const state = stateRef.current;

    // Draw smoke particles
    const smoke = smokeRef.current;
    for (let i = smoke.length - 1; i >= 0; i--) {
      const p = smoke[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.01; // drift up
      p.size += 0.3; // expand
      p.life -= dtSec / p.maxLife;
      if (p.life <= 0) { smoke.splice(i, 1); continue; }
      const alpha = p.life * 0.15;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(160, 140, 120, ${alpha})`;
      ctx.fill();
    }

    // Draw characters
    for (const ch of charsRef.current) {
      if (ch.char === ' ') continue;

      if (state === 'exploding' || state === 'drifting') {
        ch.x += ch.vx * dt;
        ch.y += ch.vy * dt;
        ch.vy += 0.25 * dt;
        ch.vx *= 0.985;
        ch.vy *= 0.985;
        ch.angle += ch.angularV * dt;
        ch.opacity = Math.max(0.15, ch.opacity - 0.003 * dt);
      } else if (state === 'reforming') {
        const spring = 0.06;
        const damp = 0.78;
        ch.vx = ch.vx * damp + (ch.restX - ch.x) * spring;
        ch.vy = ch.vy * damp + (ch.restY - ch.y) * spring;
        ch.x += ch.vx * dt;
        ch.y += ch.vy * dt;
        ch.angle *= 0.9;
        ch.opacity = Math.min(1, ch.opacity + 0.025 * dt);

        const allSettled = charsRef.current.every(
          c => c.char === ' ' || (Math.abs(c.vx) < 0.1 && Math.abs(c.vy) < 0.1 && Math.abs(c.x - c.restX) < 1)
        );
        if (allSettled) {
          stateRef.current = 'idle';
          setHint(true);
        }
      }

      ctx.save();
      ctx.translate(ch.x + ch.width / 2, ch.y + fontSizeRef.current / 2);
      ctx.rotate(ch.angle);
      ctx.font = `bold ${fontSizeRef.current}px Georgia, serif`;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(220, 160, 50, ${ch.opacity})`;
      ctx.fillText(ch.char, -ch.width / 2, 0);
      ctx.restore();
    }

    animRef.current = requestAnimationFrame(render);
  }, []);

  // Screen shake effect
  useEffect(() => {
    let shakeAnim: number;
    const doShake = () => {
      if (!containerRef.current) return;
      if (shakeRef.current) {
        const x = (Math.random() - 0.5) * 4;
        const y = (Math.random() - 0.5) * 4;
        containerRef.current.style.transform = `translate(${x}px, ${y}px)`;
        shakeAnim = requestAnimationFrame(doShake);
      } else {
        containerRef.current.style.transform = '';
      }
    };
    const interval = setInterval(() => {
      if (shakeRef.current) doShake();
    }, 50);
    return () => { clearInterval(interval); cancelAnimationFrame(shakeAnim); };
  }, []);

  useEffect(() => {
    resize();
    lastFrameRef.current = performance.now();
    animRef.current = requestAnimationFrame(render);
    const handleResize = () => { if (stateRef.current === 'idle') resize(); };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', handleResize); };
  }, [resize, render]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden cursor-pointer select-none"
      style={{ height: 'clamp(180px, 26vh, 280px)', background: 'transparent' }}
      onClick={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) explode(e.clientX - rect.left, e.clientY - rect.top);
        else explode();
      }}
      aria-label="Click to explode the text"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />

      {/* Fuse trail animation — spark traveling along a dotted line */}
      {hint && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none select-none">
          {/* Fuse line */}
          <div className="relative flex items-center justify-center gap-3">
            <div className="hidden sm:block h-[2px] w-24" style={{
              background: 'repeating-linear-gradient(90deg, #C17817 0px, #C17817 4px, transparent 4px, transparent 8px)',
              opacity: 0.5,
            }}>
              {/* Traveling spark */}
              <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(255,165,0,0.8),0_0_16px_rgba(255,100,0,0.4)]" style={{
                animation: 'fuseSpark 1.5s linear infinite',
              }} />
            </div>
            <span className="text-copper font-[family-name:var(--font-satoshi)] font-black text-sm sm:text-lg tracking-[0.3em] uppercase animate-pulse whitespace-nowrap" style={{
              textShadow: '0 0 20px rgba(193,120,23,0.4), 0 0 40px rgba(193,120,23,0.2)',
            }}>
              CLICK TO DETONATE
            </span>
            <div className="hidden sm:block h-[2px] w-24" style={{
              background: 'repeating-linear-gradient(90deg, #C17817 0px, #C17817 4px, transparent 4px, transparent 8px)',
              opacity: 0.5,
            }} />
          </div>
        </div>
      )}

      {/* Detonation counter */}
      {count > 0 && (
        <div className="absolute top-3 right-4 text-copper text-sm font-[family-name:var(--font-satoshi)] font-semibold tracking-wider pointer-events-none select-none" style={{ textShadow: '0 0 12px rgba(193,120,23,0.4)' }}>
          💥 Detonated {count} {count === 1 ? 'time' : 'times'}
        </div>
      )}

      {/* CSS for fuse spark animation */}
      <style jsx>{`
        @keyframes fuseSpark {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
