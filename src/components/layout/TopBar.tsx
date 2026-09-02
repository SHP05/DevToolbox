import { AppBar, IconButton, Toolbar, Typography, Tooltip, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '../../app/ThemeModeContext';
import { NAV_ITEMS } from '../../constants/routes';
import { useLocation } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
  showMenuButton: boolean;
}

export function TopBar({ onMenuClick, showMenuButton }: TopBarProps) {
  const { mode, toggleMode } = useThemeMode();
  const location = useLocation();
  const currentItem = NAV_ITEMS.find((item) => item.path === location.pathname);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Toolbar>
        {showMenuButton && (
          <IconButton
            edge="start"
            aria-label="Open navigation menu"
            onClick={onMenuClick}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ flex: 1 }}>
          {currentItem?.label ?? 'Dev Utilities'}
        </Typography>
        <Box>
          <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
            <IconButton
              aria-label="Toggle color mode"
              onClick={toggleMode}
              color="inherit"
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
