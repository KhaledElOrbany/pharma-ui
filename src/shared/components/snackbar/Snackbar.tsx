import { useEffect } from 'react';
import { Alert, Snackbar as MuiSnackbar, styled } from '@mui/material';
import { SnackbarAnchorProps } from './Snackbar.d';
import { useDispatch, useSelector } from 'react-redux';
import {
  appSelector,
  toggleSnackbar,
} from '../../../modules/home/redux/AppSlice';

const StyledSnackbarWrapper = styled('div')(() => {
  const isRTL = localStorage.getItem('language') === 'ar';

  return {
    '& .css-1ytlwq5-MuiAlert-icon': {
      marginLeft: isRTL ? '12px' : '0px',
      marginRight: isRTL ? '0px' : '12px',
    },
  };
});

export default function Snackbar() {
  const dispatch = useDispatch();
  const { snackbar } = useSelector(appSelector);
  const isRTL = localStorage.getItem('language') === 'ar';
  const snackbarAnchor: SnackbarAnchorProps = isRTL
    ? { vertical: 'bottom', horizontal: 'left' }
    : { vertical: 'bottom', horizontal: 'right' };

  useEffect(() => {
    if (snackbar.open) {
      setTimeout(
        () =>
          dispatch(
            toggleSnackbar({
              open: !snackbar.open,
              message: snackbar.message,
              severity: snackbar.severity,
            })
          ),
        3500
      );
    }
  }, [snackbar.open, snackbar.message, snackbar.severity, dispatch]);

  return (
    <StyledSnackbarWrapper>
      <MuiSnackbar
        open={snackbar.open}
        autoHideDuration={6000}
        anchorOrigin={snackbarAnchor}
      >
        <Alert
          severity={snackbar.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </MuiSnackbar>
    </StyledSnackbarWrapper>
  );
}
