'use client';

import { useState, useCallback, type ReactNode, type MouseEvent } from 'react';
import MagneticButton from '@/components/MagneticButton';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface RippleButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function RippleButton({ children, href, onClick }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple: Ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    };
    setRipples(prev => [...prev, ripple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 700);
    onClick?.();
  }, [onClick]);

  return (
    <MagneticButton as={href ? 'a' : 'button'} href={href}>
      <div className="relative overflow-hidden rounded-lg" onClick={handleClick}>
        {children}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none ripple-effect"
            style={{
              left: ripple.x - 4,
              top: ripple.y - 4,
              width: 8,
              height: 8,
              background: 'radial-gradient(circle, rgba(193,120,23,0.6) 0%, rgba(193,120,23,0) 70%)',
            }}
          />
        ))}
      </div>
    </MagneticButton>
  );
}
