import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithoutAuth } from '../helpers/baseQuery';
import {
  setDoctorDetails,
  setDoctorsList,
} from '../../modules/doctor/state/doctorState';

const doctorAPI = createApi({
  reducerPath: 'doctorAPI',
  refetchOnReconnect: true,
  tagTypes: ['doctor'],
  baseQuery: customBaseQueryWithoutAuth,
  endpoints: (build) => ({
    fetchDoctor: build.query({
      query: (id: Number) => ({
        url: `/doctor/${id}`,
      }),
      transformResponse: (result: any) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {
            dispatch(setDoctorDetails({ payload: result.data }));
          })
          .catch(() => {});
      },
      providesTags: ['doctor'],
    }),
    fetchDoctors: build.query({
      query: () => ({
        url: '/doctor/list',
        method: 'GET',
      }),
      transformResponse: (result: any) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {
            dispatch(setDoctorsList({ payload: result.data }));
          })
          .catch(() => {});
      },
      providesTags: ['doctor'],
    }),
  }),
});

export const { useFetchDoctorQuery, useFetchDoctorsQuery } = doctorAPI;
export default doctorAPI;
