import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, Link } from '@mui/material';
import Colors from '../../../theme/colors';
import Iconify from '../iconify';
import useResponsive from '../../../helpers/hooks/useResponsive';

type LogoProps = {
  sx?: object;
  disabledLink?: boolean;
};

const Logo = forwardRef(
  ({ disabledLink = false, sx, ...other }: LogoProps, ref) => {
    const isMobile = useResponsive('down', 'sm');

    const logo = (
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
        <IconButton
          aria-label='logo'
          sx={{
            m: 1,
            color: Colors.primary,
          }}
        >
          <Iconify
            color={Colors.offWhite}
            icon='carbon:home'
            width={isMobile ? 28 : 40}
          />
        </IconButton>
      </Box>
    );

    if (disabledLink) {
      return <>{logo}</>;
    }

    return (
      <Link to='/' component={RouterLink} sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

Logo.displayName = 'Logo';
export default Logo;
