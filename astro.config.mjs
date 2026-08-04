// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Served from the root of the is-a.dev subdomain, so base stays '/'. The old
  // andrea-bagnardi.github.io address redirects here on its own once GitHub
  // Pages picks up public/CNAME, so links already handed out keep working.
  site: 'https://andrea-bagnardi.is-a.dev',
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
