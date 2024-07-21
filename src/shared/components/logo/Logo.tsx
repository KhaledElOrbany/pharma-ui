import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import Colors from '../../../theme/Colors';
import Iconify from '../iconify';
import useResponsive from '../../../helpers/hooks/useResponsive';

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
        <Iconify
          color={Colors.grey[700]}
          icon='carbon:home'
          width={isMobile ? 28 : 40}
        />
      </Box>
    </Link>
  );
});

Logo.displayName = 'Logo';
export default Logo;
