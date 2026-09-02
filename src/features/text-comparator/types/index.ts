export interface DiffOptions {
  ignoreWhitespace: boolean;
  ignoreCase: boolean;
}

export type DiffLineType = 'added' | 'removed' | 'unchanged';

export interface DiffLine {
  type: DiffLineType;
  value: string;
}

export interface DiffStats {
  additions: number;
  deletions: number;
  unchanged: number;
}
