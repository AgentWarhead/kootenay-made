'use client';

import { useEffect, useRef, useCallback } from 'react';

/* ── Trail element types ── */
interface TrailElement {
  id: number;
  x: number;
  y: number;
  angle: number; // direction of travel (radians)
  opacity: number;
  createdAt: number;
  offsetX: number;
  offsetY: number;
}

/* ── Bear paw SVG path (24x24 viewBox) ── */
// Toes at top, main pad below — standard bear paw orientation
const BEAR_PAW = `M12,20 C12,22 10,24 8,24 C6,24 4,22 4,20 C4,18 6,16 8,16 C10,16 12,18 12,20Z M20,20 C20,22 18,24 16,24 C14,24 12,22 12,20 C12,18 14,16 16,16 C18,16 20,18 20,20Z M6,12 C6,14 4,15 3,14.5 C1.5,14 1,12 2,10.5 C3,9 5,10 6,12Z M18,12 C18,14 20,15 21,14.5 C22.5,14 23,12 22,10.5 C21,9 19,10 18,12Z M12,8 C12,10 11,11 10,10.5 C9,10 8.5,8.5 9.5,7 C10.5,5.5 11.5,6.5 12,8Z M12,8 C12,10 13,11 14,10.5 C15,10 15.5,8.5 14.5,7 C13.5,5.5 12.5,6.5 12,8Z`;

const MAX_ELEMENTS = 25;
const PRINT_FADE_MS = 2200;
const PRINT_INTERVAL_PX = 130;
const THROTTLE_MS = 16;

export default function WildernessCursorTrail() {
  const containerRef = useRef<SVGSVGElement>(null);
  const elementsRef = useRef<TrailElement[]>([]);
  const idCounterRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastPrintDistRef = useRef(0);
  const lastFrameRef = useRef(0);
  const animRef = useRef<number>(0);
  const isActiveRef = useRef(false);

  const animate = useCallback(() => {
    const now = performance.now();
    const els = elementsRef.current;
    const svg = containerRef.current;
    if (!svg) return;

    let changed = false;
    for (let i = els.length - 1; i >= 0; i--) {
      const el = els[i];
      const age = now - el.createdAt;
      if (age >= PRINT_FADE_MS) {
        els.splice(i, 1);
        changed = true;
        continue;
      }
      // Start fading at 60% through lifetime
      const fadeStart = PRINT_FADE_MS * 0.6;
      const newOpacity = age < fadeStart
        ? 0.22
        : 0.22 * (1 - (age - fadeStart) / (PRINT_FADE_MS - fadeStart));

      if (Math.abs(el.opacity - newOpacity) > 0.005) {
        el.opacity = newOpacity;
        changed = true;
      }
    }

    if (changed) {
      while (svg.lastChild) svg.removeChild(svg.lastChild);

      for (const el of els) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', BEAR_PAW);
        path.setAttribute('fill', '#C17817');
        path.setAttribute('opacity', String(el.opacity));

        // Bear paw rotation: toes point in the direction of travel.
        // The SVG paw has toes at the top (toward y=0), main pad at bottom.
        // We rotate so toes face the direction of movement.
        // atan2(dy,dx) gives angle from east; subtract 90° so toes (pointing up) align to movement direction.
        const angleDeg = (el.angle * 180) / Math.PI - 90;

        // Translate so paw center is at (x+offsetX, y+offsetY), then rotate around paw center
        g.setAttribute(
          'transform',
          `translate(${el.x + el.offsetX}, ${el.y + el.offsetY}) rotate(${angleDeg}) translate(-12, -16) scale(0.75)`
        );
        g.appendChild(path);
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

      if (dist < 3) return;

      const angle = Math.atan2(dy, dx); // direction of travel

      const els = elementsRef.current;

      lastPrintDistRef.current += dist;
      if (lastPrintDistRef.current >= PRINT_INTERVAL_PX) {
        lastPrintDistRef.current = 0;

        // Alternate left/right paws naturally
        const side = (idCounterRef.current % 2 === 0) ? 1 : -1;
        // Perpendicular offset: rotate 90° from travel direction
        const perpX = -Math.sin(angle) * side * 10;
        const perpY = Math.cos(angle) * side * 10;

        els.push({
          id: idCounterRef.current++,
          x,
          y,
          angle,
          opacity: 0.22,
          createdAt: now,
          offsetX: perpX + (Math.random() - 0.5) * 4,
          offsetY: perpY + (Math.random() - 0.5) * 4,
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
