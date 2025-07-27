import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

function Nav() {
  return (
    <div className="p-3 sm:p-5 shadow-md sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div className="mb-2 sm:mb-0 flex-shrink-0 flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-semibold text-green-600 hidden sm:inline">
            MyService
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 text-sm sm:text-base font-medium text-gray-700">
          <NavLink
            to="/"
            className="px-3 py-1 rounded-md hover:text-blue-600 transition-colors"
          >
            Home
          </NavLink>
          <NavLink
            to="/signup"
            className="px-3 py-1 rounded-md hover:text-blue-600 transition-colors"
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className="px-3 py-1 rounded-md hover:text-blue-600 transition-colors"
          >
            Login
          </NavLink>
          <NavLink
            to="/contactUs"
            className="px-3 py-1 rounded-md hover:text-blue-600 transition-colors"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Nav;
