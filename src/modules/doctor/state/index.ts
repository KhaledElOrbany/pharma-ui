import { createSlice } from '@reduxjs/toolkit';

type DoctorState = {
  doctorDetails: Object;
  doctorsList: Array<Object>;
};

const initialState = {
  doctorDetails: {},
  doctorsList: [],
} satisfies DoctorState as DoctorState;

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
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
