// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // User site: served from the root of andrea-bagnardi.github.io, so base stays '/'.
  site: 'https://andrea-bagnardi.github.io',
  base: '/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
