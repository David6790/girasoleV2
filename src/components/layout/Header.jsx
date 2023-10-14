import React from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="w-full h-[70px] flex flex-row justify-between items-center px-5 ">
      <div className="xl:w-2/12 lg:w-2/12 md:w-2/12 sm:w-11/12 w-11/12 h-full">
        <Logo />
      </div>
      <div className="xl:w-11/12 lg:w-11/12 md:w-11/12 sm:w-7/12 h-full ">
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
