'use client'

import { Bebas_Neue, DM_Sans } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'] })

export default function MusicEntertainmentPage() {
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('neon-revealed')
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
    <div className={`${dmSans.className} min-h-screen`} style={{ background: '#000000', color: '#ffffff' }}>
      <style>{`
        .neon-fade {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .neon-fade.neon-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .neon-glow {
          text-shadow: 0 0 10px rgba(233,30,138,0.5), 0 0 40px rgba(233,30,138,0.3), 0 0 80px rgba(233,30,138,0.15);
        }
        .neon-glow-blue {
          text-shadow: 0 0 10px rgba(59,130,246,0.5), 0 0 40px rgba(59,130,246,0.3);
        }
        .neon-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid transparent;
          border-image: linear-gradient(135deg, #e91e8a, #3b82f6) 1;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .neon-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 30px rgba(233,30,138,0.15), 0 0 60px rgba(59,130,246,0.1);
        }
        .gradient-mesh {
          background:
            radial-gradient(ellipse 60% 50% at 25% 30%, rgba(233,30,138,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 75% 60%, rgba(59,130,246,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 90%, rgba(233,30,138,0.1) 0%, transparent 50%);
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .pulse-dot {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(233,30,138,0.15)' }}>
        <Link href="/styles/demos/music-entertainment" className={`${bebas.className} text-2xl md:text-3xl tracking-wider`} style={{ color: '#e91e8a' }}>
          NEON PINES
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {['Events', 'Artists', 'Tickets'].map((item) => (
            <span
              key={item}
              className="text-sm font-light uppercase tracking-wider cursor-pointer transition-colors duration-300"
              style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#e91e8a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 gradient-mesh">
        <div className="relative neon-fade" ref={addRef}>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#e91e8a' }} />
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em' }}>Live Music &middot; Nelson, BC</span>
            <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#3b82f6' }} />
          </div>
          <h1 className={`${bebas.className} text-7xl md:text-9xl lg:text-[10rem] leading-none mb-6 neon-glow`} style={{ color: '#e91e8a' }}>
            NEON PINES
          </h1>
          <p className="text-lg md:text-xl font-light mb-12 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Where the mountains rock
          </p>
          <a
            href="#services"
            className="inline-block px-10 py-4 text-sm uppercase tracking-wider font-medium transition-all duration-300"
            style={{ background: '#e91e8a', color: '#ffffff', letterSpacing: '0.1em' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(233,30,138,0.5)'; e.currentTarget.style.background = '#d6187e' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#e91e8a' }}
          >
            See Upcoming Shows
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 neon-fade" ref={addRef}>
            <span className={`${bebas.className} text-sm tracking-widest neon-glow-blue`} style={{ color: '#3b82f6', letterSpacing: '0.2em' }}>AMPLIFY YOUR REACH</span>
            <h2 className={`${bebas.className} text-4xl md:text-6xl mt-4`}>Digital Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                desc: 'An online presence as electric as your shows. Event listings, tickets, merch — all in one place.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#neonGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e91e8a" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
              },
              {
                title: 'Social Media',
                desc: 'Build a following that shows up. Behind-the-scenes content, show announcements, artist spotlights.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#neonGrad2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="neonGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e91e8a" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
                    <path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
              {
                title: 'Email Marketing',
                desc: 'Your newsletter is how your most loyal fans stay in the loop. Never miss a sold-out show again.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#neonGrad3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="neonGrad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e91e8a" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                ),
              },
            ].map((s) => (
              <div key={s.title} className="neon-card neon-fade p-8 md:p-10" ref={addRef}>
                <div className="mb-6">{s.icon}</div>
                <h3 className={`${bebas.className} text-2xl md:text-3xl mb-4`} style={{ color: '#ffffff' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative px-6 md:px-12 py-24 md:py-32 gradient-mesh">
        <div className="max-w-3xl mx-auto text-center neon-fade" ref={addRef}>
          <div className="w-16 h-px mx-auto mb-10" style={{ background: 'linear-gradient(90deg, #e91e8a, #3b82f6)' }} />
          <p className="text-xl md:text-2xl leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Neon Pines is the Kootenays&apos; premier live music venue. From local acts to touring artists, we bring the energy every weekend. Located in the heart of Nelson, BC.
          </p>
          <div className="w-16 h-px mx-auto mt-10" style={{ background: 'linear-gradient(90deg, #3b82f6, #e91e8a)' }} />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 px-6" style={{ borderTop: '1px solid rgba(233,30,138,0.15)' }}>
        <p className={`${bebas.className} text-2xl tracking-wider mb-3 neon-glow`} style={{ color: '#e91e8a' }}>NEON PINES</p>
        <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>
          &copy; {new Date().getFullYear()} Neon Pines Music Venue. All rights reserved.
        </p>
      </footer>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3" style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(233,30,138,0.2)' }}>
        <p className="text-xs md:text-sm font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>
          This is a sample design by <span style={{ color: '#e91e8a' }}>Kootenay Made Digital</span>
        </p>
        <Link
          href="/contact?style=music-entertainment"
          className="text-xs md:text-sm tracking-wider px-5 py-2 transition-all duration-300 whitespace-nowrap"
          style={{ background: '#e91e8a', color: '#ffffff' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(233,30,138,0.5)'; e.currentTarget.style.background = '#d6187e' }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#e91e8a' }}
        >
          Get This Style &rarr;
        </Link>
      </div>

      <div className="h-16" />
    </div>
  )
}
