'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const KootenayBreaker = dynamic(() => import('@/components/KootenayBreaker'), { ssr: false })

export default function PlayClient() {
  return (
    <div style={{ background: '#2D3436', minHeight: '100vh' }}>
      {/* Header — compact on mobile, clears fixed navbar */}
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-4 sm:pt-28 sm:pb-8">
        <div className="text-center">
          <p className="text-[#C17817] font-[family-name:var(--font-satoshi)] font-semibold text-[10px] sm:text-sm tracking-[0.2em] uppercase mb-1 sm:mb-2">
            EASTER EGG UNLOCKED
          </p>
          <h1 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-4xl font-bold text-[#F8F4F0]">
            Kootenay Breaker <span className="inline-block">🏔</span>
          </h1>
          {/* Controls hint — different for mobile vs desktop */}
          <p className="text-[#F8F4F0]/50 mt-1.5 sm:mt-2 text-[11px] sm:text-sm hidden sm:block">
            Arrow keys to move · Up to launch · M to mute · 10 levels
          </p>
          <p className="text-[#F8F4F0]/50 mt-1.5 text-[11px] sm:hidden">
            Drag to move · Tap to launch · 10 levels
          </p>
        </div>
      </div>

      {/* Game — flush to edges on mobile, contained on desktop */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <KootenayBreaker />
      </div>

      {/* Footer — share + credit */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="text-center space-y-4">
          {/* Share CTA */}
          <div>
            <a
              href="https://twitter.com/intent/tweet?text=I%20just%20found%20a%20game%20hidden%20inside%20a%20web%20design%20agency%20🏔%20Can%20you%20clear%20The%20Summit%3F&url=https://kootenaymade.ca/play"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#F8F4F0]/60 hover:text-[#C17817] text-sm transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Share your score
            </a>
          </div>
          {/* Credit */}
          <p className="text-[#F8F4F0]/30 text-[10px] sm:text-xs">
            Built with{' '}
            <a href="https://www.npmjs.com/package/@chenglou/pretext" className="text-[#C17817]/50 hover:text-[#C17817] transition-colors" target="_blank" rel="noopener">
              @chenglou/pretext
            </a>
            {' '}· Every element is measured text · No sprites
          </p>
          {/* Back link */}
          <Link href="/contact" className="inline-block text-[#C17817]/70 hover:text-[#C17817] text-sm transition-colors">
            ← Back to contact
          </Link>
        </div>
      </div>
    </div>
  )
}
