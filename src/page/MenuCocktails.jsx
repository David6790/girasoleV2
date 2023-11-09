import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CocktailList from "../components/CocktailList";

const MenuCocktails = () => {
  return (
    <>
      <Header />
      <div className="bg-white w-full text-center flex flex-row justify-center pt-10">
        <div className="w-8/12">
          <h1 className=" text-6xl  font-title-font mb-10">
            Nos Cocktails & Signatures
          </h1>
          <p className=" italic mb-10">
            Plongez dans l'univers de nos cocktails. Chaque verre raconte une
            histoire, mélangeant saveurs classiques et notes audacieuses. Venez
            vivre une expérience unique, où la découverte d'un cocktail se marie
            à la perfection avec notre cuisine. L'invitation est lancée pour une
            pause gourmande et un moment de convivialité chez nous. 🍸✨
          </p>
        </div>
      </div>
      <div className="w-full bg-green-300">
        <CocktailList />
      </div>
      <Footer />
    </>
  );
};

export default MenuCocktails;
