import { useEffect, useRef } from 'react'

/**
 * Lightweight 2D-canvas "data globe": a rotating dotted sphere with a
 * network of connected nodes and an orbiting signal.
 *
 * Used as the hero visual on phones / low-power devices, while the Spline
 * scene loads, and whenever WebGL or Spline isn't available.
 *  - No dependencies, ~zero bundle cost
 *  - Pauses when off-screen or the tab is hidden
 *  - Renders a single static frame for reduced-motion users
 */
export default function HeroGlobe({ className = '', reducedMotion = false, pointer }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const small = window.matchMedia('(max-width: 768px)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2)

    // Fibonacci sphere distribution
    const COUNT = small ? 360 : 720
    const points = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, node: i % 23 === 0 })
    }
    const nodes = points.filter((p) => p.node)
    const links = []
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const d = Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y, nodes[a].z - nodes[b].z)
        if (d < 0.62) links.push([nodes[a], nodes[b]])
      }
    }

    let width = 0
    let height = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    let rotY = 0.6
    let tiltX = -0.32
    let raf = 0
    let last = performance.now()
    let running = false
    let visible = true

    const project = (p, cy, sy, cx, sx, R, ox, oy) => {
      // rotate around Y, then X
      const x1 = p.x * cy - p.z * sy
      const z1 = p.x * sy + p.z * cy
      const y2 = p.y * cx - z1 * sx
      const z2 = p.y * sx + z1 * cx
      const persp = 2.6 / (2.6 - z2)
      return { x: ox + x1 * R * persp, y: oy + y2 * R * persp, z: z2 }
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height)
      const R = Math.min(width, height) * (small ? 0.36 : 0.34)
      const ox = width / 2
      const oy = height / 2
      const cy = Math.cos(rotY)
      const sy = Math.sin(rotY)
      const cx = Math.cos(tiltX)
      const sx = Math.sin(tiltX)

      // atmosphere glow
      const glow = ctx.createRadialGradient(ox, oy, R * 0.6, ox, oy, R * 1.45)
      glow.addColorStop(0, 'rgba(79,140,255,0.10)')
      glow.addColorStop(0.6, 'rgba(139,92,246,0.06)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      // links between nodes on the visible hemisphere
      ctx.lineWidth = 1
      for (const [a, b] of links) {
        const pa = project(a, cy, sy, cx, sx, R, ox, oy)
        const pb = project(b, cy, sy, cx, sx, R, ox, oy)
        if (pa.z < -0.1 || pb.z < -0.1) continue
        const alpha = 0.08 + 0.22 * Math.min(pa.z, pb.z)
        ctx.strokeStyle = `rgba(120,150,255,${alpha})`
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.stroke()
      }

      // dots
      for (const p of points) {
        const q = project(p, cy, sy, cx, sx, R, ox, oy)
        const depth = (q.z + 1) / 2 // 0 back → 1 front
        const mix = (p.y + 1) / 2
        const r = Math.round(79 + (139 - 79) * mix)
        const g = Math.round(140 + (92 - 140) * mix)
        if (p.node && q.z > 0) {
          ctx.fillStyle = `rgba(${r},${g},255,${0.25 * depth})`
          ctx.beginPath()
          ctx.arc(q.x, q.y, 5 * depth + 1, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = `rgba(230,236,255,${0.5 + 0.5 * depth})`
          ctx.beginPath()
          ctx.arc(q.x, q.y, 1.8, 0, Math.PI * 2)
          ctx.fill()
        } else {
          const size = 0.6 + depth * 1.3
          ctx.fillStyle = `rgba(${r},${g},255,${0.08 + depth * 0.62})`
          ctx.fillRect(q.x - size / 2, q.y - size / 2, size, size)
        }
      }

      // orbit ring + travelling signal
      const ringRx = R * 1.32
      const ringRy = R * 0.34
      ctx.save()
      ctx.translate(ox, oy)
      ctx.rotate(-0.38)
      ctx.strokeStyle = 'rgba(139,92,246,0.22)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.ellipse(0, 0, ringRx, ringRy, 0, 0, Math.PI * 2)
      ctx.stroke()
      const ang = t * 0.00045
      const sxp = Math.cos(ang) * ringRx
      const syp = Math.sin(ang) * ringRy
      const sig = ctx.createRadialGradient(sxp, syp, 0, sxp, syp, 14)
      sig.addColorStop(0, 'rgba(160,190,255,0.95)')
      sig.addColorStop(1, 'rgba(79,140,255,0)')
      ctx.fillStyle = sig
      ctx.beginPath()
      ctx.arc(sxp, syp, 14, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const loop = (now) => {
      const dt = Math.min(now - last, 64)
      last = now
      rotY += dt * 0.00012
      const target = pointer?.current
      if (target) {
        rotY += target.x * dt * 0.00018
        tiltX += (-0.32 + target.y * 0.25 - tiltX) * 0.04
      }
      draw(now)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reducedMotion || !visible || document.hidden) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    draw(0)
    start()

    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reducedMotion, pointer])

  return <canvas ref={canvasRef} className={`hero-globe ${className}`} aria-hidden="true" />
}
