import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { BrandIcon } from './BrandIcon'
import { brandIcons } from '../../data/brandIcons'

const links = [
  { id: 'github', label: 'GitHub', href: profile.social.github },
  { id: 'linkedin', label: 'LinkedIn', href: profile.social.linkedin },
  { id: 'whatsapp', label: 'WhatsApp', href: profile.social.whatsapp },
  { id: 'email', label: 'Email', href: profile.email ? `mailto:${profile.email}` : '' },
]

function Icon({ id }) {
  return id === 'email' ? <Mail size={20} aria-hidden="true" /> : <BrandIcon icon={brandIcons[id]} />
}

/** Social icon links. Missing links render as disabled "coming soon" icons. */
export default function SocialLinks({ className = '', withLabels = false }) {
  return (
    <ul className={`socials ${withLabels ? 'socials--labels' : ''} ${className}`}>
      {links.map((link) => (
        <li key={link.id}>
          {link.href ? (
            <a
              className="socials__link"
              href={link.href}
              aria-label={withLabels ? undefined : link.label}
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon id={link.id} />
              {withLabels && <span>{link.label}</span>}
            </a>
          ) : (
            <span
              className="socials__link is-disabled"
              aria-disabled="true"
              title={`${link.label} — coming soon`}
              aria-label={withLabels ? undefined : `${link.label} (coming soon)`}
              role={withLabels ? undefined : 'img'}
            >
              <Icon id={link.id} />
              {withLabels && (
                <span>
                  {link.label} <small>Coming soon</small>
                </span>
              )}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
