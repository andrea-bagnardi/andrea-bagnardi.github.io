/**
 * Shape of the site content. One object per language: adding English means
 * adding a sibling of content.it.ts, not touching the components.
 */

/** One line of the hero trace: plausible, and deliberately anonymous. */
export interface TraceLine {
  method: string;
  path: string;
  status: string;
  time: string;
}

export interface Hero {
  name: string;
  positioning: string;
  context: string;
  trace: TraceLine[];
}

/** A number the scroll animation counts up to. Rendered as `display` without JS. */
export interface Counter {
  to: number;
  display: string;
}

export interface ExpertiseCard {
  title: string;
  claim: string;
  /** May hold a single {counter} token, replaced by the counter value. */
  evidence: string;
  counter?: Counter;
  tags: string[];
}

export interface Expertise {
  cards: ExpertiseCard[];
  crossCutting: string;
}

export interface Stat {
  value: string;
  label: string;
}

/** A link is dropped from the page while its href is null. */
export interface Action {
  label: string;
  href: string | null;
}

export interface Project {
  name: string;
  eyebrow: string;
  problem: string;
  solution: string;
  decisions: string[];
  /** Optional note on how the project was built. */
  method?: string;
  stats: Stat[];
  /** Technologies this project is built on, one word each. */
  stack: string[];
  actions: Action[];
  preview: {
    alt: string;
    /** Still image at 1280×720. Null falls back to a placeholder box. */
    poster: string | null;
    /** The same frame at half width, offered to phones through the srcset. */
    posterSmall?: string;
  };
}

export interface StackGroup {
  title: string;
  items: string[];
}

export interface Stack {
  groups: StackGroup[];
}

export type MethodRole = 'human' | 'agent' | 'gate';

export interface MethodPhase {
  name: string;
  role: MethodRole;
  text: string;
}

export interface Method {
  phases: MethodPhase[];
  note: string;
}

export interface Contact {
  actions: Action[];
}

export interface NotFound {
  eyebrow: string;
  title: string;
  message: string;
  backLabel: string;
}

export interface SectionMeta {
  id: string;
  index: string;
  label: string;
  title: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    /** BCP 47 tag for the html lang attribute and og:locale. */
    locale: string;
    ogLocale: string;
    /** Fed to schema.org/Person. The address is deliberately left out. */
    jobTitle: string;
    knowsAbout: string[];
    /** Public profiles, for sameAs. Entries without a url are dropped. */
    profiles: Action[];
    /** Alt text for the generated share image. */
    ogImageAlt: string;
  };
  sections: Record<'expertise' | 'projects' | 'stack' | 'method' | 'contact', SectionMeta>;
  hero: Hero;
  expertise: Expertise;
  projects: Project[];
  stack: Stack;
  method: Method;
  contact: Contact;
  notFound: NotFound;
  backToTop: string;
  skipToContent: string;
}
