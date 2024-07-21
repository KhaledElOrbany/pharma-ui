import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '../../../redux/baseQuery';
import { setDoctorDetails, setDoctorsList } from './DoctorSlice';

const doctorAPI = createApi({
  reducerPath: 'doctorAPI',
  refetchOnReconnect: true,
  tagTypes: ['doctor'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchDoctor: build.query({
      query: (id: Number) => ({
        url: `/doctor/${id}`,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setDoctorDetails(data));
          })
          .catch(() => {
            //TODO: Add error notification
          });
      },
      providesTags: ['doctor'],
    }),
    fetchDoctors: build.query({
      query: () => ({
        url: '/doctor/list',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setDoctorsList(data));
          })
          .catch(() => {
            //TODO: Add error notification
          });
      },
      providesTags: ['doctor'],
    }),
    createDoctor: build.mutation({
      query: (body) => ({
        url: '/doctor',
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
      invalidatesTags: ['doctor'],
    }),
    updateDoctor: build.mutation({
      query: (body) => ({
        url: '/doctor',
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
      invalidatesTags: ['doctor'],
    }),
    deleteDoctor: build.mutation({
      query: (id) => ({
        url: `/doctor/${id}`,
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
      invalidatesTags: ['doctor'],
    }),
  }),
});

export const {
  useFetchDoctorQuery,
  useFetchDoctorsQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorAPI;
export default doctorAPI;
