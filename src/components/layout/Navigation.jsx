import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-full h-full">
      <ul className=" h-full flex-row justify-between  items-center xl:flex lg:flex md:flex sm:flex hidden">
        <NavLink to="/">
          <li>Accueil</li>
        </NavLink>
        <NavLink to="/menu">
          <li>Notre carte</li>
        </NavLink>
        <NavLink to="/contact">
          <li>Contact</li>
        </NavLink>
      </ul>
      <div className="xl:hidden lg:hidden md:hidden sm:hidden flex h-full justify-end items-center px-5 ">
        <i className="fa-solid fa-bars text-3xl "></i>
      </div>
    </div>
  );
};

export default Navigation;
