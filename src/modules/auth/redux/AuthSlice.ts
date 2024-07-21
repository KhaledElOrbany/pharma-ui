import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types/Auth';

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
export default AuthSlice;
