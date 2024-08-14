import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '@/redux/baseQuery';
import { setDoctorDetails, setDoctorsList } from './DoctorSlice';
import { doctorDetails, metaData } from '../types/Doctor';
import { generateUrlParams } from '@/helpers/utils/ParamsUtil';
import { errorHandler } from '@/helpers/components/ErrorHandler';

const DoctorAPI = createApi({
  reducerPath: 'DoctorAPI',
  refetchOnReconnect: true,
  tagTypes: ['doctor'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchDoctor: build.query({
      query: (id: Number) => ({
        url: `/doctor/${id}`,
      }),
      transformResponse: (response: { data: doctorDetails }) => {
        return response;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setDoctorDetails(data));
          })
          .catch(() => {
            // Handle error
          });
      },
      providesTags: ['doctor'],
    }),
    fetchDoctors: build.query({
      query: (params) => ({
        url: `/doctor/list?${
          params.filters ? generateUrlParams([...params.filters]) : ''
        }`,
        method: 'GET',
      }),
      transformResponse: (response: {
        data: doctorDetails[];
        meta?: metaData;
      }) => {
        return response;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setDoctorsList(data));
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error);
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {})
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: (error) => error ?? ['doctor'],
    }),
    updateDoctor: build.mutation({
      query: (body) => ({
        url: '/doctor',
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
      invalidatesTags: (error) => error ?? ['doctor'],
    }),
    deleteDoctor: build.mutation({
      query: (id) => ({
        url: `/doctor/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {})
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: (error) => error ?? ['doctor'],
    }),
  }),
});

export const {
  useFetchDoctorQuery,
  useFetchDoctorsQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = DoctorAPI;
export default DoctorAPI;
