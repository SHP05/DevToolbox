import type { JsonProcessResult, JsonStats, JsonValidationError } from '../types';

function offsetToLineColumn(text: string, offset: number): { line: number; column: number } {
  let line = 1;
  let column = 1;

  for (let i = 0; i < offset && i < text.length; i += 1) {
    if (text[i] === '\n') {
      line += 1;
      column = 1;
    } else {
      column += 1;
    }
  }

  return { line, column };
}


function parseJsonError(error: unknown, input: string): JsonValidationError {
  const message = error instanceof Error ? error.message : 'Invalid JSON';

  const lineColumnMatch = message.match(/line (\d+) column (\d+)/i);
  if (lineColumnMatch) {
    return {
      message,
      line: Number(lineColumnMatch[1]),
      column: Number(lineColumnMatch[2]),
    };
  }

  const positionMatch = message.match(/position (\d+)/i);
  if (positionMatch) {
    const { line, column } = offsetToLineColumn(input, Number(positionMatch[1]));
    return { message, line, column };
  }

  return { message };
}

export function validateJson(input: string): JsonProcessResult {
  if (input.trim() === '') {
    return { output: '', isValid: false, error: { message: 'Input is empty.' } };
  }

  try {
    JSON.parse(input);
    return { output: input, isValid: true };
  } catch (error) {
    return { output: '', isValid: false, error: parseJsonError(error, input) };
  }
}

export function formatJson(input: string, indent: number): JsonProcessResult {
  if (input.trim() === '') {
    return { output: '', isValid: false, error: { message: 'Input is empty.' } };
  }

  try {
    const parsed = JSON.parse(input);
    return { output: JSON.stringify(parsed, null, indent), isValid: true };
  } catch (error) {
    return { output: '', isValid: false, error: parseJsonError(error, input) };
  }
}

export function minifyJson(input: string): JsonProcessResult {
  if (input.trim() === '') {
    return { output: '', isValid: false, error: { message: 'Input is empty.' } };
  }

  try {
    const parsed = JSON.parse(input);
    return { output: JSON.stringify(parsed), isValid: true };
  } catch (error) {
    return { output: '', isValid: false, error: parseJsonError(error, input) };
  }
}

export function computeJsonStats(text: string): JsonStats {
  if (text === '') {
    return { characters: 0, lines: 0 };
  }
  return { characters: text.length, lines: text.split(/\r\n|\r|\n/).length };
}
