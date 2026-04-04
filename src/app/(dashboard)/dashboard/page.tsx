'use client';

import { motion, type Variants } from 'framer-motion';
import { BarChart2, TrendingUp, Ticket, BookOpen, Users, Lightbulb, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

// Seasonal + time-based greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  const month = new Date().getMonth();
  const timeWord = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const seasonal =
    month >= 11 || month <= 1 ? "The fire's on. Trails are quiet." :
    month >= 2 && month <= 4 ? "Snow's melting. Trails are waking up." :
    month >= 5 && month <= 7 ? "Coffee's on, trails are clear." :
    "Leaves are turning. Good time to build.";
  return `${timeWord}. ${seasonal}`;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

type Guide = { id: string; title: string; slug: string; excerpt: string; category: string; read_time_minutes: number; created_at: string };
type CommunityPost = { id: string; title: string; content: string; created_at: string; profiles: { business_name: string } | null };
type InProgressGuide = { guide_id: string; progress_percent: number; guides: Guide | null };

function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const days = Math.floor(diff / 86400);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
}

export default function DashboardPage() {
  const supabase = createClient();
  const greeting = getGreeting();

  const [businessName, setBusinessName] = useState('Your Business');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [trailProgress, setTrailProgress] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [inProgressGuide, setInProgressGuide] = useState<InProgressGuide | null>(null);
  const [freshGuides, setFreshGuides] = useState<Guide[]>([]);
  const [communityWins, setCommunityWins] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = supabase as any;
      const [
        { data: profileData },
        { data: ticketData },
        { data: progressData },
        { data: totalGuidesData },
        { data: inProgressData },
        { data: freshData },
        { data: winsData },
      ] = await Promise.all([
        sb.from('profiles').select('business_name, website_url').eq('id', user.id).single(),
        sb.from('tickets').select('id').eq('user_id', user.id).neq('status', 'resolved'),
        sb.from('user_guide_progress').select('completed').eq('user_id', user.id).eq('completed', true),
        sb.from('guides').select('id').eq('published', true),
        sb.from('user_guide_progress')
          .select('guide_id, progress_percent, guides(id, title, slug, excerpt, category, read_time_minutes, created_at)')
          .eq('user_id', user.id).eq('completed', false).gt('progress_percent', 0)
          .order('created_at', { ascending: false }).limit(1).single(),
        sb.from('guides').select('id, title, slug, excerpt, category, read_time_minutes, created_at').eq('published', true).order('created_at', { ascending: false }).limit(3),
        sb.from('forum_posts')
          .select('id, title, content, created_at, profiles(business_name)')
          .eq('category', 'wins').order('created_at', { ascending: false }).limit(3),
      ]);

      if (profileData) {
        const pd = profileData as { business_name?: string | null; website_url?: string | null };
        setBusinessName(pd.business_name ?? 'Your Business');
        setWebsiteUrl(pd.website_url ?? '');
      }

      const completedCount = progressData?.length ?? 0;
      const totalCount = (totalGuidesData as unknown as { length?: number })?.length ?? 0;
      setTrailProgress(totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0);

      setOpenTickets((ticketData as unknown as { length?: number })?.length ?? 0);
      if (inProgressData && !('error' in inProgressData)) setInProgressGuide(inProgressData as unknown as InProgressGuide);
      setFreshGuides(freshData ?? []);
      setCommunityWins((winsData ?? []) as unknown as CommunityPost[]);
      setLoading(false);
    })();
  }, []);

  const statCards = [
    { label: 'Site Score', value: '87', unit: '/100', icon: BarChart2, color: 'var(--color-forest)' },
    { label: 'Trail Progress', value: String(trailProgress), unit: '%', icon: TrendingUp, color: 'var(--color-dash-copper)' },
    { label: 'Open Tickets', value: String(openTickets), unit: '', icon: Ticket, color: 'var(--color-river)' },
  ];

  return (
    <div className="space-y-8" style={{ fontFamily: 'var(--font-general)' }}>
      {/* Header */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--color-dash-text-faint)' }}>{greeting}</p>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              {loading ? 'Loading...' : businessName}
            </h1>
          </div>
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: 'var(--color-dash-copper)' }}>
              {websiteUrl.replace(/^https?:\/\//, '')}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map(({ label, value, unit, icon: Icon, color }, i) => (
          <motion.div key={label} custom={i + 1} variants={fadeUp} initial="hidden" animate="show"
            className="rounded-xl p-5 border bg-white transition-all duration-150 cursor-default"
            style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-dash-copper)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-dash-border)')}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-dash-text-faint)' }}>{label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              {loading ? '—' : value}<span className="text-lg font-normal" style={{ color: 'var(--color-dash-text-faint)' }}>{unit}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Continue Reading */}
      <motion.section custom={4} variants={fadeUp} initial="hidden" animate="show">
        <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Continue Reading</h2>
        {inProgressGuide?.guides ? (
          <Link href={`/dashboard/guides/${inProgressGuide.guides.slug}`}
            className="block rounded-xl border bg-white p-5 transition-all duration-150"
            style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-dash-copper)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-dash-border)')}>
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--color-dash-copper)' }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-dash-text)' }}>{inProgressGuide.guides.title}</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${inProgressGuide.progress_percent}%`, backgroundColor: 'var(--color-dash-copper)' }} />
                </div>
                <p className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>{inProgressGuide.progress_percent}% complete</p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="rounded-xl border bg-white p-8 text-center" style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <BookOpen className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--color-dash-text-faint)' }} />
            <p className="text-sm italic" style={{ color: 'var(--color-dash-text-muted)' }}>Every trail starts with a single step.</p>
            <Link href="/dashboard/trailhead" className="inline-block mt-4 text-sm font-medium hover:underline" style={{ color: 'var(--color-dash-copper)' }}>
              Start the Trailhead →
            </Link>
          </div>
        )}
      </motion.section>

      {/* Fresh from Brett */}
      <motion.section custom={5} variants={fadeUp} initial="hidden" animate="show">
        <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Fresh from Brett</h2>
        {freshGuides.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-center" style={{ borderColor: 'var(--color-dash-border)' }}>
            <p className="text-sm italic" style={{ color: 'var(--color-dash-text-muted)' }}>Brett&apos;s cooking up new guides. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {freshGuides.map(guide => (
              <Link key={guide.id} href={`/dashboard/guides/${guide.slug}`}
                className="block rounded-xl border bg-white p-4 flex items-start justify-between gap-4 transition-all duration-150"
                style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-dash-copper)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-dash-border)')}>
                <div>
                  <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 capitalize"
                    style={{ backgroundColor: 'var(--color-dash-copper-muted)', color: 'var(--color-dash-copper)' }}>
                    {guide.category.replace('-', ' ')}
                  </span>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-dash-text)' }}>{guide.title}</p>
                </div>
                <span className="text-xs shrink-0 mt-1" style={{ color: 'var(--color-dash-text-faint)' }}>{timeAgo(guide.created_at)}</span>
              </Link>
            ))}
          </div>
        )}
      </motion.section>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Community Wins */}
        <motion.section custom={6} variants={fadeUp} initial="hidden" animate="show">
          <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Community Wins</h2>
          {communityWins.length === 0 ? (
            <div className="rounded-xl border bg-white p-8 text-center h-40 flex flex-col items-center justify-center" style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <Users className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--color-dash-text-faint)' }} />
              <p className="text-sm italic" style={{ color: 'var(--color-dash-text-muted)' }}>The campfire&apos;s ready. Be the first to share.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {communityWins.map(post => (
                <Link key={post.id} href={`/dashboard/community/${post.id}`}
                  className="block rounded-xl border bg-white p-3 transition-all duration-150"
                  style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-dash-copper)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-dash-border)')}>
                  <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--color-dash-copper)' }}>🏆 {post.profiles?.business_name ?? 'A neighbour'}</p>
                  <p className="text-sm font-medium line-clamp-1" style={{ color: 'var(--color-dash-text)' }}>{post.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-dash-text-faint)' }}>{timeAgo(post.created_at)}</p>
                </Link>
              ))}
            </div>
          )}
        </motion.section>

        {/* Tip of the Day */}
        <motion.section custom={7} variants={fadeUp} initial="hidden" animate="show">
          <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Tip of the Day</h2>
          <div className="rounded-xl border bg-white p-5 h-40 flex flex-col justify-between"
            style={{ borderColor: 'var(--color-dash-copper)', borderLeftWidth: '3px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--color-dash-copper)' }} />
              <p className="text-sm" style={{ color: 'var(--color-dash-text)', lineHeight: '1.6' }}>
                Consistency beats perfection. Post once a week and mean it — rather than a month of silence followed by a burst.
              </p>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>From Brett&apos;s playbook</p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
