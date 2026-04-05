'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  ArrowRight,
  Clock,
  Tent,
  TreePine,
  Mountain,
  Flag,
  Telescope,
  Users,
  Circle,
} from 'lucide-react'
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

const MILESTONES = [
  { num: 1, name: 'Basecamp', icon: Tent, desc: 'Getting started — the essentials' },
  { num: 2, name: 'The Forest', icon: TreePine, desc: 'Growing your roots online' },
  { num: 3, name: 'The Ridge', icon: Mountain, desc: 'Building momentum' },
  { num: 4, name: 'The Summit', icon: Flag, desc: 'Advanced strategies' },
  { num: 5, name: 'The Vista', icon: Telescope, desc: 'Mastering your digital presence' },
] as const

const DIFFICULTY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  quick: { label: 'Quick', icon: '⚡', color: '#C87941' },
  standard: { label: 'Standard', icon: '📖', color: '#4A7C8E' },
  advanced: { label: 'Advanced', icon: '🧠', color: '#7B5EA7' },
}

/* ─── Trail Map SVG ─── */
function TrailMap({
  milestoneStatus,
  onMilestoneClick,
}: {
  milestoneStatus: Record<number, 'completed' | 'current' | 'future'>
  onMilestoneClick: (num: number) => void
}) {
  // Positions for 5 milestones spread across the SVG
  const points = [
    { x: 60, y: 50 },
    { x: 210, y: 35 },
    { x: 380, y: 55 },
    { x: 550, y: 30 },
    { x: 720, y: 50 },
  ]

  // Build trail path through all points with gentle curves
  const pathSegments: string[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i]
    const p2 = points[i + 1]
    const cx1 = p1.x + (p2.x - p1.x) * 0.4
    const cy1 = p1.y
    const cx2 = p1.x + (p2.x - p1.x) * 0.6
    const cy2 = p2.y
    if (i === 0) pathSegments.push(`M ${p1.x} ${p1.y}`)
    pathSegments.push(`C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p2.x} ${p2.y}`)
  }
  const fullPath = pathSegments.join(' ')

  return (
    <div className="w-full overflow-x-auto pb-2 -mx-4 px-4">
      <svg viewBox="0 0 780 90" className="w-full min-w-[600px]" style={{ height: 90 }}>
        {/* Full trail line - grey dashed background */}
        <path d={fullPath} fill="none" stroke="var(--color-dash-border)" strokeWidth="3" strokeDasharray="8 6" />

        {/* Completed trail line segments */}
        {points.map((_, i) => {
          if (i >= points.length - 1) return null
          const status = milestoneStatus[i + 1]
          if (status !== 'completed') return null
          const p1 = points[i]
          const p2 = points[i + 1]
          const cx1 = p1.x + (p2.x - p1.x) * 0.4
          const cy1 = p1.y
          const cx2 = p1.x + (p2.x - p1.x) * 0.6
          const cy2 = p2.y
          return (
            <motion.path
              key={`seg-${i}`}
              d={`M ${p1.x} ${p1.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p2.x} ${p2.y}`}
              fill="none"
              stroke="var(--color-dash-copper)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            />
          )
        })}

        {/* Milestone markers */}
        {points.map((pt, i) => {
          const m = MILESTONES[i]
          const status = milestoneStatus[m.num]
          const isCompleted = status === 'completed'
          const isCurrent = status === 'current'
          return (
            <g key={m.num} style={{ cursor: 'pointer' }} onClick={() => onMilestoneClick(m.num)}>
              {/* Pulse ring for current */}
              {isCurrent && (
                <motion.circle
                  cx={pt.x}
                  cy={pt.y}
                  r={18}
                  fill="none"
                  stroke="var(--color-dash-copper)"
                  strokeWidth="2"
                  initial={{ opacity: 0.6, r: 14 }}
                  animate={{ opacity: 0, r: 22 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {/* Marker circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={14}
                fill={isCompleted ? 'var(--color-dash-copper)' : isCurrent ? 'var(--color-dash-copper)' : 'var(--color-dash-bg)'}
                stroke={isCompleted || isCurrent ? 'var(--color-dash-copper)' : 'var(--color-dash-border)'}
                strokeWidth={isCompleted || isCurrent ? 2 : 2}
                strokeDasharray={!isCompleted && !isCurrent ? '4 3' : 'none'}
              />
              {/* Check for completed */}
              {isCompleted && (
                <text
                  x={pt.x}
                  y={pt.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  ✓
                </text>
              )}
              {/* Number for current/future */}
              {!isCompleted && (
                <text
                  x={pt.x}
                  y={pt.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isCurrent ? 'white' : 'var(--color-dash-text-faint)'}
                  fontSize="11"
                  fontWeight="600"
                >
                  {m.num}
                </text>
              )}
              {/* Label below */}
              <text
                x={pt.x}
                y={pt.y + 30}
                textAnchor="middle"
                fill={isCompleted || isCurrent ? 'var(--color-dash-text)' : 'var(--color-dash-text-faint)'}
                fontSize="10"
                fontWeight={isCurrent ? '600' : '400'}
                fontFamily="var(--font-cabinet)"
              >
                {m.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ─── Guide Card ─── */
function GuideCard({ guide, completed }: { guide: Guide; completed?: boolean }) {
  const diff = DIFFICULTY_LABELS[guide.difficulty] ?? DIFFICULTY_LABELS.quick

  return (
    <Link href={`/dashboard/guides/${guide.slug}`}>
      <motion.div
        whileHover={{ y: -2 }}
        className="group rounded-2xl border p-4 transition-all duration-200 cursor-pointer"
        style={{
          background: 'var(--color-dash-card)',
          borderColor: completed ? 'rgba(200,121,65,0.3)' : 'var(--color-dash-border)',
          boxShadow: 'none',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 1px rgba(200,121,65,0.3), 0 4px 12px rgba(200,121,65,0.08)'
          ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,121,65,0.4)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
          ;(e.currentTarget as HTMLDivElement).style.borderColor = completed ? 'rgba(200,121,65,0.3)' : 'var(--color-dash-border)'
        }}
      >
        <div className="flex items-center gap-3">
          {/* Completion indicator */}
          <div className="flex-shrink-0">
            {completed ? (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'var(--color-dash-copper)' }}
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            ) : (
              <Circle className="w-7 h-7" style={{ color: 'var(--color-dash-border)' }} strokeWidth={1.5} />
            )}
          </div>

          {/* Center content */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-sm leading-snug mb-1"
              style={{
                fontFamily: 'var(--font-cabinet)',
                color: 'var(--color-dash-text)',
                opacity: completed ? 0.6 : 1,
              }}
            >
              {guide.title}
            </h3>
            <p
              className="text-xs leading-relaxed mb-2 line-clamp-2"
              style={{ color: 'var(--color-dash-text-muted)' }}
            >
              {guide.excerpt}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${diff.color}18`, color: diff.color }}
              >
                {diff.icon} {diff.label}
              </span>
              <span
                className="flex items-center gap-1 text-xs"
                style={{ color: 'var(--color-dash-text-faint)' }}
              >
                <Clock className="w-3 h-3" />
                {guide.read_time_minutes} min
              </span>
              <span
                className="flex items-center gap-1 text-xs"
                style={{ color: 'var(--color-dash-text-faint)' }}
              >
                <Users className="w-3 h-3" />
                12 neighbours completed this
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-dash-copper)' }}
          >
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

/* ─── Empty Milestone State ─── */
function EmptyMilestoneState({ name }: { name: string }) {
  return (
    <div
      className="rounded-2xl border border-dashed py-10 px-6 text-center"
      style={{ borderColor: 'var(--color-dash-border)', background: 'rgba(255,255,255,0.5)' }}
    >
      <div className="text-3xl mb-3 opacity-30">🏔️</div>
      <p className="text-sm" style={{ color: 'var(--color-dash-text-faint)' }}>
        New guides coming soon to <strong style={{ color: 'var(--color-dash-text-muted)' }}>{name}</strong>
      </p>
    </div>
  )
}

/* ─── Generic Empty State ─── */
function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3
        className="font-semibold text-lg mb-2"
        style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
      >
        {title}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: 'var(--color-dash-text-muted)' }}>
        {desc}
      </p>
    </div>
  )
}

/* ─── Tabs ─── */
const TABS = [
  { id: 'trail', label: 'The Trail', icon: '🗺️' },
  { id: 'quick', label: 'Quick Wins', icon: '⚡' },
  { id: 'deep', label: 'Deep Dives', icon: '🧠' },
] as const

type TabId = (typeof TABS)[number]['id']

/* ─── Page ─── */
export default function GuidesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('trail')
  const [guides, setGuides] = useState<Guide[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const milestoneRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const setMilestoneRef = useCallback((num: number) => (el: HTMLDivElement | null) => {
    milestoneRefs.current[num] = el
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient()
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

  const trailGuides = guides.filter((g) => g.category === 'trailhead')
  const quickGuides = guides.filter((g) => g.category === 'quick-wins')
  const deepGuides = guides.filter((g) => g.category === 'deep-dives')

  // Group trail guides by milestone
  const byMilestone = trailGuides.reduce<Record<number, Guide[]>>((acc, g) => {
    const m = g.trailhead_milestone ?? 0
    if (!acc[m]) acc[m] = []
    acc[m].push(g)
    return acc
  }, {})

  // Determine milestone completion status
  const milestoneStatus: Record<number, 'completed' | 'current' | 'future'> = {}
  let foundCurrent = false
  for (const m of MILESTONES) {
    const mGuides = byMilestone[m.num] ?? []
    const allDone = mGuides.length > 0 && mGuides.every((g) => completedIds.has(g.id))
    if (allDone && !foundCurrent) {
      milestoneStatus[m.num] = 'completed'
    } else if (!foundCurrent) {
      milestoneStatus[m.num] = 'current'
      foundCurrent = true
    } else {
      milestoneStatus[m.num] = 'future'
    }
  }

  // Overall progress
  const totalGuides = guides.length
  const completedCount = guides.filter((g) => completedIds.has(g.id)).length
  const progressPercent = totalGuides > 0 ? (completedCount / totalGuides) * 100 : 0

  function scrollToMilestone(num: number) {
    setActiveTab('trail')
    setTimeout(() => {
      milestoneRefs.current[num]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-dash-bg)' }}>
      {/* Topo bg */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.04]"
        style={{ zIndex: 0 }}
      >
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
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📚</span>
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
            >
              Guides
            </h1>
          </div>
          <p className="text-base" style={{ color: 'var(--color-dash-text-muted)' }}>
            Plain-language guides written for Kootenay business owners. No tech jargon, just useful stuff.
          </p>
        </motion.div>

        {/* Overall Progress */}
        {!loading && totalGuides > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium" style={{ color: 'var(--color-dash-text-muted)' }}>
                {completedCount} of {totalGuides} guides completed
              </span>
              <span className="text-xs font-semibold" style={{ color: 'var(--color-dash-copper)' }}>
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ background: 'var(--color-dash-border)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--color-dash-copper)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}

        {/* Trail Map */}
        {!loading && activeTab === 'trail' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border p-4 mb-8"
            style={{ background: 'var(--color-dash-card)', borderColor: 'var(--color-dash-border)' }}
          >
            <TrailMap milestoneStatus={milestoneStatus} onMilestoneClick={scrollToMilestone} />
          </motion.div>
        )}

        {/* Tabs — pill buttons */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200"
                style={{
                  background: isActive ? 'var(--color-dash-copper)' : 'transparent',
                  color: isActive ? 'white' : 'var(--color-dash-text-muted)',
                  border: `1.5px solid ${isActive ? 'var(--color-dash-copper)' : 'var(--color-dash-border)'}`,
                  minHeight: '44px',
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
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
              className="space-y-10"
            >
              {trailGuides.length === 0 ? (
                <EmptyState
                  icon="🗺️"
                  title="Every trail starts with a single step."
                  desc="Pick your first guide below — Brett's writing the trail guides now. Check back shortly."
                />
              ) : (
                MILESTONES.map((m) => {
                  const Icon = m.icon
                  const mGuides = byMilestone[m.num] ?? []
                  const status = milestoneStatus[m.num]
                  return (
                    <motion.div
                      key={m.num}
                      ref={setMilestoneRef(m.num)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: m.num * 0.1 }}
                      style={{ scrollMarginTop: '80px' }}
                    >
                      {/* Milestone header */}
                      <div className="flex items-center gap-3 mb-1.5">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background:
                              status === 'completed'
                                ? 'var(--color-dash-copper)'
                                : status === 'current'
                                  ? 'rgba(200,121,65,0.15)'
                                  : 'var(--color-dash-border)',
                          }}
                        >
                          <Icon
                            className="w-4.5 h-4.5"
                            style={{
                              color:
                                status === 'completed'
                                  ? 'white'
                                  : status === 'current'
                                    ? 'var(--color-dash-copper)'
                                    : 'var(--color-dash-text-faint)',
                              width: 18,
                              height: 18,
                            }}
                          />
                        </div>
                        <div>
                          <h2
                            className="font-semibold text-base leading-tight"
                            style={{
                              fontFamily: 'var(--font-cabinet)',
                              color: 'var(--color-dash-text)',
                            }}
                          >
                            {m.name}
                          </h2>
                          <p className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>
                            {m.desc}
                          </p>
                        </div>
                      </div>

                      {/* Guide cards */}
                      {mGuides.length > 0 ? (
                        <div className="space-y-3 mt-3">
                          {mGuides.map((guide, i) => (
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
                      ) : (
                        <div className="mt-3">
                          <EmptyMilestoneState name={m.name} />
                        </div>
                      )}
                    </motion.div>
                  )
                })
              )}
            </motion.div>
          ) : activeTab === 'quick' ? (
            <motion.div
              key="quick"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {quickGuides.length === 0 ? (
                <EmptyState
                  icon="⚡"
                  title="Quick wins coming soon"
                  desc="Short, punchy guides you can action in 5 minutes. Brett's writing them now."
                />
              ) : (
                <div className="space-y-3">
                  {quickGuides.map((g) => (
                    <GuideCard key={g.id} guide={g} completed={completedIds.has(g.id)} />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="deep"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {deepGuides.length === 0 ? (
                <EmptyState
                  icon="🧠"
                  title="Deep dives on the way"
                  desc="Longer reference guides for when you're ready to go further. Coming in the next update."
                />
              ) : (
                <div className="space-y-3">
                  {deepGuides.map((g) => (
                    <GuideCard key={g.id} guide={g} completed={completedIds.has(g.id)} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
