import { content as en } from './content.en';
import { content as it } from './content.it';
import type { SiteContent } from './types';

/** Italian first: it is the language the site was written in, and the default route. */
export const locales = ['it', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'it';

const content: Record<Locale, SiteContent> = { it, en };

/**
 * How each language names itself and where it lives. Not part of the content:
 * these two lines read the same on both pages, and duplicating them would be
 * one more thing to keep in step.
 */
export const localeMeta: Record<Locale, { code: string; name: string; href: string }> = {
  it: { code: 'IT', name: 'Italiano', href: '/' },
  en: { code: 'EN', name: 'English', href: '/en/' },
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** Anything unrecognised is the Italian page, which is the one at the root. */
export function getContent(locale?: string): SiteContent {
  return content[isLocale(locale) ? locale : defaultLocale];
}

export * from './types';
