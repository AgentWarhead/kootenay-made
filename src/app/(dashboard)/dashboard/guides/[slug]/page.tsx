'use client'

import { useState, useEffect, useRef, use } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle, ChevronDown, List, BookOpen } from 'lucide-react'

interface Guide {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  trailhead_milestone: number | null
  difficulty: 'quick' | 'standard' | 'advanced'
  read_time_minutes: number
  published: boolean
}

import { createClient } from '@/lib/supabase/client'

const DIFFICULTY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  quick: { label: 'Quick Read', icon: '⚡', color: '#C87941' },
  standard: { label: 'Standard', icon: '📖', color: '#4A7C8E' },
  advanced: { label: 'Deep Dive', icon: '🧠', color: '#7B5EA7' },
}

interface Heading {
  id: string
  text: string
  level: number
}

function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split('\n')
  const headings: Heading[] = []
  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)/)
    if (match) {
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      headings.push({ id, text, level: match[1].length })
    }
  }
  return headings
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 origin-left z-50"
      style={{ scaleX, background: 'var(--color-dash-copper)' }}
    />
  )
}

function TableOfContents({ headings, activeId }: { headings: Heading[]; activeId: string }) {
  return (
    <nav className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-dash-text-faint)' }}>
        On This Page
      </p>
      {headings.map(h => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className="block text-sm py-1 transition-colors"
          style={{
            paddingLeft: `${(h.level - 1) * 10 + (activeId === h.id ? 8 : 10)}px`,
            color: activeId === h.id ? 'var(--color-dash-copper)' : 'var(--color-dash-text-muted)',
            fontWeight: activeId === h.id ? '600' : '400',
            borderLeft: activeId === h.id ? '2px solid var(--color-dash-copper)' : '2px solid transparent',
          }}
          onClick={e => {
            e.preventDefault()
            document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        >
          {h.text}
        </a>
      ))}
    </nav>
  )
}

// Custom markdown components
function MarkdownContent({ content }: { content: string }) {
  const makeId = (text: string) =>
    String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 id={makeId(String(children))} className="guide-h1">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 id={makeId(String(children))} className="guide-h2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 id={makeId(String(children))} className="guide-h3">{children}</h3>
        ),
        p: ({ children }) => <p className="guide-p">{children}</p>,
        ul: ({ children }) => <ul className="guide-ul">{children}</ul>,
        ol: ({ children }) => <ol className="guide-ol">{children}</ol>,
        li: ({ children }) => <li className="guide-li">{children}</li>,
        blockquote: ({ children }) => {
          // Check if it's a Brett's Tip (starts with 💡)
          const text = String(children)
          const isTip = text.includes('💡')
          return (
            <blockquote
              className="guide-blockquote"
              style={{
                borderLeft: `4px solid var(--color-dash-copper)`,
                background: isTip ? 'rgba(200,121,65,0.06)' : 'rgba(0,0,0,0.03)',
                borderRadius: '0 12px 12px 0',
                padding: '12px 16px',
                margin: '24px 0',
                fontStyle: isTip ? 'normal' : 'italic',
              }}
            >
              {isTip && (
                <div className="text-xs font-semibold mb-1" style={{ color: 'var(--color-dash-copper)' }}>
                  Brett&apos;s Tip
                </div>
              )}
              <div style={{ color: 'var(--color-dash-text)' }}>{children}</div>
            </blockquote>
          )
        },
        code: ({ inline, children }: any) =>
          inline ? (
            <code
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                background: 'rgba(0,0,0,0.06)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.875em',
              }}
            >
              {children}
            </code>
          ) : (
            <pre
              style={{
                background: 'rgba(0,0,0,0.05)',
                padding: '16px',
                borderRadius: '12px',
                overflow: 'auto',
                margin: '20px 0',
              }}
            >
              <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }}>{children}</code>
            </pre>
          ),
        strong: ({ children }) => (
          <strong style={{ color: 'var(--color-dash-text)', fontWeight: 700 }}>{children}</strong>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-dash-copper)', textDecoration: 'underline' }}
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default function GuideReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [guide, setGuide] = useState<Guide | null>(null)
  const [related, setRelated] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [markingComplete, setMarkingComplete] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)
  const [activeHeading, setActiveHeading] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [guideId, setGuideId] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchGuide() {
      try {
        const supabase = createClient()

        const { data: { user } } = await supabase.auth.getUser()
        if (user) setUserId(user.id)

        const { data: guideData } = await supabase
          .from('guides')
          .select('*')
          .eq('slug', slug)
          .single()

        if (guideData) {
          setGuide(guideData as any)
          setGuideId((guideData as any).id)

          // Fetch related guides in same milestone
          const { data: relData } = await supabase
            .from('guides')
            .select('*')
            .eq('published', true)
            .neq('slug', slug)
            .eq('trailhead_milestone', guideData.trailhead_milestone)
            .limit(3)
          setRelated(relData ?? [])

          // Check completion status
          if (user) {
            const { data: progressData } = await supabase
              .from('user_guide_progress')
              .select('completed')
              .eq('user_id', user.id)
              .eq('guide_id', guideData.id)
              .single()
            if (progressData?.completed) setCompleted(true)

            // Auto-create progress entry if doesn't exist
            await supabase
              .from('user_guide_progress')
              .upsert(
                { user_id: user.id, guide_id: guideData.id, progress_percent: 0, completed: false },
                { onConflict: 'user_id,guide_id', ignoreDuplicates: true }
              )
          }
        }
      } catch (e) {
        console.error('Failed to fetch guide', e)
      } finally {
        setLoading(false)
      }
    }
    fetchGuide()
  }, [slug])

  // Track active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    const headingEls = contentRef.current?.querySelectorAll('h1,h2,h3') ?? []
    headingEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [guide])

  async function markComplete() {
    if (!userId || !guideId) return
    setMarkingComplete(true)
    const supabase = createClient()
    await supabase
      .from('user_guide_progress')
      .upsert(
        {
          user_id: userId,
          guide_id: guideId,
          completed: true,
          progress_percent: 100,
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,guide_id' }
      )
    setCompleted(true)
    setMarkingComplete(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-dash-bg)' }}>
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="w-8 h-8 rounded-full border-2"
            style={{ borderColor: 'var(--color-dash-copper)', borderTopColor: 'transparent' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>Stoking the fire...</p>
        </div>
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-dash-bg)' }}>
        <div className="text-center">
          <div className="text-5xl mb-4">🏔️</div>
          <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
            Guide not found
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>
            This trail marker doesn&apos;t exist yet.
          </p>
          <Link
            href="/dashboard/guides"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: 'var(--color-dash-copper)' }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Guides
          </Link>
        </div>
      </div>
    )
  }

  const headings = extractHeadings(guide.content)
  const diff = DIFFICULTY_LABELS[guide.difficulty] ?? DIFFICULTY_LABELS.quick

  return (
    <>
      <ScrollProgress />

      {/* JetBrains Mono */}
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=jet-brains-mono@400,700&display=swap');
        .guide-h1 { font-family: var(--font-cabinet); font-size: 28px; font-weight: 700; line-height: 1.25; color: var(--color-dash-text); margin: 32px 0 16px; }
        .guide-h2 { font-family: var(--font-cabinet); font-size: 22px; font-weight: 600; line-height: 1.3; color: var(--color-dash-text); margin: 28px 0 12px; }
        .guide-h3 { font-family: var(--font-cabinet); font-size: 18px; font-weight: 600; line-height: 1.4; color: var(--color-dash-text); margin: 24px 0 10px; }
        .guide-p { font-family: var(--font-general); font-size: 18px; line-height: 1.8; color: var(--color-dash-text); margin: 0 0 18px; }
        .guide-ul { margin: 0 0 18px; padding-left: 0; list-style: none; }
        .guide-ol { margin: 0 0 18px; padding-left: 20px; }
        .guide-li { font-family: var(--font-general); font-size: 18px; line-height: 1.8; color: var(--color-dash-text); margin-bottom: 6px; padding-left: 24px; position: relative; }
        .guide-ul .guide-li::before { content: '•'; color: var(--color-dash-copper); position: absolute; left: 6px; font-weight: bold; }
        .guide-blockquote p { margin: 0; font-size: 16px; line-height: 1.7; }
      `}</style>

      <div className="min-h-screen" style={{ background: 'var(--color-dash-bg)' }}>
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Back link */}
          <Link
            href="/dashboard/guides"
            className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors hover:opacity-80"
            style={{ color: 'var(--color-dash-text-muted)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>

          <div className="flex gap-12 items-start">
            {/* Main content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 min-w-0"
              style={{ maxWidth: '680px' }}
            >
              {/* Meta badges */}
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: `${diff.color}18`, color: diff.color }}
                >
                  {diff.icon} {diff.label}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>
                  <Clock className="w-3.5 h-3.5" />
                  {guide.read_time_minutes} min read
                </span>
                {guide.trailhead_milestone && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,121,65,0.1)', color: 'var(--color-dash-copper)' }}>
                    Milestone {guide.trailhead_milestone}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl font-bold leading-tight mb-4"
                style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
              >
                {guide.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--color-dash-text-muted)' }}>
                {guide.excerpt}
              </p>

              {/* Mobile TOC toggle */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-6 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-dash-border)', background: 'var(--color-dash-card)' }}>
                  <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium"
                    style={{ color: 'var(--color-dash-text)' }}
                  >
                    <span className="flex items-center gap-2">
                      <List className="w-4 h-4" />
                      On This Page
                    </span>
                    <motion.div animate={{ rotate: tocOpen ? 180 : 0 }}>
                      <ChevronDown className="w-4 h-4" style={{ color: 'var(--color-dash-text-faint)' }} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {tocOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t"
                        style={{ borderColor: 'var(--color-dash-border)' }}
                      >
                        <div className="p-4">
                          <TableOfContents headings={headings} activeId={activeHeading} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Divider */}
              <div className="h-px mb-8" style={{ background: 'var(--color-dash-border)' }} />

              {/* Content */}
              <div ref={contentRef}>
                <MarkdownContent content={guide.content} />
              </div>

              {/* Divider */}
              <div className="h-px my-10" style={{ background: 'var(--color-dash-border)' }} />

              {/* Mark as Complete */}
              <div className="rounded-2xl border p-6 text-center" style={{ borderColor: 'var(--color-dash-border)', background: 'var(--color-dash-card)' }}>
                {completed ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--color-dash-copper)' }}>
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
                      Guide Complete! 🎉
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>
                      Great work. Keep climbing the trail.
                    </p>
                    <Link
                      href="/dashboard/guides"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium"
                      style={{ color: 'var(--color-dash-copper)' }}
                    >
                      Back to Guides →
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-sm mb-4" style={{ color: 'var(--color-dash-text-muted)' }}>
                      Done reading? Mark this guide complete to track your progress.
                    </p>
                    <button
                      onClick={markComplete}
                      disabled={markingComplete}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60"
                      style={{ background: 'var(--color-dash-copper)', color: 'white' }}
                    >
                      {markingComplete ? (
                        <>
                          <motion.div
                            className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Mark as Complete
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>

              {/* Related guides */}
              {related.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
                    Up Next on the Trail
                  </h2>
                  <div className="space-y-3">
                    {related.map(r => (
                      <Link
                        key={r.id}
                        href={`/dashboard/guides/${r.slug}`}
                        className="flex items-center gap-3 p-4 rounded-xl border group transition-colors hover:border-copper"
                        style={{ background: 'var(--color-dash-card)', borderColor: 'var(--color-dash-border)' }}
                      >
                        <BookOpen className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-dash-copper)' }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium" style={{ color: 'var(--color-dash-text)' }}>{r.title}</p>
                          <p className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>{r.read_time_minutes} min read</p>
                        </div>
                        <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-dash-copper)' }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>

            {/* Desktop TOC sidebar */}
            {headings.length > 0 && (
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden lg:block w-56 flex-shrink-0 sticky top-24"
              >
                <div className="rounded-2xl border p-4" style={{ background: 'var(--color-dash-card)', borderColor: 'var(--color-dash-border)' }}>
                  <TableOfContents headings={headings} activeId={activeHeading} />
                </div>
              </motion.aside>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
