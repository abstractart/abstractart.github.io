// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Свой домен, подключённый к GitHub Pages (A-записи на 185.199.108-111.153).
  site: 'https://eugenekozlov.ru',
  integrations: [
    sitemap({
      // в карту сайта не попадают служебные страницы и сгенерированные og-картинки
      filter: (page) => !page.includes('/og/') && !page.endsWith('/404'),
    }),
  ],
});
