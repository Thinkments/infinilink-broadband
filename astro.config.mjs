import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.infinilinkbroadband.com',
  output: 'static',
  adapter: netlify(),
  devToolbar: { enabled: false },
  integrations: [sitemap(), mdx()],
  redirects: {
    '/privacy-policy-2': '/privacy-policy',
    '/287-2': '/contact?status=success',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});