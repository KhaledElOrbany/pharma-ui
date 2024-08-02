import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import Colors from '@/theme/Colors';

type IconifyProps = {
  id?: string;
  icon: string;
  width?: number | string;
  sx?: object;
  color?: string;
  onClick?: (e: any) => void;
};

const Iconify = forwardRef<HTMLDivElement, IconifyProps>(
  ({ icon, width = 20, color = Colors.grey[700], sx, ...other }, ref) => (
    <Box
      id={other.id}
      ref={ref}
      component={Icon}
      icon={icon}
      color={color}
      sx={{ width, height: width, ...sx }}
      onClick={other.onClick}
      {...other}
    />
  )
);

Iconify.displayName = 'Iconify';

export default Iconify;
