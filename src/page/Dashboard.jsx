import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importez Link de react-router-dom
import ModalStaff from "../components/modals/ModalStaff";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModale = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <h1 className=" text-3xl">Dashboard IL GIRASOLE</h1>
      <h2 className="text-xl mb-10">By David Long Bin 😎</h2>
      <ModalStaff isOpen={isModalOpen} onClose={closeModale} />
      <button
        className="px-5 py-2 border-solid border-black border-[1px] mt-5 mb-5 xl:text-xl lg:text-xl md:text-xl sm:text-lg text-base rounded-md shadow-2xl transform transition-transform duration-200 hover:-translate-y-1"
        onClick={handleClick}
      >
        Réserver en ligne
      </button>
      <Link
        to="/recap"
        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
      >
        Recap Résa
      </Link>
    </div>
  );
};

export default Dashboard;
