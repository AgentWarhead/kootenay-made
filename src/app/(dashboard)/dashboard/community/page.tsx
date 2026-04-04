'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Plus, MessageSquare, Pin, Users } from 'lucide-react';
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
  { value: 'wins', label: '🏆 Wins & Milestones' },
  { value: 'questions', label: '❓ Questions' },
  { value: 'tips', label: '💡 Tips & Tricks' },
  { value: 'show-work', label: '📸 Show Your Work' },
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
  const map: Record<string, string> = { wins: '🏆 Win', questions: '❓ Question', tips: '💡 Tip', 'show-work': '📸 Show Your Work' };
  return map[cat] ?? cat;
}

export default function CommunityPage() {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('wins');

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
          <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>The Campfire 🔥</h1>
          <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>Share wins, ask questions, and connect with fellow neighbours.</p>
        </div>
        <Link href="/dashboard/community/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-dash-copper)', minHeight: 44 }}>
          <Plus className="w-4 h-4" />Start a Conversation
        </Link>
      </motion.div>

      {/* Category pills */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="flex gap-2 overflow-x-auto pb-1 -mb-1 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
            className="px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0"
            style={{
              minHeight: 44,
              backgroundColor: activeCategory === cat.value ? 'var(--color-dash-copper)' : 'white',
              color: activeCategory === cat.value ? 'white' : 'var(--color-dash-text-muted)',
              border: `1px solid ${activeCategory === cat.value ? 'var(--color-dash-copper)' : 'var(--color-dash-border)'}`,
            }}>
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Post list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : posts.length === 0 ? (
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="rounded-xl border bg-white p-12 text-center" style={{ borderColor: 'var(--color-dash-border)' }}>
          <Users className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-dash-text-faint)' }} />
          <p className="font-medium mb-1" style={{ color: 'var(--color-dash-text)' }}>The campfire&apos;s ready.</p>
          <p className="text-sm mb-4" style={{ color: 'var(--color-dash-text-muted)' }}>Be the first to share.</p>
          <Link href="/dashboard/community/new" className="inline-flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: 'var(--color-dash-copper)' }}>
            <Plus className="w-4 h-4" />Start a conversation
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {posts.map((post, i) => (
            <motion.div key={post.id} custom={i + 2} variants={fadeUp} initial="hidden" animate="show"
              className="rounded-xl border bg-white p-4 transition-all duration-150"
              style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-dash-copper)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-dash-border)')}>
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-dash-text)' }}>
                      {post.business_name ?? 'A neighbour'}
                    </span>
                    {post.is_admin && (
                      <span className="inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-dash-copper)', color: 'white' }}>KMD</span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-dash-copper-muted)', color: 'var(--color-dash-copper)' }}>
                      {catLabel(post.category)}
                    </span>
                    {post.pinned && <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-dash-text-faint)' }}><Pin className="w-3 h-3" />Pinned</span>}
                    <span className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>{timeAgo(post.created_at)}</span>
                  </div>
                  <Link href={`/dashboard/community/${post.id}`} className="block mb-1 font-semibold text-sm hover:underline" style={{ color: 'var(--color-dash-text)', fontFamily: 'var(--font-cabinet)' }}>
                    {post.title}
                  </Link>
                  <p className="text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--color-dash-text-muted)' }}>
                    {post.content.slice(0, 150)}{post.content.length > 150 ? '…' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0 mt-1">
                  <MessageSquare className="w-3.5 h-3.5" style={{ color: 'var(--color-dash-text-faint)' }} />
                  <span className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>{post.reply_count}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
