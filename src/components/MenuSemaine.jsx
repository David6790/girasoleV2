import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import ModalMenu from "./modals/ModalMenu";
import ModalReservation from "./modals/ModalReservation";

const MenuSemaine = () => {
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const isInView = useInView(ref3, ref4, { once: true });
  const [modalOpen, setModalOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleResaModal = () => {
    setIsReservationOpen(true);
    setModalOpen(false);
    console.log("clicked");
  };

  const closeResaModal = () => {
    setIsReservationOpen(false);
  };

  return (
    <>
      <div className="xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full h-full flex flex-row justify-center items-center">
        <motion.div
          className="xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-10/12 w-full h-full flex flex-col justify-evenly"
          ref={ref3}
          style={{
            transform: isInView ? "none" : "opacity:0  ",
            opacity: isInView ? 1 : 0,
            transition: "all   ease-in 0.6s ",
          }}
        >
          <h1 className=" xl:text-5xl lg:text-5xl md:text-3xl sm:text-3xl text-3xl mb-10 font-title-font">
            Au menu <span className="  text-my-gold  ">cette semaine</span>
          </h1>
          <p className=" xl:text-xl lg:text-xl md:text-base sm:text-sm text-xs mb-5 text-justify">
            Chez nous, c'est l'Italie dans l'assiette et le cœur à l'ouvrage.
            Notre menu de la semaine ? Des recettes maison, où chaque plat
            raconte une histoire. Fraîcheur et authenticité sont nos
            maîtres-mots. On mise tout sur le local, avec des produits frais et
            de saison. Parce que la vraie cuisine italienne, c'est avant tout
            une affaire de passion et de partage.
          </p>
          <div className=" xl:text-sm lg:text-sm  md:text-xs sm:text-xs text-xs mb-2  italic ">
            <p>Plat du jour: 11€</p>
            <p>Entrée/Plat ou Plat/Dessert: 13€</p>
            <p>Entrée/Plat/Dessert: 15€</p>
          </div>
          <button
            className=" px-5 py-2 border-[1px] rounded-md border-black xl:text-xl lg:text-xl md:text-xl sm:text-sm text-xs transform transition-transform duration-200 hover:-translate-y-1 shadow-2xl"
            onClick={handleClick}
          >
            Voir notre menu de la semaine
          </button>
        </motion.div>
      </div>
      <motion.div
        className="xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full h-full overflow-hidden shadow-md shadow-gray-700 "
        ref={ref4}
        style={{
          transform: isInView ? "none" : "opacity:0  ",
          opacity: isInView ? 1 : 0,

          transition: "all   ease-in 0.8s ",
        }}
      >
        <motion.img
          src="./img/banner.webp"
          alt=""
          className="h-full object-cover "
          ref={ref5}
        />
        <ModalMenu
          isOpen={modalOpen}
          message={"test"}
          onClose={handleClose}
          resaModal={handleResaModal}
        />
        <ModalReservation isOpen={isReservationOpen} onClose={closeResaModal} />
      </motion.div>
    </>
  );
};

export default MenuSemaine;
