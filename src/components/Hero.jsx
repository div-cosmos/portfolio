import { useState, useEffect } from "react";

const ROLES = [
  "Front-end Engineer",
  "React Specialist",
  "Micro-Frontend Architect",
  "Performance Optimizer",
  "UI Systems Builder",
];

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function Hero() {
  const [state, setState] = useState({ text: "", idx: 0, phase: "typing" });

  useEffect(() => {
    const role = ROLES[state.idx];
    let t;

    if (state.phase === "typing") {
      if (state.text === role) {
        t = setTimeout(
          () => setState((s) => ({ ...s, phase: "pausing" })),
          2000,
        );
      } else {
        t = setTimeout(
          () =>
            setState((s) => ({ ...s, text: role.slice(0, s.text.length + 1) })),
          88,
        );
      }
    } else if (state.phase === "pausing") {
      t = setTimeout(() => setState((s) => ({ ...s, phase: "erasing" })), 100);
    } else {
      if (state.text === "") {
        setState((s) => ({
          text: "",
          idx: (s.idx + 1) % ROLES.length,
          phase: "typing",
        }));
      } else {
        t = setTimeout(
          () => setState((s) => ({ ...s, text: s.text.slice(0, -1) })),
          46,
        );
      }
    }

    return () => clearTimeout(t);
  }, [state]);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__orb hero__orb1" />
        <div className="hero__orb hero__orb2" />
        <div className="hero__orb hero__orb3" />
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      <div className="container hero__body">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Available for new opportunities
        </div>

        <p className="hero__hi">Hi there, I&apos;m</p>

        <h1 className="hero__name">Divyanshu Verma</h1>

        <div className="hero__role-row">
          <span className="hero__role-pre">&gt;&nbsp;</span>
          <span className="hero__role-text">{state.text}</span>
          <span className="hero__cursor">|</span>
        </div>

        <p className="hero__desc">
          Building scalable, high-performance web applications with modern
          architecture patterns. Specializing in React, TypeScript, and
          micro-frontend systems that serve millions of users.
        </p>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-n">3+</span>
            <span className="hero__stat-l">Years Exp.</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-n">25+</span>
            <span className="hero__stat-l">Prod. Releases</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-n">300K+</span>
            <span className="hero__stat-l">Merchants Migrated</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-n">0</span>
            <span className="hero__stat-l">Critical Escalations</span>
          </div>
        </div>

        <div className="hero__actions">
          <button
            className="btn btn-primary"
            onClick={() => scrollTo("#experience")}
          >
            View My Work <ArrowRight />
          </button>
          <button
            className="btn btn-outline"
            onClick={() => scrollTo("#contact")}
          >
            Get In Touch
          </button>
        </div>

        <div className="hero__socials">
          <span className="hero__social-lbl">connect</span>
          <a
            href="mailto:divyanshuverma919@gmail.com"
            className="hero__social"
            title="Email"
          >
            <MailIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/dev-divyanshu-verma"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social"
            title="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a href="tel:+917300099947" className="hero__social" title="Phone">
            <PhoneIcon />
          </a>
        </div>
      </div>

      <div className="hero__scroll">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#about");
          }}
        >
          <div className="scroll-mouse">
            <span />
          </div>
          Scroll
        </a>
      </div>
    </section>
  );
}
