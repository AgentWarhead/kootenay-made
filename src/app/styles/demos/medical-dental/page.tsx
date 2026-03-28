'use client'

import { DM_Sans } from 'next/font/google'
import Link from 'next/link'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function MedicalDentalDemo() {
  return (
    <div className={dmSans.className} style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: '#ffffff' }}>
      {/* Nav */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e8f0f8' }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span style={{ color: '#0891b2', fontWeight: 700, fontSize: '1.25rem' }}>
            Kootenay Family Dental
          </span>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-sm transition-colors" style={{ color: '#64748b' }}>Services</a>
            <a href="#about" className="text-sm transition-colors" style={{ color: '#64748b' }}>About</a>
            <a href="#contact" className="text-sm transition-colors" style={{ color: '#64748b' }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-6 py-24 md:py-36">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: '#d1fae5', color: '#0891b2' }}
          >
            Now accepting new patients
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            style={{ color: '#1e293b' }}
          >
            Gentle care for every{' '}
            <span style={{ color: '#0891b2' }}>smile</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            Comprehensive family dentistry in the heart of the Kootenays. Relaxed, friendly, and focused on your comfort.
          </p>
          <a
            href="#services"
            className="inline-block px-8 py-3.5 text-white font-bold text-sm rounded-full transition-all hover:opacity-90"
            style={{ backgroundColor: '#0891b2' }}
          >
            Our Services
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: '#1e293b' }}
          >
            How We Help
          </h2>
          <p className="text-center mb-16 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            Digital tools to grow your practice
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                desc: 'A welcoming online presence that makes new patients feel at ease before their first appointment.',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#0891b2" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" />
                  </svg>
                ),
              },
              {
                title: 'Google Visibility',
                desc: 'Be the first dental clinic that comes up when families search in the Kootenays.',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#0891b2" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                ),
              },
              {
                title: 'Email Marketing',
                desc: 'Automated recall reminders and appointment follow-ups that keep your schedule full.',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#0891b2" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-8 text-center transition-shadow hover:shadow-lg"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e8f0f8',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: '#f0f7ff' }}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#1e293b' }}>{card.title}</h3>
                <p className="leading-relaxed" style={{ color: '#64748b' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="py-20 md:py-28 px-6"
        style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: '#d1fae5' }}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#0891b2" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
            </svg>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: '#1e293b' }}
          >
            About Our Practice
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
            Kootenay Family Dental has been providing gentle, comprehensive dental care to families across the West Kootenays for over 15 years. We treat every patient like a neighbour — because you are.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#f0f7ff' }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="font-bold" style={{ color: '#0891b2' }}>
            Kootenay Family Dental
          </span>
          <p className="text-sm mt-2" style={{ color: '#94a3b8' }}>
            &copy; {new Date().getFullYear()} Kootenay Family Dental. Sample site by Kootenay Made Digital.
          </p>
        </div>
      </footer>

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(8, 145, 178, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm text-center sm:text-left">
            This is a sample design by <strong>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=medical-dental"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded-full transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#ffffff', color: '#0891b2' }}
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
