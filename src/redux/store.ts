import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import APIs from './APIs';
import Slices from './Slices';

import RequestInterceptor from './middlewares/RequestInterceptor';

const Store = configureStore({
  reducer: {
    ...APIs.reduce(
      (acc, api) => ({ ...acc, [api.reducerPath]: api.reducer }),
      {}
    ),
    ...Slices.reduce((acc, slice) => ({ ...acc, [slice.name]: slice }), {}),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(APIs.map((api) => api.middleware))
      .concat(RequestInterceptor),
});

setupListeners(Store.dispatch);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
