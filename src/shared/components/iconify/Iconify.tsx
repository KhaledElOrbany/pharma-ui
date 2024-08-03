import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import { Box, useTheme } from '@mui/material';
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
  ({ icon, width = 20, color, sx, ...other }, ref) => {
    const { palette } = useTheme();
    return (
      <Box
        id={other.id}
        ref={ref}
        component={Icon}
        icon={icon}
        color={
          palette.mode === 'dark' ? Colors.grey[400] : color || Colors.grey[800]
        }
        sx={{ width, height: width, ...sx }}
        onClick={other.onClick}
        {...other}
      />
    );
  }
);

Iconify.displayName = 'Iconify';

export default Iconify;
