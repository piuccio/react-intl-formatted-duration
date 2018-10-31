# Formatted Duration

[react-intl](https://github.com/yahoo/react-intl) is an amazing library providing React components and API to localize your application, however it lacks a `Duration` component.

If you want to show the time it takes to do something like `1 minute` or `5 minutes` or even a simple timer `0:30` you're [out of luck](https://github.com/yahoo/react-intl/issues/77) because the ECMA committee hasn't specified the [DurationFormat](https://github.com/tc39/ecma402/issues/47) yet.

This component provides a very simple abstraction that works on React (DOM), React Native and any other target environment to format simple durations.

## Usage

`npm i --save react-intl-formatted-duration`

### Extended format

```js
// Using React DOM
import React from 'react';
import FormattedDuration from 'react-intl-formatted-duration';

import styled from 'styled-components';
const Text = styled.span``;

export default MyComponent() {
  return <FormattedDuration seconds={60} textComponent={Text} />
  // will render `1 minute`
}
```

The default format only shows minutes and seconds. For more complex needs check the [custom format section](#Custom_format).

It's not necessary to use styled components, you can use any component you like available on your target environment

```js
// Using React Native
import React from 'react';
import FormattedDuration from 'react-intl-formatted-duration';

import { Text } from 'react-native';

export default MyComponent() {
  return <FormattedDuration seconds={60} textComponent={Text} />
  // will render `1 minute`
}
```

#### Styling numbers

If you want to style numbers differently from text you can pass a `valueComponent`

```js
<FormattedDuration seconds={90} textComponent={Text} valueComponent={Value} />

// renders

<Value>1</Value> <Text>minute</Text> <Value>30</Value> <Text>seconds</Text>
```

Having different components is useful not only for styling. Some languages use different [numbering systems](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat). For example Japanese has full-width numbers, so you might want to render `１０分` instead of `10分`, to do so you can use:

```js
import React from 'react';
import { FormattedNumber } from 'react-intl';
import FormattedDuration from 'react-intl-formatted-duration';

/*
You'll also need to select Japanese locale and configure the IntlProvider to use
`ja-JP-u-nu-fullwide`

Somewhere in you application
import { IntlProvider } from 'react-intl';
<IntlProvider
   locale="ja-JP-u-nu-fullwide"
/>
 */

export default MyComponent() {
  return <FormattedDuration seconds={600} textComponent={Text} valueComponent={FormattedNumber} />
  // will render `１０分`
}
```

### Custom format

#### Hours and days

By default the component only renders minutes and seconds, if you want to display hours or days you can use a custom format:

```js
<FormattedDuration seconds={180000} textComponent={Text} format="{days} {hours} {minutes} {seconds}" />
// will render `2 days 2 hours`

<FormattedDuration seconds={180000} textComponent={Text} format="{hours} {minutes} {seconds}" />
// will render `50 hours`

<FormattedDuration seconds={180000} textComponent={Text} format="{minutes} {seconds}" />
// will render `3000 minutes`
}
```

Seconds is also optional and if missing, minutes will be rounded to the closed value

```js
<FormattedDuration seconds={10} textComponent={Text} format="{minutes}" />
// will render `0 minutes`

<FormattedDuration seconds={30} textComponent={Text} format="{minutes}" />
// will render `1 minute`

<FormattedDuration seconds={70} textComponent={Text} format="{minutes}" />
// will render `1 minute`
```

The custom format can itself be localized by passing a message id instead of the actual value

```js
import React from 'react';
import FormattedDuration from 'react-intl-formatted-duration';

import messages from './messages';

export default MyComponent() {
  return (
    <FormattedDuration
      seconds={600}
      textComponent={Text}
      format={messages.customFormat.id}
    />
  );
}
```

#### Timer format

```js
import FormattedDuration, { TIMER_FORMAT } from 'react-intl-formatted-duration';

export default MyComponent() {
  return <FormattedDuration seconds={60} textComponent={Text} format={TIMER_FORMAT} />
  // will render `1:00`
}
```

## Localization

`react-intl-formatted-duration` expects the following keys inside your translation file

* `react-intl-formatted-duration.longFormatting` the default format that generates something like `1 minute 30 seconds`. It uses the values `{days}`, `{hours}`, `{minutes}` and `{seconds}`. For example you can change it to `{minutes} and {seconds}`.
* `react-intl-formatted-duration.duration` the format used by the `minutes` and `seconds` variables described above. It uses the values `{value}` and `{unit}`. The default is `{value} {unit}` where `value` is a number and `{unit}` is the textual unit like `minute(s)` or `second(s)`.
* `react-intl-formatted-duration.timerFormatting` format for `TIMER_FORMAT`, defaults to `{minutes}:{seconds}` where both values are numbers padded to have a minimum length of 2 characters
* `react-intl-formatted-duration.daysUnit` string for formatting days, default `{value, plural, one {# day} other {# days}}`
* `react-intl-formatted-duration.hoursUnit` string for formatting hours, default `{value, plural, one {# hour} other {# hours}}`
* `react-intl-formatted-duration.minutesUnit` string for formatting minutes, default `{value, plural, one {# minute} other {# minutes}}`
* `react-intl-formatted-duration.secondsUnit` string for formatting seconds, default `{value, plural, one {# second} other {# seconds}}`

The messages for `daysUnit`, `hoursUnit`, `minutesUnit`, `secondsUnit` use the [format-js syntax](https://formatjs.io/guides/message-syntax/).

If you're using the `extract-intl` script from [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) you can import `react-intl-formatted-duration/messages` to automatically generate the keys in your translation files.


## Upgrading from version 1.0

Version `2.x` allows to use the whole power of format-js message syntax. All you need to do is remove all keys like `daysSingular`, `dayPlural` and simply use `daysUnit` with the format described above.

## Upgrading from version 2.0

Version `3.x` has exactly the same API as version `2.x` but is a complete rewrite. You don't need to change your code.
