import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '@/redux/baseQuery';
import { doctorClassDetails } from '../types/DoctorClass';
import { generateUrlParams } from '@/helpers/utils/ParamsUtil';
import {
  setDoctorClassDetails,
  setDoctorClassesList,
} from './DoctorClassSlice';

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
          .then(({ data, meta }) => {
            if (meta?.response?.headers) {
              // handle resetting token
            }
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
        meta?: {};
      }) => {
        return response;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setDoctorClassesList(data));
          })
          .catch(() => {
            //TODO: Add error notification
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
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            //TODO: Add success notification
          })
          .catch(() => {
            //TODO: Add error notification
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
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            //TODO: Add success notification
          })
          .catch(() => {
            //TODO: Add error notification
          });
      },
      invalidatesTags: ['doctorClass'],
    }),
    deleteDoctorClass: build.mutation({
      query: (id) => ({
        url: `/doctorClass/${id}`,
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
