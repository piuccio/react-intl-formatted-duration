import messages from './messages';
import { formatMessageToParts, KEY_LITERAL } from './formatMessageToParts';

export const EXTENDED_FORMAT = 'EXTENDED_FORMAT';
export const TIMER_FORMAT = 'TIMER_FORMAT';

/**
 * Stringifies a duration in a localized format.
 *
 * @param intl       - React Intl intl instance
 * @param seconds    - Duration in seconds
 * @param format     - EXTENDED_FORMAT or TIMER_FORMAT
 * @returns {string} - The duration as a localized string
 */
export function formatDuration(intl, seconds, { format } = {}) {
  return formatDurationToParts(intl, seconds, { format })
    .map(token => token.value)
    .join('')
    .trim();
}

/**
 * Generate a duration as an array of tokens. Similar to {@link Intl.DateTimeFormat#formatToParts}
 *
 * @example formatDurationToParts(intl, 150, { format: 'EXTENDED_FORMAT' })
 * [ { type: 'minutes', value: '2' },
 *   { type: 'literal', value: ' ' },
 *   { type: 'unit', value: 'minutes' },
 *   { type: 'literal', value: ' ' },
 *   { type: 'seconds', value: '30' },
 *   { type: 'literal', value: ' ' },
 *   { type: 'unit', value: 'seconds' } ]
 *
 * @example formatDurationToParts(intl, 62, { format: 'TIMER_FORMAT' })
 * [ { type: 'minutes', value: '1' },
 *   { type: 'literal', value: ':' },
 *   { type: 'seconds', value: '02' } ]
 *
 * @param intl      - React Intl intl instance
 * @param seconds   - Duration in seconds
 * @param format    - EXTENDED_FORMAT or TIMER_FORMAT
 * @returns {Array} - The duration string as an array of { type, value } tokens.
 */
export function formatDurationToParts(intl, seconds, { format } = {}) {
  const fullDays = Math.floor(seconds / 86400);
  const fullHours = Math.floor(seconds / 3600);
  const hoursLeft = Math.floor(fullHours % 24);
  const fullMinutes = Math.floor(seconds / 60);
  const minutesLeft = Math.floor(fullMinutes % 60);
  const secondsLeft = seconds % 60;

  let valueFormatter;
  let formattingMessage;
  switch (format) {
    case TIMER_FORMAT:
      valueFormatter = padValue;
      formattingMessage = messages.timerFormatting;
      break;
    case EXTENDED_FORMAT:
      valueFormatter = formatUnit;
      formattingMessage = messages.longFormatting;
      break;
    default:
      valueFormatter = formatUnit;
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

  let tokenizedMessage = formatMessageToParts(intl, formattingMessage, {
    days: hasDays ? valueFormatter({
      intl,
      value: fullDays,
      key: 'days',
      maxLengthIfPadded: 1,
      showIfZero: false,
      message: messages.daysUnit,
    }) : undefined,
    hours: hasHours ? valueFormatter({
      intl,
      value: showFullHours ? fullHours : hoursLeft,
      key: 'hours',
      maxLengthIfPadded: 1,
      showIfZero: false,
      message: messages.hoursUnit,
    }) : undefined,
    minutes: valueFormatter({
      intl,
      value: (showFullMinutes ? fullMinutes : minutesLeft) + ((!hasSeconds && secondsLeft >= 30) ? 1 : 0),
      key: 'minutes',
      maxLengthIfPadded: 1,
      showIfZero: !hasSeconds && fullHours === 0,
      message: messages.minutesUnit,
    }),
    seconds: hasSeconds ? valueFormatter({
      intl,
      value: secondsLeft,
      key: 'seconds',
      maxLengthIfPadded: 2,
      showIfZero: false,
      message: messages.secondsUnit,
    }) : undefined,
  });

  // formatUnit generates more tokenized messages, we need to flatten them
  if (valueFormatter === formatUnit) {

    const flatTokenizedMessage = [];

    for (let i = 0; i < tokenizedMessage.length; i++) {
      const token = tokenizedMessage[i];

      if (!Array.isArray(token.value)) {
        flatTokenizedMessage.push(token);
        continue;
      }

      const subTokens = token.value;
      for (let j = 0; j < subTokens.length; j++) {
        const subToken = subTokens[j];

        if (subToken.type === 'value') {
          subToken.type = token.type;
        }

        flatTokenizedMessage.push(subToken);
      }
    }

    tokenizedMessage = flatTokenizedMessage;
  }

  // Remove trailing spaces (start)
  while (tokenizedMessage.length > 0 && tokenizedMessage[0].value.trim() === '') {
    tokenizedMessage.shift();
  }

  // Remove trailing spaces (end)
  while (tokenizedMessage.length > 0 && tokenizedMessage[tokenizedMessage.length - 1].value.trim() === '') {
    tokenizedMessage.pop();
  }

  // Concat consecutive literals & reduce spaces to 1
  for (let i = 0; i < (tokenizedMessage.length - 1); i++) {
    const token = tokenizedMessage[i];
    if (token.type !== KEY_LITERAL) {
      continue;
    }

    const nextToken = tokenizedMessage[i + 1];
    if (nextToken.type !== KEY_LITERAL) {
      token.type = 'literal';

      i++; // skip next token too
      continue;
    }

    token.value = (token.value + nextToken.value).replace(/\s\s+/g, ' ');
    tokenizedMessage.splice(i + 1, 1);
    i--; // stay on current token.
  }

  return tokenizedMessage;
}

function formatUnit({ intl, value, showIfZero, message }) {
  if (!value && !showIfZero) {
    return [];
  }

  value = String(value);

  const unit = intl.formatMessage(message, { value });

  return formatMessageToParts(intl, messages.duration, { value, unit });
}

function padValue({ value, maxLengthIfPadded }) {
  return `0${value || '0'}`.substr(-maxLengthIfPadded);
}
