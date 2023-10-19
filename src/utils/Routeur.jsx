import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../page/Home";
import Menu from "../page/Menu";
import Contact from "../page/Contact";
import ScrollToTop from "./ScrollToTop";
import ModalNouveautés from "../components/modals/ModalNouveautés";
import ModalReservation from "../components/modals/ModalReservation";

const Routeur = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isResaModalOpen, setIsResaModalOpen] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setModalOpen(true);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleResaModal = () => {
    setModalOpen(false);
    setIsResaModalOpen(true);
  };

  const closeResaModal = () => {
    setIsResaModalOpen(false);
  };
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ModalNouveautés
        isOpen={isModalOpen}
        onClose={handleModalClose}
        resaModal={handleResaModal}
      />
      <ModalReservation isOpen={isResaModalOpen} onClose={closeResaModal} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routeur;
