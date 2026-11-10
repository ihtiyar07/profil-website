import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ahmetihtiyar.com',
  trailingSlash: 'never',
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-dark-dimmed',
        wrap: true,
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
