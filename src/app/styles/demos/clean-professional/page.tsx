'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function CleanProfessionalDemo() {
  return (
    <div className={inter.className} style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Nav */}
      <nav style={{ backgroundColor: '#1a365d' }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-white text-xl font-bold tracking-tight">Ridgeline Financial Group</span>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-white/80 hover:text-white text-sm transition-colors">Services</a>
            <a href="#about" className="text-white/80 hover:text-white text-sm transition-colors">About</a>
            <a href="#contact" className="text-white/80 hover:text-white text-sm transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ backgroundColor: '#f8fafc' }} className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, #94a3b8 100%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center px-6 py-28 md:py-40">
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            style={{ color: '#1a365d' }}
          >
            Financial planning for the Kootenays
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            Local expertise. Trusted advice. A plan built around your life.
          </p>
          <a
            href="#services"
            className="inline-block px-8 py-3.5 text-white font-bold text-sm rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#1a365d' }}
          >
            Explore Our Services
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: '#1a365d' }}
          >
            What We Offer
          </h2>
          <p className="text-center mb-16 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            Digital services to grow your practice
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                desc: 'A professional online presence that builds trust with every visitor.',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#1a365d" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.73-3.563" />
                  </svg>
                ),
              },
              {
                title: 'Google Visibility',
                desc: 'Show up when clients search for financial services in the Kootenays.',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#1a365d" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                ),
              },
              {
                title: 'Email Marketing',
                desc: 'Stay top-of-mind with clients through automated newsletters and updates.',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#1a365d" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-lg p-8 text-center transition-shadow hover:shadow-lg"
                style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
              >
                <div className="flex justify-center mb-5">{card.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#1a365d' }}>{card.title}</h3>
                <p style={{ color: '#64748b' }} className="leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: '#1a365d' }}
          >
            About Ridgeline
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
            Ridgeline Financial has been helping Kootenay families plan for the future since 2008. Trust, transparency, and local expertise.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a365d' }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Ridgeline Financial Group. Sample site by Kootenay Made Digital.
          </span>
        </div>
      </footer>

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(26, 54, 93, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm text-center sm:text-left">
            This is a sample design by <strong>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=clean-professional"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded-lg transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#ffffff', color: '#1a365d' }}
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
