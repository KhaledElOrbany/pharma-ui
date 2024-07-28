import { createSlice } from '@reduxjs/toolkit';
import { doctorDetails } from '../../doctor/types/Doctor';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    doctorDetails: {} as doctorDetails,
    doctorsList: [] as doctorDetails[],
  },
  reducers: {
    setUserDetails: (state, { payload }) => {
      state.doctorDetails = payload;
    },
    setUsersList: (state, { payload }) => {
      state.doctorsList = payload;
    },
  },
});

export const { setUserDetails, setUsersList } = UserSlice.actions;
export default UserSlice;
