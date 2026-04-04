'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft, Flame } from 'lucide-react';
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

const CATEGORIES: { value: 'wins' | 'questions' | 'tips' | 'show-work'; label: string }[] = [
  { value: 'wins', label: '🏆 Wins & Milestones' },
  { value: 'questions', label: '❓ Questions' },
  { value: 'tips', label: '💡 Tips & Tricks' },
  { value: 'show-work', label: '📸 Show Your Work' },
];

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
      {/* Back */}
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
            Tell the neighbourhood about your business! 👋
          </p>
        </motion.div>
      )}

      {/* Form */}
      <motion.div custom={isFirstPost ? 3 : 2} variants={fadeUp} initial="hidden" animate="show"
        className="rounded-xl border bg-white p-6 space-y-5" style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dash-text)' }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dash-text)' }}>Category</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat.value} onClick={() => setCategory(cat.value)}
                className="px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all"
                style={{
                  minHeight: 44,
                  backgroundColor: category === cat.value ? 'var(--color-dash-copper)' : 'white',
                  color: category === cat.value ? 'white' : 'var(--color-dash-text-muted)',
                  border: `1px solid ${category === cat.value ? 'var(--color-dash-copper)' : 'var(--color-dash-border)'}`,
                }}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dash-text)' }}>Your post</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share the details..."
            rows={8}
            className="w-full px-4 py-3 rounded-lg border text-sm resize-none focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties}
          />
        </div>

        {error && <p className="text-sm" style={{ color: 'var(--color-dash-alert, #C0392B)' }}>{error}</p>}

        <button
          onClick={submit}
          disabled={submitting || !title.trim() || !content.trim()}
          className="w-full py-3 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
          style={{ backgroundColor: 'var(--color-dash-copper)', minHeight: 44 }}>
          {submitting ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Posting...</>
          ) : (
            <><Flame className="w-4 h-4" />Post to The Campfire</>
          )}
        </button>
      </motion.div>
    </div>
  );
}
