import React from "react";
import Modal from "react-modal";

const MessageModal = ({ isOpen, message, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-4 rounded shadow-lg w-3/4 max-w-md mx-auto mt-60"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
    >
      <div className="">
        <h2 className="text-xl font-bold text-my-gold mb-4">Information</h2>
        <p>{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-my-gold text-white rounded"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </Modal>
  );
};

export default MessageModal;
