import type { RegexFlags, RegexMatch, RegexResult, TextSegment } from '../types';

export function buildFlagsString(flags: RegexFlags): string {
  let result = '';
  if (flags.global) result += 'g';
  if (flags.ignoreCase) result += 'i';
  if (flags.multiline) result += 'm';
  if (flags.dotAll) result += 's';
  return result;
}

function toRegexMatch(match: RegExpMatchArray): RegexMatch {
  return {
    match: match[0],
    index: match.index ?? 0,
    groups: match.slice(1).map((group) => group ?? ''),
    namedGroups: match.groups ? { ...match.groups } : undefined,
  };
}

const MAX_MATCHES = 10_000;

export function testRegex(pattern: string, flags: RegexFlags, text: string): RegexResult {
  if (pattern === '') {
    return { isValid: false, error: 'Pattern is empty.', matches: [] };
  }

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, buildFlagsString(flags));
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid regular expression.',
      matches: [],
    };
  }

  const matches: RegexMatch[] = [];

  if (flags.global) {
    for (const match of text.matchAll(regex)) {
      matches.push(toRegexMatch(match));
      if (matches.length >= MAX_MATCHES) break;
    }
  } else {
    const match = regex.exec(text);
    if (match) matches.push(toRegexMatch(match));
  }

  return { isValid: true, matches };
}

export function buildHighlightSegments(text: string, matches: RegexMatch[]): TextSegment[] {
  if (matches.length === 0) {
    return text.length > 0 ? [{ text, isMatch: false }] : [];
  }

  const segments: TextSegment[] = [];
  let cursor = 0;

  matches.forEach((match, matchIndex) => {
    if (match.index > cursor) {
      segments.push({ text: text.slice(cursor, match.index), isMatch: false });
    }
    if (match.match.length > 0) {
      segments.push({ text: match.match, isMatch: true, matchIndex });
      cursor = Math.max(cursor, match.index + match.match.length);
    }
  });

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), isMatch: false });
  }

  return segments;
}

export function formatMatchesAsText(matches: RegexMatch[]): string {
  return matches
    .map((match, index) => {
      const groupsPart =
        match.groups.length > 0
          ? ` | groups: [${match.groups.map((group) => `"${group}"`).join(', ')}]`
          : '';
      return `${index + 1}. "${match.match}" at index ${match.index}${groupsPart}`;
    })
    .join('\n');
}
