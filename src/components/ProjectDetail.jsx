import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getProjectBySlug } from '../data/projects'
import {
  ProjectVisual, StatusBadge, Metrics, ProjectLinks, ExtraLinks,
  RoleIcon, BackIcon,
} from './project-bits'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = getProjectBySlug(slug)

  // every detail view starts at the top
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!project) {
    return (
      <main className="pd-notfound">
        <div className="container">
          <div className="pd-notfound__inner">
            <span className="pd-notfound__emoji">🛰️</span>
            <h1 className="pd-notfound__title">Project not found</h1>
            <p className="pd-notfound__sub">
              The project you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <Link to="/" className="btn btn-primary">Back to home</Link>
          </div>
        </div>
      </main>
    )
  }

  const meta = [project.category, project.year].filter(Boolean)

  return (
    <main className="pd">
      {/* ambient background to match the hero */}
      <div className="pd__bg" aria-hidden="true">
        <div className="pd__orb pd__orb1" />
        <div className="pd__orb pd__orb2" />
        <div className="pd__grid" />
      </div>

      <div className="container pd__inner">
        <button className="pd-back" onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}>
          <BackIcon /> Back to projects
        </button>

        <header className="pd-head">
          <div className="proj-meta">
            <StatusBadge status={project.status} />
            {project.role && (
              <span className="proj-meta__role"><RoleIcon /> {project.role}</span>
            )}
            {meta.map(m => <span key={m} className="proj-meta__item">{m}</span>)}
          </div>

          <h1 className="pd-title">{project.title}</h1>
          {project.tagline && <p className="pd-tagline">{project.tagline}</p>}

          <div className="pd-actions">
            <ProjectLinks project={project} />
            <ExtraLinks links={project.links} />
          </div>
        </header>

        <div className="pd-visual">
          <ProjectVisual project={project} />
        </div>

        <div className="pd-grid">
          <div className="pd-main">
            {project.description && (
              <section className="pd-block">
                <h2 className="pd-block__title">Overview</h2>
                <p className="pd-desc">{project.description}</p>
              </section>
            )}

            {project.highlights?.length > 0 && (
              <section className="pd-block">
                <h2 className="pd-block__title">Highlights</h2>
                <ul className="proj-highlights">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="proj-highlight">
                      <span className="proj-highlight__dot" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="pd-side">
            {project.metrics?.length > 0 && (
              <section className="pd-block">
                <h2 className="pd-block__title">Impact</h2>
                <Metrics metrics={project.metrics} />
              </section>
            )}

            {project.tags?.length > 0 && (
              <section className="pd-block">
                <h2 className="pd-block__title">Tech Stack</h2>
                <div className="proj-tags">
                  {project.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                </div>
              </section>
            )}
          </aside>
        </div>

        <div className="pd-foot">
          <button className="pd-back" onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}>
            <BackIcon /> Back to projects
          </button>
        </div>
      </div>
    </main>
  )
}
