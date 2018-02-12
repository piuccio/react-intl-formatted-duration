import { getIntl, text } from './helpers';
import { formatDuration, formatDurationToParts } from '../index';

describe('Extended format', () => {
  it('formats duration in English with long format (react)', () => {
    expect(text(1)).toEqual('1 second');
    expect(text(30)).toEqual('30 seconds');
    expect(text(59)).toEqual('59 seconds');
    expect(text(60)).toEqual('1 minute');
    expect(text(61)).toEqual('1 minute 1 second');
    expect(text(62)).toEqual('1 minute 2 seconds');
    expect(text(120)).toEqual('2 minutes');
    expect(text(121)).toEqual('2 minutes 1 second');
    expect(text(150)).toEqual('2 minutes 30 seconds');
  });

  it('formats duration in English with long format (string)', () => {
    const intl = getIntl();

    expect(formatDuration(intl, 1)).toEqual('1 second');
    expect(formatDuration(intl, 30)).toEqual('30 seconds');
    expect(formatDuration(intl, 59)).toEqual('59 seconds');
    expect(formatDuration(intl, 60)).toEqual('1 minute');
    expect(formatDuration(intl, 61)).toEqual('1 minute 1 second');
    expect(formatDuration(intl, 62)).toEqual('1 minute 2 seconds');
    expect(formatDuration(intl, 120)).toEqual('2 minutes');
    expect(formatDuration(intl, 121)).toEqual('2 minutes 1 second');
    expect(formatDuration(intl, 150)).toEqual('2 minutes 30 seconds');
  });

  it('formats duration in English with long format (parts)', () => {
    const intl = getIntl();

    expect(formatDurationToParts(intl, 1)).toEqual([
      { type: 'seconds', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);

    expect(formatDurationToParts(intl, 30)).toEqual([
      { type: 'seconds', value: '30' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
    ]);

    expect(formatDurationToParts(intl, 59)).toEqual([
      { type: 'seconds', value: '59' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
    ]);

    expect(formatDurationToParts(intl, 60)).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);

    expect(formatDurationToParts(intl, 61)).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);

    expect(formatDurationToParts(intl, 62)).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
    ]);

    expect(formatDurationToParts(intl, 120)).toEqual([
      { type: 'minutes', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
    ]);

    expect(formatDurationToParts(intl, 121)).toEqual([
      { type: 'minutes', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);

    expect(formatDurationToParts(intl, 150)).toEqual([
      { type: 'minutes', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '30' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
    ]);
  });
});
