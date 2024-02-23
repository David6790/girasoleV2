import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservations: [],
};

const reservationsSlice = createSlice({
  name: "resas",
  initialState,
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
  },
});

export const { setReservations } = reservationsSlice.actions;
export default reservationsSlice.reducer;

export const selectAllReservations = (state) => state.reservations.reservations;
