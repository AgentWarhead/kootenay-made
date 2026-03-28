'use client'

import { Bitter, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'

const bitter = Bitter({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
})

export default function RusticCraftDemo() {
  return (
    <div className={sourceSans.className} style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
      {/* CSS grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-20 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      <div className="relative z-10">
        {/* Nav */}
        <nav className="px-6 py-5" style={{ backgroundColor: '#3d2b1f' }}>
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className={`${bitter.className} text-white text-xl font-bold tracking-tight`}>
              Kootenay Brewing Collective
            </span>
            <div className="hidden md:flex gap-8">
              <a href="#services" className="text-white/60 hover:text-[#d4942a] text-sm transition-colors">Brews</a>
              <a href="#about" className="text-white/60 hover:text-[#d4942a] text-sm transition-colors">Our Story</a>
              <a href="#contact" className="text-white/60 hover:text-[#d4942a] text-sm transition-colors">Visit</a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#f5e6c8' }}
        >
          {/* Subtle noise on hero */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '512px 512px',
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-36 text-center">
            {/* Stamp badge */}
            <div
              className="inline-block px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
              style={{
                border: '2px solid #d4942a',
                color: '#d4942a',
              }}
            >
              Est. Castlegar, BC
            </div>
            <h1
              className={`${bitter.className} text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6`}
              style={{ color: '#3d2b1f' }}
            >
              Small batch.<br />Big flavour.
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-lg mx-auto" style={{ color: '#3d2b1f', opacity: 0.6 }}>
              Craft beer brewed with local ingredients and community spirit.
            </p>
            <a
              href="#services"
              className="inline-block px-8 py-3.5 text-white font-bold text-sm rounded transition-all hover:opacity-90"
              style={{ backgroundColor: '#d4942a' }}
            >
              See What&apos;s On Tap
            </a>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#efe0c8' }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className={`${bitter.className} text-3xl md:text-4xl font-bold text-center mb-4`}
              style={{ color: '#3d2b1f' }}
            >
              What We Craft For You
            </h2>
            <p className="text-center mb-16 max-w-md mx-auto" style={{ color: '#3d2b1f', opacity: 0.5 }}>
              Digital tools to grow your craft brand
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Custom Website',
                  desc: 'A website with as much character as your craft. Tell your story online.',
                },
                {
                  title: 'Brand Identity',
                  desc: 'Logo, labels, tap handles — a complete look that stands out on the shelf.',
                },
                {
                  title: 'Social Media',
                  desc: "Share what's on tap and fill your taproom every weekend.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-lg p-8 text-center transition-all hover:translate-y-[-2px]"
                  style={{
                    backgroundColor: '#f5e6c8',
                    border: '2px solid #d4942a',
                    boxShadow: '4px 4px 0 rgba(61, 43, 31, 0.1)',
                  }}
                >
                  {/* Stamp-style icon circle */}
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                    style={{ border: '2px dashed #d4942a' }}
                  >
                    <span className={`${bitter.className} text-xl font-bold`} style={{ color: '#d4942a' }}>
                      {card.title.charAt(0)}
                    </span>
                  </div>
                  <h3 className={`${bitter.className} text-xl font-bold mb-3`} style={{ color: '#3d2b1f' }}>{card.title}</h3>
                  <p className="leading-relaxed" style={{ color: '#3d2b1f', opacity: 0.65 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5e6c8' }}>
          <div className="max-w-3xl mx-auto text-center">
            {/* Divider badge */}
            <div
              className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
              style={{
                border: '2px solid #2d4a2d',
                color: '#2d4a2d',
              }}
            >
              Our Story
            </div>
            <h2
              className={`${bitter.className} text-3xl md:text-4xl font-bold mb-6`}
              style={{ color: '#3d2b1f' }}
            >
              About the Collective
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#3d2b1f', opacity: 0.7 }}>
              Kootenay Brewing Collective is a small-batch craft brewery in Castlegar. Every pour tells a story of local ingredients and community spirit.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6" style={{ backgroundColor: '#3d2b1f' }}>
          <div className="max-w-6xl mx-auto text-center">
            <span className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Kootenay Brewing Collective. Sample site by Kootenay Made Digital.
            </span>
          </div>
        </footer>
      </div>

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(61, 43, 31, 0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm text-center sm:text-left">
            This is a sample design by <strong>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=rustic-craft"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#d4942a', color: '#3d2b1f' }}
          >
            Get This Style &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom padding for sticky bar */}
      <div className="h-16" />
    </div>
  )
}
