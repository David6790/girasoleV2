import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CocktailList from "../components/CocktailList";

const MenuCocktails = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <Header />
      <div className="bg-white w-full py-10 text-center flex flex-row justify-center pt-10">
        <div className="w-8/12">
          <h1 className=" 2xl:text-6xl xl:text-6xl lg:text-6xl md:text-5xl sm:text-4xl text-4xl  font-title-font mb-10">
            Nos Cocktails & Signatures
          </h1>
          <p className=" italic mb-5 text-justify">
            Plongez dans l'univers de nos cocktails. Chaque verre raconte une
            histoire, mélangeant saveurs classiques et notes audacieuses. Venez
            vivre une expérience unique, où la découverte d'un cocktail se marie
            à la perfection avec notre cuisine. L'invitation est lancée pour une
            pause gourmande et un moment de convivialité chez nous. 🍸✨
          </p>
        </div>
      </div>
      <div className="w-full mb-10 mt-10">
        <ul className="w-full flex flex-row flex-wrap justify-center font-title-font gap-5">
          <li
            onClick={() => setCategory("All")}
            className={`cursor-pointer pb-3 ${
              category === "All" ? "border-b-2  border-black" : ""
            }`}
          >
            Tous les cocktails
          </li>
          <li
            onClick={() => setCategory("Spritz")}
            className={`cursor-pointer ${
              category === "Spritz" ? "border-b-2  border-black" : ""
            }`}
          >
            Les Spritz
          </li>
          <li
            onClick={() => setCategory("Cocktails")}
            className={`cursor-pointer ${
              category === "Cocktails" ? "border-b-2  border-black" : ""
            }`}
          >
            Indémodables
          </li>

          <li
            onClick={() => setCategory("CocktailsSoir")}
            className={`cursor-pointer ${
              category === "CocktailsSoir" ? "border-b-2  border-black" : ""
            }`}
          >
            Cocktails du Soir
          </li>
          <li
            onClick={() => setCategory("Mocktails")}
            className={`cursor-pointer ${
              category === "Mocktails" ? "border-b-2  border-black" : ""
            }`}
          >
            Mocktails
          </li>
        </ul>
      </div>
      <div className="w-full  flex flex-row justify-evenly flex-wrap gap-5 mb-10">
        <CocktailList category={category} />
      </div>
      <Footer />
    </>
  );
};

export default MenuCocktails;
