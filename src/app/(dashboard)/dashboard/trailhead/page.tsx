'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { 
  Tent, Trees, Mountain, Flag, Sunrise, 
  CheckCircle, Lock, ChevronDown, BookOpen 
} from 'lucide-react'
import Link from 'next/link'

interface Guide {
  title: string
  slug: string
  completed?: boolean
}

interface Milestone {
  id: number
  name: string
  subtitle: string
  icon: React.ElementType
  emoji: string
  guides: Guide[]
  color: string
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    name: 'Basecamp',
    subtitle: 'Claim Your Online Identity',
    icon: Tent,
    emoji: '⛺',
    color: '#C87941',
    guides: [
      { title: 'Set Up Your Google Business Profile', slug: 'set-up-google-business-profile' },
      { title: 'Understanding Your Domain Name', slug: 'understanding-your-domain-name' },
      { title: "Your Website's First Impression", slug: 'your-websites-first-impression' },
    ],
  },
  {
    id: 2,
    name: 'The Forest',
    subtitle: 'Make Your Website Work For You',
    icon: Trees,
    emoji: '🌲',
    color: '#2D6A4F',
    guides: [
      { title: 'Navigating Your New Website', slug: 'navigating-your-new-website' },
      { title: 'Updating Your Content', slug: 'updating-your-content' },
      { title: 'Adding Photos That Sell', slug: 'adding-photos-that-sell' },
      { title: 'Mobile: Where Your Customers Are', slug: 'mobile-where-your-customers-are' },
    ],
  },
  {
    id: 3,
    name: 'The Ridge',
    subtitle: 'Get Found by Customers',
    icon: Mountain,
    emoji: '⛰️',
    color: '#4A7C8E',
    guides: [
      { title: 'Google Maps: Your Digital Storefront', slug: 'google-maps-your-digital-storefront' },
      { title: 'What Customers Search For', slug: 'what-customers-search-for' },
      { title: 'Getting Listed in Local Directories', slug: 'getting-listed-in-local-directories' },
    ],
  },
  {
    id: 4,
    name: 'The Summit',
    subtitle: 'Turn Visitors Into Customers',
    icon: Flag,
    emoji: '🚩',
    color: '#7B5EA7',
    guides: [
      { title: 'Getting Your First Google Reviews', slug: 'getting-your-first-google-reviews' },
      { title: 'Calls to Action That Work', slug: 'calls-to-action-that-work' },
      { title: 'Building an Email List', slug: 'building-an-email-list' },
      { title: 'Social Media That Actually Helps', slug: 'social-media-that-actually-helps' },
    ],
  },
  {
    id: 5,
    name: 'The Vista',
    subtitle: 'Grow & Scale',
    icon: Sunrise,
    emoji: '🌅',
    color: '#C87941',
    guides: [
      { title: 'When to Consider Google Ads', slug: 'when-to-consider-google-ads' },
      { title: 'Social Media Advertising Basics', slug: 'social-media-advertising-basics' },
      { title: 'Measuring What Matters', slug: 'measuring-what-matters' },
    ],
  },
]

// For demo: milestone 1 complete, milestone 2 in progress (2/4)
const DEMO_PROGRESS: Record<number, number> = { 1: 100, 2: 50, 3: 0, 4: 0, 5: 0 }

function ProgressRing({ percent, size = 48, strokeWidth = 3, color }: { percent: number; size?: number; strokeWidth?: number; color: string }) {
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(200,121,65,0.15)"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
    </svg>
  )
}

function MilestoneCard({ milestone, index, expanded, onToggle }: {
  milestone: Milestone
  index: number
  expanded: boolean
  onToggle: () => void
}) {
  const progress = DEMO_PROGRESS[milestone.id] ?? 0
  const isComplete = progress === 100
  const isCurrent = !isComplete && (milestone.id === 1 || DEMO_PROGRESS[milestone.id - 1] === 100)
  const isLocked = !isComplete && !isCurrent

  const Icon = milestone.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative"
    >
      {/* Connector line */}
      {index < MILESTONES.length - 1 && (
        <div className="absolute left-6 top-full w-0.5 h-8 md:h-10" 
          style={{ background: isComplete ? 'var(--color-dash-copper)' : 'var(--color-dash-border)', opacity: 0.5 }} 
        />
      )}

      <motion.div
        className={`
          relative rounded-2xl border cursor-pointer overflow-hidden
          transition-all duration-300
          ${isLocked ? 'opacity-60' : ''}
          ${isCurrent ? 'shadow-md' : 'shadow-sm'}
        `}
        style={{
          background: 'var(--color-dash-card)',
          borderColor: isComplete
            ? 'var(--color-dash-copper)'
            : isCurrent
            ? 'rgba(200,121,65,0.35)'
            : 'var(--color-dash-border)',
        }}
        whileHover={!isLocked ? { scale: 1.01 } : {}}
        onClick={!isLocked ? onToggle : undefined}
      >
        {/* Current milestone pulse ring */}
        {isCurrent && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ border: '2px solid var(--color-dash-copper)', opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <div className="flex items-center gap-4 p-4 md:p-5">
          {/* Icon area */}
          <div className="relative flex-shrink-0">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
              style={{
                background: isComplete
                  ? 'var(--color-dash-copper)'
                  : isCurrent
                  ? 'rgba(200,121,65,0.12)'
                  : 'rgba(0,0,0,0.04)',
              }}
            >
              {isComplete ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : isLocked ? (
                <Lock className="w-5 h-5" style={{ color: 'var(--color-dash-text-faint)' }} />
              ) : (
                <Icon className="w-6 h-6" style={{ color: milestone.color }} />
              )}
            </div>
            {/* Milestone number badge */}
            <div
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{
                background: isComplete ? 'var(--color-dash-copper)' : 'var(--color-dash-border)',
                color: isComplete ? 'white' : 'var(--color-dash-text-muted)',
              }}
            >
              {milestone.id}
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
                {milestone.name}
              </h3>
              {isCurrent && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(200,121,65,0.12)', color: 'var(--color-dash-copper)' }}>
                  Current
                </span>
              )}
            </div>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-dash-text-muted)' }}>
              {milestone.subtitle}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-dash-text-faint)' }}>
              {milestone.guides.length} guides · {progress}% complete
            </p>
          </div>

          {/* Progress ring */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="hidden sm:block">
              <ProgressRing percent={progress} size={44} color={isComplete ? '#C87941' : milestone.color} />
            </div>
            {!isLocked && (
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="w-5 h-5" style={{ color: 'var(--color-dash-text-faint)' }} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Expanded guides list */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="border-t px-4 py-3 space-y-2" style={{ borderColor: 'var(--color-dash-border)' }}>
                {milestone.guides.map((guide, gi) => {
                  const guideComplete = milestone.id === 1 || (milestone.id === 2 && gi < 2)
                  return (
                    <Link
                      key={guide.slug}
                      href={`/dashboard/guides/${guide.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-opacity-60 transition-colors group"
                      style={{ background: guideComplete ? 'rgba(200,121,65,0.06)' : 'transparent' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: guideComplete ? 'var(--color-dash-copper)' : 'var(--color-dash-border)',
                        }}
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
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--color-dash-copper)' }}
                      >
                        →
                      </motion.div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// SVG Trail path for desktop
function TrailPath() {
  const ref = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true })

  return (
    <div ref={containerRef} className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-32 pointer-events-none" style={{ zIndex: 0 }}>
      <svg width="128" height="100%" className="absolute inset-0" preserveAspectRatio="none" viewBox="0 0 128 900">
        {/* Background topo lines */}
        {[100, 200, 300, 400, 500, 600, 700, 800].map(y => (
          <ellipse key={y} cx="64" cy={y} rx={40 + (y % 3) * 8} ry="18" fill="none" stroke="var(--color-dash-copper)" strokeWidth="0.5" opacity="0.06" />
        ))}
        {/* Main trail */}
        <motion.path
          ref={ref}
          d="M 64 880 C 40 800 90 720 60 640 C 30 560 90 480 64 400 C 38 320 88 240 64 160 C 45 100 70 60 64 20"
          fill="none"
          stroke="var(--color-dash-copper)"
          strokeWidth="2.5"
          strokeDasharray="8 6"
          opacity="0.35"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

export default function TrailheadPage() {
  const [expanded, setExpanded] = useState<number | null>(1)
  
  const totalGuides = MILESTONES.reduce((sum, m) => sum + m.guides.length, 0)
  // Demo: milestone 1 all done, milestone 2 half done
  const completedGuides = 3 + 2 // milestone 1 (3) + 2 from milestone 2
  const overallPercent = Math.round((completedGuides / totalGuides) * 100)

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-dash-bg)' }}>
      {/* Topo background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" className="opacity-[0.04]">
          <defs>
            <pattern id="topo" width="120" height="80" patternUnits="userSpaceOnUse">
              <ellipse cx="60" cy="40" rx="50" ry="25" fill="none" stroke="var(--color-dash-copper)" strokeWidth="1" />
              <ellipse cx="60" cy="40" rx="35" ry="17" fill="none" stroke="var(--color-dash-copper)" strokeWidth="1" />
              <ellipse cx="60" cy="40" rx="20" ry="9" fill="none" stroke="var(--color-dash-copper)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🗺️</span>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              The Trailhead
            </h1>
          </div>
          <p className="text-base" style={{ color: 'var(--color-dash-text-muted)' }}>
            Your guided path to getting your business online and thriving. One step at a time — no rushing.
          </p>
        </motion.div>

        {/* Overall progress bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-5 mb-8 border"
          style={{ background: 'var(--color-dash-card)', borderColor: 'var(--color-dash-border)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium" style={{ color: 'var(--color-dash-text)' }}>
              Your Trail Progress
            </span>
            <span className="text-sm font-bold" style={{ color: 'var(--color-dash-copper)' }}>
              {overallPercent}%
            </span>
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
            {completedGuides} of {totalGuides} guides complete · Keep climbing 🏔️
          </p>
        </motion.div>

        {/* Milestones */}
        <div className="relative space-y-4">
          {MILESTONES.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={index}
              expanded={expanded === milestone.id}
              onToggle={() => setExpanded(expanded === milestone.id ? null : milestone.id)}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-xs mt-10"
          style={{ color: 'var(--color-dash-text-faint)' }}
        >
          Built in the West Kootenays. 🏔️ Take it one guide at a time.
        </motion.p>
      </div>
    </div>
  )
}
