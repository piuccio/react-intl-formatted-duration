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
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedPlural } from 'react-intl';

import messages from './messages';

export const EXTENDED_FORMAT = 'EXTENDED_FORMAT';
export const TIMER_FORMAT = 'TIMER_FORMAT';

function FormattedUnit({ value, singular, plural, textComponent, valueComponent }) {
  if (!value) {
    return React.createElement(textComponent, {}, '');
  }

  return (
    <FormattedMessage
      {...messages.duration}
      values={{
        value: React.createElement(valueComponent, {}, value),
        unit: (
          <FormattedPlural
            value={value}
            one={<FormattedMessage {...singular} />}
            other={<FormattedMessage {...plural} />}
          />
        ),
      }}
    />
  );
}

FormattedUnit.propTypes = {
  plural: PropTypes.object,
  singular: PropTypes.object,
  textComponent: PropTypes.func.isRequired,
  value: PropTypes.number,
  valueComponent: PropTypes.func.isRequired,
};

function PaddedValue({ value, maxLengthIfPadded, valueComponent }) {
  return React.createElement(valueComponent, {}, `0${value || '0'}`.substr(-maxLengthIfPadded));
}

PaddedValue.propTypes = {
  value: PropTypes.number,
  maxLengthIfPadded: PropTypes.number,
  valueComponent: PropTypes.func.isRequired,
};

function DurationMessage({ seconds, format, textComponent, valueComponent }) {
  const fullMinutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;

  let component;
  let formattingMessage;
  switch (format) {
    case TIMER_FORMAT:
      component = PaddedValue;
      formattingMessage = messages.timerFormatting;
      break;
    case EXTENDED_FORMAT:
    default:
      component = FormattedUnit;
      formattingMessage = messages.longFormatting;
      break;
  }

  return (
    <FormattedMessage
      {...formattingMessage}
      values={{
        minutes: React.createElement(
          component,
          {
            value: fullMinutes,
            key: 'minutes',
            maxLengthIfPadded: 1,
            singular: messages.minutesSingular,
            plural: messages.minutesPlural,
            textComponent,
            valueComponent: valueComponent || textComponent,
          },
        ),
        seconds: React.createElement(
          component,
          {
            value: secondsLeft,
            key: 'seconds',
            maxLengthIfPadded: 2,
            singular: messages.secondsSingular,
            plural: messages.secondsPlural,
            textComponent,
            valueComponent: valueComponent || textComponent,
          },
        ),
      }}
    />
  );
}

DurationMessage.propTypes = {
  format: PropTypes.string,
  seconds: PropTypes.number.isRequired,
  textComponent: PropTypes.func.isRequired,
  valueComponent: PropTypes.func,
};

export default DurationMessage;
