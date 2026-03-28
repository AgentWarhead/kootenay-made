'use client'

import { Caveat, Lato } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function FarmHarvestDemo() {
  return (
    <div className={lato.className} style={{ fontFamily: 'Lato, sans-serif', backgroundColor: '#fefcf3' }}>
      {/* Nav */}
      <nav style={{ backgroundColor: '#fefcf3', borderBottom: '1px solid #e8dcc8' }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span
            className={caveat.className}
            style={{ color: '#4a7c59', fontWeight: 700, fontSize: '1.6rem' }}
          >
            Valley Roots Farm
          </span>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-sm transition-colors hover:opacity-70" style={{ color: '#6b4226' }}>Services</a>
            <a href="#about" className="text-sm transition-colors hover:opacity-70" style={{ color: '#6b4226' }}>About</a>
            <a href="#contact" className="text-sm transition-colors hover:opacity-70" style={{ color: '#6b4226' }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ backgroundColor: '#fefcf3' }} className="relative overflow-hidden">
        <Image src="/images/demos/farm-hero.webp" alt="" fill className="object-cover" style={{ zIndex: 0 }} />
        <div className="absolute inset-0 bg-black/30" style={{ zIndex: 1 }} />
        {/* Leaf vine SVG border top */}
        <div className="absolute top-0 left-0 right-0 h-16 opacity-20 flex items-center justify-center overflow-hidden" style={{ zIndex: 2 }}>
          <svg viewBox="0 0 800 40" className="w-full h-full" fill="#4a7c59">
            <path d="M0,20 Q50,5 100,20 Q150,35 200,20 Q250,5 300,20 Q350,35 400,20 Q450,5 500,20 Q550,35 600,20 Q650,5 700,20 Q750,35 800,20" stroke="#4a7c59" strokeWidth="1.5" fill="none" />
            {/* Leaves along the vine */}
            <ellipse cx="50" cy="12" rx="8" ry="5" transform="rotate(-30 50 12)" opacity="0.6" />
            <ellipse cx="150" cy="28" rx="8" ry="5" transform="rotate(30 150 28)" opacity="0.6" />
            <ellipse cx="250" cy="12" rx="8" ry="5" transform="rotate(-30 250 12)" opacity="0.6" />
            <ellipse cx="350" cy="28" rx="8" ry="5" transform="rotate(30 350 28)" opacity="0.6" />
            <ellipse cx="450" cy="12" rx="8" ry="5" transform="rotate(-30 450 12)" opacity="0.6" />
            <ellipse cx="550" cy="28" rx="8" ry="5" transform="rotate(30 550 28)" opacity="0.6" />
            <ellipse cx="650" cy="12" rx="8" ry="5" transform="rotate(-30 650 12)" opacity="0.6" />
            <ellipse cx="750" cy="28" rx="8" ry="5" transform="rotate(30 750 28)" opacity="0.6" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center px-6 py-24 md:py-36" style={{ position: 'relative', zIndex: 2 }}>
          <p className={caveat.className} style={{ color: '#e8a838', fontSize: '1.3rem' }}>
            Grown with love in the Kootenays
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold mt-3 leading-tight"
            style={{ color: '#4a7c59' }}
          >
            <span className="relative inline-block">
              Fresh From the Field
              {/* Hand-drawn underline */}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                <path d="M2,8 Q75,2 150,7 Q225,12 298,4" stroke="#e8a838" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl max-w-xl mx-auto" style={{ color: '#6b4226' }}>
            Certified organic seasonal vegetables, herbs, and fruit — delivered to your table from our family to yours.
          </p>
          <a
            href="#services"
            className="inline-block mt-8 px-8 py-3.5 font-bold text-sm rounded-full transition-all hover:brightness-110"
            style={{ backgroundColor: '#4a7c59', color: '#fefcf3' }}
          >
            See What&apos;s Growing
          </a>
        </div>
      </section>

      {/* Curved section divider */}
      <div style={{ backgroundColor: '#fefcf3' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14 block">
          <path fill="#f5f0e3" d="M0,0 C360,60 1080,60 1440,0 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 px-6" style={{ backgroundColor: '#f5f0e3' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-2"
            style={{ color: '#4a7c59' }}
          >
            How We Can Help
          </h2>
          <p className={caveat.className + ' text-center mb-14'} style={{ color: '#e8a838', fontSize: '1.2rem' }}>
            Digital tools for local farms
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Online Store',
                desc: 'Sell your harvest online. CSA subscriptions, fresh boxes, and local delivery — right from your farm website.',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#4a7c59" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                ),
              },
              {
                title: 'Email Marketing',
                desc: "Keep your regulars updated on what's in season, farm news, and pickup schedules.",
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#4a7c59" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                ),
              },
              {
                title: 'Social Media',
                desc: 'The Kootenays loves supporting local. Show them your fields, your family, and your story.',
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#4a7c59" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-8 text-center transition-shadow hover:shadow-lg"
                style={{ backgroundColor: '#fefcf3', border: '1px solid #e0d5bf' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: '#e8f5e0' }}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#4a7c59' }}>{card.title}</h3>
                <p className="leading-relaxed" style={{ color: '#6b4226', fontSize: '0.95rem' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curved section divider */}
      <div style={{ backgroundColor: '#f5f0e3' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14 block">
          <path fill="#fefcf3" d="M0,0 C360,60 1080,60 1440,0 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* About */}
      <section id="about" className="py-16 md:py-24 px-6" style={{ backgroundColor: '#fefcf3' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#4a7c59' }}>
            About the Farm
          </h2>
          <p className={caveat.className + ' mb-8'} style={{ color: '#e8a838', fontSize: '1.2rem' }}>
            Since 1994
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: '#6b4226' }}>
            Valley Roots Farm is a certified organic family farm in the Castlegar area growing seasonal vegetables, herbs, and fruit for the community since 1994.
          </p>
          {/* Decorative leaf divider */}
          <div className="flex items-center justify-center gap-3 mt-10 opacity-40">
            <div className="w-16 h-px" style={{ backgroundColor: '#4a7c59' }} />
            <svg className="w-6 h-6" fill="#4a7c59" viewBox="0 0 24 24">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
            <div className="w-16 h-px" style={{ backgroundColor: '#4a7c59' }} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#4a7c59' }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className={caveat.className} style={{ color: '#fefcf3', fontSize: '1.3rem', fontWeight: 600 }}>
            Valley Roots Farm
          </span>
          <p className="text-sm mt-2" style={{ color: 'rgba(254,252,243,0.6)' }}>
            &copy; {new Date().getFullYear()} Valley Roots Farm. Sample site by Kootenay Made Digital.
          </p>
        </div>
      </footer>

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          backgroundColor: 'rgba(74, 124, 89, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/90 text-sm text-center sm:text-left">
            This is a sample design by <strong>Kootenay Made Digital</strong>
          </span>
          <Link
            href="/contact?style=farm-harvest"
            className="inline-block px-6 py-2.5 text-sm font-bold rounded-full transition-all hover:brightness-110 whitespace-nowrap"
            style={{ backgroundColor: '#e8a838', color: '#fefcf3' }}
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
