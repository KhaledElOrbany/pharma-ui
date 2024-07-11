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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setDoctorDetails({ payload: data }));
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(setDoctorsList({ payload: data }));
          })
          .catch(() => {});
      },
      providesTags: ['doctor'],
    }),
  }),
});

export const { useFetchDoctorQuery, useFetchDoctorsQuery } = doctorAPI;
export default doctorAPI;
