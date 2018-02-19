import { text, partsFormatter } from './helpers';

import { TIMER_FORMAT } from '../index';

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

  it('formats duration in English with timer format (parts)', () => {
    const parts = partsFormatter(TIMER_FORMAT);

    expect(parts(1)).toEqual([
      { type: 'minute', value: '0' },
      { type: 'literal', value: ':' },
      { type: 'second', value: '01' },
    ]);
    expect(parts(30)).toEqual([
      { type: 'minute', value: '0' },
      { type: 'literal', value: ':' },
      { type: 'second', value: '30' },
    ]);
    expect(parts(59)).toEqual([
      { type: 'minute', value: '0' },
      { type: 'literal', value: ':' },
      { type: 'second', value: '59' },
    ]);
    expect(parts(60)).toEqual([
      { type: 'minute', value: '1' },
      { type: 'literal', value: ':' },
      { type: 'second', value: '00' },
    ]);
    expect(parts(61)).toEqual([
      { type: 'minute', value: '1' },
      { type: 'literal', value: ':' },
      { type: 'second', value: '01' },
    ]);
    expect(parts(62)).toEqual([
      { type: 'minute', value: '1' },
      { type: 'literal', value: ':' },
      { type: 'second', value: '02' },
    ]);
    expect(parts(120)).toEqual([
      { type: 'minute', value: '2' },
      { type: 'literal', value: ':' },
      { type: 'second', value: '00' },
    ]);
    expect(parts(121)).toEqual([
      { type: 'minute', value: '2' },
      { type: 'literal', value: ':' },
      { type: 'second', value: '01' },
    ]);
    expect(parts(150)).toEqual([
      { type: 'minute', value: '2' },
      { type: 'literal', value: ':' },
      { type: 'second', value: '30' },
    ]);
  });
});
