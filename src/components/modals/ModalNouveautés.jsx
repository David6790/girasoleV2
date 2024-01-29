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
        <div className="w-full mb-10 ">
          <div className="w-full flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col justify-between items-center ">
            <div className="xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-2/3 w-2/3 ">
              <img
                src="./img/love.png"
                alt=""
                className="w-full object-cover"
              />
            </div>

            <div className="xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-full w-full  text-justify p-10 ">
              <p className=" text-lg mb-2">
                💓 Bientôt le grand retour de Cupidon, le harcèlement
                commercial, sa horde d’amoureux, les roses à gogo, la galère de
                savoir quoi offrir … 😜 Alors si vous voulez passer un bon
                moment avec votre moitié, on a prévu un menu des plus
                romantiques (Rome antique si j’ose dire ? Ok je sors …) 59€ /
                personne avec un Cocktails Signature offert 😀
              </p>
              <p className=" text-lg font-title-font text-my-gold">
                Réservation entre 19h et 20H30. Le soir du 14/02, nous proposons
                uniquement le menu St.Velentin. Réservation uniquement EN LIGNE.
                A bientôt 🥰🥰
              </p>

              <button
                className="px-5 py-2 border-solid border-black border-[1px] mt-5 mb-5 xl:text-xl lg:text-xl md:text-xl sm:text-lg text-base rounded-md shadow-2xl transform transition-transform duration-200 hover:-translate-y-1"
                onClick={resaModal}
              >
                Réserver en ligne
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center h-full mb-10">
          <img
            src="./img/valentin.jpg"
            alt="menu valentin"
            className="w-[80%]"
          />
        </div>
        {/* <div className="w-full flex flex-row justify-between items-center mb-5 sticky top-0 bg-white z-50 ">
          <img src="./img/logo.png" alt="logo girasole" className="h-[50px] " />
          <span className="text-xl xl:block lg:block md:block sm:hidden hidden  text-my-gold font-title-font font-bold">
            Quoi de neuf au Il Girasole?
          </span>
          <button className=" text-xs" onClick={onClose}>
            fermer
          </button>
        </div>
        <div className="w-full flex xl:flex-row lg:flex-row md:flex-row sm:flex-col-reverse flex-col-reverse justify-between items-center ">
          <div className="xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-full w-full  text-justify p-10 ">
            <p className=" text-lg mb-2">
              Parmi les bonnes résolutions de l’année 2024, il y a chez nous la
              volonté de proposer des alternatives à la consommation de viande
              🍽️ On vous propose donc la pizza Regina et les carbonara avec ce
              délicieux jambon végétal 🍕🍝 Pour cela, on travaille avec la
              marque La Vie qui mérite de notre part une vraie mise en lumière
              💫 Une liste d’ingrédients courtes, pas d’agent de texture, pas de
              nitrites (certo !), pas d’OGM, concocté en France. Bref, tout pour
              plaire à nos amis végétariens mais qui sait, même certains
              carnivores invétérés en quête d’une consommation plus raisonnable
              ? A dopo amici ♥️
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
              src="./img/REGINA2.jpeg"
              alt=""
              className="w-full object-cover"
            />
          </div>
        </div> */}
        {/* <div className="w-full h-full ">
          <div className="w-full flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col justify-between items-center ">
            <div className="xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-2/3 w-2/3 ">
              <img
                src="./img/kids.png"
                alt=""
                className="w-full object-cover"
              />
            </div>

            <div className="xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-full w-full  text-justify p-10 ">
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
        </div> */}
      </motion.div>
    </Modal>
  );
};

export default ModalNouveautés;
