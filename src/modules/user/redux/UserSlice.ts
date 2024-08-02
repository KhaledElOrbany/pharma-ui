import { doctorDetails } from '@/modules/doctor/types/Doctor';
import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {} as doctorDetails,
    doctorDetails: {} as doctorDetails,
    doctorsList: [] as doctorDetails[],
  },
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    setUserDetails: (state, { payload }) => {
      state.doctorDetails = payload;
    },
    setUsersList: (state, { payload }) => {
      state.doctorsList = payload;
    },
  },
});

export const { setCurrentUser, setUserDetails, setUsersList } =
  UserSlice.actions;
export default UserSlice;
