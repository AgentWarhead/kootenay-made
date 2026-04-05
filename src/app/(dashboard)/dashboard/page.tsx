'use client';

import { motion, type Variants } from 'framer-motion';
import {
  BookOpen,
  Users,
  Lightbulb,
  Mountain,
  TrendingUp,
  Calendar,
  ArrowRight,
  Flag,
  CheckCircle2,
  Compass,
  MapPin,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

/* ═══ Helpers ═══ */

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

function daysSince(dateStr: string | null | undefined): number {
  if (!dateStr) return 0;
  return Math.max(1, Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000));
}

/* ═══ Skeleton Components ═══ */

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`skeleton-copper ${className ?? ''}`} />;
}

function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-xl p-5 dash-card">
      <SkeletonBlock className="h-4 w-1/3 mb-3" />
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock key={i} className={`h-3 mb-2 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
}

/* ═══ Trail Progress Hero (horizontal mountain cross-section) ═══ */

const MILESTONES = [
  { id: 'basecamp', label: 'Basecamp', x: 8 },
  { id: 'forest', label: 'The Forest', x: 28 },
  { id: 'ridge', label: 'The Ridge', x: 50 },
  { id: 'summit', label: 'The Summit', x: 72 },
  { id: 'vista', label: 'The Vista', x: 92 },
];

function TrailProgressHero({
  completedGuides,
  totalGuides,
}: {
  completedGuides: number;
  totalGuides: number;
}) {
  // Determine which milestones are completed based on progress
  const rawPercent = totalGuides > 0 ? (completedGuides / totalGuides) * 100 : 0;
  // Endowed progress: minimum 10%
  const progressPercent = Math.max(10, rawPercent);
  const currentMilestoneIdx = Math.min(
    Math.floor((rawPercent / 100) * MILESTONES.length),
    MILESTONES.length - 1
  );

  return (
    <div className="rounded-xl dash-card p-5 sm:p-7 overflow-hidden">
      {/* Mountain cross-section SVG */}
      <div className="relative w-full" style={{ height: 120 }}>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
          {/* Mountain silhouette */}
          <path
            d="M0,35 L5,30 L12,28 L18,24 L25,20 L32,18 L38,22 L45,16 L52,12 L58,14 L65,10 L72,6 L78,8 L85,12 L92,8 L100,5 L100,40 L0,40 Z"
            fill="var(--color-dash-copper-muted)"
            opacity="0.4"
          />
          {/* Trail path */}
          <path
            d="M4,33 L12,29 L22,25 L32,21 L42,19 L52,14 L62,12 L72,8 L82,10 L92,7"
            fill="none"
            stroke="var(--color-dash-border)"
            strokeWidth="0.5"
            strokeDasharray="2 1.5"
          />
          {/* Completed trail path */}
          <path
            d="M4,33 L12,29 L22,25 L32,21 L42,19 L52,14 L62,12 L72,8 L82,10 L92,7"
            fill="none"
            stroke="var(--color-dash-copper)"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeDasharray="200"
            strokeDashoffset={200 - (progressPercent / 100) * 200}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Milestone markers */}
        {MILESTONES.map((m, i) => {
          const completed = i < currentMilestoneIdx;
          const current = i === currentMilestoneIdx;
          return (
            <div
              key={m.id}
              className="absolute flex flex-col items-center"
              style={{
                left: `${m.x}%`,
                bottom: 6,
                transform: 'translateX(-50%)',
              }}
            >
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ${current ? 'milestone-flag-pulse' : ''}`}
                style={{
                  backgroundColor: completed
                    ? 'var(--color-dash-copper)'
                    : current
                    ? 'var(--color-dash-copper)'
                    : 'var(--color-dash-bg)',
                  border: completed || current ? 'none' : '1.5px dashed var(--color-dash-border)',
                  boxShadow: current ? '0 0 12px rgba(200,121,65,0.3)' : 'none',
                }}
              >
                {completed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                ) : current ? (
                  <Flag className="w-3.5 h-3.5 text-white" />
                ) : (
                  <MapPin className="w-3 h-3" style={{ color: 'var(--color-dash-text-faint)' }} />
                )}
              </div>
              <span
                className="mt-1 text-[9px] sm:text-[10px] font-medium text-center leading-tight hidden sm:block"
                style={{
                  color: completed || current ? 'var(--color-dash-copper)' : 'var(--color-dash-text-faint)',
                  fontFamily: 'var(--font-cabinet)',
                }}
              >
                {m.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar + text */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium" style={{ color: 'var(--color-dash-text-muted)' }}>
            {completedGuides} of {totalGuides} guides completed
          </span>
          <span className="text-xs font-bold" style={{ color: 'var(--color-dash-copper)', fontFamily: 'var(--font-cabinet)' }}>
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--color-dash-border)' }}>
          <div
            className="h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%`, backgroundColor: 'var(--color-dash-copper)' }}
          />
        </div>
        {completedGuides === 0 && (
          <p className="mt-2 text-xs italic" style={{ color: 'var(--color-dash-text-faint)' }}>
            You have already begun your journey.
          </p>
        )}
      </div>
    </div>
  );
}

/* ═══ Mountain Ridgeline SVG ═══ */

function MiniRidgeline() {
  return (
    <svg viewBox="0 0 400 50" preserveAspectRatio="none" className="w-full h-8 sm:h-10 mt-3" aria-hidden="true">
      <path
        d="M0,45 L30,38 L60,40 L90,30 L120,25 L150,28 L180,18 L210,12 L240,15 L270,10 L300,14 L330,20 L360,16 L390,22 L400,20"
        fill="none"
        stroke="var(--color-dash-copper)"
        strokeWidth="1.2"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d="M0,48 L40,42 L80,44 L120,35 L160,32 L200,22 L240,18 L280,20 L320,15 L360,18 L400,12"
        fill="none"
        stroke="var(--color-dash-copper)"
        strokeWidth="0.8"
        opacity="0.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ═══ Main Page ═══ */

export default function DashboardPage() {
  const supabase = createClient();
  const greeting = getGreeting();

  const [businessName, setBusinessName] = useState('Your Business');
  const [memberSince, setMemberSince] = useState<string | null>(null);
  const [trailProgress, setTrailProgress] = useState(0);
  const [completedGuides, setCompletedGuides] = useState(0);
  const [totalGuides, setTotalGuides] = useState(0);
  const [inProgressGuide, setInProgressGuide] = useState<InProgressGuide | null>(null);
  const [nextGuide, setNextGuide] = useState<Guide | null>(null);
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
        { data: progressData },
        { data: totalGuidesData },
        { data: inProgressData },
        { data: freshData },
        { data: winsData },
      ] = await Promise.all([
        sb.from('profiles').select('business_name, website_url, created_at').eq('id', user.id).single(),
        sb.from('user_guide_progress').select('completed, guide_id').eq('user_id', user.id).eq('completed', true),
        sb.from('guides').select('id').eq('published', true),
        sb.from('user_guide_progress')
          .select('guide_id, progress_percent, guides(id, title, slug, excerpt, category, read_time_minutes, created_at)')
          .eq('user_id', user.id).eq('completed', false).gt('progress_percent', 0)
          .order('created_at', { ascending: false }).limit(1).single(),
        sb.from('guides').select('id, title, slug, excerpt, category, read_time_minutes, created_at').eq('published', true).order('created_at', { ascending: false }).limit(5),
        sb.from('forum_posts')
          .select('id, title, content, created_at, profiles(business_name)')
          .eq('category', 'wins').order('created_at', { ascending: false }).limit(3),
      ]);

      if (profileData) {
        const pd = profileData as { business_name?: string | null; website_url?: string | null; created_at?: string | null };
        setBusinessName(pd.business_name ?? 'Your Business');
        setMemberSince(pd.created_at ?? null);
      }

      const completedCount = progressData?.length ?? 0;
      const totalCount = (totalGuidesData as unknown as { length?: number })?.length ?? 0;
      setCompletedGuides(completedCount);
      setTotalGuides(totalCount);
      setTrailProgress(totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0);

      if (inProgressData && !('error' in inProgressData)) setInProgressGuide(inProgressData as unknown as InProgressGuide);

      // Determine next unstarted guide
      const completedIds = new Set((progressData ?? []).map((p: { guide_id: string }) => p.guide_id));
      const inProgressId = inProgressData?.guide_id;
      const allGuides = (freshData ?? []) as Guide[];
      setFreshGuides(allGuides.slice(0, 3));
      const next = allGuides.find(g => !completedIds.has(g.id) && g.id !== inProgressId);
      setNextGuide(next ?? null);

      setCommunityWins((winsData ?? []) as unknown as CommunityPost[]);
      setLoading(false);
    })();
  }, []);

  /* ═══ Render ═══ */

  return (
    <div className="space-y-7" style={{ fontFamily: 'var(--font-general)' }}>

      {/* ── Welcome Section ── */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <p className="text-sm mb-1" style={{ color: 'var(--color-dash-text-faint)' }}>{greeting}</p>
        {loading ? (
          <SkeletonBlock className="h-9 w-64" />
        ) : (
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold"
            style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
          >
            {businessName}
          </h1>
        )}
        <MiniRidgeline />
      </motion.div>

      {/* ── Trail Progress Hero Card ── */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
        {loading ? (
          <div className="rounded-xl dash-card p-5 sm:p-7">
            <SkeletonBlock className="h-24 w-full mb-4" />
            <SkeletonBlock className="h-3 w-48 mb-2" />
            <SkeletonBlock className="h-2 w-full" />
          </div>
        ) : (
          <TrailProgressHero completedGuides={completedGuides} totalGuides={totalGuides} />
        )}
      </motion.div>

      {/* ── Two-Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* LEFT COLUMN (~60%) */}
        <div className="lg:col-span-3 space-y-6">

          {/* Continue Reading */}
          <motion.section custom={2} variants={fadeUp} initial="hidden" animate="show">
            <h2 className="text-base font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              Continue Reading
            </h2>
            {loading ? (
              <SkeletonCard lines={2} />
            ) : inProgressGuide?.guides ? (
              <Link
                href={`/dashboard/guides/${inProgressGuide.guides.slug}`}
                className="block rounded-xl p-5 dash-card group"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}
                  >
                    <BookOpen className="w-5 h-5" style={{ color: 'var(--color-dash-copper)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm mb-1.5" style={{ color: 'var(--color-dash-text)' }}>
                      {inProgressGuide.guides.title}
                    </p>
                    <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'var(--color-dash-border)' }}>
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{ width: `${inProgressGuide.progress_percent}%`, backgroundColor: 'var(--color-dash-copper)' }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <p className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>
                        {inProgressGuide.progress_percent}% complete
                      </p>
                      <span
                        className="text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--color-dash-copper)' }}
                      >
                        Continue <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-xl dash-card p-8 text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: 'var(--color-dash-copper)' }} />
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-dash-text)' }}>
                  Every trail starts with a single step
                </p>
                <p className="text-xs mb-4" style={{ color: 'var(--color-dash-text-faint)' }}>
                  Pick a guide from the Trailhead and start reading.
                </p>
                <Link
                  href="/dashboard/trailhead"
                  className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                  style={{ color: 'var(--color-dash-copper)' }}
                >
                  Start the Trailhead <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </motion.section>

          {/* Recommended Next */}
          <motion.section custom={3} variants={fadeUp} initial="hidden" animate="show">
            <h2 className="text-base font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              Recommended Next
            </h2>
            {loading ? (
              <SkeletonCard lines={2} />
            ) : nextGuide ? (
              <Link
                href={`/dashboard/guides/${nextGuide.slug}`}
                className="block rounded-xl p-5 dash-card group"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(200,121,65,0.08)' }}
                  >
                    <Compass className="w-5 h-5" style={{ color: 'var(--color-dash-copper)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-1.5 capitalize"
                      style={{ backgroundColor: 'var(--color-dash-copper-muted)', color: 'var(--color-dash-copper)' }}
                    >
                      {nextGuide.category.replace('-', ' ')}
                    </span>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--color-dash-text)' }}>
                      {nextGuide.title}
                    </p>
                    <p className="text-xs line-clamp-2" style={{ color: 'var(--color-dash-text-muted)' }}>
                      {nextGuide.excerpt}
                    </p>
                    <span
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: 'var(--color-dash-copper)' }}
                    >
                      Start this guide <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-xl dash-card p-8 text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}
                >
                  <Sparkles className="w-6 h-6" style={{ color: 'var(--color-dash-copper)' }} />
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-dash-text)' }}>
                  New guides are on the way
                </p>
                <p className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>
                  Brett is writing the next chapter of your trail.
                </p>
              </div>
            )}
          </motion.section>

          {/* Fresh from Brett */}
          <motion.section custom={4} variants={fadeUp} initial="hidden" animate="show">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ backgroundColor: 'var(--color-dash-copper)' }}
              >
                B
              </div>
              <h2 className="text-base font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
                Fresh from Brett
              </h2>
            </div>
            {loading ? (
              <div className="space-y-3">
                <SkeletonCard lines={1} />
                <SkeletonCard lines={1} />
              </div>
            ) : freshGuides.length === 0 ? (
              <div className="rounded-xl dash-card p-8 text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: 'var(--color-dash-copper)' }} />
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-dash-text)' }}>
                  Brett&apos;s cooking up new guides
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-dash-text-faint)' }}>
                  Check back soon for fresh trail knowledge.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {freshGuides.map(guide => (
                  <Link
                    key={guide.id}
                    href={`/dashboard/guides/${guide.slug}`}
                    className="flex items-start justify-between gap-4 rounded-xl p-4 dash-card"
                  >
                    <div className="min-w-0">
                      <span
                        className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-1.5 capitalize"
                        style={{ backgroundColor: 'var(--color-dash-copper-muted)', color: 'var(--color-dash-copper)' }}
                      >
                        {guide.category.replace('-', ' ')}
                      </span>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-dash-text)' }}>{guide.title}</p>
                    </div>
                    <span className="text-xs shrink-0 mt-1" style={{ color: 'var(--color-dash-text-faint)' }}>
                      {timeAgo(guide.created_at)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </motion.section>
        </div>

        {/* RIGHT COLUMN (~40%) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Quick Stats */}
          <motion.section custom={2} variants={fadeUp} initial="hidden" animate="show">
            <h2 className="text-base font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              Quick Stats
            </h2>
            <div className="space-y-3">
              {[
                {
                  icon: TrendingUp,
                  label: 'Trail Progress',
                  value: loading ? '—' : `${Math.max(10, trailProgress)}%`,
                },
                {
                  icon: BookOpen,
                  label: 'Guides Completed',
                  value: loading ? '—' : String(completedGuides),
                },
                {
                  icon: Calendar,
                  label: 'Days as Neighbour',
                  value: loading ? '—' : String(daysSince(memberSince)),
                },
              ].map(({ icon: StatIcon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-4 dash-card flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}
                  >
                    <StatIcon className="w-5 h-5" style={{ color: 'var(--color-dash-copper)' }} />
                  </div>
                  <div>
                    <p
                      className="text-xl font-bold leading-none"
                      style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
                    >
                      {value}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-dash-text-faint)' }}>
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Tip of the Day */}
          <motion.section custom={5} variants={fadeUp} initial="hidden" animate="show">
            <h2 className="text-base font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              Tip of the Day
            </h2>
            <div
              className="rounded-xl p-5 relative overflow-hidden"
              style={{
                backgroundColor: 'var(--color-dash-card)',
                border: '1px solid var(--color-dash-border)',
                borderLeft: '3px solid var(--color-dash-copper)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {/* Subtle parchment texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(200,121,65,0.15) 24px, rgba(200,121,65,0.15) 25px)`,
                }}
                aria-hidden="true"
              />
              <div className="relative flex items-start gap-3">
                <Lightbulb className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--color-dash-copper)' }} />
                <div>
                  <p className="text-sm" style={{ color: 'var(--color-dash-text)', lineHeight: '1.6' }}>
                    Consistency beats perfection. Post once a week and mean it — rather than a month of silence followed by a burst.
                  </p>
                  <p className="text-xs mt-3" style={{ color: 'var(--color-dash-text-faint)' }}>
                    From Brett&apos;s playbook
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Community Wins */}
          <motion.section custom={6} variants={fadeUp} initial="hidden" animate="show">
            <h2 className="text-base font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              Community Wins
            </h2>
            {loading ? (
              <SkeletonCard lines={2} />
            ) : communityWins.length === 0 ? (
              <div className="rounded-xl dash-card p-8 text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}
                >
                  <Trophy className="w-6 h-6" style={{ color: 'var(--color-dash-copper)' }} />
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-dash-text)' }}>
                  The campfire&apos;s ready
                </p>
                <p className="text-xs mb-4" style={{ color: 'var(--color-dash-text-faint)' }}>
                  Be the first to share a win with the community.
                </p>
                <Link
                  href="/dashboard/community"
                  className="inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
                  style={{ color: 'var(--color-dash-copper)' }}
                >
                  Share a win <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {communityWins.map(post => (
                  <Link
                    key={post.id}
                    href={`/dashboard/community/${post.id}`}
                    className="block rounded-xl p-3 dash-card"
                  >
                    <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--color-dash-copper)' }}>
                      <Users className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                      {post.profiles?.business_name ?? 'A neighbour'}
                    </p>
                    <p className="text-sm font-medium line-clamp-1" style={{ color: 'var(--color-dash-text)' }}>
                      {post.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-dash-text-faint)' }}>
                      {timeAgo(post.created_at)}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
}
