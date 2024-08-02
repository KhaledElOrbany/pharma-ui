import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import useResponsive from '@/helpers/hooks/useResponsive';

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
        <img
          loading='lazy'
          src='/assets/logo.svg'
          alt='empty-cart'
          style={{
            margin: 'auto',
          }}
        />
      </Box>
    </Link>
  );
});

Logo.displayName = 'Logo';
export default Logo;
