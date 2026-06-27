import { useState } from "react";
import useReveal from "../hooks/useReveal";

function MailIcon() {
  return (
    <svg
      width="17"
      height="17"
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

function PhoneIcon() {
  return (
    <svg
      width="17"
      height="17"
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

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SendIcon() {
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
      <path d="m22 2-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

export default function Contact() {
  const [lhsRef, lhsVis] = useReveal();
  const [rhsRef, rhsVis] = useReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    company: "", // honeypot: a real person never touches this
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Where the form posts to. Same-origin /api/contact on Vercel, but you can
  // point it elsewhere with an env var if the API lives on another domain.
  const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "/api/contact";

  const change = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSent(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "", company: "" });
    } catch (err) {
      setError(err.message || "Could not send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">// say.hello</div>
          <h2 className="sec-title">
            Get In <em>Touch</em>
          </h2>
          <p className="sec-sub">
            Open to exciting roles, collaborations, and conversations.
            Let&apos;s build something great.
          </p>
        </div>

        <div className="contact__grid">
          <div ref={lhsRef} className={`reveal-l${lhsVis ? " in" : ""}`}>
            <h3 className="contact__lhs-title">
              Let&apos;s <em>connect</em>
              <br />
              and create together
            </h3>
            <p className="contact__lhs-desc">
              I&apos;m actively looking for senior front-end engineering roles.
              Whether you have an opportunity, a project idea, or just want to
              chat about React and micro-frontends, my inbox is always open.
            </p>

            <div className="contact__items">
              <a href="mailto:divyanshuverma919@gmail.com" className="c-item">
                <span className="c-item__icon">
                  <MailIcon />
                </span>
                <div>
                  <div className="c-item__lbl">Email</div>
                  <div className="c-item__val">divyanshuverma919@gmail.com</div>
                </div>
              </a>

              <a href="tel:+917300099947" className="c-item">
                <span className="c-item__icon">
                  <PhoneIcon />
                </span>
                <div>
                  <div className="c-item__lbl">Phone</div>
                  <div className="c-item__val">+91 73000 99947</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/dev-divyanshu-verma"
                target="_blank"
                rel="noopener noreferrer"
                className="c-item"
              >
                <span className="c-item__icon">
                  <LinkedInIcon />
                </span>
                <div>
                  <div className="c-item__lbl">LinkedIn</div>
                  <div className="c-item__val">
                    linkedin.com/in/dev-divyanshu-verma
                  </div>
                </div>
              </a>

              <div className="c-item">
                <span className="c-item__icon">
                  <LocationIcon />
                </span>
                <div>
                  <div className="c-item__lbl">Open to locations</div>
                  <div className="c-item__val">
                    Gurgaon · Noida · Delhi · Bangalore · Hyderabad · Pune
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={rhsRef} className={`reveal-r${rhsVis ? " in" : ""}`}>
            <div className="contact__form-box">
              {sent ? (
                <div className="form-sent">
                  <span className="form-sent-icon">✅</span>
                  <h4>Message sent!</h4>
                  <p>
                    Thanks for reaching out! I&apos;ve received your message and
                    will get back to you soon.
                  </p>
                  <button
                    className="btn btn-outline"
                    style={{ marginTop: 8 }}
                    onClick={() => setSent(false)}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="form-head">Send me a message</div>

                  {/* honeypot: people can't see this, but bots love to fill it in */}
                  <input
                    type="text"
                    name="company"
                    className="hp-field"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={form.company}
                    onChange={change}
                  />

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        className="form-input"
                        placeholder="XYZ"
                        value={form.name}
                        onChange={change}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder="xyz@domain.com"
                        value={form.email}
                        onChange={change}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">
                        Your Contact Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-input"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={change}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        className="form-input"
                        placeholder="Frontend Engineer Opportunity"
                        value={form.subject}
                        onChange={change}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      placeholder="Hi Divyanshu, I came across your portfolio and..."
                      value={form.message}
                      onChange={change}
                      required
                    />
                  </div>

                  {error && <p className="form-error">{error}</p>}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send Message"} <SendIcon />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
