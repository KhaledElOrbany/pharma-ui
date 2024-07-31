import { RouterProvider } from 'react-router-dom';
import Router from '../../routes';
import { useEffect } from 'react';
import i18n from '../../i18n';
import { Snackbar } from '../../shared/components/snackbar';

export default function App() {
  useEffect(() => {
    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir;

    const lang = localStorage.getItem('language');
    if (!lang) {
      localStorage.setItem('language', i18n.language);
    }
  }, []);

  return (
    <>
      <Snackbar />
      <RouterProvider router={Router} />
    </>
  );
}
