import {
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from '../iconify';
import { HeaderProps } from './Header.d';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => {
  const isRTL = theme.direction === 'rtl';

  return {
    ':last-child': {
      marginLeft: isRTL ? 'unset' : 'auto',
      marginRight: isRTL ? 'auto' : 'unset',
    },
    textAlign: 'center',
    padding: theme.spacing(0.5),
    color: theme.palette.text.secondary,
  };
});

export default function Header({
  children,
  divider,
  header,
  goBackButton = true,
  gutterBottom = false,
  refetch,
  sx,
}: HeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isRTL = localStorage.getItem('language') === 'ar';

  return (
    <Stack
      direction='row'
      alignItems='center'
      divider={
        divider && (
          <Divider orientation='vertical' flexItem sx={{ mx: '0.5rem' }} />
        )
      }
      sx={sx}
    >
      {goBackButton && (
        <Item>
          <IconButton
            title='Go Back'
            onClick={() => navigate(-1)}
            sx={{
              border: '1px solid #637381',
              '&:hover': {
                color: '#f7f8fa',
                backgroundColor: '#637381',
              },
            }}
          >
            <Iconify
              icon={isRTL ? 'mdi:arrow-right-top' : 'mdi:arrow-left-top'}
              width={24}
            />
          </IconButton>
        </Item>
      )}

      {header && (
        <Item>
          <Typography
            variant='h4'
            gutterBottom={gutterBottom}
            sx={{ textAlign: 'start' }}
          >
            {t(header)}
          </Typography>
        </Item>
      )}

      {children && <Item>{children}</Item>}

      {refetch && (
        <Item>
          <IconButton
            title='Refresh'
            onClick={() => refetch()}
            sx={{
              border: '1px solid #637381',
              borderRadius: '8px',
              '&:hover': {
                color: '#f7f8fa',
                backgroundColor: '#637381',
              },
            }}
          >
            <Iconify icon={'material-symbols:refresh'} width={24} />
          </IconButton>
        </Item>
      )}
    </Stack>
  );
}
