import { useEffect, useState } from 'react';
import PromptDialog from '@/shared/components/dialogs/prompt/PromptDialog';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from '@/shared/components/iconify';
import { UserCreationDetails } from '../types/User';
import { useCreateUserMutation } from '../redux/UserAPI';
import {
  useLazyFetchCitiesQuery,
  useLazyFetchGovernoratesQuery,
} from '@/modules/address/redux/AddressAPI';
import { CityProps, GovernorateProps } from '@/modules/address/types/Address';

export default function NewUserDialog() {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const [selectedGov, setSelectedGov] = useState<GovernorateProps>();
  const [selectedCity, setSelectedCity] = useState<CityProps>();
  const [dialogData, setDialogData] = useState({
    isOpen: false,
    title: '',
    onSave: () => {},
  });
  const [newUser, setNewUser] = useState<UserCreationDetails>({
    username: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    city: '',
  });

  useEffect(() => {
    if (dialogData.isOpen) {
      fetchGovernorates();
    }
    if (selectedGov) {
      fetchCities({ governorateId: selectedGov.id });
    }
  }, [dialogData.isOpen, selectedGov, selectedCity]);

  const [fetchGovernorates, { data: govs, isFetching: isFetchingGovernorate }] =
    useLazyFetchGovernoratesQuery();
  const [fetchCities, { data: cities, isFetching: isFetchingCities }] =
    useLazyFetchCitiesQuery();
  const [createNewUser, { isLoading }] = useCreateUserMutation();

  const govOptions =
    govs?.map((gov) => ({ id: gov.id, name: gov.nameAr })) || [];
  const cityOptions =
    cities?.map((city) => ({ id: city.id, name: city.nameAr })) || [];

  return (
    <>
      <Button
        variant='contained'
        endIcon={isRTL ? <Iconify icon='eva:plus-fill' /> : ''}
        startIcon={isRTL ? '' : <Iconify icon='eva:plus-fill' />}
        onClick={() =>
          setDialogData({
            isOpen: true,
            title: t('addUser'),
            onSave: () => {
              createNewUser(newUser);
              setDialogData({ ...dialogData, isOpen: false });
            },
          })
        }
      >
        {t('addUser')}
      </Button>

      <PromptDialog
        isLoading={isLoading}
        confirmBtnText='add'
        dialogData={dialogData}
        setDialogData={setDialogData}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t('firstname')}
              type='text'
              name='firstName'
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t('lastname')}
              name='lastname'
              type='text'
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t('email')}
              name='email'
              type='email'
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t('phone')}
              name='phone'
              type='number'
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t('address')}
              name='address'
              type='text'
              onChange={(e) =>
                setNewUser({ ...newUser, address: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t('city')}
              name='city'
              type='text'
              onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Autocomplete
              id='govs'
              options={govOptions}
              getOptionLabel={(option) => option.name}
              sx={{ width: '100%' }}
              renderInput={(params) =>
                isFetchingGovernorate ? (
                  <TextField {...params} label={t('governorate')} />
                ) : (
                  <TextField {...params} label={t('loading')} />
                )
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              // value={selectedGov}
              // onChange={(e, val) => setSelectedGov(val)}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Autocomplete
              id='cities'
              options={cityOptions}
              getOptionLabel={(option) => option.name}
              sx={{ width: '100%' }}
              renderInput={(params) =>
                isFetchingCities ? (
                  <TextField {...params} label={t('city')} />
                ) : (
                  <TextField {...params} label={t('loading')} />
                )
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              // value={selectedCity}
              // onChange={(e, val) => setSelectedCity(val)}
              disabled
            />
          </Grid>
        </Grid>
      </PromptDialog>
    </>
  );
}
