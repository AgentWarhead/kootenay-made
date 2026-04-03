'use client'

import dynamic from 'next/dynamic'

const KootenayBreaker = dynamic(() => import('@/components/KootenayBreaker'), { ssr: false })

export default function PlayClient() {
  return (
    <div style={{ background: '#2D3436', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <p className="text-[#C17817] font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-2">EASTER EGG UNLOCKED</p>
          <h1 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold text-[#F8F4F0]">Kootenay Breaker 🏔</h1>
          <p className="text-[#F8F4F0]/60 mt-2 text-sm">Arrow keys or touch to move · Up/tap to launch · M to mute · 10 levels</p>
        </div>
        <KootenayBreaker />
        <div className="text-center mt-8">
          <p className="text-[#F8F4F0]/40 text-xs">
            Built with <a href="https://www.npmjs.com/package/@chenglou/pretext" className="text-[#C17817]/60 hover:text-[#C17817] transition-colors" target="_blank" rel="noopener">@chenglou/pretext</a> · Every element is measured text · No sprites
          </p>
        </div>
      </div>
    </div>
  )
}
