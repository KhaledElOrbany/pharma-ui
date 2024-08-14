import { toggleSnackbar } from '@/modules/home/redux/AppSlice';

export const Snackbar = (dispatch: any, response: string, severity: string) => {
  const message = response ?? 'An error has occurred!';

  return dispatch(
    toggleSnackbar({
      open: true,
      message: message,
      severity,
    })
  );
};
