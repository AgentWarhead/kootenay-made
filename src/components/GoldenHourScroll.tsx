'use client';

import { useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export default function GoldenHourScroll() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.style.setProperty('--scroll-warmth', '0');
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    document.documentElement.style.setProperty('--scroll-warmth', String(v));
  });

  return null;
}
