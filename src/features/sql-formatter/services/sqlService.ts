import { format } from 'sql-formatter';
import type { SqlFormatOptions, SqlFormatResult } from '../types';

function firstErrorLine(error: unknown): string {
  const message = error instanceof Error ? error.message : 'Unable to format SQL.';
  return message.split('\n')[0];
}

export function formatSql(input: string, options: SqlFormatOptions): SqlFormatResult {
  if (input.trim() === '') {
    return { output: '', isValid: false, error: 'Input is empty.' };
  }

  try {
    const output = format(input, {
      language: 'tsql',
      tabWidth: options.indent,
      keywordCase: options.keywordCase,
    });
    return { output, isValid: true };
  } catch (error) {
    return { output: '', isValid: false, error: firstErrorLine(error) };
  }
}
