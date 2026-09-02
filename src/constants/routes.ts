export const ROUTES = {
  HOME: '/',
  TEXT_COMPARATOR: '/text-comparator',
  JSON_FORMATTER: '/json-formatter',
  SQL_FORMATTER: '/sql-formatter',
  REGEX_TESTER: '/regex-tester',
} as const;

export interface NavItem {
  path: string;
  label: string;
  description: string;
  /** Whether the tool has been implemented yet. */
  enabled: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    path: ROUTES.TEXT_COMPARATOR,
    label: 'Text Comparator',
    description: 'Compare two blocks of text and highlight differences',
    enabled: true,
  },
  {
    path: ROUTES.JSON_FORMATTER,
    label: 'JSON Formatter',
    description: 'Format, minify and validate JSON',
    enabled: true,
  },
  {
    path: ROUTES.SQL_FORMATTER,
    label: 'SQL Formatter',
    description: 'Format T-SQL / SQL Server queries',
    enabled: true,
  },
  {
    path: ROUTES.REGEX_TESTER,
    label: 'Regex Tester',
    description: 'Test JavaScript regular expressions',
    enabled: true,
  },
];
