import { createTheme, responsiveFontSizes } from '@mui/material';
import palette from './Palette';
import typography from './Typography';
import shadows from './shadows';

const theme = createTheme({
  palette,
  typography,
  shape: { borderRadius: 6 },
  shadows: shadows(),
});

export default responsiveFontSizes(theme);
