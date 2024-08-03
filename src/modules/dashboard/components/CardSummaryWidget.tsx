import { alpha, styled, useTheme } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import Iconify from '@/shared/components/iconify/Iconify';

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

type CardSummaryWidgetPropTypes = {
  title: string;
  total: number;
  icon: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  sx?: object;
  [key: string]: any;
};

export default function CardSummaryWidget({
  title,
  total,
  icon,
  color = 'primary',
  sx,
  ...other
}: CardSummaryWidgetPropTypes) {
  const { palette } = useTheme();
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color:
          palette.mode === 'dark' ? palette[color].dark : palette[color].light,
        bgcolor:
          palette.mode === 'dark' ? palette[color].light : palette[color].light,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: palette[color].dark,
          backgroundImage: `linear-gradient(135deg, ${alpha(
            palette[color].dark,
            0
          )} 0%, ${alpha(palette[color].dark, 0.24)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} />
      </StyledIcon>

      <Typography variant='h3' sx={{ color: palette.grey[800] }}>
        {total}
      </Typography>

      <Typography variant='subtitle2' sx={{ color: palette.grey[700] }}>
        {title}
      </Typography>
    </Card>
  );
}
