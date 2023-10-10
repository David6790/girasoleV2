import React from "react";
import { listmenus } from "../features/menuSlice";
import { useSelector } from "react-redux";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Menu = () => {
  const menu = useSelector(listmenus);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Menu;
