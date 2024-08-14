import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '@/redux/baseQuery';
import { Snackbar } from '@/helpers/components/Snackbar';
import { generateUrlParams } from '@/helpers/utils/ParamsUtil';
import { CityProps, GovernorateProps } from '../types/Address';

export const AddressAPI = createApi({
  reducerPath: 'addressAPI',
  refetchOnReconnect: true,
  tagTypes: ['cities', 'governorates'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchCities: build.query({
      query: (params) => ({
        url: `/city/list?${
          params.filters ? generateUrlParams([...params.filters]) : ''
        }`,
        method: 'GET',
      }),
      transformResponse: (result: { data: CityProps[] }) => {
        return result.data;
      },
      transformErrorResponse: (response) => {
        return response.data;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(() => {})
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      providesTags: ['cities'],
    }),
    fetchGovernorates: build.query<GovernorateProps[], void>({
      query: () => ({
        url: '/governorate/list',
        method: 'GET',
      }),
      transformResponse: (result: { data: GovernorateProps[] }) => {
        return result.data;
      },
      transformErrorResponse: (response) => {
        return response.data;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(() => {})
          .catch(({ error }) => {
            Snackbar(dispatch, error.data.error, 'error');
          });
      },
      providesTags: ['governorates'],
    }),
  }),
});

export const { useLazyFetchCitiesQuery, useLazyFetchGovernoratesQuery } =
  AddressAPI;
export default AddressAPI;
