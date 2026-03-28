'use client';

import { useEffect, useRef, useCallback } from 'react';
import { getCurrentSeason, type Season } from '@/utils/season';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  phase: number;
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height - height, // start above
    size: 3 + Math.random() * 5,
    speed: 0.3 + Math.random() * 0.7,
    drift: (Math.random() - 0.5) * 0.5,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    opacity: 0.3 + Math.random() * 0.2,
    phase: Math.random() * Math.PI * 2,
  };
}

function getParticleColor(season: Season): string[] {
  switch (season) {
    case 'winter':
      return ['rgba(255, 255, 255, ', 'rgba(220, 235, 255, ', 'rgba(200, 220, 240, '];
    case 'spring':
      return ['rgba(255, 182, 193, ', 'rgba(255, 200, 210, ', 'rgba(255, 160, 180, '];
    case 'summer':
      return ['rgba(255, 200, 80, ', 'rgba(255, 180, 50, ', 'rgba(255, 220, 100, '];
    case 'fall':
      return ['rgba(193, 120, 23, ', 'rgba(180, 90, 20, ', 'rgba(210, 150, 40, '];
  }
}

export default function SeasonalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const seasonRef = useRef<Season>('spring');

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const season = seasonRef.current;
    const colors = getParticleColor(season);

    ctx.clearRect(0, 0, w, h);

    for (const p of particlesRef.current) {
      const t = Date.now() * 0.001;
      const sway = Math.sin(t + p.phase) * 0.5;

      // Update position
      p.y += p.speed;
      p.x += p.drift + sway;
      p.rotation += p.rotationSpeed;

      // Wrap around
      if (p.y > h + 10) {
        p.y = -10;
        p.x = Math.random() * w;
      }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      const color = colors[Math.floor(p.size) % colors.length];

      if (season === 'winter') {
        // Snowflakes: simple circles
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = color + p.opacity + ')';
        ctx.fill();
      } else if (season === 'spring') {
        // Cherry blossom: small petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size * 0.3, 0, 0, Math.PI * 2);
        ctx.fillStyle = color + p.opacity + ')';
        ctx.fill();
      } else if (season === 'summer') {
        // Fireflies: glowing dots
        const glow = 0.3 + Math.sin(t * 2 + p.phase) * 0.3;
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        gradient.addColorStop(0, color + (glow * p.opacity) + ')');
        gradient.addColorStop(1, color + '0)');
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      } else {
        // Fall leaves: diamond shape
        ctx.beginPath();
        const s = p.size * 0.4;
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(s, 0, 0, s);
        ctx.quadraticCurveTo(-s, 0, 0, -s);
        ctx.fillStyle = color + p.opacity + ')';
        ctx.fill();
      }

      ctx.restore();
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    seasonRef.current = getCurrentSeason();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Create initial particles
    particlesRef.current = Array.from({ length: 18 }, () =>
      createParticle(canvas.width, canvas.height)
    );
    // Spread them across viewport initially
    particlesRef.current.forEach(p => {
      p.y = Math.random() * canvas.height;
    });

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ opacity: 0.4 }}
    />
  );
}
