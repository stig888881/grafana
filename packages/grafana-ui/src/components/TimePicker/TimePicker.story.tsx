import React from 'react';
import moment, { Moment } from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TimePicker } from './TimePicker';
import { UseState } from '../../utils/storybook/UseState';
import { withRighAlignedStory } from '../../utils/storybook/withRightAlignedStory';

const TimePickerStories = storiesOf('UI/TimePicker', module);
export const popoverOptions = {
  '0': [
    {
      from: 'now-2d',
      to: 'now',
      display: 'РЫБА',
      section: 0,
      active: false,
    },
    {
      from: 'now-7d',
      to: 'now',
      display: 'РЫБА',
      section: 0,
      active: false,
    },
    {
      from: 'now-30d',
      to: 'now',
      display: 'РЫБА',
      section: 0,
      active: false,
    },
    {
      from: 'now-90d',
      to: 'now',
      display: 'РЫБА',
      section: 0,
      active: false,
    },
    {
      from: 'now-6M',
      to: 'now',
      display: 'РЫБА',
      section: 0,
      active: false,
    },
    {
      from: 'now-1y',
      to: 'now',
      display: 'РЫБА',
      section: 0,
      active: false,
    },
    {
      from: 'now-2y',
      to: 'now',
      display: 'РЫБА',
      section: 0,
      active: false,
    },
    {
      from: 'now-5y',
      to: 'now',
      display: 'Последние 5 лет',
      section: 0,
      active: false,
    },
  ],
  '1': [
    {
      from: 'now-1d/d',
      to: 'now-1d/d',
      display: 'Вчера',
      section: 1,
      active: false,
    },
    {
      from: 'now-2d/d',
      to: 'now-2d/d',
      display: 'Позавчера',
      section: 1,
      active: false,
    },
    {
      from: 'now-7d/d',
      to: 'now-7d/d',
      display: 'РЫБА',
      section: 1,
      active: false,
    },
    {
      from: 'now-1w/w',
      to: 'now-1w/w',
      display: 'РЫБА',
      section: 1,
      active: false,
    },
    {
      from: 'now-1M/M',
      to: 'now-1M/M',
      display: 'РЫБА',
      section: 1,
      active: false,
    },
    {
      from: 'now-1y/y',
      to: 'now-1y/y',
      display: 'РЫБА',
      section: 1,
      active: false,
    },
  ],
  '2': [
    {
      from: 'now/d',
      to: 'now/d',
      display: 'РЫБА',
      section: 2,
      active: true,
    },
    {
      from: 'now/d',
      to: 'now',
      display: 'РЫБА',
      section: 2,
      active: false,
    },
    {
      from: 'now/w',
      to: 'now/w',
      display: 'РЫБА',
      section: 2,
      active: false,
    },
    {
      from: 'now/w',
      to: 'now',
      display: 'РЫБА',
      section: 2,
      active: false,
    },
    {
      from: 'now/M',
      to: 'now/M',
      display: 'РЫБА',
      section: 2,
      active: false,
    },
    {
      from: 'now/M',
      to: 'now',
      display: 'РЫБА',
      section: 2,
      active: false,
    },
    {
      from: 'now/y',
      to: 'now/y',
      display: 'РЫБА',
      section: 2,
      active: false,
    },
    {
      from: 'now/y',
      to: 'now',
      display: 'РЫБА',
      section: 2,
      active: false,
    },
  ],
};

TimePickerStories.addDecorator(withRighAlignedStory);

TimePickerStories.add('default', () => {
  return (
    <UseState
      initialState={{
        from: moment(),
        to: moment(),
        raw: { from: 'now-6h' as string | Moment, to: 'now' as string | Moment },
      }}
    >
      {(value, updateValue) => {
        return (
          <TimePicker
            isTimezoneUtc={false}
            value={value}
            tooltipContent="TimePicker tooltip"
            selectOptions={[
              { from: 'now-5m', to: 'now', display: 'Последние 5 минут', section: 3, active: false },
              { from: 'now-15m', to: 'now', display: 'Последние 15 минут', section: 3, active: false },
              { from: 'now-30m', to: 'now', display: 'Последние 30 минут', section: 3, active: false },
              { from: 'now-1h', to: 'now', display: 'Последний час', section: 3, active: false },
              { from: 'now-3h', to: 'now', display: 'Последние 3 часа', section: 3, active: false },
              { from: 'now-6h', to: 'now', display: 'Последние 6 часов', section: 3, active: false },
              { from: 'now-12h', to: 'now', display: 'Последние 12 часов', section: 3, active: false },
              { from: 'now-24h', to: 'now', display: 'Последние 24 часа', section: 3, active: false },
            ]}
            popoverOptions={popoverOptions}
            onChange={timeRange => {
              action('onChange fired')(timeRange);
              updateValue(timeRange);
            }}
            onMoveBackward={() => {
              action('onMoveBackward fired')();
            }}
            onMoveForward={() => {
              action('onMoveForward fired')();
            }}
            onZoom={() => {
              action('onZoom fired')();
            }}
          />
        );
      }}
    </UseState>
  );
});
