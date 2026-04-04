'use client';

import { motion, type Variants } from 'framer-motion';
import { BarChart2, TrendingUp, Ticket, BookOpen, Users, Lightbulb, ExternalLink } from 'lucide-react';

// Seasonal + time-based greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  const month = new Date().getMonth(); // 0-indexed

  const timeWord =
    hour < 12 ? 'Good morning' :
    hour < 17 ? 'Good afternoon' :
    'Good evening';

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
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const STAT_CARDS = [
  { label: 'Site Score', value: '87', unit: '/100', icon: BarChart2, color: 'var(--color-forest)' },
  { label: 'Trail Progress', value: '0', unit: '%', icon: TrendingUp, color: 'var(--color-dash-copper)' },
  { label: 'Open Tickets', value: '0', unit: '', icon: Ticket, color: 'var(--color-river)' },
];

const BRETT_ITEMS = [
  { title: "Your First 30 Days — What to Focus On", date: "Just posted", tag: "Strategy" },
  { title: "Why Your Google Business Profile Matters More Than Your Website", date: "2 days ago", tag: "Local SEO" },
  { title: "The Kootenay Content Calendar — Q1 Edition", date: "1 week ago", tag: "Content" },
];

export default function DashboardPage() {
  const greeting = getGreeting();

  return (
    <div className="space-y-8" style={{ fontFamily: 'var(--font-general)' }}>

      {/* Header */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--color-dash-text-faint)' }}>
              {greeting}
            </p>
            <h1
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
            >
              Your Business
            </h1>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: 'var(--color-dash-copper)' }}
          >
            yourwebsite.ca
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STAT_CARDS.map(({ label, value, unit, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="rounded-xl p-5 border bg-white transition-all duration-150 group cursor-default"
            style={{
              borderColor: 'var(--color-dash-border)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-dash-copper)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-dash-border)')}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-dash-text-faint)' }}>
                {label}
              </span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${color}18` }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              {value}<span className="text-lg font-normal" style={{ color: 'var(--color-dash-text-faint)' }}>{unit}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Continue Reading */}
      <motion.section custom={4} variants={fadeUp} initial="hidden" animate="show">
        <h2
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
        >
          Continue Reading
        </h2>
        <div
          className="rounded-xl border bg-white p-8 text-center"
          style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          <BookOpen className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--color-dash-text-faint)' }} />
          <p className="text-sm italic" style={{ color: 'var(--color-dash-text-muted)' }}>
            Every trail starts with a single step.
          </p>
          <a
            href="/dashboard/trailhead"
            className="inline-block mt-4 text-sm font-medium hover:underline"
            style={{ color: 'var(--color-dash-copper)' }}
          >
            Start the Trailhead →
          </a>
        </div>
      </motion.section>

      {/* Fresh from Brett */}
      <motion.section custom={5} variants={fadeUp} initial="hidden" animate="show">
        <h2
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
        >
          Fresh from Brett
        </h2>
        <div className="space-y-3">
          {BRETT_ITEMS.map(({ title, date, tag }) => (
            <div
              key={title}
              className="rounded-xl border bg-white p-4 flex items-start justify-between gap-4 transition-all duration-150 cursor-pointer"
              style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-dash-copper)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-dash-border)')}
            >
              <div>
                <span
                  className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2"
                  style={{
                    backgroundColor: 'var(--color-dash-copper-muted)',
                    color: 'var(--color-dash-copper)',
                  }}
                >
                  {tag}
                </span>
                <p className="text-sm font-medium" style={{ color: 'var(--color-dash-text)' }}>
                  {title}
                </p>
              </div>
              <span className="text-xs shrink-0 mt-1" style={{ color: 'var(--color-dash-text-faint)' }}>
                {date}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Bottom row — Community Wins + Tip of the Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Community Wins */}
        <motion.section custom={6} variants={fadeUp} initial="hidden" animate="show">
          <h2
            className="text-lg font-bold mb-3"
            style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
          >
            Community Wins
          </h2>
          <div
            className="rounded-xl border bg-white p-8 text-center h-40 flex flex-col items-center justify-center"
            style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
          >
            <Users className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--color-dash-text-faint)' }} />
            <p className="text-sm italic" style={{ color: 'var(--color-dash-text-muted)' }}>
              The campfire&apos;s ready.
            </p>
          </div>
        </motion.section>

        {/* Tip of the Day */}
        <motion.section custom={7} variants={fadeUp} initial="hidden" animate="show">
          <h2
            className="text-lg font-bold mb-3"
            style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
          >
            Tip of the Day
          </h2>
          <div
            className="rounded-xl border bg-white p-5 h-40 flex flex-col justify-between"
            style={{
              borderColor: 'var(--color-dash-copper)',
              borderLeftWidth: '3px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--color-dash-copper)' }} />
              <p className="text-sm" style={{ color: 'var(--color-dash-text)', lineHeight: '1.6' }}>
                Consistency beats perfection. Post once a week and mean it — rather than a month of silence followed by a burst.
              </p>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>
              From Brett&apos;s playbook
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
