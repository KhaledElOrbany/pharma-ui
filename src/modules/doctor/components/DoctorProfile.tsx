import { useParams } from 'react-router-dom';

type params = {
  id: string;
};

export default function DoctorProfile() {
  const { id } = useParams<params>();
  const numericId = id ? parseInt(id, 10) : NaN;

  if (isNaN(numericId)) {
    return <>Invalid ID</>;
  }

  return <div>{numericId}</div>;
}
