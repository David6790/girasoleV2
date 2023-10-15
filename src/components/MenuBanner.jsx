import React from "react";

const MenuBanner = ({ h1, h2 }) => {
  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center bg-black bg-opacity-60 ">
        <h1 className="xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl text-lg font-title-font text-my-gold text-opacity-100 italic mb-5 ">
          {h1}
        </h1>
        <h2 className=" xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl text-xl text-white font-title-font ">
          {h2}
        </h2>
      </div>
    </>
  );
};

export default MenuBanner;
