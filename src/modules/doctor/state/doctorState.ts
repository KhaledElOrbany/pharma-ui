import { createSlice } from '@reduxjs/toolkit';
import { doctorDetails } from '../types/doctor';

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctorDetails: {} as doctorDetails,
    doctorsList: [] as doctorDetails[],
  },
  reducers: {
    setDoctorDetails: (state, action) => {
      state.doctorDetails = action.payload;
    },
    setDoctorsList: (state, action) => {
      state.doctorsList = action.payload;
    },
    updateDoctorList: (state, action) => {
      state.doctorsList = state.doctorsList.map((doctor: doctorDetails) => {
        if (doctor.id === action.payload.id) {
          return action.payload;
        }
        return doctor;
      });
    },
    removeDoctorFromList: (state, action) => {
      state.doctorsList = state.doctorsList.filter(
        (doctor) => doctor.id !== action.payload.id
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
