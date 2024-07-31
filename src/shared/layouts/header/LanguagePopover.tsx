import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
// import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Iconify from '../../components/iconify';

const LANGS = [
  {
    value: 'ar',
    label: 'arabic',
    icon: '/icons/ic_flag_eg.svg',
  },
  {
    value: 'en',
    label: 'english',
    icon: '/icons/ic_flag_en.svg',
  },
];

export default function LanguagePopover() {
  const { t } = useTranslation('app');
  const language = localStorage.getItem('language');
  const [open, setOpen] = useState(null);
  const isRTL = localStorage.getItem('language') === 'ar';

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLanguageChange = (val: string) => {
    localStorage.setItem('language', val);
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open
            ? {
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.focusOpacity
                  ),
              }
            : {}),
        }}
      >
        <Iconify icon='hugeicons:translation' width={24} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === language}
              onClick={() => handleLanguageChange(option.value)}
            >
              <Box
                component='img'
                alt={option.label}
                src={option.icon}
                sx={{
                  width: 28,
                  ml: isRTL ? 2 : 0,
                  mr: isRTL ? 0 : 2,
                }}
              />
              {t(option.label)}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
