import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import Iconify from '../../../shared/components/iconify';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/AuthAPI';
import { toggleSnackbar } from '../../home/redux/AppSlice';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [email, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isRTL = localStorage.getItem('language') === 'ar';

  const hendleLogin = async () => {
    if (!email || !password) {
      dispatch(
        toggleSnackbar({
          open: true,
          message: t('missingCredentials'),
          severity: 'error',
        })
      );
    } else {
      let data = {
        username: email,
        password,
      };

      try {
        await login(data);

        if (isError) {
          dispatch(
            toggleSnackbar({
              open: true,
              message: error || 'Error during register.',
              severity: 'error',
            })
          );
        } else {
          navigate('/');
        }
      } catch (error) {
        dispatch(
          toggleSnackbar({
            open: true,
            message: 'Error during login. Please try again.',
            severity: 'error',
          })
        );
      }
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          required
          name='email'
          label={t('email')}
          value={email}
          onChange={({ target }) => setPhoneNumber(target.value)}
          sx={{
            ...(isRTL && {
              '& label': {
                left: 'unset',
                right: '1.75rem',
                transformOrigin: 'right',
              },
              '& legend': {
                textAlign: 'right',
                fontSize: '0.6rem',
              },
            }),
          }}
        />

        <TextField
          required
          name='password'
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  <Iconify
                    width={24}
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            ...(isRTL && {
              '& label': {
                left: 'unset',
                right: '1.75rem',
                transformOrigin: 'right',
              },
              '& legend': {
                textAlign: 'right',
                fontSize: '0.6rem',
              },
            }),
          }}
        />
      </Stack>

      <LoadingButton
        loading={isLoading}
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        onClick={hendleLogin}
        sx={{
          my: 4,
          color: 'white',
        }}
      >
        {t('login')}
      </LoadingButton>
    </>
  );
}
