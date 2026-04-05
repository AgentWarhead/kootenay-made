'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Tent, Trees, Mountain, Flag, Sunrise,
  CheckCircle, Lock, ChevronDown, BookOpen, Map,
} from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

interface Guide {
  id: string
  title: string
  slug: string
  trailhead_milestone: number | null
}

interface Milestone {
  id: number
  name: string
  subtitle: string
  icon: React.ElementType
  guides: Guide[]
  motivationalQuote: string
}

const MILESTONE_META: Omit<Milestone, 'guides'>[] = [
  { id: 1, name: 'Basecamp', subtitle: 'Claim Your Online Identity', icon: Tent, motivationalQuote: 'Every great journey starts with a single step.' },
  { id: 2, name: 'The Forest', subtitle: 'Make Your Website Work For You', icon: Trees, motivationalQuote: 'Keep climbing. The view gets better.' },
  { id: 3, name: 'The Ridge', subtitle: 'Get Found by Customers', icon: Mountain, motivationalQuote: 'You can see the summit from here.' },
  { id: 4, name: 'The Summit', subtitle: 'Turn Visitors Into Customers', icon: Flag, motivationalQuote: 'Almost there. The air is clearer up here.' },
  { id: 5, name: 'The Vista', subtitle: 'Grow & Scale', icon: Sunrise, motivationalQuote: 'Look how far you have come.' },
]

function MilestoneNode({
  milestone, index, totalMilestones, expanded, onToggle, completedIds, progressPercent, currentMilestoneId, previousComplete,
}: {
  milestone: Milestone
  index: number
  totalMilestones: number
  expanded: boolean
  onToggle: () => void
  completedIds: Set<string>
  progressPercent: number
  currentMilestoneId: number
  previousComplete: boolean
}) {
  const isComplete = progressPercent === 100
  const isCurrent = milestone.id === currentMilestoneId
  const isLocked = !isComplete && !isCurrent && !previousComplete && milestone.id !== 1
  const Icon = milestone.icon

  return (
    <div className="relative">
      {/* Vertical connector line */}
      {index < totalMilestones - 1 && (
        <div
          className="absolute left-6 top-[3.5rem] w-0.5 -bottom-4 z-0"
          style={{
            background: isComplete
              ? 'var(--color-dash-copper)'
              : 'var(--color-dash-border)',
          }}
        />
      )}

      <div className="relative z-10 flex gap-4">
        {/* Circle marker */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center border-2 relative"
            style={{
              borderColor: isComplete
                ? 'var(--color-dash-copper)'
                : isCurrent
                ? 'var(--color-dash-copper)'
                : isLocked
                ? 'var(--color-dash-border)'
                : 'var(--color-dash-border)',
              backgroundColor: isComplete
                ? 'var(--color-dash-copper)'
                : 'var(--color-dash-card)',
            }}
          >
            {isComplete ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : isLocked ? (
              <Lock className="w-4 h-4" style={{ color: 'var(--color-dash-text-faint)' }} />
            ) : (
              <Icon className="w-5 h-5" style={{ color: isCurrent ? 'var(--color-dash-copper)' : 'var(--color-dash-text-faint)' }} />
            )}

            {/* Pulsing border for current milestone */}
            {isCurrent && !isComplete && (
              <motion.div
                className="absolute inset-[-3px] rounded-full pointer-events-none"
                style={{ border: '2px solid var(--color-dash-copper)' }}
                animate={{ opacity: [0, 0.5, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.div>
        </div>

        {/* Card content */}
        <motion.div
          className={`flex-1 rounded-xl border overflow-hidden transition-all duration-200 ${isLocked ? 'opacity-50' : 'cursor-pointer'}`}
          style={{
            backgroundColor: 'var(--color-dash-card)',
            borderColor: isCurrent ? 'rgba(200,121,65,0.4)' : isComplete ? 'var(--color-dash-copper)' : 'var(--color-dash-border)',
            boxShadow: isCurrent ? '0 2px 12px rgba(200,121,65,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
          }}
          whileHover={!isLocked ? { y: -2, borderColor: '#C87941', boxShadow: '0 4px 16px rgba(200,121,65,0.12)' } : {}}
          onClick={!isLocked ? onToggle : undefined}
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-base" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
                    {milestone.name}
                  </h3>
                  {isCurrent && !isComplete && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: 'rgba(200,121,65,0.12)', color: 'var(--color-dash-copper)' }}>
                      You are here
                    </span>
                  )}
                  {isComplete && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: 'rgba(200,121,65,0.12)', color: 'var(--color-dash-copper)' }}>
                      Complete
                    </span>
                  )}
                </div>
                <p className="text-sm mt-0.5" style={{ color: 'var(--color-dash-text-muted)' }}>{milestone.subtitle}</p>
                <p className="text-xs mt-1.5" style={{ color: 'var(--color-dash-text-faint)' }}>
                  {isLocked
                    ? `Complete ${MILESTONE_META[index - 1]?.name ?? 'previous milestone'} to unlock`
                    : `${milestone.guides.length} guide${milestone.guides.length !== 1 ? 's' : ''} · ${progressPercent}% complete`}
                </p>
              </div>

              {!isLocked && (
                <motion.div
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 ml-3"
                >
                  <ChevronDown className="w-5 h-5" style={{ color: 'var(--color-dash-text-faint)' }} />
                </motion.div>
              )}
            </div>

            {/* Progress bar */}
            {!isLocked && milestone.guides.length > 0 && (
              <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-dash-border)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--color-dash-copper)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
                />
              </div>
            )}
          </div>

          {/* Expanded guides */}
          <AnimatePresence>
            {expanded && !isLocked && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="border-t px-4 py-3 space-y-1.5" style={{ borderColor: 'var(--color-dash-border)' }}>
                  {milestone.guides.map((guide) => {
                    const guideComplete = completedIds.has(guide.id)
                    return (
                      <Link
                        key={guide.slug}
                        href={`/dashboard/guides/${guide.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl transition-colors group"
                        style={{ background: guideComplete ? 'rgba(200,121,65,0.06)' : 'transparent' }}
                        onClick={e => e.stopPropagation()}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: guideComplete ? 'var(--color-dash-copper)' : 'var(--color-dash-border)' }}
                        >
                          {guideComplete ? (
                            <CheckCircle className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <BookOpen className="w-3 h-3" style={{ color: 'var(--color-dash-text-faint)' }} />
                          )}
                        </div>
                        <span
                          className="text-sm flex-1"
                          style={{
                            color: guideComplete ? 'var(--color-dash-text-muted)' : 'var(--color-dash-text)',
                            textDecoration: guideComplete ? 'line-through' : 'none',
                          }}
                        >
                          {guide.title}
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm" style={{ color: 'var(--color-dash-copper)' }}>
                          &rarr;
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Motivational copy between milestones */}
      {index < totalMilestones - 1 && !isLocked && (
        <motion.p
          custom={index + 3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-xs italic ml-16 mt-3 mb-1"
          style={{ color: 'var(--color-dash-text-faint)' }}
        >
          {milestone.motivationalQuote}
        </motion.p>
      )}
    </div>
  )
}

export default function TrailheadPage() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [milestoneProgress, setMilestoneProgress] = useState<Record<number, number>>({})
  const [currentMilestoneId, setCurrentMilestoneId] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sb = supabase as any

        const { data: guidesData } = await sb
          .from('guides')
          .select('id, title, slug, trailhead_milestone')
          .eq('published', true)
          .eq('category', 'trailhead')
          .order('trailhead_milestone')
          .order('trailhead_order') as { data: Guide[] | null }

        const guides = guidesData ?? []

        let completed = new Set<string>()
        if (user) {
          const { data: progressData } = await supabase
            .from('user_guide_progress')
            .select('guide_id')
            .eq('user_id', user.id)
            .eq('completed', true)
          completed = new Set((progressData ?? []).map((p: { guide_id: string }) => p.guide_id))
        }

        setCompletedIds(completed)

        const builtMilestones: Milestone[] = MILESTONE_META.map(meta => {
          const msGuides = guides.filter(g => g.trailhead_milestone === meta.id)
          return { ...meta, guides: msGuides }
        })

        setMilestones(builtMilestones)

        // Calculate progress per milestone and find current
        const progress: Record<number, number> = {}
        let foundCurrent = false
        for (const ms of builtMilestones) {
          if (ms.guides.length === 0) {
            progress[ms.id] = 0
          } else {
            const done = ms.guides.filter(g => completed.has(g.id)).length
            progress[ms.id] = Math.round((done / ms.guides.length) * 100)
          }
          if (!foundCurrent && progress[ms.id] < 100) {
            setCurrentMilestoneId(ms.id)
            setExpanded(ms.id)
            foundCurrent = true
          }
        }
        if (!foundCurrent) {
          // All complete
          setCurrentMilestoneId(builtMilestones[builtMilestones.length - 1]?.id ?? 1)
        }
        setMilestoneProgress(progress)
      } catch (e) {
        console.error('Failed to fetch trailhead data', e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const totalGuides = milestones.reduce((sum, m) => sum + m.guides.length, 0)
  const completedCount = milestones.reduce((sum, m) => sum + m.guides.filter(g => completedIds.has(g.id)).length, 0)
  const overallPercent = totalGuides > 0 ? Math.round((completedCount / totalGuides) * 100) : 0
  const currentName = milestones.find(m => m.id === currentMilestoneId)?.name ?? 'Basecamp'

  return (
    <div className="space-y-6" style={{ fontFamily: 'var(--font-general)' }}>
      {/* Header */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(200,121,65,0.1)' }}>
            <Map className="w-5 h-5" style={{ color: 'var(--color-dash-copper)' }} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              The Trailhead
            </h1>
          </div>
        </div>
        <p className="text-sm mt-2" style={{ color: 'var(--color-dash-text-muted)' }}>
          Your guided path from first steps to digital mastery.
        </p>
      </motion.div>

      {/* Overall progress */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="rounded-xl border p-5"
        style={{ backgroundColor: 'var(--color-dash-card)', borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
            {loading ? 'Loading your progress...' : `You are at ${currentName}`}
          </span>
          <span className="text-sm font-bold" style={{ color: 'var(--color-dash-copper)' }}>{overallPercent}%</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--color-dash-border)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--color-dash-copper), #D4943A)' }}
            initial={{ width: 0 }}
            animate={{ width: `${overallPercent}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--color-dash-text-faint)' }}>
          {completedCount} of {totalGuides} guides complete
        </p>
      </motion.div>

      {/* Milestone timeline */}
      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
              <div className="flex-1 h-24 rounded-xl bg-gray-100 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {milestones.map((milestone, index) => {
            const prevComplete = index === 0 || (milestoneProgress[milestones[index - 1].id] ?? 0) === 100
            return (
              <motion.div key={milestone.id} custom={index + 2} variants={fadeUp} initial="hidden" animate="show">
                <MilestoneNode
                  milestone={milestone}
                  index={index}
                  totalMilestones={milestones.length}
                  expanded={expanded === milestone.id}
                  onToggle={() => setExpanded(expanded === milestone.id ? null : milestone.id)}
                  completedIds={completedIds}
                  progressPercent={milestoneProgress[milestone.id] ?? 0}
                  currentMilestoneId={currentMilestoneId}
                  previousComplete={prevComplete}
                />
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
