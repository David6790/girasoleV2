import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import ButtonResa from "./ButtonResa";

const FindUs = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView = useInView(ref1, ref2, { once: true });
  return (
    <>
      <div className="xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full xl:h-full lg:h-full md:h-full sm:h-full h-1/2 pt-5  ">
        <motion.div
          className=" xl:w-10/12 lg:w-10/12 md:w-10/12 sm:w-10/12 w-full h-full flex flex-col gap-2 justify-center xl:items-end lg:items-end md:items-end sm:items-end items-center xl:text-right lg:text-right md:text-right sm:text-right text-center"
          ref={ref1}
          style={{
            transform: isInView ? "none" : "opacity:0,   ",
            opacity: isInView ? 1 : 0,

            transition: "all  ease-in 0.8s ",
          }}
        >
          <h1 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl text-2xl text-my-gold font-title-font">
            Rendez-nous visite
          </h1>
          <h2 className=" xl:text-2xl lg:text-2xl  md:text-2xl  sm:text-2xl text-base ">
            Il Girasole 12 quai Saint-Nicolas
          </h2>
          <h3 className="xl:text-2xl lg:text-2xl  md:text-2xl  sm:text-2xl text-base ">
            67000 Strasbourg
          </h3>
          <h3 className=" xl:text-xl lg:text-xl md:text-xl sm:text-xl text-base">
            03.88.37.16.76
          </h3>
          <div className=" w-full ">
            <p>Tous les jours : </p>
            <p>Midi : 12h - 14h </p>
            <p>Soir : 19h - 22h </p>
          </div>

          <ButtonResa />
        </motion.div>
      </div>
      <motion.div
        className=" xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full xl:h-full lg:h-full md:h-full sm:h-full h-1/2 "
        ref={ref2}
        style={{
          transform: isInView ? "none" : "opacity:0   ",
          opacity: isInView ? 1 : 0,

          transition: "all  ease-in 0.8s ",
        }}
      >
        <img
          src="./img/salle1.webp"
          alt="salle du restaurant"
          className="w-full h-full object-cover  "
        />
      </motion.div>
    </>
  );
};

export default FindUs;
