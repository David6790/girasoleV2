import React, { useEffect, useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import ModalNouveautés from "../components/modals/ModalNouveautés";
import ModalReservation from "../components/modals/ModalReservation";
import Home from "../page/Home";
import Menu from "../page/Menu";
import Contact from "../page/Contact";
import MenuMidi from "../page/MenuMidi";
import MenuCocktails from "../page/MenuCocktails";
import MentionLegales from "../page/MentionLegales";

import RecapResa from "../page/RecapResa";
import Dashboard from "../page/Dashboard";
import RecapCuisine from "../page/RecapCuisine";

const RouteurContent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isResaModalOpen, setIsResaModalOpen] = useState(false);
  const [modalDejaAffiche, setModalDejaAffiche] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (
      !modalDejaAffiche &&
      location.pathname !== "/davlebg" &&
      location.pathname !== "/nyg" &&
      location.pathname !== "/recap" &&
      location.pathname !== "/dashboard" &&
      location.pathname !== "/staffForm" &&
      location.pathname !== "/kitchen-2"
    ) {
      const timer = setTimeout(() => {
        setModalOpen(true);
        setModalDejaAffiche(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location, modalDejaAffiche]);

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
    <>
      <ModalNouveautés
        isOpen={isModalOpen}
        onClose={handleModalClose}
        resaModal={handleResaModal}
      />
      <ModalReservation isOpen={isResaModalOpen} onClose={closeResaModal} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reserver" element={<Home />} />

        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu-midi" element={<MenuMidi />} />
        <Route path="/menu-cocktails" element={<MenuCocktails />} />
        <Route path="/legalMentions" element={<MentionLegales />} />
        <Route path="/recap" element={<RecapResa />} />
        <Route path="/kitchen-2" element={<RecapCuisine />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default RouteurContent;
