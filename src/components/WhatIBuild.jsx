import { BrainCircuit, Globe, ShieldCheck, Smartphone, Sprout } from 'lucide-react'
import { useTilt } from '../hooks/useTilt'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const areas = [
  { icon: Smartphone, title: 'Mobile Applications', text: 'Building practical applications for Android and mobile users.' },
  { icon: Globe, title: 'Web Applications', text: 'Creating responsive and modern web platforms.' },
  { icon: BrainCircuit, title: 'Intelligent Systems', text: 'Exploring AI integration and intelligent digital solutions.' },
  { icon: ShieldCheck, title: 'Cybersecurity', text: 'Developing knowledge in security and secure technology systems.' },
  {
    icon: Sprout,
    title: 'Technology for Africa',
    text: 'Building solutions focused on practical problems affecting communities and businesses.',
    wide: true,
  },
]

function AreaCard({ area, index }) {
  const tilt = useTilt(5)
  return (
    <Reveal
      as="li"
      className={`area glass spotlight ${area.wide ? 'area--wide' : ''}`}
      delay={index * 80}
      {...tilt}
    >
      <span className="area__icon" aria-hidden="true">
        <area.icon size={24} />
      </span>
      <div>
        <h3>{area.title}</h3>
        <p>{area.text}</p>
      </div>
    </Reveal>
  )
}

export default function WhatIBuild() {
  return (
    <section id="what-i-build" className="section section--tight" aria-labelledby="build-title">
      <div className="container">
        <SectionHeading
          eyebrow="02 — Focus"
          title="What I Build"
          id="build-title"
          intro="The areas I spend my time learning, experimenting and shipping in."
        />
        <ul className="areas">
          {areas.map((a, i) => (
            <AreaCard key={a.title} area={a} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
