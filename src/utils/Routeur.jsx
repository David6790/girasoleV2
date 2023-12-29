import React from "react";
import { BrowserRouter } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";

import RouteurContent from "./RouteurContent";

const Routeur = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteurContent />
    </BrowserRouter>
  );
};

export default Routeur;
