import { toggleSnackbar } from '@/modules/home/redux/AppSlice';

export const errorHandler = (dispatch: any, response: any) => {
  if (response?.status === 401) {
    localStorage.removeItem('token');
  }

  let message = 'An error has occurred!';
  if (response.error) {
    message = response.error;
  }

  return dispatch(
    toggleSnackbar({
      open: true,
      message: message,
      severity: 'error',
    })
  );
};
