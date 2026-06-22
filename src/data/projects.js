// Drives both the projects section cards and the /projects/:slug pages.
// slug + title are required, the rest are optional and only show if set.
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
    repoUrl: '',   // private repo, no source link
    links: [],
  },
]

export const getProjectBySlug = slug => PROJECTS.find(p => p.slug === slug)
