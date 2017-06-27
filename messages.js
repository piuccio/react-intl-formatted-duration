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
  minutesPlural: {
    id: 'react-intl-formatted-duration.minutesPlural',
    defaultMessage: 'minutes',
  },
  minutesSingular: {
    id: 'react-intl-formatted-duration.minutesSingular',
    defaultMessage: 'minute',
  },
  secondsPlural: {
    id: 'react-intl-formatted-duration.secondsPlural',
    defaultMessage: 'seconds',
  },
  secondsSingular: {
    id: 'react-intl-formatted-duration.secondsSingular',
    defaultMessage: 'second',
  },
});
