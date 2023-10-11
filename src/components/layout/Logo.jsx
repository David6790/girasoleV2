import React from "react";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <NavLink to="/">
        <img src="./img/logo.png" alt="logo restaurant" className="h-full " />
      </NavLink>
    </>
  );
};

export default Logo;
