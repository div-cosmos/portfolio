import useReveal from '../hooks/useReveal'

const JOBS = [
  {
    company: 'Razorpay Software Pvt. Ltd.',
    via: 'Contract via Ascendion',
    role: 'Front-end Engineer',
    period: 'Dec 2024 - Present',
    location: 'Bengaluru',
    logoText: 'R',
    logoBg: 'linear-gradient(135deg, #3395ff, #0a5cbf)',
    bullets: [
      'Spearheaded migration of legacy React dashboards to Razorpay\'s native design system (Blade), improving UI consistency and maintainability by building custom Claude skill workflows leveraging Blade MCP server context.',
      'Contributed to developing a unified dashboard, enabling seamless integration of multiple products and improving platform scalability.',
      'Led migration of 300K+ banking merchants in India and international merchants across US, Singapore, and Malaysia from legacy dashboards to the modern platform.',
      'Contributed to micro-frontend transformation by modularizing dashboard features into independently deployable micro apps, strengthening release reliability with Playwright, Jest, and React Testing Library.',
      'Managed production incident rotations: debugging, root cause analysis, hotfix deployment, and merchant-impact mitigation using Sentry and Grafana.',
      'Orchestrated production deployments and release workflows using Spinnaker on Kubernetes-based infrastructure, coordinating rollout validation and rollback activities.',
    ],
    tags: ['React', 'TypeScript', 'Micro-Frontends', 'Blade DS', 'Playwright', 'Jest', 'Kubernetes', 'Spinnaker', 'Sentry', 'Grafana'],
  },
  {
    company: 'Viamagus Technologies',
    via: null,
    role: 'Front-end Engineer',
    period: 'Nov 2022 - Jul 2024',
    location: 'Bengaluru',
    logoText: 'V',
    logoBg: 'linear-gradient(135deg, #7c3aed, #4c1d95)',
    bullets: [
      'Developed and maintained scalable, responsive web applications using React and TypeScript, ensuring consistent performance across devices and browsers.',
      'Integrated RESTful APIs and third-party services, implementing robust asynchronous data handling and error management for reliable workflows.',
      'Improved application efficiency through lazy loading, code splitting, and render optimizations, reducing unnecessary re-renders.',
      'Contributed to modular component design and code reviews, enhancing reusability and maintainability across projects.',
      'Collaborated closely with product stakeholders to translate business requirements into production-ready features, supporting agile delivery cycles.',
    ],
    tags: ['React', 'TypeScript', 'REST APIs', 'Redux Toolkit', 'Performance Optimization', 'Jest'],
  },
]

function ExpItem({ job, delay }) {
  const [ref, vis] = useReveal()
  return (
    <div className="tl-item">
      <div className="tl-dot" />
      <div ref={ref} className={`exp-card reveal d${delay}${vis ? ' in' : ''}`}>
        <div className="exp-card__top">
          <div className="exp-card__left">
            <div className="exp-logo" style={{ background: job.logoBg }}>{job.logoText}</div>
            <div>
              <div className="exp-card__company">{job.company}</div>
              {job.via && <div className="exp-card__via">{job.via}</div>}
            </div>
          </div>
          <div className="exp-card__right">
            <span className="exp-period">{job.period}</span>
            <span className="exp-loc">📍 {job.location}</span>
          </div>
        </div>

        <div className="exp-role">&gt; {job.role}</div>

        <ul className="exp-bullets">
          {job.bullets.map((b, i) => (
            <li key={i} className="exp-bullet">
              <span className="exp-bullet-dot" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="exp-tags">
          {job.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">// work.history</div>
          <h2 className="sec-title">Work <em>Experience</em></h2>
          <p className="sec-sub">3+ years building production-grade frontends at scale.</p>
        </div>

        <div className="timeline">
          {JOBS.map((job, i) => (
            <ExpItem key={job.company} job={job} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
