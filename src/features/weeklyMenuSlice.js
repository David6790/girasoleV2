// weeklyMenuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weeklyMenus: null,
};

const weeklyMenuSlice = createSlice({
  name: "weeklyMenus",
  initialState,
  reducers: {
    setWeeklyMenus: (state, action) => {
      state.weeklyMenus = action.payload;
    },
  },
});

export const { setWeeklyMenus } = weeklyMenuSlice.actions;
export default weeklyMenuSlice.reducer;
export const selectWeeklyMenus = (state) => state.weeklyMenus.weeklyMenus;
