import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useJsonFormatter } from '../useJsonFormatter';

describe('useJsonFormatter', () => {
  it('starts empty with no content and invalid (empty) validation', () => {
    const { result } = renderHook(() => useJsonFormatter());

    expect(result.current.input).toBe('');
    expect(result.current.output).toBe('');
    expect(result.current.hasContent).toBe(false);
    expect(result.current.validation.isValid).toBe(false);
  });

  it('formats valid JSON input into the output', () => {
    const { result } = renderHook(() => useJsonFormatter());

    act(() => {
      result.current.setInput('{"a":1}');
    });
    act(() => {
      result.current.format();
    });

    expect(result.current.output).toBe('{\n  "a": 1\n}');
    expect(result.current.hasOutput).toBe(true);
  });

  it('minifies valid JSON input into the output', () => {
    const { result } = renderHook(() => useJsonFormatter());

    act(() => {
      result.current.setInput('{\n  "a": 1\n}');
    });
    act(() => {
      result.current.minify();
    });

    expect(result.current.output).toBe('{"a":1}');
  });

  it('produces no output when formatting invalid JSON', () => {
    const { result } = renderHook(() => useJsonFormatter());

    act(() => {
      result.current.setInput('{invalid}');
    });
    act(() => {
      result.current.format();
    });

    expect(result.current.output).toBe('');
    expect(result.current.hasOutput).toBe(false);
    expect(result.current.validation.isValid).toBe(false);
  });

  it('respects the configured indentation size', () => {
    const { result } = renderHook(() => useJsonFormatter());

    act(() => {
      result.current.setInput('{"a":1}');
      result.current.setIndent(4);
    });
    act(() => {
      result.current.format();
    });

    expect(result.current.output).toBe('{\n    "a": 1\n}');
  });

  it('clears output when the input changes', () => {
    const { result } = renderHook(() => useJsonFormatter());

    act(() => {
      result.current.setInput('{"a":1}');
    });
    act(() => {
      result.current.format();
    });
    expect(result.current.hasOutput).toBe(true);

    act(() => {
      result.current.setInput('{"a":2}');
    });
    expect(result.current.hasOutput).toBe(false);
  });

  it('clears both input and output', () => {
    const { result } = renderHook(() => useJsonFormatter());

    act(() => {
      result.current.setInput('{"a":1}');
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
