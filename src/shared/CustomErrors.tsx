import { useRouteError } from 'react-router-dom';

export default function CustomErrors() {
  const error = useRouteError();

  return <div></div>;
}
