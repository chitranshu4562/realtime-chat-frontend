import { useEffect, useRef } from "react"

/** Reads `H S% L%` from `--landing-particle-fill` on the canvas (inherited from landing `.root`). */
function parseLandingParticleFill(value: string): {
  h: number
  s: number
  l: number
} | null {
  const parts = value.trim().split(/\s+/)
  if (parts.length < 3) return null
  const h = Number(parts[0])
  const s = Number.parseFloat(parts[1]!)
  const l = Number.parseFloat(parts[2]!)
  if (!Number.isFinite(h) || !Number.isFinite(s) || !Number.isFinite(l)) {
    return null
  }
  return { h, s, l }
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particleHslRef = useRef({ h: 232, s: 72, l: 52 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const syncParticleFill = () => {
      const raw = getComputedStyle(canvas).getPropertyValue("--landing-particle-fill")
      const parsed = parseLandingParticleFill(raw)
      if (parsed) particleHslRef.current = parsed
    }
    syncParticleFill()
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    mq.addEventListener("change", syncParticleFill)

    let animId: number
    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      const { h, s, l } = particleHslRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${p.opacity})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${0.08 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      mq.removeEventListener("change", syncParticleFill)
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden
    />
  )
}
