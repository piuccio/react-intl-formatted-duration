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
  daysPlural: {
    id: 'react-intl-formatted-duration.daysPlural',
    defaultMessage: 'days',
  },
  daysSingular: {
    id: 'react-intl-formatted-duration.daysSingular',
    defaultMessage: 'day',
  },
  hoursPlural: {
    id: 'react-intl-formatted-duration.hoursPlural',
    defaultMessage: 'hours',
  },
  hoursSingular: {
    id: 'react-intl-formatted-duration.hoursSingular',
    defaultMessage: 'hour',
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
