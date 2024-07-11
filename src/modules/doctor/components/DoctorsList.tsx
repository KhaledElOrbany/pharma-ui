import { useFetchDoctorsQuery } from '../../../redux/APIs/doctorAPI';
import { doctorDetails } from '../types/doctor';

export default function DoctorsList() {
  const { data: doctorsList, isLoading } = useFetchDoctorsQuery({});

  return isLoading ? (
    <>Loading...</>
  ) : (
    <>
      {doctorsList?.map((doctor: doctorDetails) => (
        <div key={doctor.id}>
          <h1>{doctor.firstName}</h1>
          <h1>{doctor.lastName}</h1>
          <p>{doctor.specialization}</p>
        </div>
      ))}
    </>
  );
}
