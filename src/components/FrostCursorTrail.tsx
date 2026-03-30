'use client';

import { useEffect, useRef } from 'react';

interface IceCrystal {
  id: number;
  x: number;
  y: number;
  r: number;
  rotation: number;
  createdAt: number;
  opacity: number;
  scale: number;
}

const MAX_CRYSTALS = 20;
const FADE_MS = 800;
const SPAWN_DIST_PX = 40;
const THROTTLE_MS = 16;

function hexPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    const px = cx + r * Math.cos(angle);
    const py = cy + r * Math.sin(angle);
    pts.push(i === 0 ? `M${px},${py}` : `L${px},${py}`);
  }
  return pts.join(' ') + ' Z';
}

export default function FrostCursorTrail() {
  const containerRef = useRef<SVGSVGElement>(null);
  const crystalsRef = useRef<IceCrystal[]>([]);
  const idCounterRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastFrameRef = useRef(0);
  const distAccRef = useRef(0);
  const animRef = useRef<number>(0);
  const isActiveRef = useRef(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    isActiveRef.current = true;

    function animate() {
      const now = performance.now();
      const crystals = crystalsRef.current;
      const svg = containerRef.current;
      if (!svg) return;

      let changed = false;
      for (let i = crystals.length - 1; i >= 0; i--) {
        const c = crystals[i];
        const age = now - c.createdAt;
        if (age >= FADE_MS) {
          crystals.splice(i, 1);
          changed = true;
          continue;
        }
        const progress = age / FADE_MS;
        const newOpacity = 0.4 * (1 - progress);
        const newScale = 1 - progress;
        if (Math.abs(c.opacity - newOpacity) > 0.005 || Math.abs(c.scale - newScale) > 0.005) {
          c.opacity = newOpacity;
          c.scale = newScale;
          changed = true;
        }
      }

      if (changed) {
        while (svg.lastChild) svg.removeChild(svg.lastChild);

        for (const c of crystals) {
          const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          // Build hexagon points relative to origin, then transform
          const pts: string[] = [];
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const px = c.r * Math.cos(angle);
            const py = c.r * Math.sin(angle);
            pts.push(`${px},${py}`);
          }
          polygon.setAttribute('points', pts.join(' '));
          polygon.setAttribute('fill', '#A8D8EA');
          polygon.setAttribute('opacity', String(c.opacity));
          polygon.setAttribute(
            'transform',
            `translate(${c.x},${c.y}) rotate(${c.rotation}) scale(${c.scale})`
          );
          svg.appendChild(polygon);
        }
      }

      if (isActiveRef.current || crystals.length > 0) {
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
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1) return;

      distAccRef.current += dist;
      lastPosRef.current = { x, y };

      if (distAccRef.current >= SPAWN_DIST_PX) {
        distAccRef.current = 0;

        const crystals = crystalsRef.current;
        const r = 3 + Math.random() * 1; // 3–4px
        crystals.push({
          id: idCounterRef.current++,
          x,
          y,
          r,
          rotation: Math.random() * 360,
          createdAt: now,
          opacity: 0.4,
          scale: 1,
        });

        while (crystals.length > MAX_CRYSTALS) crystals.shift();
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
