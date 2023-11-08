import React, { useRef } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MenuBanner from "../components/MenuBanner";
import FormuleMidi from "../components/FormuleMidi";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const MenuMidi = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <Header />
      <motion.div
        className="w-full h-[500px] bg-custom4 bg-cover mb-10 "
        ref={ref}
        style={{
          transform: isInView ? "none" : "opacity:0  ",
          opacity: isInView ? 1 : 0,
          transition: "all   ease-in 0.8s ",
        }}
      >
        <MenuBanner
          h1={
            '" Savourez votre pause déjeuner avec nos formules rapides et gourmandes"'
          }
          h2={" Formules Express Midi"}
        />
      </motion.div>
      <div className="w-full h-auto flex flex-row flex-wrap justify-center gap-10 mb-10">
        <FormuleMidi
          h1={"TAPAS MIDI "}
          h2={"Planchette de 3 différents tapas avec salade verte "}
          p={
            "4 PANZEROTTI - Mini-chausson de pizza farci -  4 MINI PIZZA - Mini margherita  - 1 portion PATATAS ITALIANI - avec sauce italienne"
          }
          price1={"16,50€"}
        />
        <FormuleMidi
          h1={"BRUSCHETTA 4-SAISONS"}
          p={
            "Légumes grillés, olives noires, pesto vert , tomates cerises et  parmesan"
          }
          price1={"12,50€"}
          price2={"+Tiramisu 14,50 €"}
          price3={"+Tiramisu et soft   16,00 €"}
        />
        <FormuleMidi
          h1={"CROQUE MONSIEUR ITALIEN "}
          p={
            "pâte à pizza, jambon de parme, mozzarella , pesto rosso, tomates, parmesan et roquette avec une salade verte "
          }
          price1={"13,50€"}
          price2={"+Tiramisu 15,00 €"}
          price3={"+Tiramisu et soft 16,50 €"}
        />
        <FormuleMidi
          h1={"INSALATA DI PASTA"}
          p={"Penne, pesto, tomates cerises, billes de mozzarella et basilic."}
          price1={"12,50€"}
          price2={"+Tiramisu 14,50 €"}
          price3={"+Tiramisu et soft 16,00 €"}
        />
        <FormuleMidi
          h1={"INSALATE ESTATE"}
          p={"Roquette, jambon de parme et tomates séchées"}
          price1={"14,00€"}
          price2={"+Tiramisu 16,00 €"}
          price3={"+Tiramisu et soft 17,50 €"}
        />
        <FormuleMidi
          h1={"ANTIPASTI ITALIANI DU MIDI "}
          h2={
            "Charcuterie italienne, salade, légumes marinés et fromage italien"
          }
          p={"FORMULE Planchette MIDI avec salade verte et ½ pizza pan "}
          price1={"14,00€"}
          price2={"+Tiramisu 16,00 €"}
          price3={"+Tiramisu et soft 17,50 €"}
        />
        <FormuleMidi
          h1={"FORMULE CARPACCIO"}
          h2={"DI MANZO ( 1 assiette + ½ pizza pan) "}
          p={
            "Fines tranches de bœuf cru, marinade ail, basilic, huile d’olive et parmesan."
          }
          price1={"14,50€"}
          price2={"+Tiramisu 16,50 €"}
          price3={"+Tiramisu et soft 18,50 €"}
        />
        <FormuleMidi
          h1={"LES AUTRES FORMULES "}
          h2={"Planche Salade / Pizza"}
          p={
            "½ pizza ( au choix dans les classiques) + une salade verte hors pizza bufala"
          }
          price1={"9,50€"}
          price2={"+Tiramisu 11,50 €"}
          price3={"+Tiramisu et soft 13,00 €"}
        />
        <FormuleMidi
          h1={"LASAGNE ALLA BOLOGNESE"}
          h2={
            "Viande de bœuf, sauce tomate et gratiné à la mozzarella avec salade verte "
          }
          p={"Quantité plus réduite que le soir "}
          price1={"12,50€"}
        />
        <FormuleMidi
          h1={"LINGUINE CAGNESCHE"}
          h2={"Sauce tomate, olives taggiasche, piment concassé et basilic"}
          p={"Quantité plus réduite que le soir "}
          price1={"12,00€"}
        />
      </div>
      <Footer />
    </>
  );
};

export default MenuMidi;
