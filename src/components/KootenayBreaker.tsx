'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

type GameState = 'playing' | 'won' | 'lost'

export default function KootenayBreaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<any>(null)
  const [gameState, setGameState] = useState<GameState>('playing')
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!canvasRef.current) return
    
    import('@/lib/kootenay-breaker/game').then(({ PretextBreaker }) => {
      gameRef.current = new PretextBreaker(canvasRef.current!, {
        onGameWon: (finalScore: number) => {
          setScore(finalScore)
          setGameState('won')
        },
        onGameOver: (finalScore: number) => {
          setScore(finalScore)
          setGameState('lost')
        },
      })
    })

    return () => {
      gameRef.current?.destroy()
    }
  }, [])

  const handleRestart = useCallback(() => {
    setGameState('playing')
    setScore(0)
  }, [])

  return (
    <div className="relative w-full" style={{ maxWidth: '1120px', margin: '0 auto' }}>
      <div className="relative" style={{ aspectRatio: '4/3' }}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          padding: 'clamp(10px, 1.4vw, 18px)',
          borderRadius: '28px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015)), rgba(45,52,54,0.9)',
          boxShadow: '0 28px 80px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(193,120,23,0.15)',
        }}>
          <canvas
            ref={canvasRef}
            id="kootenay-breaker"
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '20px',
              imageRendering: 'crisp-edges',
              boxShadow: '0 0 0 1px rgba(193,120,23,0.12), 0 18px 32px rgba(0,0,0,0.35)',
            }}
            aria-label="Kootenay Breaker — a text-rendered breakout game"
          />
        </div>

        {gameState === 'won' && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(45,52,54,0.85)', borderRadius: '28px', zIndex: 10,
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ textAlign: 'center', color: '#F8F4F0', fontFamily: 'var(--font-satoshi), sans-serif' }}>
              <p style={{ fontSize: '14px', letterSpacing: '0.2em', color: '#C17817', marginBottom: '8px' }}>THE SUMMIT ◆ CLEARED</p>
              <p style={{ fontSize: '48px', fontWeight: 800, marginBottom: '4px' }}>{score.toString().padStart(5, '0')}</p>
              <p style={{ fontSize: '18px', color: '#F8F4F0', opacity: 0.8, marginBottom: '32px', maxWidth: '320px' }}>
                You chose the mountains.<br/>Your website should too.
              </p>
              <Link
                href="/audit"
                style={{
                  display: 'inline-block', padding: '14px 32px', background: '#C17817',
                  color: '#F8F4F0', borderRadius: '12px', fontWeight: 600, fontSize: '16px',
                  textDecoration: 'none', transition: 'background 0.2s',
                }}
              >
                Get Your Free Website Audit
              </Link>
            </div>
          </div>
        )}

        {gameState === 'lost' && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(45,52,54,0.85)', borderRadius: '28px', zIndex: 10,
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ textAlign: 'center', color: '#F8F4F0', fontFamily: 'var(--font-satoshi), sans-serif' }}>
              <p style={{ fontSize: '14px', letterSpacing: '0.2em', color: '#C17817', marginBottom: '8px' }}>THE MOUNTAIN WINS... this time</p>
              <p style={{ fontSize: '48px', fontWeight: 800, marginBottom: '4px' }}>{score.toString().padStart(5, '0')}</p>
              <p style={{ fontSize: '16px', color: '#F8F4F0', opacity: 0.7, marginBottom: '32px' }}>
                Your website could use a second wind too.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={handleRestart}
                  style={{
                    padding: '14px 28px', background: 'transparent', border: '1px solid rgba(248,244,240,0.3)',
                    color: '#F8F4F0', borderRadius: '12px', fontWeight: 600, fontSize: '15px', cursor: 'pointer',
                  }}
                >
                  Try Again
                </button>
                <Link
                  href="/audit"
                  style={{
                    display: 'inline-block', padding: '14px 28px', background: '#C17817',
                    color: '#F8F4F0', borderRadius: '12px', fontWeight: 600, fontSize: '15px',
                    textDecoration: 'none',
                  }}
                >
                  Free Audit
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
