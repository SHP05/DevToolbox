import { Alert, AlertTitle } from '@mui/material';
import type { RegexResult } from '../types';

interface RegexErrorMessageProps {
  result: RegexResult;
  hasPattern: boolean;
}

export function RegexErrorMessage({ result, hasPattern }: RegexErrorMessageProps) {
  if (!hasPattern || result.isValid) {
    return null;
  }

  return (
    <Alert severity="error" variant="outlined" role="alert">
      <AlertTitle>Invalid regular expression</AlertTitle>
      {result.error ?? 'Unable to parse the pattern.'}
    </Alert>
  );
}
