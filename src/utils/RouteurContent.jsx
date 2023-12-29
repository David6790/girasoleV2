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
import PrivateBookingDashboard from "../page/PrivateBookingDashboard";

const RouteurContent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isResaModalOpen, setIsResaModalOpen] = useState(false);
  const [modalDejaAffiche, setModalDejaAffiche] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!modalDejaAffiche && location.pathname !== "/davlebg") {
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
        <Route path="/davlebg" element={<PrivateBookingDashboard />} />
      </Routes>
    </>
  );
};

export default RouteurContent;
