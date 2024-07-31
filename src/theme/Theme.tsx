import { createContext, useEffect, useMemo, useState } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  responsiveFontSizes,
  StyledEngineProvider,
} from '@mui/material/styles';
import GlobalStyles from './GlobalStyles';
import ComponentsOverrides from './overrides';
import { ExtendedTheme, ThemeProviderProps } from './types/Theme';
import getPalette from './Palette';
import typography from './Typography';
import Shadows from './Shadows';
import CustomShadows from './CustomShadows';

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

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const theme = createTheme({
    palette: getPalette(mode),
    typography,
    shape: { borderRadius: 6 },
    shadows: Shadows(),
    customShadows: CustomShadows(),
  } as ExtendedTheme);
  theme.palette.mode = mode;
  theme.direction = localStorage.getItem('language') === 'ar' ? 'rtl' : 'ltr';

  theme.components = ComponentsOverrides(theme);
  const _theme = useMemo(() => responsiveFontSizes(theme), [mode]);

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
