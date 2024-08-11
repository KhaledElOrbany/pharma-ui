import AddressAPI from '@/modules/address/redux/AddressAPI';
import AuthAPI from '@/modules/auth/redux/AuthAPI';
import DoctorAPI from '@/modules/doctor/redux/DoctorAPI';
import DoctorClassAPI from '@/modules/doctorClass/redux/DoctorClassAPI';
import MedicineAPI from '@/modules/medicine/redux/MedicineAPI';
import PharmacyAPI from '@/modules/pharmacy/redux/PharmacyAPI';
import UserAPI from '@/modules/user/redux/UserAPI';

const APIs = [
  AddressAPI,
  AuthAPI,
  DoctorAPI,
  DoctorClassAPI,
  PharmacyAPI,
  MedicineAPI,
  UserAPI,
];

export default APIs;
