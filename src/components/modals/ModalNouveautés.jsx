import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const ModalNouveautés = ({ isOpen, onClose, resaModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Mon Modal"
      className=" px-4 py-0  shadow-lg w-[60%] h-[80%] rounded-2xl  bg-white overflow-scroll outline-none relative "
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        className="w-full h-full "
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
        <div className="w-full flex flex-row justify-between items-center mb-5 sticky top-0 bg-white ">
          <img src="./img/logo.png" alt="logo girasole" className="h-[50px] " />
          <span className="text-xl text-my-gold font-title-font font-bold">
            Quoi de neuf au Il Girasole?
          </span>
          <button className=" text-xs" onClick={onClose}>
            fermer
          </button>
        </div>

        <div className="w-full h-full ">
          <div className="w-full flex flex-row justify-between items-center ">
            <div className="w-1/3 ">
              <img
                src="./img/kids.png"
                alt=""
                className="w-full object-cover"
              />
            </div>

            <div className="w-2/3  text-justify p-10 ">
              <p className=" text-lg mb-2">
                Vous ne savez pas quoi faire ce week-end ? Emmenez vos bambini
                🧒👧 en Italie 🇮🇹 le temps d’un repas ! Une cuisine fraîche 🌱,
                avec des produits équilibrés ⚖️ et goûteux, quoi de mieux pour
                passer un bon moment 🍽️ en faisant son boulot de parent?
              </p>
              <p className=" text-lg font-title-font text-my-gold">
                Samedi et Dimanche midi, -50% pour les enfants.
              </p>

              <button
                className="px-5 py-2 border-solid border-black border-[1px] mt-5 mb-5 xl:text-xl lg:text-xl md:text-xl sm:text-lg text-base rounded-md shadow-2xl transform transition-transform duration-200 hover:-translate-y-1"
                onClick={resaModal}
              >
                Réserver en ligne
              </button>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center ">
            <div className="w-2/3  text-justify p-10 ">
              <p className=" text-lg mb-2">
                🎉 Nouvelle saison, nouvelle carte ! 🎉 L'Hiver arrive, et nous
                sommes ravis de vous présenter nos nouvelles créations
                culinaires. Des saveurs inédites pour égayer vos papilles.
                Curieux ? Venez découvrir ce que nous avons concocté pour vous.
                À très vite chez Il Girasole ! 🍽️🌞
              </p>
              <p className=" text-lg font-title-font text-my-gold">
                Produits frais et de saison !
              </p>
              <NavLink to="/menu">
                <button
                  className=" px-5 py-2 border-[1px] rounded-md border-black xl:text-xl lg:text-xl md:text-xl sm:text-sm text-xs  mt-8 transform transition-transform duration-200 hover:-translate-y-1 shadow-2xl  "
                  onClick={onClose}
                >
                  Consulter la Carte
                </button>
              </NavLink>
            </div>
            <div className="w-1/3 ">
              <img
                src="./img/newMenu.png"
                alt=""
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ModalNouveautés;
