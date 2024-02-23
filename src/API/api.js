import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "/" });

const customBaseQuery = async (args, api, extraOptions) => {
  if (args.url && args.url.startsWith("https://sheetdb.io")) {
    // Pour les requêtes à SheetDB, utilisez l'URL complète
    return fetchBaseQuery()({ url: args.url, method: args.method });
  } else {
    // Pour les autres requêtes, utilisez le baseUrl par défaut
    return baseQuery(args, api, extraOptions);
  }
};

const api = createApi({
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => "db.json",
    }),
    getCocktails: builder.query({
      query: () => "cocktailMenu.json",
    }),
    getWeeklyMenus: builder.query({
      query: () => "https://sheetdb.io/api/v1/03vxoo7tdhofu",
    }),
    getOccupationStatus: builder.query({
      query: () => "	https://sheetdb.io/api/v1/wplwbkmf4c9kk",
    }),
    getAllReservations: builder.query({
      query: () => "https://sheetdb.io/api/v1/97lppk2d46b57",
      providesTags: ["Reservations"],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useGetCocktailsQuery,
  useGetWeeklyMenusQuery,
  useGetOccupationStatusQuery,
  useGetAllReservationsQuery,
} = api;
export default api;
