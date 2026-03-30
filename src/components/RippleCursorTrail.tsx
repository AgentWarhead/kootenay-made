'use client';

import { useEffect, useRef } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

const MAX_RIPPLES = 5;
const RIPPLE_DURATION_MS = 600;
const STILL_THRESHOLD_MS = 300;
const MOVE_THRESHOLD_PX = 3;
const THROTTLE_MS = 16;

export default function RippleCursorTrail() {
  const containerRef = useRef<SVGSVGElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const idCounterRef = useRef(0);
  const posRef = useRef({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef(performance.now());
  const spawnedForStopRef = useRef(false);
  const lastFrameRef = useRef(0);
  const animRef = useRef<number>(0);
  const isActiveRef = useRef(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    isActiveRef.current = true;

    function animate() {
      const now = performance.now();
      const ripples = ripplesRef.current;
      const svg = containerRef.current;
      if (!svg) return;

      // Spawn ripple when cursor has been still long enough
      if (!spawnedForStopRef.current && now - lastMoveTimeRef.current >= STILL_THRESHOLD_MS) {
        spawnedForStopRef.current = true;
        ripples.push({
          id: idCounterRef.current++,
          x: posRef.current.x,
          y: posRef.current.y,
          createdAt: now,
        });
        while (ripples.length > MAX_RIPPLES) ripples.shift();
      }

      let changed = false;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const age = now - ripples[i].createdAt;
        if (age >= RIPPLE_DURATION_MS) {
          ripples.splice(i, 1);
          changed = true;
        } else {
          changed = true; // always re-render for smooth animation
        }
      }

      // Rebuild SVG
      while (svg.lastChild) svg.removeChild(svg.lastChild);

      for (const r of ripples) {
        const age = now - r.createdAt;
        const progress = age / RIPPLE_DURATION_MS;
        const radius = 5 + 25 * progress;          // 5 → 30
        const opacity = 0.4 * (1 - progress);       // 0.4 → 0
        const strokeWidth = 1.5 - 1.0 * progress;  // 1.5 → 0.5

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', String(r.x));
        circle.setAttribute('cy', String(r.y));
        circle.setAttribute('r', String(radius));
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#C17817');
        circle.setAttribute('stroke-width', String(strokeWidth));
        circle.setAttribute('opacity', String(opacity));
        svg.appendChild(circle);
      }

      if (isActiveRef.current || ripples.length > 0) {
        animRef.current = requestAnimationFrame(animate);
      }
    }

    animRef.current = requestAnimationFrame(animate);

    function handleMouseMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastFrameRef.current < THROTTLE_MS) return;
      lastFrameRef.current = now;

      const x = e.clientX;
      const y = e.clientY;
      const dx = x - posRef.current.x;
      const dy = y - posRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > MOVE_THRESHOLD_PX) {
        posRef.current = { x, y };
        lastMoveTimeRef.current = now;
        spawnedForStopRef.current = false;
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      isActiveRef.current = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-50"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
