import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Import All APIs
import { doctorAPI } from './APIs/doctorAPI';

// Import all slices
import { doctorSlice } from '../modules/doctor/state';

// Import 401 handler middleware
import { requestInterceptor } from './middlewares/requestInterceptor';

const apis = [doctorAPI];

const slices = [doctorSlice];

const store = configureStore({
  reducer: {
    ...apis.reduce(
      (acc, api) => ({ ...acc, [api.reducerPath]: api.reducer }),
      {}
    ),
    ...slices.reduce(
      (acc, slice) => ({ ...acc, [slice.name]: slice.reducer }),
      {}
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apis.map((api) => api.middleware))
      .concat(requestInterceptor),
});

setupListeners(store.dispatch);

export default store;
