'use client';

import { useEffect, useRef, useCallback } from 'react';

/* ── Trail element types ── */
interface TrailElement {
  id: number;
  x: number;
  y: number;
  type: 'contour' | 'bear' | 'deer';
  angle: number;
  opacity: number;
  createdAt: number;
  offsetX: number;
  offsetY: number;
}

/* ── SVG Paths ── */
const BEAR_PAW = `M12,20 C12,22 10,24 8,24 C6,24 4,22 4,20 C4,18 6,16 8,16 C10,16 12,18 12,20Z M20,20 C20,22 18,24 16,24 C14,24 12,22 12,20 C12,18 14,16 16,16 C18,16 20,18 20,20Z M6,12 C6,14 4,15 3,14.5 C1.5,14 1,12 2,10.5 C3,9 5,10 6,12Z M18,12 C18,14 20,15 21,14.5 C22.5,14 23,12 22,10.5 C21,9 19,10 18,12Z M12,8 C12,10 11,11 10,10.5 C9,10 8.5,8.5 9.5,7 C10.5,5.5 11.5,6.5 12,8Z M12,8 C12,10 13,11 14,10.5 C15,10 15.5,8.5 14.5,7 C13.5,5.5 12.5,6.5 12,8Z`;
const DEER_HOOF = `M7,22 C7,18 9,14 10,14 C11,14 12,16 12,18 L12,18 C12,16 13,14 14,14 C15,14 17,18 17,22 C17,24 15,25 12,25 C9,25 7,24 7,22Z`;

const MAX_ELEMENTS = 30;
const CONTOUR_FADE_MS = 1500;
const PRINT_FADE_MS = 2000;
const PRINT_INTERVAL_PX = 150;
const THROTTLE_MS = 16; // ~60fps

export default function WildernessCursorTrail() {
  const containerRef = useRef<SVGSVGElement>(null);
  const elementsRef = useRef<TrailElement[]>([]);
  const idCounterRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastPrintDistRef = useRef(0);
  const lastFrameRef = useRef(0);
  const animRef = useRef<number>(0);
  const nextPrintTypeRef = useRef<'bear' | 'deer'>('bear');
  const isActiveRef = useRef(false);
  const reducedMotionRef = useRef(false);

  /* ── Generate a curved contour path ── */
  const makeContourPath = useCallback((angle: number): string => {
    const len = 30 + Math.random() * 20;
    const curve = (Math.random() - 0.5) * 0.4;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const points: string[] = [];
    const steps = 6;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const along = (t - 0.5) * len;
      const perp = Math.sin(t * Math.PI) * curve * len;
      const px = along * cos - perp * sin;
      const py = along * sin + perp * cos;
      points.push(i === 0 ? `M${px},${py}` : `L${px},${py}`);
    }
    return points.join(' ');
  }, []);

  /* ── Animation loop ── */
  const animate = useCallback(() => {
    const now = performance.now();
    const els = elementsRef.current;
    const svg = containerRef.current;
    if (!svg) return;

    // Update and cull elements
    let changed = false;
    for (let i = els.length - 1; i >= 0; i--) {
      const el = els[i];
      const fadeMs = el.type === 'contour' ? CONTOUR_FADE_MS : PRINT_FADE_MS;
      const age = now - el.createdAt;
      if (age >= fadeMs) {
        els.splice(i, 1);
        changed = true;
        continue;
      }
      const newOpacity = el.type === 'contour'
        ? 0.3 * (1 - age / fadeMs)
        : 0.2 * (1 - age / fadeMs);
      if (Math.abs(el.opacity - newOpacity) > 0.01) {
        el.opacity = newOpacity;
        changed = true;
      }
    }

    if (changed) {
      // Re-render SVG children
      while (svg.lastChild) svg.removeChild(svg.lastChild);

      for (const el of els) {
        if (el.type === 'contour') {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', makeContourPath(el.angle));
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', '#C17817');
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('stroke-linecap', 'round');
          path.setAttribute('opacity', String(el.opacity));
          path.setAttribute('transform', `translate(${el.x}, ${el.y})`);
          svg.appendChild(path);
        } else {
          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          const pathData = el.type === 'bear' ? BEAR_PAW : DEER_HOOF;
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', pathData);
          path.setAttribute('fill', '#C17817');
          path.setAttribute('opacity', String(el.opacity));
          const angleDeg = (el.angle * 180) / Math.PI - 90;
          g.setAttribute(
            'transform',
            `translate(${el.x + el.offsetX}, ${el.y + el.offsetY}) rotate(${angleDeg}) translate(-12, -16) scale(0.7)`
          );
          g.appendChild(path);
          svg.appendChild(g);
        }
      }
    }

    if (isActiveRef.current || els.length > 0) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, [makeContourPath]);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotionRef.current) return;

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

      if (dist < 3) return; // Skip tiny movements

      const angle = Math.atan2(dy, dx);

      // Add contour line element
      const els = elementsRef.current;
      els.push({
        id: idCounterRef.current++,
        x, y,
        type: 'contour',
        angle,
        opacity: 0.3,
        createdAt: now,
        offsetX: 0,
        offsetY: 0,
      });

      // Check if we should add a paw print
      lastPrintDistRef.current += dist;
      if (lastPrintDistRef.current >= PRINT_INTERVAL_PX) {
        lastPrintDistRef.current = 0;
        const printType = nextPrintTypeRef.current;
        nextPrintTypeRef.current = printType === 'bear' ? 'deer' : 'bear';

        els.push({
          id: idCounterRef.current++,
          x, y,
          type: printType,
          angle,
          opacity: 0.2,
          createdAt: now,
          offsetX: (Math.random() - 0.5) * 20,
          offsetY: (Math.random() - 0.5) * 20,
        });
      }

      // Trim to max
      while (els.length > MAX_ELEMENTS) {
        els.shift();
      }

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
