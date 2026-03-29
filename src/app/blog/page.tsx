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

/* ── Featured post (first post, full width) ── */
function FeaturedPost({ post }: { post: typeof posts[0] }) {
  return (
    <ScrollReveal>
      <Link href={`/blog/${post.slug}`} className="group block mb-12">
        <div className="glass-card-light rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Large image */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative h-64 lg:h-full min-h-[280px] overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Content */}
            <div className="p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="inline-flex items-center gap-1 text-copper text-xs font-bold px-3 py-1.5 rounded-md bg-copper/10"
                  style={{ transform: 'rotate(-1deg)' }}
                >
                  <Tag size={12} />
                  {post.category}
                </span>
                <span className="text-text-tertiary text-xs">Featured</span>
              </div>
              <h2 className="font-[family-name:var(--font-satoshi)] text-2xl lg:text-3xl font-bold text-slate mb-3 group-hover:text-copper transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-text-tertiary text-sm">
                <span>{post.date}</span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

/* ── Blog card with paper texture hover ── */
function BlogCard({ post, index }: { post: typeof posts[0]; index: number }) {
  // Random slight rotation for paper label effect
  const tagRotation = index % 2 === 0 ? -2 : 1.5;

  return (
    <ScrollReveal delay={index * 0.1}>
      <Link
        href={`/blog/${post.slug}`}
        className="group glass-card-light rounded-xl overflow-hidden flex flex-col relative"
      >
        {/* Paper texture on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Blog image with clip-path reveal */}
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
          className="relative h-44 overflow-hidden"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
        <div className="p-4 sm:p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            {/* Paper label tag */}
            <span
              className="inline-flex items-center gap-1 bg-copper/10 text-copper text-xs font-bold px-2.5 py-1 rounded-sm shadow-sm border border-copper/10"
              style={{ transform: `rotate(${tagRotation}deg)` }}
            >
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
  );
}

export default function BlogPage() {
  const [featuredPost, ...otherPosts] = posts;

  return (
    <div className="pt-0">
      <section className="aurora-bg grain pt-32 pb-20 relative overflow-hidden">
        <AmbientOrbs />
        {/* Topographic pattern in hero background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topo-blog" patternUnits="userSpaceOnUse" width="250" height="250">
                <path d="M0 125 Q62.5 100, 125 125 T250 125" fill="none" stroke="#C17817" strokeWidth="0.5" />
                <path d="M0 75 Q62.5 55, 125 75 T250 75" fill="none" stroke="#C17817" strokeWidth="0.3" />
                <path d="M0 175 Q62.5 155, 125 175 T250 175" fill="none" stroke="#C17817" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topo-blog)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <Breadcrumb items={[{ label: 'Blog' }]} dark />
          <ScrollReveal>
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">From the Workshop</p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl md:text-5xl font-bold text-cream mb-4">
              Workshop Notes
            </h1>
            <p className="text-dark-text-muted text-lg max-w-xl mx-auto">
              Practical advice for Kootenay businesses navigating the digital world. No jargon. No fluff. Just what works.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" />

      <section className="bg-cream py-16 sm:py-20 cedar-texture relative">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-16">
          {/* Featured post — full width */}
          <FeaturedPost post={featuredPost} />

          {/* Other posts — two-column grid */}
          {otherPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <MountainDivider variant={2} fillColor="#1A1D20" />

      <section className="bg-slate grain py-16 relative">
        <AmbientOrbs />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
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
