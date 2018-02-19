import messages from '../messages';
import {
  EXTENDED_FORMAT,
  TIMER_FORMAT,
} from './constants';

export function formatToParts(intl, format, seconds) {
  const message = getMessage(format);
  const formatter = format === TIMER_FORMAT ? formatPadding : formatWithDuration;

  // Basic match that doesn't depend on the format message
  const fullDays = Math.floor(seconds / 86400);
  const fullHours = Math.floor(seconds / 3600);
  const hoursLeft = Math.floor(fullHours % 24);
  const fullMinutes = Math.floor(seconds / 60);
  const minutesLeft = Math.floor(fullMinutes % 60);
  const secondsLeft = seconds % 60;

  const valueGetters = {
    days: (has) => has.days ? {
      type: 'day',
      value: fullDays,
      maxLengthIfPadded: 1,
      showIfZero: false,
      message: messages.daysUnit,
    } : undefined,
    hours: (has) => {
      const showFullHours = !has.days;
      return has.hours ? {
        type: 'hour',
        value: showFullHours ? fullHours : hoursLeft,
        maxLengthIfPadded: 1,
        showIfZero: false,
        message: messages.hoursUnit,
      } : undefined;
    },
    minutes: (has) => {
      const showFullMinutes = !has.hours && !has.days;
      return {
        type: 'minute',
        value: (showFullMinutes ? fullMinutes : minutesLeft) + ((!has.seconds && secondsLeft >= 30) ? 1 : 0),
        maxLengthIfPadded: 1,
        showIfZero: !has.seconds && fullHours === 0,
        message: messages.minutesUnit,
      }
    },
    seconds: (has) => has.seconds ? {
      type: 'second',
      value: secondsLeft,
      maxLengthIfPadded: 2,
      showIfZero: false,
      message: messages.secondsUnit,
    } : undefined,
  }

  return trim(splitIntoTokens(intl, message, valueGetters, formatter));
}

// Creates a token with a random UID that should not be guessable or
// conflict with other parts of the `message` string.
const UID = Math.floor(Math.random() * 0x10000000000).toString(16);

function splitIntoTokens(intl, message, valueGetters, formatter) {
  // We only recognise some tokens in the localised message, remember which one
  // we actually encounter in the localised message
  const has = {};
  const original = {};
  const formattingValues = Object.keys(valueGetters).reduce((all, name) => {
    Object.defineProperty(all, name, {
      get() {
        // There are some edge cases in simply relying on `indexOf('{seconds}')` of the default message
        // Use getters to know for sure that the value is actually used in the localised message
        has[name] = true;
        const generatedName = `@__TOKEN-${UID}-${name}__@`;
        original[generatedName] = name;
        return generatedName;
      }
    });
    return all;
  }, {});

  const formattedMessage = intl.formatMessage(message, formattingValues);

  const tokens = [];
  formattedMessage.split(new RegExp(`(@__TOKEN-${UID}-.+?__@)`)).forEach((chunk) => {
    if (!chunk) return;
    if (!original[chunk]) {
      // literal value, ignore white space at the beginning or repeated
      if (tokens.length === 0 || isEmpty(tokens[tokens.length - 1])) return;
      tokens.push({ type: 'literal', value: chunk });
    } else {
      tokens.push(...formatter(valueGetters[original[chunk]](has), intl).filter(Boolean));
    }
  });
  return tokens;
}

function getMessage(format) {
  switch (format) {
    case TIMER_FORMAT:
      return messages.timerFormatting;
    case EXTENDED_FORMAT:
      return messages.longFormatting;
    default:
      return format ? {
        id: `react-intl-formatted-duration/custom-format/${format}`,
        defaultMessage: format,
      } : messages.longFormatting;
  }
}

function formatPadding({ type, value, maxLengthIfPadded }) {
  return [{ type, value: `0${value || '0'}`.substr(-maxLengthIfPadded) }];
}

function formatWithDuration({ type, message, value, showIfZero }, intl) {
  if (!value && !showIfZero) {
    return [];
  }

  const valueGetters = {
    value: () => [{ type, value: String(value) }],
    unit: () => [{
      type: 'unit',
      value: intl.formatMessage(message, { value }),
    }],
  };

  return splitIntoTokens(intl, messages.duration, valueGetters, (token) => token);
}

function trim(tokens) {
  // We don't push empty literals at the beginning or repeated, but there might be one at the end
  if (isEmpty(tokens[tokens.length - 1])) {
    tokens.pop();
  }
  return tokens;
}

function isEmpty(part) {
  return part.type === 'literal' && !part.value.trim();
}
