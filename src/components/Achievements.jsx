import useReveal from '../hooks/useReveal'

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    metric: null,
    metricLbl: null,
    title: 'Quarterly Performance Recognition',
    desc: 'Recognized in quarterly performance reviews for consistent on-time delivery, production ownership, and maintaining strong operational reliability across merchant-critical dashboard systems.',
  },
  {
    icon: '🤖',
    metric: '30-40%',
    metricLbl: 'Effort Reduction',
    title: 'AI-Assisted Workflow Innovation',
    desc: 'Accelerated frontend modernization efforts by reducing repetitive implementation effort through reusable AI-assisted engineering workflows leveraging Claude and Blade MCP server context.',
  },
  {
    icon: '🚀',
    metric: '25+',
    metricLbl: 'Releases · 0 Escalations',
    title: 'Flawless Production Record',
    desc: 'Supported 25+ production releases with zero critical production escalations across merchant-facing dashboards, demonstrating strong ownership and operational reliability.',
  },
]

function AchCard({ ach, delay }) {
  const [ref, vis] = useReveal()
  return (
    <div ref={ref} className={`ach-card reveal d${delay}${vis ? ' in' : ''}`}>
      <span className="ach-icon">{ach.icon}</span>
      {ach.metric && (
        <>
          <div className="ach-metric">{ach.metric}</div>
          <div className="ach-metric-lbl">{ach.metricLbl}</div>
        </>
      )}
      <div className="ach-title">{ach.title}</div>
      <div className="ach-desc">{ach.desc}</div>
    </div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">// key.wins</div>
          <h2 className="sec-title">Notable <em>Achievements</em></h2>
          <p className="sec-sub">Milestones that reflect impact, ownership, and engineering excellence.</p>
        </div>

        <div className="ach-grid">
          {ACHIEVEMENTS.map((a, i) => (
            <AchCard key={a.title} ach={a} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
