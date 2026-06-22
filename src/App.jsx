import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Skills       from './components/Skills'
import Experience   from './components/Experience'
import Projects     from './components/Projects'
import Achievements from './components/Achievements'
import Education    from './components/Education'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()

  // when returning from a project detail page, land on the Projects section
  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo)
      if (el) {
        // wait a frame so the section is laid out before scrolling
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
      }
      // clear the state so a refresh/re-render doesn't re-scroll
      navigate('/', { replace: true, state: null })
    }
  }, [location, navigate])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
