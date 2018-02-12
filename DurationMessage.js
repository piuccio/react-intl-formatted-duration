import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedNumber, injectIntl } from 'react-intl';
import { formatDurationToParts, KEY_LITERAL, KEY_UNIT } from './formatDuration';

class DurationMessage extends React.Component {

  render() {
    const intl = this.props.intl;
    const children = this.props.children;

    const {
      seconds,
      textComponent: Text = intl.textComponent,
      valueComponent: Value = Text,
    } = this.props;

    const durationParts = formatDurationToParts(intl, seconds, this.props);

    if (typeof children === 'function') {
      return children(durationParts);
    }

    return (
      <Text>
        {durationParts.map(({ type, value }, i) => {
          if (value.trim().length === 0) {
            return value;
          }

          switch (type) {
            case KEY_UNIT:
            case KEY_LITERAL:
              return <Text key={i}>{value}</Text>;

            default:
              return <Value key={i}>{value}</Value>;
          }
        })}
      </Text>
    );
  }
}

/*
 * This is a hack, react-intl has an internal method "shouldIntlComponentUpdate".
 * FormattedNumber#shouldComponentUpdate does nothing but delegate to that method.
 * We need that method to check if we should update the component.
 *
 * To remove this hack, we should either:
 * - Ask react-intl to expose shouldIntlComponentUpdate and support it officially
 * - Reimplement it, which would have a big decently big impact on the bundle size (https://github.com/yahoo/react-intl/blob/master/src/utils.js)
 */
DurationMessage.prototype.shouldComponentUpdate = FormattedNumber.prototype.shouldComponentUpdate;

DurationMessage.contextTypes = { intl: intlShape };

DurationMessage.propTypes = {
  intl: intlShape.isRequired,
  format: PropTypes.string,
  seconds: PropTypes.number.isRequired,
  textComponent: PropTypes.func.isRequired,
  valueComponent: PropTypes.func,
  children: PropTypes.func,
};

export default injectIntl(DurationMessage);
