import { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from '@/shared/components/iconify';
import { UserProps } from '../types/User';
import { LoadingButton } from '@mui/lab';

export default function UserDetails({ data }: { data: UserProps | undefined }) {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(true);

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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              disabled={isEdit}
              label={t('firstname')}
              value={data?.firstName}
              type='text'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              disabled={isEdit}
              label={t('lastname')}
              value={data?.lastName}
              type='text'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              disabled={isEdit}
              label={t('email')}
              value={data?.email}
              type='email'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              disabled={isEdit}
              label={t('phone')}
              name='phone'
              type='number'
              value={data?.phone}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              disabled={isEdit}
              label={t('address')}
              name='address'
              type='text'
              value={data?.address}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              disabled={isEdit}
              label={t('city')}
              name='city'
              type='text'
              value={data?.city}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <LoadingButton
          variant='contained'
          color='primary'
          size='medium'
          onClick={() => setIsEdit(!isEdit)}
          sx={{
            m: '.4rem auto',
            px: '4rem',
          }}
        >
          {t(isEdit ? 'edit' : 'update')}
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
