import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
      className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] bg-[url('https://images.unsplash.com/photo-1606813902914-8b3ef88a368b')] bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative text-center px-4 z-10">
        <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-bold font-serif mb-4 drop-shadow-lg">
          Fast Home Appliance Service
        </h1>
        <p className="text-white text-sm sm:text-lg mb-6 max-w-xl mx-auto font-light">
          Get reliable repair & maintenance at your doorstep — trusted
          technicians, quick response!
        </p>
        <Link to="/addbooking">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg hover:scale-105">
            Book a Service Now
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default Banner;
