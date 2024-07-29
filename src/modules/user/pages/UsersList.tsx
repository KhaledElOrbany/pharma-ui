import { Link } from 'react-router-dom';
import { lazy } from 'react';
import { useFetchUsersQuery } from '../redux/UserAPI';
import { userDetails } from '../types/User';

const Loader = lazy(() => import('../../../shared/components/loader/Loader'));

export default function UsersList() {
  const { data: doctorsList, isLoading } = useFetchUsersQuery({});

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {doctorsList?.map((user: userDetails) => (
        <div key={user.id}>
          <h1>
            <Link to={`/user/${user.id}`}>
              {user.firstName} {user.lastName}
            </Link>
          </h1>
        </div>
      ))}
    </>
  );
}
