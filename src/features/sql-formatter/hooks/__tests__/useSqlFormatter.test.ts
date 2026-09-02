import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSqlFormatter } from '../useSqlFormatter';

describe('useSqlFormatter', () => {
  it('starts empty with no content and invalid (empty) validation', () => {
    const { result } = renderHook(() => useSqlFormatter());

    expect(result.current.input).toBe('');
    expect(result.current.output).toBe('');
    expect(result.current.hasContent).toBe(false);
    expect(result.current.validation.isValid).toBe(false);
  });

  it('defaults to 2-space indentation and uppercase keywords', () => {
    const { result } = renderHook(() => useSqlFormatter());
    expect(result.current.indent).toBe(2);
    expect(result.current.keywordCase).toBe('upper');
  });

  it('formats valid SQL input into the output', () => {
    const { result } = renderHook(() => useSqlFormatter());

    act(() => {
      result.current.setInput('select a from t');
    });
    act(() => {
      result.current.format();
    });

    expect(result.current.output).toBe('SELECT\n  a\nFROM\n  t');
    expect(result.current.hasOutput).toBe(true);
  });

  it('produces no output when formatting invalid SQL', () => {
    const { result } = renderHook(() => useSqlFormatter());

    act(() => {
      result.current.setInput('select * from (');
    });
    act(() => {
      result.current.format();
    });

    expect(result.current.output).toBe('');
    expect(result.current.hasOutput).toBe(false);
    expect(result.current.validation.isValid).toBe(false);
  });

  it('respects the configured indentation size', () => {
    const { result } = renderHook(() => useSqlFormatter());

    act(() => {
      result.current.setInput('select a from t');
      result.current.setIndent(4);
    });
    act(() => {
      result.current.format();
    });

    expect(result.current.output).toBe('SELECT\n    a\nFROM\n    t');
  });

  it('respects the configured keyword case', () => {
    const { result } = renderHook(() => useSqlFormatter());

    act(() => {
      result.current.setInput('select a from t');
      result.current.setKeywordCase('preserve');
    });
    act(() => {
      result.current.format();
    });

    expect(result.current.output.startsWith('select')).toBe(true);
  });

  it('clears output when the input changes', () => {
    const { result } = renderHook(() => useSqlFormatter());

    act(() => {
      result.current.setInput('select a from t');
    });
    act(() => {
      result.current.format();
    });
    expect(result.current.hasOutput).toBe(true);

    act(() => {
      result.current.setInput('select b from t');
    });
    expect(result.current.hasOutput).toBe(false);
  });

  it('clears both input and output', () => {
    const { result } = renderHook(() => useSqlFormatter());

    act(() => {
      result.current.setInput('select a from t');
    });
    act(() => {
      result.current.format();
    });
    act(() => {
      result.current.clear();
    });

    expect(result.current.input).toBe('');
    expect(result.current.output).toBe('');
    expect(result.current.hasContent).toBe(false);
  });
});
