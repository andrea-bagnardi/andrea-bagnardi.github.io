import type { SiteContent } from './types';

export const content: SiteContent = {
  meta: {
    title: 'Andrea Bagnardi · Software engineer',
    description:
      'Software engineer con più di dieci anni di esperienza, orientato a backend, dati e infrastruttura.',
    locale: 'it',
    ogLocale: 'it_IT',
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
      'Andrea Bagnardi · Costruisco backend che reggono oltre centomila persone al giorno',
  },

  notFound: {
    eyebrow: '404',
    title: 'Pagina non trovata',
    message: 'Questo indirizzo non porta a nulla. Il sito sta tutto in una pagina sola.',
    backLabel: 'Torna alla home',
  },

  skipToContent: 'Vai al contenuto',
  backToTop: 'Torna in cima',

  sections: {
    expertise: {
      id: 'competenze',
      index: '01',
      label: 'Competenze',
      title: 'Aree di competenza',
    },
    projects: {
      id: 'progetti',
      index: '02',
      label: 'Progetti',
      title: 'Progetti',
    },
    stack: {
      id: 'stack',
      index: '03',
      label: 'Stack',
      title: 'Stack',
    },
    method: {
      id: 'metodo',
      index: '04',
      label: 'Metodo',
      title: 'Metodo di lavoro',
    },
    contact: {
      id: 'profili',
      index: '05',
      label: 'Profili',
      title: 'Dove trovarmi',
    },
  },

  hero: {
    name: 'Andrea Bagnardi',
    positioning: 'Costruisco backend che reggono oltre centomila persone al giorno',
    context:
      'Più di dieci anni di sviluppo professionale, oggi orientato a backend, dati e infrastruttura.',
    trace: [
      { method: 'GET', path: '/api/v1/sessions', status: '200', time: '42 ms' },
      { method: 'POST', path: '/api/v1/auth/token', status: '201', time: '88 ms' },
      { method: 'GET', path: '/api/v1/users/me', status: '200', time: '17 ms' },
      { method: 'POST', path: '/api/v1/events', status: '202', time: '23 ms' },
      { method: 'GET', path: '/api/v1/feed?page=2', status: '200', time: '61 ms' },
      { method: 'GET', path: '/healthz', status: '200', time: '3 ms' },
    ],
  },

  expertise: {
    cards: [
      {
        title: 'Backend e API su larga scala',
        claim: 'Progetto e mantengo backend che reggono traffico reale.',
        evidence:
          "Ho disegnato da zero l'architettura Django e le API di un'applicazione consumer con oltre {counter} utenti attivi al giorno e picchi di decine di migliaia di sessioni simultanee, e l'ho portata avanti per anni con aggiornamenti profondi dello stack senza interruzioni di servizio.",
        counter: { to: 100000, display: '100.000' },
        tags: ['Python', 'Django', 'REST', 'PostgreSQL'],
      },
      {
        title: 'Infrastruttura e delivery',
        claim: 'Gestisco l’infrastruttura e il percorso che porta il codice in produzione.',
        evidence:
          'Responsabilità diretta su server e ambienti da tutta la carriera, containerizzazione con Docker e Docker Compose, pipeline CI/CD costruite per fare da controllo qualità sulle pull request del team. Backup e ripristino del database di produzione. In preparazione la certificazione AWS Solutions Architect Associate.',
        tags: ['Docker', 'GitHub Actions', 'Linux', 'Google Cloud'],
      },
      {
        title: 'Full stack e prodotto',
        claim: 'So portare una funzionalità dal database allo schermo.',
        evidence:
          'Ho sviluppato un portale web gestionale in Ionic e costruito da zero un CRM appoggiato a un backend già in produzione, lavorando su interfacce usate quotidianamente da operatori professionali. Ho pubblicato applicazioni su App Store e Play Store.',
        tags: ['Angular', 'Ionic', 'TypeScript', 'Tailwind'],
      },
      {
        title: 'Dati e business intelligence',
        claim: 'Prendo dati sparsi in gestionali diversi e li rendo interrogabili.',
        evidence:
          'Pipeline ETL in Python e Pandas, data warehouse a schema a stella con storicizzazione SCD2, dashboard interattiva per l’analisi. Codice pubblico e demo online.',
        tags: ['Pandas', 'ETL', 'Data warehouse', 'Streamlit'],
      },
    ],
    crossCutting:
      'Revisione del codice e mentoring di sviluppatori junior, stime e pianificazione tecnica, interlocuzione con fornitori esterni.',
  },

  projects: [
    {
      name: 'GuitarPath',
      eyebrow: 'Prodotto in soft launch',
      problem:
        'Imparare chitarra da autodidatta significa esercitarsi senza sapere se lo si sta facendo bene, e i corsi online propongono lo stesso percorso a tutti.',
      solution:
        'Esercizi personalizzati su caratteristiche e progressi di chi suona, analisi dell’esecuzione con valutazione e consigli, tablature interattive.',
      decisions: [
        'Due modelli distinti con ruoli separati: uno genera i percorsi e le tablature, l’altro analizza l’audio.',
        'Elaborazione audio nel browser, senza passare dal server.',
        'Suite di test estesa.',
      ],
      method:
        'Realizzato interamente con Claude Code. Il codice è generato dall’agente, l’architettura, i vincoli e il controllo qualità sono miei: TypeScript in modalità strict, 440 test automatici, revisione di ogni pull request.',
      stats: [
        { value: '6', label: 'lingue' },
        { value: '440', label: 'test' },
        { value: 'Live', label: 'in produzione' },
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
        { label: 'Prova la demo', href: 'https://guitarpath.vercel.app/' },
        // The repository is private, so this action stays off the page.
        { label: 'Vedi il codice', href: null },
      ],
      preview: {
        alt: 'Home di GuitarPath: il titolo Suona quello che ami, la descrizione del coach e il pulsante per iniziare.',
        poster: '/previews/guitarpath.webp',
      },
    },
    {
      name: 'Sistema di business intelligence',
      eyebrow: 'Progetto di business intelligence con codice pubblico',
      problem:
        'Nel settore della formazione i dati operativi restano sparsi tra gestionali diversi e non diventano mai informazione utile per decidere.',
      solution:
        'Raccoglie i dati dai gestionali, li normalizza e li storicizza, poi li espone in una dashboard.',
      decisions: [
        'Schema a stella invece che normalizzato: le interrogazioni analitiche attraversano meno join e la dashboard resta reattiva.',
        'Storicizzazione SCD2 sulle dimensioni: un’analisi sul passato non viene riscritta dai dati di oggi.',
      ],
      stats: [{ value: '9', label: 'settimane dallo zero alla demo online' }],
      stack: ['Python', 'Pandas', 'NumPy', 'SQLite', 'Streamlit', 'Faker'],
      actions: [
        { label: 'Dashboard live', href: 'https://pw-bagnardi-andrea.streamlit.app/' },
        { label: 'Repository', href: 'https://github.com/andrea-bagnardi/project-work' },
      ],
      preview: {
        alt: 'Dashboard di analisi: filtri per periodo, zona e categoria, indicatori chiave e andamento delle richieste nel tempo.',
        poster: '/previews/business-intelligence.webp',
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
          'Notifiche push',
          'pytest',
        ],
      },
      {
        title: 'Frontend',
        items: ['Angular', 'Ionic', 'Capacitor', 'Cordova', 'TypeScript', 'RxJS', 'Tailwind'],
      },
      {
        title: 'Dati',
        items: [
          'SQL',
          'Firebase Analytics',
          'Reportistica',
          'Celery Beat',
          'Pandas',
          'ETL',
          'Data warehouse',
          'Streamlit',
        ],
      },
      {
        title: 'Infrastruttura',
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
        name: 'Specifica',
        role: 'human',
        text: 'La specifica la scrivo prima di far generare una riga di codice. Quando qualcosa va storto, quasi sempre è la specifica a essere ambigua.',
      },
      {
        name: 'Vincoli',
        role: 'human',
        text: 'Le regole del progetto stanno in un file che l’agente legge sempre, dalle convenzioni di naming ai pattern architetturali.',
      },
      {
        name: 'Generazione',
        role: 'agent',
        text: 'L’agente scrive il codice, io leggo ogni diff.',
      },
      {
        name: 'Verifica',
        role: 'gate',
        text: 'I test automatici sono la rete di sicurezza sul codice che non ho battuto a mano, e la CI blocca tutto ciò che non passa.',
      },
    ],
    note: 'Se la verifica fallisce, il problema è nella specifica.',
    closing:
      'Le stesse pipeline CI le ho costruite in azienda per fare da controllo qualità sulle pull request del team, e i test automatici li ho introdotti da quando la generazione assistita ha reso veloce scriverli.',
  },

  contact: {
    opening: 'Il codice pubblico è su GitHub, il percorso professionale su LinkedIn.',
    actions: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrea-bagnardi/' },
      { label: 'GitHub', href: 'https://github.com/andrea-bagnardi' },
    ],
  },
};
