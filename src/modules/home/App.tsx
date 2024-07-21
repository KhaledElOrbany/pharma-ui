import { RouterProvider } from 'react-router-dom';
import Router from '../../routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

export default function App() {
  const { token } = useSelector((state: RootState) => state.auth);
  return <RouterProvider router={Router} />;
}
