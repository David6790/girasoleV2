import React from "react";
import ReservationModal from "./modals/ReservationModal";

const ButtonResa = () => {
  return (
    <>
      <ReservationModal />
      <button className="px-5 py-2 border-solid border-black border-2 mt-5 mb-5 text-xl rounded-md  ">
        Réserver en ligne
      </button>
    </>
  );
};

export default ButtonResa;
