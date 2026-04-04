'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Play, Bookmark, BookmarkCheck, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

type Video = {
  id: string;
  title: string;
  youtube_url: string;
  thumbnail_url: string | null;
  category: string;
  description: string;
  duration_seconds: number;
  order_index: number;
  published: boolean;
};

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?/\s]{11})/);
  return match ? match[1] : null;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const WATCH_LATER_KEY = 'kmd_watch_later';

function getWatchLater(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try { return new Set(JSON.parse(localStorage.getItem(WATCH_LATER_KEY) ?? '[]')); }
  catch { return new Set(); }
}

function setWatchLater(ids: Set<string>) {
  localStorage.setItem(WATCH_LATER_KEY, JSON.stringify([...ids]));
}

function VideoCard({ video, isBookmarked, onToggleBookmark }: {
  video: Video; isBookmarked: boolean; onToggleBookmark: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const ytId = getYouTubeId(video.youtube_url);
  const thumb = video.thumbnail_url ?? (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

  return (
    <motion.div className="rounded-xl border bg-white overflow-hidden group"
      style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}>
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100 cursor-pointer" onClick={() => setExpanded(e => !e)}>
        {expanded && ytId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <>
            {thumb && <img src={thumb} alt={video.title} className="w-full h-full object-cover" />}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/90 shadow-lg">
                <Play className="w-5 h-5 ml-0.5" style={{ color: 'var(--color-dash-copper)' }} />
              </div>
            </div>
            {video.duration_seconds > 0 && (
              <span className="absolute bottom-2 right-2 text-xs font-medium px-1.5 py-0.5 rounded bg-black/70 text-white">
                {formatDuration(video.duration_seconds)}
              </span>
            )}
          </>
        )}
        {expanded && (
          <button onClick={e => { e.stopPropagation(); setExpanded(false); }}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-1"
              style={{ backgroundColor: 'var(--color-dash-copper-muted)', color: 'var(--color-dash-copper)' }}>
              {video.category}
            </span>
            <h3 className="font-semibold text-sm leading-snug" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              {video.title}
            </h3>
          </div>
          <button
            onClick={() => onToggleBookmark(video.id)}
            className="shrink-0 p-2 rounded-lg transition-colors hover:bg-gray-100"
            style={{ minWidth: 44, minHeight: 44, color: isBookmarked ? 'var(--color-dash-copper)' : 'var(--color-dash-text-faint)' }}
            title={isBookmarked ? 'Remove from Watch Later' : 'Save to Watch Later'}>
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
        {video.description && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--color-dash-text-muted)' }}>{video.description}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function VideosPage() {
  const supabase = createClient();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  useEffect(() => {
    setBookmarked(getWatchLater());
    (async () => {
      const { data } = await supabase.from('videos').select('*').eq('published', true).order('order_index');
      setVideos(data ?? []);
      setLoading(false);
    })();
  }, []);

  const categories = ['all', ...Array.from(new Set(videos.map(v => v.category)))];
  const filtered = activeCategory === 'all' ? videos : videos.filter(v => v.category === activeCategory);

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      setWatchLater(next);
      return next;
    });
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'var(--font-general)' }}>
      {/* Header */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Video Library 🎬</h1>
        <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>Practical guides from Brett, ready to watch anytime.</p>
      </motion.div>

      {/* Category pills */}
      {!loading && videos.length > 0 && (
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="flex gap-2 overflow-x-auto pb-1 -mb-1 no-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 capitalize"
              style={{
                minHeight: 44,
                backgroundColor: activeCategory === cat ? 'var(--color-dash-copper)' : 'white',
                color: activeCategory === cat ? 'white' : 'var(--color-dash-text-muted)',
                border: `1px solid ${activeCategory === cat ? 'var(--color-dash-copper)' : 'var(--color-dash-border)'}`,
              }}>
              {cat === 'all' ? 'All Videos' : cat}
            </button>
          ))}
        </motion.div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="aspect-video rounded-xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show"
          className="rounded-xl border bg-white p-16 text-center" style={{ borderColor: 'var(--color-dash-border)' }}>
          <p className="text-4xl mb-4">🎬</p>
          <p className="font-medium mb-1" style={{ color: 'var(--color-dash-text)' }}>Videos are on their way.</p>
          <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>Check back soon — Brett&apos;s been busy with the camera.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((video, i) => (
            <motion.div key={video.id} custom={i + 2} variants={fadeUp} initial="hidden" animate="show">
              <VideoCard video={video} isBookmarked={bookmarked.has(video.id)} onToggleBookmark={toggleBookmark} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
