'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className = '', delay = 0 }: Props) {
  const [fallbackVisible, setFallbackVisible] = useState(false);

  // Fallback: show content after 2.5 seconds regardless of scroll
  useEffect(() => {
    const t = setTimeout(() => setFallbackVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0.01, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
      style={fallbackVisible ? { opacity: 1, transform: 'translateY(0)' } : undefined}
    >
      {children}
    </motion.div>
  );
}
