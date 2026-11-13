import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { profile } from '../../data/profile'
import {
  hasWebGL,
  isConstrainedDevice,
  useFinePointer,
  useMediaQuery,
  usePrefersReducedMotion,
} from '../../hooks/useMedia'
import Button from '../ui/Button'
import SplineScene from '../SplineScene'
import HeroGlobe from './HeroGlobe'

function SplitWord({ word, offset, accent = false }) {
  const chars = [...word]
  return (
    <span className={`hero__word ${accent ? 'hero__word--accent' : ''}`} aria-hidden="true">
      {chars.map((ch, i) => (
        // --j/--n let each letter show its slice of one continuous gradient
        <span key={i} className="hero__char" data-c={ch} style={{ '--i': offset + i, '--j': i, '--n': chars.length }}>
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const frame = useRef(0)
  const reduced = usePrefersReducedMotion()
  const finePointer = useFinePointer()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [idle, setIdle] = useState(false)

  // Choose the visual: full Spline scene only when it's configured and the
  // device can comfortably run it; otherwise the lightweight canvas globe.
  const sceneUrl = isMobile ? profile.splineSceneMobile : profile.splineScene
  const useSpline = Boolean(sceneUrl) && !reduced && !isConstrainedDevice() && hasWebGL()

  // Defer the heavy 3D download until the browser is idle after first paint
  useEffect(() => {
    if (!useSpline) return
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 600))
    const cancel = window.cancelIdleCallback || clearTimeout
    const id = ric(() => setIdle(true), { timeout: 1800 })
    return () => cancel(id)
  }, [useSpline])

  // Mouse parallax (fine pointers only, respects reduced motion)
  const onPointerMove = (e) => {
    if (!finePointer || reduced) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    pointer.current = { x, y }
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      heroRef.current?.style.setProperty('--px', x.toFixed(3))
      heroRef.current?.style.setProperty('--py', y.toFixed(3))
    })
  }

  const [first, last] = profile.name.toUpperCase().split(' ')
  const globe = <HeroGlobe reducedMotion={reduced} pointer={pointer} />

  return (
    <section id="home" className="hero" ref={heroRef} onPointerMove={onPointerMove} aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--blue" />
        <div className="hero__glow hero__glow--purple" />
      </div>

      <div className="hero__visual">
        {useSpline && idle ? (
          <SplineScene
            scene={sceneUrl}
            title="Interactive 3D scene representing software, technology and innovation"
            eager
            fallback={globe}
          />
        ) : (
          globe
        )}
      </div>

      <div className="hero__content container">
        <p className="hero__kicker hero-in" style={{ '--d': '0ms' }}>
          <span className="hero__kicker-line" aria-hidden="true" />
          Computer Science · Software Developer · {profile.location}
        </p>

        <h1 id="hero-title" className="hero__title">
          <span className="visually-hidden">{profile.name}</span>
          <SplitWord word={first} offset={0} /> <SplitWord word={last} offset={first.length} accent />
        </h1>

        <p className="hero__subtitle hero-in" style={{ '--d': '520ms' }}>
          {profile.tagline}
        </p>

        <p className="hero__desc hero-in" style={{ '--d': '640ms' }}>
          I am a Computer Science student and software developer passionate about building modern web and
          mobile applications, intelligent systems, and digital solutions that solve meaningful problems.
        </p>

        <div className="hero__actions hero-in" style={{ '--d': '760ms' }}>
          <Button href="#projects" variant="primary" size="lg" iconRight={ArrowRight}>
            Explore My Work
          </Button>
          <Button href="#contact" variant="ghost" size="lg" icon={MessageCircle}>
            Let&apos;s Connect
          </Button>
        </div>
      </div>

      <a href="#about" className="scroll-cue hero-in" style={{ '--d': '1100ms' }}>
        <span className="scroll-cue__mouse" aria-hidden="true">
          <span className="scroll-cue__wheel" />
        </span>
        <span className="scroll-cue__label">Scroll to explore</span>
      </a>
    </section>
  )
}
