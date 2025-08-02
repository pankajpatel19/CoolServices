import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/coolService.jpeg";
import { useNavigate } from "react-router-dom";

function Service() {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
      className="Service flex flex-col md:flex-row items-center md:items-start px-4 py-12 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-100 gap-10 sticky top-0"
    >
      {/* Left Section: Heading + Image */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center md:text-left text-blue-900 mb-4">
          We Provide All Services
        </h2>
        <div className="w-full flex justify-center md:justify-start">
          <img
            src={image}
            alt="Service"
            className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button
          onClick={handleMoreClick}
          className="mt-6 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-sm sm:text-base font-semibold transition-all duration-300 shadow-md"
        >
          Learn More
        </button>
      </div>

      {/* Right Section: Services List */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
        <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-700 font-serif text-center md:text-left mb-6">
          Services We Offer
        </h3>
        <ul className="text-lg sm:text-xl text-gray-700 font-light space-y-3 text-center md:text-left">
          <li className="hover:text-blue-700 transition-colors duration-200">
            🧊 A/C Service
          </li>
          <li className="hover:text-blue-700 transition-colors duration-200">
            🧼 Washing Machine Repair
          </li>
          <li className="hover:text-blue-700 transition-colors duration-200">
            🥶 Refrigerator Services
          </li>
          <li className="hover:text-blue-700 transition-colors duration-200">
            🔧 Others (Microwave, Geyser, etc.)
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

export default Service;
