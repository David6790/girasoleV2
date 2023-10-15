import React from "react";
import ButtonResa from "./ButtonResa";

const Location = () => {
  return (
    <>
      <h1 className=" xl:text-4xl lg:text-3xl md:text-xl sm:text-xl text-my-gold font-title-font mb-5 ">
        Où nous trouver ?
      </h1>
      <p className=" xl:text-lg lg:text-base md:text-sm sm:text-xs text-justify">
        Situé au cœur de Strasbourg, le Il Girasole se trouve au 12 quai Saint
        Nicolas, un emplacement à quelques pas seulement de la Cathédrale et à
        proximité du pittoresque quartier de la Petite France. Le restaurant au
        bord de l'eau et entouré de l'architecture emblématique de Strasbourg,
        offre à nos visiteurs une expérience gastronomique inégalée, mêlant
        délices culinaires et splendeurs visuelles. Que vous veniez de la
        Cathédrale, de la Petite France ou d'ailleurs, vous trouverez chez nous
        un havre de paix et de saveurs, en plein cœur de l'effervescence
        strasbourgeoise.
      </p>
      <div className="mt-10 xl:text-base lg:text-base md:text-sm sm:text-sm">
        <h1 className=" xl:text-2xl lg:text-2xl md:text-xl sm:text-xl ">
          Restaurant Il Girasole
        </h1>
        <h2 className="xl:text-lg lg:text-lg  md:text-lg  sm:text-base ">
          12 quai Saint Nicolas 67000 Strasbourg
        </h2>
        <h3>
          <span className="font-bold">Tel</span> : 03.88.37.16.76
        </h3>
        <h3>
          <span className="font-bold">Email</span> : rest.ilgirasole@gmail.com
        </h3>
        <h3 className=" xl:text-lg lg:text-base md:text-sm font-bold ">
          Horraires:
        </h3>
        <p>
          <span>Lundi - Jeudi</span> : 12:00 - 14:00 / 19:00 - 22:00
        </p>
        <p>
          <span>Vendredi - Dimanche</span> : 12:00 - 14:00 / 19:00 - 23:00
        </p>
        <ButtonResa />
      </div>
    </>
  );
};

export default Location;
