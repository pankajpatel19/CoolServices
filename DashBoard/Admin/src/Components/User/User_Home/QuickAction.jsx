import React from "react";
import { motion } from "framer-motion";

function QuickAction() {
  return (
    <div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🏠", label: "Home Services", path: "/services/home" },
            {
              icon: "💼",
              label: "Professional",
              path: "/services/professional",
            },
            {
              icon: "🚗",
              label: "Automotive",
              path: "/services/automotive",
            },
            { icon: "💄", label: "Beauty & Spa", path: "/services/beauty" },
          ].map((service, index) => (
            <button
              key={index}
              onClick={() => navigate(service.path)}
              className="p-4 text-center rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                {service.icon}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {service.label}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default QuickAction;
