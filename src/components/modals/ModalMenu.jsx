import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setWeeklyMenus } from "../../features/menuSlice";

const ModalMenu = ({ isOpen, onClose, resaModal }) => {
  const dispatch = useDispatch();
  const [menuSemaine, setMenuSemaine] = useState([]);

  const handleClick = () => {
    window.location.href = "https://reserver-simplement.fr/resa-externe";
  };

  useEffect(() => {
    if (isOpen) {
      fetch("/weeklyMenus.json")
        .then((response) => response.json())
        .then((data) => {
          setMenuSemaine(data);
          dispatch(setWeeklyMenus(data));
        })
        .catch((error) => {
          console.error("Erreur lors du fetch du menu:", error);
        });
    }
  }, [isOpen, dispatch]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className=" p-4  shadow-lg xl:w-[60%] lg:w-[60%] md:w-[60%] sm:w-[60%] w-[80%] h-auto rounded-2xl bg-white overflow-scroll "
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        className="w-full h-full flex justify-center items-center "
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { ease: "easeOut", duration: 0.75 },
        }}
        exit={{
          opacity: 0,
          transition: { ease: "easeIn", duration: 0.75 },
        }}
      >
        <div className="h-auto w-[100%] flex flex-col justify-center items-center bg-myGrey rounded-3xl ">
          {/* Affichage de la semaine (ligne 0 du JSON) */}
          <div className=" font-semibold mb-5">
            Semaine du {menuSemaine.length > 0 ? menuSemaine[0].info1 : ""} au{" "}
            {menuSemaine.length > 0 ? menuSemaine[0].info2 : ""}
          </div>

          {/* On affiche les jours de la semaine en excluant "Semaine du:", "Dessert:" et "Cheesecake:" */}
          {menuSemaine.length > 0 &&
            menuSemaine
              .filter(
                (item) =>
                  item.type !== "Semaine du:" &&
                  item.type !== "Dessert:" &&
                  item.type !== "Cheesecake:"
              )
              .map((menu, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col justify-center items-center xl:mb-2 lg:mb-2 text-center mb-2 "
                >
                  <h1 className="xl:text-2xl lg:text-2xl md:text-xl sm:text-lg text-base font-title-font text-my-gold mb-1">
                    {menu.type}
                  </h1>
                  <p className="xl:text-base lg:text-base md:text-base sm:text-sm text-xs">
                    <span className="font-bold">Entrée: </span>
                    <span>{menu.info1}</span>
                  </p>
                  <p className="xl:text-base lg:text-base md:text-base sm:text-sm text-xs">
                    <span className="font-bold">Plat: </span>
                    <span>{menu.info2}</span>
                  </p>
                </div>
              ))}

          {/* Affichage du bloc récapitulatif pour le Dessert et le Cheesecake de la semaine */}
          {menuSemaine.length > 2 && (
            <div>
              <p className="text-my-gold xl:text-base lg:text-base md:text-base sm:text-sm text-xs text-center mt-2">
                <span className="font-bold font-title-font ">
                  Dessert de la semaine :
                </span>{" "}
                <span className="text-black">
                  {menuSemaine[menuSemaine.length - 2].info1}
                </span>
                <br />
                <span>Cheesecake de la semaine : </span>
                <span className="text-black">
                  {menuSemaine[menuSemaine.length - 1].info1}
                </span>
                <br />
              </p>
            </div>
          )}

          <span className="mt-5 text-my-gold text-center text-xs">
            ENTREE-PLAT-DESSERT : 15.00 € || ENTREE-PLAT (ou PLAT-DESSERT) :
            13.00 € || PLAT SEUL : 11.00 €
          </span>
          <button
            className="px-5 py-2 border-solid border-black border-2 mt-5 mb-5 xl:text-xl lg:xl:text-xl md:xl:text-xl sm:text-sm rounded-md"
            onClick={handleClick}
          >
            Réserver en ligne
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ModalMenu;
