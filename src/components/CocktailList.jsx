import React from "react";
import { useSelector } from "react-redux";
import { listCocktails } from "../features/menuSlice";

const CocktailList = () => {
  const allCocktails = useSelector(listCocktails);

  return (
    <>
      {allCocktails
        ? allCocktails.map((item) => (
            <div>
              <h1>{item.nom}</h1>
              <img src={item.image} alt="coàcktaiml" />
            </div>
          ))
        : ""}
    </>
  );
};

export default CocktailList;
