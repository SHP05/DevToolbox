import { createTheme, type Theme } from '@mui/material/styles';
import type { ThemeMode } from '../types/common';

export function createAppTheme(mode: ThemeMode): Theme {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#3b82f6',
      },
      secondary: {
        main: '#8b5cf6',
      },
      ...(mode === 'light'
        ? {
            background: {
              default: '#f5f7fa',
              paper: '#ffffff',
            },
          }
        : {
            background: {
              default: '#0f1115',
              paper: '#171a21',
            },
          }),
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
}
