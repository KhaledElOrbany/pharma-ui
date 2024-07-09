import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithoutAuth } from '../helpers/baseQuery';
import { setDoctorDetails } from '../../modules/doctor/state';

export const doctorAPI = createApi({
  reducerPath: 'doctorAPI',
  refetchOnReconnect: true,
  tagTypes: ['doctor'],
  baseQuery: customBaseQueryWithoutAuth,
  endpoints: (build) => ({
    fetchDoctor: build.query({
      query: (id: any) => ({
        url: `/doctor/${id}`,
      }),
      transformResponse: (result: any) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {
            dispatch(setDoctorDetails({ payload: result.data }));
          })
          .catch(({ error: err }) => {
            // eslint-disable-next-line no-console
            console.error(err);
          });
      },
      providesTags: ['doctor'],
    }),
    fetchDoctors: build.query({
      query: () => ({
        url: '/doctor/list',
      }),
      providesTags: ['doctor'],
    }),
  }),
});

export const { useFetchDoctorQuery, useFetchDoctorsQuery } = doctorAPI;
