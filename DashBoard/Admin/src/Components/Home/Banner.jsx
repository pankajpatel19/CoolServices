import React from "react";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="Banner min-h-[200px] sm:min-h-[300px] md:min-h-[400px] bg-fixed flex items-center justify-center px-4 h-100">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl text-black font-serif mb-4">
          Fast Home Applience
        </h1>
        <Link to="/addbooking">
          <button className="w-full sm:w-auto px-6 py-2 text-white font-mono text-sm sm:text-base bg-blue-700 mt-2 rounded hover:bg-blue-800 transition-colors duration-200">
            Book A service Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
