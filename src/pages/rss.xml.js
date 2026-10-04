import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { profile } from '../data/profile';

export async function GET(context) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: `${profile.name} — блог`,
    description: profile.tagline,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/${post.id}/`,
    })),
    customData: '<language>ru</language>',
  });
}
