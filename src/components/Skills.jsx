import { useState } from 'react'
import { skillGroups } from '../data/skills'
import { BrandIcon } from './ui/BrandIcon'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

// Very dark brand colours (e.g. GitHub, SQLite) are lifted so they stay visible on the dark UI
function displayColor(hex) {
  const n = parseInt(hex, 16)
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum < 0.35 ? '#e6e9f2' : `#${hex}`
}

function TechTile({ item, id, open, onToggle }) {
  const color = item.brand ? displayColor(item.brand.hex) : 'var(--blue-soft)'
  const descId = `${id}-desc`
  return (
    <li className={`tech ${open ? 'is-open' : ''}`} style={{ '--brand': color }}>
      <button
        type="button"
        className="tech__btn"
        aria-expanded={open}
        aria-describedby={descId}
        onClick={onToggle}
      >
        <span className="tech__icon" aria-hidden="true">
          {item.brand ? <BrandIcon icon={item.brand} size={26} /> : <item.icon size={26} strokeWidth={1.6} />}
        </span>
        <span className="tech__name">{item.name}</span>
      </button>
      <p id={descId} className="tech__about" role="note">
        {item.about}
      </p>
    </li>
  )
}

export default function Skills() {
  const [openId, setOpenId] = useState(null)

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          eyebrow="03 — Toolkit"
          title="Tech Stack"
          id="skills-title"
          intro="Technologies I build with today — and the ones I'm growing into. Hover or tap any technology to see how I use it."
        />

        <div className="stack">
          {skillGroups.map((group, gi) => (
            <Reveal
              key={group.id}
              className={`stack__group glass ${group.growing ? 'stack__group--growing' : ''}`}
              delay={(gi % 3) * 90}
            >
              <div className="stack__head">
                <h3>{group.title}</h3>
                {group.growing ? (
                  <span className="stack__tag">Learning</span>
                ) : (
                  <span className="stack__count" aria-label={`${group.items.length} technologies`}>
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                )}
              </div>
              <ul className="stack__items">
                {group.items.map((item) => {
                  const id = `${group.id}-${item.name.replace(/\W+/g, '-').toLowerCase()}`
                  return (
                    <TechTile
                      key={id}
                      id={id}
                      item={item}
                      open={openId === id}
                      onToggle={() => setOpenId((cur) => (cur === id ? null : id))}
                    />
                  )
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
