import { text } from './helpers';

describe('Extended format', () => {
  it('formats duration using CLDR unitDisplay (long)', () => {
    expect(text(1, 'long')).toEqual('1 second');
    expect(text(30, 'long')).toEqual('30 seconds');
    expect(text(59, 'long')).toEqual('59 seconds');
    expect(text(60, 'long')).toEqual('1 minute');
    expect(text(61, 'long')).toEqual('1 minute 1 second');
    expect(text(62, 'long')).toEqual('1 minute 2 seconds');
    expect(text(120, 'long')).toEqual('2 minutes');
    expect(text(121, 'long')).toEqual('2 minutes 1 second');
    expect(text(150, 'long')).toEqual('2 minutes 30 seconds');
  });

  it('formats duration using CLDR unitDisplay (short)', () => {
    expect(text(1, 'short')).toEqual('1 sec');
    expect(text(30, 'short')).toEqual('30 sec');
    expect(text(59, 'short')).toEqual('59 sec');
    expect(text(60, 'short')).toEqual('1 min');
    expect(text(61, 'short')).toEqual('1 min 1 sec');
    expect(text(62, 'short')).toEqual('1 min 2 sec');
    expect(text(120, 'short')).toEqual('2 min');
    expect(text(121, 'short')).toEqual('2 min 1 sec');
    expect(text(150, 'short')).toEqual('2 min 30 sec');
  });

  it('formats duration using CLDR unitDisplay (narrow)', () => {
    expect(text(1, 'narrow')).toEqual('1s');
    expect(text(30, 'narrow')).toEqual('30s');
    expect(text(59, 'narrow')).toEqual('59s');
    expect(text(60, 'narrow')).toEqual('1m');
    expect(text(61, 'narrow')).toEqual('1m 1s');
    expect(text(62, 'narrow')).toEqual('1m 2s');
    expect(text(120, 'narrow')).toEqual('2m');
    expect(text(121, 'narrow')).toEqual('2m 1s');
    expect(text(150, 'narrow')).toEqual('2m 30s');
  });
});
