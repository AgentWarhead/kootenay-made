'use client'

import { Bebas_Neue, Barlow } from 'next/font/google'
import Link from 'next/link'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export default function AutomotiveDemo() {
  return (
    <div className={barlow.className} style={{ fontFamily: 'Barlow, sans-serif', backgroundColor: '#111' }}>
      {/* Nav */}
      <nav style={{ backgroundColor: '#111', borderBottom: '1px solid #222' }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span
            className={bebasNeue.className}
            style={{ color: '#c0c0c0', fontSize: '1.6rem', letterSpacing: '0.1em' }}
          >
            Iron Horse Garage
          </span>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-sm uppercase tracking-wider transition-colors" style={{ color: '#c0c0c0' }}>Services</a>
            <a href="#about" className="text-sm uppercase tracking-wider transition-colors" style={{ color: '#c0c0c0' }}>About</a>
            <a href="#contact" className="text-sm uppercase tracking-wider transition-colors" style={{ color: '#c0c0c0' }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#111' }}>
        {/* Chrome gradient stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(90deg, #666 0%, #e8e8e8 30%, #fff 50%, #e8e8e8 70%, #666 100%)',
          }}
        />
        {/* Speed lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-0 right-0 h-px" style={{ backgroundColor: '#c0c0c0' }} />
          <div className="absolute top-1/3 left-0 right-0 h-px" style={{ backgroundColor: '#c0c0c0' }} />
          <div className="absolute top-2/3 left-0 right-0 h-px" style={{ backgroundColor: '#c0c0c0' }} />
          <div className="absolute top-3/4 left-0 right-0 h-px" style={{ backgroundColor: '#c0c0c0' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-40">
          <h1
            className={bebasNeue.className}
            style={{
              color: '#ffffff',
              letterSpacing: '0.08em',
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 0.95,
            }}
          >
            Built to Last<span style={{ color: '#dc2626' }}>.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-lg" style={{ color: '#c0c0c0' }}>
            Automotive repair, custom builds, and powersports service. The Kootenays&apos; trusted garage.
          </p>
          <a
            href="#services"
            className="inline-block mt-8 px-10 py-4 font-semibold text-sm uppercase tracking-widest transition-all hover:brightness-110"
            style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
          >
            What We Do
          </a>
        </div>
      </section>

      {/* Diagonal section break */}
      <div className="relative" style={{ backgroundColor: '#111' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14 block">
          <polygon fill="#1a1a1a" points="0,60 1440,0 1440,60" />
        </svg>
      </div>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 px-6" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className={bebasNeue.className}
            style={{ color: '#ffffff', letterSpacing: '0.08em', fontSize: '2.5rem' }}
          >
            Services
          </h2>
          {/* Chrome underline */}
          <div
            className="w-20 h-0.5 mt-2 mb-12"
            style={{
              background: 'linear-gradient(90deg, #666, #e8e8e8, #666)',
            }}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Custom Website',
                desc: "A site as tough as your shop. Show off your work, build trust, and get more vehicles through the door.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#c0c0c0" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" />
                  </svg>
                ),
              },
              {
                title: 'Google Visibility',
                desc: "When someone's car breaks down in the Kootenays, make sure they find you — not someone else.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#c0c0c0" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                ),
              },
              {
                title: 'Social Media',
                desc: 'Before and afters, custom builds, and shop life. Content that attracts gearheads and loyal customers.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#c0c0c0" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 md:p-8 transition-all hover:translate-y-[-2px]"
                style={{
                  backgroundColor: '#111',
                  borderTop: '3px solid #dc2626',
                }}
              >
                <div className="mb-4">{card.icon}</div>
                <h3
                  className={bebasNeue.className}
                  style={{ color: '#ffffff', letterSpacing: '0.06em', fontSize: '1.4rem' }}
                >
                  {card.title}
                </h3>
                <p className="mt-3 leading-relaxed" style={{ color: '#888', fontSize: '0.95rem' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagonal section break */}
      <div className="relative" style={{ backgroundColor: '#1a1a1a' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14 block">
          <polygon fill="#111" points="0,0 1440,60 0,60" />
        </svg>
      </div>

      {/* About */}
      <section id="about" className="py-16 md:py-24 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <h2
              className={bebasNeue.className}
              style={{ color: '#ffffff', letterSpacing: '0.08em', fontSize: '2.5rem' }}
            >
              About Iron Horse
            </h2>
            <div
              className="w-16 h-0.5 mt-2 mb-6"
              style={{
                background: 'linear-gradient(90deg, #dc2626, #666)',
              }}
            />
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#999' }}>
              Iron Horse Garage is the Kootenays&apos; trusted name for automotive repair, custom builds, and powersports service. Over 25 years keeping the valley moving.
            </p>
          </div>
          <div
            className="w-full md:w-56 h-44 flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
              border: '1px solid #333',
            }}
          >
            <div className="text-center">
              <span className={bebasNeue.className} style={{ color: '#dc2626', fontSize: '3.5rem', letterSpacing: '0.05em', lineHeight: 1 }}>25+</span>
              <span className="block mt-1 text-xs uppercase tracking-widest" style={{ color: '#c0c0c0' }}>Years in the Valley</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #222' }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className={bebasNeue.className}
            style={{ color: '#c0c0c0', letterSpacing: '0.08em', fontSize: '1.2rem' }}
          >
            Iron Horse Garage
          </span>
          <span className="text-sm" style={{ color: '#555' }}>
            &copy; {new Date().getFullYear()} Iron Horse Garage. Sample site by Kootenay Made Digital.
          </span>
        </div>
      </footer>

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(17, 17, 17, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '2px solid #dc2626',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm text-center sm:text-left">
            This is a sample design by <strong>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=automotive"
            className="inline-block px-6 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all hover:brightness-110 whitespace-nowrap"
            style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
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
