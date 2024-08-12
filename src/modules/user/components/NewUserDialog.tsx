import { useEffect, useState } from 'react';
import PromptDialog from '@/shared/components/dialogs/prompt/PromptDialog';
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
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

  const [selectedGov, setSelectedGov] = useState<GovernorateProps | null>();
  const [selectedCity, setSelectedCity] = useState<CityProps | null>();
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
    gender: 'MALE',
    role: {
      id: 0,
      name: '',
    },
    city: {
      id: 0,
      name: '',
    },
  });

  useEffect(() => {
    if (dialogData.isOpen) {
      fetchGovernorates();
    }
    if (selectedGov) {
      fetchCities({
        //TODO: Fix this nonsense!!
        filters: [{ key: 'governorateId', value: selectedGov.id }],
      });
    }
  }, [dialogData.isOpen, selectedGov, selectedCity]);

  const [fetchGovernorates, { data: govs, isFetching: isFetchingGovernorate }] =
    useLazyFetchGovernoratesQuery();
  const [fetchCities, { data: cities, isFetching: isFetchingCities }] =
    useLazyFetchCitiesQuery();
  const [createNewUser, { isLoading }] = useCreateUserMutation();

  const govOptions = govs?.map((gov) => ({ id: gov.id, name: gov.name })) || [];
  const cityOptions =
    cities?.map((city) => ({ id: city.id, name: city.name })) || [];

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
            <Autocomplete
              id='govs'
              options={govOptions}
              getOptionLabel={(option) => option.name}
              sx={{ width: '100%' }}
              renderInput={(params) =>
                isFetchingGovernorate ? (
                  <TextField {...params} label={t('loading')} />
                ) : (
                  <TextField {...params} label={t('governorate')} />
                )
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_e, val) => setSelectedGov(val)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              id='cities'
              options={cityOptions}
              getOptionLabel={(option) => option.name}
              sx={{ width: '100%' }}
              renderInput={(params) =>
                isFetchingCities ? (
                  <TextField {...params} label={t('loading')} />
                ) : (
                  <TextField {...params} label={t('city')} />
                )
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, val) => setSelectedCity(val)}
              disabled={!selectedGov}
            />
          </Grid>
          <Grid item xs={12}>
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
            <FormControl>
              <FormLabel id='gender-radio-buttons-label'>
                {t('gender')}
              </FormLabel>
              <RadioGroup
                row
                name='gender-radio-buttons'
                aria-labelledby='gender-radio-buttons-label'
              >
                <FormControlLabel
                  value='FEMALE'
                  control={<Radio />}
                  label={t('female')}
                />
                <FormControlLabel
                  value='MALE'
                  control={<Radio />}
                  label={t('male')}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel id='gender-radio-buttons-label'>{t('role')}</FormLabel>
              <RadioGroup
                row
                defaultChecked
                defaultValue={'USER'}
                name='gender-radio-buttons'
                aria-labelledby='gender-radio-buttons-label'
                onChange={(e) => {
                  setNewUser({
                    ...newUser,
                    role: { id: 0, name: e.target.value },
                  });
                }}
              >
                <FormControlLabel
                  value='ADMIN'
                  control={<Radio />}
                  label={'ADMIN'}
                />
                <FormControlLabel
                  value='USER'
                  control={<Radio />}
                  label={'USER'}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </PromptDialog>
    </>
  );
}
