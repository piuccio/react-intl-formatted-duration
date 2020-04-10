import { addDecorator } from "@storybook/react";
import { setIntlConfig, withIntl } from "storybook-addon-intl";

const locales = ["en", "ja"];

// Provide your messages, or you can import local locale messages files.
const messages = {
  'en': {},
  'ja': {
    'react-intl-formatted-duration.longFormatting': '{minutes}{seconds}',
    'react-intl-formatted-duration.duration': '{value}{unit}',
    'react-intl-formatted-duration.daysUnit': '日',
    'react-intl-formatted-duration.hoursUnit': '時',
    'react-intl-formatted-duration.minutesUnit': '分',
    'react-intl-formatted-duration.secondsUnit': '秒',
  },
};

// Set intl configuration
setIntlConfig({
  defaultLocale: "en",
  locales,
  getMessages: locale => messages[locale],
});

// Register decorator
addDecorator(withIntl);
