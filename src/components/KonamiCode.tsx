'use client';

import { useEffect, useState, useCallback } from 'react';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function KonamiCode() {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === KONAMI[index]) {
      const next = index + 1;
      if (next === KONAMI.length) {
        setActive(true);
        setIndex(0);
        setTimeout(() => setActive(false), 3500);
      } else {
        setIndex(next);
      }
    } else {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none animate-retro-flash"
      style={{
        fontFamily: '"Times New Roman", "Comic Sans MS", serif',
        background: 'repeating-conic-gradient(#ff00ff 0% 25%, #00ffff 0% 50%) 0 0 / 40px 40px',
        mixBlendMode: 'multiply',
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#808080]/80">
        <div className="bg-white border-4 border-black p-6 text-center shadow-[4px_4px_0_black]">
          <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-block text-2xl font-bold text-[#ff00ff]" style={{ animation: 'konami-scroll 4s linear infinite' }}>
              ★ Welcome to Kootenay Made Digital ★ Est. 2026 ★ Best viewed in Netscape Navigator ★&nbsp;&nbsp;&nbsp;
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4">
            <span className="text-yellow-600 text-xl animate-spin inline-block">🚧</span>
            <span className="text-lg font-bold text-[#000080]" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
              UNDER CONSTRUCTION
            </span>
            <span className="text-yellow-600 text-xl animate-spin inline-block">🚧</span>
          </div>
          <div className="mt-3 bg-black text-[#00ff00] font-mono text-xs p-2">
            You are visitor #000,042 | Last updated: March 28, 2026
          </div>
          <div className="mt-2 text-sm text-[#0000ff] underline cursor-pointer">
            Sign my guestbook!
          </div>
        </div>
      </div>
    </div>
  );
}
