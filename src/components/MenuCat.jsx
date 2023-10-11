import React from "react";
import { listmenus } from "../features/menuSlice";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const MenuCat = ({ category }) => {
  const allMenus = useSelector(listmenus);

  return (
    <>
      <AnimatePresence>
        <div className="w-5/6 xl:px-[20px] lg:px-[20px] md:px-[20px] sm:px-[20px] px-1 max-h-screen overflow-scroll">
          {allMenus &&
            allMenus
              .filter((item) => item.category === category)
              .map((item) => (
                <motion.div
                  key={crypto.randomUUID()}
                  className="w-full mb-5"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,

                    transition: {
                      ease: "easeOut",
                      duration: 1,
                    },
                  }}
                  exit={{
                    opacity: 0,

                    transition: {
                      ease: "easeIn",
                      duration: 0.55,
                    },
                  }}
                >
                  <div className="w-full flex justify-between">
                    <h1 className="  xl:text-lg lg:text-lg md:text-lg sm:text-lg text-sm">
                      {item.name}
                    </h1>
                    <span className="flex-grow overflow-hidden relative xl:mx-6 lg:mx-6 md:mx-6 sm:mx-6 mx-2 ">
                      <span className="absolute inset-y-0 left-0 flex items-center w-full whitespace-nowrap overflow-hidden">
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                      </span>
                    </span>
                    <h1 className=" xl:text-lg lg:text-lg md:text-lg sm:text-lg  text-sm ">
                      {item.price}
                    </h1>
                  </div>
                  <div>
                    <h1 className="xl:text-base lg:text-base md:text-base sm:text-base text-xs font-title-font">
                      {item.description}
                    </h1>
                  </div>
                </motion.div>
              ))}
        </div>
      </AnimatePresence>
    </>
  );
};

export default MenuCat;
