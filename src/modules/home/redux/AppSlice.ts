import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../types/App';
import { RootState } from '@/redux/Store';

const initialState: AppState = {
  snackbar: {
    open: false,
    message: '',
    severity: '',
  },
};

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSnackbar: (state, { payload }) => {
      state.snackbar.open = payload.open;
      state.snackbar.message = payload.message;
      state.snackbar.severity = payload.severity;
    },
  },
});

export const { toggleSnackbar } = AppSlice.actions;
export const appSelector = (state: RootState) => state.app;
export default AppSlice;
