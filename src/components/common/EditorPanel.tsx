import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface EditorPanelProps {
  title: string;
  headerActions?: ReactNode;
  children: ReactNode;
}

export function EditorPanel({ title, headerActions, children }: EditorPanelProps) {
  return (
    <Stack spacing={1} sx={{ height: '100%', minWidth: 0 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
          {title}
        </Typography>
        {headerActions}
      </Box>
      <Box sx={{ flex: 1, minHeight: 0 }}>{children}</Box>
    </Stack>
  );
}
