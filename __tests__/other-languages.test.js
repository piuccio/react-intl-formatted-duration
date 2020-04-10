import { text } from './helpers';
import { setLocale, loadTranslation } from 'enzyme-react-intl';

describe('Optional format', () => {
  it('formats duration using hours', () => {
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
});
