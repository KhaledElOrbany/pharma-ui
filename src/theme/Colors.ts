const GREY = {
  0: '#FFFFFF',
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#d5d5d5',
  A200: '#aaaaaa',
  A400: '#303030',
  A700: '#616161',
};

const LIGHT_PRIMARY = {
  main: '#1976d2',
  light: '#42a5f5',
  dark: '#1565c0',
};

const DARK_PRIMARY = {
  main: '#90caf9',
  light: '#e3f2fd',
  dark: '#42a5f5',
};

const LIGHT_SECONDARY = {
  main: '#9c27b0',
  light: '#ba68c8',
  dark: '#7b1fa2',
};

const DARK_SECONDARY = {
  main: '#ce93d8',
  light: '#f3e5f5',
  dark: '#ab47bc',
};

const LIGHT_ERROR = {
  main: '#d32f2f',
  light: '#ef5350',
  dark: '#c62828',
};

const DARK_ERROR = {
  main: '#f44336',
  light: '#e57373',
  dark: '#d32f2f',
};

const LIGHT_WARNING = {
  main: '#ed6c02',
  light: '#ff9800',
  dark: '#e65100',
};

const DARK_WARNING = {
  main: '#ffa726',
  light: '#ffb74d',
  dark: '#f57c00',
};

const LIGHT_INFO = {
  main: '#0288d1',
  light: '#03a9f4',
  dark: '#01579b',
};

const DARK_INFO = {
  main: '#29b6f6',
  light: '#4fc3f7',
  dark: '#0288d1',
};

const LIGHT_SUCCESS = {
  main: '#2e7d32',
  light: '#4caf50',
  dark: '#1b5e20',
};

const DARK_SUCCESS = {
  main: '#66bb6a',
  light: '#81c784',
  dark: '#388e3c',
};

const Colors = {
  lightBackgroundColor: '#ffffff',
  darkBackgroundColor: '#0f1620', //'#0f1215', // '#141b2d',
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',
  offWhite: '#f7f8fa',
  teal: '#008080',

  grey: GREY,
  primary: { LIGHT_PRIMARY, DARK_PRIMARY },
  secondary: { LIGHT_SECONDARY, DARK_SECONDARY },
  error: { LIGHT_ERROR, DARK_ERROR },
  warning: { LIGHT_WARNING, DARK_WARNING },
  info: { LIGHT_INFO, DARK_INFO },
  success: { LIGHT_SUCCESS, DARK_SUCCESS },
};

export default Colors;
