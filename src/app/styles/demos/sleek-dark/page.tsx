'use client'

import { Cormorant_Garamond, Raleway } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'] })
const raleway = Raleway({ subsets: ['latin'], weight: ['300', '400'] })

export default function SleekDarkPage() {
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.15 }
    )
    revealRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  return (
    <div className={`${raleway.className} min-h-screen`} style={{ background: '#0a0a0a', color: '#f5f0e8' }}>
      <style>{`
        .reveal-text {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-text.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .gold-line {
          width: 0;
          transition: width 1s ease 0.3s;
        }
        .revealed .gold-line {
          width: 60px;
        }
        .glass-card {
          background: rgba(26, 26, 26, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(201, 169, 110, 0.2);
          transition: border-color 0.4s ease, transform 0.4s ease;
        }
        .glass-card:hover {
          border-color: rgba(201, 169, 110, 0.6);
          transform: translateY(-4px);
        }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5" style={{ background: 'rgba(10, 10, 10, 0.9)', backdropFilter: 'blur(10px)' }}>
        <Link href="/styles/demos/sleek-dark" className={`${cormorant.className} text-xl md:text-2xl tracking-widest`} style={{ color: '#c9a96e', fontWeight: 300 }}>
          EMBER
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {['Menu', 'Reservations', 'Private Events'].map((item) => (
            <span key={item} className="text-sm tracking-widest uppercase cursor-pointer transition-colors duration-300" style={{ color: '#f5f0e8', letterSpacing: '0.15em' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a96e')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#f5f0e8')}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6" style={{ background: '#0a0a0a', overflow: 'hidden' }}>
        <Image src="/images/demos/sleek-dark-hero.webp" alt="" fill className="object-cover" style={{ zIndex: 0 }} />
        <div className="absolute inset-0 bg-black/50" style={{ zIndex: 1 }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(201, 169, 110, 0.06) 0%, transparent 70%)', zIndex: 1 }} />
        <div className="relative reveal-text" ref={addRevealRef} style={{ zIndex: 2 }}>
          <p className="text-sm tracking-widest uppercase mb-6" style={{ color: '#c9a96e', letterSpacing: '0.25em' }}>
            Ember Kitchen &amp; Bar
          </p>
          <h1 className={`${cormorant.className} text-5xl md:text-7xl lg:text-8xl leading-none mb-8`} style={{ color: '#f5f0e8', fontWeight: 300 }}>
            An experience<br />awaits
          </h1>
          <div className="gold-line h-px mx-auto mb-8" style={{ background: '#c9a96e' }} />
          <a
            href="#services"
            className="inline-block text-sm tracking-widest uppercase px-10 py-4 transition-all duration-400 border"
            style={{ color: '#c9a96e', borderColor: '#c9a96e', letterSpacing: '0.2em' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.color = '#0a0a0a' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a96e' }}
          >
            Reserve a Table
          </a>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-24 md:h-40" />

      {/* Services */}
      <section id="services" className="px-6 md:px-12 lg:px-24 pb-24 md:pb-40">
        <div className="reveal-text text-center mb-16 md:mb-24" ref={addRevealRef}>
          <p className="text-sm tracking-widest uppercase mb-4" style={{ color: '#c9a96e', letterSpacing: '0.2em' }}>What We Offer</p>
          <h2 className={`${cormorant.className} text-3xl md:text-5xl`} style={{ fontWeight: 300 }}>Digital Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'Custom Website',
              desc: 'Set the mood before they walk through the door.',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              ),
            },
            {
              title: 'Google Visibility',
              desc: 'Be the first name they find for dinner reservations in town.',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              ),
            },
            {
              title: 'Social Media',
              desc: 'Beautiful food deserves a beautiful feed. Fill tables with every post.',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              ),
            },
          ].map((service) => (
            <div key={service.title} className="glass-card reveal-text p-8 md:p-10" ref={addRevealRef}>
              <div className="mb-6">{service.icon}</div>
              <h3 className={`${cormorant.className} text-xl md:text-2xl mb-4`} style={{ color: '#c9a96e', fontWeight: 400 }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245, 240, 232, 0.7)' }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-40" style={{ background: '#1a1a1a' }}>
        <div className="max-w-3xl mx-auto text-center reveal-text" ref={addRevealRef}>
          <div className="gold-line h-px mx-auto mb-10" style={{ background: '#c9a96e' }} />
          <p className={`${cormorant.className} text-2xl md:text-4xl leading-relaxed`} style={{ fontWeight: 300, color: '#f5f0e8' }}>
            Ember Kitchen &amp; Bar brings refined dining to the heart of the Kootenays. Local ingredients, crafted cocktails, and an atmosphere you won&apos;t forget.
          </p>
          <div className="gold-line h-px mx-auto mt-10" style={{ background: '#c9a96e' }} />
        </div>
      </section>

      {/* Extra Spacer for dramatic feel */}
      <div className="h-24 md:h-32" />

      {/* Footer */}
      <footer className="text-center py-12 px-6" style={{ borderTop: '1px solid rgba(201, 169, 110, 0.15)' }}>
        <p className={`${cormorant.className} text-lg tracking-widest mb-3`} style={{ color: '#c9a96e', fontWeight: 300 }}>EMBER</p>
        <p className="text-xs" style={{ color: 'rgba(245, 240, 232, 0.4)' }}>
          &copy; {new Date().getFullYear()} Ember Kitchen &amp; Bar. All rights reserved.
        </p>
      </footer>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3" style={{ background: 'rgba(26, 26, 26, 0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(201, 169, 110, 0.2)' }}>
        <p className="text-xs md:text-sm" style={{ color: 'rgba(245, 240, 232, 0.6)' }}>
          This is a sample design by <span style={{ color: '#c9a96e' }}>Kootenay Made Digital</span>
        </p>
        <Link
          href="/contact?style=sleek-dark"
          className="text-xs md:text-sm tracking-wider px-4 py-2 transition-all duration-300 border whitespace-nowrap"
          style={{ color: '#c9a96e', borderColor: '#c9a96e' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.color = '#0a0a0a' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a96e' }}
        >
          Get This Style &rarr;
        </Link>
      </div>

      {/* Bottom padding for sticky bar */}
      <div className="h-16" />
    </div>
  )
}
