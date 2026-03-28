'use client';

import { Mail, MapPin, Clock, Coffee } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate grain pt-32 pb-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollReveal>
            <p className="text-copper-light font-medium text-sm tracking-wider uppercase mb-3">Contact</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight max-w-3xl">
              Come say hi.
            </h1>
            <p className="mt-6 text-dark-text-muted text-lg max-w-2xl leading-relaxed">
              Whether you know exactly what you need or just have a question — we&apos;d love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-cream-border bg-white text-slate placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-cream-border bg-white text-slate placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="business" className="block text-sm font-medium text-slate mb-2">Business Name <span className="text-text-tertiary">(optional)</span></label>
                    <input
                      type="text"
                      id="business"
                      name="business"
                      className="w-full px-4 py-3 rounded-lg border border-cream-border bg-white text-slate placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
                      placeholder="Your business"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-slate mb-2">What are you interested in?</label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full px-4 py-3 rounded-lg border border-cream-border bg-white text-slate focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors"
                    >
                      <option value="">Select an option...</option>
                      <option value="website">New Website</option>
                      <option value="rebrand">Brand Build / Rebrand</option>
                      <option value="ecommerce">E-Commerce Store</option>
                      <option value="email">Email Marketing</option>
                      <option value="ai">AI Business Setup</option>
                      <option value="google">Google / Local SEO</option>
                      <option value="audit">Free Website Audit</option>
                      <option value="other">Something Else</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-cream-border bg-white text-slate placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-colors resize-none"
                      placeholder="Tell us about your project or ask any question..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Send Message
                  </button>
                </form>
              </ScrollReveal>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.2}>
                <div className="space-y-8">
                  {[
                    { icon: Mail, label: 'Email', value: 'hello@kootenaymade.ca', href: 'mailto:hello@kootenaymade.ca' },
                    { icon: MapPin, label: 'Location', value: 'Castlegar, BC, Canada' },
                    { icon: Clock, label: 'Response Time', value: 'Usually within 24 hours' },
                    { icon: Coffee, label: 'Availability', value: 'Available for coffee ☕' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
                        <item.icon size={20} className="text-copper" />
                      </div>
                      <div>
                        <p className="text-sm text-text-tertiary mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-slate font-medium hover:text-copper transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-slate font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="mt-10 p-6 rounded-2xl bg-white border border-cream-border">
                    <h3 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-slate mb-2">
                      Free Website Audit
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Not sure where to start? Book a free 30-minute audit. We&apos;ll review your current online presence and give you an honest, actionable plan. No strings attached.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
