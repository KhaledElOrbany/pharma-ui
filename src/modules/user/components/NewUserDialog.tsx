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
import { GovernorateProps } from '@/modules/address/types/Address';

export default function NewUserDialog() {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedGov, setSelectedGov] = useState<GovernorateProps | null>();
  const [newUser, setNewUser] = useState<UserCreationDetails>({
    username: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    gender: 'MALE',
    role: { id: 3, name: 'USER' },
    city: { id: 0, name: '' },
  });

  useEffect(() => {
    if (isOpen) {
      fetchGovernorates();
    }
    if (selectedGov) {
      fetchCities({
        //TODO: Fix this nonsense!!
        filters: [{ key: 'governorateId', value: selectedGov.id }],
      });
    }
  }, [isOpen, selectedGov]);

  const [
    fetchGovernorates,
    { data: govs, isFetching: isFetchingGovernorates },
  ] = useLazyFetchGovernoratesQuery();
  const [fetchCities, { data: cities, isFetching: isFetchingCities }] =
    useLazyFetchCitiesQuery();
  const [createNewUser, { isLoading, isSuccess }] = useCreateUserMutation();

  return (
    <>
      <Button
        variant='contained'
        endIcon={isRTL ? <Iconify icon='eva:plus-fill' /> : ''}
        startIcon={isRTL ? '' : <Iconify icon='eva:plus-fill' />}
        onClick={() => setIsOpen(true)}
      >
        {t('addUser')}
      </Button>

      <PromptDialog
        confirmBtnText={t('add')}
        isLoading={isLoading}
        isOpen={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setSelectedGov(null);
          setNewUser({
            username: '',
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            email: '',
            gender: 'MALE',
            role: { id: 0, name: '' },
            city: { id: 0, name: '' },
          });
        }}
        onSave={async () => {
          newUser.username = newUser.firstName + '_' + newUser.lastName;
          await createNewUser(newUser);
          if (isSuccess) {
            setIsOpen(false);
            setSelectedGov(null);
            setNewUser({
              username: '',
              firstName: '',
              lastName: '',
              address: '',
              phone: '',
              email: '',
              gender: 'MALE',
              role: { id: 0, name: '' },
              city: { id: 0, name: '' },
            });
          }
        }}
        title={t('addUser')}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
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
              required
              fullWidth
              label={t('lastname')}
              name='lastname'
              type='text'
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              required
              fullWidth
              label={t('username')}
              name='username'
              type='text'
              value={newUser.firstName + '_' + newUser.lastName}
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
              required
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
              options={
                govs?.map((gov) => ({ id: gov.id, name: gov.name })) || []
              }
              getOptionLabel={(option) => option.name}
              sx={{ width: '100%' }}
              renderInput={(params) =>
                isFetchingGovernorates ? (
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
              options={
                cities?.map((city) => ({ id: city.id, name: city.name })) || []
              }
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
              onChange={(_, val) => {
                setNewUser({
                  ...newUser,
                  city: val as UserCreationDetails['city'],
                });
              }}
              disabled={!selectedGov}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
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
            <FormControl required>
              <FormLabel id='gender-radio-buttons-label'>
                {t('gender')}
              </FormLabel>
              <RadioGroup
                row
                name='gender-radio-buttons'
                aria-labelledby='gender-radio-buttons-label'
                onChange={(e) => {
                  setNewUser({
                    ...newUser,
                    gender: e.target.value as 'MALE' | 'FEMALE',
                  });
                }}
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
            <FormControl required>
              <FormLabel id='role-radio-buttons-label'>{t('role')}</FormLabel>
              <RadioGroup
                row
                defaultChecked
                defaultValue={'USER'}
                name='role-radio-buttons'
                aria-labelledby='role-radio-buttons-label'
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
