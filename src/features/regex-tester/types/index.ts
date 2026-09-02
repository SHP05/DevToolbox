export interface RegexFlags {
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
  dotAll: boolean;
}

export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
  namedGroups?: Record<string, string>;
}

export interface RegexResult {
  isValid: boolean;
  error?: string;
  matches: RegexMatch[];
}

export interface TextSegment {
  text: string;
  isMatch: boolean;
  matchIndex?: number;
}
