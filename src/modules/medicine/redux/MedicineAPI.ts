import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '@/redux/baseQuery';
import { generateUrlParams } from '@/helpers/utils/ParamsUtil';
import { medicineDetails, metaData } from '../types/Medicine';
import { setMedicineDetails, setMedicineesList } from './MedicineSlice';
import { errorHandler } from '@/helpers/components/ErrorHandler';

const MedicineAPI = createApi({
  reducerPath: 'MedicineAPI',
  refetchOnReconnect: true,
  tagTypes: ['medicine'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchMedicine: build.query({
      query: (id: Number) => ({
        url: `/medicine/${id}`,
      }),
      transformResponse: (response: { data: medicineDetails }) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response.data;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setMedicineDetails(data));
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error.data.error);
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
      transformResponse: (response: {
        data: medicineDetails[];
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
            dispatch(setMedicineesList(data));
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error.data.error);
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {})
          .catch(({ error }) => {
            errorHandler(dispatch, error.data.error);
          });
      },
      invalidatesTags: (error) => error ?? ['medicine'],
    }),
    updateMedicine: build.mutation({
      query: (body) => ({
        url: '/medicine',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {})
          .catch(({ error }) => {
            errorHandler(dispatch, error.data.error);
          });
      },
      invalidatesTags: (error) => error ?? ['medicine'],
    }),
    deleteMedicine: build.mutation({
      query: (id) => ({
        url: `/medicine/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {})
          .catch(({ error }) => {
            errorHandler(dispatch, error.data.error);
          });
      },
      invalidatesTags: (error) => error ?? ['medicine'],
    }),
  }),
});

export const {
  useFetchMedicineQuery,
  useFetchMedicinesQuery,
  useCreateMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} = MedicineAPI;
export default MedicineAPI;
