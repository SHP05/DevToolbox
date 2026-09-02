import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar, SIDEBAR_WIDTH } from './Sidebar';
import { TopBar } from './TopBar';

export function AppLayout() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          ml: isSmallScreen ? 0 : `0px`,
          width: isSmallScreen ? '100%' : `calc(100% - ${SIDEBAR_WIDTH}px)`,
        }}
      >
        <TopBar onMenuClick={() => setMobileOpen(true)} showMenuButton={isSmallScreen} />
        <Box sx={{ p: { xs: 2, md: 3 }, flex: 1, minHeight: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
