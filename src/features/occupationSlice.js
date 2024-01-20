// occupationStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  occupationStatus: null, // Default status
};

const occupationStatusSlice = createSlice({
  name: "occupationStatus",
  initialState,
  reducers: {
    setOccupationStatus: (state, action) => {
      state.occupationStatus = action.payload;
    },
  },
});

export const { setOccupationStatus } = occupationStatusSlice.actions;
export default occupationStatusSlice.reducer;
export const occupationStatus = (state) =>
  state.occupationStatus.occupationStatus;
