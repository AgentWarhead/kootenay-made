'use client'

import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export default function EducationNonprofitPage() {
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('edu-revealed')
          }
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
    <div className={`${poppins.className} min-h-screen`} style={{ background: '#ffffff', color: '#1e293b' }}>
      <style>{`
        .edu-fade {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .edu-fade.edu-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .circle-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.15;
        }
        .edu-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .edu-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4" style={{ background: '#eff6ff', borderBottom: '1px solid #dbeafe' }}>
        <Link href="/styles/demos/education-nonprofit" className="text-lg md:text-xl font-bold" style={{ color: '#3b82f6' }}>
          Kootenay Community Learning Centre
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {['Programs', 'Volunteer', 'Donate'].map((item) => (
            <span
              key={item}
              className="text-sm font-medium cursor-pointer transition-colors duration-300"
              style={{ color: '#475569' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#3b82f6')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 md:py-36" style={{ background: '#eff6ff' }}>
        {/* Overlapping coloured circles */}
        <div className="circle-shape" style={{ width: 320, height: 320, background: '#3b82f6', top: -60, right: '10%' }} />
        <div className="circle-shape" style={{ width: 240, height: 240, background: '#facc15', top: 80, right: '5%', opacity: 0.2 }} />
        <div className="circle-shape" style={{ width: 200, height: 200, background: '#fb923c', bottom: -40, left: '8%', opacity: 0.18 }} />
        <div className="circle-shape" style={{ width: 160, height: 160, background: '#3b82f6', bottom: 40, left: '25%', opacity: 0.1 }} />
        <div className="circle-shape" style={{ width: 280, height: 280, background: '#facc15', top: -80, left: '-5%', opacity: 0.12 }} />

        <div className="relative max-w-3xl mx-auto text-center edu-fade" ref={addRef}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
            </svg>
            <span className="text-sm font-medium" style={{ color: '#3b82f6' }}>Learning for life</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ color: '#1e293b' }}>
            Everyone deserves<br />
            the chance to <span style={{ color: '#3b82f6' }}>learn</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#64748b', fontWeight: 300 }}>
            Empowering adults and families across the Kootenays through education, literacy, and lifelong learning opportunities.
          </p>
          <a
            href="#services"
            className="inline-block px-8 py-4 rounded-full text-base font-semibold transition-all duration-300"
            style={{ background: '#3b82f6', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#2563eb')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#3b82f6')}
          >
            Explore Our Programs
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 edu-fade" ref={addRef}>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#fb923c' }}>How We Help</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e293b' }}>Digital services for your mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                desc: 'A welcoming online hub where students, volunteers, and donors can find what they need.',
                color: '#3b82f6',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
              },
              {
                title: 'Email Marketing',
                desc: 'Keep your community connected with program updates, success stories, and upcoming events.',
                color: '#facc15',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                ),
              },
              {
                title: 'Social Media',
                desc: 'Share your impact. Celebrate your students. Grow your community online.',
                color: '#fb923c',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <div key={s.title} className="edu-card edu-fade p-8" ref={addRef} style={{ borderTop: `4px solid ${s.color}` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${s.color}15` }}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#1e293b' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative overflow-hidden px-6 md:px-12 py-20 md:py-28" style={{ background: '#eff6ff' }}>
        <div className="circle-shape" style={{ width: 200, height: 200, background: '#facc15', top: -40, right: -40, opacity: 0.15 }} />
        <div className="circle-shape" style={{ width: 160, height: 160, background: '#fb923c', bottom: -30, left: -20, opacity: 0.12 }} />
        <div className="max-w-3xl mx-auto text-center edu-fade" ref={addRef}>
          <span className="inline-block text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#3b82f6' }}>About Us</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: '#1e293b' }}>Rooted in community</h2>
          <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
            The Kootenay Community Learning Centre offers adult education, literacy programs, and lifelong learning opportunities for residents of all ages across the West Kootenays.
          </p>
          <div className="flex items-center justify-center gap-8 mt-12">
            {[
              { num: '500+', label: 'Learners per year' },
              { num: '12', label: 'Programs offered' },
              { num: '25', label: 'Years serving the Kootenays' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold" style={{ color: '#3b82f6' }}>{stat.num}</div>
                <div className="text-xs mt-1" style={{ color: '#64748b' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center" style={{ background: '#1e293b' }}>
        <p className="text-lg font-semibold mb-2" style={{ color: '#3b82f6' }}>Kootenay Community Learning Centre</p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          &copy; {new Date().getFullYear()} Kootenay Community Learning Centre. All rights reserved.
        </p>
      </footer>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #e2e8f0' }}>
        <p className="text-xs md:text-sm" style={{ color: '#64748b' }}>
          This is a sample design by <span style={{ color: '#3b82f6', fontWeight: 600 }}>Kootenay Made Digital</span>
        </p>
        <Link
          href="/contact?style=education-nonprofit"
          className="text-xs md:text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap"
          style={{ background: '#3b82f6', color: '#ffffff' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#2563eb')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#3b82f6')}
        >
          Get This Style &rarr;
        </Link>
      </div>

      <div className="h-16" />
    </div>
  )
}
