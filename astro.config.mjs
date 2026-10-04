// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Репозиторий называется `abstractart.github.io`, поэтому сайт живёт
  // в корне домена и `base` не нужен.
  site: 'https://abstractart.github.io',
});
