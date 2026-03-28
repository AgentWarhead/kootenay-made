'use client'

import { Nunito } from 'next/font/google'
import Link from 'next/link'

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800'] })

export default function BrightPlayfulPage() {
  return (
    <div className={`${nunito.className} min-h-screen`} style={{ background: '#ffffff', color: '#2d2d2d' }}>
      <style>{`
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .wobble-card {
          transition: transform 0.3s ease;
        }
        .wobble-card:hover {
          animation: wobble 0.5s ease;
        }
        .float-slow {
          animation: float 6s ease-in-out infinite;
        }
        .float-medium {
          animation: float 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        .float-fast {
          animation: float 5s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5">
        <Link href="/styles/demos/bright-playful" className="text-xl md:text-2xl font-extrabold" style={{ color: '#ff6b6b' }}>
          Little Explorers 🌈
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {['Programs', 'Enrolment', 'Contact'].map((item) => (
            <span key={item} className="text-sm font-bold cursor-pointer transition-colors duration-300" style={{ color: '#4ecdc4' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b6b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4ecdc4')}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 md:px-12 py-20 md:py-32">
        {/* Blob shapes */}
        <svg className="absolute top-0 left-0 w-64 h-64 -translate-x-1/3 -translate-y-1/4 float-slow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffe66d" fillOpacity="0.4" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.2,-1C86.5,14.2,80.4,28.4,72.1,41.2C63.8,54,53.3,65.4,40.4,73.1C27.5,80.8,12.3,84.8,-2.4,88.6C-17.1,92.4,-34.2,96,-47.6,89.1C-61,82.2,-70.7,64.8,-77.3,47.5C-83.9,30.2,-87.4,13,-85.3,1.2C-83.2,-10.6,-75.5,-21.3,-67.3,-31.4C-59.1,-41.5,-50.4,-51,-39.5,-59.9C-28.6,-68.8,-15.5,-77.1,0.5,-78C16.5,-78.9,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute top-10 right-0 w-80 h-80 translate-x-1/4 float-medium" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4ecdc4" fillOpacity="0.3" d="M39.9,-65.7C53.4,-60.3,67,-52.3,75.2,-40.1C83.4,-27.9,86.2,-11.5,83.8,3.8C81.4,19.1,73.8,33.3,63.9,44.8C54,56.3,41.8,65.1,28.4,71.5C15,77.9,0.4,81.9,-14.1,80.2C-28.6,78.5,-43,71.1,-54.3,60.4C-65.6,49.7,-73.8,35.7,-78.1,20.4C-82.4,5.1,-82.8,-11.5,-77.5,-25.8C-72.2,-40.1,-61.2,-52.1,-47.9,-57.6C-34.6,-63.1,-19,-62.1,-2.4,-58.2C14.2,-54.3,26.4,-71.1,39.9,-65.7Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute bottom-0 left-1/3 w-72 h-72 translate-y-1/3 float-fast" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#a78bfa" fillOpacity="0.25" d="M43.2,-73.8C56.1,-67.5,66.8,-56.2,74.4,-42.9C82,-29.6,86.5,-14.3,85.3,-0.7C84.1,12.9,77.2,25.8,68.5,37.2C59.8,48.6,49.3,58.5,36.8,65.3C24.3,72.1,9.8,75.8,-3.6,74.4C-17,73,-33.4,66.5,-46.7,56.4C-60,46.3,-70.2,32.6,-75.9,16.8C-81.6,1,-82.8,-16.9,-77,-31.3C-71.2,-45.7,-58.4,-56.6,-44.3,-62.3C-30.2,-68,-15.1,-68.5,0.7,-69.7C16.5,-70.9,30.3,-80.1,43.2,-73.8Z" transform="translate(100 100)" />
        </svg>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            <span style={{ color: '#ff6b6b' }}>Where </span>
            <span style={{ color: '#4ecdc4' }}>fun </span>
            <span style={{ color: '#ffe66d' }}>comes </span>
            <span style={{ color: '#a78bfa' }}>first!</span>
          </h1>
          <p className="text-lg md:text-xl mb-10" style={{ color: '#666' }}>
            A safe, creative space where little ones learn through play every single day.
          </p>
          <a
            href="#services"
            className="inline-block text-lg font-bold px-8 py-4 transition-all duration-300"
            style={{ background: '#ff6b6b', color: '#fff', borderRadius: '9999px' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#4ecdc4'; e.currentTarget.style.transform = 'scale(1.05)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#ff6b6b'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Book a Visit ✨
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: '#2d2d2d' }}>
          How We Help You Shine
        </h2>
        <p className="text-center mb-12 md:mb-16" style={{ color: '#888' }}>Digital services made just for you</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: 'Custom Website',
              desc: 'A website parents love to visit — easy enrolment, happy photos, all the info they need.',
              bg: '#ff6b6b',
              icon: '🌐',
              rotate: '-rotate-1',
            },
            {
              title: 'Social Media',
              desc: 'Share the giggles, the crafts, and the adventures. Parents want to see their kids having fun!',
              bg: '#4ecdc4',
              icon: '📱',
              rotate: 'rotate-1',
            },
            {
              title: 'Google Visibility',
              desc: 'When families search for daycare nearby, make sure they find you first.',
              bg: '#a78bfa',
              icon: '🔍',
              rotate: '-rotate-1',
            },
          ].map((service) => (
            <div
              key={service.title}
              className={`wobble-card p-8 md:p-10 ${service.rotate}`}
              style={{ background: service.bg, borderRadius: '1.5rem', color: '#fff' }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl md:text-2xl font-extrabold mb-3">{service.title}</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ opacity: 0.9 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="px-6 md:px-12 py-16 md:py-24" style={{ background: '#fffdf5' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-4 py-1 mb-6 text-sm font-bold" style={{ background: '#ffe66d', borderRadius: '9999px', color: '#2d2d2d' }}>
            About Us
          </div>
          <p className="text-xl md:text-2xl leading-relaxed" style={{ color: '#444' }}>
            Little Explorers Daycare in Castlegar provides a safe, creative, and nurturing environment where every child is encouraged to learn through play.
          </p>
        </div>
      </section>

      {/* Fun divider */}
      <div className="flex justify-center gap-3 py-8">
        {['#ff6b6b', '#ffe66d', '#4ecdc4', '#a78bfa'].map((color) => (
          <div key={color} className="w-4 h-4" style={{ background: color, borderRadius: '50%' }} />
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center py-10 px-6" style={{ background: '#f8f8f8' }}>
        <p className="text-lg font-extrabold mb-2" style={{ color: '#ff6b6b' }}>Little Explorers 🌈</p>
        <p className="text-xs" style={{ color: '#aaa' }}>
          &copy; {new Date().getFullYear()} Little Explorers Daycare. All rights reserved.
        </p>
      </footer>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderTop: '2px solid #ffe66d' }}>
        <p className="text-xs md:text-sm" style={{ color: '#888' }}>
          This is a sample design by <span className="font-bold" style={{ color: '#ff6b6b' }}>Kootenay Made Digital</span>
        </p>
        <Link
          href="/contact?style=bright-playful"
          className="text-xs md:text-sm font-bold px-5 py-2 transition-all duration-300 whitespace-nowrap"
          style={{ background: '#ff6b6b', color: '#fff', borderRadius: '9999px' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#4ecdc4' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#ff6b6b' }}
        >
          Get This Style &rarr;
        </Link>
      </div>

      {/* Bottom padding for sticky bar */}
      <div className="h-16" />
    </div>
  )
}
