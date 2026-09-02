import { Box, Paper, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface ToolLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function ToolLayout({ title, description, actions, children }: ToolLayoutProps) {
  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
      <Stack spacing={0.5}>
        <Typography variant="h5" component="h1" fontWeight={700}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Stack>

      {actions && (
        <Paper
          variant="outlined"
          sx={{
            p: 1.5,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            alignItems: 'center',
          }}
        >
          {actions}
        </Paper>
      )}

      <Box sx={{ flex: 1, minHeight: 0 }}>{children}</Box>
    </Box>
  );
}
