'use client'

import { Lora, Nunito } from 'next/font/google'
import Link from 'next/link'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400'],
})

export default function WarmNaturalDemo() {
  return (
    <div className={nunito.className} style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Watercolour blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: '#7d9a6b' }}
        />
        <div
          className="absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: '#d4a574' }}
        />
        <div
          className="absolute -bottom-32 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: '#7d9a6b' }}
        />
      </div>

      <div className="relative z-10">
        {/* Nav */}
        <nav className="px-6 py-5" style={{ backgroundColor: 'rgba(250, 246, 240, 0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <span className={`${lora.className} text-xl font-bold`} style={{ color: '#8b7355' }}>
              Mountain Flow Wellness
            </span>
            <div className="hidden md:flex gap-8">
              <a href="#services" className="text-sm transition-colors hover:opacity-70" style={{ color: '#7d9a6b' }}>Services</a>
              <a href="#about" className="text-sm transition-colors hover:opacity-70" style={{ color: '#7d9a6b' }}>About</a>
              <a href="#contact" className="text-sm transition-colors hover:opacity-70" style={{ color: '#7d9a6b' }}>Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden" style={{ backgroundColor: '#faf6f0' }}>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, #7d9a6b 0%, transparent 60%)',
            }}
          />
          <div className="relative max-w-3xl mx-auto text-center px-6 py-28 md:py-40">
            <h1
              className={`${lora.className} text-4xl md:text-6xl font-bold leading-tight mb-6`}
              style={{ color: '#8b7355' }}
            >
              Find your balance
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto" style={{ color: '#8b7355', opacity: 0.7 }}>
              Yoga, massage therapy, and holistic healing in the heart of Nelson.
            </p>
            <a
              href="#services"
              className="inline-block px-8 py-3.5 text-white font-bold text-sm rounded-full transition-all hover:opacity-90"
              style={{ backgroundColor: '#7d9a6b' }}
            >
              Discover Our Offerings
            </a>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#faf6f0' }}>
          <div className="max-w-5xl mx-auto">
            <h2
              className={`${lora.className} text-3xl md:text-4xl font-bold text-center mb-4`}
              style={{ color: '#8b7355' }}
            >
              Our Offerings
            </h2>
            <p className="text-center mb-16 max-w-md mx-auto" style={{ color: '#8b7355', opacity: 0.6 }}>
              Digital support for your wellness practice
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Custom Website',
                  desc: 'A calming online space that reflects the peace of your practice.',
                  icon: (
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#7d9a6b" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                  ),
                },
                {
                  title: 'Brand Identity',
                  desc: 'Colours, fonts, and a logo that feel as intentional as your work.',
                  icon: (
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#7d9a6b" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                    </svg>
                  ),
                },
                {
                  title: 'Email Marketing',
                  desc: 'Gentle check-ins and wellness tips that keep clients coming back.',
                  icon: (
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#7d9a6b" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  ),
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl p-8 text-center transition-shadow hover:shadow-lg"
                  style={{ backgroundColor: '#fff8f0', border: '1px solid rgba(125, 154, 107, 0.2)' }}
                >
                  <div className="flex justify-center mb-5">{card.icon}</div>
                  <h3 className={`${lora.className} text-xl font-bold mb-3`} style={{ color: '#8b7355' }}>{card.title}</h3>
                  <p className="leading-relaxed" style={{ color: '#8b7355', opacity: 0.7 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className={`${lora.className} text-3xl md:text-4xl font-bold mb-6`}
              style={{ color: '#8b7355' }}
            >
              About Mountain Flow
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#8b7355', opacity: 0.8 }}>
              Mountain Flow Wellness offers yoga, massage therapy, and holistic healing in the heart of Nelson. A space for stillness in a busy world.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6" style={{ backgroundColor: '#7d9a6b' }}>
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Mountain Flow Wellness. Sample site by Kootenay Made Digital.
            </span>
          </div>
        </footer>
      </div>

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(125, 154, 107, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm text-center sm:text-left">
            This is a sample design by <strong>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=warm-natural"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded-full transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#faf6f0', color: '#7d9a6b' }}
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
