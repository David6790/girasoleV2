import React from "react";

const NewYearMenuImageModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-40"></div>

      <div className="relative z-50 w-full h-full flex items-center justify-center p-4">
        {/* Conteneur du menu */}
        <div className="relative w-full max-w-full h-auto max-h-screen flex flex-col items-center justify-center">
          {/* Bouton Fermer en haut à gauche */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full px-4 py-2 shadow focus:outline-none transition-colors duration-200 z-50"
          >
            Fermer
          </button>
          {/* Image du menu */}
          <img
            src="/img/newYear.png"
            alt="Menu Nouvel An"
            className="w-auto h-auto max-w-full sm:max-w-[70%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default NewYearMenuImageModal;
