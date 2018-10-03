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
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import messages from './messages';

import {
  EXTENDED_FORMAT,
  TIMER_FORMAT
} from './src/constants';

export {
  EXTENDED_FORMAT,
  TIMER_FORMAT
};

function FormattedUnit({ value, showIfZero, message, textComponent, valueComponent }) {
  if (!value && !showIfZero) {
    return React.createElement(textComponent, {}, '');
  }

  return (
    <FormattedMessage
      {...messages.duration}
      values={{
        value: React.createElement(valueComponent, {}, value),
        unit: (
          <FormattedMessage {...message} values={{ value }} />
        ),
      }}
    />
  );
}

FormattedUnit.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }).isRequired,
  showIfZero: PropTypes.bool,
  textComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  value: PropTypes.number,
  valueComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
};

function PaddedValue({ value, maxLengthIfPadded, valueComponent }) {
  return React.createElement(valueComponent, {}, `0${value || '0'}`.substr(-maxLengthIfPadded));
}

PaddedValue.propTypes = {
  value: PropTypes.number,
  maxLengthIfPadded: PropTypes.number,
  valueComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
};

function DurationMessage({ intl, seconds, format, textComponent, valueComponent }) {
  const fullDays = Math.floor(seconds / 86400);
  const fullHours = Math.floor(seconds / 3600);
  const hoursLeft = Math.floor(fullHours % 24);
  const fullMinutes = Math.floor(seconds / 60);
  const minutesLeft = Math.floor(fullMinutes % 60);
  const secondsLeft = seconds % 60;

  let component;
  let formattingMessage;
  switch (format) {
    case TIMER_FORMAT:
      component = PaddedValue;
      formattingMessage = messages.timerFormatting;
      break;
    case EXTENDED_FORMAT:
      component = FormattedUnit;
      formattingMessage = messages.longFormatting;
      break;
    default:
      component = FormattedUnit;
      formattingMessage = format ? {
        id: `react-intl-formatted-duration/custom-format/${format}`,
        defaultMessage: format,
      } : messages.longFormatting;
      break;
  }

  const message = intl.messages[formattingMessage.id] || formattingMessage.defaultMessage;
  const hasSeconds = message.indexOf('{seconds}') !== -1;
  const hasHours = message.indexOf('{hours}') !== -1;
  const hasDays = message.indexOf('{days}') !== -1;
  const showFullMinutes = !hasHours && !hasDays;
  const showFullHours = !hasDays;

  return (
    <FormattedMessage
      {...formattingMessage}
      values={{
        days: hasDays ? React.createElement(
          component,
          {
            value: fullDays,
            key: 'days',
            maxLengthIfPadded: 1,
            showIfZero: false,
            message: messages.daysUnit,
            textComponent,
            valueComponent: valueComponent || textComponent,
          },
        ) : undefined,
        hours: hasHours ? React.createElement(
          component,
          {
            value: showFullHours ? fullHours : hoursLeft,
            key: 'hours',
            maxLengthIfPadded: 1,
            showIfZero: false,
            message: messages.hoursUnit,
            textComponent,
            valueComponent: valueComponent || textComponent,
          },
        ) : undefined,
        minutes: React.createElement(
          component,
          {
            value: (showFullMinutes ? fullMinutes : minutesLeft) + ((!hasSeconds && secondsLeft >= 30) ? 1 : 0),
            key: 'minutes',
            maxLengthIfPadded: 1,
            showIfZero: !hasSeconds && fullHours === 0,
            message: messages.minutesUnit,
            textComponent,
            valueComponent: valueComponent || textComponent,
          },
        ),
        seconds: hasSeconds ? React.createElement(
          component,
          {
            value: secondsLeft,
            key: 'seconds',
            maxLengthIfPadded: 2,
            showIfZero: false,
            message: messages.secondsUnit,
            textComponent,
            valueComponent: valueComponent || textComponent,
          },
        ) : undefined,
      }}
    />
  );
}

DurationMessage.propTypes = {
  intl: intlShape.isRequired,
  format: PropTypes.string,
  seconds: PropTypes.number.isRequired,
  textComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  valueComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default injectIntl(DurationMessage);
