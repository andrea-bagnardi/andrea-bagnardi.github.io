// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // User site: served from the root of andrea-bagnardi.github.io, so base stays '/'.
  site: 'https://andrea-bagnardi.github.io',
  base: '/',
  output: 'static',
  // Italian keeps the root and English goes under /en: the site was written in
  // Italian and that is the address already on the CV and on LinkedIn.
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // Generated rather than hand written, and told about the two languages so the
  // pages declare each other with hreflang.
  integrations: [sitemap({ i18n: { defaultLocale: 'it', locales: { it: 'it', en: 'en' } } })],
  vite: {
    plugins: [tailwindcss()],
  },
});
