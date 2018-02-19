import { text, partsFormatter } from './helpers';

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

  it('formats duration in English with long format (parts)', () => {
    const parts = partsFormatter();

    expect(parts(1)).toEqual([
      { type: 'second', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);
    expect(parts(30)).toEqual([
      { type: 'second', value: '30' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
    ]);
    expect(parts(59)).toEqual([
      { type: 'second', value: '59' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
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
    expect(parts(62)).toEqual([
      { type: 'minute', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minute' },
      { type: 'literal', value: ' ' },
      { type: 'second', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
    ]);
    expect(parts(120)).toEqual([
      { type: 'minute', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
    ]);
    expect(parts(121)).toEqual([
      { type: 'minute', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
      { type: 'literal', value: ' ' },
      { type: 'second', value: '1' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'second' },
    ]);
    expect(parts(150)).toEqual([
      { type: 'minute', value: '2' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'minutes' },
      { type: 'literal', value: ' ' },
      { type: 'second', value: '30' },
      { type: 'literal', value: ' ' },
      { type: 'unit', value: 'seconds' },
    ]);
  });
});
