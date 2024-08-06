import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '@/redux/baseQuery';
import { generateUrlParams } from '@/helpers/utils/ParamsUtil';
import { setPharmacyDetails, setPharmacyesList } from './PharmacySlice';
import { metaData, pharmacyDetails } from '../types/Pharmacy';
import { errorHandler } from '@/helpers/components/ErrorHandler';

const pharmacyAPI = createApi({
  reducerPath: 'pharmacyAPI',
  refetchOnReconnect: true,
  tagTypes: ['pharmacy'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchPharmacy: build.query({
      query: (id: Number) => ({
        url: `/pharmacy/${id}`,
      }),
      transformResponse: (response: { data: pharmacyDetails; meta?: {} }) => {
        return response;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data, meta }) => {
            if (meta?.response?.headers) {
              // handle resetting token
            }
            dispatch(setPharmacyDetails(data));
          })
          .catch(() => {
            // Handle error
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setPharmacyesList(data));
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error);
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
            //TODO: Add success notification
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: ['pharmacy'],
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
            //TODO: Add success notification
          })
          .catch(({ error }) => {
            errorHandler(dispatch, error);
          });
      },
      invalidatesTags: ['pharmacy'],
    }),
    deletePharmacy: build.mutation({
      query: (id) => ({
        url: `/pharmacy/${id}`,
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
      invalidatesTags: ['pharmacy'],
    }),
  }),
});

export const {
  useFetchPharmacyQuery,
  useFetchPharmacysQuery,
  useCreatePharmacyMutation,
  useUpdatePharmacyMutation,
  useDeletePharmacyMutation,
} = pharmacyAPI;
export default pharmacyAPI;
