import React from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="w-full h-[70px] flex flex-row justify-between items-center px-5 ">
      <div className="w-6/12 h-full">
        <Logo />
      </div>
      <div className="w-6/12 h-full ">
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
