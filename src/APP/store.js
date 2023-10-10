import { configureStore } from "@reduxjs/toolkit";

import menuSlice from "../features/menuSlice";
import api from "../API/api";

const store = configureStore({
  reducer: {
    menus: menuSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
