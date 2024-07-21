import { Link } from 'react-router-dom';
import { useFetchDoctorsQuery } from '../redux/DoctorAPI';
import { doctorDetails } from '../types/doctor';
import { lazy } from 'react';

const Loader = lazy(() => import('../../../shared/components/loader/Loader'));

export default function DoctorsList() {
  const { data: doctorsList, isLoading } = useFetchDoctorsQuery({});

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {doctorsList?.map((doctor: doctorDetails) => (
        <div key={doctor.id}>
          <h1>
            <Link to={`${doctor.id}`}>
              {doctor.firstName} {doctor.lastName}
            </Link>
          </h1>
          <p>{doctor.specialization}</p>
        </div>
      ))}
    </>
  );
}
