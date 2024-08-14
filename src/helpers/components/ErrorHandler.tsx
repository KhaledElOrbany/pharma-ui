import { toggleSnackbar } from '@/modules/home/redux/AppSlice';

export const errorHandler = (dispatch: any, response: string) => {
  const message = response ?? 'An error has occurred!';

  return dispatch(
    toggleSnackbar({
      open: true,
      message: message,
      severity: 'error',
    })
  );
};
