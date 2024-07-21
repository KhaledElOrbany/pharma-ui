import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithoutAuth } from '../../../redux/helpers/baseQuery';
import { login } from './AuthSlice';

export const authAPI = createApi({
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ result }: any) => {
            dispatch(login({ token: result }));
          })
          .catch(() => {
            //TODO: Add error notification
          });
      },
      invalidatesTags: (error) => (error ? [] : ['auth']),
    }),
  }),
});

export const { useLoginMutation } = authAPI;
