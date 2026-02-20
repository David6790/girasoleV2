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
              src="./img/valentin.jpg"
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
            Menus <span className="text-my-gold">de fêtes</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-xl mb-5 text-justify">
            Pour les fêtes de fin d’année, nous vous proposons{" "}
            <strong>deux soirées spéciales</strong>, autour de menus festifs
            pensés pour le plaisir du partage.
          </p>

          {/* BULLETS */}
          <ul className="text-sm sm:text-base lg:text-lg mb-5 space-y-3">
            <li>
              🎄 <strong>Menu de Noël — 24 décembre au soir</strong>
              <div className="opacity-90">
                Menu complet (entrée + plat + dessert) à choisir dans notre
                sélection festive. Ambiance chaleureuse et table gourmande.
              </div>
            </li>

            <li>
              🎆 <strong>Menu du Nouvel An — 31 décembre au soir</strong>
              <div className="opacity-90">
                Menu complet (entrée + plat + dessert) à choisir dans notre
                carte festive. <strong>65€ / personne</strong>.
              </div>
            </li>
          </ul>

          {/* MENU ENFANT + CTA DISCRET */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm mb-6 italic">
            <div>
              <p className="mb-1">
                👶 <strong>Menu enfant disponible</strong> (24/12 & 31/12)
              </p>
              <p>• 30€ : Entrée + Plat + Dessert + 1 soft</p>
              <p>• 25€ : Plat + Dessert (ou Entrée + Plat) + 1 soft</p>
            </div>

            <button
              onClick={() => openImageModal("/img/gosse2.jpeg", "Menu enfant")}
              className="shrink-0 self-start sm:self-center px-3 py-1 border border-black rounded-md text-xs sm:text-sm opacity-80 hover:opacity-100 transition hover:shadow-md"
            >
              Voir le menu enfant
            </button>
          </div>

          {/* CTA PRINCIPAUX : full width en mobile */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="w-full sm:w-auto px-5 py-3 border rounded-md border-black text-sm sm:text-base lg:text-lg transform transition-transform duration-200 hover:-translate-y-1 shadow-2xl"
              onClick={() => openImageModal("/img/Noel.jpeg", "Menu de Noël")}
            >
              Menu de Noël
            </button>

            <button
              className="w-full sm:w-auto px-5 py-3 border rounded-md border-black text-sm sm:text-base lg:text-lg transform transition-transform duration-200 hover:-translate-y-1 shadow-2xl"
              onClick={() =>
                openImageModal("/img/NouvelAn.jpeg", "Menu du Nouvel An")
              }
            >
              Menu du Nouvel An
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
