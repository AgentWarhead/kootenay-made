'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Flag } from 'lucide-react';

// Topographic contour line fragments as SVG path segments
const CONTOUR_PATHS = [
  'M0,8 Q4,4 8,6 T16,8',
  'M0,4 Q6,2 10,5 T16,3',
  'M0,6 Q3,8 8,5 T16,7',
  'M0,10 Q5,6 10,9 T16,10',
  'M0,3 Q4,6 8,3 T16,5',
  'M0,7 Q6,4 12,7 T16,6',
  'M0,5 Q3,2 7,5 T16,4',
  'M0,9 Q5,7 10,9 T16,8',
];

export default function ReadingProgressTrail() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  const updateProgress = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      setProgress(0);
      return;
    }
    const scrolled = window.scrollY / docHeight;
    setProgress(Math.min(Math.max(scrolled, 0), 1));
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  const percent = Math.round(progress * 100);
  const trailHeight = 'calc(100vh - 80px)';
  const fillHeight = `${progress * 100}%`;

  return (
    <div
      className="fixed left-4 top-[40px] z-40 hidden lg:flex flex-col items-center gap-1"
      style={{ height: trailHeight }}
      aria-hidden="true"
    >
      {/* Trail marker dot at top */}
      <div className="w-3 h-3 rounded-full bg-copper/60 border-2 border-copper shrink-0" />

      {/* Percentage text */}
      <span className="text-[9px] font-mono text-copper/70 tabular-nums leading-none">
        {percent}%
      </span>

      {/* Trail container */}
      <div className="flex-1 w-[6px] rounded-full bg-slate/20 overflow-hidden relative">
        {/* Filled portion with contour lines */}
        <div
          className="absolute top-0 left-0 w-full overflow-hidden transition-[height] duration-150 ease-out"
          style={{ height: fillHeight }}
        >
          <svg
            width="6"
            height="100%"
            viewBox="0 0 16 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Base fill */}
            <rect width="16" height="100" fill="rgba(193, 120, 23, 0.3)" />
            {/* Contour lines */}
            {CONTOUR_PATHS.map((d, i) => (
              <g key={i} transform={`translate(0, ${(i / CONTOUR_PATHS.length) * 100})`}>
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(193, 120, 23, 0.7)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Summit flag at bottom */}
      <Flag
        size={12}
        className={`shrink-0 transition-colors duration-300 ${
          progress > 0.95 ? 'text-copper' : 'text-copper/30'
        }`}
      />
    </div>
  );
}
