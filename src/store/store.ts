import { configureStore } from '@reduxjs/toolkit';

import { api } from '../services/api';

import classroomReducer from './classroomSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    classroom: classroomReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
