import useReveal from '../hooks/useReveal'

const SKILL_CATS = [
  {
    title: 'Languages',
    icon: '{ }',
    cls: 'si-blue',
    tags: ['JavaScript (ES6+)', 'TypeScript'],
  },
  {
    title: 'Frameworks & Libs',
    icon: '⚛',
    cls: 'si-purple',
    tags: ['React', 'React Query', 'Redux Toolkit', 'Zustand'],
  },
  {
    title: 'Architecture',
    icon: '🏗',
    cls: 'si-amber',
    tags: ['Micro-Frontends', 'Design Systems', 'WCAG Accessibility', 'Component Architecture'],
  },
  {
    title: 'Performance',
    icon: '⚡',
    cls: 'si-blue',
    tags: ['Code Splitting', 'Lazy Loading', 'Bundle Optimization', 'Web Vitals'],
  },
  {
    title: 'Testing',
    icon: '✓',
    cls: 'si-green',
    tags: ['Jest', 'React Testing Library', 'Playwright (E2E)'],
  },
  {
    title: 'DevOps & CI/CD',
    icon: '⚙',
    cls: 'si-purple',
    tags: ['Git', 'Jenkins', 'CI/CD Pipelines', 'Spinnaker'],
  },
  {
    title: 'Cloud & Infra',
    icon: '☁',
    cls: 'si-amber',
    tags: ['AWS', 'Kubernetes', 'CDN', 'Caching Strategies'],
  },
  {
    title: 'Monitoring & APIs',
    icon: '📊',
    cls: 'si-green',
    tags: ['Sentry', 'Grafana', 'REST APIs', 'JWT Authentication'],
  },
]

function SkillCard({ cat, delay }) {
  const [ref, vis] = useReveal()
  return (
    <div ref={ref} className={`skill-card reveal d${delay}${vis ? ' in' : ''}`}>
      <div className="skill-card__head">
        <div className={`skill-icon ${cat.cls}`}>{cat.icon}</div>
        <span className="skill-card__title">{cat.title}</span>
      </div>
      <div className="skill-tags">
        {cat.tags.map(t => <span key={t} className="stag">{t}</span>)}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">// tech.stack</div>
          <h2 className="sec-title">Skills & <em>Technologies</em></h2>
          <p className="sec-sub">A curated toolkit built across 3+ years of production front-end engineering.</p>
        </div>

        <div className="skills__grid">
          {SKILL_CATS.map((cat, i) => (
            <SkillCard key={cat.title} cat={cat} delay={Math.min((i % 4) + 1, 6)} />
          ))}
        </div>
      </div>
    </section>
  )
}
