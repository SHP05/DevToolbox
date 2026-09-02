import { diffArrays } from 'diff';
import type { DiffLine, DiffLineType, DiffOptions, DiffStats } from '../types';

function splitIntoLines(text: string): string[] {
  return text.split(/\r\n|\r|\n/);
}

function buildLineComparator(options: DiffOptions): ((a: string, b: string) => boolean) | undefined {
  if (!options.ignoreWhitespace && !options.ignoreCase) return undefined;

  return (a: string, b: string) => {
    let left = a;
    let right = b;
    if (options.ignoreWhitespace) {
      left = left.trim();
      right = right.trim();
    }
    if (options.ignoreCase) {
      left = left.toLowerCase();
      right = right.toLowerCase();
    }
    return left === right;
  };
}

export function computeLineDiff(
  original: string,
  changed: string,
  options: DiffOptions,
): DiffLine[] {
  if (original === '' && changed === '') {
    return [];
  }

  const originalLines = splitIntoLines(original);
  const changedLines = splitIntoLines(changed);

  const comparator = buildLineComparator(options);
  const changes = diffArrays(originalLines, changedLines, comparator ? { comparator } : undefined);

  const lines: DiffLine[] = [];

  for (const part of changes) {
    const type: DiffLineType = part.added ? 'added' : part.removed ? 'removed' : 'unchanged';
    for (const value of part.value) {
      lines.push({ type, value });
    }
  }

  return lines;
}

export function computeDiffStats(lines: DiffLine[]): DiffStats {
  return lines.reduce<DiffStats>(
    (acc, line) => {
      if (line.type === 'added') acc.additions += 1;
      else if (line.type === 'removed') acc.deletions += 1;
      else acc.unchanged += 1;
      return acc;
    },
    { additions: 0, deletions: 0, unchanged: 0 },
  );
}

export function formatDiffAsText(lines: DiffLine[]): string {
  return lines
    .map((line) => {
      const prefix = line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  ';
      return `${prefix}${line.value}`;
    })
    .join('\n');
}
