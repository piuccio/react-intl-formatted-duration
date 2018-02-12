import { getIntl, text } from './helpers';
import { formatDuration, formatDurationToParts } from '../index';

describe('Optional format', () => {
  it('formats duration using hours (react)', () => {
    const format = '{hours} {minutes} {seconds}';
    expect(text(1, format)).toEqual('1 second');
    expect(text(60, format)).toEqual('1 minute');
    expect(text(61, format)).toEqual('1 minute 1 second');
    expect(text(3600, format)).toEqual('1 hour');
    expect(text(3601, format)).toEqual('1 hour 1 second');
    expect(text(3602, format)).toEqual('1 hour 2 seconds');
    expect(text(3660, format)).toEqual('1 hour 1 minute');
    expect(text(3661, format)).toEqual('1 hour 1 minute 1 second');
    expect(text(7322, format)).toEqual('2 hours 2 minutes 2 seconds');
    expect(text(90000, format)).toEqual('25 hours');
  });

  it('formats duration using hours (string)', () => {
    const intl = getIntl();

    const format = '{hours} {minutes} {seconds}';
    expect(formatDuration(intl, 1, { format })).toEqual('1 second');
    expect(formatDuration(intl, 60, { format })).toEqual('1 minute');
    expect(formatDuration(intl, 61, { format })).toEqual('1 minute 1 second');
    expect(formatDuration(intl, 3600, { format })).toEqual('1 hour');
    expect(formatDuration(intl, 3601, { format })).toEqual('1 hour 1 second');
    expect(formatDuration(intl, 3602, { format })).toEqual('1 hour 2 seconds');
    expect(formatDuration(intl, 3660, { format })).toEqual('1 hour 1 minute');
    expect(formatDuration(intl, 3661, { format })).toEqual('1 hour 1 minute 1 second');
    expect(formatDuration(intl, 7322, { format })).toEqual('2 hours 2 minutes 2 seconds');
    expect(formatDuration(intl, 90000, { format })).toEqual('25 hours');
  });

  it('formats duration using hours (part)', () => {
    const intl = getIntl();

    const format = '{hours} {minutes} {seconds}';

    expect(formatDurationToParts(intl, 1, { format })).toEqual([
      { type: 'seconds', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);

    expect(formatDurationToParts(intl, 60, { format })).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);

    expect(formatDurationToParts(intl, 61, { format })).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);

    expect(formatDurationToParts(intl, 3600, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
    ]);

    expect(formatDurationToParts(intl, 3601, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);

    expect(formatDurationToParts(intl, 3602, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
    ]);

    expect(formatDurationToParts(intl, 3660, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);

    expect(formatDurationToParts(intl, 3661, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);

    expect(formatDurationToParts(intl, 7322, { format })).toEqual([
      { type: 'hours', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hours' },
      { type: 'literal', value: ' ' },
      { type: 'minutes', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
    ]);

    expect(formatDurationToParts(intl, 90000, { format })).toEqual([
      { type: 'hours', value: '25' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hours' },
    ]);
  });

  it('formats duration using days and ignoring seconds (react)', () => {
    const format = '{days} {hours} {minutes}';
    expect(text(1, format)).toEqual('0 minutes');
    expect(text(60, format)).toEqual('1 minute');
    expect(text(61, format)).toEqual('1 minute');
    expect(text(110, format)).toEqual('2 minutes');
    expect(text(3600, format)).toEqual('1 hour');
    expect(text(3601, format)).toEqual('1 hour');
    expect(text(3660, format)).toEqual('1 hour 1 minute');
    expect(text(3661, format)).toEqual('1 hour 1 minute');
    expect(text(7322, format)).toEqual('2 hours 2 minutes');
    expect(text(86400, format)).toEqual('1 day');
    expect(text(90000, format)).toEqual('1 day 1 hour');
    expect(text(180000, format)).toEqual('2 days 2 hours');
  });

  it('formats duration using days and ignoring seconds (string)', () => {
    const intl = getIntl();

    const format = '{days} {hours} {minutes}';
    expect(formatDuration(intl, 1, { format })).toEqual('0 minutes');
    expect(formatDuration(intl, 60, { format })).toEqual('1 minute');
    expect(formatDuration(intl, 61, { format })).toEqual('1 minute');
    expect(formatDuration(intl, 110, { format })).toEqual('2 minutes');
    expect(formatDuration(intl, 3600, { format })).toEqual('1 hour');
    expect(formatDuration(intl, 3601, { format })).toEqual('1 hour');
    expect(formatDuration(intl, 3660, { format })).toEqual('1 hour 1 minute');
    expect(formatDuration(intl, 3661, { format })).toEqual('1 hour 1 minute');
    expect(formatDuration(intl, 7322, { format })).toEqual('2 hours 2 minutes');
    expect(formatDuration(intl, 86400, { format })).toEqual('1 day');
    expect(formatDuration(intl, 90000, { format })).toEqual('1 day 1 hour');
    expect(formatDuration(intl, 180000, { format })).toEqual('2 days 2 hours');
  });

  it('formats duration using days and ignoring seconds (parts)', () => {
    const intl = getIntl();

    const format = '{days} {hours} {minutes}';
    expect(formatDurationToParts(intl, 1, { format })).toEqual([
      { type: 'minutes', value: '0' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
    ]);

    expect(formatDurationToParts(intl, 60, { format })).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);

    expect(formatDurationToParts(intl, 61, { format })).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);

    expect(formatDurationToParts(intl, 110, { format })).toEqual([
      { type: 'minutes', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
    ]);

    expect(formatDurationToParts(intl, 3600, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
    ]);

    expect(formatDurationToParts(intl, 3601, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
    ]);

    expect(formatDurationToParts(intl, 3660, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);

    expect(formatDurationToParts(intl, 3661, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'minutes', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);

    expect(formatDurationToParts(intl, 7322, { format })).toEqual([
      { type: 'hours', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hours' },
      { type: 'literal', value: ' ' },
      { type: 'minutes', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
    ]);

    expect(formatDurationToParts(intl, 86400, { format })).toEqual([
      { type: 'days', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'day' },
    ]);

    expect(formatDurationToParts(intl, 90000, { format })).toEqual([
      { type: 'days', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'day' },
      { type: 'literal', value: ' ' },
      { type: 'hours', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
    ]);

    expect(formatDurationToParts(intl, 180000, { format })).toEqual([
      { type: 'days', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'days' },
      { type: 'literal', value: ' ' },
      { type: 'hours', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hours' },
    ]);
  });
});
