import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import useResponsive from '@/helpers/hooks/useResponsive';
import Iconify from '@/shared/components/iconify/Iconify';

type LogoProps = {
  sx?: object;
};

const Logo = forwardRef(({ sx, ...other }: LogoProps, ref) => {
  const isMobile = useResponsive('down', 'sm');

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
        <Iconify icon='carbon:home' width={isMobile ? 28 : 40} />
      </Box>
    </Link>
  );
});

Logo.displayName = 'Logo';
export default Logo;
