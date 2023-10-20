import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full h-[80px] flex flex-row justify-evenly gap-2  items-center  p-2">
      <div>
        <p className=" text-my-gold">©David Long Bin</p>
        <NavLink to="/legalMentions">
          <span className=" underline">Mentions Légales</span>
        </NavLink>
      </div>

      <img src="./img/logo.png" alt="logo" className=" h-full" />
    </footer>
  );
};

export default Footer;
