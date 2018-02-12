import { getIntl, text } from './helpers';
import { TIMER_FORMAT, formatDuration, formatDurationToParts } from '../index';

describe('Timer format', () => {
  it('formats duration in English with timer format (react)', () => {
    expect(text(1, TIMER_FORMAT)).toEqual('0:01');
    expect(text(30, TIMER_FORMAT)).toEqual('0:30');
    expect(text(59, TIMER_FORMAT)).toEqual('0:59');
    expect(text(60, TIMER_FORMAT)).toEqual('1:00');
    expect(text(61, TIMER_FORMAT)).toEqual('1:01');
    expect(text(62, TIMER_FORMAT)).toEqual('1:02');
    expect(text(120, TIMER_FORMAT)).toEqual('2:00');
    expect(text(121, TIMER_FORMAT)).toEqual('2:01');
    expect(text(150, TIMER_FORMAT)).toEqual('2:30');
  });

  it('formats duration in English with timer format (text)', () => {
    const intl = getIntl();

    expect(formatDuration(intl, 1, { format: TIMER_FORMAT })).toEqual('0:01');
    expect(formatDuration(intl, 30, { format: TIMER_FORMAT })).toEqual('0:30');
    expect(formatDuration(intl, 59, { format: TIMER_FORMAT })).toEqual('0:59');
    expect(formatDuration(intl, 60, { format: TIMER_FORMAT })).toEqual('1:00');
    expect(formatDuration(intl, 61, { format: TIMER_FORMAT })).toEqual('1:01');
    expect(formatDuration(intl, 62, { format: TIMER_FORMAT })).toEqual('1:02');
    expect(formatDuration(intl, 120, { format: TIMER_FORMAT })).toEqual('2:00');
    expect(formatDuration(intl, 121, { format: TIMER_FORMAT })).toEqual('2:01');
    expect(formatDuration(intl, 150, { format: TIMER_FORMAT })).toEqual('2:30');
  });

  it('formats duration in English with timer format (parts)', () => {
    const intl = getIntl();

    expect(formatDurationToParts(intl, 1, { format: TIMER_FORMAT })).toEqual([
      { type: 'minutes', value: '0' },
      { type: 'literal', value: ':' },
      { type: 'seconds', value: '01' },
    ]);

    expect(formatDurationToParts(intl, 30, { format: TIMER_FORMAT })).toEqual([
      { type: 'minutes', value: '0' },
      { type: 'literal', value: ':' },
      { type: 'seconds', value: '30' },
    ]);

    expect(formatDurationToParts(intl, 59, { format: TIMER_FORMAT })).toEqual([
      { type: 'minutes', value: '0' },
      { type: 'literal', value: ':' },
      { type: 'seconds', value: '59' },
    ]);

    expect(formatDurationToParts(intl, 60, { format: TIMER_FORMAT })).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ':' },
      { type: 'seconds', value: '00' },
    ]);

    expect(formatDurationToParts(intl, 61, { format: TIMER_FORMAT })).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ':' },
      { type: 'seconds', value: '01' },
    ]);

    expect(formatDurationToParts(intl, 62, { format: TIMER_FORMAT })).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ':' },
      { type: 'seconds', value: '02' },
    ]);

    expect(formatDurationToParts(intl, 120, { format: TIMER_FORMAT })).toEqual([
      { type: 'minutes', value: '2' },
      { type: 'literal', value: ':' },
      { type: 'seconds', value: '00' },
    ]);

    expect(formatDurationToParts(intl, 121, { format: TIMER_FORMAT })).toEqual([
      { type: 'minutes', value: '2' },
      { type: 'literal', value: ':' },
      { type: 'seconds', value: '01' },
    ]);

    expect(formatDurationToParts(intl, 150, { format: TIMER_FORMAT })).toEqual([
      { type: 'minutes', value: '2' },
      { type: 'literal', value: ':' },
      { type: 'seconds', value: '30' },
    ]);
  });
});
