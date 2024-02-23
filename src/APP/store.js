// store.js
import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "../features/menuSlice";
import occupationSlice from "../features/occupationSlice";
import reservationSlice from "../features/reservationSlice";
import api from "../API/api"; // Votre API unique intégrant tous les endpoints

const store = configureStore({
  reducer: {
    menus: menuSlice, // Gère maintenant tous les types de menus
    occupationStatus: occupationSlice,
    reservations: reservationSlice,
    [api.reducerPath]: api.reducer, // Reducer pour votre API unique
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Middleware pour votre API unique
});

export default store;
