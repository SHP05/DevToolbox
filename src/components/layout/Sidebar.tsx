import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StorageIcon from '@mui/icons-material/Storage';
import PatternIcon from '@mui/icons-material/FindReplace';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/routes';

export const SIDEBAR_WIDTH = 260;

const ICONS: Record<string, React.ReactNode> = {
  '/text-comparator': <CompareArrowsIcon />,
  '/json-formatter': <DataObjectIcon />,
  '/sql-formatter': <StorageIcon />,
  '/regex-tester': <PatternIcon />,
};

interface SidebarProps {
  variant: 'permanent' | 'temporary';
  open: boolean;
  onClose: () => void;
}

function SidebarContent() {
  return (
    <Box role="navigation" aria-label="Utilities">
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="h6" fontWeight={800} noWrap>
          Dev Utilities
        </Typography>
      </Toolbar>
      <List sx={{ px: 1 }}>
        {NAV_ITEMS.map((item) => {
          const content = (
            <ListItemButton
              key={item.path}
              component={item.enabled ? NavLink : 'div'}
              to={item.enabled ? item.path : undefined}
              disabled={!item.enabled}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.active': {
                  bgcolor: 'action.selected',
                  fontWeight: 700,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{ICONS[item.path]}</ListItemIcon>
              <ListItemText
                primary={item.label}
                secondary={item.enabled ? undefined : 'Coming soon'}
              />
            </ListItemButton>
          );

          return item.enabled ? (
            content
          ) : (
            <Tooltip key={item.path} title="Coming soon" placement="right">
              <span>{content}</span>
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );
}

export function Sidebar({ variant, open, onClose }: SidebarProps) {
  if (variant === 'permanent') {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <SidebarContent />
    </Drawer>
  );
}
