import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { IntlProvider } from 'react-intl';

import DurationMessage from '../../index';

function Text(props) {
  return <span {...props}/>;
}

export function text(value, format) {
  return mountWithIntl(<DurationMessage seconds={value} format={format} textComponent={Text} />).text().trim().replace(/\s+/g, ' ');
}

export function getIntl({ locale = 'en', messages } = {}) {
  const intlProvider = new IntlProvider({ locale, messages }, {});
  return intlProvider.getChildContext().intl;
}
