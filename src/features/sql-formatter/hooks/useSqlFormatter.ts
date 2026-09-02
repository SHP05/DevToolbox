import { useMemo, useState } from 'react';
import { formatSql } from '../services/sqlService';
import type { SqlKeywordCase } from '../types';

const INDENT_OPTIONS = [2, 4, 8] as const;
export type IndentSize = (typeof INDENT_OPTIONS)[number];

export function useSqlFormatter() {
  const [input, setInputState] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState<IndentSize>(2);
  const [keywordCase, setKeywordCase] = useState<SqlKeywordCase>('upper');

  const validation = useMemo(
    () => formatSql(input, { indent, keywordCase }),
    [input, indent, keywordCase],
  );

  const setInput = (value: string) => {
    setInputState(value);
    setOutput('');
  };

  const format = () => {
    setOutput(validation.isValid ? validation.output : '');
  };

  const clear = () => {
    setInputState('');
    setOutput('');
  };

  return {
    input,
    setInput,
    output,
    indent,
    setIndent,
    indentOptions: INDENT_OPTIONS,
    keywordCase,
    setKeywordCase,
    validation,
    format,
    clear,
    hasContent: input.length > 0,
    hasOutput: output.length > 0,
  };
}
