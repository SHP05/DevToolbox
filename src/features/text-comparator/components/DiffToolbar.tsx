import { Checkbox, FormControlLabel, Stack, Button, Chip, Divider } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { CopyButton } from '../../../components/common/CopyButton';
import { ClearButton } from '../../../components/common/ClearButton';
import type { DiffOptions, DiffStats } from '../types';

interface DiffToolbarProps {
  options: DiffOptions;
  onToggleIgnoreWhitespace: () => void;
  onToggleIgnoreCase: () => void;
  onSwap: () => void;
  onClear: () => void;
  onCopyDiff: () => string;
  stats: DiffStats;
  hasContent: boolean;
}

export function DiffToolbar({
  options,
  onToggleIgnoreWhitespace,
  onToggleIgnoreCase,
  onSwap,
  onClear,
  onCopyDiff,
  stats,
  hasContent,
}: DiffToolbarProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={options.ignoreWhitespace}
            onChange={onToggleIgnoreWhitespace}
          />
        }
        label="Ignore whitespace"
      />
      <FormControlLabel
        control={
          <Checkbox size="small" checked={options.ignoreCase} onChange={onToggleIgnoreCase} />
        }
        label="Ignore case"
      />

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Button
        variant="outlined"
        size="small"
        startIcon={<SwapHorizIcon />}
        onClick={onSwap}
        disabled={!hasContent}
      >
        Swap
      </Button>
      <CopyButton getText={onCopyDiff} disabled={!hasContent} label="Copy diff" />
      <ClearButton onClick={onClear} disabled={!hasContent} />

      <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
        <Chip size="small" color="success" variant="outlined" label={`+${stats.additions}`} />
        <Chip size="small" color="error" variant="outlined" label={`-${stats.deletions}`} />
      </Stack>
    </Stack>
  );
}
