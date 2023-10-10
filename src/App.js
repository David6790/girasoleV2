import React, { useEffect } from "react";
import Routeur from "./utils/Routeur";
import { useDispatch } from "react-redux";
import { setMenus } from "./features/menuSlice";
import { useGetMenusQuery } from "./API/api";

function App() {
  const dispatch = useDispatch();

  const { data: menus } = useGetMenusQuery();

  useEffect(() => {
    if (menus) {
      dispatch(setMenus(menus));
    }
  }, [dispatch, menus]);

  return (
    <main className=" max-w-[1440px]  m-auto bg-[#FAFAF8] py-2 font-main-font  overflow-hidden ">
      <Routeur />
    </main>
  );
}

export default App;
