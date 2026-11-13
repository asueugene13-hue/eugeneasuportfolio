import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'
import SocialLinks from './ui/SocialLinks'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <a href="#home" className="nav__logo" aria-label={`${profile.name} — back to top`}>
              <span className="nav__mark" aria-hidden="true">
                {profile.initials}
              </span>
              <span className="nav__name">{profile.name}</span>
            </a>
            <p>Building technology for real-world problems.</p>
          </div>

          <nav aria-label="Footer">
            <ul className="site-footer__links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks />
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <a href="#home" className="to-top">
            Back to top <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
