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
      className=" px-4 py-0 shadow-lg xl:w-[60%] lg:w-[60%] md:w-[80%] w-[90%] h-[80%] rounded-2xl bg-white overflow-scroll outline-none relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        className="w-full xl:h-full lg:h-full md:h-full sm:h-[1000px] h-[1000px]"
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
        <div className="w-full flex flex-row justify-between items-center mb-5 sticky top-0 bg-white z-50">
          <img src="./img/logo.png" alt="logo girasole" className="h-[50px]" />
          <span className="text-xl xl:block lg:block md:block sm:hidden hidden text-my-gold font-title-font font-bold">
            Quoi de neuf au Il Girasole ?
          </span>
          <button className="text-xs" onClick={onClose}>
            fermer
          </button>
        </div>
        <div className="w-full flex xl:flex-row lg:flex-row md:flex-row sm:flex-col-reverse flex-col-reverse justify-between items-center">
          <div className="xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-full w-full text-justify p-10">
            <p className="text-lg mb-2">
              Cette année, célébrez le réveillon du Nouvel An au{" "}
              <b>Il Girasole</b> avec un menu unique qui ravira vos papilles à{" "}
              <b>59€ par personne</b>. Uniquement disponible pour le dîner du 31
              décembre, ce menu est conçu pour vous offrir une expérience
              gourmande et festive, sans oublier la qualité qui fait notre
              réputation.
            </p>
            <p className="text-lg mb-2">
              Après ce dîner, vous serez libres de poursuivre vos festivités où
              bon vous semble ! Notre restaurant fermera ses portes avant
              minuit, mais ne partez pas sans demander quelques conseils à notre
              équipe : de vrais fêtards, ils se feront un plaisir de vous
              suggérer les meilleurs endroits pour célébrer la nouvelle année
              jusqu’au bout de la nuit !
            </p>
            <a
              href="https://reserver-simplement.fr/resa-externe"
              rel="noopener noreferrer"
            >
              <button
                className="px-5 py-2 border-[1px] rounded-md border-black xl:text-xl lg:text-xl md:text-xl sm:text-sm text-xs mt-8 transform transition-transform duration-200 hover:-translate-y-1 shadow-2xl"
                onClick={onClose}
              >
                Réserver votre table
              </button>
            </a>
          </div>
          <div className="xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-2/3 w-2/3">
            <img
              src="./img/newYear.png"
              alt="Menu Nouvel An"
              className="w-full object-cover"
            />
          </div>
        </div>
        <div className="w-full h-full">
          <div className="w-full flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col justify-between items-center">
            <div className="xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-2/3 w-2/3">
              <img
                src="./img/kids.png"
                alt=""
                className="w-full object-cover"
              />
            </div>
            <div className="xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-full w-full text-justify p-10">
              <p className="text-lg mb-2">
                Vous ne savez pas quoi faire ce week-end ? Emmenez vos bambini
                🧒👧 en Italie 🇮🇹 le temps d’un repas ! Une cuisine fraîche 🌱,
                avec des produits équilibrés ⚖️ et goûteux, quoi de mieux pour
                passer un bon moment 🍽️ en faisant son boulot de parent?
              </p>
              <p className="text-lg font-title-font text-my-gold">
                Samedi et Dimanche midi, -50% pour les enfants.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ModalNouveautés;
