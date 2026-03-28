'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import Breadcrumb from '@/components/Breadcrumb';
import ScrollReveal from '@/components/ScrollReveal';
import MountainDivider from '@/components/MountainDivider';
import AmbientOrbs from '@/components/AmbientOrbs';

const posts = [
  {
    slug: 'kootenay-business-new-website',
    title: '5 Signs Your Kootenay Business Needs a New Website',
    excerpt: 'Your website is your digital storefront. If it\'s not pulling its weight, you\'re leaving money on the table. Here\'s how to tell if it\'s time for an upgrade.',
    date: 'March 28, 2026',
    readTime: '5 min read',
    category: 'Web Design',
    image: '/images/blog/new-website.png',
  },
  {
    slug: 'google-business-profile',
    title: 'Google Business Profile: The Free Tool Most Local Businesses Ignore',
    excerpt: 'It\'s completely free, takes 20 minutes to set up, and can put you at the top of local search results. So why do most Kootenay businesses skip it?',
    date: 'March 28, 2026',
    readTime: '6 min read',
    category: 'Local SEO',
    image: '/images/blog/google-profile.png',
  },
  {
    slug: 'what-to-expect-web-designer',
    title: 'What to Expect When Working with a Web Designer (No Jargon Edition)',
    excerpt: 'Never hired a web designer before? Here\'s what the process actually looks like — from first conversation to launch day — explained in plain English.',
    date: 'March 28, 2026',
    readTime: '5 min read',
    category: 'Getting Started',
    image: '/images/blog/web-designer.png',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-20">
      <section className="aurora-bg grain py-20 sm:py-24 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <Breadcrumb items={[{ label: 'Blog' }]} dark />
          <ScrollReveal>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl font-bold text-cream mb-4">
              From the Workshop
            </h1>
            <p className="text-dark-text-muted text-lg max-w-xl mx-auto">
              Practical advice for Kootenay businesses navigating the digital world. No jargon. No fluff. Just what works.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" />

      <section className="bg-cream py-16 sm:py-20 cedar-texture relative">
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group glass-card-light rounded-xl overflow-hidden flex flex-col"
                >
                  {/* Blog image with clip-path reveal */}
                  <motion.div
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.1 }}
                    className="relative h-44 overflow-hidden"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 bg-copper/10 text-copper text-xs font-medium px-2.5 py-1 rounded-full">
                        <Tag size={12} />
                        {post.category}
                      </span>
                    </div>
                    <h2 className="font-[family-name:var(--font-satoshi)] text-lg font-bold text-slate mb-2 group-hover:text-copper transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-text-tertiary text-xs">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <MountainDivider variant={2} fillColor="#1A1D20" />

      <section className="bg-slate grain py-16 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-4">
            Want to know where your website stands?
          </h2>
          <p className="text-dark-text-muted mb-6">
            Our free 30-minute audit will show you what&apos;s working, what&apos;s not, and what to do next.
          </p>
          <Link
            href="/audit"
            className="inline-block bg-copper hover:bg-copper-light text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Your Free Audit →
          </Link>
        </div>
      </section>
    </div>
  );
}
