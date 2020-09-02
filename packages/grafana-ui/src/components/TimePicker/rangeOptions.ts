import { TimeOption } from '@grafana/data';

export const quickOptions: TimeOption[] = [
  { from: 'now-5m', to: 'now', display: 'Последние 5 минут', section: 3 },
  { from: 'now-15m', to: 'now', display: 'Последние 15 минут', section: 3 },
  { from: 'now-30m', to: 'now', display: 'Последние 30 минут', section: 3 },
  { from: 'now-1h', to: 'now', display: 'Последний час', section: 3 },
  { from: 'now-3h', to: 'now', display: 'Последние 3 часа', section: 3 },
  { from: 'now-6h', to: 'now', display: 'Последние 6 часов', section: 3 },
  { from: 'now-12h', to: 'now', display: 'Последние 12 часов', section: 3 },
  { from: 'now-24h', to: 'now', display: 'Последние 24 часа', section: 3 },
  { from: 'now-2d', to: 'now', display: 'Последние 2 дня', section: 3 },
  { from: 'now-7d', to: 'now', display: 'Последние 7 дней', section: 3 },
  { from: 'now-30d', to: 'now', display: 'Последние 30 дней', section: 3 },
  { from: 'now-90d', to: 'now', display: 'Последние 90 дней', section: 3 },
  { from: 'now-6M', to: 'now', display: 'Последние 6 месяцев', section: 3 },
  { from: 'now-1y', to: 'now', display: 'Последний год', section: 3 },
  { from: 'now-2y', to: 'now', display: 'Последние 2 года', section: 3 },
  { from: 'now-5y', to: 'now', display: 'Последние 5 лет', section: 3 },
];

export const otherOptions: TimeOption[] = [
  { from: 'now-1d/d', to: 'now-1d/d', display: 'Вчера', section: 3 },
  { from: 'now-2d/d', to: 'now-2d/d', display: 'Позавчера', section: 3 },
  { from: 'now-7d/d', to: 'now-7d/d', display: 'Этот день прошлой недели', section: 3 },
  { from: 'now-1w/w', to: 'now-1w/w', display: 'Предыдущая неделя', section: 3 },
  { from: 'now-1M/M', to: 'now-1M/M', display: 'Предыдущий месяц', section: 3 },
  { from: 'now-1y/y', to: 'now-1y/y', display: 'Предыдущий год', section: 3 },
  { from: 'now/d', to: 'now/d', display: 'Сегодня', section: 3 },
  { from: 'now/d', to: 'now', display: 'Сегодня до сих пор', section: 3 },
  { from: 'now/w', to: 'now/w', display: 'Эта неделя', section: 3 },
  { from: 'now/w', to: 'now', display: 'Эта неделя до сих пор', section: 3 },
  { from: 'now/M', to: 'now/M', display: 'Этот месяц', section: 3 },
  { from: 'now/M', to: 'now', display: 'Этот месяц до сих пор', section: 3 },
  { from: 'now/y', to: 'now/y', display: 'Этот год', section: 3 },
  { from: 'now/y', to: 'now', display: 'Этот год до сих пор', section: 3 },
];
