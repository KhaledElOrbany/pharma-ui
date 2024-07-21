import { Theme } from '@mui/material';
import React from 'react';

interface ExtendedTheme extends Theme {
  customShadows?: CustomShadows;
}

type ThemeProviderProps = {
  children: React.ReactNode;
};

type CustomShadows = {
  z1: string;
  z4: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  primary: string;
  info: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  card: string;
  dialog: string;
  dropdown: string;
};

type Shadows = [
  'none',
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export { CustomShadows, ExtendedTheme, ThemeProviderProps, Shadows };
