import Navbar from './components/Navbar'
import Hero from './components/hero/Hero'
import About from './components/About'
import WhatIBuild from './components/WhatIBuild'
import Skills from './components/Skills'
import Projects from './components/projects/Projects'
import Journey from './components/Journey'
import GitHubSection from './components/GitHubSection'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <WhatIBuild />
        <Skills />
        <Projects />
        <Journey />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
