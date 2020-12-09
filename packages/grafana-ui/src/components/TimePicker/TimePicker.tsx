import React, { PureComponent } from 'react';
import moment from 'moment';
import { ButtonSelect } from '../Select/ButtonSelect';
import { mapTimeOptionToTimeRange, mapTimeRangeToRangeString } from './time';
import { Props as TimePickerPopoverProps } from './TimePickerPopover';
import { TimePickerOptionGroup } from './TimePickerOptionGroup';
import { PopperContent } from '../Tooltip/PopperController';
import { Timezone } from '../../utils/datemath';
import { TimeRange, TimeOption, TimeOptions } from '../../types/time';
import { SelectOptionItem } from '../Select/Select';

export interface Props {
  value: TimeRange;
  isTimezoneUtc: boolean;
  popoverOptions: TimeOptions;
  selectOptions: TimeOption[];
  timezone?: Timezone;
  onChange: (timeRange: TimeRange) => void;
  onMoveBackward: () => void;
  onMoveForward: () => void;
  onZoom: () => void;
  tooltipContent?: PopperContent<any>;
}

const defaultSelectOptions = [
  { from: 'Сейчас-5 минут назад', to: 'Сейчас', display: 'Последние 5 минут', section: 3, active: false },
  { from: 'Сейчас-15 минут назад', to: 'Сейчас', display: 'Последние 15 минут', section: 3, active: false },
  { from: 'Сейчас-30 минут назад', to: 'Сейчас', display: 'Последние 30 минут', section: 3, active: false },
  { from: 'Сейчас-1 час назад', to: 'Сейчас', display: 'Последний час', section: 3, active: false },
  { from: 'Сейчас-3 часа назад', to: 'Сейчас', display: 'Последние 3 часа', section: 3, active: false },
  { from: 'Сейчас-6 часа назад', to: 'Сейчас', display: 'Последние 6 часов', section: 3, active: false },
  { from: 'Сейчас-12 часов назад', to: 'Сейчас', display: 'Последние 12 часов', section: 3, active: false },
  { from: 'Сейчас-24 часа назад', to: 'Сейчас', display: 'Последние 24 часа', section: 3, active: false },
];
const defaultPopoverOptions = {
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
      display: 'РЫБА',
      section: 0,
      active: false,
    },
  ],
  '1': [
    {
      from: 'now-1d/d',
      to: 'now-1d/d',
      display: 'РЫБА',
      section: 1,
      active: false,
    },
    {
      from: 'now-2d/d',
      to: 'now-2d/d',
      display: 'РЫБА',
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
      display: 'ПРЫБА',
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

export interface State {
  isMenuOpen: boolean;
}

export class TimePicker extends PureComponent<Props, State> {
  static defaultSelectOptions = defaultSelectOptions;
  static defaultPopoverOptions = defaultPopoverOptions;
  state: State = {
    isMenuOpen: false,
  };

  mapTimeOptionsToSelectOptionItems = (selectOptions: TimeOption[]) => {
    const { value, popoverOptions, isTimezoneUtc, timezone } = this.props;
    const options = selectOptions.map(timeOption => {
      return { label: timeOption.display, value: timeOption };
    });

    const popoverProps: TimePickerPopoverProps = {
      value,
      options: popoverOptions,
      isTimezoneUtc,
      timezone,
    };

    return [
      {
        label: 'Custom',
        expanded: true,
        options,
        onPopoverOpen: () => undefined,
        onPopoverClose: (timeRange: TimeRange) => this.onPopoverClose(timeRange),
        popoverProps,
      },
    ];
  };

  onSelectChanged = (item: SelectOptionItem<TimeOption>) => {
    const { isTimezoneUtc, onChange, timezone } = this.props;

    // @ts-ignore
    onChange(mapTimeOptionToTimeRange(item.value, isTimezoneUtc, timezone));
  };

  onChangeMenuOpenState = (isOpen: boolean) => {
    this.setState({
      isMenuOpen: isOpen,
    });
  };
  onOpenMenu = () => this.onChangeMenuOpenState(true);
  onCloseMenu = () => this.onChangeMenuOpenState(false);

  onPopoverClose = (timeRange: TimeRange) => {
    const { onChange } = this.props;
    onChange(timeRange);
    // Here we should also close the Select but no sure how to solve this without introducing state in this component
    // Edit: State introduced
    this.onCloseMenu();
  };

  render() {
    const {
      selectOptions: selectTimeOptions,
      value,
      onMoveBackward,
      onMoveForward,
      onZoom,
      tooltipContent,
    } = this.props;
    const options = this.mapTimeOptionsToSelectOptionItems(selectTimeOptions);
    const rangeString = mapTimeRangeToRangeString(value);
    const isAbsolute = moment.isMoment(value.raw.to);

    return (
      <div className="time-picker">
        <div className="time-picker-buttons">
          {isAbsolute && (
            <button className="btn navbar-button navbar-button--tight" onClick={onMoveBackward}>
              <i className="fa fa-chevron-left" />
            </button>
          )}
          <ButtonSelect
            className="time-picker-button-select"
            value={value}
            label={rangeString}
            options={options}
            onChange={this.onSelectChanged}
            components={{ Group: TimePickerOptionGroup }}
            iconClass={'fa fa-clock-o fa-fw'}
            tooltipContent={tooltipContent}
            isMenuOpen={this.state.isMenuOpen}
            onOpenMenu={this.onOpenMenu}
            onCloseMenu={this.onCloseMenu}
          />
          {isAbsolute && (
            <button className="btn navbar-button navbar-button--tight" onClick={onMoveForward}>
              <i className="fa fa-chevron-right" />
            </button>
          )}
          <button className="btn navbar-button navbar-button--zoom" onClick={onZoom}>
            <i className="fa fa-search-minus" />
          </button>
        </div>
      </div>
    );
  }
}
