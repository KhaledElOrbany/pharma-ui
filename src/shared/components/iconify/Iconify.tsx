import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import Colors from '../../../theme/colors';

type IconifyProps = {
  icon: string;
  width?: number | string;
  sx?: object;
  color?: string;
};

const Iconify = forwardRef<HTMLDivElement, IconifyProps>(
  ({ icon, width = 20, color = Colors.grey[700], sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      color={color}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

Iconify.displayName = 'Iconify';

export default Iconify;
