import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ModalReservation from "./modals/ModalReservation";
import ImageMenuModal from "./modals/ImageMenuModal";

const SpecialEvent = () => {
  const refText = useRef(null);
  const refImage = useRef(null);

  // useInView standard : une seule ref (ça aide aussi la stabilité)
  const isInViewText = useInView(refText, { once: true });
  const isInViewImage = useInView(refImage, { once: true });

  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // Modal image
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const openImageModal = (src, altText) => {
    setModalImageSrc(src);
    setModalAlt(altText);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageSrc("");
    setModalAlt("");
  };

  const closeResaModal = () => {
    setIsReservationOpen(false);
  };

  return (
    <>
      {/* WRAPPER : mobile-first */}
      <div className="w-full h-full flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* IMAGE */}
        <motion.div
          ref={refImage}
          className="w-full lg:w-1/2 overflow-hidden shadow-md shadow-gray-700 rounded-md"
          style={{
            opacity: isInViewImage ? 1 : 0,
            transform: isInViewImage ? "none" : "translateY(10px)",
            transition: "all ease-in 0.6s",
          }}
        >
          {/* Hauteur contrôlée en mobile */}
          <div className="w-full h-[220px] sm:h-[320px] lg:h-full">
            <img
              src="./img/valentine.PNG"
              alt="Menus de fêtes"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* TEXTE */}
        <motion.div
          ref={refText}
          className="w-full lg:w-1/2 flex flex-col justify-center px-2 sm:px-4 lg:px-0"
          style={{
            opacity: isInViewText ? 1 : 0,
            transform: isInViewText ? "none" : "translateY(10px)",
            transition: "all ease-in 0.6s",
          }}
        >
          <h1 className="font-title-font text-3xl sm:text-4xl lg:text-5xl mb-6">
            Menus <span className="text-my-gold">Saint Valentin</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-xl mb-5 text-justify">
            Pour la <strong>Saint-Valentin</strong>, nous vous proposons une{" "}
            <strong>soirée spéciale</strong> autour d’un menu raffiné, pensé
            pour un moment à deux, dans une ambiance douce et romantique.
          </p>

          {/* BULLETS */}
          <ul className="text-sm sm:text-base lg:text-lg mb-5 space-y-3">
            <li>
              ❤️ <strong>Menu Saint-Valentin</strong>
              <div className="opacity-90">
                Menu complet (entrée + plat + dessert) avec des choix possibles
                à chaque étape, mettant à l’honneur des produits fins et
                gourmands. Ambiance romantique et table élégante.
              </div>
            </li>
          </ul>

          {/* CTA PRINCIPAUX : full width en mobile */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="w-full sm:w-auto px-5 py-3 border rounded-md border-black text-sm sm:text-base lg:text-lg transform transition-transform duration-200 hover:-translate-y-1 shadow-2xl"
              onClick={() =>
                openImageModal("/img/menuLOVE.jpg", "Menu de Noël")
              }
            >
              Menu Saint Valentin
            </button>
          </div>
        </motion.div>
      </div>

      {/* MODAL IMAGE */}
      <ImageMenuModal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        imageSrc={modalImageSrc}
        alt={modalAlt}
      />

      {/* MODAL RESA (inchangé) */}
      <ModalReservation isOpen={isReservationOpen} onClose={closeResaModal} />
    </>
  );
};

export default SpecialEvent;
