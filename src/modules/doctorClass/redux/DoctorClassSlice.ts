import { createSlice } from '@reduxjs/toolkit';
import { doctorClassDetails } from '../types/DoctorClass';
import { RootState } from '@/redux/Store';

const DoctorClassSlice = createSlice({
  name: 'doctorClass',
  initialState: {
    doctorDetails: {} as doctorClassDetails,
    doctorsList: [] as doctorClassDetails[],
  },
  reducers: {
    setDoctorClassDetails: (state, { payload }) => {
      state.doctorDetails = payload;
    },
    setDoctorClassesList: (state, { payload }) => {
      state.doctorsList = payload;
    },
    updateDoctorClassList: (state, { payload }) => {
      state.doctorsList = state.doctorsList.map((dc: doctorClassDetails) => {
        if (dc.id === payload.id) {
          return payload;
        }
        return dc;
      });
    },
    removeDoctorClassFromList: (state, { payload }) => {
      state.doctorsList = state.doctorsList.filter(
        (doctor) => doctor.id !== payload.id
      );
    },
  },
});

export const {
  setDoctorClassDetails,
  setDoctorClassesList,
  updateDoctorClassList,
  removeDoctorClassFromList,
} = DoctorClassSlice.actions;
export const doctorClassSelector = (state: RootState) => state.doctorClass;
export default DoctorClassSlice;
