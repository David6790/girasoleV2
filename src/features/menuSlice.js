import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menus: null,
  cocktails: null,
  weeklyMenus: null,
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
    setWeeklyMenus: (state, action) => {
      // Reducer pour les menus hebdomadaires
      state.weeklyMenus = action.payload;
    },
  },
});

export const { setMenus, setCocktails, setWeeklyMenus } = menuSlice.actions;
export default menuSlice.reducer;
export const listmenus = (state) => state.menus.menus;
export const listCocktails = (state) => state.menus.cocktails;
export const selectWeeklyMenus = (state) => state.menus.weeklyMenus;
