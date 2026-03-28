'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';

interface CardData {
  text: string;
  label: string;
}

interface CardStackProps {
  cards: CardData[];
}

export default function CardStack({ cards }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const constraintsRef = useRef(null);

  const advance = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % cards.length);
  }, [cards.length]);

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 300) {
      advance();
    }
  }, [advance]);

  // Show 3 cards in the stack
  const visibleCards = [0, 1, 2].map(offset => {
    const idx = (currentIndex + offset) % cards.length;
    return { ...cards[idx], stackIndex: offset };
  });

  return (
    <div className="relative min-h-[280px] sm:min-h-[240px]" ref={constraintsRef}>
      <AnimatePresence mode="popLayout">
        {visibleCards.reverse().map(card => (
          <motion.div
            key={`${card.text}-${card.stackIndex}`}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              zIndex: 3 - card.stackIndex,
            }}
            initial={card.stackIndex === 0 ? { scale: 0.95, y: 20, opacity: 0 } : false}
            animate={{
              scale: 1 - card.stackIndex * 0.05,
              y: card.stackIndex * 12,
              opacity: card.stackIndex === 0 ? 1 : 0.6 - card.stackIndex * 0.2,
              rotateZ: card.stackIndex === 0 ? 0 : card.stackIndex % 2 === 0 ? 1.5 : -1.5,
            }}
            exit={{
              x: 300,
              opacity: 0,
              rotateZ: 8,
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            drag={card.stackIndex === 0 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={card.stackIndex === 0 ? handleDragEnd : undefined}
          >
            <div
              className={`
                glass-card-light rounded-2xl p-8 sm:p-12 max-w-2xl w-full
                ${card.stackIndex === 0 ? 'cursor-grab active:cursor-grabbing campfire-glow' : 'pointer-events-none'}
              `}
            >
              <p className="text-slate text-lg sm:text-xl leading-relaxed mb-6">
                &ldquo;{card.text}&rdquo;
              </p>
              <p className="text-text-secondary text-sm italic">— {card.label}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Tap to advance */}
      <button
        onClick={advance}
        className="absolute bottom-[-48px] left-1/2 -translate-x-1/2 text-copper/60 hover:text-copper text-xs tracking-wider uppercase transition-colors"
        aria-label="Next story"
      >
        Tap or swipe for next
      </button>
    </div>
  );
}
