import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types/Auth';
import { RootState } from '@/redux/Store';

const initialState: AuthState = {
  token: localStorage.getItem('token') ?? null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      state.token = payload.token;
    },
    logout: (state) => {
      state.token = '';
      localStorage.clear();
      window.location.reload();
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default AuthSlice;
