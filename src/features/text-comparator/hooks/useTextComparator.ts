import { useMemo, useState } from 'react';
import { computeDiffStats, computeLineDiff, formatDiffAsText } from '../services/diffService';
import type { DiffOptions } from '../types';

export function useTextComparator() {
  const [original, setOriginal] = useState('');
  const [changed, setChanged] = useState('');
  const [options, setOptions] = useState<DiffOptions>({
    ignoreWhitespace: false,
    ignoreCase: false,
  });

  const diffLines = useMemo(
    () => computeLineDiff(original, changed, options),
    [original, changed, options],
  );

  const stats = useMemo(() => computeDiffStats(diffLines), [diffLines]);

  const swap = () => {
    setOriginal(changed);
    setChanged(original);
  };

  const clear = () => {
    setOriginal('');
    setChanged('');
  };

  const toggleIgnoreWhitespace = () =>
    setOptions((prev) => ({ ...prev, ignoreWhitespace: !prev.ignoreWhitespace }));

  const toggleIgnoreCase = () =>
    setOptions((prev) => ({ ...prev, ignoreCase: !prev.ignoreCase }));

  const getDiffAsText = () => formatDiffAsText(diffLines);

  return {
    original,
    setOriginal,
    changed,
    setChanged,
    options,
    toggleIgnoreWhitespace,
    toggleIgnoreCase,
    diffLines,
    stats,
    swap,
    clear,
    getDiffAsText,
    hasContent: original.length > 0 || changed.length > 0,
  };
}
