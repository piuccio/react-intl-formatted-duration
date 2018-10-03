// @flow
/*
 * DurationMessage Messages
 *
 * This contains all the text for the DurationMessage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  duration: {
    id: 'react-intl-formatted-duration.duration',
    defaultMessage: '{value} {unit}',
  },
  longFormatting: {
    id: 'react-intl-formatted-duration.longFormatting',
    defaultMessage: '{minutes} {seconds}',
  },
  timerFormatting: {
    id: 'react-intl-formatted-duration.timerFormatting',
    defaultMessage: '{minutes}:{seconds}',
  },
  daysUnit: {
    id: 'react-intl-formatted-duration.daysUnit',
    defaultMessage: '{value, plural, one {day} other {days}}',
  },
  hoursUnit: {
    id: 'react-intl-formatted-duration.hoursUnit',
    defaultMessage: '{value, plural, one {hour} other {hours}}',
  },
  minutesUnit: {
    id: 'react-intl-formatted-duration.minutesUnit',
    defaultMessage: '{value, plural, one {minute} other {minutes}}',
  },
  secondsUnit: {
    id: 'react-intl-formatted-duration.secondsUnit',
    defaultMessage: '{value, plural, one {second} other {seconds}}',
  },
});
