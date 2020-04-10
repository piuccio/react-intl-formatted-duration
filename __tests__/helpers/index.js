import React from 'react';
import {IntlProvider} from 'react-intl';
import {mount} from 'enzyme';
import DurationMessage from '../../index';

let currentLocale = 'en';

const messages = {
  en: {},
  ja: {
    "react-intl-formatted-duration/custom-format/ja-full-test-format": "{days} {hours} {minutes} {seconds}",
    "react-intl-formatted-duration.duration": "{value}{unit}",
    "react-intl-formatted-duration.secondsUnit": "{value, plural, other {秒}}",
    "react-intl-formatted-duration.minutesUnit": "{value, plural, other {分}}",
    "react-intl-formatted-duration.hoursUnit": "{value, plural, other {時}}",
    "react-intl-formatted-duration.daysUnit": "{value, plural, other {日}}",
  },
};

export function setLocale(locale) {
  currentLocale = locale;
}

function mountWithIntl(node) {
  return mount(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale: currentLocale,
      defaultLocale: currentLocale,
      messages: messages[currentLocale],
    },
  });
}

function Text(props) {
  return <span {...props}/>;
}

export function text(value, format) {
  return mountWithIntl((
    <DurationMessage
      seconds={value}
      format={format}
      textComponent={Text}
    />
  )).text().trim().replace(/\s+/g, ' ');
}
