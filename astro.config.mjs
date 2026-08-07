// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://calpel.dev',
  // Sin adapter a propósito: no hay ninguna ruta con `prerender = false`, así
  // que el build sale 100% estático y Netlify solo sirve archivos. Agregar un
  // adapter acá sin una ruta server que lo justifique mete una function vacía.
  output: 'static',
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
