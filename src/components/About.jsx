import useReveal from '../hooks/useReveal'

const competencies = [
  'Front-end Development & Architecture',
  'Micro-Frontend Architecture & Scalable UI Systems',
  'State Management & Distributed Frontend Communication',
  'Frontend Performance Optimization',
  'REST API Integration & Async Data Handling',
  'Authentication, Security & Access Control',
  'Design Systems & Reusable Component Architecture',
  'CI/CD Pipelines & Deployment Workflows',
  'Debugging, Testing & Quality Assurance',
  'Agile Development & Sprint Planning',
  'Production Incident Resolution & Operational Stability',
]

export default function About() {
  const [leftRef, leftVis]  = useReveal()
  const [rightRef, rightVis] = useReveal()

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">// about.me</div>
          <h2 className="sec-title">Who I <em>Am</em></h2>
        </div>

        <div className="about__grid">
          <div ref={leftRef} className={`reveal-l${leftVis ? ' in' : ''}`}>
            <div className="about__text">
              <p>
                Front-end Engineer with <strong>rich experience building scalable,
                high-performance web applications</strong> using modern front-end
                technologies and architecture patterns.
              </p>
              <p>
                Strong collaborator with effective communication skills, working closely
                with <strong>cross-functional teams and stakeholders</strong> to deliver
                reliable, production-ready features.
              </p>
              <p>
                Hands-on expertise in <strong>React, TypeScript, Redux Toolkit, Zustand,
                REST APIs, JWT authentication, CI/CD pipelines, Jenkins,</strong> and
                AWS fundamentals.
              </p>
              <p>
                Proven skills to design <strong>modular, maintainable front-end
                systems</strong>, focusing on performance optimization, user experience,
                and production reliability.
              </p>
            </div>
          </div>

          <div ref={rightRef} className={`reveal-r${rightVis ? ' in' : ''}`}>
            <div className="about__comp">
              <h3>Core Competencies</h3>
              <ul className="comp-list">
                {competencies.map((item, i) => (
                  <li key={i} className="comp-item">
                    <span>▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
