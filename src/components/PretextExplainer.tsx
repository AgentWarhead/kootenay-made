'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PretextExplainer({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 flex justify-center">
      <div className="max-w-lg w-full">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-center text-copper/50 hover:text-copper text-xs font-[family-name:var(--font-satoshi)] tracking-[0.1em] uppercase transition-colors duration-300 py-2"
        >
          ✦ {open ? 'Got it' : 'What\'s happening here?'}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="border-l-4 border-copper/30 pl-4 py-3 mt-2 bg-white/[0.02] rounded-r-lg">
                <p className="text-cream/60 text-sm leading-relaxed font-[family-name:var(--font-satoshi)]">
                  {text}
                </p>
                <a href="/guides" className="inline-block mt-2 text-copper/60 hover:text-copper text-xs tracking-wide uppercase transition-colors">
                  Build this yourself →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
