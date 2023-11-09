import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => "db.json",
    }),
    getCocktails: builder.query({
      query: () => "cocktailMenu.json",
    }),
  }),
});

export const { useGetMenusQuery, useGetCocktailsQuery } = api;
export default api;
