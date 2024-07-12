import { RouterProvider } from 'react-router-dom';
import Router from '../../routes';
import './styles/App.css';

export default function App() {
  return <RouterProvider router={Router} />;
}
