import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/Store';
import { pharmacyDetails } from '../types/Pharmacy';

const PharmacySlice = createSlice({
  name: 'pharmacy',
  initialState: {
    pharmacyDetails: {} as pharmacyDetails,
    pharmacysList: [] as pharmacyDetails[],
  },
  reducers: {
    setPharmacyDetails: (state, { payload }) => {
      state.pharmacyDetails = payload;
    },
    setPharmacyesList: (state, { payload }) => {
      state.pharmacysList = payload;
    },
    updatePharmacyList: (state, { payload }) => {
      state.pharmacysList = state.pharmacysList.map((dc: pharmacyDetails) => {
        if (dc.id === payload.id) {
          return payload;
        }
        return dc;
      });
    },
    removePharmacyFromList: (state, { payload }) => {
      state.pharmacysList = state.pharmacysList.filter(
        (med) => med.id !== payload.id
      );
    },
  },
});

export const {
  setPharmacyDetails,
  setPharmacyesList,
  updatePharmacyList,
  removePharmacyFromList,
} = PharmacySlice.actions;
export const pharmacySelector = (state: RootState) => state.pharmacy;
export default PharmacySlice;
