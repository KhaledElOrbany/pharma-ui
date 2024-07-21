import { Theme } from '@mui/material';
import Autocomplete from './Autocomplete';
import Backdrop from './Backdrop';
import Button from './Button';
import Card from './Card';
import Input from './Input';
import Paper from './Paper';
import Switch from './Switch';
import Tab from './Tab';
import Table from './Table';
import TextField from './TextField';
import Tooltip from './Tooltip';
import Typography from './Typography';

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Autocomplete(theme),
    Backdrop(theme),
    Button(theme),
    Card(theme),
    Input(theme),
    Paper(),
    Switch(),
    Tab(theme),
    Table(theme),
    TextField(),
    Tooltip(theme),
    Typography(theme)
  );
}
