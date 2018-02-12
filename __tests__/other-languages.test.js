import { getIntl, text } from './helpers';
import { setLocale, loadTranslation } from 'enzyme-react-intl';
import { formatDuration, formatDurationToParts } from '../index';

describe('Optional format', () => {
  it('formats duration using hours (react)', () => {
    setLocale('ja');
    loadTranslation('__tests__/helpers/ja.json');

    const format = 'ja-full-test-format';
    expect(text(1, format)).toEqual('1秒');
    expect(text(60, format)).toEqual('1分');
    expect(text(61, format)).toEqual('1分 1秒');
    expect(text(3600, format)).toEqual('1時');
    expect(text(3601, format)).toEqual('1時 1秒');
    expect(text(3602, format)).toEqual('1時 2秒');
    expect(text(3660, format)).toEqual('1時 1分');
    expect(text(3661, format)).toEqual('1時 1分 1秒');
    expect(text(7322, format)).toEqual('2時 2分 2秒');
    expect(text(90000, format)).toEqual('1日 1時');
  });

  it('formats duration using hours (string)', () => {
    setLocale('ja');
    const messages = loadTranslation('__tests__/helpers/ja.json');
    const intl = getIntl({ locale: 'ja', messages });

    const format = 'ja-full-test-format';
    expect(formatDuration(intl, 1, { format })).toEqual('1秒');
    expect(formatDuration(intl, 60, { format })).toEqual('1分');
    expect(formatDuration(intl, 61, { format })).toEqual('1分 1秒');
    expect(formatDuration(intl, 3600, { format })).toEqual('1時');
    expect(formatDuration(intl, 3601, { format })).toEqual('1時 1秒');
    expect(formatDuration(intl, 3602, { format })).toEqual('1時 2秒');
    expect(formatDuration(intl, 3660, { format })).toEqual('1時 1分');
    expect(formatDuration(intl, 3661, { format })).toEqual('1時 1分 1秒');
    expect(formatDuration(intl, 7322, { format })).toEqual('2時 2分 2秒');
    expect(formatDuration(intl, 90000, { format })).toEqual('1日 1時');
  });

  it('formats duration using hours (parts)', () => {
    setLocale('ja');
    const messages = loadTranslation('__tests__/helpers/ja.json');
    const intl = getIntl({ locale: 'ja', messages });

    const format = 'ja-full-test-format';
    expect(formatDurationToParts(intl, 1, { format })).toEqual([
      { type: 'seconds', value: '1' },
      { type: 'unit', value: '秒' },
    ]);

    expect(formatDurationToParts(intl, 60, { format })).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'unit', value: '分' },
    ]);

    expect(formatDurationToParts(intl, 61, { format })).toEqual([
      { type: 'minutes', value: '1' },
      { type: 'unit', value: '分' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '1' },
      { type: 'unit', value: '秒' },
    ]);

    expect(formatDurationToParts(intl, 3600, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'unit', value: '時' },
    ]);

    expect(formatDurationToParts(intl, 3601, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'unit', value: '時' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '1' },
      { type: 'unit', value: '秒' },
    ]);

    expect(formatDurationToParts(intl, 3602, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'unit', value: '時' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '2' },
      { type: 'unit', value: '秒' },
    ]);

    expect(formatDurationToParts(intl, 3660, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'unit', value: '時' },
      { type: 'literal', value: ' ' },
      { type: 'minutes', value: '1' },
      { type: 'unit', value: '分' },
    ]);

    expect(formatDurationToParts(intl, 3661, { format })).toEqual([
      { type: 'hours', value: '1' },
      { type: 'unit', value: '時' },
      { type: 'literal', value: ' ' },
      { type: 'minutes', value: '1' },
      { type: 'unit', value: '分' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '1' },
      { type: 'unit', value: '秒' },
    ]);

    expect(formatDurationToParts(intl, 7322, { format })).toEqual([
      { type: 'hours', value: '2' },
      { type: 'unit', value: '時' },
      { type: 'literal', value: ' ' },
      { type: 'minutes', value: '2' },
      { type: 'unit', value: '分' },
      { type: 'literal', value: ' ' },
      { type: 'seconds', value: '2' },
      { type: 'unit', value: '秒' },
    ]);

    expect(formatDurationToParts(intl, 90000, { format })).toEqual([
      { type: 'days', value: '1' },
      { type: 'unit', value: '日' },
      { type: 'literal', value: ' ' },
      { type: 'hours', value: '1' },
      { type: 'unit', value: '時' },
    ]);
  });
});
