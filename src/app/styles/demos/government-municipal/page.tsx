'use client'

import { Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const sourceSans = Source_Sans_3({ subsets: ['latin'], weight: ['300', '400', '600', '700'] })

export default function GovernmentMunicipalPage() {
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('gov-revealed')
        })
      },
      { threshold: 0.15 }
    )
    revealRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  return (
    <div className={`${sourceSans.className} min-h-screen`} style={{ background: '#ffffff', color: '#1e293b' }}>
      <style>{`
        .gov-fade {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .gov-fade.gov-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .gov-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .gov-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .gov-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
        }
      `}</style>

      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4" style={{ background: '#1e3a5f', color: '#ffffff' }}>
        <Link href="/styles/demos/government-municipal" className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18" />
            <path d="M5 21V7l7-4 7 4v14" />
            <path d="M9 21v-6h6v6" />
          </svg>
          <span className="text-base md:text-lg font-bold">WK Parks &amp; Recreation</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {['Facilities', 'Programs', 'Contact'].map((item) => (
            <span
              key={item}
              className="text-sm cursor-pointer transition-opacity duration-200"
              style={{ opacity: 0.8 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 md:py-32" style={{ background: '#1e3a5f' }}>
        <div className="max-w-4xl mx-auto text-center gov-fade" ref={addRef}>
          <div className="gov-badge mb-8" style={{ background: 'rgba(37,99,235,0.2)', color: '#93c5fd' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            Serving the West Kootenays
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ color: '#ffffff' }}>
            Your community.<br />Your parks.
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
            Active, connected communities for all ages. Find programs, facilities, and parks near you.
          </p>
          <a
            href="#services"
            className="inline-block px-8 py-4 rounded-lg text-base font-semibold transition-all duration-200"
            style={{ background: '#2563eb', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#2563eb')}
          >
            Explore Programs
          </a>
        </div>
      </section>

      {/* Quick Links Bar */}
      <div className="px-6 md:px-12 py-4" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3 md:gap-6">
          {['Park Hours', 'Register Online', 'Report an Issue', 'Facility Rentals'].map((link) => (
            <span
              key={link}
              className="gov-badge cursor-pointer"
              style={{ background: '#e0e7ff', color: '#1e3a5f' }}
            >
              {link}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="services" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 gov-fade" ref={addRef}>
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#2563eb', letterSpacing: '0.1em' }}>Digital Services</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: '#1e3a5f' }}>Better serving our residents</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                desc: 'A clear, accessible website residents can actually use to find programs, hours, and contact info.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
              },
              {
                title: 'Email Marketing',
                desc: 'Keep residents informed about park events, closures, and new programs with automated newsletters.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                ),
              },
              {
                title: 'Google Visibility',
                desc: 'Make sure residents can find parks, facilities, and programs the moment they search.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
              },
            ].map((s) => (
              <div key={s.title} className="gov-card gov-fade p-8" ref={addRef}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#eff6ff' }}>
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: '#1e3a5f' }}>{s.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 md:px-12 py-20 md:py-28" style={{ background: '#f8fafc' }}>
        <div className="max-w-4xl mx-auto gov-fade" ref={addRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="gov-badge mb-4" style={{ background: '#dbeafe', color: '#1e3a5f' }}>About Us</span>
              <h2 className="text-3xl font-bold mt-4 mb-6" style={{ color: '#1e3a5f' }}>Committed to our communities</h2>
              <p className="text-base leading-relaxed" style={{ color: '#475569' }}>
                West Kootenay Parks &amp; Recreation manages parks, trails, sports facilities, and community programs across the region. Our mission: active, connected communities for all ages.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '45+', label: 'Parks & Trails' },
                { num: '12', label: 'Facilities' },
                { num: '200+', label: 'Programs' },
                { num: '50K+', label: 'Annual Visitors' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-6 rounded-lg" style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}>
                  <div className="text-2xl font-bold" style={{ color: '#2563eb' }}>{stat.num}</div>
                  <div className="text-xs mt-1" style={{ color: '#64748b' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Note */}
      <div className="px-6 md:px-12 py-6" style={{ background: '#1e3a5f' }}>
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 text-center">
          {[
            { icon: '♿', text: 'WCAG AA+ Accessible' },
            { icon: '🌐', text: 'Bilingual Ready' },
            { icon: '📱', text: 'Mobile Responsive' },
          ].map((item) => (
            <span key={item.text} className="text-sm flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
              <span>{item.icon}</span> {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-12 text-center" style={{ background: '#1e3a5f' }}>
        <p className="text-base font-bold mb-2" style={{ color: '#ffffff' }}>West Kootenay Parks &amp; Recreation</p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          &copy; {new Date().getFullYear()} West Kootenay Parks &amp; Recreation. All rights reserved.
        </p>
      </footer>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3" style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(8px)', borderTop: '2px solid #2563eb' }}>
        <p className="text-xs md:text-sm" style={{ color: '#475569' }}>
          This is a sample design by <span style={{ color: '#2563eb', fontWeight: 600 }}>Kootenay Made Digital</span>
        </p>
        <Link
          href="/contact?style=government-municipal"
          className="text-xs md:text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap"
          style={{ background: '#2563eb', color: '#ffffff' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#2563eb')}
        >
          Get This Style &rarr;
        </Link>
      </div>

      <div className="h-16" />
    </div>
  )
}
