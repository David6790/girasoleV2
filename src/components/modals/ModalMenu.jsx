import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";

const ModalMenu = ({ isOpen, onClose, resaModal }) => {
  const menuGirasole = [
    {
      day: "Lundi",
      starter: "Pizza pan et charcuterie italienne",
      dish: "Linguines au pesto à la sicilienne",
    },
    {
      day: "Mardi",
      starter: "Zuppa di pomodoro",
      dish: "Chicken wings façon Girasole, salade et pommes de terre della nona",
    },
    {
      day: "Mercredi",
      starter: "Salade niçoise",
      dish: "Penne à l'émincé de veau",
    },
    {
      day: "Jeudi",
      starter: "Bruschetta à la crème d'avocat et saumon fumé",
      dish: "Risotto au chorizo à la pizzaiola",
    },
    {
      day: "Vendredi",
      starter: "Tartare de poisson, avocat, citron vert et aneth",
      dish: "Filet de poisson et légumes grillés",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className=" p-4  shadow-lg xl:w-[60%] lg:w-[60%] md:w-[60%] sm:w-[60%] w-[80%]   h-auto rounded-2xl  bg-white overflow-scroll "
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        className="w-full h-full flex justify-center items-center "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,

          transition: {
            ease: "easeOut",
            duration: 0.75,
          },
        }}
        exit={{
          opacity: 0,

          transition: {
            ease: "easeIn",
            duration: 0.75,
          },
        }}
      >
        <div className="h-auto w-[100%] flex flex-col justify-center items-center bg-myGrey rounded-3xl ">
          {menuGirasole.map((menu, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-center items-center xl:mb-5 lg:mb-2  text-center mb-2 "
            >
              <h1 className=" xl:text-2xl lg:text-2xl md:text-xl sm:text-lg text-base font-title-font text-my-gold mb-2">
                {menu.day}
              </h1>
              <p className="xl:text-base lg:text-base md:text-base sm:text-sm text-xs">
                <span className=" font-bold">Entrée: </span>
                <span>{menu.starter}</span>
              </p>
              <p className="xl:text-base lg:text-base md:text-base sm:text-sm text-xs">
                <span className=" font-bold">Plat: </span>
                <span>{menu.dish}</span>
              </p>
            </div>
          ))}
          <div>
            <p className=" text-my-gold xl:text-base lg:text-base md:text-base sm:text-sm text-xs text-center mt-2">
              <span className=" font-bold font-title-font ">
                Dessert de la semaine :
              </span>
              <br />
              <span className="text-black">Panne Cotta aux fruits rouges</span>
            </p>
          </div>
          <button
            className="px-5 py-2 border-solid border-black border-2 mt-5 mb-5 xl:text-xl lg:xl:text-xl md:xl:text-xl sm:text-sm rounded-md"
            onClick={resaModal}
          >
            Réserver en ligne
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ModalMenu;