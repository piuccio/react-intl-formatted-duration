import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';

import DurationMessage from '../../index';

function Text(props) {
  return <span {...props}/>;
}

export function text(value: number, format?: string) {
  return mountWithIntl(<DurationMessage seconds={value} format={format} textComponent={Text} />).text().trim().replace(/\s+/g, ' ');
}
