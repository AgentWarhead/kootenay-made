'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Ambient nature sound toggle — desktop only, muted by default.
 * TODO: Add actual audio file src below (e.g., /audio/river-ambient.mp3)
 */
export default function AmbientSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop (no touch)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setVisible(true);

    // Restore preference
    const saved = localStorage.getItem('kmd-ambient-sound');
    if (saved === 'on') {
      setPlaying(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.volume = 0.12;
      audio.play().catch(() => {});
      localStorage.setItem('kmd-ambient-sound', 'on');
    } else {
      audio.pause();
      localStorage.setItem('kmd-ambient-sound', 'off');
    }
  }, [playing]);

  if (!visible) return null;

  return (
    <>
      {/* TODO: Replace src with actual ambient audio file path, e.g. "/audio/river-ambient.mp3" */}
      <audio ref={audioRef} loop preload="none" src="" />
      <button
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Mute ambient sound' : 'Play ambient sound'}
        className="fixed bottom-6 left-6 z-50 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
        style={{
          color: '#C17817',
          opacity: playing ? 0.7 : 0.3,
          background: 'rgba(193, 120, 23, 0.08)',
          border: '1px solid rgba(193, 120, 23, 0.15)',
        }}
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
    </>
  );
}
