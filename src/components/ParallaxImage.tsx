'use client';

import Image, { type ImageProps } from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxImageProps extends Omit<ImageProps, 'ref'> {
  shift?: number; // percentage of parallax movement, default 2
}

export default function ParallaxImage({ shift = 2, className = '', style, ...props }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${shift}%`, `${shift}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={style}>
      <motion.div style={{ y }} className="w-full h-full">
        <Image {...props} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}
