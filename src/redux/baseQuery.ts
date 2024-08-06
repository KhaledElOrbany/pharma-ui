import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import Store from './Store';

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export const buildURLQueryParams = (
  queryParams: Record<string, any>
): string => {
  const urlParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value && typeof value !== 'object') {
      urlParams.append(key, value);
    } else if (Array.isArray(value) && value.length) {
      urlParams.append(key, value.join(','));
    }
  });
  return urlParams.toString();
};

const prepareHeaders = (): Headers => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    language: localStorage?.getItem('language') ?? 'ar',
  });
  return headers;
};

const prepareAuthHeaders = (): Headers => {
  const headers = prepareHeaders();
  const token = Store.getState().auth.token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

const baseQuery = (auth: boolean) =>
  fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (_, __) => (auth ? prepareAuthHeaders() : prepareHeaders()),
    paramsSerializer: buildURLQueryParams,
    credentials: 'include',
  });

export const customBaseQueryWithAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi
) => await baseQuery(true)(args, api, {});

export const customBaseQueryWithoutAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi
) => await baseQuery(false)(args, api, {});
