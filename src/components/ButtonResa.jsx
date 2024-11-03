import React, { useState } from "react";

import ModalReservation from "./modals/ModalReservation";

const ButtonResa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    //setIsModalOpen(!isModalOpen);
    window.location.href = "https://reserver-simplement.fr/resa-externe";
  };
  const closeModale = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalReservation isOpen={isModalOpen} onClose={closeModale} />
      <button
        className="px-5 py-2 border-solid border-black border-[1px] mt-5 mb-5 xl:text-xl lg:text-xl md:text-xl sm:text-lg text-base rounded-md shadow-2xl transform transition-transform duration-200 hover:-translate-y-1"
        onClick={handleClick}
      >
        Réserver en ligne
      </button>
    </>
  );
};

export default ButtonResa;
