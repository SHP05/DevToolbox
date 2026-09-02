import { describe, expect, it } from 'vitest';
import { formatSql } from '../sqlService';

const OPTIONS = { indent: 2, keywordCase: 'upper' as const };

describe('formatSql', () => {
  it('returns an error for empty input', () => {
    const result = formatSql('', OPTIONS);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Input is empty.');
  });

  it('returns an error for whitespace-only input', () => {
    const result = formatSql('   \n  ', OPTIONS);
    expect(result.isValid).toBe(false);
  });

  it('formats a simple SELECT with readable indentation', () => {
    const result = formatSql('select a, b from t where x = 1', OPTIONS);

    expect(result.isValid).toBe(true);
    expect(result.output).toBe('SELECT\n  a,\n  b\nFROM\n  t\nWHERE\n  x = 1');
  });

  it('uppercases keywords when keywordCase is "upper"', () => {
    const result = formatSql('select a from t', { indent: 2, keywordCase: 'upper' });
    expect(result.output.startsWith('SELECT')).toBe(true);
  });

  it('preserves keyword casing when keywordCase is "preserve"', () => {
    const result = formatSql('select a from t', { indent: 2, keywordCase: 'preserve' });
    expect(result.output.startsWith('select')).toBe(true);
  });

  it('respects the configured indentation width', () => {
    const twoSpace = formatSql('select a from t', { indent: 2, keywordCase: 'upper' });
    const fourSpace = formatSql('select a from t', { indent: 4, keywordCase: 'upper' });

    expect(twoSpace.output).toContain('\n  a');
    expect(fourSpace.output).toContain('\n    a');
  });

  it('formats JOINs, GROUP BY and ORDER BY clauses', () => {
    const result = formatSql(
      'select u.id, count(o.id) from users u join orders o on u.id = o.user_id group by u.id order by u.id',
      OPTIONS,
    );

    expect(result.isValid).toBe(true);
    expect(result.output).toContain('JOIN orders');
    expect(result.output).toContain('GROUP BY');
    expect(result.output).toContain('ORDER BY');
  });

  it('formats CASE expressions', () => {
    const result = formatSql(
      "select case when age > 18 then 'adult' else 'minor' end from people",
      OPTIONS,
    );

    expect(result.isValid).toBe(true);
    expect(result.output).toContain('CASE');
    expect(result.output).toContain('WHEN age > 18 THEN');
    expect(result.output).toContain('END');
  });

  it('formats a CTE (WITH clause)', () => {
    const result = formatSql(
      'with cte as (select id from users) select * from cte',
      OPTIONS,
    );

    expect(result.isValid).toBe(true);
    expect(result.output).toContain('WITH');
    expect(result.output).toContain('cte AS');
  });

  it('formats subqueries', () => {
    const result = formatSql('select * from (select * from people) p', OPTIONS);

    expect(result.isValid).toBe(true);
    expect(result.output).toContain('FROM');
    expect(result.output).toContain('SELECT');
  });

  it('returns a concise error message for malformed SQL', () => {
    const result = formatSql('select * from (', OPTIONS);

    expect(result.isValid).toBe(false);
    expect(result.output).toBe('');
    expect(result.error).toBeTruthy();
    expect(result.error?.includes('\n')).toBe(false);
  });
});
