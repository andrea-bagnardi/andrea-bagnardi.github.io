/**
 * Shape of the site content. One object per language: adding English means
 * adding a sibling of content.it.ts, not touching the components.
 */

export interface Hero {
  name: string;
  positioning: string;
  context: string;
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
  actions: Action[];
  preview: {
    alt: string;
    /** Still missing while the clips are being recorded. */
    src: string | null;
  };
}

export interface StackGroup {
  title: string;
  items: string[];
}

export interface Stack {
  groups: StackGroup[];
  personal: StackGroup;
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
  closing: string;
}

export interface Contact {
  opening: string;
  actions: Action[];
  emailLabel: string;
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
  };
  sections: Record<'expertise' | 'projects' | 'stack' | 'method' | 'contact', SectionMeta>;
  hero: Hero;
  expertise: Expertise;
  projects: Project[];
  stack: Stack;
  method: Method;
  contact: Contact;
  backToTop: string;
  skipToContent: string;
}
