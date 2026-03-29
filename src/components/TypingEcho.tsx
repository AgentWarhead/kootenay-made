'use client';

import { useEffect, useRef, useCallback, type ReactNode } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

interface EchoEntry {
  text: string;
  x: number;
  y: number;
  opacity: number;
  startTime: number;
  driftY: number;
}

const FADE_DURATION = 3000;
const ECHO_FONT = '28px Georgia, serif';
const ECHO_COLOR = '193, 120, 23'; // copper RGB

export default function TypingEcho({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const echoesRef = useRef<EchoEntry[]>([]);
  const animRef = useRef<number>(0);
  const activeRef = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    const now = Date.now();
    const echoes = echoesRef.current;
    let hasActive = false;

    for (let i = echoes.length - 1; i >= 0; i--) {
      const echo = echoes[i];
      const elapsed = now - echo.startTime;
      const progress = Math.min(elapsed / FADE_DURATION, 1);

      if (progress >= 1) {
        echoes.splice(i, 1);
        continue;
      }

      hasActive = true;
      const opacity = echo.opacity * (1 - progress);
      const drift = progress * echo.driftY;

      ctx.font = ECHO_FONT;
      ctx.fillStyle = `rgba(${ECHO_COLOR}, ${opacity})`;
      ctx.fillText(echo.text, echo.x, echo.y - drift);
    }

    if (hasActive) {
      animRef.current = requestAnimationFrame(draw);
    } else {
      activeRef.current = false;
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!activeRef.current) {
      activeRef.current = true;
      animRef.current = requestAnimationFrame(draw);
    }
  }, [draw]);

  useEffect(() => {
    // Disable on mobile or reduced motion
    const isMobile = window.innerWidth < 640;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || reducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!target || !('value' in target)) return;
      const tagName = target.tagName.toLowerCase();
      if (tagName !== 'input' && tagName !== 'textarea') return;

      const text = target.value;
      if (!text.trim()) return;

      try {
        const prepared = prepareWithSegments(text, ECHO_FONT);
        const result = layoutWithLines(prepared, canvas.width / (window.devicePixelRatio || 1), 34);
        const textWidth = result.lines[0]?.width ?? 100;

        // Position echo near the input element
        const targetRect = target.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const echoX = targetRect.left - containerRect.left + Math.random() * 40 - 20;
        const echoY = targetRect.top - containerRect.top + targetRect.height * 0.5 + Math.random() * 30;

        // Keep within bounds
        const maxX = (canvas.width / (window.devicePixelRatio || 1)) - textWidth;
        const clampedX = Math.max(10, Math.min(echoX, maxX));

        echoesRef.current.push({
          text,
          x: clampedX,
          y: Math.max(30, echoY),
          opacity: 0.06 + Math.random() * 0.04,
          startTime: Date.now(),
          driftY: 20 + Math.random() * 15,
        });

        // Limit stored echoes
        if (echoesRef.current.length > 12) {
          echoesRef.current.shift();
        }

        startAnimation();
      } catch {
        // Ignore Pretext errors
      }
    };

    container.addEventListener('input', handleInput, true);

    return () => {
      container.removeEventListener('input', handleInput, true);
      resizeObserver.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [draw, startAnimation]);

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
