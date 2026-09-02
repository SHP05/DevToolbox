import { useMemo, useState } from 'react';
import { buildHighlightSegments, formatMatchesAsText, testRegex } from '../services/regexService';
import type { RegexFlags } from '../types';

const DEFAULT_FLAGS: RegexFlags = {
  global: true,
  ignoreCase: false,
  multiline: false,
  dotAll: false,
};

export function useRegexTester() {
  const [pattern, setPattern] = useState('');
  const [testText, setTestText] = useState('');
  const [flags, setFlags] = useState<RegexFlags>(DEFAULT_FLAGS);

  const result = useMemo(() => testRegex(pattern, flags, testText), [pattern, flags, testText]);

  const segments = useMemo(
    () => buildHighlightSegments(testText, result.matches),
    [testText, result.matches],
  );

  const toggleFlag = (key: keyof RegexFlags) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clear = () => {
    setPattern('');
    setTestText('');
  };

  const getMatchesAsText = () => formatMatchesAsText(result.matches);

  return {
    pattern,
    setPattern,
    testText,
    setTestText,
    flags,
    toggleFlag,
    result,
    segments,
    clear,
    getMatchesAsText,
    hasContent: pattern.length > 0 || testText.length > 0,
    hasMatches: result.matches.length > 0,
  };
}
