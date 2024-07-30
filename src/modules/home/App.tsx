import { RouterProvider } from 'react-router-dom';
import Router from '../../routes';
import { useSelector } from 'react-redux';
import { authSelector } from './redux/AppSlice';

export default function App() {
  const { token } = useSelector(authSelector);
  return <RouterProvider router={Router} />;
}
