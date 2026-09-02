import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ROUTES } from '../constants/routes';
import { TextComparatorPage } from '../features/text-comparator';
import { JsonFormatterPage } from '../features/json-formatter';
import { RegexTesterPage } from '../features/regex-tester';
import { SqlFormatterPage } from '../features/sql-formatter';

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.TEXT_COMPARATOR} replace />} />
        <Route path={ROUTES.TEXT_COMPARATOR} element={<TextComparatorPage />} />
        <Route path={ROUTES.JSON_FORMATTER} element={<JsonFormatterPage />} />
        <Route path={ROUTES.SQL_FORMATTER} element={<SqlFormatterPage />} />
        <Route path={ROUTES.REGEX_TESTER} element={<RegexTesterPage />} />
        <Route path="*" element={<Navigate to={ROUTES.TEXT_COMPARATOR} replace />} />
      </Route>
    </Routes>
  );
}
