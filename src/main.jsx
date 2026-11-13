import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/sections.css'
import './styles/about.css'
import './styles/projects.css'
import './styles/contact.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Loading screen: shown for a brief moment (never longer than ~1.2s),
// then the hero's entrance animations start.
const boot = document.getElementById('boot')
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const MIN = reduced ? 0 : 700
const MAX = 1200

function finishBoot() {
  document.documentElement.classList.add('is-ready')
  if (!boot) return
  boot.classList.add('is-done')
  setTimeout(() => boot.remove(), 600)
}

const fontsReady = document.fonts?.ready ?? Promise.resolve()
const timeout = new Promise((r) => setTimeout(r, MAX))
Promise.race([fontsReady, timeout]).then(() => {
  setTimeout(finishBoot, Math.max(0, MIN - performance.now()))
})
