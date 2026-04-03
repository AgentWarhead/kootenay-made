'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GameHintBubble() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('gameHintShown')) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem('gameHintShown', 'true');

      // Auto-dismiss after 5 seconds
      setTimeout(() => setVisible(false), 5000);
    }, 45000); // 45 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={() => setVisible(false)}
          className="fixed bottom-6 right-6 z-50 cursor-pointer"
          style={{ maxWidth: '260px' }}
        >
          <div
            className="rounded-2xl px-5 py-4 shadow-xl"
            style={{
              background: 'rgba(45,52,54,0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(193,120,23,0.3)',
            }}
          >
            <p className="text-sm font-medium leading-snug" style={{ color: '#F8F4F0' }}>
              Psst... we hid a game somewhere on this site 🎮
            </p>
            <p className="text-xs mt-1" style={{ color: '#64748b' }}>Tap to dismiss</p>
          </div>
          {/* Speech bubble tail */}
          <div
            className="absolute -bottom-2 right-8 w-4 h-4 rotate-45"
            style={{ background: 'rgba(45,52,54,0.95)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
