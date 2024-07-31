import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import AccountPopover from './AccountPopover';
import { useContext } from 'react';
import LanguagePopover from './LanguagePopover';
import { ColorModecontext } from '../../../theme/Theme';
import Iconify from '../../components/iconify';

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 70;

const StyledRoot = styled(AppBar)(({ theme }) => {
  const isRTL = localStorage.getItem('language') === 'ar';

  return {
    //TODO ...bgBlur({ color: theme.palette.background.default }),
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${NAV_WIDTH + 1}px)`,
      left: isRTL ? 'auto' : `${NAV_WIDTH + 1}px`,
      right: isRTL ? `${NAV_WIDTH + 1}px` : 'auto',
    },
  };
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
  backgroundColor: theme.palette.background.default,
  borderBottom: '1px dashed rgba(145, 158, 171, 0.24)',
}));

export default function Header({ onOpenNav }: { onOpenNav: () => void }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModecontext);

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon='eva:menu-2-fill' width={24} />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1 }}>
          <IconButton
            sx={{
              width: 44,
              height: 44,
              color: 'text.primary',
            }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === 'light' ? (
              <Iconify icon='solar:moon-bold' width={24} />
            ) : (
              <Iconify icon='solar:sun-2-linear' width={24} />
            )}
          </IconButton>
          <LanguagePopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
