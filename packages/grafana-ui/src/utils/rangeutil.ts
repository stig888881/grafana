// @ts-ignore
import _ from 'lodash';
import moment from 'moment';

import { RawTimeRange } from '../types/time';

import * as dateMath from './datemath';

const spans: { [key: string]: { display: string; section?: number } } = {
  s: { display: 'секунды' },
  m: { display: 'минуты' },
  h: { display: 'часы' },
  d: { display: 'дни' },
  w: { display: 'недели' },
  M: { display: 'месяцы' },
  y: { display: 'годы' },
};

const rangeOptions = [


  { from: 'now-1d/d', to: 'now-1d/d', display: 'РЫБА', section: 1 },
  {
    from: 'now-2d/d',
    to: 'now-2d/d',
    display: 'РЫБА',
    section: 1,
  },
  {
    from: 'now-7d/d',
    to: 'now-7d/d',
    display: 'РЫБА',
    section: 1,
  },
  { from: 'now-1w/w', to: 'now-1w/w', display: 'РЫБА', section: 1 },
  { from: 'now-1M/M', to: 'now-1M/M', display: 'РЫБА', section: 1 },
  { from: 'now-1y/y', to: 'now-1y/y', display: 'РЫБА', section: 1 },

  { from: 'now-5m', to: 'now', display: 'Последние 5 минут', section: 3 },
  { from: 'now-15m', to: 'now', display: 'Последние 15 минут', section: 3 },
  { from: 'now-30m', to: 'now', display: 'Последние 30 минут', section: 3 },
  { from: 'now-1h', to: 'now', display: 'Последний час', section: 3 },
  { from: 'now-3h', to: 'now', display: 'Последние 3 часа', section: 3 },
  { from: 'now-6h', to: 'now', display: 'Последние 6 часов', section: 3 },
  { from: 'now-12h', to: 'now', display: 'Последние 12 часов', section: 3 },
  { from: 'now-24h', to: 'now', display: 'Последние 24 часа', section: 3 },

  { from: 'now-2d', to: 'now', display: 'РЫБА', section: 0 },
  { from: 'now-7d', to: 'now', display: 'РЫБА', section: 0 },
  { from: 'now-30d', to: 'now', display: 'РЫБА', section: 0 },
  { from: 'now-90d', to: 'now', display: 'РЫБА', section: 0 },
  { from: 'now-6M', to: 'now', display: 'РЫБА', section: 0 },
  { from: 'now-1y', to: 'now', display: 'РЫБА', section: 0 },
  { from: 'now-2y', to: 'now', display: 'РЫБА', section: 0 },
  { from: 'now-5y', to: 'now', display: 'РЫБА', section: 0 },
];

const absoluteFormat = 'MMM D, YYYY HH:mm:ss';

const rangeIndex: any = {};
_.each(rangeOptions, (frame: any) => {
  rangeIndex[frame.from + ' to ' + frame.to] = frame;
});

export function getRelativeTimesList(timepickerSettings: any, currentDisplay: any) {
  const groups = _.groupBy(rangeOptions, (option: any) => {
    option.active = option.display === currentDisplay;
    return option.section;
  });

  // _.each(timepickerSettings.time_options, (duration: string) => {
  //   let info = describeTextRange(duration);
  //   if (info.section) {
  //     groups[info.section].push(info);
  //   }
  // });

  return groups;
}

function formatDate(date: any) {
  return date.format(absoluteFormat);
}

// handles expressions like
// 5m
// 5m to now/d
// now/d to now
// now/d
// if no to <expr> then to now is assumed
export function describeTextRange(expr: any) {
  const isLast = expr.indexOf('+') !== 0;
  if (expr.indexOf('now') === -1) {
    expr = (isLast ? 'now-' : 'now') + expr;
  }

  let opt = rangeIndex[expr + ' to now'];
  if (opt) {
    return opt;
  }

  if (isLast) {
    opt = { from: expr, to: 'now' };
  } else {
    opt = { from: 'now', to: expr };
  }

  const parts = /^now([-+])(\d+)(\w)/.exec(expr);
  if (parts) {
    const unit = parts[3];
    const amount = parseInt(parts[2], 10);
    const span = spans[unit];
    if (span) {
      opt.display = isLast ? 'Last ' : 'Next ';
      opt.display += amount + ' ' + span.display;
      opt.section = span.section;
      if (amount > 1) {
        opt.display += 's';
      }
    }
  } else {
    opt.display = opt.from + ' to ' + opt.to;
    opt.invalid = true;
  }

  return opt;
}

export function describeTimeRange(range: RawTimeRange): string {
  const option = rangeIndex[range.from.toString() + ' to ' + range.to.toString()];
  if (option) {
    return option.display;
  }

  if (moment.isMoment(range.from) && moment.isMoment(range.to)) {
    return formatDate(range.from) + ' to ' + formatDate(range.to);
  }

  if (moment.isMoment(range.from)) {
    const toMoment = dateMath.parse(range.to, true);
    return toMoment ? formatDate(range.from) + ' to ' + toMoment.fromNow() : '';
  }

  if (moment.isMoment(range.to)) {
    const from = dateMath.parse(range.from, false);
    return from ? from.fromNow() + ' to ' + formatDate(range.to) : '';
  }

  if (range.to.toString() === 'now') {
    const res = describeTextRange(range.from);
    return res.display;
  }

  return range.from.toString() + ' to ' + range.to.toString();
}

export const isValidTimeSpan = (value: string) => {
  if (value.indexOf('$') === 0 || value.indexOf('+$') === 0) {
    return true;
  }

  const info = describeTextRange(value);
  return info.invalid !== true;
};
