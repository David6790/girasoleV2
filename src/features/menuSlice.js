import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menus: null,
};

const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setMenus: (state, payload) => {
      state.menus = payload.payload.menu;
    },
  },
});

export const { setMenus } = menuSlice.actions;
export default menuSlice.reducer;
export const listmenus = (state) => state.menus.menus;
