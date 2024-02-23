import React, { useEffect } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useGetWeeklyMenusQuery } from "../../API/api"; // Assurez-vous que le chemin d'import est correct
import { setWeeklyMenus } from "../../features/menuSlice"; // Importez l'action Redux si vous souhaitez toujours mettre à jour le store

const ModalMenu = ({ isOpen, onClose, resaModal }) => {
  const dispatch = useDispatch();
  const { data: menuSemaine, isSuccess } = useGetWeeklyMenusQuery(undefined, {
    skip: !isOpen,
  });

  useEffect(() => {
    // Si vous souhaitez toujours mettre à jour le store Redux avec les dernières données
    if (isOpen && isSuccess && menuSemaine) {
      dispatch(setWeeklyMenus(menuSemaine));
    }
  }, [isOpen, menuSemaine, isSuccess, dispatch]);

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
          <div className=" font-semibold mb-5">
            Semaine du {menuSemaine ? menuSemaine[0].info1 : ""} au{" "}
            {menuSemaine ? menuSemaine[0].info2 : ""}
          </div>
          {menuSemaine
            ? menuSemaine
                .filter(
                  (item) =>
                    item.type !== "Semaine du:" &&
                    item.type !== "Dessert: " &&
                    item.type !== "CheeseCake"
                )
                .map((menu, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col justify-center items-center xl:mb-2 lg:mb-2  text-center mb-2 "
                  >
                    <h1 className=" xl:text-2xl lg:text-2xl md:text-xl sm:text-lg text-base font-title-font text-my-gold mb-1">
                      {menu.type}
                    </h1>
                    <p className="xl:text-base lg:text-base md:text-base sm:text-sm text-xs">
                      <span className=" font-bold">Entrée: </span>
                      <span>{menu.info1}</span>
                    </p>
                    <p className="xl:text-base lg:text-base md:text-base sm:text-sm text-xs">
                      <span className=" font-bold">Plat: </span>
                      <span>{menu.info2}</span>
                    </p>
                  </div>
                ))
            : ""}
          <div>
            <p className=" text-my-gold xl:text-base lg:text-base md:text-base sm:text-sm text-xs text-center mt-2">
              <span className=" font-bold font-title-font ">
                Dessert de la semaine :
              </span>
              <span className="text-black">
                {menuSemaine ? menuSemaine[menuSemaine.length - 2].info1 : ""}
              </span>
              <br></br>
              <span>CheeseCake de la semaine : </span>
              <span className="text-black">
                {menuSemaine ? menuSemaine[menuSemaine.length - 1].info1 : ""}
              </span>
              <br />
            </p>
          </div>
          <span className="mt-5 text-my-gold text-center text-xs">
            ENTREE-PLAT-DESSERT : 15.00 € || ENTREE-PLAT (ou PLAT-DESSERT) :
            13.00 € || PLAT SEUL : 11.00 €{" "}
          </span>
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
