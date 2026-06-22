/* ============================================================
   PROJECTS - single source of truth
   ------------------------------------------------------------
   Read by both the Projects SECTION (teaser cards) and the
   PROJECT DETAIL page (/#/projects/:slug).

   Add a project by dropping another object into this array.
   `slug` and `title` are required; everything else is optional
   and only renders when present.

   Fields:
     slug         (required): URL id, e.g. 'devpulse'  -> /#/projects/devpulse
     title        (required): project name

     WHAT IT IS
     tagline      short one-liner
     description  paragraph: what it does / the problem it solves
     highlights   array of short bullet strings (key features)

     HOW IT WAS BUILT
     role         your contribution, e.g. 'Solo Developer'
     tags         array of tech strings (your stack)
     category     e.g. 'Full-Stack · Dev Tools'
     year         e.g. '2026'

     IMPACT
     metrics      array of { value, label } stat pills
     status       e.g. 'Live', 'In Progress', 'Beta'  (auto-glows for Live/Beta)

     WHERE TO SEE IT
     image        screenshot path (drop files in /public)
     emoji        fallback shown if no image is provided
     liveUrl      'Live Demo' button + address-bar URL
     repoUrl      'Source' button
     links        array of { label, url } extra links (Case Study, Video…)
   ============================================================ */
export const PROJECTS = [
  {
    slug: 'devpulse',
    title: 'DevPulse',
    tagline: 'Your code, visualized. A personal engineering-metrics dashboard.',
    description:
      'DevPulse turns your GitHub activity into insight. Sign in with GitHub and it pulls your commits, pull requests, languages and review timings, computes engineering metrics like commit streaks, PR cycle time and review lag, then renders them as an animated, customizable drag-and-drop dashboard, complete with AI-generated summaries and automated weekly email digests.',
    image: '/devpulse.png',
    emoji: '📊',
    status: 'Live',
    year: '2026',
    category: 'Full-Stack · Dev Tools',
    role: 'Full-Stack Engineer · Solo Build',
    metrics: [
      { value: '10+',       label: 'Live Widgets' },
      { value: '7',         label: 'GitHub Metrics' },
      { value: 'Real-time', label: 'GitHub Sync' },
    ],
    highlights: [
      'Secure GitHub OAuth with HttpOnly cookie sessions: the access token never touches the browser; a server-signed JWT drives a 7-day session.',
      'Drag-and-drop dashboard of 10+ widgets (commit streak, contribution heatmap, PR cycle time, review lag, language mix), each with independent loading and a persisted layout.',
      'AI Summary & a natural-language "Ask" powered by Google Gemini, turning raw metrics into plain-English insight.',
      'High-performance Go API with TTL caching and single-flight request coalescing that collapses duplicate GitHub fan-outs into one call.',
      'Installable PWA with light/dark themes and automated weekly email digests via Resend.',
    ],
    tags: [
      'React 19', 'TypeScript', 'Go 1.24', 'chi', 'TanStack Query', 'Tailwind v4',
      'shadcn/ui', '@dnd-kit', 'Recharts', 'PostgreSQL', 'Gemini AI', 'PWA',
    ],
    liveUrl: 'https://devpulse-gamma-eight.vercel.app',
    repoUrl: '',                     // intentionally hidden, repo kept private
    links: [],
  },
  // 👇 Add more projects here. Each gets its own /#/projects/<slug> page.
  // {
  //   slug: 'second-project',
  //   title: 'Second Project',
  //   tagline: '...',
  //   description: '...',
  //   image: '/second.png',
  //   status: 'In Progress',
  //   category: 'Frontend',
  //   role: 'Lead Frontend',
  //   metrics: [{ value: '40%', label: 'Faster' }],
  //   tags: ['Next.js', 'Tailwind'],
  //   liveUrl: 'https://...',
  //   highlights: ['...'],
  // },
]

export const getProjectBySlug = slug => PROJECTS.find(p => p.slug === slug)
