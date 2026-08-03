import type { SiteContent } from './types';

export const content: SiteContent = {
  meta: {
    title: 'Andrea Bagnardi · Software engineer',
    description:
      'Software engineer with more than ten years of experience, working on backend, data and infrastructure.',
    locale: 'en',
    ogLocale: 'en_GB',
    jobTitle: 'Software engineer',
    knowsAbout: [
      'Backend',
      'API',
      'Python',
      'Django',
      'PostgreSQL',
      'Docker',
      'Google Cloud',
      'CI/CD',
      'Data warehouse',
      'ETL',
    ],
    profiles: [
      { label: 'GitHub', href: 'https://github.com/andrea-bagnardi' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrea-bagnardi/' },
    ],
    ogImageAlt:
      'Andrea Bagnardi · I build backends that carry over a hundred thousand people a day',
  },

  notFound: {
    eyebrow: '404',
    title: 'Page not found',
    message: 'This address leads nowhere. The site is one page and nothing else.',
    backLabel: 'Back to the home page',
  },

  skipToContent: 'Skip to content',
  backToTop: 'Back to top',

  sections: {
    expertise: {
      id: 'expertise',
      index: '01',
      label: 'Expertise',
      title: 'Areas of expertise',
    },
    projects: {
      id: 'projects',
      index: '02',
      label: 'Projects',
      title: 'Projects',
    },
    stack: {
      id: 'stack',
      index: '03',
      label: 'Stack',
      title: 'Stack',
    },
    method: {
      id: 'method',
      index: '04',
      label: 'Method',
      title: 'How I work',
    },
    contact: {
      id: 'profiles',
      index: '05',
      label: 'Profiles',
      title: 'Where to find me',
    },
  },

  labels: {
    problem: 'Problem',
    solution: 'Solution',
    decisions: 'Technical decisions',
    technologies: 'Technologies',
    previewPending: 'preview coming',
    language: 'Language',
  },

  hero: {
    name: 'Andrea Bagnardi',
    positioning: 'I build backends that carry over a hundred thousand people a day',
    context:
      'More than ten years writing software professionally, now working on backend, data and infrastructure.',
    trace: [
      { method: 'GET', path: '/api/v1/sessions', status: '200', time: '42 ms' },
      { method: 'POST', path: '/api/v1/auth/token', status: '201', time: '88 ms' },
      { method: 'GET', path: '/api/v1/users/me', status: '200', time: '17 ms' },
      { method: 'POST', path: '/api/v1/auth/refresh', status: '200', time: '34 ms' },
      { method: 'GET', path: '/api/v1/notifications', status: '200', time: '29 ms' },
      { method: 'PATCH', path: '/api/v1/users/me', status: '200', time: '52 ms' },
      { method: 'POST', path: '/api/v1/events', status: '202', time: '23 ms' },
      { method: 'GET', path: '/api/v1/feed?page=2', status: '200', time: '61 ms' },
      { method: 'GET', path: '/healthz', status: '200', time: '3 ms' },
    ],
  },

  expertise: {
    cards: [
      {
        title: 'Backend and APIs at scale',
        claim: 'I design and maintain backends that take real traffic.',
        evidence:
          'I designed the Django architecture and the APIs of a consumer application from scratch, with more than {counter} daily active users and peaks of tens of thousands of concurrent sessions, and carried it for years through deep stack upgrades without downtime.',
        counter: { to: 100000, display: '100,000' },
        tags: ['Python', 'Django', 'REST', 'PostgreSQL'],
      },
      {
        title: 'Infrastructure and delivery',
        claim: 'I run the infrastructure and the path that takes code to production.',
        evidence:
          'Direct responsibility for servers and environments throughout my career, containerisation with Docker and Docker Compose, CI/CD pipelines built to act as quality control on the team’s pull requests. Backup and restore of the production database. Currently preparing the AWS Solutions Architect Associate certification.',
        tags: ['Docker', 'GitHub Actions', 'Linux', 'Google Cloud'],
      },
      {
        title: 'Full stack and product',
        claim: 'I can take a feature from the database to the screen.',
        evidence:
          'I built a web management portal in Ionic and a CRM from scratch on top of a backend already in production, working on interfaces professional operators use every day. I have published applications on the App Store and Play Store.',
        tags: ['Angular', 'Ionic', 'TypeScript', 'Tailwind'],
      },
      {
        title: 'Data and business intelligence',
        claim: 'I take data scattered across separate systems and make it queryable.',
        evidence:
          'ETL pipelines in Python and Pandas, a star schema data warehouse with SCD2 history, an interactive dashboard for analysis. Public code and a live demo.',
        tags: ['Pandas', 'ETL', 'Data warehouse', 'Streamlit'],
      },
    ],
    crossCutting:
      'Code review and mentoring of junior developers, estimates and technical planning, dealing with outside suppliers.',
  },

  projects: [
    {
      name: 'GuitarPath',
      eyebrow: 'Product in soft launch',
      problem:
        'Teaching yourself guitar means practising without knowing whether you are doing it right, and online courses hand everyone the same path.',
      solution:
        'Exercises built on the player’s own traits and progress, performance analysis with scoring and advice, interactive tablature.',
      decisions: [
        'Two separate models with separate jobs: one generates the paths and the tablature, the other analyses the audio.',
        'Audio processing in the browser, without going through the server.',
        'An extensive test suite.',
      ],
      method:
        'Built entirely with Claude Code. The code is generated by the agent; the architecture, the constraints and the quality control are mine: TypeScript in strict mode, 440 automated tests, every pull request reviewed.',
      stats: [
        { value: '6', label: 'languages' },
        { value: '440', label: 'tests' },
        { value: 'Live', label: 'in production' },
      ],
      stack: [
        'Next.js',
        'TypeScript',
        'Prisma',
        'PostgreSQL',
        'Clerk',
        'Tailwind',
        'alphaTab',
        'Tone.js',
        'Vitest',
        'Vercel',
      ],
      actions: [
        { label: 'Try the demo', href: 'https://guitarpath.vercel.app/' },
        // The repository is private, so this action stays off the page.
        { label: 'See the code', href: null },
      ],
      preview: {
        // The product itself is in Italian, so its headline is quoted as it reads.
        alt: 'GuitarPath home page: the headline Suona quello che ami, the description of the coach and the button to start.',
        poster: '/previews/guitarpath.webp',
        posterSmall: '/previews/guitarpath-640.webp',
      },
    },
    {
      name: 'client-requests',
      eyebrow: 'Public code, backend and front',
      problem:
        'Client requests arrive as free text: someone reads them one at a time, works out what they are about and who should handle them.',
      solution:
        'A model proposes a category, a priority and a summary, and whoever handles the request confirms or corrects it. The demo runs on a free plan that shuts down when nobody is using it, so the first request after a quiet spell waits for the server to wake up.',
      decisions: [
        'The classifier is an interface with two implementations registered by name: a heuristic one that runs offline, and one that calls a model. The choice is an environment variable, and the test suite needs no API key.',
        'The rate limit on the paid endpoint lives in the database rather than in memory, so it holds with more than one instance running. It bounds the rate, not the total spend: that ceiling is the one on the provider’s account.',
      ],
      stats: [{ value: '263', label: 'automated tests' }],
      stack: [
        'FastAPI',
        'SQLAlchemy',
        'Alembic',
        'PostgreSQL',
        'React',
        'TanStack Query',
        'Zod',
        'pytest',
        'Vitest',
        'Docker',
      ],
      actions: [
        { label: 'Try the demo', href: 'https://client-requests.vercel.app/' },
        { label: 'See the code', href: 'https://github.com/andrea-bagnardi/client-requests' },
      ],
      preview: {
        // The product itself is in Italian, so its screen is described as it reads.
        alt: 'Client requests: the form for a new request and the list, with the category, priority and summary proposed by the model.',
        poster: '/previews/client-requests.webp',
        posterSmall: '/previews/client-requests-640.webp',
      },
    },
    {
      name: 'Business intelligence system',
      eyebrow: 'Business intelligence project with public code',
      problem:
        'In the training sector, operational data stays scattered across separate systems and never turns into something you can decide on.',
      solution:
        'It collects the data from those systems, normalises it and keeps its history, then puts it in a dashboard.',
      decisions: [
        'A star schema rather than a normalised one: analytical queries cross fewer joins and the dashboard stays responsive.',
        'SCD2 history on the dimensions: an analysis of the past is not rewritten by today’s data.',
      ],
      stats: [{ value: '9', label: 'weeks from nothing to a live demo' }],
      stack: ['Python', 'Pandas', 'NumPy', 'SQLite', 'Streamlit', 'Faker'],
      actions: [
        { label: 'Live dashboard', href: 'https://pw-bagnardi-andrea.streamlit.app/' },
        { label: 'Repository', href: 'https://github.com/andrea-bagnardi/project-work' },
      ],
      preview: {
        alt: 'Analytics dashboard: filters for period, area and category, key indicators and the trend of requests over time.',
        poster: '/previews/business-intelligence.webp',
        posterSmall: '/previews/business-intelligence-640.webp',
      },
    },
  ],

  stack: {
    groups: [
      {
        title: 'Backend',
        items: [
          'Python',
          'Django',
          'Django REST Framework',
          'REST',
          'Celery',
          'gunicorn',
          'PostgreSQL',
          'Redis',
          'Firebase',
          'Push notifications',
          'pytest',
        ],
      },
      {
        title: 'Frontend',
        items: ['Angular', 'Ionic', 'Capacitor', 'Cordova', 'TypeScript', 'RxJS', 'Tailwind'],
      },
      {
        title: 'Data',
        items: [
          'SQL',
          'Firebase Analytics',
          'Google Analytics',
          'Looker Studio',
          'Celery Beat',
          'Pandas',
          'ETL',
          'Data warehouse',
          'Streamlit',
        ],
      },
      {
        title: 'Infrastructure',
        items: [
          'Docker',
          'Docker Compose',
          'GitHub Actions',
          'Linux',
          'nginx',
          'Google Cloud',
          'Sentry',
          'Play Console',
          'App Store Connect',
        ],
      },
    ],
  },

  method: {
    phases: [
      {
        name: 'Spec',
        role: 'human',
        text: 'I write the spec before a single line of code is generated. When something goes wrong, it is almost always the spec that was ambiguous.',
      },
      {
        name: 'Constraints',
        role: 'human',
        text: 'The project rules live in a file the agent always reads, from naming conventions to architectural patterns.',
      },
      {
        name: 'Generation',
        role: 'agent',
        text: 'The agent writes the code, I read every diff.',
      },
      {
        name: 'Verification',
        role: 'gate',
        text: 'The automated tests are the safety net over code I did not type myself, and CI blocks anything that does not pass.',
      },
    ],
    note: 'If the check fails, the problem is in the spec.',
  },

  contact: {
    actions: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrea-bagnardi/' },
      { label: 'GitHub', href: 'https://github.com/andrea-bagnardi' },
    ],
  },
};
