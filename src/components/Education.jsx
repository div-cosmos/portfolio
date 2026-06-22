import useReveal from '../hooks/useReveal'

const ITEMS = [
  {
    type: 'Education',
    degree: 'Bachelor of Technology (B.Tech.) in Computer Science Engineering',
    institution: 'Giani Zail Singh College of Engineering & Technology, Bathinda, Punjab',
    year: '2021',
    icon: '🎓',
  },
  {
    type: 'Certification',
    degree: 'Meta Front-End Developer Professional Certificate',
    institution: 'Coursera, Meta',
    year: '2026',
    icon: '📜',
  },
]

export default function Education() {
  const [ref, vis] = useReveal()

  return (
    <section id="education" className="section education">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">// credentials</div>
          <h2 className="sec-title">Education & <em>Certifications</em></h2>
        </div>

        <div ref={ref} className={`edu-grid reveal${vis ? ' in' : ''}`}>
          {ITEMS.map((item, i) => (
            <div key={i} className="edu-card">
              <div className="edu-type">{item.type}</div>
              <div className="edu-degree">{item.degree}</div>
              <div className="edu-inst">{item.institution}</div>
              <span className="edu-year">🗓 {item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
