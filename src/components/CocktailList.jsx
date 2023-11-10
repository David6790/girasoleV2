import React from "react";
import { useSelector } from "react-redux";
import { listCocktails } from "../features/menuSlice";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const CocktailList = ({ category }) => {
  const allCocktails = useSelector(listCocktails);
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.75, // Commencer avec un scale légèrement réduit
    },
    visible: (i) => ({
      opacity: 1,
      scale: 1, // Scale normal
      transition: {
        delay: i * 0.15,
        duration: 0.5, // Durée de l'animation (modifiable selon vos préférences)
      },
    }),
  };

  return (
    <>
      <AnimatePresence>
        {allCocktails
          ? allCocktails
              .filter((item) => {
                if (category === "All") {
                  return true;
                }
                return item.category === category;
              })
              .map((item, index) => (
                <motion.div
                  key={crypto.randomUUID()}
                  className="w-[300px] relative overflow-hidden group"
                  variants={variants}
                  custom={index} // Passer l'index ici
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-full left-0 w-full h-full bg-black bg-opacity-50 p-4 transform transition-transform duration-300 group-hover:top-0 text-white flex flex-col justify-center items-center">
                    <div className="border-solid border-my-gold border-[2px] h-full w-full flex flex-col justify-center items-center px-2">
                      <h3 className="text-lg font-semibold ">
                        {item.nom.toUpperCase()}
                      </h3>
                      <div className="text-sm w-full text-center mb-5">
                        {item.recipe.map((item) => (
                          <span key={crypto.randomUUID()}>{item} </span>
                        ))}
                      </div>
                      <p className="text-sm font-bold">{item.prix}</p>
                    </div>
                  </div>
                </motion.div>
              ))
          : ""}
      </AnimatePresence>
    </>
  );
};

export default CocktailList;
