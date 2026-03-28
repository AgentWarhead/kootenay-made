'use client'

import { Libre_Baskerville, Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const baskerville = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] })
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'] })

export default function HomeGardenPage() {
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('garden-revealed')
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
    <div className={`${inter.className} min-h-screen`} style={{ background: '#fdf8f0', color: '#3d3529' }}>
      <style>{`
        .garden-fade {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .garden-fade.garden-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .garden-card {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
          border: 1px solid #eee5d8;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .garden-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
        }
      `}</style>

      {/* Botanical SVG corner decoration (top-left) */}
      <svg className="fixed top-0 left-0 z-0 pointer-events-none opacity-[0.06]" width="300" height="300" viewBox="0 0 300 300">
        <path d="M0 300 Q60 200 30 120 Q10 60 80 30 Q130 0 160 50 Q190 100 140 140 Q100 170 50 260 Z" fill="#6b9a5b" />
        <path d="M0 250 Q40 180 20 110 Q5 60 50 40 Q80 20 100 60 Q120 100 90 130 Q60 160 30 220 Z" fill="#6b9a5b" opacity="0.5" />
      </svg>

      {/* Botanical SVG corner decoration (bottom-right) */}
      <svg className="fixed bottom-16 right-0 z-0 pointer-events-none opacity-[0.05]" width="280" height="280" viewBox="0 0 280 280" style={{ transform: 'rotate(180deg)' }}>
        <path d="M0 280 Q50 190 25 110 Q10 50 70 25 Q120 0 150 45 Q180 90 130 130 Q90 160 45 240 Z" fill="#6b9a5b" />
      </svg>

      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-5" style={{ background: 'rgba(253,248,240,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #eee5d8' }}>
        <Link href="/styles/demos/home-garden" className={`${baskerville.className} text-lg md:text-xl`} style={{ color: '#6b9a5b' }}>
          Cedarview Landscaping
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {['Portfolio', 'Services', 'Contact'].map((item) => (
            <span
              key={item}
              className="text-sm cursor-pointer transition-colors duration-300"
              style={{ color: '#7a6f60' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#6b9a5b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#7a6f60')}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-28 md:py-40">
        <div className="max-w-3xl mx-auto text-center garden-fade" ref={addRef}>
          <p className="text-sm uppercase tracking-wider mb-6" style={{ color: '#c17549', letterSpacing: '0.15em' }}>Est. 2012 &middot; West Kootenays</p>
          <h1 className={`${baskerville.className} text-4xl md:text-6xl lg:text-7xl leading-tight mb-8`} style={{ color: '#3d3529' }}>
            Rooted in<br /><span style={{ color: '#6b9a5b' }}>beautiful</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed font-light" style={{ color: '#7a6f60' }}>
            Designing, building, and nurturing Kootenay gardens and outdoor spaces since 2012.
          </p>
          <a
            href="#services"
            className="inline-block px-8 py-4 rounded text-sm font-medium transition-all duration-300"
            style={{ background: '#c17549', color: '#ffffff' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#a8623b')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#c17549')}
          >
            View Our Work
          </a>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="w-16 h-px" style={{ background: '#d4c5b0' }} />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b9a5b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c-4-4-8-7.5-8-12a8 8 0 0 1 16 0c0 4.5-4 8-8 12z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <div className="w-16 h-px" style={{ background: '#d4c5b0' }} />
      </div>

      {/* Services */}
      <section id="services" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 garden-fade" ref={addRef}>
            <span className="text-sm uppercase tracking-wider" style={{ color: '#c17549', letterSpacing: '0.12em' }}>What We Offer</span>
            <h2 className={`${baskerville.className} text-3xl md:text-4xl mt-4`} style={{ color: '#3d3529' }}>Grow your business naturally</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'Custom Website',
                desc: 'Show off your portfolio of beautiful outdoor spaces. Let your work sell itself.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6b9a5b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
              },
              {
                title: 'Google Visibility',
                desc: 'When homeowners search for landscapers in the Kootenays, make sure your name comes up first.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6b9a5b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
              },
              {
                title: 'Smart Business Tools',
                desc: 'Automate quote requests and seasonal service reminders. Stay busy year-round.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6b9a5b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20V10" />
                    <path d="M18 20V4" />
                    <path d="M6 20v-4" />
                  </svg>
                ),
              },
            ].map((s) => (
              <div key={s.title} className="garden-card garden-fade p-8" ref={addRef} style={{ borderTop: `3px solid #6b9a5b` }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ background: 'rgba(107,154,91,0.08)' }}>
                  {s.icon}
                </div>
                <h3 className={`${baskerville.className} text-xl mb-3`} style={{ color: '#3d3529' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed font-light" style={{ color: '#7a6f60' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 md:px-12 py-20 md:py-28" style={{ background: '#f4ede2' }}>
        <div className="max-w-3xl mx-auto text-center garden-fade" ref={addRef}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b9a5b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-8">
            <path d="M7 20h10" />
            <path d="M12 20v-6" />
            <path d="M12 14c-3 0-6-2-6-6 1 0 3 .5 4 2 0-3 1-6 2-8 1 2 2 5 2 8 1-1.5 3-2 4-2 0 4-3 6-6 6z" />
          </svg>
          <h2 className={`${baskerville.className} text-3xl md:text-4xl mb-8`} style={{ color: '#3d3529' }}>Our Story</h2>
          <p className={`${baskerville.className} text-lg md:text-xl leading-relaxed`} style={{ color: '#5a5042' }}>
            Cedarview Landscaping has been transforming Kootenay yards and gardens for over a decade. From design to installation to ongoing care — we grow beautiful spaces.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center" style={{ background: '#3d3529' }}>
        <p className={`${baskerville.className} text-lg mb-2`} style={{ color: '#6b9a5b' }}>Cedarview Landscaping</p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
          &copy; {new Date().getFullYear()} Cedarview Landscaping. All rights reserved.
        </p>
      </footer>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3" style={{ background: 'rgba(253,248,240,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #eee5d8' }}>
        <p className="text-xs md:text-sm" style={{ color: '#7a6f60' }}>
          This is a sample design by <span style={{ color: '#6b9a5b', fontWeight: 500 }}>Kootenay Made Digital</span>
        </p>
        <Link
          href="/contact?style=home-garden"
          className="text-xs md:text-sm px-5 py-2 rounded transition-all duration-300 whitespace-nowrap"
          style={{ background: '#c17549', color: '#ffffff' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#a8623b')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#c17549')}
        >
          Get This Style &rarr;
        </Link>
      </div>

      <div className="h-16" />
    </div>
  )
}
