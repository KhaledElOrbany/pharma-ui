import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { ThemeProviderProps } from './types/Theme';
import GlobalStyles from './GlobalStyles';
import theme from './Theme';

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const _theme = useMemo(() => theme, []);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={_theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
