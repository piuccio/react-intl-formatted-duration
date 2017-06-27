import { text } from './helpers';

describe('Extended format', () => {
  it('formats duration in English with long format', () => {
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
});
