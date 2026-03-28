'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Pause/play video based on viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView, prefersReducedMotion]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[60vh] sm:h-[80vh] min-h-[600px] overflow-hidden"
    >
      {/* Video */}
      {!prefersReducedMotion ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/misc/kootenay-bg-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/misc/kootenay-bg-web.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/images/misc/kootenay-bg-poster.jpg"
          alt="West Kootenay landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Title */}
        <motion.h2
          {...fadeUp(0)}
          className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl font-bold text-cream leading-tight"
        >
          Rooted in the West Kootenays
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.15)}
          className="mt-4 font-[family-name:var(--font-general-sans)] text-lg text-cream/80 max-w-xl"
        >
          Local expertise. We know these communities because we&apos;re part of them.
        </motion.p>

        {/* CTA */}
        <motion.a
          {...fadeUp(0.3)}
          href="/contact"
          className="mt-8 inline-block px-8 py-3 rounded-full font-semibold text-slate transition-transform hover:scale-105"
          style={{ backgroundColor: '#C17817' }}
        >
          Start Your Project &rarr;
        </motion.a>

        {/* Sub-text */}
        <motion.p
          {...fadeUp(0.4)}
          className="mt-4 text-sm text-cream/60"
        >
          We serve all of BC — but the Kootenays are home.
        </motion.p>
      </div>
    </section>
  );
}
