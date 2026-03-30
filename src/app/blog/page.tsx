'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Clock, Search, TrendingUp, Shield, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '@/components/Breadcrumb';
import ScrollReveal from '@/components/ScrollReveal';
import MountainDivider from '@/components/MountainDivider';
import RiverWave from '@/components/RiverWave';
import AmbientOrbs from '@/components/AmbientOrbs';

const posts = [
  { slug: 'ai-not-scary', title: "AI for Small Business: It's Not Scary, It's Your New Favourite Employee", excerpt: "AI isn't here to replace you. It's here to handle the boring stuff so you can focus on what you're actually good at.", category: 'AI & Automation', readTime: '8 min', image: '/images/blog/ai-not-scary.jpg', date: 'March 30, 2026', featured: true },
  { slug: 'website-first-impression', title: '76% of People Judge Your Business By Your Website', excerpt: "First impressions happen in 0.05 seconds online. Here's what your website is actually saying to potential customers.", category: 'Getting Started', readTime: '7 min', image: '/images/blog/website-first-impression.jpg', date: 'March 30, 2026' },
  { slug: 'ai-tools-save-time', title: '5 AI Tools That Can Save Your Business 10 Hours a Week', excerpt: 'Real tools, real time savings. No hype, no jargon — just practical AI that works today.', category: 'AI & Automation', readTime: '6 min', image: '/images/blog/ai-tools-save-time.jpg', date: 'March 30, 2026' },
  { slug: 'local-search-visibility', title: 'Google Says 46% of Searches Are Local. Is Your Business Showing Up?', excerpt: "Nearly half of all Google searches have local intent. If you're not optimized for local, you're invisible.", category: 'Growth & SEO', readTime: '7 min', image: '/images/blog/local-search-visibility.jpg', date: 'March 30, 2026' },
  { slug: 'do-you-need-website-2026', title: 'Do You Actually Need a Website in 2026?', excerpt: "Honest answer: most businesses do. But some don't — yet. Here's how to tell.", category: 'Getting Started', readTime: '6 min', image: '/images/blog/do-you-need-website-2026.jpg', date: 'March 30, 2026' },
  { slug: 'website-cost-guide', title: "What Should a Website Cost? (How to Know If You're Getting Ripped Off)", excerpt: "No prices here — just the knowledge to evaluate any quote like a pro.", category: 'Getting Started', readTime: '8 min', image: '/images/blog/website-cost-guide.jpg', date: 'March 30, 2026' },
  { slug: 'competitor-new-website', title: 'Your Competitor Just Got a New Website', excerpt: 'In a small town, everyone notices. Here\'s why that should matter to you.', category: 'Growth & SEO', readTime: '5 min', image: '/images/blog/competitor-new-website.jpg', date: 'March 30, 2026' },
  { slug: 'wix-vs-custom', title: "Wix vs. Custom Website: What's Right for Your Business?", excerpt: "Sometimes Wix works. Sometimes it doesn't. Here's the honest breakdown.", category: 'Getting Started', readTime: '7 min', image: '/images/blog/wix-vs-custom.jpg', date: 'March 30, 2026' },
  { slug: 'what-google-sees', title: 'What Actually Happens When Someone Googles Your Business Name', excerpt: 'The journey from search to sale — and where most businesses lose people.', category: 'Growth & SEO', readTime: '6 min', image: '/images/blog/what-google-sees.jpg', date: 'March 30, 2026' },
  { slug: 'ai-business-setup', title: 'What an AI Business Setup Actually Looks Like', excerpt: 'No robots. No sci-fi. Just boring-in-the-best-way tools that save you hours.', category: 'AI & Automation', readTime: '7 min', image: '/images/blog/ai-business-setup.jpg', date: 'March 30, 2026' },
  { slug: 'tourism-season-website', title: 'Tourism Season Is Coming — Is Your Website Ready?', excerpt: 'Summer tourists are Googling before they arrive. Make sure they find you.', category: 'Growth & SEO', readTime: '5 min', image: '/images/blog/tourism-season-website.jpg', date: 'March 30, 2026' },
  { slug: 'website-soundtrack', title: "We Added a Soundtrack to Our Website. Here's Why.", excerpt: 'Because websites should be experiences, not brochures.', category: 'Our Story', readTime: '5 min', image: '/images/blog/website-soundtrack.jpg', date: 'March 30, 2026' },
  { slug: 'google-business-profile', title: 'Google Business Profile: The Free Tool Most Businesses Ignore', excerpt: "It's free, it takes 20 minutes, and it might be the single best marketing move you make this year.", category: 'Growth & SEO', readTime: '6 min', image: '/images/blog/google-business-profile.jpg', date: 'March 28, 2026' },
  { slug: 'kootenay-business-new-website', title: '5 Signs Your Kootenay Business Needs a New Website', excerpt: 'If any of these sound familiar, it might be time.', category: 'Getting Started', readTime: '5 min', image: '/images/blog/kootenay-business-new-website.jpg', date: 'March 28, 2026' },
  { slug: 'what-to-expect-web-designer', title: 'What to Expect When Working with a Web Designer', excerpt: 'No jargon. No mystery. Just a clear walkthrough of the process.', category: 'Getting Started', readTime: '5 min', image: '/images/blog/what-to-expect-web-designer.jpg', date: 'March 28, 2026' },
];

const categories = ['All', 'Getting Started', 'AI & Automation', 'Growth & SEO', 'Our Story'];

const benefits = [
  {
    icon: Search,
    title: 'Get Found on Google',
    desc: 'Blog posts rank for the questions your customers are already asking — pulling in traffic you never had to chase.',
  },
  {
    icon: Shield,
    title: 'Build Trust Before They Call',
    desc: 'Position yourself as the expert before they ever walk in. People buy from businesses they trust.',
  },
  {
    icon: TrendingUp,
    title: 'Stay Ahead of Competitors',
    desc: 'Most local businesses don\'t blog. That silence is your advantage — take it.',
  },
  {
    icon: Moon,
    title: 'Content That Works While You Sleep',
    desc: 'Blog posts generate leads 24/7, long after they\'re published. One good post keeps paying.',
  },
];

function FeaturedPost({ post }: { post: typeof posts[0] }) {
  return (
    <ScrollReveal>
      <Link href={`/blog/${post.slug}`} className="group block mb-10">
        <div className="relative rounded-2xl overflow-hidden bg-slate shadow-2xl border border-white/5">
          <div className="relative h-[320px] sm:h-[420px] lg:h-[500px] w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D20] via-[#1A1D20]/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <span
              className="inline-block bg-copper text-white text-xs font-bold px-3 py-1.5 rounded-sm mb-4 shadow-lg"
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}
            >
              Featured · {post.category}
            </span>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl lg:text-4xl font-bold text-cream mb-3 leading-tight group-hover:text-copper transition-colors duration-300 max-w-3xl">
              {post.title}
            </h2>
            <p className="text-dark-text-muted text-base max-w-2xl mb-4 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center gap-3 text-dark-text-muted/60 text-sm">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-copper/40" />
              <span className="flex items-center gap-1"><Clock size={13} />{post.readTime} read</span>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

function BlogCard({ post, index }: { post: typeof posts[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group glass-card-light rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-copper/5"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* grain overlay on image */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <span
            className="inline-block self-start bg-slate text-copper text-xs font-bold px-2.5 py-1 rounded-sm mb-3"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {post.category}
          </span>
          <h3 className="font-[family-name:var(--font-satoshi)] text-base font-bold text-slate mb-2 group-hover:text-copper transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-3 text-text-tertiary text-xs mt-auto">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-copper/30" />
            <span className="flex items-center gap-1"><Clock size={11} />{post.readTime} read</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');

  const featuredPost = posts.find((p) => p.featured)!;
  const filtered = posts.filter((p) => !p.featured && (activeCategory === 'All' || p.category === activeCategory));

  // If a category is active, include featured in filtered if it matches
  const showFeatured = activeCategory === 'All' || featuredPost.category === activeCategory;
  const gridPosts = activeCategory === 'All' ? filtered : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-0">
      {/* ─── Hero ─── */}
      <section className="bg-slate grain pt-32 pb-20 relative overflow-hidden">
        <AmbientOrbs />
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
            <p className="text-copper font-[family-name:var(--font-satoshi)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">
              From the Workshop
            </p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream mb-5">
              The Blog
            </h1>
            <p className="text-dark-text-muted text-lg max-w-xl mx-auto">
              Practical advice for Kootenay businesses navigating the digital world. No jargon. No fluff.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <MountainDivider variant={1} fillColor="#F8F4F0" bgColor="#1A1D20" />

      {/* ─── Posts ─── */}
      <section className="bg-cream py-16 sm:py-20 cedar-texture relative">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">

          {/* Category tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                    activeCategory === cat
                      ? 'bg-copper text-white border-copper shadow-md shadow-copper/20'
                      : 'bg-white/80 text-slate/70 border-slate/15 hover:border-copper/40 hover:text-copper'
                  }`}
                  style={{ fontFamily: activeCategory === cat ? undefined : 'Georgia, serif' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Featured post — only in "All" view or if it matches the filter */}
          <AnimatePresence mode="wait">
            {showFeatured && activeCategory === 'All' && (
              <motion.div
                key="featured"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FeaturedPost post={featuredPost} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Posts grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {gridPosts.length === 0 ? (
                <p className="col-span-full text-text-secondary text-center py-12">No posts in this category yet.</p>
              ) : (
                gridPosts.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <RiverWave fillColor="#1A1D20" bgColor="#F8F4F0" />

      {/* ─── Why Blog? ─── */}
      <section className="bg-slate grain py-20 relative overflow-hidden">
        <AmbientOrbs />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-copper font-semibold text-sm tracking-[0.2em] uppercase mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                The case for content
              </p>
              <h2 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl font-bold text-cream mb-4">
                Why Every Kootenay Business Needs a Blog
              </h2>
              <p className="text-dark-text-muted max-w-xl mx-auto">
                It's not just writing for writing's sake. A blog is one of the highest-ROI marketing moves a local business can make.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.1}>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:border-copper/20 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center mb-4 group-hover:bg-copper/20 transition-colors">
                    <b.icon size={20} className="text-copper" />
                  </div>
                  <h3 className="font-[family-name:var(--font-satoshi)] text-cream font-bold text-base mb-2">{b.title}</h3>
                  <p className="text-dark-text-muted text-sm leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <Link
                href="/contact"
                className="inline-block bg-copper hover:bg-copper-light text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-copper/20"
              >
                Ready to stand out? →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Newsletter signup ─── */}
      <section className="bg-cream cedar-texture py-16 relative">
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-copper font-semibold text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Stay in the loop
            </p>
            <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-slate mb-3">
              Digital tips for Kootenay businesses
            </h2>
            <p className="text-text-secondary mb-7 text-base">No spam, just useful stuff — delivered when it matters.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-copper/20 bg-white text-slate placeholder:text-text-tertiary text-sm focus:outline-none focus:ring-2 focus:ring-copper/30 focus:border-copper transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-copper hover:bg-copper-light text-white font-semibold text-sm rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-md shadow-copper/15"
              >
                Subscribe →
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
