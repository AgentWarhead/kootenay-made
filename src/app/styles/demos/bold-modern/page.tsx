'use client'

import { Space_Grotesk } from 'next/font/google'
import Link from 'next/link'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function BoldModernDemo() {
  return (
    <div className={spaceGrotesk.className} style={{ fontFamily: 'Space Grotesk, sans-serif', backgroundColor: '#111111' }}>
      {/* Nav */}
      <nav className="px-6 py-5 border-b" style={{ borderColor: '#333' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-white text-2xl font-bold tracking-tight uppercase">Volt Electric Co.</span>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-white/60 hover:text-[#ff6b00] text-sm uppercase tracking-widest transition-colors">Services</a>
            <a href="#about" className="text-white/60 hover:text-[#ff6b00] text-sm uppercase tracking-widest transition-colors">About</a>
            <a href="#contact" className="text-white/60 hover:text-[#ff6b00] text-sm uppercase tracking-widest transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#111111' }}>
        {/* Orange accent line */}
        <div
          className="absolute top-0 right-0 w-2 h-full"
          style={{ backgroundColor: '#ff6b00' }}
        />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-4xl">
            <div className="w-20 h-1 mb-8" style={{ backgroundColor: '#ff6b00' }} />
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase leading-none mb-8 text-white">
              Powering<br />
              <span style={{ color: '#ff6b00' }}>the</span><br />
              Kootenays
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-lg mb-10">
              Licensed. Insured. Built to last. We wire your world right.
            </p>
            <a
              href="#services"
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:brightness-110"
              style={{ backgroundColor: '#ff6b00', color: '#111111' }}
            >
              See What We Do
            </a>
          </div>
        </div>
        {/* Diagonal slash divider */}
        <div
          className="relative h-20 md:h-32"
          style={{
            backgroundColor: '#111111',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 40%)',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
          }}
        />
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-4">
            What We Build
          </h2>
          <div className="w-16 h-1 mb-16" style={{ backgroundColor: '#ff6b00' }} />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Custom Website',
                desc: 'A site as powerful as your work. Built to get you found and get you hired.',
              },
              {
                title: 'Google Visibility',
                desc: 'When someone searches "electrician near me" — you show up first.',
              },
              {
                title: 'Social Media',
                desc: 'Show off your best projects and build a following that brings in work.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-8 transition-all hover:translate-x-1"
                style={{
                  backgroundColor: '#1a1a1a',
                  borderLeft: '4px solid #ff6b00',
                }}
              >
                <h3 className="text-xl font-bold uppercase text-white mb-4">{card.title}</h3>
                <p className="text-white/50 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagonal divider */}
      <div
        className="h-16 md:h-24"
        style={{
          backgroundColor: '#0a0a0a',
          clipPath: 'polygon(0 0, 100% 40%, 100% 100%, 0 100%)',
          background: '#111111',
        }}
      />

      {/* About */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-4">
            About Volt
          </h2>
          <div className="w-16 h-1 mb-10" style={{ backgroundColor: '#ff6b00' }} />
          <p className="text-lg md:text-xl leading-relaxed text-white/60">
            Volt Electric has been wiring homes and businesses across the West Kootenays for 15 years. Licensed, insured, and always on time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t" style={{ borderColor: '#333', backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-white/30 text-sm uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Volt Electric Co. Sample site by Kootenay Made Digital.
          </span>
        </div>
      </footer>

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(255, 107, 0, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-center sm:text-left" style={{ color: '#111111' }}>
            This is a sample design by <strong>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=bold-modern"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#111111', color: '#ff6b00' }}
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
