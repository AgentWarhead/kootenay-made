import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumb from '@/components/Breadcrumb';
import MountainDivider from '@/components/MountainDivider';
import AmbientOrbs from '@/components/AmbientOrbs';
import { ArrowRight } from 'lucide-react';

const styles = [
  { slug: 'clean-professional', name: 'Clean & Professional', tags: 'Law, Accounting, Finance' },
  { slug: 'bold-modern', name: 'Bold & Modern', tags: 'Tech, Trades, Startups' },
  { slug: 'warm-natural', name: 'Warm & Natural', tags: 'Wellness, Yoga, Therapy' },
  { slug: 'rustic-craft', name: 'Rustic Craft', tags: 'Breweries, Bakeries, Artisan' },
  { slug: 'sleek-dark', name: 'Sleek & Dark', tags: 'Restaurants, Bars, Luxury' },
  { slug: 'bright-playful', name: 'Bright & Playful', tags: 'Daycares, Pets, Entertainment' },
  { slug: 'editorial-elegant', name: 'Editorial & Elegant', tags: 'Real Estate, Fashion, Salons' },
  { slug: 'adventure-outdoors', name: 'Adventure & Outdoors', tags: 'Tourism, Guides, Ski Resorts' },
  { slug: 'trades-industrial', name: 'Trades & Industrial', tags: 'Plumbing, HVAC, Electrical' },
  { slug: 'farm-harvest', name: 'Farm & Harvest', tags: 'Farms, Orchards, Markets' },
  { slug: 'medical-dental', name: 'Medical & Dental', tags: 'Dentists, Physio, Vet Clinics' },
  { slug: 'automotive', name: 'Automotive & Powersports', tags: 'Garages, Dealerships' },
  { slug: 'education-nonprofit', name: 'Education & Nonprofit', tags: 'Schools, Community Orgs' },
  { slug: 'music-entertainment', name: 'Music & Entertainment', tags: 'Venues, Studios, Events' },
  { slug: 'home-garden', name: 'Home & Garden', tags: 'Landscapers, Interior Design' },
  { slug: 'government-municipal', name: 'Government & Municipal', tags: 'City Offices, Parks' },
];

export default function StylesPage() {
  return (
    <div className="pt-0">
      {/* Hero */}
      <section className="aurora-bg grain py-20 sm:py-28 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <Breadcrumb items={[{ label: 'Styles' }]} dark />
          <ScrollReveal>
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">
              The Gallery
            </p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4">
              Choose Your Style
            </h1>
            <p className="text-dark-text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Browse real designs built for businesses like yours. Click any style to explore the full demo.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={3} fillColor="#1A1D20" />

      {/* Grid */}
      <section className="bg-slate grain py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {styles.map((style, i) => (
              <ScrollReveal key={style.slug} delay={i * 0.05}>
                <Link
                  href={`/styles/demos/${style.slug}`}
                  className="group block"
                >
                  <div className="rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-copper/10">
                    <Image
                      src={`/images/styles/${style.slug}.webp`}
                      alt={style.name}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="mt-3 px-1">
                    <h3 className="font-[family-name:var(--font-satoshi)] font-bold text-cream text-base sm:text-lg">
                      {style.name}
                    </h3>
                    <p className="text-dark-text-muted text-sm mt-0.5">
                      Perfect for: {style.tags}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <MountainDivider variant={3} fillColor="#1A1D20" />

      {/* Bottom CTA */}
      <section className="bg-slate grain py-20 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl md:text-4xl font-bold text-cream mb-4">
              Don&apos;t see your vibe?
            </h2>
            <p className="text-dark-text-muted text-base sm:text-lg mb-8">
              Every style is a starting point. We&apos;ll customize anything to match your business perfectly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Let&apos;s talk about your vision
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
