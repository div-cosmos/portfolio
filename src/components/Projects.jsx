import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import { PROJECTS } from '../data/projects'
import { ProjectVisual, StatusBadge, ArrowIcon } from './project-bits'

const ChevronIcon = ({ dir = 'left' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
       style={{ transform: dir === 'right' ? 'rotate(180deg)' : 'none' }}>
    <path d="m15 18-6-6 6-6" />
  </svg>
)

/* A compact, clickable teaser. Shows only the impactful bits;
   the full story lives on /#/projects/<slug>. */
function ProjectTeaser({ project }) {
  const [ref, vis] = useReveal()

  return (
    <Link
      ref={ref}
      to={`/projects/${project.slug}`}
      className={`proj-teaser reveal${vis ? ' in' : ''}`}
      aria-label={`View ${project.title} details`}
    >
      <div className="proj-teaser__visual">
        <ProjectVisual project={project} />
      </div>

      <div className="proj-teaser__body">
        <div className="proj-meta">
          <StatusBadge status={project.status} />
          {project.category && <span className="proj-meta__item">{project.category}</span>}
        </div>

        <h3 className="proj-teaser__title">{project.title}</h3>
        {project.tagline && <p className="proj-tagline">{project.tagline}</p>}

        {project.tags?.length > 0 && (
          <div className="proj-tags">
            {project.tags.slice(0, 4).map(t => <span key={t} className="proj-tag">{t}</span>)}
            {project.tags.length > 4 && (
              <span className="proj-tag proj-tag--more">+{project.tags.length - 4}</span>
            )}
          </div>
        )}

        <span className="proj-teaser__cta">
          View Project <ArrowIcon />
        </span>
      </div>
    </Link>
  )
}

function Carousel({ projects }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [overflow, setOverflow] = useState(false)

  // recompute whether the track overflows (controls only show if it does)
  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setOverflow(track.scrollWidth - track.clientWidth > 8)
  }, [])

  useEffect(() => {
    measure()
    const track = trackRef.current
    if (!track) return

    const ro = new ResizeObserver(measure)
    ro.observe(track)

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const children = Array.from(track.children)
        const center = track.scrollLeft + track.clientWidth / 2
        let nearest = 0
        let best = Infinity
        children.forEach((c, i) => {
          const mid = c.offsetLeft + c.clientWidth / 2
          const dist = Math.abs(mid - center)
          if (dist < best) { best = dist; nearest = i }
        })
        setIndex(nearest)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      ro.disconnect()
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [measure])

  const scrollToIndex = i => {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.max(0, Math.min(i, projects.length - 1))
    const slide = track.children[clamped]
    if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
  }

  return (
    <div className="proj-carousel">
      <div ref={trackRef} className={`proj-track${overflow ? '' : ' proj-track--fit'}`}>
        {projects.map(p => <ProjectTeaser key={p.slug} project={p} />)}
      </div>

      {overflow && (
        <div className="proj-controls">
          <button
            className="proj-arrow"
            onClick={() => scrollToIndex(index - 1)}
            disabled={index === 0}
            aria-label="Previous projects"
          >
            <ChevronIcon dir="left" />
          </button>

          <div className="proj-dots">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                className={`proj-dotnav${i === index ? ' active' : ''}`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to ${p.title}`}
              />
            ))}
          </div>

          <button
            className="proj-arrow"
            onClick={() => scrollToIndex(index + 1)}
            disabled={index === projects.length - 1}
            aria-label="Next projects"
          >
            <ChevronIcon dir="right" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  if (PROJECTS.length === 0) return null

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">// selected.work</div>
          <h2 className="sec-title">Featured <em>Projects</em></h2>
          <p className="sec-sub">
            A selection of things I&apos;ve designed and built. Click any project to dive in.
          </p>
        </div>

        <Carousel projects={PROJECTS} />
      </div>
    </section>
  )
}
