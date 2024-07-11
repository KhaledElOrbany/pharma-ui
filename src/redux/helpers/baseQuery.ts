import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
// import store from '../store';

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export const buildURLQueryParams = (queryParams: any) => {
  const urlParams = new URLSearchParams();

  for (const key in queryParams) {
    if (queryParams[key] && typeof queryParams[key] !== 'object') {
      urlParams.append(key, queryParams[key]);
    } else if (queryParams[key] instanceof Array && !!queryParams[key].length) {
      urlParams.append(key, queryParams[key].join(','));
    }
  }

  return urlParams.toString();
};

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, _) => {
    // const token = store.getState().auth.token;
    headers.set('Accept', `application/json`);
    headers.set('Content-Type', `application/json`);
    // headers.set('Authorization', `Bearer ${token}`);
    headers.set('lang', localStorage?.getItem('language') ?? 'ar');

    return headers;
  },
  paramsSerializer: buildURLQueryParams,
});

export const customBaseQueryWithAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  return await baseQueryWithAuth(args, api, extraOptions);
};

const baseQueryWithoutAuth = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, _) => {
    headers.set('Accept', `application/json`);
    headers.set('Content-Type', `application/json`);
    headers.set('lang', localStorage?.getItem('language') ?? 'ar');

    return headers;
  },
  paramsSerializer: buildURLQueryParams,
});

export const customBaseQueryWithoutAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  return await baseQueryWithoutAuth(args, api, extraOptions);
};
