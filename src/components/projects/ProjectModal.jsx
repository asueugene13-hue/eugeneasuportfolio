import { useEffect, useRef } from 'react'
import { AlertTriangle, Check, Lightbulb, Sparkles, Target, Wrench, X } from 'lucide-react'
import { STAGES } from '../../data/projects'
import StatusBadge from '../ui/StatusBadge'
import ProjectVisual from './ProjectVisual'
import { ProjectLinks, TechChips } from './ProjectCard'

function StatusTrack({ stage }) {
  const current = STAGES.findIndex((s) => s.id === stage)
  return (
    <ol className="track" aria-label="Development status">
      {STAGES.map((s, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo'
        return (
          <li key={s.id} className={`track__step is-${state}`} aria-current={state === 'current' ? 'step' : undefined}>
            <span className="track__dot" aria-hidden="true">
              {state === 'done' && <Check size={12} />}
            </span>
            <span className="track__label">{s.label}</span>
          </li>
        )
      })}
    </ol>
  )
}

function GpsDiagram() {
  const pts = [
    [60, 70],
    [170, 36],
    [250, 92],
    [226, 186],
    [110, 204],
    [40, 150],
  ]
  const d = `M${pts.map((p) => p.join(' ')).join(' L')} Z`
  return (
    <svg viewBox="0 0 300 240" className="gps-diagram" aria-hidden="true">
      <defs>
        <pattern id="gps-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.05)" />
        </pattern>
      </defs>
      <rect width="300" height="240" fill="url(#gps-grid)" />
      <path d={d} className="gps-diagram__fill" />
      <path d={d} className="gps-diagram__line" pathLength="1" />
      {pts.map(([x, y], i) => (
        <g key={i} className="gps-diagram__pt" style={{ '--i': i }}>
          <circle cx={x} cy={y} r="9" />
          <circle cx={x} cy={y} r="3.5" />
        </g>
      ))}
    </svg>
  )
}

function Block({ icon: Icon, title, children }) {
  return (
    <section className="detail__block">
      <h3>
        <Icon size={18} aria-hidden="true" />
        {title}
      </h3>
      {children}
    </section>
  )
}

export default function ProjectModal({ project, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    const opener = document.activeElement
    if (!dialog.open) dialog.showModal()
    document.documentElement.classList.add('modal-open')
    return () => {
      document.documentElement.classList.remove('modal-open')
      opener?.focus?.()
    }
  }, [])

  // Clicking the backdrop (outside the panel) closes the dialog
  const onClick = (e) => {
    if (e.target === ref.current) ref.current.close()
  }

  return (
    <dialog
      ref={ref}
      className="detail"
      style={{ '--accent': project.accent }}
      aria-labelledby="detail-title"
      onClose={onClose}
      onClick={onClick}
    >
      <div className="detail__panel">
        <button type="button" className="detail__close" aria-label="Close project details" onClick={() => ref.current.close()}>
          <X size={20} aria-hidden="true" />
        </button>

        <header className="detail__hero">
          <ProjectVisual type={project.visual} accent={project.accent} />
          <div className="detail__intro">
            <StatusBadge stage={project.stage} label={project.statusLabel} />
            <h2 id="detail-title">{project.name}</h2>
            <p className="detail__subtitle">{project.subtitle}</p>
            <p>{project.description}</p>
          </div>
        </header>

        <div className="detail__grid">
          <Block icon={Target} title="The Problem">
            <p>{project.problem}</p>
          </Block>
          <Block icon={Lightbulb} title="The Solution">
            <p>{project.solution}</p>
          </Block>
        </div>

        <Block icon={Check} title="Key Features">
          <ul className="features features--cols features--lg">
            {project.features.map((f) => (
              <li key={f}>
                <Check size={15} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </Block>

        {project.gps && (
          <section className="gps">
            <div className="gps__text">
              <p className="eyebrow">Feature deep-dive</p>
              <h3>GPS Farm Boundary System</h3>
              <p>{project.gps.intro}</p>
              <ol className="gps__steps">
                {project.gps.steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="gps__num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <strong>{s.title}</strong>
                      <p>{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <GpsDiagram />
          </section>
        )}

        {project.future && (
          <Block icon={Sparkles} title="Future Features">
            <ul className="chips chips--soft">
              {project.future.map((f) => (
                <li key={f} className="chip">
                  {f}
                </li>
              ))}
            </ul>
          </Block>
        )}

        <div className="detail__grid">
          <Block icon={Wrench} title="Technology Stack">
            <TechChips tech={project.tech} />
          </Block>
          <Block icon={Sparkles} title="Development Status">
            <StatusTrack stage={project.stage} />
          </Block>
        </div>

        {project.challenges?.length > 0 && (
          <Block icon={AlertTriangle} title="Challenges">
            <ul className="challenges">
              {project.challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Block>
        )}

        <footer className="detail__footer">
          <ProjectLinks project={project} />
        </footer>
      </div>
    </dialog>
  )
}
