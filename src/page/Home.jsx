import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
//import Banner from "../components/Banner";
import MenuSemaine from "../components/MenuSemaine";
import Chef from "../components/Chef";
import FindUs from "../components/FindUs";

import Banner from "../components/Banner";
import SpecialEvent from "../components/SpecialEvent";

const Home = () => {
  return (
    <div className=" w-full">
      <Header />
      <div className="w-full xl:h-screen lg:h-screen md:h-screen sm:h-screen h-[600px] flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col px-5    ">
        <Banner />
      </div>
      <div
        id="event-special"
        className="w-full bg-white px-4 sm:px-8 lg:px-10 py-10 lg:py-0 lg:h-[700px] flex"
      >
        <SpecialEvent />
      </div>

      <div className="w-full xl:h-[700px] lg:h-[700px] md:h-[700px] sm:h-[700px] h-[700px] flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col-reverse bg-myGrey p-10">
        <MenuSemaine />
      </div>
      <div className="h-[550px] w-full  flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col pt-5 ">
        <Chef />
      </div>
      <div className=" xl:h-[500px] lg:h-[500px] md:h-[500px] sm:h-[500px] h-[600px] w-full flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col  bg-myGrey ">
        <FindUs />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
