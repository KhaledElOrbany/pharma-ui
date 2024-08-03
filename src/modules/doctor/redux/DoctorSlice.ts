import { createSlice } from '@reduxjs/toolkit';
import { doctorDetails } from '../types/Doctor';
import { RootState } from '@/redux/Store';

const DoctorSlice = createSlice({
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
    updateDoctorsList: (state, { payload }) => {
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
  updateDoctorsList,
  removeDoctorFromList,
} = DoctorSlice.actions;
export const doctorSelector = (state: RootState) => state.doctor;
export default DoctorSlice;
