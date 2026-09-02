import { describe, expect, it } from 'vitest';
import {
  buildFlagsString,
  buildHighlightSegments,
  formatMatchesAsText,
  testRegex,
} from '../regexService';

describe('buildFlagsString', () => {
  it('returns an empty string when no flags are set', () => {
    expect(
      buildFlagsString({ global: false, ignoreCase: false, multiline: false, dotAll: false }),
    ).toBe('');
  });

  it('combines flags in gims order', () => {
    expect(
      buildFlagsString({ global: true, ignoreCase: true, multiline: true, dotAll: true }),
    ).toBe('gims');
  });
});

describe('testRegex', () => {
  it('returns an error for an empty pattern', () => {
    const result = testRegex('', { global: true, ignoreCase: false, multiline: false, dotAll: false }, 'text');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Pattern is empty.');
  });

  it('returns an error for an invalid pattern', () => {
    const result = testRegex('(unclosed', { global: true, ignoreCase: false, multiline: false, dotAll: false }, 'text');
    expect(result.isValid).toBe(false);
    expect(result.error).toBeTruthy();
    expect(result.matches).toEqual([]);
  });

  it('finds all matches when the global flag is set', () => {
    const result = testRegex(
      '\\d+',
      { global: true, ignoreCase: false, multiline: false, dotAll: false },
      'a1 b22 c333',
    );

    expect(result.isValid).toBe(true);
    expect(result.matches).toHaveLength(3);
    expect(result.matches.map((m) => m.match)).toEqual(['1', '22', '333']);
    expect(result.matches[1].index).toBe(4);
  });

  it('finds only the first match when the global flag is not set', () => {
    const result = testRegex(
      '\\d+',
      { global: false, ignoreCase: false, multiline: false, dotAll: false },
      'a1 b22 c333',
    );

    expect(result.matches).toHaveLength(1);
    expect(result.matches[0].match).toBe('1');
  });

  it('respects the ignoreCase flag', () => {
    const withoutFlag = testRegex(
      'hello',
      { global: true, ignoreCase: false, multiline: false, dotAll: false },
      'Hello World',
    );
    const withFlag = testRegex(
      'hello',
      { global: true, ignoreCase: true, multiline: false, dotAll: false },
      'Hello World',
    );

    expect(withoutFlag.matches).toHaveLength(0);
    expect(withFlag.matches).toHaveLength(1);
  });

  it('captures numbered groups for each match', () => {
    const result = testRegex(
      '(\\w+)@(\\w+)',
      { global: true, ignoreCase: false, multiline: false, dotAll: false },
      'user@host',
    );

    expect(result.matches[0].groups).toEqual(['user', 'host']);
  });

  it('captures named groups for each match', () => {
    const result = testRegex(
      '(?<user>\\w+)@(?<host>\\w+)',
      { global: true, ignoreCase: false, multiline: false, dotAll: false },
      'user@host',
    );

    expect(result.matches[0].namedGroups).toEqual({ user: 'user', host: 'host' });
  });

  it('returns no matches without throwing when nothing matches', () => {
    const result = testRegex(
      'xyz',
      { global: true, ignoreCase: false, multiline: false, dotAll: false },
      'abc',
    );

    expect(result.isValid).toBe(true);
    expect(result.matches).toEqual([]);
  });

  it('handles empty test text without throwing', () => {
    const result = testRegex(
      'a+',
      { global: true, ignoreCase: false, multiline: false, dotAll: false },
      '',
    );

    expect(result.isValid).toBe(true);
    expect(result.matches).toEqual([]);
  });
});

describe('buildHighlightSegments', () => {
  it('returns a single unmatched segment when there are no matches', () => {
    expect(buildHighlightSegments('hello', [])).toEqual([{ text: 'hello', isMatch: false }]);
  });

  it('returns no segments for empty text', () => {
    expect(buildHighlightSegments('', [])).toEqual([]);
  });

  it('splits text into matched and unmatched segments', () => {
    const segments = buildHighlightSegments('a1 b22', [
      { match: '1', index: 1, groups: [] },
      { match: '22', index: 4, groups: [] },
    ]);

    expect(segments).toEqual([
      { text: 'a', isMatch: false },
      { text: '1', isMatch: true, matchIndex: 0 },
      { text: ' b', isMatch: false },
      { text: '22', isMatch: true, matchIndex: 1 },
    ]);
  });

  it('includes a trailing unmatched segment after the last match', () => {
    const segments = buildHighlightSegments('a1b', [{ match: '1', index: 1, groups: [] }]);

    expect(segments).toEqual([
      { text: 'a', isMatch: false },
      { text: '1', isMatch: true, matchIndex: 0 },
      { text: 'b', isMatch: false },
    ]);
  });
});

describe('formatMatchesAsText', () => {
  it('formats matches with index and groups', () => {
    const text = formatMatchesAsText([
      { match: 'user@host', index: 0, groups: ['user', 'host'] },
    ]);

    expect(text).toBe('1. "user@host" at index 0 | groups: ["user", "host"]');
  });

  it('omits the groups suffix when there are no groups', () => {
    const text = formatMatchesAsText([{ match: '1', index: 1, groups: [] }]);
    expect(text).toBe('1. "1" at index 1');
  });

  it('returns an empty string for no matches', () => {
    expect(formatMatchesAsText([])).toBe('');
  });
});
