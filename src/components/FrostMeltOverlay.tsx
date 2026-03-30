'use client';
import { useEffect, useRef } from 'react';

export default function FrostMeltOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const handleScroll = () => {
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: 0 when section enters viewport, 1 when fully visible
      const progress = Math.max(0, Math.min(1, 1 - (rect.top / (vh * 0.6))));
      el.style.setProperty('--frost-melt', `${progress * 60}%`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 z-[5] pointer-events-none transition-[background] duration-100"
      style={{
        background: 'radial-gradient(circle at 50% 50%, transparent var(--frost-melt, 0%), rgba(168,216,234,0.15) calc(var(--frost-melt, 0%) + 15%), rgba(200,230,255,0.08) 100%)',
      }}
    />
  );
}
