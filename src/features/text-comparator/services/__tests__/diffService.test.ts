import { describe, expect, it } from 'vitest';
import { computeDiffStats, computeLineDiff, formatDiffAsText } from '../diffService';

describe('computeLineDiff', () => {
  it('marks identical text as fully unchanged', () => {
    const result = computeLineDiff('line1\nline2', 'line1\nline2', {
      ignoreWhitespace: false,
      ignoreCase: false,
    });

    expect(result).toEqual([
      { type: 'unchanged', value: 'line1' },
      { type: 'unchanged', value: 'line2' },
    ]);
  });

  it('detects an added line', () => {
    const result = computeLineDiff('line1', 'line1\nline2', {
      ignoreWhitespace: false,
      ignoreCase: false,
    });

    expect(result).toEqual([
      { type: 'unchanged', value: 'line1' },
      { type: 'added', value: 'line2' },
    ]);
  });

  it('detects a removed line', () => {
    const result = computeLineDiff('line1\nline2', 'line1', {
      ignoreWhitespace: false,
      ignoreCase: false,
    });

    expect(result).toEqual([
      { type: 'unchanged', value: 'line1' },
      { type: 'removed', value: 'line2' },
    ]);
  });

  it('represents a changed line as a removed+added pair', () => {
    const result = computeLineDiff('hello world', 'hello there', {
      ignoreWhitespace: false,
      ignoreCase: false,
    });

    expect(result).toEqual([
      { type: 'removed', value: 'hello world' },
      { type: 'added', value: 'hello there' },
    ]);
  });

  it('treats differently-spaced lines as equal when ignoreWhitespace is set', () => {
    const result = computeLineDiff('  hello  ', 'hello', {
      ignoreWhitespace: true,
      ignoreCase: false,
    });

    expect(result).toEqual([{ type: 'unchanged', value: 'hello' }]);
  });

  it('treats differently-cased lines as equal when ignoreCase is set', () => {
    const result = computeLineDiff('Hello World', 'hello world', {
      ignoreWhitespace: false,
      ignoreCase: true,
    });

    expect(result).toEqual([{ type: 'unchanged', value: 'hello world' }]);
  });

  it('handles empty input without throwing', () => {
    const result = computeLineDiff('', '', { ignoreWhitespace: false, ignoreCase: false });
    expect(result).toEqual([]);
  });
});

describe('computeDiffStats', () => {
  it('counts additions, deletions and unchanged lines', () => {
    const stats = computeDiffStats([
      { type: 'unchanged', value: 'a' },
      { type: 'added', value: 'b' },
      { type: 'added', value: 'c' },
      { type: 'removed', value: 'd' },
    ]);

    expect(stats).toEqual({ additions: 2, deletions: 1, unchanged: 1 });
  });

  it('returns zeros for an empty diff', () => {
    expect(computeDiffStats([])).toEqual({ additions: 0, deletions: 0, unchanged: 0 });
  });
});

describe('formatDiffAsText', () => {
  it('prefixes added, removed and unchanged lines correctly', () => {
    const text = formatDiffAsText([
      { type: 'unchanged', value: 'a' },
      { type: 'added', value: 'b' },
      { type: 'removed', value: 'c' },
    ]);

    expect(text).toBe('  a\n+ b\n- c');
  });
});
