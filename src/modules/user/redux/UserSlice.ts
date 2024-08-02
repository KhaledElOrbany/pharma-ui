import { doctorDetails } from '@/modules/doctor/types/Doctor';
import { createSlice } from '@reduxjs/toolkit';

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
