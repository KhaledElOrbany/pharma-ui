import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '@/redux/baseQuery';
import { generateUrlParams } from '@/helpers/utils/ParamsUtil';
import { medicineDetails } from '../types/Medicine';
import { setMedicineDetails, setMedicineesList } from './MedicineSlice';

const medicineAPI = createApi({
  reducerPath: 'medicineAPI',
  refetchOnReconnect: true,
  tagTypes: ['medicine'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchMedicine: build.query({
      query: (id: Number) => ({
        url: `/medicine/${id}`,
      }),
      transformResponse: (response: { data: medicineDetails; meta?: {} }) => {
        return response;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data, meta }) => {
            if (meta?.response?.headers) {
              // handle resetting token
            }
            dispatch(setMedicineDetails(data));
          })
          .catch(() => {
            // Handle error
          });
      },
      providesTags: ['medicine'],
    }),
    fetchMedicines: build.query({
      query: (params) => ({
        url: `/medicine/list?${
          params.filters ? generateUrlParams([...params.filters]) : ''
        }`,
        method: 'GET',
      }),
      transformResponse: (response: { data: medicineDetails[]; meta?: {} }) => {
        return response;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setMedicineesList(data));
          })
          .catch(() => {
            //TODO: Add error notification
          });
      },
      providesTags: ['medicine'],
    }),
    createMedicine: build.mutation({
      query: (body) => ({
        url: '/medicine',
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
      invalidatesTags: ['medicine'],
    }),
    updateMedicine: build.mutation({
      query: (body) => ({
        url: '/medicine',
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
      invalidatesTags: ['medicine'],
    }),
    deleteMedicine: build.mutation({
      query: (id) => ({
        url: `/medicine/${id}`,
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
      invalidatesTags: ['medicine'],
    }),
  }),
});

export const {
  useFetchMedicineQuery,
  useFetchMedicinesQuery,
  useCreateMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} = medicineAPI;
export default medicineAPI;
