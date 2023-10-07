import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../page/Home";
import Menu from "../page/Menu";
import Contact from "../page/Contact";

const Routeur = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routeur;
