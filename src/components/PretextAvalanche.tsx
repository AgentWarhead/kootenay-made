'use client'

import { useEffect, useRef, useCallback } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const TEXT = 'RESULTS THAT HIT HARD'
const GRAVITY = 0.4
const DAMPING = 0.6

interface Particle { x: number; y: number; vx: number; vy: number; life: number }
interface CharPhysics {
  char: string; homeX: number; homeY: number; x: number; y: number
  vx: number; vy: number; angle: number; av: number; width: number; landed: boolean
}

export default function PretextAvalanche() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<CharPhysics[]>([])
  const particlesRef = useRef<Particle[]>([])
  const snowRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(false)
  const avalancheRef = useRef(false)
  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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

    const fontSize = Math.max(28, Math.min(56, w / 10))
    const fontStr = `bold ${fontSize}px Georgia, serif`
    ctx.font = fontStr

    const prepared = prepareWithSegments(TEXT, fontStr)
    const result = layoutWithLines(prepared, w - 40, fontSize * 1.3)

    const chars: CharPhysics[] = []
    let lineY = h * 0.45
    let ridgeIdx = 0

    for (const line of result.lines) {
      let lineWidth = 0
      for (const ch of line.text) lineWidth += ctx.measureText(ch).width
      let x = (w - lineWidth) / 2
      for (const ch of line.text) {
        const cw = ctx.measureText(ch).width
        const ridgeY = lineY + Math.sin(ridgeIdx * 0.6) * 18
        if (ch !== ' ') {
          chars.push({ char: ch, homeX: x, homeY: ridgeY, x, y: ridgeY, vx: 0, vy: 0, angle: 0, av: 0, width: cw, landed: false })
          ridgeIdx++
        }
        x += cw
      }
      lineY += fontSize * 1.3
    }
    charsRef.current = chars
  }, [])

  const spawnDust = useCallback((cx: number, cy: number) => {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2
      const spd = Math.random() * 3 + 1
      particlesRef.current.push({ x: cx, y: cy, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 1, life: 1 })
    }
  }, [])

  const triggerAvalanche = useCallback(() => {
    if (avalancheRef.current) return
    avalancheRef.current = true
    for (const c of charsRef.current) {
      c.vx = (Math.random() - 0.5) * 6
      c.vy = -(Math.random() * 3 + 1)
      c.av = (Math.random() - 0.5) * 0.3
      c.landed = false
    }
    if (returnTimerRef.current) clearTimeout(returnTimerRef.current)
    returnTimerRef.current = setTimeout(() => {
      avalancheRef.current = false
      charsRef.current.forEach((c, i) => {
        setTimeout(() => { c.vx = 0; c.vy = -8 }, i * 60)
      })
    }, 2000)
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    ctx.clearRect(0, 0, w, h)
    const fontSize = Math.max(28, Math.min(56, w / 10))
    ctx.textBaseline = 'alphabetic'
    ctx.font = `bold ${fontSize}px Georgia, serif`
    const bottom = h - 20
    const chars = charsRef.current

    if (avalancheRef.current) {
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i]
        if (!c.landed) {
          c.vy += GRAVITY; c.x += c.vx; c.y += c.vy; c.angle += c.av
          if (c.y >= bottom) {
            c.y = bottom; c.vy *= -DAMPING; c.vx *= 0.8; c.av *= 0.7
            if (Math.abs(c.vy) < 1) { c.vy = 0; c.landed = true; spawnDust(c.x, c.y) }
          }
          for (let j = i + 1; j < chars.length; j++) {
            const b = chars[j]
            if (Math.abs(b.x - c.x) < fontSize && Math.abs(b.y - c.y) < fontSize) {
              const tmp = c.vx; c.vx = b.vx * 0.5; b.vx = tmp * 0.5
            }
          }
        }
      }
    } else {
      for (const c of chars) {
        c.vx += (c.homeX - c.x) * 0.12; c.vy += (c.homeY - c.y) * 0.12
        c.vx *= 0.75; c.vy *= 0.75; c.angle *= 0.85
        c.x += c.vx; c.y += c.vy
      }
    }

    // Falling snow background particles
    if (!snowRef.current) snowRef.current = []
    if (snowRef.current.length < 40) {
      snowRef.current.push({ x: Math.random() * w, y: -5, vx: (Math.random() - 0.5) * 0.5, vy: 0.3 + Math.random() * 0.8, life: 1 })
    }
    for (let i = snowRef.current.length - 1; i >= 0; i--) {
      const s = snowRef.current[i]
      s.x += s.vx + Math.sin(Date.now() * 0.001 + i) * 0.2
      s.y += s.vy
      if (s.y > h) { snowRef.current.splice(i, 1); continue }
      ctx.beginPath(); ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(220,235,255,0.4)'; ctx.fill()
    }

    for (let i = 0; i < chars.length; i++) {
      const c = chars[i]
      // Avalanche colors — icy whites and pale blues with some warmth
      const iceBlend = avalancheRef.current ? 0.7 : 0.3
      const r = Math.round(200 + (255 - 200) * iceBlend + Math.sin(i * 0.5) * 15)
      const g = Math.round(180 + (240 - 180) * iceBlend + Math.sin(i * 0.8) * 10)
      const b = Math.round(140 + (255 - 140) * iceBlend + Math.cos(i * 0.6) * 20)
      ctx.fillStyle = `rgb(${Math.min(255,r)},${Math.min(255,g)},${Math.min(255,b)})`
      ctx.save()
      ctx.translate(c.x + c.width / 2, c.y)
      ctx.rotate(c.angle)
      ctx.fillText(c.char, -c.width / 2, 0)
      ctx.restore()
    }

    particlesRef.current = particlesRef.current.filter(p => p.life > 0)
    for (const p of particlesRef.current) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= 0.04
      ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(220,235,255,${p.life * 0.8})`; ctx.fill()
    }
  }, [spawnDust])

  const loop = useCallback(() => {
    if (visibleRef.current) draw()
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
    else draw()
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); io.disconnect(); if (returnTimerRef.current) clearTimeout(returnTimerRef.current) }
  }, [measureGlyphs, loop, draw])

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (reducedMotion.current) return
    triggerAvalanche()
    if (typeof navigator.vibrate === 'function') navigator.vibrate(50)
    if (containerRef.current) {
      containerRef.current.style.transform = `translate(${(Math.random()-0.5)*4}px,${(Math.random()-0.5)*4}px)`
      setTimeout(() => { if (containerRef.current) containerRef.current.style.transform = '' }, 200)
    }
    e.preventDefault()
  }, [triggerAvalanche])

  return (
    <div ref={containerRef} className="w-full transition-transform" style={{ height: 'clamp(180px, 22vh, 260px)' }}>
      <canvas ref={canvasRef} className="w-full h-full cursor-pointer" onClick={handleClick} />
    </div>
  )
}
