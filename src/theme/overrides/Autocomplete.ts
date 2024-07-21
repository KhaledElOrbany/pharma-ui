import { Theme } from '@mui/material';

export default function Autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          // boxShadow: theme.customShadows.z20,
        },
        root: {
          '.Mui-disabled': {
            opacity: theme.palette.mode === 'dark' ? '0.5' : '1',
          },
        },
      },
    },
  };
}
