import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/Store';
import { medicineDetails } from '../types/Medicine';

const MedicineSlice = createSlice({
  name: 'medicine',
  initialState: {
    medicineDetails: {} as medicineDetails,
    medicinesList: [] as medicineDetails[],
  },
  reducers: {
    setMedicineDetails: (state, { payload }) => {
      state.medicineDetails = payload;
    },
    setMedicineesList: (state, { payload }) => {
      state.medicinesList = payload;
    },
    updateMedicineList: (state, { payload }) => {
      state.medicinesList = state.medicinesList.map((dc: medicineDetails) => {
        if (dc.id === payload.id) {
          return payload;
        }
        return dc;
      });
    },
    removeMedicineFromList: (state, { payload }) => {
      state.medicinesList = state.medicinesList.filter(
        (med) => med.id !== payload.id
      );
    },
  },
});

export const {
  setMedicineDetails,
  setMedicineesList,
  updateMedicineList,
  removeMedicineFromList,
} = MedicineSlice.actions;
export const medicineSelector = (state: RootState) => state.medicine;
export default MedicineSlice;
