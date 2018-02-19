import { text, partsFormatter } from './helpers';

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

  it('formats duration using hours (parts)', () => {
    const parts = partsFormatter('{hours} {minutes} {seconds}');
    expect(parts(1)).toEqual([
      { type: 'second', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);
    expect(parts(60)).toEqual([
      { type: 'minute', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);
    expect(parts(61)).toEqual([
      { type: 'minute', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
      { type: 'literal', value: ' ' },
      { type: 'second', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);
    expect(parts(3600)).toEqual([
      { type: 'hour', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
    ]);
    expect(parts(3601)).toEqual([
      { type: 'hour', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'second', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);
    expect(parts(3602)).toEqual([
      { type: 'hour', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'second', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
    ]);
    expect(parts(3660)).toEqual([
      { type: 'hour', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'minute', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);
    expect(parts(3661)).toEqual([
      { type: 'hour', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'minute', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
      { type: 'literal', value: ' ' },
      { type: 'second', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);
    expect(parts(7322)).toEqual([
      { type: 'hour', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hours' },
      { type: 'literal', value: ' ' },
      { type: 'minute', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
      { type: 'literal', value: ' ' },
      { type: 'second', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
    ]);
    expect(parts(90000)).toEqual([
      { type: 'hour', value: '25' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hours' },
    ]);
  });

  it('formats duration using days and ignoring seconds (parts)', () => {
    const parts = partsFormatter('{days} {hours} {minutes}');
    expect(parts(1)).toEqual([
      { type: 'minute', value: '0' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
    ]);
    expect(parts(60)).toEqual([
      { type: 'minute', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);
    expect(parts(61)).toEqual([
      { type: 'minute', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);
    expect(parts(110)).toEqual([
      { type: 'minute', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
    ]);
    expect(parts(3600)).toEqual([
      { type: 'hour', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
    ]);
    expect(parts(3601)).toEqual([
      { type: 'hour', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
    ]);
    expect(parts(3660)).toEqual([
      { type: 'hour', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'minute', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);
    expect(parts(3661)).toEqual([
      { type: 'hour', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
      { type: 'literal', value: ' ' },
      { type: 'minute', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
    ]);
    expect(parts(7322)).toEqual([
      { type: 'hour', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hours' },
      { type: 'literal', value: ' ' },
      { type: 'minute', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
    ]);
    expect(parts(86400)).toEqual([
      { type: 'day', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'day' },
    ]);
    expect(parts(90000)).toEqual([
      { type: 'day', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'day' },
      { type: 'literal', value: ' ' },
      { type: 'hour', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hour' },
    ]);
    expect(parts(180000)).toEqual([
      { type: 'day', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'days' },
      { type: 'literal', value: ' ' },
      { type: 'hour', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'hours' },
    ]);
  });
});
