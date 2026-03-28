'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const fadeRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setVisible(true);

    const saved = localStorage.getItem('kmd-ambient-sound');
    if (saved === 'on') {
      setPlaying(true);
    }
  }, []);

  const fadeAudio = useCallback((audio: HTMLAudioElement, target: number, duration = 800) => {
    if (fadeRef.current) clearInterval(fadeRef.current);
    const step = 30;
    const steps = duration / step;
    const diff = (target - audio.volume) / steps;

    fadeRef.current = setInterval(() => {
      const next = audio.volume + diff;
      if ((diff > 0 && next >= target) || (diff < 0 && next <= target) || diff === 0) {
        audio.volume = Math.max(0, Math.min(1, target));
        if (fadeRef.current) clearInterval(fadeRef.current);
        if (target === 0) audio.pause();
      } else {
        audio.volume = Math.max(0, Math.min(1, next));
      }
    }, step);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.volume = 0;
      audio.play().catch(() => {});
      fadeAudio(audio, 0.12);
      localStorage.setItem('kmd-ambient-sound', 'on');
    } else {
      if (audio.volume > 0) {
        fadeAudio(audio, 0);
      }
      localStorage.setItem('kmd-ambient-sound', 'off');
    }
  }, [playing, fadeAudio]);

  if (!visible) return null;

  return (
    <>
      <audio ref={audioRef} loop preload="none" src="/audio/ambient.mp3" />
      <button
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Mute ambient sound' : 'Play ambient sound'}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
        style={{
          color: '#C17817',
          opacity: playing ? 0.7 : 0.3,
          background: 'rgba(193, 120, 23, 0.08)',
          border: '1px solid rgba(193, 120, 23, 0.15)',
        }}
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </>
  );
}
