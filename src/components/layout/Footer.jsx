import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[70px] flex flex-row justify-between items-center  p-5">
      <div className="w-1/2 h-full flex justify-start items-center">
        All rights reserved ©David Long Bin
      </div>
      <div className=" w-1/2 h-full flex justify-end">
        <img src="./img/logo.png" alt="logo" className=" h-full" />
      </div>
    </footer>
  );
};

export default Footer;
