import useReveal from "../hooks/useReveal";

const ITEMS = [
  {
    type: "Certification",
    degree: "Meta Front-End Developer Professional Certificate",
    institution: "Coursera, Meta",
    year: "2026",
    icon: "📜",
  },
];

export default function Credentials() {
  const [ref, vis] = useReveal();

  return (
    <section id="credentials" className="section credentials">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">// always.learning</div>
          <h2 className="sec-title">
            Earned <em>Credentials</em>
          </h2>
        </div>

        <div ref={ref} className={`cred-grid reveal${vis ? " in" : ""}`}>
          {ITEMS.map((item, i) => (
            <div key={i} className="cred-card">
              <div className="cred-type">{item.type}</div>
              <div className="cred-degree">{item.degree}</div>
              <div className="cred-inst">{item.institution}</div>
              <span className="cred-year">🗓 {item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
