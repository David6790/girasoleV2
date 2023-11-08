import React, { useRef, useState } from "react";
import ModalReservation from "./modals/ModalReservation";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const FormuleMidi = ({ h1, h2, p, price1, price2, price3 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [resaModalOpen, setResaModalopen] = useState(false);

  const handleOpen = () => {
    setResaModalopen(true);
  };

  const handleClose = () => {
    setResaModalopen(false);
  };

  return (
    <motion.div
      className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[30%] sm:w-[45%] w-[90%] py-10 2xl:px-10 xl:px-10 lg:px-10 md:px-5 px-5 bg-myGrey flex flex-col justify-between items-center text-center rounded-2xl shadow-2xl  relative group overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out"
      ref={ref}
      style={{
        transform: isInView ? "none" : "opacity:0  ",
        opacity: isInView ? 1 : 0,
        transition: "all   ease-in 0.8s ",
      }}
    >
      <h1 className="font-title-font 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-xl  mb-5 text-my-gold ">
        {h1}
      </h1>
      <h2 className="2xl:text-lg xl:text-lg lg:text-lg md:text-base mb-3 ">
        {h2}
      </h2>
      <p className="2xl:text-sm xl:text-sm lg:text-sm md:text-xs text-xs italic mb-5 ">
        {p}
      </p>
      <h1 className="2xl:text-base xl:text-base md:text-base sm:text-sm text-sm">
        {price1}
      </h1>
      <h1 className="2xl:text-base xl:text-base md:text-base sm:text-sm text-sm">
        {price2}
      </h1>
      <h1 className="2xl:text-base xl:text-base md:text-base sm:text-sm text-sm">
        {price3}
      </h1>
      <div className="absolute inset-0 flex justify-center items-center group-hover:bg-my-gold  group-hover:bg-opacity-20   transition-all duration-300 ease-in-out">
        <button
          className="py-2 px-4 bg-my-gold text-white font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
          onClick={handleOpen}
        >
          Réserver une table
        </button>
      </div>
      <ModalReservation isOpen={resaModalOpen} onClose={handleClose} />
    </motion.div>
  );
};

export default FormuleMidi;
