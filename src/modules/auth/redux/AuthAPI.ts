import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithoutAuth } from '../../../redux/baseQuery';
import { login } from './AuthSlice';

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
      transformResponse: (result) => result,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data }: any) => {
            dispatch(login({ token: data.token }));
          })
          .catch(() => {
            //TODO: Add error notification
          });
      },
      invalidatesTags: (error) => (error ? [] : ['auth']),
    }),
  }),
});

export const { useLoginMutation } = AuthAPI;
export default AuthAPI;
