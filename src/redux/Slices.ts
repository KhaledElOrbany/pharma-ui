import DoctorClassSlice from '@/modules/doctorClass/redux/DoctorClassSlice';
import AuthSlice from '../modules/auth/redux/AuthSlice';
import DoctorSlice from '../modules/doctor/redux/DoctorSlice';
import AppSlice from '../modules/home/redux/AppSlice';
import UserSlice from '../modules/user/redux/UserSlice';

const Slices = [AppSlice, AuthSlice, DoctorSlice, DoctorClassSlice, UserSlice];

export default Slices;
