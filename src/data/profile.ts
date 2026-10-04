// Весь контент сайта живёт в этом файле.
// Отредактируйте значения — они автоматически появятся на странице.

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

export const profile = {
  name: 'Евгений Козлов',
  role: 'Engineering Manager / Staff Software Engineer',
  tagline: 'Распределённые системы, базы данных и команды, которые их создают',
  location: 'Санкт-Петербург, Россия',
  email: 'kozlovea8@gmail.com',

  // Абзацы секции «Обо мне» — можно добавить или убрать
  about: [
    'Привет! Я Евгений — Engineering Manager и Staff Software Engineer с почти десятилетним опытом в IT. Начинал с Ruby в аутсорсе, прошёл через стартапы и big tech и сейчас работаю в Т-Банке.',
    'Здесь я веду команду из восьми инженеров: мы развиваем платформу продуктовой аналитики. До этого масштабировал основную базу данных Авито и строил backend-сервисы в Купибилете и Wallarm. Основные инструменты — Go, Python и PostgreSQL; любимые темы — System Design, распределённые системы и SRE.',
    'Вне основной работы менторю backend-разработчиков, веду телеграм-канал о карьере и поддерживаю open source. Буду рад пообщаться о технологиях, менторстве или интересных идеях.',
  ],

  // Контакты: label — подпись, value — что показать, href — куда ведёт ссылка
  contacts: [
    { label: 'Email', value: 'kozlovea8@gmail.com', href: 'mailto:kozlovea8@gmail.com' },
    { label: 'Telegram', value: '@ea_kozlov', href: 'https://t.me/ea_kozlov' },
    { label: 'GitHub', value: 'abstractart', href: 'https://github.com/abstractart' },
  ] satisfies ContactLink[],
};
