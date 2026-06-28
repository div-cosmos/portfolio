import { useState, useEffect } from 'react'

const links = [
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48)

      const ids = ['about', 'skills', 'experience', 'projects', 'achievements', 'credentials', 'contact']
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

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleLink = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
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
