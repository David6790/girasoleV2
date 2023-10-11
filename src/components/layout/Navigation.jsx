import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full h-full ">
      <ul className=" h-full flex-row justify-end  items-center xl:flex lg:flex md:flex sm:flex hidden">
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
        <NavLink
          to="/contact"
          className={(nav) => (nav.isActive ? " text-my-gold" : " text-black")}
        >
          <li className="ml-20">Contact</li>
        </NavLink>
      </ul>
      <div className="xl:hidden lg:hidden md:hidden sm:hidden flex h-full justify-end items-center px-5 ">
        <button onClick={handleClick}>
          <i className="fa-solid fa-bars text-3xl "></i>
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
            <img
              src="./img/logoWhite.png"
              alt="logo resto"
              className="h-[50px]"
            />

            <button className=" text-sm" onClick={handleClick}>
              X
            </button>
          </div>

          <ul className="flex flex-col justify-center items-start h-full space-y-8 text-xl text-white ">
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/menu">La Carte</NavLink>
            <NavLink to="/contact">Contactez-nous</NavLink>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Navigation;
