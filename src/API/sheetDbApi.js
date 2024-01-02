// sheetDbApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sheetDbApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://sheetdb.io/api/v1/" }),
  endpoints: (builder) => ({
    getWeeklyMenus: builder.query({
      query: () => "03vxoo7tdhofu",
    }),
  }),
});

export const { useGetWeeklyMenusQuery } = sheetDbApi;
