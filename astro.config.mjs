// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://jadengeller.github.io',
  base: '/living-bountifully',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
