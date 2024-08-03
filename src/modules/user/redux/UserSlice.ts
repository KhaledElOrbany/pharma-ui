import { RootState } from '@/redux/Store';
import { createSlice } from '@reduxjs/toolkit';
import { userDetails } from '../types/User';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {} as userDetails,
    userDetails: {} as userDetails,
    usersList: [] as userDetails[],
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
