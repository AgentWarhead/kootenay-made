'use client';

import { useEffect, useRef, useCallback } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

/* ── Ripple rings + Pretext-measured words that bloom on cursor pause ── */
const RIPPLE_WORDS = ['IMPACT', 'RESULTS', 'CRAFT', 'WEIGHT', 'BUILT', 'PROVEN', 'SOLID', 'BOLD'];
const FONT = 'bold 18px Georgia, serif';

interface Ripple {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

interface WordBurst {
  id: number;
  x: number;
  y: number;
  createdAt: number;
  chars: { char: string; angle: number; speed: number; width: number }[];
  word: string;
}

const STILL_THRESHOLD_MS = 400;
const RIPPLE_DURATION_MS = 800;
const WORD_DURATION_MS = 2500;
const MAX_RIPPLES = 8;
const MAX_WORDS = 4;

export default function RippleCursorTrail() {
  const containerRef = useRef<SVGSVGElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const wordsRef = useRef<WordBurst[]>([]);
  const idCounterRef = useRef(0);
  const lastMoveRef = useRef(0);
  const cursorRef = useRef({ x: 0, y: 0 });
  const spawnedRef = useRef(false);
  const wordCountRef = useRef(0);
  const animRef = useRef<number>(0);
  const isActiveRef = useRef(false);
  const charWidthsRef = useRef<Map<string, number>>(new Map());

  const measureChar = useCallback((ch: string): number => {
    const cached = charWidthsRef.current.get(ch);
    if (cached) return cached;
    let w = 12;
    try {
      const prepared = prepareWithSegments(ch, FONT);
      walkLineRanges(prepared, 2000, (line) => {
        if (line.width > 0) w = line.width;
      });
    } catch { /* fallback */ }
    charWidthsRef.current.set(ch, w);
    return w;
  }, []);

  const animate = useCallback(() => {
    const now = performance.now();
    const svg = containerRef.current;
    if (!svg) return;

    // Check if cursor has been still long enough
    if (!spawnedRef.current && now - lastMoveRef.current > STILL_THRESHOLD_MS && lastMoveRef.current > 0) {
      spawnedRef.current = true;
      const { x, y } = cursorRef.current;
      
      // Always spawn a ripple
      ripplesRef.current.push({ id: idCounterRef.current++, x, y, createdAt: now });
      while (ripplesRef.current.length > MAX_RIPPLES) ripplesRef.current.shift();

      // Every 3rd stop, spawn a word burst
      wordCountRef.current++;
      if (wordCountRef.current % 3 === 0) {
        const word = RIPPLE_WORDS[Math.floor(Math.random() * RIPPLE_WORDS.length)];
        const chars = [];
        for (let i = 0; i < word.length; i++) {
          const ch = word[i];
          const angle = (i / word.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
          chars.push({
            char: ch,
            angle,
            speed: 1.5 + Math.random() * 1,
            width: measureChar(ch),
          });
        }
        wordsRef.current.push({ id: idCounterRef.current++, x, y, createdAt: now, chars, word });
        while (wordsRef.current.length > MAX_WORDS) wordsRef.current.shift();
      }
    }

    // Render
    let hasContent = false;
    while (svg.lastChild) svg.removeChild(svg.lastChild);

    // Draw ripple rings
    for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
      const r = ripplesRef.current[i];
      const age = now - r.createdAt;
      if (age >= RIPPLE_DURATION_MS) { ripplesRef.current.splice(i, 1); continue; }
      hasContent = true;
      const progress = age / RIPPLE_DURATION_MS;
      const radius = 5 + progress * 40;
      const opacity = 0.4 * (1 - progress * progress);
      const strokeW = 1.5 - progress * 1;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(r.x));
      circle.setAttribute('cy', String(r.y));
      circle.setAttribute('r', String(radius));
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', '#C17817');
      circle.setAttribute('stroke-width', String(Math.max(0.3, strokeW)));
      circle.setAttribute('opacity', String(opacity));
      svg.appendChild(circle);

      // Second inner ring for depth
      if (progress < 0.6) {
        const inner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        inner.setAttribute('cx', String(r.x));
        inner.setAttribute('cy', String(r.y));
        inner.setAttribute('r', String(3 + progress * 20));
        inner.setAttribute('fill', 'none');
        inner.setAttribute('stroke', '#C17817');
        inner.setAttribute('stroke-width', '0.5');
        inner.setAttribute('opacity', String(0.2 * (1 - progress / 0.6)));
        svg.appendChild(inner);
      }
    }

    // Draw word bursts — chars expand outward from center
    for (let i = wordsRef.current.length - 1; i >= 0; i--) {
      const wb = wordsRef.current[i];
      const age = now - wb.createdAt;
      if (age >= WORD_DURATION_MS) { wordsRef.current.splice(i, 1); continue; }
      hasContent = true;
      const progress = age / WORD_DURATION_MS;
      
      for (const ch of wb.chars) {
        const dist = progress * ch.speed * 50;
        const cx = wb.x + Math.cos(ch.angle) * dist;
        const cy = wb.y + Math.sin(ch.angle) * dist - progress * 15; // slight float up
        const opacity = progress < 0.1
          ? progress / 0.1 * 0.5  // fade in
          : 0.5 * (1 - (progress - 0.1) / 0.9); // fade out
        const angleDeg = (ch.angle * 180 / Math.PI);

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.textContent = ch.char;
        text.setAttribute('font-family', 'Georgia, serif');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('font-size', '18');
        text.setAttribute('fill', '#C17817');
        text.setAttribute('opacity', String(Math.max(0, opacity)));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        g.setAttribute('transform', `translate(${cx},${cy}) rotate(${angleDeg * 0.3})`);
        g.appendChild(text);
        svg.appendChild(g);
      }
    }

    if (isActiveRef.current || hasContent) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, [measureChar]);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    isActiveRef.current = true;
    animRef.current = requestAnimationFrame(animate);

    function handleMouseMove(e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;
      const dx = x - cursorRef.current.x;
      const dy = y - cursorRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 3) {
        lastMoveRef.current = performance.now();
        spawnedRef.current = false;
      }
      cursorRef.current = { x, y };
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      isActiveRef.current = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animate]);

  return (
    <svg
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-50"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
