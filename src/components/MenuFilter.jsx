import React from "react";

const MenuFilter = ({ name, onClick }) => {
  return (
    <>
      <button
        className=" xl:text-xl lg:text-xl md:text-xl sm:text-xl text-sm  "
        onClick={onClick}
      >
        {name}
      </button>
    </>
  );
};

export default MenuFilter;
