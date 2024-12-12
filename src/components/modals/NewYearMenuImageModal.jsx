import React from "react";

const NewYearMenuImageModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-40"></div>

      {/* Modal Container */}
      <div className="relative z-50 w-full max-w-5xl h-auto max-h-[95vh] bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full px-4 py-2 shadow focus:outline-none transition-colors duration-200"
        >
          Fermer
        </button>

        {/* Image */}
        <div className="w-full h-auto max-h-full flex items-center justify-center">
          <img
            src="/img/newYear.png"
            alt="Menu Nouvel An"
            className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default NewYearMenuImageModal;
