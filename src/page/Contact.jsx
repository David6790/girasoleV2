import React, { useRef } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MenuBanner from "../components/MenuBanner";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import Location from "../components/Location";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const isInView = useInView(ref1, { once: true });
  return (
    <div>
      <Header />
      <motion.div
        className="w-full xl:h-[500px] lg:h-[500px] md:h-[400px] sm:h-[300px] h-[200px] bg-custom3 bg-cover  "
        ref={ref1}
        style={{
          transform: isInView ? "none" : "opacity:0 ",
          opacity: isInView ? 1 : 0,

          transition: "all   ease-in 0.8s ",
        }}
      >
        <MenuBanner
          h1={'" A tavola non si invecchia. "'}
          h2={"Contactez-nous"}
        />
      </motion.div>
      <div className="w-full flex xl:flex-row lg:flex-row  md:flex-row  sm:flex-row  flex-col ">
        <div className="xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full h-full p-7 ">
          <motion.img
            src="./img/table.jpg"
            alt="table du restaurant"
            className="xl:h-full lg:h-full md:h-full sm:h-full w-full rounded-3xl shadow-2xl  object-cover"
            ref={ref4}
            style={{
              transform: isInView ? "none" : "opacity:0 ",
              opacity: isInView ? 1 : 0,

              transition: "all   ease-in 0.8s ",
            }}
          />
        </div>
        <motion.div
          className="xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full h-full p-5 flex justify-center"
          ref={ref5}
          style={{
            transform: isInView ? "none" : "opacity:0",
            opacity: isInView ? 1 : 0,

            transition: "all   ease-in 0.8s ",
          }}
        >
          <ContactForm />
        </motion.div>
      </div>
      <div className="w-full flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col-reverse justify-around items-start xl:h-screen lg:h-screen  md:h-screen  sm:h-screen h-auto bg-myGrey py-10 px-5">
        <motion.div
          className="xl:w-5/12 lg:w-5/12 md:w-5/12 sm:w-5/12 w-full h-full flex flex-col justify-between   "
          ref={ref2}
          style={{
            transform: isInView ? "none" : "opacity:0 ",
            opacity: isInView ? 1 : 0,

            transition: "all   ease-in 0.8s ",
          }}
        >
          <Location />
        </motion.div>
        <div
          className="xl:w-5/12 lg:w-5/12 md:w-5/12 sm:w-5/12 w-full h-full xl:mb-0 lg-mb-0 md:mb-0 sm:mb-0 mb-5 flex flex-row justify-center "
          ref={ref3}
          style={{
            transform: isInView ? "none" : "opacity:0 ",
            opacity: isInView ? 1 : 0,

            transition: "all 0.5s   ease-in 0.8s ",
          }}
        >
          <img
            src="./img/location.jpg"
            alt=""
            className="h-full rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
