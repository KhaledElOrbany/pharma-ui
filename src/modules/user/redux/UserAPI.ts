import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '@/redux/baseQuery';
import { setCurrentUser, setUserDetails, setUsersList } from './UserSlice';
import { UserMetaData, UserProps } from '../types/User';
import { generateUrlParams } from '@/helpers/utils/ParamsUtil';
import { errorHandler } from '@/helpers/components/ErrorHandler';
import { login } from '@/modules/auth/redux/AuthSlice';

const UserAPI = createApi({
  reducerPath: 'UserAPI',
  refetchOnReconnect: true,
  tagTypes: ['user'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchCurrentUser: build.query<UserProps, void>({
      query: () => ({
        url: `/user/current`,
        method: 'GET',
      }),
      transformResponse: (response: { data: UserProps }) => {
        return response.data;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data, meta }) => {
            const token = meta?.response?.headers.get('authorization');
            if (token) {
              dispatch(login({ token }));
            }
            dispatch(setCurrentUser(data));
          })
          .catch(() => {
            // Handle error
          });
      },
      providesTags: ['user'],
    }),
    fetchUser: build.query({
      query: (id: Number) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: UserProps }) => {
        return response.data;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setUserDetails(data));
          })
          .catch(() => {
            // Handle error
          });
      },
      providesTags: ['user'],
    }),
    fetchUsers: build.query({
      query: (params) => ({
        url: `/user/list?${
          params.filters ? generateUrlParams([...params.filters]) : ''
        }`,
        method: 'GET',
      }),
      transformResponse: (response: {
        data: UserProps[];
        meta?: UserMetaData;
      }) => {
        return response;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setUsersList(data));
          })
          .catch(() => {
            // Handle error
          });
      },
      providesTags: ['user'],
    }),
    createUser: build.mutation({
      query: (body) => ({
        url: '/user/create',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {})
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: (error) => error ?? ['user'],
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: `/user/update/${body.id}`,
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {})
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: (error) => error ?? ['user'],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {})
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: (error) => error ?? ['user'],
    }),
  }),
});

export const {
  useLazyFetchCurrentUserQuery,
  useFetchUserQuery,
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserAPI;
export default UserAPI;
