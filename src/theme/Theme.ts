import { createTheme, responsiveFontSizes } from '@mui/material';
import palette from './Palette';
import typography from './Typography';
import Shadows from './Shadows';
import { ExtendedTheme } from './types/Theme';
import CustomShadows from './CustomShadows';

const theme = createTheme({
  palette: palette,
  typography,
  shape: { borderRadius: 6 },
  shadows: Shadows(),
  customShadows: CustomShadows(),
} as ExtendedTheme);

export default responsiveFontSizes(theme);
