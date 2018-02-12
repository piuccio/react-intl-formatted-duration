/**
 * KEY_LITERAL is a symbol used as type for "literal" tokens.
 * It is a Symbol because "type" contains the name of the variable and could collide if it is a string.
 */
export const KEY_LITERAL = typeof Symbol === 'function' ? Symbol('literal') : '@@literal@@';

/**
 * Like intl.formatMessage but returns an array of token split at the variables.
 * Similar to how <FormattedMessage> handles components in strings
 * https://github.com/yahoo/react-intl/blob/master/src/components/message.js#L58
 *
 * @returns Array
 */
export function formatMessageToParts(intl, message, values) {

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
