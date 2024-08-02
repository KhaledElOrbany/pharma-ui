import { useEffect, useLayoutEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from '@/routes';
import i18n from '@/i18n/index';
import { Snackbar } from '@/shared/components/snackbar';
import { useSelector } from 'react-redux';
import { authSelector } from '../auth/redux/AuthSlice';
import { useLazyFetchCurrentUserQuery } from '../user/redux/UserAPI';

export default function App() {
  const { token } = useSelector(authSelector);

  const [getCurrentUser] = useLazyFetchCurrentUserQuery();

  useLayoutEffect(() => {
    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir;

    const lang = localStorage.getItem('language');
    if (!lang) {
      localStorage.setItem('language', i18n.language);
    }
  }, []);

  useEffect(() => {
    if (token) {
      (async () => {
        await getCurrentUser();
      })();
    }
  }, [token]);

  return (
    <>
      <Snackbar />
      <RouterProvider router={Router} />
    </>
  );
}
