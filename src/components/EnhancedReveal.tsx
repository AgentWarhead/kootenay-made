'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
}

const directionVariants: Record<RevealDirection, { initial: Record<string, number>; animate: Record<string, number> }> = {
  up: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 } },
  rotate: { initial: { opacity: 0, rotate: -3, y: 20 }, animate: { opacity: 1, rotate: 0, y: 0 } },
};

export default function EnhancedReveal({ children, className = '', delay = 0, direction = 'up' }: Props) {
  const [fallbackVisible, setFallbackVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFallbackVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const variant = directionVariants[direction];

  return (
    <motion.div
      initial={variant.initial}
      whileInView={variant.animate}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
      style={fallbackVisible ? { opacity: 1, transform: 'none' } : undefined}
    >
      {children}
    </motion.div>
  );
}
