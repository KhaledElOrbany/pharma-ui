import doctorClassAPI from '@/modules/doctorClass/redux/DoctorClassAPI';
import AuthAPI from '../modules/auth/redux/AuthAPI';
import DoctorAPI from '../modules/doctor/redux/DoctorAPI';
import UserAPI from '../modules/user/redux/UserAPI';

const APIs = [AuthAPI, DoctorAPI, doctorClassAPI, UserAPI];

export default APIs;
