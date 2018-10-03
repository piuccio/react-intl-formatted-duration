// @flow
import { text } from './helpers';

describe('Optional format', () => {
  it('formats duration using hours', () => {
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

  it('formats duration using days and ignoring seconds', () => {
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
});
