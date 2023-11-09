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
    setCocktails: (state, payload) => {
      state.cocktails = payload.payload.Cocktails;
    },
  },
});

export const { setMenus, setCocktails } = menuSlice.actions;
export default menuSlice.reducer;
export const listmenus = (state) => state.menus.menus;
export const listCocktails = (state) => state.menus.cocktails;
