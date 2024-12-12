import React, { useRef, useEffect, useState } from "react";
import ButtonResa from "./ButtonResa";
import NewYearMenuImageModal from "./modals/NewYearMenuImageModal";

const BannerNy = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    // eslint-disable-next-line
    return () => {
      // eslint-disable-next-line
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col lg:flex-row w-full h-screen relative"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : "translateY(20px)",
        transition: "all 0.5s ease-in-out",
      }}
    >
      {/* Image Section */}
      <div
        className="w-full lg:w-1/2 h-1/2 lg:h-full relative shadow-xl"
        style={{
          backgroundImage: `url('/img/ny2025.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.3)", // Shadow for floating effect
        }}
      >
        {/* Voir le menu button */}
        <button
          className="absolute bottom-1 lg:bottom-4 lg:left-6 w-auto px-4 lg:px-6 py-2 lg:py-3 bg-black/30 backdrop-blur-sm text-white font-semibold text-sm lg:text-lg rounded-full shadow-md hover:bg-black/50 transition duration-300 ease-in-out"
          onClick={handleOpenModal}
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Voir le menu
        </button>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center items-center bg-white">
        <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left px-6 lg:px-12 h-full">
          <h1 className="xl:text-7xl lg:text-6xl md:text-4xl sm:text-3xl text-4xl font-bold mb-4">
            IL GIRASOLE
          </h1>
          <h2 className="text-my-gold xl:text-4xl lg:text-3xl md:text-2xl text-2xl italic font-title-font mb-6">
            -La trattoria revisitée-
          </h2>
          <ButtonResa />
          <p className="mt-6 text-gray-700">
            Ou par SMS au :{" "}
            <span className="font-semibold">06.26.19.10.28</span>
          </p>
        </div>
      </div>
      <NewYearMenuImageModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default BannerNy;
