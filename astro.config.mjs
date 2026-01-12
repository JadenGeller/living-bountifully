// @ts-check
import { defineConfig } from 'astro/config';
import { remarkBaseUrl } from './remark-base-url.mjs';

const base = '/living-bountifully';

// https://astro.build/config
export default defineConfig({
  site: 'https://jadengeller.github.io',
  base,
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
    remarkPlugins: [[remarkBaseUrl, { base }]],
  },
});
