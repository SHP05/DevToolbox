import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useTextComparator } from '../useTextComparator';

describe('useTextComparator', () => {
  it('starts empty with no diff and no content', () => {
    const { result } = renderHook(() => useTextComparator());

    expect(result.current.original).toBe('');
    expect(result.current.changed).toBe('');
    expect(result.current.diffLines).toEqual([]);
    expect(result.current.hasContent).toBe(false);
  });

  it('computes a diff as text is entered', () => {
    const { result } = renderHook(() => useTextComparator());

    act(() => {
      result.current.setOriginal('foo');
      result.current.setChanged('bar');
    });

    expect(result.current.hasContent).toBe(true);
    expect(result.current.stats.additions).toBeGreaterThan(0);
    expect(result.current.stats.deletions).toBeGreaterThan(0);
  });

  it('swaps original and changed text', () => {
    const { result } = renderHook(() => useTextComparator());

    act(() => {
      result.current.setOriginal('foo');
      result.current.setChanged('bar');
    });

    act(() => {
      result.current.swap();
    });

    expect(result.current.original).toBe('bar');
    expect(result.current.changed).toBe('foo');
  });

  it('clears both text fields', () => {
    const { result } = renderHook(() => useTextComparator());

    act(() => {
      result.current.setOriginal('foo');
      result.current.setChanged('bar');
    });

    act(() => {
      result.current.clear();
    });

    expect(result.current.original).toBe('');
    expect(result.current.changed).toBe('');
    expect(result.current.hasContent).toBe(false);
  });

  it('toggles ignoreWhitespace and ignoreCase options independently', () => {
    const { result } = renderHook(() => useTextComparator());

    act(() => {
      result.current.toggleIgnoreWhitespace();
    });
    expect(result.current.options).toEqual({ ignoreWhitespace: true, ignoreCase: false });

    act(() => {
      result.current.toggleIgnoreCase();
    });
    expect(result.current.options).toEqual({ ignoreWhitespace: true, ignoreCase: true });
  });

  it('produces a copyable text representation of the diff', () => {
    const { result } = renderHook(() => useTextComparator());

    act(() => {
      result.current.setOriginal('same\nold');
      result.current.setChanged('same\nnew');
    });

    const text = result.current.getDiffAsText();
    expect(text).toContain('same');
    expect(text).toContain('- old');
    expect(text).toContain('+ new');
  });
});
