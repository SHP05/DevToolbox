import { Box, Chip, Divider, List, ListItem, Paper, Stack, Typography } from '@mui/material';
import type { RegexMatch } from '../types';

interface MatchListProps {
  matches: RegexMatch[];
}

export function MatchList({ matches }: MatchListProps) {
  if (matches.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{
          height: '100%',
          minHeight: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">No matches yet.</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{ height: '100%', minHeight: 160, overflow: 'auto' }}
      aria-label="Match details"
    >
      <List dense disablePadding>
        {matches.map((match, index) => (
          <Box key={index}>
            {index > 0 && <Divider component="li" />}
            <ListItem sx={{ display: 'block', py: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                <Chip size="small" label={`#${index + 1}`} />
                <Typography
                  component="code"
                  sx={{ fontFamily: 'monospace', fontSize: 13, wordBreak: 'break-all' }}
                >
                  {match.match.length > 0 ? match.match : '(empty match)'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  index {match.index}
                </Typography>
              </Stack>
              {match.groups.length > 0 && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 0.5, wordBreak: 'break-all' }}
                >
                  groups: {match.groups.map((group) => `"${group}"`).join(', ')}
                </Typography>
              )}
              {match.namedGroups && Object.keys(match.namedGroups).length > 0 && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 0.5, wordBreak: 'break-all' }}
                >
                  named:{' '}
                  {Object.entries(match.namedGroups)
                    .map(([name, value]) => `${name}="${value}"`)
                    .join(', ')}
                </Typography>
              )}
            </ListItem>
          </Box>
        ))}
      </List>
    </Paper>
  );
}
