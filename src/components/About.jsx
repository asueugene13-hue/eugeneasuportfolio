import { useEffect, useState } from 'react'
import { Code2, Globe2, GraduationCap, Rocket } from 'lucide-react'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { useInView } from '../hooks/useInView'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import Reveal from './ui/Reveal'
import TechCore from './about/TechCore'

/* ── Content (kept exactly as written) ── */
const TAGLINE = ['Turning Ideas Into Technology.', 'Building Solutions That Matter.']

const PARAGRAPHS = [
  "I'm Eugene Clent, a Computer Science student and aspiring software engineer driven by curiosity, creativity, and a passion for technology.",
  "I believe technology is more than just writing code — it's about identifying problems, challenging conventional thinking, and creating solutions that make people's lives better.",
  "My journey in software development is centered around building meaningful digital products, from modern web platforms and mobile applications to intelligent systems that address real-world challenges. I'm particularly interested in full-stack development, mobile engineering, artificial intelligence, cybersecurity, and emerging technologies.",
  'What drives me is the opportunity to turn an idea into something real. Through projects in agriculture, community safety, education, logistics, and digital marketplaces, I continuously explore how technology can create practical value, especially within Ghana and across Africa.',
  "I'm constantly learning, experimenting with new technologies, improving my engineering skills, and pushing myself beyond what I already know.",
  'My vision is simple: to become an exceptional software engineer, build impactful technology, and contribute to shaping the future through innovation.',
]

const CLOSING = [
  "I don't just want to use technology.",
  'I want to build the technology that moves things forward.',
]

// Words of each sentence with a running index, used to stagger the reveal
const CLOSING_WORDS = (() => {
  let index = 0
  return CLOSING.map((sentence) => sentence.split(' ').map((word) => ({ word, index: index++ })))
})()

/** Counts up to a real number (derived from site data — never invented). */
function CountUp({ value }) {
  const [ref, inView] = useInView()
  const reduced = usePrefersReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / 900, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduced])

  return <span ref={ref}>{reduced ? value : n}</span>
}

const highlights = [
  {
    icon: GraduationCap,
    title: 'Computer Science',
    text: 'Programming, software engineering, databases and networking.',
  },
  {
    icon: Code2,
    title: 'Web & Mobile Development',
    text: 'React, React Native, Node.js and Firebase.',
  },
  {
    icon: Rocket,
    title: 'Multiple Software Projects',
    stat: projects.length,
    text: 'projects across agriculture, safety, education, property, food and logistics.',
  },
  {
    icon: Globe2,
    title: 'Building for Real-World Problems',
    text: 'Solutions shaped by communities and businesses in Ghana and Africa.',
  },
]

/** The first paragraph, with the name given visual weight (text unchanged). */
function Intro({ text }) {
  const [before, after] = text.split(profile.name)
  return (
    <>
      {before}
      <strong className="about__name">{profile.name}</strong>
      {after}
    </>
  )
}

/** Tagline: each line slides up from behind a mask as it scrolls into view. */
function Tagline() {
  const [ref, inView] = useInView()
  return (
    <p ref={ref} className={`about__tagline ${inView ? 'is-visible' : ''}`}>
      {TAGLINE.map((line, i) => (
        <span key={line} className={`about__tagline-line ${i === 1 ? 'is-accent' : ''}`}>
          <span style={{ '--l': i }}>{line}</span>
        </span>
      ))}
    </p>
  )
}

/** Closing statement: words reveal one after another. */
function Closing() {
  const [ref, inView] = useInView({ threshold: 0.35 })
  return (
    <figure ref={ref} className={`about__closing ${inView ? 'is-visible' : ''}`}>
      <span className="about__quote-mark" aria-hidden="true">
        “
      </span>
      <blockquote>
        <p>
          <span className="visually-hidden">“{CLOSING.join(' ')}”</span>
          {CLOSING_WORDS.map((words, si) => (
            <span key={si} className={`about__closing-sentence ${si === 1 ? 'is-accent' : ''}`} aria-hidden="true">
              {words.map(({ word, index }) => (
                <span key={index} className="about__word" style={{ '--w': index }}>
                  {word}{' '}
                </span>
              ))}
            </span>
          ))}
        </p>
      </blockquote>
      <figcaption>— {profile.name}</figcaption>
    </figure>
  )
}

export default function About() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="about__ambient" aria-hidden="true" />
      <div className="container">
        <div className="about">
          <header className="about__head">
            <Reveal>
              <h2 id="about-title" className="about__label">
                <span className="about__label-num" aria-hidden="true">
                  01
                </span>
                About Me
              </h2>
            </Reveal>
            <Tagline />
          </header>

          <div className="about__visual">
            <TechCore />
          </div>

          <Reveal className="about__body" delay={80}>
            {PARAGRAPHS.map((text, i) => (
              <p key={i} className="about__para">
                {i === 0 ? <Intro text={text} /> : text}
              </p>
            ))}
          </Reveal>
        </div>

        <Closing />

        <ul className="highlights" aria-label="Personal highlights">
          {highlights.map((h, i) => (
            <Reveal as="li" key={h.title} className="highlight glass" delay={i * 90}>
              <span className="highlight__icon" aria-hidden="true">
                <h.icon size={22} />
              </span>
              <h3>{h.title}</h3>
              <p>
                {h.stat !== undefined && (
                  <strong className="highlight__stat">
                    <CountUp value={h.stat} />{' '}
                  </strong>
                )}
                {h.text}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
