import { useState, useEffect, useLayoutEffect, useRef } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// per-section glyphs for the mobile card menu
const ICON = { width: 19, height: 19, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
const sectionIcons = {
  about: (
    <svg {...ICON}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  skills: (
    <svg {...ICON}><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></svg>
  ),
  experience: (
    <svg {...ICON}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
  ),
  projects: (
    <svg {...ICON}><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></svg>
  ),
  achievements: (
    <svg {...ICON}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
  ),
  credentials: (
    <svg {...ICON}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
  ),
  contact: (
    <svg {...ICON}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
  ),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [pill, setPill] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  const itemRefs = useRef({});

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);

      const ids = [
        "about",
        "skills",
        "experience",
        "projects",
        "achievements",
        "credentials",
        "contact",
      ];
      const offset = window.scrollY + 120;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && offset >= el.offsetTop) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // slide the active-link indicator to whichever section is in view.
  useLayoutEffect(() => {
    const el = active ? itemRefs.current[active] : null;
    if (!el) {
      setPill((p) => ({ ...p, opacity: 0 }));
      return;
    }
    setPill({
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      opacity: 1,
    });
  }, [active]);

  // keep the indicator aligned if the layout reflows (e.g. resize).
  useEffect(() => {
    const reflow = () => {
      const el = active ? itemRefs.current[active] : null;
      if (el)
        setPill({
          left: el.offsetLeft,
          top: el.offsetTop,
          width: el.offsetWidth,
          height: el.offsetHeight,
          opacity: 1,
        });
    };
    window.addEventListener("resize", reflow);
    return () => window.removeEventListener("resize", reflow);
  }, [active]);

  // lock background scroll while the mobile menu is open + close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLink = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <nav
      className={`nav${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`}
    >
      <div className="nav__inner">
        <a
          href="#"
          className="nav__logo"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          DV
        </a>

        <ul className={`nav__links${open ? " open" : ""}`}>
          <span
            className="nav__pill"
            aria-hidden="true"
            style={{
              left: pill.left,
              top: pill.top,
              width: pill.width,
              height: pill.height,
              opacity: pill.opacity,
            }}
          />
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                ref={(el) => {
                  itemRefs.current[l.href.slice(1)] = el;
                }}
                className={`nav__link${active === l.href.slice(1) ? " active" : ""}`}
                onClick={(e) => handleLink(e, l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav__burger${open ? " open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>

    {/* mobile-only circular-reveal overlay */}
    <div className={`mobm${open ? " open" : ""}`} aria-hidden={!open}>
      <div className="mobm__inner">
        <ul className="mobm__list">
          {links.map((l, i) => (
            <li key={l.href} className="mobm__item" style={{ "--i": i }}>
              <a
                href={l.href}
                className={`mobm__card${active === l.href.slice(1) ? " active" : ""}`}
                onClick={(e) => handleLink(e, l.href)}
                tabIndex={open ? 0 : -1}
              >
                <span className="mobm__card-ic" aria-hidden="true">
                  {sectionIcons[l.href.slice(1)]}
                </span>
                <span className="mobm__card-label">{l.label}</span>
                <span className="mobm__card-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mobm__foot">
          <span className="mobm__foot-lbl">connect</span>
          <a
            href="mailto:divyanshuverma919@gmail.com"
            className="mobm__soc"
            aria-label="Email me"
            tabIndex={open ? 0 : -1}
          >
            <MailIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/dev-divyanshu-verma"
            target="_blank"
            rel="noopener noreferrer"
            className="mobm__soc"
            aria-label="LinkedIn profile"
            tabIndex={open ? 0 : -1}
          >
            <LinkedInIcon />
          </a>
          <a
            href="tel:+917300099947"
            className="mobm__soc"
            aria-label="Call me"
            tabIndex={open ? 0 : -1}
          >
            <PhoneIcon />
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
