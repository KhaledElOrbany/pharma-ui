import { styled } from '@mui/material/styles';
import { ListItemIcon } from '@mui/material';

export const StyledNavItemIcon = styled(ListItemIcon)(({ theme }) => ({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));
