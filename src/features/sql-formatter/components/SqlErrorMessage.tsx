import { Alert, AlertTitle } from '@mui/material';
import type { SqlFormatResult } from '../types';

interface SqlErrorMessageProps {
  validation: SqlFormatResult;
  hasContent: boolean;
}

export function SqlErrorMessage({ validation, hasContent }: SqlErrorMessageProps) {
  if (!hasContent || validation.isValid) {
    return null;
  }

  return (
    <Alert severity="error" variant="outlined" role="alert">
      <AlertTitle>Invalid SQL</AlertTitle>
      {validation.error ?? 'Unable to parse the query.'}
    </Alert>
  );
}
