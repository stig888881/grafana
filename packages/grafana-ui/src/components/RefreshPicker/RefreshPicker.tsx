import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { SelectOptionItem } from '../Select/Select';
import { Tooltip } from '../Tooltip/Tooltip';
import { ButtonSelect } from '../Select/ButtonSelect';

export const offOption = { label: 'Выключить', value: '' };
export const defaultIntervals = ['5с', '10с', '30с', '1м', '5м', '15м', '30м', '1ч', '2ч', '1д'];

export interface Props {
  intervals?: string[];
  onRefresh: () => any;
  onIntervalChanged: (interval: string) => void;
  value?: string;
  tooltip: string;
}

export class RefreshPicker extends PureComponent<Props> {
  static defaultProps = {
    intervals: defaultIntervals,
  };

  constructor(props: Props) {
    super(props);
  }

  hasNoIntervals = () => {
    const { intervals } = this.props;
    // Current implementaion returns an array with length of 1 consisting of
    // an empty string when auto-refresh is empty in dashboard settings
    if (!intervals || intervals.length < 1 || (intervals.length === 1 && intervals[0] === '')) {
      return true;
    }
    return false;
  };

  intervalsToOptions = (intervals: string[] = defaultIntervals): Array<SelectOptionItem<string>> => {
    const options = intervals.map(interval => ({ label: interval, value: interval }));
    options.unshift(offOption);
    return options;
  };

  onChangeSelect = (item: SelectOptionItem<string>) => {
    const { onIntervalChanged } = this.props;
    if (onIntervalChanged) {
      // @ts-ignore
      onIntervalChanged(item.value);
    }
  };

  render() {
    const { onRefresh, intervals, tooltip, value } = this.props;
    const options = this.intervalsToOptions(this.hasNoIntervals() ? defaultIntervals : intervals);
    const currentValue = value || '';
    const selectedValue = options.find(item => item.value === currentValue) || offOption;

    const cssClasses = classNames({
      'refresh-picker': true,
      'refresh-picker--off': selectedValue.label === offOption.label,
    });

    return (
      <div className={cssClasses}>
        <div className="refresh-picker-buttons">
          <Tooltip placement="top" content={tooltip}>
            <button className="btn btn--radius-right-0 navbar-button navbar-button--refresh" onClick={onRefresh}>
              <i className="fa fa-refresh" />
            </button>
          </Tooltip>
          <ButtonSelect
            className="navbar-button--attached btn--radius-left-0"
            value={selectedValue}
            label={selectedValue.label}
            options={options}
            onChange={this.onChangeSelect}
            maxMenuHeight={380}
          />
        </div>
      </div>
    );
  }
}
