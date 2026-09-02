import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useRegexTester } from '../useRegexTester';

describe('useRegexTester', () => {
  it('starts empty with no content and no matches', () => {
    const { result } = renderHook(() => useRegexTester());

    expect(result.current.pattern).toBe('');
    expect(result.current.testText).toBe('');
    expect(result.current.hasContent).toBe(false);
    expect(result.current.hasMatches).toBe(false);
  });

  it('defaults to the global flag being enabled', () => {
    const { result } = renderHook(() => useRegexTester());
    expect(result.current.flags.global).toBe(true);
    expect(result.current.flags.ignoreCase).toBe(false);
  });

  it('finds matches as the pattern and text are entered', () => {
    const { result } = renderHook(() => useRegexTester());

    act(() => {
      result.current.setPattern('\\d+');
      result.current.setTestText('a1 b2 c3');
    });

    expect(result.current.hasMatches).toBe(true);
    expect(result.current.result.matches).toHaveLength(3);
  });

  it('toggles individual flags independently', () => {
    const { result } = renderHook(() => useRegexTester());

    act(() => {
      result.current.toggleFlag('ignoreCase');
    });
    expect(result.current.flags).toMatchObject({ ignoreCase: true, multiline: false });

    act(() => {
      result.current.toggleFlag('multiline');
    });
    expect(result.current.flags).toMatchObject({ ignoreCase: true, multiline: true });
  });

  it('surfaces an error for an invalid pattern', () => {
    const { result } = renderHook(() => useRegexTester());

    act(() => {
      result.current.setPattern('(unclosed');
      result.current.setTestText('text');
    });

    expect(result.current.result.isValid).toBe(false);
    expect(result.current.result.error).toBeTruthy();
  });

  it('clears the pattern and test text', () => {
    const { result } = renderHook(() => useRegexTester());

    act(() => {
      result.current.setPattern('\\d+');
      result.current.setTestText('a1 b2');
    });
    act(() => {
      result.current.clear();
    });

    expect(result.current.pattern).toBe('');
    expect(result.current.testText).toBe('');
    expect(result.current.hasContent).toBe(false);
  });

  it('produces a copyable text representation of the matches', () => {
    const { result } = renderHook(() => useRegexTester());

    act(() => {
      result.current.setPattern('\\d+');
      result.current.setTestText('a1 b22');
    });

    const text = result.current.getMatchesAsText();
    expect(text).toContain('"1" at index 1');
    expect(text).toContain('"22" at index 4');
  });
});
