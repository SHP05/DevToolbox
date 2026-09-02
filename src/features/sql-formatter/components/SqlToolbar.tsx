import {
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import { CopyButton } from '../../../components/common/CopyButton';
import { ClearButton } from '../../../components/common/ClearButton';
import type { IndentSize } from '../hooks/useSqlFormatter';
import type { SqlFormatResult, SqlKeywordCase } from '../types';

interface SqlToolbarProps {
  indent: IndentSize;
  indentOptions: readonly IndentSize[];
  onIndentChange: (indent: IndentSize) => void;
  keywordCase: SqlKeywordCase;
  onKeywordCaseChange: (keywordCase: SqlKeywordCase) => void;
  onFormat: () => void;
  onClear: () => void;
  onCopyOutput: () => string;
  validation: SqlFormatResult;
  hasContent: boolean;
  hasOutput: boolean;
}

export function SqlToolbar({
  indent,
  indentOptions,
  onIndentChange,
  keywordCase,
  onKeywordCaseChange,
  onFormat,
  onClear,
  onCopyOutput,
  validation,
  hasContent,
  hasOutput,
}: SqlToolbarProps) {
  const handleIndentChange = (event: SelectChangeEvent<number>) => {
    onIndentChange(Number(event.target.value) as IndentSize);
  };

  const handleKeywordCaseChange = (event: SelectChangeEvent<SqlKeywordCase>) => {
    onKeywordCaseChange(event.target.value as SqlKeywordCase);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="sql-indent-label">Indentation</InputLabel>
        <Select
          labelId="sql-indent-label"
          label="Indentation"
          value={indent}
          onChange={handleIndentChange}
        >
          {indentOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option} spaces
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="sql-keyword-case-label">Keyword case</InputLabel>
        <Select
          labelId="sql-keyword-case-label"
          label="Keyword case"
          value={keywordCase}
          onChange={handleKeywordCaseChange}
        >
          <MenuItem value="upper">UPPERCASE</MenuItem>
          <MenuItem value="preserve">Preserve case</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        size="small"
        startIcon={<FormatAlignLeftIcon />}
        onClick={onFormat}
        disabled={!hasContent}
      >
        Format
      </Button>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <CopyButton getText={onCopyOutput} disabled={!hasOutput} label="Copy output" />
      <ClearButton onClick={onClear} disabled={!hasContent} />

      <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
        {hasContent && (
          <Chip
            size="small"
            color={validation.isValid ? 'success' : 'error'}
            variant="outlined"
            label={validation.isValid ? 'Valid SQL' : 'Invalid SQL'}
          />
        )}
      </Stack>
    </Stack>
  );
}
