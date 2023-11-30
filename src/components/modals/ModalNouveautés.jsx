import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
// import { NavLink } from "react-router-dom";

const ModalNouveautés = ({ isOpen, onClose, resaModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Mon Modal"
      className=" px-4 py-0  shadow-lg xl:w-[60%] lg:w-[60%] md:w-[80%] w-[90%] h-[80%] rounded-2xl  bg-white overflow-scroll outline-none relative "
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        className="w-full xl:h-full lg:h-full md:h-full sm:h-[1000px] h-[1000px] "
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
        <div className="w-full flex flex-row justify-between items-center mb-5 sticky top-0 bg-white z-50 ">
          <img src="./img/logo.png" alt="logo girasole" className="h-[50px] " />
          <span className="text-2xl xl:block lg:block md:block sm:hidden hidden  font-title-font font-bold">
            🎉 Célébrez le Nouvel An chez Il Girasole ! 🍾
          </span>
          <button className=" text-xs" onClick={onClose}>
            fermer
          </button>
        </div>

        <div className="w-full h-full ">
          <div className="w-full flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col justify-between items-center ">
            <div className="xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-2/3 w-2/3 ">
              <img src="./img/ny.png" alt="" className="w-full object-cover" />
            </div>

            <div className="xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-full w-full  text-justify p-10 ">
              <p className=" text-lg mb-2">
                Venez vivre une soirée magique pour accueillir 2024 avec notre
                menu exclusif du nouvel an. 🌟 <br />
                Savourez des plats exquis préparés spécialement pour cette
                occasion festive. 🍽️ <br />
                <br />
                <span className=" font-semibold text-my-gold">
                  Réservez avant le 25/12 pour bénéficier d'un tarif
                  préférentiel de 85€ TTC !
                </span>
                <br />
                <br />
                💰 Après cette date, le menu sera à 95€ TTC. <br />
                Profitez également d'un apéritif offert pour bien commencer la
                soirée. 🥂 Nous vous attendons pour un début de soirée entre
                19h30 et 20h00.
                <br />
                <br />
                <span className=" italic">
                  Veuillez noter que les boissons ne sont pas incluses et qu'une
                  arrhes de 30€ est requis pour confirmer votre réservation. 💳
                </span>
              </p>
              {/* <p className=" text-lg font-title-font text-my-gold">
                Samedi et Dimanche midi, -50% pour les enfants.
              </p> */}

              <button
                className="px-5 py-2 border-solid border-black border-[1px] mt-5 mb-5 xl:text-xl lg:text-xl md:text-xl sm:text-lg text-base rounded-md shadow-2xl transform transition-transform duration-200 hover:-translate-y-1"
                onClick={resaModal}
              >
                Réserver en ligne
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <img
              src="./img/nyMenu.png"
              alt="new year girasole menu"
              className=" w-[80%] rounded-2xl"
            />
            <button
              className="px-5 py-2 border-solid border-black border-[1px] mt-5 mb-5 xl:text-xl lg:text-xl md:text-xl sm:text-lg text-base rounded-md shadow-2xl transform transition-transform duration-200 hover:-translate-y-1"
              onClick={resaModal}
            >
              Réserver en ligne
            </button>
          </div>

          {/* <div className="w-full flex xl:flex-row lg:flex-row md:flex-row sm:flex-col-reverse flex-col-reverse justify-between items-center ">
            <div className="xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-full w-full  text-justify p-10 ">
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
            <div className="xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-2/3 w-2/3 ">
              <img
                src="./img/newMenu.png"
                alt=""
                className="w-full object-cover"
              />
            </div>
          </div> */}
        </div>
      </motion.div>
    </Modal>
  );
};

export default ModalNouveautés;
