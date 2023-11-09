import React, { useEffect } from "react";
import Routeur from "./utils/Routeur";
import { useDispatch } from "react-redux";
import { setCocktails, setMenus } from "./features/menuSlice";
import { useGetCocktailsQuery, useGetMenusQuery } from "./API/api";

function App() {
  const dispatch = useDispatch();

  const { data: menus } = useGetMenusQuery();
  const { data: cocktails } = useGetCocktailsQuery();

  useEffect(() => {
    if (menus && cocktails) {
      dispatch(setMenus(menus));
      dispatch(setCocktails(cocktails));
    }
  }, [dispatch, menus, cocktails]);

  return (
    <main className=" max-w-[1440px]  m-auto bg-[#FAFAF8] py-2 font-main-font  overflow-hidden ">
      <Routeur />
    </main>
  );
}

export default App;
