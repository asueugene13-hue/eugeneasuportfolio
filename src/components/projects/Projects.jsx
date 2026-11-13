import { Suspense, lazy, useCallback, useMemo, useState } from 'react'
import { projects } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from './ProjectCard'

// The detail view is code-split and prefetched on hover/focus of "View Project"
const loadModal = () => import('./ProjectModal')
const ProjectModal = lazy(loadModal)

export default function Projects() {
  const [selected, setSelected] = useState(null)

  const openers = useMemo(() => Object.fromEntries(projects.map((p) => [p.id, () => setSelected(p)])), [])

  const close = useCallback(() => setSelected(null), [])
  const [flagship, ...rest] = projects

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          eyebrow="04 — Selected work"
          title="Featured Projects"
          id="projects-title"
          intro="Products I'm designing and building to solve real problems — from agriculture and community safety to education, property, food and logistics."
        />

        <div className="projects">
          <ProjectCard project={flagship} onOpen={openers[flagship.id]} onPrefetch={loadModal} />
          <div className="projects__grid">
            {rest.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={openers[p.id]} onPrefetch={loadModal} />
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <Suspense fallback={null}>
          <ProjectModal project={selected} onClose={close} />
        </Suspense>
      )}
    </section>
  )
}
