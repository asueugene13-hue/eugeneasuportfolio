import { useEffect, useRef } from 'react'
import { Code2, GraduationCap, Rocket, Smartphone } from 'lucide-react'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const steps = [
  {
    icon: GraduationCap,
    phase: 'Foundation',
    title: 'Computer Science',
    text: 'Building academic knowledge in programming, software engineering, databases, networking, and computing.',
  },
  {
    icon: Code2,
    phase: 'Practice',
    title: 'Software Development',
    text: 'Learning by building practical applications and experimenting with web and mobile technologies.',
  },
  {
    icon: Smartphone,
    phase: 'Specialising',
    title: 'Mobile Development',
    text: 'Developing applications using modern mobile technologies, including React Native.',
  },
  {
    icon: Rocket,
    phase: 'Next',
    title: 'Future Growth',
    text: 'Continuing to expand into:',
    list: [
      'Full-Stack Engineering',
      'Cybersecurity',
      'Cloud Engineering',
      'Artificial Intelligence',
      'Embedded Systems',
      'Technology Leadership',
    ],
    future: true,
  },
]

export default function Journey() {
  const lineRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  // Fill the timeline's glowing line as the visitor scrolls through it
  useEffect(() => {
    const line = lineRef.current
    if (!line) return
    if (reduced) {
      line.style.setProperty('--progress', 1)
      return
    }
    let raf = 0
    let active = false
    const update = () => {
      const rect = line.parentElement.getBoundingClientRect()
      const vh = window.innerHeight
      const p = (vh * 0.6 - rect.top) / rect.height
      line.style.setProperty('--progress', Math.max(0, Math.min(1, p)).toFixed(3))
      raf = 0
    }
    const onScroll = () => {
      if (active && !raf) raf = requestAnimationFrame(update)
    }
    const io = new IntersectionObserver(([e]) => {
      active = e.isIntersecting
      if (active) update()
    })
    io.observe(line.parentElement)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <div className="container container--narrow">
        <SectionHeading
          eyebrow="05 — Growth"
          title="Development Journey"
          id="journey-title"
          align="center"
          intro="How I'm growing — from fundamentals to building real products."
        />

        <div className="timeline">
          <div className="timeline__line" ref={lineRef} aria-hidden="true" />
          <ol>
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} className={`timeline__item ${s.future ? 'is-future' : ''}`} delay={60}>
                <span className="timeline__node" aria-hidden="true">
                  <s.icon size={20} />
                </span>
                <div className="timeline__card glass">
                  <span className="timeline__phase">
                    <span aria-hidden="true">0{i + 1}</span> · {s.phase}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  {s.list && (
                    <ul className="chips chips--soft">
                      {s.list.map((item) => (
                        <li key={item} className="chip">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
