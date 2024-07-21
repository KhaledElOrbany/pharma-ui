import { createContext, useMemo, useState } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { ThemeProviderProps } from './types/Theme';
import GlobalStyles from './GlobalStyles';
import theme from './Theme';
import ComponentsOverrides from './overrides';

export const ColorModecontext = createContext({
  toggleColorMode: () => {},
});

export default function ThemeProvider({ children }: ThemeProviderProps) {
  if (!localStorage.getItem('themeMode')) {
    localStorage.setItem('themeMode', 'light');
  }
  const [mode, setMode] = useState<PaletteMode>(
    (localStorage.getItem('themeMode') as PaletteMode) ?? 'light'
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  theme.palette.mode = mode;
  theme.direction = localStorage.getItem('language') === 'ar' ? 'rtl' : 'ltr';

  const _theme = useMemo(() => theme, []);
  _theme.components = ComponentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ColorModecontext.Provider value={colorMode}>
        <MUIThemeProvider theme={_theme}>
          <CssBaseline />
          <GlobalStyles />
          {children}
        </MUIThemeProvider>
      </ColorModecontext.Provider>
    </StyledEngineProvider>
  );
}
