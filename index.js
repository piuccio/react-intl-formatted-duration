// @flow
/**
* Unfortunately ReactIntl doesn't support duration yet because it's not implemented
* in the ECMA specs: https://github.com/yahoo/react-intl/issues/77
*
* <DurationMessage seconds={30} format={EXTENDED_FORMAT} /> becomes <span>30 seconds</span>
* <DurationMessage seconds={60} format={EXTENDED_FORMAT} /> becomes <span>1 minute</span>
* <DurationMessage seconds={150} format={EXTENDED_FORMAT} /> becomes <span>2 minutes 30 seconds</span>
* `minutes` and `seconds` are translated
*
* <DurationMessage seconds={30} format={TIMER_FORMAT} /> becomes <span>0:30</span>
* <DurationMessage seconds={60} format={TIMER_FORMAT} /> becomes <span>1:00</span>
* <DurationMessage seconds={150} format={TIMER_FORMAT} /> becomes <span>2:30</span>
*/

import React from 'react';
import { injectIntl } from 'react-intl';
import DurationUnitFormat from 'intl-unofficial-duration-unit-format';
import type { intlShape } from 'react-intl';
import type { ElementType } from 'react';

export const EXTENDED_FORMAT = 'EXTENDED_FORMAT';
export const TIMER_FORMAT = 'TIMER_FORMAT';

function DurationMessage({ intl, seconds, format, textComponent, valueComponent, ...otherProps }: Props) {
  let actualFormat = intl.messages[`react-intl-formatted-duration/custom-format/${format || ''}`] || format;
  if (!format || format === EXTENDED_FORMAT) {
    actualFormat = intl.messages['react-intl-formatted-duration.longFormatting'] || '{minutes} {seconds}';
  }
  if (format === TIMER_FORMAT) {
    actualFormat = intl.messages['react-intl-formatted-duration.timerFormatting'] || '{minutes}:{seconds}';
  }
  const parts = new DurationUnitFormat(intl.locale, {
    format: actualFormat,
    formatUnits: {
      [DurationUnitFormat.units.DAY]: intl.messages['react-intl-formatted-duration.daysUnit'] || '{value, plural, one {day} other {days}}',
      [DurationUnitFormat.units.HOUR]: intl.messages['react-intl-formatted-duration.hoursUnit'] || '{value, plural, one {hour} other {hours}}',
      [DurationUnitFormat.units.MINUTE]: intl.messages['react-intl-formatted-duration.minutesUnit'] || '{value, plural, one {minute} other {minutes}}',
      [DurationUnitFormat.units.SECOND]: intl.messages['react-intl-formatted-duration.secondsUnit'] || '{value, plural, one {second} other {seconds}}',
    },
    formatDuration: intl.messages['react-intl-formatted-duration.duration'] || '{value} {unit}',
    round: true, // TODO backward compatible, add a prop to configure it
    style: format === TIMER_FORMAT ? DurationUnitFormat.styles.TIMER : DurationUnitFormat.styles.CUSTOM,
  }).formatToParts(seconds);

  const Text = textComponent || intl.textComponent;
  const Value = valueComponent || textComponent || intl.textComponent;
  return React.createElement(Text, otherProps, parts.map((token) => {
    if (token.type === 'literal' || token.type === 'unit') return token.value;
    return React.createElement(Value, { key: token.type }, token.value);
  }));
}

type Props = {
  intl: intlShape,
  format?: string,
  seconds: number,
  textComponent?: ElementType,
  valueComponent?: ElementType,
}

export default injectIntl(DurationMessage);
