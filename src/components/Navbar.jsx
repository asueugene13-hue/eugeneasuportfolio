import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import SocialLinks from './ui/SocialLinks'

const sectionIds = navItems.map((n) => n.id)

function AvailableBadge() {
  if (!profile.availableForOpportunities) return null
  return (
    <span className="available">
      <span className="available__dot" aria-hidden="true" />
      Available for opportunities
    </span>
  )
}

export default function Navbar() {
  const active = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false })
  const listRef = useRef(null)
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  // Glass background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Slide the active indicator under the current section's link
  useLayoutEffect(() => {
    const update = () => {
      const link = listRef.current?.querySelector(`[data-id="${active}"]`)
      if (!link) return
      setIndicator({ left: link.offsetLeft, width: link.offsetWidth, visible: true })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [active])

  // Mobile menu: lock scroll, make the page inert, close on Escape, manage focus
  useEffect(() => {
    const main = document.getElementById('main')
    const footer = document.querySelector('.site-footer')
    document.documentElement.classList.toggle('menu-open', open)
    if (main) main.inert = open
    if (footer) footer.inert = open
    if (!open) return

    menuRef.current?.querySelector('a')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth > 960 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className={`nav ${scrolled || open ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner container">
        <a href="#home" className="nav__logo" aria-label={`${profile.name} — home`} onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <nav className="nav__desktop" aria-label="Primary">
          <ul ref={listRef} className="nav__links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-id={item.id}
                  className={`nav__link ${active === item.id ? 'is-active' : ''}`}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li
              className="nav__indicator"
              aria-hidden="true"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: indicator.width,
                opacity: indicator.visible ? 1 : 0,
              }}
            />
          </ul>
        </nav>

        <div className="nav__end">
          <AvailableBadge />
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {navItems.map((item, i) => (
              <li key={item.id} style={{ '--i': i }}>
                <a
                  href={`#${item.id}`}
                  className={active === item.id ? 'is-active' : ''}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="mobile-menu__num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">
          <AvailableBadge />
          <SocialLinks />
        </div>
      </div>
    </header>
  )
}
