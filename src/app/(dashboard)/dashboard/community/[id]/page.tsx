'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft, ThumbsUp, Send } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import { createClient } from '@/lib/supabase/client';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const days = Math.floor(diff / 86400);
  return days === 1 ? 'yesterday' : `${days}d ago`;
}

function catLabel(cat: string) {
  const map: Record<string, string> = { wins: '🏆 Win', questions: '❓ Question', tips: '💡 Tip', 'show-work': '📸 Show Your Work' };
  return map[cat] ?? cat;
}

type Post = {
  id: string; user_id: string; title: string; content: string; category: string;
  pinned: boolean; created_at: string;
  profiles: { business_name: string; is_admin: boolean } | null;
};

type Reply = {
  id: string; post_id: string; user_id: string; content: string;
  helpful_count: number; created_at: string;
  profiles: { business_name: string; is_admin: boolean } | null;
};

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = createClient();
  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [helpfulVoted, setHelpfulVoted] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);

      const [{ data: postData }, { data: replyData }] = await Promise.all([
        supabase.from('forum_posts').select('*, profiles(business_name, is_admin)').eq('id', id).single(),
        supabase.from('forum_replies').select('*, profiles(business_name, is_admin)').eq('post_id', id).order('created_at'),
      ]);

      setPost(postData);
      setReplies(replyData ?? []);
      setLoading(false);
    })();
  }, [id]);

  const submitReply = async () => {
    if (!replyText.trim() || !userId) return;
    setSending(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any).from('forum_replies')
      .insert({ post_id: id, user_id: userId, content: replyText.trim(), helpful_count: 0 })
      .select('*, profiles(business_name, is_admin)').single();
    if (data) setReplies(r => [...r, data as Reply]);
    setReplyText('');
    setSending(false);
  };

  const markHelpful = async (replyId: string) => {
    if (helpfulVoted.has(replyId)) return;
    setHelpfulVoted(s => new Set([...s, replyId]));
    setReplies(r => r.map(reply => reply.id === replyId ? { ...reply, helpful_count: reply.helpful_count + 1 } : reply));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('forum_replies').update({ helpful_count: replies.find(r => r.id === replyId)!.helpful_count + 1 }).eq('id', replyId);
  };

  if (loading) return (
    <div className="max-w-3xl space-y-4">
      <div className="h-8 w-32 rounded bg-gray-100 animate-pulse" />
      <div className="h-40 rounded-xl bg-gray-100 animate-pulse" />
    </div>
  );

  if (!post) return (
    <div className="max-w-3xl text-center py-16">
      <p style={{ color: 'var(--color-dash-text-muted)' }}>Post not found.</p>
      <Link href="/dashboard/community" className="text-sm mt-4 inline-block hover:underline" style={{ color: 'var(--color-dash-copper)' }}>← Back to The Campfire</Link>
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl" style={{ fontFamily: 'var(--font-general)' }}>
      {/* Back */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <Link href="/dashboard/community" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: 'var(--color-dash-text-muted)' }}>
          <ArrowLeft className="w-4 h-4" />Back to The Campfire
        </Link>
      </motion.div>

      {/* Post */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show"
        className="rounded-xl border bg-white p-6" style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-semibold text-sm" style={{ color: 'var(--color-dash-text)' }}>
            {post.profiles?.business_name ?? 'A neighbour'}
          </span>
          {post.profiles?.is_admin && (
            <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-dash-copper)', color: 'white' }}>KMD</span>
          )}
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-dash-copper-muted)', color: 'var(--color-dash-copper)' }}>
            {catLabel(post.category)}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>{timeAgo(post.created_at)}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>{post.title}</h1>
        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--color-dash-text-muted)' }}>{post.content}</p>
      </motion.div>

      {/* Replies */}
      <motion.section custom={2} variants={fadeUp} initial="hidden" animate="show">
        <h2 className="text-base font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
          {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
        </h2>
        <div className="space-y-3">
          {replies.map((reply, i) => (
            <motion.div key={reply.id} custom={i + 3} variants={fadeUp} initial="hidden" animate="show"
              className="rounded-xl border bg-white p-4" style={{ borderColor: reply.profiles?.is_admin ? 'rgba(200,121,65,0.3)' : 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-semibold text-xs" style={{ color: 'var(--color-dash-text)' }}>
                      {reply.profiles?.business_name ?? 'A neighbour'}
                    </span>
                    {reply.profiles?.is_admin && (
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-dash-copper)', color: 'white' }}>KMD</span>
                    )}
                    <span className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>{timeAgo(reply.created_at)}</span>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--color-dash-text-muted)' }}>{reply.content}</p>
                </div>
                <button
                  onClick={() => markHelpful(reply.id)}
                  disabled={helpfulVoted.has(reply.id)}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg border transition-all shrink-0"
                  style={{
                    minHeight: 44, minWidth: 44,
                    borderColor: helpfulVoted.has(reply.id) ? 'var(--color-dash-copper)' : 'var(--color-dash-border)',
                    color: helpfulVoted.has(reply.id) ? 'var(--color-dash-copper)' : 'var(--color-dash-text-faint)',
                    backgroundColor: helpfulVoted.has(reply.id) ? 'var(--color-dash-copper-muted)' : 'transparent',
                  }}>
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {reply.helpful_count > 0 && reply.helpful_count}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Reply form */}
      {userId && (
        <motion.div custom={replies.length + 3} variants={fadeUp} initial="hidden" animate="show"
          className="rounded-xl border bg-white p-4" style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-dash-text)' }}>Add a reply</h3>
          <div className="flex gap-2">
            <textarea
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="flex-1 rounded-lg border p-3 text-sm resize-none focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties}
            />
            <button onClick={submitReply} disabled={sending || !replyText.trim()}
              className="px-3 rounded-lg text-white disabled:opacity-50 transition-opacity"
              style={{ backgroundColor: 'var(--color-dash-copper)', minWidth: 44 }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
