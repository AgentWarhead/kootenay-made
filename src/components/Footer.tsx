import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate text-dark-text grain">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <span className="font-[family-name:var(--font-satoshi)] text-xl font-bold tracking-tight">
              KOOTENAY MADE
            </span>
            <span className="font-[family-name:var(--font-satoshi)] text-xl font-light tracking-tight ml-1 text-copper">
              DIGITAL
            </span>
            <p className="mt-4 text-dark-text-muted text-sm leading-relaxed max-w-xs">
              Locally crafted digital. Modern websites, brands, and marketing for West Kootenay businesses.
            </p>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-satoshi)] font-semibold text-sm uppercase tracking-wider mb-4 text-dark-text-muted">Navigate</h3>
            <div className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/styles', label: 'Styles' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/blog', label: 'Blog' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/audit', label: 'Free Audit' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-dark-text-muted hover:text-cream transition-colors text-sm group relative inline-block w-fit">
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-copper transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-satoshi)] font-semibold text-sm uppercase tracking-wider mb-4 text-dark-text-muted">Get in Touch</h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@kootenaymade.ca" className="flex items-center gap-2 text-dark-text-muted hover:text-cream transition-colors text-sm">
                <Mail size={16} className="text-copper" />
                hello@kootenaymade.ca
              </a>
              <div className="flex items-center gap-2 text-dark-text-muted text-sm">
                <MapPin size={16} className="text-copper" />
                Castlegar, BC, Canada
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-text-muted text-xs">
            © {new Date().getFullYear()} Kootenay Made Digital. All rights reserved.
          </p>
          <p className="text-dark-text-muted text-xs">
            Crafted with care in the West Kootenays.
          </p>
        </div>
      </div>
    </footer>
  );
}
