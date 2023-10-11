import React from "react";

const MenuFilter = ({ name, onClick }) => {
  return (
    <>
      <button
        className=" xl:text-xl lg:text-xl md:text-xl sm:text-xl text-xs py-[20px] text-black hover:text-my-gold  "
        onClick={onClick}
      >
        {name.toUpperCase()}
      </button>
    </>
  );
};

export default MenuFilter;
