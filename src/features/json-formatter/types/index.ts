export type JsonAction = 'format' | 'minify';

export interface JsonValidationError {
  message: string;
  line?: number;
  column?: number;
}

export interface JsonProcessResult {
  output: string;
  isValid: boolean;
  error?: JsonValidationError;
}

export interface JsonStats {
  characters: number;
  lines: number;
}
