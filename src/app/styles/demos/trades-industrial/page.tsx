'use client'

import { Rajdhani, Inter } from 'next/font/google'
import Link from 'next/link'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
})

export default function TradesIndustrialDemo() {
  return (
    <div className={inter.className} style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#ffffff' }}>
      {/* Nav */}
      <nav style={{ backgroundColor: '#2d2d2d' }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span
            className={rajdhani.className}
            style={{ color: '#ff6a00', letterSpacing: '0.08em', fontWeight: 700, fontSize: '1.4rem', textTransform: 'uppercase' }}
          >
            Summit Plumbing &amp; Heating
          </span>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-white/70 hover:text-white text-sm font-medium tracking-wide uppercase transition-colors">Services</a>
            <a href="#about" className="text-white/70 hover:text-white text-sm font-medium tracking-wide uppercase transition-colors">About</a>
            <a href="#contact" className="text-white/70 hover:text-white text-sm font-medium tracking-wide uppercase transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ backgroundColor: '#2d2d2d' }} className="relative overflow-hidden">
        {/* Orange accent stripe left */}
        <div className="absolute left-0 top-0 bottom-0 w-2" style={{ backgroundColor: '#ff6a00' }} />
        <div className="max-w-5xl mx-auto px-8 md:px-12 py-24 md:py-36">
          <h1
            className={rajdhani.className}
            style={{
              color: '#ffffff',
              letterSpacing: '0.06em',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.1,
            }}
          >
            Kootenay Reliable<span style={{ color: '#ff6a00' }}>.</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl max-w-xl" style={{ color: '#8a9bb0' }}>
            Licensed plumbing, heating, and gas fitting for the West Kootenays. Available 24/7 for emergencies.
          </p>
          <a
            href="#services"
            className="inline-block mt-8 px-8 py-3.5 font-bold text-sm uppercase tracking-widest transition-all hover:brightness-110"
            style={{ backgroundColor: '#ff6a00', color: '#ffffff' }}
          >
            Our Services
          </a>
        </div>
      </section>

      {/* Angular divider */}
      <div style={{ backgroundColor: '#ffffff' }} className="relative">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-8 md:h-12 block" style={{ marginTop: '-1px' }}>
          <polygon fill="#2d2d2d" points="0,0 1440,0 1440,48 0,0" />
        </svg>
      </div>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className={rajdhani.className + ' text-3xl md:text-4xl'}
            style={{ color: '#2d2d2d', letterSpacing: '0.06em', fontWeight: 700, textTransform: 'uppercase' }}
          >
            What We Offer
          </h2>
          <div className="w-16 h-1 mb-12" style={{ backgroundColor: '#ff6a00' }} />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Custom Website',
                desc: 'Get found by homeowners who need a plumber RIGHT NOW. A fast, professional site that makes the phone ring.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#ff6a00" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" />
                  </svg>
                ),
              },
              {
                title: 'Google Visibility',
                desc: 'Show up when someone searches plumber, HVAC, or heating repair in the Kootenays.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#ff6a00" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                ),
              },
              {
                title: 'Smart Business Tools',
                desc: 'Automate booking requests and follow-ups. Spend more time on the job, less on the phone.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#ff6a00" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 md:p-8 transition-all hover:translate-y-[-2px]"
                style={{
                  backgroundColor: '#2d2d2d',
                  borderLeft: '4px solid #ff6a00',
                }}
              >
                <div className="mb-4">{card.icon}</div>
                <h3
                  className={rajdhani.className}
                  style={{ color: '#ffffff', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '1.25rem' }}
                >
                  {card.title}
                </h3>
                <p className="mt-3 leading-relaxed" style={{ color: '#8a9bb0', fontSize: '0.95rem' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Angular divider */}
      <div style={{ backgroundColor: '#f4f5f7' }} className="relative">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-8 md:h-12 block" style={{ marginTop: '-1px' }}>
          <polygon fill="#ffffff" points="0,0 1440,0 0,48 0,0" />
        </svg>
      </div>

      {/* About */}
      <section id="about" className="py-16 md:py-24 px-6" style={{ backgroundColor: '#f4f5f7' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <h2
                className={rajdhani.className}
                style={{ color: '#2d2d2d', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}
              >
                <span className="text-3xl md:text-4xl block">About Summit</span>
              </h2>
              <div className="w-12 h-1 mt-3 mb-6" style={{ backgroundColor: '#ff6a00' }} />
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#4a4a4a' }}>
                Summit Plumbing &amp; Heating has served the West Kootenays for over 20 years. Licensed, insured, and ready 24/7 for emergencies.
              </p>
            </div>
            <div
              className="w-full md:w-64 h-48 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#2d2d2d', border: '2px solid #8a9bb0' }}
            >
              <div className="text-center">
                <span className={rajdhani.className} style={{ color: '#ff6a00', fontSize: '3rem', fontWeight: 700, lineHeight: 1 }}>20+</span>
                <span className="block mt-1 text-sm uppercase tracking-widest" style={{ color: '#8a9bb0' }}>Years of Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2d2d2d' }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className={rajdhani.className}
            style={{ color: '#ff6a00', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            Summit Plumbing &amp; Heating
          </span>
          <span className="text-sm" style={{ color: '#8a9bb0' }}>
            &copy; {new Date().getFullYear()} Summit Plumbing &amp; Heating. Sample site by Kootenay Made Digital.
          </span>
        </div>
      </footer>

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(45, 45, 45, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '2px solid #ff6a00',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm text-center sm:text-left">
            This is a sample design by <strong>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=trades-industrial"
            className="inline-block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110 whitespace-nowrap"
            style={{ backgroundColor: '#ff6a00', color: '#ffffff' }}
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
