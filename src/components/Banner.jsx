import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import ButtonResa from "./ButtonResa";
import ButtonVoucher from "./ButtonVoucher";

const Banner = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView = useInView(ref1, ref2, { once: true });
  return (
    <>
      <motion.div
        className="xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full xl:h-full lg:h-full md-h-full sm:h-full h-1/2 flex  justify-center items-center xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 mb-5  "
        ref={ref1}
        style={{
          transform: isInView ? "none" : "opacity:0 translateX:-200px  ",
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : -200,

          transition: "all   ease-in 0.8s ",
        }}
      >
        <img
          src="./img/assiette4.webp"
          alt="vongole"
          className="xl:w-full lg:w-full md:w-full sm:w-full h-full object-contain"
        />
      </motion.div>
      <motion.div
        className=" xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-fullxl:h-full lg:h-full md-h-full sm:h-full h-1/2 flex flex-col xl:justify-center lg:justify-center md:justify-center sm:justify-center justify-start items-center "
        ref={ref2}
        style={{
          transform: isInView ? "none" : "opacity:0  ",
          opacity: isInView ? 1 : 0,

          transition: "all 0.5s   ease-in 0.8s ",
        }}
      >
        <h1 className=" xl:text-7xl lg:text-7xl md:text-4xl sm:text-2xl text-4xl font-bold  mb-2">
          IL GIRASOLE
        </h1>
        <h2 className=" text-my-gold   xl:text-4xl lg:text-4xl md:text-2xl text-2xl italic font-title-font">
          -La trattoria revisitée-
        </h2>
        <ButtonResa />
        <ButtonVoucher />
        <a
          href="#event-special"
          className="mt-8 flex flex-col items-center gap-2 text-my-gold hover:opacity-80 transition"
        >
          <span className="uppercase tracking-widest text-sm font-semibold">
            Menus des fêtes
          </span>

          <div
            className="w-12 h-12 rounded-full flex items-center justify-center
                  border border-my-gold
                  shadow-[0_0_15px_rgba(212,175,55,0.6)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </a>
      </motion.div>
    </>
  );
};

export default Banner;
