import { RootState } from '@/redux/Store';
import { createSlice } from '@reduxjs/toolkit';
import { UserProps } from '../types/User';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {} as UserProps,
    userDetails: {} as UserProps,
    usersList: [] as UserProps[],
  },
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    setUserDetails: (state, { payload }) => {
      state.userDetails = payload;
    },
    setUsersList: (state, { payload }) => {
      state.usersList = payload;
    },
  },
});

export const { setCurrentUser, setUserDetails, setUsersList } =
  UserSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default UserSlice;
