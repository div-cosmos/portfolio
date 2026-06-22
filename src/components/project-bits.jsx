/* Shared building blocks for the Projects section + detail page. */

export const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)

export const CodeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
  </svg>
)

export const BackIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

export const LinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)

export const RoleIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a4 4 0 0 1-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.8 2.8-2.1-2.1z" />
  </svg>
)

export function StatusBadge({ status }) {
  if (!status) return null
  const live = /live|prod|beta/i.test(status)
  return (
    <span className={`proj-status${live ? ' proj-status--live' : ''}`}>
      <span className="proj-status__dot" />
      {status}
    </span>
  )
}

export function ProjectVisual({ project }) {
  return (
    <div className="proj-visual">
      <div className="proj-window">
        <div className="proj-window__bar">
          <span className="proj-dot proj-dot--r" />
          <span className="proj-dot proj-dot--y" />
          <span className="proj-dot proj-dot--g" />
          {project.liveUrl && (
            <span className="proj-window__url">
              {project.liveUrl.replace(/^https?:\/\//, '')}
            </span>
          )}
        </div>
        <div className="proj-window__screen">
          {project.image ? (
            <img src={project.image} alt={project.title} loading="lazy" />
          ) : (
            <div className="proj-window__placeholder">
              <span className="proj-window__emoji">{project.emoji || '🖥️'}</span>
              <span className="proj-window__hint">Screenshot coming soon</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Metrics({ metrics }) {
  if (!metrics?.length) return null
  return (
    <div className="proj-metrics">
      {metrics.map(m => (
        <div key={m.label} className="proj-metric">
          <span className="proj-metric__value">{m.value}</span>
          <span className="proj-metric__label">{m.label}</span>
        </div>
      ))}
    </div>
  )
}

export function ProjectLinks({ project }) {
  if (!project.liveUrl && !project.repoUrl) return null
  return (
    <div className="proj-links">
      {project.liveUrl && (
        <a className="btn btn-primary proj-btn" href={project.liveUrl}
           target="_blank" rel="noreferrer">
          Live Demo <ArrowIcon />
        </a>
      )}
      {project.repoUrl && (
        <a className="btn btn-outline proj-btn" href={project.repoUrl}
           target="_blank" rel="noreferrer">
          <CodeIcon /> Source
        </a>
      )}
    </div>
  )
}

export function ExtraLinks({ links }) {
  if (!links?.length) return null
  return (
    <div className="proj-extralinks">
      {links.map(l => (
        <a key={l.label} className="proj-extralink" href={l.url}
           target="_blank" rel="noreferrer">
          {l.label} <LinkIcon />
        </a>
      ))}
    </div>
  )
}
