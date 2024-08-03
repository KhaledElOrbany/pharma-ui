import DoctorClassSlice from '@/modules/doctorClass/redux/DoctorClassSlice';
import AuthSlice from '@/modules/auth/redux/AuthSlice';
import DoctorSlice from '@/modules/doctor/redux/DoctorSlice';
import AppSlice from '@/modules/home/redux/AppSlice';
import UserSlice from '@/modules/user/redux/UserSlice';
import MedicineSlice from '@/modules/medicine/redux/MedicineSlice';
import PharmacySlice from '@/modules/pharmacy/redux/PharmacySlice';

const Slices = [
  AppSlice,
  AuthSlice,
  DoctorSlice,
  DoctorClassSlice,
  MedicineSlice,
  PharmacySlice,
  UserSlice,
];

export default Slices;
