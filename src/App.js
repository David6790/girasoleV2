import React, { useEffect } from "react";
import Routeur from "./utils/Routeur";
import { useDispatch } from "react-redux";
import { setCocktails, setMenus, setWeeklyMenus } from "./features/menuSlice";
import {
  useGetCocktailsQuery,
  useGetMenusQuery,
  useGetWeeklyMenusQuery,
} from "./API/api";

function App() {
  const dispatch = useDispatch();

  const { data: menus } = useGetMenusQuery();
  const { data: cocktails } = useGetCocktailsQuery();
  const { data: weeklyMenus } = useGetWeeklyMenusQuery();

  useEffect(() => {
    if (menus) {
      dispatch(setMenus(menus));
    }
    if (cocktails) {
      dispatch(setCocktails(cocktails));
    }
    if (weeklyMenus) {
      dispatch(setWeeklyMenus(weeklyMenus));
    }
  }, [dispatch, menus, cocktails, weeklyMenus]);

  return (
    <main className=" max-w-[1440px]  m-auto bg-[#FAFAF8] py-2 font-main-font  overflow-hidden ">
      <Routeur />
    </main>
  );
}

export default App;
