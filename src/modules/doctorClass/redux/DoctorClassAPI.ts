import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '@/redux/baseQuery';
import { doctorClassDetails, metaData } from '../types/DoctorClass';
import { generateUrlParams } from '@/helpers/utils/ParamsUtil';
import {
  setDoctorClassDetails,
  setDoctorClassesList,
} from './DoctorClassSlice';
import { Snackbar } from '@/helpers/components/Snackbar';

const DoctorClassAPI = createApi({
  reducerPath: 'DoctorClassAPI',
  refetchOnReconnect: true,
  tagTypes: ['doctorClass'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchDoctorClass: build.query({
      query: (id: Number) => ({
        url: `/doctorClass/${id}`,
      }),
      transformResponse: (response: {
        data: doctorClassDetails;
        meta?: {};
      }) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response.data;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setDoctorClassDetails(data));
          })
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      providesTags: ['doctorClass'],
    }),
    fetchDoctorClasss: build.query({
      query: (params) => ({
        url: `/doctorClass/list?${
          params.filters ? generateUrlParams([...params.filters]) : ''
        }`,
        method: 'GET',
      }),
      transformResponse: (response: {
        data: doctorClassDetails[];
        meta?: metaData;
      }) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response.data;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setDoctorClassesList(data));
          })
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      providesTags: ['doctorClass'],
    }),
    createDoctorClass: build.mutation({
      query: (body) => ({
        url: '/doctorClass',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            Snackbar(dispatch, 'DoctorClass created successfully', 'success');
          })
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      invalidatesTags: (error) => error ?? ['doctorClass'],
    }),
    updateDoctorClass: build.mutation({
      query: (body) => ({
        url: '/doctorClass',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            Snackbar(dispatch, 'DoctorClass updated successfully', 'success');
          })
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      invalidatesTags: (error) => error ?? ['doctorClass'],
    }),
    deleteDoctorClass: build.mutation({
      query: (id) => ({
        url: `/doctorClass/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            Snackbar(dispatch, 'DoctorClass deleted successfully', 'success');
          })
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      invalidatesTags: (error) => error ?? ['doctorClass'],
    }),
  }),
});

export const {
  useFetchDoctorClassQuery,
  useFetchDoctorClasssQuery,
  useCreateDoctorClassMutation,
  useUpdateDoctorClassMutation,
  useDeleteDoctorClassMutation,
} = DoctorClassAPI;
export default DoctorClassAPI;
