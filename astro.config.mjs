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
  // Generated rather than hand written, so the English routes coming later are
  // picked up without anyone remembering to add them.
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
