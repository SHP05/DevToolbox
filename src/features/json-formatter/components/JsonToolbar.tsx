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
import CompressIcon from '@mui/icons-material/Compress';
import { CopyButton } from '../../../components/common/CopyButton';
import { ClearButton } from '../../../components/common/ClearButton';
import type { IndentSize } from '../hooks/useJsonFormatter';
import type { JsonProcessResult } from '../types';

interface JsonToolbarProps {
  indent: IndentSize;
  indentOptions: readonly IndentSize[];
  onIndentChange: (indent: IndentSize) => void;
  onFormat: () => void;
  onMinify: () => void;
  onClear: () => void;
  onCopyOutput: () => string;
  validation: JsonProcessResult;
  hasContent: boolean;
  hasOutput: boolean;
}

export function JsonToolbar({
  indent,
  indentOptions,
  onIndentChange,
  onFormat,
  onMinify,
  onClear,
  onCopyOutput,
  validation,
  hasContent,
  hasOutput,
}: JsonToolbarProps) {
  const handleIndentChange = (event: SelectChangeEvent<number>) => {
    onIndentChange(Number(event.target.value) as IndentSize);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="json-indent-label">Indentation</InputLabel>
        <Select
          labelId="json-indent-label"
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

      <Button
        variant="outlined"
        size="small"
        startIcon={<FormatAlignLeftIcon />}
        onClick={onFormat}
        disabled={!hasContent}
      >
        Format
      </Button>
      <Button
        variant="outlined"
        size="small"
        startIcon={<CompressIcon />}
        onClick={onMinify}
        disabled={!hasContent}
      >
        Minify
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
            label={validation.isValid ? 'Valid JSON' : 'Invalid JSON'}
          />
        )}
      </Stack>
    </Stack>
  );
}
