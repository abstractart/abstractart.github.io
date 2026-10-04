import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';

// Генерация OG-картинки для каждой записи блога: крупный заголовок
// статьи, автор — маленькой строкой внизу. Шрифты берутся системные
// (fontconfig): на CI это DejaVu Sans, локально — системный sans-serif,
// у обоих есть кириллица.

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function wrap(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.id } }));
}

export const GET: APIRoute = async ({ params }) => {
  const posts = await getCollection('blog');
  const post = posts.find((entry) => entry.id === params.slug);
  if (!post) return new Response('Not found', { status: 404 });

  const title = post.data.title;
  const fontSize = title.length <= 56 ? 58 : title.length <= 100 ? 48 : 40;
  const maxChars = title.length <= 56 ? 28 : title.length <= 100 ? 34 : 42;
  const lineHeight = Math.round(fontSize * 1.25);
  const lines = wrap(title, maxChars);

  const dateStr = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(post.data.pubDate);

  const titleLines = lines
    .map(
      (line, i) =>
        `<text x="96" y="${286 + i * lineHeight}" font-family="sans-serif" font-size="${fontSize}" font-weight="700" fill="#f0f0f5">${esc(line)}</text>`,
    )
    .join('\n      ');

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="85%" cy="15%" r="60%">
      <stop offset="0%" stop-color="#8b93f8" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#8b93f8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#121217"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="96" y="118" width="76" height="8" rx="4" fill="#8b93f8"/>
  <text x="96" y="182" font-family="sans-serif" font-size="26" letter-spacing="3" fill="#8b93f8">БЛОГ · ${esc(dateStr.toUpperCase())}</text>
      ${titleLines}
  <text x="96" y="546" font-family="sans-serif" font-size="28" fill="#a3a3b5">Евгений Козлов · abstractart.github.io</text>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
