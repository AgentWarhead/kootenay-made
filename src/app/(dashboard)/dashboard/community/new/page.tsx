'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft, Flame, Trophy, HelpCircle, Lightbulb, Palette } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const CATEGORIES: { value: 'wins' | 'questions' | 'tips' | 'show-work'; label: string; desc: string; icon: React.ReactNode; emoji: string }[] = [
  { value: 'wins', label: 'Wins & Milestones', desc: 'Celebrate a success', icon: <Trophy className="w-5 h-5" />, emoji: '🏆' },
  { value: 'questions', label: 'Questions', desc: 'Ask the neighbourhood', icon: <HelpCircle className="w-5 h-5" />, emoji: '❓' },
  { value: 'tips', label: 'Tips & Tricks', desc: 'Share what you learned', icon: <Lightbulb className="w-5 h-5" />, emoji: '💡' },
  { value: 'show-work', label: 'Show Your Work', desc: 'Share something you made', icon: <Palette className="w-5 h-5" />, emoji: '🎨' },
];

const TITLE_MAX = 120;

export default function NewPostPage() {
  const supabase = createClient();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [isFirstPost, setIsFirstPost] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'wins' | 'questions' | 'tips' | 'show-work'>('wins');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const { count } = await supabase.from('forum_posts').select('id', { count: 'exact', head: true }).eq('user_id', user.id);
      setIsFirstPost((count ?? 0) === 0);
    })();
  }, []);

  const submit = async () => {
    if (!title.trim() || !content.trim() || !userId) return;
    setSubmitting(true);
    setError('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error: err } = await (supabase as any).from('forum_posts')
      .insert({ user_id: userId, title: title.trim(), content: content.trim(), category, pinned: false })
      .select().single();
    if (err) { setError('Something went wrong. Try again?'); setSubmitting(false); return; }
    router.push(`/dashboard/community/${data.id}`);
  };

  return (
    <div className="space-y-6 max-w-2xl" style={{ fontFamily: 'var(--font-general)' }}>
      {/* Back + Cancel */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <Link href="/dashboard/community" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: 'var(--color-dash-text-muted)' }}>
          <ArrowLeft className="w-4 h-4" />Back to The Campfire
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Start a Conversation</h1>
        <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>Share with the neighbourhood.</p>
      </motion.div>

      {/* First post prompt */}
      {isFirstPost && (
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show"
          className="rounded-xl border p-4 flex items-center gap-3"
          style={{ borderColor: 'rgba(200,121,65,0.3)', backgroundColor: 'var(--color-dash-copper-muted)' }}>
          <Flame className="w-5 h-5 shrink-0" style={{ color: 'var(--color-dash-copper)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--color-dash-copper)' }}>
            Welcome to the campfire! Tell the neighbourhood about your business.
          </p>
        </motion.div>
      )}

      {/* Form */}
      <motion.div custom={isFirstPost ? 3 : 2} variants={fadeUp} initial="hidden" animate="show"
        className="rounded-xl border bg-white p-6 space-y-6" style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>

        {/* Category — clickable cards */}
        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: 'var(--color-dash-text)' }}>What kind of post?</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CATEGORIES.map(cat => (
              <button key={cat.value} onClick={() => setCategory(cat.value)}
                className="p-3.5 rounded-xl text-left transition-all duration-200"
                style={{
                  minHeight: 44,
                  border: `1.5px solid ${category === cat.value ? 'var(--color-dash-copper)' : 'var(--color-dash-border)'}`,
                  backgroundColor: category === cat.value ? 'var(--color-dash-copper-muted)' : 'white',
                  boxShadow: category === cat.value ? '0 2px 8px rgba(200,121,65,0.12)' : 'none',
                }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{cat.emoji}</span>
                  <span className="text-sm font-semibold" style={{ color: category === cat.value ? 'var(--color-dash-copper)' : 'var(--color-dash-text)' }}>
                    {cat.label}
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Title with character counter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium" style={{ color: 'var(--color-dash-text)' }}>Title</label>
            <span className="text-xs tabular-nums" style={{ color: title.length > TITLE_MAX ? '#C0392B' : 'var(--color-dash-text-faint)' }}>
              {title.length}/{TITLE_MAX}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={e => { if (e.target.value.length <= TITLE_MAX) setTitle(e.target.value); }}
            placeholder="What's on your mind?"
            className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties}
          />
        </div>

        {/* Content with markdown hint */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dash-text)' }}>Your post</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share the details…"
            rows={8}
            className="w-full px-4 py-3 rounded-lg border text-sm resize-none focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties}
          />
          <p className="text-xs mt-1.5" style={{ color: 'var(--color-dash-text-faint)' }}>
            Tip: Use **bold** and *italic* for emphasis.
          </p>
        </div>

        {error && <p className="text-sm" style={{ color: 'var(--color-dash-alert, #C0392B)' }}>{error}</p>}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={submit}
            disabled={submitting || !title.trim() || !content.trim()}
            className="flex-1 py-3 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
            style={{ backgroundColor: 'var(--color-dash-copper)', minHeight: 44 }}>
            {submitting ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Posting…</>
            ) : (
              <>Post to the Campfire 🔥</>
            )}
          </button>
          <Link href="/dashboard/community"
            className="px-5 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
            style={{ color: 'var(--color-dash-text-muted)', border: '1px solid var(--color-dash-border)', minHeight: 44 }}>
            Cancel
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
