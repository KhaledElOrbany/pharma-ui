import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import APIs from './APIs/APIs';

// Import all slices
import doctorSlice from '../modules/doctor/redux/DoctorSlice';

// Import 401 handler middleware
import { requestInterceptor } from './middlewares/requestInterceptor';

const slices = [doctorSlice];

const store = configureStore({
  reducer: {
    ...APIs.reduce(
      (acc, api) => ({ ...acc, [api.reducerPath]: api.reducer }),
      {}
    ),
    ...slices.reduce((acc, slice) => ({ ...acc, [slice.name]: slice }), {}),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(APIs.map((api) => api.middleware))
      .concat(requestInterceptor),
});

setupListeners(store.dispatch);

export default store;
