import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import { useTilt } from '../../hooks/useTilt'
import Button from '../ui/Button'
import { BrandIcon } from '../ui/BrandIcon'
import { brandIcons } from '../../data/brandIcons'
import { profile } from '../../data/profile'
import StatusBadge from '../ui/StatusBadge'
import Reveal from '../ui/Reveal'
import ProjectVisual from './ProjectVisual'

const GithubIcon = (props) => <BrandIcon icon={brandIcons.github} {...props} />

export function TechChips({ tech, className = '' }) {
  return (
    <ul className={`chips ${className}`} aria-label="Technology stack">
      {tech.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  )
}

export function ProjectLinks({ project, onView, onPrefetch, viewLabel = 'View Project' }) {
  return (
    <div className="project__actions">
      {onView && (
        <Button variant="primary" iconRight={ArrowUpRight} onClick={onView} onPointerEnter={onPrefetch} onFocus={onPrefetch}>
          {viewLabel}
          <span className="visually-hidden">: {project.name}</span>
        </Button>
      )}
      {project.links.github ? (
        <Button variant="ghost" href={project.links.github} icon={GithubIcon}>
          GitHub
          <span className="visually-hidden"> repository for {project.name}</span>
        </Button>
      ) : (
        // No public repo for this project yet: link to the GitHub profile instead,
        // labelled so it doesn't imply this project's code is there.
        <Button
          variant="ghost"
          href={profile.social.github}
          icon={GithubIcon}
          title="This project's repository isn't public yet. View my GitHub profile."
        >
          My GitHub
        </Button>
      )}
      <Button variant="ghost" href={project.links.demo} icon={ArrowUpRight}>
        Live Demo
      </Button>
    </div>
  )
}

export default function ProjectCard({ project, onOpen, onPrefetch, index = 0 }) {
  const tilt = useTilt(project.flagship ? 2.5 : 4)
  const flagship = project.flagship
  const features = flagship ? project.features : project.features.slice(0, 4)

  return (
    <Reveal
      as="article"
      className={`project glass spotlight ${flagship ? 'project--flagship' : ''}`}
      style={{ '--accent': project.accent }}
      delay={flagship ? 0 : (index % 2) * 100}
      aria-labelledby={`${project.id}-title`}
      {...tilt}
    >
      <div className="project__media">
        <ProjectVisual type={project.visual} accent={project.accent} />
        {flagship && <span className="project__flag">Flagship project</span>}
      </div>

      <div className="project__body">
        <div className="project__meta">
          <StatusBadge stage={project.stage} label={project.statusLabel} />
        </div>
        <h3 id={`${project.id}-title`} className="project__title">
          {project.name}
        </h3>
        <p className="project__subtitle">{project.subtitle}</p>
        <p className="project__desc">{project.description}</p>

        <div className="project__problem">
          <span className="project__label">Problem it solves</span>
          <p>{project.problem}</p>
        </div>

        <div>
          <span className="project__label">Key features</span>
          <ul className={`features ${flagship ? 'features--cols' : ''}`}>
            {features.map((f) => (
              <li key={f}>
                <Check size={15} aria-hidden="true" />
                {f}
              </li>
            ))}
            {!flagship && project.features.length > 4 && (
              <li className="features__more">+{project.features.length - 4} more in project details</li>
            )}
          </ul>
        </div>

        {flagship && project.gps && (
          <div className="gps-callout">
            <MapPin size={18} aria-hidden="true" />
            <p>
              <strong>GPS farm boundary system — </strong>
              {project.gps.intro}
            </p>
          </div>
        )}

        <TechChips tech={project.tech} />
        <ProjectLinks project={project} onView={onOpen} onPrefetch={onPrefetch} />
      </div>
    </Reveal>
  )
}
