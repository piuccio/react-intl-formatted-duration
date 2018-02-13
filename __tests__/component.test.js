import React from 'react';
import { default as DurationMessage, EXTENDED_FORMAT } from '../index';
import { mountWithIntl } from 'enzyme-react-intl';

function Text(props) {
  return <x-text {...props} />;
}

function Value(props) {
  return <x-value {...props} />;
}

describe('Component', () => {
  it('generates a stable dom', () => {
    const component = mountWithIntl(
      <DurationMessage seconds={61} format={EXTENDED_FORMAT} textComponent={Text} valueComponent={Value} />,
    );

    expect(component.html()).toMatchSnapshot();
  });
});
