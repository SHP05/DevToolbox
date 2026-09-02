import { Checkbox, Chip, Divider, FormControlLabel, Stack, Tooltip } from '@mui/material';
import { CopyButton } from '../../../components/common/CopyButton';
import { ClearButton } from '../../../components/common/ClearButton';
import type { RegexFlags, RegexResult } from '../types';

interface RegexToolbarProps {
  flags: RegexFlags;
  onToggleFlag: (key: keyof RegexFlags) => void;
  onClear: () => void;
  onCopyMatches: () => string;
  result: RegexResult;
  hasContent: boolean;
  hasMatches: boolean;
}

export function RegexToolbar({
  flags,
  onToggleFlag,
  onClear,
  onCopyMatches,
  result,
  hasContent,
  hasMatches,
}: RegexToolbarProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
      <Tooltip title="Global — find all matches instead of just the first">
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={flags.global}
              onChange={() => onToggleFlag('global')}
            />
          }
          label="g"
        />
      </Tooltip>
      <Tooltip title="Ignore case">
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={flags.ignoreCase}
              onChange={() => onToggleFlag('ignoreCase')}
            />
          }
          label="i"
        />
      </Tooltip>
      <Tooltip title="Multiline — ^ and $ match line boundaries">
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={flags.multiline}
              onChange={() => onToggleFlag('multiline')}
            />
          }
          label="m"
        />
      </Tooltip>
      <Tooltip title="Dot all — . matches newlines too">
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={flags.dotAll}
              onChange={() => onToggleFlag('dotAll')}
            />
          }
          label="s"
        />
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <CopyButton getText={onCopyMatches} disabled={!hasMatches} label="Copy matches" />
      <ClearButton onClick={onClear} disabled={!hasContent} />

      <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
        {hasContent && (
          <Chip
            size="small"
            color={result.isValid ? 'success' : 'error'}
            variant="outlined"
            label={result.isValid ? `${result.matches.length} match${result.matches.length === 1 ? '' : 'es'}` : 'Invalid regex'}
          />
        )}
      </Stack>
    </Stack>
  );
}
