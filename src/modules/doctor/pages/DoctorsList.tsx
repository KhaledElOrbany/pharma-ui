import { Link } from 'react-router-dom';
import { useFetchDoctorsQuery } from '../redux/doctorAPI';
import { doctorDetails } from '../types/doctor';

export default function DoctorsList() {
  const { data: doctorsList, isLoading } = useFetchDoctorsQuery({});

  return isLoading ? (
    <>Loading...</>
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
