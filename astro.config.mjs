import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ahmetihtiyar.com',
  trailingSlash: 'never',
  devToolbar: {
    enabled: false,
  },
  redirects: {
    '/cases/timescaledb': '/posts/timescaledb-mimarisi-ve-kullanim-rehberi',
    '/posts/timescaledb-continuous-aggregates-ve-retention-pratikte': '/posts/timescaledb-mimarisi-ve-kullanim-rehberi',
  },
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-dark-dimmed',
        wrap: false,
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['mermaid'],
    },
  },
});
