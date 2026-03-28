'use client'

import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '700'] })
const sourceSans = Source_Sans_3({ subsets: ['latin'], weight: ['300', '400', '600'] })

export default function EditorialElegantPage() {
  return (
    <div className={`${sourceSans.className} min-h-screen`} style={{ background: '#faf9f7', color: '#1a1a1a' }}>
      <style>{`
        .pull-quote {
          position: relative;
          padding-left: 2rem;
        }
        .pull-quote::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #b8860b;
        }
        .editorial-card {
          border-bottom: 2px solid #b8860b;
          transition: transform 0.3s ease;
        }
        .editorial-card:hover {
          transform: translateY(-4px);
        }
        .image-placeholder {
          background: #e8e6e1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #aaa;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `}</style>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-6" style={{ borderBottom: '1px solid #e8e6e1' }}>
        <Link href="/styles/demos/editorial-elegant" className={`${playfair.className} text-xl md:text-2xl`} style={{ color: '#1a1a1a' }}>
          Pinnacle
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {['Listings', 'About', 'Contact'].map((item) => (
            <span key={item} className="text-sm tracking-wide cursor-pointer transition-colors duration-300" style={{ color: '#6b6b6b' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#b8860b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b6b6b')}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-16 py-24 md:py-40">
        <div className="max-w-5xl">
          <div className="w-12 h-0.5 mb-8" style={{ background: '#b8860b' }} />
          <h1 className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl leading-tight mb-8`} style={{ color: '#1a1a1a' }}>
            Curated living<br />in the Kootenays
          </h1>
          <p className="text-lg md:text-xl max-w-xl mb-10" style={{ color: '#6b6b6b', fontWeight: 300 }}>
            Exceptional properties. Personalized service. Local expertise.
          </p>
          <a
            href="#services"
            className="inline-block text-sm tracking-wider px-8 py-3 transition-all duration-300"
            style={{ background: '#1a1a1a', color: '#faf9f7' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#b8860b' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#1a1a1a' }}
          >
            View Listings
          </a>
        </div>
      </section>

      {/* Editorial Image Grid */}
      <section className="px-6 md:px-16 pb-16 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl">
          <div className="image-placeholder col-span-2 aspect-[16/9]" style={{ borderRadius: '2px' }}>
            <span>Featured Property</span>
          </div>
          <div className="image-placeholder aspect-square" style={{ borderRadius: '2px' }}>
            <span>Interior</span>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <blockquote className="pull-quote">
            <p className={`${playfair.className} text-2xl md:text-3xl leading-relaxed`} style={{ color: '#1a1a1a', fontWeight: 400 }}>
              Every home tells a story. We help you find the one that&apos;s meant to be yours.
            </p>
          </blockquote>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 md:px-16 py-16 md:py-24" style={{ background: '#f5f3ef' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-sm tracking-widest uppercase mb-4" style={{ color: '#b8860b', letterSpacing: '0.15em' }}>Services</p>
          <h2 className={`${playfair.className} text-3xl md:text-4xl mb-12 md:mb-16`}>Digital Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'Custom Website',
                desc: 'A digital showroom for your listings. Every property presented beautifully.',
              },
              {
                title: 'Brand Identity',
                desc: 'From business cards to signage — a cohesive brand that says luxury.',
              },
              {
                title: 'Email Marketing',
                desc: 'Keep buyers and sellers engaged with curated market updates.',
              },
            ].map((service) => (
              <div key={service.title} className="editorial-card pb-8">
                <h3 className={`${playfair.className} text-xl md:text-2xl mb-4`} style={{ color: '#1a1a1a' }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm tracking-widest uppercase mb-4" style={{ color: '#b8860b', letterSpacing: '0.15em' }}>About</p>
            <h2 className={`${playfair.className} text-3xl md:text-4xl mb-6`}>Pinnacle Real Estate</h2>
            <p className="leading-relaxed mb-6" style={{ color: '#6b6b6b' }}>
              Pinnacle Real Estate specializes in exceptional properties throughout the West Kootenays. Personalized service, local expertise, and a passion for finding the perfect fit.
            </p>
            <div className="w-12 h-0.5" style={{ background: '#b8860b' }} />
          </div>
          <div className="image-placeholder aspect-[4/3]" style={{ borderRadius: '2px' }}>
            <span>Team Photo</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-10" style={{ borderTop: '1px solid #e8e6e1' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`${playfair.className} text-lg`}>Pinnacle</p>
          <p className="text-xs" style={{ color: '#aaa' }}>
            &copy; {new Date().getFullYear()} Pinnacle Real Estate. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3" style={{ background: 'rgba(250, 249, 247, 0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #e8e6e1' }}>
        <p className="text-xs md:text-sm" style={{ color: '#6b6b6b' }}>
          This is a sample design by <span style={{ color: '#b8860b' }}>Kootenay Made Digital</span>
        </p>
        <Link
          href="/contact?style=editorial-elegant"
          className="text-xs md:text-sm tracking-wider px-5 py-2 transition-all duration-300 whitespace-nowrap"
          style={{ background: '#1a1a1a', color: '#faf9f7' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#b8860b' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#1a1a1a' }}
        >
          Get This Style &rarr;
        </Link>
      </div>

      {/* Bottom padding for sticky bar */}
      <div className="h-16" />
    </div>
  )
}
