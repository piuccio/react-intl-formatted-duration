/**
* Unfortunately ReactIntl doesn't support duration yet because it's not implemented
* in the ECMA specs: https://github.com/yahoo/react-intl/issues/77
*
* <DurationMessage seconds={30} format={EXTENDED_FORMAT} /> becomes <span>30 seconds</span>
* <DurationMessage seconds={60} format={EXTENDED_FORMAT} /> becomes <span>1 minute</span>
* <DurationMessage seconds={150} format={EXTENDED_FORMAT} /> becomes <span>2 minutes 30 seconds</span>
* `minutes` and `seconds` are translated
*
* <DurationMessage seconds={30} format={TIMER_FORMAT} /> becomes <span>0:30</span>
* <DurationMessage seconds={60} format={TIMER_FORMAT} /> becomes <span>1:00</span>
* <DurationMessage seconds={150} format={TIMER_FORMAT} /> becomes <span>2:30</span>
*/

export { default as DurationMessage, default } from './DurationMessage';
export { formatDuration, formatDurationToParts, EXTENDED_FORMAT, TIMER_FORMAT } from './formatDuration';
