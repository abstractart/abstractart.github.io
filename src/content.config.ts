import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Записи блога: Markdown-файлы в src/content/blog/.
// Имя файла становится адресом: hello-world.md → /blog/hello-world/
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { blog };
