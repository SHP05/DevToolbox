import { describe, expect, it } from 'vitest';
import { computeJsonStats, formatJson, minifyJson, validateJson } from '../jsonService';

describe('formatJson', () => {
  it('beautifies compact JSON with the given indentation', () => {
    const result = formatJson('{"a":1,"b":[1,2,3]}', 2);

    expect(result.isValid).toBe(true);
    expect(result.output).toBe('{\n  "a": 1,\n  "b": [\n    1,\n    2,\n    3\n  ]\n}');
  });

  it('supports a different indentation width', () => {
    const result = formatJson('{"a":1}', 4);

    expect(result.isValid).toBe(true);
    expect(result.output).toBe('{\n    "a": 1\n}');
  });

  it('returns an error for malformed JSON', () => {
    const result = formatJson('{"a":1,}', 2);

    expect(result.isValid).toBe(false);
    expect(result.output).toBe('');
    expect(result.error?.message).toBeTruthy();
  });

  it('returns an error for empty input', () => {
    const result = formatJson('', 2);

    expect(result.isValid).toBe(false);
    expect(result.error?.message).toBe('Input is empty.');
  });

  it('handles whitespace-only input without throwing', () => {
    const result = formatJson('   \n  ', 2);
    expect(result.isValid).toBe(false);
  });
});

describe('minifyJson', () => {
  it('removes all non-significant whitespace', () => {
    const result = minifyJson('{\n  "a": 1,\n  "b": [1, 2, 3]\n}');

    expect(result.isValid).toBe(true);
    expect(result.output).toBe('{"a":1,"b":[1,2,3]}');
  });

  it('returns an error for malformed JSON', () => {
    const result = minifyJson('{invalid}');

    expect(result.isValid).toBe(false);
    expect(result.output).toBe('');
  });
});

describe('validateJson', () => {
  it('marks valid JSON as valid without transforming it', () => {
    const result = validateJson('{"a":1}');

    expect(result.isValid).toBe(true);
    expect(result.output).toBe('{"a":1}');
  });

  it('provides a line and column for a syntax error when derivable', () => {
    const result = validateJson('{\n  "a": 1,\n  "b":\n}');

    expect(result.isValid).toBe(false);
    expect(result.error?.message).toBeTruthy();
  });

  it('flags trailing commas as invalid', () => {
    const result = validateJson('[1, 2, 3,]');
    expect(result.isValid).toBe(false);
  });

  it('flags single-quoted strings as invalid', () => {
    const result = validateJson("{'a': 1}");
    expect(result.isValid).toBe(false);
  });

  it('accepts nested structures and primitive values', () => {
    expect(validateJson('null').isValid).toBe(true);
    expect(validateJson('42').isValid).toBe(true);
    expect(validateJson('"hello"').isValid).toBe(true);
    expect(validateJson('[{"a":{"b":[true,false,null]}}]').isValid).toBe(true);
  });
});

describe('computeJsonStats', () => {
  it('returns zeros for empty input', () => {
    expect(computeJsonStats('')).toEqual({ characters: 0, lines: 0 });
  });

  it('counts characters and lines', () => {
    expect(computeJsonStats('{"a":1}\n{"b":2}')).toEqual({ characters: 15, lines: 2 });
  });
});
