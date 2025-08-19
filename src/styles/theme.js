import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000',
      // main: '#11b67a',
      light: '#4dd49a',
      dark: '#0c8a5a',
    },
    secondary: {
      main: '#006a4d',
      light: '#339966',
      dark: '#004d38',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
    },
    // Adding success and info colors that complement the green theme
    success: {
      main: '#11b67a',
      light: '#4dd49a',
      dark: '#0c8a5a',
    },
    info: {
      main: '#006a4d',
      light: '#339966',
      dark: '#004d38',
    },
  },
  typography: {
    fontFamily:
      '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 300,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 400,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
    // Enhanced button styles with the new green theme
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(135deg, #11b67a 0%, #0c8a5a 100%)',
          boxShadow: '0 4px 16px rgba(17, 182, 122, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0c8a5a 0%, #095d44 100%)',
            boxShadow: '0 6px 20px rgba(17, 182, 122, 0.4)',
          },
        },
        outlined: {
          borderColor: '#11b67a',
          color: '#11b67a',
          '&:hover': {
            borderColor: '#0c8a5a',
            backgroundColor: 'rgba(17, 182, 122, 0.04)',
          },
        },
      },
    },
    // Enhanced Fab (Floating Action Button) styling
    MuiFab: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #11b67a 0%, #0c8a5a 100%)',
          boxShadow:
            '0 8px 32px rgba(17, 182, 122, 0.3), 0 2px 8px rgba(0,0,0,0.15)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0c8a5a 0%, #095d44 100%)',
            boxShadow:
              '0 12px 40px rgba(17, 182, 122, 0.4), 0 4px 12px rgba(0,0,0,0.2)',
          },
        },
      },
    },
  },
});
