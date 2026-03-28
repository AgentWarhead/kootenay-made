'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Scroll to top"
        >
          {/* Mountain peak shape */}
          <svg width="48" height="48" viewBox="0 0 48 48" className="drop-shadow-lg">
            <path
              d="M24 8 L38 36 L10 36 Z"
              fill="#1A1D20"
              stroke="#C17817"
              strokeWidth="1.5"
              className="transition-all group-hover:fill-[#232629]"
            />
            <path
              d="M24 16 L20 24 L28 24 Z"
              fill="#C17817"
              opacity="0.6"
              className="transition-opacity group-hover:opacity-1"
            />
            {/* Snow cap */}
            <path
              d="M24 8 L28 16 L20 16 Z"
              fill="#F8F4F0"
              opacity="0.9"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
