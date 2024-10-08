import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '@/redux/baseQuery';
import { generateUrlParams } from '@/helpers/utils/ParamsUtil';
import { setPharmacyDetails, setPharmacyesList } from './PharmacySlice';
import { metaData, pharmacyDetails } from '../types/Pharmacy';
import { Snackbar } from '@/helpers/components/Snackbar';

const PharmacyAPI = createApi({
  reducerPath: 'PharmacyAPI',
  refetchOnReconnect: true,
  tagTypes: ['pharmacy'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchPharmacy: build.query({
      query: (id: Number) => ({
        url: `/pharmacy/${id}`,
      }),
      transformResponse: (response: { data: pharmacyDetails }) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response.data;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setPharmacyDetails(data));
          })
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      providesTags: ['pharmacy'],
    }),
    fetchPharmacys: build.query({
      query: (params) => ({
        url: `/pharmacy/list?${
          params.filters ? generateUrlParams([...params.filters]) : ''
        }`,
        method: 'GET',
      }),
      transformResponse: (response: {
        data: pharmacyDetails[];
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
            dispatch(setPharmacyesList(data));
          })
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      providesTags: ['pharmacy'],
    }),
    createPharmacy: build.mutation({
      query: (body) => ({
        url: '/pharmacy',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            Snackbar(dispatch, 'Pharmacy created successfully', 'success');
          })
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      invalidatesTags: (error) => error ?? ['pharmacy'],
    }),
    updatePharmacy: build.mutation({
      query: (body) => ({
        url: '/pharmacy',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            Snackbar(dispatch, 'Pharmacy updated successfully', 'success');
          })
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      invalidatesTags: (error) => error ?? ['pharmacy'],
    }),
    deletePharmacy: build.mutation({
      query: (id) => ({
        url: `/pharmacy/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(() => {
            Snackbar(dispatch, 'Pharmacy deleted successfully', 'success');
          })
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      invalidatesTags: (error) => error ?? ['pharmacy'],
    }),
  }),
});

export const {
  useFetchPharmacyQuery,
  useFetchPharmacysQuery,
  useCreatePharmacyMutation,
  useUpdatePharmacyMutation,
  useDeletePharmacyMutation,
} = PharmacyAPI;
export default PharmacyAPI;
