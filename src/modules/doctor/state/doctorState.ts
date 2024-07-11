import { createSlice } from '@reduxjs/toolkit';

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctorDetails: {},
    doctorsList: [],
  },
  reducers: {
    setDoctorDetails: (state, action) => {
      state.doctorDetails = action.payload;
    },
    setDoctorsList: (state, action) => {
      state.doctorsList = action.payload;
    },
  },
});

export const { setDoctorDetails, setDoctorsList } = doctorSlice.actions;
export default doctorSlice.reducer;
