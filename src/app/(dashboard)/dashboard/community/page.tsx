'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Plus, MessageSquare, Pin, Flame, Heart } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const CATEGORIES = [
  { value: 'all', label: '🔥 All Posts' },
  { value: 'wins', label: '🏆 Wins' },
  { value: 'questions', label: '❓ Questions' },
  { value: 'tips', label: '💡 Tips' },
  { value: 'show-work', label: '🎨 Show Your Work' },
];

type Post = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  pinned: boolean;
  created_at: string;
  reply_count?: number;
  helpful_total?: number;
  business_name?: string;
  is_admin?: boolean;
};

function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function catLabel(cat: string) {
  const map: Record<string, string> = { wins: '🏆 Win', questions: '❓ Question', tips: '💡 Tip', 'show-work': '🎨 Show Your Work' };
  return map[cat] ?? cat;
}

function catColor(cat: string): { bg: string; text: string } {
  const map: Record<string, { bg: string; text: string }> = {
    wins: { bg: 'rgba(200,121,65,0.12)', text: '#C87941' },
    questions: { bg: 'rgba(200,121,65,0.08)', text: '#A0612F' },
    tips: { bg: 'rgba(200,121,65,0.10)', text: '#B5703A' },
    'show-work': { bg: 'rgba(200,121,65,0.08)', text: '#C87941' },
  };
  return map[cat] ?? { bg: 'rgba(200,121,65,0.12)', text: '#C87941' };
}

function initials(name?: string) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export default function CommunityPage() {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const query = supabase
        .from('forum_posts')
        .select('*, profiles(business_name, is_admin), forum_replies(count)')
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (activeCategory !== 'all') query.eq('category', activeCategory);

      const { data } = await query;

      const mapped: Post[] = (data ?? []).map((p: Record<string, unknown>) => ({
        id: p.id as string,
        user_id: p.user_id as string,
        title: p.title as string,
        content: p.content as string,
        category: p.category as string,
        pinned: p.pinned as boolean,
        created_at: p.created_at as string,
        reply_count: (p.forum_replies as Array<{ count: number }>)?.[0]?.count ?? 0,
        business_name: (p.profiles as { business_name?: string })?.business_name,
        is_admin: (p.profiles as { is_admin?: boolean })?.is_admin,
      }));

      setPosts(mapped);
      setLoading(false);
    })();
  }, [activeCategory]);

  return (
    <div className="space-y-6 max-w-3xl" style={{ fontFamily: 'var(--font-general)' }}>
      {/* Header */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}>
              <Flame className="w-5 h-5" style={{ color: 'var(--color-dash-copper)' }} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>The Campfire</h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>Where neighbours share wins, ask questions, and help each other grow.</p>
        </div>
        <Link href="/dashboard/community/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-all hover:opacity-90 hover:shadow-md"
          style={{ backgroundColor: 'var(--color-dash-copper)', minHeight: 44 }}>
          <Plus className="w-4 h-4" />Share with the neighbourhood
        </Link>
      </motion.div>

      {/* Category pills */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="flex gap-2 overflow-x-auto pb-1 -mb-1 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
            className="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0"
            style={{
              minHeight: 44,
              backgroundColor: activeCategory === cat.value ? 'var(--color-dash-copper)' : 'transparent',
              color: activeCategory === cat.value ? 'white' : 'var(--color-dash-text-muted)',
              border: `1.5px solid ${activeCategory === cat.value ? 'var(--color-dash-copper)' : 'var(--color-dash-border)'}`,
            }}>
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Post list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-xl border p-4 space-y-3" style={{ borderColor: 'var(--color-dash-border)', backgroundColor: 'white' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-dash-border)' }} />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3 w-28 rounded animate-pulse" style={{ backgroundColor: 'var(--color-dash-border)' }} />
                  <div className="h-2.5 w-16 rounded animate-pulse" style={{ backgroundColor: 'var(--color-dash-border)' }} />
                </div>
              </div>
              <div className="h-4 w-3/4 rounded animate-pulse" style={{ backgroundColor: 'var(--color-dash-border)' }} />
              <div className="h-3 w-full rounded animate-pulse" style={{ backgroundColor: 'var(--color-dash-border)' }} />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="rounded-xl border bg-white p-14 text-center" style={{ borderColor: 'var(--color-dash-border)' }}>
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}>
            <Flame className="w-7 h-7" style={{ color: 'var(--color-dash-copper)' }} />
          </div>
          <p className="font-semibold mb-1" style={{ color: 'var(--color-dash-text)', fontFamily: 'var(--font-cabinet)' }}>The campfire is ready.</p>
          <p className="text-sm mb-5" style={{ color: 'var(--color-dash-text-muted)' }}>Be the first to share a win.</p>
          <Link href="/dashboard/community/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-dash-copper)', minHeight: 44 }}>
            <Plus className="w-4 h-4" />Share with the neighbourhood
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {posts.map((post, i) => (
            <motion.div key={post.id} custom={i + 2} variants={fadeUp} initial="hidden" animate="show">
              {/* Pinned admin banner */}
              {post.pinned && post.is_admin && (
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-t-xl text-xs font-semibold"
                  style={{ backgroundColor: 'var(--color-dash-copper)', color: 'white' }}>
                  <Pin className="w-3 h-3" />From the Guide
                </div>
              )}
              <Link href={`/dashboard/community/${post.id}`}
                className="block rounded-xl border bg-white p-4 transition-all duration-200 hover:shadow-md"
                style={{
                  borderColor: 'var(--color-dash-border)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  borderTopLeftRadius: post.pinned && post.is_admin ? 0 : undefined,
                  borderTopRightRadius: post.pinned && post.is_admin ? 0 : undefined,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-dash-copper)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-dash-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                    style={{ backgroundColor: 'var(--color-dash-copper)' }}>
                    {initials(post.business_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Author row */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-dash-text)' }}>
                        {post.business_name ?? 'A neighbour'}
                      </span>
                      {post.is_admin && (
                        <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-dash-copper)', color: 'white' }}>Guide</span>
                      )}
                      <span className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>{timeAgo(post.created_at)}</span>
                    </div>
                    {/* Title */}
                    <h3 className="font-semibold text-sm mb-1 leading-snug" style={{ color: 'var(--color-dash-text)', fontFamily: 'var(--font-cabinet)' }}>
                      {post.title}
                    </h3>
                    {/* Content preview */}
                    <p className="text-sm line-clamp-2 leading-relaxed mb-2" style={{ color: 'var(--color-dash-text-muted)' }}>
                      {post.content.slice(0, 160)}{post.content.length > 160 ? '…' : ''}
                    </p>
                    {/* Footer: badge + counts */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: catColor(post.category).bg, color: catColor(post.category).text }}>
                        {catLabel(post.category)}
                      </span>
                      {post.pinned && !post.is_admin && (
                        <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-dash-text-faint)' }}><Pin className="w-3 h-3" />Pinned</span>
                      )}
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>
                        <MessageSquare className="w-3.5 h-3.5" />{post.reply_count ?? 0}
                      </span>
                      {(post.helpful_total ?? 0) > 0 && (
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>
                          <Heart className="w-3.5 h-3.5" />{post.helpful_total}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
