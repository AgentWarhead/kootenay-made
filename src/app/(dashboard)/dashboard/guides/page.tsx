'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CheckCircle, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Guide {
  id: string
  title: string
  slug: string
  excerpt: string
  category: 'trailhead' | 'quick-wins' | 'deep-dives'
  trailhead_milestone: number | null
  trailhead_order: number | null
  difficulty: 'quick' | 'standard' | 'advanced'
  read_time_minutes: number
  published: boolean
}

const MILESTONE_NAMES: Record<number, string> = {
  1: 'Basecamp',
  2: 'The Forest',
  3: 'The Ridge',
  4: 'The Summit',
  5: 'The Vista',
}

const DIFFICULTY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  quick: { label: 'Quick', icon: '⚡', color: '#C87941' },
  standard: { label: 'Standard', icon: '📖', color: '#4A7C8E' },
  advanced: { label: 'Advanced', icon: '🧠', color: '#7B5EA7' },
}

function GuideCard({ guide, completed }: { guide: Guide; completed?: boolean }) {
  const diff = DIFFICULTY_LABELS[guide.difficulty] ?? DIFFICULTY_LABELS.quick

  return (
    <Link href={`/dashboard/guides/${guide.slug}`}>
      <motion.div
        whileHover={{ scale: 1.015, y: -2 }}
        className="group rounded-2xl border p-4 transition-all duration-200 cursor-pointer"
        style={{
          background: 'var(--color-dash-card)',
          borderColor: completed ? 'rgba(200,121,65,0.3)' : 'var(--color-dash-border)',
        }}
      >
        <div className="flex items-start gap-3">
          {/* Completion indicator */}
          <div
            className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: completed ? 'var(--color-dash-copper)' : 'var(--color-dash-border)' }}
          >
            {completed ? (
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            ) : (
              <BookOpen className="w-3 h-3" style={{ color: 'var(--color-dash-text-faint)' }} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-sm leading-snug mb-1"
              style={{
                fontFamily: 'var(--font-cabinet)',
                color: 'var(--color-dash-text)',
                textDecoration: completed ? 'line-through' : 'none',
                opacity: completed ? 0.6 : 1,
              }}
            >
              {guide.title}
            </h3>
            <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--color-dash-text-muted)' }}>
              {guide.excerpt}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${diff.color}18`, color: diff.color }}
              >
                {diff.icon} {diff.label}
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>
                <Clock className="w-3 h-3" />
                {guide.read_time_minutes} min read
              </span>
            </div>
          </div>

          {/* Arrow */}
          <motion.div
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"
            style={{ color: 'var(--color-dash-copper)' }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
        {title}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: 'var(--color-dash-text-muted)' }}>
        {desc}
      </p>
    </div>
  )
}

const TABS = [
  { id: 'trail', label: 'The Trail', icon: '🗺️' },
  { id: 'quick', label: 'Quick Wins', icon: '⚡' },
  { id: 'deep', label: 'Deep Dives', icon: '🧠' },
] as const

type TabId = typeof TABS[number]['id']

export default function GuidesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('trail')
  const [guides, setGuides] = useState<Guide[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient()

        // Fetch guides and user progress in parallel
        const [{ data: guidesData }, { data: { user } }] = await Promise.all([
          supabase
            .from('guides')
            .select('*')
            .eq('published', true)
            .order('trailhead_milestone')
            .order('trailhead_order'),
          supabase.auth.getUser(),
        ])

        setGuides(guidesData ?? [])

        if (user) {
          const { data: progressData } = await supabase
            .from('user_guide_progress')
            .select('guide_id')
            .eq('user_id', user.id)
            .eq('completed', true)

          setCompletedIds(new Set((progressData ?? []).map((p: { guide_id: string }) => p.guide_id)))
        }
      } catch (e) {
        console.error('Failed to fetch guides', e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const trailGuides = guides.filter(g => g.category === 'trailhead')
  const quickGuides = guides.filter(g => g.category === 'quick-wins')
  const deepGuides = guides.filter(g => g.category === 'deep-dives')

  // Group trail guides by milestone
  const byMilestone = trailGuides.reduce<Record<number, Guide[]>>((acc, g) => {
    const m = g.trailhead_milestone ?? 0
    if (!acc[m]) acc[m] = []
    acc[m].push(g)
    return acc
  }, {})

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-dash-bg)' }}>
      {/* Topo bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.04]" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="topo2" width="100" height="70" patternUnits="userSpaceOnUse">
              <ellipse cx="50" cy="35" rx="44" ry="22" fill="none" stroke="var(--color-dash-copper)" strokeWidth="1" />
              <ellipse cx="50" cy="35" rx="30" ry="14" fill="none" stroke="var(--color-dash-copper)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo2)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📚</span>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              Guides
            </h1>
          </div>
          <p className="text-base" style={{ color: 'var(--color-dash-text-muted)' }}>
            Plain-language guides written for Kootenay business owners. No tech jargon, just useful stuff.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200"
              style={{
                background: activeTab === tab.id ? 'var(--color-dash-copper)' : 'var(--color-dash-card)',
                color: activeTab === tab.id ? 'white' : 'var(--color-dash-text-muted)',
                border: `1px solid ${activeTab === tab.id ? 'var(--color-dash-copper)' : 'var(--color-dash-border)'}`,
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-20"
            >
              <motion.div
                className="w-8 h-8 rounded-full border-2 border-t-transparent"
                style={{ borderColor: 'var(--color-dash-copper)', borderTopColor: 'transparent' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              <p className="mt-4 text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>
                Checking trail conditions...
              </p>
            </motion.div>
          ) : activeTab === 'trail' ? (
            <motion.div
              key="trail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {trailGuides.length === 0 ? (
                <EmptyState
                  icon="🗺️"
                  title="Every trail starts with a single step."
                  desc="Pick your first guide below — Brett's writing the trail guides now. Check back shortly."
                />
              ) : (
                Object.entries(byMilestone)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([milestone, milestoneGuides]) => (
                    <div key={milestone}>
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: 'var(--color-dash-copper)' }}
                        >
                          {milestone}
                        </div>
                        <h2 className="font-semibold text-base" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
                          {MILESTONE_NAMES[Number(milestone)] ?? `Milestone ${milestone}`}
                        </h2>
                      </div>
                      <div className="space-y-3">
                        {milestoneGuides.map((guide, i) => (
                          <motion.div
                            key={guide.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                          >
                            <GuideCard guide={guide} completed={completedIds.has(guide.id)} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))
              )}
            </motion.div>
          ) : activeTab === 'quick' ? (
            <motion.div key="quick" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {quickGuides.length === 0 ? (
                <EmptyState
                  icon="⚡"
                  title="Quick wins coming soon"
                  desc="Short, punchy guides you can action in 5 minutes. Brett's writing them now."
                />
              ) : (
                <div className="space-y-3">
                  {quickGuides.map(g => <GuideCard key={g.id} guide={g} completed={completedIds.has(g.id)} />)}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="deep" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {deepGuides.length === 0 ? (
                <EmptyState
                  icon="🧠"
                  title="Deep dives on the way"
                  desc="Longer reference guides for when you're ready to go further. Coming in the next update."
                />
              ) : (
                <div className="space-y-3">
                  {deepGuides.map(g => <GuideCard key={g.id} guide={g} completed={completedIds.has(g.id)} />)}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
