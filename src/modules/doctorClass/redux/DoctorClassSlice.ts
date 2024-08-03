import { createSlice } from '@reduxjs/toolkit';
import { doctorClassDetails } from '../types/DoctorClass';
import { RootState } from '@/redux/Store';

const DoctorClassSlice = createSlice({
  name: 'doctorClass',
  initialState: {
    doctorClassDetails: {} as doctorClassDetails,
    doctorClassesList: [] as doctorClassDetails[],
  },
  reducers: {
    setDoctorClassDetails: (state, { payload }) => {
      state.doctorClassDetails = payload;
    },
    setDoctorClassesList: (state, { payload }) => {
      state.doctorClassesList = payload;
    },
    updateDoctorClassesList: (state, { payload }) => {
      state.doctorClassesList = state.doctorClassesList.map(
        (dc: doctorClassDetails) => {
          if (dc.id === payload.id) {
            return payload;
          }
          return dc;
        }
      );
    },
    removeDoctorClassFromList: (state, { payload }) => {
      state.doctorClassesList = state.doctorClassesList.filter(
        (doctor) => doctor.id !== payload.id
      );
    },
  },
});

export const {
  setDoctorClassDetails,
  setDoctorClassesList,
  updateDoctorClassesList,
  removeDoctorClassFromList,
} = DoctorClassSlice.actions;
export const doctorClassSelector = (state: RootState) => state.doctorClass;
export default DoctorClassSlice;
