import { useMemo, useState } from 'react';
import { computeJsonStats, formatJson, minifyJson, validateJson } from '../services/jsonService';

const INDENT_OPTIONS = [2, 4, 8] as const;
export type IndentSize = (typeof INDENT_OPTIONS)[number];

export function useJsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState<IndentSize>(2);

  const validation = useMemo(() => validateJson(input), [input]);
  const stats = useMemo(() => computeJsonStats(input), [input]);

  const format = () => {
    const result = formatJson(input, indent);
    setOutput(result.isValid ? result.output : '');
  };

  const minify = () => {
    const result = minifyJson(input);
    setOutput(result.isValid ? result.output : '');
  };

  const clear = () => {
    setInput('');
    setOutput('');
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setOutput('');
  };

  return {
    input,
    setInput: handleInputChange,
    output,
    indent,
    setIndent,
    indentOptions: INDENT_OPTIONS,
    validation,
    stats,
    format,
    minify,
    clear,
    hasContent: input.length > 0,
    hasOutput: output.length > 0,
  };
}
