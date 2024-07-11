import { useFetchDoctorsQuery } from '../../redux/APIs/doctorAPI';

export default function DoctorRoot() {
  const { data } = useFetchDoctorsQuery({});

  return <div>{data}</div>;
}
