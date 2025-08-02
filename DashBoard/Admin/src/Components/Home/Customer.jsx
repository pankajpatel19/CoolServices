import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Designer.jpeg";

function Customer() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
      className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 px-4 py-12 sm:px-8 md:px-16 lg:px-24 text-white  "
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-center md:text-left mb-6">
          Any Query About Services?
        </h1>

        <div className="mt-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif text-center md:text-left">
            Contact Us
          </h2>
          <p className="text-lg sm:text-xl text-center md:text-left">
            <span className="font-semibold">Cool Services</span> – Your home
            appliance partner
          </p>
        </div>

        {/* Chat Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-serif mb-4 text-center md:text-left">
              Chat With Us
            </h2>
            <div className="flex justify-center md:justify-start">
              <img
                src={image}
                alt="WhatsApp"
                className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-3xl shadow-lg object-cover"
              />
            </div>
            <div className="mt-4 flex justify-center md:justify-start">
              <a
                href="https://wa.me/8511994480"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-lg transition duration-200 shadow-lg"
              >
                <i className="fa-brands fa-whatsapp text-xl"></i> Chat on
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Customer;
