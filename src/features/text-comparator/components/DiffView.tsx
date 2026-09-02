import { Box, Paper, Typography } from '@mui/material';
import type { DiffLine } from '../types';

interface DiffViewProps {
  lines: DiffLine[];
}

const BACKGROUNDS: Record<DiffLine['type'], { light: string; dark: string }> = {
  added: { light: '#e6ffed', dark: 'rgba(46, 160, 67, 0.2)' },
  removed: { light: '#ffebe9', dark: 'rgba(248, 81, 73, 0.2)' },
  unchanged: { light: 'transparent', dark: 'transparent' },
};

const PREFIX: Record<DiffLine['type'], string> = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

export function DiffView({ lines }: DiffViewProps) {
  if (lines.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{
          height: '100%',
          minHeight: 260,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">
          Enter text on both sides to see the differences here.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      component="div"
      role="log"
      aria-label="Difference result"
      sx={{
        height: '100%',
        minHeight: 260,
        overflow: 'auto',
        fontFamily: 'monospace',
        fontSize: 13,
      }}
    >
      {lines.map((line, index) => (
        <Box
          key={index}
          sx={(theme) => ({
            display: 'flex',
            px: 1.5,
            py: 0.25,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            bgcolor:
              theme.palette.mode === 'dark'
                ? BACKGROUNDS[line.type].dark
                : BACKGROUNDS[line.type].light,
            color:
              line.type === 'added'
                ? theme.palette.mode === 'dark'
                  ? '#7ee2a8'
                  : '#116329'
                : line.type === 'removed'
                  ? theme.palette.mode === 'dark'
                    ? '#ff9a94'
                    : '#82071e'
                  : 'text.primary',
          })}
        >
          <Box component="span" sx={{ width: 16, flexShrink: 0, opacity: 0.7 }}>
            {PREFIX[line.type]}
          </Box>
          <Box component="span">{line.value.length > 0 ? line.value : '\u00A0'}</Box>
        </Box>
      ))}
    </Paper>
  );
}
