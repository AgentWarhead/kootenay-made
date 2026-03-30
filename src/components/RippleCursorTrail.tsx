'use client';

import { useEffect, useRef, useCallback } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

/* ── Continuous water ripple trail with Pretext-measured words ── */
const RIPPLE_WORDS = ['IMPACT', 'RESULTS', 'CRAFT', 'WEIGHT', 'BUILT', 'PROVEN', 'SOLID', 'BOLD'];
const WATER_CHARS = ['~', '≈', '∿', '〰', '⌇', '◦', '∘', '·'];
const FONT = 'bold 16px Georgia, serif';

interface RippleRing {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

interface WaterChar {
  id: number;
  x: number;
  y: number;
  char: string;
  angle: number;
  opacity: number;
  createdAt: number;
  offsetX: number;
  offsetY: number;
  drift: number;
}

interface WordBurst {
  id: number;
  x: number;
  y: number;
  createdAt: number;
  chars: { char: string; angle: number; speed: number; width: number }[];
}

const MAX_RINGS = 12;
const MAX_CHARS = 40;
const MAX_WORDS = 3;
const RING_DURATION = 900;
const CHAR_DURATION = 1800;
const WORD_DURATION = 2500;
const RING_INTERVAL_PX = 60;
const CHAR_INTERVAL_PX = 25;
const WORD_INTERVAL_PX = 250;
const THROTTLE_MS = 16;

export default function RippleCursorTrail() {
  const containerRef = useRef<SVGSVGElement>(null);
  const ringsRef = useRef<RippleRing[]>([]);
  const charsRef = useRef<WaterChar[]>([]);
  const wordsRef = useRef<WordBurst[]>([]);
  const idRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const ringDistRef = useRef(0);
  const charDistRef = useRef(0);
  const wordDistRef = useRef(0);
  const lastFrameRef = useRef(0);
  const animRef = useRef<number>(0);
  const isActiveRef = useRef(false);
  const widthCacheRef = useRef<Map<string, number>>(new Map());

  const measureChar = useCallback((ch: string): number => {
    const cached = widthCacheRef.current.get(ch);
    if (cached) return cached;
    let w = 10;
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

    // Ripple rings — expanding copper circles
    for (let i = ringsRef.current.length - 1; i >= 0; i--) {
      const r = ringsRef.current[i];
      const age = now - r.createdAt;
      if (age >= RING_DURATION) { ringsRef.current.splice(i, 1); continue; }
      hasContent = true;
      const p = age / RING_DURATION;
      const radius = 4 + p * 35;
      const opacity = 0.35 * (1 - p * p);

      // Outer ring
      const c1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c1.setAttribute('cx', String(r.x)); c1.setAttribute('cy', String(r.y));
      c1.setAttribute('r', String(radius));
      c1.setAttribute('fill', 'none'); c1.setAttribute('stroke', '#4A90A4');
      c1.setAttribute('stroke-width', String(1.5 - p)); c1.setAttribute('opacity', String(opacity));
      svg.appendChild(c1);

      // Inner ring
      if (p < 0.5) {
        const c2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c2.setAttribute('cx', String(r.x)); c2.setAttribute('cy', String(r.y));
        c2.setAttribute('r', String(2 + p * 18));
        c2.setAttribute('fill', 'none'); c2.setAttribute('stroke', '#C17817');
        c2.setAttribute('stroke-width', '0.8'); c2.setAttribute('opacity', String(0.2 * (1 - p / 0.5)));
        svg.appendChild(c2);
      }
    }

    // Water characters — tilde waves scattered behind cursor
    for (let i = charsRef.current.length - 1; i >= 0; i--) {
      const wc = charsRef.current[i];
      const age = now - wc.createdAt;
      if (age >= CHAR_DURATION) { charsRef.current.splice(i, 1); continue; }
      hasContent = true;
      const p = age / CHAR_DURATION;
      wc.opacity = 0.4 * (1 - p);
      wc.offsetY -= 0.2; // float upward
      wc.offsetX += wc.drift * 0.15; // lateral drift

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.textContent = wc.char;
      text.setAttribute('font-family', 'Georgia, serif');
      text.setAttribute('font-size', '14');
      text.setAttribute('fill', p < 0.5 ? '#4A90A4' : '#C17817');
      text.setAttribute('opacity', String(wc.opacity));
      text.setAttribute('text-anchor', 'middle');
      g.setAttribute('transform', `translate(${wc.x + wc.offsetX},${wc.y + wc.offsetY}) rotate(${wc.angle})`);
      g.appendChild(text);
      svg.appendChild(g);
    }

    // Word bursts — chars radiate outward from spawn point
    for (let i = wordsRef.current.length - 1; i >= 0; i--) {
      const wb = wordsRef.current[i];
      const age = now - wb.createdAt;
      if (age >= WORD_DURATION) { wordsRef.current.splice(i, 1); continue; }
      hasContent = true;
      const p = age / WORD_DURATION;

      for (const ch of wb.chars) {
        const dist = p * ch.speed * 45;
        const cx = wb.x + Math.cos(ch.angle) * dist;
        const cy = wb.y + Math.sin(ch.angle) * dist - p * 12;
        const opacity = p < 0.1 ? (p / 0.1) * 0.5 : 0.5 * (1 - (p - 0.1) / 0.9);

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.textContent = ch.char;
        text.setAttribute('font-family', 'Georgia, serif');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('font-size', '16');
        text.setAttribute('fill', '#C17817');
        text.setAttribute('opacity', String(Math.max(0, opacity)));
        text.setAttribute('text-anchor', 'middle');
        g.setAttribute('transform', `translate(${cx},${cy})`);
        g.appendChild(text);
        svg.appendChild(g);
      }
    }

    if (isActiveRef.current || hasContent) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

      // Spawn ripple rings along movement
      ringDistRef.current += dist;
      if (ringDistRef.current >= RING_INTERVAL_PX) {
        ringDistRef.current = 0;
        ringsRef.current.push({ id: idRef.current++, x, y, createdAt: now });
        while (ringsRef.current.length > MAX_RINGS) ringsRef.current.shift();
      }

      // Spawn water chars densely
      charDistRef.current += dist;
      if (charDistRef.current >= CHAR_INTERVAL_PX) {
        charDistRef.current = 0;
        const char = WATER_CHARS[Math.floor(Math.random() * WATER_CHARS.length)];
        const side = (idRef.current % 2 === 0) ? 1 : -1;
        const perpX = -Math.sin(angle) * side * (6 + Math.random() * 14);
        const perpY = Math.cos(angle) * side * (6 + Math.random() * 14);

        charsRef.current.push({
          id: idRef.current++, x, y, char,
          angle: Math.random() * 20 - 10,
          opacity: 0.4, createdAt: now,
          offsetX: perpX, offsetY: perpY,
          drift: (Math.random() - 0.5) * 2,
        });
        while (charsRef.current.length > MAX_CHARS) charsRef.current.shift();
      }

      // Spawn Pretext-measured word bursts occasionally
      wordDistRef.current += dist;
      if (wordDistRef.current >= WORD_INTERVAL_PX) {
        wordDistRef.current = 0;
        const word = RIPPLE_WORDS[Math.floor(Math.random() * RIPPLE_WORDS.length)];
        const chars = [];
        for (let i = 0; i < word.length; i++) {
          const a = (i / word.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
          chars.push({ char: word[i], angle: a, speed: 1.2 + Math.random() * 1.2, width: measureChar(word[i]) });
        }
        wordsRef.current.push({ id: idRef.current++, x, y, createdAt: now, chars });
        while (wordsRef.current.length > MAX_WORDS) wordsRef.current.shift();
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
