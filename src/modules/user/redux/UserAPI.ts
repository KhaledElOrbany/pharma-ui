import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '@/redux/baseQuery';
import { setCurrentUser, setUserDetails, setUsersList } from './UserSlice';
import { metaData, userDetails } from '../types/User';
import { generateUrlParams } from '@/helpers/utils/ParamsUtil';
import { errorHandler } from '@/helpers/components/ErrorHandler';

const UserAPI = createApi({
  reducerPath: 'userAPI',
  refetchOnReconnect: true,
  tagTypes: ['user'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchCurrentUser: build.query<userDetails, void>({
      query: () => ({
        url: `/user/current`,
        method: 'GET',
      }),
      transformResponse: (response: { data: userDetails; meta?: {} }) =>
        response.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data, meta }) => {
            if (meta?.response?.headers) {
              // handle resetting token
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
      transformResponse: (response: { data: userDetails; meta?: {} }) => {
        return response.data;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data, meta }) => {
            if (meta?.response?.headers) {
              // handle resetting token
            }
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
        data: userDetails[];
        meta?: metaData;
      }) => {
        return response;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data, meta }) => {
            if (meta?.response?.headers) {
              // handle resetting token
            }
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
        url: '/user',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            //TODO: Add success notification
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: ['user'],
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: '/user',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            //TODO: Add success notification
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: ['user'],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            //TODO: Add success notification
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: ['user'],
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
