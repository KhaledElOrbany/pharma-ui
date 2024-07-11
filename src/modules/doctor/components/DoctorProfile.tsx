import { useParams } from 'react-router-dom';

export default function DoctorProfile() {
  const { id } = useParams();

  return <div>{id}</div>;
}
