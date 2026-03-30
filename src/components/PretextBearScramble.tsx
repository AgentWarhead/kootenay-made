'use client'

import { useEffect, useRef, useCallback } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const TOWNS = ['CASTLEGAR', 'TRAIL', 'NELSON', 'ROSSLAND', 'KASLO', 'NAKUSP', 'SALMO', 'CRESTON']
const TOWN_COLORS: Record<string, string> = {
  'CASTLEGAR': '#C17817',  // warm copper (home base)
  'TRAIL': '#D4942A',      // industrial amber
  'NELSON': '#E8A849',     // bright artistic gold
  'ROSSLAND': '#87CEEB',   // sky blue (ski town)
  'KASLO': '#4A90A4',      // lake blue
  'NAKUSP': '#7CB68E',     // hot springs green
  'SALMO': '#C9A96E',      // trail dust
  'CRESTON': '#8FBC8F',    // orchard green
}
const TOWN_POS: Record<string, [number, number]> = {
  CASTLEGAR: [0.38, 0.52], TRAIL: [0.28, 0.68], NELSON: [0.62, 0.50],
  ROSSLAND:  [0.18, 0.60], KASLO: [0.75, 0.22], NAKUSP: [0.55, 0.18],
  SALMO:     [0.45, 0.78], CRESTON: [0.80, 0.72],
}

interface LetterState {
  char: string; homeX: number; homeY: number; x: number; y: number; vx: number; vy: number; width: number
}
interface TownState {
  name: string; cx: number; cy: number; letters: LetterState[]
  scattered: boolean; reformed: boolean; bearTimer: number
}

export default function PretextBearScramble() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const townsRef = useRef<TownState[]>([])
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(false)
  const reducedMotion = useRef(false)
  const isMobileRef = useRef(false)

  const measureTowns = useCallback(() => {
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

    const fontSize = Math.max(14, Math.min(22, w / 30))
    const fontStr = `bold ${fontSize}px Georgia, serif`
    ctx.font = fontStr

    const towns: TownState[] = []
    for (const name of TOWNS) {
      const [rx, ry] = TOWN_POS[name]
      const cx = rx * w
      const cy = ry * (h - 40) + 10

      const prepared = prepareWithSegments(name, fontStr)
      const result = layoutWithLines(prepared, w, fontSize * 1.2)
      const letters: LetterState[] = []

      for (const line of result.lines) {
        let totalW = 0
        for (const ch of line.text) totalW += ctx.measureText(ch).width
        let x = cx - totalW / 2
        for (const ch of line.text) {
          const cw = ctx.measureText(ch).width
          letters.push({ char: ch, homeX: x, homeY: cy, x, y: cy, vx: 0, vy: 0, width: cw })
          x += cw
        }
      }
      towns.push({ name, cx, cy, letters, scattered: false, reformed: false, bearTimer: 0 })
    }
    townsRef.current = towns
  }, [])

  const scatterTown = useCallback((town: TownState) => {
    if (town.scattered) return
    town.scattered = true; town.reformed = false; town.bearTimer = 0
    for (let i = 0; i < town.letters.length; i++) {
      const l = town.letters[i]
      let vx = (Math.random() - 0.5) * 12
      let vy = (Math.random() - 0.5) * 12
      if (town.name === 'ROSSLAND') {
        vy = -(Math.abs(vy) + 4)
      } else if (town.name === 'NELSON') {
        const angle = (i / town.letters.length) * Math.PI * 2
        const spd = 5 + Math.random() * 4
        vx = Math.cos(angle) * spd; vy = Math.sin(angle) * spd
      } else if (town.name === 'TRAIL') {
        vx *= 0.5; vy *= 0.5
      }
      l.vx = vx; l.vy = vy
      l.x = l.homeX + vx * 3; l.y = l.homeY + vy * 3
    }
  }, [])

  const drawTreeline = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.save(); ctx.globalAlpha = 0.15; ctx.fillStyle = '#1a3a1a'
    const bottom = h - 2
    for (let x = 0; x < w; x += 18) {
      const peak = bottom - 30 - Math.sin(x * 0.07) * 8
      ctx.beginPath(); ctx.moveTo(x, bottom); ctx.lineTo(x + 9, peak); ctx.lineTo(x + 18, bottom)
      ctx.closePath(); ctx.fill()
    }
    ctx.restore()
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    ctx.clearRect(0, 0, w, h)
    drawTreeline(ctx, w, h)

    const fontSize = Math.max(14, Math.min(22, w / 30))
    ctx.textBaseline = 'alphabetic'
    ctx.font = `bold ${fontSize}px Georgia, serif`

    for (const town of townsRef.current) {
      if (town.scattered) {
        let reformed = true
        for (const l of town.letters) {
          const dx = l.homeX - l.x, dy = l.homeY - l.y
          l.vx *= 0.85; l.vy *= 0.85
          l.x += l.vx + dx * 0.025; l.y += l.vy + dy * 0.025
          if (Math.abs(dx) > 2 || Math.abs(dy) > 2) reformed = false
        }
        if (reformed && !town.reformed) {
          town.reformed = true; town.scattered = false; town.bearTimer = 600
        }
      }

      if (town.bearTimer > 0) {
        town.bearTimer -= 16
        ctx.save()
        ctx.globalAlpha = Math.min(1, town.bearTimer / 250)
        ctx.font = '24px serif'
        ctx.fillText('🐻', town.cx - 12, town.cy - fontSize - 4)
        ctx.restore()
        ctx.font = `bold ${fontSize}px Georgia, serif`
      }

      ctx.fillStyle = TOWN_COLORS[town.name] ?? '#C17817'
      for (const l of town.letters) ctx.fillText(l.char, l.x, l.y)
    }
  }, [])

  const loop = useCallback(() => {
    if (visibleRef.current) draw()
    rafRef.current = requestAnimationFrame(loop)
  }, [draw])

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    isMobileRef.current = !window.matchMedia('(pointer: fine)').matches
    measureTowns()
    const ro = new ResizeObserver(() => measureTowns())
    if (containerRef.current) ro.observe(containerRef.current)
    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting }, { threshold: 0.2 })
    if (containerRef.current) io.observe(containerRef.current)
    if (!reducedMotion.current) rafRef.current = requestAnimationFrame(loop)
    else draw()
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); io.disconnect() }
  }, [measureTowns, loop, draw])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (reducedMotion.current || isMobileRef.current) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const mx = e.clientX - rect.left, my = e.clientY - rect.top
    for (const town of townsRef.current) {
      const dx = town.cx - mx, dy = town.cy - my
      if (Math.sqrt(dx * dx + dy * dy) < 80 && !town.scattered) scatterTown(town)
    }
  }, [scatterTown])

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMobileRef.current || reducedMotion.current) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const mx = e.clientX - rect.left, my = e.clientY - rect.top
    for (const town of townsRef.current) {
      const dx = town.cx - mx, dy = town.cy - my
      if (Math.sqrt(dx * dx + dy * dy) < 60) { scatterTown(town); break }
    }
  }, [scatterTown])

  return (
    <div ref={containerRef} className="w-full" style={{ height: 'clamp(200px, 28vh, 300px)' }}>
      <canvas ref={canvasRef} className="w-full h-full cursor-default"
        onMouseMove={handleMouseMove} onClick={handleClick} />
    </div>
  )
}
