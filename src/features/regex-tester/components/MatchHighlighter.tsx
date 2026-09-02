import { Box, Paper, Typography } from '@mui/material';
import type { TextSegment } from '../types';

interface MatchHighlighterProps {
  segments: TextSegment[];
}

export function MatchHighlighter({ segments }: MatchHighlighterProps) {
  if (segments.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{
          height: '100%',
          minHeight: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">
          Enter a pattern and test text to see matches highlighted here.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      component="div"
      role="log"
      aria-label="Highlighted matches"
      sx={{
        height: '100%',
        minHeight: 220,
        overflow: 'auto',
        p: 1.5,
        fontFamily: 'monospace',
        fontSize: 13,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {segments.map((segment, index) =>
        segment.isMatch ? (
          <Box
            key={index}
            component="mark"
            data-match-index={segment.matchIndex}
            sx={(theme) => ({
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 213, 79, 0.35)' : '#fff3a3',
              color: 'text.primary',
              borderRadius: 0.5,
            })}
          >
            {segment.text}
          </Box>
        ) : (
          <Box key={index} component="span">
            {segment.text}
          </Box>
        ),
      )}
    </Paper>
  );
}
