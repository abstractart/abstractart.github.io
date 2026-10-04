// Регенерация растровых иконок из public/favicon.svg.
// Запуск: node scripts/generate-icons.mjs
import sharp from 'sharp';

await sharp('public/favicon.svg', { density: 288 })
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png');

console.log('public/apple-touch-icon.png обновлён (180×180)');
