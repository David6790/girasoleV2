import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => "db.json",
    }),
  }),
});

export const { useGetMenusQuery } = api;
export default api;
