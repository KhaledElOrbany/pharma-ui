import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithoutAuth } from '@/redux/baseQuery';
import { login } from './AuthSlice';
import { Snackbar } from '@/helpers/components/Snackbar';
import { LoginResponse } from '../types/Auth';

export const AuthAPI = createApi({
  reducerPath: 'authAPI',
  refetchOnReconnect: true,
  tagTypes: ['auth'],
  baseQuery: customBaseQueryWithoutAuth,
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (result: { data: LoginResponse }) => {
        return result.data;
      },
      transformErrorResponse: (response) => {
        return response.data;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data }) => {
            dispatch(login({ token: data.token }));
          })
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      invalidatesTags: (error) => (error ? [] : ['auth']),
    }),
  }),
});

export const { useLoginMutation } = AuthAPI;
export default AuthAPI;
