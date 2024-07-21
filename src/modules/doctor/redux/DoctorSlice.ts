import { createSlice } from '@reduxjs/toolkit';
import { doctorDetails } from '../types/doctor';

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctorDetails: {} as doctorDetails,
    doctorsList: [] as doctorDetails[],
  },
  reducers: {
    setDoctorDetails: (state, { payload }) => {
      state.doctorDetails = payload;
    },
    setDoctorsList: (state, { payload }) => {
      state.doctorsList = payload;
    },
    updateDoctorList: (state, { payload }) => {
      state.doctorsList = state.doctorsList.map((doctor: doctorDetails) => {
        if (doctor.id === payload.id) {
          return payload;
        }
        return doctor;
      });
    },
    removeDoctorFromList: (state, { payload }) => {
      state.doctorsList = state.doctorsList.filter(
        (doctor) => doctor.id !== payload.id
      );
    },
  },
});

export const {
  setDoctorDetails,
  setDoctorsList,
  updateDoctorList,
  removeDoctorFromList,
} = doctorSlice.actions;
export default doctorSlice.reducer;
