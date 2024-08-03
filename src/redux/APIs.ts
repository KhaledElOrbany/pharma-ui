import doctorClassAPI from '@/modules/doctorClass/redux/DoctorClassAPI';
import AuthAPI from '../modules/auth/redux/AuthAPI';
import DoctorAPI from '../modules/doctor/redux/DoctorAPI';
import UserAPI from '../modules/user/redux/UserAPI';
import pharmacyAPI from '@/modules/pharmacy/redux/PharmacyAPI';
import medicineAPI from '@/modules/medicine/redux/MedicineAPI';

const APIs = [
  AuthAPI,
  DoctorAPI,
  doctorClassAPI,
  pharmacyAPI,
  medicineAPI,
  UserAPI,
];

export default APIs;
