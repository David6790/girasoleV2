import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const Chef = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView = useInView(ref1, ref2, { once: false });
  return (
    <>
      <div className=" xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full xl:h-full lg:h-full md:h-full sm:h-full h-1/2 flex flex-row justify-center">
        <motion.img
          src="./img/chef.png"
          alt=""
          className=" h-full"
          ref={ref1}
          style={{
            transform: isInView ? "none" : "opacity:0   ",
            opacity: isInView ? 1 : 0,

            transition: "all  ease-in 0.9s ",
          }}
        />
      </div>
      <motion.div
        className="xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full xl:h-full lg:h-full md:h-full sm:h-full h-1/2 flex flex-col justify-center items-center"
        ref={ref2}
        style={{
          transform: isInView ? "none" : "opacity:0  ",
          opacity: isInView ? 1 : 0,

          transition: "all 0.9s   ease-in 0.9s ",
        }}
      >
        <div className=" w-[85%] text-center">
          <h1 className=" font-title-font xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl text-2xl italic xl:mb-5 lg:mb-5 md:mb-5 sm:mb-5 mb-2">
            " <span className=" text-my-gold">La cucinapiccola</span> fa la casa
            grande "
          </h1>
          <p className="xl:text-xl lg:xl:text-xl md:xl:text-xl sm:xl:text-xl text-base italic xl:mb-10 lg:mb-10 md:mb-10 sm:mb-10 mb-5 xl:text-right lg:text-right md:text-right sm:text-right text-center xl:mr-2 lg:mr-2 md:mr-2 sm:mr-2 mr-0 ">
            Ferhat Zidoune - Chef de cuisine
          </p>
          <p className=" xl:text-base lg:text-base md:text-base sm:text-base text-xs text-center">
            Dans la vie, les choses les plus simples sont souvent les meilleures
            et il n’est nul besoin de préparer des plats élaborés et
            sophistiqués pour passer un moment agréable. Au Il Girasole, nous
            vous proposons une cuisine simple et faite avec amour.
          </p>
          <button className=" px-5 py-2 border-[1px] rounded-md border-black xl:text-xl lg:text-xl md:text-xl sm:text-sm text-xs  mt-8">
            Consulter la Carte
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Chef;
