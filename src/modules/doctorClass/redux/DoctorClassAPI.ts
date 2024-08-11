import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '@/redux/baseQuery';
import { doctorClassDetails, metaData } from '../types/DoctorClass';
import { generateUrlParams } from '@/helpers/utils/ParamsUtil';
import {
  setDoctorClassDetails,
  setDoctorClassesList,
} from './DoctorClassSlice';
import { errorHandler } from '@/helpers/components/ErrorHandler';

const doctorClassAPI = createApi({
  reducerPath: 'doctorClassAPI',
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setDoctorClassDetails(data));
          })
          .catch(() => {
            // Handle error
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setDoctorClassesList(data));
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error);
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
            //TODO: Add success notification
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: ['doctorClass'],
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
            //TODO: Add success notification
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: ['doctorClass'],
    }),
    deleteDoctorClass: build.mutation({
      query: (id) => ({
        url: `/doctorClass/${id}`,
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
      invalidatesTags: ['doctorClass'],
    }),
  }),
});

export const {
  useFetchDoctorClassQuery,
  useFetchDoctorClasssQuery,
  useCreateDoctorClassMutation,
  useUpdateDoctorClassMutation,
  useDeleteDoctorClassMutation,
} = doctorClassAPI;
export default doctorClassAPI;
