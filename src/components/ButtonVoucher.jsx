import React, { useState } from "react";

const ButtonVoucher = () => {
  const handleClick = () => {
    //setIsModalOpen(!isModalOpen);
    window.location.href = "https://reserver-simplement.fr/voucher-externe/1";
  };

  return (
    <>
      <button
        className="px-5 py-2 border-solid border-black border-[1px] mt-5 mb-5 xl:text-xl lg:text-xl md:text-xl sm:text-lg text-base rounded-md shadow-2xl transform transition-transform duration-200 hover:-translate-y-1"
        onClick={handleClick}
      >
        Offrir un bon cadeau
      </button>
    </>
  );
};

export default ButtonVoucher;
