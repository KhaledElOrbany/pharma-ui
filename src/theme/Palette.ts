import { PaletteOptions } from '@mui/material';
import Colors from './Colors';

const getPalette = (mode: 'light' | 'dark'): PaletteOptions => {
  const pallet = {
    light: {
      primary: Colors.primary.LIGHT_PRIMARY,
      secondary: Colors.secondary.LIGHT_SECONDARY,
      error: Colors.error.LIGHT_ERROR,
      warning: Colors.warning.LIGHT_WARNING,
      info: Colors.info.LIGHT_INFO,
      success: Colors.success.LIGHT_SUCCESS,
      background: {
        default: Colors.lightBackgroundColor,
        paper: Colors.lightBackgroundColor,
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
      divider: 'rgba(0, 0, 0, 0.12)',
      action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        hoverOpacity: 0.04,
        selected: 'rgba(0, 0, 0, 0.08)',
        selectedOpacity: 0.08,
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
      },
    },
    dark: {
      primary: Colors.primary.DARK_PRIMARY,
      secondary: Colors.secondary.DARK_SECONDARY,
      error: Colors.error.DARK_ERROR,
      warning: Colors.warning.DARK_WARNING,
      info: Colors.info.DARK_INFO,
      success: Colors.success.DARK_SUCCESS,
      background: {
        default: Colors.darkBackgroundColor,
        paper: Colors.darkBackgroundColor,
      },
      text: {
        primary: Colors.white,
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
        icon: 'rgba(255, 255, 255, 0.5)',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
      action: {
        active: Colors.white,
        hover: 'rgba(255, 255, 255, 0.08)',
        hoverOpacity: 0.08,
        selected: 'rgba(255, 255, 255, 0.16)',
        selectedOpacity: 0.16,
        disabled: 'rgba(255, 255, 255, 0.3)',
        disabledOpacity: 0.38,
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.24,
      },
    },
  };

  return {
    ...pallet[mode],
    mode: mode,
    common: {
      white: Colors.white,
      black: Colors.black,
    },
    grey: Colors.grey,
  };
};

export default getPalette;
