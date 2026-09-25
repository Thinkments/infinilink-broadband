import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.infinilinkbroadband.com',
  output: 'static',
  adapter: netlify(),
  integrations: [sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});