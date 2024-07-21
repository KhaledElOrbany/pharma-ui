import { alpha, PaletteOptions } from '@mui/material';
import Colors from './Colors';

const palette: PaletteOptions = {
  mode: 'light',
  common: {
    white: Colors.white,
    black: Colors.black,
  },
  background: {
    default: Colors.backgroundColor,
    paper: Colors.backgroundColor,
  },
  primary: Colors.primary,
  secondary: Colors.secondary,
  info: Colors.info,
  success: Colors.success,
  error: Colors.error,
  warning: Colors.warning,
  grey: Colors.grey,
  divider: alpha(Colors.grey[500], 0.24),
  text: {
    primary: Colors.grey[800],
    secondary: Colors.grey[600],
    disabled: Colors.grey[500],
  },
  action: {
    active: Colors.grey[600],
    hover: alpha(Colors.grey[500], 0.08),
    selected: alpha(Colors.grey[500], 0.16),
    disabled: alpha(Colors.grey[500], 0.8),
    disabledBackground: alpha(Colors.grey[500], 0.24),
    focus: alpha(Colors.grey[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
