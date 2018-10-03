// @flow
import { text } from './helpers';

import { TIMER_FORMAT } from '../index';

describe('Timer format', () => {
  it('formats duration in English with timer formar', () => {
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
});
