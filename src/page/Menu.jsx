import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MenuBanner from "../components/MenuBanner";
import MenuCat from "../components/MenuCat";
import { useRef, useState } from "react";
import MenuFilter from "../components/MenuFilter";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const Menu = () => {
  const [category, setCategory] = useState("antipasti");
  const ref1 = useRef(null);

  const isInView = useInView(ref1, { once: true });

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  return (
    <div className="">
      <Header />
      <motion.div
        className="w-full xl:h-[500px] lg:h-[500px] md:h-[400px] sm:h-[300px] h-[200px] bg-custom bg-cover "
        ref={ref1}
        style={{
          transform: isInView ? "none" : "opacity:0 ",
          opacity: isInView ? 1 : 0,

          transition: "all   ease-in 0.8s ",
        }}
      >
        <MenuBanner
          h1={'" Il gusto autentico delle stagioni italiane "'}
          h2={" Notre Carte de saison"}
        />
      </motion.div>

      <motion.div
        className="w-full   bg-[#FAFAF8] "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,

          transition: {
            ease: "easeIn",
            duration: 1,
          },
        }}
        exit={{
          opacity: 0,

          transition: {
            ease: "easeIn",
            duration: 2,
          },
        }}
      >
        <div className="w-full  relative flex justify-between items-start  ">
          <div className="sticky top-0 w-1/6 flex flex-col justify-start items-start p-4 h-screen  md: ">
            <MenuFilter
              name={"Antipasti"}
              onClick={() => handleCategoryChange("antipasti")}
            />
            <MenuFilter
              name={"Carpaccio"}
              onClick={() => handleCategoryChange("carpaccio")}
            />
            <MenuFilter
              name={"Insalate"}
              onClick={() => handleCategoryChange("insalate")}
            />
            <MenuFilter
              name={"Spécialité"}
              onClick={() => handleCategoryChange("specialite")}
            />
            <MenuFilter
              name={"Pesce"}
              onClick={() => handleCategoryChange("pesce")}
            />
            <MenuFilter
              name={"Carne"}
              onClick={() => handleCategoryChange("carne")}
            />
            <MenuFilter
              name={"Pasta"}
              onClick={() => handleCategoryChange("pasta")}
            />
            <MenuFilter
              name={"Risotto"}
              onClick={() => handleCategoryChange("risotto")}
            />
            <MenuFilter
              name={"Pizza"}
              onClick={() => handleCategoryChange("pizza")}
            />
            <MenuFilter
              name={"Dessert"}
              onClick={() => handleCategoryChange("dessert")}
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center border-2 border-black mx-[30px] my-[30px] rounded-3xl pb-10 bg-myGrey">
            <h1 className=" xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl text-xl font-title-font mt-5 mb-10 text-my-gold border-b-2 border-my-gold pb-2 px-5  ">
              {category.toUpperCase()}
            </h1>
            <MenuCat category={category} />
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Menu;
