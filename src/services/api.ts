import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Classroom } from '../types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getClassroomData: builder.query<Classroom, void>({
      query: () => 'data.json',
    }),
  }),
});

export const { useGetClassroomDataQuery } = api;
