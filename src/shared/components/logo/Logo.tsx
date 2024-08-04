import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import useResponsive from '@/helpers/hooks/useResponsive';
import Iconify from '@/shared/components/iconify/Iconify';

type LogoProps = {
  sx?: object;
};

const Logo = forwardRef(({ sx, ...other }: LogoProps, ref) => {
  const { palette } = useTheme();
  const isMobile = useResponsive('down', 'sm');
  const logoColor =
    palette.mode === 'light' ? palette.grey[900] : palette.grey[400];

  return (
    <Link to='/'>
      <Box
        ref={ref}
        component='div'
        sx={{
          width: isMobile ? 28 : 40,
          height: isMobile ? 28 : 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <Iconify
          icon='carbon:home'
          color={logoColor}
          width={isMobile ? 28 : 40}
        />
      </Box>
    </Link>
  );
});

Logo.displayName = 'Logo';
export default Logo;
