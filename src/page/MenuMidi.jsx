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
          h1={"BRUSCHETTA SALMONE"}
          h2={
            "Base de fromage frais, saumon fumé, morceau de citron, roquette et parmesan"
          }
          price1={"14,00€"}
          price2={"+ Tiramisu ou soft 15,50€"}
          price3={"+ Tiramisu et soft 17,00€"}
        />

        <FormuleMidi
          h1={"BRUSCHETTA CAPRESE"}
          p={"Tomates cerises, jambon de parme, roquette et parmesan"}
          price1={"13,00€"}
          price2={"+ Tiramisu ou soft 14,50€"}
          price3={"+ Tiramisu et soft 16,00€"}
        />

        <FormuleMidi
          h1={"INSALATA ESTIVA"}
          p={"Salade burrata, pêches rôties, tomates cerises et parmesan"}
          price1={"14,50€"}
          price2={"+ Tiramisu ou soft 16,00€"}
          price3={"+ Tiramisu et soft 17,50€"}
        />
        <FormuleMidi
          h1={"ITALIAN BOWL “La Dolce Vita”"}
          p={
            "Salade, roquette, penne, tomates cerises, pesto, olives italiennes et parmesan. Avec jambon de parme +1,00€"
          }
          price1={"14,00€"}
          price2={"+ Tiramisu ou soft 15,50€"}
          price3={"+ Tiramisu et soft 17,00€"}
        />

        <FormuleMidi
          h1={"TAPAS MIDI"}
          h2={"Planchette de 3 différents tapas avec salade verte"}
          price1={"16,50€"}
        />

        <FormuleMidi
          h1={"PLANCHETTE MIDI"}
          h2={
            "Charcuterie italienne, salade, légumes marinés et fromage italien avec salade verte et ½ pizza pan"
          }
          price1={"14,50€"}
          price2={"+ Tiramisu ou soft 16,00€"}
          price3={"+ Tiramisu et soft 17,50€"}
        />

        <FormuleMidi
          h1={"FORMULE CARPACCIO DI MANZO"}
          h2={"1 assiette + ½ pizza pan"}
          p={
            "Fines tranches de bœuf cru, marinade ail, basilic, huile d’olive et parmesan"
          }
          price1={"14,50€"}
          price2={"+ Tiramisu ou soft 16,00€"}
          price3={"+ Tiramisu et soft 17,50€"}
        />

        <FormuleMidi
          h1={"PLANCHE SALADE / PIZZA"}
          h2={
            "½ pizza (au choix dans les classiques, hors pizza BUFALA) + une salade verte"
          }
          price1={"10,50€"}
          price2={"+ Tiramisu ou soft 12,00€"}
          price3={"+ Tiramisu et soft 13,50€"}
        />

        <FormuleMidi
          h1={"GNOCCHIS ALLA NAPOLETANA"}
          h2={"Sauce tomate, copeaux de parmesan, salade verte"}
          price1={"13,00€"}
        />

        <FormuleMidi
          h1={"PENNE ARRABIATA"}
          h2={
            "Sauce tomate, olives italiennes, ail, piment concassé et basilic"
          }
          price1={"12,50€"}
        />

        <FormuleMidi
          h1={"PASTA BOLOGNESE GRATINÉE À LA MOZZA ET SALADE"}
          h2={
            "Sauce bolognaise gratinée à la mozzarella, servie avec salade verte"
          }
          price1={"11,50€"}
        />

        <FormuleMidi
          h1={"CROQUE MONSIEUR ITALIEN"}
          p={
            "Pâte à pizza, jambon de parme, mozzarella, pesto rosso, tomates, parmesan et roquette avec une salade verte"
          }
          price1={"13,50€"}
          price2={"+ Tiramisu ou soft 15,00€"}
          price3={"+ Tiramisu et soft 16,50€"}
        />
      </div>
      <Footer />
    </>
  );
};

export default MenuMidi;
