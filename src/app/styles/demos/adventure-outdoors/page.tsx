'use client'

import { Barlow_Condensed, Inter } from 'next/font/google'
import Link from 'next/link'

const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700', '800'] })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500'] })

export default function AdventureOutdoorsPage() {
  return (
    <div className={`${inter.className} min-h-screen`} style={{ background: '#ffffff', color: '#1b2d1b' }}>
      <style>{`
        .topo-bg {
          position: relative;
          overflow: hidden;
        }
        .topo-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.12;
          background-image: url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cellipse cx='200' cy='200' rx='180' ry='120'/%3E%3Cellipse cx='200' cy='200' rx='150' ry='100'/%3E%3Cellipse cx='200' cy='200' rx='120' ry='80'/%3E%3Cellipse cx='200' cy='200' rx='90' ry='60'/%3E%3Cellipse cx='200' cy='200' rx='60' ry='40'/%3E%3Cellipse cx='200' cy='200' rx='30' ry='20'/%3E%3Cellipse cx='80' cy='320' rx='100' ry='70'/%3E%3Cellipse cx='80' cy='320' rx='70' ry='50'/%3E%3Cellipse cx='80' cy='320' rx='40' ry='30'/%3E%3Cellipse cx='320' cy='80' rx='90' ry='60'/%3E%3Cellipse cx='320' cy='80' rx='60' ry='40'/%3E%3Cellipse cx='320' cy='80' rx='30' ry='20'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 400px 400px;
        }
        .diagonal-top {
          clip-path: polygon(0 4%, 100% 0, 100% 100%, 0 100%);
        }
        .diagonal-bottom {
          clip-path: polygon(0 0, 100% 0, 100% 96%, 0 100%);
        }
        .adventure-card {
          border-top: 4px solid #f97316;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .adventure-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4" style={{ background: 'rgba(27, 45, 27, 0.95)', backdropFilter: 'blur(8px)' }}>
        <Link href="/styles/demos/adventure-outdoors" className={`${barlow.className} text-xl md:text-2xl uppercase tracking-wider`} style={{ color: '#f97316', fontWeight: 800 }}>
          Powder Highway
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {['Adventures', 'Gear', 'Book Now'].map((item) => (
            <span key={item} className={`${barlow.className} text-sm uppercase tracking-wider cursor-pointer transition-colors duration-300`} style={{ color: '#ffffff', fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f97316')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="topo-bg relative flex flex-col items-center justify-center text-center min-h-screen px-6" style={{ background: '#1b2d1b' }}>
        <div className="relative z-10">
          <p className={`${barlow.className} text-sm md:text-base uppercase tracking-widest mb-6`} style={{ color: '#f97316', letterSpacing: '0.3em', fontWeight: 600 }}>
            West Kootenays, BC
          </p>
          <h1 className={`${barlow.className} text-5xl md:text-7xl lg:text-9xl uppercase leading-none mb-8`} style={{ color: '#ffffff', fontWeight: 800 }}>
            Your Next<br />Adventure<br />Starts Here
          </h1>
          <a
            href="#services"
            className={`${barlow.className} inline-block text-base md:text-lg uppercase tracking-wider px-10 py-4 font-bold transition-all duration-300`}
            style={{ background: '#f97316', color: '#ffffff', letterSpacing: '0.1em' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#0ea5e9' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#f97316' }}
          >
            Book an Adventure →
          </a>
        </div>
        {/* Bottom topo accent */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" height="60" preserveAspectRatio="none" viewBox="0 0 1440 60">
          <path d="M0,60 L0,20 Q360,0 720,30 Q1080,60 1440,10 L1440,60 Z" fill="#ffffff" />
        </svg>
      </section>

      {/* Services */}
      <section id="services" className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className={`${barlow.className} text-sm uppercase tracking-widest mb-3 text-center`} style={{ color: '#f97316', letterSpacing: '0.2em', fontWeight: 600 }}>
            Digital Services
          </p>
          <h2 className={`${barlow.className} text-3xl md:text-5xl uppercase text-center mb-12 md:mb-16`} style={{ color: '#1b2d1b', fontWeight: 800 }}>
            Gear Up Online
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Website',
                desc: 'Reach adventurers before they arrive. Bookings, trail info, everything in one place.',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
              },
              {
                title: 'Shopify Store',
                desc: 'Sell gear, passes, and guided tours online — 24/7, rain or shine.',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                ),
              },
              {
                title: 'Social Media',
                desc: 'Epic shots from the trail deserve an epic feed. Build a following that books trips.',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="#f97316" />
                  </svg>
                ),
              },
            ].map((service) => (
              <div key={service.title} className="adventure-card p-8" style={{ background: '#1b2d1b' }}>
                <div className="mb-5">{service.icon}</div>
                <h3 className={`${barlow.className} text-xl md:text-2xl uppercase mb-4`} style={{ color: '#ffffff', fontWeight: 700 }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About - Diagonal section */}
      <section className="diagonal-top diagonal-bottom px-6 md:px-12 py-24 md:py-32" style={{ background: '#1b2d1b' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className={`${barlow.className} text-sm uppercase tracking-widest mb-4`} style={{ color: '#f97316', letterSpacing: '0.2em', fontWeight: 600 }}>
            About Us
          </p>
          <h2 className={`${barlow.className} text-3xl md:text-5xl uppercase mb-8`} style={{ color: '#ffffff', fontWeight: 800 }}>
            Life&apos;s Too Short for Boring Weekends
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Powder Highway Adventures offers guided backcountry skiing, mountain biking, and rafting trips across the West Kootenays. Life&apos;s too short for boring weekends.
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { num: '200+', label: 'Trips / Year' },
            { num: '12', label: 'Trail Systems' },
            { num: '5★', label: 'Experience' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className={`${barlow.className} text-3xl md:text-5xl uppercase`} style={{ color: '#f97316', fontWeight: 800 }}>{stat.num}</p>
              <p className="text-xs md:text-sm uppercase tracking-wider mt-2" style={{ color: '#6b6b6b' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-10" style={{ background: '#1b2d1b' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`${barlow.className} text-lg uppercase tracking-wider`} style={{ color: '#f97316', fontWeight: 800 }}>Powder Highway</p>
          <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            &copy; {new Date().getFullYear()} Powder Highway Adventures. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3" style={{ background: 'rgba(27, 45, 27, 0.95)', backdropFilter: 'blur(10px)', borderTop: '2px solid #f97316' }}>
        <p className="text-xs md:text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          This is a sample design by <span style={{ color: '#f97316' }}>Kootenay Made Digital</span>
        </p>
        <Link
          href="/contact?style=adventure-outdoors"
          className={`${barlow.className} text-xs md:text-sm uppercase tracking-wider px-5 py-2 font-bold transition-all duration-300 whitespace-nowrap`}
          style={{ background: '#f97316', color: '#ffffff' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#0ea5e9' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#f97316' }}
        >
          Get This Style &rarr;
        </Link>
      </div>

      {/* Bottom padding for sticky bar */}
      <div className="h-16" />
    </div>
  )
}
