import messages from './messages';

/**
 * KEY_LITERAL is a symbol used as type for "literal" tokens.
 * It is a Symbol because "type" contains the name of the variable and could collide if it is a string.
 */
export const KEY_LITERAL = typeof Symbol === 'function' ? Symbol('literal') : '@@literal@@';

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
 *   { type: Symbol(literal), value: ' ' },
 *   { type: 'unit', value: 'minutes' },
 *   { type: Symbol(literal), value: ' ' },
 *   { type: 'seconds', value: '30' },
 *   { type: Symbol(literal), value: ' ' },
 *   { type: 'unit', value: 'seconds' } ]
 *
 * @example formatDurationToParts(intl, 62, { format: 'TIMER_FORMAT' })
 * [ { type: 'minutes', value: '1' },
 *   { type: Symbol(literal), value: ':' },
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

  let tokenizedMessage = formatTokenizedMessage(intl, formattingMessage, {
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

  return formatTokenizedMessage(intl, messages.duration, { value, unit });
}

function padValue({ value, maxLengthIfPadded }) {
  return `0${value || '0'}`.substr(-maxLengthIfPadded);
}

/**
 * Like intl.formatMessage but returns an array of token split at the variables.
 * Similar to how <FormattedMessage> handles components in strings
 * https://github.com/yahoo/react-intl/blob/master/src/components/message.js#L58
 *
 * @returns Array
 */
function formatTokenizedMessage(intl, message, values) {

  // Note: Since both react-intl and we need a method like this, and has many many other use cases
  // it'd be awesome if react-intl provided an intl.formatMessageToParts() natively instead of having this hack. (through https://github.com/yahoo/intl-messageformat)

  const hasValues = values && Object.keys(values).length > 0;
  if (!hasValues) {
    return [{
      type: 'literal',
      value: intl.formatMessage(message, values),
    }];
  }

  // Creates a token with a random UID that should not be guessable or
  // conflict with other parts of the `message` string.
  const uid = Math.floor(Math.random() * 0x10000000000).toString(16);

  // Replace values variables with our tokens so we know where to inject the variables afterwards
  const tokenizedValues = {};
  Object.keys(values).forEach(name => {
    tokenizedValues[name] = `@__TOKEN-${uid}-${name}__@`;
  });

  const formattedMessage = intl.formatMessage(message, tokenizedValues);

  // Split the message into parts so the React Element values captured
  // above can be inserted back into the rendered message.
  const nodes = [];
  const tokenMatcher = new RegExp(`@__TOKEN-${uid}-(.+?)__@`);

  let str = formattedMessage;
  while (str) {
    // find first token
    const match = str.match(tokenMatcher);
    if (!match) {
      // no token left, add everything else as literal
      nodes.push({
        type: KEY_LITERAL,
        value: str,
      });

      break;
    }

    const matchStart = match.index;
    const matchLength = match[0].length;
    if (matchStart !== 0) {
      // add all chars before the matched token as a literal node
      const strStart = str.substr(0, matchStart);

      nodes.push({
        type: KEY_LITERAL,
        value: strStart,
      });
    }

    // add the matched token as variable node
    const valueKey = match[1];
    nodes.push({
      type: valueKey,
      value: values[valueKey],
    });

    // remove all chars that have been added to `nodes` during this iteration
    str = str.substr(matchStart + matchLength);
  }

  return nodes;
}
