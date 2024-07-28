import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '../../../redux/baseQuery';
import { setUserDetails, setUsersList } from './UserSlice';

const UserAPI = createApi({
  reducerPath: 'userAPI',
  refetchOnReconnect: true,
  tagTypes: ['user'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchUser: build.query({
      query: (id: Number) => ({
        url: `/user/${id}`,
      }),
      transformResponse: (result: { data: {}; meta?: {} }) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setUserDetails(data));
          })
          .catch(() => {
            //TODO: Add error notification
          });
      },
      providesTags: ['user'],
    }),
    fetchUsers: build.query({
      query: () => ({
        url: '/user/list',
        method: 'GET',
      }),
      transformResponse: (result: { data: []; meta?: {} }) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setUsersList(data));
          })
          .catch(() => {
            //TODO: Add error notification
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
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            //TODO: Add success notification
          })
          .catch(() => {
            //TODO: Add error notification
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
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            //TODO: Add success notification
          })
          .catch(() => {
            //TODO: Add error notification
          });
      },
      invalidatesTags: ['user'],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            //TODO: Add success notification
          })
          .catch(() => {
            //TODO: Add error notification
          });
      },
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useFetchUserQuery,
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserAPI;
export default UserAPI;
