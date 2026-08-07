// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://calpel.dev',
  output: 'static',
  // El sitio es estático salvo /api/contact, que tiene `prerender = false`
  // y sale como Netlify Function.
  adapter: netlify(),
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
