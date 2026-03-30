'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function AmbientSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [ctaDismissed, setCtaDismissed] = useState(false);
  const fadeRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setVisible(true);

    const saved = localStorage.getItem('kmd-ambient-sound');
    if (saved === 'on') {
      setPlaying(true);
    }

    // Show CTA pill after 3s scroll if not previously dismissed
    const dismissed = localStorage.getItem('kmd-audio-cta-dismissed');
    if (!dismissed && saved !== 'on') {
      const handleScroll = () => {
        if (window.scrollY > 200) {
          setTimeout(() => setShowCta(true), 500);
          window.removeEventListener('scroll', handleScroll);
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
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
      setShowCta(false);
    } else {
      if (audio.volume > 0) {
        fadeAudio(audio, 0);
      }
      localStorage.setItem('kmd-ambient-sound', 'off');
    }
  }, [playing, fadeAudio]);

  const handleCtaPlay = () => {
    setPlaying(true);
    setShowCta(false);
    setCtaDismissed(true);
    localStorage.setItem('kmd-audio-cta-dismissed', 'true');
  };

  const handleCtaDismiss = () => {
    setShowCta(false);
    setCtaDismissed(true);
    localStorage.setItem('kmd-audio-cta-dismissed', 'true');
  };

  if (!visible) return null;

  return (
    <>
      <audio ref={audioRef} loop preload="none" src="/audio/ambient.mp3" />

      {/* ── Floating CTA pill ── */}
      {showCta && !playing && !ctaDismissed && (
        <div
          className="fixed bottom-20 left-6 z-50 animate-[slideUp_0.5s_ease-out]"
          style={{ maxWidth: '340px' }}
        >
          <div className="relative bg-slate/95 backdrop-blur-xl rounded-2xl border border-copper/20 px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
            {/* Dismiss X */}
            <button
              onClick={handleCtaDismiss}
              className="absolute top-2 right-2.5 text-white/20 hover:text-white/50 transition-colors text-xs"
              aria-label="Dismiss"
            >
              ✕
            </button>
            <p className="text-cream/90 text-sm font-[family-name:var(--font-satoshi)] font-medium mb-1">
              🎵 Your website could sound this good.
            </p>
            <p className="text-cream/40 text-xs font-[family-name:var(--font-satoshi)] mb-3">
              We build immersive audio experiences for businesses.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCtaPlay}
                className="flex items-center gap-2 bg-copper hover:bg-copper-light text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                </span>
                Preview
              </button>
              <a
                href="/contact"
                className="text-copper/60 hover:text-copper text-xs font-medium transition-colors"
              >
                Get a quote →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Now Playing bar (replaces CTA after play) ── */}
      {playing && (
        <div className="fixed bottom-20 left-6 z-50 animate-[slideUp_0.3s_ease-out]">
          <div className="flex items-center gap-3 bg-slate/90 backdrop-blur-xl rounded-full border border-copper/15 pl-4 pr-2 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            {/* Animated equalizer bars */}
            <div className="flex items-end gap-0.5 h-4">
              <div className="w-0.5 bg-copper rounded-full animate-[eqBar1_0.8s_ease-in-out_infinite]" />
              <div className="w-0.5 bg-copper rounded-full animate-[eqBar2_0.6s_ease-in-out_infinite_0.1s]" />
              <div className="w-0.5 bg-copper rounded-full animate-[eqBar3_0.7s_ease-in-out_infinite_0.2s]" />
              <div className="w-0.5 bg-copper rounded-full animate-[eqBar1_0.9s_ease-in-out_infinite_0.15s]" />
            </div>
            <span className="text-cream/50 text-xs font-[family-name:var(--font-satoshi)]">
              Now playing
            </span>
            <span className="text-copper/40 text-xs mx-1">·</span>
            <a href="/contact" className="text-copper/60 hover:text-copper text-xs transition-colors font-medium">
              Want this for your site?
            </a>
            <button
              onClick={() => setPlaying(false)}
              className="ml-1 w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Stop"
            >
              <span className="text-cream/50 text-xs">■</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Main speaker button — premium animated icon ── */}
      <button
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Mute ambient sound' : 'Play ambient sound'}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ${
          playing
            ? 'bg-copper/15 border-copper/30 shadow-[0_0_20px_rgba(193,120,23,0.15)]'
            : 'bg-white/5 border-white/10 hover:bg-copper/10 hover:border-copper/20'
        } border backdrop-blur-sm`}>
          {/* Pulsing ring when playing */}
          {playing && (
            <>
              <div className="absolute inset-0 rounded-full border border-copper/20 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-[-4px] rounded-full border border-copper/10 animate-ping" style={{ animationDuration: '3s' }} />
            </>
          )}
          {/* Speaker icon — custom SVG */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`transition-colors duration-300 ${playing ? 'text-copper' : 'text-white/30 group-hover:text-copper/60'}`}>
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
            {playing ? (
              <>
                <path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                </path>
                <path d="M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                </path>
              </>
            ) : (
              <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </div>
      </button>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes eqBar1 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes eqBar2 {
          0%, 100% { height: 8px; }
          50% { height: 12px; }
        }
        @keyframes eqBar3 {
          0%, 100% { height: 12px; }
          50% { height: 6px; }
        }
      `}</style>
    </>
  );
}
