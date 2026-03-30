'use client'

import { useEffect, useRef, useCallback } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const TEXT = 'WHERE THE RIVER MEETS THE MOUNTAIN'
const DRIFT_SPEED = 20

interface FloatChar {
  char: string; baseX: number; baseY: number; x: number; y: number; width: number
  phase: number; freq: number; amp: number
  sinkOffset: number; sinking: boolean; sinkTimer: number
  wakeOffsetX: number; wakeOffsetY: number
}
interface Particle { x: number; y: number; vx: number; vy: number; life: number }
interface FoamDot { x: number; y: number; life: number }

export default function PretextCurrent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<FloatChar[]>([])
  const particlesRef = useRef<Particle[]>([])
  const foamRef = useRef<FoamDot[]>([])
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(false)
  const lastTimeRef = useRef<number>(0)
  const mouseRef = useRef<{ x: number; y: number; prevX: number; prevY: number } | null>(null)
  const draggingRef = useRef(false)
  const causticTimeRef = useRef(0)
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

    const fontSize = Math.max(18, Math.min(36, w / 22))
    const fontStr = `${fontSize}px Georgia, serif`
    ctx.font = fontStr

    const prepared = prepareWithSegments(TEXT, fontStr)
    const result = layoutWithLines(prepared, w - 40, fontSize * 1.4)

    const chars: FloatChar[] = []
    const totalH = result.lines.length * fontSize * 1.4
    let lineY = (h - totalH) / 2 + fontSize

    for (const line of result.lines) {
      let lineWidth = 0
      for (const ch of line.text) lineWidth += ctx.measureText(ch).width
      let x = (w - lineWidth) / 2
      for (const ch of line.text) {
        const cw = ctx.measureText(ch).width
        chars.push({
          char: ch, baseX: x, baseY: lineY, x, y: lineY, width: cw,
          phase: Math.random() * Math.PI * 2, freq: 0.6 + Math.random() * 0.8,
          amp: 2 + Math.random() * 2, sinkOffset: 0, sinking: false, sinkTimer: 0,
          wakeOffsetX: 0, wakeOffsetY: 0,
        })
        x += cw
      }
      lineY += fontSize * 1.4
    }
    charsRef.current = chars
  }, [])

  const addSplash = useCallback((x: number, y: number) => {
    for (let i = 0; i < 8; i++) {
      const a = Math.random() * Math.PI * 2
      particlesRef.current.push({ x, y, vx: Math.cos(a) * (1 + Math.random() * 2), vy: Math.sin(a) * (1 + Math.random() * 2) - 1, life: 1 })
    }
  }, [])

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    const dt = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 1000, 0.05) : 0.016
    lastTimeRef.current = time
    causticTimeRef.current += dt
    ctx.clearRect(0, 0, w, h)

    const ct = causticTimeRef.current
    for (let i = 0; i < 5; i++) {
      const cx = (Math.sin(ct * 0.3 + i * 1.2) * 0.5 + 0.5) * w
      const cy = (Math.cos(ct * 0.4 + i * 0.9) * 0.5 + 0.5) * h
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60)
      grad.addColorStop(0, 'rgba(193,120,23,0.03)')
      grad.addColorStop(1, 'rgba(193,120,23,0)')
      ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h)
    }

    const fontSize = Math.max(18, Math.min(36, w / 22))
    ctx.font = `${fontSize}px Georgia, serif`
    ctx.textBaseline = 'alphabetic'

    for (const c of charsRef.current) {
      c.baseX += DRIFT_SPEED * dt
      if (c.baseX > w + c.width) c.baseX -= w + 200
      c.phase += c.freq * dt
      if (c.sinking) {
        c.sinkTimer -= dt
        if (c.sinkTimer <= 0) { c.sinking = false; c.sinkOffset = 0 }
        else c.sinkOffset = 30 * (c.sinkTimer / 2)
      }
      c.wakeOffsetX *= 0.92; c.wakeOffsetY *= 0.92

      const mouse = mouseRef.current
      if (mouse && draggingRef.current) {
        const cx = c.baseX + c.width / 2, cy = c.baseY + Math.sin(c.phase) * c.amp
        const dx = cx - mouse.x, dy = cy - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 60 && dist > 0) {
          const push = (60 - dist) / 60 * 3
          c.wakeOffsetX += (dx / dist) * push
          c.wakeOffsetY += (dy / dist) * push + (mouse.y - mouse.prevY) * 0.05
          if (Math.random() < 0.3) addSplash(mouse.x, mouse.y)
        }
      }

      c.x = c.baseX + c.wakeOffsetX
      c.y = c.baseY + Math.sin(c.phase) * c.amp + c.sinkOffset + c.wakeOffsetY

      // Sink ring
      if (c.sinking && c.sinkTimer > 0) {
        const age = 1 - c.sinkTimer / 2
        const r = age * 40
        ctx.beginPath(); ctx.arc(c.x + c.width / 2, c.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(74,144,164,${(1 - age) * 0.6})`; ctx.lineWidth = 1.5; ctx.stroke()
      }
    }

    for (let i = 0; i < charsRef.current.length; i++) {
      const c = charsRef.current[i]
      // Characters alternate between warm copper and cool river blue
      const isWarm = i % 3 !== 0
      ctx.fillStyle = isWarm ? '#C17817' : '#4A90A4'
      ctx.fillText(c.char, c.x, c.y)
    }

    particlesRef.current = particlesRef.current.filter(p => p.life > 0)
    for (const p of particlesRef.current) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= 0.06
      ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(193,120,23,${p.life})`; ctx.fill()
    }

    if (Math.random() < 0.08) {
      const edge = Math.random() < 0.5
      foamRef.current.push({ x: edge ? 5 : w - 5, y: Math.random() * h, life: 1 })
    }
    foamRef.current = foamRef.current.filter(f => f.life > 0)
    for (const f of foamRef.current) {
      f.life -= 0.015
      ctx.beginPath(); ctx.arc(f.x, f.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${0.3 * f.life})`; ctx.fill()
    }
  }, [addSplash])

  const loop = useCallback((time: number) => {
    if (visibleRef.current) draw(time)
    rafRef.current = requestAnimationFrame(loop)
  }, [draw])

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    measureGlyphs()
    const ro = new ResizeObserver(() => measureGlyphs())
    if (containerRef.current) ro.observe(containerRef.current)
    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting }, { threshold: 0.2 })
    if (containerRef.current) io.observe(containerRef.current)
    if (!reducedMotion.current) rafRef.current = requestAnimationFrame(loop)
    else draw(0)
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); io.disconnect() }
  }, [measureGlyphs, loop, draw])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (reducedMotion.current) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left, y = e.clientY - rect.top
    const prev = mouseRef.current
    mouseRef.current = { x, y, prevX: prev?.x ?? x, prevY: prev?.y ?? y }
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (reducedMotion.current) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left, y = e.clientY - rect.top
    const fontSize = Math.max(18, Math.min(36, (canvasRef.current?.offsetWidth ?? 800) / 22))
    for (const c of charsRef.current) {
      if (Math.abs(c.x - x) < c.width + 4 && Math.abs(c.y - y) < fontSize) {
        c.sinking = true; c.sinkTimer = 2; c.sinkOffset = 30
        addSplash(c.x + c.width / 2, c.y); break
      }
    }
  }, [addSplash])

  return (
    <div ref={containerRef} className="w-full" style={{ height: 'clamp(160px, 22vh, 240px)' }}>
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseDown={() => { draggingRef.current = true }}
        onMouseUp={() => { draggingRef.current = false }}
        onMouseLeave={() => { mouseRef.current = null; draggingRef.current = false }}
        onClick={handleClick} />
    </div>
  )
}
