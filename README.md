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
  return <FormattedDuration value={60} textComponent={Text} />
  // will render `1 minute`
}
```

It's not necessary to use styled components, you can use any component you like available on your target environment

```js
// Using React Native
import React from 'react';
import FormattedDuration from 'react-intl-formatted-duration';

import { Text } from 'react-native';

export default MyComponent() {
  return <FormattedDuration value={60} textComponent={Text} />
  // will render `1 minute`
}
```

#### Styling numbers

If you want to style numbers differently from text you can pass a `valueComponent`

```js
<FormattedDuration value={90} textComponent={Text} valueComponent={Value} />

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
  return <FormattedDuration value={600} textComponent={Text} valueComponent={FormattedNumber} />
  // will render `１０分`
}
```


### Timer format

```js
import FormattedDuration, { TIMER_FORMAT } from 'react-intl-formatted-duration';

export default MyComponent() {
  return <FormattedDuration value={60} textComponent={Text} format={TIMER_FORMAT} />
  // will render `1:00`
}
```

## Localization

`react-intl-formatted-duration` expects the following keys inside your translation file

* `react-intl-formatted-duration.longFormatting` the default format that generates something like `1 minute 30 seconds`. It uses the values `{minutes}` and `{seconds}`. For example you can change it to `{minutes} and {seconds}`.
* `react-intl-formatted-duration.duration` the format used by the `minutes` and `seconds` variables described above. It uses the values `{value}` and `{unit}`. The default is `{value} {unit}` where `value` is a number and `{unit}` is the textual unit like `minute(s)` or `second(s)`.
* `react-intl-formatted-duration.timerFormatting` format for `TIMER_FORMAT`, defaults to `{minutes}:{seconds}` where both values are numbers padded to have a minimum length of 2 characters
* `react-intl-formatted-duration.minutesPlural` string for plural minutes
* `react-intl-formatted-duration.minutesSingular` string for singular minutes
* `react-intl-formatted-duration.secondsPlural` string for plural seconds
* `react-intl-formatted-duration.secondsSingular` string for singular seconds

If you're using the `extract-intl` script from [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) you can import `react-intl-formatted-duration/messages` to automatically generate the keys in your translation files.
