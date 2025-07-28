import React from "react";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
    >
      <h1>404 Page Not Found!!!!</h1>
    </motion.div>
  );
}

export default NotFound;
