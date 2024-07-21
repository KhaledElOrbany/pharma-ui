import { createContext, useMemo, useState } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import theme from './Theme';
import GlobalStyles from './GlobalStyles';
import ComponentsOverrides from './overrides';
import { ThemeProviderProps } from './types/Theme';

export const ColorModecontext = createContext({
  toggleColorMode: () => {},
});

export default function ThemeProvider({ children }: ThemeProviderProps) {
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

  theme.components = ComponentsOverrides(theme);
  const _theme = useMemo(() => theme, []);

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
