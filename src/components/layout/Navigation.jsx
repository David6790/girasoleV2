import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ModalNouveautés from "../modals/ModalNouveautés";
import ModalReservation from "../modals/ModalReservation";
import ModalMenu from "../modals/ModalMenu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resaModal, setResaModal] = useState(false);
  const [menuModal, setMenuModal] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpenNewModal = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };
  const handleOpenMenuModal = () => {
    setIsOpen(false);
    setMenuModal(true);
  };
  const handleCloseMenuModal = () => {
    setMenuModal(false);
  };

  const handleResa = () => {
    setResaModal(true);
    setIsModalOpen(false);
  };

  const handleResa2 = () => {
    setResaModal(true);
    setMenuModal(false);
  };

  const resaClose = () => {
    setResaModal(false);
  };
  return (
    <div className="w-full h-full ">
      <ModalNouveautés
        isOpen={isModalOpen}
        onClose={handleClose}
        resaModal={handleResa}
      />
      <ModalReservation isOpen={resaModal} onClose={resaClose} />
      <ModalMenu
        isOpen={menuModal}
        onClose={handleCloseMenuModal}
        resaModal={handleResa2}
      />
      <ul className=" h-full flex-row justify-end  items-center xl:flex lg:flex md:hidden sm:hidden hidden">
        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? " text-my-gold" : " text-black")}
        >
          <li className="ml-20">Accueil</li>
        </NavLink>
        <NavLink
          to="/menu"
          className={(nav) => (nav.isActive ? " text-my-gold" : " text-black")}
        >
          <li className="ml-20">Notre carte</li>
        </NavLink>
        <li className="ml-20 cursor-pointer" onClick={handleOpenMenuModal}>
          Menu de la semaine
        </li>

        <NavLink
          to="/contact"
          className={(nav) => (nav.isActive ? " text-my-gold" : " text-black")}
        >
          <li className="ml-20">Contact</li>
        </NavLink>
        <li
          className="ml-20  relative cursor-pointer"
          onClick={handleOpenNewModal}
        >
          <span className="star animate-pulse absolute top-[-10px] left-[-15px]">
            <i className="fa-solid fa-star-of-life text-yellow-500 text-xs mr-1"></i>
          </span>
          Quoi de neuf ?
        </li>
      </ul>
      <div className="xl:hidden lg:hidden md:flex sm:flex flex h-full justify-end items-center px-5 relative  ">
        <button onClick={handleClick} className="absolute">
          <i className="fa-solid fa-bars text-3xl "></i>
          <span className="star animate-pulse absolute top-[-8px] left-[-10px]">
            <i className="fa-solid fa-star-of-life text-yellow-500 text-sm mr-1"></i>
          </span>
        </button>
      </div>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 h-2/3 w-2/3 rounded-tl-3xl rounded-bl-3xl shadow-md  bg-opacity-50 bg-my-gold backdrop-blur-md  border-solid border-[#444] border-[1px] z-50 p-10 group"
          initial={{
            opacity: 0,
            x: "200px",
          }}
          animate={{
            opacity: 1,
            x: 0,

            transition: {
              ease: "easeOut",
              duration: 0.6,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.75,
            transition: {
              ease: "easeIn",
              duration: 0.55,
            },
          }}
        >
          <div className="flex flex-row justify-between items-center text-white">
            <button className=" text-sm" onClick={handleClick}>
              X
            </button>
            <img
              src="./img/logoWhite.png"
              alt="logo resto"
              className="h-[50px]"
            />
          </div>

          <ul className="flex flex-col justify-center items-start h-full space-y-8 text-xl text-white ">
            <NavLink to="/">
              <li>Accueil</li>
            </NavLink>
            <NavLink to="/menu">
              <li>La Carte</li>
            </NavLink>
            <li
              className="  relative cursor-pointer"
              onClick={handleOpenMenuModal}
            >
              Menu de la semaine
            </li>
            <NavLink to="/contact">
              <li>Contactez-nous</li>
            </NavLink>
            <li
              className="  relative cursor-pointer"
              onClick={handleOpenNewModal}
            >
              <span className="star animate-pulse absolute top-[-10px] left-[-15px]">
                <i className="fa-solid fa-star-of-life text-white text-xs mr-1"></i>
              </span>
              Quoi de neuf ?
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Navigation;
