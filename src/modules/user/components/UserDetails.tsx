import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from '@/shared/components/iconify';
import { userDetails } from '../types/User';

export default function UserDetails({
  data,
}: {
  data: userDetails | undefined;
}) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        title={
          <Typography
            variant='h6'
            component='div'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Iconify icon={'octicon:info-24'} sx={{ mx: 1 }} /> {t('info')}
          </Typography>
        }
      />

      <Divider
        sx={{ my: 2, marginLeft: 'auto', marginRight: 'auto', width: '92%' }}
      />

      <CardContent sx={{ pt: 2 }}>
        <Box sx={{ m: -1.5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label={t('name')}
                value={data?.fullName}
                type='phone'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t('email')}
                value={data?.email}
                type='email'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t('phone')}
                name='phone'
                type='number'
                value={data?.phone}
              />
            </Grid>

            {/* -------------------------------------------------------- */}
            <Grid item xs={12} md={12}>
              <Divider
                sx={{
                  width: '95%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderStyle: 'dashed',
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
