import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-full h-full">
      <ul className=" h-full flex flex-row justify-evenly  items-center">
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
    </div>
  );
};

export default Navigation;
