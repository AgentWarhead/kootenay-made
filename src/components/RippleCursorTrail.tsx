'use client';

import { useEffect, useRef, useCallback } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

/* ── High-quality water ripple cursor with Pretext-measured wave text ── */
const WAVE_CHARS = ['~', '≈', '∿', '~', '≈'];
const FONT = '13px Georgia, serif';

interface RippleRing {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

interface WaveChar {
  id: number;
  x: number;
  y: number;
  char: string;
  opacity: number;
  createdAt: number;
  offsetX: number;
  offsetY: number;
  drift: number;
  freq: number;
  phase: number;
}

const MAX_RINGS = 15;
const MAX_CHARS = 50;
const RING_DURATION = 1200;
const CHAR_DURATION = 2000;
const RING_INTERVAL_PX = 40;
const CHAR_INTERVAL_PX = 18;
const THROTTLE_MS = 16;

export default function RippleCursorTrail() {
  const containerRef = useRef<SVGSVGElement>(null);
  const ringsRef = useRef<RippleRing[]>([]);
  const charsRef = useRef<WaveChar[]>([]);
  const idRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const ringDistRef = useRef(0);
  const charDistRef = useRef(0);
  const lastFrameRef = useRef(0);
  const animRef = useRef<number>(0);
  const isActiveRef = useRef(false);
  const widthCacheRef = useRef<Map<string, number>>(new Map());

  const measureChar = useCallback((ch: string): number => {
    const cached = widthCacheRef.current.get(ch);
    if (cached) return cached;
    let w = 8;
    try {
      const prepared = prepareWithSegments(ch, FONT);
      walkLineRanges(prepared, 2000, (line) => { if (line.width > 0) w = line.width; });
    } catch { /* fallback */ }
    widthCacheRef.current.set(ch, w);
    return w;
  }, []);

  const animate = useCallback(() => {
    const now = performance.now();
    const svg = containerRef.current;
    if (!svg) return;

    while (svg.lastChild) svg.removeChild(svg.lastChild);
    let hasContent = false;

    // ── Multi-ring ripples — 3 concentric rings per spawn point ──
    for (let i = ringsRef.current.length - 1; i >= 0; i--) {
      const r = ringsRef.current[i];
      const age = now - r.createdAt;
      if (age >= RING_DURATION) { ringsRef.current.splice(i, 1); continue; }
      hasContent = true;
      const p = age / RING_DURATION;

      // 3 concentric rings with staggered timing
      for (let ring = 0; ring < 3; ring++) {
        const stagger = ring * 0.12;
        const rp = Math.max(0, p - stagger);
        if (rp <= 0 || rp >= 1) continue;

        const radius = 3 + rp * (25 + ring * 10);
        const opacity = (0.3 - ring * 0.08) * (1 - rp * rp);
        const sw = (1.5 - ring * 0.3) * (1 - rp);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', String(r.x));
        circle.setAttribute('cy', String(r.y));
        circle.setAttribute('r', String(radius));
        circle.setAttribute('fill', 'none');
        // Alternate copper and river blue for depth
        circle.setAttribute('stroke', ring === 1 ? '#4A90A4' : '#C17817');
        circle.setAttribute('stroke-width', String(Math.max(0.2, sw)));
        circle.setAttribute('opacity', String(Math.max(0, opacity)));
        svg.appendChild(circle);
      }
    }

    // ── Pretext-measured wave characters — flowing water texture ──
    for (let i = charsRef.current.length - 1; i >= 0; i--) {
      const wc = charsRef.current[i];
      const age = now - wc.createdAt;
      if (age >= CHAR_DURATION) { charsRef.current.splice(i, 1); continue; }
      hasContent = true;
      const p = age / CHAR_DURATION;

      // Wave motion — chars bob and drift like water surface
      const bobY = Math.sin(now * 0.003 * wc.freq + wc.phase) * 3;
      const bobX = Math.cos(now * 0.002 * wc.freq + wc.phase * 1.3) * 2;
      wc.offsetY -= 0.12; // slow upward float
      wc.offsetX += wc.drift * 0.08;

      // Fade: quick in, slow out
      const opacity = p < 0.05 ? (p / 0.05) * 0.35 : 0.35 * (1 - (p - 0.05) / 0.95);

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.textContent = wc.char;
      text.setAttribute('font-family', 'Georgia, serif');
      text.setAttribute('font-size', '13');
      // Color shifts from river blue to copper as it ages
      const blueAmt = 1 - p;
      const r = Math.round(74 + (193 - 74) * p);
      const g2 = Math.round(144 + (120 - 144) * p);
      const b = Math.round(164 + (23 - 164) * p);
      text.setAttribute('fill', `rgb(${r},${g2},${b})`);
      text.setAttribute('opacity', String(Math.max(0, opacity)));
      text.setAttribute('text-anchor', 'middle');
      g.setAttribute('transform', `translate(${wc.x + wc.offsetX + bobX},${wc.y + wc.offsetY + bobY})`);
      g.appendChild(text);
      svg.appendChild(g);
    }

    if (isActiveRef.current || hasContent) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Pre-measure wave chars
    for (const ch of WAVE_CHARS) measureChar(ch);

    isActiveRef.current = true;
    animRef.current = requestAnimationFrame(animate);

    function handleMouseMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastFrameRef.current < THROTTLE_MS) return;
      lastFrameRef.current = now;

      const x = e.clientX, y = e.clientY;
      const dx = x - lastPosRef.current.x, dy = y - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) return;

      const angle = Math.atan2(dy, dx);

      // Spawn ripple rings
      ringDistRef.current += dist;
      if (ringDistRef.current >= RING_INTERVAL_PX) {
        ringDistRef.current = 0;
        ringsRef.current.push({ id: idRef.current++, x, y, createdAt: now });
        while (ringsRef.current.length > MAX_RINGS) ringsRef.current.shift();
      }

      // Spawn dense wave characters
      charDistRef.current += dist;
      if (charDistRef.current >= CHAR_INTERVAL_PX) {
        charDistRef.current = 0;
        const char = WAVE_CHARS[idRef.current % WAVE_CHARS.length];
        const side = (idRef.current % 2 === 0) ? 1 : -1;
        const spread = 5 + Math.random() * 18;
        const perpX = -Math.sin(angle) * side * spread;
        const perpY = Math.cos(angle) * side * spread;

        charsRef.current.push({
          id: idRef.current++, x, y, char,
          opacity: 0.35, createdAt: now,
          offsetX: perpX, offsetY: perpY,
          drift: (Math.random() - 0.5) * 1.5,
          freq: 0.8 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2,
        });
        while (charsRef.current.length > MAX_CHARS) charsRef.current.shift();
      }

      lastPosRef.current = { x, y };
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      isActiveRef.current = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animate, measureChar]);

  return (
    <svg
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-50"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
