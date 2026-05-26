// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is the canonical base URL used for sitemap entries and any other
// absolute-URL generation. The placeholder yat-college.example is an
// IANA-reserved domain that doesn't resolve — swap to the real domain when
// it's decided (per scenario/website.md §9.1 #2).
export default defineConfig({
  site: 'https://yat-college.example',

  integrations: [
    sitemap({
      // The intranet is meant to feel behind a sign-in gate — public-search
      // indexing it would break the simulation. Sign-in itself isn't useful
      // to surface in search results either.
      filter: (page) =>
        !page.includes('/intranet/') &&
        !page.includes('/sign-in/'),
    }),
  ],
});
