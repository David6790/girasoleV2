import React from "react";

const MenuFilter = ({ name, onClick }) => {
  return (
    <>
      <button
        className=" xl:text-base lg:text-base md:text-base sm:text-base text-xs py-[15px] text-black hover:text-my-gold font-title-font"
        onClick={onClick}
      >
        {name.toUpperCase()}
      </button>
    </>
  );
};

export default MenuFilter;
