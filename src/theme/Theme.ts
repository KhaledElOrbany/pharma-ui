import { createTheme, responsiveFontSizes } from '@mui/material';
import palette from './Palette';
import typography from './Typography';

const theme = createTheme({
  palette,
  typography,
  shape: { borderRadius: 6 },
});

export default responsiveFontSizes(theme);
