import { useState, useEffect } from 'react'

const links = [
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Education',    href: '#education' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48)

      const ids = ['about', 'skills', 'experience', 'projects', 'achievements', 'education', 'contact']
      const offset = window.scrollY + 120
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && offset >= el.offsetTop) current = id
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#" className="nav__logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          DV
        </a>

        <ul className={`nav__links${open ? ' open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`nav__link${active === l.href.slice(1) ? ' active' : ''}`}
                onClick={e => handleLink(e, l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav__burger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
