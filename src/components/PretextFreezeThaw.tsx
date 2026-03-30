'use client'

import { useEffect, useRef, useCallback } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const TEXT = 'YOUR BUSINESS DESERVES BETTER'
const FREEZE_RADIUS = 100
const CRYSTAL_DELAY = 2000

interface CharGlyph {
  char: string; x: number; y: number; width: number; frozen: number
}

function lerpColor(t: number): string {
  // Warm gold (220,160,50) → bright ice blue (180,220,255) — dramatic transition
  const r = Math.round(220 + (180 - 220) * t)
  const g = Math.round(160 + (220 - 160) * t)
  const b = Math.round(50 + (255 - 50) * t)
  return `rgb(${r},${g},${b})`
}

export default function PretextFreezeThaw() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const glyphsRef = useRef<CharGlyph[]>([])
  const cursorRef = useRef<{ x: number; y: number } | null>(null)
  const stillSinceRef = useRef<number>(0)
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(false)
  const reducedMotion = useRef(false)

  const measureGlyphs = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const fontSize = Math.max(24, Math.min(48, w / 14))
    const fontStr = `bold ${fontSize}px Georgia, serif`
    ctx.font = fontStr

    const prepared = prepareWithSegments(TEXT, fontStr)
    const result = layoutWithLines(prepared, w - 40, fontSize * 1.3)

    const glyphs: CharGlyph[] = []
    const totalHeight = result.lines.length * fontSize * 1.3
    let lineY = (h - totalHeight) / 2 + fontSize

    for (const line of result.lines) {
      let lineWidth = 0
      for (const ch of line.text) lineWidth += ctx.measureText(ch).width
      let x = (w - lineWidth) / 2
      for (const ch of line.text) {
        const cw = ctx.measureText(ch).width
        if (ch !== ' ') glyphs.push({ char: ch, x, y: lineY, width: cw, frozen: 0 })
        x += cw
      }
      lineY += fontSize * 1.3
    }
    glyphsRef.current = glyphs
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    ctx.clearRect(0, 0, w, h)

    const cursor = cursorRef.current
    const showCrystals = cursor !== null && Date.now() - stillSinceRef.current > CRYSTAL_DELAY

    if (cursor) {
      const grad = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, FREEZE_RADIUS * 2.5)
      grad.addColorStop(0, 'rgba(168,216,234,0.18)')
      grad.addColorStop(0.4, 'rgba(168,216,234,0.08)')
      grad.addColorStop(1, 'rgba(168,216,234,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
    }

    const glyphs = glyphsRef.current
    const fontSize = Math.max(24, Math.min(48, w / 14))
    ctx.font = `bold ${fontSize}px Georgia, serif`
    ctx.textBaseline = 'alphabetic'

    for (const g of glyphs) {
      if (cursor) {
        const dx = g.x + g.width / 2 - cursor.x
        const dy = g.y - fontSize / 2 - cursor.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const target = dist < FREEZE_RADIUS ? 1 : 0
        g.frozen += (target - g.frozen) * 0.1
      } else {
        g.frozen *= 0.95
      }
      ctx.fillStyle = lerpColor(Math.max(0, Math.min(1, g.frozen)))
      ctx.fillText(g.char, g.x, g.y)
    }

    if (showCrystals && cursor) {
      const age = Math.min((Date.now() - stillSinceRef.current - CRYSTAL_DELAY) / 3000, 1)
      ctx.strokeStyle = `rgba(220,240,255,${0.6 * age})`
      ctx.lineWidth = 2
      for (let i = 0; i < glyphs.length - 1; i++) {
        const a = glyphs[i], b = glyphs[i + 1]
        if (a.frozen > 0.5 && b.frozen > 0.5) {
          const mx = (a.x + b.x + b.width) / 2
          const my = (a.y + b.y) / 2 - 8 * age
          ctx.beginPath()
          ctx.moveTo(a.x + a.width, a.y - fontSize / 3)
          ctx.lineTo(mx, my)
          ctx.lineTo(b.x, b.y - fontSize / 3)
          ctx.stroke()
        }
      }
    }
  }, [])

  const loop = useCallback(() => {
    if (visibleRef.current) draw()
    rafRef.current = requestAnimationFrame(loop)
  }, [draw])

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = !window.matchMedia('(pointer: fine)').matches
    measureGlyphs()
    const ro = new ResizeObserver(() => measureGlyphs())
    if (containerRef.current) ro.observe(containerRef.current)
    const io = new IntersectionObserver(([e]) => {
      visibleRef.current = e.isIntersecting
      if (e.isIntersecting && isMobile && !reducedMotion.current) {
        let idx = 0
        const wave = setInterval(() => {
          const g = glyphsRef.current[idx]
          if (g) g.frozen = 1
          idx++
          if (idx >= glyphsRef.current.length) {
            clearInterval(wave)
            setTimeout(() => { for (const g of glyphsRef.current) g.frozen = 0 }, 1500)
          }
        }, 50)
      }
    }, { threshold: 0.3 })
    if (containerRef.current) io.observe(containerRef.current)
    if (!reducedMotion.current) rafRef.current = requestAnimationFrame(loop)
    else draw()
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); io.disconnect() }
  }, [measureGlyphs, loop, draw])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (reducedMotion.current) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left, y = e.clientY - rect.top
    const prev = cursorRef.current
    if (!prev || Math.abs(prev.x - x) > 2 || Math.abs(prev.y - y) > 2) stillSinceRef.current = Date.now()
    cursorRef.current = { x, y }
  }, [])

  const handleMouseLeave = useCallback(() => { cursorRef.current = null; stillSinceRef.current = 0 }, [])

  return (
    <div ref={containerRef} className="w-full" style={{ height: 'clamp(120px, 18vh, 200px)' }}>
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
    </div>
  )
}
