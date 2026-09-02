export type SqlKeywordCase = 'preserve' | 'upper';

export interface SqlFormatOptions {
  indent: number;
  keywordCase: SqlKeywordCase;
}

export interface SqlFormatResult {
  output: string;
  isValid: boolean;
  error?: string;
}
