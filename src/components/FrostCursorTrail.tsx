'use client';

import { useEffect, useRef, useCallback } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

/* ── Frost words that form behind the cursor like ice crystallizing ── */
const FROST_WORDS = ['FROST', 'ICE', 'COLD', 'FREEZE', 'WINTER', 'CRYSTAL', 'SNOW', 'CHILL', 'GLACIAL', 'THAW'];
const FROST_CHARS = ['❄', '✦', '✧', '◇', '⬡', '△', '▽', '·', '∗', '⊹'];

interface TrailElement {
  id: number;
  x: number;
  y: number;
  type: 'word' | 'crystal';
  text: string;
  angle: number;
  opacity: number;
  scale: number;
  createdAt: number;
  offsetX: number;
  offsetY: number;
  width: number;
  drift: number; // slow drift direction
}

const MAX_ELEMENTS = 35;
const WORD_FADE_MS = 2000;
const CRYSTAL_FADE_MS = 1200;
const WORD_INTERVAL_PX = 180;
const CRYSTAL_INTERVAL_PX = 30;
const THROTTLE_MS = 16;
const FONT = '14px Georgia, serif';
const CRYSTAL_FONT = '16px Georgia, serif';

export default function FrostCursorTrail() {
  const containerRef = useRef<SVGSVGElement>(null);
  const elementsRef = useRef<TrailElement[]>([]);
  const idCounterRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const wordDistRef = useRef(0);
  const crystalDistRef = useRef(0);
  const lastFrameRef = useRef(0);
  const animRef = useRef<number>(0);
  const isActiveRef = useRef(false);
  const charWidthsRef = useRef<Map<string, number>>(new Map());

  /* ── Measure text with Pretext ── */
  const measureText = useCallback((text: string, font: string): number => {
    const cached = charWidthsRef.current.get(text + font);
    if (cached) return cached;
    let w = text.length * 8;
    try {
      const prepared = prepareWithSegments(text, font);
      walkLineRanges(prepared, 2000, (line) => {
        if (line.width > 0) w = line.width;
      });
    } catch { /* fallback */ }
    charWidthsRef.current.set(text + font, w);
    return w;
  }, []);

  const animate = useCallback(() => {
    const now = performance.now();
    const els = elementsRef.current;
    const svg = containerRef.current;
    if (!svg) return;

    let changed = false;
    for (let i = els.length - 1; i >= 0; i--) {
      const el = els[i];
      const fadeMs = el.type === 'word' ? WORD_FADE_MS : CRYSTAL_FADE_MS;
      const age = now - el.createdAt;
      if (age >= fadeMs) {
        els.splice(i, 1);
        changed = true;
        continue;
      }
      const progress = age / fadeMs;
      // Words: fade out and drift upward
      // Crystals: shrink and fade
      const newOpacity = el.type === 'word'
        ? 0.35 * (1 - progress * progress) // ease out
        : 0.5 * (1 - progress);
      const newScale = el.type === 'crystal' ? 1 - progress * 0.5 : 1;
      
      if (Math.abs(el.opacity - newOpacity) > 0.005) {
        el.opacity = newOpacity;
        el.scale = newScale;
        // Drift: words float up and away slowly
        if (el.type === 'word') {
          el.offsetY -= 0.15;
          el.offsetX += el.drift * 0.1;
        }
        changed = true;
      }
    }

    if (changed) {
      while (svg.lastChild) svg.removeChild(svg.lastChild);

      for (const el of els) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.textContent = el.text;
        text.setAttribute('font-family', 'Georgia, serif');
        text.setAttribute('font-size', el.type === 'word' ? '14' : '16');
        text.setAttribute('fill', el.type === 'word' ? '#A8D8EA' : '#DCF0FF');
        text.setAttribute('opacity', String(el.opacity));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        
        const tx = el.x + el.offsetX;
        const ty = el.y + el.offsetY;
        g.setAttribute(
          'transform',
          `translate(${tx}, ${ty}) rotate(${el.angle}) scale(${el.scale})`
        );
        g.appendChild(text);
        svg.appendChild(g);
      }
    }

    if (isActiveRef.current || els.length > 0) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Pre-measure frost words with Pretext
    for (const word of FROST_WORDS) {
      measureText(word, FONT);
    }

    isActiveRef.current = true;
    animRef.current = requestAnimationFrame(animate);

    function handleMouseMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastFrameRef.current < THROTTLE_MS) return;
      lastFrameRef.current = now;

      const x = e.clientX;
      const y = e.clientY;
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) return;

      const angle = Math.atan2(dy, dx);
      const angleDeg = (angle * 180) / Math.PI;
      const els = elementsRef.current;

      // Spawn ice crystal characters frequently
      crystalDistRef.current += dist;
      if (crystalDistRef.current >= CRYSTAL_INTERVAL_PX) {
        crystalDistRef.current = 0;
        const char = FROST_CHARS[Math.floor(Math.random() * FROST_CHARS.length)];
        const side = (idCounterRef.current % 2 === 0) ? 1 : -1;
        const perpX = -Math.sin(angle) * side * (8 + Math.random() * 12);
        const perpY = Math.cos(angle) * side * (8 + Math.random() * 12);

        els.push({
          id: idCounterRef.current++,
          x, y, type: 'crystal', text: char,
          angle: Math.random() * 40 - 20,
          opacity: 0.5, scale: 1,
          createdAt: now,
          offsetX: perpX, offsetY: perpY,
          width: 16, drift: 0,
        });
      }

      // Spawn Pretext-measured frost words less frequently
      wordDistRef.current += dist;
      if (wordDistRef.current >= WORD_INTERVAL_PX) {
        wordDistRef.current = 0;
        const word = FROST_WORDS[Math.floor(Math.random() * FROST_WORDS.length)];
        const w = measureText(word, FONT);
        const side = (idCounterRef.current % 2 === 0) ? 1 : -1;
        const perpX = -Math.sin(angle) * side * (20 + Math.random() * 15);
        const perpY = Math.cos(angle) * side * (20 + Math.random() * 15);

        els.push({
          id: idCounterRef.current++,
          x, y, type: 'word', text: word,
          angle: angleDeg + (Math.random() - 0.5) * 30,
          opacity: 0.35, scale: 1,
          createdAt: now,
          offsetX: perpX, offsetY: perpY,
          width: w, drift: (Math.random() - 0.5) * 2,
        });
      }

      while (els.length > MAX_ELEMENTS) els.shift();
      lastPosRef.current = { x, y };
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      isActiveRef.current = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animate, measureText]);

  return (
    <svg
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-50"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
