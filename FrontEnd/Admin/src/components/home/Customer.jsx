import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Designer.jpeg";

function Customer() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 px-4 py-16 sm:px-8 md:px-16 lg:px-24 text-white"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-indigo-400/15 to-blue-400/15 rounded-full blur-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-center md:text-left mb-8 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Any Query About
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Services?
          </span>

          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 1.2, duration: 1 }}
            className="h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 mt-4 rounded-full mx-auto md:mx-0"
          />
        </motion.h1>

        {/* Enhanced Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-center md:text-left bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
            Contact Us
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-xl sm:text-2xl text-center md:text-left text-blue-100"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full shadow-lg inline-block cursor-default"
            >
              Cool Services
            </motion.span>{" "}
            <span className="text-blue-200">
              – Your trusted home appliance partner
            </span>
          </motion.p>
        </motion.div>

        {/* Enhanced Chat Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center mt-16 gap-12"
        >
          <div className="w-full md:w-1/2">
            {/* Enhanced Chat Header */}
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-3xl sm:text-4xl font-bold mb-8 text-center md:text-left bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent flex items-center justify-center md:justify-start gap-3"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                💬
              </motion.span>
              Chat With Us
            </motion.h2>

            {/* Enhanced Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8, type: "spring" }}
              className="flex justify-center md:justify-start mb-8"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: [0, 1, -1, 0],
                  transition: { duration: 0.3 },
                }}
                className="relative group"
              >
                {/* Glowing background effect */}
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full opacity-20 group-hover:opacity-40 blur-2xl transition-opacity duration-500"></div>

                {/* Image with enhanced styling */}
                <div className="relative bg-gradient-to-br from-white/20 to-white/10 p-4 rounded-3xl backdrop-blur-sm border border-white/30 shadow-2xl">
                  <img
                    src={image}
                    alt="Customer Support - Chat with us on WhatsApp"
                    className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl shadow-xl object-cover transition-all duration-300 group-hover:shadow-2xl"
                  />

                  {/* Online status indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.2, type: "spring" }}
                    className="absolute -top-2 -right-2 flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-white"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2.5 h-2.5 bg-white rounded-full"
                    />
                    Online Now
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced WhatsApp Button */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.8 }}
              className="flex justify-center md:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                {/* Button glow effect */}
                <div className="absolute -inset-3 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl opacity-30 group-hover:opacity-50 blur transition-opacity duration-300"></div>

                <a
                  href={`https://wa.me/${
                    import.meta.env.VITE_WP
                  }?text=Hello%20I%20need%20help`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative
                  inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r
                  from-green-500 to-green-600 hover:from-green-600
                  hover:to-green-700 text-white rounded-2xl font-bold text-lg
                  transition-all duration-300 shadow-2xl border
                  border-green-400/50 backdrop-blur-sm group"
                >
                  <motion.i
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                    className="fa-brands fa-whatsapp text-2xl drop-shadow-lg"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm opacity-90 font-medium">
                      Chat on
                    </span>
                    <span className="text-xl font-bold">WhatsApp</span>
                  </div>
                  {/* Animated arrow */}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    <svg
                      className="w-6 h-6 drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                </a>
              </motion.div>
            </motion.div>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="mt-6 text-center md:text-left space-y-2"
            >
              <p className="text-blue-200 text-sm flex items-center justify-center md:justify-start gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                Average response time: 2 minutes
              </p>
              <p className="text-blue-300/70 text-xs">
                Click to start chatting instantly! 🚀
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Customer;
