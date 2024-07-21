import { Theme } from '@mui/material';

export default function Tab(theme: Theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: theme.palette.mode === 'dark' ? '0.5' : '1',
          },
        },
      },
    },
  };
}
