import { Alert, AlertTitle } from '@mui/material';
import type { JsonProcessResult } from '../types';

interface ValidationMessageProps {
  validation: JsonProcessResult;
  hasContent: boolean;
}

export function ValidationMessage({ validation, hasContent }: ValidationMessageProps) {
  if (!hasContent || validation.isValid) {
    return null;
  }

  const { error } = validation;
  const location =
    error?.line !== undefined && error?.column !== undefined
      ? ` (line ${error.line}, column ${error.column})`
      : '';

  return (
    <Alert severity="error" variant="outlined" role="alert">
      <AlertTitle>Invalid JSON</AlertTitle>
      {(error?.message ?? 'Unable to parse JSON.') + location}
    </Alert>
  );
}
