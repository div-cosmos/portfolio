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

  // coming back from a project page? jump to the section we left from
  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo)
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
      navigate('/', { replace: true, state: null }) // drop the state so we don't re-scroll
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
